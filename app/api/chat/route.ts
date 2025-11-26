import { NextRequest, NextResponse } from 'next/server';
import { tool, Agent, AgentInputItem, Runner, withTrace } from "@openai/agents";
import { z } from "zod";
import { OpenAI } from "openai";
import { runGuardrails } from "@openai/guardrails";

// Tool definitions
const getRetentionOffers = tool({
  name: "getRetentionOffers",
  description: "Retrieve possible retention offers for a customer",
  parameters: z.object({
    customer_id: z.string(),
    account_type: z.string(),
    current_plan: z.string(),
    tenure_months: z.number().int(),
    recent_complaints: z.boolean()
  }),
  execute: async (input: {
    customer_id: string;
    account_type: string;
    current_plan: string;
    tenure_months: number;
    recent_complaints: boolean;
  }) => {
    // TODO: Implement actual retention offers logic
    return {
      offers: [
        {
          type: "discount",
          value: "20%",
          duration: "1 year",
          description: "20% discount available for 1 year commitment"
        }
      ]
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
  const shouldMaskPII = guardrails.find(
    (g) => (g?.name === "Contains PII") && g?.config && g.config.block === false
  );
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

const ClassificationAgentSchema = z.object({
  classification: z.enum(["service_inquiry", "pricing_inquiry", "get_information"])
});

const classificationAgent = new Agent({
  name: "Classification agent",
  instructions: `Classify the user's intent into one of the following categories: "service_inquiry", "pricing_inquiry", or "get_information".

1. Any questions about specific services (social media management, graphic design, compliance, etc.) should route to service_inquiry.
2. Any questions about pricing, costs, or packages should route to pricing_inquiry.
3. Any other general information requests should go to get_information.`,
  model: "gpt-4o-mini",
  outputType: ClassificationAgentSchema,
  modelSettings: {
    temperature: 1,
    topP: 1,
    maxTokens: 2048,
    store: true
  }
});

const serviceInquiryAgent = new Agent({
  name: "Service Inquiry Agent",
  instructions: `You are a helpful assistant for Impact Business Solutions. Answer questions about our services including:
- Social Media Management (Standard $35,000, Premium $50,000, Executive $75,000)
- Graphic Design & Branding
- Compliance & Registration (GRA $15,000, NIS $15,000, Business Registration $10,000, Company Registration $120,000)
- Company Incorporation ($260,000)
- Event Management
- Business Development
- Administrative Support

Provide detailed, helpful information about these services.`,
  model: "gpt-4o-mini",
  modelSettings: {
    temperature: 1,
    topP: 1,
    maxTokens: 2048,
    store: true
  }
});

const pricingInquiryAgent = new Agent({
  name: "Pricing Inquiry Agent",
  instructions: `You are a pricing specialist for Impact Business Solutions. Provide accurate pricing information:
- Social Media: Standard $35,000, Premium $50,000, Executive $75,000
- Compliance: GRA $15,000, NIS $15,000, Business Registration $10,000, Company Registration $120,000
- Company Incorporation: $260,000

Always mention that customers can contact us on WhatsApp at +592 679 2338 for detailed quotes.`,
  model: "gpt-4o-mini",
  tools: [getRetentionOffers],
  modelSettings: {
    temperature: 1,
    topP: 1,
    parallelToolCalls: true,
    maxTokens: 2048,
    store: true
  }
});

const informationAgent = new Agent({
  name: "Information agent",
  instructions: `You are an information agent for Impact Business Solutions. Provide clear, concise responses about our company, services, and how we can help businesses in Guyana.

Key information:
- Founded in 2021
- Based in Georgetown, Guyana
- Contact: +592 679 2338 (WhatsApp), marketingimpact20@gmail.com
- Services: Digital Marketing, Social Media Management, Graphic Design, Compliance, Business Development, Event Management
- Tagline: "Making an Impact, One Solution at a Time"

Always be helpful and encourage users to contact us for more information.`,
  model: "gpt-4o-mini",
  modelSettings: {
    temperature: 1,
    topP: 1,
    maxTokens: 2048,
    store: true
  }
});

type WorkflowInput = { input_as_text: string };

// Main code entrypoint
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const workflow: WorkflowInput = { input_as_text: body.message || body.input_as_text || "" };

    if (!workflow.input_as_text) {
      return NextResponse.json(
        { error: "Message is required" },
        { status: 400 }
      );
    }

    const client = getClient();

    const result = await withTrace("Impact Business Solutions chat", async () => {
      const state = {};
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

      return {
        response: finalResponse,
        classification: classificationAgentResult.output_parsed.classification
      };
    });

    return NextResponse.json({ result });
  } catch (error: any) {
    console.error("Chat API error:", error);
    return NextResponse.json(
      { error: error.message || "An error occurred processing your request" },
      { status: 500 }
    );
  }
}

