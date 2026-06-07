import { experience } from '@/content/experience';
import Section from '@/components/layout/Section';
import Reveal from '@/components/ui/Reveal';
import SpotlightCard from '@/components/ui/SpotlightCard';

const typeStyles = {
  Current: 'bg-accent/15 text-accent',
  Promoted: 'bg-emerald-500/15 text-emerald-400',
  Internship: 'bg-amber-500/15 text-amber-400',
  'Full-time': 'bg-sky-500/15 text-sky-400',
};

export default function Experience() {
  return (
    <Section
      id="experience"
      label="Experience"
      title="How I grew, and what I shipped."
      subtitle="From a virtual data internship to shipping a secure cross-platform product. Three years, mostly one company, compounding ownership."
    >
      <div className="space-y-4">
        {experience.map((job, i) => (
          <Reveal key={`${job.role}-${job.period}`} delay={i * 0.05}>
            <SpotlightCard
              className={`rounded-xl border bg-surface p-5 transition-colors duration-300 sm:p-6 ${
                job.current ? 'border-accent/50' : 'border-line hover:border-accent/40'
              }`}
              whileHover={{ y: -3 }}
              transition={{ duration: 0.2 }}
              radius={300}
            >
              <div className="flex flex-wrap items-start justify-between gap-x-4 gap-y-2">
                <div>
                  <div className="flex flex-wrap items-center gap-2.5">
                    <span className={`rounded-full px-2.5 py-0.5 font-mono text-[11px] font-medium ${typeStyles[job.type] || typeStyles['Full-time']}`}>
                      {job.current && <span className="mr-1.5 inline-block h-1.5 w-1.5 animate-pulse rounded-full bg-accent align-middle" />}
                      {job.type}
                    </span>
                    {job.metrics?.map((m) => (
                      <span key={m.label} className="font-mono text-[11px] text-faint">
                        <span className="font-sans font-bold text-gradient">{m.value}</span> {m.label}
                      </span>
                    ))}
                  </div>
                  <h3 className="mt-3 font-sans text-lg font-semibold text-ink sm:text-xl">{job.role}</h3>
                  <p className="mt-0.5 font-mono text-sm text-muted">
                    {job.org}
                    {job.team ? ` · ${job.team}` : ''}
                  </p>
                </div>
                <span className="shrink-0 font-mono text-xs text-faint">{job.period}</span>
              </div>

              <p className="mt-3 text-sm leading-relaxed text-muted">{job.summary}</p>

              {job.highlights.length > 0 && (
                <ul className="mt-4 grid gap-x-6 gap-y-2 sm:grid-cols-2">
                  {job.highlights.map((h, j) => (
                    <li key={j} className="flex items-baseline gap-2.5 text-sm leading-relaxed">
                      <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-accent" />
                      <span className="text-muted">
                        <span className="text-faint">{h.tag}. </span>
                        {h.text}
                      </span>
                    </li>
                  ))}
                </ul>
              )}

              {job.stack.length > 0 && (
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {job.stack.map((s) => (
                    <span key={s} className="rounded border border-line px-2 py-0.5 font-mono text-[11px] text-muted">
                      {s}
                    </span>
                  ))}
                </div>
              )}
            </SpotlightCard>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
