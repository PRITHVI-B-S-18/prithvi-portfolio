# Portfolio Redesign — "Editorial Engineer" Design Spec

**Date:** 2026-06-07
**Owner:** Prithvi B S
**Status:** Draft for review

---

## 1. Background & Motivation

The current portfolio (Next.js 13, dark + gradient-orb + glassmorphism + neon aesthetic)
was shared with a third party who copied it. The goal is a **complete rebuild** with a new
visual identity, new structure, and new components, so the result is unmistakably the
owner's and any copy looks obviously derivative.

A second goal is to add a **current Software Engineer experience** (Neo Browser team at
iamneo) and to ground all project descriptions in the **real, verified codebases** found in
the owner's `~/Documents` folder and corroborated by the FY26 performance review.

## 2. Goals

- A brand-new, distinctive, minimalist **editorial** visual identity (the deliberate
  opposite of the copied dark/neon/glass look).
- Feature the **current Software Engineer role** (iamneo · Neo Browser team) prominently.
- Describe each project with **accurate, verified tech stacks** (no invented details).
- Keep the **same stack**: Next.js + Tailwind CSS + static export → Firebase Hosting.
- Fix the old codebase's structural problems (duplicated project data across files).

## 3. Non-Goals

- No new framework or hosting change (staying on Next.js + Tailwind + Firebase).
- No CMS or backend; content stays in-repo as static data.
- No attempt at front-end "code protection"/obfuscation (ineffective for a static site;
  distinctiveness + clear authorship is the real protection).

## 4. Confirmed Decisions

| Decision | Choice |
|---|---|
| Redesign scope | Full rebuild, same stack (Next.js + Tailwind + Firebase) |
| Visual direction | Minimalist editorial |
| Architecture | Single-page scroll + per-project detail pages |
| Current job title | **Software Engineer** · iamneo · Neo Browser team |
| Theme | **Light-first** (paper aesthetic) with dark-mode toggle |
| Accent color | Vermilion / signal-orange (single accent; swappable) |

### Confidentiality guardrails (PUBLIC site)

- **Allowed:** Name "Neo Browser" and "iamneo"; high-level feature descriptions.
- **NOT allowed:**
  - Security vulnerability / attack internals (no CSP/MITM specifics, file paths, attack
    names, exact mitigations).
  - Awards or performance rating (no "Performer of the Month", no "4.73/5").
  - Client institution names (no VIT / Parul / SKG) — refer to "client institutions"
    generically.

## 5. Visual Design System

- **Theme:** Light-first warm off-white "paper" background, near-black ink text; dark-mode
  toggle (`next-themes`). Default light.
- **Typography (3 roles, pinned):**
  - *Display/serif* — **Fraunces** (editorial headlines).
  - *Sans/body* — **Geist** (clean grotesque).
  - *Mono* — **Geist Mono** (technical labels, tags, "code" accents).
  - Loaded via `next/font` (self-hosted, no layout shift).
- **Accent:** one vermilion/signal-orange — pinned to **`#E0512F`**, defined as a single
  CSS/Tailwind token (`--accent`) so it can be swapped in one place.
- **Layout:** editorial grid — big section numerals (`01 / 02 / 03`), hairline rules,
  generous margins, asymmetric composition.
- **Motion:** restrained scroll-triggered text reveals only (Framer Motion). No gradient
  orbs, particle fields, or custom cursor. Honors `prefers-reduced-motion`.
- **Accessibility:** WCAG-AA contrast, keyboard-navigable, semantic landmarks, focus-visible
  states, reduced-motion fallback.

## 6. Information Architecture

Single long-scroll home page with a sticky minimal nav, plus dedicated project detail pages.

```
/                         one long scroll
  01 Hero          name (large), positioning line, current-role line, primary links
  02 About         short bio + 4-stage career arc (generic phrasing), tech summary
  03 Experience    iamneo timeline; current Software Engineer / Neo Browser featured
  04 Selected Work curated project grid -> detail pages
  05 Skills        grouped, scannable
  06 Contact       CTA + email + socials + resume
/work/[slug]       per-project deep dive (problem · build · stack · outcome)
```

Sticky nav anchors: About · Experience · Work · Skills · Contact. Résumé download present
in hero and contact.

## 7. Content Model

A single source of truth under `src/content/` (TypeScript/JS data modules) consumed by both
the home sections and the detail pages — eliminating the old duplication.

- `content/profile.js` — name, positioning line, current role, links, résumé path.
- `content/experience.js` — iamneo timeline entries (role, org, dates, high-level
  highlights). Current entry: **Software Engineer · iamneo · Neo Browser team · 2026 –
  Present** (confirm exact start month; Linear activity begins ~Feb 2026).
