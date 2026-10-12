---
name: noowah.dev
description: Hawoon Joh (NOOWAH) documented as a well-made product, printed as assembly instructions in two inks on one grained stock.
colors:
  paper: "oklch(0.95 0.009 190)"
  ink: "oklch(0.26 0.035 205)"
  wash: "oklch(0.66 0.055 195)"
  panel: "oklch(0.87 0.03 195)"
  error: "oklch(0.52 0.19 28)"
  paper-negative: "oklch(0.2 0.018 210)"
  ink-negative: "oklch(0.93 0.014 190)"
  wash-negative: "oklch(0.49 0.05 195)"
  panel-negative: "oklch(0.3 0.035 200)"
  error-negative: "oklch(0.72 0.16 28)"
typography:
  display:
    fontFamily: "Archivo, ui-sans-serif, sans-serif"
    fontSize: "clamp(3.25rem, 8.4vw, 6rem)"
    fontWeight: 900
    lineHeight: 0.82
    letterSpacing: "-0.035em"
    fontVariation: "'wdth' 125"
  numeral:
    fontFamily: "Archivo, ui-sans-serif, sans-serif"
    fontSize: "clamp(3.75rem, 11vw, 9rem)"
    fontWeight: 900
    lineHeight: 0.8
    fontFeature: "'tnum' 1"
    fontVariation: "'wdth' 125"
  headline:
    fontFamily: "Archivo, Noto Sans KR, ui-sans-serif, system-ui, sans-serif"
    fontSize: "3.75rem"
    fontWeight: 700
    lineHeight: 1.05
    letterSpacing: "-0.025em"
  statement:
    fontFamily: "Archivo, Noto Sans KR, ui-sans-serif, system-ui, sans-serif"
    fontSize: "3.75rem"
    fontWeight: 900
    lineHeight: 1.02
    letterSpacing: "-0.025em"
  title:
    fontFamily: "Archivo, Noto Sans KR, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1.875rem"
    fontWeight: 700
    lineHeight: 1.15
    letterSpacing: "-0.025em"
  body-lead:
    fontFamily: "Archivo, Noto Sans KR, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1.125rem"
    fontWeight: 400
    lineHeight: 1.625
  body:
    fontFamily: "Archivo, Noto Sans KR, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.625
  menu-item:
    fontFamily: "Archivo, Noto Sans KR, ui-sans-serif, system-ui, sans-serif"
    fontSize: "4.5rem"
    fontWeight: 700
    lineHeight: 1.05
    letterSpacing: "-0.025em"
  data-label:
    fontFamily: "Archivo, Noto Sans KR, ui-sans-serif, system-ui, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 600
    lineHeight: 1.25
    letterSpacing: "0.025em"
    fontFeature: "'tnum' 1"
    fontVariation: "'wdth' 75"
  contents-item:
    fontFamily: "Archivo, Noto Sans KR, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1.375rem"
    fontWeight: 600
    lineHeight: 1.25
  drawing-label:
    fontFamily: "Archivo, ui-sans-serif, sans-serif"
    fontSize: "13px"
    fontWeight: 700
    lineHeight: 1
  drawing-caption:
    fontFamily: "Archivo, Noto Sans KR, ui-sans-serif, sans-serif"
    fontSize: "15px"
    fontWeight: 700
    lineHeight: 1
rounded:
  none: "0px"
  hairline: "2px"
  full: "9999px"
spacing:
  sheet-gutter: "20px"
  sheet-gutter-wide: "32px"
  grid-gap: "24px"
  control-y: "12px"
  control-x: "16px"
  step-top: "48px"
  step-bottom: "80px"
  running-head: "56px"
