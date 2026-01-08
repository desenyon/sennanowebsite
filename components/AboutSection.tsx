'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' as const } }
};

const teamMembers = [
  {
    name: 'Naitik Gupta',
    role: 'Algorithm Lead',
    bio: 'Localization algorithms and sensor fusion',
    image: '/team/naitik.jpeg',
  },
  {
    name: 'Julian Juan',
    role: 'Modeling',
    bio: '3D modeling, simulation, and CAD',
    image: '/team/julian.jpeg',
  },
  {
    name: 'Ming Ying',
    role: 'Materials',
    bio: 'Hardware durability and environmental testing',
    image: '/team/ming.jpeg',
  },
  {
    name: 'Ayush Iyer',
    role: 'Firmware',
    bio: 'IMU fusion and communication protocols',
    image: '/team/ayush.jpeg',
  },
  {
    name: 'Gavyn Liu',
    role: 'Hardware Lead',
    bio: 'Circuit design and PCB layout',
    image: '/team/gavyn.jpeg',
  },
];

export default function AboutSection() {
  return (
    <section id="about" className="py-32 px-6 md:px-12 lg:px-24 bg-black border-t border-gray-800/50">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={fadeUp}
          className="mb-16"
        >
          <div className="flex items-center gap-4 mb-4">
            <span className="text-blue-500 font-mono text-sm">09</span>
            <div className="h-px flex-1 bg-gradient-to-r from-blue-500/50 to-transparent max-w-[100px]" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">
            The Team
          </h2>
          <p className="text-gray-500 max-w-xl">
            The people behind Sentinal Nano S1.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {teamMembers.map((member, index) => (
            <motion.div
              key={index}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-30px" }}
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.4, delay: index * 0.08, ease: 'easeOut' as const } }
              }}
              className="group"
            >
              <div className="p-4 bg-gradient-to-br from-gray-900/80 to-gray-900/40 border border-gray-800 rounded-xl hover:border-gray-700 transition-all duration-300 text-center">
                <div className="w-20 h-20 mx-auto mb-4 rounded-xl overflow-hidden border border-gray-700 bg-gray-900 group-hover:border-blue-500/50 transition-colors">
                  <Image
                    src={member.image}
                    alt={member.name}
                    width={80}
                    height={80}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.style.display = 'none';
                      const parent = target.parentElement;
                      if (parent) {
                        parent.innerHTML = `<div class="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-800 to-gray-900"><span class="text-2xl font-medium text-gray-500">${member.name.charAt(0)}</span></div>`;
                      }
                    }}
                  />
                </div>
                
                <h3 className="text-white font-medium mb-1">{member.name}</h3>
                <p className="text-blue-400 text-xs font-medium mb-2">{member.role}</p>
                <p className="text-gray-500 text-xs leading-relaxed">{member.bio}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
