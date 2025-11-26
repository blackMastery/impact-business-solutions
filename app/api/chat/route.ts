import { NextRequest, NextResponse } from 'next/server';
import { tool, Agent, AgentInputItem, Runner, withTrace } from "@openai/agents";
import { z } from "zod";
import { OpenAI } from "openai";
import { runGuardrails } from "@openai/guardrails";
import fs from 'fs';
import path from 'path';

// Rate limiting (simple in-memory implementation)
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT_MAX = 20; // 20 requests
const RATE_LIMIT_WINDOW = 60000; // 1 minute

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const record = rateLimitMap.get(ip);

  if (!record || now > record.resetTime) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + RATE_LIMIT_WINDOW });
    return true;
  }

  if (record.count >= RATE_LIMIT_MAX) {
    return false;
  }

  record.count++;
  return true;
}

// Analytics logging
function logConversation(ip: string, classification: string, messageLength: number, responseTime: number) {
  // In production, you'd send this to a logging service
  console.log(`[Analytics] IP: ${ip}, Classification: ${classification}, Message Length: ${messageLength}, Response Time: ${responseTime}ms`);
}

// Load knowledge base from WEBSITE-CONTENT.md
function getKnowledgeBase(): string {
  try {
    const contentPath = path.join(process.cwd(), 'WEBSITE-CONTENT.md');
    const content = fs.readFileSync(contentPath, 'utf-8');
    // Return a compressed version focusing on key information
    return content;
  } catch (error) {
    console.error('Error loading knowledge base:', error);
    return '';
  }
}

const knowledgeBase = getKnowledgeBase();

// Enhanced Tool definitions
const getServiceDetails = tool({
  name: "getServiceDetails",
  description: "Get detailed information about a specific service offered by Impact Business Solutions",
  parameters: z.object({
    service_name: z.enum([
      "social_media_management",
      "graphic_design",
      "compliance",
      "company_incorporation",
      "event_management",
      "business_development",
      "administrative_support",
      "strategic_consulting"
    ])
  }),
  execute: async (input) => {
    const services: Record<string, any> = {
      social_media_management: {
        packages: [
          { name: "Standard", price: 35000, posts: 12, videos: 1, features: ["Tailored Content Strategy", "Posting & Management", "Message & Comments Monitoring"] },
          { name: "Premium", price: 50000, posts: 20, videos: 2, ads: 1, features: ["Tailored Content Strategy", "Posting & Management", "Message & Comments Monitoring", "1 FREE Sponsor Ad"] },
          { name: "Executive", price: 75000, posts: 35, videos: 2, ads: 2, features: ["Tailored Content Strategy", "Posting & Management", "Message & Comments Monitoring", "2 FREE Sponsor Ads", "Company Onsite Day"] }
        ],
        platforms: ["Facebook", "Instagram", "LinkedIn", "TikTok"],
        description: "Expertly manage your profiles and curate captivating content that drives engagement and grows your fanbase."
      },
      graphic_design: {
        services: ["Brand Conceptualization", "Logo Design", "Brand Elements", "Creative Materials"],
        description: "Create unique brands that make your business stand out from competitors."
      },
      compliance: {
        services: [
          { name: "GRA Compliance", price: 15000 },
          { name: "NIS Compliance", price: 15000 },
          { name: "Business Registration", price: 10000 },
          { name: "Company Registration", price: 120000 }
        ],
        description: "Ensure your business meets all legal requirements."
      },
      company_incorporation: {
        price: 260000,
        includes: ["Name reservation", "Document drafting", "Filing with government agencies"],
        description: "Complete legal process of forming a company."
      },
      event_management: {
        services: ["Product Launches", "Event Marketing & Promotions", "Trade Shows & Expos", "Corporate Event Planning", "Company Anniversary Celebrations", "Vendor & Venue Management"],
        description: "Professional event planning and management for memorable experiences."
      },
      business_development: {
        services: ["Government Tender Completion", "Training & Development Programs", "Sales Strategy Development", "HR Recruitment Support", "Brand Development"],
        description: "Strategic business growth services."
      },
      administrative_support: {
        services: ["Business/Company Registration", "Compliance Services", "Document Preparation", "Business Plans & Proposal Writing"],
        description: "Comprehensive business registration and compliance services."
      },
      strategic_consulting: {
        services: ["Customized Business Strategies", "Ongoing Support & Consultation", "Focus on Measurable Outcomes"],
        description: "Customized strategies and dedicated support for sustained business success."
      }
    };
    return services[input.service_name] || null;
  },
});

