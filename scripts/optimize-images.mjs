import fs from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const root = path.resolve("usb_kuta");
const outRoot = path.join(root, "optimized");

const files = await fs.readdir(root);

const sourcePaths = files
  .filter((name) => /\.(jpe?g|png)$/i.test(name))
  .sort();

await fs.rm(outRoot, { recursive: true, force: true });
await fs.mkdir(outRoot, { recursive: true });

const report = [];

for (const name of sourcePaths) {
  const input = path.join(root, name);
  const metadata = await sharp(input).metadata();

  const maxWidth = metadata.width ?? 0;
  if (!maxWidth) continue;

  const isLogo =
    name === "file_00000000a30481fa9740898c71c943a7.png";

  const requestedWidths = isLogo
    ? [96, 192, 384]
    : [480, 768, 1200, 1600];

  const widths = requestedWidths.filter(
    (width) => width <= maxWidth
  );

  const base = name.replace(/\.(jpe?g|png)$/i, "");

  for (const width of widths) {
    const target = path.join(
      outRoot,
      `${base}-${width}w.webp`
    );

    const info = await sharp(input)
      .resize({
        width,
        withoutEnlargement: true,
      })
      .webp({
        quality: isLogo ? 82 : 78,
        effort: 5,
      })
      .toFile(target);

    report.push({
      source: name,
      format: "webp",
      width: info.width,
      bytes: info.size,
    });
  }

  for (const width of widths) {
    const target = path.join(
      outRoot,
      `${base}-${width}w.avif`
    );

    const info = await sharp(input)
      .resize({
        width,
        withoutEnlargement: true,
      })
      .avif({
        quality: isLogo ? 55 : 52,
        effort: 6,
      })
      .toFile(target);

    report.push({
      source: name,
      format: "avif",
      width: info.width,
      bytes: info.size,
    });
  }
}

await fs.writeFile(
  path.join(outRoot, "optimization-report.json"),
  JSON.stringify(
    {
      sources: sourcePaths,
      outputs: report,
    },
    null,
    2
  ) + "\n"
);

console.log(
  `Optimized ${sourcePaths.length} source images into ${outRoot}`
);