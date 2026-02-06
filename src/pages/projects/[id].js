import React from 'react';
import { motion } from 'framer-motion';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import PageLayout from '@/components/Layout/PageLayout';

const projectsData = {
  trainops: {
    title: 'TrainOps',
    subtitle: 'Enterprise Trainer Management System',
    description: 'A complete 90-day training lifecycle management platform designed to streamline trainer operations with GPS-based verification, real-time synchronization, and comprehensive multi-role architecture.',
    image: '/images/projects/trainops.png',
    longDescription: `TrainOps revolutionizes how organizations manage their training programs. The system features a sophisticated three-role architecture (Admin, Program Manager, Trainer) that ensures proper access control and workflow management.

Key innovations include GPS-based clock-in/out verification using Mapbox integration, ensuring accurate attendance tracking. The platform provides real-time synchronization across all users, enabling instant updates and collaborative workflows.

The bulk operations capability allows administrators to manage multiple trainers and sessions efficiently, with comprehensive Excel and PDF export options for reporting and analytics.`,
    features: [
      'Three-role architecture (Admin, Program Manager, Trainer)',
      'GPS-based clock-in/out verification with Mapbox integration',
      'Real-time synchronization across all users',
      'Bulk operations with Excel/PDF export capabilities',
      'Firebase Authentication for secure access',
      'Cloud Firestore for scalable data management',
      'NodeMailer API for automated notifications',
      '90-day training lifecycle management',
    ],
    tech: ['React', 'Firebase', 'Cloud Firestore', 'Mapbox', 'NodeMailer', 'Cloud Functions', 'Excel.js'],
    metrics: [
      { value: '70%', label: 'Setup Time Reduction' },
      { value: 'Real-time', label: 'Data Synchronization' },
      { value: 'Multi-role', label: 'Access Control' },
      { value: '90-day', label: 'Lifecycle Management' },
    ],
    status: 'Production',
    color: 'from-blue-500 to-cyan-500',
  },
  'mcq-generator': {
    title: 'MCQ Generator Platform',
    subtitle: 'AI-Powered Question Creation',
    description: 'An automated MCQ generation platform leveraging n8n workflow automation, Azure OpenAI, and a strict subject hierarchy system for quality educational content creation.',
    image: '/images/projects/mcq-generator.png',
    longDescription: `The MCQ Generator Platform transforms educational content creation through intelligent automation. At its core, the system uses n8n workflow automation to orchestrate complex data pipelines that integrate multiple services seamlessly.

The platform enforces a strict subject-topic-subtopic hierarchy, ensuring questions are properly categorized and aligned with curriculum requirements. The multi-select subtopic interface with form state persistence enables educators to efficiently target specific learning objectives.

Quality control is paramount - the system includes validation checkmarks and rejection indicators to maintain high standards. The dual output system supports both CSV downloads and direct Google Sheets integration for flexibility in content management.`,
    features: [
      'n8n workflow automation pipeline',
      'Multi-select subtopic interface with form state persistence',
      'Strict subject-topic-subtopic hierarchy enforcement',
      'Quality control with validation checkmarks',
      'Dual output system (CSV + Google Sheets)',
      'Azure OpenAI integration for intelligent generation',
      'Supabase database for content storage',
      'Real-time validation and feedback',
    ],
    tech: ['n8n', 'Supabase', 'Azure OpenAI', 'React', 'FastAPI', 'Google Sheets API', 'PostgreSQL'],
    metrics: [
      { value: '40%', label: 'Accuracy Improvement' },
      { value: '1-30', label: 'Questions Per Generation' },
      { value: 'Active', label: 'Team Usage' },
      { value: 'Dual', label: 'Output Formats' },
    ],
    status: 'Production',
    color: 'from-purple-500 to-pink-500',
  },
  'trainer-scorer': {
    title: 'Trainer Scorer',
    subtitle: 'AI-Powered Evaluation System',
    description: 'An intelligent trainer evaluation system featuring VTT parsing, rubric-based AI scoring with GPT-4o, and comprehensive multi-format report generation.',
    image: '/images/projects/trainer-scorer.png',
    longDescription: `Trainer Scorer brings AI-powered intelligence to trainer performance evaluation. The system processes VTT (Video Text Tracks) files, parsing them into structured JSON format for analysis.

The rubric-based evaluation leverages Azure OpenAI's GPT-4o model to assess trainer performance against predefined criteria, providing objective and consistent scoring across all evaluations.

Report generation supports multiple formats including HTML for web viewing, DOCX for documentation, and CSV for data analysis. Azure Blob Storage integration ensures reliable storage and retrieval of reports and media files.`,
    features: [
      'VTT-to-JSON parsing pipeline',
      'Rubric-based AI evaluation with GPT-4o',
      'Multi-format report generation (HTML/DOCX/CSV)',
      'Azure Blob Storage integration',
      'Concurrent user support',
      'Real-time status tracking',
      'Firebase integration for user management',
      'Automated scoring algorithms',
    ],
    tech: ['React', 'Vite', 'FastAPI', 'Azure OpenAI', 'Azure Blob Storage', 'Firebase', 'python-docx'],
    metrics: [
      { value: 'GPT-4o', label: 'AI Powered' },
      { value: '3+', label: 'Report Formats' },
      { value: 'Real-time', label: 'Status Tracking' },
      { value: 'Concurrent', label: 'User Support' },
    ],
    status: 'Production',
    color: 'from-green-500 to-emerald-500',
  },
  'course-automation': {
    title: 'Course Automation System',
    subtitle: 'Selenium-Powered Workflow',
    description: 'A browser automation tool for course management featuring dual-mode operation, comprehensive reporting, and a non-intrusive wrapper system.',
    image: '/images/projects/course-automation.png',
    longDescription: `The Course Automation System dramatically reduces the time required for course setup and management through intelligent browser automation. Using Selenium WebDriver, the system automates repetitive tasks that previously required manual intervention.

The dual-mode operation supports both Course Creation and Test Addition workflows, with a modern React UI featuring tab navigation for seamless switching between modes. The non-intrusive wrapper system preserves original scripts while adding powerful reporting capabilities.

Comprehensive reporting generates both Excel and JSON outputs, with automated error tracking that categorizes and logs issues for review. This combination of automation and reporting has achieved a 70% reduction in course setup time.`,
    features: [
      'Selenium WebDriver automation',
      'Dual-mode operation (Course Creation + Test Addition)',
      'Comprehensive Excel/JSON reporting',
      'Non-intrusive wrapper system',
      'Modern React UI with tab navigation',
      'Automated error tracking and categorization',
      'Form auto-population',
      'Minimal performance overhead',
    ],
    tech: ['Selenium', 'Python', 'FastAPI', 'React', 'Pandas', 'BeautifulSoup', 'openpyxl'],
    metrics: [
      { value: '70%', label: 'Time Saved' },
      { value: 'Dual', label: 'Report Formats' },
      { value: 'Auto', label: 'Error Tracking' },
      { value: 'Low', label: 'Overhead' },
    ],
    status: 'In Use',
    color: 'from-orange-500 to-amber-500',
  },
  'voice-assistant': {
    title: 'LLM Voice Assistant',
    subtitle: 'Intelligent Conversational AI',
    description: 'A voice-activated AI assistant featuring facial recognition activation, speech processing pipeline, and context-aware LLM responses.',
    image: '/images/projects/voice-assistant.png',
    longDescription: `The LLM Voice Assistant represents a convergence of multiple AI technologies to create an intelligent, hands-free conversational interface. The system uses MTCNN (Multi-task Cascaded Convolutional Networks) for facial recognition, activating the assistant when a user is detected.

The speech processing pipeline converts voice input to text using advanced speech recognition, processes queries through a Large Language Model for intelligent responses, and converts responses back to speech using Google Text-to-Speech for natural audio output.

The Streamlit interface provides both text and voice interaction modes, allowing users to choose their preferred method of communication. Context-aware processing enables the assistant to maintain conversation history for more relevant responses.`,
    features: [
      'MTCNN-based facial recognition trigger',
      'Speech-to-text & text-to-speech pipeline',
      'Context-aware LLM responses',
      'Streamlit interactive interface',
      'Hands-free operation mode',
      'Dual interaction modes (text/voice)',
      'Conversation history management',
      'Real-time audio processing',
    ],
    tech: ['LLM', 'MTCNN', 'Google TTS', 'Streamlit', 'Python', 'SpeechRecognition', 'OpenCV'],
    metrics: [
      { value: '30%', label: 'Response Time ↓' },
      { value: '40%', label: 'Engagement ↑' },
      { value: 'Hands-free', label: 'Operation' },
      { value: 'Real-time', label: 'Processing' },
    ],
    status: 'Completed',
    color: 'from-indigo-500 to-violet-500',
  },
  'lxd-analytics': {
    title: 'LXD Analytics',
    subtitle: 'Training & Operations Analytics Dashboard',
    description: 'A full-stack training and operations analytics dashboard that turns Excel-based training data into live dashboards, utilization analytics, and trainer management—with optional real-time sync from SharePoint/Excel Online.',
    image: '/images/projects/lxd-analytics.png',
    longDescription: `LXD Analytics replaces manual Excel reporting with a web app that connects to a master Excel sheet (upload or SharePoint/Excel Online via Microsoft Graph API), transforms wide-format allotment data into a long-format datapoint model, and enriches records with trainer info.

The app exposes dashboards, tables, filters, and charts (pie, bar, line) for programs, clients, dates, and trainers. Built for multi-hub use (Training, Delivery, Ops); the Training Hub is fully implemented with Dashboard, Pending Allotments, Utilization (by Program/Client/Date/Trainer), Programs, Trainers, Trainer Calendar, and Data Explorer. Formula parity with existing Excel logic is maintained in Python on the backend.`,
    features: [
      'SharePoint/Excel Online sync via Microsoft Graph API',
      'Wide-to-long data transformation with formula parity',
      'Training Hub: Dashboard, Pending Allotments, Utilization (Program/Client/Date/Trainer)',
      'Programs, Trainers, Trainer Calendar, Data Explorer',
      'Recharts visualizations (pie, bar, line) and TanStack Table',
      'Multi-hub structure (Training, Delivery, Ops)',
      'FastAPI backend with optional auto-refresh',
      'Deployed on Render (backend Web Service + frontend Static Site)',
    ],
    tech: ['React 18', 'TypeScript', 'Vite', 'FastAPI', 'Recharts', 'TanStack Table', 'Microsoft Graph', 'Pandas', 'Render'],
    metrics: [
      { value: 'Real-time', label: 'SharePoint Sync' },
      { value: 'Multi-hub', label: 'Architecture' },
      { value: 'Live', label: 'Dashboards' },
      { value: 'Formula', label: 'Parity' },
    ],
    status: 'In Use',
    color: 'from-teal-500 to-emerald-500',
  },
  'software-license-manager': {
    title: 'Software License Manager',
    subtitle: 'Employee & License Management',
    description: 'A full-stack web application for managing software licenses across employees. Admins maintain employees and applications, assign licenses in bulk, export reports, and track all changes in an activity log—with real-time data and a modern, accessible UI.',
    image: '/images/projects/software-license-manager.png',
    longDescription: `Software License Manager helps organizations track which employees have access to which software applications. It supports Paid and Non-Paid application categories, department-based structure, bulk operations, and export to Excel/CSV.

Features include employee management (CRUD, department tree, bulk import/edit/delete), application management with category tabs and assignment counts, license mapping with real-time selectors, and flexible export (all, by department, by application, by manager, with column customization). The activity log provides an audit trail with filters and CSV export. Built with React 19, TypeScript, Vite, Firebase (Auth + Firestore), and a custom pastel theme.`,
    features: [
      'Employee & application management with Paid/Non-Paid categories',
      'Department tree, bulk import/edit/delete, assignment checks',
      'License mapping with real-time ApplicationSelector and EmployeeSelector',
      'Export to Excel/CSV with scope and column customization',
      'Activity log: filter by action, entity, user, date; export to CSV',
      'Dashboard with summary cards and optional sample data seed',
      'Firebase Auth + Firestore, session timeout, error boundary',
      'Accessible modals, aria-labels, Tailwind pastel theme',
    ],
    tech: ['React 19', 'TypeScript', 'Vite 7', 'Firebase', 'Firestore', 'Tailwind CSS', 'SheetJS', 'React Router 7'],
    metrics: [
      { value: 'Real-time', label: 'Firestore Sync' },
      { value: 'Bulk', label: 'Assign & Export' },
      { value: 'Audit', label: 'Activity Log' },
      { value: 'Accessible', label: 'UI' },
    ],
    status: 'In Use',
    color: 'from-rose-500 to-pink-500',
  },
  'asset-manager': {
    title: 'Asset Manager',
    subtitle: 'Asset & Policy Management',
    description: 'A full-stack asset and policy management web application for organizations to track employees, licenses, laptops, monitors, and company policies. Built with React 19, TypeScript, Firebase (Auth + Firestore), and Supabase Storage, with role-based access and a modern UI.',
    image: '/images/projects/asset-manager.png',
    longDescription: `Asset Manager provides 12 built-in sections (e.g. All Emp, All Laptop, All Monitors, MAC address, DL Groups) plus custom sections defined in Settings. Each section has its own Firestore collection with real-time listeners, optional paginated loading, CRUD, bulk edit, search, filter, sort, and column visibility stored in localStorage.

Policies live in Supabase Storage: create folders, upload PDFs, view or direct-download, delete (admin). Role-based access (Admin vs Viewer) is enforced via Firestore and UI. The app supports CSV/Excel import with preview and column mapping, multiple date formats, and an error boundary for resilience.`,
    features: [
      'Role-based access (Admin/Viewer) with Firebase Auth',
      '12 built-in sections + custom sections with column config in Settings',
      'CRUD, bulk edit, search, filter, sort; column visibility per section',
      'CSV/Excel import with preview and column mapping; export per section',
      'Policy PDFs in Supabase Storage: folders, upload, view, direct download',
      'Paginated Firestore reads and TanStack Virtual for large lists',
      'Manage Users (admin): list users, change role (viewer ↔ admin)',
      'TypeScript strict mode, toasts, confirm dialogs, error boundary',
    ],
    tech: ['React 19', 'TypeScript', 'Vite 7', 'Firebase', 'Firestore', 'Supabase Storage', 'SheetJS', 'React Router 7'],
    metrics: [
      { value: 'Dual', label: 'Firebase + Supabase' },
      { value: 'Real-time', label: 'Firestore' },
      { value: 'Role-based', label: 'Access' },
      { value: '12+', label: 'Sections' },
    ],
    status: 'In Use',
    color: 'from-sky-500 to-blue-500',
  },
};

