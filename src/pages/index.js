import React, { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import PageLayout from '@/components/Layout/PageLayout';
import TypeWriter from '@/components/UI/TypeWriter';
import FloatingShapes from '@/components/Effects/FloatingShapes';
import profilePic from '../../public/images/profile/developer-pic-1.png';

const roles = [
  'Building Intelligent Systems',
  'Crafting Seamless Experiences',
  'Automating Workflows',
  'Creating Production Systems',
];

const Hero = () => {
  const containerRef = useRef(null);
  const { scrollY } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });
  const y = useTransform(scrollY, [0, 500], [0, 150]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  return (
    <PageLayout>
      <Head>
        <title>Prithvi B S | AI & Full-Stack Developer</title>
        <meta name="description" content="Prithvi B S - AI/Data Science student and Full-Stack Developer specializing in production-ready systems and workflow automation." />
      </Head>

      <section
        ref={containerRef}
        className="relative min-h-screen flex items-center justify-center overflow-hidden overflow-x-hidden pt-16 sm:pt-20"
        style={{ position: 'relative', width: '100%', maxWidth: '100vw' }}
      >
        {/* Floating Shapes */}
        <FloatingShapes />

        {/* Gradient Orbs - Optimized with will-change */}
        <motion.div
          className="absolute top-1/4 left-1/4 w-48 sm:w-64 md:w-80 lg:w-96 h-48 sm:h-64 md:h-80 lg:h-96 rounded-full blur-[80px] sm:blur-[100px] lg:blur-[120px] opacity-20 sm:opacity-30"
          style={{
            background: 'radial-gradient(circle, #6366f1 0%, transparent 70%)',
            y,
            willChange: 'transform',
          }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-48 sm:w-64 md:w-80 lg:w-96 h-48 sm:h-64 md:h-80 lg:h-96 rounded-full blur-[80px] sm:blur-[100px] lg:blur-[120px] opacity-20 sm:opacity-30"
          style={{
            background: 'radial-gradient(circle, #ec4899 0%, transparent 70%)',
            y: useTransform(scrollY, [0, 500], [0, -100]),
            willChange: 'transform',
          }}
        />

        {/* Main Content */}
        <motion.div
          className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 grid lg:grid-cols-2 gap-8 sm:gap-12 items-center"
          style={{ opacity }}
        >
          {/* Text Content */}
          <div className="text-center lg:text-left order-2 lg:order-1">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <span className="inline-block px-3 sm:px-4 py-1.5 sm:py-2 rounded-full glass text-xs sm:text-sm text-primary mb-4 sm:mb-6">
                👋 Welcome to my portfolio
              </span>
            </motion.div>

            <motion.h1
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-display font-bold mb-4 sm:mb-6"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <span className="text-[var(--text-primary)]">I&apos;m </span>
              <span className="text-gradient glow-text">Prithvi</span>
              <br />
              <span className="text-[var(--text-primary)]">B S</span>
            </motion.h1>

            <motion.div
              className="mb-4 sm:mb-6"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <p className="text-lg sm:text-xl md:text-2xl text-[var(--text-secondary)] mb-2">
                AI & Full-Stack Developer
              </p>
              <div className="h-6 sm:h-8 flex items-center justify-center lg:justify-start">
                <TypeWriter texts={roles} className="text-base sm:text-lg md:text-xl text-primary" />
            </div>
            </motion.div>

            <motion.p
              className="text-[var(--text-secondary)] text-sm sm:text-base md:text-lg max-w-xl mb-6 sm:mb-8 mx-auto lg:mx-0"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              Transforming ideas into production-ready systems. I specialize in building
              AI-powered applications, workflow automation with n8n, and scalable full-stack solutions.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start items-stretch sm:items-center"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <Link href="/projects" className="w-full sm:w-auto">
                <motion.button
                  className="btn-primary relative z-10 w-full sm:w-auto text-sm sm:text-base px-6 sm:px-8 py-3 sm:py-4 h-12 sm:h-14 flex items-center justify-center"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    View Projects
                    <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </span>
                </motion.button>
              </Link>
              <Link href="/contact" className="w-full sm:w-auto">
                <motion.button
                  className="btn-secondary w-full sm:w-auto text-sm sm:text-base px-6 sm:px-8 py-3 sm:py-4 h-12 sm:h-14 flex items-center justify-center"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Let&apos;s Connect
                </motion.button>
                </Link>
            </motion.div>
              </div>

          {/* 3D Profile Image */}
          <motion.div
            className="relative order-1 lg:order-2 flex justify-center"
            initial={{ opacity: 0, scale: 0.8, rotateY: -30 }}
            animate={{ opacity: 1, scale: 1, rotateY: 0 }}
            transition={{ duration: 1, delay: 0.4, type: 'spring' }}
          >
            <div className="relative perspective-1000">
              {/* Glow effect */}
              <div className="absolute inset-0 rounded-2xl sm:rounded-3xl bg-gradient-to-r from-primary to-secondary opacity-50 blur-2xl sm:blur-3xl transform scale-110" />
              
              {/* 3D Card */}
              <motion.div
                className="relative w-56 h-56 sm:w-64 sm:h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 rounded-2xl sm:rounded-3xl overflow-hidden glass border border-primary/30"
                whileHover={{
                  rotateY: 10,
                  rotateX: -10,
                  scale: 1.05,
                }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                style={{ 
                  transformStyle: 'preserve-3d',
                  willChange: 'transform',
                }}
              >
                <Image
                  src={profilePic}
                  alt="Prithvi B S"
                  fill
                  className="object-contain"
                  priority
                  sizes="(max-width: 640px) 224px, (max-width: 768px) 256px, (max-width: 1024px) 320px, 384px"
                />
                
                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-dark-950/50 to-transparent" />
              </motion.div>
            </div>
          </motion.div>
        </motion.div>

      </section>
    </PageLayout>
  );
};

export default Hero;
