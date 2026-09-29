const slideshow = document.getElementById("slideshow");
const audio = document.getElementById("audio-player");
const overlay = document.getElementById("start-overlay");
const startButton = document.getElementById("start-button");

let currentIndex = 0;
const imgElements = [];

function buildSlides() {
  PHOTOS.forEach((src, i) => {
    const img = document.createElement("img");
    img.src = src;
    img.alt = `Foto ${i + 1}`;
    if (i === 0) img.classList.add("active");
    slideshow.appendChild(img);
    imgElements.push(img);
  });
}

function nextSlide() {
  if (imgElements.length < 2) return;
  imgElements[currentIndex].classList.remove("active");
  currentIndex = (currentIndex + 1) % imgElements.length;
  imgElements[currentIndex].classList.add("active");
}

function start() {
  overlay.classList.add("hidden");

  audio.src = AUDIO_FILE;
  audio.play().catch(() => {
    // Se il browser blocca comunque la riproduzione automatica,
    // l'utente puo' comunque vedere lo slideshow senza audio.
  });

  setInterval(nextSlide, SLIDE_INTERVAL_MS);
}

buildSlides();
startButton.addEventListener("click", start, { once: true });
