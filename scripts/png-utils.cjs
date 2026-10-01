const fs = require('fs');
const path = require('path');
const zlib = require('zlib');

// CRC32 table for PNG writing
const crcTable = [];
for (let n = 0; n < 256; n++) {
  let c = n;
  for (let k = 0; k < 8; k++) {
    if (c & 1) c = 0xedb88320 ^ (c >>> 1);
    else c = c >>> 1;
  }
  crcTable[n] = c >>> 0;
}

function crc32(buf) {
  let c = 0xffffffff;
  for (let i = 0; i < buf.length; i++) {
    c = crcTable[(c ^ buf[i]) & 0xff] ^ (c >>> 8);
  }
  return (c ^ 0xffffffff) >>> 0;
}

function decodePNG(buffer) {
  let offset = 8;
  let width, height, bitDepth, colorType;
  const idatBuffers = [];
  while (offset < buffer.length) {
    const length = buffer.readUInt32BE(offset);
    const type = buffer.toString('ascii', offset + 4, offset + 8);
    const data = buffer.slice(offset + 8, offset + 8 + length);
    if (type === 'IHDR') {
      width = data.readUInt32BE(0);
      height = data.readUInt32BE(4);
      bitDepth = data[8];
      colorType = data[9];
    } else if (type === 'IDAT') {
      idatBuffers.push(data);
    } else if (type === 'IEND') {
      break;
    }
    offset += 12 + length;
  }
  const idat = Buffer.concat(idatBuffers);
  const decompressed = zlib.inflateSync(idat);
  const bpp = colorType === 6 ? 4 : (colorType === 2 ? 3 : 1);
  const stride = width * bpp;
  const raw = Buffer.alloc(width * height * 4);
  let srcOffset = 0;
  const prevRow = Buffer.alloc(stride);
  const currRow = Buffer.alloc(stride);
  for (let y = 0; y < height; y++) {
    const filter = decompressed[srcOffset++];
    for (let x = 0; x < stride; x++) {
      const byte = decompressed[srcOffset++];
      const a = x >= bpp ? currRow[x - bpp] : 0;
      const b = prevRow[x];
      const c = x >= bpp ? prevRow[x - bpp] : 0;
      let val = 0;
      if (filter === 0) val = byte;
      else if (filter === 1) val = (byte + a) & 0xff;
      else if (filter === 2) val = (byte + b) & 0xff;
      else if (filter === 3) val = (byte + Math.floor((a + b) / 2)) & 0xff;
      else if (filter === 4) {
        const p = a + b - c;
        const pa = Math.abs(p - a), pb = Math.abs(p - b), pc = Math.abs(p - c);
        const pr = (pa <= pb && pa <= pc) ? a : (pb <= pc ? b : c);
        val = (byte + pr) & 0xff;
      }
      currRow[x] = val;
    }
    for (let x = 0; x < width; x++) {
      const dstIdx = (y * width + x) * 4;
      if (bpp === 4) {
        raw[dstIdx] = currRow[x * 4];
        raw[dstIdx + 1] = currRow[x * 4 + 1];
        raw[dstIdx + 2] = currRow[x * 4 + 2];
        raw[dstIdx + 3] = currRow[x * 4 + 3];
      } else if (bpp === 3) {
        raw[dstIdx] = currRow[x * 3];
        raw[dstIdx + 1] = currRow[x * 3 + 1];
        raw[dstIdx + 2] = currRow[x * 3 + 2];
        raw[dstIdx + 3] = 255;
      }
    }
    currRow.copy(prevRow);
  }
  return { width, height, raw };
}

function encodePNG(width, height, rgbaBuffer) {
  // Signature
  const signature = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);

  // IHDR
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(width, 0);
  ihdr.writeUInt32BE(height, 4);
  ihdr[8] = 8; // 8 bits per channel
  ihdr[9] = 6; // RGBA
  ihdr[10] = 0; // compression
  ihdr[11] = 0; // filter
  ihdr[12] = 0; // interlace

  function makeChunk(type, data) {
    const len = data.length;
    const buf = Buffer.alloc(12 + len);
    buf.writeUInt32BE(len, 0);
    buf.write(type, 4, 4, 'ascii');
    data.copy(buf, 8);
    const crcVal = crc32(buf.slice(4, 8 + len));
    buf.writeUInt32BE(crcVal, 8 + len);
    return buf;
  }

  const ihdrChunk = makeChunk('IHDR', ihdr);

  // Scanlines with filter byte 0
  const stride = width * 4;
  const rawScanlines = Buffer.alloc(height * (1 + stride));
  for (let y = 0; y < height; y++) {
    const rowOffset = y * (1 + stride);
    rawScanlines[rowOffset] = 0; // Filter: None
    rgbaBuffer.copy(rawScanlines, rowOffset + 1, y * stride, (y + 1) * stride);
  }

  const compressed = zlib.deflateSync(rawScanlines, { level: 9 });
  const idatChunk = makeChunk('IDAT', compressed);
  const iendChunk = makeChunk('IEND', Buffer.alloc(0));

  return Buffer.concat([signature, ihdrChunk, idatChunk, iendChunk]);
}

module.exports = { decodePNG, encodePNG };