- `content/projects.js` — array of project objects, each:
  `{ slug, title, oneLiner, role, year, tech[], highlights[], outcome, links{}, featured }`.
- `content/skills.js` — grouped skill categories.

### Experience content (current role)

> **Software Engineer — iamneo · Neo Browser team · 2026 – Present**
> Cross-platform secure exam browser built on **Electron 32 / Node 20** (Windows, macOS,
> Linux). Delivered: telemetry data system, dynamic network whitelisting, AI typing-behavior
> detection, splash screen and security hardening, and continuous cross-platform build
> testing. *(High-level only; no security internals.)*

Earlier iamneo phases (Content, Program Management, Internal Automation) summarized generically
in About and/or as prior timeline entries — no client names, no ratings/awards.

### Selected Work (curated, verified stacks)

| Slug | Title | One-liner | Verified stack |
|---|---|---|---|
| `neo-browser` | Neo Browser | Secure lockdown exam browser | Electron 32, Bytenode, code-signing, electron-updater, systeminformation |
| `trainer-scorer` | Trainer Scorer | AI student-review evaluation | React 18 · FastAPI · Azure OpenAI GPT-4o · webvtt · Azure Blob · Firebase |
| `mcq-generator` | MCQ Generator | AI MCQ generation pipeline | Flask · n8n · Azure OpenAI · Firebase |
| `trainops` | TrainOps | Trainer scheduling, 3 roles | React · Vite · Firebase · Radix UI · framer-motion · xlsx |
| `lxd-analytics` | LXD Analytics | Ops/training analytics dashboard | React+TS · FastAPI · Recharts · TanStack Table · MS Graph/SharePoint |
| `software-license-manager` | Software License Manager | License tracking & export | React 18 · TypeScript · Firebase · xlsx |
| `asset-manager` | Asset Manager | Asset/inventory management | React+TS · Firebase · Supabase · TanStack Virtual |
| `course-automation` | Course Automation | Selenium course/test ops + reporting | React · FastAPI · Selenium · pandas |

Secondary "More" row (compact, no detail pages required): **Request Manager** (React ·
Firebase · Radix), **Email Signature Generator** (React · Vite · html-to-image).

### Skills (grouped, from real usage)

- **Languages:** JavaScript, TypeScript, Python
- **Frontend:** React, Next.js, Tailwind CSS, Radix UI, Vite
- **Desktop / Systems:** Electron, Node.js
- **Backend:** FastAPI, Flask
- **Cloud / Infra:** Firebase, AWS (S3, CloudFront), Azure, Supabase
- **AI / Automation:** Azure OpenAI, GPT-4o, n8n
- **Tooling:** GitHub, Linear, Cursor, Claude Code, Sentry

## 8. Technical Architecture

- **Framework:** Next.js (latest), `output: 'export'` static build → Firebase Hosting
  (deploy flow unchanged: `npm run build && firebase deploy --only hosting`).
- **Routing:** Pages Router retained for simple static export. Home is a single page
  composed of section components; `/work/[slug]` uses `getStaticPaths` over
  `content/projects.js` (fixes the old client-only dynamic route).
- **Styling:** Tailwind with a tokenized theme (colors, type scale, spacing); design tokens
  in `tailwind.config.js` + CSS variables for light/dark.
- **Fonts:** `next/font` self-hosted.
- **Components (new, focused):**
  - `Layout/` — `SiteNav` (sticky, minimal), `Footer` (authorship/credit), `Section` (numbered wrapper)
  - `sections/` — `Hero`, `About`, `Experience`, `Work`, `Skills`, `Contact`
  - `work/` — `ProjectCard`, `ProjectDetail`
  - `ui/` — `Reveal` (scroll animation), `Tag`, `ThemeToggle`, `Monogram`
- **Reused assets:** existing profile image, BSP monogram/logo, `Resume.pdf`.
- **Images:** `next/image` with `unoptimized: true` (required for static export).

## 9. Authorship / Anti-Copy Measures

Honest scope: a static site's markup is always viewable; no obfuscation is attempted.
Protection comes from distinctiveness + provenance:

- Footer credit ("Designed & built by Prithvi B S") and monogram.
- `LICENSE` file (all rights reserved) + copyright meta.
- Optional: keep source repo private, publish only the built `out/`.

## 10. Out of Scope

- Blog / writing section.
- Analytics integration.
- Internationalization.
- Backend contact form (mailto link only).

## 11. Open Items to Confirm During Review

- Exact start month of the Neo Browser / Software Engineer role (spec assumes ~early 2026).
- Final accent color (vermilion proposed; swappable token).
- Whether to keep the source repo private (recommended) vs. public.
