'use client';

import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

// 3D Sphere Intersection Visualization
function SphereIntersection({ anchorCount }: { anchorCount: number }) {
  const anchor1Ref = useRef<THREE.Mesh>(null);
  const anchor2Ref = useRef<THREE.Mesh>(null);
  const anchor3Ref = useRef<THREE.Mesh>(null);
  const anchor4Ref = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const time = state.clock.elapsedTime;
    [anchor1Ref, anchor2Ref, anchor3Ref, anchor4Ref].forEach((ref, i) => {
      if (ref.current && i < anchorCount) {
        const material = ref.current.material as THREE.MeshStandardMaterial;
        if (material.opacity !== undefined) {
          material.opacity = 0.15 + Math.sin(time + i) * 0.05;
        }
      }
    });
  });

  const anchors = [
    { pos: [-3, 2, 0], color: '#3b82f6', ref: anchor1Ref },
    { pos: [3, 2, 0], color: '#06b6d4', ref: anchor2Ref },
    { pos: [0, -2, 2], color: '#8b5cf6', ref: anchor3Ref },
    { pos: [0, -2, -2], color: '#ec4899', ref: anchor4Ref },
  ];

  return (
    <>
      <ambientLight intensity={0.4} />
      <pointLight position={[10, 10, 10]} intensity={0.8} />
      
      {/* Anchors and their spheres */}
      {anchors.slice(0, anchorCount).map((anchor, i) => (
        <group key={i}>
          {/* Anchor point */}
          <mesh position={anchor.pos as [number, number, number]}>
            <sphereGeometry args={[0.15, 16, 16]} />
            <meshStandardMaterial color={anchor.color} emissive={anchor.color} emissiveIntensity={0.5} />
          </mesh>
          
          {/* Distance sphere */}
          <mesh ref={anchor.ref} position={anchor.pos as [number, number, number]}>
            <sphereGeometry args={[2.5, 32, 32]} />
            <meshStandardMaterial
              color={anchor.color}
              transparent
              opacity={0.15}
              wireframe
              side={THREE.DoubleSide}
            />
          </mesh>
        </group>
      ))}

      {/* Target position (where spheres intersect) */}
      <mesh position={[0, 0, 0]}>
        <sphereGeometry args={[0.2, 16, 16]} />
        <meshStandardMaterial color="#fbbf24" emissive="#fbbf24" emissiveIntensity={1} />
      </mesh>

      {/* Grid floor */}
      <gridHelper args={[10, 20, '#0ea5e9', '#1e293b']} position={[0, -3, 0]} />
    </>
  );
}

const sphereSteps = [
  {
    anchors: 1,
    title: 'One Anchor = One Sphere',
    description: 'A single distance measurement creates a sphere of possible positions. The anchor is the center, measured distance is the radius. Firefighter could be anywhere on this sphere.',
    uncertainty: 'Infinite positions',
  },
  {
    anchors: 2,
    title: 'Two Anchors = Circle Intersection',
    description: 'Two spheres intersect to form a circle. Position is now constrained to a ring in 3D space. Still highly ambiguous but uncertainty is dramatically reduced.',
    uncertainty: 'Circular ring',
  },
  {
    anchors: 3,
    title: 'Three Anchors = Two Points',
    description: 'Three spheres intersect at exactly two points—mirror images across the anchor plane. One point is usually impossible (above ceiling/below floor) and discarded using barometric altitude.',
    uncertainty: '2 candidates',
  },
  {
    anchors: 4,
    title: 'Four Anchors = Unique Solution',
    description: 'Four spheres intersect at a single point with redundancy. This is the minimum for reliable 3D positioning. System finds the point that minimizes total distance error across all anchors.',
    uncertainty: 'Centimeter-level',
  },
];

const softwareFeatures = [
  {
    title: 'Sphere-Intersection Trilateration',
    description: 'Treats each UWB distance as a sphere constraint. Solves for the point that best fits all spheres simultaneously using least-squares optimization.',
    specs: [
      'TDOA ranging: d = c × Δt',
      'Minimize Σ(||p - aᵢ|| - dᵢ)²',
      'Gauss-Newton solver',
      'Sub-10cm convergence',
    ],
  },
  {
    title: 'Predict + Correct Algorithm',
    description: 'IMU predicts motion between UWB updates. UWB measurements correct accumulated drift. Kalman filter fuses both sources for smooth tracking.',
    specs: [
      'IMU integration: p = p₀ + vΔt + ½aΔt²',
      'Kalman correction: K = PH^T(HPH^T + R)^-1',
      'Dead reckoning fallback',
      'Quaternion orientation',
    ],
  },
  {
    title: 'Confidence Scoring System',
    description: 'Real-time signal quality analysis. RSSI thresholds, geometric dilution of precision (GDOP), and anchor health monitoring determine position confidence.',
    specs: [
      'GDOP = √(σ²x + σ²y + σ²z)',
      'RSSI > -85dBm threshold',
      'Multi-path detection',
      'Auto-failover to drone',
    ],
  },
  {
    title: 'Drone as Mobile Anchor',
    description: 'When fixed anchor geometry degrades, drone repositions to create better sphere intersection angles. Acts as both anchor and LoRa relay.',
    specs: [
      'GPS-based drone positioning',
      'Dynamic GDOP optimization',
      'Hovering stability ±0.5m',
      'Relay range extension',
    ],
  },
];

