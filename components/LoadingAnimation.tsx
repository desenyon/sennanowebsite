'use client';

import { useRef, useMemo, useState, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Float, Line } from '@react-three/drei';
import * as THREE from 'three';
import { motion, AnimatePresence } from 'framer-motion';

// Animated sphere representing range measurement
function RangeSphere({ 
  center, 
  targetRadius, 
  color, 
  delay,
}: { 
  center: [number, number, number]; 
  targetRadius: number; 
  color: string;
  delay: number;
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  const wireRef = useRef<THREE.Mesh>(null);
  const [currentRadius, setCurrentRadius] = useState(0.01);
  const startTime = useRef<number | null>(null);

  useFrame((state) => {
    const time = state.clock.elapsedTime;
    
    if (startTime.current === null) {
      startTime.current = time;
    }
    
    const elapsed = time - startTime.current;
    
    // Delayed expansion
    if (elapsed > delay) {
      const expandProgress = Math.min((elapsed - delay) / 1.8, 1);
      const eased = 1 - Math.pow(1 - expandProgress, 4); // Ease out quartic
      setCurrentRadius(0.01 + (targetRadius - 0.01) * eased);
    }

    if (meshRef.current) {
      // Subtle pulsing
      const pulse = 1 + Math.sin(time * 2 + delay) * 0.015;
      meshRef.current.scale.setScalar(pulse);
    }
    
    if (wireRef.current) {
      wireRef.current.rotation.y = time * 0.2;
      wireRef.current.rotation.x = time * 0.1;
    }
  });

  return (
    <group position={center}>
      {/* Glowing core sphere */}
      <mesh ref={meshRef}>
        <sphereGeometry args={[currentRadius, 48, 48]} />
        <meshStandardMaterial 
          color={color}
          transparent
          opacity={0.15}
          side={THREE.DoubleSide}
        />
      </mesh>
      
      {/* Wireframe overlay */}
      <mesh ref={wireRef}>
        <sphereGeometry args={[currentRadius * 1.002, 24, 24]} />
        <meshBasicMaterial 
          color={color} 
          wireframe 
          transparent 
          opacity={0.4}
        />
      </mesh>

      {/* Outer glow ring */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[currentRadius, 0.01, 16, 64]} />
        <meshBasicMaterial 
          color={color}
          transparent
          opacity={0.6}
        />
      </mesh>

      {/* Anchor point */}
      <mesh>
        <sphereGeometry args={[0.1, 24, 24]} />
        <meshStandardMaterial 
          color={color} 
          emissive={color} 
          emissiveIntensity={2}
        />
      </mesh>
    </group>
  );
}

// Target position marker (firefighter position)
function TargetPosition({ delay }: { delay: number }) {
  const groupRef = useRef<THREE.Group>(null);
  const [visible, setVisible] = useState(false);
  const [scale, setScale] = useState(0);
  const startTime = useRef<number | null>(null);

  useFrame((state) => {
    if (startTime.current === null) {
      startTime.current = state.clock.elapsedTime;
    }
    
    const elapsed = state.clock.elapsedTime - startTime.current;
    
    if (elapsed > delay && !visible) {
      setVisible(true);
    }
    
    if (visible && scale < 1) {
      setScale(Math.min(scale + 0.03, 1));
    }
    
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 1.2;
      groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.5) * 0.2;
    }
  });

  if (!visible) return null;

  // Position at the intersection of four spheres
  const position: [number, number, number] = [0.15, 0.1, 0.05];

  return (
    <group ref={groupRef} position={position} scale={scale}>
      {/* Core octahedron */}
      <mesh>
        <octahedronGeometry args={[0.12, 0]} />
        <meshStandardMaterial 
          color="#f97316" 
          emissive="#f97316" 
          emissiveIntensity={4}
        />
      </mesh>
      
      {/* Orbit ring 1 */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.22, 0.015, 16, 64]} />
        <meshStandardMaterial 
          color="#fb923c" 
          emissive="#f97316" 
          emissiveIntensity={2}
        />
      </mesh>
      
      {/* Orbit ring 2 */}
      <mesh rotation={[0, 0, 0]}>
        <torusGeometry args={[0.22, 0.012, 16, 64]} />
        <meshStandardMaterial 
          color="#fb923c" 
          emissive="#f97316" 
          emissiveIntensity={1.5}
          transparent
          opacity={0.8}
        />
      </mesh>
      
      {/* Orbit ring 3 */}
      <mesh rotation={[0, Math.PI / 2, 0]}>
        <torusGeometry args={[0.22, 0.01, 16, 64]} />
        <meshStandardMaterial 
          color="#fb923c" 
          emissive="#f97316" 
          emissiveIntensity={1}
          transparent
          opacity={0.6}
        />
      </mesh>
    </group>
  );
}

