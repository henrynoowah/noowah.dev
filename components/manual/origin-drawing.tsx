'use client';

import { motion, useInView, useReducedMotion } from 'motion/react';
import { useId, useRef } from 'react';
import { HatchDefs, IsoPlate, SNAP_EASE } from './iso';

/**
 * content-builder's origin, drawn: on the left the personal project as one
 * plate; a dashed arrow; on the right the cms.synolink.ai stack with that same
 * plate as its wash-filled core. The product's upper layers drop onto the core
 * when the drawing enters the viewport; under reduced motion they are drawn
 * already seated.
 */

const W = 100;
const T = 12;
const SEATED_GAP = 26;
const LIFTED_GAP = 46;

const PlateName = ({ name }: { name: string }) => (
  <text
    x="50"
    y="54"
    fontSize="11"
    textAnchor="middle"
    stroke="none"
    fill="currentColor"
    className="font-latin font-bold"
  >
    {name}
  </text>
);

export function OriginDrawing({
  title,
  core,
  personal,
  product,
  coreLabel,
}: {
  title: string;
  /** The plate's name, set on its face in both positions. */
  core: string;
  personal: string;
  product: string;
  /** Callout on the core plate once the product layers cover its face. */
  coreLabel: string;
}) {
  const hatchId = useId().replace(/:/g, '');
  const ref = useRef<SVGSVGElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.4 });
  const reduce = useReducedMotion();
  const seated = reduce || inView;

  const coreY = 232;
  const stackX = 520;
  const upper = [1, 2];

  return (
    <svg
      ref={ref}
      viewBox="0 70 720 270"
      role="img"
      aria-label={title}
      className="h-auto w-full text-ink"
    >
      <HatchDefs id={hatchId} />

      {/* Before: the personal project, alone */}
      <IsoPlate
        geometry={{ cx: 130, cy: 220, w: W, t: T }}
        hatchId={hatchId}
        washed
        detail={<PlateName name={core} />}
      />
      <text
        x="130"
        y="318"
        textAnchor="middle"
        className="fill-ink text-[15px] font-bold"
      >
        {personal}
      </text>

      {/* Became */}
      <g stroke="currentColor" strokeWidth={1.5} fill="none">
        <path d="M250 220H382" strokeDasharray="5 5" />
        <path d="M372 211l10 9-10 9" />
      </g>

      {/* After: the product stack, built on that core */}
      <IsoPlate
        geometry={{ cx: stackX, cy: coreY, w: W, t: T }}
        hatchId={hatchId}
        washed
        detail={<PlateName name={core} />}
      />
      {upper.map(level => {
        const seatedY = coreY - level * SEATED_GAP;
        const liftedY = coreY - level * LIFTED_GAP;
        return (
          <motion.g
            key={level}
            initial={false}
            animate={{ y: (seated ? seatedY : liftedY) - seatedY }}
            transition={{
              duration: reduce ? 0 : 0.7,
              ease: SNAP_EASE,
              delay: reduce ? 0 : 0.2 + (level - 1) * 0.14,
            }}
          >
            <IsoPlate
              geometry={{ cx: stackX, cy: seatedY, w: W, t: T }}
              hatchId={hatchId}
            />
          </motion.g>
        );
      })}
      {/* core callout, drawn over the stack */}
      <g>
        <path
          d={`M${stackX + W * 0.6} ${coreY + (W / 2) * 0.4 + T / 2}H${stackX + W + 22}`}
          stroke="currentColor"
          strokeWidth={1.25}
        />
        <circle cx={stackX + W * 0.6} cy={coreY + (W / 2) * 0.4 + T / 2} r={2.25} fill="currentColor" />
        <text
          x={stackX + W + 28}
          y={coreY + (W / 2) * 0.4 + T / 2}
          dominantBaseline="central"
          className="fill-ink text-[15px] font-bold"
        >
          {coreLabel}
        </text>
      </g>
      <text
        x={stackX}
        y="318"
        textAnchor="middle"
        className="font-latin fill-ink text-[15px] font-bold"
      >
        {product}
      </text>
    </svg>
  );
}
