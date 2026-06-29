(function () {
  'use strict';

  // ── Scroll-triggered fade-in animations ──
  const animatedEls = document.querySelectorAll('.animate-on-scroll');
  const fadeObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          fadeObserver.unobserve(entry.target); // animate once
        }
      });
    },
    { threshold: 0.15 }
  );
  animatedEls.forEach((el) => fadeObserver.observe(el));

  // ── Active nav link highlighting ──
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('#navbar .nav-link[href^="#"]');

  const navObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          navLinks.forEach((link) => link.classList.remove('active'));
          const id = entry.target.getAttribute('id');
          const active = document.querySelector(`#navbar .nav-link[href="#${id}"]`);
          if (active) active.classList.add('active');
        }
      });
    },
    { threshold: 0, rootMargin: '-40% 0px -40% 0px' }
  );
  sections.forEach((s) => navObserver.observe(s));

  // ── Navbar shadow on scroll ──
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 10);
  }, { passive: true });

  // ── Mobile hamburger ──
  const hamburger = document.getElementById('hamburger');
  const navMenu = document.getElementById('nav-menu');

  hamburger.addEventListener('click', () => {
    const isOpen = navMenu.classList.toggle('open');
    hamburger.setAttribute('aria-expanded', String(isOpen));
  });

  navMenu.querySelectorAll('.nav-link').forEach((link) => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('open');
      hamburger.setAttribute('aria-expanded', 'false');
    });
  });

})();
