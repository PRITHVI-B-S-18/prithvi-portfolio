import { motion, useScroll, useSpring, useReducedMotion } from 'framer-motion';

/**
 * Thin reading-progress bar in the portfolio's electric blue, fixed to the top
 * edge. Spring-smoothed (instant under reduced-motion). Replaces the editorial
 * accent bar on the spatial routes.
 */
export default function SpatialProgress() {
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, reduce ? { duration: 0 } : { stiffness: 120, damping: 30, mass: 0.3 });

  return (
    <motion.div
      className="fixed inset-x-0 top-0 z-[60] h-[2px] origin-left bg-gradient-to-r from-[#3b82f6] to-[#60a5fa]"
      style={{ scaleX }}
      aria-hidden="true"
    />
  );
}
