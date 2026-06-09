import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { projects } from '@/content/projects';
import PerspectiveSection from './PerspectiveSection';
import { SectionMarker, CornerTicks } from './Primitives';
import { Stagger, Item } from './Reveal';

const statusColor = {
  'In Production': '#34d399',
  'In Use': '#3b82f6',
  Completed: '#60a5fa',
};

function ProjectCard({ project, index }) {
  const [open, setOpen] = useState(false);
  const { title, subtitle, oneLiner, year, status, tech, metrics, detail } = project;
  const color = statusColor[status] || '#94a3b8';

  return (
    <motion.div
      className="group relative border border-white/10 bg-[#070713]"
      whileHover={{ y: -4, borderColor: 'rgba(59,130,246,0.5)' }}
      transition={{ duration: 0.25 }}
    >
      <CornerTicks className="opacity-0 transition-opacity group-hover:opacity-100" />

      <div className="p-6">
        <div className="flex items-center justify-between font-grotesk text-[10px] uppercase tracking-[0.2em] text-white/40">
          <span>{`P-0${index + 1}`}</span>
          <span className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: color }} />
            <span style={{ color }}>{status}</span>
            <span className="text-white/30">· {year}</span>
          </span>
        </div>

        <h3 className="mt-5 font-grotesk text-2xl font-semibold tracking-tight text-white">{title}</h3>
        <p className="mt-1 font-grotesk text-xs uppercase tracking-[0.18em] text-[#3b82f6]">{subtitle}</p>
        <p className="mt-4 font-plex text-sm leading-relaxed text-white/65">{oneLiner}</p>

        {/* Metrics row */}
        <div className="mt-6 grid grid-cols-3 gap-px border border-white/10 bg-white/5">
          {metrics.slice(0, 3).map((m) => (
            <div key={m.label} className="bg-[#070713] p-3 text-center">
              <p className="font-grotesk text-base font-semibold text-white">{m.value}</p>
              <p className="mt-1 font-plex text-[10px] leading-tight text-white/45">{m.label}</p>
            </div>
          ))}
        </div>

        {/* Expandable detail */}
        <AnimatePresence initial={false}>
          {open && detail && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="overflow-hidden"
            >
              <div className="mt-6 space-y-4 border-t border-white/10 pt-5">
                {detail.problem && (
                  <div>
                    <p className="font-grotesk text-[10px] uppercase tracking-[0.22em] text-white/35">Problem</p>
                    <p className="mt-1.5 font-plex text-sm leading-relaxed text-white/65">{detail.problem}</p>
                  </div>
                )}
                {detail.build?.length > 0 && (
                  <div>
                    <p className="font-grotesk text-[10px] uppercase tracking-[0.22em] text-white/35">What I built</p>
                    <ul className="mt-1.5 space-y-1.5">
                      {detail.build.map((b) => (
                        <li key={b} className="flex gap-2.5 font-plex text-sm leading-relaxed text-white/65">
                          <span className="mt-2 h-1 w-1 shrink-0 bg-[#3b82f6]" />
                          {b}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                {detail.outcome && (
                  <div>
                    <p className="font-grotesk text-[10px] uppercase tracking-[0.22em] text-white/35">Outcome</p>
                    <p className="mt-1.5 font-plex text-sm leading-relaxed text-white/65">{detail.outcome}</p>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="mt-6 flex items-center justify-between">
          <div className="flex flex-wrap gap-1.5">
            {tech.slice(0, 4).map((t) => (
              <span key={t} className="border border-white/10 px-2 py-0.5 font-grotesk text-[10px] tracking-[0.04em] text-white/50">
                {t}
              </span>
            ))}
          </div>
          {detail && (
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              className="shrink-0 font-grotesk text-[11px] uppercase tracking-[0.16em] text-[#3b82f6] transition-colors hover:text-[#60a5fa]"
            >
              {open ? 'Close —' : 'Detail +'}
            </button>
          )}
        </div>
      </div>
    </motion.div>
  );
}

export default function SpatialWork() {
  const featured = projects.filter((p) => p.featured);

  return (
    <PerspectiveSection id="work" className="mx-auto max-w-6xl px-6 py-16 md:py-28" lift={8}>
      <SectionMarker index="04" label="Selected Work" />
      <Stagger className="mt-10 grid gap-px border border-white/10 bg-white/5 md:grid-cols-2">
        {featured.map((p, i) => (
          <Item key={p.slug} className="bg-[#070713]">
            <ProjectCard project={p} index={i} />
          </Item>
        ))}
      </Stagger>
    </PerspectiveSection>
  );
}
