import { initPageAnimations } from "./gsap-animations.js";
import { initMobileNavigation } from "./mobile-nav.js";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const navbar = document.querySelector('.navbar');

const toggleNavbarShadow = () => {
  if (!navbar) return;
  navbar.classList.toggle('scrolled', window.scrollY > 20);
};

window.addEventListener('scroll', toggleNavbarShadow, { passive: true });
toggleNavbarShadow();
initMobileNavigation();

const chips = document.querySelectorAll('.about-class-options button');

const updateChipSelection = (activeChip) => {
  chips.forEach((item) => {
    const isActive = item === activeChip;
    item.classList.toggle('selected', isActive);
    item.setAttribute('aria-pressed', String(isActive));
  });
};

if (chips.length) {
  const initiallySelected = Array.from(chips).find((chip) => chip.classList.contains('selected'));
  updateChipSelection(initiallySelected ?? chips[0]);
}

chips.forEach((btn) => {
  btn.addEventListener('click', () => {
    updateChipSelection(btn);
  });
});

const form = document.querySelector('.about-schedule-form');
form?.addEventListener('submit', (e) => {
  e.preventDefault();
  const nameInput = form.querySelector('input[type="text"]');
  const emailInput = form.querySelector('input[type="email"]');

  const name = nameInput?.value.trim() ?? '';
  const email = emailInput?.value.trim() ?? '';
  const selected = form.querySelector('.about-class-options .selected');

  if (!name || !email) {
    alert('Please fill in your name and email.');
    return;
  }
  if (!selected) {
    alert('Please choose a class.');
    return;
  }

  alert(`Thanks ${name}! We'll reach out to you at ${email}.`);
  form.reset();
  if (chips.length) {
    updateChipSelection(chips[0]);
  }
});

const initCountryScrollAnimation = () => {
  if (typeof window === 'undefined') return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const section = document.querySelector('.about-country-section');
  const globe = document.querySelector('.about-globe-container');
  const markers = gsap.utils.toArray('.about-country-marker');

  if (!section || !globe || !markers.length) return;

  const entry = gsap.timeline({
    defaults: { ease: 'power2.out' },
    scrollTrigger: {
      trigger: section,
      start: 'top 78%',
      once: true,
    },
  });

  entry.from(globe, {
    opacity: 0,
    y: 28,
    scale: 0.98,
    duration: 0.75,
  });

  entry.from(markers, {
    opacity: 0,
    y: 14,
    scale: 0.92,
    duration: 0.48,
    stagger: 0.08,
  }, '-=0.3');

  gsap.to(globe, {
    y: -16,
    ease: 'none',
    scrollTrigger: {
      trigger: section,
      start: 'top bottom',
      end: 'bottom top',
      scrub: 1.2,
    },
  });

  gsap.to(markers, {
    y: -8,
    ease: 'none',
    stagger: 0.06,
    scrollTrigger: {
      trigger: section,
      start: 'top bottom',
      end: 'bottom top',
      scrub: 1.3,
    },
  });
};

initCountryScrollAnimation();

initPageAnimations({
  heroIntroSelectors: [
    '.hero .hero-tag',
    '.hero h1',
    '.hero .subtitle',
    '.about-hero-text h1',
    '.about-hero-copy p',
    '.about-hero-btn',
  ],
  scrollRevealSelectors: [
    '.about-country-header h2',
    '.about-country-header p',
    '.about-schedule-section h1',
    '.about-schedule-subtitle',
  ],
  staggerGroups: [
    { trigger: '.about-schedule-section', selector: '.about-class-options button', y: 32, stagger: 0.12, duration: 0.6 },
  ],
});