components:
  ink-control-solid:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.paper}"
    rounded: "{rounded.none}"
    padding: "12px 16px"
  ink-control-solid-hover:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
  ink-control-outline:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    rounded: "{rounded.none}"
    padding: "12px 16px"
  ink-control-outline-hover:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.paper}"
  step-box:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    rounded: "{rounded.none}"
    size: "32px"
  step-box-current:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.paper}"
    rounded: "{rounded.none}"
    size: "32px"
  data-tag:
    textColor: "{colors.ink}"
    typography: "{typography.data-label}"
  menu-button:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    rounded: "{rounded.none}"
    height: "32px"
    padding: "0 10px"
  menu-button-open:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.paper}"
    rounded: "{rounded.none}"
    height: "32px"
    padding: "0 10px"
  menu-row:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    typography: "{typography.menu-item}"
    rounded: "{rounded.none}"
  menu-row-hover:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.paper}"
  callout:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    rounded: "{rounded.full}"
    size: "26px"
  callout-active:
    backgroundColor: "{colors.wash}"
    textColor: "{colors.ink}"
    rounded: "{rounded.full}"
    size: "26px"
  ai-callout-mark:
    backgroundColor: "{colors.wash}"
    textColor: "{colors.ink}"
    rounded: "{rounded.full}"
    size: "36px"
  ai-callout-label:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    rounded: "{rounded.none}"
    padding: "12px 16px"
  ai-callout-label-hover:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.paper}"
  layer-number:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    rounded: "{rounded.full}"
    size: "40px"
  layer-number-active:
    backgroundColor: "{colors.wash}"
    textColor: "{colors.ink}"
    rounded: "{rounded.full}"
    size: "40px"
  current-marker:
    backgroundColor: "{colors.wash}"
    textColor: "{colors.ink}"
    rounded: "{rounded.none}"
    padding: "2px 6px"
  recognition-badge:
    backgroundColor: "{colors.wash}"
    textColor: "{colors.ink}"
    typography: "{typography.data-label}"
    rounded: "{rounded.none}"
    padding: "4px 8px"
  chat-panel:
    backgroundColor: "{colors.panel}"
    textColor: "{colors.ink}"
    rounded: "{rounded.none}"
    width: "400px"
    height: "500px"
  message-visitor:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.paper}"
    rounded: "{rounded.none}"
    padding: "10px 14px"
  chat-input:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    rounded: "{rounded.none}"
    padding: "12px 16px"
---

# Design System: noowah.dev

## Overview

**Creative North Star: "The Assembly Manual"**

The site presents one person as a well-made product with clear assembly instructions. Every surface is a printed sheet from that manual: a duotone of two inks on a pale teal-grey stock with fine paper grain, single-weight line drawings, very large step numerals, drawn do and don't panels, a pointing hand, and a "?" help figure on the back page. The Spline bot is the product pictured on the box, and its teal body sets the hue of the whole print: paper, ink and the second ink are low-chroma members of its family, so the bot reads as the object the manual was printed for. The grain lies over everything, the bot included, so sheet and product share one stock.

Density follows a manual, not a magazine. Each step owns one fact and one drawing, and the paper around it stays empty on purpose. Hierarchy comes from size, weight and Archivo's width axis, never from grey. Structure is visible: the running head's step counter shows which section is open, ink rules separate steps edge to edge, a full-page menu carries page-to-page navigation, and the home cover's numbered contents list is its own nav.

The manual lives in the visuals, never in the words. Numerals, drawings, the duotone and the grain carry the theme; the copy is plain professional portfolio wording in English and Korean.

The one authored motion is snap into place. Parts start lifted along dashed guides and drop into their slots with a short exponential ease-out once the drawing enters the viewport. Under reduced motion they are drawn already assembled. The second ink, wash, is the manual's highlighter: it marks only the part the text is talking about. Dark mode is the same duotone printed as a negative.

This system replaces the dev-portfolio default of hero, bento grid and dark neon accent. It is not a parody of any furniture brand's manual.

**Key Characteristics:**
- Two inks on one paper, all in the Spline bot's teal family; the second ink (wash) marks only the part in focus, and the chat sits on its own wash-steeped sheet (panel).
- A static paper grain over the whole viewport, bot included.
- Archivo with its width axis: expanded numerals and wordmark, condensed data labels, normal width for reading. Noto Sans KR carries Hangul.
- One 1.5px stroke for rules, control outlines, underlines and drawings.
- Square, ink-outlined controls whose hover inverts ink and paper.
- Isometric line drawings with paper fills that occlude like real technical drawings.
- Numbered steps as the page structure, a position counter in the running head, and a full-page menu as the nav.
- Snap-into-place motion on `cubic-bezier(0.16, 1, 0.3, 1)`, fully disabled under reduced motion.
- Professional copy in EN and KO; the manual theme is drawn, never written.

