import { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import useIsDesktop from '@/lib/useIsDesktop';
import useReducedMotionPref from '@/lib/useReducedMotionPref';

/**
 * Wraps a section so it enters from a vanishing point: subtle rotateX + scale
 * driven by scroll position (useScroll + useTransform). Feels like walking
 * deeper into a building rather than flipping slides.
 *
 * Degrades gracefully:
 *  - below 768px: no rotateX (layout unchanged), gentle fade/lift only
 *  - reduced-motion: no transforms at all
 *  - before mount / SSR: plain children (no hydration mismatch)
 */
export default function PerspectiveSection({ id, children, className = '', lift = 12 }) {
  const ref = useRef(null);
  const { isDesktop, mounted } = useIsDesktop();
  const reduce = useReducedMotionPref();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'start 38%'],
  });

  // Spring-smooth the scroll progress so sections arrive with weight — like
  // walking up to them — instead of tracking the scrollbar 1:1.
  const progress = useSpring(scrollYProgress, { stiffness: 90, damping: 24, mass: 0.6 });

  const rotateX = useTransform(progress, [0, 1], [lift, 0]);
  const scale = useTransform(progress, [0, 1], [0.95, 1]);
  const y = useTransform(progress, [0, 1], [40, 0]);
  const opacity = useTransform(progress, [0, 1], [0, 1]);

  // scroll-mt clears the fixed header (~64px) so anchor jumps land just below
  // it. Kept tight so the section padding alone provides the breathing gap.
  const cls = `scroll-mt-16 ${className}`;

  // SSR / first paint / reduced-motion: render flat and fully visible.
  if (!mounted || reduce) {
    return (
      <section id={id} ref={ref} className={cls}>
        {children}
      </section>
    );
  }

  if (!isDesktop) {
    // Mobile: keep layout, no 3D — just a fade + lift.
    return (
      <section id={id} ref={ref} className={cls}>
        <motion.div style={{ opacity, y }}>{children}</motion.div>
      </section>
    );
  }

  return (
    <section id={id} ref={ref} className={cls} style={{ perspective: 1300 }}>
      <motion.div
        style={{
          rotateX,
          scale,
          opacity,
          transformOrigin: 'center 80%',
          transformStyle: 'preserve-3d',
          willChange: 'transform, opacity',
        }}
      >
        {children}
      </motion.div>
    </section>
  );
}
