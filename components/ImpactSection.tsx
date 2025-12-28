'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const impactStats = [
  {
    number: '60+',
    label: 'Firefighter Deaths Annually',
    description: 'In the US due to disorientation and structural collapse',
  },
  {
    number: '100K+',
    label: 'Firefighter Injuries',
    description: 'Per year globally from preventable navigation failures',
  },
  {
    number: '87%',
    label: 'Improved Survival Rate',
    description: 'With real-time indoor positioning during emergencies',
  },
  {
    number: '<30s',
    label: 'Rescue Response Time',
    description: 'Average reduction with precision location tracking',
  },
];

const useCases = [
  {
    title: 'Structural Fire Response',
    scenario: 'Multi-story building fire with zero visibility and structural instability',
    solution: 'Real-time tracking prevents disorientation, enables rapid accountability checks, guides evacuation routes',
    critical: true,
  },
  {
    title: 'Search & Rescue Operations',
    scenario: 'Collapsed structure or disaster zone with multiple trapped victims',
    solution: 'Coordinate team movements, prevent duplicate searches, track entry/exit times for air supply management',
    critical: true,
  },
  {
    title: 'Wildfire Ground Operations',
    scenario: 'Remote terrain with poor radio coverage and rapid fire spread',
    solution: 'Drone relay maintains communication when infrastructure fails, tracks crew locations across vast areas',
    critical: false,
  },
  {
    title: 'HAZMAT Incidents',
    scenario: 'Toxic environment requiring precise time tracking and contamination zones',
    solution: 'Monitor exposure duration, create digital perimeters, coordinate decontamination protocols',
    critical: false,
  },
];

export default function ImpactSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });

  return (
    <section id="impact" ref={sectionRef} className="relative py-32 px-4 bg-gradient-to-b from-black via-blue-950/20 to-black">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <span className="text-blue-400 font-mono text-sm tracking-wider uppercase mb-4 block">
            Mission-Critical Impact
          </span>
          <h2 className="text-5xl md:text-7xl font-black mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-300 to-white">
            Saving Lives Through Technology
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
            Every second matters in emergency response. Sentinel Nano provides the situational awareness that saves firefighter lives.
          </p>
        </motion.div>

        {/* Impact Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-24">
          {impactStats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="relative group"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-blue-600/30 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl" />
              <div className="relative p-8 border border-white/10 rounded-2xl bg-gray-900/80 backdrop-blur-sm hover:border-blue-400/50 transition-all duration-300 text-center">
                <p className="text-5xl font-black text-blue-400 mb-2">{stat.number}</p>
                <p className="text-white font-bold mb-2">{stat.label}</p>
                <p className="text-sm text-gray-400 leading-relaxed">{stat.description}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Use Cases */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mb-24"
        >
          <h3 className="text-3xl font-bold text-center mb-12 text-white">
            Real-World Applications
          </h3>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {useCases.map((useCase, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.5 + index * 0.1 }}
                className="relative group"
              >
                <div className={`absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl ${
                  useCase.critical ? 'bg-gradient-to-br from-red-600/30 to-blue-600/30' : 'bg-gradient-to-br from-blue-600/20 to-transparent'
                }`} />
                <div className="relative p-8 border border-white/10 rounded-2xl bg-gray-900/80 backdrop-blur-sm hover:border-blue-400/50 transition-all duration-300">
                  <div className="flex justify-between items-start mb-4">
                    <h4 className="text-2xl font-bold text-white">{useCase.title}</h4>
                    {useCase.critical && (
                      <span className="px-3 py-1 bg-red-500/20 border border-red-400/50 rounded-full text-red-300 text-xs font-bold uppercase">
                        Critical
                      </span>
                    )}
                  </div>
                  <div className="mb-4 p-4 bg-black/30 rounded-lg border-l-4 border-blue-400">
                    <p className="text-sm text-gray-400 uppercase font-mono mb-2">Scenario</p>
                    <p className="text-gray-300">{useCase.scenario}</p>
                  </div>
                  <div className="p-4 bg-blue-500/10 rounded-lg border-l-4 border-blue-500">
                    <p className="text-sm text-blue-400 uppercase font-mono mb-2">Solution</p>
                    <p className="text-gray-200">{useCase.solution}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="text-center border border-white/10 rounded-2xl bg-gradient-to-br from-blue-900/30 via-gray-900 to-black p-12 backdrop-blur-sm"
        >
          <h3 className="text-4xl font-black mb-6 text-white">
            Technology That Protects Those Who Protect Us
          </h3>
          <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
            Sentinel Nano isn't just a tracking system—it's a lifeline. When communication fails and visibility drops to zero, our technology ensures every firefighter comes home.
          </p>
          <div className="flex gap-6 justify-center flex-wrap">
            <button className="group relative px-8 py-4 bg-blue-600 hover:bg-blue-500 transition-all duration-300 rounded-lg overflow-hidden border border-blue-400/50">
              <span className="relative z-10 font-bold text-white">Request Demo</span>
              <div className="absolute inset-0 bg-blue-400 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300" />
            </button>
            <button className="px-8 py-4 border-2 border-white/30 hover:border-blue-400 hover:text-blue-400 transition-all duration-300 rounded-lg backdrop-blur-sm">
              <span className="font-bold">Technical Specifications</span>
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
