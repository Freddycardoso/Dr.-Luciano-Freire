const fs = require('fs');
const path = require('path');
const { decodePNG, encodePNG } = require('./png-utils.cjs');

const inputPath = path.join(__dirname, '../src/assets/dr-luciano-freire.png');
const { width, height, raw } = decodePNG(fs.readFileSync(inputPath));

// In the original image (before mirror):
// x=0 is a black border line [1, 0, 0]
// Top edge y=0 is background, hair starts around y=18..20
// Dr's face: x ~ 130..245, y ~ 20..220
// Dr's body: x ~ 15..360, y ~ 200..511

// Let's create an exact, high quality segmentation:
// We can compute the background reference color at every row y:
// On the left side (x=2..15), average background color bgL(y)
// On the right side (x=width-15..width-2), average background color bgR(y)
// For each y, interpolated background across x: bg(x, y) = bgL(y) * (1 - x/width) + bgR(y) * (x/width)

const bgL = [];
const bgR = [];

for (let y = 0; y < height; y++) {
  let rL = 0, gL = 0, bL = 0, countL = 0;
  for (let x = 2; x <= 12; x++) {
    const idx = (y * width + x) * 4;
    // ensure it's background (not coat)
    const r = raw[idx], g = raw[idx+1], b = raw[idx+2];
    if (r < 215) {
      rL += r; gL += g; bL += b; countL++;
    }
  }
  if (countL > 0) bgL[y] = [rL / countL, gL / countL, bL / countL];
  else bgL[y] = bgL[y - 1] || [170, 165, 175];

  let rR = 0, gR = 0, bR = 0, countR = 0;
  for (let x = width - 12; x <= width - 2; x++) {
    const idx = (y * width + x) * 4;
    const r = raw[idx], g = raw[idx+1], b = raw[idx+2];
    if (r < 215) {
      rR += r; gR += g; bR += b; countR++;
    }
  }
  if (countR > 0) bgR[y] = [rR / countR, gR / countR, bR / countR];
  else bgR[y] = bgR[y - 1] || [195, 192, 205];
}

// Binary / confidence mask
const mask = new Float32Array(width * height);

for (let y = 0; y < height; y++) {
  const bgL_y = bgL[y];
  const bgR_y = bgR[y];

  for (let x = 0; x < width; x++) {
    const idx = (y * width + x) * 4;
    const r = raw[idx], g = raw[idx+1], b = raw[idx+2];
    
    // Column 0 is artifact
    if (x === 0) {
      mask[y * width + x] = 0;
      continue;
    }

    const t = x / (width - 1);
    const expBgR = bgL_y[0] * (1 - t) + bgR_y[0] * t;
    const expBgG = bgL_y[1] * (1 - t) + bgR_y[1] * t;
    const expBgB = bgL_y[2] * (1 - t) + bgR_y[2] * t;

    // Euclidean distance in RGB to expected studio background
    const dist = Math.hypot(r - expBgR, g - expBgG, b - expBgB);

    // Also color saturation difference: studio background has very specific saturation and hue:
    // r/g ~ 1.02, b/g ~ 1.05.
    const lum = 0.299 * r + 0.587 * g + 0.114 * b;
    const expLum = 0.299 * expBgR + 0.587 * expBgG + 0.114 * expBgB;

    let isFg = 0;

    // Head / hair region (y < 90)
    if (y < 90) {
      // Hair is darker than background (lum < expLum - 25)
      // and centered around x: 125..255
      if (x >= 125 && x <= 255) {
        if (lum < expLum - 22 || r > expBgR + 25) {
          isFg = 1;
        }
      }
    } 
    // Face / neck region (90 <= y <= 210)
    else if (y <= 210) {
      if (x >= 100 && x <= 275) {
        // Skin: warm tone or darker shadows or brighter forehead/cheeks
        if (dist > 25 && (r > g + 15 || dist > 35 || lum < expLum - 25)) {
          isFg = 1;
        }
      }
    }
    // Body / Coat region (y > 210)
    else {
      // Lab coat is significantly brighter than background (lum > expLum + 20, or r > 215 & g > 215 & b > 225)
      if (lum > expLum + 18 || (r > 215 && g > 215 && b > 225)) {
        isFg = 1;
      }
      // Shadow folds in the coat or darker parts
      else if (dist > 30) {
        isFg = 1;
      }
    }

    mask[y * width + x] = isFg;
  }
}

