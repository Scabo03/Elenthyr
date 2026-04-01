'use strict';

// ============================================================
// GENERA-ICONE.JS — Elenthyr
// Genera le icone PWA richieste da manifest.json.
// Eseguire con: node icons/genera-icone.js
//
// Output:
//   icons/icon-192.png
//   icons/icon-512.png
//   icons/icon-maskable-192.png
//   icons/icon-maskable-512.png
//
// Design: sfondo scuro #0f0e17, cornice e lettera "E" in oro #c9a84c.
// Nessuna dipendenza esterna — usa solo il modulo zlib nativo.
// ============================================================

const zlib = require('zlib');
const fs   = require('fs');
const path = require('path');

// Colori del tema
const SFONDO = [15,  14, 23];   // #0f0e17
const ORO    = [201, 168, 76];  // #c9a84c
const SCURO  = [10,   9, 16];   // per l'ombra interna

// ============================================================
// GENERATORE PNG MINIMAL (RGB, 8 bit, no alpha, nessuna lib)
// ============================================================

const CRC_TABLE = (() => {
  const t = [];
  for (let n = 0; n < 256; n++) {
    let c = n;
    for (let k = 0; k < 8; k++) {
      c = (c & 1) ? (0xEDB88320 ^ (c >>> 1)) : (c >>> 1);
    }
    t.push(c >>> 0);
  }
  return t;
})();

function crc32(buf) {
  let crc = 0xFFFFFFFF;
  for (let i = 0; i < buf.length; i++) {
    crc = CRC_TABLE[(crc ^ buf[i]) & 0xFF] ^ (crc >>> 8);
  }
  return (crc ^ 0xFFFFFFFF) >>> 0;
}

function uint32be(n) {
  const b = Buffer.alloc(4);
  b.writeUInt32BE(n, 0);
  return b;
}

function chunk(tipo, dati) {
  const tipoBytes = Buffer.from(tipo, 'ascii');
  const crcInput  = Buffer.concat([tipoBytes, dati]);
  return Buffer.concat([uint32be(dati.length), tipoBytes, dati, uint32be(crc32(crcInput))]);
}

function creaPNG(larghezza, altezza, pixels) {
  // pixels: Uint8Array di larghezza*altezza*3 byte (RGB)
  const firma = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);

  const ihdrDati = Buffer.concat([
    uint32be(larghezza),
    uint32be(altezza),
    Buffer.from([8, 2, 0, 0, 0]) // 8 bit, RGB, nessun filtro/compressione/interlace
  ]);

  // Aggiungi il byte di filtro (tipo 0 = None) all'inizio di ogni scanline
  const raw = Buffer.alloc(altezza * (1 + larghezza * 3));
  for (let y = 0; y < altezza; y++) {
    raw[y * (1 + larghezza * 3)] = 0; // filtro None
    for (let x = 0; x < larghezza; x++) {
      const srcIdx = (y * larghezza + x) * 3;
      const dstIdx = y * (1 + larghezza * 3) + 1 + x * 3;
      raw[dstIdx]     = pixels[srcIdx];
      raw[dstIdx + 1] = pixels[srcIdx + 1];
      raw[dstIdx + 2] = pixels[srcIdx + 2];
    }
  }

  const compresso = zlib.deflateSync(raw, { level: 9 });

  return Buffer.concat([
    firma,
    chunk('IHDR', ihdrDati),
    chunk('IDAT', compresso),
    chunk('IEND', Buffer.alloc(0))
  ]);
}


// ============================================================
// DISEGNO ICONA
// Sfondo scuro, cerchio in oro, lettera "E" scura al centro.
// paddingFraction: rapporto del safe-zone interno (per maskable).
// ============================================================

