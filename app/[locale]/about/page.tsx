'use client';

import React from 'react';
import { NextPageIntlayer, useIntlayer } from 'next-intlayer';
import { motion, useReducedMotion } from 'motion/react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  IconBrandGithub,
  IconExternalLink,
  IconArrowUpRight,
} from '@tabler/icons-react';

const EASE = [0.22, 1, 0.36, 1] as const;

/* Shared reveals. Note there is deliberately no scroll-linked motion on this
   page: `<main>` in about/layout.tsx is the scroll container, not the window,
   so useScroll() would need a container ref to work at all. whileInView uses
   an IntersectionObserver rooted at the viewport, which sees through the
   nested scroller correctly. */
const revealUp = {
  initial: { opacity: 0, y: 16 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.35 },
  transition: { duration: 0.7, ease: EASE },
};

const Rule = ({ className = '' }: { className?: string }) => (
  <motion.div
    initial={{ scaleX: 0 }}
    whileInView={{ scaleX: 1 }}
    viewport={{ once: true }}
    transition={{ duration: 0.9, ease: EASE }}
    className={`h-px w-full bg-border origin-left ${className}`}
  />
);

/** Section wrapper with the folio rail that runs down the whole page. */
const Spread = ({
  id,
  number,
  label,
  children,
}: {
  id?: string;
  number: string;
  label: React.ReactNode;
  children: React.ReactNode;
}) => (
  <section
    id={id}
    className="scroll-mt-24 max-w-5xl mx-auto px-6 py-20 md:py-28 border-t border-border/40 dark:border-border/80"
  >
    <div className="grid grid-cols-1 md:grid-cols-12 gap-y-8 md:gap-x-8">
      <aside className="md:col-span-2 md:sticky md:top-10 md:self-start">
        <span className="font-mono text-[10px] tracking-[0.22em] text-primary">
          {number}
        </span>
        <div className="mt-3 w-8 h-px bg-primary" />
        <p className="mt-3 text-[10px] font-medium uppercase tracking-[0.28em] text-muted-foreground">
          {label}
        </p>
      </aside>
      <div className="md:col-span-10 md:col-start-3">{children}</div>
    </div>
  </section>
);

/** One hairline row: label left, value right. Used four times over. */
const RuledRow = ({
  label,
  value,
  interactive = false,
}: {
  label: React.ReactNode;
  value: React.ReactNode;
  interactive?: boolean;
}) => (
  <div
    className={`flex items-baseline justify-between gap-4 py-3 border-b border-border/40 dark:border-border/80 ${
      interactive ? 'group' : ''
    }`}
  >
    <span
      className={`text-sm text-foreground/80 ${
        interactive
          ? 'transition-transform duration-300 group-hover:translate-x-1 group-hover:text-primary'
          : ''
      }`}
    >
      {label}
    </span>
    <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground/60 shrink-0">
      {value}
    </span>
  </div>
);

const SectionTitle = ({ children }: { children: React.ReactNode }) => (
  <motion.h2
    {...revealUp}
    className="display font-serif font-bold uppercase text-[clamp(1.75rem,5vw,3rem)] leading-[0.95] tracking-[-0.03em] mb-10"
  >
    {children}
  </motion.h2>
);

/** Fig. 1 — the "standalone, or composed" thesis, drawn. */
const PluginDiagram = ({ caption }: { caption: React.ReactNode }) => {
  const reduce = useReducedMotion();
  const nodes = [
    { x: 90, y: 26, label: 'cms' },
    { x: 154, y: 134, label: 'inbox' },
    { x: 26, y: 134, label: 'ehr' },
  ];
  const chords = [
    [0, 1],
    [1, 2],
    [2, 0],
  ];

  return (
    <figure className="my-12 mx-auto max-w-[13rem]">
      <svg viewBox="0 0 180 160" className="w-full h-auto" aria-hidden="true">
        {chords.map(([a, b], i) => (
          <motion.line
            key={i}
            x1={nodes[a].x}
            y1={nodes[a].y}
            x2={nodes[b].x}
            y2={nodes[b].y}
            stroke="var(--border)"
            strokeWidth="1"
            initial={reduce ? undefined : { pathLength: 0 }}
            whileInView={reduce ? undefined : { pathLength: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.1, delay: i * 0.15, ease: EASE }}
          />
        ))}
        {nodes.map((n, i) => (
          <motion.g
            key={n.label}
            initial={reduce ? undefined : { opacity: 0, scale: 0.6 }}
            whileInView={reduce ? undefined : { opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 + i * 0.12, ease: EASE }}
            style={{ transformOrigin: `${n.x}px ${n.y}px` }}
          >
            <circle cx={n.x} cy={n.y} r="5" fill="var(--primary)" />
            <text
              x={n.x}
              y={n.y - 12}
              textAnchor="middle"
              className="fill-muted-foreground"
              style={{ fontSize: 9, letterSpacing: '0.12em' }}
            >
              {n.label}
            </text>
          </motion.g>
        ))}
      </svg>
      <figcaption className="mt-3 text-center font-mono text-[10px] tracking-[0.18em] text-muted-foreground/60">
        {caption}
      </figcaption>
    </figure>
  );
};

