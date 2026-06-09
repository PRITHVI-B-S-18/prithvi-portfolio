import { useState, useEffect } from 'react';
import { profile } from '@/content/profile';

const tabs = [
  { label: 'About', id: 'about' },
  { label: 'Work', id: 'work' },
  { label: 'Path', id: 'experience' },
  { label: 'Craft', id: 'skills' },
  { label: 'Hello', id: 'contact' },
];

/**
 * Paper tab-index navigation: a flat horizontal strip with 1px ink rules
 * between tabs, active tab filled in the primary ink (coral). Becomes a
 * scrollable strip on mobile. Scroll-spy tracks the active section.
 */
export default function RisoNav() {
  const [active, setActive] = useState('home');

  useEffect(() => {
    const ids = ['home', ...tabs.map((t) => t.id)];
    const sections = ids.map((id) => document.getElementById(id)).filter(Boolean);
    if (!sections.length) return undefined;
    const observer = new IntersectionObserver(
      (entries) => {
        const vis = entries.filter((e) => e.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (vis[0]) setActive(vis[0].target.id);
      },
      { rootMargin: '-45% 0px -45% 0px', threshold: [0, 0.5, 1] }
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b-[1.5px] border-[#1a1210] bg-[#fff8f0]">
      <div className="flex items-stretch overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        <a
          href="#home"
          className="flex shrink-0 items-center gap-2 border-r-[1.5px] border-[#1a1210] px-4 py-3 font-display text-lg font-bold tracking-tight text-[#1a1210] sm:px-6"
        >
          <span aria-hidden="true" className="text-coral">○</span>
          {profile.name}
        </a>

        <nav className="flex items-stretch">
          {tabs.map((t) => {
            const isActive = active === t.id;
            return (
              <a
                key={t.id}
                href={`#${t.id}`}
                className={`flex shrink-0 items-center border-r-[1.5px] border-[#1a1210] px-4 py-3 font-body text-sm font-medium uppercase tracking-[0.14em] transition-colors sm:px-5 ${
                  isActive ? 'bg-coral text-[#fff8f0]' : 'text-[#1a1210] hover:bg-[#1a1210]/[0.06]'
                }`}
              >
                {t.label}
              </a>
            );
          })}
        </nav>

        <a
          href={profile.resume}
          target="_blank"
          rel="noopener noreferrer"
          className="ml-auto flex shrink-0 items-center gap-1.5 border-l-[1.5px] border-[#1a1210] bg-teal px-4 py-3 font-body text-sm font-medium uppercase tracking-[0.14em] text-[#1a1210] transition-colors hover:bg-teal/80 sm:px-5"
        >
          Résumé <span aria-hidden="true">↗</span>
        </a>
      </div>
    </header>
  );
}
