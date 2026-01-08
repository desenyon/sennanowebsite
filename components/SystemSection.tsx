'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const architectureFeatures = [
  {
    title: 'Wearable Tag',
    description: 'DWM3000 UWB + Pico 2 W MCU + IMU/barometer. Single 18650 Li-ion battery with TPS61022 boost converter for stable RF power',
    metric: '12h runtime',
  },
  {
    title: 'Fixed Anchor Network',
    description: 'Known-position reference points with DWM3000 modules. Non-coplanar placement with varied heights for optimal GDOP',
    metric: '<10cm accuracy',
  },
  {
    title: 'Drone Mobile Anchor',
    description: 'Time-varying anchor position improves geometry when fixed anchors are blocked/damaged. LoRa relay extends range',
    metric: 'Adaptive GDOP',
  },
  {
    title: 'Command Software',
    description: 'ML-assisted NLOS correction + weighted multilateration + IMU/barometer fusion. Real-time confidence scoring',
    metric: 'Real-time tracks',
  },
];

const systemLayers = [
  {
    layer: '01',
    name: 'Sensor + RF Layer',
    components: ['DWM3000 UWB ToF', 'BMI270/ICM-20948 IMU', 'BMP388 Barometer', 'SX1276 LoRa'],
  },
  {
    layer: '02',
    name: 'ML Correction Layer',
    components: ['NLOS Bias Estimation', 'Link Quality Features', 'Gradient-Boosted Trees', 'Uncertainty Weighting'],
  },
  {
    layer: '03',
    name: 'Position Solve Layer',
    components: ['Weighted Multilateration', 'Kalman Predict + Correct', 'Barometric Z-Constraint', 'GDOP Analysis'],
  },
  {
    layer: '04',
    name: 'Interface Layer',
    components: ['Floor Plan Overlay', 'Confidence Color Coding', 'Stale Position Alerts', 'Man-Down Detection'],
  },
];

