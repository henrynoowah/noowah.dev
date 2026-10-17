// The paper dither's field, shared by scripts/dither.mjs (which rasterises
// the static tiles) and components/manual/dither-cursor.tsx (which inks extra
// marks under the pointer), so both land on the same grid and agree on which
// cells are already printed.
//
// A tileable two-octave value-noise field (wrapping lattices, smoothstep
// interpolation, mulberry32 seed 0x4024ed2c) sets each cell's density; an 8×8
// Bayer matrix thresholds it, so the sheet runs from bare paper to an ordered,
// cross-hatched patch. Each printed cell is a 5px × in a 6px cell.

/** CSS px per cell; the tile is anchored at the viewport origin. */
export const CELL = 6;
/** Cells per tile edge (576px tile). Divisible by 8 so the Bayer phase tiles. */
export const CELLS = 96;
/** The × glyph, 5×5, two 1px diagonals. */
export const MARK = [
  [1, 0, 0, 0, 1],
  [0, 1, 0, 1, 0],
  [0, 0, 1, 0, 0],
  [0, 1, 0, 1, 0],
  [1, 0, 0, 0, 1],
];
/** Mark colour per theme: ink on the light sheet, paper-light on the negative. */
export const INK = {
  light: [0x0b, 0x29, 0x2c],
  dark: [0xde, 0xeb, 0xea],
};

const SEED = 0x4024ed2c;
// Density range the noise maps into. The low end prints bare paper, the high
// end a clearly hatched tint, never a solid.
const MIN_DENSITY = -0.04;
const MAX_DENSITY = 0.34;

const BAYER8 = [
  [0, 32, 8, 40, 2, 34, 10, 42],
  [48, 16, 56, 24, 50, 18, 58, 26],
  [12, 44, 4, 36, 14, 46, 6, 38],
  [60, 28, 52, 20, 62, 30, 54, 22],
  [3, 35, 11, 43, 1, 33, 9, 41],
  [51, 19, 59, 27, 49, 17, 57, 25],
  [15, 47, 7, 39, 13, 45, 5, 37],
  [63, 31, 55, 23, 61, 29, 53, 21],
];

/**
 * Density a cell must exceed to print a mark.
 * @param {number} cx viewport cell column
 * @param {number} cy viewport cell row
 */
export function threshold(cx, cy) {
  return (BAYER8[cy & 7][cx & 7] + 0.5) / 64;
}

function mulberry32(seed) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const smooth = t => t * t * (3 - 2 * t);

/**
 * Base density per tile cell, row-major, CELLS × CELLS.
 * @returns {Float32Array}
 */
export function createBaseField() {
  const random = mulberry32(SEED);

  // One octave of value noise on a lattice that wraps at the tile edge.
  const octave = lattices => {
    const lattice = Array.from({ length: lattices * lattices }, random);
    const at = (i, j) => lattice[(j % lattices) * lattices + (i % lattices)];
    const step = CELLS / lattices;
    return (x, y) => {
      const i = Math.floor(x / step);
      const j = Math.floor(y / step);
      const u = smooth(x / step - i);
      const v = smooth(y / step - j);
      const top = at(i, j) + (at(i + 1, j) - at(i, j)) * u;
      const bottom = at(i, j + 1) + (at(i + 1, j + 1) - at(i, j + 1)) * u;
      return top + (bottom - top) * v;
    };
  };

  const coarse = octave(8);
  const fine = octave(16);
  const field = new Float32Array(CELLS * CELLS);
  for (let y = 0; y < CELLS; y++) {
    for (let x = 0; x < CELLS; x++) {
      const n = coarse(x, y) * 0.7 + fine(x, y) * 0.3;
      field[y * CELLS + x] =
        MIN_DENSITY + (MAX_DENSITY - MIN_DENSITY) * smooth(n);
    }
  }
  return field;
}
