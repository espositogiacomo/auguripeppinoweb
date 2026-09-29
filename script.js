const slideshow = document.getElementById("slideshow");
const audio = document.getElementById("audio-player");
const overlay = document.getElementById("start-overlay");
const startButton = document.getElementById("start-button");

const steps = [];
let currentIndex = 0;

function pad(n) {
  return String(n).padStart(2, "0");
}

function buildSteps() {
  TIMELINE.forEach((item, i) => {
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

    if (i === 0) el.classList.add("active");
    slideshow.appendChild(el);
    steps.push({ el, duration: (item.duration || 5) * 1000 });
  });
}

function showNext() {
  const current = steps[currentIndex];
  current.el.classList.remove("active");
  currentIndex = (currentIndex + 1) % steps.length;
  const next = steps[currentIndex];
  next.el.classList.add("active");
  setTimeout(showNext, next.duration);
}

function start() {
  overlay.classList.add("hidden");

  if (AUDIO_FILE) {
    audio.src = AUDIO_FILE;
    audio.play().catch(() => {
      // Se il browser blocca comunque la riproduzione automatica,
      // l'utente puo' comunque vedere lo slideshow senza audio.
    });
  }

  if (steps.length > 1) {
    setTimeout(showNext, steps[currentIndex].duration);
  }
}

buildSteps();
startButton.addEventListener("click", start, { once: true });