## Colors

A duotone in the Spline bot's hue family (h 190–210, chroma at most 0.055): a deep teal ink and a mid teal wash on a pale teal-grey stock, with a red held back for errors. Ink on paper measures about 13.3:1; ink on wash about 5.05:1 in light and 5.2:1 in dark; ink on panel about 10.5:1 in light and 11:1 in dark.

### Primary
- **Press Ink** (`ink`): text, every rule and outline, drawing strokes and hatching, solid controls, the current step box, the open Menu button, menu-row hover, the visitor's chat lines, the numeral inside a washed callout, focus outlines, the scrollbar thumb, the input caret, and the grain specks.

### Secondary
- **Teal Wash** (`wash`): the second ink. It fills only the part being talked about: the active plate's top face (under an ink hatch), the active callout circle, the active layer number in a case study, built and shipped plates (top and side faces) in the suite and origin drawings, the cover's "AI" mark, the "Current" marker on the Experience list, a recognition badge, and the one highlighted origin line on the side-projects page. It is also the text-selection ground, with ink text. Text on wash is always ink.

### Neutral
- **Teal-Grey Stock** (`paper`): page ground, the fill of every drawn plate and figure (so nearer parts hide the linework behind them), the outline-control ground, and the label on solid controls.
- **Steeped Stock** (`panel`, dark: `panel-negative`): paper steeped in the second ink, so the assistant reads as its own sheet laid on the page. It is the ground of the chat panel and the inner-page chat popover, and nothing else. The chat's input field stays paper, and its controls keep ink outlines and invert on hover as on paper.
- **Negative Stock** (`paper-negative`), **Negative Ink** (`ink-negative`), **Negative Wash** (`wash-negative`) and **Negative Steeped Stock** (`panel-negative`): the dark theme. Paper and ink swap ends of the lightness range, wash drops to sit between them while keeping ink-on-wash legible, and panel sits just above the negative paper.

### Tertiary
- **Proof Red** (`error`, dark: `error-negative`): reserved for error and destructive states, mapped to the shadcn `destructive` token. No shipped surface prints it today. It never decorates.

### Named Rules
**The Two Inks Rule.** Everything is printed in ink and wash on paper, and nothing else; the chat's panel is that same paper steeped in wash, not a third ink. Secondary text is not greyed or faded: hierarchy comes from size, weight and width. The only reduced-opacity ink is the chat input placeholder and disabled states. Dark mode prints the same duotone as a negative, and layout, weight and drawings stay the same.

**The Bot Sets The Hue Rule.** Paper, ink and wash are low-chroma members of the Spline bot's teal family, and the bot stays the most saturated object on any page. Don't add a brand hue or an accent from outside that family.

**The Second Ink Means Focus Rule.** Wash marks the part being talked about, or a part that is built and in place, and nothing else. It is never decoration, never a hover colour (hover inverts ink and paper), and never a ground for running text; only short ink labels, numerals and a single highlighted line sit on it. The one exception is `panel`: a separate sheet (the chat), not a focus mark, so it may carry running text and never stands in for wash as a highlight.

## Typography

**Display Font:** Archivo variable with the `wdth` axis (`--font-archivo`), with ui-sans-serif fallback
**Body Font:** Archivo, then Noto Sans KR (`--font-ko`, weights 400/500/700/900) for every Hangul glyph, then system sans
**Label/Mono Font:** Archivo condensed (`wdth` 75) for labels; ui-monospace only inside chat code blocks

**Character:** Archivo is a grotesque with a working width axis, so one family gives the expanded, heavy voice of a manual's step numbers and the condensed voice of its data labels. Noto Sans KR sits behind it at matching weights, so Korean is first-class rather than a fallback.

