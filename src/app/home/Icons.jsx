import React from 'react';

const palette = (isDark) => ({
  ink: isDark ? '#f7fbff' : '#34404a',
  softInk: isDark ? '#bfeaf1' : '#5d7281',
  paper: isDark ? '#17293a' : '#fffdf7',
  accent: isDark ? '#a2e1e9' : '#ff9800',
  blush: '#ff8a7a',
  leaf: '#8bd59e',
  sky: isDark ? '#23445d' : '#dff3ff',
});

function Sparkle({ isDark }) {
  const { accent } = palette(isDark);
  return (
    <g className="nav-sparkle" stroke={accent} strokeWidth="3" strokeLinecap="round">
      <path d="M78 20v10" />
      <path d="M73 25h10" />
      <path d="M21 74v8" />
      <path d="M17 78h8" />
    </g>
  );
}

export const AboutIcon = ({ isDark }) => {
  const c = palette(isDark);
  return (
    <svg className="nav-icon" viewBox="0 0 100 100" fill="none" aria-hidden="true">
      <Sparkle isDark={isDark} />
      <path className="nav-icon-body" d="M50 84c22 0 38-14 38-33S72 17 50 17 12 32 12 51c0 11 6 21 16 27l-5 13 15-8c4 1 8 1 12 1Z" fill={c.paper} stroke={c.ink} strokeWidth="3.6" strokeLinejoin="round" />
      <circle className="nav-dot" cx="50" cy="36" r="4.2" fill={c.accent} />
      <path d="M50 48v18M43 66h14" stroke={c.ink} strokeWidth="4" strokeLinecap="round" />
    </svg>
  );
};

export const LinksIcon = ({ isDark }) => {
  const c = palette(isDark);
  return (
    <svg className="nav-icon" viewBox="0 0 100 100" fill="none" aria-hidden="true">
      <Sparkle isDark={isDark} />
      <path className="nav-chain-a" d="M42 36 31 47a15 15 0 0 0 21 21l9-9" stroke={c.ink} strokeWidth="8" strokeLinecap="round" />
      <path className="nav-chain-b" d="M58 64 69 53a15 15 0 0 0-21-21l-9 9" stroke={c.ink} strokeWidth="8" strokeLinecap="round" />
      <path d="m43 57 14-14" stroke={c.accent} strokeWidth="5" strokeLinecap="round" />
    </svg>
  );
};

