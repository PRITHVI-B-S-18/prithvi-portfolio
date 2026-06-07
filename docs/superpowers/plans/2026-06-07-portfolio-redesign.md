# Portfolio Redesign ("Editorial Engineer") Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebuild the portfolio as a minimalist, editorial, single-scroll site on the same app stack (Next.js + Tailwind, static export), deployed to Cloudflare Pages, featuring the current Software Engineer role, a provided studio portrait, and verified project work.

**Architecture:** Next.js (Pages Router, `output: 'export'`) single-page home composed of section components, plus static `/work/[slug]` project detail pages generated from a single content data source. Light-first "paper" theme with a dark-mode toggle (`next-themes`). All copy lives in `src/content/*` data modules so home sections and detail pages share one source of truth.

**Tech Stack:** Next.js 14, React 18, Tailwind CSS 3, Framer Motion 11, next-themes, `next/font` (Fraunces via Google; Geist + Geist Mono via the `geist` package). Static export → Cloudflare Pages.

**Testing approach (read before starting):** This is a static, design-led front end with no existing test runner. Adding a unit-test harness here is over-engineering (YAGNI). The **integration test is the static build**: `npm run build` evaluates every content module and runs `getStaticPaths`, so a broken content shape or slug fails the build loudly. A build-time integrity guard in `content/projects.js` (unique slugs) backs this up. Per-task verification is therefore: `npm run lint` + `npm run build` succeed, and the dev server (`npm run dev`) renders the affected section. Treat "verify" steps as running those commands and confirming the stated expected output.

---

## File Structure

```
next.config.js               MODIFY  static export config (unchanged behavior, build script update)
package.json                 MODIFY  deps + scripts
tailwind.config.js           REPLACE design tokens (colors, fonts, type scale)
postcss.config.js            KEEP
src/styles/globals.css       REPLACE token definitions + base styles (no glassmorphism)
src/content/profile.js       CREATE  name, positioning, links, bio, education, portrait path
src/content/experience.js    CREATE  iamneo timeline (current SWE role first)
src/content/projects.js      CREATE  single source of truth for projects + detail content
src/content/skills.js        CREATE  grouped skills
src/pages/_app.js            REPLACE fonts + ThemeProvider wrapper
src/pages/_document.js       REPLACE html lang + suppressHydrationWarning
src/pages/index.js           REPLACE single-page composition
src/pages/work/[slug].js     CREATE  static project detail pages
src/pages/404.js             CREATE  minimal not-found
src/components/layout/SiteNav.js     CREATE  sticky minimal nav + theme toggle
src/components/layout/Footer.js      CREATE  authorship/credit
src/components/layout/Section.js     CREATE  numbered section wrapper
src/components/sections/Hero.js      CREATE
src/components/sections/About.js     CREATE
src/components/sections/Experience.js CREATE
src/components/sections/Work.js      CREATE
src/components/sections/Skills.js    CREATE
src/components/sections/Contact.js   CREATE
src/components/work/ProjectCard.js   CREATE
src/components/work/ProjectDetail.js CREATE
src/components/ui/Reveal.js          CREATE  scroll-reveal (respects reduced motion)
src/components/ui/Tag.js             CREATE  mono tech chip
src/components/ui/ThemeToggle.js     CREATE
src/components/ui/Monogram.js        CREATE
LICENSE                      CREATE  all-rights-reserved notice
.nvmrc                       CREATE  Node 20 for Cloudflare Pages builds
public/_headers              CREATE  Cloudflare caching + security headers
public/images/profile/portrait-1.jpg  CREATE  optimized portrait (from provided image; PNGs converted)

# DELETED (old structure):
src/pages/about.js, achievements.js, contact.js, experience.js, projects.js, projects/[id].js, skills.js
src/components/Layout/*, Effects/*, Projects/*, UI/*, hooks/*
firebase.json, .firebaserc, .firebase/   (Firebase hosting removed)
```

`jsconfig.json` already maps `@/*` → `src/*`; keep it.

---

## Task 1: Dependencies & build config

**Files:**
- Modify: `package.json`
- Modify: `next.config.js`

- [ ] **Step 1: Replace `package.json` dependency + script blocks**

```json
{
  "name": "prithvi-portfolio",
  "version": "1.0.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint"
  },
  "dependencies": {
    "framer-motion": "^11.3.0",
    "geist": "^1.3.1",
    "next": "^14.2.5",
    "next-themes": "^0.4.6",
    "react": "18.2.0",
    "react-dom": "18.2.0"
  },
  "devDependencies": {
    "autoprefixer": "^10.4.19",
    "eslint": "^8.57.0",
    "eslint-config-next": "^14.2.5",
    "postcss": "^8.4.39",
    "tailwindcss": "^3.4.6"
  }
}
```

Note: `next export` is removed in Next 14; with `output: 'export'`, `next build` writes the static site to `out/`. `sass`, `sass-loader`, `webpack`, and `firebase-tools` are dropped (unused); there is no local `deploy` script — Cloudflare Pages builds on push (Task 1B).

- [ ] **Step 2: Replace `next.config.js`**

```js
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'export',
  images: { unoptimized: true },
  trailingSlash: true,
};

module.exports = nextConfig;
```

- [ ] **Step 3: Install**

Run: `npm install`
Expected: installs without peer-dependency errors; `node_modules/geist` and `node_modules/next` (14.x) present.

- [ ] **Step 4: Commit**

```bash
git add package.json package-lock.json next.config.js
git commit -m "chore: update deps and static-export build config for rebuild"
```

---

## Task 1B: Remove Firebase, add Cloudflare Pages config, optimize portrait

**Files:**
- Delete: `firebase.json`, `.firebaserc` (if present), `.firebase/` directory
- Create: `.nvmrc`
- Create: `public/_headers`
- Optimize: `public/images/profile/portrait-1.png` / `portrait-2.png` → `.jpg` (PNGs already copied into the repo)

- [ ] **Step 1: Remove Firebase artifacts**

