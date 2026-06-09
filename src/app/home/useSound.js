"use client";
import React, { createContext, useContext, useState, useEffect, useCallback, useRef } from 'react';

const SoundContext = createContext();

export function SoundProvider({ children }) {
  const [isMuted, setIsMuted] = useState(true);
  const audioCtxRef = useRef(null);

  useEffect(() => {
    const initAudio = () => {
      if (!audioCtxRef.current) {
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        if (AudioContext) {
          audioCtxRef.current = new AudioContext();
          setIsMuted(false);
        }
      }
    };

    document.addEventListener('click', initAudio, { once: true });
    document.addEventListener('keydown', initAudio, { once: true });

    return () => {
      document.removeEventListener('click', initAudio);
      document.removeEventListener('keydown', initAudio);
    };
  }, []);

  const toggleMute = () => {
    setIsMuted(!isMuted);
    if (audioCtxRef.current && audioCtxRef.current.state === 'suspended') {
      audioCtxRef.current.resume();
    }
  };

  const playSound = useCallback((type) => {
    if (isMuted || !audioCtxRef.current) return;

    if (audioCtxRef.current.state === 'suspended') {
      audioCtxRef.current.resume();
    }

    const t = audioCtxRef.current.currentTime;
    const osc = audioCtxRef.current.createOscillator();
    const gain = audioCtxRef.current.createGain();

    osc.connect(gain);
    gain.connect(audioCtxRef.current.destination);

    // Helpers
    const playPop = (freqStart, freqEnd, duration) => {
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freqStart, t);
      osc.frequency.exponentialRampToValueAtTime(freqEnd, t + duration);
      gain.gain.setValueAtTime(0, t);
      gain.gain.linearRampToValueAtTime(0.3, t + (duration / 2));
      gain.gain.exponentialRampToValueAtTime(0.01, t + duration);
      osc.start(t);
      osc.stop(t + duration);
    };

    const playClick = (freqStart, freqEnd, duration) => {
      osc.type = 'square';
      osc.frequency.setValueAtTime(freqStart, t);
      osc.frequency.exponentialRampToValueAtTime(freqEnd, t + duration);
      gain.gain.setValueAtTime(0.1, t);
      gain.gain.exponentialRampToValueAtTime(0.01, t + duration);
      osc.start(t);
      osc.stop(t + duration);
    };

    const playBlip = (freq, duration, vol = 0.05) => {
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, t);
      gain.gain.setValueAtTime(0, t);
      gain.gain.linearRampToValueAtTime(vol, t + duration / 2);
      gain.gain.linearRampToValueAtTime(0, t + duration);
      osc.start(t);
      osc.stop(t + duration);
    };

    const playProfessionalOpen = () => {
      // Literal professional mouse/UI click (extremely sharp and short)
      osc.type = 'square';
      osc.frequency.setValueAtTime(1000, t);
      osc.frequency.exponentialRampToValueAtTime(100, t + 0.02);
      gain.gain.setValueAtTime(0, t);
      gain.gain.linearRampToValueAtTime(0.1, t + 0.002);
      gain.gain.exponentialRampToValueAtTime(0.01, t + 0.02);
      osc.start(t);
      osc.stop(t + 0.02);
    };

    const playProfessionalClose = () => {
      // Slightly lower, softer "tick"
      osc.type = 'sine';
      osc.frequency.setValueAtTime(800, t);
      osc.frequency.exponentialRampToValueAtTime(100, t + 0.04);
      gain.gain.setValueAtTime(0, t);
      gain.gain.linearRampToValueAtTime(0.15, t + 0.005);
      gain.gain.exponentialRampToValueAtTime(0.01, t + 0.04);
      osc.start(t);
      osc.stop(t + 0.04);
    };

    switch (type) {
      // HOVER SOUNDS
      case 'hover_icon':
        playBlip(900, 0.05, 0.03);
        break;
      case 'hover_footer':
        playBlip(600, 0.05, 0.03);
        break;

      case 'hover_star':
        if (typeof window !== 'undefined') {
          const starAudio = new Audio('/universfield-new-notification-051-494246.mp3');
          starAudio.play().catch(e => console.warn("Audio play failed:", e));
        }
        break;
      case 'hover_frog':
        playPop(150, 100, 0.1);
        break;

      // GENERIC DESKTOP
      case 'iconClick':
        playClick(800, 300, 0.05);
        break;
      case 'theme_toggle':
        if (typeof window !== 'undefined') {
          const themeAudio = new Audio('/universfield-new-notification-062-494544.mp3');
          themeAudio.play().catch(e => console.warn("Audio play failed:", e));
        }
        break;
      case 'minimize':
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(600, t);
        osc.frequency.exponentialRampToValueAtTime(200, t + 0.15);
        gain.gain.setValueAtTime(0.15, t);
        gain.gain.exponentialRampToValueAtTime(0.01, t + 0.15);
        osc.start(t);
        osc.stop(t + 0.15);
        break;
      case 'restore':
        playPop(400, 600, 0.1);
        break;

      // PROFESSIONAL UNIFORM CARD SOUNDS
      case 'open_about':
      case 'open_links':
      case 'open_work':
      case 'open_faq':
      case 'open_contact':
      case 'open':
        playProfessionalOpen();
        break;

      case 'close_about':
      case 'close_links':
      case 'close_work':
      case 'close_faq':
      case 'close_contact':
      case 'close':
        playProfessionalClose();
        break;

      default:
        // fallback
        playProfessionalOpen();
        break;
    }
  }, [isMuted]);

  return (
    <SoundContext.Provider value={{ isMuted, toggleMute, playSound }}>
      {children}
    </SoundContext.Provider>
  );
}

export function useSound() {
  return useContext(SoundContext);
}
