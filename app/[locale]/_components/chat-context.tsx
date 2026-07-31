'use client';

import { createContext, useContext, useRef, useState, type ReactNode } from 'react';

export interface ChatMessage {
  role: 'user' | 'model';
  content: string;
}

const GREETINGS: Record<string, string> = {
  en: "Hi! I'm Hawoon's AI assistant. Ask me anything about his work, projects, or background.",
  ko: '안녕하세요! 하운님의 AI 어시스턴트입니다. 하는 일, 프로젝트, 경력에 대해 무엇이든 물어보세요.',
};

const greeting = (locale: string): ChatMessage => ({
  role: 'model',
  content: GREETINGS[locale] ?? GREETINGS.en,
});

interface ChatContextValue {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  messages: ChatMessage[];
  setMessages: React.Dispatch<React.SetStateAction<ChatMessage[]>>;
  input: string;
  setInput: (input: string) => void;
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
  inputRef: React.RefObject<HTMLInputElement | null>;
  locale: string;
}

const ChatContext = createContext<ChatContextValue>({
  isOpen: false,
  setIsOpen: () => {},
  messages: [greeting('en')],
  setMessages: () => {},
  input: '',
  setInput: () => {},
  isLoading: false,
  setIsLoading: () => {},
  inputRef: { current: null },
  locale: 'en',
});

export const useChatContext = () => useContext(ChatContext);

export function ChatProvider({
  children,
  locale = 'en',
}: {
  children: ReactNode;
  locale?: string;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>(() => [greeting(locale)]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <ChatContext.Provider
      value={{ isOpen, setIsOpen, messages, setMessages, input, setInput, isLoading, setIsLoading, inputRef, locale }}
    >
      {children}
    </ChatContext.Provider>
  );
}
