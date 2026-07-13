import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const DEFAULT_EASE = "power2.out";
const DEFAULT_DURATION = 0.7;

const prefersReducedMotion = () =>
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const getUniqueElements = (selectors = []) => {
  const elementSet = new Set();
  selectors.forEach((selector) => {
    document.querySelectorAll(selector).forEach((el) => elementSet.add(el));
  });
  return Array.from(elementSet);
};

const animateHeroIntro = (selectors = []) => {
  const elements = getUniqueElements(selectors);
  if (!elements.length) return;

  gsap.from(elements, {
    opacity: 0,
    y: 36,
    duration: 0.8,
    stagger: 0.12,
    ease: DEFAULT_EASE,
    clearProps: "opacity,transform",
  });
};

const animateScrollReveal = (selectors = []) => {
  selectors.forEach((selector) => {
    document.querySelectorAll(selector).forEach((element) => {
      gsap.from(element, {
        opacity: 0,
        y: 40,
        duration: DEFAULT_DURATION,
        ease: DEFAULT_EASE,
        scrollTrigger: {
          trigger: element,
          start: "top 86%",
          once: true,
        },
      });
    });
  });
};

const animateStaggerGroups = (groups = []) => {
  groups.forEach((group) => {
    const items = document.querySelectorAll(group.selector);
    if (!items.length) return;

    const trigger = group.trigger
      ? document.querySelector(group.trigger)
      : items[0];

    gsap.from(items, {
      opacity: 0,
      y: group.y ?? 36,
      duration: group.duration ?? 0.6,
      stagger: group.stagger ?? 0.12,
      ease: DEFAULT_EASE,
      scrollTrigger: {
        trigger,
        start: group.start ?? "top 86%",
        once: true,
      },
    });
  });
};

export const initPageAnimations = ({
  heroIntroSelectors = [],
  scrollRevealSelectors = [],
  staggerGroups = [],
} = {}) => {
  if (typeof window === "undefined" || prefersReducedMotion()) return;

  requestAnimationFrame(() => {
    animateHeroIntro(heroIntroSelectors);
    animateScrollReveal(scrollRevealSelectors);
    animateStaggerGroups(staggerGroups);
  });
};

