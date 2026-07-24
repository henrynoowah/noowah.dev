import { t, type Dictionary } from 'intlayer';

const homePageContent: Dictionary = {
  key: 'home-page',
  content: {
    home: {
      title: t({
        en: 'Home',
        ko: '홈',
      }),
    },
    hero: {
      name: 'NOOWAH',
      role: t({
        en: 'Frontend Developer',
        ko: '프론트엔드 개발자',
      }),
    },
    posts: {
      title: t({
        en: 'Posts',
        ko: '포스트',
      }),
    },
    about: {
      title: t({
        en: 'About',
        ko: '소개',
      }),
    },
    works: {
      title: t({
        en: 'Works',
        ko: '작업',
      }),
    },
    projects: {
      title: t({
        en: 'Projects',
        ko: '프로젝트',
      }),
    },
    github: {
      title: t({
        en: 'GitHub',
        ko: '깃허브',
      }),
    },
    chat: {
      title: t({
        en: 'Chat',
        ko: '채팅',
      }),
    },
    nav: {
      menu: t({ en: 'Menu', ko: '메뉴' }),
      close: t({ en: 'Close', ko: '닫기' }),
      portfolio: t({ en: 'Portfolio', ko: '포트폴리오' }),
    },
  },
} satisfies Dictionary;

export default homePageContent;
