"use client";
import React from 'react';

export default function ContactCard({ isDark, onClose }) {
  return (
    <div className={`absolute top-4 md:top-[32px] left-4 md:left-[110px] w-[calc(100%-32px)] md:w-[540px] h-[calc(100%-64px)] md:h-[440px] max-h-[800px] rounded-lg shadow-[0_10px_35px_rgba(0,0,0,0.25)] flex flex-col z-30 transition-colors duration-300 overflow-hidden ${isDark ? 'bg-[#2a3022] border border-white' : 'bg-[#fffdf0] border border-gray-300'}`}>
      
      <div className={`h-[38px] w-full flex items-center justify-between px-4 transition-colors duration-300 flex-shrink-0 ${isDark ? 'bg-[#1c1c1c]' : 'bg-[#4a4a4a]'}`}>
        <span className="text-white text-[15px] font-mono tracking-wide">contact</span>
        <button onClick={onClose} className="text-white font-mono text-[15px] hover:opacity-70 transition-opacity">[x]</button>
      </div>

      <div className="flex-1 flex flex-col md:flex-row items-center px-6 md:px-10 py-6 md:py-8 relative overflow-y-auto custom-scroll">
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

        <div className="w-[150px] h-[150px] md:w-[180px] md:h-[180px] shrink-0 self-center drop-shadow-sm">
          <img src="/contact/email_graphic.webp" alt="contact" className="w-full h-full object-contain hover:scale-105 transition-transform duration-300" />
        </div>
      </div>

    </div>
  );
}
