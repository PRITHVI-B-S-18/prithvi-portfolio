import { useState } from 'react';
import { motion } from 'framer-motion';
import PerspectiveSection from './PerspectiveSection';
import { SectionMarker } from './Primitives';

// Six axes (clean hexagon) mapped from the skill groups. `level` reflects
// relative depth/breadth and can be tuned freely.
const AXES = [
  { key: 'LANGUAGES', level: 0.92, items: ['Python', 'JavaScript', 'TypeScript', 'C++', 'SQL'] },
  { key: 'FRONTEND', level: 0.95, items: ['React', 'Next.js', 'Vite', 'Tailwind CSS', 'Streamlit'] },
  { key: 'AI / ML', level: 0.82, items: ['Azure OpenAI', 'GPT-4o', 'LLMs', 'GenAI', 'MTCNN'] },
  { key: 'BACKEND', level: 0.86, items: ['FastAPI', 'Flask', 'Django', 'Node.js', 'Electron'] },
  { key: 'CLOUD / DATA', level: 0.8, items: ['Azure', 'Firebase', 'AWS', 'Docker', 'PostgreSQL', 'Supabase'] },
  { key: 'AUTOMATION', level: 0.9, items: ['n8n', 'Selenium', 'Git', 'Cursor', 'Claude Code'] },
];

const CX = 220;
const CY = 200;
const R = 138;
const RINGS = [0.25, 0.5, 0.75, 1];

// Axis angles: start at top, step 60° clockwise.
const ANGLES = AXES.map((_, i) => -90 + i * 60);

function pt(angleDeg, radius) {
  const a = (angleDeg * Math.PI) / 180;
  return [CX + radius * Math.cos(a), CY + radius * Math.sin(a)];
}

function hexPoints(radius) {
  return ANGLES.map((ang) => pt(ang, radius).join(',')).join(' ');
}

function anchorFor(angleDeg) {
  const c = Math.cos((angleDeg * Math.PI) / 180);
  if (c > 0.3) return 'start';
  if (c < -0.3) return 'end';
  return 'middle';
}

export default function SpatialSkills() {
  const [active, setActive] = useState(null);

  const dataPoints = AXES.map((ax, i) => pt(ANGLES[i], R * ax.level));
  const dataPolygon = dataPoints.map((p) => p.join(',')).join(' ');

  return (
    <PerspectiveSection id="skills" className="mx-auto max-w-6xl px-6 py-16 md:py-28" lift={8}>
      <SectionMarker index="03" label="Skills — Capability Radar" />

      <div className="mt-12 grid items-center gap-12 lg:grid-cols-[440px_1fr]">
        {/* Hand-coded SVG radar */}
        <div className="mx-auto w-full max-w-[440px]">
          <svg viewBox="0 0 440 400" className="w-full" role="img" aria-label="Skill capability radar">
            {/* Concentric hex rings */}
            {RINGS.map((ring) => (
              <polygon
                key={ring}
                points={hexPoints(R * ring)}
                fill="none"
                stroke="rgba(255,255,255,0.10)"
                strokeWidth="1"
              />
            ))}

            {/* Spokes */}
            {ANGLES.map((ang, i) => {
              const [x, y] = pt(ang, R);
              return <line key={i} x1={CX} y1={CY} x2={x} y2={y} stroke="rgba(255,255,255,0.10)" strokeWidth="1" />;
            })}

            {/* Data polygon (animates in from the center) */}
            <motion.g
              style={{ transformOrigin: `${CX}px ${CY}px` }}
              initial={{ scale: 0.2, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            >
              <polygon points={dataPolygon} fill="rgba(59,130,246,0.16)" stroke="#3b82f6" strokeWidth="1.5" />
              {dataPoints.map((p, i) => {
                const on = active === i;
                return (
                  <circle
                    key={i}
                    cx={p[0]}
                    cy={p[1]}
                    r={on ? 5 : 3}
                    fill={on ? '#60a5fa' : '#3b82f6'}
                    stroke="#050510"
                    strokeWidth="1.5"
                  />
                );
              })}
            </motion.g>

            {/* Axis labels */}
            {AXES.map((ax, i) => {
              const [x, y] = pt(ANGLES[i], R + 22);
              return (
                <text
                  key={ax.key}
                  x={x}
                  y={y}
                  textAnchor={anchorFor(ANGLES[i])}
                  dominantBaseline="middle"
                  className="font-grotesk"
                  fontSize="11"
                  letterSpacing="1.5"
                  fill={active === i ? '#60a5fa' : 'rgba(255,255,255,0.55)'}
                >
                  {ax.key}
                </text>
              );
            })}
          </svg>
        </div>

        {/* Legend — each axis and its skills */}
        <div className="grid gap-px border border-white/10 bg-white/5 sm:grid-cols-2">
          {AXES.map((ax, i) => (
            <div
              key={ax.key}
              className="bg-[#070713] p-5 transition-colors"
              style={{ backgroundColor: active === i ? 'rgba(59,130,246,0.05)' : undefined }}
              onMouseEnter={() => setActive(i)}
              onMouseLeave={() => setActive(null)}
            >
              <div className="flex items-center justify-between">
                <p className="font-grotesk text-xs uppercase tracking-[0.2em] text-white/55">{ax.key}</p>
                <span className="font-grotesk text-[10px] text-[#3b82f6]">{Math.round(ax.level * 100)}</span>
              </div>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {ax.items.map((it) => (
                  <span key={it} className="border border-white/10 px-2 py-0.5 font-plex text-[12px] text-white/60">
                    {it}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </PerspectiveSection>
  );
}
