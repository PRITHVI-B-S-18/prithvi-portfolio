import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring, useReducedMotion } from 'framer-motion';

/**
 * Custom instrument cursor — a reticle/crosshair that tracks the pointer with
 * a slight spring lag, plus a hard center dot. Expands into a ring over
 * interactive elements (anything [data-cursor="target"], links, buttons).
 *
 * Desktop fine-pointer only; never renders on touch or under reduced-motion,
 * so the native cursor is untouched there.
 */
export default function Cursor() {
  const reduce = useReducedMotion();
  const [enabled, setEnabled] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [down, setDown] = useState(false);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const ringX = useSpring(x, { stiffness: 320, damping: 28, mass: 0.4 });
  const ringY = useSpring(y, { stiffness: 320, damping: 28, mass: 0.4 });

  useEffect(() => {
    if (reduce) return undefined;
    const fine = window.matchMedia('(pointer: fine)').matches;
    if (!fine) return undefined;
    setEnabled(true);
    document.body.style.cursor = 'none';

    const move = (e) => {
      x.set(e.clientX);
      y.set(e.clientY);
      const el = e.target.closest('a, button, [data-cursor="target"], input, textarea');
      setHovering(Boolean(el));
    };
    const dn = () => setDown(true);
    const up = () => setDown(false);

    window.addEventListener('pointermove', move);
    window.addEventListener('pointerdown', dn);
    window.addEventListener('pointerup', up);
    return () => {
      document.body.style.cursor = '';
      window.removeEventListener('pointermove', move);
      window.removeEventListener('pointerdown', dn);
      window.removeEventListener('pointerup', up);
    };
  }, [reduce, x, y]);

  if (!enabled) return null;

  return (
    <>
      {/* Center dot — tracks exactly */}
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[120] h-1 w-1 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#3b82f6]"
        style={{ x, y }}
      />
      {/* Reticle ring — lags with spring, expands on hover */}
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[120] -translate-x-1/2 -translate-y-1/2"
        style={{ x: ringX, y: ringY }}
      >
        <motion.div
          className="relative grid place-items-center rounded-full border"
          animate={{
            width: hovering ? 46 : 26,
            height: hovering ? 46 : 26,
            borderColor: hovering ? 'rgba(96,165,250,0.9)' : 'rgba(59,130,246,0.5)',
            scale: down ? 0.82 : 1,
          }}
          transition={{ type: 'spring', stiffness: 320, damping: 22 }}
        >
          {/* crosshair ticks */}
          <span className="absolute left-1/2 top-0 h-1.5 w-px -translate-x-1/2 bg-[#3b82f6]/70" />
          <span className="absolute bottom-0 left-1/2 h-1.5 w-px -translate-x-1/2 bg-[#3b82f6]/70" />
          <span className="absolute left-0 top-1/2 h-px w-1.5 -translate-y-1/2 bg-[#3b82f6]/70" />
          <span className="absolute right-0 top-1/2 h-px w-1.5 -translate-y-1/2 bg-[#3b82f6]/70" />
        </motion.div>
      </motion.div>
    </>
  );
}