const ProjectDetail = () => {
  const router = useRouter();
  const { id } = router.query;
  const project = projectsData[id];

  // Don't show "Not Found" during initial load or navigation transitions
  // Only show it if router is ready and we have an id but project doesn't exist
  if (!router.isReady) {
    // Show loading state during router initialization
    return (
      <PageLayout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <div className="animate-pulse text-[var(--text-secondary)]">Loading...</div>
          </div>
        </div>
      </PageLayout>
    );
  }

  // Only show "Not Found" if:
  // 1. Router is ready
  // 2. We have an id (not navigating away - id would be undefined during navigation)
  // 3. Project doesn't exist in our data
  if (router.isReady && id && !project) {
    return (
      <PageLayout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-4xl font-display font-bold text-[var(--text-primary)] mb-4">
              Project Not Found
            </h1>
            <Link href="/projects">
              <motion.button className="btn-primary" whileHover={{ scale: 1.05 }}>
                ← Back to Projects
              </motion.button>
            </Link>
          </div>
        </div>
      </PageLayout>
    );
  }

  // If router is ready but id is undefined, we're navigating away
  // Return empty PageLayout to allow exit animation to work properly
  if (router.isReady && !id) {
    return <PageLayout><div></div></PageLayout>;
  }

  return (
    <PageLayout showParticles={false}>
      <Head>
        <title>{project.title} | Prithvi B S</title>
        <meta name="description" content={project.description} />
      </Head>

      <section className="min-h-screen pt-24 sm:pt-32 pb-16 sm:pb-20 px-4 sm:px-6 overflow-x-hidden" style={{ position: 'relative', width: '100%', maxWidth: '100vw' }}>
        <div className="max-w-5xl mx-auto w-full" style={{ border: 'none', outline: 'none' }}>
          {/* Back Button */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="mb-6 sm:mb-8"
          >
            <Link href="/projects">
              <motion.button
                className="flex items-center gap-2 text-sm sm:text-base text-[var(--text-secondary)] hover:text-primary transition-colors"
                whileHover={{ x: -5 }}
              >
                ← Back to Projects
              </motion.button>
            </Link>
          </motion.div>

          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8 sm:mb-12"
          >
            <motion.span
              className={`inline-block px-3 sm:px-4 py-1 rounded-full text-xs sm:text-sm font-bold text-white bg-gradient-to-r ${project.color} mb-3 sm:mb-4`}
            >
              {project.status}
            </motion.span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display font-bold text-[var(--text-primary)] mb-3 sm:mb-4">
              {project.title}
            </h1>
            <p className="text-lg sm:text-xl text-primary font-medium mb-3 sm:mb-4">{project.subtitle}</p>
            <p className="text-base sm:text-lg text-[var(--text-secondary)]">{project.description}</p>
          </motion.div>

          {/* Image */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="relative h-48 sm:h-64 md:h-80 lg:h-[400px] rounded-2xl sm:rounded-3xl overflow-hidden mb-8 sm:mb-12"
          >
            <Image 
              src={project.image} 
              alt={project.title} 
              fill 
              className="object-cover" 
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 90vw, 1200px"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-dark-950/60 to-transparent" />
          </motion.div>

          {/* Metrics */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 mb-8 sm:mb-12"
          >
            {project.metrics.map((metric, i) => (
              <div key={i} className="p-4 sm:p-6 rounded-xl sm:rounded-2xl glass text-center">
                <p className="text-xl sm:text-2xl md:text-3xl font-display font-bold text-gradient">{metric.value}</p>
                <p className="text-xs sm:text-sm text-[var(--text-secondary)]">{metric.label}</p>
              </div>
            ))}
          </motion.div>

          {/* Long Description */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mb-8 sm:mb-12"
          >
            <h2 className="text-xl sm:text-2xl font-display font-bold text-[var(--text-primary)] mb-3 sm:mb-4">Overview</h2>
            <div className="prose prose-invert max-w-none">
              {project.longDescription.split('\n\n').map((paragraph, i) => (
                <p key={i} className="text-sm sm:text-base text-[var(--text-secondary)] mb-3 sm:mb-4 leading-relaxed">
                  {paragraph}
                </p>
              ))}
            </div>
          </motion.div>

          {/* Features */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mb-8 sm:mb-12"
          >
            <h2 className="text-xl sm:text-2xl font-display font-bold text-[var(--text-primary)] mb-4 sm:mb-6">Key Features</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              {project.features.map((feature, i) => (
                <motion.div
                  key={i}
                  className="flex items-start gap-2 sm:gap-3 p-3 sm:p-4 rounded-lg sm:rounded-xl glass min-w-0"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                >
                  <span className="text-accent text-sm sm:text-base shrink-0">✓</span>
                  <span className="text-xs sm:text-sm text-[var(--text-secondary)] break-words">{feature}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Tech Stack */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <h2 className="text-xl sm:text-2xl font-display font-bold text-[var(--text-primary)] mb-4 sm:mb-6">Tech Stack</h2>
            <div className="flex flex-wrap gap-2 sm:gap-3 min-w-0">
              {project.tech.map((tech, i) => (
                <motion.span
                  key={tech}
                  className="px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg sm:rounded-xl glass text-xs sm:text-sm text-[var(--text-primary)] font-medium"
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  whileHover={{ scale: 1.05, backgroundColor: 'rgba(99, 102, 241, 0.2)' }}
                >
                  {tech}
                </motion.span>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
    </PageLayout>
  );
};

export default ProjectDetail;

