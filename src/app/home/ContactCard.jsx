"use client";
import React, { useState, useRef } from 'react';
import { motion, useMotionValue, useTransform, useSpring, animate } from 'framer-motion';
import DesktopWindow from './DesktopWindow';
import { useSound } from './useSound';

import { personalInfo } from '../config';
import { LinkedInIcon } from './Icons';

const THRESHOLD = 80;   // px drag needed to commit
const PILL_W    = 300;  // pill container width (px)
const THUMB_W   = 120;  // resting thumb width (px)
const MAX_DRAG  = PILL_W / 2 - 8; // hard drag limit each side

function SwipeEmailPill({ isDark, onCopy, copied }) {
  const [state, setState] = useState('idle'); // idle | dragging | committed-send | committed-copy

  const rawX  = useMotionValue(0);
  // Smooth spring that the visuals follow — makes drag feel silky
  const x     = useSpring(rawX, { stiffness: 500, damping: 40, mass: 0.6 });

  // ── Background colours ─────────────────────────────────────────────────
  // Send (blue) bleeds in from right as rawX goes positive
  const sendOpacity = useTransform(rawX, [0, THRESHOLD], [0, 1]);
  // Copy (green) bleeds in from left as rawX goes negative
  const copyOpacity = useTransform(rawX, [-THRESHOLD, 0], [1, 0]);

  // ── Thumb scale: pops up slightly while dragging ────────────────────────
  const thumbScale = useTransform(rawX,
    [-MAX_DRAG, -THRESHOLD, 0, THRESHOLD, MAX_DRAG],
    [1.06,       1.1,        1,  1.1,       1.06]
  );

  // ── Track labels: slide away from thumb as it moves ────────────────────
  const copyLabelX = useTransform(rawX, [-MAX_DRAG, 0], [8, 0]);
  const sendLabelX = useTransform(rawX, [0, MAX_DRAG],  [0, -8]);

  // Label opacity: only show the relevant label based on drag direction
  const copyLabelOpacity = useTransform(rawX, [-THRESHOLD, -20, 0], [1, 0.7, 0]);
  const sendLabelOpacity = useTransform(rawX, [0, 20, THRESHOLD], [0, 0.7, 1]);

  // ── Hint pulse arrows: fade out once user starts dragging ──────────────
  const hintOpacity = useTransform(rawX, [-16, 0, 16], [0, 1, 0]);

  // ── Thumb content: icon morphs based on direction ─────────────────────
  const thumbContentOpacity = useTransform(rawX, [-MAX_DRAG, -THRESHOLD / 2, 0, THRESHOLD / 2, MAX_DRAG], [0.6, 0.8, 1, 0.8, 0.6]);

  const handleDragStart = () => setState('dragging');

  const handleDragEnd = (_, info) => {
    const offset = info.offset.x;
    const vel    = info.velocity.x;

    const commitSend = offset >  THRESHOLD || (offset > 30 && vel >  400);
    const commitCopy = offset < -THRESHOLD || (offset < -30 && vel < -400);

    if (commitSend) {
      setState('committed-send');
      animate(rawX, PILL_W + 40, {
        duration: 0.32,
        ease: [0.4, 0, 0.2, 1],
        onComplete: () => {
          window.location.href = `mailto:${personalInfo.email}`;
          setTimeout(() => {
            animate(rawX, 0, { type: 'spring', stiffness: 300, damping: 28, onComplete: () => setState('idle') });
          }, 300);
        },
      });
    } else if (commitCopy) {
      setState('committed-copy');
      animate(rawX, -(PILL_W + 40), {
        duration: 0.32,
        ease: [0.4, 0, 0.2, 1],
        onComplete: () => {
          onCopy();
          setTimeout(() => {
            animate(rawX, 0, { type: 'spring', stiffness: 300, damping: 28, onComplete: () => setState('idle') });
          }, 300);
        },
      });
    } else {
      // Rubber-band snap back
      animate(rawX, 0, { type: 'spring', stiffness: 420, damping: 34 });
      setState('idle');
    }
  };

  const isDragging = state === 'dragging';

  return (
    <div className="sm:hidden flex flex-col items-center gap-2.5 w-full">

      {/* Hint row */}
      <motion.p
        style={{ opacity: hintOpacity }}
        className={`text-[11px] font-semibold tracking-wide flex items-center gap-3 select-none ${isDark ? 'text-white/45' : 'text-black/38'}`}
      >
        {/* Left arrow — pulses */}
        <motion.span
          className="flex items-center gap-1"
          animate={{ x: [0, -3, 0] }}
          transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut' }}
        >
          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 12H5M12 5l-7 7 7 7"/>
          </svg>
          copy
        </motion.span>

        <span className="opacity-50">·</span>
        <span>swipe</span>
        <span className="opacity-50">·</span>

        {/* Right arrow — pulses */}
        <motion.span
          className="flex items-center gap-1"
          animate={{ x: [0, 3, 0] }}
          transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut', delay: 0.7 }}
        >
          send
          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 12h14M12 5l7 7-7 7"/>
          </svg>
        </motion.span>
      </motion.p>

      {/* Pill track */}
      <div
        className="relative rounded-full overflow-hidden select-none"
        style={{ width: PILL_W, height: 56 }}
      >
        {/* Base background */}
        <div className={`absolute inset-0 rounded-full transition-colors duration-300 ${
          isDark ? 'bg-white/8 border border-white/12' : 'bg-[#0f0f0f]'
        }`} />

        {/* Send (blue) overlay */}
        <motion.div
          className="absolute inset-0 rounded-full"
          style={{
            background: 'linear-gradient(135deg, #1a7fd4 0%, #0A66C2 100%)',
            opacity: sendOpacity,
          }}
        />

        {/* Copy (green) overlay */}
        <motion.div
          className="absolute inset-0 rounded-full"
          style={{
            background: 'linear-gradient(135deg, #16a34a 0%, #22c55e 100%)',
            opacity: copyOpacity,
          }}
        />

        {/* Copy label — left side */}
        <motion.div
          className="absolute inset-y-0 left-4 flex items-center pointer-events-none"
          style={{ x: copyLabelX, opacity: copyLabelOpacity }}
        >
          <span className="text-white text-[12px] font-bold flex items-center gap-1.5">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <rect x="9" y="9" width="13" height="13" rx="2"/>
              <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>
            </svg>
            Copy
          </span>
        </motion.div>

        {/* Send label — right side */}
        <motion.div
          className="absolute inset-y-0 right-4 flex items-center pointer-events-none"
          style={{ x: sendLabelX, opacity: sendLabelOpacity }}
        >
          <span className="text-white text-[12px] font-bold flex items-center gap-1.5">
            Send
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
              <polyline points="22,6 12,13 2,6"/>
            </svg>
          </span>
        </motion.div>

        {/* Draggable thumb */}
        <motion.div
          drag="x"
          dragConstraints={{ left: -MAX_DRAG, right: MAX_DRAG }}
          dragElastic={0.05}
          dragMomentum={false}
          style={{ x }}
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
          onDrag={(_, info) => rawX.set(info.offset.x)}
          className="absolute inset-0 flex items-center justify-center touch-none cursor-grab active:cursor-grabbing"
        >
          <motion.div
            style={{
              scale: thumbScale,
              opacity: thumbContentOpacity,
              width: THUMB_W,
              height: 44,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 8,
              borderRadius: 9999,
              backgroundColor: 'white',
              color: '#111',
              fontWeight: 700,
              fontSize: 13,
              pointerEvents: 'none',
              boxShadow: '0 4px 14px rgba(0,0,0,0.18), 0 1px 3px rgba(0,0,0,0.10)',
            }}
          >
            {copied ? (
              <motion.span
                key="copied"
                initial={{ scale: 0.7, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="flex items-center gap-1.5 text-green-600 font-bold text-[13px]"
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12"/>
                </svg>
                Copied!
              </motion.span>
            ) : (
              <motion.span
                key="email"
                initial={{ scale: 1, opacity: 1 }}
                className="flex items-center gap-1.5 text-[13px] font-bold"
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                  <polyline points="22,6 12,13 2,6"/>
                </svg>
                Email
              </motion.span>
            )}
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}

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
      <div className={`flex-1 overflow-y-auto px-5 md:px-12 py-6 md:py-12 relative custom-scroll transition-colors duration-300 md:flex md:items-center md:justify-center ${
        isDark ? 'bg-[#111d28]/95' : 'bg-[#f7fbff]/95'
      }`}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="w-full max-w-[860px]"
        >
          <div className="grid md:grid-cols-[1.3fr_0.7fr] gap-6 md:gap-10 items-center">
            {/* Text Section */}
            <div className="text-center md:text-left">

              {/* Avatar — mobile only, shown above text */}
              <div className="flex justify-center mb-6 md:hidden">
                <motion.div
                  animate={{ y: [-8, 8, -8] }}
                  transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                  className={`relative w-28 h-28 rounded-full overflow-hidden border-[5px] shadow-xl ${
                    isDark ? 'border-[#1e3246]/80 shadow-[0_12px_32px_rgba(162,225,233,0.12)]' : 'border-white shadow-[0_12px_32px_rgba(255,152,0,0.18)]'
                  }`}
                >
                  <img src="/faq.jpg" alt="Urvisha" className="w-full h-full object-cover" />
                </motion.div>
              </div>

              <div className={`mb-5 inline-flex items-center gap-3 rounded-full border px-4 py-1.5 font-mono text-[12px] font-bold tracking-wider uppercase shadow-sm ${
                isDark ? 'border-[#a2e1e9]/20 bg-[#a2e1e9]/5 text-[#a2e1e9]' : 'border-[#ff9800]/20 bg-[#ff9800]/5 text-[#ff9800]'
              }`}>
                <span className="relative flex h-2 w-2">
                  <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${isDark ? 'bg-[#a2e1e9]' : 'bg-[#ff9800]'}`}></span>
                  <span className={`relative inline-flex rounded-full h-2 w-2 ${isDark ? 'bg-[#a2e1e9]' : 'bg-[#ff9800]'}`}></span>
                </span>
                Available for work
              </div>
              
              <h2 className={`text-[26px] font-extrabold leading-tight tracking-tight sm:text-[40px] md:text-[48px] mb-3 sm:mb-5 ${
                isDark ? 'text-white' : 'text-[#2d3748]'
              }`}>
                Let&apos;s build something <span className={`${isDark ? 'text-[#a2e1e9]' : 'text-[#ff9800]'}`}>amazing</span> together.
              </h2>
              
              <p className={`text-[14px] sm:text-[16px] leading-relaxed mb-6 max-w-lg ${
                isDark ? 'text-gray-400' : 'text-[#647582]'
              }`}>
                I'm currently open for new opportunities. Whether you have a question, a project idea, or just want to say hi, I'll try my best to get back to you!
              </p>

              <div className="flex flex-col sm:flex-row flex-wrap items-center justify-center md:justify-start gap-4">
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
                
                {/* Desktop: hover-expand email button */}
                <div className={`hidden sm:flex group relative items-center rounded-full transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] shadow-lg hover:shadow-xl hover:-translate-y-1 overflow-hidden h-[56px] ${
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

                {/* Mobile: swipeable email pill */}
                <SwipeEmailPill isDark={isDark} onCopy={handleCopy} copied={copied} />
              </div>
            </div>

            {/* Image Section — desktop only (mobile shown above text) */}
            <div className="hidden md:flex justify-center md:justify-end mt-8 md:mt-0">
              <motion.div
                animate={{ y: [-12, 12, -12] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                onMouseEnter={() => playSound('hover_face')}
                className={`relative w-56 h-56 sm:w-80 sm:h-80 rounded-full overflow-hidden border-[8px] shadow-2xl transition-transform hover:scale-105 duration-300 ${
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