Run:
```bash
git rm -f firebase.json
git rm -f .firebaserc 2>/dev/null || true
git rm -r -f .firebase 2>/dev/null || true
rm -rf .firebase
```
Expected: Firebase config and hosting cache removed from the repo.

- [ ] **Step 2: Pin Node version for Cloudflare (`.nvmrc`)**

```
20
```

- [ ] **Step 3: Create `public/_headers` (caching + basic security headers)**

```
/_next/static/*
  Cache-Control: public, max-age=31536000, immutable

/images/*
  Cache-Control: public, max-age=86400

/*
  X-Content-Type-Options: nosniff
  Referrer-Policy: strict-origin-when-cross-origin
```

- [ ] **Step 4: Optimize the provided portraits to web-sized JPEG**

The source PNGs (~1.7–2 MB each) are too heavy for a hero image. Convert to JPEG (max ~1100 px, quality ~82) with macOS `sips`, then drop the PNGs:
```bash
cd public/images/profile
sips -s format jpeg -s formatOptions 82 -Z 1100 portrait-1.png --out portrait-1.jpg
sips -s format jpeg -s formatOptions 82 -Z 1100 portrait-2.png --out portrait-2.jpg
rm portrait-1.png portrait-2.png
cd -
ls -la public/images/profile/portrait-*.jpg
```
Expected: two `.jpg` files, each well under ~300 KB, aspect preserved (~880×1100). If `sips` is unavailable, produce equivalently sized JPEGs at the same paths with any tool.

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "chore: drop Firebase, add Cloudflare Pages config, optimize portrait"
```

---

## Task 2: Design tokens — Tailwind theme + global styles

**Files:**
- Replace: `tailwind.config.js`
- Replace: `src/styles/globals.css`

- [ ] **Step 1: Replace `tailwind.config.js`**

```js
/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: ['./src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        paper: 'var(--paper)',
        ink: 'var(--ink)',
        muted: 'var(--muted)',
        line: 'var(--line)',
        accent: 'var(--accent)',
      },
      fontFamily: {
        serif: ['var(--font-fraunces)', 'Georgia', 'serif'],
        sans: ['var(--font-geist-sans)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-geist-mono)', 'ui-monospace', 'monospace'],
      },
    },
  },
  plugins: [],
};
```

- [ ] **Step 2: Replace `src/styles/globals.css`**

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  --paper: #f7f5f0;
  --ink: #1a1a17;
  --muted: #6b6862;
  --line: #e3ded3;
  --accent: #e0512f;
}

.dark {
  --paper: #14130f;
  --ink: #f2efe8;
  --muted: #9b968c;
  --line: #2b2a23;
  --accent: #ff6a45;
}

html {
  scroll-behavior: smooth;
}

body {
  background-color: var(--paper);
  color: var(--ink);
  -webkit-font-smoothing: antialiased;
  text-rendering: optimizeLegibility;
}

::selection {
  background-color: var(--accent);
  color: var(--paper);
}

@media (prefers-reduced-motion: reduce) {
  html { scroll-behavior: auto; }
}
```

- [ ] **Step 3: Commit**

```bash
git add tailwind.config.js src/styles/globals.css
git commit -m "feat: editorial design tokens (paper/ink/accent, serif+mono fonts)"
```

---

## Task 3: Content data modules (single source of truth)

**Files:**
- Create: `src/content/profile.js`
- Create: `src/content/experience.js`
- Create: `src/content/projects.js`
- Create: `src/content/skills.js`

- [ ] **Step 1: Create `src/content/profile.js`**

```js
export const profile = {
  name: 'Prithvi B S',
  positioning: 'Software Engineer building secure systems.',
  currentRole: {
    title: 'Software Engineer',
    org: 'iamneo',
    team: 'Neo Browser team',
    since: 'Feb 2026',
  },
  location: 'India',
  resume: '/Resume.pdf',
  portrait: '/images/profile/portrait-1.jpg',
  links: {
    email: 'prithvikrishna1803@gmail.com',
    github: 'https://github.com/PRITHVI-B-S-18',
    linkedin: 'https://www.linkedin.com/in/prithvi-b-s-453628275',
  },
  education: {
    degree: 'B.Tech, AI & Data Science',
    school: 'Bannari Amman Institute of Technology',
  },
  bio: [
    "I'm a software engineer who likes building things that have to hold up under real use — secure desktop apps, internal tools teams actually adopt, and automation that quietly removes manual work.",
    "Right now I'm on the Neo Browser team at iamneo, working on a cross-platform secure exam browser: telemetry, network controls, behavior detection, and the kind of cross-OS hardening you only notice when it's missing.",
    "Before that I built a run of internal products end to end — AI evaluation systems, scheduling and analytics dashboards, and a handful of self-service tools — mostly with React, FastAPI, and Firebase.",
  ],
};
```

- [ ] **Step 2: Create `src/content/experience.js`**

```js
export const experience = [
  {
    role: 'Software Engineer',
    org: 'iamneo',
    team: 'Neo Browser team',
    period: 'Feb 2026 — Present',
    current: true,
    summary:
      'Cross-platform secure exam browser built on Electron 32 / Node 20 for Windows, macOS, and Linux.',
    highlights: [
      'Built the telemetry data system that surfaces live session signals during a test.',
      'Implemented dynamic network whitelisting for controlled exam environments.',
      'Shipped AI typing-behavior detection to flag anomalous input.',
      'Delivered a new splash screen alongside security and stability hardening.',
      'Ran continuous build testing across Windows, macOS, and Linux for every release.',
    ],
    stack: ['Electron', 'Node.js', 'JavaScript'],
  },
  {
    role: 'Software Engineer — Internal Automation',
    org: 'iamneo',
    period: '2025 — 2026',
    current: false,
    summary: 'Built internal tools end to end that removed repetitive manual work across teams.',
    highlights: [
      'Shipped AI-assisted MCQ generation and transcript-based evaluation systems.',
      'Built operational dashboards and a trainer-scheduling platform adopted by the team.',
      'Delivered self-service tools for license, asset, and signature management.',
    ],
    stack: ['React', 'FastAPI', 'Flask', 'Firebase', 'n8n', 'Azure OpenAI'],
  },
  {
    role: 'Associate — Program Management',
    org: 'iamneo',
    period: '2025',
    current: false,
    summary: 'Supported client-facing operations and built automations that cut manual effort.',
    highlights: [
      'Delivered course-management and verification automations used by the team.',
    ],
    stack: ['Python', 'Selenium', 'React'],
  },
  {
    role: 'Associate — Content Development',
    org: 'iamneo',
    period: '2024 — 2025',
    current: false,
    summary: 'Authored and quality-checked aptitude and coding assessment content.',
    highlights: [],
    stack: [],
  },
];
```

