import React from 'react';
import { motion } from 'framer-motion';
import Head from 'next/head';
import PageLayout from '@/components/Layout/PageLayout';

const achievements = [
  {
    title: 'Employee of the Month',
    subtitle: 'March & July 2025',
    description: 'Awarded twice at iamneo for outstanding contributions and consistent delivery of high-impact projects.',
    icon: '🏆',
    color: 'from-yellow-400 to-amber-500',
    particles: ['✨', '⭐', '🌟'],
  },
  {
    title: 'BIT\'S HACK\'22 Winner',
    subtitle: '1st Place',
    description: 'Won first place in college hackathon for innovative problem-solving solution that impressed the judges.',
    icon: '🥇',
    color: 'from-yellow-300 to-yellow-500',
    particles: ['🎉', '🏅', '🎊'],
  },
  {
    title: '8 Production Systems',
    subtitle: 'Actively Deployed',
    description: 'Architected and deployed 8 production-ready systems that are actively used by teams daily.',
    icon: '🚀',
    color: 'from-blue-400 to-cyan-500',
    particles: ['💻', '⚡', '🔥'],
  },
  {
    title: 'BIT HACK\'23 Finalist',
    subtitle: 'Top Teams',
    description: 'Reached finals among 100+ teams with an AI-powered project that showcased cutting-edge technology.',
    icon: '🎯',
    color: 'from-purple-400 to-pink-500',
    particles: ['🤖', '💡', '🧠'],
  },
];

const AchievementCard = ({ achievement, index }) => {
  return (
    <motion.div
      className="relative group"
      initial={{ opacity: 0, y: 50, rotateX: -10 }}
      whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.15, duration: 0.6 }}
    >
      {/* Glow */}
      <motion.div
        className={`absolute -inset-2 rounded-3xl bg-gradient-to-r ${achievement.color} opacity-0 blur-2xl transition-opacity duration-500`}
        whileHover={{ opacity: 0.4 }}
      />

      <motion.div
        className="relative h-full p-5 sm:p-6 md:p-8 rounded-2xl sm:rounded-3xl glass border border-[var(--border)] overflow-hidden"
        whileHover={{ y: -10, scale: 1.02 }}
        transition={{ type: 'spring', stiffness: 300 }}
        style={{ willChange: 'transform' }}
      >
        {/* Floating Particles */}
        {achievement.particles.map((particle, i) => (
          <motion.span
            key={i}
            className="absolute text-xl sm:text-2xl opacity-20"
            style={{
              top: `${20 + i * 30}%`,
              right: `${10 + i * 15}%`,
            }}
            animate={{
              y: [0, -20, 0],
              rotate: [0, 10, -10, 0],
              opacity: [0.2, 0.4, 0.2],
            }}
            transition={{
              duration: 3 + i,
              repeat: Infinity,
              delay: i * 0.5,
            }}
          >
            {particle}
          </motion.span>
        ))}

        {/* Icon */}
        <motion.div
          className="text-4xl sm:text-5xl md:text-6xl mb-4 sm:mb-6"
          animate={{
            y: [0, -10, 0],
            rotate: [0, 5, -5, 0],
          }}
          transition={{ duration: 4, repeat: Infinity }}
        >
          {achievement.icon}
        </motion.div>

        {/* Content */}
        <h3 className="text-xl sm:text-2xl font-display font-bold text-[var(--text-primary)] mb-2">
          {achievement.title}
        </h3>
        <motion.span
          className={`inline-block px-2 sm:px-3 py-1 rounded-full text-[10px] sm:text-xs font-bold text-white bg-gradient-to-r ${achievement.color} mb-3 sm:mb-4`}
        >
          {achievement.subtitle}
        </motion.span>
        <p className="text-sm sm:text-base text-[var(--text-secondary)] break-words">{achievement.description}</p>

        {/* Shine effect */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full"
          whileHover={{ translateX: '200%' }}
          transition={{ duration: 0.8 }}
        />
      </motion.div>
    </motion.div>
  );
};

const Achievements = () => {
  return (
    <PageLayout>
      <Head>
        <title>Achievements | Prithvi B S</title>
        <meta name="description" content="Awards and achievements of Prithvi B S." />
      </Head>

      <section className="min-h-screen pt-24 sm:pt-32 pb-16 sm:pb-20 px-4 sm:px-6 overflow-x-hidden" style={{ position: 'relative', width: '100%', maxWidth: '100vw' }}>
        <div className="max-w-6xl mx-auto w-full" style={{ border: 'none', outline: 'none' }}>
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
              Recognition
            </motion.span>
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-display font-bold mb-4 sm:mb-6">
              <span className="text-gradient">Achievements</span>
            </h1>
            <p className="text-lg sm:text-xl text-[var(--text-secondary)] max-w-2xl mx-auto">
              Milestones and recognition along the journey
            </p>
          </motion.div>

          {/* Achievements Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
            {achievements.map((achievement, index) => (
              <AchievementCard key={achievement.title} achievement={achievement} index={index} />
            ))}
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default Achievements;

