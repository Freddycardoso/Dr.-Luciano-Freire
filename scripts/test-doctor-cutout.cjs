const fs = require('fs');
const path = require('path');
const { decodePNG, encodePNG } = require('./png-utils.cjs');

const inputPath = path.join(__dirname, '../src/assets/dr-luciano-freire.png');
const { width, height, raw } = decodePNG(fs.readFileSync(inputPath));

console.log('Image dimensions:', width, 'x', height);

// Detect background using color and connected spatial region
// 1. Column 0 has a black line artifact [1, 0, 0].
// Let's inspect the background at x=2..15 and x=width-15..width-2
// Background color is a studio gradient:
// y=0: ~[119, 118, 124] (darker at top)
// y=50: ~[184, 180, 194]
// y=200: ~[170, 167, 176]
// y=500: ~[137, 131, 135] (left) / [192, 190, 201] (right)

// Dr. Luciano features:
// - Lab coat: bright white (Luminance > 220, R>215, G>215, B>225)
// - Hair: dark brown/grey (Luminance < 110, warm: R >= G >= B or dark)
// - Skin: warm peach/tan (R > 135, R - G > 20, R - B > 30)
// - Dark shirt collar: collar at neck (y ~ 180..210, center x ~ 180..220)

// Let's create an alpha map: 0 = background, 255 = foreground
const alpha = new Float32Array(width * height).fill(0);
const isBg = new Uint8Array(width * height).fill(0);

// Flood fill from borders to mark background
const queue = [];

// Seed the top edge (y=0, except if hair reaches top)
// Let's check hair at y=0:
for (let x = 0; x < width; x++) {
  // column 0 is artifact
  queue.push(x, 0);
  isBg[x] = 1;
}

// Seed left border (x=0 and x=1)
for (let y = 0; y < height; y++) {
  isBg[y * width + 0] = 1;
  isBg[y * width + 1] = 1;
  queue.push(0, y);
  queue.push(1, y);
  
  // Seed right border (x=width-1)
  isBg[y * width + (width - 1)] = 1;
  queue.push(width - 1, y);
}

// Helper to determine if a pixel (nx, ny) is definitely foreground (person)
function isForegroundPixel(nx, ny) {
  const idx = (ny * width + nx) * 4;
  const r = raw[idx], g = raw[idx + 1], b = raw[idx + 2];
  const lum = 0.299 * r + 0.587 * g + 0.114 * b;
  
  // Lab coat (white, very high lum)
  if (ny > 170) {
    if (lum > 218 && (r > 210 && g > 210 && b > 220)) return true;
    if (r > 220 && g > 220 && b > 220) return true;
  }
  
  // Skin tone (face, neck, ears)
  if (ny >= 50 && ny <= 220) {
    if (r > 130 && r > g + 18 && r > b + 25) return true;
    // Lips/cheeks
    if (r > 120 && g > 70 && b > 65 && r > g && r > b) return true;
  }
  
  // Hair (top of head: y between 15 and 90, x between 130 and 245)
  if (ny >= 15 && ny <= 90 && nx >= 125 && nx <= 250) {
    if (lum < 120) return true;
  }
  
  // Doctor's shirt collar / inner collar (grey/dark button polo underneath lab coat)
  if (ny >= 170 && ny <= 230 && nx >= 170 && nx <= 215) {
    if (lum < 150) return true;
  }
  
  return false;
}

let head = 0;
while (head < queue.length) {
  const cx = queue[head++];
  const cy = queue[head++];
  
  const neighbors = [
    [cx + 1, cy],
    [cx - 1, cy],
    [cx, cy + 1],
    [cx, cy - 1]
  ];
  
  for (const [nx, ny] of neighbors) {
    if (nx < 0 || nx >= width || ny < 0 || ny >= height) continue;
    const nidx = ny * width + nx;
    if (isBg[nidx]) continue;
    
    if (isForegroundPixel(nx, ny)) {
      continue; // Hit foreground, do not cross
    }
    
    isBg[nidx] = 1;
    queue.push(nx, ny);
  }
}

// Any pixel not reached by background flood fill is foreground!
let fgCount = 0;
for (let i = 0; i < width * height; i++) {
  if (!isBg[i]) {
    alpha[i] = 1.0;
    fgCount++;
  }
}

console.log('Foreground pixels found:', fgCount, 'out of', width * height, '(' + ((fgCount / (width * height)) * 100).toFixed(1) + '%)');

// Now let's test creating the masked and mirrored image:
// Mirrored (horizontal flip): Dr. Luciano looks towards the LEFT (towards letters)
const mirroredRgba = Buffer.alloc(width * height * 4);

for (let y = 0; y < height; y++) {
  for (let x = 0; x < width; x++) {
    const srcX = width - 1 - x; // mirror x
    const srcIdx = (y * width + srcX) * 4;
    const dstIdx = (y * width + x) * 4;
    
    const a = alpha[y * width + srcX];
    mirroredRgba[dstIdx] = raw[srcIdx];
    mirroredRgba[dstIdx + 1] = raw[srcIdx + 1];
    mirroredRgba[dstIdx + 2] = raw[srcIdx + 2];
    mirroredRgba[dstIdx + 3] = a > 0 ? 255 : 0;
  }
}

const outPath = path.join(__dirname, '../scratch/test_cutout_mirrored.png');
fs.writeFileSync(outPath, encodePNG(width, height, mirroredRgba));
console.log('Saved test output to:', outPath);
