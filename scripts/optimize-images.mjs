import fs from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const root = path.resolve("usb_kuta");
const outRoot = path.join(root, "optimized");
const widths = [480, 768, 1200, 1600];

const entries = await fs.readdir(root, { withFileTypes: true });
const inputs = entries
  .filter((entry) => entry.isFile() && /\.(jpe?g|png)$/i.test(entry.name))
  .map((entry) => entry.name);

await fs.mkdir(outRoot, { recursive: true });

for (const name of inputs) {
  const input = path.join(root, name);
  const base = name.replace(/\.(jpe?g|png)$/i, "");
  const metadata = await sharp(input).metadata();
  const maxWidth = metadata.width ?? 0;

  for (const width of widths) {
    if (!maxWidth || width > maxWidth) continue;
    await sharp(input)
      .resize({ width, withoutEnlargement: true })
      .webp({ quality: 78, effort: 5 })
      .toFile(path.join(outRoot, `${base}-${width}w.webp`));
  }

  const avifWidth = Math.min(1600, maxWidth || 1600);
  if (avifWidth > 0) {
    await sharp(input)
      .resize({ width: avifWidth, withoutEnlargement: true })
      .avif({ quality: 52, effort: 6 })
      .toFile(path.join(outRoot, `${base}-${avifWidth}w.avif`));
  }
}

console.log(`Optimized ${inputs.length} source images into ${outRoot}`);
