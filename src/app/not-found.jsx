"use client";
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function NotFound() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    // Check if the user has a dark mode preference, default to dark for 404 if unknown
    const matchMedia = window.matchMedia('(prefers-color-scheme: dark)');
    setIsDark(matchMedia.matches);
    
    const handler = (e) => setIsDark(e.matches);
    matchMedia.addEventListener('change', handler);
    return () => matchMedia.removeEventListener('change', handler);
  }, []);

  return (
    <div className={`min-h-screen flex items-center justify-center p-6 transition-colors duration-500 font-sans ${isDark ? 'bg-[#0b1120] text-white' : 'bg-[#f8fcff] text-[#111]'}`}>
      <div className="max-w-2xl w-full text-center relative z-10 flex flex-col items-center">
        
        {/* Animated 404 Text */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative"
        >
          <h1 className={`text-[120px] md:text-[180px] font-bold tracking-tighter leading-none ${isDark ? 'text-white/5' : 'text-black/5'}`}>
            404
          </h1>
          <div className="absolute inset-0 flex items-center justify-center">
            <h2 className={`text-4xl md:text-5xl font-bold tracking-tight ${isDark ? 'text-[#a2e1e9]' : 'text-[#0A66C2]'}`}>
              Page Not Found
            </h2>
          </div>
        </motion.div>

        {/* Message */}
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className={`mt-6 text-lg md:text-xl max-w-lg mx-auto ${isDark ? 'text-gray-400' : 'text-gray-600'}`}
        >
          Oops! It looks like you've wandered off the desktop. The page you are looking for doesn't exist or has been moved.
        </motion.p>

        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="mt-10"
        >
          <Link href="/">
            <div className={`group relative inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full font-bold text-[15px] overflow-hidden transition-all hover:scale-105 shadow-lg ${isDark ? 'bg-[#172637] text-white border border-white/10 hover:shadow-cyan-500/20' : 'bg-white text-gray-900 border border-gray-200 hover:shadow-blue-500/20'}`}>
              {/* Button Background Hover Effect */}
              <div className={`absolute inset-0 w-0 transition-all duration-300 ease-out group-hover:w-full ${isDark ? 'bg-[#a2e1e9]/10' : 'bg-[#0A66C2]/10'}`}></div>
              
              <svg className={`w-5 h-5 transition-transform group-hover:-translate-x-1 ${isDark ? 'text-[#a2e1e9]' : 'text-[#0A66C2]'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              <span className="relative z-10">Back to Desktop</span>
            </div>
          </Link>
        </motion.div>

      </div>
    </div>
  );
}
