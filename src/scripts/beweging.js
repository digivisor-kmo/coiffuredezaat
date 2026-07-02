/* Reveal (één keer) + subtiele parallax. Respecteert prefers-reduced-motion. */

const rustig = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/* ---- reveal bij eerste keer in beeld ---- */
if (!rustig) {
  const doelen = document.querySelectorAll('[data-reveal]');
  doelen.forEach((el, i) => {
    el.classList.add('reveal');
    const vertraging = el.dataset.reveal;
    if (vertraging) el.style.transitionDelay = vertraging + 'ms';
  });
  const io = new IntersectionObserver((entries) => {
    for (const e of entries) {
      if (e.isIntersecting) { e.target.classList.add('toon'); io.unobserve(e.target); }
    }
  }, { threshold: .12, rootMargin: '0px 0px -40px 0px' });
  doelen.forEach((el) => io.observe(el));
}

/* ---- parallax op hero- en sectiebeelden ---- */
if (!rustig) {
  let bezig = false;
  const beweeg = () => {
    bezig = false;
    const vh = window.innerHeight;
    document.querySelectorAll('[data-parallax="hero"] img').forEach((img) => {
      const rect = img.parentElement.getBoundingClientRect();
      if (rect.bottom < 0 || rect.top > vh) return;
      img.style.transform = `scale(1.12) translateY(${(-rect.top * 0.18).toFixed(1)}px)`;
    });
    document.querySelectorAll('[data-parallax="beeld"] img').forEach((img) => {
      const rect = img.parentElement.getBoundingClientRect();
      if (rect.bottom < 0 || rect.top > vh) return;
      const p = ((rect.top + rect.height / 2) - vh / 2) / (vh / 2);
      img.style.transform = `scale(1.12) translateY(${(p * -22).toFixed(1)}px)`;
    });
  };
  const vraag = () => { if (!bezig) { bezig = true; requestAnimationFrame(beweeg); } };
  window.addEventListener('scroll', vraag, { passive: true });
  window.addEventListener('resize', vraag);
  vraag();
}

/* ---- mobiel menu ---- */
const knop = document.querySelector('[data-menu-knop]');
const menu = document.querySelector('[data-menu]');
if (knop && menu) {
  knop.addEventListener('click', () => {
    const open = menu.classList.toggle('open');
    knop.setAttribute('aria-expanded', open ? 'true' : 'false');
  });
}