export const WorkIcon = ({ isDark }) => {
  const c = palette(isDark);
  return (
    <svg className="nav-icon" viewBox="0 0 100 100" fill="none" aria-hidden="true">
      <Sparkle isDark={isDark} />
      <path d="M15 34h26l8 9h36v33a7 7 0 0 1-7 7H22a7 7 0 0 1-7-7V34Z" fill={c.paper} stroke={c.ink} strokeWidth="3.5" strokeLinejoin="round" />
      <path className="nav-folder-lid" d="M15 43h70l-7 39H22l-7-39Z" fill={c.sky} stroke={c.ink} strokeWidth="3.5" strokeLinejoin="round" />
      <path d="M31 60h23M31 70h34" stroke={c.softInk} strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
};

export const FaqIcon = ({ isDark }) => {
  const c = palette(isDark);
  return (
    <svg className="nav-icon" viewBox="0 0 100 100" fill="none" aria-hidden="true">
      <Sparkle isDark={isDark} />
      <path className="nav-page" d="M27 13h32l16 16v58H27V13Z" fill={c.paper} stroke={c.ink} strokeWidth="3.5" strokeLinejoin="round" />
      <path d="M59 13v16h16" stroke={c.ink} strokeWidth="3.5" strokeLinejoin="round" />
      <path className="nav-question" d="M42 44c0-7 16-8 16 1 0 7-8 8-8 15" stroke={c.accent} strokeWidth="5" strokeLinecap="round" />
      <circle cx="50" cy="72" r="3.5" fill={c.accent} />
    </svg>
  );
};

export const ContactIcon = ({ isDark }) => {
  const c = palette(isDark);
  return (
    <svg className="nav-icon" viewBox="0 0 100 100" fill="none" aria-hidden="true">
      <Sparkle isDark={isDark} />
      <rect x="14" y="27" width="72" height="48" rx="9" fill={c.paper} stroke={c.ink} strokeWidth="3.5" />
      <path className="nav-mail-flap" d="M16 31 50 55 84 31" stroke={c.accent} strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
      <path d="m16 72 24-23M84 72 60 49" stroke={c.ink} strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
};

export const UrvishaAvatar = ({ isDark, pose = 'typing' }) => {
  const c = palette(isDark);
  const isTyping = pose === 'typing';
  const isReading = pose === 'reading';
  const isFolder = pose === 'folder';
  const isThinking = pose === 'thinking';
  const isWaving = pose === 'waving';

  return (
    <svg className={`urvisha-avatar avatar-${pose}`} viewBox="0 0 260 220" fill="none" role="img" aria-label={`Urvisha avatar ${pose}`}>
      <ellipse cx="130" cy="198" rx="78" ry="13" fill={isDark ? '#0d1822' : '#cae5f6'} opacity=".42" />
      <g className="avatar-core-float">
        {isThinking && (
          <g className="thought-bubbles" fill={isDark ? '#20364a' : '#fffdf7'} stroke={c.ink} strokeWidth="3">
            <circle cx="192" cy="35" r="13" />
            <circle cx="214" cy="18" r="7" />
            <path d="M185 33c7-9 21-8 20 4 0 8-9 9-9 17" fill="none" stroke={c.accent} strokeWidth="4" strokeLinecap="round" />
            <circle cx="196" cy="65" r="2.5" fill={c.accent} stroke="none" />
          </g>
        )}

        <path d="M73 85c-15 47 5 82 57 82s72-35 57-82c-7-30-29-48-57-48S80 55 73 85Z" fill="#2e3137" stroke={c.ink} strokeWidth="4" strokeLinejoin="round" />
        <path d="M86 84c6-36 82-36 88 0 4 45-17 75-44 75S82 129 86 84Z" fill="#ffd9b2" stroke={c.ink} strokeWidth="4" />
        <path d="M84 79c13-34 78-41 94 6-34-7-55-22-75-4-6 5-13 6-19-2Z" fill="#2e3137" stroke={c.ink} strokeWidth="4" strokeLinejoin="round" />
        <circle cx="105" cy="96" r="14" fill="none" stroke={c.accent} strokeWidth="4" />
        <circle cx="148" cy="96" r="14" fill="none" stroke={c.accent} strokeWidth="4" />
        <path d="M119 96h15" stroke={c.accent} strokeWidth="4" strokeLinecap="round" />
        <path className="avatar-eye" d="M99 94c4-4 9-4 13 0M141 94c4-4 9-4 13 0" stroke={c.ink} strokeWidth="4" strokeLinecap="round" />
        <ellipse cx="98" cy="114" rx="7" ry="4" fill={c.blush} opacity=".55" />
        <ellipse cx="154" cy="114" rx="7" ry="4" fill={c.blush} opacity=".55" />
        <path d={isThinking ? 'M119 122c6-3 13-3 20 0' : 'M118 120c7 7 16 7 23 0'} stroke={c.ink} strokeWidth="4" strokeLinecap="round" />

        <path d="M78 129c-18 15-25 35-22 58h148c3-23-4-43-22-58-29 20-75 20-104 0Z" fill={c.sky} stroke={c.ink} strokeWidth="4" strokeLinejoin="round" />

        <g className={isWaving ? 'avatar-wave' : isTyping ? 'avatar-type-hand-left' : ''}>
          <path d={isWaving ? 'M79 133c-22 2-38-9-49-31' : 'M78 137c-20 9-30 24-31 42'} stroke={c.ink} strokeWidth="12" strokeLinecap="round" />
          {isWaving && <circle cx="27" cy="98" r="13" fill="#ffd9b2" stroke={c.ink} strokeWidth="4" />}
        </g>

        <g className={isWaving ? 'avatar-wave' : isTyping ? 'avatar-type-hand-right' : ''}>
          <path d={isWaving ? 'M181 132c25-10 38-29 43-56' : 'M181 137c20 9 30 24 31 42'} stroke={c.ink} strokeWidth="12" strokeLinecap="round" />
          {isWaving && <circle cx="225" cy="73" r="13" fill="#ffd9b2" stroke={c.ink} strokeWidth="4" />}
        </g>

        {isTyping && (
          <>
            <rect x="58" y="137" width="145" height="48" rx="10" fill={c.paper} stroke={c.ink} strokeWidth="4" />
            <path d="M70 185h121l13 15H57l13-15Z" fill={isDark ? '#20364a' : '#d8eefb'} stroke={c.ink} strokeWidth="4" strokeLinejoin="round" />
            <path className="avatar-code" d="M88 154h24M123 154h16M92 168h14M119 168h34M160 168h13" stroke={c.accent} strokeWidth="4" strokeLinecap="round" />
          </>
        )}

        {isReading && (
          <>
            <path className="avatar-book" d="M58 145c24-11 47-9 72 5 25-14 49-16 72-5v45c-24-7-47-5-72 8-25-13-49-15-72-8v-45Z" fill={c.paper} stroke={c.ink} strokeWidth="4" strokeLinejoin="round" />
            <path d="M130 150v48M74 161c16-4 29-2 42 4M144 165c16-6 29-7 43-4" stroke={c.accent} strokeWidth="3.5" strokeLinecap="round" />
          </>
        )}

        {isFolder && (
          <>
            <path className="avatar-folder" d="M59 145h47l10 11h85v37H59v-48Z" fill={isDark ? '#29435a' : '#dff3ff'} stroke={c.ink} strokeWidth="4" strokeLinejoin="round" />
            <path className="avatar-folder-front" d="M53 158h154l-13 42H66l-13-42Z" fill={c.paper} stroke={c.ink} strokeWidth="4" strokeLinejoin="round" />
            <path d="M84 176h48M84 188h72" stroke={c.accent} strokeWidth="4" strokeLinecap="round" />
          </>
        )}

        {isThinking && (
          <>
            <rect x="74" y="146" width="112" height="42" rx="10" fill={c.paper} stroke={c.ink} strokeWidth="4" />
            <path d="M94 163h72M94 176h42" stroke={c.accent} strokeWidth="4" strokeLinecap="round" />
          </>
        )}

        {isWaving && (
          <>
            <rect x="82" y="145" width="96" height="45" rx="7" fill={c.paper} stroke={c.ink} strokeWidth="4" />
            <path d="m83 148 47 28 47-28" stroke={c.accent} strokeWidth="4" strokeLinejoin="round" />
          </>
        )}
      </g>
    </svg>
  );
};


export const BunnyPeek = ({ isDark }) => {
  const c = palette(isDark);
  return (
    <svg className="bunny-peek" viewBox="0 0 120 90" fill="none" aria-hidden="true">
      <g className="">
        <path d="M39 46c-13-27-8-40 4-39 10 1 13 19 14 34" fill={c.paper} stroke={c.ink} strokeWidth="4" />
        <path d="M81 46c13-27 8-40-4-39-10 1-13 19-14 34" fill={c.paper} stroke={c.ink} strokeWidth="4" />
        <path d="M31 56c0-19 13-31 29-31s29 12 29 31v23H31V56Z" fill={c.paper} stroke={c.ink} strokeWidth="4" />
        <circle className="bunny-eye" cx="50" cy="55" r="3.5" fill={c.ink} />
        <circle className="bunny-eye" cx="70" cy="55" r="3.5" fill={c.ink} />
        <path d="M57 64h6M60 64v5" stroke={c.blush} strokeWidth="3" strokeLinecap="round" />
      </g>
    </svg>
  );
};

export const GithubIcon = ({ width = 24, height = 24, fill = "currentColor", className = "" }) => (
  <svg viewBox="0 0 24 24" width={width} height={height} fill={fill} className={className}>
    <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
  </svg>
);

export const LinkedInIcon = ({ width = 24, height = 24, fill = "currentColor", className = "" }) => (
  <svg viewBox="0 0 24 24" width={width} height={height} fill={fill} className={className}>
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
  </svg>
);

export const EmailIcon = ({ width = 24, height = 24, fill = "currentColor", className = "" }) => (
  <svg viewBox="0 0 24 24" width={width} height={height} fill={fill} className={className}>
    <path d="M24 5.457v13.909c0 .904-.732 1.636-1.636 1.636h-3.819V11.73L12 16.64l-6.545-4.91v9.273H1.636A1.636 1.636 0 0 1 0 19.366V5.457c0-2.023 2.309-3.178 3.927-1.964L5.455 4.64 12 9.548l6.545-4.91 1.528-1.145C21.69 2.28 24 3.434 24 5.457z"/>
  </svg>
);
