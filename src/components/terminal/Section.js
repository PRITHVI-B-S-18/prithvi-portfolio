import Prompt from './Prompt';

/**
 * Section wrapper: shows the "command" that produced this section, then an
 * optional scanline heading, then the output (children). scroll-mt clears the
 * fixed chrome bar for anchor jumps from the command palette.
 */
export default function Section({ id, command, title, children, first = false }) {
  return (
    <section id={id} className={`scroll-mt-24 py-12 sm:py-16 ${first ? '' : 'border-t border-term-dim/15'}`}>
      <Prompt command={command} />
      {title && (
        <h2 className="term-scanlines mt-5 inline-block font-terminal text-base font-bold uppercase tracking-[0.25em] text-term-fg">
          {title}
        </h2>
      )}
      <div className="mt-4 font-terminal">{children}</div>
    </section>
  );
}
