import { useState } from 'react';
import { projects } from '@/content/projects';
import Section from './Section';

function fileMeta(p, idx) {
  const tech = p.tech.join(' ');
  const ext = /Electron/.test(tech) ? 'app' : /Python|Selenium|Pandas|Matplotlib/.test(tech) ? 'py' : 'tsx';
  const perms = p.featured ? '-rwxr-xr-x' : '-rw-r--r--';
  const sizeK = 60 + (p.oneLiner?.length || 30) * 3 + p.tech.length * 18;
  const size = sizeK > 1024 ? `${(sizeK / 1024).toFixed(1)}M` : `${sizeK}K`;
  const mm = String(((idx * 5) % 12) + 1).padStart(2, '0');
  const dd = String(((idx * 7) % 27) + 1).padStart(2, '0');
  return { perms, size, date: `${p.year}-${mm}-${dd}`, name: `${p.slug}.${ext}` };
}

export default function Projects() {
  const [open, setOpen] = useState(null);
  const list = projects.filter((p) => p.featured !== false);

  return (
    <Section id="projects" command="ls -la ~/projects" title="~/projects">
      <p className="mb-2 text-sm text-term-dim">total {list.length} · click a file to inspect</p>
      <div className="overflow-x-auto">
        <div className="min-w-[520px] text-sm">
          {list.map((p, idx) => {
            const m = fileMeta(p, idx);
            const isOpen = open === p.slug;
            return (
              <div key={p.slug}>
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? null : p.slug)}
                  className="group flex w-full items-baseline gap-3 whitespace-nowrap py-1 text-left"
                >
                  <span className="inline-block w-[92px] text-term-dim">{m.perms}</span>
                  <span className="inline-block w-[60px] text-term-dim">prithvi</span>
                  <span className="inline-block w-[48px] text-right text-term-dim">{m.size}</span>
                  <span className="inline-block w-[96px] text-term-dim">{m.date}</span>
                  <span className="text-term-fg group-hover:bg-phosphor group-hover:text-term-bg">{m.name}</span>
                  <span className="text-term-dim">{isOpen ? '▾' : '▸'}</span>
                  <span className="truncate text-term-dim"># {p.oneLiner}</span>
                </button>

                {isOpen && p.detail && (
                  <div className="mb-3 ml-2 border-l border-phosphor/30 py-2 pl-4 text-sm sm:ml-[92px]">
                    <p className="text-term-fg/80">{p.detail.problem}</p>
                    {p.detail.build?.length > 0 && (
                      <ul className="mt-2 space-y-1 text-term-fg/70">
                        {p.detail.build.map((b, i, arr) => (
                          <li key={b}>
                            <span className="select-none text-term-dim">{i === arr.length - 1 ? '└─ ' : '├─ '}</span>
                            {b}
                          </li>
                        ))}
                      </ul>
                    )}
                    {p.detail.outcome && <p className="mt-2 text-phosphor">→ {p.detail.outcome}</p>}
                    <p className="mt-2 text-xs text-term-dim">{'// '}{p.tech.join(' · ')}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </Section>
  );
}
