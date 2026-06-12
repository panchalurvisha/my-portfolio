"use client";
import React from 'react';
import DesktopWindow from './DesktopWindow';
import Link from 'next/link';
import { personalInfo, techStack } from '../config';
import { projectsData } from '../data/projects';
import { GithubIcon, LinkedInIcon } from './Icons';
import { useSound } from './useSound';

const techIcons = techStack.reduce((acc, curr) => {
  acc[curr.name] = curr.icon;
  return acc;
}, {});


export function ProjectCard({ title, desc1, tech, isDark, link = "#", onHover, bgLight, bgDark }) {
  return (
    <a href={link} onMouseEnter={onHover} className={`block rounded-3xl transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl overflow-hidden flex flex-col relative group border ${isDark ? `${bgDark} border-white/5` : `${bgLight} border-transparent`}`}>
      <div className="p-8 pb-2 flex-1 flex flex-col z-10">
        {/* Top arrow */}
        <div className={`absolute top-7 right-7 opacity-0 group-hover:opacity-100 transition-opacity ${isDark ? 'text-white/50' : 'text-black/30'}`}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M7 17l9.2-9.2M17 17V7H7"/></svg>
        </div>
        
        {/* Tags */}
        <div className="flex flex-wrap gap-2.5 mb-5 pr-8">
          {tech.split(',').slice(0, 3).map((t, i) => {
            const techName = t.trim();
            const iconUrl = techIcons[techName];
            return (
              <span key={i} className={`flex items-center gap-1.5 text-[10.5px] px-3 py-1.5 rounded-full font-bold tracking-wider uppercase ${isDark ? 'bg-white/10 text-white/80' : 'bg-black/5 text-black/70'}`}>
                {iconUrl && <img src={iconUrl} alt={techName} className="w-3.5 h-3.5 object-contain" />}
                {techName}
              </span>
            );
          })}
        </div>

        {/* Title & Desc */}
        <h4 className={`text-[21px] font-bold mb-3 tracking-tight ${isDark ? 'text-white' : 'text-[#111]'}`}>{title}</h4>
        <p className={`text-[15px] leading-relaxed line-clamp-3 mb-6 ${isDark ? 'text-gray-300' : 'text-[#444]'}`}>
          {desc1}
        </p>
      </div>

      {/* Image / SVG Mockup floating at the bottom */}
      <div className={`w-full h-[190px] relative flex items-start justify-center overflow-hidden px-6 pt-4 translate-y-4 group-hover:translate-y-2 transition-transform duration-500`}>
        <div className={`w-full h-full rounded-t-xl border-t border-x shadow-2xl relative overflow-hidden flex flex-col ${isDark ? 'bg-[#0f1822] border-white/10' : 'bg-white border-black/10'}`}>
          {/* Mockup Header */}
          <div className={`w-full h-8 flex items-center px-3 gap-1.5 border-b ${isDark ? 'bg-[#1a2736] border-white/5' : 'bg-[#f8fafc] border-black/5'}`}>
            <div className="w-2.5 h-2.5 rounded-full bg-red-400"></div>
            <div className="w-2.5 h-2.5 rounded-full bg-amber-400"></div>
            <div className="w-2.5 h-2.5 rounded-full bg-green-400"></div>
          </div>
          {/* Mockup Body */}
          <div className="flex-1 p-4 flex flex-col gap-3">
            <div className={`w-3/4 h-3 rounded-full ${isDark ? 'bg-white/10' : 'bg-black/5'}`}></div>
            <div className={`w-1/2 h-3 rounded-full ${isDark ? 'bg-white/10' : 'bg-black/5'}`}></div>
            <div className="flex gap-3 mt-2">
              <div className={`w-12 h-12 rounded-lg ${isDark ? 'bg-white/5' : 'bg-black/5'}`}></div>
              <div className="flex-1 flex flex-col gap-2 justify-center">
                <div className={`w-full h-2 rounded-full ${isDark ? 'bg-white/10' : 'bg-black/5'}`}></div>
                <div className={`w-4/5 h-2 rounded-full ${isDark ? 'bg-white/10' : 'bg-black/5'}`}></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </a>
  );
}

