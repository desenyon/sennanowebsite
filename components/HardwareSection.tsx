'use client';

import { motion } from 'framer-motion';
import 'katex/dist/katex.min.css';
import { InlineMath } from 'react-katex';

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' as const } }
};

export default function HardwareSection() {
  return (
    <section id="hardware" className="py-32 px-6 md:px-12 lg:px-24 bg-black border-t border-gray-800/50">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={fadeUp}
          className="mb-16"
        >
          <div className="flex items-center gap-4 mb-4">
            <span className="text-blue-500 font-mono text-sm">01</span>
            <div className="h-px flex-1 bg-gradient-to-r from-blue-500/50 to-transparent max-w-[100px]" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">
            Hardware Components
          </h2>
          <p className="text-gray-500 max-w-xl">
            The physical components that make up the Sentinal Nano positioning system.
          </p>
        </motion.div>

        {/* Hardware Cards Grid */}
        <div className="grid md:grid-cols-2 gap-6 mb-16">
          {/* A) Wearable Tag */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={fadeUp}
            className="p-6 bg-gradient-to-br from-gray-900/80 to-gray-900/40 border border-gray-800 rounded-xl hover:border-gray-700 transition-colors"
          >
            <div className="flex items-start justify-between mb-4">
              <div>
                <span className="text-blue-400 font-mono text-xs tracking-wider">A</span>
                <h3 className="text-lg font-semibold text-white mt-1">Wearable Tag</h3>
              </div>
              <span className="text-xs text-gray-600 bg-gray-800/50 px-2 py-1 rounded">1 per firefighter</span>
            </div>
            
            <div className="space-y-3">
              {[
                ['Raspberry Pi Pico 2 W', 'Main controller'],
                ['DWM3000 UWB module', 'Time-of-flight ranging'],
                ['TPS61022 boost converter', 'Stable 3.3V rail'],
                ['TP4056 + USB-C', 'Li-ion charging'],
                ['18650 Li-ion cell', '~12h runtime'],
                ['2-layer PCB', 'RF-aware layout'],
              ].map(([part, desc]) => (
                <div key={part} className="flex items-center gap-3 text-sm">
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-500/60" />
                  <span className="text-white font-medium flex-shrink-0">{part}</span>
                  <span className="text-gray-500">— {desc}</span>
                </div>
              ))}
            </div>

            <div className="mt-5 pt-4 border-t border-gray-800/50">
              <p className="text-gray-600 text-xs uppercase tracking-wider mb-2">Optional Sensors</p>
              <div className="flex flex-wrap gap-2">
                <span className="text-xs text-gray-400 bg-gray-800/50 px-2 py-1 rounded">IMU (BMI270)</span>
                <span className="text-xs text-gray-400 bg-gray-800/50 px-2 py-1 rounded">Barometer</span>
              </div>
            </div>
          </motion.div>

          {/* B) Fixed Anchors */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={fadeUp}
            className="p-6 bg-gradient-to-br from-gray-900/80 to-gray-900/40 border border-gray-800 rounded-xl hover:border-gray-700 transition-colors"
          >
            <div className="flex items-start justify-between mb-4">
              <div>
                <span className="text-blue-400 font-mono text-xs tracking-wider">B</span>
                <h3 className="text-lg font-semibold text-white mt-1">Fixed Anchors</h3>
              </div>
              <span className="text-xs text-gray-600 bg-gray-800/50 px-2 py-1 rounded">4–6 units</span>
            </div>
            
            <div className="space-y-3 text-sm">
              <div className="flex items-center gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-green-500/60" />
                <span className="text-gray-300">Same electronics as tag</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-green-500/60" />
                <span className="text-gray-300">Wall-powered or battery</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-green-500/60" />
                <span className="text-gray-300">Known position <InlineMath math="(x_i, y_i, z_i)" /></span>
              </div>
            </div>
          </motion.div>

          {/* C) Base Station */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={fadeUp}
            className="p-6 bg-gradient-to-br from-gray-900/80 to-gray-900/40 border border-gray-800 rounded-xl hover:border-gray-700 transition-colors"
          >
            <div className="flex items-start justify-between mb-4">
              <div>
                <span className="text-blue-400 font-mono text-xs tracking-wider">C</span>
                <h3 className="text-lg font-semibold text-white mt-1">Base Station</h3>
              </div>
              <span className="text-xs text-gray-600 bg-gray-800/50 px-2 py-1 rounded">Compute + Display</span>
            </div>
            
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div className="p-3 bg-gray-800/30 rounded-lg">
                <p className="text-gray-500 text-xs mb-1">Demo</p>
                <p className="text-gray-300">USB tethered</p>
              </div>
              <div className="p-3 bg-gray-800/30 rounded-lg">
                <p className="text-gray-500 text-xs mb-1">Field</p>
                <p className="text-gray-300">LoRa wireless</p>
              </div>
            </div>
          </motion.div>

          {/* D) Drone Anchor */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={fadeUp}
            className="p-6 bg-gradient-to-br from-gray-900/80 to-gray-900/40 border border-gray-800 rounded-xl hover:border-gray-700 transition-colors"
          >
            <div className="flex items-start justify-between mb-4">
              <div>
                <span className="text-blue-400 font-mono text-xs tracking-wider">D</span>
                <h3 className="text-lg font-semibold text-white mt-1">Drone Anchor</h3>
              </div>
              <span className="text-xs text-purple-400 bg-purple-500/10 px-2 py-1 rounded border border-purple-500/20">Optional</span>
            </div>
            
            <div className="space-y-3 text-sm">
              <div className="flex items-center gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-purple-500/60" />
                <span className="text-gray-300">Mobile UWB anchor</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-purple-500/60" />
                <span className="text-gray-300">Position <InlineMath math="(x_d(t), y_d(t), z_d(t))" /></span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-purple-500/60" />
                <span className="text-gray-300">Improves geometry in obstructed areas</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* 2) Geometry Setup */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={fadeUp}
          className="mt-24"
        >
          <div className="flex items-center gap-4 mb-4">
            <span className="text-blue-500 font-mono text-sm">02</span>
            <div className="h-px flex-1 bg-gradient-to-r from-blue-500/50 to-transparent max-w-[100px]" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">
            Geometry Setup
          </h2>
          <p className="text-gray-500 max-w-xl mb-12">
            No GPS or satellites required — purely local coordinate system.
          </p>

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div className="p-6 bg-gradient-to-br from-gray-900/80 to-gray-900/40 border border-gray-800 rounded-xl">
              <div className="w-10 h-10 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center mb-4">
                <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6z" />
                </svg>
              </div>
              <h4 className="text-white font-medium mb-3">Building Coordinate Frame</h4>
              <div className="space-y-2 text-gray-400 text-sm">
                <p>• Origin <InlineMath math="O_B" /> at a building corner</p>
                <p>• Axes: +x, +y along walls, +z upward</p>
              </div>
            </div>

            <div className="p-6 bg-gradient-to-br from-gray-900/80 to-gray-900/40 border border-gray-800 rounded-xl">
              <div className="w-10 h-10 rounded-lg bg-green-500/10 border border-green-500/20 flex items-center justify-center mb-4">
                <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                </svg>
              </div>
              <h4 className="text-white font-medium mb-3">Anchor Surveying</h4>
              <div className="space-y-2 text-gray-400 text-sm">
                <p>• Measure with laser distance meter</p>
                <p>• Store <InlineMath math="(x_i, y_i, z_i)" /> in config file</p>
              </div>
            </div>
          </div>

          <div className="p-6 bg-gradient-to-r from-yellow-900/20 to-transparent border border-yellow-700/30 rounded-xl">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-lg bg-yellow-500/10 border border-yellow-500/20 flex items-center justify-center flex-shrink-0">
                <svg className="w-5 h-5 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15.75h.007v.008H12v-.008z" />
                </svg>
              </div>
              <div>
                <h4 className="text-yellow-500 font-medium mb-2">Placement Requirements</h4>
                <div className="space-y-1.5 text-gray-400 text-sm">
                  <p>• Minimum 4 anchors, prefer 5–6</p>
                  <p>• Height diversity required (some high, some low)</p>
                  <p>• Avoid coplanar placement — spread anchors across room</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
