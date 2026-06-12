"use client";

import React, { useState } from 'react';
import {
  SunIcon,
  MoonIcon,
  SpeakerIcon,
  AboutIcon,
  LinksIcon,
  WorkIcon,
  FaqIcon,
  ContactIcon,
  TwitterIcon,
  YouTubeIcon,
  InstagramIcon,
} from './Icons';

import { SoundProvider, useSound } from './useSound';

import AboutCard from './AboutCard';
import LinksCard from './LinksCard';
import WorkCard from './WorkCard';
import FaqCard from './FaqCard';
import ContactCard from './ContactCard';
import ThemeSwitch from './ThemeSwitch';
import SoundSwitch from './SoundSwitch';

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
  const { isMuted, toggleMute, playSound } = useSound();
  const [openFaq, setOpenFaq] = useState(1);

  const toggleTheme = () => {
    playSound('theme_toggle');
    setIsDark(!isDark);
  };

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <div className={`min-h-screen w-full relative overflow-hidden transition-colors duration-300 font-sans flex flex-col ${isDark ? 'bg-[#1f1f1f] selection:bg-[#2c6086]' : 'bg-white selection:bg-[#a5d5f8]'} selection:text-white`}>
      {/* Top Left Icons */}
      <div className="absolute top-6 left-6 flex items-center gap-5 z-20">
        <div onMouseEnter={() => playSound('hover_icon')} className="flex items-center">
          <ThemeSwitch isDark={isDark} onToggle={toggleTheme} />
        </div>
        <div onMouseEnter={() => playSound('hover_icon')} className="flex items-center" title={isMuted ? "Unmute sounds" : "Mute sounds"}>
          <SoundSwitch isMuted={isMuted} onToggle={() => { playSound('iconClick'); toggleMute(); }} />
        </div>
      </div>

      {/* Bottom Wave Background */}
      <div className={`absolute bottom-0 left-0 w-full h-[40%] z-0 transition-colors duration-300 ${isDark ? 'bg-gradient-to-b from-[#215a7d] to-[#123145]' : 'bg-[#a8d3fc]'}`}>
        <svg
          className="absolute -top-[4vw] left-0 w-full h-[4vw] transition-colors duration-300 block"
          viewBox="0 0 1440 100"
          preserveAspectRatio="none"
        >
          <path
            fill={isDark ? "#215a7d" : "#a8d3fc"}
            d="M0,50 C320,80 420,20 720,50 C1020,80 1120,20 1440,50 L1440,100 L0,100 Z"
          />
          {isDark && (
            <path
              fill="none"
              stroke="#ffffff"
              strokeWidth="4"
              vectorEffect="non-scaling-stroke"
              d="M0,50 C320,80 420,20 720,50 C1020,80 1120,20 1440,50"
            />
          )}
        </svg>
      </div>

      {/* Frog Character */}
      <div
        className="absolute bottom-20 md:bottom-6 right-2 md:right-10 z-10 cursor-pointer hover:scale-105 transition-transform"
        onMouseEnter={() => playSound('hover_frog')}
      >
        <img src="/hero/f4d70058_transparent.gif" alt="character" className="w-[80px] h-[60px] md:w-[120px] md:h-[90px] object-contain" />
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col items-center justify-center relative z-10 px-4">

        <div className="relative w-full max-w-[760px] mb-4">

          {/* Main Home Window */}
          <div className="relative w-full">
            {/* Star Character */}
            <div
              className="absolute -top-[65px] md:-top-[85px] left-[10px] md:left-[16px] z-20 cursor-pointer group animate-[bounce_3s_infinite]"
              onMouseEnter={() => playSound('hover_star')}
            >
              {/* Sparkles */}
              <div className="absolute -top-4 -left-4 text-[#ffbd2e] text-lg opacity-0 group-hover:opacity-100 group-hover:animate-ping transition-opacity duration-300 pointer-events-none">✨</div>
              <div className="absolute top-8 -right-6 text-[#ffbd2e] text-sm opacity-0 group-hover:opacity-100 group-hover:animate-pulse transition-opacity duration-500 delay-100 pointer-events-none">✨</div>

              {/* Speech Bubble */}
              <div className="absolute top-1/2 -translate-y-1/2 left-full ml-2 md:ml-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-2 transition-all duration-300 bg-white text-black font-bold px-3 py-1 rounded-2xl shadow-lg whitespace-nowrap z-30 pointer-events-none scale-90 group-hover:scale-100 origin-left">
                Hiii 👋
                <div className="absolute top-1/2 -translate-y-1/2 -left-[6px] w-0 h-0 border-t-[5px] border-t-transparent border-r-[6px] border-r-white border-b-[5px] border-b-transparent"></div>
              </div>

              {/* Character Image */}
              <img
                src="/hero/download_bg_removed.png"
                alt="character"
                className="w-[75px] md:w-[95px] h-auto object-contain transition-transform duration-300 ease-out group-hover:scale-110 group-hover:-rotate-6"
              />
            </div>

            {/* Home Window Card */}
            <div className={`relative z-10 rounded-xl overflow-hidden shadow-[0_10px_35px_rgba(0,0,0,0.25)] flex flex-col w-full min-h-[360px] md:h-[440px] h-auto transition-colors duration-300 backdrop-blur-xl ${isDark ? 'bg-[#182635]/70 border border-white/20' : 'bg-white/70 border border-white/50'}`}>
              {/* Top Bar */}
              <div className={`h-[38px] w-full flex items-center justify-between px-4 transition-colors duration-300 ${isDark ? 'bg-[#1c1c1c]/40 border-b border-white/10' : 'bg-black/5 border-b border-black/5'}`}>
                {/* macOS Window Controls */}
                <div className="flex items-center gap-2 w-[60px]">
                  <div className="w-3 h-3 rounded-full bg-[#ff5f56]"></div>
                  <div className="w-3 h-3 rounded-full bg-[#ffbd2e]"></div>
                  <div className="w-3 h-3 rounded-full bg-[#28c940]"></div>
                </div>

                {/* Title */}
                <span className={`text-[13px] font-semibold tracking-wide select-none ${isDark ? 'text-white/80' : 'text-black/60'}`}>home</span>

                {/* Right Spacer for centering */}
                <div className="w-[60px]"></div>
              </div>

              {/* Window Body */}
              <div className="flex-1 flex flex-col items-center justify-center relative p-6">

                <h1 className="text-[40px] sm:text-[50px] md:text-[60px] leading-tight mb-2 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 text-center">
                  <div className="relative animate-friendly-hi cursor-pointer" onMouseEnter={() => playSound('hover_face')}>
                    <img 
                      src="/hero/ad6c746dae7edb887d8c60a0727dd4df_bg_removed.png" 
                      alt="Urvisha" 
                      className="w-[50px] h-[50px] sm:w-[60px] sm:h-[60px] md:w-[70px] md:h-[70px] object-contain rounded-2xl" 
                    />
                  </div>
                  <span className={`font-medium tracking-tight transition-colors duration-300 ${isDark ? 'text-[#a2e1e9]' : 'text-[#ff9800]'}`}>i'm urvisha</span>
                </h1>

                <p className={`text-[16px] sm:text-[18px] md:text-[20px] text-center mb-8 md:mb-12 transition-colors duration-300 ${isDark ? 'text-white' : 'text-[#737373]'}`}>
                  full stack developer
                </p>

                {/* Icons Row */}
                <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-8 md:gap-10 mt-2 max-w-[400px] md:max-w-none">
                  <IconItem icon={<AboutIcon isDark={isDark} />} label="about" isDark={isDark} onHover={() => playSound('hover_icon')} onClick={() => { playSound('iconClick'); setTimeout(() => playSound('open_about'), 100); setActiveCard('about'); }} />
                  <IconItem icon={<LinksIcon isDark={isDark} />} label="links" isDark={isDark} onHover={() => playSound('hover_icon')} onClick={() => { playSound('iconClick'); setTimeout(() => playSound('open_links'), 100); setActiveCard('links'); }} />
                  <IconItem icon={<WorkIcon isDark={isDark} />} label="work" isDark={isDark} onHover={() => playSound('hover_icon')} onClick={() => { playSound('iconClick'); setTimeout(() => playSound('open_work'), 100); setActiveCard('work'); }} />
                  <IconItem icon={<FaqIcon isDark={isDark} />} label="faq" isDark={isDark} onHover={() => playSound('hover_icon')} onClick={() => { playSound('iconClick'); setTimeout(() => playSound('open_faq'), 100); setActiveCard('faq'); }} />
                  <IconItem icon={<ContactIcon isDark={isDark} />} label="contact" isDark={isDark} onHover={() => playSound('hover_icon')} onClick={() => { playSound('iconClick'); setTimeout(() => playSound('open_contact'), 100); setActiveCard('contact'); }} />
                </div>
              </div>
            </div>
          </div>

          {/* Render Active Overlay Card */}
          {activeCard === 'about' && <AboutCard isDark={isDark} onClose={() => setActiveCard(null)} />}
          {activeCard === 'links' && <LinksCard isDark={isDark} onClose={() => setActiveCard(null)} />}
          {activeCard === 'work' && <WorkCard isDark={isDark} onClose={() => setActiveCard(null)} />}
          {activeCard === 'faq' && <FaqCard isDark={isDark} onClose={() => setActiveCard(null)} openFaq={openFaq} toggleFaq={toggleFaq} />}
          {activeCard === 'contact' && <ContactCard isDark={isDark} onClose={() => setActiveCard(null)} />}

        </div>

      </div>

      {/* Social Footer */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-20">
        <div className="flex items-center gap-3">
          <SocialButton icon={<TwitterIcon isDark={isDark} />} isDark={isDark} onHover={() => playSound('hover_footer')} />
          <SocialButton icon={<YouTubeIcon isDark={isDark} />} isDark={isDark} onHover={() => playSound('hover_footer')} />
          <SocialButton icon={<InstagramIcon isDark={isDark} />} isDark={isDark} onHover={() => playSound('hover_footer')} />
        </div>
        <span className={`text-xs mt-1 transition-colors duration-300 ${isDark ? 'text-white' : 'text-[#6b6b6b]'}`}>© 2025 Urvisha Panchal</span>
      </div>

      <style dangerouslySetInnerHTML={{
        __html: `
        .custom-scroll::-webkit-scrollbar {
          width: 8px;
        }
        .custom-scroll::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scroll::-webkit-scrollbar-thumb {
          background: ${isDark ? '#4a6078' : '#d4d4d4'};
          border-radius: 4px;
        }
      `}} />
    </div>
  );
}

function IconItem({ icon, label, isDark, onClick, onHover }) {
  return (
    <div className="flex flex-col items-center gap-2 cursor-pointer group" onClick={onClick} onMouseEnter={onHover}>
      <div className="transition-transform group-hover:-translate-y-1 [&>svg]:w-[55px] [&>svg]:h-[55px]">
        {icon}
      </div>
      <span className={`font-mono text-[14px] font-bold lowercase tracking-wider transition-colors duration-300 ${isDark ? 'text-white' : 'text-[#333]'}`}>
        {label}
      </span>
    </div>
  );
}

function SocialButton({ icon, isDark, onHover }) {
  return (
    <a href="#" onMouseEnter={onHover} className={`w-9 h-9 rounded-full flex items-center justify-center hover:opacity-80 transition-colors duration-300 ${isDark ? 'bg-white' : 'bg-[#4a4a4a]'} [&>svg]:w-[18px] [&>svg]:h-[18px]`}>
      {icon}
    </a>
  );
}
