const slideshow = document.getElementById("slideshow");
const audio = document.getElementById("audio-player");
const overlay = document.getElementById("start-overlay");
const startButton = document.getElementById("start-button");

const NO_AUDIO_TAIL_SECONDS = 5;

const steps = [];
let currentIndex = 0;
let manualStart = null;

function pad(n) {
  return String(n).padStart(2, "0");
}

function parseAt(at) {
  const [minutes, seconds] = String(at).split(".");
  return (parseInt(minutes, 10) || 0) * 60 + (parseInt(seconds, 10) || 0);
}

function buildSteps() {
  TIMELINE.forEach((item) => {
    let el;

    if (item.photo !== undefined) {
      el = document.createElement("img");
      el.src = `photos/foto-${pad(item.photo)}.jpg`;
      el.alt = `Foto ${item.photo}`;
      el.className = "slide photo-slide";
    } else if (item.text !== undefined) {
      el = document.createElement("div");
      el.className = "slide text-slide";
      el.textContent = item.text;
    }

    slideshow.appendChild(el);
    steps.push({ el, at: parseAt(item.at) });
  });
  steps[0].el.classList.add("active");
}

function loopDuration() {
  if (AUDIO_FILE && audio.duration) return audio.duration;
  return steps[steps.length - 1].at + NO_AUDIO_TAIL_SECONDS;
}

function currentTime() {
  if (AUDIO_FILE) return audio.currentTime;
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
  }

  requestAnimationFrame(tick);
}

function start() {
  overlay.classList.add("hidden");

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