const calculateQuote = tool({
  name: "calculateQuote",
  description: "Calculate a quote for multiple services or packages",
  parameters: z.object({
    services: z.array(z.object({
      service: z.string(),
      package: z.string().nullable().optional(),
      quantity: z.number().nullable().optional()
    }))
  }),
  execute: async (input) => {
    // Simple quote calculation - in production, this would be more sophisticated
    const servicePrices: Record<string, number> = {
      "social_media_standard": 35000,
      "social_media_premium": 50000,
      "social_media_executive": 75000,
      "gra_compliance": 15000,
      "nis_compliance": 15000,
      "business_registration": 10000,
      "company_registration": 120000,
      "company_incorporation": 260000,
    };

    let total = 0;
    const breakdown: Array<{ service: string; price: number }> = [];

    for (const item of input.services) {
      const key = `${item.service}_${item.package || ''}`.toLowerCase().replace(/\s+/g, '_');
      const price = servicePrices[key] || 0;
      const quantity = item.quantity || 1;
      const itemTotal = price * quantity;
      total += itemTotal;
      breakdown.push({ service: `${item.service} ${item.package || ''}`.trim(), price: itemTotal });
    }

    return {
      total,
      breakdown,
      note: "Contact us on WhatsApp at +592 679 2338 for detailed quotes and customizations."
    };
  },
});

// Shared client for guardrails and file search
const getClient = () => {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    throw new Error("OPENAI_API_KEY is not set");
  }
  return new OpenAI({ apiKey });
};

// Guardrails definitions
const jailbreakGuardrailConfig = {
  guardrails: [
    { name: "Jailbreak", config: { model: "gpt-4o-mini", confidence_threshold: 0.7 } }
  ]
};

function getGuardrailContext(client: OpenAI) {
  return { guardrailLlm: client };
}

function guardrailsHasTripwire(results: any[]): boolean {
  return (results ?? []).some((r) => r?.tripwireTriggered === true);
}

function getGuardrailSafeText(results: any[], fallbackText: string): string {
  for (const r of results ?? []) {
    if (r?.info && ("checked_text" in r.info)) {
      return r.info.checked_text ?? fallbackText;
    }
  }
  const pii = (results ?? []).find((r) => r?.info && "anonymized_text" in r.info);
  return pii?.info?.anonymized_text ?? fallbackText;
}

async function scrubConversationHistory(
  history: any[],
  piiOnly: any,
  context: any
): Promise<void> {
  for (const msg of history ?? []) {
    const content = Array.isArray(msg?.content) ? msg.content : [];
    for (const part of content) {
      if (part && typeof part === "object" && part.type === "input_text" && typeof part.text === "string") {
        const res = await runGuardrails(part.text, piiOnly, context, true);
        part.text = getGuardrailSafeText(res, part.text);
      }
    }
  }
}

async function scrubWorkflowInput(
  workflow: any,
  inputKey: string,
  piiOnly: any,
  context: any
): Promise<void> {
  if (!workflow || typeof workflow !== "object") return;
  const value = workflow?.[inputKey];
  if (typeof value !== "string") return;
  const res = await runGuardrails(value, piiOnly, context, true);
  workflow[inputKey] = getGuardrailSafeText(res, value);
}

async function runAndApplyGuardrails(
  inputText: string,
  config: any,
  history: any[],
  workflow: any,
  client: OpenAI
) {
  const guardrails = Array.isArray(config?.guardrails) ? config.guardrails : [];
  const context = getGuardrailContext(client);
  const results = await runGuardrails(inputText, config, context, true);
  const shouldMaskPII = guardrails.find((g: any) => {
    return (g?.name === "Contains PII") && g?.config && g.config.block === false;
  });
  if (shouldMaskPII) {
    const piiOnly = { guardrails: [shouldMaskPII] };
    await scrubConversationHistory(history, piiOnly, context);
    await scrubWorkflowInput(workflow, "input_as_text", piiOnly, context);
    await scrubWorkflowInput(workflow, "input_text", piiOnly, context);
  }
  const hasTripwire = guardrailsHasTripwire(results);
  const safeText = getGuardrailSafeText(results, inputText) ?? inputText;
  return {
    results,
    hasTripwire,
    safeText,
    failOutput: buildGuardrailFailOutput(results ?? []),
    passOutput: { safe_text: safeText }
  };
}

