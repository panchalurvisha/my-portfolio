"use client";
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSound } from './useSound';

export default function DesktopWindow({ title, isDark, onClose, children, width = 728, height = 440 }) {
  const [isMaximized, setIsMaximized] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [zIndex, setZIndex] = useState(50);
  const { playSound } = useSound();
  
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });
  const dragRef = useRef(null);
  
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const handleResize = () => {
        setWindowSize({ width: window.innerWidth, height: window.innerHeight });
      };
      
      handleResize();
      window.addEventListener('resize', handleResize);
      
      const w = window.innerWidth;
      const h = window.innerHeight;
      const isMobile = w < 768;
      const cardWidth = isMobile ? w - 32 : width;
      const cardHeight = isMobile ? h - 64 : height;
      
      setPosition({
        x: Math.max(0, (w - cardWidth) / 2),
        y: Math.max(0, (h - cardHeight) / 2)
      });
      
      return () => window.removeEventListener('resize', handleResize);
    }
  }, [width, height]);

  const handlePointerDown = (e) => {
    if (isMaximized) return;
    setIsDragging(true);
    setZIndex(100);
    dragRef.current = {
      startX: e.clientX,
      startY: e.clientY,
      startPosX: position.x,
      startPosY: position.y
    };
    document.addEventListener('pointermove', handlePointerMove);
    document.addEventListener('pointerup', handlePointerUp);
  };

  const handlePointerMove = (e) => {
    if (!dragRef.current) return;
    const { startX, startY, startPosX, startPosY } = dragRef.current;
    
    let newX = startPosX + (e.clientX - startX);
    let newY = startPosY + (e.clientY - startY);
    
    const w = window.innerWidth;
    const h = window.innerHeight;
    const isMobile = w < 768;
    const cardWidth = isMobile ? w - 32 : width;
    const cardHeight = isMobile ? h - 64 : height;

    newX = Math.max(0, Math.min(newX, w - cardWidth));
    newY = Math.max(0, Math.min(newY, h - cardHeight));
    
    setPosition({ x: newX, y: newY });
  };

  const handlePointerUp = () => {
    setIsDragging(false);
    dragRef.current = null;
    document.removeEventListener('pointermove', handlePointerMove);
    document.removeEventListener('pointerup', handlePointerUp);
  };

  const w = windowSize.width;
  const isMobile = w > 0 && w < 768;
  const normalWidth = w === 0 ? `${width}px` : (isMobile ? 'calc(100vw - 32px)' : `${width}px`);
  const normalHeight = w === 0 ? `${height}px` : (isMobile ? 'calc(100vh - 64px)' : `${height}px`);

  if (w === 0) return null;

  return (
    <>
      <AnimatePresence>
        {!isMinimized && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={
              isMaximized ? {
                left: 0, top: 0,
                width: '100vw', height: '100vh',
                opacity: 1, scale: 1, y: 0,
                borderRadius: '0px'
              } : {
                left: position.x, top: position.y,
                width: normalWidth, height: normalHeight,
                opacity: 1, scale: 1, y: 0,
                borderRadius: '12px'
              }
            }
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={
              isDragging 
                ? { duration: 0 } 
                : { type: "spring", stiffness: 300, damping: 30 }
            }
            onPointerDown={() => setZIndex(100)}
            style={{ zIndex }}
            className={`fixed shadow-[0_10px_35px_rgba(0,0,0,0.25)] flex flex-col transition-colors duration-300 overflow-hidden backdrop-blur-xl ${isDark ? 'bg-[#182635]/70 border border-white/20' : 'bg-white/70 border border-white/50'}`}
          >
            {/* Title Bar */}
            <div 
              onPointerDown={handlePointerDown}
              className={`h-[38px] w-full flex items-center justify-between px-4 transition-colors duration-300 flex-shrink-0 ${isMaximized ? 'cursor-default' : 'cursor-move'} ${isDark ? 'bg-[#1c1c1c]/40 border-b border-white/10' : 'bg-black/5 border-b border-black/5'}`}
              style={{ touchAction: "none" }}
            >
              {/* macOS Window Controls */}
              <div className="flex items-center gap-2 w-[60px] group">
                <button 
                  onClick={(e) => { 
                    e.stopPropagation(); 
                    const soundId = title === 'frequently asked questions' ? 'faq' : title;
                    playSound('close_' + soundId); 
                    onClose(); 
                  }}
                  className="w-3 h-3 rounded-full bg-[#ff5f56] flex items-center justify-center"
                  title="Close"
                >
                  <svg className="opacity-0 group-hover:opacity-100 transition-opacity w-[7px] h-[7px] text-[#4d0000]" viewBox="0 0 12 12" fill="currentColor">
                    <path d="M11.854 1.854a.5.5 0 00-.708-.708L6 6.293 1.854 1.146a.5.5 0 10-.708.708L5.293 7l-4.147 4.146a.5.5 0 00.708.708L6 7.707l4.146 4.147a.5.5 0 00.708-.708L6.707 7l4.147-4.146z" stroke="currentColor" strokeWidth="0.5"/>
                  </svg>
                </button>
                <button 
                  onClick={(e) => { e.stopPropagation(); playSound('minimize'); setIsMinimized(true); }}
                  className="w-3 h-3 rounded-full bg-[#ffbd2e] flex items-center justify-center"
                  title="Minimize"
                >
                  <svg className="opacity-0 group-hover:opacity-100 transition-opacity w-[7px] h-[7px] text-[#995b00]" viewBox="0 0 12 2" fill="currentColor">
                    <rect width="12" height="2" />
                  </svg>
                </button>
                <button 
                  onClick={(e) => { e.stopPropagation(); setIsMaximized(!isMaximized); }}
                  className="w-3 h-3 rounded-full bg-[#28c940] flex items-center justify-center"
                  title={isMaximized ? "Restore" : "Maximize"}
                >
                  {isMaximized ? (
                    <svg className="opacity-0 group-hover:opacity-100 transition-opacity w-[7px] h-[7px] text-[#006500]" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <rect x="3" y="1" width="8" height="8" />
                      <path d="M1 3v8h8" />
                    </svg>
                  ) : (
                    <svg className="opacity-0 group-hover:opacity-100 transition-opacity w-[7px] h-[7px] text-[#006500]" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <rect x="1" y="1" width="10" height="10" />
                    </svg>
                  )}
                </button>
              </div>

              {/* Title */}
              <span className={`text-[13px] font-semibold tracking-wide select-none ${isDark ? 'text-white/80' : 'text-black/60'}`}>{title}</span>
              
              {/* Right Spacer for centering */}
              <div className="w-[60px]"></div>
            </div>

            {/* Inner Content */}
            {children}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Taskbar / Minimized State */}
      <AnimatePresence>
        {isMinimized && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            onClick={() => {
              playSound('restore');
              setIsMinimized(false);
              setZIndex(100);
            }}
            className={`fixed bottom-4 left-4 z-[110] px-4 py-2 rounded-md shadow-[0_4px_15px_rgba(0,0,0,0.15)] cursor-pointer flex items-center gap-3 border transition-colors ${isDark ? 'bg-[#1c1c1c] border-gray-700 hover:bg-[#252525]' : 'bg-white border-gray-200 hover:bg-gray-50'}`}
          >
            <div className="flex items-center gap-2">
              <span className={`w-2.5 h-2.5 rounded-full ${isDark ? 'bg-[#a2e1e9]' : 'bg-[#ff9800]'}`}></span>
              <span className={`font-mono text-[14px] font-medium tracking-wide ${isDark ? 'text-white' : 'text-[#4a4a4a]'}`}>{title}</span>
            </div>
            
            <button 
              onClick={(e) => { 
                e.stopPropagation(); 
                const soundId = title === 'frequently asked questions' ? 'faq' : title;
                playSound('close_' + soundId); 
                onClose(); 
              }}
              className="ml-2 hover:opacity-70 transition-opacity"
              title="Close"
            >
              <svg width="10" height="10" viewBox="0 0 12 12" fill={isDark ? "white" : "black"}>
                <path d="M11.854 1.854a.5.5 0 00-.708-.708L6 6.293 1.854 1.146a.5.5 0 10-.708.708L5.293 7l-4.147 4.146a.5.5 0 00.708.708L6 7.707l4.146 4.147a.5.5 0 00.708-.708L6.707 7l4.147-4.146z" stroke="currentColor" strokeWidth="0.5"/>
              </svg>
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
