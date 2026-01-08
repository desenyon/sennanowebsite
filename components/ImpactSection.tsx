'use client';

import { motion } from 'framer-motion';

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' as const } }
};

const phases = [
  {
    num: 1,
    title: 'Tag Bring-up',
    desc: 'Electronics + firmware',
    status: 'foundation',
    items: [
      'Pico ↔ DWM3000 SPI communication stable',
      '2-way ranging verified in open space',
      'Logs: (timestamp, anchor_id, d_meas, quality)'
    ]
  },
  {
    num: 2,
    title: 'Anchor Network',
    desc: '4–6 fixed units',
    status: 'foundation',
    items: [
      'Anchors respond reliably to ranging requests',
      'Unique IDs assigned and consistent',
      'Position config file with surveyed coordinates'
    ]
  },
  {
    num: 3,
    title: 'Position Solver',
    desc: 'Base station software',
    status: 'core',
    items: [
      'Multilateration runs with 4+ anchors',
      'Outlier rejection reduces position jumps',
      'Real-time display with confidence indicator'
    ]
  },
  {
    num: 4,
    title: 'ML Integration',
    desc: 'Bias correction model',
    status: 'enhancement',
    items: [
      'Training dataset: LOS + NLOS samples',
      'Model outputs bias and uncertainty per link',
      'Corrected ranges improve positioning accuracy'
    ]
  },
  {
    num: 5,
    title: 'Drone Anchor',
    desc: 'Optional geometry improvement',
    status: 'optional',
    items: [
      'Drone participates as mobile anchor',
      'Demonstrates improved accuracy in obstructed areas'
    ]
  }
];

const statusColors = {
  foundation: { bg: 'bg-blue-500/10', border: 'border-blue-500/30', text: 'text-blue-400', label: 'Foundation' },
  core: { bg: 'bg-green-500/10', border: 'border-green-500/30', text: 'text-green-400', label: 'Core' },
  enhancement: { bg: 'bg-purple-500/10', border: 'border-purple-500/30', text: 'text-purple-400', label: 'Enhancement' },
  optional: { bg: 'bg-gray-500/10', border: 'border-gray-500/30', text: 'text-gray-400', label: 'Optional' },
};

export default function ImpactSection() {
  return (
    <section id="build" className="py-32 px-6 md:px-12 lg:px-24 bg-black border-t border-gray-800/50">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={fadeUp}
          className="mb-16"
        >
          <div className="flex items-center gap-4 mb-4">
            <span className="text-blue-500 font-mono text-sm">07</span>
            <div className="h-px flex-1 bg-gradient-to-r from-blue-500/50 to-transparent max-w-[100px]" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">
            Build Plan
          </h2>
          <p className="text-gray-500 max-w-xl">
            Development phases and deliverables for the Sentinal Nano system.
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative mb-20">
          {/* Connecting line */}
          <div className="absolute left-[19px] top-8 bottom-8 w-px bg-gradient-to-b from-blue-500/50 via-green-500/50 to-gray-500/30 hidden md:block" />
          
          <div className="space-y-6">
            {phases.map((phase, index) => {
              const colors = statusColors[phase.status as keyof typeof statusColors];
              return (
                <motion.div
                  key={phase.num}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-30px" }}
                  variants={{
                    hidden: { opacity: 0, x: -20 },
                    visible: { opacity: 1, x: 0, transition: { duration: 0.4, delay: index * 0.08, ease: 'easeOut' as const } }
                  }}
                  className="relative flex gap-6"
                >
                  {/* Phase number */}
                  <div className={`w-10 h-10 rounded-xl ${colors.bg} border ${colors.border} flex items-center justify-center flex-shrink-0 z-10`}>
                    <span className={`font-mono text-sm ${colors.text}`}>{phase.num}</span>
                  </div>

                  {/* Content */}
                  <div className="flex-1 p-6 bg-gradient-to-br from-gray-900/80 to-gray-900/40 border border-gray-800 rounded-xl hover:border-gray-700 transition-colors">
                    <div className="flex flex-wrap items-start justify-between gap-3 mb-4">
                      <div>
                        <h3 className="text-lg font-semibold text-white">{phase.title}</h3>
                        <p className="text-gray-500 text-sm">{phase.desc}</p>
                      </div>
                      <span className={`text-xs px-2 py-1 rounded ${colors.bg} ${colors.text} border ${colors.border}`}>
                        {colors.label}
                      </span>
                    </div>
                    
                    <div className="grid gap-2">
                      {phase.items.map((item, i) => (
                        <div key={i} className="flex items-start gap-3 text-sm">
                          <svg className="w-4 h-4 text-gray-600 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4" />
                          </svg>
                          <span className="text-gray-400">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Summary */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={fadeUp}
        >
          <div className="flex items-center gap-4 mb-4">
            <span className="text-blue-500 font-mono text-sm">08</span>
            <div className="h-px flex-1 bg-gradient-to-r from-blue-500/50 to-transparent max-w-[100px]" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">
            Technical Summary
          </h2>
          <p className="text-gray-500 max-w-xl mb-12">
            What the Sentinal Nano S1 provides.
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { label: 'Hardware', value: 'Wearable UWB tag', detail: 'Pico 2 W + DWM3000, 12h battery', color: 'blue' },
              { label: 'Geometry', value: 'Fixed anchors', detail: 'Surveyed coordinates, multilateration', color: 'green' },
              { label: 'ML Component', value: 'NLOS correction', detail: 'Per-link bias from signal features', color: 'purple' },
              { label: 'Tracking', value: 'Predict-correct filter', detail: 'Smooth, stable position estimates', color: 'orange' },
              { label: 'Output', value: 'Real-time (x, y, z)', detail: 'With confidence metric', color: 'cyan' },
            ].map((item) => (
              <div 
                key={item.label}
                className="p-5 bg-gradient-to-br from-gray-900/80 to-gray-900/40 border border-gray-800 rounded-xl hover:border-gray-700 transition-colors"
              >
                <p className={`text-${item.color}-400 text-xs font-medium uppercase tracking-wider mb-2`}>{item.label}</p>
                <p className="text-white font-medium mb-1">{item.value}</p>
                <p className="text-gray-500 text-sm">{item.detail}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
