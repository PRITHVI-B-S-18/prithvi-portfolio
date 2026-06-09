import Head from 'next/head';
import dynamic from 'next/dynamic';
import PaperGrain from '@/components/riso/PaperGrain';
import RisoNav from '@/components/riso/RisoNav';
import RisoHero from '@/components/riso/RisoHero';

// Below-fold sections are code-split (ssr on, so they stay in the static HTML).
const RisoAbout = dynamic(() => import('@/components/riso/RisoAbout'));
const RisoWork = dynamic(() => import('@/components/riso/RisoWork'));
const RisoExperience = dynamic(() => import('@/components/riso/RisoExperience'));
const RisoSkills = dynamic(() => import('@/components/riso/RisoSkills'));
const RisoContact = dynamic(() => import('@/components/riso/RisoContact'));

export default function Riso() {
  return (
    <>
      <Head>
        <title>Prithvi B S — Software Engineer / Print</title>
        <meta
          name="description"
          content="Prithvi B S, Software Engineer. A risograph / indie-print portfolio — layered inks, paper grain, hand-set type."
        />
        <meta name="theme-color" content="#fff8f0" />
      </Head>

      <div className="relative min-h-screen overflow-hidden bg-[#fff8f0] font-body text-[#1a1210] antialiased">
        <PaperGrain />
        <div className="relative z-10">
          <RisoNav />
          <main>
            <RisoHero />
            <RisoAbout />
            <RisoWork />
            <RisoExperience />
            <RisoSkills />
            <RisoContact />
          </main>
        </div>
      </div>
    </>
  );
}
