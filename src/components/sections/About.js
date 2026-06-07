import Image from 'next/image';
import { profile } from '@/content/profile';
import Section from '@/components/layout/Section';
import Reveal from '@/components/ui/Reveal';
import SpotlightCard from '@/components/ui/SpotlightCard';

function InfoCard({ label, value, sub, accent }) {
  return (
    <SpotlightCard
      className="h-full rounded-2xl border border-line bg-surface p-5 transition-colors duration-300 hover:border-accent/50"
      whileHover={{ y: -4 }}
      transition={{ duration: 0.25 }}
      radius={200}
    >
      <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-faint">{label}</p>
      <p className={`mt-2 font-sans text-base font-semibold ${accent ? 'text-gradient' : 'text-ink'}`}>{value}</p>
      {sub && <p className="mt-1 font-mono text-xs text-muted">{sub}</p>}
    </SpotlightCard>
  );
}

export default function About() {
  const { about, principles, portraitAlt, name, currentRole, education, location } = profile;

  return (
    <Section id="about" label="About" title={about.heading}>
      {/* Portrait + bio (side by side from md up) */}
      <div className="grid gap-4 md:grid-cols-[280px_1fr] lg:grid-cols-[320px_1fr]">
        <Reveal>
          <div className="group relative aspect-[4/5] overflow-hidden rounded-2xl border border-line bg-surface md:h-full md:aspect-auto">
            <Image
              src={portraitAlt}
              alt={name}
              fill
              sizes="(max-width: 768px) 100vw, 320px"
              className="object-cover object-[center_28%] transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-bg via-bg/20 to-transparent" />
            <div className="absolute bottom-5 left-5">
              <p className="font-sans text-lg font-semibold text-ink">{name}</p>
              <p className="font-mono text-xs text-accent">{currentRole.title}</p>
            </div>
            <span className="absolute right-4 top-4 inline-flex items-center gap-1.5 rounded-full border border-line bg-bg/60 px-2.5 py-1 font-mono text-[11px] text-muted backdrop-blur">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400" />
              </span>
              Open to work
            </span>
          </div>
        </Reveal>

        <Reveal delay={0.08}>
          <SpotlightCard className="flex h-full flex-col justify-center rounded-2xl border border-line bg-surface p-6 sm:p-8" radius={420}>
            <div className="space-y-4 text-base leading-relaxed text-muted sm:text-lg sm:leading-relaxed">
              {about.body.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          </SpotlightCard>
        </Reveal>
      </div>

      {/* Info row */}
      <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-3">
        <Reveal>
          <InfoCard label="Currently" value={currentRole.title} sub={`${currentRole.org} · ${currentRole.team}`} accent />
        </Reveal>
        <Reveal delay={0.05}>
          <InfoCard label="Education" value={education.degree} sub={education.school} />
        </Reveal>
        <Reveal delay={0.1}>
          <InfoCard label="Based in" value={location} sub="Remote-friendly" />
        </Reveal>
      </div>

      {/* How I work */}
      <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {principles.map((p, i) => (
          <Reveal key={p.title} delay={(i % 4) * 0.06}>
            <SpotlightCard
              className="h-full rounded-2xl border border-line bg-surface p-5 transition-colors duration-300 hover:border-accent/60"
              whileHover={{ y: -4 }}
              transition={{ duration: 0.25 }}
              radius={200}
            >
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs text-accent">{`0${i + 1}`}</span>
                <span className="h-px flex-1 bg-line" />
              </div>
              <h3 className="mt-3 font-sans text-base font-semibold text-ink">{p.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{p.body}</p>
            </SpotlightCard>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
