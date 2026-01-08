'use client';

import { useEffect, useRef, useState } from 'react';
import Lenis from 'lenis';
import dynamic from 'next/dynamic';
import HeroSection from '@/components/HeroSection';
import HardwareSection from '@/components/HardwareSection';
import SoftwareSection from '@/components/SoftwareSection';
import ImpactSection from '@/components/ImpactSection';
import AboutSection from '@/components/AboutSection';
import Footer from '@/components/Footer';

// Dynamic import for 3D loading animation (client-side only)
const LoadingAnimation = dynamic(() => import('@/components/LoadingAnimation'), {
  ssr: false,
});

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showContent, setShowContent] = useState(false);
  
  useEffect(() => {
    // Initialize Lenis smooth scrolling after loading completes
    if (!isLoading) {
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
    }
  }, [isLoading]);

  const handleLoadingComplete = () => {
    setIsLoading(false);
    // Small delay before showing content for smoother transition
    setTimeout(() => setShowContent(true), 100);
  };

  return (
    <>
      {isLoading && (
        <LoadingAnimation 
          onComplete={handleLoadingComplete} 
          duration={5500}
        />
      )}
      
      {showContent && (
        <main ref={containerRef} className="relative bg-black text-white overflow-hidden">
          <HeroSection />
          <HardwareSection />
          <SoftwareSection />
          <ImpactSection />
          <AboutSection />
          <Footer />
        </main>
      )}
    </>
  );
}
