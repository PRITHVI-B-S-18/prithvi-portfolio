import Image from 'next/image';
import { motion, useReducedMotion } from 'framer-motion';
import { profile } from '@/content/profile';
import Button from '@/components/ui/Button';
import AnimatedCounter from '@/components/ui/AnimatedCounter';
import { MailIcon, GitHubIcon, LinkedInIcon } from '@/components/ui/Icons';

export default function Hero() {
  const reduce = useReducedMotion();
  const { name, role, positioning, currentRole, links, portrait, stats, available, location } = profile;

  const rise = (delay = 0) =>
    reduce
      ? {}
      : {
          initial: { opacity: 0, y: 22 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] },
        };

  return (
    <section id="top" className="relative overflow-hidden scroll-mt-24">
      {/* Ambient glows (static) */}
      <div
        className="pointer-events-none absolute -right-32 -top-40 h-[34rem] w-[34rem] glow blur-3xl"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -left-40 top-40 h-[26rem] w-[26rem] glow-2 blur-3xl"
        aria-hidden="true"
      />

      <div className="mx-auto grid max-w-6xl grid-cols-1 items-start gap-12 px-6 pb-16 pt-16 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-16 lg:pt-8"> 
        {/* Left: text */}
        <div className="order-2 lg:order-1">
          <motion.div {...rise(0)} className="flex items-center gap-3">
            <span className="h-px w-8 bg-grad" />
            <p className="font-mono text-sm uppercase tracking-[0.2em] text-accent">{role}</p>
          </motion.div>

          <motion.h1
            {...rise(0.07)}
            className="mt-6 font-sans font-bold leading-[1.02] tracking-tight"
            style={{ fontSize: 'clamp(3rem, 8vw, 6rem)' }}
          >
            <span className="text-gradient">{name}</span>
          </motion.h1>

          <motion.p {...rise(0.14)} className="mt-6 max-w-lg text-lg leading-relaxed text-muted sm:text-xl">
            {positioning}
          </motion.p>

          <motion.div {...rise(0.2)} className="mt-7 flex items-center gap-4 font-mono text-sm text-faint">
            {available && (
              <span className="inline-flex items-center gap-2">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
                </span>
                Open to work
              </span>
            )}
            <span className="text-line">/</span>
            <span>{location}</span>
          </motion.div>

          <motion.div {...rise(0.27)} className="mt-9 flex flex-wrap items-center gap-3">
            <Button href="#work" variant="primary">
              View work <span className="transition-transform group-hover:translate-x-0.5">→</span>
            </Button>
            <Button href="#contact" variant="secondary">
              Get in touch
            </Button>
          </motion.div>

          <motion.div {...rise(0.34)} className="mt-8 flex flex-wrap gap-x-6 gap-y-2 font-mono text-sm">
            <a className="inline-flex items-center gap-1.5 text-muted transition-colors hover:text-accent" href={`mailto:${links.email}`}>
              <MailIcon size={15} /> Email
            </a>
            <a className="inline-flex items-center gap-1.5 text-muted transition-colors hover:text-accent" href={links.github} target="_blank" rel="noopener noreferrer">
              <GitHubIcon size={15} /> GitHub
            </a>
            <a className="inline-flex items-center gap-1.5 text-muted transition-colors hover:text-accent" href={links.linkedin} target="_blank" rel="noopener noreferrer">
              <LinkedInIcon size={15} /> LinkedIn
            </a>
          </motion.div>
        </div>

        {/* Right: portrait */}
        <motion.div className="order-1 flex justify-center lg:order-2 lg:justify-end" {...rise(0.12)}>
          <div className="relative w-full max-w-[300px] sm:max-w-[340px] lg:max-w-[380px]">
            <div className="absolute -inset-2 -z-10 rounded-3xl bg-grad opacity-[0.18] blur-2xl" aria-hidden="true" />
            <div className="overflow-hidden rounded-2xl border border-line bg-surface shadow-2xl">
              <Image src={portrait} alt={name} width={1122} height={1402} priority className="h-auto w-full object-cover" />
            </div>
            <motion.div
              className="absolute bottom-3 left-3 rounded-xl border border-line bg-surface/90 px-4 py-3 backdrop-blur sm:-bottom-5 sm:-left-5"
              initial={reduce ? {} : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.5 }}
            >
              <p className="font-mono text-xs text-faint">Currently</p>
              <Image
                src="/images/iamneo-logo.png"
                alt={currentRole.org}
                width={132}
                height={40}
                className="iamneo-logo mt-1 h-5 w-auto"
              />
              <p className="mt-1 font-sans text-sm font-medium text-ink">{currentRole.team}</p>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Stats band */}
      <motion.div {...rise(0.4)} className="mx-auto max-w-6xl px-6 pb-20 pt-6">
        <div className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-4">
          {stats.map((s) => (
            <div key={s.label} className="bg-bg px-6 py-7 transition-colors hover:bg-surface">
              <p className="font-sans text-3xl font-bold text-gradient sm:text-4xl">
                {s.animate ? <AnimatedCounter value={s.value} suffix={s.suffix} /> : `${s.value}${s.suffix}`}
              </p>
              <p className="mt-2 font-mono text-xs leading-relaxed text-muted">{s.label}</p>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
