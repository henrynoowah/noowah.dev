import { cn } from '@/lib/utils';
import type { ReactNode, SVGProps } from 'react';

/**
 * Hand-drawn manual marks. Every drawing uses the one stroke weight
 * (--stroke) in currentColor and paper fills, so they print in ink on either
 * theme and occlude whatever sits behind them like real linework.
 */

type DrawingProps = SVGProps<SVGSVGElement> & { title?: string };

const base = {
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.5,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
};

const a11y = (title?: string) =>
  title ? { role: 'img', 'aria-label': title } : { 'aria-hidden': true };

/** The help figure from the back page of every manual: a person asking. */
export const HelpFigure = ({ className, title, ...props }: DrawingProps) => (
  <svg
    viewBox="0 0 96 88"
    className={cn('overflow-visible', className)}
    {...a11y(title)}
    {...props}
  >
    <g {...base}>
      {/* speech bubble */}
      <path
        d="M44 6h40a6 6 0 0 1 6 6v22a6 6 0 0 1-6 6H62l-9 8 1-8h-10a6 6 0 0 1-6-6V12a6 6 0 0 1 6-6Z"
        fill="var(--paper)"
      />
      {/* question mark, drawn not typed */}
      <path d="M58.5 17.5c0-4 3-6.5 6.5-6.5s6.5 2.5 6.5 6c0 4.5-6.5 5-6.5 9.5" />
      <circle cx="65" cy="32" r="1.2" fill="currentColor" />
      {/* head */}
      <circle cx="22" cy="40" r="10" fill="var(--paper)" />
      <path d="M18 39.5h.01M26 39.5h.01" strokeWidth="2.4" />
      <path d="M19 45c2 1.2 4 1.2 6 0" />
      {/* shoulders */}
      <path d="M2 86c0-14 9-24 20-24s20 10 20 24" fill="var(--paper)" />
      {/* raised hand */}
      <path d="M38 70c3-6 6-12 8-20" />
      <path d="M46 50c-1-3 0-6 2-6s3 3 2 6" />
    </g>
  </svg>
);

/** Pointing hand, the manual's "look here". Points right by default. */
export const HandPointer = ({ className, title, ...props }: DrawingProps) => (
  <svg
    viewBox="0 0 48 26"
    className={cn('overflow-visible', className)}
    {...a11y(title)}
    {...props}
  >
    <g {...base} fill="var(--paper)">
      <rect x="1" y="6" width="7" height="15" rx="1" />
      <path d="M8 8c3-2.5 7-3 10-1.5L44 6.5a3 3 0 0 1 0 6H25" />
      <path d="M25 12.5a2.8 2.8 0 0 1 0 5.6h-1.5a2.8 2.8 0 0 1 0 5.4H14c-3 0-5-1-6-2.5" />
      <path d="M23.5 18.1H21M25 12.5h-4" />
    </g>
  </svg>
);

/** Drawn tick inside a square: the "do" panel mark. */
export const CheckMark = ({ className, title, ...props }: DrawingProps) => (
  <svg viewBox="0 0 28 28" className={className} {...a11y(title)} {...props}>
    <g {...base}>
      <rect x="1" y="1" width="26" height="26" />
      <path d="M7 14.5l4.5 4.5L21 9" strokeWidth="2.25" />
    </g>
  </svg>
);

/** Drawn cross inside a square: the "don't" panel mark. */
export const CrossMark = ({ className, title, ...props }: DrawingProps) => (
  <svg viewBox="0 0 28 28" className={className} {...a11y(title)} {...props}>
    <g {...base}>
      <rect x="1" y="1" width="26" height="26" />
      <path d="M8.5 8.5l11 11M19.5 8.5l-11 11" strokeWidth="2.25" />
    </g>
  </svg>
);

/** Direction arrow used on links: a shaft and an open head. */
export const ArrowMark = ({
  className,
  external,
  ...props
}: DrawingProps & { external?: boolean }) => (
  <svg
    viewBox="0 0 20 20"
    aria-hidden
    className={cn(
      'inline-block size-[0.9em] shrink-0',
      external && '-rotate-45',
      className
    )}
    {...props}
  >
    <g {...base} strokeWidth={1.75}>
      <path d="M2 10h15M11 4l6 6-6 6" />
    </g>
  </svg>
);

/**
 * One small drawing per assembly step (the path). Keys match
 * about.content.ts path.entries; an unknown key draws nothing.
 */
const PATH_DRAWINGS: Record<string, ReactNode> = {
  // floor plan: a room, a door swing, a window
  degree: (
    <>
      <path d="M6 6h52v36H6Z" />
      <path d="M6 30h10M24 30h34" />
      <path d="M16 30a8 8 0 0 1 8-8" strokeDasharray="2 2.5" />
      <path d="M24 30v-8" />
      <path d="M40 6h12" strokeWidth="3.5" />
    </>
  ),
  // a design file handed over a wall
  designJob: (
    <>
      <path d="M6 8h18l6 6v24H6Z" />
      <path d="M24 8v6h6" />
      <path d="M11 22h14M11 28h10" />
      <path d="M38 4v40" strokeDasharray="2 3" />
      <path d="M32 24h24M50 18l6 6-6 6" />
    </>
  ),
  // a database cylinder: backend first
  bootcamp: (
    <>
      <ellipse cx="32" cy="10" rx="18" ry="5" />
      <path d="M14 10v28c0 2.8 8 5 18 5s18-2.2 18-5V10" />
      <path d="M14 20c0 2.8 8 5 18 5s18-2.2 18-5M14 29c0 2.8 8 5 18 5s18-2.2 18-5" />
    </>
  ),
  // a browser window with code brackets
  selfTaught: (
    <>
      <path d="M4 6h56v36H4Z" />
      <path d="M4 14h56" />
      <path d="M24 22l-6 6 6 6M40 22l6 6-6 6M35 20l-6 16" />
    </>
  ),
  // stacked plates: frontend, platform, pipeline
  cloudhospital: (
    <>
      <path d="M32 6 56 14 32 22 8 14Z" fill="var(--paper)" />
      <path d="M8 20l24 8 24-8M8 26l24 8 24-8" />
      <path d="M8 14v12M56 14v12M32 22v12" strokeDasharray="2 2.5" />
      <path d="M8 32l24 8 24-8" />
    </>
  ),
  // three modules on one base
  synolink: (
    <>
      <path d="M4 36h56v6H4Z" />
      <path d="M8 22h12v14H8ZM26 22h12v14H26Z" />
      <path d="M44 10h12v14H44Z" strokeDasharray="2.5 2.5" />
      <path d="M50 26v8" strokeDasharray="2 2" />
    </>
  ),
};

export const PathDrawing = ({
  step,
  className,
}: {
  step: string;
  className?: string;
}) =>
  PATH_DRAWINGS[step] ? (
    <svg viewBox="0 0 64 48" aria-hidden className={className}>
      <g {...base}>{PATH_DRAWINGS[step]}</g>
    </svg>
  ) : null;
