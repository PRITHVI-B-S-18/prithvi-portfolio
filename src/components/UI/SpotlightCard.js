import { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform, useReducedMotion } from 'framer-motion';

// Card with a cursor-tracking radial highlight and optional subtle 3D tilt.
export default function SpotlightCard({ children, className = '', radius = 260, tilt = false, style, ...props }) {
  const ref = useRef(null);
  const reduce = useReducedMotion();
  const useTilt = tilt && !reduce;

  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);
  const rotateX = useSpring(useTransform(py, [0, 1], [7, -7]), { stiffness: 150, damping: 18 });
  const rotateY = useSpring(useTransform(px, [0, 1], [-7, 7]), { stiffness: 150, damping: 18 });

  const onMove = (e) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    el.style.setProperty('--mx', `${e.clientX - r.left}px`);
    el.style.setProperty('--my', `${e.clientY - r.top}px`);
    if (useTilt) {
      px.set((e.clientX - r.left) / r.width);
      py.set((e.clientY - r.top) / r.height);
    }
  };

  const onLeave = () => {
    if (useTilt) {
      px.set(0.5);
      py.set(0.5);
    }
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={useTilt ? { rotateX, rotateY, transformPerspective: 900, ...style } : style}
      className={`group/spot relative overflow-hidden ${className}`}
      {...props}
    >
      <span
        className="pointer-events-none absolute inset-0 z-0 opacity-0 transition-opacity duration-300 group-hover/spot:opacity-100"
        style={{
          background: `radial-gradient(${radius}px circle at var(--mx, 50%) var(--my, 50%), rgb(var(--accent) / 0.14), transparent 70%)`,
        }}
        aria-hidden="true"
      />
      {children}
    </motion.div>
  );
}
