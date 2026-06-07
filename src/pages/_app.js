import '@/styles/globals.css';
import localFont from 'next/font/local';
import { AnimatePresence, motion } from 'framer-motion';
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

export default function App({ Component, pageProps }) {
  const router = useRouter();

  return (
    <div className={`${geistSans.variable} ${geistMono.variable} font-sans`}>
      <ScrollProgress />
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={router.pathname}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
        >
          <Component {...pageProps} />
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
