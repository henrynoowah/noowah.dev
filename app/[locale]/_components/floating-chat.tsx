'use client';

import { motion } from 'motion/react';
import dynamic from 'next/dynamic';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import {
  Popover,
  PopoverAnchor,
  PopoverContent,
} from '@/components/ui/popover';
import { useChatContext } from './chat-context';
import type { Application } from '@splinetool/runtime';

// Code-split the heavy WebGL/THREE.js runtime (~2MB) out of the initial bundle.
// `react-spline` pulls in `@splinetool/runtime`, so both land in this async chunk.
const Spline = dynamic(() => import('@splinetool/react-spline'), {
  ssr: false,
});

// Code-split the chat UI stack (react-markdown + remark-gfm + use-stick-to-bottom
// + radix avatar) so the markdown renderer isn't parsed during initial load.
const ChatBox = dynamic(
  () => import('@/components/common/chats').then(m => m.ChatBox),
  { ssr: false },
);
const ChatBoxContent = dynamic(
  () => import('@/components/common/chats').then(m => m.ChatBoxContent),
  { ssr: false },
);

const scene = process.env.NEXT_PUBLIC_SPLINE_SCENE!;
const splitBotId = process.env.NEXT_PUBLIC_SPLINE_BOT_ID;

export function FloatingChat({ locale }: { locale: string }) {
  const pathname = usePathname();
  const { isOpen, setIsOpen } = useChatContext();
  const splineRef = useRef<Application>(null);

  // Default locale (en) has no prefix → path is '/', other locales use '/ko' etc.
  const isHome =
    pathname === '/' || pathname === `/${locale}` || pathname === `/${locale}/`;

  // Spline measures its container once on load and doesn't notice the box
  // resizing afterward, so cursor-tracking drifts out of sync with the box's
  // real size (most visible on the small bubble). Force a fresh mount after
  // each resize settles so Spline re-measures against the correct size.
  const [reloadKey, setReloadKey] = useState(0);

  // Hidden while the box is resizing (glitchy mid-spring) and while the
  // reloaded scene boots back up — revealed once the fresh instance loads.
  const [isSplineHidden, setIsSplineHidden] = useState(false);

  // Last isHome value we've fully reloaded for. `onAnimationStart`/
  // `onAnimationComplete` also fire for the unrelated whileHover/whileTap
  // scale animations (and once per animated property, e.g. backgroundColor
  // resolves instantly while width/height are still springing) — comparing
  // against isHome lets us ignore those and react only to a real home↔bubble
  // transition, exactly once.
  const reloadedForRef = useRef(isHome);

  // Defer mounting the Spline scene + chat UI until the page is interactive so
  // the ~2MB THREE.js/WebGL runtime doesn't parse/execute during the load
  // window (it was the dominant Total Blocking Time contributor). Visuals end
  // up identical — the scene just appears a beat after first paint.
  const [isInteractive, setIsInteractive] = useState(false);
  useEffect(() => {
    const w = window as typeof window & {
      requestIdleCallback?: (
        cb: () => void,
        opts?: { timeout: number },
      ) => number;
      cancelIdleCallback?: (id: number) => void;
    };
    if (typeof w.requestIdleCallback === 'function') {
      const id = w.requestIdleCallback(() => setIsInteractive(true), {
        timeout: 2000,
      });
      return () => w.cancelIdleCallback?.(id);
    }
    const id = window.setTimeout(() => setIsInteractive(true), 200);
    return () => window.clearTimeout(id);
  }, []);

  // Close chat immediately when leaving home (don't wait for transition)
  useEffect(() => {
    if (!isHome) setIsOpen(false);
  }, [isHome]);

  const onLoad = (spline: Application) => {
    splineRef.current = spline;
    setIsSplineHidden(false);
    if (!splitBotId) return;
    if (isHome && isOpen) {
      spline.emitEvent('mouseDown', splitBotId);
    }
  };

  const onAnimationStart = () => {
    if (reloadedForRef.current === isHome) return; // hover/tap, not a real transition
    setIsSplineHidden(true);
  };

  const onAnimationComplete = () => {
    if (reloadedForRef.current === isHome) return;
    reloadedForRef.current = isHome;
    setReloadKey(key => key + 1);
  };

  // Sync Spline bot animation with chat open state (home only)
  useEffect(() => {
    if (!splineRef.current || !splitBotId || !isHome) return;
    if (isOpen) {
      splineRef.current.emitEvent('mouseDown', splitBotId);
    } else {
      splineRef.current.emitEventReverse('mouseDown', splitBotId);
    }
  }, [isOpen, isHome]);

  return (
    <>
      {/* Spline scene — morphs between full-screen (home) and bubble (other pages).
          Reloaded (via `key`) once the resize settles so it re-measures its
          container at the correct size; hidden until that reload completes. */}
      <motion.div
        initial={false}
        animate={isHome ? 'home' : 'bubble'}
        variants={{
          // Anchor from bottom-right so no top/left conflicts during animation
          home: {
            right: 0,
            bottom: 0,
            width: '100%',
            height: '100%',
            borderRadius: 0,
            zIndex: 30,
            backgroundColor: 'transparent',
          },
          bubble: {
            right: 24,
            bottom: 24,
            width: 64,
            height: 64,
            borderRadius: 32,
            zIndex: 50,
            backgroundColor: 'var(--accent)',
          },
        }}
        style={{
          border: '1px solid var(--primary)',
          position: 'fixed',
          overflow: 'hidden',
          filter: 'grayscale(0.5) contrast(1.75)',
          pointerEvents: isHome ? 'none' : 'auto',
          cursor: isHome ? 'default' : 'pointer',
        }}
        className="shadow-xl"
        transition={{ type: 'spring', stiffness: 150, damping: 25 }}
        onAnimationStart={onAnimationStart}
        onAnimationComplete={onAnimationComplete}
        onClick={!isHome ? () => setIsOpen(!isOpen) : undefined}
        whileHover={!isHome ? { scale: 1.1 } : undefined}
        whileTap={!isHome ? { scale: 0.95 } : undefined}
      >
        <div
          style={{
            ...(isHome
              ? { width: '100%', height: '100%' }
              : {
                  // Render at 400×400, scale down to fit the 64px bubble
                  position: 'absolute',
                  width: 400,
                  height: 400,
                  top: '50%',
                  left: '50%',
                  transformOrigin: 'center center',
                  transform: 'translate(-50%, -50%) scale(0.14)',
                  pointerEvents: 'none',
                }),
            opacity: isSplineHidden ? 0 : 1,
            transition: 'opacity 0.15s ease',
          }}
        >
          {isInteractive && (
            <Spline key={reloadKey} scene={scene} onLoad={onLoad} />
          )}
        </div>
      </motion.div>

      {/* Chat box */}
      {isHome ? (
        // Home: original centered overlay (no popover)
        <div className="fixed inset-0 flex justify-center items-center pointer-events-none z-[60] px-6 lg:translate-x-1/6">
          {isInteractive && (
            <ChatBox isOpen={isOpen} onClose={() => setIsOpen(false)} />
          )}
        </div>
      ) : (
        // Other pages: popover anchored to the bubble
        <Popover open={isOpen} onOpenChange={setIsOpen}>
          <PopoverAnchor className="fixed bottom-6 right-6 w-16 h-16" />
          <PopoverContent
            side="top"
            align="end"
            sideOffset={16}
            className="chat-popover-content w-[calc(100vw-3rem)] sm:w-[400px] h-[60vh] sm:h-[480px] max-h-[70vh] p-0 bg-primary/20 backdrop-blur-lg rounded-[24px] shadow-xl overflow-hidden max-sm:!w-full max-sm:!h-full max-sm:!max-h-full max-sm:!rounded-none"
            onOpenAutoFocus={e => e.preventDefault()}
          >
            <ChatBoxContent onClose={() => setIsOpen(false)} />
          </PopoverContent>
        </Popover>
      )}
    </>
  );
}
