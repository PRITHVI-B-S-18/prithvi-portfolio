import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';

const LINES = [
  'INITIALIZING SPATIAL ENVIRONMENT',
  'CALIBRATING PERSPECTIVE GRID',
  'LOADING TELEMETRY MODULES',
  'MAPPING COORDINATE FIELD',
  'SYSTEM READY',
];

/**
 * Boot sequence overlay — the page "powers on" like a spatial OS: a coordinate
 * counter ticks 000→100 while system lines print, then the panel wipes upward
 * to reveal the site. Runs once per browser session (sessionStorage); skipped
 * entirely under reduced-motion. Click anywhere to skip.
 */
export default function BootSequence() {
  const reduce = useReducedMotion();
  const [done, setDone] = useState(true); // assume done until we decide to show
  const [pct, setPct] = useState(0);
  const [line, setLine] = useState(0);
  const timers = useRef([]);

  useEffect(() => {
    if (reduce) return undefined;
    let booted = false;
    try {
      booted = sessionStorage.getItem('spatial-booted') === '1';
    } catch {
      /* ignore */
    }
    if (booted) return undefined;

    setDone(false);
    document.body.style.overflow = 'hidden';

    // local handle to the timers list so cleanup references a stable value
    const pendingTimers = timers.current;

    // count 0 -> 100 over ~1.6s
    const total = 1600;
    const start = performance.now();
    let raf = 0;
    const tick = (now) => {
      const p = Math.min(1, (now - start) / total);
      setPct(Math.round(p * 100));
      setLine(Math.min(LINES.length - 1, Math.floor(p * LINES.length)));
      if (p < 1) raf = requestAnimationFrame(tick);
      else pendingTimers.push(setTimeout(finish, 350));
    };
    raf = requestAnimationFrame(tick);

    function finish() {
      try {
        sessionStorage.setItem('spatial-booted', '1');
      } catch {
        /* ignore */
      }
      document.body.style.overflow = '';
      setDone(true);
    }

    const skip = () => {
      cancelAnimationFrame(raf);
      pendingTimers.forEach(clearTimeout);
      setPct(100);
      finish();
    };
    window.addEventListener('pointerdown', skip);

    return () => {
      cancelAnimationFrame(raf);
      pendingTimers.forEach(clearTimeout);
      window.removeEventListener('pointerdown', skip);
      document.body.style.overflow = '';
    };
  }, [reduce]);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          className="fixed inset-0 z-[200] flex flex-col items-center justify-center bg-[#050510]"
          exit={{ y: '-100%' }}
          transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
        >
          {/* faint grid backdrop */}
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.12]"
            style={{
              backgroundImage:
                'linear-gradient(rgba(59,130,246,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(59,130,246,0.5) 1px, transparent 1px)',
              backgroundSize: '48px 48px',
              maskImage: 'radial-gradient(circle at 50% 50%, black, transparent 75%)',
              WebkitMaskImage: 'radial-gradient(circle at 50% 50%, black, transparent 75%)',
            }}
          />

          <div className="relative w-full max-w-sm px-8">
            <div className="flex items-end justify-between">
              <span className="font-grotesk text-[11px] uppercase tracking-[0.3em] text-white/45">Booting</span>
              <span className="font-grotesk text-5xl font-bold tabular-nums text-white">
                {String(pct).padStart(3, '0')}
                <span className="text-[#3b82f6]">%</span>
              </span>
            </div>

            {/* progress rule */}
            <div className="mt-3 h-px w-full bg-white/10">
              <motion.div className="h-full bg-[#3b82f6]" animate={{ width: `${pct}%` }} transition={{ duration: 0.1 }} />
            </div>

            {/* system log */}
            <div className="mt-5 h-5 overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.p
                  key={line}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.2 }}
                  className="font-grotesk text-[11px] uppercase tracking-[0.2em] text-white/55"
                >
                  <span className="text-[#3b82f6]">›</span> {LINES[line]}
                </motion.p>
              </AnimatePresence>
            </div>
          </div>

          <span className="absolute bottom-8 font-grotesk text-[10px] uppercase tracking-[0.25em] text-white/25">
            Click to skip
          </span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