- [ ] **Step 3: Create `src/content/projects.js`**

```js
export const projects = [
  {
    slug: 'neo-browser',
    title: 'Neo Browser',
    oneLiner: 'Secure, cross-platform lockdown browser for online exams.',
    role: 'Software Engineer',
    year: '2026',
    featured: true,
    tech: ['Electron', 'Node.js', 'Bytenode', 'electron-updater', 'systeminformation'],
    detail: {
      problem:
        'Online assessments need a controlled environment that keeps exams fair across Windows, macOS, and Linux without locking students out when something goes wrong.',
      build: [
        'A telemetry data system that surfaces live session signals during a test.',
        'Dynamic network whitelisting so only approved destinations are reachable mid-exam.',
        'AI typing-behavior detection that flags anomalous input patterns.',
        'A redesigned splash screen plus security and stability hardening passes.',
        'Continuous build testing across all three desktop platforms for every release.',
      ],
      outcome: 'A more stable, secure exam browser shipping reliably to Windows, macOS, and Linux.',
    },
  },
  {
    slug: 'trainer-scorer',
    title: 'Trainer Scorer',
    oneLiner: 'AI evaluation of student project reviews from meeting transcripts.',
    role: 'Full-stack',
    year: '2025',
    featured: true,
    tech: ['React', 'FastAPI', 'Azure OpenAI', 'GPT-4o', 'Azure Blob', 'Firebase'],
    detail: {
      problem: 'Reviewing student project sessions by hand was slow and inconsistent.',
      build: [
        'A pipeline that parses VTT meeting transcripts and scores them against a rubric using Azure OpenAI GPT-4o.',
        'Multi-format report generation (HTML, DOCX, CSV) backed by Azure Blob Storage.',
        'A React front end with real-time status over a FastAPI backend and Firebase storage.',
      ],
      outcome: 'Standardized, rubric-based evaluation that replaced subjective manual review.',
    },
  },
  {
    slug: 'mcq-generator',
    title: 'MCQ Generator',
    oneLiner: 'AI question-generation pipeline with quality control and dual export.',
    role: 'Full-stack',
    year: '2025',
    featured: true,
    tech: ['Flask', 'n8n', 'Azure OpenAI', 'Firebase'],
    detail: {
      problem:
        'Authoring large volumes of high-quality multiple-choice questions consumed significant content-team time.',
      build: [
        'An n8n + Azure OpenAI workflow generating questions across multiple styles and difficulty levels.',
        'A Flask web app with real-time validation and a strict subject/topic/subtopic hierarchy.',
        'Dual output — automatic Google Sheets sync and CSV downloads — with quality-control categorization.',
      ],
      outcome: 'Cut content-creation time substantially while keeping questions consistent.',
    },
  },
  {
    slug: 'trainops',
    title: 'TrainOps',
    oneLiner: 'Trainer scheduling and management with three roles and live sync.',
    role: 'Full-stack',
    year: '2025',
    featured: true,
    tech: ['React', 'Vite', 'Firebase', 'Radix UI', 'Framer Motion', 'xlsx'],
    detail: {
      problem:
        'Coordinating trainers, program managers, and admins across schedules was manual and error-prone.',
      build: [
        'A three-role app (Admin, Program Manager, Trainer) with calendar and matrix schedule views.',
        'Clock-in/out tracking, approvals, and automated email notifications.',
        'PDF and Excel export with real-time Firebase sync and a Radix UI front end.',
      ],
      outcome: 'A scheduling system adopted by the team for day-to-day trainer operations.',
    },
  },
  {
    slug: 'lxd-analytics',
    title: 'LXD Analytics',
    oneLiner: 'Training and operations analytics dashboard with SharePoint sync.',
    role: 'Full-stack',
    year: '2025',
    featured: true,
    tech: ['React', 'TypeScript', 'FastAPI', 'Recharts', 'TanStack Table', 'MS Graph'],
    detail: {
      problem: 'Leadership lacked a clear view of trainer utilization and training operations.',
      build: [
        'A React + TypeScript dashboard with utilization analytics by program, client, date, and trainer.',
        'A FastAPI + Pandas backend with server-side pagination and a raw/transformed data explorer.',
        'Real-time sync with Excel Online / SharePoint via the Microsoft Graph API.',
      ],
      outcome: 'Leadership-level visibility into training operations from a single dashboard.',
    },
  },
  {
    slug: 'software-license-manager',
    title: 'Software License Manager',
    oneLiner: 'Track and assign software licenses across an organization.',
    role: 'Full-stack',
    year: '2025',
    featured: true,
    tech: ['React', 'TypeScript', 'Firebase', 'xlsx'],
    detail: {
      problem: 'There was no central record of which employees held which software licenses.',
      build: [
        'Employee and application management with a department hierarchy and paid/non-paid categories.',
        'Individual and bulk license assignment with flexible Excel/CSV export.',
        'An activity-log audit trail and Firebase-authenticated admin access.',
      ],
      outcome: 'A single source of truth for license assignments and reporting.',
    },
  },
  {
    slug: 'asset-manager',
    title: 'Asset Manager',
    oneLiner: 'Manage employees, laptops, monitors, and other IT assets.',
    role: 'Full-stack',
    year: '2025',
    featured: true,
    tech: ['React', 'TypeScript', 'Firebase', 'Supabase', 'TanStack Virtual'],
    detail: {
      problem: 'IT asset records were scattered and hard to search or export.',
      build: [
        'Twelve built-in sections plus user-defined custom sections and columns.',
        'Full-text search, per-column filters, and virtualized tables for large datasets.',
        'CSV/Excel import and export per section with Firebase-authenticated access.',
      ],
      outcome: 'Centralized, searchable asset tracking for the IT admin team.',
    },
  },
  {
    slug: 'course-automation',
    title: 'Course Automation',
    oneLiner: 'Selenium automation for course and test management with reporting.',
    role: 'Full-stack',
    year: '2025',
    featured: true,
    tech: ['React', 'FastAPI', 'Selenium', 'pandas'],
    detail: {
      problem: 'Course creation and test setup were repetitive, manual, and untracked.',
      build: [
        'Selenium WebDriver automation for course creation and test addition.',
        'A non-intrusive reporting wrapper adding Excel/JSON reports without changing the original scripts.',
        'A React front end with upload, run, and report-viewing tabs over a FastAPI backend.',
      ],
      outcome: 'Repeatable course/test operations with real-time reporting and error tracking.',
    },
  },
  {
    slug: 'request-manager',
    title: 'Request Manager',
    oneLiner: 'Training request submissions with an admin dashboard and export.',
    role: 'Full-stack',
    year: '2025',
    featured: false,
    tech: ['React', 'Firebase', 'Radix UI'],
  },
  {
    slug: 'signature-generator',
    title: 'Email Signature Generator',
    oneLiner: 'Self-service branded email signatures, exported as images.',
    role: 'Full-stack',
    year: '2025',
    featured: false,
    tech: ['React', 'Vite', 'html-to-image'],
  },
];

// Build-time integrity guard: fail the build on duplicate slugs.
const slugs = projects.map((p) => p.slug);
if (new Set(slugs).size !== slugs.length) {
  throw new Error('content/projects.js: duplicate slug detected');
}
```