function buildGuardrailFailOutput(results: any[]) {
  const get = (name: string) =>
    (results ?? []).find(
      (r: any) => ((r?.info?.guardrail_name ?? r?.info?.guardrailName) === name)
    );
  const pii = get("Contains PII");
  const mod = get("Moderation");
  const jb = get("Jailbreak");
  const hal = get("Hallucination Detection");
  const nsfw = get("NSFW Text");
  const url = get("URL Filter");
  const custom = get("Custom Prompt Check");
  const pid = get("Prompt Injection Detection");
  const piiCounts = Object.entries(pii?.info?.detected_entities ?? {})
    .filter(([, v]) => Array.isArray(v))
    .map(([k, v]) => k + ":" + (v as any[]).length);
  const conf = jb?.info?.confidence;

  return {
    pii: {
      failed: (piiCounts.length > 0) || pii?.tripwireTriggered === true,
      detected_counts: piiCounts
    },
    moderation: {
      failed: mod?.tripwireTriggered === true || ((mod?.info?.flagged_categories ?? []).length > 0),
      flagged_categories: mod?.info?.flagged_categories
    },
    jailbreak: { failed: jb?.tripwireTriggered === true },
    hallucination: {
      failed: hal?.tripwireTriggered === true,
      reasoning: hal?.info?.reasoning,
      hallucination_type: hal?.info?.hallucination_type,
      hallucinated_statements: hal?.info?.hallucinated_statements,
      verified_statements: hal?.info?.verified_statements
    },
    nsfw: { failed: nsfw?.tripwireTriggered === true },
    url_filter: { failed: url?.tripwireTriggered === true },
    custom_prompt_check: { failed: custom?.tripwireTriggered === true },
    prompt_injection: { failed: pid?.tripwireTriggered === true },
  };
}

// Enhanced Classification Schema
const ClassificationAgentSchema = z.object({
  classification: z.enum([
    "service_inquiry",
    "pricing_inquiry",
    "get_information",
    "booking_request",
    "general_question"
  ]),
  confidence: z.number().min(0).max(1).nullable().optional(),
  entities: z.array(z.object({
    type: z.string(),
    value: z.string()
  })).nullable().optional()
});

// Optimized Classification Agent (lower temperature for accuracy)
const classificationAgent = new Agent({
  name: "Classification agent",
  instructions: `Classify the user's intent into one of the following categories: "service_inquiry", "pricing_inquiry", "get_information", "booking_request", or "general_question".

1. Any questions about specific services (social media management, graphic design, compliance, etc.) should route to service_inquiry.
2. Any questions about pricing, costs, or packages should route to pricing_inquiry.
3. Requests to book, schedule, or start a service should route to booking_request.
4. Any other general information requests should go to get_information.
5. General questions that don't fit above categories go to general_question.`,
  model: "gpt-4o-mini",
  outputType: ClassificationAgentSchema,
  modelSettings: {
    temperature: 0.3, // Lower for more deterministic classification
    topP: 0.9,
    maxTokens: 1024,
    store: true
  }
});

// Enhanced Service Inquiry Agent with knowledge base
const serviceInquiryAgent = new Agent({
  name: "Service Inquiry Agent",
  instructions: `You are a helpful assistant for Impact Business Solutions. Answer questions about our services with detailed, helpful information.

When answering service questions:
1. Always provide specific details (pricing, features, benefits)
2. Use markdown formatting for better readability:
   - **Bold** for important points
   - Bullet points for lists
   - Code blocks for pricing tables
3. Include relevant examples or use cases
4. End with a call-to-action to contact us on WhatsApp at +592 679 2338
5. Be conversational but professional

Knowledge Base:
${knowledgeBase}

Our services include:
- Social Media Management (Standard $35,000, Premium $50,000, Executive $75,000)
- Graphic Design & Branding
- Compliance & Registration (GRA $15,000, NIS $15,000, Business Registration $10,000, Company Registration $120,000)
- Company Incorporation ($260,000)
- Event Management
- Business Development
- Administrative Support
- Strategic Consulting

Provide comprehensive, accurate information based on the knowledge base above.`,
  model: "gpt-4o-mini",
  tools: [getServiceDetails],
  modelSettings: {
    temperature: 0.7, // Balanced for informative responses
    topP: 0.9,
    maxTokens: 2048,
    store: true
  }
});

