'use client';

import { useTheme } from 'next-themes';
import { useCallback, useEffect, useState } from 'react';

import { cn } from '@/lib/utils';
import { IconMoon, IconSun } from '@tabler/icons-react';

type AnimatedThemeTogglerProps = React.ComponentPropsWithoutRef<'button'>;

export const AnimatedThemeToggler = ({
  className,
  ...props
}: AnimatedThemeTogglerProps) => {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // resolvedTheme is only known client-side, after next-themes hydrates
  useEffect(() => setMounted(true), []);

  const isDark = mounted && resolvedTheme === 'dark';

  // Plain toggle — theme colors transition smoothly via CSS (see globals.css).
  // The previous view-transition ripple broke after client-side navigation, so
  // it was removed in favor of a simple, reliable color change.
  const toggleTheme = useCallback(() => {
    setTheme(isDark ? 'light' : 'dark');
  }, [isDark, setTheme]);

  return (
    <button
      onClick={toggleTheme}
      aria-label="Toggle dark mode"
      className={cn(className)}
      {...props}
    >
      <IconMoon
        className={`absolute ${
          isDark ? 'rotate-0 opacity-100' : 'rotate-180 opacity-0'
        }  transform transition duration-500 ease-in-out`}
      />
      <IconSun
        className={`${
          isDark ? 'rotate-180 opacity-0' : 'rotate-0 opacity-100'
        }  transform transition duration-500 ease-in-out`}
      />
    </button>
  );
};
