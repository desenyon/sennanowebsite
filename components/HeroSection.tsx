'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const navigationLinks = [
  { name: 'System', href: '#system' },
  { name: 'Hardware', href: '#hardware' },
  { name: 'Software', href: '#software' },
  { name: 'Impact', href: '#impact' },
  { name: 'About', href: '#about' },
];

export default function HeroSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.95]);

  const scrollToSection = (href: string) => {
    if (href === '#software') {
      const element = document.querySelector('#software');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <section ref={sectionRef} className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-black">
      {/* Top Navigation Bar */}
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="fixed top-6 left-1/2 transform -translate-x-1/2 z-50"
      >
        <div className="flex items-center gap-2 px-6 py-3 bg-black/40 border border-blue-400/30 rounded-full backdrop-blur-md">
          {navigationLinks.map((link, index) => (
            <motion.button
              key={link.name}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
              onClick={() => scrollToSection(link.href)}
              className="px-5 py-2 text-sm font-medium text-gray-300 hover:text-blue-400 hover:bg-blue-400/10 rounded-full transition-all duration-300"
            >
              {link.name}
            </motion.button>
          ))}
        </div>
      </motion.nav>
      {/* Subtle grid background */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(to right, rgba(14, 165, 233, 0.1) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(14, 165, 233, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '80px 80px'
        }} />
      </div>

      {/* Radial gradient spotlight */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-900/30 via-black/50 to-black" />

      {/* Animated corner accents */}
      <motion.div
        animate={{
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute top-0 left-0 w-96 h-96 bg-blue-600/20 blur-[120px]"
      />
      <motion.div
        animate={{
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1
        }}
        className="absolute bottom-0 right-0 w-96 h-96 bg-blue-400/20 blur-[120px]"
      />

      <motion.div
        style={{ opacity, scale }}
        className="relative z-10 text-center px-4 max-w-7xl mx-auto"
      >
        {/* Technical badge */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="mb-8"
        >
          <div className="inline-flex items-center gap-4 px-6 py-3 bg-black/40 border border-blue-400/30 rounded-full backdrop-blur-md">
            <span className="text-blue-400 font-mono text-xs tracking-wider uppercase">UWB Positioning System</span>
            <div className="w-px h-4 bg-blue-400/30" />
            <span className="text-gray-400 font-mono text-xs">Sub-10cm Accuracy</span>
          </div>
        </motion.div>

        {/* Main title */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="text-7xl md:text-9xl font-black mb-6 tracking-tighter leading-none"
        >
          <span className="block text-white">SENTINEL</span>
          <span className="block bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-blue-300 to-blue-500">
            NANO S1
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="text-2xl md:text-3xl text-gray-300 mb-8 max-w-4xl mx-auto font-light leading-relaxed"
        >
          GPS-denied indoor firefighter tracking using{' '}
          <span className="text-blue-400 font-semibold">sphere-intersection trilateration</span> and{' '}
          <span className="text-blue-400 font-semibold">drone-assisted localization</span>
        </motion.p>

        {/* Technical specs row */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.7 }}
          className="flex flex-wrap gap-6 justify-center mb-12 text-sm font-mono"
        >
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse" />
            <span className="text-gray-400">10Hz Update Rate</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }} />
            <span className="text-gray-400">4-Anchor Minimum</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }} />
            <span className="text-gray-400">No WiFi/GPS Required</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse" style={{ animationDelay: '0.6s' }} />
            <span className="text-gray-400">2km LoRa Range</span>
          </div>
        </motion.div>

        {/* CTA buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="flex gap-6 justify-center flex-wrap mb-16"
        >
          <button 
            onClick={() => scrollToSection('#software')}
            className="group relative px-10 py-5 bg-blue-600 hover:bg-blue-500 transition-all duration-300 rounded-lg overflow-hidden border border-blue-400/50 shadow-lg shadow-blue-500/20"
          >
            <span className="relative z-10 font-bold text-white text-lg">Explore System</span>
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-blue-600 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300" />
          </button>
          <a 
            href="https://drive.google.com/file/d/1nniyjLR0u5s6MDchcPVR9atMBxgfvdZ9/view?usp=sharing"
            target="_blank"
            rel="noopener noreferrer"
            className="px-10 py-5 border-2 border-white/20 hover:border-blue-400 hover:bg-blue-400/10 transition-all duration-300 rounded-lg backdrop-blur-sm"
          >
            <span className="font-bold text-white text-lg">Technical Docs</span>
          </a>
        </motion.div>

        {/* Team credits */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1 }}
          className="border-t border-white/10 pt-8 max-w-3xl mx-auto"
        >
          <p className="text-gray-500 text-xs uppercase tracking-wider mb-3 font-mono">Designed & Built By</p>
          <div className="flex flex-wrap gap-x-8 gap-y-2 justify-center text-gray-400">
            <button onClick={() => scrollToSection('#about')} className="text-base font-medium hover:text-blue-400 transition-colors cursor-pointer">Naitik Gupta</button>
            <button onClick={() => scrollToSection('#about')} className="text-base font-medium hover:text-blue-400 transition-colors cursor-pointer">Julian Juan</button>
            <button onClick={() => scrollToSection('#about')} className="text-base font-medium hover:text-blue-400 transition-colors cursor-pointer">Ming Ying</button>
            <button onClick={() => scrollToSection('#about')} className="text-base font-medium hover:text-blue-400 transition-colors cursor-pointer">Ayush Iyer</button>
            <button onClick={() => scrollToSection('#about')} className="text-base font-medium hover:text-blue-400 transition-colors cursor-pointer">Gavyn Liu</button>
          </div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.2 }}
          className="absolute bottom-12 left-1/2 transform -translate-x-1/2"
        >
          <div className="flex flex-col items-center gap-2">
            <span className="text-xs text-gray-500 uppercase tracking-wider font-mono">Scroll to explore</span>
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              <svg
                className="w-6 h-6 text-blue-400"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
              </svg>
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
