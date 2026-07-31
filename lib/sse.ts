/**
 * Turns OpenRouter's SSE response into a plain text stream of the assistant's
 * words, so the client can just read bytes.
 *
 * The whole point of this file is failing loudly. A provider can drop the
 * connection, or send an error, *after* it has already returned 200 and streamed
 * half an answer — routine on free tiers. Every one of those paths has to end in
 * `controller.error`, because a stream that closes normally is indistinguishable
 * from a finished answer, and the reader is left showing half a sentence.
 */

const ERROR_MESSAGE = 'Something went wrong. Please try again.';

/** Shown in place of the words the model never got to say. */
const TRUNCATED_NOTE = '\n\n_(cut off — ask me to continue)_';

const encoder = new TextEncoder();

export function sseToText(
  body: ReadableStream<Uint8Array>
): ReadableStream<Uint8Array> {
  return new ReadableStream({
    async start(controller) {
      const reader = body.getReader();
      const decoder = new TextDecoder();
      const send = (text: string) => controller.enqueue(encoder.encode(text));

      let buffer = '';
      let errored = false;

      const fail = (cause: unknown) => {
        console.error('[sse] stream failed:', cause);
        errored = true;
        controller.error(new Error(ERROR_MESSAGE));
      };

      try {
        reading: while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          buffer += decoder.decode(value, { stream: true });
          const lines = buffer.split('\n');
          // Last element is whatever came before the next newline arrives — a
          // `data:` line can straddle two chunks.
          buffer = lines.pop() ?? '';

          for (const line of lines) {
            // Skips blank separators and `: OPENROUTER PROCESSING` keepalives.
            if (!line.startsWith('data: ')) continue;
            const data = line.slice(6).trim();
            if (data === '[DONE]') break reading;

            let json;
            try {
              json = JSON.parse(data);
            } catch {
              continue; // malformed chunk, not worth killing the answer over
            }

            if (json.error) return fail(json.error);

            const choice = json.choices?.[0];
            const delta = choice?.delta?.content;
            if (delta) send(delta);

            // finish_reason is the only signal for a mid-stream provider failure,
            // and for hitting max_tokens. Both used to look like success.
            if (choice?.finish_reason === 'error') return fail(choice);
            if (choice?.finish_reason === 'length') {
              send(TRUNCATED_NOTE);
              break reading;
            }
          }
        }
      } catch (cause) {
        // Without this catch, an upstream drop fell straight through to `finally`
        // and closed the stream cleanly. That was the silent-truncation bug.
        return fail(cause);
      } finally {
        if (!errored) controller.close();
      }
    },
  });
}
