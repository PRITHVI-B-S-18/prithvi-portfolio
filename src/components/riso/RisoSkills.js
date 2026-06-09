import { skills } from '@/content/skills';
import { RisoHeading, Label, Press, Stamp, CORAL, TEAL } from './Primitives';

/**
 * Skills as a type-specimen sheet: each group is a stamp with an ink header
 * and its tools set below, alternating ink plates.
 */
export default function RisoSkills() {
  return (
    <section id="skills" className="scroll-mt-20 px-6 py-20 sm:py-28">
      <div className="mx-auto max-w-5xl">
        <Label ink={CORAL}>The Craft</Label>
        <Press>
          <RisoHeading as="h2" ink={TEAL} className="mt-6 text-4xl font-bold sm:text-5xl">
            Tools in the drawer.
          </RisoHeading>
        </Press>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {skills.map((group, i) => {
            const ink = i % 2 === 0 ? CORAL : TEAL;
            return (
              <Press key={group.group} delay={(i % 3) * 0.07} rotate={i % 2 === 0 ? -1.5 : 1.5} className="h-full">
                <Stamp className="h-full p-5" tilt={false}>
                  <div className="flex items-baseline justify-between border-b border-dashed border-[#1a1210]/30 pb-3">
                    <h3 className="font-display text-xl font-bold text-[#1a1210]">{group.group}</h3>
                    <span aria-hidden="true" style={{ color: ink }}>○</span>
                  </div>
                  <ul className="mt-3 flex flex-wrap gap-x-3 gap-y-1.5">
                    {group.items.map((it) => (
                      <li key={it} className="font-body text-[15px] leading-[1.6] text-[#1a1210]/80">
                        <span aria-hidden="true" className="mr-1.5" style={{ color: ink }}>·</span>
                        {it}
                      </li>
                    ))}
                  </ul>
                </Stamp>
              </Press>
            );
          })}
        </div>
      </div>
    </section>
  );
}
