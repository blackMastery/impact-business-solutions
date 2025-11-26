import { NextRequest, NextResponse } from 'next/server';
import { processChatRequest, type WorkflowInput } from '../../chat/route';

const FB_VERIFY_TOKEN = process.env.FB_VERIFY_TOKEN;
const FB_PAGE_ACCESS_TOKEN = process.env.FB_PAGE_ACCESS_TOKEN;

if (!FB_VERIFY_TOKEN) {
  console.warn('FB_VERIFY_TOKEN is not set. Facebook webhook verification will fail until this is configured.');
}

if (!FB_PAGE_ACCESS_TOKEN) {
  console.warn('FB_PAGE_ACCESS_TOKEN is not set. Messenger replies will not be sent until this is configured.');
}

// Helper to send a message back to Facebook Messenger
async function sendMessengerMessage(recipientId: string, text: string) {
  if (!FB_PAGE_ACCESS_TOKEN) {
    console.error('FB_PAGE_ACCESS_TOKEN is missing. Cannot send Messenger message.');
    return;
  }

  const url = `https://graph.facebook.com/v17.0/me/messages?access_token=${encodeURIComponent(
    FB_PAGE_ACCESS_TOKEN
  )}`;

  const payload = {
    recipient: { id: recipientId },
    message: { text },
  };

  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const errorText = await res.text().catch(() => 'Unable to read error body');
    console.error('Failed to send Messenger message', res.status, errorText);
  }
}

// GET: Webhook verification
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  console.log("🚀 ~ GET ~ searchParams:", searchParams)

  const mode = searchParams.get('hub.mode');
  const token = searchParams.get('hub.verify_token');
  const challenge = searchParams.get('hub.challenge');

  if (mode === 'subscribe' && token === FB_VERIFY_TOKEN) {
    return new NextResponse(challenge ?? '', { status: 200 });
  }

  return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
}

// POST: Handle incoming Messenger messages
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    console.log("🚀 ~ POST ~ body:", body)

    let senderId: string | undefined;
    let messageText: string | undefined;

    // Format 1: Standard Messenger Page webhook
    if (body.object === 'page' && Array.isArray(body.entry)) {
      for (const entry of body.entry as any[]) {
        const messagingEvents = entry.messaging || [];

        for (const event of messagingEvents) {
          const eventSenderId = event?.sender?.id;
          const eventMessageText: string | undefined = event?.message?.text;

          if (eventSenderId && eventMessageText) {
            senderId = eventSenderId;
            messageText = eventMessageText;
            break;
          }
        }

        if (senderId && messageText) break;
      }
    }

    // Format 2: field/value style payload (e.g. dashboard test)
    if (!senderId && !messageText && body.field === 'messages' && body.value) {
      senderId = body.value?.sender?.id;
      messageText = body.value?.message?.text;
    }

    if (!senderId || !messageText) {
      return NextResponse.json({ status: 'no_message' }, { status: 200 });
    }

    const workflow: WorkflowInput = { input_as_text: messageText };

    // Use the existing chat processing logic directly
    const result = await processChatRequest(workflow, 0);

    const replyText: string =
      typeof result?.response === 'string'
        ? result.response
        : 'Thank you for your message. We will get back to you shortly.';

    await sendMessengerMessage(senderId, replyText);

    return NextResponse.json({ status: 'ok' }, { status: 200 });
  } catch (error: any) {
    console.error('Messenger webhook error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}


