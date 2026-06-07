import { skills } from '@/content/skills';
import Section from '@/components/layout/Section';
import Reveal from '@/components/ui/Reveal';

export default function Skills() {
  return (
    <Section id="skills" number="04" title="Skills">
      <div className="grid gap-x-10 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
        {skills.map((group, i) => (
          <Reveal key={group.group} delay={(i % 3) * 0.05}>
            <div>
              <h3 className="font-mono text-sm text-accent">{group.group}</h3>
              <ul className="mt-3 space-y-1 text-ink">
                {group.items.map((it) => (
                  <li key={it}>{it}</li>
                ))}
              </ul>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
