import { experience } from '@/content/experience';
import Section from './Section';

export default function Experience() {
  return (
    <Section id="experience" command="cat experience.log" title="experience.log">
      <div className="space-y-7">
        {experience.map((e) => (
          <div key={e.period} className="text-sm">
            <div className="flex flex-wrap items-baseline gap-x-2">
              <span className="text-phosphor">[{e.period}]</span>
              <span className="font-bold text-term-fg">{e.role}</span>
              <span className="text-term-dim">
                @ {e.org}
                {e.team ? ` · ${e.team}` : ''}
              </span>
            </div>
            <ul className="mt-2 space-y-1 text-term-fg/70">
              {e.highlights.map((h, i, arr) => (
                <li key={h.text}>
                  <span className="select-none text-term-dim">{i === arr.length - 1 ? ' └─ ' : ' ├─ '}</span>
                  <span className="text-phosphor">{h.tag}:</span> {h.text}
                </li>
              ))}
            </ul>
            <div className="mt-2 pl-4 text-xs text-term-dim">{'// '}stack: {e.stack.join(' · ')}</div>
          </div>
        ))}
      </div>
    </Section>
  );
}
