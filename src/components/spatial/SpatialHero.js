import { useRef } from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import { profile } from '@/content/profile';
import { MailIcon, GitHubIcon, LinkedInIcon } from '@/components/ui/Icons';
import { CornerTicks } from './Primitives';
import MagneticButton from './MagneticButton';

/**
 * Hero at z:0. Architectural title block beside a blueprint-framed portrait,
 * over the perspective grid. Coordinate readout + elevation ticks reinforce
 * the technical-drawing language.
 */
export default function SpatialHero() {
  const { name, role, positioning, available, location, currentRole, portrait, links } = profile;
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
    <section id="top" ref={ref} className="relative flex min-h-[100svh] items-start lg:items-center">
      {/* Blueprint alignment guides — draw themselves in like a drafting setup */}
      {!reduce && (
        <div className="pointer-events-none absolute inset-0 hidden lg:block" aria-hidden="true">
          <motion.div
            className="absolute left-[8%] top-0 h-full w-px origin-top bg-[#3b82f6]/15"
            initial={{ scaleY: 0 }}
            animate={{ scaleY: 1 }}
            transition={{ duration: 1.1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          />
          <motion.div
            className="absolute right-[12%] top-0 h-full w-px origin-bottom bg-[#3b82f6]/10"
            initial={{ scaleY: 0 }}
            animate={{ scaleY: 1 }}
            transition={{ duration: 1.1, delay: 0.45, ease: [0.22, 1, 0.36, 1] }}
          />
          <motion.div
            className="absolute inset-x-0 top-[28%] h-px origin-left bg-white/[0.06]"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1.3, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
          />
          {/* corner coordinate marker */}
          <motion.span
            className="absolute left-[8%] top-[28%] -ml-1 -mt-1 h-2 w-2 rounded-full bg-[#3b82f6]"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: 'spring', stiffness: 300, damping: 16, delay: 1.4 }}
          />
        </div>
      )}

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

          <h1
            className="font-grotesk font-bold leading-[0.9] tracking-tight text-white"
            style={{ fontSize: 'clamp(2.8rem, 8vw, 6.5rem)' }}
            aria-label={name}
          >
            {name.split(' ').map((word, wi) => (
              <span key={word + wi} className="mr-[0.16em] inline-block whitespace-nowrap" aria-hidden="true">
                {word.split('').map((ch, ci) => (
                  <motion.span
                    key={ch + ci}
                    className="inline-block"
                    initial={reduce ? false : { opacity: 0, y: '0.5em', rotateX: -90 }}
                    animate={{ opacity: 1, y: 0, rotateX: 0 }}
                    transition={{
                      duration: 0.5,
                      delay: reduce ? 0 : 0.25 + (wi * 4 + ci) * 0.04,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                  >
                    {ch}
                  </motion.span>
                ))}
              </span>
            ))}
          </h1>

          <motion.p {...rise(0.18)} className="mt-6 max-w-lg font-plex text-lg leading-relaxed text-white/70">
            {positioning}
          </motion.p>

          <motion.div {...rise(0.28)} className="mt-9 flex flex-wrap items-center gap-3">
            <MagneticButton
              as="a"
              href="#work"
              className="group inline-flex items-center gap-2 bg-[#3b82f6] px-6 py-3 font-grotesk text-sm font-medium uppercase tracking-[0.16em] text-[#050510] transition-colors hover:bg-[#60a5fa]"
            >
              View work
              <span className="transition-transform group-hover:translate-x-1">→</span>
            </MagneticButton>
            <MagneticButton
              as="a"
              href="#contact"
              className="inline-flex items-center gap-2 border border-white/15 px-6 py-3 font-grotesk text-sm font-medium uppercase tracking-[0.16em] text-white transition-colors hover:border-[#3b82f6] hover:text-[#3b82f6]"
            >
              Get in touch
            </MagneticButton>

            {/* Social shortcuts */}
            <div className="ml-1 flex items-center gap-2">
              {[
                { href: links.github, label: 'GitHub', Icon: GitHubIcon },
                { href: links.linkedin, label: 'LinkedIn', Icon: LinkedInIcon },
                { href: `mailto:${links.email}`, label: 'Email', Icon: MailIcon },
              ].map(({ href, label, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith('mailto') ? undefined : '_blank'}
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="flex h-11 w-11 items-center justify-center border border-white/12 text-white/60 transition-colors hover:border-[#3b82f6] hover:text-[#3b82f6]"
                >
                  <Icon size={17} />
                </a>
              ))}
            </div>
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
