'use client';

import { useChatContext } from '@/app/[locale]/_components/chat-context';
import {
  ArrowMark,
  CheckMark,
  CrossMark,
  HandPointer,
  HelpFigure,
  PathDrawing,
} from '@/components/manual/drawings';
import { InkButton, InkLink, TextLink } from '@/components/manual/ink';
import { ManualSteps, StepSection } from '@/components/manual/steps';
import { SuiteDrawing } from '@/components/manual/suite-drawing';
import { getBlogUrl } from '@/lib/blog';
import { raw, strings } from '@/lib/intlayer-raw';
import { cn } from '@/lib/utils';
import { getLocalizedUrl } from 'intlayer';
import { useIntlayer, useLocale, type NextPageIntlayer } from 'next-intlayer';

type Entry = { year: string; place: string; title: string; body: string };
type Principle = { quote: string; gloss: string };
type Workstream = { label: string; tag: string };
type Product = {
  name: string;
  kicker: string;
  body: string;
  status: string;
  /** Absent while a product is unlaunched — the row renders inert. */
  href?: string;
  /** My part in this product, when it differs from the suite-level role. */
  role?: string;
};
type StackGroup = { label: string; items: string[] };
type Fact = { label: string; value: string };

const STEP_IDS = ['box', 'steps', 'rules', 'projects', 'contact'] as const;

/** Small condensed label set in front of a value (part numbers, counts). */
const Tag = ({ children, className }: { children: React.ReactNode; className?: string }) => (
  <span
    className={cn(
      'font-narrow tabular shrink-0 text-sm font-semibold uppercase tracking-wide',
      className
    )}
  >
    {children}
  </span>
);

