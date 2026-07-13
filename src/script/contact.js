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

const chips = document.querySelectorAll('.contact-class-chips button');
chips.forEach((btn) => {
  btn.addEventListener('click', () => {
    chips.forEach((item) => item.classList.remove('selected'));
    btn.classList.add('selected');
  });
});

const form = document.querySelector('.contact-schedule-form');
form?.addEventListener('submit', (e) => {
  e.preventDefault();
  const nameInput = form.querySelector('input[type="text"]');
  const phoneInput = form.querySelector('input[type="tel"]');

  const name = nameInput?.value.trim() ?? '';
  const phone = phoneInput?.value.trim() ?? '';
  const selected = form.querySelector('.contact-class-chips .selected');

  if (!name || !phone) {
    alert('Please fill in your name and phone number.');
    return;
  }
  if (!selected) {
    alert('Please choose a service.');
    return;
  }

  alert(`Thanks ${name}! We'll be in touch soon.`);
  form.reset();
  chips.forEach((item) => item.classList.remove('selected'));
});

document.querySelector('.contact-call-btn')?.addEventListener('click', () => {
  window.open('https://calendly.com', '_blank');
});

initPageAnimations({
  heroIntroSelectors: [
    '.hero .hero-tag',
    '.hero h1',
    '.hero .subtitle',
  ],
  scrollRevealSelectors: [
    '.contact-schedule-left h2',
    '.contact-schedule-subtitle',
    '.contact-card-text',
    '.contact-testimonial-section h2',
    '.contact-testimonial-description',
  ],
  staggerGroups: [
    { trigger: '.contact-schedule-section', selector: '.contact-class-chips button', y: 32, stagger: 0.12, duration: 0.6 },
  ],
});
