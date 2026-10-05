import fs from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const root = path.resolve("usb_kuta");
const outRoot = path.join(root, "optimized");
const html = await fs.readFile("index.html", "utf8");

const sourcePaths = [...html.matchAll(/usb_kuta\/([^"'?#]+\.(?:jpe?g|png))/gi)]
  .map((match) => match[1])
  .filter((value, index, array) => array.indexOf(value) === index);

await fs.mkdir(outRoot, { recursive: true });

const report = [];

for (const name of sourcePaths) {
  const input = path.join(root, name);
  const metadata = await sharp(input).metadata();
  const maxWidth = metadata.width ?? 0;
  const isLogo = /file_00000000a30481fa9740898c71c943a7/i.test(name);
  const widths = isLogo ? [96, 192, 384] : [480, 768, 1200, 1600];
  const base = name.replace(/\.(jpe?g|png)$/i, "");

  for (const width of widths) {
    if (!maxWidth || width > maxWidth) continue;
    const target = path.join(outRoot, `${base}-${width}w.webp`);
    const info = await sharp(input)
      .resize({ width, withoutEnlargement: true })
      .webp({ quality: isLogo ? 82 : 78, effort: 5 })
      .toFile(target);
    report.push({ source: name, format: "webp", width: info.width, bytes: info.size });
  }

  const avifWidth = Math.min(isLogo ? 384 : 1600, maxWidth || (isLogo ? 384 : 1600));
  if (avifWidth > 0) {
    const target = path.join(outRoot, `${base}-${avifWidth}w.avif`);
    const info = await sharp(input)
      .resize({ width: avifWidth, withoutEnlargement: true })
      .avif({ quality: isLogo ? 55 : 52, effort: 6 })
      .toFile(target);
    report.push({ source: name, format: "avif", width: info.width, bytes: info.size });
  }
}

await fs.writeFile(
  path.join(outRoot, "optimization-report.json"),
  JSON.stringify({ sources: sourcePaths, outputs: report }, null, 2) + "\n"
);

console.log(`Optimized ${sourcePaths.length} referenced images into ${outRoot}`);
