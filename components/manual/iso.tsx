'use client';

import { cn } from '@/lib/utils';
import { motion, useInView, useReducedMotion } from 'motion/react';
import { useId, useRef, type ReactNode } from 'react';

/**
 * Isometric line art for exploded-view drawings. A plate is a 2:1 rhombus
 * with a visible thickness; its top face carries a detail drawing authored in
 * a flat 0–100 "page" box that is mapped onto the face (origin at the back
 * corner, x running down the back-right edge, y down the back-left edge).
 *
 * Everything is ink stroke on paper fill so nearer plates occlude farther
 * linework like a real technical drawing; the second ink (wash) fills only
 * the part in focus or a part that is built.
 */

export const SNAP_EASE = [0.16, 1, 0.3, 1] as const;

export type PlateGeometry = {
  cx: number;
  cy: number;
  /** Half-width of the rhombus. Half-height is w / 2. */
  w: number;
  /** Visible thickness of the slab. */
  t: number;
};

const corners = ({ cx, cy, w }: PlateGeometry) => {
  const h = w / 2;
  return {
    h,
    L: [cx - w, cy] as const,
    T: [cx, cy - h] as const,
    R: [cx + w, cy] as const,
    B: [cx, cy + h] as const,
  };
};

const pts = (...p: ReadonlyArray<readonly [number, number]>) =>
  p.map(([x, y]) => `${x},${y}`).join(' ');

/** The detail-box → top-face transform. */
const faceMatrix = (g: PlateGeometry) => {
  const { h } = corners(g);
  return `matrix(${g.w / 100} ${h / 100} ${-g.w / 100} ${h / 100} ${g.cx} ${g.cy - h})`;
};

export function IsoPlate({
  geometry,
  detail,
  hatched,
  washed,
  dashed,
  hatchId,
}: {
  geometry: PlateGeometry;
  detail?: ReactNode;
  /** Second ink plus hatching on the top face: the part the text is talking about. */
  hatched?: boolean;
  /** Second ink on the top face, no hatch: a part that is built and in place. */
  washed?: boolean;
  /** Drawn in dashed line: a part that is not built yet. */
  dashed?: boolean;
  hatchId: string;
}) {
  const { L, T, R, B } = corners(geometry);
  const { t } = geometry;
  const stroke = {
    stroke: 'currentColor',
    strokeWidth: 1.5,
    strokeLinejoin: 'round' as const,
    vectorEffect: 'non-scaling-stroke' as const,
    strokeDasharray: dashed ? '5 4' : undefined,
  };

  return (
    <g>
      {/* side faces; a washed (built) part is solid second ink all round */}
      <polygon
        points={pts(L, B, [B[0], B[1] + t], [L[0], L[1] + t])}
        fill={washed ? 'var(--wash)' : 'var(--paper)'}
        {...stroke}
      />
      <polygon
        points={pts(B, R, [R[0], R[1] + t], [B[0], B[1] + t])}
        fill={washed ? 'var(--wash)' : 'var(--paper)'}
        {...stroke}
      />
      {/* top face */}
      <polygon
        points={pts(L, T, R, B)}
        fill={hatched || washed ? 'var(--wash)' : 'var(--paper)'}
        {...stroke}
      />
      {hatched && (
        <polygon
          points={pts(L, T, R, B)}
          fill={`url(#${hatchId})`}
          stroke="none"
        />
      )}
      {detail && (
        <g
          transform={faceMatrix(geometry)}
          fill="none"
          stroke="currentColor"
          strokeWidth={1.25}
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{ vectorEffect: 'non-scaling-stroke' }}
          className="[&_*]:[vector-effect:non-scaling-stroke]"
        >
          {detail}
        </g>
      )}
    </g>
  );
}

export function HatchDefs({ id }: { id: string }) {
  return (
    <defs>
      <pattern
        id={id}
        width="5"
        height="5"
        patternUnits="userSpaceOnUse"
        patternTransform="rotate(45)"
      >
        <line
          x1="0"
          y1="0"
          x2="0"
          y2="5"
          stroke="currentColor"
          strokeWidth="1.1"
        />
      </pattern>
    </defs>
  );
}

