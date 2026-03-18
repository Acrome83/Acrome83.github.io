// Sections are visible by default.
// If IntersectionObserver is supported, add a subtle fade-in animation.
const sections = document.querySelectorAll('.section');

if ('IntersectionObserver' in window) {
  // Hide sections initially for the animation
  sections.forEach((s) => s.classList.add('hidden'));

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.remove('hidden');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.08 }
  );

  sections.forEach((s) => observer.observe(s));
}

// Active nav highlight on scroll
const navLinks = document.querySelectorAll('.nav-links a');

const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinks.forEach((link) => {
          link.style.color = link.getAttribute('href') === `#${id}` ? 'var(--accent)' : '';
        });
      }
    });
  },
  { threshold: 0.5 }
);

document.querySelectorAll('section[id]').forEach((s) => sectionObserver.observe(s));

// Hamburger menu toggle
const toggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('.nav-links');

if (toggle && navMenu) {
  toggle.addEventListener('click', () => {
    const isOpen = navMenu.classList.toggle('open');
    toggle.classList.toggle('open', isOpen);
    toggle.setAttribute('aria-expanded', isOpen);
    document.body.style.overflow = isOpen ? 'hidden' : '';
  });

  // Close menu when a nav link is clicked
  navLinks.forEach((link) => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('open');
      toggle.classList.remove('open');
      toggle.setAttribute('aria-expanded', false);
      document.body.style.overflow = '';
    });
  });
}
