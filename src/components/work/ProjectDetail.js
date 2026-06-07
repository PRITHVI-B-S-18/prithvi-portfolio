import Link from 'next/link';
import { motion } from 'framer-motion';
import Tag from '@/components/ui/Tag';
import Reveal from '@/components/ui/Reveal';

function hueFromSlug(slug) {
  let h = 0;
  for (let i = 0; i < slug.length; i += 1) h = (h * 31 + slug.charCodeAt(i)) % 360;
  return h;
}

function DetailBlock({ index, label, children }) {
  return (
    <Reveal>
      <section className="grid gap-4 border-t border-line py-10 sm:grid-cols-[7rem_1fr]">
        <div className="flex items-baseline gap-3 sm:flex-col sm:gap-1.5">
          <span className="font-mono text-sm text-accent">{index}</span>
          <h2 className="font-mono text-xs uppercase tracking-[0.2em] text-faint">{label}</h2>
        </div>
        <div>{children}</div>
      </section>
    </Reveal>
  );
}

const statusStyles = {
  'In Production': 'bg-emerald-500/15 text-emerald-400',
  'In Use': 'bg-accent/15 text-accent',
  Completed: 'bg-sky-500/15 text-sky-400',
};

export default function ProjectDetail({ project, prev, next }) {
  const { slug, title, subtitle, oneLiner, role, year, status, tech, metrics, detail } = project;
  const hue = project.hue ?? hueFromSlug(slug);
  const cover = `linear-gradient(135deg, hsl(${hue} 70% 60% / 0.30), hsl(${(hue + 50) % 360} 70% 55% / 0.10) 60%, transparent)`;

  return (
    <article className="mx-auto max-w-4xl px-6 pb-12 pt-10">
      <Link
        href="/#work"
        className="group inline-flex items-center gap-2 font-mono text-sm text-muted transition-colors hover:text-accent"
      >
        <span className="transition-transform duration-200 group-hover:-translate-x-1">←</span>
        Back to work
      </Link>

      {/* Cover banner */}
      <motion.div
        className="relative mt-8 h-44 overflow-hidden rounded-2xl border border-line sm:h-56"
        style={{ backgroundImage: cover }}
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      >
        <div
          className="absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage:
              'linear-gradient(rgb(var(--ink)) 1px, transparent 1px), linear-gradient(90deg, rgb(var(--ink)) 1px, transparent 1px)',
            backgroundSize: '26px 26px',
          }}
          aria-hidden="true"
        />
        {status && (
          <span className={`absolute left-5 top-5 rounded-full px-3 py-1 font-mono text-xs font-medium ${statusStyles[status] || 'bg-surface2 text-muted'}`}>
            {status}
          </span>
        )}
        <span className="absolute right-5 top-5 font-mono text-sm text-muted">{year}</span>
      </motion.div>

      {/* Header */}
      <header className="mt-8">
        <motion.div
          className="flex items-center gap-3 font-mono text-sm text-muted"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.05 }}
        >
          {role && <span>{role}</span>}
          <span className="text-line">/</span>
          <span className="text-accent">{year}</span>
        </motion.div>
        <motion.h1
          className="mt-3 font-sans font-bold tracking-tight text-ink"
          style={{ fontSize: 'clamp(2.5rem, 6vw, 4rem)' }}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
        >
          {title}
        </motion.h1>
        {subtitle && (
          <motion.p
            className="mt-2 font-mono text-sm text-accent"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.14 }}
          >
            {subtitle}
          </motion.p>
        )}
        <motion.p
          className="mt-4 max-w-xl text-xl leading-relaxed text-muted"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.18 }}
        >
          {oneLiner}
        </motion.p>
        <motion.div
          className="mt-6 flex flex-wrap gap-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.26 }}
        >
          {tech.map((t) => (
            <Tag key={t}>{t}</Tag>
          ))}
        </motion.div>

        {metrics?.length > 0 && (
          <motion.div
            className="mt-8 grid grid-cols-3 gap-px overflow-hidden rounded-xl border border-line bg-line"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.32 }}
          >
            {metrics.map((m) => (
              <div key={m.label} className="bg-surface px-4 py-4 text-center">
                <p className="font-sans text-lg font-bold text-gradient sm:text-xl">{m.value}</p>
                <p className="mt-1 font-mono text-[11px] leading-tight text-muted">{m.label}</p>
              </div>
            ))}
          </motion.div>
        )}
      </header>

      {/* Body */}
      <div className="mt-12">
        {detail?.problem && (
          <DetailBlock index="01" label="Problem">
            <p className="text-lg leading-relaxed text-ink">{detail.problem}</p>
          </DetailBlock>
        )}
        {detail?.build?.length > 0 && (
          <DetailBlock index="02" label="What I built">
            <ul className="space-y-3">
              {detail.build.map((b, i) => (
                <li key={i} className="flex gap-3 text-lg leading-relaxed text-ink">
                  <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                  {b}
                </li>
              ))}
            </ul>
          </DetailBlock>
        )}
        {detail?.outcome && (
          <DetailBlock index="03" label="Outcome">
            <p className="text-lg leading-relaxed text-ink">{detail.outcome}</p>
          </DetailBlock>
        )}
      </div>

      {/* Prev / Next */}
      {(prev || next) && (
        <nav className="grid gap-4 border-t border-line pt-10 sm:grid-cols-2">
          {prev ? (
            <Link
              href={`/work/${prev.slug}`}
              className="group rounded-xl border border-line bg-surface p-5 transition-colors hover:border-accent/60"
            >
              <span className="font-mono text-xs uppercase tracking-widest text-faint">← Previous</span>
              <p className="mt-2 font-sans text-lg font-semibold text-ink transition-colors group-hover:text-accent">
                {prev.title}
              </p>
            </Link>
          ) : (
            <span />
          )}
          {next ? (
            <Link
              href={`/work/${next.slug}`}
              className="group rounded-xl border border-line bg-surface p-5 text-right transition-colors hover:border-accent/60"
            >
              <span className="font-mono text-xs uppercase tracking-widest text-faint">Next →</span>
              <p className="mt-2 font-sans text-lg font-semibold text-ink transition-colors group-hover:text-accent">
                {next.title}
              </p>
            </Link>
          ) : (
            <span />
          )}
        </nav>
      )}
    </article>
  );
}
