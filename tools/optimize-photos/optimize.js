// Correzione fotografica globale e conservativa (no AI generativa, no face
// enhancement). Legge photos/*.jpg, scrive in photos/optimized/ con lo
// stesso nome file. Gli originali non vengono mai toccati.

const fs = require("fs");
const path = require("path");
const sharp = require("sharp");

const SRC_DIR = path.join(__dirname, "..", "..", "photos");
const OUT_DIR = path.join(SRC_DIR, "optimized");

const TARGET_LUMINANCE = 120;
const TARGET_STDEV = 58;
const MAX_DIMENSION = 1920;

function clamp(v, min, max) {
  return Math.max(min, Math.min(max, v));
}

async function processOne(file) {
  const srcPath = path.join(SRC_DIR, file);
  const buf = fs.readFileSync(srcPath);
  const img = sharp(buf);
  const meta = await img.metadata();
  const stats = await img.stats();
  const [r, g, b] = stats.channels;

  const L = (r.mean + g.mean + b.mean) / 3;
  const avgStdev = (r.stdev + g.stdev + b.stdev) / 3;
  const castR = r.mean / L;
  const castB = b.mean / L;

  const isPrintLike = Math.abs(castR - 1) > 0.1 || Math.abs(castB - 1) > 0.1;

  // 1) Esposizione: correzione parziale (35%) verso la luminanza di riferimento
  const shift = clamp((TARGET_LUMINANCE - L) * 0.35, -12, 18);

  // 2) Contrasto: solo incremento, mai riduzione, centrato sulla media dell'immagine
  const contrastBoost = clamp(Math.max(0, TARGET_STDEV - avgStdev) / TARGET_STDEV * 0.25, 0, 0.15);
  const a = 1 + contrastBoost;
  const intercept = L * (1 - a) + shift;

  // 3) Vibrance: leggera, un po' piu' marcata per le foto "da stampa"
  //
  // NOTA: la prima versione di questo script applicava anche un bilanciamento
  // del bianco automatico (gray-world, parziale). E' stato rimosso: su foto
  // con un soggetto molto saturo (es. un vestito rosso vivo) l'algoritmo
  // scambiava quel colore per una dominante cromatica e lo desaturava
  // visibilmente, tradendo il vincolo di fedelta' assoluta al colore
  // originale. Meglio lasciare una dominante calda tipica delle stampe
  // vecchie piuttosto che rischiare di alterare un colore vero.
  const saturation = isPrintLike ? 1.1 : 1.06;

  let pipeline = sharp(buf).rotate(); // rotate() senza argomenti applica l'orientamento EXIF

  if (meta.width > MAX_DIMENSION || meta.height > MAX_DIMENSION) {
    pipeline = pipeline.resize({
      width: MAX_DIMENSION,
      height: MAX_DIMENSION,
      fit: "inside",
      withoutEnlargement: true,
      kernel: sharp.kernel.lanczos3,
    });
  }

  pipeline = pipeline
    .linear(a, intercept) // esposizione + contrasto, globali
    .modulate({ saturation });

  if (isPrintLike) {
    pipeline = pipeline.median(3); // riduzione rumore leggera solo su foto "da stampa"
  }

  pipeline = pipeline.sharpen({ sigma: 0.5 }); // nitidezza molto leggera, sempre uguale

  const outPath = path.join(OUT_DIR, file);
  await pipeline.jpeg({ quality: 86, mozjpeg: true }).toFile(outPath);
  await pipeline.clone().webp({ quality: 82 }).toFile(outPath.replace(/\.jpe?g$/i, ".webp"));

  const outSize = fs.statSync(outPath).size;

  return {
    file,
    isPrintLike,
    luminance: Math.round(L),
    stdev: Math.round(avgStdev),
    shift: shift.toFixed(1),
    contrastBoost: (contrastBoost * 100).toFixed(0) + "%",
    saturation,
    sizeBeforeKB: Math.round(buf.length / 1024),
    sizeAfterKB: Math.round(outSize / 1024),
  };
}

(async () => {
  fs.mkdirSync(OUT_DIR, { recursive: true });

  const files = fs
    .readdirSync(SRC_DIR)
    .filter((f) => /^foto-\d+\.jpe?g$/i.test(f))
    .sort();

  const report = [];
  for (const file of files) {
    const r = await processOne(file);
    report.push(r);
    console.log(
      `${r.file}  print=${r.isPrintLike ? "si " : "no "}  lum=${r.luminance}->shift${r.shift}  ` +
        `stdev=${r.stdev} contrast+${r.contrastBoost}  sat=${r.saturation}  ` +
        `${r.sizeBeforeKB}KB -> ${r.sizeAfterKB}KB`
    );
  }

  fs.writeFileSync(path.join(__dirname, "report.json"), JSON.stringify(report, null, 2));
  console.log(`\nCompletate ${report.length} foto. Output in photos/optimized/`);
})();
