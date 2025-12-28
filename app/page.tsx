'use client';

import { useEffect, useRef } from 'react';
import Lenis from 'lenis';
import HeroSection from '@/components/HeroSection';
import SystemSection from '@/components/SystemSection';
import HardwareSection from '@/components/HardwareSection';
import SoftwareSection from '@/components/SoftwareSection';
import ImpactSection from '@/components/ImpactSection';
import AboutSection from '@/components/AboutSection';
import Footer from '@/components/Footer';

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <main ref={containerRef} className="relative bg-black text-white overflow-hidden">
      <HeroSection />
      <SystemSection />
      <HardwareSection />
      <SoftwareSection />
      <ImpactSection />
      <AboutSection />
      <Footer />
    </main>
  );
}