const projectMeta = {
  formBuilder: { demo: 'https://shadcn-rjsf-form-builder.noowah.dev/' },
  contentBuilder: { demo: 'https://content-builder.noowah.dev/' },
  prVersioning: {
    github: 'https://github.com/marketplace/actions/node-pr-versioning',
  },
} as const;

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
};
type StackGroup = { label: string; items: string[] };
type Interest = { title: string; gloss: string };

// ponytail: intlayer array nodes stringify to [object Object]; unwrap to raw strings
const strings = (v: unknown) =>
  (v as Array<{ value?: string }>).map((x) => x?.value ?? String(x));

const AboutPage: NextPageIntlayer = () => {
  const c = useIntlayer('about');

  const pathEntries = Object.entries(c.path.entries) as Array<[string, Entry]>;
  const principles = Object.entries(c.principles.items) as Array<
    [string, Principle]
  >;
  const workstreams = Object.entries(c.practice.workstreams) as Array<
    [string, Workstream]
  >;
  const products = Object.entries(c.practice.synolink.products) as Array<
    [string, Product]
  >;
  const stack = Object.entries(c.practice.stack) as Array<[string, StackGroup]>;
  const workshop = Object.entries(c.currently.workshop.items) as Array<
    [string, Interest]
  >;
  const offclock = Object.entries(c.currently.offclock.items) as Array<
    [string, Interest]
  >;

  const projects = [
    { key: 'formBuilder' as const, ...projectMeta.formBuilder },
    { key: 'contentBuilder' as const, ...projectMeta.contentBuilder },
    { key: 'prVersioning' as const, ...projectMeta.prVersioning },
  ];

  return (
    /* overflow-x-clip, NOT overflow-x-hidden: `hidden` forces overflow-y to
       `auto`, which makes this div a scroll container and silently breaks
       every `sticky` descendant (the folio rails, the fact box, the years). */
    <div className="w-full overflow-x-clip">
      {/* ─── 00 · Masthead ─── */}
      <header className="max-w-5xl mx-auto px-6 pt-12 pb-16 md:pt-20 md:pb-24">
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.9, ease: EASE }}
          className="h-[2px] w-full bg-foreground origin-left"
        />

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.15, duration: 0.6 }}
          className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2 py-3 font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground"
        >
          <span>{c.ui.sections.lede}</span>
          <span>
            {c.meta.name} <span className="font-ko">{c.meta.nameKo}</span>
          </span>
          <span>{c.meta.place}</span>
        </motion.div>

        <div className="border-t border-border/40 dark:border-border/80 pt-8 md:pt-12">
          <motion.h1
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25, duration: 0.7, ease: EASE }}
            /* capped so the six wide caps stay inside the measure — at 15vw
               the word bled past the masthead rules on desktop */
            className="font-display font-extrabold uppercase text-[clamp(2.25rem,11vw,7.5rem)] leading-[0.82] tracking-[-0.04em] max-w-full"
          >
            {c.meta.handle}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="mt-4 font-mono text-[11px] uppercase tracking-[0.22em] text-muted-foreground/70"
          >
            {c.meta.name} <span className="font-ko">{c.meta.nameKo}</span> ·{' '}
            <span className="font-ko">{c.meta.handleKo}</span>
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.7, ease: EASE }}
            className="display mt-8 max-w-2xl font-light text-[clamp(1.125rem,2.6vw,1.6rem)] leading-[1.4] text-foreground/80"
          >
            {c.meta.title}
          </motion.p>
        </div>
      </header>

      {/* ─── 01 · Lede ─── */}
      <Spread number="01" label={c.ui.sections.lede}>
        <div className="grid md:grid-cols-10 gap-y-10 md:gap-x-10">
          <div className="md:col-span-6">
            <motion.p
              {...revealUp}
              className="text-base md:text-lg font-light leading-[1.75] text-foreground/80 text-pretty"
            >
              {c.lede.p1}
            </motion.p>
            <motion.p
              {...revealUp}
              transition={{ ...revealUp.transition, delay: 0.1 }}
              className="mt-6 text-base md:text-lg font-light leading-[1.75] text-foreground/70 text-pretty"
            >
              {c.lede.p2}
            </motion.p>
          </div>

          <motion.dl
            {...revealUp}
            transition={{ ...revealUp.transition, delay: 0.15 }}
            className="md:col-span-3 md:col-start-8 md:sticky md:top-10 md:self-start border-y border-border/50 dark:border-border/80 divide-y divide-border/50 dark:divide-border/80"
          >
            {(
              Object.entries(c.lede.facts) as Array<
                [string, { label: string; value: string }]
              >
            ).map(([key, fact]) => (
              <div
                key={key}
                className="flex items-baseline justify-between gap-4 py-2.5"
              >
                <dt className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground shrink-0">
                  {fact.label}
                </dt>
                <dd className="text-[11px] text-right text-foreground/90">
                  {fact.value}
                </dd>
              </div>
            ))}
          </motion.dl>
        </div>
      </Spread>

      {/* ─── 02 · The Path ─── */}
      <Spread number="02" label={c.ui.sections.path}>
        <SectionTitle>{c.ui.sections.path}</SectionTitle>

        <motion.p
          {...revealUp}
          className="display max-w-2xl font-light text-lg md:text-xl leading-[1.5] text-foreground/70 mb-4"
        >
          {c.path.standfirst}
        </motion.p>

        <div className="relative mt-12 pl-6 md:pl-0">
          {/* static spine; the dots fill in as each entry arrives */}
          <div className="absolute left-0 top-0 bottom-0 w-px bg-border/50 md:hidden" />

          {pathEntries.map(([key, entry], i) => (
            <motion.article
              key={key}
              {...revealUp}
              transition={{ ...revealUp.transition, delay: i * 0.06 }}
              className="group relative grid md:grid-cols-12 gap-x-8 gap-y-2 border-t border-border/40 dark:border-border/80 py-8 md:py-10"
            >
              <span className="absolute -left-6 top-10 size-1.5 rounded-full bg-border group-hover:bg-primary transition-colors duration-500 md:hidden" />

              <div className="md:col-span-3">
                {/* Ghost numeral. 25% reads as a pale grey on white but as an
                    unlit smudge on near-black, so dark mode needs more alpha to
                    land in the same visual register. */}
                <span className="block whitespace-nowrap font-serif text-2xl md:text-4xl font-extrabold tabular-nums tracking-tight text-foreground/25 dark:text-foreground/40 group-hover:text-primary/40 dark:group-hover:text-primary/70 transition-colors duration-500">
                  {entry.year}
                </span>
                <p className="mt-1 text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                  {entry.place}
                </p>
              </div>

              <div className="md:col-span-8 md:col-start-5">
                <h3 className="font-serif text-lg md:text-xl font-bold tracking-tight mb-2">
                  {entry.title}
                </h3>
                <p className="text-sm font-light leading-[1.75] text-foreground/70 text-pretty">
                  {entry.body}
                </p>
              </div>
            </motion.article>
          ))}
        </div>

        <motion.p
          {...revealUp}
          className="display mt-12 font-serif text-xl md:text-3xl font-bold leading-[1.2] tracking-[-0.02em] text-primary"
        >
          {c.path.throughline}
        </motion.p>
      </Spread>

      {/* ─── 03 · Principles ─── */}
      <Spread number="03" label={c.ui.sections.principles}>
        {principles.map(([key, p], i) => (
          <blockquote
            key={key}
            className="relative grid md:grid-cols-12 gap-x-8 border-t border-border/40 dark:border-border/80 py-10 md:py-14"
          >
            <span className="md:col-span-2 pt-2 font-mono text-[10px] tracking-[0.25em] text-muted-foreground/50">
              P / 0{i + 1}
            </span>
            {/* Plain opacity/y, not a clip-path wipe: Motion would not
                interpolate the inset() pair here, so the quotes stayed clipped
                to zero width and the section rendered blank. */}
            <motion.p
              {...revealUp}
              className="display font-serif font-bold text-[clamp(1.375rem,3.4vw,2.5rem)] leading-[1.15] tracking-[-0.02em] md:col-span-10 md:col-start-3"
            >
              {p.quote}
            </motion.p>
            <footer className="mt-4 text-[11px] leading-[1.7] uppercase tracking-[0.14em] text-muted-foreground md:col-span-10 md:col-start-3">
              {p.gloss}
            </footer>
          </blockquote>
        ))}
      </Spread>

      {/* ─── 04 · The Work ─── */}
      <Spread number="04" label={c.ui.sections.practice}>
        <SectionTitle>{c.ui.sections.practice}</SectionTitle>

        <div className="grid md:grid-cols-10 gap-y-10 md:gap-x-10">
          <div className="md:col-span-6">
            <motion.p
              {...revealUp}
              className="text-base md:text-lg font-light leading-[1.75] text-foreground/80 text-pretty"
            >
              {c.practice.lead}
            </motion.p>
            <motion.p
              {...revealUp}
              transition={{ ...revealUp.transition, delay: 0.1 }}
              className="mt-6 text-base md:text-lg font-light leading-[1.75] text-foreground/70 text-pretty"
            >
              {c.practice.lead2}
            </motion.p>
          </div>

          <motion.div
            {...revealUp}
            transition={{ ...revealUp.transition, delay: 0.15 }}
            className="md:col-span-4"
          >
            {workstreams.map(([key, w]) => (
              <RuledRow key={key} label={w.label} value={w.tag} interactive />
            ))}
          </motion.div>
        </div>

        {/* Boxout — the one place a Card earns itself */}
        <motion.div {...revealUp} className="mt-14">
          <Card className="relative border-border/40 dark:border-border/80 bg-card/50 backdrop-blur-sm p-6 md:p-8 before:absolute before:left-0 before:top-6 before:bottom-6 before:w-px before:bg-primary/60">
            <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground/60">
              {c.ui.boxoutLabel}
            </p>
            <h3 className="mt-3 font-serif text-xl md:text-2xl font-bold tracking-tight">
              {c.practice.boxout.title}
            </h3>
            <p className="mt-4 text-sm font-light leading-[1.75] text-foreground/70 text-pretty">
              {c.practice.boxout.body}
            </p>
            <div className="mt-6 pt-4 border-t border-border/40 dark:border-border/80 font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground/60">
              {strings(c.practice.boxout.stack).join(' · ')}
            </div>
          </Card>
        </motion.div>

        {/* Synolink — subordinate in the hierarchy, loud in the type */}
        <div className="mt-16 border-l border-primary/40 pl-6 md:pl-10">
          <motion.p
            {...revealUp}
            className="font-mono text-[10px] uppercase tracking-[0.25em] text-primary"
          >
            {c.practice.synolink.kicker}
          </motion.p>

          <motion.p
            {...revealUp}
            transition={{ ...revealUp.transition, delay: 0.08 }}
            className="display mt-5 max-w-2xl font-serif text-xl md:text-3xl font-bold leading-[1.2] tracking-[-0.02em]"
          >
            {c.practice.synolink.deck}
          </motion.p>

          <motion.p
            {...revealUp}
            transition={{ ...revealUp.transition, delay: 0.12 }}
            className="mt-4 text-[11px] uppercase tracking-[0.18em] text-muted-foreground"
          >
            {c.practice.synolink.role}
          </motion.p>

          <div className="mt-10">
            {products.map(([key, p], i) => {
              const live = Boolean(p.href);
              const Row = live ? motion.a : motion.div;
              return (
                <Row
                  key={key}
                  {...(live
                    ? {
                        href: p.href,
                        target: '_blank',
                        rel: 'noopener noreferrer',
                      }
                    : {})}
                  {...revealUp}
                  transition={{ ...revealUp.transition, delay: i * 0.1 }}
                  className="group grid md:grid-cols-12 items-baseline gap-x-6 gap-y-2 border-t border-border/40 dark:border-border/80 last:border-b py-6 md:py-8"
                >
                  <span className="md:col-span-1 font-mono text-[11px] tabular-nums text-muted-foreground/50 group-hover:text-primary transition-colors duration-300">
                    0{i + 1}
                  </span>
                  <div className="md:col-span-4">
                    <h3
                      className={`font-serif text-lg md:text-2xl font-bold tracking-tight transition-colors duration-300 ${
                        live
                          ? 'group-hover:text-primary'
                          : 'text-foreground/55'
                      }`}
                    >
                      {p.name}
                    </h3>
                    <p className="mt-1 flex flex-wrap items-center gap-x-2 gap-y-1 text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                      {p.kicker}
                      <span
                        className={`inline-flex items-center gap-1.5 tracking-[0.14em] ${
                          live ? 'text-primary' : 'text-muted-foreground/60'
                        }`}
                      >
                        <span
                          aria-hidden
                          className={`size-1 rounded-full ${
                            live ? 'bg-primary' : 'bg-muted-foreground/50'
                          }`}
                        />
                        {p.status}
                      </span>
                    </p>
                  </div>
                  <p
                    className={`md:col-span-6 text-sm font-light leading-[1.7] text-pretty ${
                      live ? 'text-foreground/70' : 'text-foreground/50'
                    }`}
                  >
                    {p.body}
                  </p>
                  {live && (
                    <IconArrowUpRight
                      size={16}
                      strokeWidth={1.5}
                      className="hidden md:block md:col-span-1 justify-self-end text-primary opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300"
                    />
                  )}
                </Row>
              );
            })}
          </div>

          <PluginDiagram caption={c.ui.figure1} />
        </div>

        {/* Stack credits */}
        <div className="mt-14 grid md:grid-cols-3 gap-8 border-t border-border/40 dark:border-border/80 pt-8">
          {stack.map(([key, group], i) => (
            <motion.div
              key={key}
              {...revealUp}
              transition={{ ...revealUp.transition, delay: i * 0.08 }}
            >
              <h3 className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground mb-3">
                {group.label}
              </h3>
              <p className="text-sm font-light leading-[1.8] text-foreground/70">
                {strings(group.items).join(', ')}
              </p>
            </motion.div>
          ))}
        </div>
      </Spread>

      {/* ─── 05 · Currently ─── */}
      <Spread number="05" label={c.ui.sections.currently}>
        <div className="grid md:grid-cols-12 gap-x-10 gap-y-12">
          <div className="md:col-span-5">
            <h3 className="font-serif text-xl font-bold tracking-tight mb-6">
              {c.currently.workshop.title}
            </h3>
            {workshop.map(([key, item], i) => (
              <motion.div
                key={key}
                {...revealUp}
                transition={{ ...revealUp.transition, delay: i * 0.06 }}
                className="flex items-baseline gap-4 py-4 border-b border-border/30 dark:border-border/70"
              >
                <span className="font-mono text-[10px] text-muted-foreground/50 shrink-0">
                  {String.fromCharCode(97 + i)}/
                </span>
                <div>
                  <h4 className="font-serif text-base md:text-lg font-bold tracking-tight">
                    {item.title}
                  </h4>
                  <p className="mt-1 text-sm font-light leading-[1.7] text-foreground/60 text-pretty">
                    {item.gloss}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          <div
            aria-hidden
            className="hidden md:block md:col-span-1 justify-self-center w-px bg-border/60"
          />

          <div className="md:col-span-6">
            <h3 className="font-serif text-xl font-bold tracking-tight mb-6">
              {c.currently.offclock.title}
            </h3>
            {offclock.map(([key, item], i) => (
              <motion.div
                key={key}
                {...revealUp}
                transition={{ ...revealUp.transition, delay: i * 0.06 }}
                className="flex items-baseline gap-4 py-4 border-b border-border/30 dark:border-border/70"
              >
                <span className="font-mono text-[10px] text-muted-foreground/50 shrink-0">
                  {String.fromCharCode(97 + i)}/
                </span>
                <div>
                  <h4 className="font-serif text-base md:text-lg font-bold tracking-tight">
                    {item.title}
                  </h4>
                  <p className="mt-1 text-sm font-light leading-[1.7] text-foreground/60 text-pretty">
                    {item.gloss}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <motion.p
          {...revealUp}
          className="mt-10 max-w-xl text-[11px] leading-[1.7] uppercase tracking-[0.14em] text-muted-foreground/70"
        >
          {c.currently.note}
        </motion.p>
      </Spread>

      {/* ─── 06 · Side Projects (#projects is an external contract) ─── */}
      <Spread id="projects" number="06" label={c.ui.sections.projects}>
        <SectionTitle>{c.ui.sections.projects}</SectionTitle>

        <motion.p
          {...revealUp}
          className="max-w-xl font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground mb-10"
        >
          {c.projects.standfirst}
        </motion.p>

        {projects.map((project, i) => {
          const item = c.projects.items[project.key];
          return (
            <motion.article
              key={project.key}
              {...revealUp}
              transition={{ ...revealUp.transition, delay: i * 0.08 }}
              className="group grid md:grid-cols-12 gap-x-8 gap-y-3 border-t border-border/40 dark:border-border/80 last:border-b py-8 md:py-10"
            >
              <span className="md:col-span-1 font-mono text-[11px] tabular-nums text-muted-foreground/50">
                {String(i + 1).padStart(2, '0')}
              </span>

              <div className="md:col-span-4">
                <h3 className="font-serif text-lg md:text-xl font-bold tracking-tight group-hover:text-primary transition-colors duration-300">
                  {item.title}
                </h3>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {(item.tags as unknown as string[]).map((tag, ti) => (
                    <Badge
                      key={ti}
                      variant="secondary"
                      className="text-[10px] font-light"
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="md:col-span-7">
                <p className="text-sm font-light leading-[1.75] text-foreground/70 text-pretty">
                  {item.description}
                </p>
                <div className="mt-4 flex items-center gap-5">
                  {'github' in project && project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground hover:text-primary transition-colors duration-300"
                    >
                      <IconBrandGithub size={13} strokeWidth={1.5} />
                      {c.ui.source}
                    </a>
                  )}
                  {'demo' in project && project.demo && (
                    <a
                      href={project.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground hover:text-primary transition-colors duration-300"
                    >
                      <IconExternalLink size={13} strokeWidth={1.5} />
                      {c.ui.demo}
                    </a>
                  )}
                </div>
              </div>
            </motion.article>
          );
        })}
      </Spread>

      {/* ─── 07 · Colophon ─── */}
      <section
        id="contact"
        className="scroll-mt-24 max-w-5xl mx-auto px-6 py-20 md:py-28 border-t border-border/40 dark:border-border/80"
      >
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8">
          <h2 className="display font-serif font-extrabold uppercase text-[clamp(2rem,7vw,4.5rem)] leading-[0.9] tracking-[-0.03em] min-w-0">
            {c.ui.contactTitle.line1}
            <br />
            <span className="text-primary">{c.ui.contactTitle.highlight}</span>{' '}
            {c.ui.contactTitle.line2}
          </h2>

          <Button
            size="lg"
            className="shrink-0 text-sm font-light tracking-wider rounded-full px-8 h-12"
            asChild
          >
            <a href={`mailto:${c.meta.email}`}>
              {c.ui.contactButton}
              <IconArrowUpRight size={16} strokeWidth={1.5} />
            </a>
          </Button>
        </div>

        <Rule className="mt-12" />

        <div className="mt-8 grid sm:grid-cols-3 gap-8 text-[11px] leading-[1.8] uppercase tracking-[0.14em] text-muted-foreground">
          <div>
            <p className="text-muted-foreground/50 mb-2">
              {c.ui.sections.contact}
            </p>
            <a
              href={`mailto:${c.meta.email}`}
              className="block hover:text-primary transition-colors duration-300 normal-case tracking-normal"
            >
              {c.meta.email}
            </a>
            <a
              href="https://www.github.com/henrynoowah"
              target="_blank"
              rel="noopener noreferrer"
              className="block hover:text-primary transition-colors duration-300 normal-case tracking-normal"
            >
              {c.meta.github}
            </a>
            <a
              href="https://velog.io/@henrynoowah/posts"
              target="_blank"
              rel="noopener noreferrer"
              className="block hover:text-primary transition-colors duration-300 normal-case tracking-normal"
            >
              {c.meta.velog}
            </a>
          </div>

          <p className="text-muted-foreground/70 normal-case tracking-normal">
            {c.ui.colophon}
          </p>

          <p className="sm:text-right text-muted-foreground/50">
            {c.ui.issueLine}
          </p>
        </div>

        <p className="mt-16 pb-24 text-center font-mono text-[10px] tracking-[0.3em] text-muted-foreground/40">
          {c.ui.end}
        </p>
      </section>
    </div>
  );
};

export default AboutPage;
