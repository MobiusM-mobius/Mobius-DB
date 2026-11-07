(function () {
  const nav = document.getElementById('nav');
  const toggle = document.getElementById('navToggle');
  const links = document.querySelectorAll('.nav__link');
  const toTop = document.getElementById('toTop');

  toggle.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    toggle.setAttribute('aria-expanded', String(open));
  });
  links.forEach((l) => l.addEventListener('click', () => nav.classList.remove('open')));

  // Highlight nav link for the section currently in view
  const sections = [...links].map((l) => document.querySelector(l.getAttribute('href'))).filter(Boolean);
  const onScroll = () => {
    const y = window.scrollY + 120;
    let current = sections[0];
    sections.forEach((s) => { if (s.offsetTop <= y) current = s; });
    links.forEach((l) => l.classList.toggle('active', l.getAttribute('href') === '#' + current.id));
    toTop.classList.toggle('show', window.scrollY > 500);
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // Reveal on scroll
  const revealTargets = document.querySelectorAll('.feature, .program, .news__card, .gallery__item, .vm__card, .stat');
  revealTargets.forEach((el) => el.classList.add('reveal'));
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
    });
  }, { threshold: 0.15 });
  revealTargets.forEach((el) => io.observe(el));

  // Count-up stats
  const counters = document.querySelectorAll('.stat__num');
  const countIo = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (!e.isIntersecting) return;
      const el = e.target;
      const target = Number(el.dataset.count);
      const start = performance.now();
      const step = (t) => {
        const p = Math.min((t - start) / 1400, 1);
        el.textContent = Math.round(target * (1 - Math.pow(1 - p, 3)));
        if (p < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
      countIo.unobserve(el);
    });
  }, { threshold: 0.5 });
  counters.forEach((el) => countIo.observe(el));

  // PPDB form (demo: no backend yet)
  const form = document.getElementById('ppdbForm');
  const note = document.getElementById('formNote');
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const siswa = form.siswa.value.trim();
    note.textContent = `Terima kasih! Data minat pendaftaran ananda ${siswa} telah kami terima. Tim PPDB akan menghubungi Anda via WhatsApp.`;
    form.reset();
  });

  document.getElementById('year').textContent = new Date().getFullYear();
})();
