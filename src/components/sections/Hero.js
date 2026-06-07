import Image from 'next/image';
import { profile } from '@/content/profile';
import Reveal from '@/components/ui/Reveal';

const linkClass = 'text-ink underline-offset-4 transition-colors hover:text-accent hover:underline';

export default function Hero() {
  const { name, positioning, currentRole, links, resume, portrait } = profile;
  return (
    <section className="mx-auto grid min-h-[88vh] max-w-5xl grid-cols-1 items-center gap-10 px-6 py-24 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16">
      <div className="order-2 lg:order-1">
        <Reveal>
          <p className="font-mono text-sm text-accent">{currentRole.title}</p>
        </Reveal>
        <Reveal delay={0.05}>
          <h1 className="mt-4 font-serif text-5xl leading-[1.05] text-ink sm:text-6xl xl:text-7xl">
            {name}
          </h1>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="mt-6 max-w-xl font-serif text-2xl text-muted sm:text-3xl">{positioning}</p>
        </Reveal>
        <Reveal delay={0.15}>
          <p className="mt-8 font-mono text-sm text-muted">
            Currently {currentRole.title} &middot; {currentRole.org} &middot; {currentRole.team}
          </p>
        </Reveal>
        <Reveal delay={0.2}>
          <div className="mt-10 flex flex-wrap gap-x-6 gap-y-3 font-mono text-sm">
            <a className={linkClass} href={`mailto:${links.email}`}>Email</a>
            <a className={linkClass} href={links.github} target="_blank" rel="noopener noreferrer">GitHub</a>
            <a className={linkClass} href={links.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a>
            <a className={linkClass} href={resume} target="_blank" rel="noopener noreferrer">R&eacute;sum&eacute;</a>
          </div>
        </Reveal>
      </div>

      <Reveal delay={0.1} className="order-1 lg:order-2">
        <div className="relative mx-auto w-full max-w-xs lg:max-w-sm">
          <span
            className="absolute -bottom-3 -right-3 -z-10 h-full w-full rounded-lg bg-accent/15"
            aria-hidden="true"
          />
          <div className="overflow-hidden rounded-lg border border-line">
            <Image
              src={portrait}
              alt={name}
              width={1122}
              height={1402}
              priority
              className="h-auto w-full"
            />
          </div>
        </div>
      </Reveal>
    </section>
  );
}
