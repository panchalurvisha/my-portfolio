"use client";
import React from 'react';
import DesktopWindow from './DesktopWindow';
import { UrvishaAvatar } from './Icons';

function AccordionItem({ title, content, isOpen, onClick, isDark }) {
  return (
    <div className="mb-4">
      <button 
        onClick={onClick}
        className={`w-full flex items-center justify-between px-6 py-4 rounded-t-[6px] ${!isOpen ? 'rounded-b-[6px]' : ''} transition-colors duration-300 ${isDark ? 'bg-[#2a3022] text-gray-200' : 'bg-[#fffdf0] text-[#4d4d4d]'}`}
      >
        <span className="font-mono text-[14px] font-bold tracking-wide">{title}</span>
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className={`transform transition-transform ${isOpen ? 'rotate-180' : ''}`}>
          <polyline points="6 9 12 15 18 9"></polyline>
        </svg>
      </button>
      {isOpen && (
        <div className={`px-6 py-5 rounded-b-[6px] border-x border-b transition-colors duration-300 ${isDark ? 'border-gray-600 bg-[#16212e] text-white' : 'border-[#f5ebd0] bg-white text-[#737373]'}`}>
          {content}
        </div>
      )}
    </div>
  );
}

export default function FaqCard({ isDark, onClose, openFaq, toggleFaq }) {
  return (
    <DesktopWindow title="frequently asked questions" isDark={isDark} onClose={onClose} width={728} height={440}>
      <div className="flex-1 overflow-y-auto px-6 py-6 relative custom-scroll">
        <div className={`mb-5 grid grid-cols-[1fr_auto] items-center gap-4 rounded-[8px] border p-4 ${isDark ? 'border-white/10 bg-[#16212e] text-white' : 'border-[#e7f1f7] bg-[#f8fcff] text-[#4d4d4d]'}`}>
          <div>
            <p className="font-mono text-[14px] font-bold tracking-wide">quick answers</p>
            <p className={`mt-1 text-[14px] ${isDark ? 'text-white/68' : 'text-[#737373]'}`}>A few notes about my work, availability, and process.</p>
          </div>
          <div className="h-[84px] w-[96px] overflow-hidden rounded-[12px]">
            <UrvishaAvatar isDark={isDark} pose="thinking" />
          </div>
        </div>
        <AccordionItem 
          title="what software do you use?" 
          isOpen={openFaq === 0} 
          onClick={() => toggleFaq(0)} 
          isDark={isDark}
          content={<p>I mostly use Adobe Animate, Photoshop, and After Effects for my workflow.</p>}
        />
        <AccordionItem 
          title="are your commissions open?" 
          isOpen={openFaq === 1} 
          onClick={() => toggleFaq(1)} 
          isDark={isDark}
          content={
            <ul className="list-disc pl-5">
              <li>for commission work, please contact me via my <a href="#" className={`underline font-medium transition-colors duration-300 ${isDark ? 'text-[#a2e1e9]' : 'text-[#ff9800]'}`}>work email</a>.</li>
            </ul>
          }
        />
        <AccordionItem 
          title="what's your setup?" 
          isOpen={openFaq === 2} 
          onClick={() => toggleFaq(2)} 
          isDark={isDark}
          content={<p>I work on a dual-monitor setup with a Wacom Cintiq for illustration.</p>}
        />
        <AccordionItem 
          title="where do you get your sound effects?" 
          isOpen={openFaq === 3} 
          onClick={() => toggleFaq(3)} 
          isDark={isDark}
          content={<p>I typically source my sound effects from various royalty-free libraries and occasionally record my own.</p>}
        />
      </div>
    </DesktopWindow>
  );
}
