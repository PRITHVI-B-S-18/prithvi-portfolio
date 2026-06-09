import { experience } from '@/content/experience';
import { RisoHeading, Label, Press, CORAL, TEAL } from './Primitives';

/**
 * Experience as a printed ledger: a ruled ink baseline down the left with ○
 * register marks, each role pressed onto the page like a dated entry.
 */
export default function RisoExperience() {
  return (
    <section id="experience" className="scroll-mt-20 px-6 py-20 sm:py-28">
      <div className="mx-auto max-w-4xl">
        <Label ink={TEAL}>The Path</Label>
        <Press>
          <RisoHeading as="h2" ink={CORAL} className="mt-6 text-4xl font-bold sm:text-5xl">
            How the plates stacked up.
          </RisoHeading>
        </Press>

        <div className="relative mt-12 border-l-[1.5px] border-[#1a1210] pl-8 sm:pl-10">
          {experience.map((e, i) => {
            const ink = i % 2 === 0 ? CORAL : TEAL;
            return (
              <Press key={e.period} delay={i * 0.06} rotate={0} className="relative pb-12 last:pb-0">
                {/* register mark on the baseline */}
                <span
                  className="absolute -left-[42px] top-1 grid h-5 w-5 place-items-center rounded-full text-[11px] sm:-left-[50px]"
                  style={{ backgroundColor: ink, color: '#fff8f0' }}
                  aria-hidden="true"
                >
                  ○
                </span>

                <p className="font-body text-xs font-medium uppercase tracking-[0.18em]" style={{ color: ink }}>
                  {e.period}
                </p>
                <h3 className="mt-1.5 font-display text-2xl font-bold leading-tight text-[#1a1210] sm:text-3xl">
                  {e.role}
                </h3>
                <p className="font-body text-sm text-[#1a1210]/60">
                  {e.org}
                  {e.team ? ` · ${e.team}` : ''}
                </p>
                <p className="mt-3 max-w-2xl font-body text-[15px] leading-[1.8] text-[#1a1210]/80">{e.summary}</p>

                <ul className="mt-3 space-y-1.5">
                  {e.highlights.map((h) => (
                    <li key={h.text} className="flex gap-2.5 font-body text-sm leading-[1.7] text-[#1a1210]/75">
                      <span aria-hidden="true" style={{ color: ink }}>→</span>
                      <span>
                        <span className="font-medium text-[#1a1210]">{h.tag} · </span>
                        {h.text}
                      </span>
                    </li>
                  ))}
                </ul>

                <div className="mt-4 flex flex-wrap gap-1.5">
                  {e.stack.map((t) => (
                    <span key={t} className="border border-[#1a1210]/25 px-2 py-0.5 font-body text-[11px] text-[#1a1210]/60">
                      {t}
                    </span>
                  ))}
                </div>
              </Press>
            );
          })}
        </div>
      </div>
    </section>
  );
}
