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
import { LocaleToggle } from './locale-toggle';
import { AnimatedThemeToggler } from '@/components/ui/animated-theme-toggler';
import { useChatContext } from './chat-context';

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
        {content.hero.name}
        <span className="block text-xs font-normal opacity-60">
          {content.hero.role}
        </span>
      </h1>

      <div
        className={`fixed flex gap-2 justify-end z-30 pointer-events-auto top-4 end-4`}
      >
        <div className="rounded-full bg-primary text-primary-foreground flex items-center justify-center p-2">
          <AnimatedThemeToggler />
        </div>
        <div className="rounded-full bg-primary text-primary-foreground flex items-center justify-center p-2">
          <LocaleToggle />
        </div>
      </div>

      <div className="absolute bottom-4 right-4 md:right-1/2 transform md:translate-x-1/2 z-50">
        <Dock className="bg-primary text-primary-foreground">
          <Tooltip>
            <TooltipTrigger>
              <DockIcon title="About">
                <Link
                  href={getLocalizedUrl(`/about`, locale)}
                  hrefLang={locale}
                >
                  <IconUserBitcoin className="size-full" />{' '}
                </Link>
              </DockIcon>
            </TooltipTrigger>
            <TooltipContent>
              <p>{content.about.title}</p>
            </TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger>
              <DockIcon title="Projects">
                <Link
                  href={getLocalizedUrl(`/about#projects`, locale)}
                  hrefLang={locale}
                >
                  <IconLayoutCollage className="size-full" />{' '}
                </Link>
              </DockIcon>
            </TooltipTrigger>
            <TooltipContent>
              <p>{content.projects.title}</p>
            </TooltipContent>
          </Tooltip>
          <Separator orientation="vertical" className="bg-ring" />
          <Tooltip>
            <TooltipTrigger>
              <DockIcon title="Posts">
                <Link
                  href={`https://velog.io/@henrynoowah/posts`}
                  target="_blank"
                >
                  <IconBlockquote className="size-full" />
                </Link>
              </DockIcon>
            </TooltipTrigger>
            <TooltipContent>
              <p>{content.posts.title}</p>
            </TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger>
              <DockIcon title="Github">
                <Link href="https://www.github.com/henrynoowah" target="_blank">
                  <IconBrandGithub className="size-full" />{' '}
                </Link>
              </DockIcon>
            </TooltipTrigger>
            <TooltipContent>
              <p>{content.github.title}</p>
            </TooltipContent>
          </Tooltip>
          <Separator orientation="vertical" className="bg-ring" />
          <Tooltip>
            <TooltipTrigger>
              <DockIcon
                title="Chat"
                onClick={e => {
                  e.stopPropagation();
                  e.preventDefault();
                  setIsOpen(!isOpen);
                }}
              >
                <IconMessageCircle className="size-full" />{' '}
              </DockIcon>
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
