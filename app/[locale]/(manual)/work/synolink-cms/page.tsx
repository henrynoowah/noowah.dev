'use client';

import { useChatContext } from '@/app/[locale]/_components/chat-context';
import { CMS_LAYER_DRAWINGS } from '@/components/manual/cms-layers';
import { CheckMark, CrossMark, HelpFigure } from '@/components/manual/drawings';
import { InkButton, InkLink } from '@/components/manual/ink';
import { AssemblyStack } from '@/components/manual/iso';
import { ManualSteps, StepSection } from '@/components/manual/steps';
import { raw } from '@/lib/intlayer-raw';
import { cn } from '@/lib/utils';
import { getLocalizedUrl } from 'intlayer';
import { useIntlayer, useLocale, type NextPageIntlayer } from 'next-intlayer';
import { useEffect, useRef, useState } from 'react';

type Layer = { title: string; body: string };

const SynolinkCmsPage: NextPageIntlayer = () => {
  const c = useIntlayer('synolink-cms');
  const { locale } = useLocale();
  const { isOpen, setIsOpen } = useChatContext();
  const ui = c.ui;

  const layers = Object.entries(c.layers) as Array<[string, Layer]>;
  const [active, setActive] = useState<string | null>(null);
  // Below sm the drawing is a pinned strip; callouts would print too small.
  const [compact, setCompact] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia('(max-width: 639px)');
    const sync = () => setCompact(mq.matches);
    sync();
    mq.addEventListener('change', sync);
    return () => mq.removeEventListener('change', sync);
  }, []);
  const listRef = useRef<HTMLOListElement>(null);

  // Scroll-linked callouts: the layer whose text sits in the middle band of
  // the viewport is the part hatched in the drawing.
  useEffect(() => {
    const items = listRef.current?.querySelectorAll<HTMLElement>('[data-layer]');
    if (!items?.length) return;
    const observer = new IntersectionObserver(
      entries => {
        const hit = entries.find(e => e.isIntersecting);
        if (hit) setActive((hit.target as HTMLElement).dataset.layer ?? null);
      },
      { rootMargin: '-45% 0px -45% 0px' }
    );
    items.forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const steps = [
    { id: 'product', label: raw(ui.steps.product) },
    { id: 'exploded', label: raw(ui.steps.exploded) },
    { id: 'scope', label: raw(ui.steps.scope) },
    { id: 'help', label: raw(ui.steps.help) },
  ];

  const spec = [
    { label: ui.status, value: c.product.status },
    { label: ui.role, value: c.product.role },
    { label: ui.suite, value: c.product.suite },
  ];

  return (
    <div className="w-full overflow-x-clip">
      <ManualSteps steps={steps} />

      {/* 1 — The product */}
      <StepSection id="product" n={1} title={ui.title} className="border-t-0">
        <div className="grid gap-10 lg:grid-cols-9">
          <div className="lg:col-span-6">
            <p className="font-latin text-2xl font-bold tracking-tight md:text-3xl">
              {c.product.name}
            </p>
            <p className="mt-2 text-xl font-semibold">{c.product.kind}</p>
            <p className="mt-6 max-w-[62ch] text-lg leading-relaxed">{c.product.summary}</p>
            <p className="mt-4 max-w-[62ch] text-lg leading-relaxed">{c.product.engine}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <InkLink href={raw(c.product.href)} external variant="solid">
                {ui.visit}
              </InkLink>
              <InkLink
                href={getLocalizedUrl('/work/side-projects', locale)}
                hrefLang={locale}
              >
                {ui.engineLink}
              </InkLink>
            </div>
          </div>
          <dl className="self-start border-[length:var(--stroke)] border-ink lg:col-span-3">
            {spec.map(row => (
              <div
                key={raw(row.label)}
                className="grid grid-cols-[7rem_1fr] border-b-[length:var(--stroke)] border-ink last:border-b-0"
              >
                <dt className="border-r-[length:var(--stroke)] border-ink px-3 py-2 text-sm font-semibold">
                  {row.label}
                </dt>
                <dd className="px-3 py-2 text-sm">{row.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </StepSection>

      {/* 2 — Exploded view */}
      <StepSection id="exploded" n={2} title={ui.steps.exploded} aside={ui.asides.exploded}>
        <div className="grid items-start gap-10 lg:grid-cols-9">
          {/* Sticky on every width: on phones a short strip under the running
              head, so the part being read is always hatched in view. */}
          <figure className="sticky top-14 z-10 -mx-5 border-b-[length:var(--stroke)] border-ink bg-paper px-5 py-3 sm:-mx-8 sm:px-8 lg:top-20 lg:col-span-4 lg:mx-0 lg:border-0 lg:bg-transparent lg:p-0">
            <AssemblyStack
              title={raw(ui.drawingTitle)}
              active={active}
              compact={compact}
              layers={layers.map(([key], i) => ({
                id: key,
                n: i + 1,
                detail: CMS_LAYER_DRAWINGS[key],
              }))}
              className="mx-auto max-h-[26vh] sm:max-h-[32vh] lg:max-h-[calc(100dvh-7rem)]"
            />
          </figure>

          <ol ref={listRef} className="lg:col-span-5">
            {layers.map(([key, layer], i) => {
              const isActive = active === key;
              return (
                <li
                  key={key}
                  data-layer={key}
                  onMouseEnter={() => setActive(key)}
                  className="flex min-h-[38vh] gap-5 border-t-[length:var(--stroke)] border-ink py-6 last:min-h-0 lg:min-h-[52vh]"
                >
                  <span
                    aria-hidden
                    className={cn(
                      'font-latin grid size-10 shrink-0 place-items-center rounded-full border-[length:var(--stroke)] border-ink text-base font-bold transition-colors duration-200',
                      isActive ? 'bg-wash text-ink' : 'bg-paper text-ink'
                    )}
                  >
                    {i + 1}
                  </span>
                  <div>
                    <h3 className="balance text-2xl font-bold leading-tight tracking-tight md:text-3xl">
                      {layer.title}
                    </h3>
                    <p className="mt-3 max-w-[56ch] text-base leading-relaxed md:text-lg">
                      {layer.body}
                    </p>
                  </div>
                </li>
              );
            })}
          </ol>
        </div>
      </StepSection>

      {/* 3 — Scope */}
      <StepSection id="scope" n={3} title={ui.steps.scope} aside={ui.asides.scope}>
        <div className="grid gap-6 md:grid-cols-2">
          <div className="border-[length:var(--stroke)] border-ink p-6">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-bold">{ui.did}</h3>
              <CheckMark className="size-8" />
            </div>
            <ul className="mt-4">
              {[c.scope.did.lead, c.scope.did.engine].map((line, i) => (
                <li
                  key={i}
                  className="border-t-[length:var(--stroke)] border-dashed border-ink py-3 text-lg font-semibold leading-snug"
                >
                  {line}
                </li>
              ))}
            </ul>
          </div>
          <div className="border-[length:var(--stroke)] border-dashed border-ink p-6">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-bold">{ui.notClaimed}</h3>
              <CrossMark className="size-8" />
            </div>
            <ul className="mt-4">
              {[c.scope.notClaimed.figures].map((line, i) => (
                <li
                  key={i}
                  className="border-t-[length:var(--stroke)] border-dashed border-ink py-3 text-lg leading-snug"
                >
                  {line}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </StepSection>

      {/* 4 — Help */}
      <StepSection id="help" n={4} title={ui.steps.help}>
        <div className="flex flex-wrap items-end justify-between gap-10">
          <div>
            <p className="balance text-3xl font-black leading-[1.05] tracking-tight md:text-5xl">
              {ui.helpTitle}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <InkButton variant="solid" aria-expanded={isOpen} onClick={() => setIsOpen(!isOpen)}>
                {ui.ask}
              </InkButton>
              <InkLink href={getLocalizedUrl('/about', locale)} hrefLang={locale}>
                {ui.back}
              </InkLink>
            </div>
          </div>
          <HelpFigure className="hidden w-36 md:block" />
        </div>
      </StepSection>
    </div>
  );
};

export default SynolinkCmsPage;
