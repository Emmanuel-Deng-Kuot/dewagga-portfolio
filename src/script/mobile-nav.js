export const initMobileNavigation = () => {
  const navbarWrapper = document.querySelector('.navbar-wrapper');
  const navToggle = document.querySelector('.nav-toggle');
  const mobileNav = document.querySelector('.mobile-nav');

  if (!navbarWrapper || !navToggle || !mobileNav) return;

  const setMobileMenuState = (isOpen) => {
    navbarWrapper.classList.toggle('menu-open', isOpen);
    navToggle.setAttribute('aria-expanded', String(isOpen));
    navToggle.setAttribute('aria-label', isOpen ? 'Close navigation menu' : 'Open navigation menu');
    mobileNav.hidden = !isOpen;
  };

  const scrollState = {
    lastY: window.scrollY,
    ticking: false,
  };

  const updateNavbarState = () => {
    const currentY = window.scrollY;
    const delta = currentY - scrollState.lastY;
    const nearTop = currentY < 16;
    const scrollingDown = delta > 4;
    const scrollingUp = delta < -4;
    const menuOpen = navbarWrapper.classList.contains('menu-open');

    navbarWrapper.classList.toggle('scrolled', !nearTop);

    if (nearTop || scrollingUp || menuOpen) {
      navbarWrapper.classList.remove('is-hidden');
    } else if (scrollingDown) {
      navbarWrapper.classList.add('is-hidden');
    }

    scrollState.lastY = currentY;
    scrollState.ticking = false;
  };

  const requestNavbarUpdate = () => {
    if (scrollState.ticking) return;
    scrollState.ticking = true;
    window.requestAnimationFrame(updateNavbarState);
  };

  navToggle.addEventListener('click', () => {
    setMobileMenuState(!navbarWrapper.classList.contains('menu-open'));
  });

  document.querySelectorAll('.mobile-nav a').forEach((link) => {
    link.addEventListener('click', () => setMobileMenuState(false));
  });

  window.addEventListener('resize', () => {
    if (window.innerWidth >= 768) {
      setMobileMenuState(false);
    }
  });

  window.addEventListener('scroll', requestNavbarUpdate, { passive: true });

  setMobileMenuState(false);
  updateNavbarState();
};

