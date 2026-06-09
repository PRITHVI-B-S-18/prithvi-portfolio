/**
 * Shared blueprint primitives for the spatial portfolio: section markers,
 * volumetric panels, and corner ticks. Thin 1px lines, electric-blue accent,
 * technical-drawing feel.
 */

const ACCENT = '#3b82f6';

/** All-caps section marker: index • LABEL with a ruled line trailing off. */
export function SectionMarker({ index, label }) {
  return (
    <div className="flex items-center gap-4">
      <span className="font-grotesk text-xs tracking-[0.3em] text-[#3b82f6]">{index}</span>
      <span className="font-grotesk text-xs uppercase tracking-[0.32em] text-white/55">{label}</span>
      <span className="h-px flex-1 bg-gradient-to-r from-[#3b82f6]/40 to-transparent" />
    </div>
  );
}

/** Decorative corner tick marks — like registration marks on a drawing. */
export function CornerTicks({ className = '' }) {
  return (
    <div className={`pointer-events-none absolute inset-0 ${className}`} aria-hidden="true">
      {[
        'left-0 top-0 border-l border-t',
        'right-0 top-0 border-r border-t',
        'left-0 bottom-0 border-l border-b',
        'right-0 bottom-0 border-r border-b',
      ].map((pos) => (
        <span key={pos} className={`absolute h-3 w-3 border-[#3b82f6]/50 ${pos}`} />
      ))}
    </div>
  );
}

/**
 * Volumetric blueprint panel. Depth comes from a doubled 1px frame (inset +
 * offset edge) and an inner top highlight — not a drop shadow.
 */
export function Panel({ children, className = '', as: Tag = 'div', ...rest }) {
  return (
    <Tag
      className={`relative border border-white/10 bg-white/[0.015] ${className}`}
      style={{
        boxShadow:
          'inset 0 1px 0 rgba(255,255,255,0.06), inset 0 0 0 1px rgba(255,255,255,0.015), 0 0 0 1px rgba(59,130,246,0.04)',
      }}
      {...rest}
    >
      {children}
    </Tag>
  );
}

export { ACCENT };
