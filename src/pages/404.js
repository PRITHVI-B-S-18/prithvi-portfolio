import Head from 'next/head';
import Link from 'next/link';

// Spatial-styled 404 — matches the blueprint aesthetic instead of editorial chrome.
export default function NotFound() {
  return (
    <>
      <Head>
        <title>404 — Off the grid</title>
        <meta name="robots" content="noindex" />
        <meta name="theme-color" content="#050510" />
      </Head>
      <main className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-[#050510] px-6 text-center font-plex text-white">
        {/* faint perspective grid backdrop */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.15]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(59,130,246,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(59,130,246,0.4) 1px, transparent 1px)',
            backgroundSize: '52px 52px',
            maskImage: 'radial-gradient(circle at 50% 45%, black, transparent 70%)',
            WebkitMaskImage: 'radial-gradient(circle at 50% 45%, black, transparent 70%)',
          }}
          aria-hidden="true"
        />

        <div className="relative">
          <p className="font-grotesk text-xs uppercase tracking-[0.3em] text-[#3b82f6]">Error · Sector not found</p>
          <h1 className="mt-4 font-grotesk font-bold leading-none text-white" style={{ fontSize: 'clamp(4rem, 18vw, 10rem)' }}>
            404
          </h1>
          <p className="mx-auto mt-4 max-w-sm font-plex leading-relaxed text-white/60">
            These coordinates don&apos;t map to anything. The structure you&apos;re after has moved or never existed.
          </p>
          <Link
            href="/"
            className="mt-8 inline-flex items-center gap-2 border border-white/15 px-6 py-3 font-grotesk text-sm font-medium uppercase tracking-[0.16em] text-white transition-colors hover:border-[#3b82f6] hover:text-[#3b82f6]"
          >
            <span aria-hidden="true">←</span> Return to base
          </Link>
        </div>
      </main>
    </>
  );
}
