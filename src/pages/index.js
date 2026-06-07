import Head from 'next/head';
import SiteNav from '@/components/layout/SiteNav';
import Footer from '@/components/layout/Footer';
import Hero from '@/components/sections/Hero';
import About from '@/components/sections/About';
import Experience from '@/components/sections/Experience';
import Work from '@/components/sections/Work';
import Skills from '@/components/sections/Skills';
import Contact from '@/components/sections/Contact';

export default function Home() {
  return (
    <>
      <Head>
        <title>Prithvi B S | Software Engineer</title>
        <meta
          name="description"
          content="Prithvi B S, Software Engineer building secure, cross-platform systems. Currently on the Neo Browser team at iamneo."
        />
        <meta property="og:title" content="Prithvi B S | Software Engineer" />
        <meta
          property="og:description"
          content="Software Engineer building secure, cross-platform systems. Neo Browser team at iamneo."
        />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="/images/profile/portrait-1.jpg" />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>
      <SiteNav />
      <main>
        <Hero />
        <About />
        <Experience />
        <Work />
        <Skills />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
