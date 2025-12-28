'use client';

import { motion } from 'framer-motion';

export default function Footer() {
  return (
    <footer className="relative py-12 px-4 border-t border-cyan-500/20">
      <div className="max-w-7xl mx-auto">
        <div className="text-center">
          <h3 className="text-3xl font-black mb-4 bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-white">
            Sentinel Nano
          </h3>
          <p className="text-gray-400 mb-6 max-w-2xl mx-auto">
            GPS-free firefighter positioning using UWB beacons and drone-assisted localization
          </p>
          <div className="pt-8 border-t border-cyan-500/20 text-gray-500 text-sm">
            <p>© 2024 Sentinel Nano. Mission-critical indoor positioning for firefighter safety.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
