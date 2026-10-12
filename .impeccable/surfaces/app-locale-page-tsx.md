---
version: 1
slug: "app-locale-page-tsx"
primary_target: "app/[locale]/page.tsx"
related_targets: ["app/[locale]/(manual)/about/page.tsx","app/[locale]/(manual)/work/synolink-cms/page.tsx","app/[locale]/(manual)/work/side-projects/page.tsx"]
---

# Surface brief: noowah.dev (home, about, work booklets)

Scope: home cover `/[locale]`, manual `/[locale]/about`, assembly booklet `/[locale]/work/synolink-cms`. Visitor mode: Persuade.
Audience: recruiters and hiring managers deciding whether to reach out. Primary actions: Ask the assistant (live chat), Email.
Untouched: Spline bot mounting, home↔bubble morph, chat popover/overlay behaviour, chat streaming, z-order.
Anti-goals: IKEA parody, icon tiles instead of drawings, magazine-length scroll, grey mush, eyebrow labels.
Open: dark mode renders as inverted ink (default, user did not pin). cms.synolink.ai booklet facts come from the content-builder README; the user still needs to confirm the "built on" claim.

## Direction contract

THESIS: The person is shown as a well-made product with clear assembly instructions. Refuses the dev-portfolio default of hero, bento grid and a dark neon accent.

OWN-WORLD: A duotone print: two inks on a pale teal-grey stock, with fine paper grain over the whole sheet, the bot included. The Spline bot sets the hue. Paper, ink and the second ink ("wash") are all low-chroma versions of its teal body (h 190–210). Wash marks only the part being talked about (the active plate or callout, "you are here", built modules). Single-weight isometric SVG line art, very large step numerals, part callouts with ×counts and part numbers, drawn ✓/✕ marks, a hand-pointer callout, a "?" help figure, rectangular ink-outlined controls that invert on hover. Archivo (with its width axis) for Latin, Noto Sans KR for Hangul.

STORY: The visitor learns what is in the box (what he owns), how he was assembled (the path) and the rules (principles). They watch one product assemble (Synolink CMS), then ask for help by chat or email.

FIRST VIEWPORT: Home. A huge NOOWAH wordmark top-left, with "Product Engineer", the scope line, and the products he owns. The centre stays empty for the Spline bot. Its "AI" callout (leader line, wash "AI" circle, outlined label box) is the primary action and opens the chat, which plays the bot's zoom; on phones the callout is a row directly under the bot. Bottom-left: a numbered menu (About, Experience, Works, Side projects, Contact). Bottom-right: the help figure and the email. Theme and locale marks top-right.

VOICE: Professional portfolio copy in EN and KO. The manual lives in the visuals (numerals, drawings, duotone, grain), never in the words: no "assembly", "parts", "1×" or "steps to go" wording.

FORM: Assembly manual, #5 of 7 on the ordered list, seed 4024ed2c. Raises: Ma (ikebana): one drawing per page and charged empty paper. Exposed structure (Coptic binding): the step counter is the nav and shows how many steps remain. One truth per instrument (six-pack): each step owns one fact. Total ink (datamatics): one ink, one paper. On 2026-10-12 the user revised this to a duotone in the bot's hue family, with grain. Size is billing (film poster): what he owns is set largest. Signature interaction: snap into place. Parts travel dashed guides into an exploded drawing and land with a short ease-out; under reduced motion they render already assembled.

FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance
