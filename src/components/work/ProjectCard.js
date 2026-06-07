import Link from 'next/link';
import Tag from '@/components/ui/Tag';
import SpotlightCard from '@/components/ui/SpotlightCard';

function hueFromSlug(slug) {
  let h = 0;
  for (let i = 0; i < slug.length; i += 1) h = (h * 31 + slug.charCodeAt(i)) % 360;
  return h;
}

const statusStyles = {
  'In Production': 'bg-emerald-500/15 text-emerald-400',
  'In Use': 'bg-accent/15 text-accent',
  Completed: 'bg-sky-500/15 text-sky-400',
};

export default function ProjectCard({ project }) {
  const hue = project.hue ?? hueFromSlug(project.slug);
  const cover = `linear-gradient(135deg, hsl(${hue} 70% 60% / 0.32), hsl(${(hue + 50) % 360} 70% 55% / 0.10) 60%, transparent)`;

  return (
    <Link href={`/work/${project.slug}`} className="block h-full">
      <SpotlightCard
        tilt
        className="flex h-full flex-col rounded-2xl border border-line bg-surface transition-colors duration-300 hover:border-accent/60"
        whileHover={{ y: -6 }}
        transition={{ duration: 0.25 }}
      >
        {/* Gradient cover */}
        <div className="relative h-32 overflow-hidden border-b border-line" style={{ backgroundImage: cover }}>
          <div
            className="absolute inset-0 opacity-[0.07]"
            style={{
              backgroundImage:
                'linear-gradient(rgb(var(--ink)) 1px, transparent 1px), linear-gradient(90deg, rgb(var(--ink)) 1px, transparent 1px)',
              backgroundSize: '22px 22px',
            }}
            aria-hidden="true"
          />
          {project.status && (
            <span className={`absolute left-4 top-4 rounded-full px-2.5 py-0.5 font-mono text-[11px] font-medium ${statusStyles[project.status] || 'bg-surface2 text-muted'}`}>
              {project.status}
            </span>
          )}
          <span className="absolute right-4 top-4 font-mono text-xs text-muted">{project.year}</span>
          <div className="absolute bottom-4 left-5 right-5">
            <h3 className="font-sans text-xl font-bold tracking-tight text-ink/95">{project.title}</h3>
            {project.subtitle && <p className="font-mono text-xs text-muted">{project.subtitle}</p>}
          </div>
        </div>

        {/* Body */}
        <div className="flex flex-1 flex-col p-5">
          <p className="text-sm leading-relaxed text-muted">{project.oneLiner}</p>

          {project.metrics?.length > 0 && (
            <div className="mt-4 flex flex-wrap gap-x-4 gap-y-1">
              {project.metrics.slice(0, 3).map((m) => (
                <span key={m.label} className="font-mono text-xs text-faint">
                  <span className="font-sans font-bold text-gradient">{m.value}</span> {m.label}
                </span>
              ))}
            </div>
          )}

          <div className="mt-4 flex flex-wrap gap-2">
            {project.tech.slice(0, 4).map((t) => (
              <Tag key={t}>{t}</Tag>
            ))}
            {project.tech.length > 4 && (
              <span className="self-center font-mono text-xs text-faint">+{project.tech.length - 4}</span>
            )}
          </div>

          <span className="mt-auto pt-5 font-mono text-xs text-accent">
            View details{' '}
            <span className="inline-block transition-transform duration-200 group-hover/spot:translate-x-1">→</span>
          </span>
        </div>
      </SpotlightCard>
    </Link>
  );
}
