import Head from 'next/head';
import dynamic from 'next/dynamic';
import SpatialNav from '@/components/spatial/SpatialNav';
import PerspectiveGrid from '@/components/spatial/PerspectiveGrid';
import SpatialHero from '@/components/spatial/SpatialHero';

// Below-fold sections are code-split so the initial bundle stays minimal.
// ssr stays on so content is in the static HTML (SEO + no layout shift).
const SpatialAbout = dynamic(() => import('@/components/spatial/SpatialAbout'));
const SpatialExperience = dynamic(() => import('@/components/spatial/SpatialExperience'));
const SpatialSkills = dynamic(() => import('@/components/spatial/SpatialSkills'));
const SpatialWork = dynamic(() => import('@/components/spatial/SpatialWork'));
const SpatialContact = dynamic(() => import('@/components/spatial/SpatialContact'));

export default function Spatial() {
  return (
    <>
      <Head>
        <title>Prithvi B S — Software Engineer / Spatial</title>
        <meta
          name="description"
          content="Prithvi B S, Software Engineer building secure, cross-platform systems. A spatial, blueprint-style portfolio."
        />
        <meta name="theme-color" content="#050510" />
      </Head>

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
