import fs from 'node:fs/promises';
import path from 'node:path';
import { GifWriter } from 'omggif';

const projectRoot = process.cwd();
const outPath = path.join(projectRoot, 'assets', 'images', 'kirkpinar-countdown.gif');

const W = 160;
const H = 160;
const FRAMES = 24;
const DELAY_CS = 6; // 60ms per frame

// Palette must be power-of-two colors (2..256).
// In omggif, each entry is a 24-bit integer: 0xRRGGBB (NOT RGB triplets).
// We'll use 8 colors (we only actually use the first 4).
const palette = [
  0x000000, // 0 black (background)
  0x06150e, // 1 deep green
  0xd4af37, // 2 gold
  0xf5e6c8, // 3 cream
  0x0b2e1c, // 4 deep green 2
  0x124028, // 5 deep green 3
  0x2a2a2a, // 6 gray
  0xffffff, // 7 white
];

function clamp(v, a, b) {
  return Math.max(a, Math.min(b, v));
}

function drawFrame(t) {
  // Indexed pixels (0..3)
  const px = new Uint8Array(W * H);

  // Background gradient-ish bands
  for (let y = 0; y < H; y++) {
    const band = y < H * 0.6 ? 1 : 4;
    for (let x = 0; x < W; x++) px[y * W + x] = band;
  }

  // Circular pulse ring (thicker for small display)
  const cx = W / 2;
  const cy = H / 2;
  const baseR = 46;
  const pulse = 8 * Math.sin((t / FRAMES) * Math.PI * 2);
  const r1 = baseR + pulse;
  const r2 = r1 + 10;

  for (let y = 0; y < H; y++) {
    for (let x = 0; x < W; x++) {
      const dx = x + 0.5 - cx;
      const dy = y + 0.5 - cy;
      const d = Math.sqrt(dx * dx + dy * dy);
      if (d >= r1 && d <= r2) px[y * W + x] = 2; // gold ring
    }
  }

  // Moving spark dot
  const ang = (t / FRAMES) * Math.PI * 2;
  const sx = Math.round(cx + (baseR + 10) * Math.cos(ang));
  const sy = Math.round(cy + (baseR + 10) * Math.sin(ang));
  for (let yy = -2; yy <= 2; yy++) {
    for (let xx = -2; xx <= 2; xx++) {
      const x = clamp(sx + xx, 0, W - 1);
      const y = clamp(sy + yy, 0, H - 1);
      px[y * W + x] = 3; // cream
    }
  }

  // Hourglass icon (very simple pixel art)
  const hgTop = 46;
  const hgBottom = 118;
  const hgLeft = 58;
  const hgRight = 102;
  const mid = Math.round((hgTop + hgBottom) / 2);
  const sandLevel = Math.round(((Math.sin((t / FRAMES) * Math.PI * 2) + 1) / 2) * 12);

  // Frame
  for (let x = hgLeft; x <= hgRight; x++) {
    px[hgTop * W + x] = 2;
    px[hgBottom * W + x] = 2;
  }
  for (let y = hgTop; y <= hgBottom; y++) {
    px[y * W + hgLeft] = 2;
    px[y * W + hgRight] = 2;
  }

  // X shape
  for (let i = 0; i < 26; i++) {
    const x1 = hgLeft + 4 + i;
    const y1 = hgTop + 10 + i;
    const x2 = hgRight - 4 - i;
    const y2 = hgTop + 10 + i;
    if (y1 < mid) {
      px[y1 * W + x1] = 3;
      px[y2 * W + x2] = 3;
    } else if (y1 > mid) {
      px[y1 * W + x1] = 3;
      px[y2 * W + x2] = 3;
    }
  }

  // Sand (top decreasing, bottom increasing)
  for (let y = hgTop + 16; y < mid - sandLevel; y++) {
    const pad = Math.floor((y - (hgTop + 16)) / 2);
    for (let x = hgLeft + 10 + pad; x <= hgRight - 10 - pad; x++) px[y * W + x] = 2;
  }
  for (let y = mid + sandLevel; y < hgBottom - 16; y++) {
    const pad = Math.floor(((hgBottom - 16) - y) / 2);
    for (let x = hgLeft + 10 + pad; x <= hgRight - 10 - pad; x++) px[y * W + x] = 2;
  }

  return px;
}

const buf = Buffer.alloc(1024 * 1024);
const gif = new GifWriter(buf, W, H, { loop: 0, palette });

let offset = 0;
for (let t = 0; t < FRAMES; t++) {
  const frame = drawFrame(t);
  offset = gif.addFrame(0, 0, W, H, frame, { delay: DELAY_CS });
}

await fs.mkdir(path.dirname(outPath), { recursive: true });
await fs.writeFile(outPath, buf.subarray(0, offset));
console.log('Wrote', path.relative(projectRoot, outPath));

