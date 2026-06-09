import { profile } from '@/content/profile';

// Single source of truth for navigable sections (used by the command palette,
// the chrome bar, and the page). `cmd` is shown as the command that "ran".
export const NAV = [
  { id: 'top', label: 'home', cmd: 'cd ~ && whoami' },
  { id: 'about', label: 'about', cmd: 'cat about.txt' },
  { id: 'experience', label: 'experience', cmd: 'cat experience.log' },
  { id: 'projects', label: 'projects', cmd: 'ls -la ~/projects' },
  { id: 'system', label: 'skills · system', cmd: 'neofetch && htop' },
  { id: 'contact', label: 'contact', cmd: 'cat contact.txt' },
];

export const LINKS = [
  { label: 'open résumé', cmd: 'open résumé.pdf', href: profile.resume },
  { label: 'github', cmd: 'xdg-open github', href: profile.links.github },
  { label: 'linkedin', cmd: 'xdg-open linkedin', href: profile.links.linkedin },
  { label: 'send email', cmd: `mail ${profile.links.email}`, href: `mailto:${profile.links.email}` },
];