function SkillChip({ label, isDark }) {
  return (
    <div className={`px-4 py-2 rounded-xl text-[13.5px] font-medium border shadow-sm transition-transform hover:scale-105 cursor-default ${
      isDark ? 'border-white/10 bg-[#172637] text-gray-200 hover:border-[#a2e1e9]/50' : 'border-[#eef2f6] bg-white text-[#4a5568] hover:border-[#a8d3fc]'
    }`}>
      {label}
    </div>
  );
}

export default function WorkCard({ isDark, onClose }) {
  const { playSound } = useSound();
  
  return (
    <DesktopWindow title="work" isDark={isDark} onClose={onClose} width={1080} height={700}>
      <div className={`flex-1 overflow-y-auto px-5 md:px-8 py-6 relative custom-scroll transition-colors duration-300 ${isDark ? 'bg-[#111d28]/95' : 'bg-[#f7fbff]/95'}`}>
        
        {/* Modern Banner */}
        <div className={`relative overflow-hidden w-full items-center rounded-2xl p-6 md:p-8 mb-10 transition-colors duration-300 shadow-lg ${isDark ? 'bg-gradient-to-br from-[#1c3249] to-[#121d2b] border border-[#a2e1e9]/20' : 'bg-gradient-to-br from-[#fff6ea] to-white border border-[#ff9800]/20'}`}>
          <div className="relative z-10 flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="text-center md:text-left">
              <h2 className={`text-[22px] md:text-[26px] font-bold mb-2 tracking-tight ${isDark ? 'text-[#a2e1e9]' : 'text-[#ff9800]'}`}>
                Available for New Projects!
              </h2>
              <p className={`text-[15px] md:text-[16px] leading-relaxed max-w-xl ${isDark ? 'text-white' : 'text-[#5a6a75]'}`}>
                I specialize in building modern web applications, admin panels, comprehensive dashboards, and custom business management systems tailored to your needs.
              </p>
            </div>
            <div className={`hidden h-[100px] w-[100px] overflow-hidden rounded-full md:block border-[4px] shadow-xl transition-transform hover:scale-105 duration-300 flex-shrink-0 ${isDark ? 'border-[#2c4a63]' : 'border-white'}`}>
              <img src="/work.jpg" alt="Urvisha Work" className="w-full h-full object-cover" />
            </div>
          </div>
          {/* Decorative blurred circle */}
          <div className={`absolute -top-24 -right-24 w-64 h-64 rounded-full blur-3xl opacity-50 ${isDark ? 'bg-[#a2e1e9]/20' : 'bg-[#ff9800]/20'}`}></div>
        </div>

        {/* Companies Infinite Marquee */}
        <div className="mb-14 overflow-hidden relative">
          <h3 className={`text-[13px] font-bold tracking-wider uppercase mb-6 text-center ${isDark ? 'text-gray-400' : 'text-[#8898a3]'}`}>
            Companies & Businesses I've Worked With
          </h3>
          
          <style dangerouslySetInnerHTML={{__html: `
            @keyframes marquee-companies {
              0% { transform: translateX(0%); }
              100% { transform: translateX(-100%); }
            }
            .animate-marquee-companies {
              animation: marquee-companies 30s linear infinite;
              display: flex;
              flex-shrink: 0;
            }
            .marquee-companies-container:hover .animate-marquee-companies {
              animation-play-state: paused;
            }
            .marquee-companies-mask {
              mask-image: linear-gradient(to right, transparent, black 10%, black 90%, transparent);
              -webkit-mask-image: linear-gradient(to right, transparent, black 10%, black 90%, transparent);
            }
          `}} />

          <div className="marquee-companies-container flex overflow-hidden marquee-companies-mask w-full py-2">
            {[...Array(2)].map((_, i) => (
              <div key={i} className="animate-marquee-companies gap-12 pr-12 items-center" aria-hidden={i === 1}>
                {[
                  { name: "Singhai Ji Store", logo: "🏢" },
                  { name: "GVoice", logo: "📞" },
                  { name: "Catalyst", logo: "📈" },
                  { name: "NatureEnergy", logo: "🌱" },
                  { name: "Novotion", logo: "⚙️" },
                  { name: "TechCorp", logo: "💻" },
                  { name: "GlobalRetail", logo: "🛍️" },
                ].map((company, j) => (
                  <div key={j} className="flex items-center gap-3 group cursor-pointer whitespace-nowrap">
                    <span className="text-3xl grayscale group-hover:grayscale-0 transition-all duration-300 transform group-hover:scale-110">{company.logo}</span>
                    <span className={`text-[18px] font-bold tracking-tight transition-colors duration-300 ${isDark ? 'text-gray-500 group-hover:text-white' : 'text-gray-400 group-hover:text-black'}`}>
                      {company.name}
                    </span>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* Skills Columns */}
        <div className="flex flex-col md:flex-row gap-10 mb-14">
          <div className="flex-[1]">
            <h3 className={`text-[13px] font-bold tracking-wider uppercase mb-5 ${isDark ? 'text-[#a2e1e9]' : 'text-[#3c748a]'}`}>Technologies I Use</h3>
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
          <div className="flex-[1]">
            <h3 className={`text-[13px] font-bold tracking-wider uppercase mb-5 ${isDark ? 'text-[#a2e1e9]' : 'text-[#3c748a]'}`}>Solutions I Build</h3>
            <div className="flex flex-wrap gap-3">
              <SkillChip label="ERP Systems" isDark={isDark} />
              <SkillChip label="CRM Platforms" isDark={isDark} />
              <SkillChip label="HRMS Applications" isDark={isDark} />
              <SkillChip label="POS Software" isDark={isDark} />
              <SkillChip label="Business Websites" isDark={isDark} />
              <SkillChip label="Admin Dashboards" isDark={isDark} />
              <SkillChip label="Inventory & Billing" isDark={isDark} />
            </div>
          </div>
        </div>

        {/* FEATURED PROJECTS SECTION */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-8">
            <h2 className={`text-[24px] md:text-[28px] font-extrabold tracking-tight flex items-center gap-3 ${isDark ? 'text-white' : 'text-[#111]'}`}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"/></svg>
              Recent work
            </h2>
            <Link href="/projects" className={`text-[14px] font-bold flex items-center gap-1 hover:underline ${isDark ? 'text-gray-300' : 'text-[#444]'}`}>
              View all 
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M7 17l9.2-9.2M17 17V7H7"/></svg>
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
            {projectsData.slice(0, 4).map((project) => (
              <ProjectCard 
                key={project.id}
                onHover={() => playSound('hover_icon')}
                title={project.title}
                desc1={project.shortDesc}
                tech={project.tech.join(', ')}
                isDark={isDark}
                bgLight={project.bgLight}
                bgDark={project.bgDark}
              />
            ))}
          </div>

          <div className={`mt-8 p-6 rounded-2xl border text-center transition-colors duration-300 ${isDark ? 'bg-[#172637] border-white/10' : 'bg-white border-[#eef2f6]'}`}>
            <h4 className={`text-[16px] font-bold mb-3 ${isDark ? 'text-white' : 'text-[#4a5568]'}`}>Want to see more of my code?</h4>
            <p className={`text-[14.5px] mb-4 ${isDark ? 'text-gray-400' : 'text-[#718096]'}`}>
              More projects are in development, including this very portfolio! Check out my GitHub for open-source contributions.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4 mt-6">
              <a href={personalInfo.github} target="_blank" rel="noopener noreferrer" className={`flex items-center justify-center gap-2.5 font-bold px-6 py-3 rounded-xl transition-all duration-300 transform hover:-translate-y-1 shadow-sm hover:shadow-md ${isDark ? 'bg-white text-black hover:bg-gray-200' : 'bg-[#181717] text-white hover:bg-[#333]'}`}>
                <GithubIcon width="20" height="20" fill="currentColor" />
                View GitHub
              </a>
              <a href={personalInfo.linkedin} target="_blank" rel="noopener noreferrer" className={`flex items-center justify-center gap-2.5 font-bold px-6 py-3 rounded-xl transition-all duration-300 transform hover:-translate-y-1 shadow-sm hover:shadow-md ${isDark ? 'bg-[#0A66C2] text-white hover:bg-[#004182]' : 'bg-[#0A66C2] text-white hover:bg-[#004182]'}`}>
                <LinkedInIcon width="20" height="20" fill="currentColor" />
                View LinkedIn
              </a>
            </div>
          </div>
        </div>

      </div>
    </DesktopWindow>
  );
}
