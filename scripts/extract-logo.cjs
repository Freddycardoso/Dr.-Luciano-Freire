const fs = require('fs');
const path = require('path');
const { decodePNG, encodePNG } = require('./png-utils.cjs');

const logoPath = 'C:\\Users\\freed\\.gemini\\antigravity-ide\\brain\\9e3588a4-889e-46ce-9ab4-f7347194a6f2\\.user_uploaded\\media_1790815901737.png';
const { width, height, raw } = decodePNG(fs.readFileSync(logoPath));

// In this image:
// Logo pixels are either:
// 1. Green (ring and stem): G > 140, G > R + 25, G > B + 40
// 2. Deep Blue: B > 120, B > R + 25, B > G + 15
// 3. Light Blue: B > 180, B > R + 15, B > G + 5, or B > 160 && B - R > 15
// 4. Boundary anti-aliased pixels
// The background is grey/whiteish with a faint diagonal line:
// R ~ 180-250, G ~ 180-250, B ~ 180-250, with |R-G| < 20 and |G-B| < 20

const outRgba = Buffer.alloc(width * height * 4);

for (let y = 0; y < height; y++) {
  for (let x = 0; x < width; x++) {
    const idx = (y * width + x) * 4;
    const r = raw[idx], g = raw[idx+1], b = raw[idx+2];

    const isGreen = (g > 140 && g > r + 20 && g > b + 45) || (g > 170 && r < 200 && b < 100);
    const isBlue = (b > 110 && b > r + 15) || (b > 160 && b > r + 8 && b > g - 10);
    
    // Check if background:
    // Background is near-grey (|r-g| < 12 && |g-b| < 15) and not green or blue
    let alpha = 0;
    if (isGreen || isBlue) {
      alpha = 255;
    } else {
      // Check distance to grey
      const isGreyish = Math.abs(r - g) < 15 && Math.abs(g - b) < 18 && Math.abs(r - b) < 22;
      const isDiagonalYellowLine = (r > 190 && g > 200 && b < 180 && Math.abs(r - g) < 25 && g > b + 25);
      
      if (isGreyish || isDiagonalYellowLine) {
        alpha = 0;
      } else if (b > r + 8) {
        alpha = Math.min(255, Math.round(((b - r) / 20) * 255));
      } else if (g > r + 10 && g > b + 20) {
        alpha = Math.min(255, Math.round(((g - r) / 20) * 255));
      }
    }

    outRgba[idx] = r;
    outRgba[idx+1] = g;
    outRgba[idx+2] = b;
    outRgba[idx+3] = alpha;
  }
}

// Save transparent PNG
const outAsset = path.join(__dirname, '../src/assets/logo-dr-luciano.png');
const outPublic = path.join(__dirname, '../public/images/logo-dr-luciano.png');
const png = encodePNG(width, height, outRgba);
fs.writeFileSync(outAsset, png);
fs.writeFileSync(outPublic, png);
console.log('Saved transparent logo PNG to:', outAsset);
