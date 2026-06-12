"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { projectsData } from '../data/projects';
import { personalInfo, techStack } from '../config';
import { ProjectCard } from '../home/WorkCard';

// Simple Theme Switcher for the standalone page
function ThemeToggle({ isDark, onToggle }) {
  return (
    <button
      onClick={onToggle}
      className={`relative flex items-center justify-center w-12 h-12 rounded-full border shadow-sm transition-all duration-300 ${
        isDark 
          ? 'border-white/10 bg-[#172637] text-[#a2e1e9] hover:bg-[#1e3246]' 
          : 'border-black/5 bg-white text-[#ff9800] hover:bg-[#f7f9fc]'
      }`}
    >
      {isDark ? (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
        </svg>
      ) : (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="5"></circle>
          <line x1="12" y1="1" x2="12" y2="3"></line>
          <line x1="12" y1="21" x2="12" y2="23"></line>
          <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
          <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
          <line x1="1" y1="12" x2="3" y2="12"></line>
          <line x1="21" y1="12" x2="23" y2="12"></line>
          <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
          <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
        </svg>
      )}
    </button>
  );
}

export default function ProjectsPage() {
  const [isDark, setIsDark] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const getTechIcon = (name) => {
    const tech = techStack.find(t => t.name === name);
    return tech ? tech.icon : null;
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(personalInfo.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className={`min-h-screen font-sans transition-colors duration-500 ${isDark ? 'bg-[#0b1120] text-white' : 'bg-[#f8fcff] text-[#111]'}`}>
      
      {/* Navbar */}
      <nav className={`fixed top-0 left-0 right-0 z-50 px-6 py-4 border-b backdrop-blur-md flex items-center justify-between ${
        isDark ? 'border-white/10 bg-[#0f1720]/80' : 'border-black/5 bg-white/80'
      }`}>
        <Link 
          href="/" 
          className={`flex items-center gap-2 font-bold px-4 py-2 rounded-full transition-colors ${
            isDark ? 'hover:bg-white/10 text-[#a2e1e9]' : 'hover:bg-black/5 text-[#3c748a]'
          }`}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
          Back to Home
        </Link>

        <ThemeToggle isDark={isDark} onToggle={() => setIsDark(!isDark)} />
      </nav>

      {/* Main Content */}
      <main className="max-w-5xl mx-auto px-6 pt-32 pb-24">
        
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-16 text-center md:text-left"
        >
          <div className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full border text-[13px] font-bold tracking-wider uppercase mb-6 shadow-sm ${
            isDark ? 'border-[#a2e1e9]/20 bg-[#a2e1e9]/10 text-[#a2e1e9]' : 'border-[#3c748a]/20 bg-[#3c748a]/5 text-[#3c748a]'
          }`}>
            Portfolio
          </div>
          <h1 className={`text-4xl md:text-6xl font-extrabold tracking-tight mb-6 ${isDark ? 'text-white' : 'text-gray-900'}`}>
            My Projects
          </h1>
          <p className={`text-lg max-w-2xl leading-relaxed ${isDark ? 'text-gray-400' : 'text-[#647582]'}`}>
            A detailed look at some of the systems, platforms, and interfaces I've built. I focus on creating scalable, user-friendly solutions that solve real business problems.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projectsData.map((project, index) => (
            <motion.div 
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ delay: index * 0.1 }}
            >
              <ProjectCard 
                title={project.title}
                desc1={project.detailedDesc}
                tech={project.tech.join(', ')}
                isDark={isDark}
                bgLight={project.bgLight}
                bgDark={project.bgDark}
                link={project.live || project.github || "#"}
              />
            </motion.div>
          ))}
        </div>

        {/* Footer CTA */}
        <div className={`mt-24 p-8 md:p-12 text-center rounded-3xl border shadow-lg ${
          isDark ? 'bg-gradient-to-br from-[#172637] to-[#121d2b] border-[#a2e1e9]/20' : 'bg-gradient-to-br from-[#f0f7ff] to-white border-[#3c748a]/20'
        }`}>
          <h2 className={`text-3xl md:text-4xl font-extrabold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
            Want the next project to be yours?
          </h2>
          <p className={`text-lg mb-10 max-w-lg mx-auto ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
            I'm currently available for freelance projects and open to full-time opportunities. Let's build something amazing together.
          </p>
          
          <div className="flex justify-center mt-6">
            <div className={`group relative flex items-center rounded-full transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] shadow-lg hover:shadow-xl hover:-translate-y-1 overflow-hidden h-[56px] ${
              isDark ? 'bg-white text-black' : 'bg-[#111] text-white'
            }`}>
              {/* Default State */}
              <div className="flex items-center justify-center gap-2.5 font-bold transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:w-0 group-hover:opacity-0 overflow-hidden whitespace-nowrap w-[190px] opacity-100">
                <svg className="flex-shrink-0" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
                <span>connect with me </span>
              </div>

              {/* Expanded State */}
              <div className="flex items-center justify-center transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] w-0 opacity-0 group-hover:w-[310px] group-hover:opacity-100 overflow-hidden whitespace-nowrap">
                <div className="flex items-center px-2">
                  <a
                    href={`mailto:${personalInfo.email}`}
                    className={`font-bold px-5 py-2.5 rounded-full transition-colors flex-shrink-0 ${
                      isDark ? 'hover:bg-black/10' : 'hover:bg-white/20'
                    }`}
                  >
                    Send Message
                  </a>
                  
                  <div className={`w-[2px] h-5 mx-1 flex-shrink-0 ${isDark ? 'bg-black/10' : 'bg-white/20'}`} />
                  
                  <button
                    onClick={handleCopy}
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

      </main>
    </div>
  );
}
