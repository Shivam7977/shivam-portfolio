const root = document.documentElement;

// ---------- Light / dark ----------
const themeBtn = document.getElementById('theme-toggle');
const BG = { light: '#f6f2ea', dark: '#121212' };

function applyTheme(name) {
  root.setAttribute('data-theme', name);
  if (themeBtn) themeBtn.setAttribute('aria-label', name === 'dark' ? 'Switch to light mode' : 'Switch to dark mode');
  const meta = document.querySelector('meta[name="theme-color"]');
  if (meta) meta.setAttribute('content', BG[name]);
}
applyTheme(root.getAttribute('data-theme') || 'light');

if (themeBtn) {
  themeBtn.addEventListener('click', () => {
    const next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    applyTheme(next);
    try { localStorage.setItem('theme', next); } catch (e) { /* storage blocked */ }
  });
}

// ---------- Mobile menu ----------
const toggle = document.querySelector('.nav-toggle');
const links = document.getElementById('nav-links');
function closeMenu() {
  if (!toggle || !links) return;
  toggle.setAttribute('aria-expanded', 'false');
  toggle.setAttribute('aria-label', 'Open menu');
  links.classList.remove('open');
}
if (toggle && links) {
  toggle.addEventListener('click', () => {
    const open = toggle.getAttribute('aria-expanded') === 'true';
    toggle.setAttribute('aria-expanded', String(!open));
    toggle.setAttribute('aria-label', open ? 'Open menu' : 'Close menu');
    links.classList.toggle('open', !open);
  });
  links.querySelectorAll('a').forEach((a) => a.addEventListener('click', closeMenu));
}

// ---------- Active nav link (scroll spy) ----------
const navLinks = Array.from(document.querySelectorAll('.nav-link'));
const targets = navLinks.map((a) => document.querySelector(a.getAttribute('href'))).filter(Boolean);

function setActive() {
  const probe = window.scrollY + 140;
  let current = null;
  targets.forEach((sec) => { if (sec.offsetTop <= probe) current = sec.id; });
  // At the very bottom of the page, highlight the last section
  if (window.innerHeight + window.scrollY >= document.body.scrollHeight - 4) current = targets[targets.length - 1].id;
  navLinks.forEach((a) => {
    const on = a.getAttribute('href') === `#${current}`;
    a.classList.toggle('active', on);
    if (on) a.setAttribute('aria-current', 'true'); else a.removeAttribute('aria-current');
  });
}
window.addEventListener('scroll', setActive, { passive: true });
window.addEventListener('resize', setActive);
setActive();

// ---------- Case study modals ----------
document.querySelectorAll('[data-case]').forEach((btn) =>
  btn.addEventListener('click', () => {
    const dlg = document.getElementById(btn.dataset.case);
    if (dlg && typeof dlg.showModal === 'function') dlg.showModal();
  })
);
document.querySelectorAll('dialog.modal').forEach((dlg) => {
  dlg.querySelector('[data-close]').addEventListener('click', () => dlg.close());
  // Click on the dark backdrop closes it
  dlg.addEventListener('click', (e) => {
    const r = dlg.getBoundingClientRect();
    const inside = e.clientX >= r.left && e.clientX <= r.right && e.clientY >= r.top && e.clientY <= r.bottom;
    if (!inside) dlg.close();
  });
});

// ---------- Copy email ----------
const EMAIL = 'shivamrajeshpandey9136@gmail.com';
const copyBtn = document.getElementById('copy-email');
const copyLabel = document.getElementById('copy-label');
if (copyBtn) {
  copyBtn.addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      copyLabel.textContent = 'Copied!';
    } catch (e) {
      copyLabel.textContent = 'Press and hold the address';
    }
    setTimeout(() => { copyLabel.textContent = 'Copy email'; }, 2200);
  });
}

// ---------- Write email dropdown ----------
const writeBtn = document.getElementById('write-btn');
const writeMenu = document.getElementById('write-menu');
function setMenu(open) {
  writeMenu.hidden = !open;
  writeBtn.setAttribute('aria-expanded', String(open));
}
if (writeBtn && writeMenu) {
  writeBtn.addEventListener('click', (e) => { e.stopPropagation(); setMenu(writeMenu.hidden); });
  document.addEventListener('click', (e) => { if (!writeMenu.contains(e.target)) setMenu(false); });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') setMenu(false); });
}