import React from 'react';
import { motion } from 'framer-motion';
import Head from 'next/head';
import Link from 'next/link';
import PageLayout from '@/components/Layout/PageLayout';

const experiences = [
  {
    title: 'Associate Tech Content',
    company: 'iamneo',
    period: 'July 2025 - Present',
    type: 'current',
    badge: { text: 'CURRENT', color: 'bg-green-500' },
    description: 'Leading development of AI-powered educational tools and enterprise systems.',
    achievements: [
      'Leading development of AI-powered educational tools',
      'Architected 8 production-ready systems actively used by teams',
      '40% improvement in operational efficiency',
      'Building full-stack enterprise applications with React, FastAPI, Azure OpenAI',
    ],
    projects: [
      { name: 'MCQ Generator', color: 'from-accent to-teal-400' },
      { name: 'TrainOps', color: 'from-primary to-blue-400' },
      { name: 'Trainer Scorer', color: 'from-secondary to-pink-400' },
    ],
    tech: ['React', 'FastAPI', 'Azure OpenAI', 'Firebase', 'n8n'],
  },
  {
    title: 'Trainee Program Management Specialist',
    company: 'iamneo',
    period: 'January 2025 - June 2025',
    type: 'promoted',
    badge: { text: '↑ PROMOTED', color: 'bg-purple-500' },
    description: 'Developed automation tools and laid foundation for production systems.',
    achievements: [
      'Developed Selenium automation tool for course management',
      '70% reduction in manual setup time',
      'Built foundational design for TrainOps system',
      'Promoted to Associate Tech Content based on impact',
    ],
    tech: ['Selenium', 'Python', 'React', 'FastAPI'],
  },
  {
    title: 'Data Visualization Intern',
    company: 'Accenture (Forage)',
    period: 'February 2023 - March 2023',
    type: 'internship',
    badge: { text: 'FOUNDATION', color: 'bg-amber-500' },
    description: 'Created advanced data visualizations for stakeholder presentations.',
    achievements: [
      '20% increase in customer engagement metrics',
      'Created 10+ advanced visualization dashboards',
      '40% improvement in stakeholder understanding',
    ],
    tech: ['Python', 'Matplotlib', 'Seaborn', 'Plotly', 'Pandas'],
  },
];

