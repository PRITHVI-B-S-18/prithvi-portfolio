import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { projects } from '@/content/projects';
import PerspectiveSection from './PerspectiveSection';
import { SectionMarker } from './Primitives';
import { Stagger, Item } from './Reveal';

const statusColor = {
  'In Production': '#34d399',
  'In Use': '#3b82f6',
  Completed: '#60a5fa',
};

/** Compact selectable card — picks which project the detail panel shows. */
function ProjectCard({ project, index, active, onSelect }) {
  const { title, subtitle, year, status } = project;
  const color = statusColor[status] || '#94a3b8';
  return (
    <motion.button
      type="button"
      onClick={onSelect}
      className={`group relative h-full w-full p-5 text-left transition-colors ${
        active ? 'bg-[#3b82f6]/[0.07]' : 'bg-[#070713] hover:bg-white/[0.03]'
      }`}
      whileHover={{ y: -2 }}
      transition={{ duration: 0.2 }}
    >
      {/* active accent edge */}
      {active && <span className="absolute inset-y-0 left-0 w-[2px] bg-[#3b82f6]" aria-hidden="true" />}

      <div className="flex items-center justify-between font-grotesk text-[10px] uppercase tracking-[0.2em] text-white/40">
        <span>{`P-0${index + 1}`}</span>
        <span className="flex items-center gap-2">
          <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: color }} />
          <span style={{ color }}>{status}</span>
        </span>
      </div>

      <h3 className={`mt-4 font-grotesk text-lg font-semibold tracking-tight ${active ? 'text-white' : 'text-white/85'}`}>
        {title}
      </h3>
      <p className="mt-0.5 font-grotesk text-[11px] uppercase tracking-[0.16em] text-[#3b82f6]">{subtitle}</p>
      <p className="mt-3 font-plex text-xs text-white/40">{year}</p>
    </motion.button>
  );
}

/** Inline detail panel for the selected project — replaces the old popup. */
function WorkDetail({ project }) {
  const color = statusColor[project.status] || '#94a3b8';
  return (
    <div
      className="relative mt-px border border-white/12 bg-[#0d0f1e]"
      style={{ boxShadow: '0 0 0 1px rgba(59,130,246,0.12)' }}
    >
      {/* status-colored top accent bar */}
      <span className="absolute inset-x-0 top-0 z-10 h-[3px]" style={{ background: `linear-gradient(90deg, ${color}, transparent)` }} aria-hidden="true" />
      {/* corner brackets */}
      {['left-0 top-0 border-l border-t', 'right-0 top-0 border-r border-t', 'left-0 bottom-0 border-l border-b', 'right-0 bottom-0 border-r border-b'].map((pos) => (
        <span key={pos} className={`pointer-events-none absolute z-10 h-3.5 w-3.5 border-[#3b82f6]/50 ${pos}`} aria-hidden="true" />
      ))}

      <AnimatePresence mode="wait">
        <motion.div
          key={project.slug}
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="p-6 sm:p-8"
        >
          <div className="flex flex-wrap items-start justify-between gap-x-6 gap-y-2">
            <div className="border-l-2 pl-4" style={{ borderColor: color }}>
              <div className="flex items-center gap-2 font-grotesk text-[10px] uppercase tracking-[0.2em]">
                <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: color }} />
                <span style={{ color }}>{project.status}</span>
                <span className="text-white/30">· {project.year}</span>
              </div>
              <h3 className="mt-2 font-grotesk text-2xl font-bold tracking-tight text-white sm:text-3xl">{project.title}</h3>
              <p className="font-grotesk text-xs uppercase tracking-[0.18em] text-[#3b82f6]">{project.subtitle}</p>
            </div>
          </div>

          <p className="mt-5 max-w-2xl font-plex text-[15px] leading-relaxed text-white/70">{project.oneLiner}</p>

          {/* Metrics */}
          <div className="mt-6 grid grid-cols-3 gap-px overflow-hidden border border-white/10 bg-white/5 sm:max-w-md">
            {project.metrics.map((m) => (
              <div key={m.label} className="bg-[#0d0f1e] p-3.5 text-center">
                <p className="font-grotesk text-lg font-bold sm:text-xl" style={{ color }}>{m.value}</p>
                <p className="mt-1 font-plex text-[10px] uppercase leading-tight tracking-wide text-white/45">{m.label}</p>
              </div>
            ))}
          </div>

          <div className="mt-7 grid gap-7 lg:grid-cols-2">
            {project.detail?.problem && (
              <div>
                <p className="flex items-center gap-2 font-grotesk text-[10px] uppercase tracking-[0.22em] text-white/40">
                  <span className="text-[#3b82f6]">▹</span> Problem
                </p>
                <p className="mt-2.5 font-plex text-[15px] leading-relaxed text-white/75">{project.detail.problem}</p>
              </div>
            )}
            {project.detail?.build?.length > 0 && (
              <div>
                <p className="flex items-center gap-2 font-grotesk text-[10px] uppercase tracking-[0.22em] text-white/40">
                  <span className="text-[#3b82f6]">▹</span> What I built
                </p>
                <ul className="mt-2.5 space-y-2.5">
                  {project.detail.build.map((b) => (
                    <li key={b} className="flex gap-3 font-plex text-[15px] leading-relaxed text-white/75">
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rotate-45 bg-[#3b82f6]" />
                      {b}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {project.detail?.outcome && (
            <div className="mt-7 border border-[#3b82f6]/25 bg-[#3b82f6]/[0.06] p-4">
              <p className="flex items-center gap-2 font-grotesk text-[10px] uppercase tracking-[0.22em] text-[#60a5fa]">
                <span>▹</span> Outcome
              </p>
              <p className="mt-2 font-plex text-[15px] leading-relaxed text-white/85">{project.detail.outcome}</p>
            </div>
          )}

          {/* Stack */}
          <div className="mt-7 border-t border-white/10 pt-5">
            <p className="font-grotesk text-[10px] uppercase tracking-[0.22em] text-white/40">Stack</p>
            <div className="mt-3 flex flex-wrap gap-1.5">
              {project.tech.map((t) => (
                <span key={t} className="border border-white/12 bg-white/[0.02] px-2.5 py-1 font-grotesk text-[11px] tracking-[0.04em] text-white/65">
                  {t}
                </span>
              ))}
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

export default function SpatialWork() {
  const featured = projects.filter((p) => p.featured);
  const [selected, setSelected] = useState(0);

  return (
    <PerspectiveSection id="work" className="mx-auto max-w-6xl px-6 pb-20 pt-10 md:pb-28 md:pt-14" lift={8}>
      <SectionMarker index="04" label="Selected Work" />

      {/* Project directory — pick one to inspect below */}
      <Stagger className="mt-10 grid gap-px border border-white/10 bg-white/5 sm:grid-cols-2 lg:grid-cols-3">
        {featured.map((p, i) => (
          <Item key={p.slug} className="bg-[#070713]">
            <ProjectCard project={p} index={i} active={i === selected} onSelect={() => setSelected(i)} />
          </Item>
        ))}
      </Stagger>

      {/* Inline detail of the selected project */}
      <WorkDetail project={featured[selected]} />
    </PerspectiveSection>
  );
}
