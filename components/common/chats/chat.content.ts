import { t, type Dictionary } from 'intlayer';

/** Chat panel chrome. The greeting lives in chat-context.tsx. */
const chatContent = {
  key: 'chat',
  content: {
    title: t({ en: 'AI assistant', ko: 'AI 어시스턴트' }),
    subtitle: t({
      en: "Answers are based on this site's content.",
      ko: '이 사이트의 내용을 바탕으로 답합니다.',
    }),
    suggestions: {
      work: t({ en: 'What does he work on?', ko: '어떤 일을 하나요?' }),
      name: t({ en: "What's NOOWAH mean?", ko: 'NOOWAH는 무슨 뜻인가요?' }),
      path: t({
        en: 'How did he get into engineering?',
        ko: '어떻게 엔지니어가 되었나요?',
      }),
    },
    placeholder: t({ en: 'Ask anything…', ko: '무엇이든 물어보세요…' }),
    inputLabel: t({ en: 'Your question', ko: '질문' }),
    send: t({ en: 'Send', ko: '보내기' }),
    close: t({ en: 'Close', ko: '닫기' }),
    thinking: t({ en: 'Thinking…', ko: '생각 중…' }),
    scrollDown: t({ en: 'Scroll to latest', ko: '최신 메시지로' }),
  },
} satisfies Dictionary;

export default chatContent;