function disegnaIcona(dim, maskable) {
  const pixels = new Uint8Array(dim * dim * 3);

  // Funzione di riempimento pixel
  function setPixel(x, y, colore) {
    if (x < 0 || x >= dim || y < 0 || y >= dim) return;
    const i = (y * dim + x) * 3;
    pixels[i]     = colore[0];
    pixels[i + 1] = colore[1];
    pixels[i + 2] = colore[2];
  }

  // Funzione di riempimento con anti-aliasing semplice (distanza dal bordo)
  function cerchio(cx, cy, r, coloreEsterno, coloreInterno) {
    const rMin = r - 1.5;
    const rMax = r + 0.5;
    for (let y = 0; y < dim; y++) {
      for (let x = 0; x < dim; x++) {
        const dist = Math.sqrt((x - cx) ** 2 + (y - cy) ** 2);
        if (dist <= rMin) {
          setPixel(x, y, coloreInterno);
        } else if (dist < rMax) {
          const t = (dist - rMin) / (rMax - rMin);
          const c = [
            Math.round(coloreInterno[0] * (1 - t) + coloreEsterno[0] * t),
            Math.round(coloreInterno[1] * (1 - t) + coloreEsterno[1] * t),
            Math.round(coloreInterno[2] * (1 - t) + coloreEsterno[2] * t)
          ];
          setPixel(x, y, c);
        }
      }
    }
  }

  function rettangolo(x1, y1, x2, y2, colore) {
    for (let y = y1; y <= y2; y++) {
      for (let x = x1; x <= x2; x++) {
        setPixel(x, y, colore);
      }
    }
  }

  // 1. Sfondo
  for (let i = 0; i < dim * dim; i++) {
    pixels[i * 3]     = SFONDO[0];
    pixels[i * 3 + 1] = SFONDO[1];
    pixels[i * 3 + 2] = SFONDO[2];
  }

  // 2. Per le icone maskable lo sfondo copre tutto il safe-zone (80%)
  //    Le icone normali hanno il cerchio leggermente più piccolo
  const cx = dim / 2;
  const cy = dim / 2;

  if (maskable) {
    // Sfondo pieno oro, cerchio scuro al centro con "E"
    for (let i = 0; i < dim * dim; i++) {
      pixels[i * 3]     = ORO[0];
      pixels[i * 3 + 1] = ORO[1];
      pixels[i * 3 + 2] = ORO[2];
    }
    const r = dim * 0.38;
    cerchio(cx, cy, r, ORO, SFONDO);
  } else {
    // Sfondo scuro con cerchio oro
    const r = dim * 0.44;
    cerchio(cx, cy, r, SFONDO, ORO);
    // Cerchio interno scuro
    const rInterno = dim * 0.35;
    cerchio(cx, cy, rInterno, ORO, SFONDO);
  }

  // 3. Lettera "E" scalata al centro
  //    Proporzioni: altezza ~50% del dim, larghezza ~30%
  const eh = Math.round(dim * 0.44);  // altezza della E
  const ew = Math.round(dim * 0.28);  // larghezza della E
  const et = Math.round(dim * 0.065); // spessore dei tratti
  const ex = Math.round(cx - ew / 2); // angolo sinistro
  const ey = Math.round(cy - eh / 2); // angolo superiore

  const cLettera = maskable ? ORO : SFONDO;

  // Tratto verticale sinistro
  rettangolo(ex, ey, ex + et - 1, ey + eh - 1, cLettera);
  // Tratto orizzontale superiore
  rettangolo(ex, ey, ex + ew - 1, ey + et - 1, cLettera);
  // Tratto orizzontale centrale
  const mc = Math.round(ey + eh / 2 - et / 2);
  rettangolo(ex, mc, ex + Math.round(ew * 0.82) - 1, mc + et - 1, cLettera);
  // Tratto orizzontale inferiore
  rettangolo(ex, ey + eh - et, ex + ew - 1, ey + eh - 1, cLettera);

  return pixels;
}


// ============================================================
// GENERAZIONE DEI 4 FILE
// ============================================================

const cartella = path.join(__dirname);

const varianti = [
  { file: 'icon-192.png',          dim: 192, maskable: false },
  { file: 'icon-512.png',          dim: 512, maskable: false },
  { file: 'icon-maskable-192.png', dim: 192, maskable: true  },
  { file: 'icon-maskable-512.png', dim: 512, maskable: true  }
];

varianti.forEach(({ file, dim, maskable }) => {
  const pixels = disegnaIcona(dim, maskable);
  const png    = creaPNG(dim, dim, pixels);
  const dest   = path.join(cartella, file);
  fs.writeFileSync(dest, png);
  console.log(`Generato: ${file} (${dim}x${dim}, ${maskable ? 'maskable' : 'standard'})`);
});

console.log('\nTutte le icone generate. Verificare visivamente prima di pubblicare.');
