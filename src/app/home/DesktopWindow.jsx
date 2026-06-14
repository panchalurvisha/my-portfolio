"use client";
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform, animate } from 'framer-motion';
import { useSound } from './useSound';
import { AboutIcon, LinksIcon, WorkIcon, FaqIcon, ContactIcon } from './Icons';

const getWindowIcon = (title, isDark) => {
  switch (title?.toLowerCase()) {
    case 'about':   return <AboutIcon isDark={isDark} />;
    case 'links':   return <LinksIcon isDark={isDark} />;
    case 'work':    return <WorkIcon isDark={isDark} />;
    case 'faq':     return <FaqIcon isDark={isDark} />;
    case 'contact': return <ContactIcon isDark={isDark} />;
    default: return <span className={`w-2.5 h-2.5 rounded-full ${isDark ? 'bg-[#a2e1e9]' : 'bg-[#ff9800]'}`} />;
  }
};

function getViewportSize() {
  if (typeof window === 'undefined') return { width: 0, height: 0 };
  return { width: window.innerWidth, height: window.innerHeight };
}

function getCenteredPosition(width, height) {
  if (typeof window === 'undefined') return { x: 0, y: 0 };
  const w = window.innerWidth;
  const h = window.innerHeight;
  return {
    x: Math.max(0, (w - width) / 2),
    y: Math.max(0, (h - height) / 2),
  };
}