- [ ] **Step 4: Create `src/content/skills.js`**

```js
export const skills = [
  { group: 'Languages', items: ['JavaScript', 'TypeScript', 'Python'] },
  { group: 'Frontend', items: ['React', 'Next.js', 'Tailwind CSS', 'Radix UI', 'Vite'] },
  { group: 'Desktop / Systems', items: ['Electron', 'Node.js'] },
  { group: 'Backend', items: ['FastAPI', 'Flask'] },
  { group: 'Cloud / Infra', items: ['Firebase', 'AWS (S3, CloudFront)', 'Azure', 'Supabase'] },
  { group: 'AI / Automation', items: ['Azure OpenAI', 'GPT-4o', 'n8n'] },
  { group: 'Tooling', items: ['GitHub', 'Linear', 'Cursor', 'Claude Code', 'Sentry'] },
];
```

- [ ] **Step 5: Commit**

```bash
git add src/content
git commit -m "feat: content data modules (profile, experience, projects, skills)"
```

---

## Task 4: App shell — fonts, theme provider, document

**Files:**
- Replace: `src/pages/_app.js`
- Replace: `src/pages/_document.js`

- [ ] **Step 1: Replace `src/pages/_app.js`**

```jsx
import '@/styles/globals.css';
import { ThemeProvider } from 'next-themes';
import { Fraunces } from 'next/font/google';
import { GeistSans } from 'geist/font/sans';
import { GeistMono } from 'geist/font/mono';

const fraunces = Fraunces({
  subsets: ['latin'],
  variable: '--font-fraunces',
  display: 'swap',
});

export default function App({ Component, pageProps }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
      <div className={`${fraunces.variable} ${GeistSans.variable} ${GeistMono.variable} font-sans`}>
        <Component {...pageProps} />
      </div>
    </ThemeProvider>
  );
}
```

Note: `GeistSans.variable` resolves to `--font-geist-sans` and `GeistMono.variable` to `--font-geist-mono`, matching `tailwind.config.js`.

- [ ] **Step 2: Replace `src/pages/_document.js`**

```jsx
import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="en" suppressHydrationWarning>
      <Head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
```

- [ ] **Step 3: Commit**

```bash
git add src/pages/_app.js src/pages/_document.js
git commit -m "feat: app shell with Fraunces/Geist fonts and light-first theme provider"
```

---

## Task 5: UI primitives

**Files:**
- Create: `src/components/ui/Reveal.js`
- Create: `src/components/ui/Tag.js`
- Create: `src/components/ui/ThemeToggle.js`
- Create: `src/components/ui/Monogram.js`

- [ ] **Step 1: Create `src/components/ui/Reveal.js`**

```jsx
import { motion, useReducedMotion } from 'framer-motion';

export default function Reveal({ children, delay = 0, className = '' }) {
  const reduce = useReducedMotion();
  if (reduce) return <div className={className}>{children}</div>;
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
```

- [ ] **Step 2: Create `src/components/ui/Tag.js`**

```jsx
export default function Tag({ children }) {
  return (
    <span className="inline-block rounded-full border border-line px-3 py-1 font-mono text-xs text-muted">
      {children}
    </span>
  );
}
```

- [ ] **Step 3: Create `src/components/ui/ThemeToggle.js`**

```jsx
import { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';

export default function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  if (!mounted) return <span className="inline-block h-9 w-9" aria-hidden="true" />;

  const isDark = resolvedTheme === 'dark';
  return (
    <button
      type="button"
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-line font-mono text-sm text-ink transition-colors hover:border-accent hover:text-accent"
    >
      {isDark ? '☀' : '☾'}
    </button>
  );
}
```

- [ ] **Step 4: Create `src/components/ui/Monogram.js`**

```jsx
export default function Monogram({ className = '' }) {
  return <span className={`font-serif font-semibold tracking-tight ${className}`}>PBS</span>;
}
```

- [ ] **Step 5: Commit**

```bash
git add src/components/ui
git commit -m "feat: ui primitives (Reveal, Tag, ThemeToggle, Monogram)"
```

---

## Task 6: Layout — Section wrapper, nav, footer

