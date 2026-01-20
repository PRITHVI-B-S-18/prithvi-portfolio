import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Head from 'next/head';
import { useTheme } from 'next-themes';
import PageLayout from '@/components/Layout/PageLayout';

const contactMethods = [
  {
    name: 'Email',
    value: 'prithvikrishna1803@gmail.com',
    href: 'mailto:prithvikrishna1803@gmail.com',
    icon: '📧',
    iconType: 'emoji',
    color: 'from-blue-500 to-cyan-500',
  },
  {
    name: 'GitHub',
    value: 'github.com/PRITHVI-B-S-18',
    href: 'https://github.com/PRITHVI-B-S-18',
    icon: '/images/svgs/logo-github.svg',
    iconType: 'svg',
    color: 'from-gray-500 to-slate-500',
  },
  {
    name: 'LinkedIn',
    value: 'linkedin.com/in/prithvi-b-s-453628275',
    href: 'https://www.linkedin.com/in/prithvi-b-s-453628275',
    icon: '/images/svgs/linkedin.svg',
    iconType: 'svg',
    color: 'from-blue-600 to-blue-400',
  },
];

const ContactCard = ({ method, index }) => {
  const [isHovered, setIsHovered] = useState(false);
  const { theme } = useTheme();
  
  // Use white GitHub icon for dark mode, regular icon for light mode
  const getIconSrc = () => {
    if (method.name === 'GitHub' && theme === 'dark') {
      return '/images/svgs/github-white-icon.svg';
    }
    return method.icon;
  };

  return (
    <motion.a
      href={method.href}
      target={method.href.startsWith('http') ? '_blank' : undefined}
      rel={method.href.startsWith('http') ? 'noopener noreferrer' : undefined}
      className="relative group block"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Glow */}
      <motion.div
        className={`absolute -inset-2 rounded-2xl bg-gradient-to-r ${method.color} opacity-0 blur-xl`}
        animate={{ opacity: isHovered ? 0.4 : 0 }}
        transition={{ duration: 0.3 }}
      />

      <motion.div
        className="relative p-5 sm:p-6 rounded-2xl glass border border-[var(--border)] text-center"
        whileHover={{ y: -10, scale: 1.02 }}
        transition={{ type: 'spring', stiffness: 300 }}
        style={{ willChange: 'transform' }}
      >
        {method.iconType === 'svg' ? (
          <motion.div
            className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-3 sm:mb-4 flex items-center justify-center"
            animate={{ scale: isHovered ? 1.2 : 1, rotate: isHovered ? [0, -10, 10, 0] : 0 }}
            transition={{ duration: 0.4 }}
            style={{ willChange: 'transform' }}
          >
            <img
              src={getIconSrc()}
              alt={method.name}
              className="w-full h-full object-contain"
            />
          </motion.div>
        ) : (
          <motion.span
            className="text-4xl sm:text-5xl block mb-3 sm:mb-4"
            animate={{ scale: isHovered ? 1.2 : 1, rotate: isHovered ? [0, -10, 10, 0] : 0 }}
            transition={{ duration: 0.4 }}
            style={{ willChange: 'transform' }}
          >
            {method.icon}
          </motion.span>
        )}
        <h3 className="text-base sm:text-lg font-bold text-[var(--text-primary)] mb-2">{method.name}</h3>
        <p className="text-[var(--text-secondary)] text-xs sm:text-sm break-words overflow-wrap-anywhere">{method.value}</p>
      </motion.div>
    </motion.a>
  );
};

const Contact = () => {
  return (
    <PageLayout>
      <Head>
        <title>Contact | Prithvi B S</title>
        <meta name="description" content="Get in touch with Prithvi B S." />
      </Head>

      <section className="min-h-screen pt-24 sm:pt-32 pb-16 sm:pb-20 px-4 sm:px-6 overflow-x-hidden" style={{ position: 'relative', width: '100%', maxWidth: '100vw' }}>
        <div className="max-w-4xl mx-auto w-full flex flex-col justify-center min-h-[calc(100vh-6rem)]" style={{ border: 'none', outline: 'none' }}>
          {/* Header */}
          <motion.div
            className="text-center mb-12 sm:mb-16"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.span
              className="inline-block px-3 sm:px-4 py-1.5 sm:py-2 rounded-full glass text-xs sm:text-sm text-primary mb-4 sm:mb-6"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
            >
              Get in Touch
            </motion.span>
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-display font-bold mb-4 sm:mb-6">
              <span className="text-gradient">Let&apos;s Connect</span>
            </h1>
            <p className="text-lg sm:text-xl text-[var(--text-secondary)] max-w-2xl mx-auto">
              Have a project in mind or want to collaborate? I&apos;d love to hear from you!
            </p>
          </motion.div>

          {/* Contact Methods */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-8 sm:mb-12">
            {contactMethods.map((method, index) => (
              <ContactCard key={method.name} method={method} index={index} />
            ))}
          </div>

          {/* CTA Section */}
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <motion.div
              className="inline-block p-6 sm:p-8 rounded-2xl sm:rounded-3xl glass border border-[var(--border)]"
              whileHover={{ scale: 1.02 }}
            >
              <h2 className="text-2xl sm:text-3xl font-display font-bold text-[var(--text-primary)] mb-3 sm:mb-4">
                Let&apos;s Build Something Amazing
              </h2>
              <p className="text-sm sm:text-base text-[var(--text-secondary)] mb-4 sm:mb-6 max-w-lg mx-auto">
                I&apos;m always open to discussing new projects, creative ideas, 
                or opportunities to be part of your vision.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
                <motion.a
                  href="mailto:prithvikrishna1803@gmail.com"
                  className="btn-primary text-sm sm:text-base w-full sm:w-auto"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span className="relative z-10">Send Email →</span>
                </motion.a>
                <motion.a
                  href="/Resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-secondary text-sm sm:text-base w-full sm:w-auto"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Download Resume
                </motion.a>
              </div>
            </motion.div>
          </motion.div>

          {/* Footer */}
          <motion.div
            className="mt-12 sm:mt-16 lg:mt-20 text-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <p className="text-xs sm:text-sm text-[var(--text-secondary)]">
              © {new Date().getFullYear()} Prithvi B S <br/> Built with{' '}
              <span className="text-pink-500">♥</span> <br/>
            </p>
          </motion.div>
        </div>
      </section>
    </PageLayout>
  );
};

export default Contact;

