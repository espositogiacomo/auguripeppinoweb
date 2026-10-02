const slideshow = document.getElementById("slideshow");
const caption = document.getElementById("caption");
const audio = document.getElementById("audio-player");
const overlay = document.getElementById("start-overlay");
const startButton = document.getElementById("start-button");
const playPauseButton = document.getElementById("play-pause-button");
const progressBar = document.getElementById("progress-bar");
const progressFill = document.getElementById("progress-fill");
const debugInfo = document.getElementById("debug-info");

const NO_AUDIO_TAIL_SECONDS = 5;

const steps = [];
let currentIndex = 0;
let manualStart = null;
let isPaused = false;
let pausedAt = null;

function pad(n) {
  return String(n).padStart(2, "0");
}

function parseAt(at) {
  const [minutes, seconds] = String(at).split(".");
  return (parseInt(minutes, 10) || 0) * 60 + (parseInt(seconds, 10) || 0);
}

function makeComparisonHalf(src, label) {
  const half = document.createElement("div");
  half.className = "compare-half";

  const img = document.createElement("img");
  img.src = src;
  img.alt = label;
  half.appendChild(img);

  const tag = document.createElement("span");
  tag.className = "compare-label";
  tag.textContent = label;
  half.appendChild(tag);

  return half;
}

function buildSteps() {
  TIMELINE.forEach((item) => {
    let el;

    if (SHOW_COMPARISON) {
      el = document.createElement("div");
      el.className = "slide compare-slide";
      el.appendChild(makeComparisonHalf(`photos/foto-${pad(item.photo)}.jpg`, "originale"));
      el.appendChild(makeComparisonHalf(`${PHOTOS_DIR}/foto-${pad(item.photo)}.jpg`, "ottimizzata"));
    } else {
      el = document.createElement("img");
      el.src = `${PHOTOS_DIR}/foto-${pad(item.photo)}.jpg`;
      el.alt = `Foto ${item.photo}`;
      el.className = "slide photo-slide";
    }

    slideshow.appendChild(el);
    steps.push({ el, photo: item.photo, at: parseAt(item.at), text: item.text || "" });
  });
  steps[0].el.classList.add("active");
}

function updateCaption(step) {
  if (step.text) {
    caption.textContent = step.text;
    caption.classList.remove("hiding");
    caption.classList.remove("visible");
    void caption.offsetWidth;
    caption.classList.add("visible");
  } else if (caption.classList.contains("visible")) {
    caption.classList.remove("visible");
    caption.classList.add("hiding");
  }
}

function formatTime(t) {
  const totalSeconds = Math.max(0, Math.floor(t));
  const m = Math.floor(totalSeconds / 60);
  const s = totalSeconds % 60;
  return `${m}:${pad(s)}`;
}

function loopDuration() {
  if (AUDIO_FILE && audio.duration) return audio.duration;
  return steps[steps.length - 1].at + NO_AUDIO_TAIL_SECONDS;
}

function currentTime() {
  if (AUDIO_FILE) return audio.currentTime;
  if (isPaused) return (pausedAt - manualStart) / 1000;
  return ((Date.now() - manualStart) / 1000) % loopDuration();
}

function tick() {
  const t = currentTime();
  let idx = 0;
  for (let i = 0; i < steps.length; i++) {
    if (steps[i].at <= t) idx = i;
    else break;
  }

  if (idx !== currentIndex) {
    steps[currentIndex].el.classList.remove("active");
    steps[idx].el.classList.add("active");
    currentIndex = idx;
    updateCaption(steps[idx]);
    if (idx === 0) playConfetti();
  }

  if (!isScrubbing) {
    const ratio = Math.min(1, Math.max(0, t / loopDuration()));
    progressFill.style.width = `${ratio * 100}%`;
  }

  if (SHOW_DEBUG_INFO) {
    debugInfo.textContent = `Foto ${pad(steps[idx].photo)} · ${formatTime(t)}`;
  }

  requestAnimationFrame(tick);
}

let isScrubbing = false;
let hideButtonTimer = null;

function showControlsTemporarily() {
  if (isPaused) return;
  playPauseButton.classList.remove("hidden");
  progressBar.classList.remove("hidden");
  clearTimeout(hideButtonTimer);
  hideButtonTimer = setTimeout(() => {
    if (!isPaused) {
      playPauseButton.classList.add("hidden");
      progressBar.classList.add("hidden");
    }
  }, 5000);
}

