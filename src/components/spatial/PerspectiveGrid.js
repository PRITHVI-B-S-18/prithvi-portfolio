import { useRef } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';

/**
 * Background layer (z:-1). Deep-space base with a hand-built perspective floor
 * grid that recedes to a vanishing point and fades at the edges, plus a few
 * CSS depth particles. Pure CSS/SVG — no Three.js, ~0KB added JS.
 *
 * Scroll-linked parallax drifts the grid lines so the page feels like moving
 * forward through space rather than scrolling a flat document.
 */
export default function PerspectiveGrid() {
  const reduce = useReducedMotion();
  const ref = useRef(null);
  const { scrollYProgress } = useScroll();

  // Drift the grid texture as you scroll (disabled under reduced-motion).
  const floorShift = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : 220]);
  const ceilShift = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : -140]);

  const gridLines = {
    backgroundImage:
      'linear-gradient(rgba(59,130,246,0.18) 1px, transparent 1px), linear-gradient(90deg, rgba(59,130,246,0.18) 1px, transparent 1px)',
    backgroundSize: '64px 64px',
  };

  return (
    <div ref={ref} className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-[#050510]">
      {/* Distant glow at the vanishing point */}
      <div
        className="absolute left-1/2 top-1/2 h-[60vh] w-[60vh] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[120px]"
        style={{ background: 'radial-gradient(circle, rgba(59,130,246,0.14), transparent 70%)' }}
      />

      {/* Floor grid — receding plane anchored at the bottom */}
      <div className="absolute inset-x-0 bottom-0 h-[80vh] [perspective:520px] [perspective-origin:50%_0%]">
        <motion.div
          className="absolute inset-x-[-50%] bottom-0 top-0 origin-bottom"
          style={{
            ...gridLines,
            backgroundPositionY: floorShift,
            transform: 'rotateX(74deg)',
            maskImage: 'linear-gradient(to top, rgba(0,0,0,0.9) 0%, transparent 72%)',
            WebkitMaskImage: 'linear-gradient(to top, rgba(0,0,0,0.9) 0%, transparent 72%)',
          }}
        />
      </div>

      {/* Ceiling grid — mirrored receding plane at the top, fainter */}
      <div className="absolute inset-x-0 top-0 h-[55vh] [perspective:520px] [perspective-origin:50%_100%]">
        <motion.div
          className="absolute inset-x-[-50%] bottom-0 top-0 origin-top opacity-50"
          style={{
            ...gridLines,
            backgroundPositionY: ceilShift,
            transform: 'rotateX(-74deg)',
            maskImage: 'linear-gradient(to bottom, rgba(0,0,0,0.8) 0%, transparent 70%)',
            WebkitMaskImage: 'linear-gradient(to bottom, rgba(0,0,0,0.8) 0%, transparent 70%)',
          }}
        />
      </div>

      {/* Edge vignette so the grid fades to the sides as well */}
      <div
        className="absolute inset-0"
        style={{ background: 'radial-gradient(ellipse 90% 70% at 50% 50%, transparent 35%, #050510 88%)' }}
      />

      {/* Depth particles — three parallax layers of faint dots */}
      {!reduce && (
        <>
          <ParticleLayer count={14} size={1} blur={0} opacity={0.5} duration={9} />
          <ParticleLayer count={10} size={2} blur={1} opacity={0.32} duration={13} />
          <ParticleLayer count={6} size={3} blur={2} opacity={0.2} duration={18} />
        </>
      )}
    </div>
  );
}

// Deterministic pseudo-random so SSR and client agree (no Math.random hydration
// drift). Rounded to 3 decimals so tiny Math.sin precision differences between
// server and client don't trip React's hydration check.
function spread(i, n, salt) {
  const v = Math.sin((i + 1) * salt) * 10000;
  return Number((Math.abs(v - Math.floor(v)) * n).toFixed(3));
}

function ParticleLayer({ count, size, blur, opacity, duration }) {
  return (
    <>
      {Array.from({ length: count }).map((_, i) => {
        const left = spread(i, 100, 12.9898);
        const top = spread(i, 100, 78.233);
        const delay = spread(i, duration, 43.123);
        return (
          <motion.span
            key={`${size}-${i}`}
            className="absolute rounded-full bg-[#3b82f6]"
            style={{
              left: `${left}%`,
              top: `${top}%`,
              width: size,
              height: size,
              opacity,
              filter: blur ? `blur(${blur}px)` : undefined,
            }}
            animate={{ y: [0, -16, 0], opacity: [opacity, opacity * 0.4, opacity] }}
            transition={{ duration, delay, repeat: Infinity, ease: 'easeInOut' }}
          />
        );
      })}
    </>
  );
}
