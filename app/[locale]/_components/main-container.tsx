'use client';

import { HelpFigure, ArrowMark } from '@/components/manual/drawings';
import { TextLink } from '@/components/manual/ink';
import { AnimatedThemeToggler } from '@/components/ui/animated-theme-toggler';
import { getBlogUrl } from '@/lib/blog';
import { raw } from '@/lib/intlayer-raw';
import { cn } from '@/lib/utils';
import { getLocalizedUrl } from 'intlayer';
import { useIntlayer, useLocale } from 'next-intlayer';
import Link from 'next/link';
import { ViewTransition } from 'react';
import { useChatContext } from './chat-context';
import { LocaleToggle } from './locale-toggle';

// The cover wordmark, split per letter for the shared-element View Transition
// to the running-head "NWH". N/W/H share a name with the header letters so
// they glide across routes; O/O/A only exist here and lift out of the line
// (see ::view-transition-old(wordmark-o*) in globals.css).
const HOME_WORDMARK = [
  { char: 'N', name: 'wordmark-n' },
  { char: 'O', name: 'wordmark-o1' },
  { char: 'O', name: 'wordmark-o2' },
  { char: 'W', name: 'wordmark-w' },
  { char: 'A', name: 'wordmark-a' },
  { char: 'H', name: 'wordmark-h' },
];

/**
 * The manual cover. The Spline bot (mounted once in the locale layout, see
 * floating-chat.tsx) is the product pictured on the box, so the centre of
 * this sheet stays empty paper for it; everything else frames it.
 */
/** The "AI" circle the bot's callout hangs from. */
const AiMark = () => (
  <span
    aria-hidden
    className="grid size-9 shrink-0 place-items-center rounded-full border-[length:var(--stroke)] border-ink bg-wash text-sm font-bold text-ink"
  >
    AI
  </span>
);

