const sharp = require('sharp');
const path = require('path');

const inputPath = path.join(__dirname, '../src/assets/dr-luciano-freire.png');
const outAsset = path.join(__dirname, '../src/assets/dr-luciano-freire-hero.png');

async function main() {
  const meta = await sharp(inputPath).metadata();
  const { width, height } = meta;
  const raw = await sharp(inputPath).ensureAlpha().raw().toBuffer();
  
  const result = Buffer.alloc(width * height * 4);
  
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const idx = (y * width + x) * 4;
      const r = raw[idx];
      const g = raw[idx + 1];
      const b = raw[idx + 2];
      const a = raw[idx + 3];
      
      const lum = 0.299 * r + 0.587 * g + 0.114 * b;
      
      let newA = a;
      // The background is almost pure black.
      // We must be careful not to make dark hair transparent, but this is a quick cutout.
      if (lum <= 18 && Math.abs(r-g)<5 && Math.abs(g-b)<5) {
        newA = 0; // Pure black/dark grey bg
      } else if (lum <= 30 && Math.abs(r-g)<10 && Math.abs(g-b)<10) {
        newA = Math.round(((lum - 18) / 12) * a);
      }
      
      // Mirror the image horizontally
      const dstX = width - 1 - x;
      const dstIdx = (y * width + dstX) * 4;
      
      result[dstIdx] = r;
      result[dstIdx + 1] = g;
      result[dstIdx + 2] = b;
      result[dstIdx + 3] = newA;
    }
  }
  
  await sharp(result, { raw: { width, height, channels: 4 } })
    .png({ compressionLevel: 9 })
    .toFile(outAsset);
  
  console.log('Saved mirrored dr-luciano-freire-hero.png without background');
}
main().catch(console.error);
