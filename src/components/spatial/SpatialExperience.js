import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { experience } from '@/content/experience';
import useIsDesktop from '@/lib/useIsDesktop';
import useReducedMotionPref from '@/lib/useReducedMotionPref';
import PerspectiveSection from './PerspectiveSection';
import { SectionMarker, Panel } from './Primitives';

// Elevation profile — most recent role rises highest, like a section drawing.
const ELEV = [132, 108, 88, 70, 54];

function shortRole(role) {
  return role.split(' - ')[0];
}

function DetailPanel({ entry }) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={entry.period}
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -8 }}
        transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
      >
        <Panel className="p-6 sm:p-8">
          <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
            <div>
              <h3 className="font-grotesk text-xl font-semibold text-white sm:text-2xl">{entry.role}</h3>
              <p className="font-plex text-sm text-white/55">
                {entry.org}
                {entry.team ? ` · ${entry.team}` : ''}
              </p>
            </div>
            <span className="font-grotesk text-xs uppercase tracking-[0.2em] text-[#3b82f6]">{entry.period}</span>
          </div>

          <p className="mt-4 font-plex text-base leading-relaxed text-white/70">{entry.summary}</p>

          <ul className="mt-5 space-y-2.5">
            {entry.highlights.map((h) => (
              <li key={h.text} className="flex gap-3 font-plex text-sm leading-relaxed text-white/65">
                <span className="mt-2 h-1 w-1 shrink-0 bg-[#3b82f6]" />
                <span>
                  <span className="font-grotesk text-[11px] uppercase tracking-[0.16em] text-white/40">{h.tag} — </span>
                  {h.text}
                </span>
              </li>
            ))}
          </ul>

          <div className="mt-6 flex flex-wrap gap-2">
            {entry.stack.map((t) => (
              <span key={t} className="border border-white/12 px-2.5 py-1 font-grotesk text-[11px] tracking-[0.06em] text-white/55">
                {t}
              </span>
            ))}
          </div>
        </Panel>
      </motion.div>
    </AnimatePresence>
  );
}

