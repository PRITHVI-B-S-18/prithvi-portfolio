import { useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { projects } from '@/content/projects';
import { RisoHeading, Label, Press, CORAL, TEAL, PRESS } from './Primitives';

function StampCard({ project, ink, index }) {
  const [open, setOpen] = useState(false);
  const reduce = useReducedMotion();
  const { title, subtitle, oneLiner, year, status, tech, metrics, detail } = project;

  return (
    <Press delay={index * 0.07} rotate={index % 2 === 0 ? -1.5 : 1.5} className="h-full">
      <div
        className="relative h-full bg-[#fff8f0] p-6"
        style={{ border: '1.5px solid #1a1210', outline: '1px dashed rgba(26,18,16,0.28)', outlineOffset: '-6px' }}
      >
        {/* Status / year header */}
        <div className="flex items-center justify-between font-body text-[11px] font-medium uppercase tracking-[0.16em]">
          <span className="px-2 py-0.5 text-[#fff8f0]" style={{ backgroundColor: ink }}>
            {status}
          </span>
          <span className="text-[#1a1210]/50">{year}</span>
        </div>

        <h3 className="mt-4 font-display text-3xl font-bold leading-none" style={{ color: '#1a1210', textShadow: `-1.5px -1.5px 0 ${ink}` }}>
          {title}
        </h3>
        <p className="mt-1 font-body text-xs font-medium uppercase tracking-[0.14em]" style={{ color: ink }}>
          {subtitle}
        </p>
        <p className="mt-4 font-body text-[15px] leading-[1.7] text-[#1a1210]/80">{oneLiner}</p>

        {/* Metrics */}
        <div className="mt-5 flex flex-wrap gap-x-6 gap-y-2">
          {metrics.slice(0, 3).map((m) => (
            <div key={m.label}>
              <span className="font-display text-xl font-bold text-[#1a1210]">{m.value}</span>
              <span className="ml-1.5 font-body text-[11px] uppercase tracking-[0.1em] text-[#1a1210]/55">{m.label}</span>
            </div>
          ))}
        </div>

        <AnimatePresence initial={false}>
          {open && detail && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={reduce ? { duration: 0 } : PRESS}
              className="overflow-hidden"
            >
              <div className="mt-5 space-y-3 border-t border-dashed border-[#1a1210]/30 pt-4">
                {detail.problem && (
                  <p className="font-body text-sm leading-[1.7] text-[#1a1210]/75">
                    <span className="font-medium" style={{ color: ink }}>Problem · </span>
                    {detail.problem}
                  </p>
                )}
                {detail.outcome && (
                  <p className="font-body text-sm leading-[1.7] text-[#1a1210]/75">
                    <span className="font-medium" style={{ color: ink }}>Outcome · </span>
                    {detail.outcome}
                  </p>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="mt-5 flex items-center justify-between">
          <div className="flex flex-wrap gap-1.5">
            {tech.slice(0, 4).map((t) => (
              <span key={t} className="border border-[#1a1210]/25 px-2 py-0.5 font-body text-[11px] text-[#1a1210]/60">
                {t}
              </span>
            ))}
          </div>
          {detail && (
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              className="shrink-0 font-body text-[12px] font-medium uppercase tracking-[0.12em]"
              style={{ color: ink }}
            >
              {open ? 'Close ×' : 'Notes +'}
            </button>
          )}
        </div>
      </div>
    </Press>
  );
}

export default function RisoWork() {
  const featured = projects.filter((p) => p.featured);
  return (
    <section id="work" className="scroll-mt-20 px-6 py-20 sm:py-28">
      <div className="mx-auto max-w-5xl">
        <Label ink={CORAL}>Selected Work</Label>
        <Press>
          <RisoHeading as="h2" ink={TEAL} className="mt-6 text-4xl font-bold sm:text-5xl">
            A small press of things I&apos;ve made.
          </RisoHeading>
        </Press>

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {featured.map((p, i) => (
            <StampCard key={p.slug} project={p} ink={i % 2 === 0 ? CORAL : TEAL} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