const MainContainer = () => {
  const { hero, cover, nav, posts, github } = useIntlayer('home-page');
  const { meta } = useIntlayer('about');
  const { locale } = useLocale();
  const { isOpen, setIsOpen } = useChatContext();
  const email = raw(meta.email);

  const index = [
    { href: '/about#box', label: cover.index.box },
    { href: '/about#steps', label: cover.index.steps },
    { href: '/about#projects', label: cover.index.works },
    { href: '/work/side-projects', label: cover.index.side },
    { href: '/about#contact', label: cover.index.help },
  ];

  return (
    <div className="relative mx-auto flex min-h-dvh max-w-[1680px] flex-col px-5 pt-5 pb-5 sm:px-8 sm:pt-8 sm:pb-8">
      {/* Top band: what this is */}
      <div className="grid grid-cols-[1fr_auto] items-start gap-x-4 sm:gap-x-6">
        <div className="col-span-2 sm:col-span-1">
          <h1>
            <span className="font-latin font-wide flex text-[clamp(3.25rem,8.4vw,6rem)] font-black leading-[0.82] tracking-[-0.035em]">
              {HOME_WORDMARK.map(({ char, name }, i) => (
                <ViewTransition key={i} name={name}>
                  <span aria-hidden className="inline-block">
                    {char}
                  </span>
                </ViewTransition>
              ))}
            </span>
            <span className="sr-only">NOOWAH — {hero.srName}</span>
          </h1>
        </div>
        <div className="row-start-2 mt-4 sm:mt-5">
          <p className="text-2xl font-bold leading-none tracking-tight md:text-4xl">
            {hero.role}
          </p>
          <p className="mt-2 max-w-[30ch] text-base leading-snug md:text-lg">
            {hero.scope}
          </p>
          {/* Phones drop the right-hand column, so the name and what he owns
              come along under the role instead of disappearing. */}
          <p className="mt-3 text-sm font-semibold sm:hidden">{cover.unit}</p>
          <p className="mt-1 text-sm leading-snug md:hidden">
            <span className="font-semibold">{cover.ownsLabel}</span>{' '}
            {[cover.owns.platform, cover.owns.cms, cover.owns.suite]
              .map(item => raw(item.name))
              .join(' · ')}
          </p>
        </div>

        <div className="col-start-2 row-start-2 mt-4 flex flex-col items-end gap-4 sm:row-span-2 sm:row-start-1 sm:mt-0">
          <div className="flex gap-2">
            <ViewTransition name="theme-toggle">
              <div>
                <AnimatedThemeToggler label={nav.theme.value} />
              </div>
            </ViewTransition>
            <ViewTransition name="locale-toggle">
              <div>
                <LocaleToggle />
              </div>
            </ViewTransition>
          </div>
          <p className="font-narrow hidden text-right text-sm font-semibold uppercase leading-snug tracking-wide sm:block">
            {cover.kind}
            <br />
            {cover.unit}
          </p>
          <dl className="mt-2 hidden text-right md:block">
            {[cover.owns.platform, cover.owns.cms, cover.owns.suite].map(item => (
              <div key={raw(item.name)} className="leading-tight [&+&]:mt-2">
                <dt className="text-lg font-bold tracking-tight lg:text-xl">
                  {item.name}
                </dt>
                <dd className="text-sm">{item.role}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>

      {/* Centre: empty paper for the bot. Its "AI" callout is the way into
          the chat; opening it plays the bot's zoom (see floating-chat.tsx). */}
      <div className="relative flex min-h-[40vh] flex-1 flex-col justify-end sm:min-h-[30vh]">
        {/* The bot's free area, measured by floating-chat.tsx on phones */}
        <div id="bot-slot" className="flex-1" />
        {/* Phones: the callout drops to a row just under the bot */}
        <button
          type="button"
          aria-expanded={isOpen}
          aria-label={raw(cover.helpAsk)}
          onClick={e => {
            e.stopPropagation();
            setIsOpen(!isOpen);
          }}
          className={cn(
            'group mb-4 flex w-full items-center gap-3 lg:hidden',
            isOpen && 'invisible'
          )}
        >
          <AiMark />
          <span className="flex flex-1 items-center justify-between gap-3 border-[length:var(--stroke)] border-ink bg-paper px-3 py-2.5 text-left text-sm font-semibold leading-snug group-hover:bg-ink group-hover:text-paper">
            {cover.partLabel}
            <ArrowMark />
          </span>
        </button>
      </div>
      <button
        type="button"
        aria-expanded={isOpen}
        aria-label={raw(cover.helpAsk)}
        onClick={e => {
          e.stopPropagation();
          setIsOpen(!isOpen);
        }}
        className={cn(
          'group absolute top-1/2 left-[calc(50%+17vh)] hidden -translate-y-1/2 items-center transition-opacity duration-200 lg:flex',
          isOpen && 'pointer-events-none opacity-0'
        )}
      >
        <span className="h-[1.5px] w-16 bg-ink" />
        <AiMark />
        <span className="ml-3 flex max-w-[26ch] items-center gap-3 border-[length:var(--stroke)] border-ink bg-paper px-4 py-3 text-left text-base font-semibold leading-snug transition-colors group-hover:bg-ink group-hover:text-paper">
          {cover.partLabel}
          <ArrowMark className="shrink-0 transition-transform duration-200 ease-snap group-hover:translate-x-1" />
        </span>
      </button>

      {/* Bottom band: contents (the nav) and the help page */}
      <div className="grid grid-cols-12 items-end gap-x-6 gap-y-4 sm:gap-y-8">
        <nav
          aria-label={cover.contents.value}
          className="col-span-12 md:col-span-7 lg:col-span-5"
        >
          <ol className="border-b-[length:var(--stroke)] border-ink">
            {index.map((item, i) => (
              <li key={item.href}>
                <Link
                  href={getLocalizedUrl(item.href, locale)}
                  hrefLang={locale}
                  className="group flex items-center gap-4 border-t-[length:var(--stroke)] border-ink py-1.5 text-base font-semibold leading-tight hover:bg-ink hover:text-paper sm:py-2 sm:text-lg md:text-[1.375rem]"
                >
                  <span className="font-latin font-wide tabular w-8 shrink-0 text-center font-black">
                    {i + 1}
                  </span>
                  <span className="flex-1">{item.label}</span>
                  <ArrowMark className="mr-2 transition-transform duration-200 ease-snap group-hover:translate-x-1" />
                </Link>
              </li>
            ))}
          </ol>
          <p className="mt-2 flex gap-6 text-sm sm:mt-3 sm:text-base">
            <TextLink href={getBlogUrl(locale)} external>
              {posts.title}
            </TextLink>
            <TextLink href="https://github.com/henrynoowah" external>
              {github.title}
            </TextLink>
          </p>
        </nav>

        {/* Contact. Phones reach it through the menu's last row instead. */}
        <div className="col-span-12 hidden items-end gap-4 sm:flex md:col-span-5 md:justify-end lg:col-span-4 lg:col-start-9">
          <HelpFigure className="w-20 shrink-0 md:w-24" />
          <p className="text-sm">
            <span className="block font-bold">{cover.helpEmail}</span>
            <a
              href={`mailto:${email}`}
              className="font-semibold underline decoration-[length:var(--stroke)] underline-offset-4"
            >
              {email}
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export { MainContainer };
