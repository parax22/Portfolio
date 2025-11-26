// Theme handling
(function theme() {
  const root = document.documentElement;
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const saved = localStorage.getItem('theme');
  const isDark = saved ? saved === 'dark' : prefersDark;
  root.classList.toggle('dark', isDark);
  updateIcons();

  document.getElementById('themeToggle')?.addEventListener('click', () => {
    const nowDark = !root.classList.contains('dark');
    root.classList.toggle('dark', nowDark);
    localStorage.setItem('theme', nowDark ? 'dark' : 'light');
    updateIcons();
  });

  function updateIcons() {
    const sun = document.getElementById('sun');
    const moon = document.getElementById('moon');
    const dark = root.classList.contains('dark');
    if (sun && moon) {
      sun.style.display = dark ? 'none' : 'block';
      moon.style.display = dark ? 'block' : 'none';
    }
  }
})();

// Mobile nav
(function nav() {
  const toggle = document.getElementById('menuToggle');
  const mobile = document.getElementById('mobileNav');
  if (!toggle || !mobile) return;
  toggle.addEventListener('click', () => mobile.classList.toggle('hidden'));
  mobile.querySelectorAll('a').forEach(a => a.addEventListener('click', () => mobile.classList.add('hidden')));
})();

// Smooth hash scroll (better offset behavior on mobile)
(function smoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
      const id = link.getAttribute('href');
      if (!id || id === '#' || id === '#0') return;
      const el = document.querySelector(id);
      if (!el) return;
      e.preventDefault();
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });
})();

// Footer year
(function year() {
  const y = document.getElementById('year');
  if (y) y.textContent = new Date().getFullYear();
})();

// AOS init
AOS.init({ duration: 700, easing: 'ease-out-quart', once: true });

// GSAP hero animation
(function heroAnim() {
  if (!window.gsap) return;
  const tl = gsap.timeline();
  tl.from('#heroTitle', { opacity: 0, y: 20, duration: 0.6 });
  tl.from('.btn-primary', { opacity: 0, y: 10, duration: 0.4 }, '-=0.2');
  tl.from('.btn-secondary', { opacity: 0, y: 10, duration: 0.4 }, '-=0.3');
})();

// Skills animation
(function skillsAnim() {
  if (!window.gsap) return;
  const cards = document.querySelectorAll('.skill-card');
  if (!cards.length) return;
  gsap.set(cards, { opacity: 0, y: 12 });
  gsap.to(cards, { opacity: 1, y: 0, duration: 0.4, stagger: 0.06, delay: 0.1, ease: 'power2.out' });
})();
