import { projects } from '@/content/projects';
import Section from '@/components/layout/Section';
import Reveal from '@/components/ui/Reveal';
import ProjectCard from '@/components/work/ProjectCard';

export default function Work() {
  const featured = projects.filter((p) => p.featured);
  const more = projects.filter((p) => !p.featured);
  return (
    <Section id="work" number="03" title="Selected Work">
      <div className="grid gap-x-10 gap-y-12 sm:grid-cols-2">
        {featured.map((p, i) => (
          <Reveal key={p.slug} delay={(i % 2) * 0.05}>
            <ProjectCard project={p} />
          </Reveal>
        ))}
      </div>
      {more.length > 0 && (
        <div className="mt-16">
          <p className="font-mono text-sm text-muted">More</p>
          <div className="mt-4 flex flex-col gap-2">
            {more.map((p) => (
              <span key={p.slug} className="font-mono text-sm text-ink">
                {p.title} <span className="text-muted">&mdash; {p.tech.slice(0, 3).join(', ')}</span>
              </span>
            ))}
          </div>
        </div>
      )}
    </Section>
  );
}