**Files:**
- Create: `src/components/layout/Section.js`
- Create: `src/components/layout/SiteNav.js`
- Create: `src/components/layout/Footer.js`

- [ ] **Step 1: Create `src/components/layout/Section.js`**

```jsx
export default function Section({ id, number, title, children }) {
  return (
    <section id={id} className="mx-auto max-w-5xl px-6 py-24 sm:py-32">
      <header className="mb-12 flex items-baseline gap-4 border-b border-line pb-4">
        <span className="font-mono text-sm text-accent">{number}</span>
        <h2 className="font-serif text-3xl text-ink sm:text-4xl">{title}</h2>
      </header>
      {children}
    </section>
  );
}
```

- [ ] **Step 2: Create `src/components/layout/SiteNav.js`**

```jsx
import Link from 'next/link';
import ThemeToggle from '@/components/ui/ThemeToggle';

const links = [
  { label: 'About', href: '/#about' },
  { label: 'Experience', href: '/#experience' },
  { label: 'Work', href: '/#work' },
  { label: 'Skills', href: '/#skills' },
  { label: 'Contact', href: '/#contact' },
];

export default function SiteNav() {
  return (
    <header className="sticky top-0 z-50 border-b border-line bg-paper/80 backdrop-blur">
      <nav className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
        <Link href="/" className="font-serif text-lg font-semibold text-ink">
          Prithvi B S
        </Link>
        <div className="flex items-center gap-6">
          <ul className="hidden gap-6 sm:flex">
            {links.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  className="font-mono text-sm text-muted transition-colors hover:text-accent"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
          <ThemeToggle />
        </div>
      </nav>
    </header>
  );
}
```

- [ ] **Step 3: Create `src/components/layout/Footer.js`**

```jsx
import Monogram from '@/components/ui/Monogram';
import { profile } from '@/content/profile';

export default function Footer() {
  return (
    <footer className="border-t border-line">
      <div className="mx-auto flex max-w-5xl flex-col items-center gap-2 px-6 py-12 text-center">
        <Monogram className="text-xl text-accent" />
        <p className="font-mono text-xs text-muted">Designed &amp; built by {profile.name}</p>
        <p className="font-mono text-xs text-muted">
          &copy; 2026 {profile.name}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
```

- [ ] **Step 4: Commit**

```bash
git add src/components/layout
git commit -m "feat: layout components (Section, SiteNav, Footer)"
```

---

## Task 7: Section components

**Files:**
- Create: `src/components/sections/Hero.js`
- Create: `src/components/sections/About.js`
- Create: `src/components/sections/Experience.js`
- Create: `src/components/sections/Skills.js`
- Create: `src/components/sections/Contact.js`

- [ ] **Step 1: Create `src/components/sections/Hero.js`**

```jsx
import Image from 'next/image';
import { profile } from '@/content/profile';
import Reveal from '@/components/ui/Reveal';

const linkClass = 'text-ink underline-offset-4 transition-colors hover:text-accent hover:underline';

export default function Hero() {
  const { name, positioning, currentRole, links, resume, portrait } = profile;
  return (
    <section className="mx-auto grid min-h-[88vh] max-w-5xl grid-cols-1 items-center gap-10 px-6 py-24 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16">
      <div className="order-2 lg:order-1">
        <Reveal>
          <p className="font-mono text-sm text-accent">{currentRole.title}</p>
        </Reveal>
        <Reveal delay={0.05}>
          <h1 className="mt-4 font-serif text-5xl leading-[1.05] text-ink sm:text-6xl xl:text-7xl">
            {name}
          </h1>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="mt-6 max-w-xl font-serif text-2xl text-muted sm:text-3xl">{positioning}</p>
        </Reveal>
        <Reveal delay={0.15}>
          <p className="mt-8 font-mono text-sm text-muted">
            Currently {currentRole.title} &middot; {currentRole.org} &middot; {currentRole.team}
          </p>
        </Reveal>
        <Reveal delay={0.2}>
          <div className="mt-10 flex flex-wrap gap-x-6 gap-y-3 font-mono text-sm">
            <a className={linkClass} href={`mailto:${links.email}`}>Email</a>
            <a className={linkClass} href={links.github} target="_blank" rel="noopener noreferrer">GitHub</a>
            <a className={linkClass} href={links.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a>
            <a className={linkClass} href={resume} target="_blank" rel="noopener noreferrer">R&eacute;sum&eacute;</a>
          </div>
        </Reveal>
      </div>

      <Reveal delay={0.1} className="order-1 lg:order-2">
        <div className="relative mx-auto w-full max-w-xs lg:max-w-sm">
          <span
            className="absolute -bottom-3 -right-3 -z-10 h-full w-full rounded-lg bg-accent/15"
            aria-hidden="true"
          />
          <div className="overflow-hidden rounded-lg border border-line">
            <Image
              src={portrait}
              alt={name}
              width={1122}
              height={1402}
              priority
              className="h-auto w-full"
            />
          </div>
        </div>
      </Reveal>
    </section>
  );
}
```

The portrait sits in the right column on desktop (stacked above the text on mobile via `order`). The offset `bg-accent/15` block behind the frame is the editorial accent touch; `next/image` with `unoptimized: true` (set in Task 1) serves the JPEG directly.

- [ ] **Step 2: Create `src/components/sections/About.js`**

```jsx
import { profile } from '@/content/profile';
import Section from '@/components/layout/Section';
import Reveal from '@/components/ui/Reveal';

export default function About() {
  const { bio, currentRole, education, location } = profile;
  return (
    <Section id="about" number="01" title="About">
      <div className="grid gap-12 sm:grid-cols-[1.4fr_1fr]">
        <Reveal>
          <div className="space-y-5 text-lg leading-relaxed text-ink">
            {bio.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        </Reveal>
        <Reveal delay={0.1}>
          <dl className="space-y-6 font-mono text-sm">
            <div>
              <dt className="text-muted">Now</dt>
              <dd className="mt-1 text-ink">
                {currentRole.title}, {currentRole.org}
              </dd>
            </div>
            <div>
              <dt className="text-muted">Education</dt>
              <dd className="mt-1 text-ink">
                {education.degree}
                <br />
                {education.school}
              </dd>
            </div>
            <div>
              <dt className="text-muted">Based in</dt>
              <dd className="mt-1 text-ink">{location}</dd>
            </div>
          </dl>
        </Reveal>
      </div>
    </Section>
  );
}
```

