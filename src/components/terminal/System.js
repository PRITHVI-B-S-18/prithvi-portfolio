import { profile } from '@/content/profile';
import { skills } from '@/content/skills';
import Section from './Section';

const LOGO = ['╭───────────╮', '│  > _      │', '│ portfolio │', '│   v2.6    │', '╰───────────╯'];

function AsciiBox({ title, children, className = '' }) {
  return (
    <div className={`relative border border-term-dim/30 ${className}`}>
      <span className="absolute -top-2.5 left-3 bg-term-bg px-1.5 text-xs text-phosphor">{title}</span>
      <div className="p-4 pt-5">{children}</div>
    </div>
  );
}

function bar(pct) {
  const n = 16;
  const f = Math.round((pct / 100) * n);
  return '█'.repeat(f) + '░'.repeat(n - f);
}

export default function System() {
  const info = [
    ['OS', 'PortfolioOS 2.6 (web)'],
    ['Host', `${profile.currentRole.org} · ${profile.currentRole.team}`],
    ['Shell', 'zsh + framer-motion'],
    ['Editor', 'cursor + claude-code'],
    ['Langs', 'Python · JS/TS · C++'],
    ['Uptime', 'since 2025'],
  ];

  const stat = (i) => profile.stats[i];

  const bars = skills.map((g) => ({
    label: g.group,
    pct: Math.min(48 + g.items.length * 10, 96),
  }));

  return (
    <Section id="system" command="neofetch && htop" title="system">
      <div className="grid gap-5 lg:grid-cols-2">
        {/* neofetch */}
        <AsciiBox title="system.info">
          <div className="flex flex-col gap-4 sm:flex-row">
            <pre className="shrink-0 select-none text-xs leading-tight text-phosphor">{LOGO.join('\n')}</pre>
            <div className="text-sm">
              <div className="text-phosphor">prithvi@portfolio</div>
              <div className="mb-1 text-term-dim">─────────────────</div>
              {info.map(([k, v]) => (
                <div key={k}>
                  <span className="inline-block w-[64px] text-phosphor">{k}:</span>
                  <span className="text-term-fg/85">{v}</span>
                </div>
              ))}
              <div className="mt-2 grid grid-cols-2 gap-x-4 text-xs text-term-fg/75">
                {profile.stats.map((s) => (
                  <div key={s.label}>
                    <span className="text-phosphor">{s.value}{s.suffix}</span> {s.label.toLowerCase()}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </AsciiBox>

        {/* htop-style skill meters */}
        <AsciiBox title="skills.htop">
          <div className="space-y-1.5 text-sm">
            {bars.map((b) => (
              <div key={b.label} className="flex items-center gap-2 whitespace-nowrap">
                <span className="inline-block w-[112px] shrink-0 truncate text-term-fg/80">{b.label}</span>
                <span className="text-phosphor">{bar(b.pct)}</span>
                <span className="w-[36px] text-right text-term-dim">{b.pct}%</span>
              </div>
            ))}
          </div>
          <div className="mt-3 border-t border-term-dim/20 pt-2 text-xs text-term-dim">
            {skills.reduce((n, g) => n + g.items.length, 0)} packages across {skills.length} groups
          </div>
        </AsciiBox>
      </div>
    </Section>
  );
}
