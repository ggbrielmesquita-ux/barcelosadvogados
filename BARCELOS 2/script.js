/* ═══════════════════════════════════════
   BARCELOS ADVOGADOS — JavaScript
═══════════════════════════════════════ */

// ─── Navbar scroll ──────────────────────
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 60);
}, { passive: true });

// ─── Mobile burger ───────────────────────
const burger  = document.getElementById('burger');
const navMenu = document.getElementById('nav-menu');

burger.addEventListener('click', () => {
  navMenu.classList.toggle('open');
  burger.classList.toggle('active');
});

navMenu.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    navMenu.classList.remove('open');
    burger.classList.remove('active');
  });
});

document.addEventListener('click', (e) => {
  if (!navMenu.contains(e.target) && !burger.contains(e.target)) {
    navMenu.classList.remove('open');
    burger.classList.remove('active');
  }
});

// ─── Tabs ────────────────────────────────
const tabBtns   = document.querySelectorAll('.tab-btn');
const tabPanels = document.querySelectorAll('.tab-panel');

tabBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    const target = btn.dataset.tab;

    tabBtns.forEach(b => b.classList.remove('tab-btn--active'));
    tabPanels.forEach(p => p.classList.remove('tab-panel--active'));

    btn.classList.add('tab-btn--active');
    const panel = document.getElementById(`tab-${target}`);
    panel.classList.add('tab-panel--active');

    // Trigger reveal for cards in newly visible panel
    panel.querySelectorAll('[data-reveal]').forEach((el, i) => {
      if (!el.classList.contains('revealed')) {
        setTimeout(() => el.classList.add('revealed'), i * 70);
      }
    });
  });
});

// ─── Accordion ───────────────────────────
document.querySelectorAll('.accordion__item').forEach(item => {
  const btn  = item.querySelector('.accordion__btn');
  const body = item.querySelector('.accordion__body');

  btn.addEventListener('click', () => {
    const isOpen = item.classList.contains('open');

    // Close all
    document.querySelectorAll('.accordion__item').forEach(i => {
      i.classList.remove('open');
      i.querySelector('.accordion__body').style.maxHeight = null;
    });

    if (!isOpen) {
      item.classList.add('open');
      body.style.maxHeight = body.scrollHeight + 'px';
    }
  });
});

// ─── Scroll reveal ───────────────────────
const revealTargets = document.querySelectorAll(
  '.service-card, .about__grid, .accordion__item, ' +
  '.contact__list li, .wpp-cta, .stat, ' +
  '.about__pillars li, .about__stat-card'
);

revealTargets.forEach(el => el.setAttribute('data-reveal', ''));

const revealObs = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;

    const siblings = [...(entry.target.parentElement?.querySelectorAll('[data-reveal]') || [])];
    const idx = siblings.indexOf(entry.target);
    const delay = Math.min(idx * 75, 400);

    setTimeout(() => entry.target.classList.add('revealed'), delay);
    revealObs.unobserve(entry.target);
  });
}, { threshold: 0.1 });

revealTargets.forEach(el => revealObs.observe(el));

// ─── Smooth scroll ───────────────────────
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const target = document.querySelector(a.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    window.scrollTo({ top: target.getBoundingClientRect().top + window.scrollY - 80, behavior: 'smooth' });
  });
});

// ─── Active nav on scroll ────────────────
const sections = document.querySelectorAll('section[id]');

new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    const id = entry.target.id;
    document.querySelectorAll('.nav-link').forEach(link => {
      link.classList.toggle('nav-link--active', link.getAttribute('href') === `#${id}`);
    });
  });
}, { rootMargin: '-40% 0px -55% 0px' }).observe(...sections);

// Fix: observe all sections
sections.forEach(s => {
  new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.toggle('nav-link--active', link.getAttribute('href') === `#${entry.target.id}`);
      });
    });
  }, { rootMargin: '-40% 0px -55% 0px' }).observe(s);
});