// Intersection highlight at the point where all 4 spheres meet
function IntersectionHighlight({ delay }: { delay: number }) {
  const groupRef = useRef<THREE.Group>(null);
  const [visible, setVisible] = useState(false);
  const [scale, setScale] = useState(0);
  const startTime = useRef<number | null>(null);

  useFrame((state) => {
    if (startTime.current === null) {
      startTime.current = state.clock.elapsedTime;
    }
    
    const elapsed = state.clock.elapsedTime - startTime.current;
    
    if (elapsed > delay && !visible) {
      setVisible(true);
    }
    
    if (visible && scale < 1) {
      setScale(Math.min(scale + 0.025, 1));
    }
    
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.8;
      groupRef.current.rotation.z = state.clock.elapsedTime * 0.3;
    }
  });

  if (!visible) return null;

  const position: [number, number, number] = [0.15, 0.1, 0.05];

  return (
    <group ref={groupRef} position={position} scale={scale}>
      {/* Glowing intersection sphere */}
      <mesh>
        <sphereGeometry args={[0.25, 32, 32]} />
        <meshStandardMaterial
          color="#f59e0b"
          emissive="#f59e0b"
          emissiveIntensity={1.5}
          transparent
          opacity={0.3}
        />
      </mesh>
      
      {/* Intersection wireframe */}
      <mesh>
        <sphereGeometry args={[0.26, 16, 16]} />
        <meshBasicMaterial
          color="#fbbf24"
          wireframe
          transparent
          opacity={0.6}
        />
      </mesh>

      {/* Pulsing rings around intersection */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.35, 0.012, 16, 64]} />
        <meshStandardMaterial
          color="#fbbf24"
          emissive="#f59e0b"
          emissiveIntensity={2}
          transparent
          opacity={0.7}
        />
      </mesh>
      <mesh rotation={[0, 0, 0]}>
        <torusGeometry args={[0.35, 0.01, 16, 64]} />
        <meshStandardMaterial
          color="#fbbf24"
          emissive="#f59e0b"
          emissiveIntensity={1.5}
          transparent
          opacity={0.5}
        />
      </mesh>
      <mesh rotation={[0, Math.PI / 2, 0]}>
        <torusGeometry args={[0.35, 0.008, 16, 64]} />
        <meshStandardMaterial
          color="#fbbf24"
          emissive="#f59e0b"
          emissiveIntensity={1}
          transparent
          opacity={0.4}
        />
      </mesh>
    </group>
  );
}

// Distance lines from anchors to target
function DistanceLines({ delay }: { delay: number }) {
  const [progress, setProgress] = useState(0);
  const startTime = useRef<number | null>(null);

  const anchors: [number, number, number][] = [
    [-1.2, -0.8, -0.5],
    [1.0, -0.6, 0.3],
    [0, 1.2, -0.2],
    [-0.3, -0.4, 1.0],
  ];
  
  const target: [number, number, number] = [0.15, 0.1, 0.05];

  useFrame((state) => {
    if (startTime.current === null) {
      startTime.current = state.clock.elapsedTime;
    }
    
    const elapsed = state.clock.elapsedTime - startTime.current;
    
    if (elapsed > delay) {
      const p = Math.min((elapsed - delay) / 1.2, 1);
      setProgress(1 - Math.pow(1 - p, 3));
    }
  });

  const colors = ['#ef4444', '#22c55e', '#3b82f6', '#a855f7'];

  if (progress === 0) return null;

  return (
    <group>
      {anchors.map((anchor, i) => {
        const currentEnd: [number, number, number] = [
          anchor[0] + (target[0] - anchor[0]) * progress,
          anchor[1] + (target[1] - anchor[1]) * progress,
          anchor[2] + (target[2] - anchor[2]) * progress,
        ];
        
        return (
          <Line 
            key={i}
            points={[anchor, currentEnd]}
            color={colors[i]}
            lineWidth={2}
            transparent
            opacity={0.8}
            dashed
            dashSize={0.05}
            gapSize={0.03}
          />
        );
      })}
    </group>
  );
}

