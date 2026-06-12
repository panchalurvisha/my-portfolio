"use client";
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Loader({ isDark }) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading time so the user can see the greeting animation
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          key="loader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, filter: 'blur(10px)' }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className={`fixed inset-0 z-[9999] flex flex-col items-center justify-center ${
            isDark ? 'bg-[#0f172a]' : 'bg-[#e0f2fe]'
          }`}
        >
          {/* Circular Container with White Border/Background */}
          <motion.div 
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", bounce: 0.5, duration: 1 }}
            className="relative w-48 h-48 sm:w-56 sm:h-56 rounded-full overflow-hidden border-[8px] border-white shadow-[0_20px_60px_rgba(0,0,0,0.15)] bg-white flex items-center justify-center"
          >
            {/* 
              Placeholder for the GIF. 
              Currently using the JPG uploaded by the chat UI. 
              Once you add the real GIF to the public folder, change this src to "/your-gif-name.gif"
            */}
            <img 
              src="/hello-character.jpg" 
              alt="Urvisha saying hello" 
              className="w-full h-full object-cover"
            />
          </motion.div>

          {/* Optional Loading Text */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mt-8 flex items-center gap-2"
          >
            <span className={`font-mono text-sm font-bold tracking-widest uppercase ${isDark ? 'text-white/70' : 'text-[#0f172a]/70'}`}>
              Loading
            </span>
            <span className="flex gap-1">
              <motion.span animate={{ opacity: [0, 1, 0] }} transition={{ repeat: Infinity, duration: 1.5, delay: 0 }} className={`w-1.5 h-1.5 rounded-full ${isDark ? 'bg-white/70' : 'bg-[#0f172a]/70'}`} />
              <motion.span animate={{ opacity: [0, 1, 0] }} transition={{ repeat: Infinity, duration: 1.5, delay: 0.2 }} className={`w-1.5 h-1.5 rounded-full ${isDark ? 'bg-white/70' : 'bg-[#0f172a]/70'}`} />
              <motion.span animate={{ opacity: [0, 1, 0] }} transition={{ repeat: Infinity, duration: 1.5, delay: 0.4 }} className={`w-1.5 h-1.5 rounded-full ${isDark ? 'bg-white/70' : 'bg-[#0f172a]/70'}`} />
            </span>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
