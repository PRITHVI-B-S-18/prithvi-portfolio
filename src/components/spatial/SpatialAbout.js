import { profile } from '@/content/profile';
import PerspectiveSection from './PerspectiveSection';
import { SectionMarker, Panel } from './Primitives';
import Reveal, { Stagger, Item } from './Reveal';

/**
 * About at the mid-layer. Bio reads as a spec sheet; principles are thin
 * blueprint panels with volumetric (not shadow-based) depth.
 */
export default function SpatialAbout() {
  const { about, principles, education, currentRole, location } = profile;

  const specs = [
    { k: 'Role', v: currentRole.title },
    { k: 'Org', v: `${currentRole.org} · ${currentRole.team}` },
    { k: 'Education', v: education.degree },
    { k: 'Based', v: location },
  ];

  return (
    <PerspectiveSection id="about" className="mx-auto max-w-6xl px-6 pb-20 pt-10 md:pb-28 md:pt-14">
      <SectionMarker index="01" label="About" />

      <div className="mt-10 grid gap-8 lg:grid-cols-[1.3fr_1fr] lg:gap-10">
        <Reveal>
          <h2 className="font-grotesk text-3xl font-semibold leading-tight tracking-tight text-white sm:text-4xl">
            {about.heading}
          </h2>
          <div className="mt-6 space-y-4 font-plex text-base leading-relaxed text-white/65 sm:text-lg">
            {about.body.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        </Reveal>

        {/* Spec sheet */}
        <Reveal delay={0.1}>
          <Panel className="h-fit p-6">
            <p className="font-grotesk text-[10px] uppercase tracking-[0.3em] text-white/40">Spec sheet</p>
            <dl className="mt-5 divide-y divide-white/8">
              {specs.map((s) => (
                <div key={s.k} className="flex items-baseline justify-between gap-4 py-3">
                  <dt className="font-grotesk text-[11px] uppercase tracking-[0.2em] text-white/40">{s.k}</dt>
                  <dd className="text-right font-plex text-sm text-white">{s.v}</dd>
                </div>
              ))}
            </dl>
          </Panel>
        </Reveal>
      </div>

      {/* Principles */}
      <Stagger className="mt-10 grid gap-px overflow-hidden border border-white/10 bg-white/5 sm:grid-cols-2 lg:grid-cols-4">
        {principles.map((p, i) => (
          <Item key={p.title} className="bg-[#070713] p-6 transition-colors duration-200 hover:bg-[#3b82f6]/[0.04]">
            <span className="font-grotesk text-xs tracking-[0.3em] text-[#3b82f6]">{`0${i + 1}`}</span>
            <h3 className="mt-4 font-grotesk text-base font-semibold text-white">{p.title}</h3>
            <p className="mt-2 font-plex text-sm leading-relaxed text-white/55">{p.body}</p>
          </Item>
        ))}
      </Stagger>
    </PerspectiveSection>
  );
}