// Enhanced Pricing Inquiry Agent
const pricingInquiryAgent = new Agent({
  name: "Pricing Inquiry Agent",
  instructions: `You are a pricing specialist for Impact Business Solutions. Provide accurate pricing information with clear formatting.

When providing pricing:
1. Use markdown tables or lists for clarity
2. Always mention that prices are in Guyanese Dollars (GYD)
3. Include package details when relevant
4. Mention that custom quotes are available
5. Always end with: "For detailed quotes and customizations, contact us on WhatsApp at +592 679 2338"

Pricing Information:
- Social Media Management: Standard $35,000, Premium $50,000, Executive $75,000
- Compliance: GRA $15,000, NIS $15,000, Business Registration $10,000, Company Registration $120,000
- Company Incorporation: $260,000 (one-time fee)

Use the calculateQuote tool when users ask about multiple services.`,
  model: "gpt-4o-mini",
  tools: [calculateQuote, getServiceDetails],
  modelSettings: {
    temperature: 0.5, // Lower for accurate pricing
    topP: 0.9,
    parallelToolCalls: true,
    maxTokens: 2048,
    store: true
  }
});

// Enhanced Information Agent with full knowledge base
const informationAgent = new Agent({
  name: "Information agent",
  instructions: `You are an information agent for Impact Business Solutions. Provide clear, concise responses about our company, services, and how we can help businesses in Guyana.

When answering questions:
1. Reference the knowledge base for accurate information
2. Use markdown formatting for better readability
3. Be conversational and friendly
4. Always encourage users to contact us for more information
5. When the user asks follow-up questions, reference previous parts of the conversation and build on previously provided information
6. Maintain context throughout the conversation

Knowledge Base:
${knowledgeBase}

Key information:
- Founded in 2021
- Based in Georgetown, Guyana
- Contact: +592 679 2338 (WhatsApp), marketingimpact20@gmail.com
- Services: Digital Marketing, Social Media Management, Graphic Design, Compliance, Business Development, Event Management
- Tagline: "Making an Impact, One Solution at a Time"
- 15+ Trusted Clients
- 4+ Years of Experience

Always be helpful and encourage users to contact us for more information.`,
  model: "gpt-4o-mini",
  modelSettings: {
    temperature: 0.7, // Balanced for informative responses
    topP: 0.9,
    maxTokens: 2048,
    store: true
  }
});

// Booking Request Agent (new)
const bookingAgent = new Agent({
  name: "Booking Agent",
  instructions: `You are a booking specialist for Impact Business Solutions. Help users understand how to get started with our services.

When users want to book or start a service:
1. Explain the process clearly
2. Provide contact information prominently
3. Mention that we'll schedule a consultation
4. Be encouraging and helpful

Contact: WhatsApp +592 679 2338 or email marketingimpact20@gmail.com

Always guide users to contact us directly for booking.`,
  model: "gpt-4o-mini",
  modelSettings: {
    temperature: 0.7,
    topP: 0.9,
    maxTokens: 1024,
    store: true
  }
});

export type WorkflowInput = { input_as_text: string };

