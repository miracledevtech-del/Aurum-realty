/* ── AURUM REALTY GROUP — MAIN JS ── */

// ─── NAV SCROLL ───
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 60);
});

// ─── HAMBURGER MENU ───
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');
if (hamburger) {
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    mobileMenu.classList.toggle('open');
    document.body.style.overflow = mobileMenu.classList.contains('open') ? 'hidden' : '';
  });
  mobileMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('open');
      mobileMenu.classList.remove('open');
      document.body.style.overflow = '';
    });
  });
}

// ─── SCROLL REVEAL ───
const revealEls = document.querySelectorAll(
  '.prop-card, .why-card, .value-card, .team-card, .why-left, .why-right, .story-img, .story-text, .cd-item'
);
revealEls.forEach(el => el.classList.add('reveal'));

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => entry.target.classList.add('visible'), i * 80);
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

revealEls.forEach(el => observer.observe(el));

// ─── TESTIMONIAL SLIDER ───
let currentTestimonial = 0;
const testimonials = document.querySelectorAll('.testimonial');
const dots = document.querySelectorAll('.t-dot');

function goTestimonial(index) {
  testimonials.forEach(t => t.classList.remove('active'));
  dots.forEach(d => d.classList.remove('active'));
  currentTestimonial = index;
  if (testimonials[index]) testimonials[index].classList.add('active');
  if (dots[index]) dots[index].classList.add('active');
}

if (testimonials.length > 0) {
  setInterval(() => {
    goTestimonial((currentTestimonial + 1) % testimonials.length);
  }, 5000);
}

// ─── PROPERTY FILTER ───
const filterBtns = document.querySelectorAll('.filter-btn');
const propCards = document.querySelectorAll('#propGrid .prop-card');

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    const filter = btn.dataset.filter;
    propCards.forEach(card => {
      const city = card.dataset.city;
      const type = card.dataset.type;
      const show = filter === 'all' || city === filter || type === filter;
      card.style.display = show ? 'flex' : 'none';
      card.style.opacity = '0';
      if (show) {
        requestAnimationFrame(() => {
          card.style.transition = 'opacity .4s';
          card.style.opacity = '1';
        });
      }
    });
  });
});

// ─── CONTACT FORM ───
const contactForm = document.getElementById('contactForm');
const formSuccess = document.getElementById('formSuccess');
if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = contactForm.querySelector('.form-submit');
    btn.textContent = 'Sending...';
    btn.style.opacity = '.7';
    setTimeout(() => {
      contactForm.style.display = 'none';
      if (formSuccess) formSuccess.classList.add('show');
    }, 1400);
  });
}
