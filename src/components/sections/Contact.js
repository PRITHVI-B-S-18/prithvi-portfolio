import { profile } from '@/content/profile';
import Section from '@/components/layout/Section';
import Reveal from '@/components/ui/Reveal';

const linkClass = 'text-ink transition-colors hover:text-accent';

export default function Contact() {
  const { links, resume } = profile;
  return (
    <Section id="contact" number="05" title="Contact">
      <Reveal>
        <p className="max-w-xl font-serif text-2xl text-ink sm:text-3xl">
          Open to interesting problems and collaboration.
        </p>
      </Reveal>
      <Reveal delay={0.1}>
        <div className="mt-8 flex flex-wrap gap-x-8 gap-y-3 font-mono text-sm">
          <a className={linkClass} href={`mailto:${links.email}`}>{links.email}</a>
          <a className={linkClass} href={links.github} target="_blank" rel="noopener noreferrer">GitHub</a>
          <a className={linkClass} href={links.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a>
          <a className={linkClass} href={resume} target="_blank" rel="noopener noreferrer">R&eacute;sum&eacute;</a>
        </div>
      </Reveal>
    </Section>
  );
}
