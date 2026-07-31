// node --experimental-strip-types --test lib/sse.test.ts
import assert from 'node:assert/strict';
import test from 'node:test';
import { sseToText } from './sse.ts';

const encoder = new TextEncoder();

/** A source stream of the given chunks, optionally throwing at the end. */
const source = (chunks: string[], throwAtEnd = false) =>
  new ReadableStream<Uint8Array>({
    start(controller) {
      for (const c of chunks) controller.enqueue(encoder.encode(c));
      if (throwAtEnd) controller.error(new Error('connection reset'));
      else controller.close();
    },
  });

const drain = async (stream: ReadableStream<Uint8Array>) => {
  let out = '';
  const decoder = new TextDecoder();
  const reader = stream.getReader();
  for (;;) {
    const { done, value } = await reader.read();
    if (done) break;
    out += decoder.decode(value, { stream: true });
  }
  return out;
};

/** The thing under test: fake SSE bytes in, assistant text out. */
const run = (chunks: string[], throwAtEnd = false) =>
  drain(sseToText(source(chunks, throwAtEnd)));

const delta = (content: string, finish_reason: string | null = null) =>
  `data: ${JSON.stringify({ choices: [{ delta: { content }, finish_reason }] })}\n\n`;

test('concatenates deltas, ignoring keepalives and split lines', async () => {
  const full = delta('world');
  const out = await run([
      ': OPENROUTER PROCESSING\n\n',
      delta('hello '),
      // Same line arriving in two pieces — must not be dropped or duplicated.
      full.slice(0, 20),
      full.slice(20),
      'data: [DONE]\n\n',
  ]);
  assert.equal(out, 'hello world');
});

test('an upstream drop rejects instead of closing cleanly', async () => {
  // The regression guard: this is the bug where a mid-stream failure looked like
  // a finished answer, leaving half a sentence on screen with no error.
  await assert.rejects(
    () => run([delta('half a sen')], true),
    /Something went wrong/
  );
});

test('mid-stream error after a 200 rejects', async () => {
  await assert.rejects(
    () =>
      run([delta('starting'), `data: ${JSON.stringify({ error: { message: 'upstream died' } })}\n\n`]),
    /Something went wrong/
  );
});

test('hitting max_tokens keeps the text and says it was cut off', async () => {
  const out = await run([delta('a long answer that ran ou'), delta('t', 'length')]);
  assert.match(out, /^a long answer that ran out\n\n_\(cut off/);
});
