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

const stats = document.querySelectorAll('.stats span, .stats h2');
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

const seeMoreButton = document.querySelector('.work-see-more');
seeMoreButton?.addEventListener('click', () => {
  window.location.href = '/services.html';
});

const normalizePath = (path) => path.replace(/\\/g, '/').replace(/\/+/g, '/');
const currentPath = normalizePath(window.location.pathname);

document.querySelectorAll('.nav-links a').forEach((link) => {
  const href = link.getAttribute('href');
  if (!href || href.startsWith('#')) return;
  const resolved = new URL(href, window.location.href);
  if (normalizePath(resolved.pathname) === currentPath) {
    link.classList.add('active');
  }
});

initPageAnimations({
  heroIntroSelectors: [
    '.hero-section .hero-tag',
    '.hero-section h1',
    '.hero-section .subtitle',
    '.hero-section .btn-dark',
  ],
  scrollRevealSelectors: [
    '.about .about-heading',
    '.about .about-body p',
    '.services .services-title',
    '.services .services-sub',
    '.work-section .work-title',
    '.work-section .work-right-text p',
    '.testimonial-section h2',
    '.testimonial-section .description',
  ],
  staggerGroups: [
    { trigger: '.services', selector: '.services-list .card-title', y: 34, stagger: 0.12, duration: 0.7 },
    { trigger: '.services', selector: '.services-list .card-desc', y: 34, stagger: 0.12, duration: 0.7 },
  ],
});