// Spatial connectivity / morphological cleanup:
// Background is connected to the outside boundary.
// Foreground is the largest connected component.
const isBgConnected = new Uint8Array(width * height);
const queue = [];

for (let x = 0; x < width; x++) {
  queue.push(x, 0);
  isBgConnected[x] = 1;
}
for (let y = 0; y < height; y++) {
  queue.push(0, y);
  queue.push(1, y);
  queue.push(width - 1, y);
  isBgConnected[y * width] = 1;
  isBgConnected[y * width + 1] = 1;
  isBgConnected[y * width + (width - 1)] = 1;
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
    if (isBgConnected[nidx]) continue;
    
    // If mask says it's foreground, don't spread bg through it
    if (mask[nidx] === 1) continue;

    isBgConnected[nidx] = 1;
    queue.push(nx, ny);
  }
}

// Refined alpha map: 0 if background connected, 1 if inside foreground
const smoothAlpha = new Float32Array(width * height);
for (let i = 0; i < width * height; i++) {
  smoothAlpha[i] = isBgConnected[i] ? 0 : 1;
}

// Fill any tiny holes inside doctor's coat (morphological close)
for (let y = 1; y < height - 1; y++) {
  for (let x = 1; x < width - 1; x++) {
    const idx = y * width + x;
    if (smoothAlpha[idx] === 0) {
      let fgNeighbors = 0;
      if (smoothAlpha[idx - 1] === 1) fgNeighbors++;
      if (smoothAlpha[idx + 1] === 1) fgNeighbors++;
      if (smoothAlpha[idx - width] === 1) fgNeighbors++;
      if (smoothAlpha[idx + width] === 1) fgNeighbors++;
      if (fgNeighbors >= 3) {
        smoothAlpha[idx] = 1;
      }
    }
  }
}

// Apply 1-pixel soft antialiased gaussian blur on alpha channel
const finalAlpha = new Float32Array(width * height);
const kernel = [
  0.05, 0.1, 0.05,
  0.1,  0.4, 0.1,
  0.05, 0.1, 0.05
];

for (let y = 1; y < height - 1; y++) {
  for (let x = 1; x < width - 1; x++) {
    let sum = 0;
    let k = 0;
    for (let dy = -1; dy <= 1; dy++) {
      for (let dx = -1; dx <= 1; dx++) {
        sum += smoothAlpha[(y + dy) * width + (x + dx)] * kernel[k++];
      }
    }
    finalAlpha[y * width + x] = sum;
  }
}

// Create mirrored RGBA buffer
const mirrored = Buffer.alloc(width * height * 4);

for (let y = 0; y < height; y++) {
  for (let x = 0; x < width; x++) {
    const srcX = width - 1 - x;
    const srcIdx = (y * width + srcX) * 4;
    const dstIdx = (y * width + x) * 4;
    
    const a = finalAlpha[y * width + srcX];
    
    // Copy RGB
    mirrored[dstIdx] = raw[srcIdx];
    mirrored[dstIdx + 1] = raw[srcIdx + 1];
    mirrored[dstIdx + 2] = raw[srcIdx + 2];
    mirrored[dstIdx + 3] = Math.round(Math.min(255, Math.max(0, a * 255)));
  }
}

// Save outputs
const outAsset = path.join(__dirname, '../src/assets/dr-luciano-freire-hero.png');
const outPublic = path.join(__dirname, '../public/images/dr-luciano-freire-hero.png');

const pngBuf = encodePNG(width, height, mirrored);
fs.writeFileSync(outAsset, pngBuf);
fs.writeFileSync(outPublic, pngBuf);

console.log('Saved refined mirrored cutout to:', outAsset, 'and', outPublic);
