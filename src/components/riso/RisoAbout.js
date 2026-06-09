import { profile } from '@/content/profile';
import { RisoHeading, Label, Press, Stamp, CORAL, TEAL, INK } from './Primitives';

// Each principle stamp gets its own ink so the page reads like layered plates.
const INKS = [CORAL, TEAL, CORAL, TEAL];

export default function RisoAbout() {
  const { about, principles } = profile;

  return (
    <section id="about" className="scroll-mt-20 px-6 py-20 sm:py-28">
      <div className="mx-auto max-w-5xl">
        <Label ink={TEAL}>About</Label>

        {/* Heading + offset narrower bio column (zine asymmetry) */}
        <div className="mt-6 grid gap-8 md:grid-cols-[1fr_1.1fr] md:gap-14">
          <Press>
            <RisoHeading as="h2" ink={CORAL} className="text-4xl font-bold leading-[1.05] sm:text-5xl">
              {about.heading}
            </RisoHeading>
          </Press>

          <Press delay={0.08} className="space-y-5 md:mt-2 md:pl-6">
            {about.body.map((p, i) => (
              <p key={i} className="font-body text-base leading-[1.85] text-[#1a1210]/80 sm:text-lg">
                {p}
              </p>
            ))}
          </Press>
        </div>

        {/* Principles as stamps, each a different ink plate */}
        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {principles.map((p, i) => (
            <Press key={p.title} delay={i * 0.08} rotate={i % 2 === 0 ? -2.5 : 2.5}>
              <Stamp className="h-full p-5">
                <span className="font-display text-2xl font-bold" style={{ color: INKS[i % INKS.length] }}>
                  {`0${i + 1}`}
                </span>
                <h3 className="mt-2 font-display text-xl font-semibold leading-tight text-[#1a1210]">{p.title}</h3>
                <p className="mt-2 font-body text-sm leading-[1.7] text-[#1a1210]/70">{p.body}</p>
              </Stamp>
            </Press>
          ))}
        </div>
      </div>
    </section>
  );
}
