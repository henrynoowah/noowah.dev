import { t, type Dictionary } from 'intlayer';

/** Chrome for the home page and the header. Facts live in about.content.ts. */
const homePageContent: Dictionary = {
  key: 'home-page',
  content: {
    home: {
      title: t({ en: 'Home', ko: '홈' }),
    },
    hero: {
      name: 'NOOWAH',
      role: t({ en: 'Product Engineer', ko: '프로덕트 엔지니어' }),
      scope: t({
        en: 'Frontend, platform, and everything between.',
        ko: '프론트엔드부터 플랫폼, 그 사이의 모든 것까지.',
      }),
      srName: t({
        en: 'Hawoon Joh, Product Engineer',
        ko: '조하운, 프로덕트 엔지니어',
      }),
    },
    cover: {
      kind: t({ en: 'Portfolio', ko: '포트폴리오' }),
      unit: t({ en: 'Hawoon Joh · Seoul', ko: '조하운 · 서울' }),
      partLabel: t({
        en: 'Ask about my work, projects, or background',
        ko: '경력과 프로젝트에 대해 물어보세요',
      }),
      ownsLabel: t({ en: 'Work', ko: '주요 업무' }),
      owns: {
        platform: {
          name: 'icloudhospital.com',
          role: t({ en: 'frontend + platform', ko: '프론트엔드 + 플랫폼' }),
        },
        cms: {
          name: 'cms.synolink.ai',
          role: t({ en: 'client development lead', ko: '클라이언트 개발 총괄' }),
        },
        suite: {
          name: 'synolink.ai',
          role: t({ en: 'product owner', ko: 'PO' }),
        },
      },
      contents: t({ en: 'Menu', ko: '메뉴' }),
      index: {
        box: t({ en: 'About', ko: '소개' }),
        steps: t({ en: 'Experience', ko: '경력' }),
        works: t({ en: 'Works', ko: '프로젝트' }),
        side: t({ en: 'Side projects', ko: '사이드 프로젝트' }),
        help: t({ en: 'Contact', ko: '연락처' }),
      },
      helpAsk: t({
        en: 'Ask the AI assistant',
        ko: 'AI 어시스턴트에게 물어보기',
      }),
      helpEmail: t({ en: 'Email', ko: '이메일' }),
    },
    posts: {
      title: t({ en: 'Writing', ko: '글' }),
    },
    about: {
      title: t({ en: 'About', ko: '소개' }),
    },
    projects: {
      title: t({ en: 'Projects', ko: '프로젝트' }),
    },
    github: {
      title: t({ en: 'GitHub', ko: '깃허브' }),
    },
    chat: {
      title: t({ en: 'Ask the AI assistant', ko: 'AI 어시스턴트에게 물어보기' }),
    },
    nav: {
      label: t({ en: 'Site', ko: '사이트' }),
      steps: t({ en: 'Sections', ko: '섹션' }),
      menu: t({ en: 'Menu', ko: '메뉴' }),
      close: t({ en: 'Close', ko: '닫기' }),
      portfolio: t({ en: 'Portfolio', ko: '포트폴리오' }),
      works: t({ en: 'Works', ko: '프로젝트' }),
      side: t({ en: 'Side projects', ko: '사이드 프로젝트' }),
      theme: t({ en: 'Toggle dark mode', ko: '다크 모드 전환' }),
      language: t({ en: 'Language', ko: '언어' }),
    },
  },
} satisfies Dictionary;

export default homePageContent;
