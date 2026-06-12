"use client";

import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  AboutIcon,
  LinksIcon,
  WorkIcon,
  FaqIcon,
  ContactIcon,
  UrvishaAvatar,
  BunnyPeek,
} from './Icons';
import dynamic from 'next/dynamic';
import { SoundProvider, useSound } from './useSound';
import ThemeSwitch from './ThemeSwitch';
import SoundSwitch from './SoundSwitch';
import ResumeModal from './ResumeModal';
import Loader from './Loader';
import { personalInfo } from '../config';
import { LinkedInIcon } from './Icons';

// Optimize initial load by dynamically importing the window cards
// These heavy UI components will only be loaded when they are needed
const AboutCard = dynamic(() => import('./AboutCard'));
const LinksCard = dynamic(() => import('./LinksCard'));
const WorkCard = dynamic(() => import('./WorkCard'));
const FaqCard = dynamic(() => import('./FaqCard'));
const ContactCard = dynamic(() => import('./ContactCard'));

const navItems = [
  { id: 'about', label: 'about', icon: AboutIcon },
  { id: 'links', label: 'links', icon: LinksIcon },
  { id: 'work', label: 'work', icon: WorkIcon },
  { id: 'faq', label: 'faq', icon: FaqIcon },
  { id: 'contact', label: 'contact', icon: ContactIcon },
];

export default function Hero() {
  return (
    <SoundProvider>
      <HeroContent />
    </SoundProvider>
  );
}

