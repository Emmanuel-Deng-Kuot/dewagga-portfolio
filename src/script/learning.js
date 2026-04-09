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

const learningCards = document.querySelectorAll('.learning-card');
learningCards.forEach((card) => {
  card.addEventListener('mouseenter', () => card.classList.add('hovered'));
  card.addEventListener('mouseleave', () => card.classList.remove('hovered'));
});

document.querySelector('.learning-enroll-btn')?.addEventListener('click', () => {
  window.location.href = '/learning-details.html';
});

const animateCounter = (element, target, suffix) => {
  const duration = 1200;
  const start = performance.now();

  const tick = (now) => {
    const progress = Math.min((now - start) / duration, 1);
    const value = Math.floor(progress * target);
    element.textContent = `${value}${suffix}`;
    if (progress < 1) {
      requestAnimationFrame(tick);
    } else {
      element.textContent = `${target}${suffix}`;
    }
  };

  requestAnimationFrame(tick);
};

const stats = document.querySelectorAll('.learning-enroll-stat h3');
if ('IntersectionObserver' in window && stats.length) {
  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      const element = entry.target;
      const rawValue = element.textContent?.trim() ?? '';
      const target = Number.parseInt(rawValue, 10);
      if (Number.isNaN(target)) {
        obs.unobserve(element);
        return;
      }
      const suffix = rawValue.replace(/\d/g, '');
      animateCounter(element, target, suffix);
      obs.unobserve(element);
    });
  }, { threshold: 0.5 });

  stats.forEach((item) => observer.observe(item));
}

const videoContainer = document.querySelector('.learning-video-container');
videoContainer?.addEventListener('click', () => {
  videoContainer.classList.toggle('is-active');
});

initPageAnimations({
  heroIntroSelectors: [
    '.hero .hero-tag',
    '.hero h1',
    '.hero .subtitle',
  ],
  scrollRevealSelectors: [
    '.learning h2',
    '.learning-subtext',
    '.learning-enroll-left h2',
    '.learning-enroll-left p',
    '.learning-testimonial-section h2',
    '.learning-testimonial-description',
  ],
  staggerGroups: [
    { trigger: '.learning', selector: '.learning-cards h3', y: 34, stagger: 0.12, duration: 0.7 },
    { trigger: '.learning', selector: '.learning-cards p', y: 34, stagger: 0.12, duration: 0.7 },
  ],
});
