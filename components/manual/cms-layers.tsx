import type { ReactNode } from 'react';

/**
 * Top-face line drawings for the cms.synolink.ai exploded view. Each is
 * authored in the 0–100 page box IsoPlate maps onto a plate's top face
 * (origin at the back corner; x runs down-right, y down-left).
 */

const label = {
  stroke: 'none',
  fill: 'currentColor',
  className: 'font-latin font-bold',
} as const;

export const CMS_LAYER_DRAWINGS: Record<string, ReactNode> = {
  canvas: (
    <>
      <rect x="4" y="4" width="92" height="92" />
      <line x1="4" y1="16" x2="96" y2="16" />
      <circle cx="10" cy="10" r="2" />
      <circle cx="17" cy="10" r="2" />
      <circle cx="24" cy="10" r="2" />
      <rect x="34" y="7" width="40" height="6" rx="1" />
      {/* pointer mid-drag */}
      <path d="M52 44v20l5-5 5 10 4-2-5-10h7Z" fill="var(--paper)" />
      <rect x="22" y="30" width="26" height="20" strokeDasharray="3 3" />
    </>
  ),
  elements: (
    <>
      <rect x="8" y="8" width="84" height="10" />
      <rect x="8" y="24" width="50" height="34" />
      <line x1="14" y1="32" x2="48" y2="32" />
      <line x1="14" y1="38" x2="40" y2="38" />
      <rect x="14" y="46" width="16" height="6" />
      <rect x="62" y="24" width="30" height="34" />
      <path d="M62 24l30 34M92 24 62 58" />
      <rect x="8" y="64" width="26" height="28" />
      <rect x="37" y="64" width="26" height="28" />
      <rect x="66" y="64" width="26" height="28" />
    </>
  ),
  variables: (
    <>
      {[0, 1, 2, 3, 4].map(i => (
        <rect
          key={i}
          x={8 + i * 17}
          y="8"
          width="13"
          height="13"
          fill={i % 2 === 0 ? 'currentColor' : 'none'}
        />
      ))}
      <text x="8" y="50" fontSize="20" {...label}>
        Aa
      </text>
      <line x1="40" y1="34" x2="92" y2="34" />
      <line x1="40" y1="42" x2="82" y2="42" />
      <line x1="40" y1="50" x2="70" y2="50" />
      <rect x="8" y="62" width="34" height="24" />
      <rect x="50" y="62" width="18" height="26" />
      <rect x="76" y="62" width="11" height="20" />
    </>
  ),
  plugins: (
    <>
      <rect x="4" y="4" width="24" height="92" />
      {[0, 1, 2, 3, 4, 5, 6].map(i => (
        <rect
          key={i}
          x="8"
          y={10 + i * 12}
          width="16"
          height="8"
          fill={i === 1 ? 'currentColor' : 'none'}
        />
      ))}
      <rect x="32" y="4" width="64" height="92" />
      <line x1="38" y1="14" x2="80" y2="14" />
      <line x1="44" y1="24" x2="86" y2="24" />
      <line x1="50" y1="34" x2="78" y2="34" />
      <line x1="50" y1="44" x2="88" y2="44" />
      <line x1="44" y1="54" x2="74" y2="54" />
      <path d="M38 14v40M44 24v30" strokeDasharray="2 3" />
    </>
  ),
  ai: (
    <>
      <rect x="8" y="10" width="84" height="16" />
      <line x1="16" y1="14" x2="16" y2="22" />
      <rect x="80" y="13" width="9" height="10" fill="currentColor" />
      <line x1="8" y1="40" x2="88" y2="40" />
      <line x1="8" y1="50" x2="80" y2="50" />
      <line x1="8" y1="60" x2="90" y2="60" />
      <line x1="8" y1="70" x2="62" y2="70" />
      <line x1="8" y1="80" x2="44" y2="80" strokeDasharray="3 4" />
    </>
  ),
  publish: (
    <>
      <rect x="8" y="8" width="18" height="11" fill="currentColor" />
      <text x="17" y="16.5" fontSize="7" textAnchor="middle" {...label} fill="var(--paper)">
        EN
      </text>
      <rect x="28" y="8" width="18" height="11" />
      <text x="37" y="16.5" fontSize="7" textAnchor="middle" {...label}>
        KO
      </text>
      <rect x="8" y="26" width="50" height="66" />
      <line x1="14" y1="36" x2="50" y2="36" />
      <line x1="14" y1="44" x2="44" y2="44" />
      <line x1="14" y1="52" x2="48" y2="52" />
      <text x="64" y="58" fontSize="22" {...label}>
        {'{ }'}
      </text>
      <line x1="64" y1="72" x2="92" y2="72" />
      <line x1="64" y1="80" x2="84" y2="80" />
    </>
  ),
};
