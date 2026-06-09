import { useState, useEffect } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { projects } from '@/content/projects';
import PerspectiveSection from './PerspectiveSection';
import { SectionMarker, CornerTicks } from './Primitives';
import { Stagger, Item } from './Reveal';

const statusColor = {
  'In Production': '#34d399',
  'In Use': '#3b82f6',
  Completed: '#60a5fa',
};

function ProjectCard({ project, index, onOpen }) {
  const { title, subtitle, oneLiner, year, status, tech, metrics, detail } = project;
  const color = statusColor[status] || '#94a3b8';

  return (
    <motion.button
      type="button"
      onClick={() => detail && onOpen(project)}
      className="group relative w-full cursor-pointer border border-white/10 bg-[#070713] text-left"
      whileHover={{ y: -4, borderColor: 'rgba(59,130,246,0.5)' }}
      transition={{ duration: 0.25 }}
    >
      <CornerTicks className="opacity-0 transition-opacity group-hover:opacity-100" />

      <div className="p-5 sm:p-6">
        <div className="flex items-center justify-between font-grotesk text-[10px] uppercase tracking-[0.2em] text-white/40">
          <span>{`P-0${index + 1}`}</span>
          <span className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: color }} />
            <span style={{ color }}>{status}</span>
            <span className="text-white/30">· {year}</span>
          </span>
        </div>

        <h3 className="mt-5 font-grotesk text-xl font-semibold tracking-tight text-white sm:text-2xl">{title}</h3>
        <p className="mt-1 font-grotesk text-xs uppercase tracking-[0.18em] text-[#3b82f6]">{subtitle}</p>
        <p className="mt-4 font-plex text-sm leading-relaxed text-white/65">{oneLiner}</p>

        {/* Metrics row */}
        <div className="mt-6 grid grid-cols-3 gap-px border border-white/10 bg-white/5">
          {metrics.slice(0, 3).map((m) => (
            <div key={m.label} className="bg-[#070713] p-3 text-center">
              <p className="font-grotesk text-sm font-semibold text-white sm:text-base">{m.value}</p>
              <p className="mt-1 font-plex text-[10px] leading-tight text-white/45">{m.label}</p>
            </div>
          ))}
        </div>

        <div className="mt-6 flex items-center justify-between gap-3">
          <div className="flex flex-wrap gap-1.5">
            {tech.slice(0, 4).map((t) => (
              <span key={t} className="border border-white/10 px-2 py-0.5 font-grotesk text-[10px] tracking-[0.04em] text-white/50">
                {t}
              </span>
            ))}
          </div>
          {detail && (
            <span className="shrink-0 font-grotesk text-[11px] uppercase tracking-[0.16em] text-[#3b82f6] transition-colors group-hover:text-[#60a5fa]">
              View <span className="inline-block transition-transform group-hover:translate-x-0.5">→</span>
            </span>
          )}
        </div>
      </div>
    </motion.button>
  );
}

