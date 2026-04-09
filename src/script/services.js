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

const faqItems = document.querySelectorAll('.faq-item');
faqItems.forEach((item) => {
  item.addEventListener('toggle', () => {
    if (item.open) {
      faqItems.forEach((other) => {
        if (other !== item) other.removeAttribute('open');
      });
    }
  });
});

document.querySelector('.services-intro-btn')?.addEventListener('click', () => {
  window.location.href = 'contact.html#contact';
});

document.querySelectorAll('.services-offering-card-btn').forEach((btn) => {
  btn.addEventListener('click', (e) => {
    e.preventDefault();
    window.location.href = 'contact.html#contact';
  });
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

const stats = document.querySelectorAll('.services-intro-stat h3');
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

initPageAnimations({
  heroIntroSelectors: [
    '.hero .hero-tag',
    '.hero h1',
    '.hero .subtitle',
  ],
  scrollRevealSelectors: [
    '.services-intro-right h2',
    '.services-intro-desc',
    '.services-title',
    '.services-sub',
    '.faq-header h2',
    '.services-testimonial-section h2',
    '.services-testimonial-description',
  ],
  staggerGroups: [
    { trigger: '.services-offering-section', selector: '.services-list .services-offering-card-title', y: 34, stagger: 0.12, duration: 0.7 },
    { trigger: '.services-offering-section', selector: '.services-list .services-offering-card-desc', y: 34, stagger: 0.12, duration: 0.7 },
  ],
});