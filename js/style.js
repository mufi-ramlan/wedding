document.body.classList.add("no-scroll");

// =============================
// STATE
// =============================
let isStarted = false;

// =============================
// START SEMUA ANIMASI
// =============================
function startAnimations() {
  if (isStarted) return;
  isStarted = true;

  // =============================
  // COUNTDOWN
  // =============================
  const targetDate = new Date(2026, 4, 18).getTime();

  const elDays    = document.getElementById("days");
  const elHours   = document.getElementById("hours");
  const elMinutes = document.getElementById("minutes");
  const elSeconds = document.getElementById("seconds");

  let lastValues = {};

  function animateNumber(el, newValue, key) {
    if (!el) return;
    if (lastValues[key] === newValue) return;

    el.style.transform = "translateY(10px)";
    el.style.opacity = "0.5";

    setTimeout(() => {
      el.innerText = newValue;
      el.style.transform = "translateY(0)";
      el.style.opacity = "1";
    }, 120);

    lastValues[key] = newValue;
  }

  function updateCountdown() {
    const now = new Date().getTime();
    const distance = targetDate - now;
    if (distance < 0) return;

    const days    = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours   = Math.floor((distance / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((distance / (1000 * 60)) % 60);
    const seconds = Math.floor((distance / 1000) % 60);

    animateNumber(elDays, days, "days");
    animateNumber(elHours, hours, "hours");
    animateNumber(elMinutes, minutes, "minutes");
    animateNumber(elSeconds, seconds, "seconds");

    requestAnimationFrame(updateCountdown);
  }

  updateCountdown();

  // =============================
  // GLOBAL OBSERVER (SEMUA ANIMASI)
  // =============================
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {

        // delay bertahap
        setTimeout(() => {
          entry.target.classList.add("show");
        }, i * 180);

        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.2,
    rootMargin: "0px 0px -80px 0px"
  });

  document.querySelectorAll(`
    .fade-up, 
    .fade-down, 
    .fade-blur,
    .ornamen-tr,
    .ornamen-bl,
    .quote-text,
    .quote-source
  `).forEach(el => observer.observe(el));

  // =============================
  // EVENT CARD SEQUENCE
  // =============================
  document.querySelectorAll('.event-card').forEach(card => {
    const els = card.querySelectorAll(
      '.event-title, .event-date, .event-time, .event-place, .btn-lokasi'
    );

    const eventObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          els.forEach((el, i) => {
            setTimeout(() => {
              el.classList.add('show');
            }, i * 250);
          });
        }
      });
    }, { threshold: 0.25 });

    eventObserver.observe(card);
  });

  // =============================
  // HERO TEXT (SEQUENTIAL)
  // =============================
  const tagline = document.querySelector('.thmb-text .color');
  const name    = document.querySelector('.thmb-text h2');
  const date    = document.querySelector('.thmb-text p:not(.color)');

  setTimeout(() => tagline?.classList.add('show'), 500);
  setTimeout(() => name?.classList.add('show'), 1200);
  setTimeout(() => date?.classList.add('show'), 2000);
}

// =============================
// MUSIC + START
// =============================
function toggleMusic() {
  const cover     = document.getElementById('musicCover');
  const btn       = document.getElementById('musicBtn');
  const audio     = document.getElementById('bgMusic');
  const indicator = document.getElementById('musicIndicator');

  cover.classList.add('hide');
  btn.classList.add('hidden');

  startAnimations();

  setTimeout(() => {
    document.body.classList.remove("no-scroll");
    window.scrollTo(0, 0);
  }, 1000);

  audio?.play();

  setTimeout(() => {
    indicator?.classList.add('visible');
  }, 1200);
}

// =============================
// TOGGLE MUSIC
// =============================
function toggleMusicIndicator() {
  const audio     = document.getElementById('bgMusic');
  const indicator = document.getElementById('musicIndicator');

  if (!audio) return;

  if (audio.paused) {
    audio.play();
    indicator.classList.remove('paused');
  } else {
    audio.pause();
    indicator.classList.add('paused');
  }
}

// =============================
// GIFT TOGGLE
// =============================
const toggleBtn = document.getElementById('toggleBtn');
const mainCard  = document.getElementById('mainCard');

toggleBtn?.addEventListener('click', () => {
  const isActive = mainCard.classList.contains('active');

  if (isActive) {
    mainCard.classList.remove('active');
    mainCard.style.maxHeight = '200px';
    toggleBtn.textContent = 'Buka';
  } else {
    mainCard.classList.add('active');
    mainCard.style.maxHeight = '600px';
    toggleBtn.textContent = 'Tutup';
  }
});