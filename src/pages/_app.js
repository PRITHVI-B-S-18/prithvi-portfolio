import '@/styles/globals.css';
import { useEffect } from 'react';
import localFont from 'next/font/local';
import { Space_Grotesk, IBM_Plex_Sans } from 'next/font/google';
import { motion } from 'framer-motion';
import { useRouter } from 'next/router';
import ScrollProgress from '@/components/ui/ScrollProgress';

// Load Geist via next/font/local pointing at the package's woff2 files
// (the geist package's own ESM export breaks Node 22 dir-import resolution).
const geistSans = localFont({
  src: '../../node_modules/geist/dist/fonts/geist-sans/Geist-Variable.woff2',
  variable: '--font-geist-sans',
  weight: '100 900',
  display: 'swap',
});

const geistMono = localFont({
  src: '../../node_modules/geist/dist/fonts/geist-mono/GeistMono-Variable.woff2',
  variable: '--font-geist-mono',
  weight: '100 900',
  display: 'swap',
});

// Spatial/blueprint type system: Space Grotesk (architectural headings) +
// IBM Plex Sans (body). Consumed by the /spatial route via font-grotesk / font-plex.
const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-space-grotesk',
  display: 'swap',
});

const ibmPlex = IBM_Plex_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-ibm-plex',
  display: 'swap',
});

export default function App({ Component, pageProps }) {
  const router = useRouter();

  // Let the browser restore scroll position on refresh (honoring hashes),
  // instead of always snapping to the top.
  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'auto';
    }
  }, []);

  return (
    <div className={`${geistSans.variable} ${geistMono.variable} ${spaceGrotesk.variable} ${ibmPlex.variable} font-sans`}>
      {/* The editorial accent scroll bar would clash with the blue spatial theme. */}
      {/* Spatial routes ('/' and '/spatial') have their own blue progress bar. */}
      {!['/', '/spatial'].includes(router.pathname) && <ScrollProgress />}
      {/* Enter-only fade keyed by route. No exit animation, so navigating away
          replaces the page instantly (avoids the old page flashing at the top). */}
      <motion.div
        key={router.pathname}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
      >
        <Component {...pageProps} />
      </motion.div>
    </div>
  );
}
