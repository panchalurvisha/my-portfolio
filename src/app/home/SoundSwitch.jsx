import React from 'react';

const SpeakerOnIcon = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" fill="currentColor" stroke="none" />
    <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
    <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
  </svg>
);

const SpeakerOffIcon = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" fill="currentColor" stroke="none" />
    <line x1="23" y1="9" x2="17" y2="15" />
    <line x1="17" y1="9" x2="23" y2="15" />
  </svg>
);

const SoundSwitch = ({ isMuted, onToggle }) => {
  return (
    <>
      {/* Desktop toggle — dark pill with icon */}
      <button
        type="button"
        aria-label={isMuted ? 'Unmute sounds' : 'Mute sounds'}
        onClick={onToggle}
        title={isMuted ? 'Unmute sounds' : 'Mute sounds'}
        className={`hidden sm:grid place-items-center w-7 h-7 rounded-full transition-all duration-300 hover:scale-110 active:scale-95 shadow-[2px_2px_10px_rgba(0,0,0,0.13)] ${
          isMuted
            ? 'bg-[#272727] text-white/40'
            : 'bg-[#272727] text-white'
        }`}
      >
        {isMuted ? <SpeakerOffIcon size={13} /> : <SpeakerOnIcon size={13} />}
      </button>

      {/* Mobile — same visual, larger tap target */}
      <button
        type="button"
        aria-label={isMuted ? 'Unmute sounds' : 'Mute sounds'}
        onClick={onToggle}
        className={`sm:hidden w-9 h-9 rounded-full grid place-items-center transition-all duration-300 active:scale-90 shadow-md ${
          isMuted
            ? 'bg-[#272727] text-white/45'
            : 'bg-[#272727] text-white'
        }`}
      >
        {isMuted ? <SpeakerOffIcon size={16} /> : <SpeakerOnIcon size={16} />}
      </button>
    </>
  );
};

export default SoundSwitch;
