'use client';

import { Dock, DockIcon } from '@/components/ui/dock';
import { FlickeringGrid } from '@/components/ui/flickering-grid';
import { Separator } from '@/components/ui/separator';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import {
  IconBlockquote,
  IconBrandGithub,
  IconLayoutCollage,
  IconMessageCircle,
  IconUserBitcoin,
} from '@tabler/icons-react';
import { useIntlayer, useLocale } from 'next-intlayer';
import { getLocalizedUrl } from 'intlayer';
import Link from 'next/link';
import { ViewTransition } from 'react';
import { LocaleToggle } from './locale-toggle';
import { AnimatedThemeToggler } from '@/components/ui/animated-theme-toggler';
import { useChatContext } from './chat-context';

// The home wordmark, split per letter for the shared-element View Transition to
// the header "NWH" logo. N/W/H share a name with the header letters so they morph
// across routes; O/O/A only exist here, so they play a distinct exit animation
// (the two O's "pop and vanish" — see ::view-transition-old(wordmark-o*) in
// globals.css) as NOOWAH collapses into NWH.
const HOME_WORDMARK = [
  { char: 'N', name: 'wordmark-n' },
  { char: 'O', name: 'wordmark-o1' },
  { char: 'O', name: 'wordmark-o2' },
  { char: 'W', name: 'wordmark-w' },
  { char: 'A', name: 'wordmark-a' },
  { char: 'H', name: 'wordmark-h' },
];

const MainContainer = () => {
  const { ...content } = useIntlayer('home-page');
  const { locale } = useLocale();
  const { isOpen, setIsOpen } = useChatContext();

  return (
    <div className="pointer-events-auto h-dvh">
      <div className="absolute w-full h-full bg-accent/20! dark:bg-accent/10!">
        <FlickeringGrid
          className="relative inset-0 z-0 [mask-image:radial-gradient(640px_circle_at_center,white,transparent)]"
          squareSize={6}
          gridGap={6}
          color="oklch(0.4355 0.0499 208.8718)"
          maxOpacity={1}
          flickerChance={0.1}
        />
      </div>

      <h1 className="fixed top-4 start-4 z-30 font-display text-sm leading-tight">
        {HOME_WORDMARK.map(({ char, name }, i) => (
          <ViewTransition key={i} name={name}>
            <span className="inline-block">{char}</span>
          </ViewTransition>
        ))}
      </h1>

      <div
        className={`fixed flex gap-2 justify-end z-30 pointer-events-auto top-4 end-4`}
      >
        <ViewTransition name="theme-toggle">
          <div className="rounded-full bg-primary text-primary-foreground flex items-center justify-center p-2">
            <AnimatedThemeToggler />
          </div>
        </ViewTransition>
        <ViewTransition name="locale-toggle">
          <div className="rounded-full bg-primary text-primary-foreground flex items-center justify-center p-2">
            <LocaleToggle />
          </div>
        </ViewTransition>
      </div>

      <div className="absolute bottom-4 right-4 md:right-1/2 transform md:translate-x-1/2 z-50">
        <Dock className="bg-primary text-primary-foreground">
          <Tooltip>
            <TooltipTrigger asChild>
              <Link
                href={getLocalizedUrl(`/about`, locale)}
                hrefLang={locale}
                aria-label={content.about.title.value}
                className="inline-flex"
              >
                <DockIcon>
                  <IconUserBitcoin className="size-full" />
                </DockIcon>
              </Link>
            </TooltipTrigger>
            <TooltipContent>
              <p>{content.about.title}</p>
            </TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Link
                href={getLocalizedUrl(`/about#projects`, locale)}
                hrefLang={locale}
                aria-label={content.projects.title.value}
                className="inline-flex"
              >
                <DockIcon>
                  <IconLayoutCollage className="size-full" />
                </DockIcon>
              </Link>
            </TooltipTrigger>
            <TooltipContent>
              <p>{content.projects.title}</p>
            </TooltipContent>
          </Tooltip>
          <Separator orientation="vertical" className="bg-ring" />
          <Tooltip>
            <TooltipTrigger asChild>
              <Link
                href={`https://velog.io/@henrynoowah/posts`}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={content.posts.title.value}
                className="inline-flex"
              >
                <DockIcon>
                  <IconBlockquote className="size-full" />
                </DockIcon>
              </Link>
            </TooltipTrigger>
            <TooltipContent>
              <p>{content.posts.title}</p>
            </TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Link
                href="https://www.github.com/henrynoowah"
                target="_blank"
                rel="noopener noreferrer"
                aria-label={content.github.title.value}
                className="inline-flex"
              >
                <DockIcon>
                  <IconBrandGithub className="size-full" />
                </DockIcon>
              </Link>
            </TooltipTrigger>
            <TooltipContent>
              <p>{content.github.title}</p>
            </TooltipContent>
          </Tooltip>
          <Separator orientation="vertical" className="bg-ring" />
          <Tooltip>
            <TooltipTrigger asChild>
              <button
                type="button"
                aria-label={content.chat.title.value}
                className="inline-flex"
                onClick={e => {
                  e.stopPropagation();
                  e.preventDefault();
                  setIsOpen(!isOpen);
                }}
              >
                <DockIcon>
                  <IconMessageCircle className="size-full" />
                </DockIcon>
              </button>
            </TooltipTrigger>
            <TooltipContent>
              <p>{content.chat.title}</p>
            </TooltipContent>
          </Tooltip>
        </Dock>
      </div>
    </div>
  );
};

export { MainContainer };
