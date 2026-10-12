/**
 * `useIntlayer` returns proxy nodes, not strings. They render fine as JSX
 * children but stringify wrongly anywhere else (href, mailto, aria-*, alt,
 * template literals, array joins). Unwrap them before leaving JSX.
 */

/** Single scalar node → plain string. */
export const raw = (v: unknown): string =>
  (v as { value?: string })?.value ?? String(v);

/** Array node → plain string array. */
export const strings = (v: unknown): string[] =>
  (v as Array<{ value?: string }>).map(x => x?.value ?? String(x));
