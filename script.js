document.addEventListener('DOMContentLoaded', () => {
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---- Nav scroll state + progress bar ---- */
  const nav = document.getElementById('nav');
  const progress = document.getElementById('scrollProgress');
  const onScroll = () => {
    if (window.scrollY > 12) nav.classList.add('scrolled'); else nav.classList.remove('scrolled');
    const max = document.documentElement.scrollHeight - window.innerHeight;
    progress.style.width = max > 0 ? `${(window.scrollY / max) * 100}%` : '0%';
  };
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  /* ---- Mobile nav ---- */
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');
  navToggle.addEventListener('click', () => {
    const open = navLinks.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
  });
  navLinks.querySelectorAll('a').forEach(a => a.addEventListener('click', () => navLinks.classList.remove('open')));

  /* ---- Contact form -> Netlify Forms (with mailto fallback) ---- */
  const form = document.getElementById('contactFormWrap');
  const statusEl = document.getElementById('formStatus');
  const submitBtn = document.getElementById('contactSubmit');

  function encodeForm(data) {
    return Object.keys(data).map(k => encodeURIComponent(k) + '=' + encodeURIComponent(data[k])).join('&');
  }

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const subject = document.getElementById('subject').value.trim() || 'Portfolio contact';
    const message = document.getElementById('message').value.trim();

    submitBtn.disabled = true;
    submitBtn.textContent = 'Sending…';

    try {
      const res = await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: encodeForm({ 'form-name': 'contact', name, email, subject, message }),
      });
      if (!res.ok) throw new Error('Network response was not ok');
      statusEl.textContent = "Thanks! Your message has been sent — I'll get back to you soon.";
      statusEl.classList.add('status-ok');
      form.reset();
    } catch (err) {
      // Not on Netlify (e.g. opened locally) — fall back to opening the visitor's email client
      const body = `From: ${name} (${email})%0D%0A%0D%0A${encodeURIComponent(message)}`;
      window.location.href = `mailto:shivamrajeshpandey9136@gmail.com?subject=${encodeURIComponent(subject)}&body=${body}`;
      statusEl.textContent = 'Opening your email client to send this instead…';
    } finally {
      submitBtn.disabled = false;
      submitBtn.textContent = 'Send message';
    }
  });

  /* ---- Typed status line loop ---- */
  const phrases = [
    'building fraud-detection systems',
    'shipping SkillBridge features',
    'open to ai/ml internships',
    'fixing what broke at 2am',
  ];
  const typedEl = document.getElementById('typedText');

  async function typeLoop() {
    let i = 0;
    while (true) {
      const phrase = phrases[i % phrases.length];
      for (let c = 1; c <= phrase.length; c++) {
        typedEl.textContent = phrase.slice(0, c);
        await new Promise(r => setTimeout(r, 35));
      }
      await new Promise(r => setTimeout(r, 1400));
      for (let c = phrase.length; c >= 0; c--) {
        typedEl.textContent = phrase.slice(0, c);
        await new Promise(r => setTimeout(r, 18));
      }
      await new Promise(r => setTimeout(r, 300));
      i++;
    }
  }
  if (reduceMotion) typedEl.textContent = phrases[0]; else typeLoop();

  /* ---- Signal canvas (hero illustration) ---- */
  const canvas = document.getElementById('signalCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let nodes = [], width, height;

  function resize() {
    const rect = canvas.parentElement.getBoundingClientRect();
    width = canvas.width = rect.width * devicePixelRatio;
    height = canvas.height = rect.height * devicePixelRatio;
    canvas.style.width = rect.width + 'px';
    canvas.style.height = rect.height + 'px';
  }

  function makeNodes() {
    const count = window.innerWidth < 640 ? 14 : 22;
    nodes = Array.from({ length: count }, () => ({
      x: Math.random() * width, y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.22 * devicePixelRatio, vy: (Math.random() - 0.5) * 0.22 * devicePixelRatio,
      r: (Math.random() * 2.5 + 3) * devicePixelRatio,
      hue: Math.random() > 0.5 ? 'v' : 'c',
      flagged: false,
    }));
  }

  let flaggedNode = null;
  function flagRandomNode() {
    if (flaggedNode) flaggedNode.flagged = false;
    flaggedNode = nodes[Math.floor(Math.random() * nodes.length)];
    if (flaggedNode) {
      flaggedNode.flagged = true;
      setTimeout(() => { if (flaggedNode) flaggedNode.flagged = false; flaggedNode = null; }, 1600);
    }
  }

  const maxDist = 190;
  const violet = [139, 92, 246];
  const cyan = [34, 211, 238];

  function draw() {
    ctx.clearRect(0, 0, width, height);
    for (let i = 0; i < nodes.length; i++) {
      const a = nodes[i];
      a.x += a.vx; a.y += a.vy;
      if (a.x < 0 || a.x > width) a.vx *= -1;
      if (a.y < 0 || a.y > height) a.vy *= -1;
      for (let j = i + 1; j < nodes.length; j++) {
        const b = nodes[j];
        const dx = a.x - b.x, dy = a.y - b.y;
        const dist = Math.sqrt(dx * dx + dy * dy) / devicePixelRatio;
        if (dist < maxDist) {
          const c = a.hue === 'v' ? violet : cyan;
          ctx.strokeStyle = `rgba(${c[0]},${c[1]},${c[2]},${0.32 * (1 - dist / maxDist)})`;
          ctx.lineWidth = 1 * devicePixelRatio;
          ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke();
        }
      }
    }
    nodes.forEach(n => {
      const c = n.hue === 'v' ? violet : cyan;
      ctx.beginPath();
      ctx.fillStyle = n.flagged ? '#ff4d6d' : `rgb(${c[0]},${c[1]},${c[2]})`;
      ctx.shadowColor = n.flagged ? '#ff4d6d' : `rgb(${c[0]},${c[1]},${c[2]})`;
      ctx.shadowBlur = (n.flagged ? 18 : 8) * devicePixelRatio;
      ctx.arc(n.x, n.y, n.flagged ? n.r * 1.9 : n.r, 0, Math.PI * 2);
      ctx.fill();
      ctx.shadowBlur = 0;
    });
  }

  function loop() { draw(); if (!reduceMotion) requestAnimationFrame(loop); }

  resize(); makeNodes(); draw();
  if (!reduceMotion) { requestAnimationFrame(loop); setInterval(flagRandomNode, 2600); }

  let resizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => { resize(); makeNodes(); draw(); }, 200);
  });
});