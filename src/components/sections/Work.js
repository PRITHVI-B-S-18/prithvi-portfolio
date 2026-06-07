import { motion } from 'framer-motion';
import { projects } from '@/content/projects';
import Section from '@/components/layout/Section';
import Reveal from '@/components/ui/Reveal';
import ProjectCard from '@/components/work/ProjectCard';

export default function Work() {
  const featured = projects.filter((p) => p.featured);
  const more = projects.filter((p) => !p.featured);

  return (
    <Section
      id="work"
      label="Projects"
      title="Things I've shipped."
      subtitle="Production systems and internal tools, mostly built end to end. A few highlights below. Open any for the full story."
    >
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {featured.map((p, i) => (
          <Reveal key={p.slug} delay={(i % 3) * 0.06}>
            <ProjectCard project={p} />
          </Reveal>
        ))}
      </div>

      {more.length > 0 && (
        <Reveal delay={0.1}>
          <div className="mt-12 rounded-2xl border border-line bg-surface p-6 sm:p-8">
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-faint">Also built</p>
            <div className="mt-5 divide-y divide-line">
              {more.map((p, i) => (
                <motion.div
                  key={p.slug}
                  className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 py-3 first:pt-0 last:pb-0"
                  initial={{ opacity: 0, y: 8 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: i * 0.06 }}
                >
                  <span className="font-sans text-base font-medium text-ink">{p.title}</span>
                  <span className="font-mono text-xs text-muted">{p.tech.join(' · ')}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </Reveal>
      )}
    </Section>
  );
}
