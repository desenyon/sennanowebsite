'use client';

import { motion } from 'framer-motion';

export default function Footer() {
  return (
    <footer className="py-20 px-6 md:px-12 lg:px-24 border-t border-gray-800/50 bg-black">
      <motion.div 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="max-w-6xl mx-auto"
      >
        <div className="grid md:grid-cols-3 gap-10 mb-12">
          {/* Brand */}
          <div>
            <h3 className="text-xl font-bold text-white mb-2">
              Sentinal Nano S1
            </h3>
            <p className="text-gray-500 text-sm mb-4">
              Indoor positioning for first responders using UWB multilateration technology.
            </p>
            <div className="flex items-center gap-2">
              <span className="text-orange-500 text-xs font-mono px-2 py-1 bg-orange-500/10 border border-orange-500/20 rounded">
                Conrad Challenge 2026
              </span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-medium mb-4">Navigation</h4>
            <div className="space-y-2">
              {['Hardware', 'Software', 'Build Plan', 'Team'].map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase().replace(' ', '')}`}
                  className="block text-gray-500 text-sm hover:text-gray-300 transition-colors"
                >
                  {item}
                </a>
              ))}
            </div>
          </div>

          {/* Resources */}
          <div>
            <h4 className="text-white font-medium mb-4">Resources</h4>
            <div className="space-y-2">
              <a
                href="https://drive.google.com/file/d/13uUrRRNAWFiqmfERm0bjMEKXZtQWkUwH/view?usp=sharing"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-gray-500 text-sm hover:text-gray-300 transition-colors"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                Full Math Documentation
              </a>
            </div>
          </div>
        </div>
        
        <div className="pt-8 border-t border-gray-800/50 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-gray-600 text-sm">
            © 2026 Sentinal Nano S1. Built for the Conrad Challenge.
          </p>
          <p className="text-gray-700 text-xs">
            UWB Indoor Positioning System
          </p>
        </div>
      </motion.div>
    </footer>
  );
}
