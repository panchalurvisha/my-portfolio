"use client";
import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import DesktopWindow from './DesktopWindow';
import { personalInfo, techStack as configTechStack } from '../config';
import { useSound } from './useSound';
import { Code2, MapPin, Calendar, Play, Pause, Volume2, VolumeX } from 'lucide-react';

export default function AboutCard({ isDark, onClose }) {
  const { playSound } = useSound();
  const languages = ["English", "Hindi", "Gujarati"];
  
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isVideoMuted, setIsVideoMuted] = useState(false);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleVideoMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isVideoMuted;
      setIsVideoMuted(!isVideoMuted);
    }
  };

  const calculateAge = (dob) => {
    if (!dob) return '';
    const birthDate = new Date(dob);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  const currentAge = calculateAge(personalInfo.dob);

  return (
    <DesktopWindow title="about" isDark={isDark} onClose={onClose} width={1024} height={750}>
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
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-2.5 mt-3">
              <div className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[13px] font-bold shadow-sm transition-colors duration-300 ${isDark ? 'bg-[#172637] border border-white/10 text-white' : 'bg-white border border-[#eef2f6] text-[#2d3748]'}`}>
                <Code2 className={`w-4 h-4 ${isDark ? 'text-[#a2e1e9]' : 'text-[#ff9800]'}`} />
                {personalInfo.role}
              </div>
              <div className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[13px] font-bold shadow-sm transition-colors duration-300 ${isDark ? 'bg-[#172637] border border-white/10 text-white' : 'bg-white border border-[#eef2f6] text-[#2d3748]'}`}>
                <MapPin className={`w-4 h-4 ${isDark ? 'text-[#a2e1e9]' : 'text-[#ff9800]'}`} />
                {personalInfo.location}
              </div>
              {currentAge && (
                <div className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[13px] font-bold shadow-sm transition-colors duration-300 ${isDark ? 'bg-[#172637] border border-white/10 text-white' : 'bg-white border border-[#eef2f6] text-[#2d3748]'}`}>
                  <Calendar className={`w-4 h-4 ${isDark ? 'text-[#a2e1e9]' : 'text-[#ff9800]'}`} />
                  {currentAge} Years Old
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className={`flex-1 overflow-y-auto px-5 md:px-8 pb-10 pt-6 relative custom-scroll transition-colors duration-300 ${isDark ? 'bg-[#111d28]/95' : 'bg-[#f7fbff]/95'}`}>
        
        {/* Intro Video */}
        <div className={`mb-10 w-full rounded-2xl overflow-hidden shadow-sm border ${isDark ? 'border-white/10' : 'border-black/5'} bg-black relative group`}>
          <video 
            ref={videoRef}
            className="w-full h-auto max-h-[350px] object-cover cursor-pointer"
            poster="/hello.jpg"
            onClick={togglePlay}
            onEnded={() => setIsPlaying(false)}
          >
            <source src="/about_me.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          
          {/* Custom Controls Overlay */}
          <div 
            className={`absolute inset-0 flex items-center justify-center pointer-events-none transition-all duration-300 ${isPlaying ? 'bg-black/0 opacity-0 group-hover:opacity-100' : 'bg-black/30 opacity-100'}`}
          >
            <button 
              onClick={(e) => { e.stopPropagation(); togglePlay(); }}
              className="pointer-events-auto p-4 rounded-full bg-white/20 backdrop-blur-md text-white hover:bg-white/30 hover:scale-110 transition-all shadow-lg"
            >
              {isPlaying ? <Pause className="w-8 h-8" /> : <Play className="w-8 h-8 translate-x-0.5" />}
            </button>
          </div>

          <div className={`absolute bottom-4 right-4 transition-opacity duration-300 ${isPlaying ? 'opacity-0 group-hover:opacity-100' : 'opacity-100'}`}>
            <button 
              onClick={(e) => { e.stopPropagation(); toggleVideoMute(); }}
              className="p-2.5 rounded-full bg-black/40 backdrop-blur-md text-white hover:bg-black/60 hover:scale-110 transition-all shadow-lg"
            >
              {isVideoMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
            </button>
          </div>
        </div>

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
                {configTechStack.filter(t => t.name !== "Tailwind").map((tech, i) => (
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
                      { text: "Backend architecture", img: "https://picsum.photos/seed/server/150/150" },
                      { text: "UI/UX design", img: "https://picsum.photos/seed/design/150/150" },
                      { text: "Problem solving", img: "https://picsum.photos/seed/puzzle/150/150" }
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
              <a href={`mailto:${personalInfo.email}`} className={`inline-flex items-center gap-2 font-bold transition-colors ${isDark ? 'text-[#a2e1e9] hover:text-white' : 'text-[#ff9800] hover:text-[#d37d00]'}`}>
                {personalInfo.email}
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* Extended Bio / About Me */}
        <div className="mt-12 w-full">
           <h3 className={`text-[13px] font-bold tracking-wider uppercase mb-4 ${isDark ? 'text-[#a2e1e9]' : 'text-[#3c748a]'}`}>
             My Story & Background
           </h3>
           <div className={`p-6 md:p-8 rounded-2xl border leading-relaxed text-[15px] md:text-[16px] shadow-sm ${isDark ? 'bg-[#172637] border-white/5 text-gray-300' : 'bg-white border-[#eef2f6] text-[#4a5568]'}`}>
             <p className="mb-4">
               Hi! I'm Urvisha, a passionate Full Stack Developer with a deep love for creating seamless and scalable web applications. My journey in tech started with an innate curiosity about how the web works, which quickly blossomed into a dedicated career. I specialize in building robust ERP systems, comprehensive CRM dashboards, and dynamic UI experiences.
             </p>
             <p className="mb-4">
               I have a strong foundation in modern JavaScript frameworks, particularly Next.js and React.js on the frontend, and Node.js with Express on the backend. I take immense pride in writing clean, maintainable code and architecting systems that not only look fantastic but perform flawlessly under heavy loads.
             </p>
             <p>
               When I'm not in front of my code editor, you can find me exploring new UI/UX design trends, contributing to exciting side projects, and actively keeping up with the ever-evolving tech landscape. I am currently open to full-time opportunities where I can contribute my skills and build something amazing together!
             </p>
           </div>
        </div>

      </div>
    </DesktopWindow>
  );
}
