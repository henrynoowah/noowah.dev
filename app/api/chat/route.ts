import { NextRequest, NextResponse } from 'next/server';
import { buildSystemPrompt } from '@/lib/bio';
import { sseToText } from '@/lib/sse';

interface ChatMessage {
  role: 'user' | 'model';
  content: string;
}

// The system prompt now carries the full about page, so an unbounded history
// would grow every request without limit.
const MAX_HISTORY = 12;

/**
 * Free prose models, best first. OpenRouter walks the list when one is
 * rate-limited or down, which on `:free` happens most days. Three rules when
 * editing it:
 *
 * 1. Every ID must be valid. An unknown ID is a hard 400 for the whole request,
 *    not a skip — the fallback only covers *runtime* failures.
 * 2. No reasoning models. `reasoning: { exclude: true }` merely hides the
 *    reasoning; the tokens still count against max_tokens. Measured:
 *    ling-3.0-flash spent 1315 of 1500 tokens thinking and returned "".
 * 3. OpenRouter rejects more than MAX_CHAIN entries, so adding a fourth here
 *    silently costs the OPENROUTER_MODEL override its slot.
 */
const MODELS = [
  'google/gemma-4-26b-a4b-it:free',
  'google/gemma-4-31b-it:free',
  // Code model, so it garbles long-form Korean — last resort only, but it is
  // the one that is always up.
  'cohere/north-mini-code:free',
];

/** OpenRouter's hard limit: `'models' array must have 3 items or fewer.` */
const MAX_CHAIN = 3;

const MAX_TOKENS = 500;

// Under maxDuration, so we return a real message instead of being killed.
const UPSTREAM_TIMEOUT_MS = 55_000;

export const maxDuration = 60;

const GENERIC_ERROR = 'Something went wrong. Please try again.';

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

  const override = process.env.OPENROUTER_MODEL;
  const chain = [...new Set(override ? [override, ...MODELS] : MODELS)].slice(
    0,
    MAX_CHAIN
  );

  let res: Response;
  try {
    res = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        models: chain,
        messages: openaiMessages,
        max_tokens: MAX_TOKENS,
        stream: true,
      }),
      signal: AbortSignal.timeout(UPSTREAM_TIMEOUT_MS),
    });
  } catch (err) {
    // Timeout or network failure. Without this the function would hang until the
    // platform killed it, and the client would spin on "Thinking…" forever.
    console.error('[/api/chat] upstream unreachable:', err);
    return NextResponse.json({ error: GENERIC_ERROR }, { status: 504 });
  }

  if (!res.ok || !res.body) {
    const err = await res.json().catch(() => ({}));
    console.error('[/api/chat] OpenRouter error:', err);
    const status = res.status === 429 ? 429 : 500;
    const userMessage =
      status === 429
        ? 'Rate limit reached. Please wait a moment and try again.'
        : GENERIC_ERROR;
    return NextResponse.json({ error: userMessage }, { status });
  }

  return new Response(sseToText(res.body), {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
}
