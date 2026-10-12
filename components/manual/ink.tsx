import { cn } from '@/lib/utils';
import Link from 'next/link';
import type { ComponentProps, ReactNode } from 'react';
import { ArrowMark } from './drawings';

/**
 * Rectangular ink-outlined controls. `solid` is the one committed action on a
 * sheet (the manual's "press here"); `outline` is everything else. Hover
 * inverts rather than tinting, because the world has no greys to tint with.
 */
const control =
  'group/ink inline-flex items-center justify-between gap-4 border-[length:var(--stroke)] border-ink px-4 py-3 text-base font-medium leading-none transition-[background-color,color,transform] duration-150 ease-snap active:translate-y-px disabled:pointer-events-none disabled:border-dashed';

const tone = {
  solid: 'bg-ink text-paper hover:bg-paper hover:text-ink',
  outline: 'bg-paper text-ink hover:bg-ink hover:text-paper',
};

type Tone = keyof typeof tone;

export const inkControl = (variant: Tone = 'outline', className?: string) =>
  cn(control, tone[variant], className);

export const InkButton = ({
  variant = 'outline',
  className,
  ...props
}: ComponentProps<'button'> & { variant?: Tone }) => (
  <button
    type="button"
    className={inkControl(variant, className)}
    {...props}
  />
);

/** Internal or external link styled as a control, with a drawn arrow. */
export const InkLink = ({
  href,
  external,
  variant = 'outline',
  className,
  children,
  arrow = true,
  ...props
}: Omit<ComponentProps<typeof Link>, 'href'> & {
  href: string;
  external?: boolean;
  variant?: Tone;
  arrow?: boolean;
  children: ReactNode;
}) => (
  <Link
    href={href}
    className={inkControl(variant, className)}
    {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
    {...props}
  >
    <span>{children}</span>
    {arrow && (
      <ArrowMark
        external={external}
        className="transition-transform duration-200 ease-snap group-hover/ink:translate-x-0.5"
      />
    )}
  </Link>
);

/** Text link with an ink underline that thickens on hover. */
export const TextLink = ({
  href,
  external,
  className,
  children,
  ...props
}: Omit<ComponentProps<typeof Link>, 'href'> & {
  href: string;
  external?: boolean;
  children: ReactNode;
}) => (
  <Link
    href={href}
    className={cn(
      'inline-flex items-baseline gap-1 underline decoration-[length:var(--stroke)] underline-offset-4 hover:decoration-[3px]',
      className
    )}
    {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
    {...props}
  >
    {children}
    {external && <ArrowMark external className="self-center" />}
  </Link>
);
