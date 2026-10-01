const fs = require('fs');
const path = require('path');
const { decodePNG, encodePNG } = require('./png-utils.cjs');

const inputPath = path.join(__dirname, '../src/assets/dr-luciano-freire.png');
const { width, height, raw } = decodePNG(fs.readFileSync(inputPath));

const leftBounds = new Float32Array(height);
const rightBounds = new Float32Array(height);

for (let y = 0; y < height; y++) {
  if (y < 19) {
    leftBounds[y] = width;
    rightBounds[y] = -1;
    continue;
  }

  let left = -1;
  for (let x = 1; x < width - 1; x++) {
    const idx = (y * width + x) * 4;
    const r = raw[idx], g = raw[idx+1], b = raw[idx+2];
    const lum = 0.299 * r + 0.587 * g + 0.114 * b;
    let isFg = false;
    if (y < 90) {
      if (x > 120 && x < 250 && lum < 155) isFg = true;
    } else if (y <= 215) {
      if (x > 90 && x < 275 && (lum > 212 || r > g + 16 || lum < 140)) isFg = true;
    } else {
      if (lum > 212 || (r > 208 && g > 208 && b > 218)) isFg = true;
    }
    if (isFg) { left = x; break; }
  }

  let right = -1;
  for (let x = width - 2; x >= 1; x--) {
    const idx = (y * width + x) * 4;
    const r = raw[idx], g = raw[idx+1], b = raw[idx+2];
    const lum = 0.299 * r + 0.587 * g + 0.114 * b;
    let isFg = false;
    if (y < 90) {
      if (x > 120 && x < 250 && lum < 155) isFg = true;
    } else if (y <= 215) {
      if (x > 90 && x < 275 && (lum > 212 || r > g + 16 || lum < 140)) isFg = true;
    } else {
      if (lum > 212 || (r > 208 && g > 208 && b > 218)) isFg = true;
    }
    if (isFg) { right = x; break; }
  }

  leftBounds[y] = left;
  rightBounds[y] = right;
}

// 3-point median / moving average smoothing to eliminate any single-pixel tremor
const smoothLeft = new Float32Array(height);
const smoothRight = new Float32Array(height);

for (let y = 0; y < height; y++) {
  if (leftBounds[y] === width || leftBounds[y] === -1) {
    smoothLeft[y] = width;
    smoothRight[y] = -1;
    continue;
  }
  let sumL = 0, sumR = 0, cnt = 0;
  for (let dy = -1; dy <= 1; dy++) {
    const ny = y + dy;
    if (ny >= 0 && ny < height && leftBounds[ny] !== width && leftBounds[ny] !== -1) {
      sumL += leftBounds[ny];
      sumR += rightBounds[ny];
      cnt++;
    }
  }
  smoothLeft[y] = sumL / cnt;
  smoothRight[y] = sumR / cnt;
}

// Antialiased alpha channel
const alpha = new Float32Array(width * height);

for (let y = 0; y < height; y++) {
  const l = smoothLeft[y];
  const r = smoothRight[y];
  if (l >= width || r === -1) continue;

  for (let x = 0; x < width; x++) {
    const idx = y * width + x;
    if (x < l - 1.0 || x > r + 1.0) {
      alpha[idx] = 0;
    } else if (x >= l + 1.0 && x <= r - 1.0) {
      alpha[idx] = 1.0;
    } else if (x < l + 1.0) {
      alpha[idx] = Math.max(0, Math.min(1, (x - (l - 1.0)) / 2.0));
    } else {
      alpha[idx] = Math.max(0, Math.min(1, ((r + 1.0) - x) / 2.0));
    }
  }
}

// Smooth top hair boundary around y = 18..22
for (let x = 0; x < width; x++) {
  for (let y = 18; y <= 22; y++) {
    const idx = y * width + x;
    if (alpha[idx] > 0) {
      alpha[idx] *= Math.max(0, Math.min(1, (y - 18) / 3.0));
    }
  }
}

// Build mirrored RGBA buffer (Dr. Luciano looks to the LEFT, towards the text!)
const mirrored = Buffer.alloc(width * height * 4);

for (let y = 0; y < height; y++) {
  for (let x = 0; x < width; x++) {
    const srcX = width - 1 - x;
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
console.log('Successfully saved dr-luciano-freire-hero.png to assets and public!');
