'use client';

import { cn } from '@/lib/utils';
import { motion } from 'motion/react';
import { useEffect } from 'react';
import { IconSend, IconX } from '@tabler/icons-react';
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
          <pre className="bg-black/20 rounded px-2 py-1.5 text-xs overflow-x-auto my-1">
            <code>{children}</code>
          </pre>
        ) : (
          <code className="bg-black/20 rounded px-1 py-0.5 text-xs font-mono">
            {children}
          </code>
        );
      },
      a: ({ href, children }) => (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="underline underline-offset-2 hover:opacity-80"
        >
          {children}
        </a>
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
  } = useChatContext();

  useEffect(() => {
    setTimeout(() => inputRef.current?.focus(), 100);
  }, [inputRef]);

  const sendMessage = async () => {
    const text = input.trim();
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
        body: JSON.stringify({ messages: nextMessages }),
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
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-primary/20">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
          <span className="text-sm font-semibold">AI Assistant</span>
        </div>
        {onClose && (
          <button
            onClick={onClose}
            className="p-1 rounded-full hover:bg-primary/20 transition-colors"
          >
            <IconX className="size-4" />
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
                  <ShimmeringText text="Thinking..." duration={1.5} />
                ) : msg.role === 'model' ? (
                  <MarkdownContent content={msg.content} />
                ) : (
                  msg.content
                )}
              </MessageContent>
            </Message>
          ))}
        </ConversationContent>
        <ConversationScrollButton className="bottom-2" />
      </Conversation>

      {/* Input */}
      <div className="px-4 py-3 border-t border-primary/20 flex gap-2">
        <input
          ref={inputRef}
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && !e.shiftKey && sendMessage()}
          placeholder="Ask me anything..."
          disabled={isLoading}
          className="flex-1 bg-primary/20 rounded-full px-4 py-2 text-base outline-none placeholder:text-foreground/40 disabled:opacity-50"
        />
        <button
          onClick={sendMessage}
          disabled={isLoading || !input.trim()}
          className="p-2 rounded-full bg-primary text-primary-foreground disabled:opacity-40 transition-opacity hover:opacity-80"
        >
          <IconSend className="size-4" />
        </button>
      </div>
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
        'w-[calc(100vw-3rem)] sm:w-[400px] max-w-full h-[60vh] sm:h-[480px] max-h-full bg-primary/20 end-0 rounded-[24px] shadow-xl backdrop-filter backdrop-blur-lg overflow-hidden',
        isOpen ? 'pointer-events-auto' : 'pointer-events-none'
      )}
      initial={{ opacity: 0 }}
      animate={isOpen ? 'open' : 'closed'}
      variants={{
        open: () => ({
          y: 0,
          opacity: 100,
          transition: { ease: 'easeInOut', duration: 0.5 },
        }),
        closed: () => ({
          y: 80,
          opacity: 0,
          transition: { ease: 'easeOut', duration: 0.5 },
        }),
      }}
    >
      {isOpen && <ChatBoxContent onClose={onClose} />}
    </motion.div>
  );
};

export { ChatBox, ChatBoxContent };
