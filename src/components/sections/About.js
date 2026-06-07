import { profile } from '@/content/profile';
import Section from '@/components/layout/Section';
import Reveal from '@/components/ui/Reveal';

export default function About() {
  const { bio, currentRole, education, location } = profile;
  return (
    <Section id="about" number="01" title="About">
      <div className="grid gap-12 sm:grid-cols-[1.4fr_1fr]">
        <Reveal>
          <div className="space-y-5 text-lg leading-relaxed text-ink">
            {bio.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        </Reveal>
        <Reveal delay={0.1}>
          <dl className="space-y-6 font-mono text-sm">
            <div>
              <dt className="text-muted">Now</dt>
              <dd className="mt-1 text-ink">
                {currentRole.title}, {currentRole.org}
              </dd>
            </div>
            <div>
              <dt className="text-muted">Education</dt>
              <dd className="mt-1 text-ink">
                {education.degree}
                <br />
                {education.school}
              </dd>
            </div>
            <div>
              <dt className="text-muted">Based in</dt>
              <dd className="mt-1 text-ink">{location}</dd>
            </div>
          </dl>
        </Reveal>
      </div>
    </Section>
  );
}
