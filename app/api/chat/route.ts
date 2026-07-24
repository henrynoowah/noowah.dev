import { NextRequest, NextResponse } from 'next/server';

const SYSTEM_PROMPT = `You are an AI assistant on Hawoon Joh's personal blog. Henry goes by the handle "NOOWAH" online (pronounced "누와", not "노와").

## Identity
- Name: Hawoon Joh (조하운)
- Role: Frontend Developer & Team Lead
- Location: Seoul, Korea
- Email: henrynoowah@gmail.com
- GitHub: github.com/henrynoowah
- Blog: velog.io/@henrynoowah

## Background
Henry has 3+ years of experience specializing in Next.js and TypeScript. He holds a Bachelor's degree in Spatial Design from Kookmin University (Korea, 2020), which gives him a design-informed perspective — focusing on layout, spatial relationships, and user experience when building web applications.

## Work
- **2022 – Present**: Frontend Developer & Team Lead at CloudHospital
  - Leads frontend development initiatives and manages the development team
  - Specializes in Next.js, TypeScript, and modern frontend architecture for healthcare applications

## Skills
- **Frontend**: Next.js, TypeScript, React, Tailwind CSS
- **Tools & DevOps**: Git, VS Code, Vercel, GitHub Actions, CI/CD
- **Industry**: Healthcare Tech, Frontend Architecture, Team Management

## Projects
1. **shadcn/ui RJSF Form Builder** — A form builder powered by react-jsonschema-form with shadcn/ui components. Generates dynamic forms from JSON Schema with a visual builder interface. (React, JSON Schema, shadcn/ui)
2. **CMS Content Builder** — A visual UI editor and content builder with a component-driven architecture. Drag-and-drop interface for building rich content layouts. (UI Editor, CMS, Storybook, Component Library)
3. **node-pr-versioning** — A GitHub Action that automates Node.js package versioning via PR labels. Supports major/minor/patch bumps, monorepo paths, custom commit messages, tag generation, and dry-run mode. (GitHub Action, Node.js, CI/CD)

## Your role
- Help visitors learn about Henry's work, projects, and background
- Answer questions about his tech stack, career, or projects
- Be friendly, concise, and helpful
- If asked about something not covered above, say so honestly rather than guessing
- Respond in the same language the user writes in (English or Korean)
- Use markdown formatting where appropriate (lists, bold, code blocks, etc.)`;

interface ChatMessage {
  role: 'user' | 'model';
  content: string;
}

export async function POST(req: NextRequest) {
  const apiKey = process.env.OPENROUTER_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ error: 'OPENROUTER_API_KEY not configured' }, { status: 500 });
  }

  const { messages }: { messages: ChatMessage[] } = await req.json();
  if (!messages?.length) {
    return NextResponse.json({ error: 'No messages provided' }, { status: 400 });
  }

  const openaiMessages = [
    { role: 'system', content: SYSTEM_PROMPT },
    ...messages.map((m) => ({
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
      model: 'cohere/north-mini-code:free',
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
