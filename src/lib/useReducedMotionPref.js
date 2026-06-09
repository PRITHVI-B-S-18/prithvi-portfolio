import { useReducedMotion } from 'framer-motion';

/**
 * Thin re-export so spatial components share one source of truth for the
 * reduced-motion preference. Returns true when the user prefers reduced motion.
 */
export default function useReducedMotionPref() {
  return useReducedMotion();
}
