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

const slugs = projects.map((p) => p.slug);
if (new Set(slugs).size !== slugs.length) {
  throw new Error('content/projects.js: duplicate slug detected');
}
