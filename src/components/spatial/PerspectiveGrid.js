import { useRef } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import useIsDesktop from '@/lib/useIsDesktop';

/**
 * Background layer (z:-1). A receding perspective grid over deep space.
 *
 * The expensive animated layers — large drifting blur orbs, the radar scan
 * sweep, depth particles, and pulsing markers — run ONLY on desktop. Animated
 * 100px+ blurs are very costly on mobile GPUs and caused jank, so mobile gets
 * a lightweight static backdrop instead (dark base + one static glow + grid).
 */
export default function PerspectiveGrid() {
  const reduce = useReducedMotion();
  const { isDesktop, mounted } = useIsDesktop();
  const ref = useRef(null);
  const { scrollYProgress } = useScroll();

  // Heavy animated decoration: desktop, mounted, motion allowed.
  const rich = mounted && isDesktop && !reduce;

  // Scroll-linked grid drift only when rich (avoids repaint cost on mobile).
  const floorShift = useTransform(scrollYProgress, [0, 1], [0, rich ? 220 : 0]);
  const ceilShift = useTransform(scrollYProgress, [0, 1], [0, rich ? -140 : 0]);

  const gridLines = {
    backgroundImage:
      'linear-gradient(rgba(59,130,246,0.18) 1px, transparent 1px), linear-gradient(90deg, rgba(59,130,246,0.18) 1px, transparent 1px)',
    backgroundSize: '64px 64px',
  };

  return (
    <div ref={ref} className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-[#050510]">
      {/* Drifting ambient orbs — desktop only (animated big blurs) */}
      {rich && (
        <>
          <motion.div
            className="absolute h-[55vh] w-[55vh] rounded-full blur-[120px]"
            style={{ background: 'radial-gradient(circle, rgba(59,130,246,0.26), transparent 70%)', left: '6%', top: '8%' }}
            animate={{ x: [0, 90, -50, 0], y: [0, 70, 30, 0], scale: [1, 1.18, 0.92, 1] }}
            transition={{ duration: 26, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.div
            className="absolute h-[48vh] w-[48vh] rounded-full blur-[110px]"
            style={{ background: 'radial-gradient(circle, rgba(88,150,255,0.2), transparent 70%)', right: '4%', top: '38%' }}
            animate={{ x: [0, -80, 40, 0], y: [0, -60, 20, 0], scale: [1, 0.88, 1.12, 1] }}
            transition={{ duration: 32, repeat: Infinity, ease: 'easeInOut' }}
          />
        </>
      )}

      {/* Vanishing-point glow — breathes on desktop, static (cheap) on mobile */}
      <motion.div
        className="absolute left-1/2 top-1/2 h-[55vh] w-[55vh] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[90px] md:blur-[120px]"
        style={{ background: 'radial-gradient(circle, rgba(59,130,246,0.13), transparent 70%)' }}
        animate={rich ? { scale: [1, 1.12, 1], opacity: [0.8, 1, 0.8] } : undefined}
        transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
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

      {/* Radar scan sweep — desktop only */}
      {rich && (
        <motion.div
          className="absolute inset-x-0 h-48"
          style={{
            background:
              'linear-gradient(to bottom, transparent, rgba(59,130,246,0.10) 55%, rgba(96,165,250,0.28) 90%, rgba(96,165,250,0.55) 100%)',
            borderBottom: '1.5px solid rgba(120,180,255,0.7)',
            boxShadow: '0 2px 18px rgba(96,165,250,0.4)',
          }}
          initial={{ top: '-15%' }}
          animate={{ top: ['-15%', '115%'] }}
          transition={{ duration: 6.5, repeat: Infinity, ease: 'easeInOut', repeatDelay: 2.5 }}
        />
      )}

      {/* Edge vignette so the grid fades to the sides as well */}
      <div
        className="absolute inset-0"
        style={{ background: 'radial-gradient(ellipse 90% 70% at 50% 50%, transparent 35%, #050510 88%)' }}
      />

      {/* Pulsing markers + depth particles — desktop only */}
      {rich && <CoordinateMarkers />}
      {rich && (
        <>
          <ParticleLayer count={14} size={1} blur={0} opacity={0.5} duration={9} />
          <ParticleLayer count={9} size={2} blur={1} opacity={0.32} duration={13} />
          <ParticleLayer count={5} size={3} blur={2} opacity={0.2} duration={18} />
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

// A handful of small crosshair marks that fade/pulse in place, like the
// registration ticks on a technical drawing coming to life.
const MARKERS = [
  { left: 14, top: 22 },
  { left: 82, top: 18 },
  { left: 68, top: 64 },
  { left: 24, top: 74 },
  { left: 90, top: 50 },
];

function CoordinateMarkers() {
  return (
    <>
      {MARKERS.map((m, i) => (
        <motion.div
          key={i}
          className="absolute"
          style={{ left: `${m.left}%`, top: `${m.top}%` }}
          animate={{ opacity: [0.12, 0.4, 0.12], scale: [0.85, 1, 0.85] }}
          transition={{ duration: 4 + i, delay: i * 0.8, repeat: Infinity, ease: 'easeInOut' }}
        >
          <span className="absolute left-1/2 top-1/2 h-3 w-px -translate-x-1/2 -translate-y-1/2 bg-[#3b82f6]/60" />
          <span className="absolute left-1/2 top-1/2 h-px w-3 -translate-x-1/2 -translate-y-1/2 bg-[#3b82f6]/60" />
        </motion.div>
      ))}
    </>
  );
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
