# Shivam Pandey — Portfolio

Plain HTML/CSS/JS portfolio. No build step, no framework — open `index.html` directly or deploy as-is.

## Before you deploy

1. **Add your résumé.** Drop your PDF into `assets/resume.pdf` (exact filename). The "Résumé" buttons in the nav, hero, and elsewhere already link to that path — nothing else to change.
2. **Double check the live links** in `index.html` if anything changes later:
   - SkillBridge code: `github.com/Shivam7977/SkillBridge-Platform`
   - SkillBridge live demo: `skillbridge-platform-bszo.onrender.com`
   - Fund Flow code: `github.com/Shivam7977/fund-flow-fraud`
   - Fund Flow notebook: nbviewer link to `01_EDA.ipynb`

## File structure

```
index.html      → all page content/structure
styles.css      → design system (colors, type, layout, responsive rules)
script.js       → nav behavior, hero network animation, contact form
assets/img/     → your profile photo
assets/resume.pdf  → add this yourself (see above)
```

## Deploy options (pick one)

- **Netlify** — drag the whole folder onto app.netlify.com/drop. Done in ~10 seconds.
- **Vercel** — `vercel` CLI in this folder, or import via the Vercel dashboard.
- **GitHub Pages** — push this folder to a repo, enable Pages on the `main` branch.

## Notes

- The tech-stack and social icons use the Devicon font from a CDN — they need an internet connection to render (fine on any real deploy, just won't show if you open the file fully offline).
- The contact form opens the visitor's email client with a pre-filled message (no backend) — if you want real form submissions later, swap in a service like Formspree.
- Animations respect `prefers-reduced-motion` automatically.