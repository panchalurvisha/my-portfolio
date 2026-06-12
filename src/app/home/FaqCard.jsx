"use client";
import React from 'react';
import DesktopWindow from './DesktopWindow';
import { personalInfo } from '../config';

function AccordionItem({ title, content, isOpen, onClick, isDark }) {
  return (
    <div className={`mb-4 rounded-2xl overflow-hidden transition-all duration-300 border ${
      isDark 
        ? (isOpen ? 'bg-[#172637] border-[#d6a2e9]/30 shadow-lg' : 'bg-[#111d28]/60 border-white/5 hover:border-white/10') 
        : (isOpen ? 'bg-white border-[#d6a2e9]/50 shadow-md' : 'bg-white/60 border-transparent hover:bg-white hover:border-[#eef2f6]')
    }`}>
      <button 
        onClick={onClick}
        className="w-full flex items-center justify-between px-6 py-5 text-left"
      >
        <span className={`text-[16px] font-bold tracking-tight ${isDark ? (isOpen ? 'text-[#d6a2e9]' : 'text-white') : (isOpen ? 'text-[#9d4edd]' : 'text-[#111]')}`}>
          {title}
        </span>
        <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${
          isDark 
            ? (isOpen ? 'bg-[#d6a2e9]/20 text-[#d6a2e9]' : 'bg-white/5 text-gray-400') 
            : (isOpen ? 'bg-[#9d4edd]/10 text-[#9d4edd]' : 'bg-black/5 text-gray-500')
        }`}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className={`transform transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}>
            <polyline points="6 9 12 15 18 9"></polyline>
          </svg>
        </div>
      </button>
      <div 
        className={`transition-all duration-500 ease-in-out overflow-hidden ${isOpen ? 'max-h-60 opacity-100' : 'max-h-0 opacity-0'}`}
      >
        <div className={`px-6 pb-6 text-[15px] leading-relaxed ${isDark ? 'text-gray-300' : 'text-[#555]'}`}>
          {content}
        </div>
      </div>
    </div>
  );
}

export default function FaqCard({ isDark, onClose, openFaq, toggleFaq }) {
  return (
    <DesktopWindow title="frequently asked questions" isDark={isDark} onClose={onClose} width={860} height={600}>
      <div className={`flex-1 overflow-y-auto px-6 md:px-10 py-8 relative custom-scroll transition-colors duration-300 ${isDark ? 'bg-[#111d28]/95' : 'bg-[#f7fbff]/95'}`}>
        
        {/* Modern Banner */}
        <div className={`relative overflow-hidden w-full items-center rounded-3xl p-8 mb-10 transition-colors duration-300 shadow-lg ${isDark ? 'bg-gradient-to-br from-[#2a1c3d] to-[#121d2b] border border-[#d6a2e9]/20' : 'bg-gradient-to-br from-[#f8ebff] to-white border border-[#d6a2e9]/30'}`}>
          <div className="relative z-10 flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="text-center md:text-left">
              <h2 className={`text-[24px] md:text-[28px] font-extrabold mb-2 tracking-tight ${isDark ? 'text-[#d6a2e9]' : 'text-[#9d4edd]'}`}>
                Got Questions?
              </h2>
              <p className={`text-[15.5px] leading-relaxed max-w-lg ${isDark ? 'text-white' : 'text-[#5a6a75]'}`}>
                Here are a few quick answers about my development workflow, tech stack, and availability for freelance projects.
              </p>
            </div>
            <div className={`hidden h-[120px] w-[120px] overflow-hidden rounded-full md:block border-[4px] shadow-xl transition-transform hover:scale-105 duration-300 flex-shrink-0 ${isDark ? 'border-[#4a2a63]' : 'border-white'}`}>
              <img src="/faq.jpg" alt="Urvisha FAQ" className="w-full h-full object-cover" />
            </div>
          </div>
          {/* Decorative blurred circle */}
          <div className={`absolute -bottom-20 -left-20 w-64 h-64 rounded-full blur-3xl opacity-40 ${isDark ? 'bg-[#d6a2e9]/20' : 'bg-[#9d4edd]/20'}`}></div>
        </div>

        <div className="max-w-3xl mx-auto mb-10">
          <AccordionItem 
            title="What technologies do you specialize in?" 
            isOpen={openFaq === 0} 
            onClick={() => toggleFaq(0)} 
            isDark={isDark}
            content={<p>I specialize in the modern JavaScript ecosystem, primarily <strong>Next.js</strong> and <strong>React.js</strong> for the frontend, and <strong>Node.js</strong> for the backend. For databases, I rely heavily on <strong>PostgreSQL</strong>. I also use <strong>Tailwind CSS</strong> and <strong>Framer Motion</strong> to build beautiful, responsive interfaces.</p>}
          />
          <AccordionItem 
            title="Are you available for freelance work?" 
            isOpen={openFaq === 1} 
            onClick={() => toggleFaq(1)} 
            isDark={isDark}
            content={
              <p>Yes! I am currently accepting freelance projects and exploring full-time opportunities. If you have an exciting project in mind, feel free to reach out via my <a href={`mailto:${personalInfo.email}`} className={`underline font-bold transition-colors duration-300 ${isDark ? 'text-[#d6a2e9] hover:text-white' : 'text-[#9d4edd] hover:text-black'}`}>email</a> or LinkedIn.</p>
            }
          />
          <AccordionItem 
            title="What is your development process?" 
            isOpen={openFaq === 2} 
            onClick={() => toggleFaq(2)} 
            isDark={isDark}
            content={<p>I believe in strong communication. I typically start with a thorough requirement analysis to understand the core problem. Then, I move to architecture planning and wireframing, followed by agile development where I provide regular updates and incorporate feedback iteratively.</p>}
          />
          <AccordionItem 
            title="Do you handle UI/UX design as well?" 
            isOpen={openFaq === 3} 
            onClick={() => toggleFaq(3)} 
            isDark={isDark}
            content={<p>While my primary expertise is in Full Stack Development, I have a very strong eye for design. I regularly translate Figma prototypes into pixel-perfect code, and for many projects, I design the UI myself using modern design principles and aesthetics.</p>}
          />
        </div>
      </div>
    </DesktopWindow>
  );
}
