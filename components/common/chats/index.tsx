'use client';

import { cn } from '@/lib/utils';
import { motion } from 'motion/react';
import { useEffect } from 'react';
import { IconArrowUp, IconX } from '@tabler/icons-react';
import { getIntlayer } from 'intlayer';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { useChatContext } from '@/app/[locale]/_components/chat-context';
import {
  Conversation,
  ConversationContent,
  ConversationScrollButton,
} from '@/components/ui/conversation';
import { Message, MessageContent } from '@/components/ui/message';
import { ShimmeringText } from '@/components/ui/shimmering-text';

import type { ChatMessage } from '@/app/[locale]/_components/chat-context';

// FloatingChat mounts above the pages' IntlayerClientProvider, so read the
// dictionary directly for the chat's own locale instead of via useIntlayer.
const useChatCopy = (locale: string) =>
  getIntlayer('chat', locale as Parameters<typeof getIntlayer>[1]);

const MarkdownContent = ({ content }: { content: string }) => (
  <ReactMarkdown
    remarkPlugins={[remarkGfm]}
    components={{
      p: ({ children }) => <p className="mb-1 last:mb-0">{children}</p>,
      ul: ({ children }) => (
        <ul className="list-disc pl-4 mb-1 space-y-0.5">{children}</ul>
      ),
      ol: ({ children }) => (
        <ol className="list-decimal pl-4 mb-1 space-y-0.5">{children}</ol>
      ),
      li: ({ children }) => <li className="leading-snug">{children}</li>,
      strong: ({ children }) => (
        <strong className="font-semibold">{children}</strong>
      ),
      code: ({ children, className }) => {
        const isBlock = className?.includes('language-');
        return isBlock ? (
          <pre className="my-1 overflow-x-auto border-[length:var(--stroke)] border-ink px-2 py-1.5 font-mono text-xs">
            <code>{children}</code>
          </pre>
        ) : (
          <code className="border-[length:var(--stroke)] border-ink px-1 py-0.5 font-mono text-xs">
            {children}
          </code>
        );
      },
      a: ({ href, children }) => (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="font-semibold underline decoration-[length:var(--stroke)] underline-offset-2 hover:decoration-[3px]"
        >
          {children}
        </a>
      ),
      table: ({ children }) => (
        <div className="mb-1 overflow-x-auto border-[length:var(--stroke)] border-ink">
          <table className="w-full text-xs border-collapse">{children}</table>
        </div>
      ),
      thead: ({ children }) => (
        <thead className="border-b-[length:var(--stroke)] border-ink">{children}</thead>
      ),
      tr: ({ children }) => (
        <tr className="border-b border-dashed border-ink last:border-0">
          {children}
        </tr>
      ),
      th: ({ children }) => (
        <th className="px-2 py-1 text-left font-semibold whitespace-nowrap">
          {children}
        </th>
      ),
      td: ({ children }) => (
        <td className="px-2 py-1 align-top">{children}</td>
      ),
    }}
  >
    {content}
  </ReactMarkdown>
);

