'use client';

import { motion } from 'framer-motion';

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.1 }
  }
};

const item = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' as const } }
};

export default function HeroSection() {
  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="min-h-screen flex flex-col justify-center px-6 md:px-12 lg:px-24 py-20 bg-black">
      {/* Navigation */}
      <motion.nav 
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
        className="fixed top-6 right-6 z-50"
      >
        <div className="flex gap-6 text-sm font-mono text-gray-500">
          {['Hardware', 'Software', 'Build', 'About'].map((navItem, i) => (
            <motion.button
              key={navItem}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 + i * 0.05 }}
              onClick={() => scrollToSection(`#${navItem.toLowerCase()}`)}
              className="hover:text-white transition-colors duration-200"
            >
              {navItem}
            </motion.button>
          ))}
        </div>
      </motion.nav>

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="max-w-4xl"
      >
        <motion.div variants={item} className="flex items-center gap-3 mb-4">
          <span className="text-orange-500 font-mono text-xs tracking-wider px-2 py-1 border border-orange-500/30 rounded">
            CONRAD CHALLENGE 2026
          </span>
        </motion.div>
        
        <motion.h1 variants={item} className="text-5xl md:text-7xl font-bold text-white mb-4 leading-[1.1] tracking-tight">
          Sentinal Nano S1
        </motion.h1>
        
        <motion.p variants={item} className="text-lg md:text-xl text-gray-400 mb-10 leading-relaxed max-w-2xl">
          A wearable UWB positioning system for firefighters operating in GPS-denied environments. 
          Computes real-time 3D coordinates using geometric multilateration.
        </motion.p>

        <motion.div variants={item} className="mb-10">
          <h2 className="text-sm font-mono text-gray-500 uppercase tracking-wider mb-4">The Problem</h2>
          <p className="text-gray-300 leading-relaxed max-w-2xl">
            Every year, firefighters lose their lives due to disorientation inside burning structures. 
            GPS signals cannot penetrate buildings. Incident commanders have no reliable way to track 
            their teams indoors.
          </p>
        </motion.div>

        <motion.div variants={item} className="mb-10">
          <h2 className="text-sm font-mono text-gray-500 uppercase tracking-wider mb-4">Our Approach</h2>
          <div className="space-y-2 text-gray-400 max-w-2xl">
            <p><span className="text-blue-400 mr-2">1.</span>Deploy fixed UWB anchors at known coordinates around the structure</p>
            <p><span className="text-blue-400 mr-2">2.</span>Each firefighter wears a tag that ranges to visible anchors</p>
            <p><span className="text-blue-400 mr-2">3.</span>Multilateration solves for position: each range defines a sphere, intersection gives location</p>
            <p><span className="text-blue-400 mr-2">4.</span>ML bias correction handles wall reflections; tracking filter smooths output</p>
          </div>
        </motion.div>

        <motion.div variants={item} className="flex flex-wrap gap-3">
          <button
            onClick={() => scrollToSection('#hardware')}
            className="px-5 py-2.5 bg-blue-600 hover:bg-blue-500 text-white text-sm font-medium rounded transition-colors duration-200"
          >
            View Hardware
          </button>
          <button
            onClick={() => scrollToSection('#software')}
            className="px-5 py-2.5 border border-gray-700 hover:border-gray-500 text-gray-300 text-sm font-medium rounded transition-colors duration-200"
          >
            Algorithm Details
          </button>
          <button
            onClick={() => scrollToSection('#build')}
            className="px-5 py-2.5 border border-gray-700 hover:border-gray-500 text-gray-300 text-sm font-medium rounded transition-colors duration-200"
          >
            Build Plan
          </button>
          <a
            href="https://drive.google.com/file/d/1aI_h8WOz5KdIhk8VS4jU8Eo9Zy23YcHG/view?usp=sharing"
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-2.5 bg-orange-600 hover:bg-orange-500 text-white text-sm font-medium rounded transition-colors duration-200 flex items-center gap-2"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            Full Math Docs
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
}