// ─── Mobile bottom-sheet ────────────────────────────────────────────────────
function MobileSheet({ title, isDark, onClose, children }) {
  const { playSound } = useSound();
  const [isMinimized, setIsMinimized] = useState(false);
  const [isClosing,   setIsClosing]   = useState(false);

  // Sheet height = 88svh
  const SHEET_H   = typeof window !== 'undefined' ? window.innerHeight * 0.88 : 600;
  const DISMISS_T = 120; // px drag-down to dismiss

  const y = useMotionValue(0);
  // Backdrop fades as sheet is dragged down
  const backdropOpacity = useTransform(y, [0, DISMISS_T * 1.5], [1, 0]);

  const closeSheet = () => {
    setIsClosing(true);
    const soundId = title === 'frequently asked questions' ? 'faq' : title;
    playSound('close_' + soundId);
    animate(y, SHEET_H, { duration: 0.28, ease: [0.4, 0, 1, 1] });
    setTimeout(onClose, 280);
  };

  const handleDragEnd = (_, info) => {
    if (info.offset.y > DISMISS_T || info.velocity.y > 500) {
      closeSheet();
    } else {
      animate(y, 0, { type: 'spring', stiffness: 400, damping: 36 });
    }
  };

  return (
    <AnimatePresence>
      {!isClosing && (
        <>
          {/* Backdrop */}
          <motion.div
            key="sheet-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{ opacity: backdropOpacity }}
            onClick={closeSheet}
            className="fixed inset-0 z-[90] bg-black/40 backdrop-blur-[2px]"
          />

          {/* Sheet */}
          <motion.div
            key="sheet-panel"
            initial={{ y: SHEET_H }}
            animate={{ y: 0 }}
            exit={{ y: SHEET_H }}
            transition={{ type: 'spring', stiffness: 340, damping: 38, mass: 0.9 }}
            drag="y"
            dragConstraints={{ top: 0, bottom: SHEET_H }}
            dragElastic={{ top: 0.04, bottom: 0.2 }}
            dragMomentum={false}
            style={{ y, height: SHEET_H, zIndex: 100 }}
            onDragEnd={handleDragEnd}
            className={`fixed bottom-0 left-0 right-0 flex flex-col rounded-t-[22px] overflow-hidden shadow-[0_-8px_40px_rgba(0,0,0,0.28)] touch-none ${
              isDark
                ? 'bg-[#182635] border-t border-white/15'
                : 'bg-white border-t border-black/6'
            }`}
          >
            {/* Drag handle + title bar */}
            <div
              className={`flex-shrink-0 flex flex-col items-center pt-3 pb-0 ${
                isDark ? 'bg-[#182635]' : 'bg-white'
              }`}
            >
              {/* Pull handle */}
              <div className={`w-10 h-1 rounded-full mb-3 ${isDark ? 'bg-white/20' : 'bg-black/12'}`} />

              {/* Title row */}
              <div className={`w-full flex items-center justify-between px-5 pb-3 border-b ${
                isDark ? 'border-white/10' : 'border-black/5'
              }`}>
                <div className="flex items-center gap-2.5">
                  <span className="w-5 h-5 flex items-center justify-center">
                    {getWindowIcon(title, isDark)}
                  </span>
                  <span className={`font-mono text-[14px] font-bold tracking-wide capitalize ${
                    isDark ? 'text-white/85' : 'text-black/65'
                  }`}>
                    {title}
                  </span>
                </div>

                {/* Close button */}
                <button
                  onClick={closeSheet}
                  className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors active:scale-90 ${
                    isDark ? 'bg-white/8 text-white/70 hover:bg-white/15' : 'bg-black/6 text-black/50 hover:bg-black/10'
                  }`}
                  title="Close"
                >
                  <svg viewBox="0 0 12 12" className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
                    <path d="M3 3l6 6M9 3 3 9" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Scrollable content — allow normal touch scroll inside */}
            <div className="flex-1 overflow-y-auto overscroll-contain touch-auto">
              {children}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

// ─── Desktop floating window ─────────────────────────────────────────────────
function DesktopFloatingWindow({ title, isDark, onClose, children, width, height }) {
  const [isMaximized, setIsMaximized] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [isClosing,   setIsClosing]   = useState(false);
  const [zIndex,      setZIndex]      = useState(50);
  const { playSound } = useSound();

  const [position, setPosition] = useState(() => getCenteredPosition(width, height));
  const [isDragging, setIsDragging] = useState(false);
  const [windowSize, setWindowSize] = useState(getViewportSize);
  const dragRef = useRef(null);

  useEffect(() => {
    const handleResize = () => setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handlePointerDown = (e) => {
    if (isMaximized) return;
    setIsDragging(true);
    setZIndex(100);
    dragRef.current = { startX: e.clientX, startY: e.clientY, startPosX: position.x, startPosY: position.y };
    document.addEventListener('pointermove', handlePointerMove);
    document.addEventListener('pointerup', handlePointerUp);
  };

  const handlePointerMove = (e) => {
    if (!dragRef.current) return;
    const { startX, startY, startPosX, startPosY } = dragRef.current;
    const newX = Math.max(0, Math.min(startPosX + (e.clientX - startX), window.innerWidth - width));
    const newY = Math.max(0, Math.min(startPosY + (e.clientY - startY), window.innerHeight - height));
    setPosition({ x: newX, y: newY });
  };

  const handlePointerUp = () => {
    setIsDragging(false);
    dragRef.current = null;
    document.removeEventListener('pointermove', handlePointerMove);
    document.removeEventListener('pointerup', handlePointerUp);
  };

  const closeWindow = () => {
    setIsClosing(true);
    const soundId = title === 'frequently asked questions' ? 'faq' : title;
    playSound('close_' + soundId);
    window.setTimeout(onClose, 180);
  };

  const minimizeExit = {
    opacity: 0, scale: 0.2,
    x: -position.x + 54,
    y: windowSize.height - position.y - 72,
    filter: 'blur(5px)',
  };

  return (
    <>
      <AnimatePresence>
        {!isMinimized && !isClosing && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20, filter: 'blur(6px)' }}
            animate={
              isMaximized
                ? { left: 0, top: 0, width: '100vw', height: '100vh', opacity: 1, scale: 1, y: 0, filter: 'blur(0px)', borderRadius: '0px' }
                : { left: position.x, top: position.y, width: width, height: height, opacity: 1, scale: 1, y: 0, filter: 'blur(0px)', borderRadius: '12px' }
            }
            exit={isMinimized ? minimizeExit : { opacity: 0, scale: 0.86, y: 20, filter: 'blur(8px)' }}
            transition={isDragging ? { duration: 0 } : { type: 'spring', stiffness: 300, damping: 30 }}
            onPointerDown={() => setZIndex(100)}
            style={{ zIndex, position: 'fixed' }}
            className={`flex flex-col overflow-hidden shadow-[0_10px_35px_rgba(0,0,0,0.25)] backdrop-blur-xl transition-colors duration-300 ${
              isDark ? 'bg-[#182635]/70 border border-white/20' : 'bg-white/70 border border-white/50'
            }`}
          >
            {/* Title Bar */}
            <div
              onPointerDown={handlePointerDown}
              className={`h-[38px] w-full flex items-center justify-between px-4 flex-shrink-0 transition-colors duration-300 ${
                isMaximized ? 'cursor-default' : 'cursor-move'
              } ${isDark ? 'bg-[#1c1c1c]/40 border-b border-white/10' : 'bg-black/5 border-b border-black/5'}`}
              style={{ touchAction: 'none' }}
            >
              <div className="flex items-center gap-2 w-[72px] group">
                <button onClick={(e) => { e.stopPropagation(); closeWindow(); }}
                  className="w-[15px] h-[15px] rounded-full bg-[#ff5f56] text-[#5f100d] flex items-center justify-center shadow-[inset_0_-1px_0_rgba(0,0,0,0.18)] hover:scale-110 transition-transform" title="Close">
                  <svg className="w-[8px] h-[8px] opacity-75 group-hover:opacity-100" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"><path d="M3 3l6 6M9 3 3 9" /></svg>
                </button>
                <button onClick={(e) => { e.stopPropagation(); playSound('minimize'); setIsMinimized(true); }}
                  className="w-[15px] h-[15px] rounded-full bg-[#ffbd2e] text-[#6c4700] flex items-center justify-center shadow-[inset_0_-1px_0_rgba(0,0,0,0.18)] hover:scale-110 transition-transform" title="Minimize">
                  <svg className="w-[8px] h-[8px] opacity-75 group-hover:opacity-100" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round"><path d="M3 7h6" /></svg>
                </button>
                <button onClick={(e) => { e.stopPropagation(); playSound('maximize'); setIsMaximized(!isMaximized); }}
                  className="w-[15px] h-[15px] rounded-full bg-[#28c940] text-[#0d5522] flex items-center justify-center shadow-[inset_0_-1px_0_rgba(0,0,0,0.18)] hover:scale-110 transition-transform" title={isMaximized ? 'Restore' : 'Maximize'}>
                  {isMaximized
                    ? <svg className="w-[8px] h-[8px] opacity-75 group-hover:opacity-100" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M4 2h6v6M2 4h6v6H2z" /></svg>
                    : <svg className="w-[8px] h-[8px] opacity-75 group-hover:opacity-100" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M3 3h6v6H3z" /></svg>
                  }
                </button>
              </div>
              <span className={`text-[13px] font-semibold tracking-wide select-none ${isDark ? 'text-white/80' : 'text-black/60'}`}>{title}</span>
              <div className="w-[72px]" />
            </div>

            {children}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Minimized dock chip */}
      <AnimatePresence>
        {isMinimized && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            whileHover={{ scale: 1.05, y: -4 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => { playSound('restore'); setIsMinimized(false); setZIndex(100); }}
            className={`fixed bottom-8 left-6 z-[110] px-4 py-3 rounded-2xl shadow-xl cursor-pointer flex items-center gap-4 border transition-colors group backdrop-blur-xl ${
              isDark ? 'bg-[#172637]/95 border-white/10 hover:border-[#a2e1e9]/30 hover:bg-[#1a2d42]' : 'bg-white/95 border-[#eef2f6] hover:border-[#a8d3fc] hover:bg-[#f8fbff]'
            }`}
          >
            <div className="flex items-center gap-3">
              <div className="w-6 h-6 flex items-center justify-center transition-transform group-hover:scale-110">
                {getWindowIcon(title, isDark)}
              </div>
              <span className={`font-mono text-[14px] font-bold tracking-wide capitalize transition-colors ${
                isDark ? 'text-white group-hover:text-[#a2e1e9]' : 'text-[#4a5568] group-hover:text-[#2d3748]'
              }`}>{title}</span>
            </div>
            <button onClick={(e) => { e.stopPropagation(); closeWindow(); }}
              className={`ml-2 p-1.5 rounded-full opacity-50 hover:opacity-100 transition-all ${isDark ? 'hover:bg-white/10 text-white' : 'hover:bg-black/5 text-black'}`}
              title="Close">
              <svg width="10" height="10" viewBox="0 0 12 12" fill="currentColor">
                <path d="M11.854 1.854a.5.5 0 00-.708-.708L6 6.293 1.854 1.146a.5.5 0 10-.708.708L5.293 7l-4.147 4.146a.5.5 0 00.708.708L6 7.707l4.146 4.147a.5.5 0 00.708-.708L6.707 7l4.147-4.146z" stroke="currentColor" strokeWidth="0.5"/>
              </svg>
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

// ─── Main export — picks the right variant based on viewport ─────────────────
export default function DesktopWindow({ title, isDark, onClose, children, width = 728, height = 440 }) {
  const [windowSize, setWindowSize] = useState(getViewportSize);

  useEffect(() => {
    const handleResize = () => setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Wait for client-side hydration
  if (windowSize.width === 0) return null;

  const isMobile = windowSize.width < 640; // matches Tailwind `sm`

  if (isMobile) {
    return (
      <MobileSheet title={title} isDark={isDark} onClose={onClose}>
        {children}
      </MobileSheet>
    );
  }

  return (
    <DesktopFloatingWindow title={title} isDark={isDark} onClose={onClose} width={width} height={height}>
      {children}
    </DesktopFloatingWindow>
  );
}
