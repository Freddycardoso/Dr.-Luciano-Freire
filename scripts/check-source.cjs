const fs = require('fs');
const path = require('path');
const { decodePNG } = require('./png-utils.cjs');

const imgPath = path.join(__dirname, '../src/assets/dr-luciano-freire.png');
const buf = fs.readFileSync(imgPath);
console.log(`File size: ${buf.length} bytes`);
console.log(`PNG signature: ${buf.slice(0, 8).toString('hex')}`);

const { width, height, raw } = decodePNG(buf);
console.log(`Decoded: ${width}x${height}, raw length: ${raw.length}`);

// Sample center pixels
for (let y = 300; y <= 700; y += 100) {
  const x = Math.floor(width / 2);
  const idx = (y * width + x) * 4;
  console.log(`  (${x}, ${y}): R=${raw[idx]} G=${raw[idx+1]} B=${raw[idx+2]} A=${raw[idx+3]}`);
}

// Count
let nonZero = 0;
for (let i = 0; i < raw.length; i++) {
  if (raw[i] !== 0) { nonZero++; break; }
}
console.log(`Has non-zero data: ${nonZero > 0}`);

// Check first 100 pixels
let allZero = true;
for (let i = 0; i < Math.min(400, raw.length); i++) {
  if (raw[i] !== 0) {
    console.log(`First non-zero byte at index ${i}: value=${raw[i]}`);
    allZero = false;
    break;
  }
}
if (allZero) console.log('First 100 pixels are all zero');

// Check middle of image more carefully
const midY = Math.floor(height / 2);
const midX = Math.floor(width / 2);
console.log('\nMiddle row sample (every 50px):');
for (let x = 0; x < width; x += 50) {
  const idx = (midY * width + x) * 4;
  if (raw[idx] !== 0 || raw[idx+1] !== 0 || raw[idx+2] !== 0 || raw[idx+3] !== 0) {
    console.log(`  x=${x}: R=${raw[idx]} G=${raw[idx+1]} B=${raw[idx+2]} A=${raw[idx+3]}`);
  }
}
