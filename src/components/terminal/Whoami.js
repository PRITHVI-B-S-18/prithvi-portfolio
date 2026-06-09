import { profile } from '@/content/profile';
import Prompt from './Prompt';

/** Hero — the opening `whoami` and identity block. */
export default function Whoami() {
  const { name, role, positioning, available, location, currentRole } = profile;

  return (
    <section id="top" className="scroll-mt-24 pb-12 pt-24 sm:pt-28">
      <Prompt command="whoami" />
      <div className="mt-5">
        <h1 className="term-scanlines inline-block font-terminal text-4xl font-bold leading-none tracking-tight text-term-fg sm:text-6xl">
          {name}
        </h1>
        <p className="mt-4 font-terminal text-sm text-phosphor sm:text-base">
          &gt; {role.toLowerCase()} · secure systems &amp; internal tools
        </p>
        <p className="mt-4 max-w-xl font-terminal text-sm leading-relaxed text-term-fg/70">{positioning}</p>

        <div className="mt-6 flex flex-wrap gap-x-6 gap-y-1.5 font-terminal text-xs text-term-dim">
          <span>
            <span className="text-phosphor">●</span> {available ? 'open to work' : 'employed'}
          </span>
          <span>loc: {location}</span>
          <span>
            role: {currentRole.title} @ {currentRole.org}
          </span>
        </div>

        <p className="mt-7 font-terminal text-sm text-term-dim">
          press <span className="text-phosphor">⌘K</span> or <span className="text-phosphor">/</span> to navigate
          <span className="term-caret" aria-hidden="true" />
        </p>
      </div>
    </section>
  );
}
