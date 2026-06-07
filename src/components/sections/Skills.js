import { skills } from '@/content/skills';
import Section from '@/components/layout/Section';
import Reveal from '@/components/ui/Reveal';
import SpotlightCard from '@/components/ui/SpotlightCard';

export default function Skills() {
  return (
    <Section
      id="skills"
      label="Skills"
      title="What I work with."
      subtitle="The tools I reach for most, grouped by where they live in the stack."
    >
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {skills.map((group, i) => (
          <Reveal key={group.group} delay={(i % 3) * 0.06}>
            <SpotlightCard
              className="h-full rounded-2xl border border-line bg-surface p-6 transition-colors duration-300"
              whileHover={{ y: -4 }}
              transition={{ duration: 0.25 }}
              radius={220}
            >
              <div className="flex items-center gap-2.5">
                <span className="h-2 w-2 rounded-full" style={{ backgroundColor: group.color }} />
                <h3 className="font-mono text-sm font-medium" style={{ color: group.color }}>
                  {group.group}
                </h3>
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                {group.items.map((it) => (
                  <span
                    key={it}
                    className="rounded-md border px-2.5 py-1 font-mono text-xs text-ink transition-colors"
                    style={{ borderColor: `${group.color}33`, backgroundColor: `${group.color}10` }}
                  >
                    {it}
                  </span>
                ))}
              </div>
            </SpotlightCard>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