// Floating particles background
function Particles() {
  const pointsRef = useRef<THREE.Points>(null);
  
  const positions = useMemo(() => {
    const count = 300;
    const pos = new Float32Array(count * 3);
    
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 10;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 10;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 10;
    }
    
    return pos;
  }, []);

  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    return geo;
  }, [positions]);

  useFrame((state) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y = state.clock.elapsedTime * 0.015;
      pointsRef.current.rotation.x = state.clock.elapsedTime * 0.008;
    }
  });

  return (
    <points ref={pointsRef} geometry={geometry}>
      <pointsMaterial
        size={0.02}
        color="#374151"
        transparent
        opacity={0.6}
        sizeAttenuation
      />
    </points>
  );
}

// Grid floor visualization
function Grid() {
  const gridRef = useRef<THREE.GridHelper>(null);

  useFrame((state) => {
    if (gridRef.current) {
      gridRef.current.position.y = -2 + Math.sin(state.clock.elapsedTime * 0.5) * 0.05;
    }
  });

  return (
    <gridHelper 
      ref={gridRef}
      args={[20, 40, '#1f2937', '#111827']} 
      position={[0, -2, 0]}
    />
  );
}

// Coordinate axes
function Axes() {
  return (
    <group>
      <Line points={[[0, -2, 0], [0, 2, 0]]} color="#3b82f6" lineWidth={1} transparent opacity={0.3} />
      <Line points={[[-2, 0, 0], [2, 0, 0]]} color="#ef4444" lineWidth={1} transparent opacity={0.3} />
      <Line points={[[0, 0, -2], [0, 0, 2]]} color="#22c55e" lineWidth={1} transparent opacity={0.3} />
    </group>
  );
}

// Camera controller
function CameraController() {
  const { camera } = useThree();
  
  useFrame((state) => {
    const t = state.clock.elapsedTime;
    camera.position.x = Math.sin(t * 0.1) * 0.5;
    camera.position.y = 0.5 + Math.sin(t * 0.15) * 0.3;
    camera.lookAt(0, 0, 0);
  });
  
  return null;
}

// Main 3D Scene
function Scene() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.06;
    }
  });

  return (
    <>
      <ambientLight intensity={0.4} />
      <pointLight position={[10, 10, 10]} intensity={0.8} color="#ffffff" />
      <pointLight position={[-10, -5, -10]} intensity={0.4} color="#3b82f6" />
      <pointLight position={[5, -10, 5]} intensity={0.3} color="#f97316" />

      <CameraController />

      <Float speed={0.8} rotationIntensity={0.05} floatIntensity={0.2}>
        <group ref={groupRef}>
          {/* Four range spheres from anchors */}
          <RangeSphere 
            center={[-1.2, -0.8, -0.5]} 
            targetRadius={1.8} 
            color="#ef4444" 
            delay={0.3}
          />
          <RangeSphere 
            center={[1.0, -0.6, 0.3]} 
            targetRadius={1.4} 
            color="#22c55e" 
            delay={0.7}
          />
          <RangeSphere 
            center={[0, 1.2, -0.2]} 
            targetRadius={1.5} 
            color="#3b82f6" 
            delay={1.1}
          />
          <RangeSphere 
            center={[-0.3, -0.4, 1.0]} 
            targetRadius={1.3} 
            color="#a855f7" 
            delay={1.5}
          />

          {/* Intersection highlight */}
          <IntersectionHighlight delay={2.8} />

          {/* Target position */}
          <TargetPosition delay={3.2} />

          {/* Distance lines */}
          <DistanceLines delay={3.6} />

          {/* Coordinate axes */}
          <Axes />
        </group>
      </Float>

      <Particles />
      <Grid />
    </>
  );
}

// Loading text animation
function LoadingText({ progress }: { progress: number }) {
  const texts = [
    { text: 'Initializing UWB ranging protocol...', color: 'text-gray-500' },
    { text: 'Deploying anchor network...', color: 'text-gray-500' },
    { text: 'Computing spherical intersections...', color: 'text-blue-500' },
    { text: 'Solving position estimate...', color: 'text-orange-500' },
    { text: 'SENTINAL NANO S1', color: 'text-white font-bold text-xl' }
  ];

  const currentIndex = Math.min(
    Math.floor(progress / 22),
    texts.length - 1
  );

  return (
    <motion.div 
      className="absolute top-8 left-8 z-10"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.2 }}
    >
      <AnimatePresence mode="wait">
        <motion.p 
          key={currentIndex}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.3 }}
          className={`font-mono text-sm ${texts[currentIndex].color}`}
        >
          {texts[currentIndex].text}
        </motion.p>
      </AnimatePresence>
      
      {currentIndex < texts.length - 1 && (
        <div className="mt-4 w-56 h-[2px] bg-gray-800 rounded overflow-hidden">
          <motion.div 
            className="h-full bg-gradient-to-r from-blue-500 via-blue-400 to-orange-500"
            style={{ width: `${progress}%` }}
          />
        </div>
      )}
    </motion.div>
  );
}

