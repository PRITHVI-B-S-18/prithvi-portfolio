import { useEffect, useRef, useState } from 'react';
import { useReducedMotion } from 'framer-motion';

const SECTION_LABELS = {
  top: 'HOME',
  about: 'ABOUT',
  experience: 'EXPERIENCE',
  skills: 'SKILLS',
  work: 'WORK',
  contact: 'CONTACT',
};

/**
 * Fixed aerospace-style telemetry readout, bottom-left. Reports live pointer
 * coordinates (mapped to LAT/LON), scroll depth, and the active section — the
 * "instrumentation" layer the brief asks for. rAF-throttled; desktop only.
 */
export default function TelemetryHUD() {
  const reduce = useReducedMotion();
  const [enabled, setEnabled] = useState(false);
  const [data, setData] = useState({ lat: '0.000', lon: '0.000', scroll: 0, section: 'HOME' });
  const frame = useRef(0);
  const pending = useRef(null);

  useEffect(() => {
    const fine = window.matchMedia('(min-width: 768px)').matches;
    if (!fine) return undefined;
    setEnabled(true);

    const sectionEls = Object.keys(SECTION_LABELS)
      .map((id) => document.getElementById(id))
      .filter(Boolean);

    const activeSection = () => {
      const mid = window.innerHeight / 2;
      let best = 'HOME';
      let bestDist = Infinity;
      sectionEls.forEach((el) => {
        const r = el.getBoundingClientRect();
        const d = Math.abs(r.top + r.height / 2 - mid);
        if (d < bestDist) {
          bestDist = d;
          best = SECTION_LABELS[el.id] || best;
        }
      });
      return best;
    };

    const compute = (clientX, clientY) => {
      const w = window.innerWidth || 1;
      const h = window.innerHeight || 1;
      // map cursor to a pseudo lat/lon grid
      const lat = (((clientY ?? h / 2) / h) * 180 - 90).toFixed(3);
      const lon = (((clientX ?? w / 2) / w) * 360 - 180).toFixed(3);
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const scroll = max > 0 ? Math.round((window.scrollY / max) * 100) : 0;
      setData({ lat, lon, scroll, section: activeSection() });
    };

    const onMove = (e) => {
      pending.current = { x: e.clientX, y: e.clientY };
      if (!frame.current) {
        frame.current = requestAnimationFrame(() => {
          frame.current = 0;
          compute(pending.current?.x, pending.current?.y);
        });
      }
    };
    const onScroll = () => {
      if (!frame.current) {
        frame.current = requestAnimationFrame(() => {
          frame.current = 0;
          compute(pending.current?.x, pending.current?.y);
        });
      }
    };

    compute();
    window.addEventListener('pointermove', onMove);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('scroll', onScroll);
      if (frame.current) cancelAnimationFrame(frame.current);
    };
  }, []);

  if (!enabled) return null;

  return (
    <div
      className={`pointer-events-none fixed bottom-5 left-5 z-40 hidden select-none border border-white/10 bg-[#050510]/70 px-3 py-2 font-grotesk text-[10px] uppercase tracking-[0.18em] text-white/45 backdrop-blur-sm md:block ${
        reduce ? '' : 'transition-opacity'
      }`}
      aria-hidden="true"
    >
      <div className="flex items-center gap-4">
        <span>
          LAT <span className="text-[#3b82f6]">{data.lat}</span>
        </span>
        <span>
          LON <span className="text-[#3b82f6]">{data.lon}</span>
        </span>
      </div>
      <div className="mt-1 flex items-center gap-4">
        <span>
          DEPTH <span className="text-[#3b82f6]">{String(data.scroll).padStart(3, '0')}%</span>
        </span>
        <span>
          SECT <span className="text-[#3b82f6]">{data.section}</span>
        </span>
      </div>
    </div>
  );
}
