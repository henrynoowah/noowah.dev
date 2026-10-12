'use client';

import { useChatContext } from '@/app/[locale]/_components/chat-context';
import { CheckMark, HelpFigure } from '@/components/manual/drawings';
import { InkButton, InkLink } from '@/components/manual/ink';
import { OriginDrawing } from '@/components/manual/origin-drawing';
import { ManualSteps, StepSection } from '@/components/manual/steps';
import { raw, strings } from '@/lib/intlayer-raw';
import { getLocalizedUrl } from 'intlayer';
import { useIntlayer, useLocale, type NextPageIntlayer } from 'next-intlayer';

/** Condensed uppercase data label (statuses, recognitions). */
const DataLabel = ({ children }: { children: React.ReactNode }) => (
  <span className="font-narrow inline-flex items-center gap-2 border-[length:var(--stroke)] border-ink bg-wash px-2 py-1 text-sm font-semibold uppercase tracking-wide text-ink">
    {children}
  </span>
);

const SideProjectsPage: NextPageIntlayer = () => {
  const c = useIntlayer('side-projects');
  const { meta } = useIntlayer('about');
  const { locale } = useLocale();
  const { isOpen, setIsOpen } = useChatContext();
  const ui = c.ui;
  const { contentBuilder: cb, formBuilder: fb, prVersioning: pr } = c.items;
  const email = raw(meta.email);

  const steps = [
    { id: 'overview', label: raw(ui.steps.overview) },
    { id: 'content-builder', label: raw(ui.steps.contentBuilder) },
    { id: 'form-builder', label: raw(ui.steps.formBuilder) },
    { id: 'pr-versioning', label: raw(ui.steps.prVersioning) },
    { id: 'contact', label: raw(ui.steps.contact) },
  ];

  return (
    <div className="w-full overflow-x-clip">
      <ManualSteps steps={steps} />

      {/* 1 — Overview */}
      <StepSection id="overview" n={1} title={ui.title} className="border-t-0">
        <p className="balance max-w-[30ch] text-3xl font-bold leading-[1.15] tracking-tight md:text-4xl">
          {ui.lead}
        </p>
        <p className="mt-6 flex items-center gap-3 text-lg font-semibold">
          <CheckMark className="size-6 shrink-0" />
          {ui.principle}
        </p>
      </StepSection>

      {/* 2 — content-builder: the lead story */}
      <StepSection id="content-builder" n={2} title={cb.title}>
        <p className="text-xl font-semibold md:text-2xl">{cb.kicker}</p>
        <p className="mt-6 inline-block bg-wash px-3 py-2 text-2xl font-black leading-tight tracking-tight text-ink md:text-4xl">
          {ui.origin}
        </p>

        <figure className="mt-10">
          <OriginDrawing
            title={raw(ui.drawingTitle)}
            core={raw(cb.title)}
            personal={raw(ui.drawingPersonal)}
            product={raw(ui.drawingProduct)}
            coreLabel={raw(ui.drawingCore)}
          />
        </figure>

        <div className="mt-10 grid gap-10 lg:grid-cols-9">
          <div className="lg:col-span-5">
            <p className="max-w-[62ch] text-lg leading-relaxed">{cb.origin}</p>
            <p className="mt-4 max-w-[62ch] text-lg leading-relaxed">
              {cb.description}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <InkLink
                href={getLocalizedUrl('/work/synolink-cms', locale)}
                hrefLang={locale}
                variant="solid"
              >
                {ui.caseStudy}
              </InkLink>
              <InkLink href={raw(cb.demo)} external>
                {ui.demo}
              </InkLink>
            </div>
          </div>
          <div className="lg:col-span-4">
            <h3 className="mb-3 text-sm font-bold">{ui.features}</h3>
            <ul className="border-t-[length:var(--stroke)] border-ink">
              {strings(cb.features).map(f => (
                <li
                  key={f}
                  className="border-b-[length:var(--stroke)] border-dashed border-ink py-2.5 text-base font-medium"
                >
                  {f}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </StepSection>

      {/* 3 — Form builder */}
      <StepSection id="form-builder" n={3} title={fb.title}>
        <div className="grid gap-8 lg:grid-cols-9">
          <div className="lg:col-span-6">
            <p className="text-xl font-semibold">{fb.kicker}</p>
            <p className="mt-4 max-w-[62ch] text-lg leading-relaxed">
              {fb.description}
            </p>
          </div>
          <div className="flex flex-col items-start gap-4 lg:col-span-3 lg:items-end">
            <DataLabel>{fb.recognition}</DataLabel>
          </div>
        </div>
        <div className="mt-8 flex flex-wrap gap-3">
          <InkLink href={raw(fb.demo)} external variant="solid">
            {ui.demo}
          </InkLink>
          <InkLink href={raw(fb.github)} external>
            {ui.github}
          </InkLink>
          <InkLink href={raw(fb.listing)} external>
            {ui.listing}
          </InkLink>
        </div>
      </StepSection>

      {/* 4 — node-pr-versioning */}
      <StepSection id="pr-versioning" n={4} title={pr.title}>
        <p className="text-xl font-semibold">{pr.kicker}</p>
        <p className="mt-4 max-w-[62ch] text-lg leading-relaxed">{pr.description}</p>
        <div className="mt-8 flex flex-wrap gap-3">
          <InkLink href={raw(pr.marketplace)} external variant="solid">
            {ui.marketplace}
          </InkLink>
          <InkLink href={raw(pr.github)} external>
            {ui.github}
          </InkLink>
        </div>
      </StepSection>

      {/* 5 — Contact */}
      <StepSection id="contact" n={5} title={ui.steps.contact}>
        <div className="flex flex-wrap items-end justify-between gap-10">
          <div>
            <p className="balance text-3xl font-black leading-[1.05] tracking-tight md:text-5xl">
              {ui.contactTitle}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <InkButton
                variant="solid"
                aria-expanded={isOpen}
                onClick={() => setIsOpen(!isOpen)}
              >
                {ui.ask}
              </InkButton>
              <InkLink href={`mailto:${email}`} arrow={false}>
                {ui.email} · {email}
              </InkLink>
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

export default SideProjectsPage;
