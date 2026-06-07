import { experience } from '@/content/experience';
import Section from '@/components/layout/Section';
import Reveal from '@/components/ui/Reveal';
import Tag from '@/components/ui/Tag';

export default function Experience() {
  return (
    <Section id="experience" number="02" title="Experience">
      <ol className="space-y-12">
        {experience.map((job, i) => (
          <Reveal key={`${job.role}-${job.period}`} delay={i * 0.05}>
            <li className="grid gap-4 sm:grid-cols-[10rem_1fr]">
              <div className="font-mono text-sm text-muted">
                <p>{job.period}</p>
                {job.current && (
                  <span className="mt-2 inline-block rounded-full bg-accent/10 px-2 py-0.5 text-xs text-accent">
                    Current
                  </span>
                )}
              </div>
              <div>
                <h3 className="font-serif text-xl text-ink">{job.role}</h3>
                <p className="font-mono text-sm text-muted">
                  {job.org}
                  {job.team ? ` · ${job.team}` : ''}
                </p>
                <p className="mt-3 text-ink">{job.summary}</p>
                {job.highlights.length > 0 && (
                  <ul className="mt-3 list-disc space-y-1 pl-5 text-muted">
                    {job.highlights.map((h, j) => (
                      <li key={j}>{h}</li>
                    ))}
                  </ul>
                )}
                {job.stack.length > 0 && (
                  <div className="mt-4 flex flex-wrap gap-2">
                    {job.stack.map((s) => (
                      <Tag key={s}>{s}</Tag>
                    ))}
                  </div>
                )}
              </div>
            </li>
          </Reveal>
        ))}
      </ol>
    </Section>
  );
}
