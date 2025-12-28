'use client';

import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

function RotatingChip() {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.3) * 0.2;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.4;
    }
  });

  return (
    <mesh ref={meshRef}>
      <boxGeometry args={[2, 0.2, 3]} />
      <meshStandardMaterial
        color="#0ea5e9"
        metalness={0.8}
        roughness={0.2}
        emissive="#0ea5e9"
        emissiveIntensity={0.3}
      />
    </mesh>
  );
}

const hardwareSpecs = [
  {
    category: 'Wearable Tag',
    price: '$80-100',
    components: [
      { name: 'DWM3000 UWB Module', spec: 'DecaWave chip, <10cm ranging' },
      { name: 'RFM95W LoRa Radio', spec: '868MHz, 1-2km range' },
      { name: 'MPU6050 IMU', spec: '6-axis gyro + accelerometer' },
      { name: 'BMP280 Barometer', spec: 'Vertical position tracking' },
      { name: 'ESP32 Controller', spec: 'Dual-core, WiFi optional' },
      { name: 'LiPo Battery', spec: '2000mAh, 12h runtime' },
    ],
    features: ['Waterproof casing', 'OLED status display', 'Emergency button', 'LED indicators'],
  },
  {
    category: 'Fixed Anchor',
    price: '$60-75',
    components: [
      { name: 'DWM3000 UWB Module', spec: 'Time sync master' },
      { name: 'RFM95W LoRa Radio', spec: 'Data relay to base' },
      { name: 'ESP32 Controller', spec: 'Mesh networking' },
      { name: 'Power Supply', spec: 'AC or 12V battery backup' },
    ],
    features: ['Magnetic mounting', 'Auto-calibration', '360° coverage', 'Weatherproof IP67'],
  },
  {
    category: 'Drone Payload',
    price: '$150-200',
    components: [
      { name: 'DWM3000 UWB Module', spec: 'Mobile anchor beacon' },
      { name: 'RFM95W LoRa Radio', spec: 'High-power relay module' },
      { name: 'GPS Module', spec: 'Drone absolute positioning' },
      { name: 'Raspberry Pi Zero', spec: 'Onboard processing' },
    ],
    features: ['Lightweight <200g', 'Gimbal-stabilized', 'Hot-swappable battery', 'Auto-hover mode'],
  },
];

export default function HardwareSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });
  const [selectedHardware, setSelectedHardware] = useState(0);

  return (
    <section id="hardware" ref={sectionRef} className="relative py-32 px-4 bg-gradient-to-b from-black via-gray-900 to-black">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <span className="text-blue-400 font-mono text-sm tracking-wider uppercase mb-4 block">
            Hardware Specifications
          </span>
          <h2 className="text-5xl md:text-7xl font-black mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-300 to-white">
            Military-Grade Components
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
            Ruggedized hardware designed for extreme environments and mission-critical reliability
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-24">
          {/* 3D Visualization */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="relative h-96 border border-white/10 rounded-2xl bg-gray-900/50 backdrop-blur-sm overflow-hidden"
          >
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-900/30 via-transparent to-transparent" />
            <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
              <ambientLight intensity={0.5} />
              <pointLight position={[10, 10, 10]} intensity={1} />
              <pointLight position={[-10, -10, -10]} intensity={0.5} color="#0ea5e9" />
              <RotatingChip />
            </Canvas>
            <div className="absolute bottom-4 left-4 bg-black/80 backdrop-blur-sm px-4 py-2 rounded-lg border border-blue-400/30">
              <p className="text-blue-300 font-mono text-sm">3D Model: UWB Tag Module</p>
            </div>
          </motion.div>

          {/* Hardware Selector */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <div className="flex gap-4 mb-8">
              {hardwareSpecs.map((hw, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedHardware(index)}
                  className={`flex-1 px-6 py-4 rounded-xl font-bold transition-all duration-300 border-2 ${
                    selectedHardware === index
                      ? 'bg-blue-600 border-blue-400 text-white'
                      : 'bg-gray-900/50 border-white/10 text-gray-400 hover:border-blue-400/50'
                  }`}
                >
                  {hw.category}
                </button>
              ))}
            </div>

            <div className="border border-white/10 rounded-2xl bg-gray-900/80 backdrop-blur-sm p-8">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-3xl font-black text-white">
                  {hardwareSpecs[selectedHardware].category}
                </h3>
                <span className="text-2xl font-black text-blue-400">
                  {hardwareSpecs[selectedHardware].price}
                </span>
              </div>

              <div className="space-y-4 mb-6">
                {hardwareSpecs[selectedHardware].components.map((component, index) => (
                  <div key={index} className="flex items-start gap-3 p-3 bg-black/30 rounded-lg">
                    <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 flex-shrink-0" />
                    <div>
                      <p className="text-white font-semibold">{component.name}</p>
                      <p className="text-gray-400 text-sm">{component.spec}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap gap-2">
                {hardwareSpecs[selectedHardware].features.map((feature, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-blue-500/10 border border-blue-400/30 rounded-full text-blue-300 text-sm"
                  >
                    {feature}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Cost Breakdown */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="border border-white/10 rounded-2xl bg-gradient-to-br from-gray-900 to-black p-8 md:p-12"
        >
          <h3 className="text-3xl font-bold text-center mb-12 text-white">
            Complete System Pricing
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <p className="text-gray-400 mb-2 font-mono text-sm uppercase tracking-wide">4× Wearable Tags</p>
              <p className="text-4xl font-black text-blue-400 mb-1">$320-400</p>
              <p className="text-gray-500 text-sm">Per firefighter squad</p>
            </div>
            <div className="text-center">
              <p className="text-gray-400 mb-2 font-mono text-sm uppercase tracking-wide">3× Fixed Anchors</p>
              <p className="text-4xl font-black text-blue-400 mb-1">$180-225</p>
              <p className="text-gray-500 text-sm">Minimum coverage setup</p>
            </div>
            <div className="text-center">
              <p className="text-gray-400 mb-2 font-mono text-sm uppercase tracking-wide">1× Drone System</p>
              <p className="text-4xl font-black text-blue-400 mb-1">$150-200</p>
              <p className="text-gray-500 text-sm">Mobile relay module</p>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t border-white/10 text-center">
            <p className="text-gray-400 mb-2 font-mono text-sm uppercase tracking-wide">Total System Cost</p>
            <p className="text-5xl font-black text-white mb-2">$650-825</p>
            <p className="text-gray-500">Complete 4-person squad tracking system</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
