import { motion, useReducedMotion } from 'framer-motion';
import { profile } from '@/content/profile';
import { RisoHeading, Label, CORAL, TEAL, INK, PRESS } from './Primitives';

/**
 * Hero. Type + overlapping inks carry the weight — no photographs. Two ink
 * blobs overlap with mix-blend-multiply to print a third blended color; the
 * name misregisters; a pull quote bleeds past the column edge.
 */
export default function RisoHero() {
  const { name, role, positioning, currentRole, available } = profile;
  const reduce = useReducedMotion();

  const blob = (extra) =>
    reduce
      ? {}
      : {
          initial: { scale: 0, opacity: 0 },
          animate: { scale: 1, opacity: 1 },
          transition: { ...PRESS, delay: extra },
        };

  return (
    <section id="home" className="relative overflow-hidden px-6 pb-20 pt-28 sm:pt-32">
      {/* Overlapping inks — multiply prints the third color where they meet */}
      <div className="pointer-events-none absolute -right-10 -top-4 hidden sm:block" aria-hidden="true">
        <motion.div {...blob(0.1)} className="h-72 w-72 rounded-full" style={{ backgroundColor: CORAL, mixBlendMode: 'multiply' }} />
        <motion.div
          {...blob(0.22)}
          className="-mt-44 ml-24 h-72 w-72 rounded-full"
          style={{ backgroundColor: TEAL, mixBlendMode: 'multiply' }}
        />
      </div>

      <div className="mx-auto max-w-5xl">
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Label ink={CORAL}>Portfolio — {role}</Label>
        </motion.div>

        <motion.div
          initial={reduce ? false : { opacity: 0, scale: 0.9, rotate: -2 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ ...PRESS, delay: 0.08 }}
        >
          <RisoHeading
            as="h1"
            ink={CORAL}
            className="mt-5 font-bold leading-[0.92] tracking-tight"
            style={{ fontSize: 'clamp(3.5rem, 12vw, 9rem)' }}
          >
            {name}
          </RisoHeading>
        </motion.div>

        <motion.p
          initial={reduce ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-8 max-w-xl font-body text-lg leading-[1.85] text-[#1a1210]/80 sm:text-xl"
        >
          {positioning}
        </motion.p>

        {/* CTAs with unicode marks only */}
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-9 flex flex-wrap items-center gap-3"
        >
          <a
            href="#work"
            className="border-[1.5px] border-[#1a1210] bg-coral px-6 py-3 font-body text-sm font-medium uppercase tracking-[0.14em] text-[#fff8f0] transition-transform hover:-translate-y-0.5"
          >
            See the work <span aria-hidden="true">→</span>
          </a>
          <a
            href="#contact"
            className="border-[1.5px] border-[#1a1210] bg-[#fff8f0] px-6 py-3 font-body text-sm font-medium uppercase tracking-[0.14em] text-[#1a1210] transition-transform hover:-translate-y-0.5"
          >
            Say hello <span aria-hidden="true">↗</span>
          </a>
        </motion.div>

        {/* Pull quote that bleeds past the left edge of the column */}
        <motion.blockquote
          initial={reduce ? false : { opacity: 0, x: -16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ ...PRESS, delay: 0.45 }}
          className="relative -ml-3 mt-16 max-w-2xl border-l-4 pl-5 font-display text-2xl font-medium italic leading-snug sm:-ml-4 sm:text-3xl"
          style={{ borderColor: TEAL, color: INK }}
        >
          “I build for the day it breaks — secure systems and the tools teams
          actually want to use.”
        </motion.blockquote>

        <motion.p
          initial={reduce ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-10 font-body text-sm text-[#1a1210]/60"
        >
          {available && <span style={{ color: TEAL }}>○ Open to work</span>} &nbsp;·&nbsp; Currently{' '}
          <span className="font-medium text-[#1a1210]">{currentRole.title}</span> at {currentRole.org}
        </motion.p>
      </div>
    </section>
  );
}