/** Numbered callout circle with a leader line back to the part. */
export function Callout({
  n,
  from,
  to,
  active,
}: {
  n: number | string;
  from: readonly [number, number];
  to: readonly [number, number];
  active?: boolean;
}) {
  return (
    <g>
      <path
        d={`M${from[0]} ${from[1]}H${to[0] - 13}`}
        stroke="currentColor"
        strokeWidth={1.25}
        fill="none"
      />
      <circle cx={from[0]} cy={from[1]} r={2.25} fill="currentColor" />
      <circle
        cx={to[0]}
        cy={to[1]}
        r={13}
        fill={active ? 'var(--wash)' : 'var(--paper)'}
        stroke="currentColor"
        strokeWidth={1.5}
      />
      <text
        x={to[0]}
        y={to[1]}
        textAnchor="middle"
        dominantBaseline="central"
        className={cn(
          'font-latin text-[13px] font-bold',
          'fill-ink'
        )}
      >
        {n}
      </text>
    </g>
  );
}

export type AssemblyLayer = {
  id: string;
  n: number;
  detail: ReactNode;
};

/**
 * Exploded vertical stack. Parts start visible but lifted, then drop along the
 * dashed guides into their slots one after another once the drawing enters
 * the viewport; under reduced motion they are drawn already in place. `active` hatches one part and fills its callout.
 */
export function AssemblyStack({
  layers,
  active,
  title,
  className,
  w = 150,
  gap = 110,
  compact = false,
}: {
  layers: AssemblyLayer[];
  /** Drop the callout column (narrow screens, where it would print too small). */
  compact?: boolean;
  active?: string | null;
  title: string;
  className?: string;
  w?: number;
  gap?: number;
}) {
  const hatchId = useId().replace(/:/g, '');
  const ref = useRef<SVGSVGElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.25 });
  const reduce = useReducedMotion();

  const t = 9;
  const h = w / 2;
  const cx = w + 12;
  const top = h + 12;
  const calloutX = cx + w + 64;
  const width = compact ? cx + w + 12 : calloutX + 16;
  const height = top + (layers.length - 1) * gap + h + t + 12;

  const geo = (i: number): PlateGeometry => ({ cx, cy: top + i * gap, w, t });
  const show = reduce || inView;

  return (
    <svg
      ref={ref}
      viewBox={`0 0 ${width} ${height}`}
      role="img"
      aria-label={title}
      className={cn('h-auto w-full text-ink', className)}
    >
      <HatchDefs id={hatchId} />

      {/* assembly guides, drawn first so every plate occludes them */}
      <g
        stroke="currentColor"
        strokeWidth={1}
        strokeDasharray="3 4"
        fill="none"
      >
        {layers.slice(0, -1).map((l, i) => {
          const a = geo(i);
          const b = geo(i + 1);
          return (
            <g key={l.id}>
              <path d={`M${a.cx - w} ${a.cy + t}V${b.cy}`} />
              <path d={`M${a.cx + w} ${a.cy + t}V${b.cy}`} />
              <path d={`M${a.cx} ${a.cy + h + t}V${b.cy + h}`} />
            </g>
          );
        })}
      </g>

      {/* bottom plate first so nearer (upper) plates draw over it */}
      {[...layers]
        .map((l, i) => ({ l, i }))
        .reverse()
        .map(({ l, i }) => {
          const g = geo(i);
          const isActive = active === l.id;
          return (
            <motion.g
              key={l.id}
              initial={reduce ? false : { y: -gap * 0.45 }}
              animate={show ? { y: 0 } : undefined}
              transition={{
                duration: 0.7,
                ease: SNAP_EASE,
                delay: reduce ? 0 : (layers.length - 1 - i) * 0.12,
              }}
            >
              <IsoPlate
                geometry={g}
                detail={l.detail}
                hatched={isActive}
                hatchId={hatchId}
              />
              {!compact && (
                <Callout
                  n={l.n}
                  from={[g.cx + w / 2, g.cy + h / 2]}
                  to={[calloutX, g.cy + h / 2]}
                  active={isActive}
                />
              )}
            </motion.g>
          );
        })}
    </svg>
  );
}