const AboutPage: NextPageIntlayer = () => {
  const c = useIntlayer('about');
  const { locale } = useLocale();
  const { isOpen, setIsOpen } = useChatContext();
  const ui = c.ui;

  const facts = Object.entries(c.lede.facts) as Array<[string, Fact]>;
  const pathEntries = Object.entries(c.path.entries) as Array<[string, Entry]>;
  const principles = Object.entries(c.principles.items) as Array<[string, Principle]>;
  const workstreams = Object.entries(c.practice.workstreams) as Array<[string, Workstream]>;
  const products = Object.entries(c.practice.synolink.products) as Array<[string, Product]>;
  const stack = Object.entries(c.practice.stack) as Array<[string, StackGroup]>;
  const side = useIntlayer('side-projects');

  const email = raw(c.meta.email);
  const steps = STEP_IDS.map((id, i) => ({
    id,
    label: raw(
      [ui.steps.box, ui.steps.path, ui.steps.rules, ui.steps.assemblies, ui.steps.help][i]
    ),
  }));

  const owned = [
    c.practice.workstreams.platform.label,
    c.practice.workstreams.marketing.label,
    c.practice.boxout.title,
    ui.ownsSuite,
  ];

  return (
    /* overflow-x-clip, NOT overflow-x-hidden: `hidden` forces overflow-y to
       `auto`, which makes this div a scroll container and silently breaks
       every `sticky` descendant (the step numerals). */
    <div className="w-full overflow-x-clip">
      <ManualSteps steps={steps} />

      {/* 1 — In the box */}
      <StepSection id="box" n={1} title={ui.steps.box} aside={ui.asides.box} className="border-t-0">
        <div className="grid grid-cols-9 gap-x-6 gap-y-12">
          <div className="col-span-9 lg:col-span-6">
            <p className="mb-4 text-lg font-semibold">
              {c.meta.name} <span className="font-ko">{c.meta.nameKo}</span> · {c.meta.title}
            </p>
            <h3 className="sr-only">{ui.owns}</h3>
            <ul className="border-t-[length:var(--stroke)] border-ink">
              {owned.map((item, i) => (
                <li
                  key={i}
                  className="border-b-[length:var(--stroke)] border-ink py-2.5 md:py-3"
                >
                  <span className="balance text-2xl font-bold leading-[1.1] tracking-tight md:text-[2.5rem]">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
            <p className="mt-6 max-w-[62ch] text-lg leading-relaxed">{c.lede.p1}</p>
          </div>

          <aside className="col-span-9 sm:col-span-6 lg:col-span-3">
            <h3 className="mb-3 text-sm font-bold">{ui.spec}</h3>
            <dl className="border-[length:var(--stroke)] border-ink">
              {facts.map(([key, f]) => (
                <div
                  key={key}
                  className="grid grid-cols-[7rem_1fr] border-b-[length:var(--stroke)] border-ink last:border-b-0"
                >
                  <dt className="border-r-[length:var(--stroke)] border-ink px-3 py-2 text-sm font-semibold">
                    {f.label}
                  </dt>
                  <dd className="px-3 py-2 text-sm">
                    {key === 'writing' ? (
                      <TextLink href={getBlogUrl(locale)} external>
                        {f.value}
                      </TextLink>
                    ) : (
                      f.value
                    )}
                  </dd>
                </div>
              ))}
            </dl>
          </aside>
        </div>
        <h3 className="mt-12 mb-4 text-sm font-bold">{ui.stack}</h3>
        <div className="grid gap-6 md:grid-cols-3">
          {stack.map(([key, group]) => {
            const items = strings(group.items);
            return (
              <div key={key} className="border-[length:var(--stroke)] border-ink">
                {/* the bag's zip seal */}
                <div className="flex h-5 items-center gap-2 border-b-[length:var(--stroke)] border-ink px-3">
                  <span className="size-2.5 rounded-full border-[length:var(--stroke)] border-ink" />
                  <span className="h-[5px] flex-1 border-y-[length:var(--stroke)] border-ink" />
                </div>
                <div className="flex items-baseline justify-between gap-3 px-4 pt-3">
                  <h3 className="text-xl font-bold tracking-tight">{group.label}</h3>
                  <Tag>{items.length}</Tag>
                </div>
                <ul className="flex flex-wrap gap-x-4 gap-y-1.5 px-4 pt-2 pb-4">
                  {items.map(item => (
                    <li key={item} className="text-[15px] font-medium">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </StepSection>

      {/* 2 — Assembly steps (the path) */}
      <StepSection id="steps" n={2} title={ui.steps.path} aside={c.path.standfirst}>
        <ol className="grid gap-x-8 gap-y-10 sm:grid-cols-2 xl:grid-cols-3">
          {pathEntries.map(([key, e], i) => {
            const isNow = i === pathEntries.length - 1;
            return (
              <li
                key={key}
                aria-current={isNow ? 'step' : undefined}
                className="flex flex-col gap-3 border-t-[length:var(--stroke)] border-ink pt-4"
              >
                <div className="flex items-end justify-between gap-3">
                  <span className="font-latin font-wide tabular text-3xl font-black leading-none">
                    2.{i + 1}
                  </span>
                  <PathDrawing step={key} className="h-12 w-16 shrink-0" />
                </div>
                <h3 className="balance text-xl font-bold leading-tight tracking-tight">
                  {e.title}
                </h3>
                <p className="text-sm font-semibold">
                  {e.year} · {e.place}
                  {isNow && (
                    <span className="ml-2 bg-wash px-1.5 py-0.5 text-ink">{ui.here}</span>
                  )}
                </p>
                {/* Phones keep the title as the step's one fact; the story is
                    still one tap away through the assistant. */}
                <p className="hidden text-[15px] leading-relaxed sm:block">{e.body}</p>
              </li>
            );
          })}
        </ol>
        <p className="mt-12 flex items-center gap-4 text-2xl font-bold leading-tight tracking-tight md:text-3xl">
          <HandPointer className="w-14 shrink-0" />
          <span className="balance">{c.path.throughline}</span>
        </p>
      </StepSection>

      {/* 3 — Rules */}
      <StepSection id="rules" n={3} title={ui.steps.rules} aside={ui.asides.rules}>
        <ol className="grid gap-x-6 gap-y-10 lg:grid-cols-3">
          {principles.map(([key, p]) => {
            const Mark = key === 'depth' ? CrossMark : CheckMark;
            return (
              <li key={key} className="border-t-[length:var(--stroke)] border-ink pt-5">
                <h3 className="balance flex items-start gap-3 text-2xl font-bold leading-[1.15] tracking-tight md:text-3xl">
                  <Mark className="mt-1 size-7 shrink-0" />
                  <span>{p.quote}</span>
                </h3>
                <p className="mt-4 max-w-[48ch] text-base leading-relaxed">{p.gloss}</p>
              </li>
            );
          })}
        </ol>
      </StepSection>

      {/* 4 — Assemblies */}
      <StepSection id="projects" n={4} title={ui.steps.assemblies} aside={ui.asides.assemblies}>
        {/* 4.1 CloudHospital */}
        <article className="border-t-[length:var(--stroke)] border-ink pt-6">
          <div className="flex items-baseline gap-4">
            <Tag>4.1</Tag>
            <h3 className="balance text-3xl font-bold leading-tight tracking-tight md:text-5xl">
              {ui.platformTitle}
            </h3>
          </div>
          <p className="mt-6 max-w-[62ch] text-lg leading-relaxed">{c.practice.lead}</p>
          <p className="mt-4 max-w-[70ch] text-base font-semibold leading-relaxed">
            {workstreams.map(([key, w], i) => (
              <span key={key}>
                {i > 0 && <span aria-hidden> · </span>}
                {w.label}
              </span>
            ))}
          </p>
          <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3 border-[length:var(--stroke)] border-dashed border-ink px-5 py-4">
            <h4 className="text-xl font-bold leading-tight tracking-tight">
              {c.practice.boxout.title}
            </h4>
            <ul className="flex flex-wrap gap-2">
              {strings(c.practice.boxout.stack).map(s => (
                <li key={s} className="border-[length:var(--stroke)] border-ink px-2 py-0.5 text-sm font-medium">
                  {s}
                </li>
              ))}
            </ul>
          </div>
        </article>

        {/* 4.2 Synolink */}
        <article className="mt-16 border-t-[length:var(--stroke)] border-ink pt-6">
          <div className="flex items-baseline gap-4">
            <Tag>4.2</Tag>
            <h3 className="balance text-3xl font-bold leading-tight tracking-tight md:text-5xl">
              {ui.suiteTitle}
            </h3>
          </div>
          <p className="mt-4 max-w-[62ch] text-lg leading-relaxed">
            {c.practice.synolink.deck} <strong className="font-bold">{c.practice.synolink.role}</strong>
          </p>
          <div className="mt-8 grid items-start gap-10 lg:grid-cols-9">
            <figure className="lg:sticky lg:top-24 lg:col-span-4">
              <SuiteDrawing
                title={raw(ui.figure1)}
                base="synolink.ai"
                modules={products.map(([key, p]) => ({
                  id: key,
                  label: raw(p.name).replace('.synolink.ai', ''),
                  shipped: Boolean(p.href),
                }))}
              />
              <figcaption className="mt-3 max-w-[48ch] text-sm leading-snug">{ui.figure1}</figcaption>
            </figure>
            <ul className="border-t-[length:var(--stroke)] border-ink lg:col-span-5">
              {products.map(([key, p]) => (
                <li key={key} className="border-b-[length:var(--stroke)] border-ink py-5">
                  <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                    <h4
                      className={cn(
                        'font-latin text-3xl font-bold tracking-tight md:text-4xl',
                        !p.href && 'underline decoration-dashed decoration-[length:var(--stroke)] underline-offset-8'
                      )}
                    >
                      {p.name}
                    </h4>
                    <Tag>{p.status}</Tag>
                  </div>
                  <p className="mt-1 text-base font-semibold">{p.kicker}</p>
                  {/* The CMS has its own booklet; its row only points there. */}
                  {key !== 'cms' && (
                    <p className="mt-3 max-w-[56ch] text-[15px] leading-relaxed">{p.body}</p>
                  )}
                  {p.role && (
                    <p className="mt-3 flex items-center gap-2 text-sm font-semibold">
                      <ArrowMark />
                      {p.role}
                    </p>
                  )}
                  <div className="mt-4 flex flex-wrap gap-3">
                    {key === 'cms' && (
                      <InkLink
                        href={getLocalizedUrl('/work/synolink-cms', locale)}
                        hrefLang={locale}
                        variant="solid"
                      >
                        {ui.readBooklet}
                      </InkLink>
                    )}
                    {p.href && (
                      <InkLink href={raw(p.href)} external>
                        {raw(ui.visit).replace('{name}', raw(p.name))}
                      </InkLink>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </article>

        {/* 4.3 Side projects: a teaser; the full story has its own page */}
        <article className="mt-16 border-t-[length:var(--stroke)] border-ink pt-6">
          <div className="flex items-baseline gap-4">
            <Tag>4.3</Tag>
            <h3 className="balance text-3xl font-bold leading-tight tracking-tight md:text-5xl">
              {ui.sideTitle}
            </h3>
          </div>
          <div className="mt-6 grid items-end gap-6 border-[length:var(--stroke)] border-ink bg-panel p-5 md:grid-cols-9 md:p-6">
            <div className="md:col-span-6">
              <p className="font-latin text-2xl font-bold tracking-tight md:text-3xl">
                {side.items.contentBuilder.title}
              </p>
              <p className="mt-1 text-base font-semibold">{side.ui.origin}</p>
              <p className="mt-3 max-w-[60ch] text-[15px] leading-relaxed">
                {side.items.contentBuilder.origin}
              </p>
              <p className="mt-3 text-sm font-medium">
                {side.items.formBuilder.title} · {side.items.prVersioning.title}
              </p>
            </div>
            <div className="md:col-span-3 md:justify-self-end">
              <InkLink
                href={getLocalizedUrl('/work/side-projects', locale)}
                hrefLang={locale}
                variant="solid"
              >
                {side.ui.teaser}
              </InkLink>
            </div>
          </div>
        </article>
      </StepSection>

      {/* 5 — Help */}
      <StepSection id="contact" n={5} title={ui.steps.help}>
        <div className="grid items-end gap-10 lg:grid-cols-9">
          <div className="lg:col-span-6">
            <p className="balance text-4xl font-black leading-[1.02] tracking-tight md:text-6xl">
              {ui.contactTitle}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <InkButton variant="solid" aria-expanded={isOpen} onClick={() => setIsOpen(!isOpen)}>
                {ui.ask}
              </InkButton>
              <InkLink href={`mailto:${email}`} arrow={false}>
                {ui.email} · {email}
              </InkLink>
              <InkLink href={`https://${raw(c.meta.github)}`} external>
                GitHub
              </InkLink>
              <InkLink href={getBlogUrl(locale)} external>
                {c.meta.blog}
              </InkLink>
            </div>
          </div>
          <HelpFigure className="hidden w-40 justify-self-end lg:col-span-3 lg:block" />
        </div>

        <footer className="mt-16 flex flex-wrap justify-between gap-4 border-t-[length:var(--stroke)] border-ink pt-4 text-sm">
          <p className="max-w-[60ch]">{ui.colophon}</p>
          <p className="font-narrow font-semibold uppercase tracking-wide">{ui.issueLine}</p>
        </footer>
      </StepSection>
    </div>
  );
};

export default AboutPage;
