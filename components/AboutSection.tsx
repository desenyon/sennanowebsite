'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import Image from 'next/image';

const teamMembers = [
  {
    name: 'Naitik Gupta',
    role: 'Algorithmic Software Lead',
    bio: 'Specializes in localization algorithms and sensor fusion. Leads the development of the core positioning system.',
    image: '/team/naitik.jpeg',
  },
  {
    name: 'Julian Juan',
    role: 'Modeling Researcher',
    bio: 'Expert in 3D modeling and simulation. Created the digital math model + CAD Models.',
    image: '/team/julian.jpeg',
  },
  {
    name: 'Ming Ying',
    role: 'Material Science Researcher',
    bio: 'Background in material science and rugged electronics. Worked on hardware durability and environmental testing, as well choosing materials for the device casings.',
    image: '/team/ming.jpeg',
  },
  {
    name: 'Ayush Iyer',
    role: 'Firmware Engineer',
    bio: 'Specializes in IMU sensor fusion and Kalman filtering. Implemented the drone to wearable tag communication protocols.',
    image: '/team/ayush.jpeg',
  },
  {
    name: 'Gavyn Liu',
    role: 'Hardware Lead',
    bio: 'Aerospace engineering background. Designed the mobile anchor payload and autonomous relay system. Worked on circuit design and PCB layout.',
    image: '/team/gavyn.jpeg',
  },
];

export default function AboutSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });

  return (
    <section id="about" ref={sectionRef} className="relative py-32 px-4 bg-gradient-to-b from-black via-gray-900 to-black">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <span className="text-blue-400 font-mono text-sm tracking-wider uppercase mb-4 block">
            The Team
          </span>
          <h2 className="text-5xl md:text-7xl font-black mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-300 to-white">
            About Us
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
            A team of engineers passionate about saving lives through innovative positioning technology
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {teamMembers.map((member, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="relative group"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-blue-600/30 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl" />
              <div className="relative p-8 border border-white/10 rounded-2xl bg-gray-900/80 backdrop-blur-sm hover:border-blue-400/50 transition-all duration-300">
                {/* Team member photo */}
                <div className="w-32 h-32 mx-auto mb-6 rounded-full overflow-hidden border-4 border-blue-400/30 bg-gray-800">
                  <Image
                    src={member.image}
                    alt={member.name}
                    width={128}
                    height={128}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      // Fallback to letter avatar if image fails to load
                      const target = e.target as HTMLImageElement;
                      target.style.display = 'none';
                      const parent = target.parentElement;
                      if (parent) {
                        parent.innerHTML = `<div class="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-600 to-blue-400"><span class="text-4xl font-black text-white">${member.name.charAt(0)}</span></div>`;
                      }
                    }}
                  />
                </div>
                
                <h3 className="text-2xl font-bold text-white mb-2 text-center">{member.name}</h3>
                <p className="text-blue-400 text-sm font-mono mb-4 text-center uppercase tracking-wide">{member.role}</p>
                <p className="text-gray-400 text-sm leading-relaxed text-center">{member.bio}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
