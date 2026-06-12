"use client";
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import DesktopWindow from './DesktopWindow';
import { useSound } from './useSound';

import { personalInfo } from '../config';
import { LinkedInIcon } from './Icons';

export default function ContactCard({ isDark, onClose }) {
  const { playSound } = useSound();
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    playSound('cta_click');
    navigator.clipboard.writeText(personalInfo.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <DesktopWindow title="contact" isDark={isDark} onClose={onClose} width={960} height={600}>
      <div className={`flex-1 overflow-y-auto px-6 md:px-12 py-12 relative custom-scroll transition-colors duration-300 flex items-center justify-center ${
        isDark ? 'bg-[#111d28]/95' : 'bg-[#f7fbff]/95'
      }`}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="w-full max-w-[860px]"
        >
          <div className="grid md:grid-cols-[1.3fr_0.7fr] gap-8 md:gap-10 items-center">
            {/* Text Section */}
            <div className="text-center md:text-left">
              <div className={`mb-6 inline-flex items-center gap-3 rounded-full border px-4 py-1.5 font-mono text-[12px] font-bold tracking-wider uppercase shadow-sm ${
                isDark ? 'border-[#a2e1e9]/20 bg-[#a2e1e9]/5 text-[#a2e1e9]' : 'border-[#ff9800]/20 bg-[#ff9800]/5 text-[#ff9800]'
              }`}>
                <span className="relative flex h-2 w-2">
                  <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${isDark ? 'bg-[#a2e1e9]' : 'bg-[#ff9800]'}`}></span>
                  <span className={`relative inline-flex rounded-full h-2 w-2 ${isDark ? 'bg-[#a2e1e9]' : 'bg-[#ff9800]'}`}></span>
                </span>
                Available for work
              </div>
              
              <h2 className={`text-[38px] font-extrabold leading-tight tracking-tight sm:text-[48px] mb-5 ${
                isDark ? 'text-white' : 'text-[#2d3748]'
              }`}>
                Let&apos;s build something <span className={`${isDark ? 'text-[#a2e1e9]' : 'text-[#ff9800]'}`}>amazing</span> together.
              </h2>
              
              <p className={`text-[16px] leading-relaxed mb-8 max-w-lg ${
                isDark ? 'text-gray-400' : 'text-[#647582]'
              }`}>
                I'm currently open for new opportunities. Whether you have a question, a project idea, or just want to say hi, I'll try my best to get back to you!
              </p>

              <div className="flex flex-col sm:flex-row flex-wrap lg:flex-nowrap items-center justify-center md:justify-start gap-4">
                <a
                  href={personalInfo.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  onMouseEnter={() => playSound('hover_tick')}
                  className={`flex items-center justify-center gap-2 font-bold px-8 py-4 rounded-full transition-all duration-300 transform hover:-translate-y-1 shadow-lg bg-[#0A66C2] text-white hover:bg-[#004182] hover:shadow-[#0A66C2]/30`}
                >
                  <LinkedInIcon width="20" height="20" fill="currentColor" />
                  Connect
                </a>
                
                <div className={`group relative flex items-center rounded-full transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] shadow-lg hover:shadow-xl hover:-translate-y-1 overflow-hidden h-[56px] ${
                  isDark ? 'bg-white text-black' : 'bg-[#111] text-white'
                }`}>
                  {/* Default State */}
                  <div className="flex items-center justify-center gap-2.5 font-bold transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:w-0 group-hover:opacity-0 overflow-hidden whitespace-nowrap w-[140px] opacity-100">
                    <svg className="flex-shrink-0" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
                    <span>Email</span>
                  </div>

                  {/* Expanded State */}
                  <div className="flex items-center justify-center transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] w-0 opacity-0 group-hover:w-[310px] group-hover:opacity-100 overflow-hidden whitespace-nowrap">
                    <div className="flex items-center px-2">
                      <a
                        href={`mailto:${personalInfo.email}`}
                        onMouseEnter={() => playSound('hover_tick')}
                        className={`font-bold px-5 py-2.5 rounded-full transition-colors flex-shrink-0 ${
                          isDark ? 'hover:bg-black/10' : 'hover:bg-white/20'
                        }`}
                      >
                        Send Message
                      </a>
                      
                      <div className={`w-[2px] h-5 mx-1 flex-shrink-0 ${isDark ? 'bg-black/10' : 'bg-white/20'}`} />
                      
                      <button
                        onClick={handleCopy}
                        onMouseEnter={() => playSound('hover_tick')}
                        className={`flex items-center justify-center gap-2 font-bold px-5 py-2.5 rounded-full transition-colors flex-shrink-0 ${
                          isDark ? 'hover:bg-black/10' : 'hover:bg-white/20'
                        }`}
                      >
                        {copied ? (
                          <>
                            <svg className="flex-shrink-0 text-green-500" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                            Copied!
                          </>
                        ) : (
                          <>
                            <svg className="flex-shrink-0" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
                            Copy
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Image Section */}
            <div className="flex justify-center md:justify-end mt-8 md:mt-0">
              <motion.div
                animate={{ y: [-12, 12, -12] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                onMouseEnter={() => playSound('hover_face')}
                className={`relative w-64 h-64 sm:w-80 sm:h-80 rounded-full overflow-hidden border-[8px] shadow-2xl transition-transform hover:scale-105 duration-300 ${
                  isDark ? 'border-[#1e3246]/80 shadow-[0_20px_60px_rgba(162,225,233,0.1)]' : 'border-white shadow-[0_20px_60px_rgba(255,152,0,0.15)]'
                }`}
              >
                <img src="/faq.jpg" alt="Urvisha Holding Cup" className="w-full h-full object-cover" />
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </DesktopWindow>
  );
}
