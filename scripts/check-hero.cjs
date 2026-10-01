/**
 * Diagnostic: Check the hero image pixel data
 */
const fs = require('fs');
const path = require('path');
const { decodePNG } = require('./png-utils.cjs');

const imgPath = path.join(__dirname, '../src/assets/dr-luciano-freire-hero.png');
const { width, height, raw } = decodePNG(fs.readFileSync(imgPath));

console.log(`Image: ${width}x${height}`);

// Sample some pixels
const samples = [
  [width/2, height/4],      // top center (should be hair/head)
  [width/2, height/2],      // center (should be torso)
  [10, 10],                 // top-left corner (should be transparent)
  [width-10, 10],           // top-right corner
  [width/2, height*0.1],    // head area
];

for (const [x, y] of samples) {
  const ix = Math.floor(x);
  const iy = Math.floor(y);
  const idx = (iy * width + ix) * 4;
  console.log(`  (${ix}, ${iy}): R=${raw[idx]} G=${raw[idx+1]} B=${raw[idx+2]} A=${raw[idx+3]}`);
}

// Count non-transparent pixels
let opaque = 0, semiTransparent = 0, transparent = 0;
for (let i = 0; i < width * height; i++) {
  const a = raw[i * 4 + 3];
  if (a === 255) opaque++;
  else if (a > 0) semiTransparent++;
  else transparent++;
}
console.log(`Opaque: ${opaque}, Semi: ${semiTransparent}, Transparent: ${transparent}`);
console.log(`Total: ${width * height}`);
