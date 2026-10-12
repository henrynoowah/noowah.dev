import { t, type Dictionary } from 'intlayer';

const metadataContent = {
  key: 'metadata',
  content: {
    title: t({ en: 'NOOWAH — Hawoon Joh', ko: 'NOOWAH — 조하운' }),
    description: t({
      en: 'Hawoon Joh (NOOWAH), product engineer in Seoul: frontend, platform, and everything between.',
      ko: '서울의 프로덕트 엔지니어 조하운(NOOWAH). 프론트엔드부터 플랫폼까지.',
    }),
    aboutTitle: t({ en: 'About | Hawoon Joh', ko: '소개 | 조하운' }),
    aboutDescription: t({
      en: "Hawoon Joh's responsibilities, experience, working principles, and selected work.",
      ko: '조하운의 담당 업무, 경력, 일하는 원칙, 주요 프로젝트.',
    }),
    cmsTitle: t({
      en: 'Synolink CMS case study | Hawoon Joh',
      ko: 'Synolink CMS 케이스 스터디 | 조하운',
    }),
    cmsDescription: t({
      en: 'Case study of cms.synolink.ai, the visual web builder whose client development Hawoon Joh leads.',
      ko: '조하운이 클라이언트 개발을 총괄하는 비주얼 웹 빌더 cms.synolink.ai의 케이스 스터디.',
    }),
    sideTitle: t({
      en: 'Side projects | Hawoon Joh',
      ko: '사이드 프로젝트 | 조하운',
    }),
    sideDescription: t({
      en: 'Side projects by Hawoon Joh, including content-builder, the personal project that became the core of the Synolink CMS web builder.',
      ko: '조하운의 사이드 프로젝트. 개인 프로젝트로 시작해 Synolink CMS 웹 빌더의 핵심이 된 content-builder를 포함합니다.',
    }),
  },
} satisfies Dictionary;

export default metadataContent;