/** Desktop: horizontal section drawing. Roles rise from a ruled baseline. */
function HorizontalTimeline({ selected, setSelected, reduce }) {
  return (
    <div className="relative mt-16 pb-4" style={{ height: 200 }}>
      {/* Ruled baseline draws in left-to-right as the section is reached */}
      <div className="absolute inset-x-0" style={{ bottom: 56 }}>
        <motion.div
          className="relative h-px w-full origin-left bg-white/15"
          initial={reduce ? false : { scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          {Array.from({ length: 41 }).map((_, i) => (
            <motion.span
              key={i}
              className="absolute top-0 w-px bg-white/15"
              style={{ left: `${(i / 40) * 100}%`, height: i % 5 === 0 ? 7 : 4 }}
              initial={reduce ? false : { opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.3, delay: 0.3 + (i / 40) * 0.5 }}
            />
          ))}
        </motion.div>
      </div>

      <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3">
        {experience.map((e, i) => {
          const active = i === selected;
          const h = ELEV[i] ?? 54;
          // Each waypoint constructs as the baseline reaches it: node pops,
          // riser grows upward, card and date fade in.
          const base = 0.5 + i * 0.13;
          return (
            <button
              key={e.period}
              type="button"
              onClick={() => setSelected(i)}
              className="group flex flex-1 flex-col items-center text-center"
            >
              {/* Elevation card */}
              <motion.div
                className={`w-full max-w-[200px] border px-3 py-2.5 transition-colors ${
                  active ? 'border-[#3b82f6] bg-[#3b82f6]/[0.07]' : 'border-white/12 bg-[#070713] group-hover:border-white/30'
                }`}
                initial={reduce ? false : { opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ duration: 0.45, delay: base + 0.25, ease: [0.22, 1, 0.36, 1] }}
              >
                <p className={`font-grotesk text-[13px] font-semibold leading-tight ${active ? 'text-white' : 'text-white/80'}`}>
                  {shortRole(e.role)}
                </p>
                <p className="mt-0.5 font-plex text-[11px] text-white/45">{e.org}</p>
              </motion.div>

              {/* Riser with ticks (the elevation measure) — grows up from the baseline */}
              <motion.div
                className="relative w-px origin-bottom bg-white/15"
                style={{ height: h }}
                initial={reduce ? false : { scaleY: 0 }}
                whileInView={{ scaleY: 1 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ duration: 0.4, delay: base + 0.1, ease: [0.22, 1, 0.36, 1] }}
              >
                <span className={`absolute inset-0 ${active ? 'bg-[#3b82f6]' : 'bg-transparent'}`} />
              </motion.div>

              {/* Baseline node */}
              <motion.span
                className={`relative z-10 -mt-[5px] h-2.5 w-2.5 rotate-45 border transition-colors ${
                  active ? 'border-[#3b82f6] bg-[#3b82f6]' : 'border-white/40 bg-[#050510] group-hover:border-white'
                }`}
                initial={reduce ? false : { scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ type: 'spring', stiffness: 380, damping: 18, delay: base }}
              />

              {/* Date below the baseline — elevation marker */}
              <motion.span
                className={`mt-3 font-grotesk text-[10px] uppercase tracking-[0.12em] ${active ? 'text-[#3b82f6]' : 'text-white/40'}`}
                initial={reduce ? false : { opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ duration: 0.4, delay: base + 0.2 }}
              >
                {e.period.split(' - ')[0]}
              </motion.span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

/** Mobile: vertical ruled timeline. The construction line draws downward. */
function VerticalTimeline({ selected, setSelected, reduce }) {
  return (
    <div className="relative mt-10 pl-6">
      <motion.span
        className="absolute left-[3px] top-1 w-px origin-top bg-white/12"
        style={{ height: 'calc(100% - 0.5rem)' }}
        aria-hidden="true"
        initial={reduce ? false : { scaleY: 0 }}
        whileInView={{ scaleY: 1 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      />
      <div className="space-y-2">
        {experience.map((e, i) => {
          const active = i === selected;
          return (
            <motion.button
              key={e.period}
              type="button"
              onClick={() => setSelected(i)}
              className="group relative flex w-full items-center gap-3 py-2 text-left"
              initial={reduce ? false : { opacity: 0, x: -12 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.4, delay: 0.15 + i * 0.1 }}
            >
              <motion.span
                className={`absolute -left-6 h-2 w-2 rotate-45 border ${
                  active ? 'border-[#3b82f6] bg-[#3b82f6]' : 'border-white/40 bg-[#050510]'
                }`}
                initial={reduce ? false : { scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ type: 'spring', stiffness: 380, damping: 18, delay: 0.2 + i * 0.1 }}
              />
              <span className={`font-grotesk text-sm font-medium ${active ? 'text-white' : 'text-white/70'}`}>
                {shortRole(e.role)}
              </span>
              <span className="font-grotesk text-[10px] uppercase tracking-[0.12em] text-white/35">
                {e.period.split(' - ')[0]}
              </span>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}

export default function SpatialExperience() {
  const [selected, setSelected] = useState(0);
  const { isDesktop, mounted } = useIsDesktop();
  const reduce = useReducedMotionPref();
  const useHorizontal = mounted && isDesktop;

  return (
    <PerspectiveSection id="experience" className="mx-auto max-w-6xl px-6 py-16 md:py-28" lift={8}>
      <SectionMarker index="02" label="Experience — Section Drawing" />

      {useHorizontal ? (
        <HorizontalTimeline selected={selected} setSelected={setSelected} reduce={reduce} />
      ) : (
        <VerticalTimeline selected={selected} setSelected={setSelected} reduce={reduce} />
      )}

      <div className="mt-8">
        <DetailPanel entry={experience[selected]} />
      </div>
    </PerspectiveSection>
  );
}
