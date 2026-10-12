'use client';

import { LocaleToggle } from '@/app/[locale]/_components/locale-toggle';
import { ArrowMark } from '@/components/manual/drawings';
import { StepCounter } from '@/components/manual/steps';
import { AnimatedThemeToggler } from '@/components/ui/animated-theme-toggler';
import { getBlogUrl } from '@/lib/blog';
import { raw } from '@/lib/intlayer-raw';
import { cn } from '@/lib/utils';
import { getLocalizedUrl } from 'intlayer';
import { useIntlayer, useLocale } from 'next-intlayer';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState, ViewTransition } from 'react';

// "NWH" logo letters, in NOOWAH order. Names match the home wordmark
// (main-container.tsx) so every letter is a *shared* View Transition — the
// reliable path (React doesn't auto-animate unpaired exits on a route swap).
// The O/O/A partners are rendered zero-width & invisible, so the home O/O/A
// lift out while N/W/H glide into the header.
const LOGO_WORDMARK = [
  { char: 'N', name: 'wordmark-n' },
  { char: 'O', name: 'wordmark-o1', hidden: true },
  { char: 'O', name: 'wordmark-o2', hidden: true },
  { char: 'W', name: 'wordmark-w' },
  { char: 'A', name: 'wordmark-a', hidden: true },
  { char: 'H', name: 'wordmark-h' },
];

const MENU_ID = 'site-menu';

