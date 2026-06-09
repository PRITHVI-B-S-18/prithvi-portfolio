import { useState, useEffect } from 'react';
import Head from 'next/head';
import dynamic from 'next/dynamic';
import TerminalChrome from '@/components/terminal/TerminalChrome';
import TerminalBoot from '@/components/terminal/TerminalBoot';
import CommandPalette from '@/components/terminal/CommandPalette';
import Whoami from '@/components/terminal/Whoami';

// Below-fold sections are code-split (kept in SSR for SEO / no layout shift).
const About = dynamic(() => import('@/components/terminal/About'));
const Experience = dynamic(() => import('@/components/terminal/Experience'));
const Projects = dynamic(() => import('@/components/terminal/Projects'));
const System = dynamic(() => import('@/components/terminal/System'));
const Contact = dynamic(() => import('@/components/terminal/Contact'));

export default function Terminal() {
  const [showBoot, setShowBoot] = useState(true);
  const [paletteOpen, setPaletteOpen] = useState(false);

  // Play the boot sequence once per tab session.
  useEffect(() => {
    try {
      if (sessionStorage.getItem('term-booted')) setShowBoot(false);
    } catch {
      /* ignore */
    }
  }, []);

  const endBoot = () => {
    try {
      sessionStorage.setItem('term-booted', '1');
    } catch {
      /* ignore */
    }
    setShowBoot(false);
  };

  return (
    <>
      <Head>
        <title>prithvi@portfolio:~$ — Software Engineer</title>
        <meta
          name="description"
          content="Prithvi B S — software engineer. A living-terminal portfolio: boot sequence, command palette, neofetch system panel."
        />
        <meta name="theme-color" content="#0a0a0a" />
      </Head>

      <div className="term-crt min-h-screen bg-term-bg font-terminal text-term-fg antialiased">
        <TerminalChrome onOpenPalette={() => setPaletteOpen(true)} />

        <main className="mx-auto max-w-3xl px-5">
          <Whoami />
          <About />
          <Experience />
          <Projects />
          <System />
          <Contact />
        </main>

        <CommandPalette open={paletteOpen} setOpen={setPaletteOpen} />
        {showBoot && <TerminalBoot onDone={endBoot} />}
      </div>
    </>
  );
}
