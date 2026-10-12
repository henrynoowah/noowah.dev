# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users
Primary: hiring managers and recruiters evaluating Hawoon Joh (조하운, "NOOWAH") for product-engineering roles. They arrive from a résumé, LinkedIn, GitHub, or a referral, often skimming between other candidates. They need to understand quickly who he is, what he owns, and how to contact him. Success means they reach out, or they leave with a clear, memorable picture of him.

Secondary audiences (not designed for first): engineers who arrive from blog.noowah.dev or GitHub.

## Product Purpose
noowah.dev is Hawoon Joh's personal brand site and professional home base. It presents his story, scope of ownership, and work, and offers an AI assistant that answers questions about him. Long-form writing is on blog.noowah.dev, not here.

## Positioning
- **Designer turned engineer who owns the whole product.** He has a B.A. in Spatial Design, taught himself backend and then React/Next.js, and joined CloudHospital in 2022 to build the frontend. He went on to own the platform, marketing site and CMS, SEO/GEO, performance, and the deploy pipeline. He is now product owner for Synolink (synolink.ai). His throughline: "Every step, I taught myself the next thing the work needed."
- **Builds the tool that builds the thing.** Examples: the CMS content builder, an RJSF form builder, automated SaaS delivery for client hospitals (Kubernetes/ArgoCD), and node-pr-versioning.

## Operating Context
- Routes: `/[locale]` (home: NOOWAH wordmark, role, owned products, numbered menu — About, Experience, Works, Side projects, Contact — and the Spline bot whose "AI" callout opens the assistant), `/[locale]/about` (overview, experience, principles, works `#projects`, contact `#contact`), `/[locale]/work/synolink-cms` (case study of cms.synolink.ai), `/[locale]/work/side-projects` (side projects, led by content-builder), plus `/llms.txt`, `robots.txt`, `sitemap.xml`.
- Posts link out to `blog.noowah.dev/{locale}` (`lib/blog.ts`).
- AI chat: a floating Spline bot (full screen on home, a 64px bubble elsewhere) backed by `/api/chat`, which streams from OpenRouter free models with fallbacks. Its mounting and home↔bubble behaviour are a fixed constraint.
- Deployed on Vercel from `main`. No analytics.

## Capabilities and Constraints
- **EN/KO parity is required.** Every surface and string ships in both languages via intlayer; `en` is the default.
- **Single source of truth.** `app/[locale]/(manual)/about/about.content.ts`, `app/[locale]/(manual)/work/synolink-cms/synolink-cms.content.ts` and `app/[locale]/(manual)/work/side-projects/side-projects.content.ts` drive both the pages and the chat's system prompt (`lib/bio.ts`). New facts go there first; `ui` keys are chrome and never reach the bot.
- **The chat stays grounded.** It answers only from that content, never invents metrics, employers, or dates, shares only URLs that appear verbatim, replies in the visitor's language, and keeps answers to 1–3 sentences.
- **Performance and SEO are product features.** Heavy effects (Spline, motion) stay deferred or lazy, and Lighthouse/TBT regressions count as bugs. SEO/GEO assets (localized metadata, llms.txt, sitemap) must stay correct.
- Stack: Next.js 16 App Router, React 19, Tailwind CSS 4, shadcn/Radix, Motion, next-themes (light/dark).
- Confirmed by the user (2026-10-11): the cms.synolink.ai editor runs on content-builder, the React editor framework Hawoon built. The repo is private, so the booklet describes it without linking.

## Brand Commitments
- Public identity: **Hawoon Joh / 조하운**, handle **NOOWAH** (spelled in caps everywhere, titles included), pronounced **누와** (not 노와). The handle is "Hawoon" spelled backwards. "Henry" appears only in account handles (henrynoowah).
- Role title: Product Engineer ("frontend, platform, and everything between"). Based in Seoul.
- Voice: professional portfolio copy in both languages; the manual theme lives in the visuals, never in the words (Korean especially must not read playful). First-person, direct, confident without hype, as in the stated principles: "Performance and SEO are product features, not cleanup tasks." / "Build the tool that builds the thing." / "Never leave anything at POC level."
- Contact CTA: "Let's build something great." Channels: henrynoowah@gmail.com, github.com/henrynoowah, blog.noowah.dev.

## Evidence on Hand
- Career facts, products, and stack: `app/[locale]/about/about.content.ts`.
- Live products: icloudhospital.com (frontend and backoffice), cms.synolink.ai (he led client development), inbox.synolink.ai (product planning as PO, not hands-on development). ehr.synolink.ai is in development and is deliberately unlinked.
- Team context: 4–8 engineers.
- Side projects (`side-projects.content.ts`): content-builder, a personal project that became the core of the cms.synolink.ai editor (confirmed by Hawoon; the user wants this emphasised: a personal project became the company product's core); shadcn/ui RJSF Form Builder, listed on awesome-shadcn-ui (verified in birobirobiro/awesome-shadcn-ui, 2026-10-12); node-pr-versioning on GitHub Marketplace.
- Assets: favicons, `public/twitter-card.png` (OG image).
- **Not available, so never fabricate:** a résumé PDF, testimonials, quantified metrics or benchmarks, client logos, press, or a logo file.

## Product Principles
1. A recruiter should understand who he is, what he owns, and how to reach him without scrolling far or asking the chat.
2. Show ownership through concrete products and scope, not adjectives or invented numbers.
3. One source of truth: the page and the chat must never disagree.
4. Both languages are first-class; Korean is never an afterthought.
5. Craft has to be backed by performance. Ambitious effects never cost load speed or SEO.

## Accessibility & Inclusion
Bilingual EN/KO audience. Light and dark themes. Interactive controls need accessible names. Motion-heavy features (Spline, Motion, view transitions) respect `prefers-reduced-motion`: a global CSS rule plus `useReducedMotion` in the assembly drawings, which then render already assembled.