// Main code entrypoint with retry logic
export async function processChatRequest(workflow: WorkflowInput, retryCount = 0): Promise<any> {
  const startTime = Date.now();
  const client = getClient();

  try {
    const result = await withTrace("Impact Business Solutions chat", async () => {
      const conversationHistory: AgentInputItem[] = [
        { role: "user", content: [{ type: "input_text", text: workflow.input_as_text }] }
      ];

      const runner = new Runner({
        traceMetadata: {
          __trace_source__: "agent-builder",
          workflow_id: "wf_69260d8ee174819096f6d9d1f0d2b0cf0875b56ad15b2390"
        }
      });

      const guardrailsInputText = workflow.input_as_text;
      const {
        hasTripwire: guardrailsHasTripwire,
        safeText: guardrailsAnonymizedText,
        failOutput: guardrailsFailOutput,
        passOutput: guardrailsPassOutput
      } = await runAndApplyGuardrails(
        guardrailsInputText,
        jailbreakGuardrailConfig,
        conversationHistory,
        workflow,
        client
      );

      const guardrailsOutput = guardrailsHasTripwire ? guardrailsFailOutput : guardrailsPassOutput;

      if (guardrailsHasTripwire) {
        return guardrailsOutput;
      }

      const classificationAgentResultTemp = await runner.run(
        classificationAgent,
        [...conversationHistory]
      );

      conversationHistory.push(
        ...classificationAgentResultTemp.newItems.map((item) => item.rawItem)
      );

      if (!classificationAgentResultTemp.finalOutput) {
        throw new Error("Agent result is undefined");
      }

      const classificationAgentResult = {
        output_text: JSON.stringify(classificationAgentResultTemp.finalOutput),
        output_parsed: classificationAgentResultTemp.finalOutput
      };

      let finalResponse = "";

      if (classificationAgentResult.output_parsed.classification === "service_inquiry") {
        const serviceAgentResultTemp = await runner.run(
          serviceInquiryAgent,
          [...conversationHistory]
        );
        conversationHistory.push(
          ...serviceAgentResultTemp.newItems.map((item) => item.rawItem)
        );
        finalResponse = serviceAgentResultTemp.finalOutput ?? "";
      } else if (classificationAgentResult.output_parsed.classification === "pricing_inquiry") {
        const pricingAgentResultTemp = await runner.run(
          pricingInquiryAgent,
          [...conversationHistory]
        );
        conversationHistory.push(
          ...pricingAgentResultTemp.newItems.map((item) => item.rawItem)
        );
        finalResponse = pricingAgentResultTemp.finalOutput ?? "";
      } else if (classificationAgentResult.output_parsed.classification === "booking_request") {
        const bookingAgentResultTemp = await runner.run(
          bookingAgent,
          [...conversationHistory]
        );
        conversationHistory.push(
          ...bookingAgentResultTemp.newItems.map((item) => item.rawItem)
        );
        finalResponse = bookingAgentResultTemp.finalOutput ?? "";
      } else {
        const informationAgentResultTemp = await runner.run(
          informationAgent,
          [...conversationHistory]
        );
        conversationHistory.push(
          ...informationAgentResultTemp.newItems.map((item) => item.rawItem)
        );
        finalResponse = informationAgentResultTemp.finalOutput ?? "";
      }

      const responseTime = Date.now() - startTime;

      return {
        response: finalResponse,
        classification: classificationAgentResult.output_parsed.classification,
        responseTime
      };
    });

    return result;
  } catch (error: any) {
    // Retry logic with exponential backoff
    if (retryCount < 2 && error.message?.includes('rate limit') || error.status === 429) {
      const delay = 1000 * Math.pow(2, retryCount);
      await new Promise(resolve => setTimeout(resolve, delay));
      return processChatRequest(workflow, retryCount + 1);
    }
    throw error;
  }
}

export async function POST(request: NextRequest) {
  const startTime = Date.now();
  const ip = request.ip || request.headers.get('x-forwarded-for') || 'unknown';

  try {
    // Rate limiting
    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        { error: "Rate limit exceeded. Please try again later." },
        { status: 429 }
      );
    }

    const body = await request.json();
    const workflow: WorkflowInput = { input_as_text: body.message || body.input_as_text || "" };

    if (!workflow.input_as_text) {
      return NextResponse.json(
        { error: "Message is required" },
        { status: 400 }
      );
    }

    const result = await processChatRequest(workflow);

    // Analytics logging
    const responseTime = Date.now() - startTime;
    logConversation(ip, result.classification || 'unknown', workflow.input_as_text.length, responseTime);

    return NextResponse.json({ result });
  } catch (error: any) {
    console.error("Chat API error:", error);
    const responseTime = Date.now() - startTime;
    logConversation(ip, 'error', 0, responseTime);
    
    return NextResponse.json(
      { error: error.message || "An error occurred processing your request" },
      { status: 500 }
    );
  }
}
