import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { profile } from '@/content/profile';

const links = [
  { label: 'About', href: '#about', id: 'about' },
  { label: 'Experience', href: '#experience', id: 'experience' },
  { label: 'Skills', href: '#skills', id: 'skills' },
  { label: 'Work', href: '#work', id: 'work' },
  { label: 'Contact', href: '#contact', id: 'contact' },
];

export default function SpatialNav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState('top');

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  // Scroll-spy: highlight the nav item for whichever section owns the viewport.
  useEffect(() => {
    const ids = ['top', ...links.map((l) => l.id)];
    const sections = ids.map((id) => document.getElementById(id)).filter(Boolean);
    if (!sections.length) return undefined;
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: '-45% 0px -45% 0px', threshold: [0, 0.25, 0.5, 1] }
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
          scrolled || open ? 'border-b border-white/10 bg-[#050510]/80 backdrop-blur-md' : 'border-b border-transparent'
        }`}
      >
        <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <a href="#top" className="group flex items-center gap-2.5">
            <span className="grid h-6 w-6 place-items-center border border-[#3b82f6]/50 text-[#3b82f6]">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 13l7-7 7 7M5 19l7-7 7 7" />
              </svg>
            </span>
            <span className="font-grotesk text-sm font-semibold tracking-tight text-white">{profile.name}</span>
          </a>

          <div className="hidden items-center gap-8 md:flex">
            <ul className="flex gap-7">
              {links.map((l) => {
                const isActive = active === l.id;
                return (
                  <li key={l.href}>
                    <a
                      href={l.href}
                      className={`relative font-grotesk text-xs uppercase tracking-[0.18em] transition-colors ${
                        isActive ? 'text-[#3b82f6]' : 'text-white/55 hover:text-white'
                      }`}
                    >
                      {l.label}
                      {isActive && (
                        <motion.span
                          layoutId="nav-active"
                          className="absolute -bottom-1.5 left-0 h-px w-full bg-[#3b82f6]"
                          transition={{ type: 'spring', stiffness: 400, damping: 32 }}
                        />
                      )}
                    </a>
                  </li>
                );
              })}
            </ul>
            <a
              href={profile.resume}
              target="_blank"
              rel="noopener noreferrer"
              className="border border-white/15 px-4 py-1.5 font-grotesk text-xs uppercase tracking-[0.18em] text-white transition-colors hover:border-[#3b82f6] hover:text-[#3b82f6]"
            >
              Résumé
            </a>
          </div>

          <button
            type="button"
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="relative z-[70] flex h-9 w-9 flex-col items-center justify-center gap-1.5 md:hidden"
          >
            <motion.span className="block h-px w-6 bg-white" animate={open ? { rotate: 45, y: 3 } : { rotate: 0, y: 0 }} transition={{ duration: 0.2 }} />
            <motion.span className="block h-px w-6 bg-white" animate={open ? { rotate: -45, y: -3 } : { rotate: 0, y: 0 }} transition={{ duration: 0.2 }} />
          </button>
        </nav>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[60] flex flex-col bg-[#050510]/97 backdrop-blur-xl md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22 }}
          >
            {/* Overlay top bar with an explicit, labelled close button */}
            <div className="flex items-center justify-between border-b border-white/10 px-6 py-4">
              <span className="font-grotesk text-sm font-semibold tracking-tight text-white">{profile.name}</span>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close menu"
                className="flex items-center gap-2 border border-white/15 px-3 py-1.5 font-grotesk text-[11px] uppercase tracking-[0.18em] text-white transition-colors hover:border-[#3b82f6] hover:text-[#3b82f6]"
              >
                Close
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <path d="M6 6l12 12M18 6L6 18" />
                </svg>
              </button>
            </div>

            <nav className="flex flex-1 flex-col justify-center gap-1 px-8">
              {links.map((l, i) => {
                const isActive = active === l.id;
                return (
                  <motion.a
                    key={l.href}
                    href={l.href}
                    onClick={() => setOpen(false)}
                    initial={{ opacity: 0, x: -16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.06 * i + 0.05, duration: 0.35 }}
                    className={`flex items-baseline gap-4 border-b border-white/8 py-4 font-grotesk text-3xl font-medium tracking-tight transition-colors ${
                      isActive ? 'text-[#3b82f6]' : 'text-white hover:text-[#3b82f6]'
                    }`}
                  >
                    <span className="font-grotesk text-xs tracking-[0.3em] text-[#3b82f6]">{`0${i + 1}`}</span>
                    {l.label}
                  </motion.a>
                );
              })}
              <a
                href={profile.resume}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setOpen(false)}
                className="mt-8 w-fit border border-white/15 px-6 py-3 font-grotesk text-sm uppercase tracking-[0.2em] text-white transition-colors hover:border-[#3b82f6] hover:text-[#3b82f6]"
              >
                Résumé
              </a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
