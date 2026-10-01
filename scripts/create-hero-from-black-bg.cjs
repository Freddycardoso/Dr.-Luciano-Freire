/**
 * Create a high-quality mirrored hero cutout from the black-background portrait.
 * Uses 'sharp' for reliable PNG decode/encode (handles all PNG variants).
 * 
 * Strategy: The source has a near-black background. Doctor wears white coat
 * with skin tones. We detect foreground by luminance thresholding and create
 * a mirrored, transparent-background version.
 */
const sharp = require('sharp');
const path = require('path');

const inputPath = path.join(__dirname, '../src/assets/dr-luciano-freire.png');
const outAsset = path.join(__dirname, '../src/assets/dr-luciano-freire-hero.png');
const outPublic = path.join(__dirname, '../public/images/dr-luciano-freire-hero.png');

async function main() {
  // Decode source to raw RGBA pixels
  const meta = await sharp(inputPath).metadata();
  const { width, height } = meta;
  console.log(`Source: ${width}x${height}, format: ${meta.format}, channels: ${meta.channels}`);
  
  const raw = await sharp(inputPath)
    .ensureAlpha()
    .raw()
    .toBuffer();
  
  console.log(`Raw buffer: ${raw.length} bytes (expected ${width * height * 4})`);
  
  // Sample some pixels to verify data is real
  const midY = Math.floor(height / 2);
  const midX = Math.floor(width / 2);
  const midIdx = (midY * width + midX) * 4;
  console.log(`Center pixel: R=${raw[midIdx]} G=${raw[midIdx+1]} B=${raw[midIdx+2]} A=${raw[midIdx+3]}`);
  
  // Corner pixel
  const cIdx = 0;
  console.log(`TopLeft pixel: R=${raw[cIdx]} G=${raw[cIdx+1]} B=${raw[cIdx+2]} A=${raw[cIdx+3]}`);
  
  // ─── Build foreground probability map ─────────────────────────────
  const fgProb = new Float32Array(width * height);

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const idx = (y * width + x) * 4;
      const r = raw[idx], g = raw[idx + 1], b = raw[idx + 2];
      const lum = 0.299 * r + 0.587 * g + 0.114 * b;
      
      let prob = 0;
      
      if (lum < 20) {
        prob = 0;
      } else if (lum < 45) {
        // Transition zone — likely hair shadow or edge
        prob = (lum - 20) / 25.0;
        // Boost center region
        const cx = width / 2;
        const distNorm = Math.abs(x - cx) / cx;
        if (distNorm > 0.65) prob *= 0.3;
      } else if (lum < 70) {
        prob = 0.75;
        const cx = width / 2;
        const distNorm = Math.abs(x - cx) / cx;
        if (distNorm > 0.72) prob *= 0.3;
      } else {
        prob = 1.0;
      }
      
      fgProb[y * width + x] = Math.max(0, Math.min(1, prob));
    }
  }
  
  // ─── Find horizontal boundaries per row ───────────────────────────
  const leftBound = new Float32Array(height);
  const rightBound = new Float32Array(height);

  for (let y = 0; y < height; y++) {
    let left = -1, right = -1;
    for (let x = 0; x < width; x++) {
      if (fgProb[y * width + x] > 0.25) { left = x; break; }
    }
    for (let x = width - 1; x >= 0; x--) {
      if (fgProb[y * width + x] > 0.25) { right = x; break; }
    }
    leftBound[y] = left;
    rightBound[y] = right;
  }
  
  // ─── Smooth boundaries ────────────────────────────────────────────
  const R = 4;
  const sLeft = new Float32Array(height), sRight = new Float32Array(height);
  for (let y = 0; y < height; y++) {
    if (leftBound[y] === -1) { sLeft[y] = -1; sRight[y] = -1; continue; }
    let sl = 0, sr = 0, c = 0;
    for (let dy = -R; dy <= R; dy++) {
      const ny = y + dy;
      if (ny >= 0 && ny < height && leftBound[ny] !== -1) {
        sl += leftBound[ny]; sr += rightBound[ny]; c++;
      }
    }
    sLeft[y] = c > 0 ? sl / c : leftBound[y];
    sRight[y] = c > 0 ? sr / c : rightBound[y];
  }
  
  // ─── Generate alpha with soft edges ───────────────────────────────
  const alpha = new Float32Array(width * height);
  const edgeW = 3.0;
  
  for (let y = 0; y < height; y++) {
    const l = sLeft[y], r = sRight[y];
    if (l === -1 || r === -1) continue;
    
    for (let x = 0; x < width; x++) {
      const p = y * width + x;
      const fg = fgProb[p];
      if (fg <= 0) continue;
      
      let ea = 1.0;
      if (x < l + edgeW) ea = Math.max(0, (x - l + edgeW) / (edgeW * 2));
      if (x > r - edgeW) ea = Math.min(ea, Math.max(0, (r + edgeW - x) / (edgeW * 2)));
      
      alpha[p] = fg * ea;
    }
  }
  
  // ─── Top fade (hair crown) ────────────────────────────────────────
  let firstRow = height;
  for (let y = 0; y < height; y++) {
    if (sLeft[y] !== -1) { firstRow = y; break; }
  }
  const topFade = 6;
  for (let y = firstRow; y < Math.min(firstRow + topFade, height); y++) {
    const t = (y - firstRow) / topFade;
    for (let x = 0; x < width; x++) alpha[y * width + x] *= t;
  }
  
  // ─── Bottom fade ─────────────────────────────────────────────────
  const bottomStart = Math.floor(height * 0.90);
  for (let y = bottomStart; y < height; y++) {
    const t = 1.0 - (y - bottomStart) / (height - bottomStart);
    for (let x = 0; x < width; x++) alpha[y * width + x] *= t;
  }
  
  // ─── Create mirrored RGBA buffer ─────────────────────────────────
  const result = Buffer.alloc(width * height * 4);
  
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const srcX = width - 1 - x; // Mirror
      const srcIdx = (y * width + srcX) * 4;
      const dstIdx = (y * width + x) * 4;
      const a = Math.max(0, Math.min(1, alpha[y * width + srcX]));
      
      result[dstIdx] = raw[srcIdx];
      result[dstIdx + 1] = raw[srcIdx + 1];
      result[dstIdx + 2] = raw[srcIdx + 2];
      result[dstIdx + 3] = Math.round(a * 255);
    }
  }
  
  // ─── Save using sharp ────────────────────────────────────────────
  await sharp(result, { raw: { width, height, channels: 4 } })
    .png({ compressionLevel: 9 })
    .toFile(outAsset);
  
  const fs = require('fs');
  const publicDir = path.dirname(outPublic);
  if (!fs.existsSync(publicDir)) fs.mkdirSync(publicDir, { recursive: true });
  
  await sharp(result, { raw: { width, height, channels: 4 } })
    .png({ compressionLevel: 9 })
    .toFile(outPublic);
  
  console.log(`✅ High-res mirrored hero cutout saved:`);
  console.log(`   Asset: ${outAsset}`);
  console.log(`   Public: ${outPublic}`);
  console.log(`   Dimensions: ${width}x${height}`);
}

main().catch(err => { console.error(err); process.exit(1); });