function seekToRatio(ratio) {
  ratio = Math.min(1, Math.max(0, ratio));
  progressFill.style.width = `${ratio * 100}%`;
  const target = ratio * loopDuration();

  if (AUDIO_FILE) {
    audio.currentTime = target;
  } else {
    manualStart = Date.now() - target * 1000;
    if (isPaused) pausedAt = Date.now();
  }
}

function ratioFromEvent(e) {
  const rect = progressBar.getBoundingClientRect();
  return (e.clientX - rect.left) / rect.width;
}

progressBar.addEventListener("pointerdown", (e) => {
  isScrubbing = true;
  seekToRatio(ratioFromEvent(e));
});
progressBar.addEventListener("pointermove", (e) => {
  if (isScrubbing) seekToRatio(ratioFromEvent(e));
});
window.addEventListener("pointerup", () => {
  isScrubbing = false;
});

function togglePause() {
  if (isPaused) {
    if (AUDIO_FILE) {
      audio.play().catch(() => {});
    } else {
      manualStart += Date.now() - pausedAt;
    }
    isPaused = false;
    playPauseButton.classList.remove("paused");
    showControlsTemporarily();
  } else {
    if (AUDIO_FILE) {
      audio.pause();
    } else {
      pausedAt = Date.now();
    }
    isPaused = true;
    clearTimeout(hideButtonTimer);
    playPauseButton.classList.remove("hidden");
    progressBar.classList.remove("hidden");
    playPauseButton.classList.add("paused");
  }
}

function start() {
  overlay.classList.add("hidden");
  if (SHOW_DEBUG_INFO) debugInfo.classList.remove("hidden");

  document.documentElement.style.setProperty("--caption-font-size", CAPTION_FONT_SIZE);
  const captionMargin = (100 - CAPTION_BOX.widthPct) / 2;
  document.documentElement.style.setProperty("--caption-left", captionMargin + "%");
  document.documentElement.style.setProperty("--caption-right", captionMargin + "%");
  document.documentElement.style.setProperty("--caption-bottom", CAPTION_BOX.bottomPx + "px");

  document.addEventListener("pointerdown", (e) => {
    if (e.target.closest("#play-pause-button")) return;
    showControlsTemporarily();
  }, { passive: true });

  if (steps[0].text) updateCaption(steps[0]);
  setTimeout(playConfetti, CONFETTI.initialDelayMs); // la prima slide e' quella iniziale

  if (AUDIO_FILE) {
    audio.src = AUDIO_FILE;
    audio.play().catch(() => {
      // Se il browser blocca comunque la riproduzione automatica,
      // l'utente puo' comunque vedere lo slideshow senza audio.
    });
  } else {
    manualStart = Date.now();
  }

  requestAnimationFrame(tick);
}

// ==========================================================
// EFFETTO CORIANDOLI (indipendente dalla logica del carousel)
// ==========================================================
// Parte una sola volta, quando viene mostrata la prima slide (foto
// del brindisi): 3 piccoli burst da entrambi gli angoli inferiori,
// verso l'alto e verso il centro, distanziati di circa 250ms.

let confettiPlayed = false;

function playConfetti() {
  if (confettiPlayed || !CONFETTI.enabled || typeof confetti !== "function") return;
  confettiPlayed = true;

  const shared = {
    particleCount: CONFETTI.particleCount,
    spread: CONFETTI.spread,
    startVelocity: CONFETTI.startVelocity,
    gravity: CONFETTI.gravity,
    decay: CONFETTI.decay,
    ticks: CONFETTI.ticks,
    scalar: CONFETTI.scalar,
    colors: CONFETTI.colors,
    disableForReducedMotion: true,
  };

  const burst = () => {
    confetti({ ...shared, angle: 60, origin: { x: 0, y: 1 } });   // angolo in basso a sinistra, verso l'alto/destra
    confetti({ ...shared, angle: 120, origin: { x: 1, y: 1 } });  // angolo in basso a destra, verso l'alto/sinistra
  };

  for (let i = 0; i < CONFETTI.burstCount; i++) {
    setTimeout(burst, i * CONFETTI.burstDelayMs);
  }
}

buildSteps();
startButton.addEventListener("click", start, { once: true });
playPauseButton.addEventListener("click", togglePause);
