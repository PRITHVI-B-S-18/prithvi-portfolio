import '@/styles/globals.css';
import { useEffect } from 'react';
import localFont from 'next/font/local';
import { JetBrains_Mono } from 'next/font/google';
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

// Terminal/hacker aesthetic: JetBrains Mono for every element on the /terminal route.
const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  variable: '--font-jetbrains-mono',
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
    <div className={`${geistSans.variable} ${geistMono.variable} ${jetbrainsMono.variable} font-sans`}>
      {/* No editorial scroll bar on the terminal route — it has its own chrome. */}
      {router.pathname !== '/terminal' && <ScrollProgress />}
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
