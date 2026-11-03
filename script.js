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

// ---------- GitHub: live repos and stats (falls back to the static cards in the HTML) ----------
const GH_USER = 'Shivam7977';
const repoList = document.getElementById('repo-list');

async function loadGithub() {
  if (!repoList) return;
  try {
    const [userRes, repoRes] = await Promise.all([
      fetch(`https://api.github.com/users/${GH_USER}`),
      fetch(`https://api.github.com/users/${GH_USER}/repos?sort=pushed&per_page=100`),
    ]);
    if (!userRes.ok || !repoRes.ok) throw new Error('GitHub API unavailable');
    const user = await userRes.json();
    const repos = (await repoRes.json())
      .filter((r) => !r.fork && !r.archived)
      .sort((a, b) => new Date(b.pushed_at) - new Date(a.pushed_at))
      .slice(0, 6);

    document.getElementById('gh-repos').textContent = user.public_repos;
    document.getElementById('gh-followers').textContent = user.followers;
    document.getElementById('gh-stats').hidden = false;

    if (!repos.length) return;
    repoList.replaceChildren(
      ...repos.map((r) => {
        const card = document.createElement('article');
        card.className = 'card repo';
        const a = document.createElement('a');
        a.className = 'ulink mono';
        a.href = r.html_url; a.target = '_blank'; a.rel = 'noopener'; a.textContent = r.name;
        const p = document.createElement('p');
        p.textContent = r.description || 'No description yet.';
        const meta = document.createElement('span');
        meta.className = 'mono meta';
        const when = new Date(r.pushed_at).toLocaleDateString('en-IN', { month: 'short', year: 'numeric' });
        meta.textContent = `${r.language || 'Mixed'} · ${when}`;
        card.append(a, p, meta);
        return card;
      })
    );
  } catch (err) {
    // Rate-limited or offline: the static cards stay and the stats stay hidden.
  }
}
loadGithub();

// ---------- GitHub contribution graph, drawn in the site's dark-orange style ----------
const graphHolder = document.getElementById('gh-graph-holder');

function drawGraph(days) {
  const CELL = 13, GAP = 4, STEP = CELL + GAP;
  const box = document.createElement('div');
  box.className = 'gh-box';
  box.setAttribute('role', 'img');
  box.setAttribute('aria-label', `GitHub contribution graph for ${GH_USER}`);

  const scroll = document.createElement('div'); scroll.className = 'gh-scroll';
  const inner = document.createElement('div'); inner.className = 'gh-inner';
  const months = document.createElement('div'); months.className = 'gh-months';
  const body = document.createElement('div'); body.className = 'gh-body';
  const dayCol = document.createElement('div'); dayCol.className = 'gh-days';
  ['', 'Mon', '', 'Wed', '', 'Fri', ''].forEach((t) => { const s = document.createElement('span'); s.textContent = t; dayCol.append(s); });
  const cells = document.createElement('div'); cells.className = 'gh-cells';

  // Start the first column on a Sunday so rows line up with weekdays
  const first = new Date(days[0].date + 'T00:00:00');
  for (let i = 0; i < first.getDay(); i++) { const pad = document.createElement('i'); pad.className = 'pad'; cells.append(pad); }

  let lastMonth = -1, lastLabelCol = -10;
  days.forEach((d, idx) => {
    const cell = document.createElement('i');
    const lvl = Math.max(0, Math.min(4, d.level | 0));
    if (lvl) cell.className = `l${lvl}`;
    cell.title = `${d.count} contribution${d.count === 1 ? '' : 's'} on ${new Date(d.date + 'T00:00:00').toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}`;
    cells.append(cell);

    const col = Math.floor((first.getDay() + idx) / 7);
    const m = new Date(d.date + 'T00:00:00').getMonth();
    if (m !== lastMonth && col - lastLabelCol >= 3) {
      const label = document.createElement('span');
      label.textContent = new Date(d.date + 'T00:00:00').toLocaleDateString('en-US', { month: 'short' });
      label.style.left = `${col * STEP}px`;
      months.append(label);
      lastLabelCol = col;
    }
    lastMonth = m;
  });

  body.append(dayCol, cells);
  inner.append(months, body);
  scroll.append(inner);

  const legend = document.createElement('div'); legend.className = 'gh-legend';
  legend.append('Less');
  for (let i = 0; i <= 4; i++) { const sw = document.createElement('i'); if (i) sw.className = `l${i}`; legend.append(sw); }
  legend.append('More');

  box.append(scroll, legend);
  graphHolder.replaceChildren(box);
  scroll.scrollLeft = scroll.scrollWidth; // show the most recent weeks first on small screens
}

async function loadGraph() {
  if (!graphHolder) return;
  try {
    const res = await fetch(`https://github-contributions-api.jogruber.de/v4/${GH_USER}?y=last`);
    if (!res.ok) throw new Error('contributions API unavailable');
    const data = await res.json();
    const days = (data.contributions || []).filter((d) => d && d.date).sort((a, b) => a.date.localeCompare(b.date));
    if (days.length < 28) throw new Error('not enough data');
    drawGraph(days);
    const total = (data.total && data.total.lastYear) || days.reduce((n, d) => n + d.count, 0);
    const t = document.getElementById('gh-total');
    if (t) { t.textContent = `${total.toLocaleString('en-IN')} contributions in the last year`; t.hidden = false; }
  } catch (err) {
    // Keep the fallback chart image already in the page.
  }
}
loadGraph();