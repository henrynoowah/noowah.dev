// Paper dither tiles for the body::after layer in app/styles/globals.css.
//
// Provenance: generated, not drawn. The field (seeded value noise thresholded
// by an 8×8 Bayer matrix) lives in lib/dither-field.mjs, shared with the
// cursor overlay. Every printed cell becomes a 5px × in a 6px cell: 96×96
// cells, a 576px tile drawn 1 texel = 1 CSS px with image-rendering:
// pixelated. Both edges stitch.
//
// Output: indexed 1-bit PNGs, index 0 fully transparent, index 1 the mark
// colour. Light prints ink marks, dark prints paper-light marks.
//
// Regenerate: pnpm dither (deterministic, byte-identical on re-run).

import { writeFileSync } from 'node:fs';
import { deflateSync } from 'node:zlib';
import {
  CELL,
  CELLS,
  INK,
  MARK,
  createBaseField,
  threshold,
} from '../lib/dither-field.mjs';

const SIZE = CELL * CELLS;
const TILES = [
  { file: 'public/dither-light.png', rgb: INK.light },
  { file: 'public/dither-dark.png', rgb: INK.dark },
];

// Packed 1-bit rows, each prefixed with PNG filter byte 0.
const rowBytes = SIZE / 8;
const raw = Buffer.alloc((rowBytes + 1) * SIZE);
const field = createBaseField();
for (let cy = 0; cy < CELLS; cy++) {
  for (let cx = 0; cx < CELLS; cx++) {
    if (field[cy * CELLS + cx] <= threshold(cx, cy)) continue;
    MARK.forEach((row, my) =>
      row.forEach((on, mx) => {
        if (!on) return;
        const x = cx * CELL + mx;
        const y = cy * CELL + my;
        raw[y * (rowBytes + 1) + 1 + (x >> 3)] |= 0x80 >> (x & 7);
      })
    );
  }
}
const idat = deflateSync(raw, { level: 9 });

const CRC_TABLE = Array.from({ length: 256 }, (_, n) => {
  let c = n;
  for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
  return c >>> 0;
});

function crc32(buf) {
  let c = 0xffffffff;
  for (const byte of buf) c = CRC_TABLE[(c ^ byte) & 0xff] ^ (c >>> 8);
  return (c ^ 0xffffffff) >>> 0;
}

function chunk(type, data) {
  const body = Buffer.concat([Buffer.from(type, 'ascii'), data]);
  const out = Buffer.alloc(body.length + 8);
  out.writeUInt32BE(data.length, 0);
  body.copy(out, 4);
  out.writeUInt32BE(crc32(body), body.length + 4);
  return out;
}

const ihdr = Buffer.alloc(13);
ihdr.writeUInt32BE(SIZE, 0);
ihdr.writeUInt32BE(SIZE, 4);
ihdr[8] = 1; // bit depth
ihdr[9] = 3; // indexed colour

for (const { file, rgb } of TILES) {
  const png = Buffer.concat([
    Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]),
    chunk('IHDR', ihdr),
    chunk('PLTE', Buffer.from([0, 0, 0, ...rgb])),
    chunk('tRNS', Buffer.from([0, 255])),
    chunk('IDAT', idat),
    chunk('IEND', Buffer.alloc(0)),
  ]);
  writeFileSync(file, png);
  console.log(`${file}  ${png.length} B`);
}