/** Header: logo, section counter, print marks, and the full-page menu. */
const Header = () => {
  const { locale } = useLocale();
  const pathname = usePathname();
  const { home, about, posts, github, nav } = useIntlayer('home-page');
  const { meta } = useIntlayer('about');
  const email = raw(meta.email);

  const [isOpen, setIsOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const firstLinkRef = useRef<HTMLAnchorElement>(null);

  const items = [
    { href: '/', label: home.title },
    { href: '/about', label: about.title },
    { href: '/about#projects', label: nav.works },
    { href: '/work/side-projects', label: nav.side },
    { href: getBlogUrl(locale), label: posts.title, external: true },
    { href: 'https://github.com/henrynoowah', label: github.title, external: true },
  ];
  const isCurrent = (href: string) => pathname === getLocalizedUrl(href, locale);

  // Any navigation closes the menu.
  useEffect(() => setIsOpen(false), [pathname]);

  // While open: lock page scroll, make the page inert, move focus into the
  // menu, and close on Escape. Focus returns to the button on close.
  useEffect(() => {
    if (!isOpen) return;
    const main = document.querySelector('main');
    const overflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    main?.setAttribute('inert', '');
    firstLinkRef.current?.focus();

    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setIsOpen(false);
    window.addEventListener('keydown', onKey);
    const button = buttonRef.current;

    return () => {
      document.body.style.overflow = overflow;
      main?.removeAttribute('inert');
      window.removeEventListener('keydown', onKey);
      button?.focus();
    };
  }, [isOpen]);

  return (
    <>
      <header
        className={cn(
          'fixed inset-x-0 top-0 border-b-[length:var(--stroke)] border-ink bg-paper',
          isOpen ? 'z-[46]' : 'z-40'
        )}
      >
        <div className="mx-auto flex h-14 max-w-[1680px] items-center gap-2 px-5 sm:gap-4 sm:px-8">
          <Link
            href={getLocalizedUrl('/', locale)}
            hrefLang={locale}
            aria-label={`NOOWAH, ${raw(home.title)}`}
            className="font-latin font-wide shrink-0 text-xl font-black leading-none tracking-[-0.03em] hover:underline"
          >
            {LOGO_WORDMARK.map(({ char, name, hidden }, i) => (
              <ViewTransition key={i} name={name}>
                <span
                  aria-hidden
                  className={
                    hidden
                      ? 'inline-block w-0 overflow-hidden opacity-0'
                      : 'inline-block'
                  }
                >
                  {char}
                </span>
              </ViewTransition>
            ))}
          </Link>

          <StepCounter
            className={cn('mx-auto transition-opacity', isOpen && 'invisible')}
            label={raw(nav.steps)}
          />

          <div className="flex shrink-0 gap-2">
            <ViewTransition name="theme-toggle">
              <div>
                <AnimatedThemeToggler label={raw(nav.theme)} />
              </div>
            </ViewTransition>
            <ViewTransition name="locale-toggle">
              <div>
                <LocaleToggle />
              </div>
            </ViewTransition>
          </div>

          <button
            ref={buttonRef}
            type="button"
            aria-expanded={isOpen}
            aria-controls={MENU_ID}
            onClick={() => setIsOpen(open => !open)}
            className={cn(
              'group flex h-8 shrink-0 items-center gap-2 border-[length:var(--stroke)] border-ink px-2.5 text-xs font-bold uppercase',
              isOpen
                ? 'bg-ink text-paper'
                : 'bg-paper text-ink hover:bg-ink hover:text-paper'
            )}
          >
            <span className="hidden sm:inline">
              {isOpen ? nav.close : nav.menu}
            </span>
            <span aria-hidden className="relative flex h-2.5 w-3.5 flex-col justify-between">
              <span
                className={cn(
                  'block h-[1.5px] w-full origin-center bg-current transition-transform duration-300 ease-snap',
                  isOpen && 'translate-y-[4.5px] rotate-45'
                )}
              />
              <span
                className={cn(
                  'block h-[1.5px] w-full origin-center bg-current transition-transform duration-300 ease-snap',
                  isOpen && '-translate-y-[4.5px] -rotate-45'
                )}
              />
            </span>
            <span className="sr-only sm:hidden">{isOpen ? nav.close : nav.menu}</span>
          </button>
        </div>
      </header>

      {/* Full-page menu */}
      <div
        id={MENU_ID}
        role="dialog"
        aria-modal="true"
        aria-label={raw(nav.menu)}
        hidden={!isOpen}
        className="fixed inset-0 z-[45] flex flex-col bg-paper pt-14"
      >
        <nav
          aria-label={raw(nav.label)}
          className="mx-auto flex w-full max-w-[1680px] flex-1 flex-col justify-center px-5 sm:px-8"
        >
          <ol className="border-b-[length:var(--stroke)] border-ink">
            {items.map((item, i) => {
              const current = !item.external && isCurrent(item.href);
              return (
                <li
                  key={item.href}
                  className={cn(
                    'border-t-[length:var(--stroke)] border-ink',
                    isOpen &&
                      'animate-in fade-in-0 slide-in-from-bottom-4 duration-500 ease-snap'
                  )}
                  style={{ animationDelay: `${80 + i * 70}ms`, animationFillMode: 'both' }}
                >
                  <Link
                    ref={i === 0 ? firstLinkRef : undefined}
                    href={item.external ? item.href : getLocalizedUrl(item.href, locale)}
                    hrefLang={item.external ? undefined : locale}
                    aria-current={current ? 'page' : undefined}
                    onClick={() => setIsOpen(false)}
                    {...(item.external
                      ? { target: '_blank', rel: 'noopener noreferrer' }
                      : {})}
                    className="group flex items-center gap-5 py-3 hover:bg-ink hover:text-paper md:gap-8 md:py-4"
                  >
                    <span className="font-latin font-wide tabular w-12 shrink-0 text-right text-lg font-black md:w-20 md:text-2xl">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <span
                      className={cn(
                        'balance flex-1 text-4xl font-bold leading-[1.05] tracking-tight sm:text-5xl md:text-7xl',
                        current &&
                          'underline decoration-[3px] underline-offset-[0.15em]'
                      )}
                    >
                      {item.label}
                    </span>
                    {item.external && (
                      <ArrowMark
                        external
                        className="mr-2 size-6 transition-transform duration-200 ease-snap group-hover:translate-x-1 md:size-9"
                      />
                    )}
                  </Link>
                </li>
              );
            })}
          </ol>
        </nav>

        {/* Right padding clears the chat bubble, which floats above the menu. */}
        <div className="mx-auto flex w-full max-w-[1680px] flex-wrap items-center justify-between gap-3 py-6 pr-24 pl-5 text-sm sm:pr-28 sm:pb-8 sm:pl-8">
          <a
            href={`mailto:${email}`}
            className="font-semibold underline decoration-[length:var(--stroke)] underline-offset-4"
          >
            {email}
          </a>
          <span className="font-narrow font-semibold uppercase tracking-wide">
            {nav.portfolio} · {new Date().getFullYear()}
          </span>
        </div>
      </div>
    </>
  );
};

export default Header;
