'use client';

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
    if (!splitBotId) return;
    if (isHome && isOpen) spline.emitEvent('mouseDown', splitBotId);
  };

  // Sync Spline bot animation with chat open state (home only — the bubble's
  // instance isn't wired to react to chat open/close, matching the original
  // pre-refactor behavior).
  useEffect(() => {
    if (!isHome || !splineRef.current || !splitBotId) return;
    if (isOpen) {
      splineRef.current.emitEvent('mouseDown', splitBotId);
    } else {
      splineRef.current.emitEventReverse('mouseDown', splitBotId);
    }
  }, [isOpen, isHome]);

  return (
    <>
      {isHome ? (
        // Home: full-screen interactive 3D scene.
        isInteractive && (
          <div
            className="fixed inset-0 z-30 pointer-events-none"
            style={{ filter: 'grayscale(0.5) contrast(1.75)' }}
          >
            <Spline scene={scene} onLoad={onLoad} />
          </div>
        )
      ) : (
        // Other pages: the same live scene, shrunk into a bubble. Manual
        // render mode was tried here to cut the render-loop cost, but it
        // broke cursor-tracking and didn't actually reduce main-thread work
        // (measured) — so this accepts the continuous-render cost for a
        // fully interactive bot.
        isInteractive && (
          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Open chat"
            style={{ border: '1px solid var(--primary)' }}
            className="fixed right-6 bottom-6 z-50 size-16 rounded-full bg-accent shadow-xl overflow-hidden hover:scale-110 active:scale-95 transition-transform"
          >
            <div
              style={{
                position: 'absolute',
                width: 400,
                height: 400,
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%) scale(0.16)',
                transformOrigin: 'center center',
                pointerEvents: 'none',
              }}
            >
              <Spline scene={scene} onLoad={onLoad} />
            </div>
          </button>
        )
      )}

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
