'use client';

import { motion, useInView, useReducedMotion } from 'motion/react';
import { useId, useRef } from 'react';
import { HatchDefs, IsoPlate, SNAP_EASE } from './iso';

/**
 * Synolink as an assembly: one base plate, three modules. Shipped modules
 * drop into their sockets when the drawing scrolls into view; an unshipped
 * module stays exploded above its socket, drawn dashed.
 */

const BASE = { cx: 230, cy: 250, w: 190, t: 14 };
const MODULE_W = 44;
const MODULE_T = 34;
const LIFT = 92;

/** Base-face page coords (0–100) → screen coords. */
const onBase = (px: number, py: number) => {
  const h = BASE.w / 2;
  return {
    x: BASE.cx + (BASE.w / 100) * (px - py),
    y: BASE.cy - h + (h / 100) * (px + py),
  };
};

type Module = { id: string; label: string; shipped: boolean; at: [number, number] };

export function SuiteDrawing({
  modules,
  base,
  title,
}: {
  modules: Array<Pick<Module, 'id' | 'label' | 'shipped'>>;
  base: string;
  title: string;
}) {
  const hatchId = useId().replace(/:/g, '');
  const ref = useRef<SVGSVGElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.4 });
  const reduce = useReducedMotion();

  const slots: Array<[number, number]> = [
    [24, 76],
    [50, 50],
    [76, 24],
  ];
  const placed: Module[] = modules.map((m, i) => ({ ...m, at: slots[i] }));
  const socket = (MODULE_W / BASE.w) * 100;

  return (
    <svg
      ref={ref}
      viewBox="0 0 460 372"
      role="img"
      aria-label={title}
      className="h-auto w-full text-ink"
    >
      <HatchDefs id={hatchId} />

      {/* base plate with dashed sockets and its name */}
      <IsoPlate
        geometry={BASE}
        hatchId={hatchId}
        detail={
          <>
            {placed.map(m => (
              <rect
                key={m.id}
                x={m.at[0] - socket}
                y={m.at[1] - socket}
                width={socket * 2}
                height={socket * 2}
                strokeDasharray="3 3"
              />
            ))}
            <text
              x="92"
              y="8"
              fontSize="7"
              stroke="none"
              fill="currentColor"
              className="font-latin font-bold"
              textAnchor="end"
            >
              {base}
            </text>
          </>
        }
      />

      {placed.map((m, i) => {
        const s = onBase(...m.at);
        const seated = s.y - MODULE_T;
        const lifted = seated - LIFT;
        const land = m.shipped && (reduce || inView);
        const cy = land ? seated : lifted;
        const labelY = 26;

        return (
          <g key={m.id}>
            {/* guides from socket corners up to the module */}
            {!land && (
              <g stroke="currentColor" strokeWidth={1} strokeDasharray="3 4">
                <path d={`M${s.x - MODULE_W} ${s.y}V${lifted + MODULE_T}`} />
                <path d={`M${s.x + MODULE_W} ${s.y}V${lifted + MODULE_T}`} />
              </g>
            )}
            <motion.g
              initial={false}
              animate={{ y: cy - lifted }}
              transition={{
                duration: reduce ? 0 : 0.7,
                ease: SNAP_EASE,
                delay: reduce ? 0 : 0.15 + i * 0.14,
              }}
            >
              <IsoPlate
                geometry={{ cx: s.x, cy: lifted, w: MODULE_W, t: MODULE_T }}
                hatchId={hatchId}
                washed={m.shipped}
                dashed={!m.shipped}
              />
            </motion.g>
            {/* label leader */}
            <motion.line
              x1={s.x}
              x2={s.x}
              y1={labelY + 8}
              initial={false}
              animate={{ y2: cy - MODULE_W / 2 - 6 }}
              transition={{
                duration: reduce ? 0 : 0.7,
                ease: SNAP_EASE,
                delay: reduce ? 0 : 0.15 + i * 0.14,
              }}
              stroke="currentColor"
              strokeWidth={1}
            />
            <text
              x={s.x}
              y={labelY}
              textAnchor="middle"
              className="font-latin fill-ink text-[15px] font-bold"
            >
              {m.label}
            </text>
          </g>
        );
      })}
    </svg>
  );
}