### Hierarchy
- **Display** (900, `clamp(3.25rem, 8.4vw, 6rem)`, 0.82, width 125%): the NOOWAH wordmark on the cover. It is always Latin, and each letter is a named view-transition part that morphs into the running head's "NWH" (20px, 900, width 125%).
- **Numeral** (900, `clamp(3.75rem, 11vw, 9rem)`, 0.8, width 125%, tabular): the step numeral that opens each step, sticky in its 3-column gutter from md up. Smaller expanded numerals (sub-steps like "2.1" at 30px, the home contents rows, the menu's 01–06 at 18px → 24px md) use the same treatment.
- **Headline** (700, 30px → 48px md → 60px lg, 1.05, -0.025em, balanced): the step title (`h2`).
- **Menu item** (700, 36px → 48px sm → 72px md, 1.05, -0.025em, balanced): the rows of the full-page menu, the largest set text after the numerals and wordmark.
- **Statement** (900, 36px → 60px md, 1.02): the single closing line on a Contact step. Use it once per page.
- **Title** (700, 24–30px, 1.1–1.15, -0.025em): items inside a step, such as principles, layers, Experience entries, and article heads at 30 → 48px. Owned responsibilities on the Overview are set at 24 → 40px because size is billing.
- **Contents item** (600, 16px → 18px sm → 22px md, 1.25): the labels of the cover's five contents rows. It is the cover's own step, sized so the five rows fit the bottom band beside the help figure.
- **Highlighted line** (900, 24px → 36px md, 1.25, -0.025em, on wash): the one origin line on the side-projects page, printed as a wash block (8px × 12px) with ink text. Use it at most once per page.
- **Body lead** (400, 18px, 1.625, max 62ch): the opening paragraph of a step.
- **Body** (400, 15–16px, 1.625, max 48–62ch): descriptions, glosses and chat messages (15px).
- **Data label** (600, 14px or 12px, uppercase, +0.025em, width 75%, tabular): sub-step numbers (4.1), plain item counts (6), product status (Live, In development), the cover's "Portfolio" line, the menu's "Portfolio · {year}", the colophon's issue line, and locale codes.
- **Drawing label** (700, 13px, line-height 1, ink fill): text set inside an SVG drawing. Callout numerals are 13px, always Latin. Module names in the suite drawing and the captions and "Core" callout in the origin drawing are 15px (drawing caption); localized captions fall through to Noto Sans KR. Plate names set on a top face are 11 in the face's 0–100 detail box. All are in the drawing's own user units, so they scale with the drawing rather than sitting on the page ramp.

### Named Rules
**The Width Axis Rule.** Width encodes role. Expanded (`font-stretch: 125%`) is for numerals and the wordmark. Condensed (75%) is for sub-step numbers, counts, statuses and issue lines. Normal width is for everything a visitor reads in sentences.

**The Size Is Billing Rule.** What he owns is set largest: step numerals, owned products and product domains outrank every description on the sheet.

**The Data Label Rule.** Uppercase condensed tracked type is data. It labels a sub-step, a count, a status or an issue. It is never a label stacked above a heading.

**The Drawn Not Written Rule.** The manual lives in the visuals (numerals, drawings, duotone, grain), never in the words. Copy is professional portfolio wording in EN and KO: sections are Overview, Experience, Principles, Work and Contact (소개, 경력, 원칙, 프로젝트, 연락처), and the pages are Home, About, the Synolink CMS case study and Side projects (사이드 프로젝트). Don't write assembly, parts, bags, part numbers, "1×" counts, "steps to go", "You are here" or help-desk wording into labels, headings or buttons. Step numerals, sub-step numbers, ✓/✕ marks, the hand pointer, the help figure and the zip seal carry the theme without words.

**The Hangul Rule.** Under `lang-ko`, headings and paragraphs use `word-break: keep-all`, and negative tracking eases to -0.01em. The wordmark stays in Archivo.

## Layout

The page is a sheet on a 12-column grid with 24px column gaps. Step sheets are capped at 1440px. The cover and running head are capped at 1680px. Gutters are 20px on phones and 32px from sm up.

Each step is a `StepSection`. A full-width 1.5px ink rule sits on top, with 32px above the content and 56px below it on phones, growing to 48px and 80px from md. The numeral holds columns 1–3 and the content holds 4–12. A short aside can sit flush right beside the heading. Inside a step, items are separated by ink rules, not boxes or gaps alone. One drawing per step is the norm.

The home cover fills the viewport and has three bands, with no running head. The top band holds the wordmark, role and scope, with the theme and locale marks and the owned-products list on the right. The middle band is empty paper reserved for the Spline bot, labelled with the "AI" callout, which is the cover's primary action (see Components). From lg it hangs on a leader line beside the bot; below lg it is a full-width row directly under the bot. The bottom band holds the five numbered contents rows (About, Experience, Works, Side projects, Contact; the cover's nav) on the left, and from sm the help figure with "Email" and the address on the right. Phones reach contact through the last contents row.

