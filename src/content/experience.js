export const experience = [
  {
    role: 'Software Engineer',
    org: 'iamneo',
    team: 'Neo Browser team',
    type: 'Current',
    period: 'Feb 2026 - Present',
    current: true,
    summary:
      'Cross-platform Electron lockdown browser for proctored university exams on Windows, macOS, and Linux. Joined the team as an Associate in Feb 2026; promoted to Software Engineer in Apr 2026.',
    highlights: [
      { tag: 'Anti-cheat', text: 'Detected cheating tools that hide their processes and windows by hooking Windows APIs, using direct system calls from a native C++ addon: 0 false positives, under 1% overhead.' },
      { tag: 'Hardening', text: 'Added Linux hook detection, VM detection, and macOS code-signing checks.' },
      { tag: 'Integrity', text: 'Built a dynamic network whitelist, synthetic-input detection, and screenshot blocking to keep students inside the exam.' },
      { tag: 'Updates', text: 'Built a remotely controlled update policy that makes each release mandatory or optional per OS and version range, delivered through AWS S3 + CloudFront.' },
      { tag: 'Platform', text: 'Secured an open real-time notifications service with JWT and Google ID-token auth; fixed Linux Wayland proctoring screenshots in the Angular exam app.' },
      { tag: 'Release', text: 'Shipped 6 production releases (v2.0.5 - v2.0.10) across Windows, macOS, and Linux.' },
    ],
    metrics: [
      { value: '6', label: 'Releases' },
      { value: '3', label: 'Platforms' },
      { value: '0', label: 'False positives' },
    ],
    stack: ['Electron', 'Node.js', 'C++ (Node-API)', 'AWS (S3, CloudFront)', 'Angular', 'GCP Cloud Run', 'Next.js', 'ClickHouse'],
  },
  {
    role: 'Associate - Tech Content',
    org: 'iamneo',
    type: 'Full-time',
    period: 'Sep 2025 - Jan 2026',
    current: false,
    summary:
      'Owned a run of internal products end to end, building AI tooling and full-stack systems used across teams.',
    highlights: [
      { tag: 'AI', text: 'Built AI-powered MCQ generation and transcript-based evaluation systems with Azure OpenAI.' },
      { tag: 'Platforms', text: 'Built operational and analytics dashboards for training and operations teams.' },
      { tag: 'Tooling', text: 'Shipped self-service tools for license, asset, onboarding, and signature management.' },
    ],
    metrics: [
      { value: '8', label: 'Internal tools' },
      { value: 'GPT-4o', label: 'AI stack' },
    ],
    stack: ['React', 'TypeScript', 'FastAPI', 'Flask', 'Azure OpenAI', 'Firebase', 'n8n'],
  },
  {
    role: 'Junior Associate - Program Management',
    org: 'iamneo',
    type: 'Full-time',
    period: 'Jun 2025 - Sep 2025',
    current: false,
    summary:
      'Program-management role building trainer tooling and supporting client institutions on the ground.',
    highlights: [
      { tag: 'Tooling', text: 'Built TrainOps, a trainer-management platform (React, Firebase, Mapbox) for scheduling and GPS-verified attendance.' },
      { tag: 'Clients', text: 'Handled client relationships and provided on-ground support at client locations for training rollouts and operations.' },
    ],
    metrics: [
      { value: 'On-site', label: 'Client support' },
      { value: 'GPS', label: 'Attendance' },
    ],
    stack: ['React', 'Firebase', 'Mapbox', 'NodeMailer'],
  },
  {
    role: 'Trainee - Program Management',
    org: 'iamneo',
    type: 'Promoted',
    period: 'Jan 2025 - Jun 2025',
    current: false,
    summary:
      'Built automation for course operations and supported program-management work.',
    highlights: [
      { tag: 'Automation', text: 'Built a Selenium automation tool for course and test management.' },
      { tag: 'Operations', text: 'Supported program-management workflows across content and trainer teams.' },
      { tag: 'Growth', text: 'Promoted to Junior Associate based on delivery and impact.' },
    ],
    metrics: [
      { value: 'Selenium', label: 'Automation' },
    ],
    stack: ['Python', 'Selenium', 'React', 'FastAPI'],
  },
  {
    role: 'Data Visualization - Virtual Experience',
    org: 'Accenture',
    team: 'via Forage',
    type: 'Internship',
    period: 'Feb 2023 - Mar 2023',
    current: false,
    summary: 'Turned raw datasets into stakeholder-ready visual stories.',
    highlights: [
      { tag: 'Dashboards', text: 'Built 10+ visualization dashboards for stakeholder presentations.' },
    ],
    metrics: [
      { value: '10+', label: 'Dashboards' },
    ],
    stack: ['Python', 'Pandas', 'Matplotlib', 'Plotly'],
  },
];
