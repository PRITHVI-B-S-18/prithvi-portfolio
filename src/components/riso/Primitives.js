import { motion, useReducedMotion } from 'framer-motion';

/**
 * Risograph/indie-print primitives. Two inks — coral (primary) and teal
 * (secondary) — over cream paper, ink-black text/borders, unicode decoration
 * only. Misregistration on headings, stamp-press spring on entrances.
 */

export const CORAL = '#ff6b5b';
export const TEAL = '#2ec4b6';
export const INK = '#1a1210';
export const PAPER = '#fff8f0';

// Playful stamp-press spring from the brief.
export const PRESS = { type: 'spring', stiffness: 180, damping: 18 };

/**
 * Heading with a misregistered second-plate offset behind it (text-shadow in
 * the chosen ink), like a slightly misaligned print run.
 */
export function RisoHeading({ as: Tag = 'h2', children, ink = TEAL, className = '', style = {} }) {
  return (
    <Tag
      className={`font-display ${className}`}
      style={{ color: INK, textShadow: `-2px -2px 0 ${ink}`, ...style }}
    >
      {children}
    </Tag>
  );
}

/**
 * Stamp-press entrance: scales + settles with a firm spring, like a rubber
 * stamp pressed onto paper. Falls back to static under reduced-motion.
 */
export function Press({ children, className = '', delay = 0, rotate = -2, as = 'div' }) {
  const reduce = useReducedMotion();
  const MotionTag = motion[as] || motion.div;
  if (reduce) {
    const Tag = as;
    return <Tag className={className}>{children}</Tag>;
  }
  return (
    <MotionTag
      className={className}
      initial={{ opacity: 0, scale: 0.82, rotate, y: 10 }}
      whileInView={{ opacity: 1, scale: 1, rotate: 0, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ ...PRESS, delay }}
    >
      {children}
    </MotionTag>
  );
}

/**
 * Stamp / sticker card: solid ink border with a dashed inset outline
 * (outline-offset: -6px) — pure CSS, no wrapper divs. Tilts slightly on hover.
 */
export function Stamp({ children, className = '', tilt = true, ...rest }) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={`relative bg-[#fff8f0] ${className}`}
      style={{
        border: '1.5px solid #1a1210',
        outline: '1px dashed rgba(26,18,16,0.28)',
        outlineOffset: '-6px',
      }}
      whileHover={reduce || !tilt ? undefined : { rotate: -0.8, y: -3 }}
      transition={PRESS}
      {...rest}
    >
      {children}
    </motion.div>
  );
}

/** Small all-caps section label in DM Sans, between two unicode rules. */
export function Label({ children, ink = CORAL }) {
  return (
    <span className="inline-flex items-center gap-2 font-body text-xs font-medium uppercase tracking-[0.22em]" style={{ color: ink }}>
      <span aria-hidden="true">○</span>
      {children}
    </span>
  );
}
