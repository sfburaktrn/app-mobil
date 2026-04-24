import fs from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const projectRoot = process.cwd();
const inDir = path.join(projectRoot, 'assets', 'images', 'pehlivanlar');
const outDir = path.join(projectRoot, 'assets', 'images', 'pehlivanlar-normalized');

// Recommended portrait ratio for cards: 4:5
const OUT_W = 900;
const OUT_H = 1125;

await fs.mkdir(outDir, { recursive: true });

const files = await fs.readdir(inDir);
const images = files.filter((f) => /\.(png|jpe?g|webp)$/i.test(f));

if (images.length === 0) {
  console.log('No images found in:', inDir);
  process.exit(0);
}

let ok = 0;
for (const file of images) {
  const src = path.join(inDir, file);
  const dest = path.join(outDir, file.replace(/\.(png|jpe?g)$/i, '.webp'));
  try {
    await sharp(src)
      .rotate()
      .resize(OUT_W, OUT_H, { fit: 'cover', position: 'centre' })
      .webp({ quality: 82 })
      .toFile(dest);
    ok += 1;
  } catch (e) {
    console.warn('Failed:', file, e?.message ?? e);
  }
}

console.log(`Normalized ${ok}/${images.length} images -> ${path.relative(projectRoot, outDir)}`);

