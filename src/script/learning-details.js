import { initPageAnimations } from "./gsap-animations.js";
import { initMobileNavigation } from "./mobile-nav.js";

const navbar = document.querySelector('.navbar');

const toggleNavbarShadow = () => {
  if (!navbar) return;
  navbar.classList.toggle('scrolled', window.scrollY > 20);
};

window.addEventListener('scroll', toggleNavbarShadow, { passive: true });
toggleNavbarShadow();
initMobileNavigation();

const chips = document.querySelectorAll('.learning-details-class-options button');

const setSelectedChip = (activeChip) => {
  chips.forEach((item) => {
    const isActive = item === activeChip;
    item.classList.toggle('selected', isActive);
    item.setAttribute('aria-pressed', String(isActive));
  });
};

chips.forEach((btn) => {
  btn.addEventListener('click', () => {
    setSelectedChip(btn);
  });
});

if (chips.length > 0 && !document.querySelector('.learning-details-class-options .selected')) {
  setSelectedChip(chips[0]);
}

const form = document.querySelector('.learning-details-enroll-form');
form?.addEventListener('submit', (e) => {
  e.preventDefault();
  const nameInput = form.querySelector('input[type="text"]');
  const emailInput = form.querySelector('input[type="email"]');

  const name = nameInput?.value.trim() ?? '';
  const email = emailInput?.value.trim() ?? '';
  const selected = form.querySelector('.learning-details-class-options .selected');

  if (!name || !email) {
    alert('Please fill in your name and email.');
    return;
  }
  if (!selected) {
    alert('Please choose a class.');
    return;
  }

  alert(`Enrolled! Check your email at ${email} for payment details.`);
  form.reset();
  if (chips.length > 0) {
    setSelectedChip(chips[0]);
  }
});

initPageAnimations({
  heroIntroSelectors: [
    '.hero .hero-tag',
    '.hero h1',
    '.hero .subtitle',
  ],
  scrollRevealSelectors: [
    '.learning-details-classroom-content h2',
    '.learning-details-classroom-text',
    '.learning-details-enroll-text h2',
    '.learning-details-enroll-text p',
    '.learning-details-testimonial-section h2',
    '.learning-details-testimonial-description',
  ],
  staggerGroups: [
    { trigger: '.learning-details-enroll-section', selector: '.learning-details-class-options button', y: 32, stagger: 0.12, duration: 0.6 },
  ],
});