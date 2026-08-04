import { getDictionary, type LocalesValues } from 'intlayer';
import aboutContent from '@/app/[locale]/about/about.content';

/**
 * Serialises the about-page dictionary into markdown, so the chat bot and
 * /llms.txt read from the same source the page renders. Add a section to
 * about.content.ts and it shows up here automatically.
 *
 * Anything under `ui` is chrome (button labels, section headings) and is
 * dropped — it is noise in a prompt.
 */

const humanize = (key: string) =>
  key
    .replace(/([a-z0-9])([A-Z])/g, '$1 $2')
    .replace(/^./, (c) => c.toUpperCase());

const isPlainObject = (v: unknown): v is Record<string, unknown> =>
  typeof v === 'object' && v !== null && !Array.isArray(v);

const scalar = (v: unknown) => (Array.isArray(v) ? v.join(', ') : String(v));

const headingKey = (node: Record<string, unknown>) =>
  ['title', 'name', 'label', 'quote'].find(
    (k) => typeof node[k] === 'string' && node[k]
  );

const COLLAPSE_MAX_FIELDS = 5;

const isCollapsible = (
  node: Record<string, unknown>,
  entries: [string, unknown][]
) =>
  entries.length <= COLLAPSE_MAX_FIELDS &&
  entries.every(([, v]) => !isPlainObject(v));

/** Will this value render as its own `##` block rather than a bullet? */
const opensSection = (v: unknown): boolean => {
  if (!isPlainObject(v)) return false;
  const entries = Object.entries(v).filter(([, x]) => x != null && x !== '');
  return entries.length > 0 && !isCollapsible(v, entries);
};

// ponytail: headings cap at h4 — deeper nesting reads fine as bullets, and the
// dictionary has never gone past 4 levels.
function walk(node: unknown, label: string, depth: number): string[] {
  if (node == null || node === '') return [];

  if (Array.isArray(node)) {
    const flat = node.filter((v) => typeof v === 'string' || typeof v === 'number');
    return flat.length ? [`- **${label}**: ${flat.join(', ')}`] : [];
  }

  if (isPlainObject(node)) {
    const entries = Object.entries(node).filter(
      ([, v]) => v != null && v !== ''
    );
    if (!entries.length) return [];

    // A small record of scalars is a single fact, not a section. Collapse it to
    // one bullet headed by its own name, so `{label:'Role', value:'Product
    // Engineer'}` reads as "- **Role**: Product Engineer" rather than a
    // three-line heading block that repeats the key.
    if (isCollapsible(node, entries)) {
      const headKey = headingKey(node);
      const head = headKey ? String(node[headKey]) : label;
      const rest = entries
        .filter(([k]) => k !== headKey)
        .map(([, v]) => scalar(v));
      return rest.length ? [`- **${head}**: ${rest.join(' — ')}`] : [`- ${head}`];
    }

    // An object's own `title` names the section better than its key does
    // ("Off the clock" beats "Offclock").
    const ownTitle = typeof node.title === 'string' ? node.title : null;
    const body = entries.filter(([k]) => k !== (ownTitle ? 'title' : null));

    // Bullets must precede nested headings, or a scalar sibling that happens to
    // be declared after a subsection reads as though it belongs to it — which
    // silently reparented the CI/CD boxout under "Workstreams".
    const rank = ([, v]: [string, unknown]) => (opensSection(v) ? 1 : 0);
    const ordered = [...body].sort((a, b) => rank(a) - rank(b));

    const children = ordered.flatMap(([k, v]) => walk(v, humanize(k), depth + 1));
    if (!children.length) return [];
    const heading = `${'#'.repeat(Math.min(depth, 4))} ${ownTitle ?? label}`;
    return ['', heading, '', ...children];
  }

  return [`- **${label}**: ${String(node)}`];
}

export function buildBio(locale: LocalesValues): string {
  const resolved = getDictionary(aboutContent, locale) as Record<string, unknown>;
  const { ui: _ui, ...facts } = resolved;

  return Object.entries(facts)
    .flatMap(([key, value]) => walk(value, humanize(key), 2))
    .join('\n')
    .trim();
}

export function buildSystemPrompt(locale: LocalesValues): string {
  // Behaviour, not biography — the facts all come from buildBio.
  return `You are an AI assistant on Hawoon Joh's personal blog. He goes by the handle "NOOWAH" online, pronounced "누와" (not "노와") — it's "Hawoon" spelled backwards.

Everything you know about him is below. It is generated from the same content that renders his about page, so treat it as current and authoritative.

${buildBio(locale)}

## Your role
- Help visitors learn about Hawoon's work, projects, and background.
- Be concise: answer in 1-3 short sentences by default. Only go longer if the visitor asks for detail or a list is genuinely needed.
- If asked about something not covered above, say so honestly rather than guessing. Never invent metrics, dates, employers, or numbers — he has deliberately chosen not to publish performance or traffic figures.
- Only share a URL that appears verbatim above. Some product names are domain-shaped (for example \`cms.synolink.ai\`) but are not necessarily reachable sites. If an item is marked "In development", say it is not available yet and do not build, link, or suggest visiting a URL for it.
- Reply in the same language the visitor writes in (English or Korean).
- Use markdown where it helps (lists, bold, code blocks).`;
}
