/**
 * Atmospheric paper grain, generated entirely in SVG (feTurbulence) — no
 * external image assets. Rendered as a low-opacity overlay that spans the full
 * page height; the cream base color is set on the page wrapper itself so it
 * always paints over the site's default dark theme.
 */
export default function PaperGrain() {
  return (
    <div className="pointer-events-none absolute inset-0 z-0" aria-hidden="true">
      <svg className="h-full w-full" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
        <filter id="paper-grain">
          <feTurbulence type="fractalNoise" baseFrequency="0.82" numOctaves="3" stitchTiles="stitch" />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#paper-grain)" opacity="0.06" />
      </svg>
    </div>
  );
}
