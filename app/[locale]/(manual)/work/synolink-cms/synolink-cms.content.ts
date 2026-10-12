import { t, type Dictionary } from 'intlayer';

/**
 * Case study for cms.synolink.ai. Like about.content.ts, everything
 * outside `ui` is fact: lib/bio.ts feeds it to the chat bot and /llms.txt, so
 * the case study and the assistant never disagree.
 *
 * Layer facts come from the content-builder framework README, the engine the
 * editor is built on. No figures: traffic, revenue and performance numbers are
 * deliberately unpublished.
 */
const synolinkCmsContent: Dictionary = {
  key: 'synolink-cms',
  content: {
    ui: {
      title: t({
        en: 'Synolink CMS case study',
        ko: 'Synolink CMS 케이스 스터디',
      }),
      steps: {
        product: t({ en: 'Overview', ko: '개요' }),
        exploded: t({ en: 'Architecture', ko: '구조' }),
        scope: t({ en: 'My role', ko: '역할' }),
        help: t({ en: 'Contact', ko: '문의' }),
      },
      asides: {
        exploded: t({
          en: 'Six layers, from the canvas to publishing.',
          ko: '캔버스부터 퍼블리싱까지, 여섯 개의 레이어.',
        }),
        scope: t({
          en: 'What I was responsible for.',
          ko: '제가 맡은 부분.',
        }),
      },
      drawingTitle: t({
        en: 'Architecture diagram of cms.synolink.ai: six layers, numbered 1 to 6 from canvas to publishing.',
        ko: 'cms.synolink.ai 구조도: 캔버스부터 퍼블리싱까지 1~6번 여섯 개의 레이어.',
      }),
      status: t({ en: 'Status', ko: '상태' }),
      role: t({ en: 'My role', ko: '역할' }),
      suite: t({ en: 'Suite', ko: '스위트' }),
      visit: t({ en: 'Visit cms.synolink.ai', ko: 'cms.synolink.ai 방문' }),
      did: t({ en: 'Responsibilities', ko: '담당' }),
      notClaimed: t({ en: 'Not included', ko: '포함하지 않은 내용' }),
      helpTitle: t({
        en: 'Questions about the builder?',
        ko: '빌더에 대해 궁금한 점이 있으신가요?',
      }),
      ask: t({ en: 'Ask the AI assistant', ko: 'AI 어시스턴트에게 물어보기' }),
      back: t({ en: 'Back to About', ko: '소개로 돌아가기' }),
      engineLink: t({
        en: 'How content-builder started',
        ko: 'content-builder의 시작 보기',
      }),
    },

    product: {
      name: 'cms.synolink.ai',
      kind: t({ en: 'Visual web builder', ko: '비주얼 웹 빌더' }),
      summary: t({
        en: 'A visual web builder in the Webflow and Squarespace class, and one of the three products in the Synolink suite. Pages are assembled from typed elements on a canvas, then published with AI-generated content, SEO- and GEO-optimized output, and i18n built in.',
        ko: 'Webflow와 Squarespace 급의 비주얼 웹 빌더이자 Synolink 스위트를 이루는 세 제품 중 하나. 캔버스 위에서 타입이 있는 요소로 페이지를 조립하고, AI 생성 콘텐츠, SEO·GEO 최적화 결과물, i18n을 갖춘 채로 퍼블리시합니다.',
      }),
      engine: t({
        en: 'The editor runs on content-builder, a React framework for rich, interactive content editors that I built, inspired by Sanity and Builder.io.',
        ko: '에디터는 제가 만든 리치 콘텐츠 에디터용 React 프레임워크인 content-builder 위에서 동작합니다. Sanity와 Builder.io에서 영감을 받았습니다.',
      }),
      role: t({ en: 'Led client development', ko: '클라이언트 개발 총괄' }),
      status: t({ en: 'Live', ko: '운영 중' }),
      suite: 'synolink.ai',
      href: 'https://cms.synolink.ai',
    },

    layers: {
      canvas: {
        title: t({ en: 'Canvas and live mode', ko: '캔버스와 라이브 모드' }),
        body: t({
          en: 'Drag-and-drop editing with real-time preview. Live mode flips the same page from editing to preview, and full undo and redo history runs on keyboard shortcuts.',
          ko: '실시간 미리보기가 있는 드래그 앤 드롭 편집. 라이브 모드는 같은 페이지를 편집에서 미리보기로 전환하고, 전체 실행 취소·다시 실행 기록은 단축키로 동작합니다.',
        }),
      },
      elements: {
        title: t({ en: 'Element system', ko: '요소 시스템' }),
        body: t({
          en: 'More than twenty element types (containers, text, headings, images, buttons, links, dialogs, dropdowns, carousels, forms) nest into complex layouts, with desktop, tablet, and mobile breakpoints built in.',
          ko: '컨테이너, 텍스트, 헤딩, 이미지, 버튼, 링크, 다이얼로그, 드롭다운, 캐러셀, 폼 등 20가지 이상의 요소가 중첩되어 복잡한 레이아웃을 만들고, 데스크톱·태블릿·모바일 브레이크포인트가 기본으로 들어 있습니다.',
        }),
      },
      variables: {
        title: t({ en: 'Design variables', ko: '디자인 변수' }),
        body: t({
          en: 'A token system for colours, sizes, and font families, with device-specific overrides. When tokens are not enough, raw CSS opens in a Monaco editor.',
          ko: '색상, 크기, 폰트 패밀리를 위한 토큰 시스템과 디바이스별 오버라이드. 토큰으로 부족할 때는 Monaco 에디터에서 CSS를 직접 편집합니다.',
        }),
      },
      plugins: {
        title: t({ en: 'Plugin architecture', ko: '플러그인 아키텍처' }),
        body: t({
          en: 'Sidebar and toolbar are plugins, with more than fifteen built-in tabs: elements, layers, styles, actions, assets, CMS, history, and more. Custom React components and actions extend the editor without forking it.',
          ko: '사이드바와 툴바는 플러그인이며, 요소·레이어·스타일·액션·에셋·CMS·히스토리 등 15개 이상의 기본 탭을 갖췄습니다. 커스텀 React 컴포넌트와 액션으로 포크 없이 에디터를 확장합니다.',
        }),
      },
      ai: {
        title: t({ en: 'AI generation', ko: 'AI 생성' }),
        body: t({
          en: 'Elements generated from a prompt and streamed onto the canvas, across multiple providers: OpenAI, Anthropic, Azure, Google, and OpenRouter.',
          ko: '프롬프트로 요소를 생성해 캔버스에 스트리밍합니다. OpenAI, Anthropic, Azure, Google, OpenRouter 등 여러 제공자를 지원합니다.',
        }),
      },
      publish: {
        title: t({ en: 'Data and publishing', ko: '데이터와 퍼블리싱' }),
        body: t({
          en: 'Collection lists bound to APIs, JSON, and locale data; forms with validation and conditional fields; page metadata and JSON-LD; locale switching for every page.',
          ko: 'API, JSON, 로케일 데이터에 연결되는 컬렉션 리스트, 검증과 조건부 필드를 갖춘 폼, 페이지 메타데이터와 JSON-LD, 그리고 모든 페이지의 로케일 전환.',
        }),
      },
    },

    scope: {
      did: {
        lead: t({
          en: 'Led client development of cms.synolink.ai.',
          ko: 'cms.synolink.ai의 클라이언트 개발을 총괄했습니다.',
        }),
        engine: t({
          en: 'Built content-builder, the editor framework underneath it.',
          ko: '그 아래에 있는 에디터 프레임워크 content-builder를 만들었습니다.',
        }),
      },
      notClaimed: {
        figures: t({
          en: 'Traffic, revenue, and performance figures are not published.',
          ko: '트래픽, 매출, 성능 수치는 공개하지 않습니다.',
        }),
      },
    },
  },
} satisfies Dictionary;

export default synolinkCmsContent;
