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
    const playPop = (freqStart, freqEnd, duration, vol = 0.12) => {
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freqStart, t);
      osc.frequency.exponentialRampToValueAtTime(freqEnd, t + duration);
      gain.gain.setValueAtTime(0, t);
      gain.gain.linearRampToValueAtTime(vol, t + (duration / 2));
      gain.gain.exponentialRampToValueAtTime(0.01, t + duration);
      osc.start(t);
      osc.stop(t + duration);
    };

    const playClick = (freqStart, freqEnd, duration, vol = 0.045) => {
      osc.type = 'square';
      osc.frequency.setValueAtTime(freqStart, t);
      osc.frequency.exponentialRampToValueAtTime(freqEnd, t + duration);
      gain.gain.setValueAtTime(vol, t);
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

    const playWindowOpen = () => {
      osc.type = 'sine';
      osc.frequency.setValueAtTime(360, t);
      osc.frequency.exponentialRampToValueAtTime(760, t + 0.11);
      gain.gain.setValueAtTime(0, t);
      gain.gain.linearRampToValueAtTime(0.08, t + 0.015);
      gain.gain.exponentialRampToValueAtTime(0.01, t + 0.11);
      osc.start(t);
      osc.stop(t + 0.11);
    };

    const playWindowClose = () => {
      osc.type = 'sine';
      osc.frequency.setValueAtTime(620, t);
      osc.frequency.exponentialRampToValueAtTime(180, t + 0.16);
      gain.gain.setValueAtTime(0, t);
      gain.gain.linearRampToValueAtTime(0.06, t + 0.015);
      gain.gain.exponentialRampToValueAtTime(0.01, t + 0.16);
      osc.start(t);
      osc.stop(t + 0.16);
    };

    switch (type) {
      // HOVER SOUNDS
      case 'hover_icon':
      case 'hover_tick':
        playBlip(920, 0.035, 0.018);
        break;
      case 'hover_footer':
        playBlip(640, 0.04, 0.018);
        break;

      case 'hover_star':
        playPop(520, 880, 0.12, 0.07);
        break;
      case 'hover_frog':
        playPop(150, 100, 0.1, 0.07);
        break;
      case 'hover_face':
        playPop(300, 600, 0.15, 0.08);
        break;

      // GENERIC DESKTOP
      case 'iconClick':
      case 'cta_click':
        playClick(800, 300, 0.05, 0.04);
        break;
      case 'theme_toggle':
        playPop(420, 780, 0.16, 0.075);
        break;
      case 'minimize':
      case 'dock':
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(600, t);
        osc.frequency.exponentialRampToValueAtTime(200, t + 0.15);
        gain.gain.setValueAtTime(0.06, t);
        gain.gain.exponentialRampToValueAtTime(0.01, t + 0.15);
        osc.start(t);
        osc.stop(t + 0.15);
        break;
      case 'restore':
        playPop(360, 640, 0.1, 0.075);
        break;
      case 'maximize':
        playPop(300, 520, 0.12, 0.065);
        break;

      // PROFESSIONAL UNIFORM CARD SOUNDS
      case 'open_window':
      case 'open_about':
      case 'open_links':
      case 'open_work':
      case 'open_faq':
      case 'open_contact':
      case 'open':
        playWindowOpen();
        break;

      case 'close_window':
      case 'close_about':
      case 'close_links':
      case 'close_work':
      case 'close_faq':
      case 'close_contact':
      case 'close':
        playWindowClose();
        break;

      default:
        // fallback
        playWindowOpen();
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
