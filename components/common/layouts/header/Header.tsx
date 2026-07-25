'use client';

import Link from 'next/link';
import { Suspense, useState, ViewTransition } from 'react';
import ShowSearchButton from './ShowSearchButton';
import { LocaleToggle } from '@/app/[locale]/_components/locale-toggle';
import { getLocalizedUrl, Locales, LocalesValues } from 'intlayer';
import { AnimatedThemeToggler } from '@/components/ui/animated-theme-toggler';
import { IconArrowUpRight } from '@tabler/icons-react';
import { useIntlayer } from 'next-intlayer';

const HEADER_HEIGHT = 56;

// "NWH" logo letters, in NOOWAH order. Names match the home wordmark
// (main-container.tsx) so every letter is a *shared* View Transition — the
// reliable path (React doesn't auto-animate unpaired exits on a route swap).
// The O/O/A partners are rendered zero-width & invisible, so the home O/O/A
// morph into nothing (pop-and-vanish) while N/W/H glide into the visible logo.
const LOGO_WORDMARK = [
  { char: 'N', name: 'wordmark-n' },
  { char: 'O', name: 'wordmark-o1', hidden: true },
  { char: 'O', name: 'wordmark-o2', hidden: true },
  { char: 'W', name: 'wordmark-w' },
  { char: 'A', name: 'wordmark-a', hidden: true },
  { char: 'H', name: 'wordmark-h' },
];

interface Params {
  navOption: Array<{
    label: string;
    href: string;
    locale: LocalesValues;
    external?: boolean;
  }>;
  locale?: LocalesValues;
}

const Header = ({ navOption, locale }: Params) => {
  const [isOpen, setIsOpen] = useState(false);
  const content = useIntlayer('home-page');

  const resolveLabel = (key: string): string => {
    const map: Record<string, string> = {
      home: content.home.title,
      about: content.about.title,
      works: content.works.title,
      posts: content.posts.title,
      github: content.github.title,
      projects: content.projects.title,
      chat: content.chat.title,
    };
    return map[key] ?? key;
  };

  return (
    <>
      <header
        style={{ height: HEADER_HEIGHT }}
        className="w-full fixed top-0 z-40"
      >
        <div className="absolute inset-0 bg-background/90 backdrop-blur-lg border-b border-border/30" />

        <div className="relative w-full h-full flex items-center justify-between max-w-[1920px] mx-auto px-5 sm:px-8">
          <Link
            href={getLocalizedUrl(`/`, locale ?? Locales.ENGLISH)}
            className="group relative z-50"
          >
            <span className="font-serif text-lg font-bold uppercase tracking-wider text-foreground group-hover:text-primary transition-colors duration-200">
              {LOGO_WORDMARK.map(({ char, name, hidden }, i) => (
                <ViewTransition key={i} name={name}>
                  <span
                    aria-hidden={hidden || undefined}
                    className={
                      hidden
                        ? 'inline-block w-0 opacity-0 overflow-hidden'
                        : 'inline-block'
                    }
                  >
                    {char}
                  </span>
                </ViewTransition>
              ))}
            </span>
          </Link>

          <div className="flex items-center gap-3 relative z-50">
            <Suspense>
              <ShowSearchButton />
            </Suspense>

            <div className="flex items-center">
              <ViewTransition name="theme-toggle">
                <div className="size-8 flex items-center justify-center text-foreground/60 hover:text-foreground transition-colors duration-200">
                  <AnimatedThemeToggler />
                </div>
              </ViewTransition>
              <ViewTransition name="locale-toggle">
                <div className="size-8 flex items-center justify-center text-foreground/60 hover:text-foreground transition-colors duration-200">
                  <LocaleToggle />
                </div>
              </ViewTransition>
            </div>

            <button
              type="button"
              onClick={() => setIsOpen(!isOpen)}
              className="flex items-center gap-2 h-8 px-3 rounded-full border border-border/50 hover:border-foreground/30 text-foreground transition-all duration-200 group"
            >
              <span className="text-[11px] font-medium uppercase tracking-widest">
                {isOpen ? content.nav.close : content.nav.menu}
              </span>
              <div className="w-3.5 h-2.5 relative flex flex-col justify-between">
                <span
                  className={`block w-full h-[1.5px] bg-current rounded-full transition-all duration-300 origin-center ${
                    isOpen ? 'translate-y-[4.5px] rotate-45' : ''
                  }`}
                />
                <span
                  className={`block w-full h-[1.5px] bg-current rounded-full transition-all duration-300 origin-center ${
                    isOpen ? '-translate-y-[4.5px] -rotate-45' : ''
                  }`}
                />
              </div>
            </button>
          </div>
        </div>
      </header>

      {/* Full-screen overlay nav */}
      <div
        className={`fixed inset-0 z-30 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
          isOpen
            ? 'opacity-100 pointer-events-auto'
            : 'opacity-0 pointer-events-none'
        }`}
      >
        <div
          className={`absolute inset-0 bg-background/95 backdrop-blur-2xl transition-opacity duration-500 ${
            isOpen ? 'opacity-100' : 'opacity-0'
          }`}
        />

        <div className="relative h-full flex flex-col justify-center px-8 sm:px-16 md:px-24">
          <nav>
            <ul className="flex flex-col gap-2">
              {navOption.map((nav, index) => (
                <li
                  key={`nav-${nav.label}`}
                  className={`transform transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                    isOpen
                      ? 'translate-y-0 opacity-100'
                      : 'translate-y-8 opacity-0'
                  }`}
                  style={{
                    transitionDelay: isOpen ? `${150 + index * 80}ms` : '0ms',
                  }}
                >
                  <Link
                    href={
                      !nav.external
                        ? `${nav.locale !== 'en' ? `/${nav.locale}` : ''}${nav.href}`
                        : nav.href
                    }
                    target={nav.external ? '_blank' : undefined}
                    onClick={() => setIsOpen(false)}
                    className="group flex items-center gap-4 py-3"
                  >
                    <span className="text-[10px] font-medium text-muted-foreground/40 tabular-nums">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <span className="font-serif text-4xl sm:text-5xl md:text-6xl font-bold uppercase tracking-tight text-foreground group-hover:text-primary transition-colors duration-200">
                      {resolveLabel(nav.label)}
                    </span>
                    {nav.external && (
                      <IconArrowUpRight
                        size={20}
                        strokeWidth={1.5}
                        className="text-muted-foreground/30 group-hover:text-primary mt-2 transition-all duration-200 group-hover:-translate-y-1 group-hover:translate-x-1"
                      />
                    )}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div
            className={`absolute bottom-8 left-8 sm:left-16 md:left-24 right-8 sm:right-16 md:right-24 flex items-center justify-between text-[10px] tracking-[0.2em] uppercase text-muted-foreground/30 transition-all duration-700 delay-500 ${
              isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
          >
            <span>henrynoowah@gmail.com</span>
            <span>{content.nav.portfolio} &mdash; 2024</span>
          </div>
        </div>
      </div>

      <div style={{ height: HEADER_HEIGHT }} className="w-full" />
    </>
  );
};

export default Header;
