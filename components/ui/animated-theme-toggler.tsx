'use client';

import { useTheme } from 'next-themes';
import { useCallback, useEffect, useState } from 'react';

import { cn } from '@/lib/utils';
import { IconMoon, IconSun } from '@tabler/icons-react';

type AnimatedThemeTogglerProps = React.ComponentPropsWithoutRef<'button'> & {
  label?: string;
};

/** Paper / negative switch, drawn as an ink-outlined box like every control. */
export const AnimatedThemeToggler = ({
  className,
  label = 'Toggle dark mode',
  ...props
}: AnimatedThemeTogglerProps) => {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // resolvedTheme is only known client-side, after next-themes hydrates
  useEffect(() => setMounted(true), []);

  const isDark = mounted && resolvedTheme === 'dark';

  const toggleTheme = useCallback(() => {
    setTheme(isDark ? 'light' : 'dark');
  }, [isDark, setTheme]);

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={label}
      aria-pressed={isDark}
      className={cn(
        'relative grid size-8 place-items-center border-[length:var(--stroke)] border-ink bg-paper text-ink hover:bg-ink hover:text-paper',
        className
      )}
      {...props}
    >
      <IconMoon
        stroke={1.75}
        className={cn(
          'absolute size-4 transition-[opacity,rotate] duration-300',
          isDark ? 'rotate-0 opacity-100' : 'rotate-90 opacity-0'
        )}
      />
      <IconSun
        stroke={1.75}
        className={cn(
          'size-4 transition-[opacity,rotate] duration-300',
          isDark ? '-rotate-90 opacity-0' : 'rotate-0 opacity-100'
        )}
      />
    </button>
  );
};
