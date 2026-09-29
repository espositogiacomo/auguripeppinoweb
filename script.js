const slideshow = document.getElementById("slideshow");
const caption = document.getElementById("caption");
const audio = document.getElementById("audio-player");
const overlay = document.getElementById("start-overlay");
const startButton = document.getElementById("start-button");
const playPauseButton = document.getElementById("play-pause-button");
const progressBar = document.getElementById("progress-bar");
const progressFill = document.getElementById("progress-fill");

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

function buildSteps() {
  TIMELINE.forEach((item) => {
    const img = document.createElement("img");
    img.src = `photos/foto-${pad(item.photo)}.jpg`;
    img.alt = `Foto ${item.photo}`;
    img.className = "slide photo-slide";

    slideshow.appendChild(img);
    steps.push({ el: img, at: parseAt(item.at), text: item.text || "" });
  });
  steps[0].el.classList.add("active");
}

function updateCaption(step) {
  if (step.text) {
    caption.textContent = step.text;
    caption.classList.remove("hiding");
    // forza il replay dell'animazione anche se il testo e' rimasto uguale
    void caption.offsetWidth;
    caption.classList.add("visible");
  } else if (caption.classList.contains("visible")) {
    caption.classList.remove("visible");
    caption.classList.add("hiding");
  }
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
  }

  if (!isScrubbing) {
    const ratio = Math.min(1, Math.max(0, t / loopDuration()));
    progressFill.style.width = `${ratio * 100}%`;
  }

  requestAnimationFrame(tick);
}

let isScrubbing = false;

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
    playPauseButton.textContent = "⏸";
  } else {
    if (AUDIO_FILE) {
      audio.pause();
    } else {
      pausedAt = Date.now();
    }
    isPaused = true;
    playPauseButton.textContent = "▶";
  }
}

function start() {
  overlay.classList.add("hidden");
  playPauseButton.classList.remove("hidden");
  progressBar.classList.remove("hidden");

  if (steps[0].text) updateCaption(steps[0]);

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

buildSteps();
startButton.addEventListener("click", start, { once: true });
playPauseButton.addEventListener("click", togglePause);
