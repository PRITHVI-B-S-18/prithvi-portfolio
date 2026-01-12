import '@/styles/globals.css';
import { ThemeProvider } from 'next-themes';
import { AnimatePresence, motion } from 'framer-motion';
import { useRouter } from 'next/router';

const pageVariants = {
  initial: {
    opacity: 0,
    y: 20,
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
  exit: {
    opacity: 0,
    y: -20,
    transition: {
      duration: 0.3,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
};

export default function App({ Component, pageProps }) {
  const router = useRouter();

  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={router.pathname}
          variants={pageVariants}
          initial="initial"
          animate="animate"
          exit="exit"
        >
      <Component {...pageProps} />
        </motion.div>
      </AnimatePresence>
    </ThemeProvider>
  );
}
