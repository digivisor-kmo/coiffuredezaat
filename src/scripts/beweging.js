/* Reveal (één keer) + subtiele parallax. Respecteert prefers-reduced-motion. */

const rustig = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/* ---- reveal bij eerste keer in beeld (tekst: fade-up · beeld: clip) ---- */
if (!rustig) {
  const tekst = document.querySelectorAll('[data-reveal]');
  const beeld = document.querySelectorAll('[data-reveal-beeld]');
  tekst.forEach((el) => {
    el.classList.add('reveal');
    if (el.dataset.reveal) el.style.transitionDelay = el.dataset.reveal + 'ms';
  });
  beeld.forEach((el) => el.classList.add('reveal-beeld'));

  const wachtend = new Set([...tekst, ...beeld]);
  const onthul = (el) => { el.classList.add('toon'); wachtend.delete(el); io.unobserve(el); };

  const io = new IntersectionObserver((entries) => {
    for (const e of entries) if (e.isIntersecting) onthul(e.target);
  }, { threshold: .12, rootMargin: '0px 0px -40px 0px' });
  wachtend.forEach((el) => io.observe(el));

  /* vangnet: bij (snel) scrollen kan een element in één frame de viewport
     passeren zonder dat de observer vuurt — veeg alles open dat de
     triggerlijn al voorbij is */
  let veegBezig = false;
  const veeg = () => {
    veegBezig = false;
    const grens = window.innerHeight - 40;
    wachtend.forEach((el) => {
      const r = el.getBoundingClientRect();
      if (r.top < grens || r.bottom < 0) onthul(el);
    });
    if (!wachtend.size) window.removeEventListener('scroll', vraagVeeg);
  };
  const vraagVeeg = () => { if (!veegBezig) { veegBezig = true; requestAnimationFrame(veeg); } };
  window.addEventListener('scroll', vraagVeeg, { passive: true });
  vraagVeeg();
}

/* ---- header: transparant boven de hero, inkt zodra je scrolt ---- */
const kop = document.querySelector('[data-header][data-modus="overlay"]');
if (kop) {
  const zet = () => kop.classList.toggle('vast', window.scrollY > 40);
  window.addEventListener('scroll', zet, { passive: true });
  zet();
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
