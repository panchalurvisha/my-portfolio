"use client";
import React from 'react';
import DesktopWindow from './DesktopWindow';
import { useSound } from './useSound';

export default function ContactCard({ isDark, onClose }) {
  const { playSound } = useSound();
  
  return (
    <DesktopWindow title="contact" isDark={isDark} onClose={onClose} width={540} height={440}>
      <div className={`flex-1 flex flex-col md:flex-row items-center px-6 md:px-10 py-6 md:py-8 relative overflow-y-auto custom-scroll transition-colors duration-300 ${isDark ? 'bg-[#2a3022]' : 'bg-[#fffdf0]'}`}>
        <div className="flex-1 flex flex-col justify-center text-center md:text-left pr-0 md:pr-6 mb-6 md:mb-0">
          <h2 className={`font-mono font-bold text-[28px] mb-4 tracking-wide transition-colors duration-300 ${isDark ? 'text-white' : 'text-[#4d4d4d]'}`}>
            CONTACT
          </h2>
          
          <p className={`text-[15px] leading-relaxed mb-6 transition-colors duration-300 ${isDark ? 'text-gray-300' : 'text-[#737373]'}`}>
            Thanks for stopping by! :)<br /><br />
            Whether you have a project idea, a job opportunity, or just want to say hello, I'd love to hear from you.
          </p>

          <div className={`flex flex-col items-center md:items-start gap-4 mb-6 text-[15px] transition-colors duration-300 ${isDark ? 'text-gray-300' : 'text-[#737373]'}`}>
            <a href="mailto:panchalurvisha147@gmail.com" className="flex items-center gap-3 hover:-translate-y-[2px] transition-all">
              <span className="text-xl">📧</span> <span className={`underline font-medium transition-colors duration-300 ${isDark ? 'text-[#a2e1e9]' : 'text-[#ff9800]'}`}>panchalurvisha147@gmail.com</span>
            </a>
            <a href="https://linkedin.com/in/urvisha-panchal-9423933b9" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 hover:-translate-y-[2px] transition-all">
              <span className="text-xl">💼</span> <span className={`underline font-medium transition-colors duration-300 ${isDark ? 'text-[#a2e1e9]' : 'text-[#ff9800]'}`}>LinkedIn: urvisha-panchal</span>
            </a>
          </div>
          
          <p className={`text-[15px] font-medium leading-relaxed transition-colors duration-300 ${isDark ? 'text-[#a2e1e9]' : 'text-[#ff9800]'}`}>
            Looking forward to connecting with you!
          </p>
        </div>

        <div onMouseEnter={() => playSound('hover_icon')} className="cursor-pointer w-[150px] h-[150px] md:w-[180px] md:h-[180px] shrink-0 self-center drop-shadow-sm">
          <img src="/contact/email_graphic.webp" alt="contact" className="w-full h-full object-contain hover:scale-105 transition-transform duration-300" />
        </div>
      </div>
    </DesktopWindow>
  );
}