On every other page the running head is fixed at 56px on paper with an ink rule underneath. It holds the "NWH" logo, the step counter centred, the theme and locale marks, and the Menu button at the right edge. It carries no inline page links and no dropdown: every page link lives in the full-page menu, which covers the viewport beneath the running head.

Responsive behaviour: below sm, the step counter collapses to one solid box reading "current/total", and tapping it advances one step. The Menu button drops its word and shows only its two bars. The menu's rows grow from 36px to 48px at sm and 72px at md. The cover's right column folds its name and owned products under the role. The exploded drawing becomes a pinned strip under the running head with its callout column removed. Long-form layer lists give each item 38vh (52vh from lg) so scroll position drives which part is hatched.

Manual pages share one order: an Overview step first, one step per subject, and a Contact step last (the statement line, a solid "Ask the AI assistant" control, outline email and back links, and the help figure). The side-projects page follows it: Overview, content-builder, Form Builder, node-pr-versioning, Contact. The lead subject may carry the page's one highlighted line and one drawing; each subject step ends with one solid action and outline links.

### Named Rules
**The Empty Paper Rule.** Empty paper is charged, not wasted. Don't fill the cover's centre, the numeral gutter, or the space around a drawing.

**The Counter Shows Position, The Menu Is The Nav Rule.** Every manual page registers its steps with `ManualSteps`, and the running head's counter shows only where the reader is: numbered boxes with the open one filled, plus the open section's label from lg. It never counts down. Page-to-page navigation lives in one place, the full-page menu. Don't add inline header links, a dropdown, or a second in-page navigation.

## Elevation & Depth

The printed page is flat. Depth is drawn, not shaded. Isometric plates have visible side faces, and every drawn shape is filled with paper so nearer parts hide the linework behind them. Exploded views separate parts with dashed vertical guides, and the part the text is talking about gets a wash top face under ink hatching (45°, 5px pitch). Shadow belongs only to the one thing that floats above the sheet: the chat panel. The full-page menu is not a floating layer: it is another sheet of the same paper laid over the page (z-index 45, no shadow, no scrim), with the running head lifted above it (z-index 46) so Close stays in reach.

The stock has a tooth. A static grain layer (`body::after`, fixed, z-index 200, pointer-events none) sits over the whole viewport, the Spline bot and the chat included. It is an SVG `feTurbulence` fractal-noise tile (220px, base frequency 0.85, 3 octaves) mapped to ink-coloured alpha specks (paper-coloured in dark), with no blend mode, at `--grain` opacity (0.45 light, 0.2 dark). It is hidden in print. Grain is material, not depth: it never varies by element and never implies a layer.

### Shadow Vocabulary
- **Floating sheet** (`box-shadow: 0 18px 40px -18px rgb(0 0 0 / 0.45)`): the chat panel and chat popover only. Phones open the chat full-screen with no border.

### Named Rules
**The Occlusion Rule.** Depth on the sheet comes from paper fills and drawn thickness, never from drop shadows, gradients or blur.

**The Floating Layer Rule.** A shadow means "not printed on this page". Only the chat layer has one. Cards, controls and drawings sit flat.

**The Grain Over Everything Rule.** One grain layer covers the whole viewport, bot included, so everything reads as printed on the same stock. Don't add per-component noise, blend modes or a second texture, and don't let anything stack above the grain.

## Shapes

