import { initPageAnimations } from "./gsap-animations.js";

let seconds = 10;
const message = document.querySelector('.error-page p');

const countdown = window.setInterval(() => {
  seconds -= 1;
  if (message) {
    message.textContent = `Redirecting to home in ${seconds}s...`;
  }

  if (seconds <= 0) {
    window.clearInterval(countdown);
    window.location.href = '/home.html';
  }
}, 1000);

document.querySelector('.error-home-btn')?.addEventListener('click', () => {
  window.clearInterval(countdown);
});

initPageAnimations({
  heroIntroSelectors: [
    '.error-number',
    '.error-page h2',
    '.error-page p',
    '.error-home-btn',
  ],
  scrollRevealSelectors: [],
  staggerGroups: [],
});
