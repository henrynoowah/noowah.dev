import { t, type Dictionary } from 'intlayer';

/**
 * Source of truth for the about page AND the chat bot's system prompt.
 *
 * `lib/bio.ts` serialises everything here into markdown for `/api/chat` and
 * `/llms.txt`, so a fact added below reaches the bot with no second edit.
 * Anything under `ui` is chrome (labels, button text) and is skipped by that
 * walker — keep facts out of it.
 */
const aboutContent: Dictionary = {
  key: 'about',
  content: {
    ui: {
      sections: {
        lede: t({ en: 'About', ko: '소개' }),
        path: t({ en: 'The Path', ko: '지나온 길' }),
        principles: t({ en: 'Principles', ko: '원칙' }),
        practice: t({ en: 'The Work', ko: '하는 일' }),
        projects: t({ en: 'Side Projects', ko: '사이드 프로젝트' }),
        currently: t({ en: 'Currently', ko: '요즘' }),
        contact: t({ en: 'Contact', ko: '연락처' }),
      },
      source: t({ en: 'Source', ko: '소스' }),
      demo: t({ en: 'Demo', ko: '데모' }),
      boxoutLabel: t({ en: 'Boxout — 01', ko: '박스아웃 — 01' }),
      figure1: t({
        en: 'Fig. 1 — Standalone, or composed.',
        ko: 'Fig. 1 — 단독으로, 또는 조합해서.',
      }),
      contactButton: t({ en: 'Get in Touch', ko: '연락하기' }),
      contactTitle: {
        line1: t({ en: "Let's build", ko: '함께' }),
        highlight: t({ en: 'something', ko: '멋진 것을' }),
        line2: t({ en: 'great.', ko: '만들어요.' }),
      },
      colophon: t({
        en: 'Set in Syne and Outfit. Built with Next.js, Tailwind CSS, and Motion.',
        ko: 'Syne와 Outfit으로 조판. Next.js, Tailwind CSS, Motion으로 제작.',
      }),
      issueLine: t({
        en: 'About — Issue 01 · Seoul · 2026',
        ko: 'About — Issue 01 · 서울 · 2026',
      }),
      end: t({ en: '— END —', ko: '— 끝 —' }),
    },

    meta: {
      name: 'Hawoon Joh',
      nameKo: '조하운',
      handle: 'NOOWAH',
      handleKo: '누와',
      place: t({ en: 'Seoul, KR', ko: '서울, 대한민국' }),
      title: t({
        en: 'Product Engineer — frontend, platform, and everything between',
        ko: '프로덕트 엔지니어 — 프론트엔드부터 플랫폼까지',
      }),
      email: 'henrynoowah@gmail.com',
      github: 'github.com/henrynoowah',
      velog: 'velog.io/@henrynoowah',
    },

    lede: {
      p1: t({
        en: "I build products end to end. That started as frontend work — Next.js and TypeScript — and kept expanding, because the interesting problems never stayed in one layer. Today that means leading a small engineering team, planning a product line, and owning the pipeline that ships it.",
        ko: '저는 제품을 처음부터 끝까지 만듭니다. 프론트엔드에서 시작했지만 — Next.js와 TypeScript — 흥미로운 문제들은 한 계층에 머무르지 않았기에 계속 범위를 넓혀왔습니다. 지금은 작은 엔지니어링 팀을 이끌고, 제품 라인을 기획하고, 그것을 배포하는 파이프라인까지 맡고 있습니다.',
      }),
      p2: t({
        en: "There was no straight line here. I studied spatial design, worked a non-dev job, went through a backend bootcamp, then taught myself frontend. Every step was the same move: learn whatever the work needed next.",
        ko: '직선 경로는 아니었습니다. 공간디자인을 전공했고, 개발과 무관한 일을 했고, 백엔드 부트캠프를 거친 뒤 프론트엔드를 독학했습니다. 매 단계마다 같은 선택을 했습니다. 그 일에 필요한 것을 그때그때 배우는 것.',
      }),
      facts: {
        role: {
          label: t({ en: 'Role', ko: '역할' }),
          value: t({ en: 'Product Engineer', ko: '프로덕트 엔지니어' }),
        },
        based: {
          label: t({ en: 'Based', ko: '거주' }),
          value: t({ en: 'Seoul, KR', ko: '서울, 대한민국' }),
        },
        handle: {
          label: t({ en: 'Handle', ko: '핸들' }),
          value: t({ en: 'NOOWAH', ko: 'NOOWAH (누와)' }),
        },
        since: {
          label: t({ en: 'Since', ko: '재직' }),
          value: t({ en: '2022 — CloudHospital', ko: '2022 — CloudHospital' }),
        },
        team: {
          label: t({ en: 'Team', ko: '팀' }),
          value: t({ en: '4–8 engineers', ko: '엔지니어 4–8명' }),
        },
        writing: {
          label: t({ en: 'Writing', ko: '글' }),
          value: 'velog.io/@henrynoowah',
        },
      },
    },

    path: {
      standfirst: t({
        en: 'Spatial design to production infrastructure, one self-taught step at a time.',
        ko: '공간디자인에서 프로덕션 인프라까지, 한 번에 한 걸음씩 독학으로.',
      }),
      entries: {
        degree: {
          year: '2020',
          place: t({ en: 'Kookmin University', ko: '국민대학교' }),
          title: t({
            en: "B.A. Spatial Design",
            ko: '공간디자인학과 학사',
          }),
          body: t({
            en: 'Four years spent thinking about how people move through a space and what makes a layout legible. It turns out to be the same question a UI asks, which is why the switch felt less like a career change than a change of material.',
            ko: '사람이 공간을 어떻게 지나가는지, 무엇이 레이아웃을 읽히게 만드는지 고민한 4년. 그것은 UI가 던지는 질문과 같았고, 그래서 전환은 직업을 바꾼다기보다 재료를 바꾸는 일에 가까웠습니다.',
          }),
        },
        designJob: {
          year: '2020–21',
          place: t({ en: 'Design work', ko: '디자인 실무' }),
          title: t({
            en: 'A non-dev job, and a growing itch',
            ko: '개발이 아닌 일, 그리고 커지는 갈증',
          }),
          body: t({
            en: 'Working alongside software without being able to build it got old fast. I wanted to be the one shipping the thing, not handing off a file and hoping.',
            ko: '소프트웨어 곁에서 일하면서도 직접 만들 수 없다는 사실은 금방 답답해졌습니다. 파일을 넘기고 기대하는 쪽이 아니라, 직접 만들어 내보내는 쪽이 되고 싶었습니다.',
          }),
        },
        bootcamp: {
          year: '2021',
          place: t({ en: 'Bootcamp', ko: '부트캠프' }),
          title: t({
            en: 'Backend first — Java and SQL',
            ko: '백엔드부터 — Java와 SQL',
          }),
          body: t({
            en: 'I learned the server side before the client side. Backwards, by portfolio standards — but knowing what a query costs and how a schema is shaped has been quietly useful in every frontend decision since.',
            ko: '클라이언트보다 서버를 먼저 배웠습니다. 포트폴리오 관점에서는 순서가 거꾸로지만, 쿼리의 비용과 스키마의 생김새를 안다는 것은 이후 모든 프론트엔드 결정에서 조용히 쓸모가 있었습니다.',
          }),
        },
        selfTaught: {
          year: '2021–22',
          place: t({ en: 'Self-taught', ko: '독학' }),
          title: t({
            en: 'Into the frontend',
            ko: '프론트엔드로',
          }),
          body: t({
            en: 'React, then Next.js and TypeScript, built by making things that had to actually work. No course completion certificate — just a pile of projects, each one harder than the last.',
            ko: 'React, 이어서 Next.js와 TypeScript를 실제로 동작해야 하는 것들을 만들며 익혔습니다. 수료증은 없고, 대신 갈수록 어려워지는 프로젝트가 쌓였습니다.',
          }),
        },
        cloudhospital: {
          year: '2022',
          place: 'CloudHospital',
          title: t({
            en: 'Hired, then leading',
            ko: '입사, 그리고 리드',
          }),
          body: t({
            en: 'Joined to build the frontend and ended up responsible for the platform around it — the marketing site and CMS, SEO, performance, and eventually the deployment pipeline. Now leading a team of four to eight.',
            ko: '프론트엔드를 만들기 위해 합류했지만 결국 그 주변의 플랫폼 전체를 맡게 되었습니다. 마케팅 사이트와 CMS, SEO, 성능, 그리고 결국 배포 파이프라인까지. 지금은 4~8명의 팀을 이끌고 있습니다.',
          }),
        },
        synolink: {
          year: t({ en: 'Now', ko: '현재' }),
          place: 'Synolink',
          title: t({
            en: 'Planning a product line',
            ko: '제품 라인 기획',
          }),
          body: t({
            en: 'Leading synolink.ai end to end — three products, one modular suite. The largest thing I have been responsible for, and the first where the architecture decisions are mine to make.',
            ko: 'synolink.ai를 처음부터 끝까지 총괄하고 있습니다. 세 개의 제품, 하나의 모듈형 스위트. 지금까지 맡은 것 중 가장 큰 일이자, 아키텍처 결정이 온전히 제 몫인 첫 번째 일입니다.',
          }),
        },
      },
      throughline: t({
        en: 'Every step, I taught myself the next thing the work needed.',
        ko: '매 단계마다, 그 일에 필요한 다음 것을 스스로 배웠습니다.',
      }),
    },

    principles: {
      items: {
        perf: {
          quote: t({
            en: 'Performance and SEO are product features, not cleanup tasks.',
            ko: '성능과 SEO는 제품의 기능입니다. 나중에 치울 일이 아니라.',
          }),
          gloss: t({
            en: 'A page nobody can find and nobody waits for does not exist. Both belong in the plan, not the backlog.',
            ko: '아무도 찾을 수 없고 아무도 기다려주지 않는 페이지는 존재하지 않는 것과 같습니다. 둘 다 백로그가 아니라 계획에 들어가야 합니다.',
          }),
        },
        tooling: {
          quote: t({
            en: 'Build the tool that builds the thing.',
            ko: '만들 것을 만들어 주는 도구를 만듭니다.',
          }),
          gloss: t({
            en: 'Visual editors, code generation, automated pipelines. If a task will happen a hundred times, the second time should already be cheaper.',
            ko: '비주얼 에디터, 코드 생성, 자동화 파이프라인. 백 번 반복될 일이라면, 두 번째부터는 이미 저렴해져 있어야 합니다.',
          }),
        },
        depth: {
          quote: t({
            en: 'Never leave anything at POC level — dig deeper into the details.',
            ko: 'POC 수준에서 멈추지 않습니다. 디테일까지 파고듭니다.',
          }),
          gloss: t({
            en: 'A demo that works once proves nothing. The details are where a prototype becomes a product.',
            ko: '한 번 동작하는 데모는 아무것도 증명하지 못합니다. 프로토타입이 제품이 되는 곳은 디테일입니다.',
          }),
        },
      },
    },

    practice: {
      lead: t({
        en: 'At CloudHospital I own the frontend of icloudhospital.com and its backoffice, plus the marketing site and the CMS behind it. Building it was the first half of the job.',
        ko: 'CloudHospital에서 icloudhospital.com과 백오피스의 프론트엔드, 그리고 마케팅 사이트와 그 뒤의 CMS를 맡고 있습니다. 만드는 것은 일의 절반이었습니다.',
      }),
      lead2: t({
        en: 'The second half is everything that decides whether the work reaches anyone: search and GEO visibility, page performance, and reading traffic closely enough to turn it into conversion. Same principle as P/01 — that is product work, not maintenance.',
        ko: '나머지 절반은 그 결과물이 누군가에게 도달하는지를 결정하는 모든 것입니다. 검색과 GEO 노출, 페이지 성능, 그리고 트래픽을 전환으로 바꿀 만큼 면밀하게 읽어내는 일. P/01과 같은 원칙입니다. 이것은 유지보수가 아니라 제품 업무입니다.',
      }),
      workstreams: {
        platform: {
          label: t({
            en: 'icloudhospital.com platform + backoffice',
            ko: 'icloudhospital.com 플랫폼 + 백오피스',
          }),
          tag: t({ en: 'Platform', ko: '플랫폼' }),
        },
        marketing: {
          label: t({ en: 'Marketing site and CMS', ko: '마케팅 사이트와 CMS' }),
          tag: t({ en: 'Product', ko: '프로덕트' }),
        },
        seo: {
          label: t({ en: 'SEO and GEO improvement', ko: 'SEO 및 GEO 개선' }),
          tag: t({ en: 'Growth', ko: '그로스' }),
        },
        perf: {
          label: t({ en: 'Web performance', ko: '웹 성능' }),
          tag: t({ en: 'Perf', ko: '성능' }),
        },
        analytics: {
          label: t({
            en: 'Traffic analysis and conversion',
            ko: '트래픽 분석과 전환',
          }),
          tag: t({ en: 'Growth', ko: '그로스' }),
        },
        maintenance: {
          label: t({ en: 'Ongoing maintenance', ko: '지속적인 유지보수' }),
          tag: t({ en: 'Ops', ko: '운영' }),
        },
      },
      boxout: {
        title: t({
          en: 'Automated SaaS delivery for client hospitals',
          ko: '고객 병원을 위한 SaaS 배포 자동화',
        }),
        body: t({
          en: 'Every client hospital gets its own deployment. Doing that by hand does not scale past a handful, so I built the pipeline that provisions and ships them automatically — cluster workloads, GitOps-driven releases, and DNS wired up per tenant without anyone touching a console.',
          ko: '고객 병원마다 별도의 배포본이 필요합니다. 손으로 하면 몇 곳을 넘기지 못하기에, 자동으로 프로비저닝하고 배포하는 파이프라인을 만들었습니다. 클러스터 워크로드, GitOps 기반 릴리스, 그리고 콘솔을 건드리지 않고 테넌트별로 연결되는 DNS까지.',
        }),
        stack: t({
          en: ['Kubernetes', 'ArgoCD', 'Azure DNS', 'GoDaddy'],
          ko: ['Kubernetes', 'ArgoCD', 'Azure DNS', 'GoDaddy'],
        }),
      },
      synolink: {
        kicker: t({
          en: 'New product line — synolink.ai',
          ko: '신규 제품 라인 — synolink.ai',
        }),
        deck: t({
          en: 'A modular SaaS suite for running an online business. Each product stands alone — or plugs into the others as an extension.',
          ko: '온라인 비즈니스를 운영하기 위한 모듈형 SaaS 스위트. 각 제품은 단독으로 쓸 수도, 서로의 확장 기능으로 붙여 쓸 수도 있습니다.',
        }),
        role: t({
          en: 'Planned and led end to end (총괄).',
          ko: '기획부터 실행까지 총괄.',
        }),
        products: {
          cms: {
            name: 'cms.synolink.ai',
            kicker: t({ en: 'Visual web builder', ko: '비주얼 웹 빌더' }),
            body: t({
              en: 'A builder in the Webflow and Squarespace class, with AI-generated content, SEO- and GEO-optimized output, and i18n built in for global leads and marketing.',
              ko: 'Webflow와 Squarespace 급의 빌더. AI 콘텐츠 생성, SEO·GEO에 최적화된 결과물, 그리고 글로벌 리드와 마케팅을 위한 i18n을 기본으로 갖췄습니다.',
            }),
            // No href while unlaunched: omitting it keeps the bot from handing
            // visitors a URL that does not resolve.
            status: t({ en: 'In development', ko: '개발 중' }),
          },
          inbox: {
            name: 'inbox.synolink.ai',
            kicker: t({ en: 'Omnichannel messaging', ko: '옴니채널 메시징' }),
            body: t({
              en: 'A channel provider in the same class as WATI and Dr.Palette — customer conversations from every channel in one inbox.',
              ko: 'WATI, Dr.Palette와 같은 급의 채널 제공자. 모든 채널의 고객 대화를 하나의 인박스로 모읍니다.',
            }),
            status: t({ en: 'Live', ko: '운영 중' }),
            href: 'https://inbox.synolink.ai',
          },
          ehr: {
            name: 'ehr.synolink.ai',
            kicker: t({ en: 'Medical EHR', ko: '의료 EHR' }),
            body: t({
              en: 'An electronic health record platform, built to slot into the same suite rather than sit off to the side as a silo.',
              ko: '전자의무기록 플랫폼. 별도의 사일로로 떨어져 있지 않고 같은 스위트 안에 맞물리도록 설계했습니다.',
            }),
            status: t({ en: 'In development', ko: '개발 중' }),
          },
        },
      },
      stack: {
        frontend: {
          label: t({ en: 'Frontend', ko: '프론트엔드' }),
          items: t({
            en: ['Next.js', 'TypeScript', 'React', 'Tailwind CSS', 'Motion'],
            ko: ['Next.js', 'TypeScript', 'React', 'Tailwind CSS', 'Motion'],
          }),
        },
        platform: {
          label: t({ en: 'Platform', ko: '플랫폼' }),
          items: t({
            en: [
              'Kubernetes',
              'ArgoCD',
              'Azure',
              'GitHub Actions',
              'CI/CD',
              'Vercel',
            ],
            ko: [
              'Kubernetes',
              'ArgoCD',
              'Azure',
              'GitHub Actions',
              'CI/CD',
              'Vercel',
            ],
          }),
        },
        craft: {
          label: t({ en: 'Practice', ko: '실무' }),
          items: t({
            en: [
              'SEO / GEO',
              'Web performance',
              'Analytics and conversion',
              'i18n',
              'Design systems',
              'Team leadership',
            ],
            ko: [
              'SEO / GEO',
              '웹 성능',
              '분석과 전환',
              'i18n',
              '디자인 시스템',
              '팀 리딩',
            ],
          }),
        },
      },
    },

    projects: {
      standfirst: t({
        en: 'P/02 — build the tool that builds the thing. Three receipts.',
        ko: 'P/02 — 만들 것을 만들어 주는 도구를 만든다. 세 가지 증거.',
      }),
      items: {
        formBuilder: {
          title: t({
            en: 'shadcn/ui RJSF Form Builder',
            ko: 'shadcn/ui RJSF 폼 빌더',
          }),
          description: t({
            en: 'A form builder powered by react-jsonschema-form with shadcn/ui components. Generates dynamic forms from JSON Schema through a visual builder interface.',
            ko: 'shadcn/ui 컴포넌트와 react-jsonschema-form을 활용한 폼 빌더. JSON Schema로부터 동적 폼을 생성하는 비주얼 빌더 인터페이스를 제공합니다.',
          }),
          tags: t({
            en: ['React', 'JSON Schema', 'shadcn/ui', 'Form Builder'],
            ko: ['React', 'JSON Schema', 'shadcn/ui', '폼 빌더'],
          }),
        },
        contentBuilder: {
          title: t({ en: 'CMS Content Builder', ko: 'CMS 콘텐츠 빌더' }),
          description: t({
            en: 'A visual UI editor and content builder with a component-driven architecture. Drag and drop to assemble rich content layouts.',
            ko: '컴포넌트 기반 아키텍처로 설계된 비주얼 UI 에디터 및 콘텐츠 빌더. 드래그 앤 드롭으로 리치 콘텐츠 레이아웃을 구성합니다.',
          }),
          tags: t({
            en: ['UI Editor', 'CMS', 'Storybook', 'Component Library'],
            ko: ['UI 에디터', 'CMS', 'Storybook', '컴포넌트 라이브러리'],
          }),
        },
        prVersioning: {
          title: t({ en: 'node-pr-versioning', ko: 'node-pr-versioning' }),
          description: t({
            en: 'A GitHub Action that automates Node.js package versioning via PR labels. Supports major/minor/patch bumps, monorepo paths, custom commit messages, tag generation, and dry-run mode.',
            ko: 'PR 라벨을 통해 Node.js 패키지 버저닝을 자동화하는 GitHub Action. major/minor/patch 버전 업, 모노레포 경로, 커스텀 커밋 메시지, 태그 생성, dry-run 모드를 지원합니다.',
          }),
          tags: t({
            en: ['GitHub Action', 'Node.js', 'Automation', 'CI/CD'],
            ko: ['GitHub Action', 'Node.js', '자동화', 'CI/CD'],
          }),
        },
      },
    },

    currently: {
      workshop: {
        title: t({ en: 'In the workshop', ko: '작업대 위' }),
        items: {
          ai: {
            title: t({ en: 'AI agents and LLM tooling', ko: 'AI 에이전트와 LLM 도구' }),
            gloss: t({
              en: 'Already shipping inside the Synolink CMS as generated content; the interesting part is what else it can own.',
              ko: 'Synolink CMS 안에서 생성형 콘텐츠로 이미 동작 중. 흥미로운 부분은 그 다음에 무엇까지 맡길 수 있는가입니다.',
            }),
          },
          infra: {
            title: t({ en: 'Infrastructure, deeper', ko: '더 깊은 인프라' }),
            gloss: t({
              en: 'Kubernetes and ArgoCD I use daily. Observability is the gap I am closing now.',
              ko: 'Kubernetes와 ArgoCD는 매일 씁니다. 지금 메우고 있는 빈틈은 옵저버빌리티입니다.',
            }),
          },
          design: {
            title: t({ en: 'Design engineering', ko: '디자인 엔지니어링' }),
            gloss: t({
              en: 'Motion, 3D, and visual editors — the places where the design degree still pays rent.',
              ko: '모션, 3D, 비주얼 에디터. 디자인 전공이 아직도 값을 하는 영역입니다.',
            }),
          },
        },
      },
      offclock: {
        title: t({ en: 'Off the clock', ko: '퇴근 후' }),
        items: {
          watches: {
            title: t({ en: 'Watches', ko: '시계' }),
            gloss: t({
              en: 'Modding and watchmaking. A movement is a system you can hold: hundreds of parts, no abstraction layer, and it either keeps time or it does not. Nothing has taught me more about finishing a job properly.',
              ko: '모딩과 시계 제작. 무브먼트는 손에 쥘 수 있는 시스템입니다. 수백 개의 부품, 추상화 계층 없음, 그리고 시간이 맞거나 맞지 않거나 둘 중 하나. 일을 제대로 끝내는 법을 이보다 잘 가르쳐준 것은 없습니다.',
            }),
          },
          music: {
            title: t({ en: 'Music', ko: '음악' }),
            gloss: t({
              en: 'On for most of the working day, and most of the non-working day.',
              ko: '일하는 시간 대부분, 그리고 일하지 않는 시간 대부분에도 틀어둡니다.',
            }),
          },
          fitness: {
            title: t({ en: 'Gym and running', ko: '헬스와 러닝' }),
            gloss: t({
              en: 'The one part of the week with no backlog and no code review.',
              ko: '백로그도 코드 리뷰도 없는 유일한 시간.',
            }),
          },
        },
      },
      note: t({
        en: 'Fig. 2 — inputs. Watchmaking is where P/03 came from: nothing stays at POC level once it is open on the bench.',
        ko: 'Fig. 2 — 입력값. P/03은 시계 작업에서 나왔습니다. 작업대 위에 열어놓은 이상, 어떤 것도 POC로 남지 않습니다.',
      }),
    },
  },
} satisfies Dictionary;

export default aboutContent;
