const fs = require('fs');
const path = require('path');
const { decodePNG, encodePNG } = require('./png-utils.cjs');

const inputPath = path.join(__dirname, '../src/assets/dr-luciano-freire.png');
const { width, height, raw } = decodePNG(fs.readFileSync(inputPath));

// For each y from 0 to height-1, let's find the exact left boundary and right boundary.
const leftBounds = new Float32Array(height);
const rightBounds = new Float32Array(height);

for (let y = 0; y < height; y++) {
  if (y < 19) {
    // Above head: entirely background
    leftBounds[y] = width;
    rightBounds[y] = -1;
    continue;
  }

  // Find left edge: scan from x=1 inwards
  let left = -1;
  for (let x = 1; x < width - 1; x++) {
    const idx = (y * width + x) * 4;
    const r = raw[idx], g = raw[idx+1], b = raw[idx+2];
    const lum = 0.299 * r + 0.587 * g + 0.114 * b;

    let isFg = false;
    if (y < 90) { // hair
      if (x > 120 && x < 250 && lum < 135) isFg = true;
    } else if (y <= 215) { // face / neck / collar
      if (x > 90 && x < 275) {
        if (r > g + 16 || lum < 140 || (r > 215 && g > 215 && b > 225)) isFg = true;
      }
    } else { // coat
      if (r > 205 && g > 205 && b > 215) isFg = true;
      else if (lum > 210) isFg = true;
      else if (x > 30 && x < 315 && (r > 170 || lum > 175)) isFg = true;
    }

    if (isFg) {
      left = x;
      break;
    }
  }

  // Find right edge: scan from x=width-2 inwards
  let right = -1;
  for (let x = width - 2; x >= 1; x--) {
    const idx = (y * width + x) * 4;
    const r = raw[idx], g = raw[idx+1], b = raw[idx+2];
    const lum = 0.299 * r + 0.587 * g + 0.114 * b;

    let isFg = false;
    if (y < 90) { // hair
      if (x > 120 && x < 250 && lum < 135) isFg = true;
    } else if (y <= 215) { // face / neck
      if (x > 90 && x < 275) {
        if (r > g + 16 || lum < 140 || (r > 215 && g > 215 && b > 225)) isFg = true;
      }
    } else { // coat
      if (r > 205 && g > 205 && b > 215) isFg = true;
      else if (lum > 210) isFg = true;
      else if (x > 30 && x < 315 && (r > 170 || lum > 175)) isFg = true;
    }

    if (isFg) {
      right = x;
      break;
    }
  }

  leftBounds[y] = left;
  rightBounds[y] = right;
}

// Smooth the left and right boundary curves to avoid 1-pixel jagged spikes
const smoothLeft = new Float32Array(height);
const smoothRight = new Float32Array(height);

for (let y = 0; y < height; y++) {
  if (leftBounds[y] === -1 || leftBounds[y] === width) {
    smoothLeft[y] = width;
    smoothRight[y] = -1;
    continue;
  }
  let sumL = 0, sumR = 0, count = 0;
  for (let dy = -2; dy <= 2; dy++) {
    const ny = y + dy;
    if (ny >= 0 && ny < height && leftBounds[ny] !== -1 && leftBounds[ny] !== width) {
      sumL += leftBounds[ny];
      sumR += rightBounds[ny];
      count++;
    }
  }
  smoothLeft[y] = count > 0 ? sumL / count : leftBounds[y];
  smoothRight[y] = count > 0 ? sumR / count : rightBounds[y];
}

// Generate Alpha Mask
const alpha = new Float32Array(width * height);

for (let y = 0; y < height; y++) {
  const l = smoothLeft[y];
  const r = smoothRight[y];

  if (l >= width || r === -1) {
    continue; // row is background
  }

  for (let x = 0; x < width; x++) {
    const idx = y * width + x;
    if (x < l - 1.5 || x > r + 1.5) {
      alpha[idx] = 0;
    } else if (x >= l + 1.5 && x <= r - 1.5) {
      alpha[idx] = 1.0;
    } else if (x < l + 1.5) {
      // Soft transition on left edge
      const t = (x - (l - 1.5)) / 3.0;
      alpha[idx] = Math.max(0, Math.min(1, t));
    } else {
      // Soft transition on right edge
      const t = ((r + 1.5) - x) / 3.0;
      alpha[idx] = Math.max(0, Math.min(1, t));
    }
  }
}

// Also check top edge for hair transition around y=18..21
for (let x = 0; x < width; x++) {
  for (let y = 17; y <= 21; y++) {
    const idx = y * width + x;
    if (alpha[idx] > 0) {
      const topT = Math.max(0, Math.min(1, (y - 17.5) / 3.0));
      alpha[idx] *= topT;
    }
  }
}

// Mirrored RGBA
const mirrored = Buffer.alloc(width * height * 4);

for (let y = 0; y < height; y++) {
  for (let x = 0; x < width; x++) {
    const srcX = width - 1 - x; // Mirrored so Dr. looks LEFT
    const srcIdx = (y * width + srcX) * 4;
    const dstIdx = (y * width + x) * 4;

    const a = alpha[y * width + srcX];
    mirrored[dstIdx] = raw[srcIdx];
    mirrored[dstIdx + 1] = raw[srcIdx + 1];
    mirrored[dstIdx + 2] = raw[srcIdx + 2];
    mirrored[dstIdx + 3] = Math.round(a * 255);
  }
}

const outAsset = path.join(__dirname, '../src/assets/dr-luciano-freire-hero.png');
const outPublic = path.join(__dirname, '../public/images/dr-luciano-freire-hero.png');

const png = encodePNG(width, height, mirrored);
fs.writeFileSync(outAsset, png);
fs.writeFileSync(outPublic, png);
console.log('Saved studio-grade mirrored cutout to:', outAsset);
