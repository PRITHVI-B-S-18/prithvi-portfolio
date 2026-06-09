import { useRef } from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import { profile } from '@/content/profile';
import { CornerTicks } from './Primitives';

/**
 * Hero at z:0. Architectural title block beside a blueprint-framed portrait,
 * over the perspective grid. Coordinate readout + elevation ticks reinforce
 * the technical-drawing language.
 */
export default function SpatialHero() {
  const { name, role, positioning, available, location, currentRole, portrait } = profile;
  const reduce = useReducedMotion();
  const ref = useRef(null);

  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const contentY = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : 90]);
  const portraitY = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : -60]);
  const fade = useTransform(scrollYProgress, [0, 0.85], [1, reduce ? 1 : 0]);

  const rise = (delay = 0) =>
    reduce
      ? {}
      : {
          initial: { opacity: 0, y: 24 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] },
        };

  return (
    <section id="top" ref={ref} className="relative flex min-h-[100svh] items-center">
      <motion.div
        style={{ opacity: fade }}
        className="mx-auto grid w-full max-w-6xl items-center gap-10 px-6 pt-28 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14 lg:pt-20"
      >
        {/* Text column */}
        <motion.div style={{ y: contentY }} className="order-2 lg:order-1">
          <motion.div
            {...rise(0)}
            className="mb-7 flex flex-wrap items-center gap-x-5 gap-y-2 font-grotesk text-[11px] uppercase tracking-[0.26em] text-white/45"
          >
            <span className="text-[#3b82f6]">— {role}</span>
            {available && (
              <span className="inline-flex items-center gap-2">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-70" />
                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400" />
                </span>
                Open to work
              </span>
            )}
            <span>{location}</span>
          </motion.div>

          <motion.h1
            {...rise(0.08)}
            className="font-grotesk font-bold leading-[0.9] tracking-tight text-white"
            style={{ fontSize: 'clamp(2.8rem, 8vw, 6.5rem)' }}
          >
            {name.split(' ').map((word, i) => (
              <span key={word + i} className="mr-[0.16em] inline-block">
                {word}
              </span>
            ))}
          </motion.h1>

          <motion.p {...rise(0.18)} className="mt-6 max-w-lg font-plex text-lg leading-relaxed text-white/70">
            {positioning}
          </motion.p>

          <motion.div {...rise(0.28)} className="mt-9 flex flex-wrap items-center gap-3">
            <motion.a
              href="#work"
              whileHover={reduce ? {} : { scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              className="group inline-flex items-center gap-2 bg-[#3b82f6] px-6 py-3 font-grotesk text-sm font-medium uppercase tracking-[0.16em] text-[#050510] transition-colors hover:bg-[#60a5fa]"
            >
              View work
              <span className="transition-transform group-hover:translate-x-1">→</span>
            </motion.a>
            <motion.a
              href="#contact"
              whileHover={reduce ? {} : { scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              className="inline-flex items-center gap-2 border border-white/15 px-6 py-3 font-grotesk text-sm font-medium uppercase tracking-[0.16em] text-white transition-colors hover:border-[#3b82f6] hover:text-[#3b82f6]"
            >
              Get in touch
            </motion.a>
          </motion.div>

          <motion.div {...rise(0.4)} className="relative mt-12 max-w-sm">
            <CornerTicks />
            <div className="border-l border-[#3b82f6]/40 py-1 pl-5">
              <p className="font-grotesk text-[10px] uppercase tracking-[0.3em] text-white/40">Currently</p>
              <p className="mt-2 font-grotesk text-base font-medium text-white">{currentRole.title}</p>
              <p className="font-plex text-sm text-white/55">
                {currentRole.org} · {currentRole.team}
              </p>
            </div>
          </motion.div>
        </motion.div>

        {/* Portrait column — blueprint-framed */}
        <motion.div
          style={{ y: portraitY }}
          className="order-1 flex justify-center lg:order-2 lg:justify-end"
          initial={reduce ? {} : { opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="relative w-full max-w-[280px] sm:max-w-[320px] lg:max-w-[380px]">
            {/* outer measurement frame */}
            <div className="absolute -inset-3 border border-white/10" aria-hidden="true" />
            <span className="absolute -left-3 -top-3 h-4 w-4 border-l border-t border-[#3b82f6]" aria-hidden="true" />
            <span className="absolute -right-3 -top-3 h-4 w-4 border-r border-t border-[#3b82f6]" aria-hidden="true" />
            <span className="absolute -bottom-3 -left-3 h-4 w-4 border-b border-l border-[#3b82f6]" aria-hidden="true" />
            <span className="absolute -bottom-3 -right-3 h-4 w-4 border-b border-r border-[#3b82f6]" aria-hidden="true" />

            <div className="relative overflow-hidden border border-white/15 bg-[#070713]">
              <Image
                src={portrait}
                alt={name}
                width={1122}
                height={1402}
                priority
                className="h-auto w-full object-cover"
              />
              {/* blueprint grid overlay on the image */}
              <div
                className="pointer-events-none absolute inset-0 opacity-[0.12] mix-blend-screen"
                style={{
                  backgroundImage:
                    'linear-gradient(rgba(59,130,246,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(59,130,246,0.6) 1px, transparent 1px)',
                  backgroundSize: '28px 28px',
                }}
                aria-hidden="true"
              />
              {/* bottom data strip */}
              <div className="absolute inset-x-0 bottom-0 flex items-center justify-between bg-gradient-to-t from-[#050510] to-transparent px-3 pb-2.5 pt-8 font-grotesk text-[9px] uppercase tracking-[0.22em] text-white/55">
                <span>Fig. 01</span>
                <span className="text-[#3b82f6]">{location}</span>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* Scroll cue */}
      {!reduce && (
        <motion.div
          className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 lg:flex"
          animate={{ y: [0, 8, 0], opacity: [0.6, 0.2, 0.6] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
        >
          <span className="font-grotesk text-[10px] uppercase tracking-[0.3em] text-white/40">Descend</span>
          <span className="h-8 w-px bg-gradient-to-b from-[#3b82f6] to-transparent" />
        </motion.div>
      )}
    </section>
  );
}
