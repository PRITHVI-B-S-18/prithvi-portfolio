import { motion } from 'framer-motion';
import useReducedMotionPref from '@/lib/useReducedMotionPref';

/**
 * Scroll-triggered reveal for content blocks inside the spatial sections.
 * Fades + lifts on enter; respects reduced-motion. `stagger` adds a per-child
 * cascade when children are wrapped in <Reveal.Item>.
 */
export default function Reveal({ children, delay = 0, y = 24, className = '', once = true }) {
  const reduce = useReducedMotionPref();
  if (reduce) return <div className={className}>{children}</div>;
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, margin: '-60px' }}
      transition={{ duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
};
const item = {
  hidden: { opacity: 0, y: 22 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

export function Stagger({ children, className = '', once = true }) {
  const reduce = useReducedMotionPref();
  if (reduce) return <div className={className}>{children}</div>;
  return (
    <motion.div
      className={className}
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once, margin: '-60px' }}
    >
      {children}
    </motion.div>
  );
}

export function Item({ children, className = '' }) {
  const reduce = useReducedMotionPref();
  if (reduce) return <div className={className}>{children}</div>;
  return (
    <motion.div className={className} variants={item}>
      {children}
    </motion.div>
  );
}
