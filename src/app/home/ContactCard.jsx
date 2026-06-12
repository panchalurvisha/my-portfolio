"use client";
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import DesktopWindow from './DesktopWindow';
import { UrvishaAvatar } from './Icons';
import { useSound } from './useSound';

export default function ContactCard({ isDark, onClose }) {
  const { playSound } = useSound();
  const [ripples, setRipples] = useState([]);

  const addRipple = (event) => {
    playSound('cta_click');
    const rect = event.currentTarget.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const ripple = {
      id: Date.now(),
      x: event.clientX - rect.left - size / 2,
      y: event.clientY - rect.top - size / 2,
      size,
    };
    setRipples((items) => [...items, ripple]);
    window.setTimeout(() => {
      setRipples((items) => items.filter((item) => item.id !== ripple.id));
    }, 620);
  };

  return (
    <DesktopWindow title="contact" isDark={isDark} onClose={onClose} width={860} height={500}>
      <div className={`flex-1 overflow-y-auto p-5 transition-colors duration-300 custom-scroll ${
        isDark ? 'bg-[#111d28]' : 'bg-[#f7fbff]'
      }`}>
        <motion.section
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, ease: 'easeOut' }}
          className={`grid min-h-full items-center gap-8 rounded-[18px] border p-6 shadow-[0_18px_60px_rgba(35,70,95,0.12)] md:grid-cols-[1.05fr_0.95fr] md:p-9 ${
            isDark
              ? 'border-white/10 bg-[#172637]/80'
              : 'border-white/80 bg-white/82'
          }`}
        >
          <div className="text-center md:text-left">
            <div className={`mb-5 inline-flex rounded-full border px-4 py-2 font-mono text-[12px] font-bold tracking-wide ${
              isDark ? 'border-[#a2e1e9]/20 bg-[#a2e1e9]/8 text-[#a2e1e9]' : 'border-[#a8d3fc] bg-[#eef9ff] text-[#3c748a]'
            }`}>
              contact window
            </div>
            <h2 className={`text-[34px] font-semibold leading-tight tracking-normal sm:text-[42px] ${
              isDark ? 'text-[#dffbff]' : 'text-[#34404a]'
            }`}>
              Let&apos;s build something amazing together.
            </h2>
            <p className={`mt-5 text-[16px] leading-8 ${
              isDark ? 'text-white/78' : 'text-[#647582]'
            }`}>
              Whether it&apos;s a website, web app, redesign, freelance project, internship opportunity, or collaboration, feel free to reach out.
            </p>

            <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row md:items-start">
              <a
                href="mailto:panchalurvisha147@gmail.com"
                onClick={addRipple}
                onMouseEnter={() => playSound('hover_tick')}
                className={`relative inline-flex min-h-[48px] min-w-[156px] items-center justify-center overflow-hidden rounded-full px-6 py-3 text-[14px] font-bold tracking-wide shadow-[0_12px_30px_rgba(255,152,0,0.22)] transition-all hover:-translate-y-1 hover:scale-[1.03] ${
                  isDark
                    ? 'bg-[#a2e1e9] text-[#10202b] hover:shadow-[0_16px_40px_rgba(162,225,233,0.26)]'
                    : 'bg-[#ff9800] text-white hover:shadow-[0_16px_40px_rgba(255,152,0,0.28)]'
                }`}
              >
                {ripples.map((ripple) => (
                  <span
                    key={ripple.id}
                    className="cta-ripple"
                    style={{
                      left: ripple.x,
                      top: ripple.y,
                      width: ripple.size,
                      height: ripple.size,
                    }}
                  />
                ))}
                <span className="relative z-10">Send Message</span>
              </a>
              <a
                href="https://linkedin.com/in/urvisha-panchal-9423933b9"
                target="_blank"
                rel="noopener noreferrer"
                onMouseEnter={() => playSound('hover_tick')}
                className={`inline-flex min-h-[48px] items-center justify-center rounded-full border px-6 py-3 text-[14px] font-bold tracking-wide transition-all hover:-translate-y-1 ${
                  isDark ? 'border-white/16 text-white hover:border-[#a2e1e9]/50' : 'border-[#cfe4ef] text-[#34404a] hover:border-[#a8d3fc]'
                }`}
              >
                LinkedIn
              </a>
            </div>
          </div>

          <div
            onMouseEnter={() => playSound('hover_face')}
            className="relative mx-auto flex w-full max-w-[310px] items-center justify-center md:max-w-[350px]"
          >
            <div className={`absolute inset-x-8 bottom-5 h-24 rounded-full blur-2xl ${isDark ? 'bg-[#a2e1e9]/13' : 'bg-[#a8d3fc]/48'}`} />
            <UrvishaAvatar isDark={isDark} pose="waving" />
          </div>
        </motion.section>
      </div>
    </DesktopWindow>
  );
}
