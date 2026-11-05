import { useState } from 'react';
import { motion } from 'framer-motion';
import useReducedMotionPref from '@/lib/useReducedMotionPref';
import PerspectiveSection from './PerspectiveSection';
import { SectionMarker } from './Primitives';

// Six axes (clean hexagon) mapped from the skill groups. `level` reflects
// relative depth/breadth and can be tuned freely.
const AXES = [
  { key: 'LANGUAGES', level: 0.92, items: ['JavaScript', 'TypeScript', 'Python', 'C++', 'SQL', 'Bash'] },
  { key: 'FRONTEND', level: 0.93, items: ['React', 'Next.js', 'Angular', 'Vite', 'Tailwind CSS'] },
  { key: 'AI / ML', level: 0.82, items: ['Azure OpenAI', 'GPT-4o', 'LLMs', 'MCP', 'n8n'] },
  { key: 'BACKEND', level: 0.9, items: ['Node.js', 'Electron', 'C++ (Node-API)', 'FastAPI', 'Flask'] },
  { key: 'CLOUD / DATA', level: 0.84, items: ['AWS (S3, CloudFront)', 'GCP Cloud Run', 'Firebase', 'Docker', 'PostgreSQL', 'ClickHouse'] },
  { key: 'SECURITY', level: 0.88, items: ['Anti-tamper & hook detection', 'VM detection', 'Code signing', 'JWT / OIDC auth', 'SQL-injection hardening'] },
];

// Qualitative proficiency tier — meaningful categorisation instead of a
// falsely-precise percentage. Driven by the same level that sizes the polygon.
function tierOf(level) {
  if (level >= 0.9) return 'CORE';
  if (level >= 0.84) return 'STRONG';
  return 'WORKING';
}

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
  const reduce = useReducedMotionPref();

  const dataPoints = AXES.map((ax, i) => pt(ANGLES[i], R * ax.level));
  const dataPolygon = dataPoints.map((p) => p.join(',')).join(' ');

  // Reveal the instrument in stages: rings sweep out, spokes draw, polygon
  // traces its outline, vertices pop, labels fade. Mirrors how a HUD boots up.
  const view = { once: true, margin: '-80px' };

  return (
    <PerspectiveSection id="skills" className="mx-auto max-w-6xl px-6 pb-20 pt-10 md:pb-28 md:pt-14" lift={8}>
      <SectionMarker index="03" label="Skills — Capability Radar" />

      <div className="mt-12 grid items-center gap-12 lg:grid-cols-[440px_1fr]">
        {/* Hand-coded SVG radar */}
        <div className="mx-auto w-full max-w-[440px]">
          <svg viewBox="0 0 440 400" className="w-full" role="img" aria-label="Skill capability radar">
            {/* Concentric hex rings — scale outward from the center, one by one */}
            {RINGS.map((ring, ri) => (
              <motion.polygon
                key={ring}
                points={hexPoints(R * ring)}
                fill="none"
                stroke="rgba(255,255,255,0.10)"
                strokeWidth="1"
                style={{ transformOrigin: `${CX}px ${CY}px` }}
                initial={reduce ? false : { scale: 0, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={view}
                transition={{ duration: 0.5, delay: 0.1 + ri * 0.1, ease: [0.22, 1, 0.36, 1] }}
              />
            ))}

            {/* Spokes — draw outward from the hub */}
            {ANGLES.map((ang, i) => {
              const [x, y] = pt(ang, R);
              return (
                <motion.line
                  key={i}
                  x1={CX}
                  y1={CY}
                  x2={x}
                  y2={y}
                  stroke="rgba(255,255,255,0.10)"
                  strokeWidth="1"
                  initial={reduce ? false : { pathLength: 0, opacity: 0 }}
                  whileInView={{ pathLength: 1, opacity: 1 }}
                  viewport={view}
                  transition={{ duration: 0.5, delay: 0.5 + i * 0.05 }}
                />
              );
            })}

            {/* Data polygon outline traces itself, then fills */}
            <motion.polygon
              points={dataPolygon}
              fill="rgba(59,130,246,0.16)"
              stroke="#3b82f6"
              strokeWidth="1.5"
              initial={reduce ? false : { pathLength: 0, fillOpacity: 0 }}
              whileInView={{ pathLength: 1, fillOpacity: 1 }}
              viewport={view}
              transition={{ pathLength: { duration: 1, delay: 0.9, ease: 'easeInOut' }, fillOpacity: { duration: 0.6, delay: 1.6 } }}
            />

            {/* Vertices pop in after the outline closes */}
            {dataPoints.map((p, i) => {
              const on = active === i;
              return (
                <motion.circle
                  key={i}
                  cx={p[0]}
                  cy={p[1]}
                  r={on ? 5.5 : 3}
                  fill={on ? '#60a5fa' : '#3b82f6'}
                  stroke="#050510"
                  strokeWidth="1.5"
                  initial={reduce ? false : { scale: 0, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={view}
                  transition={{ duration: 0.3, delay: reduce ? 0 : 1.5 + i * 0.06 }}
                  style={{ transformOrigin: `${p[0]}px ${p[1]}px`, transition: 'r 0.2s ease' }}
                />
              );
            })}

            {/* Hover proficiency overlay — reads out the level at the vertex */}
            {active !== null && (
              <motion.g
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.2 }}
                style={{ transformOrigin: `${dataPoints[active][0]}px ${dataPoints[active][1]}px` }}
              >
                <rect
                  x={dataPoints[active][0] - 34}
                  y={dataPoints[active][1] - 30}
                  width="68"
                  height="20"
                  rx="2"
                  fill="#0b0b18"
                  stroke="#3b82f6"
                  strokeWidth="1"
                />
                <text
                  x={dataPoints[active][0]}
                  y={dataPoints[active][1] - 20}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  className="font-grotesk"
                  fontSize="10"
                  letterSpacing="1.5"
                  fill="#60a5fa"
                >
                  {tierOf(AXES[active].level)}
                </text>
              </motion.g>
            )}

            {/* Axis labels */}
            {AXES.map((ax, i) => {
              const [x, y] = pt(ANGLES[i], R + 22);
              return (
                <motion.text
                  key={ax.key}
                  x={x}
                  y={y}
                  textAnchor={anchorFor(ANGLES[i])}
                  dominantBaseline="middle"
                  className="font-grotesk"
                  fontSize="11"
                  letterSpacing="1.5"
                  fill={active === i ? '#60a5fa' : 'rgba(255,255,255,0.55)'}
                  initial={reduce ? false : { opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={view}
                  transition={{ duration: 0.4, delay: 1.7 + i * 0.05 }}
                >
                  {ax.key}
                </motion.text>
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
              <div className="flex items-center justify-between gap-3">
                <p className="font-grotesk text-xs uppercase tracking-[0.2em] text-white/55">{ax.key}</p>
                <span className="shrink-0 border border-[#3b82f6]/40 px-1.5 py-0.5 font-grotesk text-[9px] uppercase tracking-[0.16em] text-[#60a5fa]">
                  {tierOf(ax.level)}
                </span>
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