export default function SystemSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });

  return (
    <section id="system" ref={sectionRef} className="relative py-32 px-4 bg-black">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <span className="text-blue-400 font-mono text-sm tracking-wider uppercase mb-4 block">
            System Architecture
          </span>
          <h2 className="text-5xl md:text-7xl font-black mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-300 to-white">
            Four Tightly Integrated Components
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
            Wearable Tag + Fixed UWB Anchor Network + Drone Mobile Anchor + Command Software delivering real-time position with confidence scoring
          </p>
        </motion.div>

        {/* Architecture Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-24">
          {architectureFeatures.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="relative group"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="relative p-8 border border-white/10 rounded-2xl bg-gray-900/50 backdrop-blur-sm hover:border-blue-400/50 transition-all duration-300">
                <h3 className="text-xl font-bold mb-3 text-white">{feature.title}</h3>
                <p className="text-gray-400 text-sm mb-4 leading-relaxed">{feature.description}</p>
                <div className="inline-block px-4 py-2 bg-blue-500/10 border border-blue-400/30 rounded-lg">
                  <span className="text-blue-300 font-mono text-sm">{feature.metric}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* System Layers Visualization */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mb-24"
        >
          <h3 className="text-3xl font-bold text-center mb-12 text-white">
            Four-Layer Architecture
          </h3>
          <div className="space-y-4">
            {systemLayers.map((layer, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -50 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.5 + index * 0.1 }}
                className="relative group"
              >
                <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-blue-400 rounded-xl opacity-0 group-hover:opacity-20 blur transition-opacity duration-300" />
                <div className="relative p-6 border border-white/10 rounded-xl bg-gray-900/80 backdrop-blur-sm hover:border-blue-400/50 transition-all duration-300 flex items-center gap-6">
                  <div className="flex-shrink-0">
                    <span className="text-4xl font-black text-blue-500/30 font-mono">{layer.layer}</span>
                  </div>
                  <div className="flex-grow">
                    <h4 className="text-xl font-bold mb-2 text-white">{layer.name}</h4>
                    <div className="flex flex-wrap gap-2">
                      {layer.components.map((component, i) => (
                        <span
                          key={i}
                          className="px-3 py-1 bg-blue-500/10 border border-blue-400/20 rounded-full text-blue-300 text-sm font-mono"
                        >
                          {component}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Technical Specs */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16"
        >
          {[
            { label: 'Position Accuracy', value: '<10cm' },
            { label: 'Update Rate', value: '10Hz' },
            { label: 'Max Range', value: '2km' },
            { label: 'Battery Life', value: '12h+' },
          ].map((spec, index) => (
            <div
              key={index}
              className="text-center p-6 border border-white/10 rounded-xl bg-gray-900/50 backdrop-blur-sm"
            >
              <p className="text-3xl md:text-4xl font-black text-blue-400 mb-2">{spec.value}</p>
              <p className="text-sm text-gray-400 font-mono uppercase tracking-wide">{spec.label}</p>
            </div>
          ))}
        </motion.div>

        {/* Mathematical Foundation */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 1 }}
          className="border border-white/10 rounded-2xl bg-gradient-to-br from-blue-900/20 to-black p-8 md:p-12"
        >
          <h3 className="text-3xl font-bold text-center mb-8 text-white">
            Mathematical Foundation
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <div className="p-6 bg-black/40 rounded-xl border border-blue-400/20">
                <p className="text-blue-300 text-sm font-mono mb-3 uppercase">UWB Time-of-Flight</p>
                <p className="text-white text-2xl font-mono mb-2">d = c × (t₂ - t₁)</p>
                <p className="text-gray-400 text-sm">Two-way ranging: round-trip time multiplied by speed of light (3×10⁸ m/s)</p>
              </div>
              <div className="p-6 bg-black/40 rounded-xl border border-blue-400/20">
                <p className="text-blue-300 text-sm font-mono mb-3 uppercase">Trilateration (3D)</p>
                <p className="text-white text-lg font-mono mb-2">||p - aᵢ||² = dᵢ²</p>
                <p className="text-gray-400 text-sm">Euclidean distance constraint for each anchor: (x-xᵢ)² + (y-yᵢ)² + (z-zᵢ)² = dᵢ²</p>
              </div>
            </div>
            <div className="space-y-4">
              <div className="p-6 bg-black/40 rounded-xl border border-blue-400/20">
                <p className="text-blue-300 text-sm font-mono mb-3 uppercase">Least Squares Optimization</p>
                <p className="text-white text-xl font-mono mb-2">argmin Σ(||p - aᵢ|| - dᵢ)²</p>
                <p className="text-gray-400 text-sm">Find position p that minimizes total squared error across all distance measurements</p>
              </div>
              <div className="p-6 bg-black/40 rounded-xl border border-blue-400/20">
                <p className="text-blue-300 text-sm font-mono mb-3 uppercase">Kalman State Update</p>
                <p className="text-white text-lg font-mono mb-2">x̂ₖ = x̂ₖ⁻ + K(zₖ - Hx̂ₖ⁻)</p>
                <p className="text-gray-400 text-sm">Fuse IMU prediction with UWB correction using optimal Kalman gain</p>
              </div>
            </div>
          </div>
          <div className="mt-6 p-6 bg-blue-500/10 border border-blue-400/30 rounded-xl">
            <p className="text-blue-300 text-sm font-mono mb-2 uppercase">Key Insight</p>
            <p className="text-white text-lg">
              Each UWB distance defines a sphere. With 4+ anchors, sphere intersection constrains the position to a unique point. 
              The system solves for the point that best satisfies all distance constraints simultaneously, achieving sub-10cm accuracy.
            </p>
          </div>
        </motion.div>

        {/* Drone Mobile Anchor Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="border border-white/10 rounded-2xl bg-gradient-to-br from-blue-900/20 to-black p-8 md:p-12"
        >
          <h3 className="text-3xl font-bold text-center mb-6 text-white">
            Drone Mobile Anchor — Function + Integration
          </h3>
          <p className="text-center text-gray-400 mb-10 max-w-3xl mx-auto">
            Acts as an additional anchor with time-varying known position. Improves geometry when fixed anchors are blocked, damaged, or create weak intersection angles.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="p-6 bg-black/40 rounded-xl border border-blue-400/20">
              <h4 className="text-lg font-bold text-blue-400 mb-3">Drone Payload</h4>
              <ul className="text-gray-400 text-sm space-y-2">
                <li className="flex items-start gap-2">
                  <span className="text-blue-400">•</span>
                  <span>UWB module + controller</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-400">•</span>
                  <span>Behaves like fixed anchor</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-400">•</span>
                  <span>Optional LoRa relay</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-400">•</span>
                  <span>Stability-preserving mount</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-400">•</span>
                  <span>Reduced RF blockage design</span>
                </li>
              </ul>
            </div>

            <div className="p-6 bg-black/40 rounded-xl border border-blue-400/20">
              <h4 className="text-lg font-bold text-blue-400 mb-3">Mathematical Benefits</h4>
              <ul className="text-gray-400 text-sm space-y-2">
                <li className="flex items-start gap-2">
                  <span className="text-blue-400">•</span>
                  <span>Adds extra range constraint</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-400">•</span>
                  <span>Improves multilateration solve</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-400">•</span>
                  <span>Reduces GDOP magnitude</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-400">•</span>
                  <span>Improves spatial diversity</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-400">•</span>
                  <span>Better condition number</span>
                </li>
              </ul>
            </div>

            <div className="p-6 bg-black/40 rounded-xl border border-blue-400/20">
              <h4 className="text-lg font-bold text-blue-400 mb-3">When It Helps</h4>
              <ul className="text-gray-400 text-sm space-y-2">
                <li className="flex items-start gap-2">
                  <span className="text-blue-400">•</span>
                  <span>Fixed anchors blocked</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-400">•</span>
                  <span>Building layout causes weak angles</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-400">•</span>
                  <span>Anchors missing/damaged</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-400">•</span>
                  <span>Communication range extension</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-400">•</span>
                  <span>Infrastructure destroyed</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="p-6 bg-blue-500/10 border border-blue-400/30 rounded-xl text-center">
            <p className="text-blue-300 font-semibold mb-2">Engineering Solution, Not a Gimmick</p>
            <p className="text-gray-300">
              The drone addresses a specific failure mode: anchor geometry degradation. 
              By repositioning to create better intersection angles, it's an engineering solution 
              to a mathematical problem, making the system more robust in real-world emergency scenarios.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
