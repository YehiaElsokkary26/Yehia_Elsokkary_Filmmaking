import sharp from 'sharp';
import { readdir, stat, unlink } from 'fs/promises';
import { join, extname, basename } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const assetsDir = join(__dirname, '..', 'src', 'assets');

const SIZE_THRESHOLD_KB = 200;

async function optimizeImages() {
  const files = await readdir(assetsDir);
  const jpgFiles = files.filter(f => /\.(jpg|jpeg)$/i.test(f));

  let totalOriginalKB = 0;
  let totalNewKB = 0;
  let converted = 0;
  let skipped = 0;

  for (const file of jpgFiles) {
    const srcPath = join(assetsDir, file);
    const info = await stat(srcPath);
    const sizeKB = info.size / 1024;

    if (sizeKB < SIZE_THRESHOLD_KB) {
      skipped++;
      continue;
    }

    const nameWithoutExt = basename(file, extname(file));
    const destPath = join(assetsDir, `${nameWithoutExt}.webp`);

    await sharp(srcPath)
      .webp({ quality: 82, effort: 4 })
      .toFile(destPath);

    const newInfo = await stat(destPath);
    const newSizeKB = newInfo.size / 1024;

    totalOriginalKB += sizeKB;
    totalNewKB += newSizeKB;
    converted++;

    const saving = ((1 - newSizeKB / sizeKB) * 100).toFixed(1);
    console.log(`✓ ${file} → ${nameWithoutExt}.webp  ${Math.round(sizeKB)}KB → ${Math.round(newSizeKB)}KB  (${saving}% saved)`);
  }

  console.log(`\nDone. ${converted} converted, ${skipped} skipped (< ${SIZE_THRESHOLD_KB}KB).`);
  if (converted > 0) {
    const totalSaving = ((1 - totalNewKB / totalOriginalKB) * 100).toFixed(1);
    console.log(`Total: ${Math.round(totalOriginalKB)}KB → ${Math.round(totalNewKB)}KB  (${totalSaving}% saved, ${Math.round((totalOriginalKB - totalNewKB) / 1024)}MB freed)`);
    console.log('\nNext: update portfolioData.ts imports from .jpg to .webp, then delete the original .jpg files.');
  }
}

optimizeImages().catch(console.error);
