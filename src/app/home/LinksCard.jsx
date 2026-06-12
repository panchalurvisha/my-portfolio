"use client";
import React from 'react';
import DesktopWindow from './DesktopWindow';
import { useSound } from './useSound';
import { personalInfo } from '../config';
import { GithubIcon, LinkedInIcon, EmailIcon } from './Icons';

function LinkItem({ icon, label, isDark, onHover, href }) {
  return (
    <a href={href} onMouseEnter={onHover} target="_blank" rel="noopener noreferrer" className="flex flex-col items-center gap-4 group hover:-translate-y-2 transition-transform">
      <div className={`w-[84px] h-[84px] rounded-2xl flex items-center justify-center border shadow-sm transition-all duration-300 ${
        isDark ? 'bg-[#172637] border-white/10 group-hover:border-[#a2e1e9]/40 group-hover:shadow-[0_0_20px_rgba(162,225,233,0.15)]' : 'bg-white border-[#eef2f6] group-hover:border-[#a8d3fc] group-hover:shadow-[0_8px_20px_rgba(168,211,252,0.3)]'
      }`}>
        {icon}
      </div>
      <span className={`font-mono text-[14px] font-bold tracking-wide transition-colors duration-300 ${isDark ? 'text-gray-300 group-hover:text-white' : 'text-[#4a5568] group-hover:text-[#2d3748]'}`}>
        {label}
      </span>
    </a>
  );
}

export default function LinksCard({ isDark, onClose }) {
  const { playSound } = useSound();
  
  return (
    <DesktopWindow title="links" isDark={isDark} onClose={onClose} width={640} height={380}>
      <div className={`flex-1 flex flex-col p-5 md:p-8 items-center justify-center overflow-y-auto custom-scroll transition-colors duration-300 ${isDark ? 'bg-[#111d28]/95' : 'bg-[#f7fbff]/95'}`}>
        
        <div className="flex flex-wrap gap-6 sm:gap-10 w-full justify-center mt-2 mb-4">
          <LinkItem 
            href={personalInfo.github} 
            onHover={() => playSound('hover_icon')} 
            isDark={isDark} 
            label="GitHub"
            icon={<GithubIcon width="46" height="46" fill={isDark ? '#ffffff' : '#181717'} />} 
          />
          <LinkItem 
            href={personalInfo.linkedin} 
            onHover={() => playSound('hover_icon')} 
            isDark={isDark} 
            label="LinkedIn"
            icon={<LinkedInIcon width="46" height="46" fill="#0A66C2" />} 
          />
          <LinkItem 
            href={`mailto:${personalInfo.email}`} 
            onHover={() => playSound('hover_icon')} 
            isDark={isDark} 
            label="Email"
            icon={<EmailIcon width="46" height="46" fill="#EA4335" />} 
          />
          <LinkItem 
            href={personalInfo.resume} 
            onHover={() => playSound('hover_icon')} 
            isDark={isDark} 
            label="CV / Resume"
            icon={
              <svg viewBox="0 0 24 24" width="46" height="46" fill={isDark ? '#a2e1e9' : '#ff9800'}>
                <path d="M12 16l4-5h-3V4h-2v7H8l4 5zm9-13h-6v2h6v14H3V5h6V3H3c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z"/>
              </svg>
            } 
          />
        </div>
      </div>
    </DesktopWindow>
  );
}
