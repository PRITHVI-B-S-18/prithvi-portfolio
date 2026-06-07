export const experience = [
  {
    role: 'Software Engineer',
    org: 'iamneo',
    team: 'Neo Browser team',
    type: 'Current',
    period: 'Apr 2026 - Present',
    current: true,
    summary:
      'Cross-platform secure exam browser built on Electron 32 / Node 20 for Windows, macOS, and Linux.',
    highlights: [
      { tag: 'Telemetry', text: 'Built the telemetry data system that surfaces live session signals during a test.' },
      { tag: 'Networking', text: 'Implemented dynamic network whitelisting for controlled exam environments.' },
      { tag: 'AI', text: 'Shipped AI typing-behavior detection to flag anomalous input.' },
      { tag: 'Hardening', text: 'Delivered a new splash screen alongside security and stability hardening.' },
      { tag: 'Release', text: 'Ran continuous build testing across Windows, macOS, and Linux for every release.' },
    ],
    metrics: [
      { value: '3', label: 'Platforms' },
      { value: 'Electron 32', label: 'Runtime' },
    ],
    stack: ['Electron', 'Node.js', 'JavaScript', 'electron-updater'],
  },
  {
    role: 'Associate - Tech Content',
    org: 'iamneo',
    type: 'Full-time',
    period: 'Sep 2025 - Mar 2026',
    current: false,
    summary:
      'Owned a run of internal products end to end, building AI tooling and full-stack systems adopted across teams.',
    highlights: [
      { tag: 'AI', text: 'Built AI-powered MCQ generation and transcript-based evaluation systems with Azure OpenAI.' },
      { tag: 'Platforms', text: 'Architected operational and analytics dashboards adopted across teams.' },
      { tag: 'Tooling', text: 'Shipped self-service tools for license, asset, and signature management.' },
    ],
    metrics: [
      { value: '8+', label: 'Systems shipped' },
      { value: '40%', label: 'Efficiency gained' },
    ],
    stack: ['React', 'TypeScript', 'FastAPI', 'Azure OpenAI', 'Firebase', 'n8n'],
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
      'Built automation that cut manual setup and supported program-management operations.',
    highlights: [
      { tag: 'Automation', text: 'Built a Selenium automation tool for course and test management.' },
      { tag: 'Operations', text: 'Supported program-management workflows across content and trainer teams.' },
      { tag: 'Growth', text: 'Promoted to Junior Associate based on delivery and impact.' },
    ],
    metrics: [
      { value: '70%', label: 'Setup time cut' },
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
      { tag: 'Dashboards', text: 'Built 10+ advanced visualization dashboards for stakeholder presentations.' },
      { tag: 'Impact', text: 'Improved stakeholder understanding and engagement of the underlying data.' },
    ],
    metrics: [
      { value: '10+', label: 'Dashboards' },
      { value: '20%', label: 'Engagement lift' },
    ],
    stack: ['Python', 'Pandas', 'Matplotlib', 'Plotly'],
  },
];
