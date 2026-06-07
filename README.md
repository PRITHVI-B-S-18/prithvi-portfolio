# Prithvi B S — Portfolio

A minimalist, editorial portfolio. Single-scroll home with per-project detail pages.

## Tech Stack

- Next.js 14 (Pages Router, static export)
- Tailwind CSS 3 with a tokenized light/dark theme
- Framer Motion (restrained scroll reveals)
- Fonts: Fraunces (display) + Geist / Geist Mono
- Hosting: Cloudflare Pages (static `out/`)

## Develop

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # static export to out/
# Deploy: push to GitHub — Cloudflare Pages builds and serves out/ automatically.
```

## Content

All copy lives in `src/content/` (`profile`, `experience`, `projects`, `skills`).
Edit those modules to update the site; project detail pages are generated from
`projects.js`.

© 2026 Prithvi B S. All rights reserved.
