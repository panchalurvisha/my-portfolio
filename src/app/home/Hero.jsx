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

import AboutCard from './AboutCard';
import LinksCard from './LinksCard';
import WorkCard from './WorkCard';
import FaqCard from './FaqCard';
import ContactCard from './ContactCard';

export default function Hero() {
  const [isDark, setIsDark] = useState(false);
  const [activeCard, setActiveCard] = useState(null);
  const [openFaq, setOpenFaq] = useState(1);

  const toggleTheme = () => {
    setIsDark(!isDark);
  };

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <div className={`min-h-screen w-full relative overflow-hidden transition-colors duration-300 font-sans flex flex-col ${isDark ? 'bg-[#1f1f1f] selection:bg-[#2c6086]' : 'bg-white selection:bg-[#a5d5f8]'} selection:text-white`}>
      {/* Top Left Icons */}
      <div className="absolute top-6 left-6 flex items-center gap-5 z-20">
        <button onClick={toggleTheme} className="hover:opacity-70 transition-opacity [&>svg]:w-[24px] [&>svg]:h-[24px]">
          {isDark ? <MoonIcon isDark={isDark} /> : <SunIcon isDark={isDark} />}
        </button>
        <button className="hover:opacity-70 transition-opacity [&>svg]:w-[24px] [&>svg]:h-[24px]">
          <SpeakerIcon isDark={isDark} />
        </button>
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
      <div className="absolute bottom-20 md:bottom-6 right-2 md:right-10 z-10">
        <img src="/hero/froggert_stop.webp" alt="frog" className="w-[80px] h-[60px] md:w-[120px] md:h-[90px] object-contain" />
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col items-center justify-center relative z-10 px-4">

        <div className="relative w-full max-w-[760px] mb-4">

          {/* Main Home Window */}
          <div className="relative w-full">
            {/* Star Character */}
            <div className="absolute -top-[55px] md:-top-[75px] left-[10px] md:left-[16px] -rotate-[15deg] transition-colors duration-300 z-0">
              <img src="/hero/icon_star.webp" alt="star" className="w-[65px] h-[65px] md:w-[85px] md:h-[85px] object-contain" />
            </div>

            {/* Home Window Card */}
            <div className={`relative z-10 rounded-lg overflow-hidden shadow-[0_6px_25px_rgba(0,0,0,0.12)] flex flex-col w-full min-h-[360px] md:h-[440px] h-auto transition-colors duration-300 ${isDark ? 'bg-[#182635] border border-white' : 'bg-white border border-gray-300'}`}>
              {/* Top Bar */}
              <div className={`h-[38px] w-full flex items-center px-4 transition-colors duration-300 ${isDark ? 'bg-[#1c1c1c]' : 'bg-[#4a4a4a]'}`}>
                <span className="text-white text-[15px] font-medium tracking-wide">home</span>
              </div>

              {/* Window Body */}
              <div className="flex-1 flex flex-col items-center justify-center relative p-6">

                <h1 className="text-[40px] sm:text-[50px] md:text-[60px] leading-tight mb-2 flex flex-col sm:flex-row items-center justify-center gap-0 sm:gap-2 text-center">
                  <span className={`font-normal tracking-tight transition-colors duration-300 ${isDark ? 'text-white' : 'text-[#595959]'}`}>hi!</span>
                  <span className={`font-medium tracking-tight transition-colors duration-300 ${isDark ? 'text-[#a2e1e9]' : 'text-[#ff9800]'}`}>i'm urvisha</span>
                </h1>

                <p className={`text-[16px] sm:text-[18px] md:text-[20px] text-center mb-8 md:mb-12 transition-colors duration-300 ${isDark ? 'text-white' : 'text-[#737373]'}`}>
                  full stack developer
                </p>

                {/* Icons Row */}
                <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-8 md:gap-10 mt-2 max-w-[400px] md:max-w-none">
                  <IconItem icon={<AboutIcon isDark={isDark} />} label="about" isDark={isDark} onClick={() => setActiveCard('about')} />
                  <IconItem icon={<LinksIcon isDark={isDark} />} label="links" isDark={isDark} onClick={() => setActiveCard('links')} />
                  <IconItem icon={<WorkIcon isDark={isDark} />} label="work" isDark={isDark} onClick={() => setActiveCard('work')} />
                  <IconItem icon={<FaqIcon isDark={isDark} />} label="faq" isDark={isDark} onClick={() => setActiveCard('faq')} />
                  <IconItem icon={<ContactIcon isDark={isDark} />} label="contact" isDark={isDark} onClick={() => setActiveCard('contact')} />
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
          <SocialButton icon={<TwitterIcon isDark={isDark} />} isDark={isDark} />
          <SocialButton icon={<YouTubeIcon isDark={isDark} />} isDark={isDark} />
          <SocialButton icon={<InstagramIcon isDark={isDark} />} isDark={isDark} />
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

function IconItem({ icon, label, isDark, onClick }) {
  return (
    <div className="flex flex-col items-center gap-2 cursor-pointer group" onClick={onClick}>
      <div className="transition-transform group-hover:-translate-y-1 [&>svg]:w-[55px] [&>svg]:h-[55px]">
        {icon}
      </div>
      <span className={`font-mono text-[14px] font-bold lowercase tracking-wider transition-colors duration-300 ${isDark ? 'text-white' : 'text-[#333]'}`}>
        {label}
      </span>
    </div>
  );
}

function SocialButton({ icon, isDark }) {
  return (
    <a href="#" className={`w-9 h-9 rounded-full flex items-center justify-center hover:opacity-80 transition-colors duration-300 ${isDark ? 'bg-white' : 'bg-[#4a4a4a]'} [&>svg]:w-[18px] [&>svg]:h-[18px]`}>
      {icon}
    </a>
  );
}
