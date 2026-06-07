import { profile } from '@/content/profile';
import Section from '@/components/layout/Section';
import Reveal from '@/components/ui/Reveal';
import ContactForm from '@/components/sections/ContactForm';

export default function Contact() {
  const { links, resume } = profile;

  const socials = [
    { label: 'GitHub', value: links.githubLabel, href: links.github },
    { label: 'LinkedIn', value: links.linkedinLabel, href: links.linkedin },
    { label: 'Résumé', value: 'Download PDF', href: resume },
  ];

  return (
    <Section
      id="contact"
      label="Contact"
      title="Let's build something worth building."
      subtitle="Open to interesting problems, collaboration, and roles where the work actually ships."
    >
      <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
        {/* Left: direct contact */}
        <Reveal>
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-line bg-surface px-3 py-1.5 font-mono text-xs text-muted">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
              </span>
              Available for new roles &amp; collaboration
            </span>

            <p className="mt-8 font-mono text-xs uppercase tracking-wider text-faint">Email me directly</p>
            <a
              href={`mailto:${links.email}`}
              className="group mt-2 block break-all font-sans text-2xl font-semibold tracking-tight text-ink transition-colors hover:text-accent sm:text-3xl"
            >
              {links.email}
              <span className="ml-1 inline-block text-accent transition-transform duration-200 group-hover:translate-x-1">→</span>
            </a>

            <div className="mt-10 grid gap-px overflow-hidden rounded-xl border border-line bg-line sm:grid-cols-3">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group bg-surface px-4 py-4 transition-colors hover:bg-surface2"
                >
                  <p className="font-mono text-xs uppercase tracking-wider text-faint">{s.label}</p>
                  <p className="mt-1.5 flex items-center gap-1 font-mono text-sm text-ink">
                    <span className="truncate">{s.value}</span>
                    <span className="text-muted transition-colors group-hover:text-accent">↗</span>
                  </p>
                </a>
              ))}
            </div>

            <p className="mt-6 font-mono text-xs text-faint">
              Based in {profile.location} · Usually replies within a day.
            </p>
          </div>
        </Reveal>

        {/* Right: form with gradient hairline border */}
        <Reveal delay={0.1}>
          <div className="rounded-2xl bg-grad p-px">
            <ContactForm />
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
