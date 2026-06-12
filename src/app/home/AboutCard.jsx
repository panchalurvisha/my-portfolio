"use client";
import React from 'react';
import DesktopWindow from './DesktopWindow';
import { useSound } from './useSound';

export default function AboutCard({ isDark, onClose }) {
  const { playSound } = useSound();
  
  const techStack = ["Next.js", "React.js", "Node.js", "Express.js", "PostgreSQL", "PHP", "JavaScript", "Tailwind CSS", "Framer Motion"];
  const interests = ["Exploring new tech", "Side projects", "Backend architecture", "UI/UX design", "Problem solving", "Travelling"];
  const languages = ["English", "Hindi", "Gujarati"];

  return (
    <DesktopWindow title="about" isDark={isDark} onClose={onClose} width={920} height={600}>
      <div className={`px-5 md:px-8 pt-6 md:pt-8 pb-4 md:pb-6 flex-shrink-0 relative z-20 border-b shadow-sm transition-colors duration-300 ${isDark ? 'bg-[#182635] border-white/10' : 'bg-white/95 border-black/5'}`}>
        <div className="flex flex-col md:flex-row items-center md:items-start gap-4 md:gap-6 text-center md:text-left">
          <div onMouseEnter={() => playSound('hover_icon')} className={`cursor-pointer hover:scale-105 transition-transform w-[96px] h-[96px] md:w-[124px] md:h-[124px] rounded-full overflow-hidden flex-shrink-0 border shadow-sm ${isDark ? 'border-white/10 bg-[#172637]' : 'border-[#dceff9] bg-[#f7fcff]'}`}>
            <img src="/hello.jpg" alt="Urvisha Hello" className="w-full h-full object-cover" />
          </div>
          <div className="pt-1">
            <div className="flex items-baseline justify-center md:justify-start gap-3 mb-1">
              <h2 className={`text-[24px] sm:text-[28px] md:text-[36px] font-medium tracking-tight transition-colors duration-300 ${isDark ? 'text-[#a2e1e9]' : 'text-[#ff9800]'}`}>
                URVISHA PANCHAL
              </h2>
            </div>
            <p className={`text-[14px] md:text-[15px] mb-1 font-medium transition-colors duration-300 ${isDark ? 'text-white' : 'text-[#5a6a75]'}`}>
              Full Stack Developer based in Ahmedabad, Gujarat
            </p>
            <p className={`text-[13px] md:text-[14px] transition-colors duration-300 ${isDark ? 'text-gray-400' : 'text-[#8898a3]'}`}>
              Building scalable ERPs, CRMs, and modern web applications.
            </p>
          </div>
        </div>
      </div>

      <div className={`flex-1 overflow-y-auto px-5 md:px-8 pb-10 pt-6 relative custom-scroll transition-colors duration-300 ${isDark ? 'bg-[#111d28]/95' : 'bg-[#f7fbff]/95'}`}>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
          {/* Left Column */}
          <div className="space-y-8">
            {/* What I Do Section */}
            <div>
              <h3 className={`text-[13px] font-bold tracking-wider uppercase mb-4 ${isDark ? 'text-[#a2e1e9]' : 'text-[#3c748a]'}`}>
                What I Do
              </h3>
              <div className="space-y-3">
                {[
                  "Build scalable web applications",
                  "Develop responsive user interfaces",
                  "Integrate APIs and databases",
                  "Create admin panels and dashboards",
                  "Develop ERP, CRM, HRMS & POS systems"
                ].map((item, i) => (
                  <div key={i} className={`flex items-start gap-3 p-3 rounded-xl border ${isDark ? 'bg-[#172637] border-white/5' : 'bg-white border-[#eef2f6] shadow-sm'}`}>
                    <svg className={`w-5 h-5 mt-0.5 flex-shrink-0 ${isDark ? 'text-[#a2e1e9]' : 'text-[#ff9800]'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className={`text-[14.5px] leading-relaxed ${isDark ? 'text-gray-200' : 'text-[#4a5568]'}`}>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Education Section */}
            <div>
              <h3 className={`text-[13px] font-bold tracking-wider uppercase mb-4 ${isDark ? 'text-[#a2e1e9]' : 'text-[#3c748a]'}`}>
                Education
              </h3>
              <div className="space-y-4">
                <div className={`p-4 rounded-xl border ${isDark ? 'bg-[#172637] border-white/5' : 'bg-white border-[#eef2f6] shadow-sm'}`}>
                  <div className={`text-[12px] font-bold mb-1 ${isDark ? 'text-[#a2e1e9]' : 'text-[#ff9800]'}`}>PURSUING</div>
                  <div className={`text-[15px] font-semibold ${isDark ? 'text-white' : 'text-[#2d3748]'}`}>Master of Computer Applications (MCA)</div>
                </div>
                <div className={`p-4 rounded-xl border ${isDark ? 'bg-[#172637] border-white/5' : 'bg-white border-[#eef2f6] shadow-sm'}`}>
                  <div className={`text-[12px] font-bold mb-1 ${isDark ? 'text-[#a2e1e9]' : 'text-[#ff9800]'}`}>COMPLETED</div>
                  <div className={`text-[15px] font-semibold ${isDark ? 'text-white' : 'text-[#2d3748]'}`}>Bachelor of Computer Applications (BCA)</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-8">
            {/* Tech Stack */}
            <div>
              <h3 className={`text-[13px] font-bold tracking-wider uppercase mb-4 ${isDark ? 'text-[#a2e1e9]' : 'text-[#3c748a]'}`}>
                Tech Stack
              </h3>
              <div className="flex flex-wrap gap-4">
                {[
                  { name: "Next.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nextjs/nextjs-original.svg" },
                  { name: "React", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg" },
                  { name: "Node.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original-wordmark.svg" },
                  { name: "Express", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/express/express-original.svg" },
                  { name: "PostgreSQL", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postgresql/postgresql-original.svg" },
                  { name: "PHP", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/php/php-original.svg" },
                  { name: "JavaScript", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg" },
                  { name: "Tailwind", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg" },
                  { name: "Framer", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/framermotion/framermotion-original.svg" }
                ].map((tech, i) => (
                  <div key={i} className="group relative flex flex-col items-center gap-2 z-0 hover:z-50">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center p-2.5 border shadow-sm transition-transform group-hover:scale-110 ${
                      isDark ? 'bg-white/90 border-white/10' : 'bg-white border-[#eef2f6]'
                    }`}>
                      <img src={tech.icon} alt={tech.name} className="w-full h-full object-contain" />
                    </div>
                    {/* Tooltip / Label */}
                    <span className="absolute -top-10 left-1/2 -translate-x-1/2 px-2.5 py-1.5 bg-[#172637] text-white text-[11px] font-bold tracking-wide rounded-md opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap shadow-lg border border-white/10">
                      {tech.name}
                      {/* Tooltip Arrow */}
                      <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-[#172637] rotate-45 border-b border-r border-white/10"></span>
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Interests (Infinite Scroll) */}
            <div className="overflow-hidden relative">
              <h3 className={`text-[13px] font-bold tracking-wider uppercase mb-4 ${isDark ? 'text-[#a2e1e9]' : 'text-[#3c748a]'}`}>
                Other Interests
              </h3>
              
              <style dangerouslySetInnerHTML={{__html: `
                @keyframes marquee {
                  0% { transform: translateX(0%); }
                  100% { transform: translateX(-100%); }
                }
                .animate-marquee {
                  animation: marquee 25s linear infinite;
                  display: flex;
                  flex-shrink: 0;
                }
                .marquee-container:hover .animate-marquee {
                  animation-play-state: paused;
                }
                .marquee-mask {
                  mask-image: linear-gradient(to right, transparent, black 5%, black 95%, transparent);
                  -webkit-mask-image: linear-gradient(to right, transparent, black 5%, black 95%, transparent);
                }
              `}} />

              <div className="marquee-container flex overflow-hidden marquee-mask w-full">
                {[...Array(2)].map((_, i) => (
                  <div key={i} className="animate-marquee gap-4 pr-4" aria-hidden={i === 1}>
                    {[
                      { text: "Exploring new tech", img: "https://picsum.photos/seed/tech/150/150" },
                      { text: "Side projects", img: "https://picsum.photos/seed/code/150/150" },
                      { text: "Backend architecture", img: "https://picsum.photos/seed/server/150/150" },
                      { text: "UI/UX design", img: "https://picsum.photos/seed/design/150/150" },
                      { text: "Problem solving", img: "https://picsum.photos/seed/puzzle/150/150" },
                      { text: "Travelling", img: "https://picsum.photos/seed/travel/150/150" }
                    ].map((interest, j) => (
                      <div key={j} className="flex flex-col items-center gap-2 group cursor-pointer w-24">
                        <div className={`w-20 h-20 rounded-2xl overflow-hidden border shadow-sm transition-transform group-hover:scale-105 ${isDark ? 'border-white/10' : 'border-black/5'}`}>
                          <img src={interest.img} alt={interest.text} className="w-full h-full object-cover" />
                        </div>
                        <span className={`text-[11.5px] font-semibold text-center leading-tight transition-colors ${isDark ? 'text-gray-300 group-hover:text-white' : 'text-[#4a5568] group-hover:text-black'}`}>
                          {interest.text}
                        </span>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>

            {/* Languages */}
            <div>
              <h3 className={`text-[13px] font-bold tracking-wider uppercase mb-4 ${isDark ? 'text-[#a2e1e9]' : 'text-[#3c748a]'}`}>
                Languages
              </h3>
              <div className="flex flex-wrap gap-3">
                {languages.map((lang, i) => (
                  <div key={i} className={`flex items-center gap-2 px-4 py-2 rounded-xl border ${isDark ? 'bg-[#172637] border-white/5' : 'bg-white border-[#eef2f6] shadow-sm'}`}>
                    <span className="text-[16px]">💬</span>
                    <span className={`text-[14px] font-semibold ${isDark ? 'text-white' : 'text-[#2d3748]'}`}>{lang}</span>
                  </div>
                ))}
              </div>
            </div>
            
            {/* CTA */}
            <div className={`mt-6 p-5 rounded-xl border ${isDark ? 'bg-gradient-to-br from-[#172637] to-[#121d2b] border-[#a2e1e9]/20' : 'bg-gradient-to-br from-[#fff6ea] to-white border-[#ff9800]/20'}`}>
              <p className={`text-[14.5px] mb-3 leading-relaxed ${isDark ? 'text-gray-300' : 'text-[#4a5568]'}`}>
                Interested in working together? Let's build something amazing.
              </p>
              <a href="mailto:panchalurvisha147@gmail.com" className={`inline-flex items-center gap-2 font-bold transition-colors ${isDark ? 'text-[#a2e1e9] hover:text-white' : 'text-[#ff9800] hover:text-[#d37d00]'}`}>
                panchalurvisha147@gmail.com
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </a>
            </div>

          </div>
        </div>
      </div>
    </DesktopWindow>
  );
}
