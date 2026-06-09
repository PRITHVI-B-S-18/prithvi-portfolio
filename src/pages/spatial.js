import { useEffect } from 'react';
import Head from 'next/head';
import dynamic from 'next/dynamic';
import SpatialNav from '@/components/spatial/SpatialNav';
import PerspectiveGrid from '@/components/spatial/PerspectiveGrid';
import SpatialHero from '@/components/spatial/SpatialHero';

// Client-only interface chrome — no SSR needed (they read window/pointer).
const BootSequence = dynamic(() => import('@/components/spatial/BootSequence'), { ssr: false });
const TelemetryHUD = dynamic(() => import('@/components/spatial/TelemetryHUD'), { ssr: false });

// Below-fold sections are code-split so the initial bundle stays minimal.
// ssr stays on so content is in the static HTML (SEO + no layout shift).
const SpatialAbout = dynamic(() => import('@/components/spatial/SpatialAbout'));
const SpatialExperience = dynamic(() => import('@/components/spatial/SpatialExperience'));
const SpatialSkills = dynamic(() => import('@/components/spatial/SpatialSkills'));
const SpatialWork = dynamic(() => import('@/components/spatial/SpatialWork'));
const SpatialContact = dynamic(() => import('@/components/spatial/SpatialContact'));

export default function Spatial() {
  // Deep-link support: when arriving with a hash (e.g. /spatial/#work), scroll
  // to that section once the page has laid out. scroll-mt on each section
  // keeps it clear of the fixed header.
  useEffect(() => {
    const { hash } = window.location;
    if (!hash || hash.length < 2) return undefined;
    const el = document.querySelector(hash);
    if (!el) return undefined;
    const t = setTimeout(() => el.scrollIntoView({ behavior: 'auto' }), 60);
    return () => clearTimeout(t);
  }, []);

  return (
    <>
      <Head>
        <title>Prithvi B S — Software Engineer / Spatial</title>
        <meta
          name="description"
          content="Prithvi B S, Software Engineer building secure, cross-platform systems. A spatial, blueprint-style portfolio."
        />
        <meta property="og:title" content="Prithvi B S — Software Engineer" />
        <meta
          property="og:description"
          content="Software Engineer building secure, cross-platform systems. Neo Browser team at iamneo. Spatial / blueprint portfolio."
        />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="/images/profile/portrait-1.jpg" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="theme-color" content="#050510" />
      </Head>

      {/* Boot overlay + instrument chrome */}
      <BootSequence />
      <TelemetryHUD />

      {/* Background layer (z:-1) */}
      <PerspectiveGrid />

      <div className="relative min-h-screen font-plex text-white antialiased">
        <SpatialNav />
        <main>
          <SpatialHero />
          <SpatialAbout />
          <SpatialExperience />
          <SpatialSkills />
          <SpatialWork />
          <SpatialContact />
        </main>
      </div>
    </>
  );
}