function ProjectModal({ project, onClose }) {
  const reduce = useReducedMotion();

  // Lock body scroll + close on Escape while open.
  useEffect(() => {
    if (!project) return undefined;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKey = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener('keydown', onKey);
    };
  }, [project, onClose]);

  const color = project ? statusColor[project.status] || '#94a3b8' : '#94a3b8';

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          className="fixed inset-0 z-[90] flex items-end justify-center sm:items-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-[#050510]/80 backdrop-blur-sm"
            onClick={onClose}
            aria-hidden="true"
          />

          {/* Panel */}
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={`${project.title} details`}
            className="relative max-h-[88vh] w-full max-w-2xl overflow-y-auto border border-white/15 bg-[#0b0b16] sm:max-h-[85vh]"
            initial={reduce ? { opacity: 0 } : { opacity: 0, y: 40, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, y: 24, scale: 0.98 }}
            transition={{ type: 'spring', stiffness: 260, damping: 26 }}
          >
            {/* Sticky header with close */}
            <div className="sticky top-0 z-10 flex items-start justify-between gap-4 border-b border-white/10 bg-[#0b0b16]/95 px-6 py-5 backdrop-blur sm:px-8">
              <div>
                <div className="flex items-center gap-2 font-grotesk text-[10px] uppercase tracking-[0.2em]">
                  <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: color }} />
                  <span style={{ color }}>{project.status}</span>
                  <span className="text-white/30">· {project.year}</span>
                </div>
                <h3 className="mt-2 font-grotesk text-2xl font-semibold tracking-tight text-white sm:text-3xl">
                  {project.title}
                </h3>
                <p className="font-grotesk text-xs uppercase tracking-[0.18em] text-[#3b82f6]">{project.subtitle}</p>
              </div>
              <button
                type="button"
                onClick={onClose}
                aria-label="Close"
                className="flex h-9 w-9 shrink-0 items-center justify-center border border-white/15 text-white/70 transition-colors hover:border-[#3b82f6] hover:text-[#3b82f6]"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <path d="M6 6l12 12M18 6L6 18" />
                </svg>
              </button>
            </div>

            <div className="px-6 py-6 sm:px-8 sm:py-7">
              {/* Metrics */}
              <div className="grid grid-cols-3 gap-px overflow-hidden border border-white/10 bg-white/5">
                {project.metrics.map((m) => (
                  <div key={m.label} className="bg-[#0b0b16] p-3 text-center">
                    <p className="font-grotesk text-base font-semibold text-white sm:text-lg">{m.value}</p>
                    <p className="mt-1 font-plex text-[10px] leading-tight text-white/45">{m.label}</p>
                  </div>
                ))}
              </div>

              {project.detail?.problem && (
                <div className="mt-6">
                  <p className="font-grotesk text-[10px] uppercase tracking-[0.22em] text-white/35">Problem</p>
                  <p className="mt-2 font-plex text-[15px] leading-relaxed text-white/75">{project.detail.problem}</p>
                </div>
              )}
              {project.detail?.build?.length > 0 && (
                <div className="mt-6">
                  <p className="font-grotesk text-[10px] uppercase tracking-[0.22em] text-white/35">What I built</p>
                  <ul className="mt-2 space-y-2">
                    {project.detail.build.map((b) => (
                      <li key={b} className="flex gap-3 font-plex text-[15px] leading-relaxed text-white/75">
                        <span className="mt-2 h-1 w-1 shrink-0 bg-[#3b82f6]" />
                        {b}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              {project.detail?.outcome && (
                <div className="mt-6">
                  <p className="font-grotesk text-[10px] uppercase tracking-[0.22em] text-white/35">Outcome</p>
                  <p className="mt-2 font-plex text-[15px] leading-relaxed text-white/75">{project.detail.outcome}</p>
                </div>
              )}

              {/* Full tech list */}
              <div className="mt-7 border-t border-white/10 pt-5">
                <p className="font-grotesk text-[10px] uppercase tracking-[0.22em] text-white/35">Stack</p>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {project.tech.map((t) => (
                    <span key={t} className="border border-white/12 px-2.5 py-1 font-grotesk text-[11px] tracking-[0.04em] text-white/60">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default function SpatialWork() {
  const featured = projects.filter((p) => p.featured);
  const [selected, setSelected] = useState(null);

  return (
    <PerspectiveSection id="work" className="mx-auto max-w-6xl px-6 pb-20 pt-10 md:pb-28 md:pt-14" lift={8}>
      <SectionMarker index="04" label="Selected Work" />
      <Stagger className="mt-10 grid gap-px border border-white/10 bg-white/5 sm:grid-cols-2">
        {featured.map((p, i) => (
          <Item key={p.slug} className="bg-[#070713]">
            <ProjectCard project={p} index={i} onOpen={setSelected} />
          </Item>
        ))}
      </Stagger>

      <ProjectModal project={selected} onClose={() => setSelected(null)} />
    </PerspectiveSection>
  );
}
