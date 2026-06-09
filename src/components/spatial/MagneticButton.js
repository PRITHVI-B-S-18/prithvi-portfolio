import { useRef, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

/**
 * Button/link that is magnetically pulled toward the pointer while hovered —
 * the element drifts a few px toward the cursor and springs back on leave.
 * Premium micro-interaction; disabled under reduced-motion (renders a plain
 * spring-less element). Pass `as="a"` for links.
 */
export default function MagneticButton({ as = 'button', children, className = '', strength = 0.35, ...rest }) {
  const reduce = useReducedMotion();
  const ref = useRef(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const MotionTag = motion[as] || motion.button;

  const onMove = (e) => {
    if (reduce) return;
    const rect = ref.current.getBoundingClientRect();
    const mx = e.clientX - (rect.left + rect.width / 2);
    const my = e.clientY - (rect.top + rect.height / 2);
    setPos({ x: mx * strength, y: my * strength });
  };
  const reset = () => setPos({ x: 0, y: 0 });

  return (
    <MotionTag
      ref={ref}
      className={className}
      onMouseMove={onMove}
      onMouseLeave={reset}
      animate={{ x: pos.x, y: pos.y }}
      transition={{ type: 'spring', stiffness: 250, damping: 18, mass: 0.5 }}
      data-cursor="target"
      {...rest}
    >
      {children}
    </MotionTag>
  );
}
