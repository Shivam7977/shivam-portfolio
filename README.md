<div align="center">

# Shivam Pandey — Portfolio

**AI/ML Engineer · Final-year B.E. CSE (AI/ML), VIVA Institute of Technology, Mumbai**

Turning messy real-world data into things that actually work — fraud detection pipelines, career platforms, the unglamorous parts included.

[![Live Site](https://img.shields.io/badge/Live-Portfolio-8b5cf6?style=for-the-badge&logo=vercel&logoColor=white)](https://shivam-pandey-ai.netlify.app/)
[![GitHub](https://img.shields.io/badge/GitHub-Shivam7977-22d3ee?style=for-the-badge&logo=github&logoColor=white)](https://github.com/Shivam7977)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-Connect-f472b6?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/shivam-pandey-0336ba336/)
[![Email](https://img.shields.io/badge/Email-Contact-ffb020?style=for-the-badge&logo=gmail&logoColor=white)](mailto:shivamrajeshpandey9136@gmail.com)

</div>

<br>

<div align="center">
<img src="https://img.shields.io/badge/HTML5-E34F26?style=flat-square&logo=html5&logoColor=white" />
<img src="https://img.shields.io/badge/CSS3-1572B6?style=flat-square&logo=css3&logoColor=white" />
<img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=flat-square&logo=javascript&logoColor=black" />
<img src="https://img.shields.io/badge/Vanilla_JS-No_Frameworks-8b5cf6?style=flat-square" />
<img src="https://img.shields.io/badge/Netlify_Forms-00C7B7?style=flat-square&logo=netlify&logoColor=white" />
</div>

<br>

> A dark, glassy, single-page portfolio — built with plain HTML/CSS/JS, no framework overhead. Animated network canvas in the hero, a typed status line, scroll-aware nav, and a working contact form.

---

## ✦ Overview

This repo is the source for my personal portfolio site — where I showcase my work in **machine learning, fraud detection, graph analytics, and LLM-powered applications**, and where recruiters/collaborators can find my projects, skills, and a way to reach me.

| | |
|---|---|
| 🎓 **Education** | B.E. Computer Science & Engineering (AI/ML), VIVA Institute of Technology, Mumbai University — Class of 2027, CGPA 8.82 |
| 🎯 **Status** | Open to AI/ML & Data Science internship opportunities |
| 🧠 **Focus** | Machine Learning · Fraud & Risk · Graph Analytics · LLM Integration · Full-stack (Flask + MongoDB) |

---

## ✦ Sections

| Section | What's in it |
|---|---|
| **Hero** | Animated node-network canvas (nodes pulse red when "flagged" — a nod to fraud detection), typed rotating status line |
| **About** | Intro, education card, focus-area grid (ML, Graph Analytics, Backend, Fraud & Risk, LLM Integration, Frontend) |
| **Skills** | Categorized tech icons — Programming, ML & AI, Backend & Database, Tools |
| **Projects** | [SkillBridge](#) and [Fund Flow Fraud Detection](#) — deep dives below |
| **Achievements** | Certifications (NPTEL, Apna College) and hackathons (SIH, Aarohan 1.0) |
| **GitHub Activity** | Live GitHub stats & streak stats embeds |
| **Contact** | Netlify Forms submission with an automatic `mailto:` fallback if not deployed on Netlify |

---

## ✦ Featured Projects

### 🧩 [SkillBridge](https://github.com/Shivam7977/SkillBridge-Platform)
**AI-powered Career OS for developers** — [Live demo ↗](https://skillbridge-platform-bszo.onrender.com/)

Generates a personalized, stage-by-stage career roadmap and builds your portfolio/resume as you progress.

- AI Mock Interview Room — Mistral AI, adaptive difficulty, XP rewards
- AI-powered roadmap generator with project recommendations
- ATS-friendly resume builder & portfolio generator
- Community hub with XP, streaks, leaderboards, and an admin dashboard

`Flask` · `MongoDB` · `Mistral AI` · `AJAX` · `Tailwind CSS`

### 🕸️ [Fund Flow Fraud Detection](https://github.com/Shivam7977/fund-flow-fraud)
Fraud detection mapped onto India's payment rails (UPI, NEFT, RTGS, IMPS, NACH), built on the PaySim dataset — 6.36M transactions.

- XGBoost + Isolation Forest ensemble with AUC-weighted blending
- **XGBoost AUC: 0.9998** · **Isolation Forest AUC: 0.9105**
- NetworkX graph analytics for fan-out, round-trip & layering detection
- F1-maximized threshold selection on the precision-recall curve

`Python` · `XGBoost` · `Isolation Forest` · `NetworkX` · `Pandas`

---

## ✦ Tech Stack

<table>
<tr>
<td valign="top" width="25%">

**Markup & Style**
- HTML5
- CSS3 (custom properties, no framework)
- Google Fonts — Sora, Inter, IBM Plex Mono

</td>
<td valign="top" width="25%">

**Interactivity**
- Vanilla JavaScript
- Canvas API (hero network animation)
- Web APIs — `matchMedia`, `IntersectionObserver`-style scroll handling

</td>
<td valign="top" width="25%">

**Forms & Deploy**
- Netlify Forms
- `mailto:` fallback for non-Netlify hosting
- Devicon (tech icons)

</td>
<td valign="top" width="25%">

**Embeds**
- github-readme-stats
- github-readme-streak-stats

</td>
</tr>
</table>

---

## ✦ Design Notes

- **Palette** — deep space background (`#060714`) with a violet → cyan gradient accent (`#8b5cf6` → `#22d3ee`), plus pink, amber, and teal used sparingly for category chips.
- **Typography** — Sora for display/headings, Inter for body text, IBM Plex Mono for the terminal-style typed line.
- **Motion** — all animation respects `prefers-reduced-motion`; the hero canvas, typed line, and continuous loops fall back to a static state when reduced motion is requested.
- **Hero visual** — a lightweight particle/network simulation on `<canvas>`, with nodes occasionally "flagged" in red to echo the fraud-detection theme of my work.

---

## ✦ Getting Started

Clone and open locally — no build step required:

```bash
git clone https://github.com/Shivam7977/shivam-portfolio.git
cd shivam-portfolio
```

Then open `index.html` directly in your browser, or serve it locally:

```bash
# Python
python -m http.server 5500

# or with VS Code Live Server extension
```

> **Note:** The contact form posts to Netlify Forms and only works when deployed on Netlify. When run locally or elsewhere, it automatically falls back to opening the visitor's email client via `mailto:`.

### Project Structure

```
.
├── index.html          # Markup — hero, about, skills, projects, achievements, contact
├── styles.css           # Theming (CSS custom properties), layout, components
├── script.js            # Nav scroll state, mobile nav, contact form, typed text, canvas animation
└── assets/
    ├── resume.pdf        # Downloadable résumé
    └── img/
        └── profile.jpg   # Profile photo
```

---

## ✦ Connect

<div align="center">

📍 Mumbai, India

[![GitHub](https://img.shields.io/badge/GitHub-Shivam7977-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/Shivam7977)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-shivam--pandey-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/shivam-pandey-0336ba336/)
[![Gmail](https://img.shields.io/badge/Email-shivamrajeshpandey9136%40gmail.com-D14836?style=for-the-badge&logo=gmail&logoColor=white)](mailto:shivamrajeshpandey9136@gmail.com)

</div>

<br>

<div align="center">
<sub>© 2026 Shivam Pandey · Built with HTML, CSS & vanilla JS</sub>
</div>