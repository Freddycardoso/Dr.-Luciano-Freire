const sharp = require('sharp');
const path = require('path');

const inputPath = path.join(__dirname, '../src/assets/logo-clinica.png');
const outAsset = path.join(__dirname, '../src/assets/logo-clinica-nobg.png');

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
      if (lum < 15) {
        newA = 0;
      } else if (lum < 50) {
        newA = Math.round(((lum - 15) / 35) * a);
      }
      
      // Pre-multiply alpha? Actually, just leaving it as is will make the edge pixels a bit dark.
      // Let's force edge pixels to be lighter so they don't look dirty against a non-black background.
      let newR = r, newG = g, newB = b;
      if (newA > 0 && newA < 255) {
          // Boost lightness of edge pixels to avoid black fringes
          newR = Math.min(255, r + 50);
          newG = Math.min(255, g + 50);
          newB = Math.min(255, b + 50);
      }
      
      result[idx] = newR;
      result[idx + 1] = newG;
      result[idx + 2] = newB;
      result[idx + 3] = newA;
    }
  }
  
  await sharp(result, { raw: { width, height, channels: 4 } })
    .png({ compressionLevel: 9 })
    .toFile(outAsset);
  
  console.log('Saved logo-clinica-nobg.png');
}
main().catch(console.error);