export default function SoftwareSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });
  const [anchorCount, setAnchorCount] = useState(4);

  return (
    <section id="software" ref={sectionRef} className="relative py-32 px-4 bg-black">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <span className="text-blue-400 font-mono text-sm tracking-wider uppercase mb-4 block">
            Positioning Mathematics
          </span>
          <h2 className="text-5xl md:text-7xl font-black mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-300 to-white">
            Sphere-Intersection Tracking
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
            Each anchor creates a distance sphere. Multiple spheres intersect to constrain position. Four anchors eliminate ambiguity.
          </p>
        </motion.div>

        {/* 3D Sphere Visualization */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-24"
        >
          <div className="border border-white/10 rounded-2xl bg-gradient-to-br from-gray-900 to-black p-8 backdrop-blur-sm">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* 3D Canvas */}
              <div className="relative h-96 bg-gray-950 border border-white/10 rounded-xl overflow-hidden">
                <Canvas camera={{ position: [5, 3, 5], fov: 50 }}>
                  <SphereIntersection anchorCount={anchorCount} />
                </Canvas>
                <div className="absolute top-4 right-4 bg-black/80 backdrop-blur-sm px-4 py-2 rounded-lg border border-blue-400/30">
                  <p className="text-blue-300 font-mono text-sm">{anchorCount} Anchor{anchorCount !== 1 ? 's' : ''} Active</p>
                </div>
              </div>

              {/* Step Controls */}
              <div className="space-y-4">
                <h3 className="text-2xl font-bold text-white mb-6">Sphere Intersection Logic</h3>
                {sphereSteps.map((step, index) => (
                  <button
                    key={index}
                    onClick={() => setAnchorCount(step.anchors)}
                    className={`w-full text-left p-4 rounded-xl transition-all duration-300 border-2 ${
                      anchorCount === step.anchors
                        ? 'bg-blue-600/20 border-blue-400'
                        : 'bg-gray-900/50 border-white/10 hover:border-blue-400/50'
                    }`}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="text-lg font-bold text-white">{step.title}</h4>
                      <span className="px-2 py-1 bg-blue-500/20 border border-blue-400/30 rounded text-blue-300 text-xs font-mono">
                        {step.uncertainty}
                      </span>
                    </div>
                    <p className="text-sm text-gray-400">{step.description}</p>
                  </button>
                ))}
              </div>
            </div>

            {/* Judge Explanation */}
            <div className="mt-8 p-6 bg-blue-500/10 border border-blue-400/30 rounded-xl">
              <p className="text-sm text-blue-300 uppercase font-mono mb-2">One-Sentence Explanation</p>
              <p className="text-white text-lg italic">
                "Each anchor gives a distance sphere, multiple spheres intersect to constrain the firefighter's position, and the drone adds a movable sphere to improve geometry when fixed anchors aren't enough."
              </p>
            </div>
          </div>
        </motion.div>

        {/* Software Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {softwareFeatures.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
              className="relative group"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="relative p-8 border border-white/10 rounded-2xl bg-gray-900/50 backdrop-blur-sm hover:border-blue-400/50 transition-all duration-300">
                <h3 className="text-2xl font-bold mb-3 text-white">{feature.title}</h3>
                <p className="text-gray-400 mb-6 leading-relaxed">{feature.description}</p>
                <div className="space-y-2">
                  {feature.specs.map((spec, i) => (
                    <div key={i} className="flex items-start gap-3 bg-black/30 p-3 rounded-lg">
                      <div className="w-1.5 h-1.5 bg-blue-400 rounded-full mt-1.5 flex-shrink-0" />
                      <span className="text-sm text-gray-300 font-mono">{spec}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Technical Formulas */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="border border-white/10 rounded-2xl bg-gradient-to-br from-blue-900/20 to-black p-8"
        >
          <h3 className="text-2xl font-bold text-center mb-8 text-white">Core Positioning Equations</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 bg-black/40 rounded-xl border border-blue-400/20">
              <p className="text-blue-300 text-sm font-mono mb-3 uppercase">Trilateration Objective</p>
              <p className="text-white text-xl font-mono">minimize Σ (||p - aᵢ|| - dᵢ)²</p>
              <p className="text-gray-400 text-sm mt-2">Find position p that minimizes distance error to all anchors aᵢ</p>
            </div>
            <div className="p-6 bg-black/40 rounded-xl border border-blue-400/20">
              <p className="text-blue-300 text-sm font-mono mb-3 uppercase">Kalman Gain</p>
              <p className="text-white text-xl font-mono">K = PH<sup>T</sup>(HPH<sup>T</sup> + R)<sup>-1</sup></p>
              <p className="text-gray-400 text-sm mt-2">Optimal fusion weight between prediction and measurement</p>
            </div>
            <div className="p-6 bg-black/40 rounded-xl border border-blue-400/20">
              <p className="text-blue-300 text-sm font-mono mb-3 uppercase">GDOP (Geometry Quality)</p>
              <p className="text-white text-xl font-mono">GDOP = √(σ²<sub>x</sub> + σ²<sub>y</sub> + σ²<sub>z</sub>)</p>
              <p className="text-gray-400 text-sm mt-2">Lower GDOP = better anchor geometry = higher accuracy</p>
            </div>
            <div className="p-6 bg-black/40 rounded-xl border border-blue-400/20">
              <p className="text-blue-300 text-sm font-mono mb-3 uppercase">Time-of-Flight Distance</p>
              <p className="text-white text-xl font-mono">d = c × Δt</p>
              <p className="text-gray-400 text-sm mt-2">UWB pulse roundtrip time converted to meters (c = 3×10⁸ m/s)</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
