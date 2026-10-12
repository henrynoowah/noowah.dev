import { t, type Dictionary } from 'intlayer';

/**
 * Side projects. Everything outside `ui` is fact: lib/bio.ts feeds it to the
 * chat bot and /llms.txt, and About's Works section reads its teaser from
 * here, so the page, the teaser and the assistant never disagree.
 *
 * Sources: content-builder becoming the core of cms.synolink.ai was confirmed
 * by Hawoon; the form builder's listing is in birobirobiro/awesome-shadcn-ui.
 * URLs live in the facts so the bot may share them verbatim.
 */
const sideProjectsContent: Dictionary = {
  key: 'side-projects',
  content: {
    ui: {
      title: t({ en: 'Side projects', ko: '사이드 프로젝트' }),
      steps: {
        overview: t({ en: 'Overview', ko: '개요' }),
        contentBuilder: t({ en: 'content-builder', ko: 'content-builder' }),
        formBuilder: t({ en: 'Form Builder', ko: '폼 빌더' }),
        prVersioning: t({ en: 'node-pr-versioning', ko: 'node-pr-versioning' }),
        contact: t({ en: 'Contact', ko: '연락처' }),
      },
      lead: t({
        en: 'Tools I build on my own time. One of them became the core of a company product.',
        ko: '개인 시간에 만드는 도구들. 그중 하나는 회사 제품의 핵심이 되었습니다.',
      }),
      principle: t({
        en: 'Build the tool that builds the thing.',
        ko: '만들 것을 만들어 주는 도구를 만듭니다.',
      }),
      origin: t({
        en: 'From personal project to the core of Synolink CMS',
        ko: '개인 프로젝트에서 Synolink CMS의 핵심으로',
      }),
      drawingTitle: t({
        en: 'content-builder starts as a single personal project, then becomes the core layer of the cms.synolink.ai stack.',
        ko: '개인 프로젝트였던 content-builder가 cms.synolink.ai 스택의 핵심 레이어가 되는 과정.',
      }),
      drawingPersonal: t({ en: 'Personal project', ko: '개인 프로젝트' }),
      drawingProduct: 'cms.synolink.ai',
      drawingCore: t({ en: 'Core', ko: '핵심' }),
      features: t({ en: 'What it does', ko: '주요 기능' }),
      demo: t({ en: 'Live demo', ko: '데모' }),
      github: 'GitHub',
      marketplace: t({ en: 'GitHub Marketplace', ko: 'GitHub Marketplace' }),
      listing: t({ en: 'awesome-shadcn-ui listing', ko: 'awesome-shadcn-ui 목록' }),
      caseStudy: t({
        en: 'Read the Synolink CMS case study',
        ko: 'Synolink CMS 케이스 스터디 보기',
      }),
      contactTitle: t({
        en: 'Want to talk about any of these?',
        ko: '이 프로젝트들에 대해 이야기 나누고 싶으신가요?',
      }),
      ask: t({ en: 'Ask the AI assistant', ko: 'AI 어시스턴트에게 물어보기' }),
      email: t({ en: 'Email', ko: '이메일' }),
      back: t({ en: 'Back to About', ko: '소개로 돌아가기' }),
      teaser: t({
        en: 'See all side projects',
        ko: '사이드 프로젝트 모두 보기',
      }),
    },

    standfirst: t({
      en: 'P/02 — build the tool that builds the thing. Three receipts.',
      ko: 'P/02 — 만들 것을 만들어 주는 도구를 만든다. 세 가지 증거.',
    }),

    items: {
      contentBuilder: {
        title: 'content-builder',
        kicker: t({
          en: 'React framework for content editors',
          ko: '콘텐츠 에디터를 위한 React 프레임워크',
        }),
        description: t({
          en: 'A React framework for building rich, interactive content editors, inspired by Sanity and Builder.io: nested layouts, custom components, and responsive design on one canvas.',
          ko: 'Sanity와 Builder.io에서 영감을 받은, 리치하고 인터랙티브한 콘텐츠 에디터를 만들기 위한 React 프레임워크. 하나의 캔버스에서 중첩 레이아웃, 커스텀 컴포넌트, 반응형 디자인을 다룹니다.',
        }),
        origin: t({
          en: 'It started as a personal project and became the core of the cms.synolink.ai editor, the visual web builder in the Synolink suite.',
          ko: '개인 프로젝트로 시작해, Synolink 스위트의 비주얼 웹 빌더인 cms.synolink.ai 에디터의 핵심이 되었습니다.',
        }),
        features: t({
          en: [
            'More than twenty element types, nested freely',
            'Desktop, tablet, and mobile editing',
            'Plugin architecture for sidebar and toolbar',
            'Multi-provider AI generation with streaming',
            'i18n, page metadata, and JSON-LD',
            'Design variables with device overrides',
          ],
          ko: [
            '자유롭게 중첩되는 20가지 이상의 요소',
            '데스크톱·태블릿·모바일 편집',
            '사이드바와 툴바의 플러그인 아키텍처',
            '스트리밍을 지원하는 멀티 프로바이더 AI 생성',
            'i18n, 페이지 메타데이터, JSON-LD',
            '디바이스별 오버라이드를 지원하는 디자인 변수',
          ],
        }),
        demo: 'https://content-builder.noowah.dev/',
      },
      formBuilder: {
        title: t({
          en: 'shadcn/ui RJSF Form Builder',
          ko: 'shadcn/ui RJSF 폼 빌더',
        }),
        kicker: t({
          en: 'shadcn/ui registry for react-jsonschema-form',
          ko: 'react-jsonschema-form을 위한 shadcn/ui 레지스트리',
        }),
        description: t({
          en: 'A themed JSON Schema form renderer plus a drag-and-drop visual form builder with live preview, installable as shadcn/ui registry components.',
          ko: '테마가 적용된 JSON Schema 폼 렌더러와 실시간 미리보기를 갖춘 드래그 앤 드롭 비주얼 폼 빌더. shadcn/ui 레지스트리 컴포넌트로 설치할 수 있습니다.',
        }),
        recognition: t({
          en: 'Listed on awesome-shadcn-ui',
          ko: 'awesome-shadcn-ui에 등재',
        }),
        demo: 'https://shadcn-rjsf-form-builder.noowah.dev/',
        github: 'https://github.com/henrynoowah/shadcn-rjsf-form-builder',
        listing: 'https://awesomeshadcn.dev/categories/registries/shadcn-rjsf-form-builder',
      },
      prVersioning: {
        title: 'node-pr-versioning',
        kicker: t({
          en: 'GitHub Action for package versioning',
          ko: '패키지 버저닝을 위한 GitHub Action',
        }),
        description: t({
          en: 'A GitHub Action that automates Node.js package versioning via PR labels. Supports major/minor/patch bumps, monorepo paths, custom commit messages, tag generation, and dry-run mode.',
          ko: 'PR 라벨을 통해 Node.js 패키지 버저닝을 자동화하는 GitHub Action. major/minor/patch 버전 업, 모노레포 경로, 커스텀 커밋 메시지, 태그 생성, dry-run 모드를 지원합니다.',
        }),
        marketplace: 'https://github.com/marketplace/actions/node-pr-versioning',
        github: 'https://github.com/henrynoowah/node-pr-versioning',
      },
    },
  },
} satisfies Dictionary;

export default sideProjectsContent;
