const fs = require("fs");
const path = require("path");
const sharp = require("sharp");

const PHOTOS_DIR = path.join(__dirname, "..", "..", "photos");

async function analyzeOne(file) {
  const filePath = path.join(PHOTOS_DIR, file);
  const buf = fs.readFileSync(filePath);
  const img = sharp(buf);
  const meta = await img.metadata();
  const stats = await img.stats();

  const [r, g, b] = stats.channels;
  const L = (r.mean + g.mean + b.mean) / 3;
  const castR = r.mean / L;
  const castB = b.mean / L;
  const avgStdev = (r.stdev + g.stdev + b.stdev) / 3;

  return {
    file,
    sizeKB: Math.round(buf.length / 1024),
    width: meta.width,
    height: meta.height,
    luminance: Math.round(L),
    stdev: Math.round(avgStdev),
    castR: castR.toFixed(2),
    castB: castB.toFixed(2),
  };
}

(async () => {
  const files = fs
    .readdirSync(PHOTOS_DIR)
    .filter((f) => /\.(jpg|jpeg)$/i.test(f))
    .sort();

  const results = [];
  for (const file of files) {
    results.push(await analyzeOne(file));
  }

  console.log(
    "file".padEnd(14),
    "size".padEnd(7),
    "WxH".padEnd(11),
    "lum".padEnd(5),
    "stdev".padEnd(6),
    "castR".padEnd(6),
    "castB"
  );
  results.forEach((r) => {
    console.log(
      r.file.padEnd(14),
      `${r.sizeKB}KB`.padEnd(7),
      `${r.width}x${r.height}`.padEnd(11),
      String(r.luminance).padEnd(5),
      String(r.stdev).padEnd(6),
      String(r.castR).padEnd(6),
      String(r.castB)
    );
  });

  fs.writeFileSync(path.join(__dirname, "analysis.json"), JSON.stringify(results, null, 2));
})();
