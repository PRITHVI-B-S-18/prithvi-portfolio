export const profile = {
  name: 'Prithvi B S',
  role: 'Software Engineer',
  positioning: 'Building secure, cross-platform systems and internal tools engineers actually want to use.',
  currentRole: {
    title: 'Software Engineer',
    org: 'iamneo',
    team: 'Neo Browser team',
    since: 'Feb 2026',
  },
  available: true,
  location: 'Coimbatore',
  resume: '/Resume.pdf',
  portrait: '/images/profile/portrait-1.jpg',
  portraitAlt: '/images/profile/portrait-3.jpg',
  links: {
    email: 'prithvikrishna1803@gmail.com',
    github: 'https://github.com/PRITHVI-B-S-18',
    githubLabel: 'github.com/PRITHVI-B-S-18',
    linkedin: 'https://www.linkedin.com/in/prithvi-b-s-453628275',
    linkedinLabel: 'linkedin.com/in/prithvi-b-s',
  },
  education: {
    degree: 'B.Tech, AI & Data Science',
    school: 'Bannari Amman Institute of Technology',
  },
  about: {
    heading: 'I build for the day it breaks.',
    body: [
      "I'm a software engineer drawn to systems that have to survive real use. I build secure desktop apps, internal tools that teams genuinely adopt, and automation that removes manual work without anyone noticing. I care more about the failure modes than the happy path.",
      "Today I work on the Neo Browser team at iamneo, building a cross-platform secure exam browser. My work spans telemetry, network controls, behavior detection, and the kind of cross-OS hardening you only notice once it stops working.",
      "Before this I shipped a run of internal products end to end, from AI evaluation systems and analytics dashboards to scheduling platforms and self-service tools. I grew from a program-management trainee into the engineer who now owns them.",
    ],
  },
  stats: [
    { value: 9, suffix: '+', label: 'Production systems shipped', animate: true },
    { value: 70, suffix: '%', label: 'Manual work removed', animate: true },
    { value: 40, suffix: '%', label: 'Operational efficiency gained', animate: true },
    { value: 3, suffix: '', label: 'Desktop platforms shipped', animate: true },
  ],
  principles: [
    {
      title: "Build like it'll be attacked",
      body: 'Secure systems assume hostile input and untrusted networks. I design for the failure mode first, not last.',
    },
    {
      title: 'Adoption over cleverness',
      body: 'A tool only counts if people use it. I optimize for the path of least friction over the impressive demo.',
    },
    {
      title: 'Automate the dull parts',
      body: "The best automation is invisible. If a task is repetitive, it shouldn't keep needing a human.",
    },
    {
      title: 'Ship on every platform',
      body: 'Windows, macOS, Linux. Software should hold up everywhere, not just on the machine it was built on.',
    },
  ],
};
