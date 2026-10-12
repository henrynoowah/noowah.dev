# noowah.dev

Portfolio of Hawoon Joh (NOOWAH), product engineer in Seoul: a home page, an About page, and case studies, with an AI assistant (the Spline bot) that answers questions about the work. The visual style borrows from technical manuals: duotone print, line drawings, paper grain. Writing lives separately at [blog.noowah.dev](https://blog.noowah.dev).

## Routes

- **`/[locale]`**: home. The NOOWAH wordmark, role, the products he owns, a numbered menu, and the Spline bot with its AI assistant.
- **`/[locale]/about`**: overview, experience, principles, work (`#projects`), and contact (`#contact`).
- **`/[locale]/work/synolink-cms`**: case study of cms.synolink.ai, with a scroll-linked architecture diagram.
- **`/api/chat`**: the assistant, streaming from OpenRouter.
- **`/llms.txt`**, **`/sitemap.xml`**, **`/robots.txt`**.

Locales are `en` (default) and `ko`, via intlayer.

## Content

Facts live in intlayer dictionaries, and `lib/bio.ts` turns the same dictionaries into the chat bot's system prompt and `/llms.txt`. Add a fact to the dictionary and the page, the bot and the crawlers all pick it up from one place. Keys under `ui` are chrome and are skipped.

- `app/[locale]/(manual)/about/about.content.ts`
- `app/[locale]/(manual)/work/synolink-cms/synolink-cms.content.ts`

## Design

`PRODUCT.md` records who the site is for and its constraints; `DESIGN.md` records the visual system: a duotone in the bot's teal family with paper grain, Archivo with Noto Sans KR, and isometric line drawings. Shared primitives are in `components/manual/`.

## Stack

Next.js 16 (App Router), React 19, Tailwind CSS 4, Motion, intlayer, next-themes, Spline.

## Development

```bash
pnpm install
pnpm dev
```

The bot needs `NEXT_PUBLIC_SPLINE_SCENE` (and optionally `NEXT_PUBLIC_SPLINE_BOT_ID`). The chat needs `OPENROUTER_API_KEY`.