const ChatBoxContent = ({ onClose }: { onClose?: () => void }) => {
  const {
    messages,
    setMessages,
    input,
    setInput,
    isLoading,
    setIsLoading,
    inputRef,
    locale,
  } = useChatContext();
  const copy = useChatCopy(locale);
  const suggestions = Object.values(copy.suggestions) as string[];
  // The greeting is always message 0, so "fresh" means nothing sent yet.
  const isFresh = messages.every(m => m.role === 'model');

  useEffect(() => {
    setTimeout(() => inputRef.current?.focus(), 100);
  }, [inputRef]);

  const sendMessage = async (override?: string) => {
    const text = (override ?? input).trim();
    if (!text || isLoading) return;

    const userMessage: ChatMessage = { role: 'user', content: text };
    const nextMessages = [...messages, userMessage];
    setMessages(nextMessages);
    setInput('');
    setIsLoading(true);

    setMessages(prev => [...prev, { role: 'model', content: '' }]);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: nextMessages, locale }),
      });

      if (!res.ok) {
        const { error } = await res
          .json()
          .catch(() => ({ error: 'Something went wrong.' }));
        throw new Error(error);
      }

      const reader = res.body!.getReader();
      const decoder = new TextDecoder();

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        const chunk = decoder.decode(value, { stream: true });
        setMessages(prev => {
          const updated = [...prev];
          updated[updated.length - 1] = {
            role: 'model',
            content: updated[updated.length - 1].content + chunk,
          };
          return updated;
        });
      }
    } catch (err) {
      const msg =
        err instanceof Error ? err.message : 'Sorry, something went wrong.';
      setMessages(prev => {
        const updated = [...prev];
        updated[updated.length - 1] = { role: 'model', content: msg };
        return updated;
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex h-full flex-col bg-panel text-ink">
      {/* Header */}
      <div className="flex items-start justify-between gap-4 border-b-[length:var(--stroke)] border-ink px-4 py-3">
        <div>
          <p className="text-base font-bold leading-tight">{copy.title}</p>
          <p className="text-xs leading-snug">{copy.subtitle}</p>
        </div>
        {onClose && (
          <button
            type="button"
            onClick={onClose}
            aria-label={String(copy.close)}
            className="grid size-8 shrink-0 place-items-center border-[length:var(--stroke)] border-ink hover:bg-ink hover:text-paper"
          >
            <IconX className="size-4" stroke={1.75} />
          </button>
        )}
      </div>

      {/* Messages */}
      <Conversation className="flex-1">
        <ConversationContent className="space-y-1">
          {messages.map((msg, i) => (
            <Message key={i} from={msg.role === 'user' ? 'user' : 'assistant'}>
              <MessageContent>
                {msg.role === 'model' && !msg.content && isLoading ? (
                  <ShimmeringText text={String(copy.thinking)} duration={1.5} />
                ) : msg.role === 'model' ? (
                  <MarkdownContent content={msg.content} />
                ) : (
                  msg.content
                )}
              </MessageContent>
            </Message>
          ))}
        </ConversationContent>
        <ConversationScrollButton
          className="bottom-2"
          aria-label={String(copy.scrollDown)}
        />
      </Conversation>

      {/* Suggestions — shown until the visitor sends their first message */}
      {isFresh && (
        <div className="flex flex-wrap gap-2 px-4 pb-3">
          {suggestions.map(text => (
            <button
              key={text}
              type="button"
              onClick={() => sendMessage(text)}
              disabled={isLoading}
              className="border-[length:var(--stroke)] border-ink px-2.5 py-1.5 text-left text-sm font-medium leading-tight hover:bg-ink hover:text-paper disabled:border-dashed"
            >
              {text}
            </button>
          ))}
        </div>
      )}

      {/* Input */}
      <form
        className="flex border-t-[length:var(--stroke)] border-ink"
        onSubmit={e => {
          e.preventDefault();
          sendMessage();
        }}
      >
        <input
          ref={inputRef}
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder={String(copy.placeholder)}
          aria-label={String(copy.inputLabel)}
          disabled={isLoading}
          className="min-w-0 flex-1 bg-paper px-4 py-3 text-base outline-none placeholder:text-ink placeholder:opacity-60 focus-visible:outline-none disabled:opacity-60"
        />
        <button
          type="submit"
          disabled={isLoading || !input.trim()}
          aria-label={String(copy.send)}
          className="grid w-12 shrink-0 place-items-center border-l-[length:var(--stroke)] border-ink bg-ink text-paper hover:bg-paper hover:text-ink disabled:bg-paper disabled:text-ink disabled:opacity-50"
        >
          <IconArrowUp className="size-5" stroke={2} />
        </button>
      </form>
    </div>
  );
};

interface ChatBoxParams {
  isOpen: boolean;
  onClose?: () => void;
}

const ChatBox = ({ isOpen, onClose }: ChatBoxParams) => {
  return (
    <motion.div
      className={cn(
        'w-[calc(100vw-3rem)] sm:w-[400px] max-w-full h-[60vh] sm:h-[500px] max-h-full end-0 overflow-hidden border-[length:var(--stroke)] border-ink bg-panel shadow-[0_18px_40px_-18px_rgb(0_0_0/0.45)]',
        // Full screen on mobile so the on-screen keyboard doesn't crush the chat into a sliver
        'max-sm:!fixed max-sm:!inset-0 max-sm:!w-full max-sm:!h-dvh max-sm:!max-h-dvh max-sm:!rounded-none',
        isOpen ? 'pointer-events-auto' : 'pointer-events-none'
      )}
      initial={{ opacity: 0, y: 24 }}
      animate={isOpen ? 'open' : 'closed'}
      variants={{
        open: () => ({
          y: 0,
          opacity: 1,
          transition: { ease: [0.16, 1, 0.3, 1], duration: 0.45 },
        }),
        closed: () => ({
          y: 24,
          opacity: 0,
          transition: { ease: 'easeIn', duration: 0.2 },
        }),
      }}
    >
      {isOpen && <ChatBoxContent onClose={onClose} />}
    </motion.div>
  );
};

export { ChatBox, ChatBoxContent };
