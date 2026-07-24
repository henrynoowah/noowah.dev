'use client';

import { useTheme } from 'next-themes';
import { useCallback, useEffect, useRef, useState } from 'react';
import { flushSync } from 'react-dom';

import { cn } from '@/lib/utils';
import { IconMoon, IconSun } from '@tabler/icons-react';

interface AnimatedThemeTogglerProps
  extends React.ComponentPropsWithoutRef<'button'> {
  duration?: number;
}

export const AnimatedThemeToggler = ({
  className,
  duration = 400,
  ...props
}: AnimatedThemeTogglerProps) => {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // resolvedTheme is only known client-side, after next-themes hydrates
  useEffect(() => setMounted(true), []);

  const isDark = mounted && resolvedTheme === 'dark';

  const toggleTheme = useCallback(async () => {
    if (!buttonRef.current) return;
    const nextTheme = isDark ? 'light' : 'dark';

    await document.startViewTransition(() => {
      flushSync(() => {
        setTheme(nextTheme);
      });
    }).ready;

    const { top, left, width, height } =
      buttonRef.current.getBoundingClientRect();
    const x = left + width / 2;
    const y = top + height / 2;
    const maxRadius = Math.hypot(
      Math.max(left, window.innerWidth - left),
      Math.max(top, window.innerHeight - top)
    );

    document.documentElement.animate(
      {
        clipPath: [
          `circle(0px at ${x}px ${y}px)`,
          `circle(${maxRadius}px at ${x}px ${y}px)`,
        ],
      },
      {
        duration,
        easing: 'ease-in-out',
        pseudoElement: '::view-transition-new(root)',
      }
    );
  }, [isDark, duration, setTheme]);

  return (
    <button
      ref={buttonRef}
      onClick={toggleTheme}
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