- [ ] **Step 3: Create `src/components/sections/Experience.js`**

```jsx
import { experience } from '@/content/experience';
import Section from '@/components/layout/Section';
import Reveal from '@/components/ui/Reveal';
import Tag from '@/components/ui/Tag';

export default function Experience() {
  return (
    <Section id="experience" number="02" title="Experience">
      <ol className="space-y-12">
        {experience.map((job, i) => (
          <Reveal key={`${job.role}-${job.period}`} delay={i * 0.05}>
            <li className="grid gap-4 sm:grid-cols-[10rem_1fr]">
              <div className="font-mono text-sm text-muted">
                <p>{job.period}</p>
                {job.current && (
                  <span className="mt-2 inline-block rounded-full bg-accent/10 px-2 py-0.5 text-xs text-accent">
                    Current
                  </span>
                )}
              </div>
              <div>
                <h3 className="font-serif text-xl text-ink">{job.role}</h3>
                <p className="font-mono text-sm text-muted">
                  {job.org}
                  {job.team ? ` · ${job.team}` : ''}
                </p>
                <p className="mt-3 text-ink">{job.summary}</p>
                {job.highlights.length > 0 && (
                  <ul className="mt-3 list-disc space-y-1 pl-5 text-muted">
                    {job.highlights.map((h, j) => (
                      <li key={j}>{h}</li>
                    ))}
                  </ul>
                )}
                {job.stack.length > 0 && (
                  <div className="mt-4 flex flex-wrap gap-2">
                    {job.stack.map((s) => (
                      <Tag key={s}>{s}</Tag>
                    ))}
                  </div>
                )}
              </div>
            </li>
          </Reveal>
        ))}
      </ol>
    </Section>
  );
}
```

- [ ] **Step 4: Create `src/components/sections/Skills.js`**

```jsx
import { skills } from '@/content/skills';
import Section from '@/components/layout/Section';
import Reveal from '@/components/ui/Reveal';

export default function Skills() {
  return (
    <Section id="skills" number="04" title="Skills">
      <div className="grid gap-x-10 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
        {skills.map((group, i) => (
          <Reveal key={group.group} delay={(i % 3) * 0.05}>
            <div>
              <h3 className="font-mono text-sm text-accent">{group.group}</h3>
              <ul className="mt-3 space-y-1 text-ink">
                {group.items.map((it) => (
                  <li key={it}>{it}</li>
                ))}
              </ul>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
```

- [ ] **Step 5: Create `src/components/sections/Contact.js`**

```jsx
import { profile } from '@/content/profile';
import Section from '@/components/layout/Section';
import Reveal from '@/components/ui/Reveal';

const linkClass = 'text-ink transition-colors hover:text-accent';

export default function Contact() {
  const { links, resume } = profile;
  return (
    <Section id="contact" number="05" title="Contact">
      <Reveal>
        <p className="max-w-xl font-serif text-2xl text-ink sm:text-3xl">
          Open to interesting problems and collaboration.
        </p>
      </Reveal>
      <Reveal delay={0.1}>
        <div className="mt-8 flex flex-wrap gap-x-8 gap-y-3 font-mono text-sm">
          <a className={linkClass} href={`mailto:${links.email}`}>{links.email}</a>
          <a className={linkClass} href={links.github} target="_blank" rel="noopener noreferrer">GitHub</a>
          <a className={linkClass} href={links.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a>
          <a className={linkClass} href={resume} target="_blank" rel="noopener noreferrer">R&eacute;sum&eacute;</a>
        </div>
      </Reveal>
    </Section>
  );
}
```

- [ ] **Step 6: Commit**

```bash
git add src/components/sections
git commit -m "feat: hero, about, experience, skills, contact sections"
```

---

## Task 8: Work section + project card

**Files:**
- Create: `src/components/work/ProjectCard.js`
- Create: `src/components/sections/Work.js`

- [ ] **Step 1: Create `src/components/work/ProjectCard.js`**

```jsx
import Link from 'next/link';
import Tag from '@/components/ui/Tag';

export default function ProjectCard({ project }) {
  const inner = (
    <article className="group flex h-full flex-col border-t border-line pt-5 transition-colors hover:border-accent">
      <div className="flex items-baseline justify-between gap-4">
        <h3 className="font-serif text-xl text-ink transition-colors group-hover:text-accent">
          {project.title}
        </h3>
        <span className="font-mono text-xs text-muted">{project.year}</span>
      </div>
      <p className="mt-2 text-muted">{project.oneLiner}</p>
      <div className="mt-4 flex flex-wrap gap-2">
        {project.tech.slice(0, 5).map((t) => (
          <Tag key={t}>{t}</Tag>
        ))}
      </div>
      {project.featured && (
        <span className="mt-4 font-mono text-xs text-accent">Read more &rarr;</span>
      )}
    </article>
  );

  return project.featured ? (
    <Link href={`/work/${project.slug}`} className="block h-full">
      {inner}
    </Link>
  ) : (
    <div className="h-full">{inner}</div>
  );
}
```

- [ ] **Step 2: Create `src/components/sections/Work.js`**

