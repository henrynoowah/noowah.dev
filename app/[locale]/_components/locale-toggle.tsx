'use client';

import { cn } from '@/lib/utils';
import type { Locale } from 'intlayer';
import { useIntlayer, useLocale } from 'next-intlayer';

/** Both languages printed side by side, the current one inked in. */
const LocaleToggle = ({ className }: { className?: string }) => {
  const { locale, availableLocales, setLocale } = useLocale();
  const { nav } = useIntlayer('home-page');

  return (
    <div
      role="group"
      aria-label={nav.language.value}
      className={cn('flex', className)}
    >
      {availableLocales.map(l => {
        const isCurrent = l === locale;
        return (
          <button
            key={l}
            type="button"
            lang={l}
            aria-pressed={isCurrent}
            onClick={() => !isCurrent && setLocale(l as Locale)}
            className={cn(
              'font-latin -ml-[var(--stroke)] grid h-8 min-w-9 place-items-center border-[length:var(--stroke)] border-ink px-2 text-xs font-bold uppercase first:ml-0',
              isCurrent
                ? 'bg-ink text-paper'
                : 'bg-paper text-ink hover:bg-ink hover:text-paper'
            )}
          >
            {l}
          </button>
        );
      })}
    </div>
  );
};

export { LocaleToggle };
