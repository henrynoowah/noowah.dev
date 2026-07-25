import type { ComponentType, ReactNode } from 'react';

declare module 'react' {
  // Provided at runtime by Next's vendored React when experimental.viewTransition
  // is enabled (next.config.ts). The stable `react` package does not export it and
  // @types/react only declares it behind the canary types, so declare it here.
  export const ViewTransition: ComponentType<{
    name?: string;
    children?: ReactNode;
    enter?: string;
    exit?: string;
    update?: string;
    share?: string;
    default?: string;
  }>;
}
