'use client';

import { useReducedMotion } from 'motion/react';
import { useEffect, useRef } from 'react';
import {
  CELL,
  CELLS,
  INK,
  MARK,
  createBaseField,
  threshold,
} from '@/lib/dither-field.mjs';

// Ink gathers under the pointer: near the cursor the dither's density rises,
// so extra × print between the sheet's own marks. The patch trails the cursor
// a beat behind, leaves a short wake, and fades out once the mouse rests.
// Mouse and pen only; touch and reduced motion keep the static sheet.
const RADIUS = 120; // px reach of the patch
const BOOST = 0.45; // density added at the centre of the patch
const FOLLOW = 90; // ms time constant of the patch chasing the cursor
const STAMP_GAP = 24; // px of travel between wake stamps
const WAKE_LIFE = 650; // ms a wake stamp takes to fade
const REST_FADE = 900; // ms the patch takes to fade once the mouse rests

type Source = { x: number; y: number; amp: number };
type Box = { x0: number; y0: number; x1: number; y1: number };

const smooth = (t: number) => t * t * (3 - 2 * t);
const easeOut = (t: number) => 1 - (1 - t) ** 3;

function markSprite(dark: boolean) {
  const sprite = document.createElement('canvas');
  sprite.width = sprite.height = MARK.length;
  const ctx = sprite.getContext('2d')!;
  const [r, g, b] = dark ? INK.dark : INK.light;
  ctx.fillStyle = `rgb(${r} ${g} ${b})`;
  MARK.forEach((row, y) =>
    row.forEach((on, x) => on && ctx.fillRect(x, y, 1, 1))
  );
  return sprite;
}

export function DitherCursor() {
  const ref = useRef<HTMLCanvasElement>(null);
  const reduce = useReducedMotion();

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas || reduce) return;
    // Touch screens can still report mouse-typed pointers for taps.
    const fine = window.matchMedia('(hover: hover) and (pointer: fine)');

    let field: Float32Array | null = null;
    let ctx: CanvasRenderingContext2D | null = null;
    let dpr = 1;
    let dark = false;
    let sprite: HTMLCanvasElement | null = null;
    let target: { x: number; y: number } | null = null;
    let head: (Source & { rest: number }) | null = null;
    let lastStamp = { x: 0, y: 0 };
    let wake: { x: number; y: number; born: number; amp: number }[] = [];
    let prevBox: Box | null = null;
    let raf = 0;
    let lastT = 0;

    const resize = () => {
      dpr = window.devicePixelRatio || 1;
      canvas.width = Math.round(window.innerWidth * dpr);
      canvas.height = Math.round(window.innerHeight * dpr);
      ctx = canvas.getContext('2d');
      if (ctx) ctx.imageSmoothingEnabled = false;
      prevBox = null;
    };

    const frame = (t: number) => {
      if (!ctx || !field || !head || !target) return;
      const dt = lastT ? t - lastT : 16;
      lastT = t;
      const now = performance.now();

      const isDark = document.documentElement.classList.contains('dark');
      if (!sprite || isDark !== dark) {
        dark = isDark;
        sprite = markSprite(dark);
      }

      const k = 1 - Math.exp(-dt / FOLLOW);
      head.x += (target.x - head.x) * k;
      head.y += (target.y - head.y) * k;
      head.amp = easeOut(Math.max(0, 1 - (now - head.rest) / REST_FADE));

      if (
        head.amp > 0 &&
        Math.hypot(head.x - lastStamp.x, head.y - lastStamp.y) > STAMP_GAP
      ) {
        wake.push({ x: head.x, y: head.y, born: now, amp: head.amp });
        lastStamp = { x: head.x, y: head.y };
      }
      wake = wake.filter(s => now - s.born < WAKE_LIFE);

      const sources: Source[] = [
        head,
        ...wake.map(s => ({
          x: s.x,
          y: s.y,
          amp: s.amp * easeOut(1 - (now - s.born) / WAKE_LIFE),
        })),
      ].filter(s => s.amp > 0.01);

      // Clear what was drawn last frame, then ink the patch's cells.
      if (prevBox) {
        ctx.clearRect(
          prevBox.x0 * CELL * dpr,
          prevBox.y0 * CELL * dpr,
          (prevBox.x1 - prevBox.x0 + 1) * CELL * dpr,
          (prevBox.y1 - prevBox.y0 + 1) * CELL * dpr
        );
      }
      if (!sources.length) {
        prevBox = null;
        raf = 0;
        lastT = 0;
        return;
      }

      const maxX = Math.ceil(window.innerWidth / CELL);
      const maxY = Math.ceil(window.innerHeight / CELL);
      const box: Box = {
        x0: Math.max(
          0,
          Math.floor((Math.min(...sources.map(s => s.x)) - RADIUS) / CELL)
        ),
        y0: Math.max(
          0,
          Math.floor((Math.min(...sources.map(s => s.y)) - RADIUS) / CELL)
        ),
        x1: Math.min(
          maxX,
          Math.ceil((Math.max(...sources.map(s => s.x)) + RADIUS) / CELL)
        ),
        y1: Math.min(
          maxY,
          Math.ceil((Math.max(...sources.map(s => s.y)) + RADIUS) / CELL)
        ),
      };
      const size = Math.round(MARK.length * dpr);

      for (let cy = box.y0; cy <= box.y1; cy++) {
        for (let cx = box.x0; cx <= box.x1; cx++) {
          const base = field[(cy % CELLS) * CELLS + (cx % CELLS)];
          const th = threshold(cx, cy);
          if (base > th) continue; // already printed on the sheet
          const px = cx * CELL + MARK.length / 2;
          const py = cy * CELL + MARK.length / 2;
          let boost = 0;
          for (const s of sources) {
            const d = Math.hypot(px - s.x, py - s.y);
            if (d < RADIUS)
              boost = Math.max(boost, s.amp * smooth(1 - d / RADIUS));
          }
          if (base + boost * BOOST > th) {
            ctx.drawImage(
              sprite,
              Math.round(cx * CELL * dpr),
              Math.round(cy * CELL * dpr),
              size,
              size
            );
          }
        }
      }
      prevBox = box;
      raf = requestAnimationFrame(frame);
    };

    const onMove = (e: PointerEvent) => {
      if (!fine.matches) return;
      if (e.pointerType !== 'mouse' && e.pointerType !== 'pen') return;
      // The field and canvas are only built once someone actually moves.
      if (!field) {
        field = createBaseField();
        resize();
      }
      target = { x: e.clientX, y: e.clientY };
      // After a rest the patch starts fresh at the cursor, not swept over
      // from where it faded.
      if (!head || head.amp === 0) {
        head = { ...target, amp: 1, rest: performance.now() };
        lastStamp = { ...target };
      }
      head.rest = performance.now();
      if (!raf) raf = requestAnimationFrame(frame);
    };

    const onResize = () => field && resize();

    window.addEventListener('pointermove', onMove, { passive: true });
    window.addEventListener('resize', onResize);
    return () => {
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('resize', onResize);
      cancelAnimationFrame(raf);
      ctx?.clearRect(0, 0, canvas.width, canvas.height);
    };
  }, [reduce]);

  return <canvas ref={ref} className="dither-cursor" aria-hidden="true" />;
}