function HeroContent() {
  const [isDark, setIsDark] = useState(false);
  const [activeCard, setActiveCard] = useState(null);
  const [openFaq, setOpenFaq] = useState(1);
  const [windowState, setWindowState] = useState('open');
  const [showResume, setShowResume] = useState(false);
  const [gifLoaded, setGifLoaded] = useState(false);
  const { isMuted, toggleMute, playSound } = useSound();

  const themeClasses = isDark
    ? 'bg-[#121820] text-white selection:bg-[#2c6086]'
    : 'bg-[#f8fcff] text-[#33424d] selection:bg-[#a5d5f8]';

  const openCard = (id) => {
    playSound('iconClick');
    setTimeout(() => playSound(`open_${id}`), 80);
    setActiveCard(id);
  };

  const toggleTheme = () => {
    playSound('theme_toggle');
    setIsDark((value) => !value);
  };

  const closeHome = () => {
    playSound('close_window');
    setWindowState('closed');
  };

  const restoreHome = () => {
    playSound('restore');
    setWindowState('open');
  };

  return (
    <>
      <Loader isDark={isDark} />
      <div className={`min-h-[100svh] w-full relative overflow-hidden transition-colors duration-500 font-sans ${themeClasses} selection:text-white`}>
      <AnimatedBackground isDark={isDark} />

      <div className="absolute top-4 left-4 sm:top-6 sm:left-6 flex items-center gap-4 z-30">
        <div onMouseEnter={() => playSound('hover_tick')} className="flex items-center">
          <ThemeSwitch isDark={isDark} onToggle={toggleTheme} />
        </div>
        <div onMouseEnter={() => playSound('hover_tick')} className="flex items-center" title={isMuted ? 'Unmute sounds' : 'Mute sounds'}>
          <SoundSwitch isMuted={isMuted} onToggle={() => { playSound('iconClick'); toggleMute(); }} />
        </div>
      </div>

      <main className="relative z-10 flex min-h-[100svh] flex-col items-center justify-center px-4 pb-24 pt-16 sm:px-6 sm:pb-24 sm:pt-16 lg:pb-20 lg:pt-14">
        <div className="relative w-full max-w-[980px]">


          <AnimatePresence mode="wait">
            {windowState !== 'closed' && windowState !== 'minimized' && (
              <motion.section
                key="home-window"
                layout
                initial={{ opacity: 0, scale: 0.88, y: 42, filter: 'blur(8px)' }}
                animate={{
                  opacity: 1,
                  scale: windowState === 'maximized' ? 1.035 : 1,
                  y: 0,
                  filter: 'blur(0px)',
                }}
                exit={{ opacity: 0, scale: 0.78, y: 48, filter: 'blur(10px)' }}
                transition={{ type: 'spring', stiffness: 230, damping: 24, mass: 0.9 }}
                className={`relative z-10 flex h-[clamp(500px,calc(100svh-148px),620px)] w-full flex-col overflow-hidden rounded-[18px] border shadow-[0_28px_90px_rgba(31,66,95,0.24)] backdrop-blur-2xl transition-colors duration-500 ${
                  isDark ? 'border-white/15 bg-[#172637]/82' : 'border-white/70 bg-white/78'
                }`}
              >
                <TitleBar
                  isDark={isDark}
                  state={windowState}
                  onMinimize={() => {
                    playSound('dock');
                    setWindowState('minimized');
                  }}
                  onMaximize={() => {
                    playSound('maximize');
                    setWindowState((value) => value === 'maximized' ? 'open' : 'maximized');
                  }}
                  onClose={closeHome}
                />

                <div className="grid min-h-0 flex-1 items-center gap-6 px-5 py-6 sm:px-8 md:grid-cols-[1.04fr_0.96fr] md:px-10 md:py-7 lg:px-12">
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.08, duration: 0.45 }}
                    className="text-center md:text-left"
                  >
                    <div className={`mb-4 inline-flex items-center gap-2 rounded-full border px-3.5 py-1.5 text-[12px] font-semibold tracking-wide ${
                      isDark ? 'border-white/15 bg-white/5 text-[#a2e1e9]' : 'border-[#cfe9fb] bg-[#eef9ff] text-[#3c748a]'
                    }`}>
                      <span className="h-2 w-2 rounded-full bg-[#7ad68d] shadow-[0_0_14px_rgba(122,214,141,0.8)]" />
                      available for projects
                    </div>

                    <h1 className={`text-[40px] font-semibold leading-[1.02] tracking-normal sm:text-[52px] lg:text-[60px] ${
                      isDark ? 'text-[#dffbff]' : 'text-[#ff9800]'
                    }`}>
                      i&apos;m urvisha
                    </h1>
                    <p className={`mt-3 max-w-[540px] text-[15px] leading-7 sm:text-[17px] ${
                      isDark ? 'text-white/82' : 'text-[#5f707b]'
                    }`}>
                      Full stack developer crafting clean web apps, dashboards, ERP/CRM systems, and polished interfaces with a playful desktop spirit.
                    </p>

                    <div className="mt-7 grid grid-cols-3 gap-3 sm:grid-cols-5 sm:gap-4">
                      {navItems.map((item) => (
                        <IconItem
                          key={item.id}
                          item={item}
                          isDark={isDark}
                          onHover={() => playSound('hover_tick')}
                          onClick={() => openCard(item.id)}
                        />
                      ))}
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.14, duration: 0.45 }}
                    className="relative mx-auto flex w-56 h-56 sm:w-72 sm:h-72 items-center justify-center rounded-full overflow-hidden border-[6px] shadow-[0_18px_40px_rgba(35,70,95,0.15)] transition-transform hover:scale-[1.03] duration-300"
                    style={{ borderColor: isDark ? 'rgba(255,255,255,0.05)' : 'white' }}
                    onMouseEnter={() => playSound('hover_face')}
                  >
                    <img src="/hero.jpg" alt="Urvisha Hero" className="w-full h-full object-cover" />
                  </motion.div>
                </div>
              </motion.section>
            )}
          </AnimatePresence>
        </div>
      </main>

      <AnimatePresence>
        {windowState === 'minimized' && (
          <motion.button
            key="home-dock"
            initial={{ opacity: 0, x: -120, y: 40, scale: 0.72 }}
            animate={{ opacity: 1, x: 0, y: 0, scale: 1 }}
            exit={{ opacity: 0, x: -80, y: 24, scale: 0.8 }}
            transition={{ type: 'spring', stiffness: 260, damping: 20 }}
            onClick={restoreHome}
            onMouseEnter={() => playSound('hover_tick')}
            className={`fixed bottom-5 left-1/2 z-40 flex -translate-x-1/2 items-center gap-3 rounded-[16px] border px-4 py-3 text-left shadow-[0_12px_36px_rgba(28,56,76,0.22)] backdrop-blur-xl transition-transform hover:-translate-y-1 ${
              isDark ? 'border-white/15 bg-[#172637]/90 text-white' : 'border-white/80 bg-white/88 text-[#35424a]'
            }`}
          >
            <span className={`grid h-9 w-9 place-items-center rounded-[9px] ${isDark ? 'bg-[#223a4f]' : 'bg-[#eaf8ff]'}`}>
              <ContactIcon isDark={isDark} />
            </span>
            <span>
              <span className="block font-mono text-[13px] font-bold">home</span>
              <span className={`block text-[12px] ${isDark ? 'text-white/60' : 'text-[#6c7d88]'}`}>click to restore</span>
            </span>
          </motion.button>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {windowState === 'closed' && (
          <motion.button
            key="home-closed"
            initial={{ opacity: 0, scale: 0.9, y: 18 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 18 }}
            onClick={() => {
              playSound('open_window');
              setWindowState('open');
            }}
            className="fixed left-1/2 top-1/2 z-40 flex flex-col items-center gap-4 -translate-x-1/2 -translate-y-1/2 transition-transform hover:scale-105"
          >
            <div className="relative w-32 h-32 sm:w-40 sm:h-40 rounded-full overflow-hidden border-[6px] border-white shadow-[0_20px_60px_rgba(0,0,0,0.15)] bg-white flex items-center justify-center">
              {!gifLoaded && (
                <div className="absolute inset-0 flex items-center justify-center bg-[#f8fafc]">
                  <div className="w-8 h-8 border-[3px] border-gray-200 border-t-[#0A66C2] rounded-full animate-spin"></div>
                </div>
              )}
              <img 
                src="/hello-character.gif" 
                alt="Saying Hello" 
                className={`w-full h-full object-cover transition-opacity duration-500 ${gifLoaded ? 'opacity-100' : 'opacity-0'}`}
                onLoad={() => setGifLoaded(true)}
              />
            </div>
            <div className={`rounded-full border px-6 py-3 font-mono text-sm font-bold shadow-xl backdrop-blur-xl ${
              isDark ? 'border-white/15 bg-[#172637]/90 text-[#a2e1e9]' : 'border-white/80 bg-white/88 text-[#ff9800]'
            }`}>
              Open me! 👋
            </div>
          </motion.button>
        )}
      </AnimatePresence>

      {activeCard === 'about' && <AboutCard isDark={isDark} onClose={() => setActiveCard(null)} />}
      {activeCard === 'links' && <LinksCard isDark={isDark} onClose={() => setActiveCard(null)} />}
      {activeCard === 'work' && <WorkCard isDark={isDark} onClose={() => setActiveCard(null)} />}
      {activeCard === 'faq' && <FaqCard isDark={isDark} onClose={() => setActiveCard(null)} openFaq={openFaq} toggleFaq={(index) => setOpenFaq(openFaq === index ? null : index)} />}
      {activeCard === 'contact' && <ContactCard isDark={isDark} onClose={() => setActiveCard(null)} />}

      <footer className={`absolute bottom-8 left-1/2 z-20 flex -translate-x-1/2 items-center gap-4 rounded-full border p-2 shadow-2xl backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 ${
        isDark ? 'border-[#0A66C2]/20 bg-[#172637]/90' : 'border-[#0A66C2]/20 bg-white/90'
      }`}>
        <a
          href={personalInfo.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          onMouseEnter={() => playSound('hover_footer')}
          className="group flex items-center gap-2.5 rounded-full px-6 py-3 text-[14px] font-bold tracking-wide transition-all duration-300 shadow-sm hover:shadow-md bg-[#0A66C2] text-white hover:bg-[#004182] hover:shadow-[#0A66C2]/30"
        >
          <LinkedInIcon width="20" height="20" fill="currentColor" />
          Connect
        </a>
        <span className={`hidden px-4 font-mono text-[13px] font-bold tracking-wider sm:block ${isDark ? 'text-white/60' : 'text-[#718096]'}`}>
          © 2026 {personalInfo.name} | {personalInfo.location} 
        </span>
      </footer>

      <div
        className="absolute bottom-0 right-4 sm:right-8 z-20 w-16 sm:w-20 cursor-pointer hover:scale-105 transition-transform"
        onMouseEnter={() => playSound('hover_star')}
        onClick={() => { playSound('iconClick'); setShowResume(true); }}
      >
        <BunnyPeek isDark={isDark} />
      </div>

      {showResume && <ResumeModal isDark={isDark} onClose={() => setShowResume(false)} />}

      <style dangerouslySetInnerHTML={{
        __html: `
        .custom-scroll::-webkit-scrollbar { width: 8px; }
        .custom-scroll::-webkit-scrollbar-track { background: transparent; }
        .custom-scroll::-webkit-scrollbar-thumb {
          background: ${isDark ? '#4a6078' : '#d4d4d4'};
          border-radius: 4px;
        }
      `}} />
    </div>
    </>
  );
}

function TitleBar({ isDark, state, onMinimize, onMaximize, onClose }) {
  return (
    <div className={`flex h-12 shrink-0 items-center justify-between border-b px-4 sm:px-5 ${
      isDark ? 'border-white/10 bg-[#0f1720]/48' : 'border-black/5 bg-white/45'
    }`}>
      <div className="flex w-[96px] items-center gap-2.5">
        <WindowControl label="Close" tone="close" onClick={onClose} />
        <WindowControl label="Minimize" tone="minimize" onClick={onMinimize} />
        <WindowControl label={state === 'maximized' ? 'Restore' : 'Maximize'} tone="maximize" onClick={onMaximize} isRestore={state === 'maximized'} />
      </div>
      <div className={`select-none font-mono text-[13px] font-bold tracking-wide ${isDark ? 'text-white/76' : 'text-[#647581]'}`}>
        urvisha.desktop
      </div>
      <div className="w-[96px]" />
    </div>
  );
}

function WindowControl({ label, tone, onClick, isRestore = false }) {
  const color = {
    close: 'bg-[#ff6b63] text-[#65120f]',
    minimize: 'bg-[#ffc34d] text-[#6c4700]',
    maximize: 'bg-[#45d46f] text-[#0d5522]',
  }[tone];

  return (
    <button
      type="button"
      aria-label={label}
      title={label}
      onClick={onClick}
      className={`group grid h-[18px] w-[18px] place-items-center rounded-full ${color} shadow-[inset_0_-1px_0_rgba(0,0,0,0.16)] transition-transform hover:scale-110`}
    >
      {tone === 'close' && (
        <svg viewBox="0 0 12 12" className="h-[9px] w-[9px] opacity-75 transition-opacity group-hover:opacity-100" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
          <path d="M3 3l6 6M9 3 3 9" />
        </svg>
      )}
      {tone === 'minimize' && (
        <svg viewBox="0 0 12 12" className="h-[9px] w-[9px] opacity-75 transition-opacity group-hover:opacity-100" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round">
          <path d="M3 7h6" />
        </svg>
      )}
      {tone === 'maximize' && (
        <svg viewBox="0 0 12 12" className="h-[9px] w-[9px] opacity-75 transition-opacity group-hover:opacity-100" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          {isRestore ? <path d="M4 2h6v6M2 4h6v6H2z" /> : <path d="M3 3h6v6H3z" />}
        </svg>
      )}
    </button>
  );
}

function IconItem({ item, isDark, onClick, onHover }) {
  const Icon = item.icon;

  return (
    <button
      type="button"
      onClick={onClick}
      onMouseEnter={onHover}
      className={`desktop-icon group flex min-h-[88px] flex-col items-center justify-center gap-1.5 rounded-[16px] border px-2.5 py-2.5 transition-all duration-300 hover:-translate-y-1 hover:scale-[1.05] ${
        isDark
          ? 'border-white/10 bg-gradient-to-br from-white/[0.09] to-white/[0.025] hover:border-[#a2e1e9]/45 hover:shadow-[0_0_28px_rgba(162,225,233,0.14)]'
          : 'border-[#d9edf8] bg-gradient-to-br from-white to-[#eef9ff]/70 hover:border-[#a8d3fc] hover:shadow-[0_0_28px_rgba(168,211,252,0.45)]'
      }`}
    >
      <span className={`app-icon-frame grid h-[52px] w-[52px] place-items-center rounded-[14px] shadow-[inset_0_1px_0_rgba(255,255,255,0.65),0_8px_18px_rgba(35,70,95,0.12)] ${
        isDark ? 'bg-[#20364a]' : 'bg-white'
      } [&>svg]:h-[42px] [&>svg]:w-[42px]`}>
        <Icon isDark={isDark} />
      </span>
      <span className={`font-mono text-[13px] font-bold lowercase tracking-wide ${isDark ? 'text-white' : 'text-[#34404a]'}`}>
        {item.label}
      </span>
    </button>
  );
}

function AnimatedBackground({ isDark }) {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className={`absolute inset-0 transition-colors duration-500 ${
        isDark
          ? 'bg-[radial-gradient(circle_at_20%_10%,rgba(66,120,150,0.28),transparent_32%),radial-gradient(circle_at_82%_28%,rgba(162,225,233,0.13),transparent_28%)]'
          : 'bg-[radial-gradient(circle_at_18%_8%,rgba(255,232,164,0.55),transparent_28%),radial-gradient(circle_at_82%_28%,rgba(175,225,255,0.58),transparent_30%)]'
      }`} />
      <svg className="ambient-bg" viewBox="0 0 1440 900" preserveAspectRatio="none" aria-hidden="true">
        <path className="ambient-wave slow" d="M0 612c198-66 339-54 520 7 213 71 392 71 920-31v312H0Z" fill={isDark ? '#1f5877' : '#a8d3fc'} opacity=".82" />
        <path className="ambient-wave" d="M0 690c232-58 434-18 650 22 278 52 493 20 790-62v250H0Z" fill={isDark ? '#15384f' : '#c7e8ff'} opacity=".76" />
        <g className="ambient-clouds" fill={isDark ? '#eafcff' : '#ffffff'} opacity={isDark ? '.08' : '.58'}>
          <path d="M121 156c15-31 58-32 76-5 26-7 55 10 60 37H91c3-16 14-28 30-32Z" />
          <path d="M1121 173c15-31 58-32 76-5 26-7 55 10 60 37h-166c3-16 14-28 30-32Z" />
          <path d="M722 92c11-23 43-24 56-4 19-5 41 8 44 27H699c2-11 10-20 23-23Z" />
        </g>
        <g className="ambient-shapes" opacity={isDark ? '.22' : '.54'}>
          <circle cx="280" cy="286" r="16" fill="#ffbf5a" />
          <circle cx="1185" cy="360" r="12" fill="#7ad68d" />
          <rect x="1030" y="118" width="28" height="28" rx="8" fill="#ff8a7a" />
          <path d="M430 140 448 174h-36Z" fill="#a2e1e9" />
        </g>
      </svg>
    </div>
  );
}