// Mathematical equation overlay
function MathOverlay({ visible }: { visible: boolean }) {
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="absolute bottom-20 left-8 right-8 pointer-events-none"
        >
          <div className="flex justify-between items-end">
            <div className="space-y-1">
              <p className="text-[10px] font-mono text-gray-600 uppercase tracking-wider">Multilateration Objective</p>
              <p className="text-xs font-mono text-gray-400">
                min<sub className="text-[9px]">p</sub> Σ<sub className="text-[9px]">i</sub> w<sub className="text-[9px]">i</sub>( ‖p − a<sub className="text-[9px]">i</sub>‖ − d<sub className="text-[9px]">i</sub> )<sup className="text-[9px]">2</sup>
              </p>
            </div>
            <div className="text-right space-y-1">
              <p className="text-[10px] font-mono text-gray-600 uppercase tracking-wider">Range Equation</p>
              <p className="text-xs font-mono text-gray-400">d<sub className="text-[9px]">i</sub> = c · Δt / 2</p>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// Legend showing anchor colors
function Legend({ visible }: { visible: boolean }) {
  if (!visible) return null;
  
  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 1 }}
      className="absolute top-8 right-8 space-y-1.5"
    >
      <div className="flex items-center gap-2">
        <div className="w-2 h-2 rounded-full bg-red-500" />
        <span className="text-[10px] font-mono text-gray-500">Anchor A₁</span>
      </div>
      <div className="flex items-center gap-2">
        <div className="w-2 h-2 rounded-full bg-green-500" />
        <span className="text-[10px] font-mono text-gray-500">Anchor A₂</span>
      </div>
      <div className="flex items-center gap-2">
        <div className="w-2 h-2 rounded-full bg-blue-500" />
        <span className="text-[10px] font-mono text-gray-500">Anchor A₃</span>
      </div>
      <div className="flex items-center gap-2">
        <div className="w-2 h-2 rounded-full bg-purple-500" />
        <span className="text-[10px] font-mono text-gray-500">Anchor A₄</span>
      </div>
      <div className="flex items-center gap-2 mt-2 pt-2 border-t border-gray-800">
        <div className="w-2 h-2 rounded-full bg-amber-500" />
        <span className="text-[10px] font-mono text-gray-400">Intersection</span>
      </div>
      <div className="flex items-center gap-2">
        <div className="w-2 h-2 rounded-full bg-orange-500" />
        <span className="text-[10px] font-mono text-gray-400">Position p(x,y,z)</span>
      </div>
    </motion.div>
  );
}

interface LoadingAnimationProps {
  onComplete: () => void;
  duration?: number;
}

export default function LoadingAnimation({ onComplete, duration = 5500 }: LoadingAnimationProps) {
  const [progress, setProgress] = useState(0);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    const startTime = Date.now();
    
    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const newProgress = Math.min((elapsed / duration) * 100, 100);
      setProgress(newProgress);
      
      if (newProgress >= 100) {
        clearInterval(interval);
        setTimeout(() => setIsExiting(true), 600);
        setTimeout(onComplete, 1300);
      }
    }, 50);

    return () => clearInterval(interval);
  }, [duration, onComplete]);

  return (
    <AnimatePresence>
      {!isExiting && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.8, ease: 'easeInOut' }}
          className="fixed inset-0 z-[100] bg-black"
        >
          <Canvas
            camera={{ position: [0, 0.5, 5], fov: 50 }}
            dpr={[1, 2]}
            gl={{ antialias: true, alpha: false }}
          >
            <Scene />
          </Canvas>
          
          <LoadingText progress={progress} />
          <Legend visible={progress > 10} />
          <MathOverlay visible={progress > 40} />

          {/* Bottom branding */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="absolute bottom-8 left-1/2 -translate-x-1/2 text-center"
          >
            <p className="text-[10px] font-mono text-orange-500/70 tracking-[0.3em] uppercase">
              Conrad Challenge 2026
            </p>
            <p className="text-[9px] font-mono text-gray-600 mt-1">
              Indoor Position Tracking System
            </p>
          </motion.div>

          {/* Skip button */}
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
            onClick={() => {
              setIsExiting(true);
              setTimeout(onComplete, 800);
            }}
            className="absolute bottom-8 right-8 text-xs font-mono text-gray-600 hover:text-gray-400 transition-colors px-3 py-1 border border-gray-800 rounded hover:border-gray-600"
          >
            Skip →
          </motion.button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
