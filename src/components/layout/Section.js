import { motion } from 'framer-motion';

export default function Section({ id, label, title, subtitle, children, className = '' }) {
  return (
    <section
      id={id}
      className={`mx-auto max-w-6xl scroll-mt-16 px-6 pb-24 pt-6 sm:pb-28 sm:pt-10 ${className}`}
    >
      {(label || title) && (
        <header className="mb-12 max-w-2xl">
          {label && (
            <motion.div
              className="flex items-center gap-3"
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
            >
              <span className="h-px w-8 bg-grad" />
              <span className="font-mono text-xs uppercase tracking-[0.2em] text-accent">{label}</span>
            </motion.div>
          )}
          {title && (
            <motion.h2
              className="mt-5 text-3xl font-semibold tracking-tight text-ink sm:text-4xl md:text-5xl"
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
            >
              {title}
            </motion.h2>
          )}
          {subtitle && (
            <motion.p
              className="mt-5 text-lg leading-relaxed text-muted"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.12 }}
            >
              {subtitle}
            </motion.p>
          )}
        </header>
      )}
      {children}
    </section>
  );
}
