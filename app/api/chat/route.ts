import { NextRequest, NextResponse } from 'next/server';
import { buildSystemPrompt } from '@/lib/bio';

interface ChatMessage {
  role: 'user' | 'model';
  content: string;
}

// The system prompt now carries the full about page, so an unbounded history
// would grow every request without limit.
const MAX_HISTORY = 12;

const DEFAULT_MODEL = 'cohere/north-mini-code:free';

export async function POST(req: NextRequest) {
  const apiKey = process.env.OPENROUTER_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ error: 'OPENROUTER_API_KEY not configured' }, { status: 500 });
  }

  const { messages, locale }: { messages: ChatMessage[]; locale?: string } =
    await req.json();
  if (!messages?.length) {
    return NextResponse.json({ error: 'No messages provided' }, { status: 400 });
  }

  const openaiMessages = [
    { role: 'system', content: buildSystemPrompt(locale === 'ko' ? 'ko' : 'en') },
    ...messages.slice(-MAX_HISTORY).map((m) => ({
      role: m.role === 'model' ? 'assistant' : 'user',
      content: m.content,
    })),
  ];

  const res = await fetch('https://openrouter.ai/api/v1/chat/completions', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: process.env.OPENROUTER_MODEL || DEFAULT_MODEL,
      messages: openaiMessages,
      stream: true,
    }),
  });

  if (!res.ok || !res.body) {
    const err = await res.json().catch(() => ({}));
    console.error('[/api/chat] OpenRouter error:', err);
    const status = res.status === 429 ? 429 : 500;
    const userMessage =
      status === 429
        ? 'Rate limit reached. Please wait a moment and try again.'
        : 'Something went wrong. Please try again.';
    return NextResponse.json({ error: userMessage }, { status });
  }

  // Forward the SSE stream, extracting just the text deltas
  const stream = new ReadableStream({
    async start(controller) {
      const reader = res.body!.getReader();
      const decoder = new TextDecoder();
      let buffer = '';
      let errored = false;

      try {
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          buffer += decoder.decode(value, { stream: true });
          const lines = buffer.split('\n');
          buffer = lines.pop() ?? '';

          for (const line of lines) {
            if (!line.startsWith('data: ')) continue;
            const data = line.slice(6).trim();
            if (data === '[DONE]') return;
            try {
              const json = JSON.parse(data);
              if (json.error) {
                // Provider can fail mid-stream after already sending a 200 —
                // surface it as a stream error so the client's catch block
                // shows a real message instead of silently going nowhere.
                console.error('[/api/chat] mid-stream error:', json.error);
                errored = true;
                controller.error(new Error('Something went wrong. Please try again.'));
                return;
              }
              const delta = json.choices?.[0]?.delta?.content;
              if (delta) controller.enqueue(new TextEncoder().encode(delta));
            } catch {
              // skip malformed chunks
            }
          }
        }
      } finally {
        if (!errored) controller.close();
      }
    },
  });

  return new Response(stream, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
}