```jsx
import { projects } from '@/content/projects';
import Section from '@/components/layout/Section';
import Reveal from '@/components/ui/Reveal';
import ProjectCard from '@/components/work/ProjectCard';

export default function Work() {
  const featured = projects.filter((p) => p.featured);
  const more = projects.filter((p) => !p.featured);
  return (
    <Section id="work" number="03" title="Selected Work">
      <div className="grid gap-x-10 gap-y-12 sm:grid-cols-2">
        {featured.map((p, i) => (
          <Reveal key={p.slug} delay={(i % 2) * 0.05}>
            <ProjectCard project={p} />
          </Reveal>
        ))}
      </div>
      {more.length > 0 && (
        <div className="mt-16">
          <p className="font-mono text-sm text-muted">More</p>
          <div className="mt-4 flex flex-col gap-2">
            {more.map((p) => (
              <span key={p.slug} className="font-mono text-sm text-ink">
                {p.title} <span className="text-muted">&mdash; {p.tech.slice(0, 3).join(', ')}</span>
              </span>
            ))}
          </div>
        </div>
      )}
    </Section>
  );
}
```

- [ ] **Step 3: Commit**

```bash
git add src/components/work/ProjectCard.js src/components/sections/Work.js
git commit -m "feat: selected work section with project cards"
```

---

## Task 9: Home page composition + remove old pages/components

**Files:**
- Replace: `src/pages/index.js`
- Delete: `src/pages/about.js`, `src/pages/achievements.js`, `src/pages/contact.js`, `src/pages/experience.js`, `src/pages/projects.js`, `src/pages/projects/[id].js`, `src/pages/skills.js`
- Delete: `src/components/Layout/`, `src/components/Effects/`, `src/components/Projects/`, `src/components/UI/`, `src/components/hooks/`

- [ ] **Step 1: Replace `src/pages/index.js`**

```jsx
import Head from 'next/head';
import SiteNav from '@/components/layout/SiteNav';
import Footer from '@/components/layout/Footer';
import Hero from '@/components/sections/Hero';
import About from '@/components/sections/About';
import Experience from '@/components/sections/Experience';
import Work from '@/components/sections/Work';
import Skills from '@/components/sections/Skills';
import Contact from '@/components/sections/Contact';

export default function Home() {
  return (
    <>
      <Head>
        <title>Prithvi B S — Software Engineer</title>
        <meta
          name="description"
          content="Prithvi B S — Software Engineer building secure systems. Currently on the Neo Browser team at iamneo."
        />
        <meta property="og:title" content="Prithvi B S — Software Engineer" />
        <meta
          property="og:description"
          content="Software Engineer building secure systems. Neo Browser team at iamneo."
        />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="/images/profile/portrait-1.jpg" />
      </Head>
      <SiteNav />
      <main>
        <Hero />
        <About />
        <Experience />
        <Work />
        <Skills />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
```

- [ ] **Step 2: Delete old pages and components**

Run:
```bash
git rm src/pages/about.js src/pages/achievements.js src/pages/contact.js \
       src/pages/experience.js src/pages/projects.js src/pages/projects/[id].js \
       src/pages/skills.js
git rm -r src/components/Layout src/components/Effects src/components/Projects \
          src/components/UI src/components/hooks
```
Expected: files removed; `src/pages/projects/` directory becomes empty and is dropped by git.

- [ ] **Step 3: Verify build (first full build of the new site)**

Run: `npm run build`
Expected: build succeeds; `out/index.html` is generated. No "module not found" for old imports.

- [ ] **Step 4: Verify in dev**

Run: `npm run dev` then open `http://localhost:3000`
Expected: single-page site renders Hero → About → Experience → Work → Skills → Contact; nav anchors scroll; theme toggle switches light/dark.

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "feat: single-page home composition; remove old pages/components"
```

---

## Task 10: Project detail pages

**Files:**
- Create: `src/components/work/ProjectDetail.js`
- Create: `src/pages/work/[slug].js`

- [ ] **Step 1: Create `src/components/work/ProjectDetail.js`**

```jsx
import Link from 'next/link';
import Tag from '@/components/ui/Tag';

export default function ProjectDetail({ project }) {
  const { title, oneLiner, role, year, tech, detail } = project;
  return (
    <article className="mx-auto max-w-3xl px-6 py-24">
      <Link href="/#work" className="font-mono text-sm text-muted transition-colors hover:text-accent">
        &larr; Work
      </Link>
      <h1 className="mt-8 font-serif text-4xl text-ink sm:text-5xl">{title}</h1>
      <p className="mt-4 text-xl text-muted">{oneLiner}</p>
      <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2 font-mono text-sm text-muted">
        {role && <span>{role}</span>}
        {year && <span>{year}</span>}
      </div>
      <div className="mt-6 flex flex-wrap gap-2">
        {tech.map((t) => (
          <Tag key={t}>{t}</Tag>
        ))}
      </div>

      {detail?.problem && (
        <section className="mt-12">
          <h2 className="font-mono text-sm text-accent">Problem</h2>
          <p className="mt-3 text-lg leading-relaxed text-ink">{detail.problem}</p>
        </section>
      )}
      {detail?.build?.length > 0 && (
        <section className="mt-10">
          <h2 className="font-mono text-sm text-accent">What I built</h2>
          <ul className="mt-3 list-disc space-y-2 pl-5 text-ink">
            {detail.build.map((b, i) => (
              <li key={i}>{b}</li>
            ))}
          </ul>
        </section>
      )}
      {detail?.outcome && (
        <section className="mt-10">
          <h2 className="font-mono text-sm text-accent">Outcome</h2>
          <p className="mt-3 text-lg leading-relaxed text-ink">{detail.outcome}</p>
        </section>
      )}
    </article>
  );
}
```

- [ ] **Step 2: Create `src/pages/work/[slug].js`**

```jsx
import Head from 'next/head';
import { projects } from '@/content/projects';
import SiteNav from '@/components/layout/SiteNav';
import Footer from '@/components/layout/Footer';
import ProjectDetail from '@/components/work/ProjectDetail';

