/**
 * Shell prompt line: prithvi@portfolio:<path>$ <command>
 * Single phosphor accent for user@host; everything else dim/foreground.
 */
export default function Prompt({ command, path = '~', caret = false, className = '' }) {
  return (
    <div className={`font-terminal text-sm leading-relaxed ${className}`}>
      <span className="text-phosphor">prithvi@portfolio</span>
      <span className="text-term-dim">:</span>
      <span className="text-term-fg/70">{path}</span>
      <span className="text-term-dim">$ </span>
      {command && <span className="text-term-fg">{command}</span>}
      {caret && <span className="term-caret" aria-hidden="true" />}
    </div>
  );
}
