import { profile } from '@/content/profile';
import Section from './Section';

export default function About() {
  const { about } = profile;
  return (
    <Section id="about" command="cat about.txt" title="about.txt">
      <div className="max-w-2xl space-y-4 text-sm leading-relaxed text-term-fg/75">
        {about.body.map((p, i) => (
          <p key={i}>
            <span className="select-none text-term-dim">{String(i + 1).padStart(2, '0')} │ </span>
            {p}
          </p>
        ))}
        <p className="text-term-dim"># {about.heading}</p>
      </div>
    </Section>
  );
}