const TimelineCard = ({ experience, index, isLeft }) => {
  return (
    <motion.div
      className={`relative flex ${isLeft ? 'lg:flex-row' : 'lg:flex-row-reverse'} items-center gap-8`}
      initial={{ opacity: 0, x: isLeft ? -100 : 100 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.8, delay: index * 0.2 }}
    >
      {/* Timeline Node */}
      <div className="hidden lg:flex absolute left-1/2 -translate-x-1/2 items-center justify-center">
        <motion.div
          className="w-6 h-6 rounded-full bg-primary border-4 border-dark-950"
          whileInView={{ scale: [0, 1.2, 1] }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.2 + 0.3 }}
        />
        <motion.div
          className="absolute w-12 h-12 rounded-full bg-primary/20"
          animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
      </div>

      {/* Card */}
      <motion.div
        className={`w-full lg:w-[calc(50%-3rem)] ${isLeft ? 'lg:text-right' : ''}`}
        whileHover={{ scale: 1.02 }}
        transition={{ type: 'spring', stiffness: 300 }}
      >
        <div className="relative group">
          {/* Glow effect */}
          <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-primary/20 to-secondary/20 opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500" />
          
          <div className="relative p-8 rounded-3xl glass border border-[var(--border)] overflow-hidden">
            {/* Animated border */}
            <motion.div
              className="absolute inset-0 rounded-3xl"
              style={{
                background: 'linear-gradient(90deg, transparent, rgba(99, 102, 241, 0.3), transparent)',
                backgroundSize: '200% 100%',
              }}
              animate={{ backgroundPosition: ['200% 0', '-200% 0'] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
            />

            {/* Badge */}
            <motion.span
              className={`inline-block px-3 py-1 rounded-full text-xs font-bold text-white ${experience.badge.color} mb-4`}
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 + 0.4, type: 'spring' }}
            >
              {experience.badge.text}
            </motion.span>

            {/* Header */}
            <h3 className="text-2xl font-display font-bold text-[var(--text-primary)] mb-2">
              {experience.title}
            </h3>
            <p className="text-primary font-semibold mb-1">@{experience.company}</p>
            <p className="text-[var(--text-secondary)] text-sm mb-4">{experience.period}</p>

            {/* Description */}
            <p className="text-[var(--text-secondary)] mb-6">{experience.description}</p>

            {/* Achievements */}
            <ul className={`space-y-3 mb-6 ${isLeft ? 'lg:text-right' : ''}`}>
              {experience.achievements.map((achievement, i) => (
                <motion.li
                  key={i}
                  className={`flex items-start gap-3 ${isLeft ? 'lg:flex-row-reverse' : ''}`}
                  initial={{ opacity: 0, x: isLeft ? 20 : -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.2 + 0.5 + i * 0.1 }}
                >
                  <motion.span
                    className="text-accent mt-1"
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.2 + 0.6 + i * 0.1 }}
                  >
                    ✓
                  </motion.span>
                  <span className="text-[var(--text-secondary)] text-sm">{achievement}</span>
                </motion.li>
              ))}
            </ul>

            {/* Projects */}
            {experience.projects && (
              <div className={`flex flex-wrap gap-2 mb-6 ${isLeft ? 'lg:justify-end' : ''}`}>
                {experience.projects.map((project, i) => (
                  <motion.span
                    key={project.name}
                    className={`px-3 py-1 rounded-full text-xs font-medium text-white bg-gradient-to-r ${project.color}`}
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.2 + 0.7 + i * 0.1 }}
                    whileHover={{ scale: 1.1 }}
                  >
                    {project.name}
                  </motion.span>
                ))}
              </div>
            )}

            {/* Tech Stack */}
            <div className={`flex flex-wrap gap-2 ${isLeft ? 'lg:justify-end' : ''}`}>
              {experience.tech.map((tech, i) => (
                <motion.span
                  key={tech}
                  className="px-3 py-1 rounded-full text-xs glass text-[var(--text-secondary)]"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.2 + 0.8 + i * 0.05 }}
                  whileHover={{ backgroundColor: 'rgba(99, 102, 241, 0.2)' }}
                >
                  {tech}
                </motion.span>
              ))}
            </div>
          </div>
        </div>
      </motion.div>

      {/* Spacer for alternating layout */}
      <div className="hidden lg:block w-[calc(50%-3rem)]" />
    </motion.div>
  );
};

const Experience = () => {
  return (
    <PageLayout>
      <Head>
        <title>Experience | Prithvi B S</title>
        <meta name="description" content="Professional experience and career journey of Prithvi B S." />
      </Head>

      <section className="min-h-screen pt-24 sm:pt-32 pb-16 sm:pb-20 px-4 sm:px-6 overflow-x-hidden" style={{ position: 'relative', width: '100%', maxWidth: '100vw' }}>
        <div className="max-w-6xl mx-auto w-full" style={{ border: 'none', outline: 'none' }}>
          {/* Header */}
          <motion.div
            className="text-center mb-12 sm:mb-16 lg:mb-20"
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
              My Journey
            </motion.span>
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-display font-bold mb-4 sm:mb-6">
              <span className="text-gradient">Experience</span>
            </h1>
            <p className="text-lg sm:text-xl text-[var(--text-secondary)] max-w-2xl mx-auto">
              Professional milestones and growth trajectory
            </p>
          </motion.div>

          {/* Timeline */}
          <div className="relative">
            {/* Timeline Line */}
            <motion.div
              className="hidden lg:block absolute left-1/2 -translate-x-1/2 w-0.5 h-full bg-gradient-to-b from-primary via-secondary to-accent"
              initial={{ scaleY: 0 }}
              whileInView={{ scaleY: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.5 }}
              style={{ transformOrigin: 'top' }}
            />

            {/* Experience Cards */}
            <div className="space-y-16">
              {experiences.map((exp, index) => (
                <TimelineCard
                  key={exp.title}
                  experience={exp}
                  index={index}
                  isLeft={index % 2 === 0}
                />
              ))}
            </div>
          </div>

            {/* CTA */}
            <motion.div
              className="text-center mt-12 sm:mt-16 lg:mt-20"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <Link href="/projects">
                <motion.button
                  className="btn-primary text-sm sm:text-base"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    View My Projects
                    <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </span>
                </motion.button>
              </Link>
            </motion.div>
        </div>
      </section>
    </PageLayout>
  );
};

export default Experience;

