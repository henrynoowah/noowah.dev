'use client';

import { cn } from '@/lib/utils';
import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from 'react';

/**
 * Pages are a sequence of numbered sections. Pages declare them with
 * <ManualSteps>; the header reads them from this context and shows which
 * section is open and where it sits in the sequence.
 */

export type ManualStep = { id: string; label: string };

type StepsState = {
  steps: ManualStep[];
  setSteps: (steps: ManualStep[]) => void;
  active: string | null;
};

const StepsContext = createContext<StepsState>({
  steps: [],
  setSteps: () => {},
  active: null,
});

export const useManualSteps = () => useContext(StepsContext);

export function ManualStepsProvider({ children }: { children: ReactNode }) {
  const [steps, setSteps] = useState<ManualStep[]>([]);
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    if (!steps.length) return;
    const els = steps
      .map(s => document.getElementById(s.id))
      .filter((el): el is HTMLElement => !!el);

    // The open step is the last one whose top has crossed a line a third of
    // the way down the viewport. At the bottom of the page the last step is
    // open even when it is too short to ever reach that line.
    let frame = 0;
    const update = () => {
      frame = 0;
      const atBottom =
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 2;
      if (atBottom) {
        setActive(els[els.length - 1]?.id ?? steps[0].id);
        return;
      }
      const line = window.innerHeight * 0.35;
      let current = els[0]?.id ?? steps[0].id;
      for (const el of els) {
        if (el.getBoundingClientRect().top <= line) current = el.id;
      }
      setActive(current);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [steps]);

  return (
    <StepsContext.Provider value={{ steps, setSteps, active }}>
      {children}
    </StepsContext.Provider>
  );
}

/** Registers this page's steps with the running head. Renders nothing. */
export function ManualSteps({ steps }: { steps: ManualStep[] }) {
  const { setSteps } = useManualSteps();
  const key = steps.map(s => `${s.id}:${s.label}`).join('|');
  useEffect(() => {
    setSteps(steps);
    return () => setSteps([]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);
  return null;
}

/** Huge expanded numeral that opens a step. */
export const StepNumeral = ({
  n,
  className,
}: {
  n: number | string;
  className?: string;
}) => (
  <span
    aria-hidden
    className={cn(
      'font-latin font-wide tabular block font-black leading-[0.8] tracking-tighter',
      className
    )}
  >
    {n}
  </span>
);

/**
 * One manual step: numeral, heading, and the step's single drawing or fact.
 * The sheet always leaves charged empty paper; children decide the layout of
 * the 12-column field but never fill the numeral's gutter.
 */
export const StepSection = ({
  id,
  n,
  title,
  children,
  className,
  aside,
}: {
  id: string;
  n: number;
  title: ReactNode;
  children: ReactNode;
  className?: string;
  /** Short line set beside the heading (a scope note, a count). */
  aside?: ReactNode;
}) => (
  <section
    id={id}
    aria-labelledby={`${id}-title`}
    className={cn(
      'relative scroll-mt-20 border-t-[length:var(--stroke)] border-ink px-5 pt-8 pb-14 sm:px-8 md:pt-12 md:pb-20',
      className
    )}
  >
    <div className="mx-auto grid max-w-[1440px] grid-cols-12 gap-x-6 gap-y-5 md:gap-y-8">
      <div className="col-span-3 md:row-span-2">
        <StepNumeral
          n={n}
          className="text-[clamp(3.75rem,11vw,9rem)] md:sticky md:top-24"
        />
      </div>
      <div className="col-span-9 flex flex-col justify-end gap-2 md:flex-row md:items-baseline md:justify-between md:gap-6">
        <h2
          id={`${id}-title`}
          className="balance text-3xl font-bold leading-[1.05] tracking-tight md:text-5xl lg:text-6xl"
        >
          {title}
        </h2>
        {aside && (
          <p className="max-w-[32ch] shrink-0 text-sm md:text-right">{aside}</p>
        )}
      </div>
      <div className="col-span-12 md:col-span-9 md:col-start-4">{children}</div>
    </div>
  </section>
);

/** The running-head counter: numbered boxes, the open one filled. */
export function StepCounter({
  className,
  label,
}: {
  className?: string;
  /** Accessible name of the step nav. */
  label: string;
}) {
  const { steps, active } = useManualSteps();
  if (!steps.length) return null;

  const index = Math.max(
    0,
    steps.findIndex(s => s.id === active)
  );

  return (
    <nav aria-label={label} className={cn('flex items-center gap-4', className)}>
      {/* Phones: one box, current/total, tapping it advances a step. */}
      <a
        href={`#${steps[Math.min(index + 1, steps.length - 1)].id}`}
        aria-label={`${index + 1} / ${steps.length}. ${steps[index]?.label}`}
        className="font-latin tabular grid h-8 place-items-center border-[length:var(--stroke)] border-ink bg-ink px-2.5 text-sm font-bold text-paper sm:hidden"
      >
        {index + 1}/{steps.length}
      </a>
      <ol className="hidden items-center sm:flex">
        {steps.map((s, i) => {
          const isActive = i === index;
          return (
            <li key={s.id} className="-ml-[var(--stroke)] first:ml-0">
              <a
                href={`#${s.id}`}
                aria-label={`${i + 1}. ${s.label}`}
                aria-current={isActive ? 'step' : undefined}
                className={cn(
                  'font-latin tabular grid size-8 place-items-center border-[length:var(--stroke)] border-ink text-sm font-bold transition-colors duration-200',
                  isActive
                    ? 'bg-ink text-paper'
                    : 'bg-paper text-ink hover:bg-ink hover:text-paper'
                )}
              >
                {i + 1}
              </a>
            </li>
          );
        })}
      </ol>
      <p className="hidden text-sm font-bold leading-tight lg:block" aria-live="polite">
        {steps[index]?.label}
      </p>
    </nav>
  );
}