export async function getStaticPaths() {
  return {
    paths: projects.filter((p) => p.featured).map((p) => ({ params: { slug: p.slug } })),
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const project = projects.find((p) => p.slug === params.slug) || null;
  if (!project) return { notFound: true };
  return { props: { project } };
}

export default function WorkPage({ project }) {
  return (
    <>
      <Head>
        <title>{`${project.title} — Prithvi B S`}</title>
        <meta name="description" content={project.oneLiner} />
      </Head>
      <SiteNav />
      <main>
        <ProjectDetail project={project} />
      </main>
      <Footer />
    </>
  );
}
```

- [ ] **Step 3: Verify static generation**

Run: `npm run build`
Expected: build succeeds and emits one HTML file per featured slug, e.g. `out/work/neo-browser/index.html`, `out/work/trainer-scorer/index.html` (8 total). The two non-featured projects produce no page (no card links to them).

- [ ] **Step 4: Verify in dev**

Run: `npm run dev`, open `http://localhost:3000`, click a featured project card.
Expected: navigates to `/work/<slug>`, shows Problem / What I built / Outcome; "← Work" returns to the work section.

- [ ] **Step 5: Commit**

```bash
git add src/components/work/ProjectDetail.js src/pages/work
git commit -m "feat: static project detail pages from content source"
```

---

## Task 11: 404, LICENSE, favicon, final export verification

**Files:**
- Create: `src/pages/404.js`
- Create: `LICENSE`
- Verify: `public/favicon.svg`, `public/Resume.pdf`; confirm no `firebase.json` remains

- [ ] **Step 1: Create `src/pages/404.js`**

```jsx
import Head from 'next/head';
import Link from 'next/link';
import SiteNav from '@/components/layout/SiteNav';
import Footer from '@/components/layout/Footer';

export default function NotFound() {
  return (
    <>
      <Head>
        <title>Not found — Prithvi B S</title>
      </Head>
      <SiteNav />
      <main className="mx-auto flex min-h-[60vh] max-w-5xl flex-col justify-center px-6">
        <p className="font-mono text-sm text-accent">404</p>
        <h1 className="mt-4 font-serif text-4xl text-ink sm:text-5xl">Page not found</h1>
        <p className="mt-4 text-muted">That page doesn&apos;t exist.</p>
        <Link href="/" className="mt-8 font-mono text-sm text-ink transition-colors hover:text-accent">
          &larr; Home
        </Link>
      </main>
      <Footer />
    </>
  );
}
```

- [ ] **Step 2: Create `LICENSE`**

```
Copyright (c) 2026 Prithvi B S. All rights reserved.

This source code and design are the property of Prithvi B S. No permission is
granted to copy, reuse, redistribute, or create derivative works from this
repository, in whole or in part, without prior written consent.
```

- [ ] **Step 3: Confirm assets exist**

Run: `ls public/favicon.svg public/Resume.pdf`
Expected: both exist (carried over from the old site). If `Resume.pdf` is outdated, replace the file in `public/` (same path) — no code change needed.

- [ ] **Step 4: Confirm Cloudflare Pages settings (documentation, no code change)**

Cloudflare Pages → Create project → connect the GitHub repo, then set **Build command** `npm run build`, **Build output directory** `out`, and **Node version** 20 (picked up from `.nvmrc`). Confirm no `firebase.json` remains in the repo (removed in Task 1B). Deployment is automatic on push to the connected branch.

- [ ] **Step 5: Lint + full production build**

Run: `npm run lint`
Expected: no errors.

Run: `npm run build`
Expected: succeeds; `out/` contains `index.html`, `404.html`, and `work/<slug>/index.html` for all 8 featured projects.

- [ ] **Step 6: Commit**

```bash
git add src/pages/404.js LICENSE
git commit -m "feat: 404 page, license, final export verification"
```

---

## Task 12: README refresh

**Files:**
- Modify: `README.md`

- [ ] **Step 1: Replace `README.md` body** to describe the rebuilt site

```markdown
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
```

- [ ] **Step 2: Commit**

```bash
git add README.md
git commit -m "docs: update README for the rebuilt portfolio"
```

---

## Self-Review (completed by plan author)

**1. Spec coverage:**
- Full rebuild, same app stack → Tasks 1, 9 (Next 14 + Tailwind, static export). ✓
- Minimalist editorial, light-first, vermilion accent, Fraunces/Geist/Geist Mono → Tasks 2, 4. ✓
- Single-page + detail pages → Tasks 9, 10. ✓
- Current Software Engineer role (Feb 2026, Neo Browser, iamneo) → Task 3 (`experience.js`, `profile.js`). ✓
- Confidentiality (name Neo Browser + iamneo; no awards/rating, no client names, no security internals) → Task 3 content honors all guardrails (no POM/4.73, no VIT/Parul/SKG, high-level Neo Browser only). ✓
- Verified project stacks, curated 8 + 2 "More" → Task 3 `projects.js` + Task 8. ✓
- Grouped skills → Task 3 `skills.js` + Task 7. ✓
- Single source of truth / no duplication → Task 3 (shared `content/`), consumed by sections and `[slug].js`. ✓
- Restrained motion + reduced-motion → Task 5 `Reveal.js`, Task 2 CSS. ✓
- Authorship/anti-copy → Task 6 Footer + Task 11 LICENSE. ✓
- Hosting on Cloudflare Pages, Firebase removed → Task 1 (no firebase-tools/deploy script), Task 1B (delete firebase files, add `.nvmrc` + `_headers`), Task 11 Step 4 (Cloudflare settings), Task 12 README. ✓
- Provided portrait used as framed Hero block + optimized → Task 1B Step 4 (optimize), Task 3 (`profile.portrait`), Task 7 Hero (next/image two-column). ✓

**2. Placeholder scan:** No "TBD"/"add error handling"/"similar to" placeholders; all steps contain full code. Contact links, education, and project data are real (sourced from the existing site and verified repos).

**3. Type/name consistency:** `profile`, `experience`, `projects`, `skills` named exports used consistently. Component props match definitions: `Section({id,number,title,children})`, `Reveal({children,delay,className})`, `Tag({children})`, `ProjectCard({project})`, `ProjectDetail({project})`, `Monogram({className})`. Tailwind token classes (`paper/ink/muted/line/accent`, `font-serif/sans/mono`) defined in Task 2 and used throughout. `GeistSans.variable`/`GeistMono.variable` (`--font-geist-sans`/`--font-geist-mono`) match `tailwind.config.js`.