Corners are square. Controls, boxes, tables, chat panels and visitor message blocks use 0 radius. The shadcn radius token is a 2px hairline, so leftover shadcn primitives (the chat popover) print nearly square. Circles appear only where a manual uses them: numbered callouts (26px in drawings, 40px beside layer text, 36px for the cover's "AI" callout), the leader-line dot, drawn heads, and a stack box's seal hole.

One stroke weight runs through everything: `--stroke` (1.5px) for borders, rules, underlines and drawing outlines. Drawings keep it constant at any scale through `vector-effect: non-scaling-stroke`. Linework details on a plate's top face drop to 1.25px, assembly guides to 1px dashed (3/4), and the tick and cross inside do/don't marks thicken to 2.25px. Hover and current states thicken underlines to 3px.

Dashed lines carry meaning. A dashed outline or underline marks something not built yet, not claimed, or disabled: an unshipped product, the "not claimed" panel, a boxed aside, or a disabled control.

### Named Rules
**The One Stroke Rule.** Structure is drawn at 1.5px. A second weight at rest is a mistake. Weight changes only for drawn detail (thinner) or state (3px underline).

**The Dashed Means Not-Yet Rule.** Use a dashed line only for a part that does not exist yet, a claim not made, a disabled control, or an assembly guide (the origin drawing's "became" arrow is one). It is never decoration.

## Components

### Buttons
Rectangular ink-outlined controls, tactile and plain, like a "press here" box on a printed sheet.
- **Shape:** square corners, 1.5px ink border, 12px × 16px padding, 16px medium text with line-height 1. When a control carries an arrow, the label and arrow are spread apart with a 16px gap.
- **Solid:** ink ground, paper label. Use it for the one committed action on a sheet: Ask the AI assistant (on a Contact step), Read the case study, Visit the product, Demo. The cover has no solid control; its committed action is the AI callout.
- **Outline:** paper ground, ink label. Use it for everything else (email, GitHub, blog, Back to About).
- **Hover / Focus / Active:** hover inverts ink and paper with no tinting (150ms, snap ease). The drawn arrow nudges 2px right. Active presses down 1px. Focus is a 2px ink outline offset 3px. Disabled switches to a dashed border.
- **Icon marks:** 32px square ink-outlined boxes (theme toggle, chat close) invert on hover. The locale toggle is a joined row of these boxes, and the current locale is filled.

### Chips
- **Style:** stack chips are 1.5px ink-bordered rectangles with 2px × 8px padding and 14px medium text. Chat suggestions are the same at 6px × 10px and invert on hover.
- **State:** no selected state. Disabled suggestions take a dashed border.
- **Position marker:** "Current" (KO 현재) on the About page's Experience list prints as a borderless wash block (2px × 6px) with ink text, inline after the year and place.
- **Recognition badge:** an outside recognition of a project (e.g. "Listed on awesome-shadcn-ui") prints in the data label (14px, 600, uppercase, condensed) on a wash block with a 1.5px ink border, 4px × 8px. It is a status, so it sits beside the description, never above a heading.

### Cards / Containers
- **Corner Style:** square (0).
- **Background:** paper; containers are outlined, never filled.
- **Shadow Strategy:** none (see Elevation & Depth).
- **Border:** 1.5px ink. Dashed for asides and "not claimed" panels.
- **Internal Padding:** 16–24px. Spec tables use 8px × 12px cells.
- **Stack box:** an outlined box with a 20px "zip seal" strip on top (a seal hole plus a double rule). Its head shows the group label (20px, 700) and a plain item count in the data label. Its items are listed inline at 15px medium, with no part numbers. The boxes sit three across from md under a visible "Skills & stack" heading (14px, 700).
- **Spec table:** an outlined definition list with a 7rem label column split by a vertical ink rule and rows split by ink rules.
- **Do / Don't panel:** a square box headed by a drawn tick or cross mark. Its items sit on dashed rules.

### Inputs / Fields
- **Style:** the chat composer is a full-width row under an ink rule. A borderless paper input (16px, 12px × 16px) sits beside a 48px solid ink send cell with a 1.5px left rule.
- **Focus:** the global 2px ink outline. The input's own outline is suppressed because the row is the field.
- **Error / Disabled:** disabled input text and the send cell drop to reduced opacity. Error colour is reserved and not yet used.

### Navigation
- **Running head:** a 56px paper bar over a 1.5px ink rule. "NWH" in expanded 900 at 20px, underlined on hover. No inline page links.
- **Step counter:** joined 32px boxes with numbers in 14px bold tabular type. The current box is filled with ink, and the others invert on hover. From lg, the open section's label (14px bold) sits beside it. It shows position only, never a remaining count, and it hides while the menu is open.
- **Menu button:** a 32px-tall ink-outlined box at the right of the running head, 10px side padding. A 12px bold uppercase "Menu" / "Close" word shows from sm, beside two 1.5px bars (14px wide) that cross into an X over 300ms on the snap ease. It inverts on hover and stays filled with ink while the menu is open. `aria-expanded` and `aria-controls` point at the menu.
- **Cover contents:** five full-width rows split by ink rules, each with an expanded 900 number, a label in the contents-item style (16px → 18px sm → 22px md), and a drawn arrow. The whole row inverts on hover, and the arrow travels 4px.
- **Mobile:** the step counter collapses to one "current/total" box, and the Menu button shows its bars alone. All page links live in the full-page menu at every width.

### Full-Page Menu
The site's one page-to-page navigation, opened by the Menu button. It is a dialog (`role="dialog"`, modal) that lays a plain paper sheet over the whole viewport, padded 56px at the top so the running head, lifted above it, stays visible and Close stays in reach. No shadow, no scrim, no blur. The list sits vertically centred in the 1680px frame with the page gutters.
- **Rows:** split by 1.5px ink rules, with rules above the first and below the last. Each row holds an expanded 900 tabular numeral (01–05, 18px → 24px md, right-aligned in a 48px → 80px column) and the label in the menu-item style (36px → 48px sm → 72px md). Vertical padding is 12px, 16px from md. Items: Home, About, Works (About's Work step), Side projects, Writing and GitHub, numbered 01–06. The two external items carry the drawn arrow rotated 45°, which travels 4px on hover.
- **States:** hover inverts the whole row (ink ground, paper text). The current page's label is underlined at 3px. Focus is the global 2px ink outline.
- **Footer strip:** the email with a 1.5px underline on the left, and "Portfolio · {year}" in the condensed uppercase data label on the right, both at 14px.
- **Motion:** rows rise 16px and fade in over 500ms on the snap ease, 70ms apart, the first at 80ms. Under reduced motion they appear in place without travel (the inline stagger delay still applies).
- **Behaviour:** Escape or any link closes it, and it closes on route change. While open, page scroll locks, `main` is inert, focus moves to the first row, and on close focus returns to the Menu button.

### Exploded View (signature)
`AssemblyStack` and `SuiteDrawing` draw isometric 2:1 plates with 9–14px visible thickness. Each plate's top face carries a detail drawing authored in a 0–100 box. Parts are connected by dashed guides and labelled with numbered callouts on horizontal leaders. The active part's top face is filled with wash under an ink hatch, and its callout fills with wash while the numeral stays ink. In `SuiteDrawing`, built and shipped modules are `washed`: wash on the top face with no hatch and on both side faces, because a built part is solid second ink all round. Beside the case study's drawing, the layer list's 40px numbered circles fill with wash for the active layer. Parts enter lifted by 45% of the gap and snap down over 0.7s with a 0.12s stagger on `cubic-bezier(0.16, 1, 0.3, 1)`, once the drawing is 25% in view. Unshipped modules stay exploded above their sockets and are drawn dashed.

### Origin Drawing
`OriginDrawing` tells where a product came from, using the same isometric plates. On the left a single washed plate stands alone (the personal project, its name set on the face), with a caption under it. A dashed arrow points right. On the right the product's stack is built on that same washed plate as its core, with two paper plates above it and a "Core" callout (leader with a dot, 15px label) on the core. The paper plates start lifted and drop onto the core over 0.7s on the snap ease, 0.14s apart after a 0.2s delay, once 40% of the drawing is in view; under reduced motion they are drawn seated. Captions are 15px bold.

### AI Callout (cover)
The cover's primary action and the way into the chat. It is one `<button>` with `aria-expanded` and the accessible name "Ask the AI assistant", drawn as a callout: a 1.5px ink leader line (64px), a 36px circle filled with wash reading "AI" (14px bold ink), and a paper label box with a 1.5px ink border (12px × 16px, 16px semibold, max 26ch) holding the label and a drawn arrow. Hover inverts the label box, and the arrow travels 4px. Below lg it drops the leader and becomes a full-width row directly under the bot (box at 10px × 12px, 14px). Opening the chat plays the Spline bot's own zoom; while the chat is open the callout hides (opacity 0 over 200ms, pointer-events none), because the panel and the zoomed bot cover it.

### Drawn Marks (signature)
The help figure (a person with a "?" bubble) closes every page and the cover. The hand pointer introduces a throughline. Tick and cross marks head rule panels. A small path drawing (64×48) heads each Experience entry. All of them use round caps and joins, `currentColor` strokes and paper fills. They are authored SVG and are never replaced by icon tiles or glyphs. Utility icons (menu, sun/moon, close, send) come from Tabler at stroke 1.75.

### Chat
The chat panel is a 400×500px sheet of `panel` stock (full-screen on phones) with a 1.5px ink border and the floating-sheet shadow, so the assistant reads as its own sheet laid on the page; the inner-page popover uses the same ground. Its header is split off by an ink rule. The composer's input stays paper. Visitor lines print inverted (an ink block, 10px × 14px). Assistant lines print as plain ink at 15px. Code and tables inside answers are outlined in ink. The panel opens over 0.45s on the snap ease and closes over 0.2s. The Spline bot's mount, bubble morph and spring behaviour belong to its own component and are not system tokens.

## Do's and Don'ts

### Do:
- **Do** print everything in `ink` on `paper`, and build hierarchy from size, weight (400/600/700/900) and Archivo's width axis.
- **Do** spend `wash` only on the part being talked about (active plate, active callout or layer number, the cover's "AI" mark, the "Current" marker, a recognition badge, one highlighted line per page) or a built module, always with ink on top.
- **Do** use `panel` only as the chat's ground, with the input field kept on paper.
- **Do** keep the one grain layer above everything, the bot included, and hide it in print.
- **Do** open every manual section with a `StepSection`: an edge-to-edge 1.5px ink rule, an expanded 900 numeral in the 3-column gutter, and one fact or drawing per step.
- **Do** draw illustrations as authored SVG at the 1.5px stroke with paper fills, so nearer parts occlude farther ones.
- **Do** make hover invert ink and paper on controls, rows and boxes, and thicken underlines to 3px on links.
- **Do** use the solid ink control once per sheet for its committed action, and outline controls for everything else.
- **Do** set sub-step numbers, counts and statuses in the condensed uppercase data label, inline with the thing they label.
- **Do** write professional portfolio copy in EN and KO, and let numerals, drawings, duotone and grain carry the manual.
- **Do** put every page link in the full-page menu, and keep the running head's counter to position only.
- **Do** run motion on `cubic-bezier(0.16, 1, 0.3, 1)` from an already-visible state, and render drawings already assembled under `prefers-reduced-motion`.
- **Do** ship every string in EN and KO and check the Korean set for `keep-all` wrapping and eased tracking.

### Don't:
- **Don't** introduce a hue outside the bot's teal family, a grey tint, or opacity-faded text for hierarchy.
- **Don't** use wash for hover, decoration or a running-text ground. Hover inverts ink and paper.
- **Don't** round corners on controls, boxes or panels, or add a second stroke weight at rest.
- **Don't** put shadows, gradients or blur on anything printed on the sheet. Only the chat layer floats.
- **Don't** put an uppercase label, kicker or eyebrow above a heading. Condensed caps are for data only.
- **Don't** write the manual into the words: no "assembly", "parts", "bag", part numbers, "1×", "steps to go" or "You are here" in labels, headings or buttons.
- **Don't** add inline header links, a dropdown, or a countdown to the running head.
- **Don't** replace drawings with icon tiles, emoji or Unicode glyphs.
- **Don't** fall back to the dev-portfolio default of hero, bento grid and dark neon accent.
- **Don't** parody a specific furniture brand's manual (its mascots, tools or naming). The manual is the grammar, not the joke.
- **Don't** use dashed lines decoratively. Dashed means not built, not claimed, disabled, or an assembly guide.
- **Don't** fill the cover's centre or the numeral gutter. That empty paper is part of the design.
