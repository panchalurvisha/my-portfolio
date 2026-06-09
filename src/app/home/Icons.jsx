import React from 'react';

// Common icon props
const getIconColors = (isDark) => ({
  stroke: isDark ? "#fff" : "#4d4d4d",
  fill: isDark ? "transparent" : "#fff",
});

export const SunIcon = ({ isDark }) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={isDark ? "#fff" : "#333"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="4" />
    <line x1="12" y1="2" x2="12" y2="4" />
    <line x1="12" y1="20" x2="12" y2="22" />
    <line x1="4.93" y1="4.93" x2="6.34" y2="6.34" />
    <line x1="17.66" y1="17.66" x2="19.07" y2="19.07" />
    <line x1="2" y1="12" x2="4" y2="12" />
    <line x1="20" y1="12" x2="22" y2="12" />
    <line x1="4.93" y1="19.07" x2="6.34" y2="17.66" />
    <line x1="17.66" y1="6.34" x2="19.07" y2="4.93" />
  </svg>
);

export const MoonIcon = ({ isDark }) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
  </svg>
);

export const SpeakerIcon = ({ isDark }) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill={isDark ? "#fff" : "#333"}>
    <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
  </svg>
);

export const AboutIcon = ({ isDark }) => {
  const { stroke, fill } = getIconColors(isDark);
  return (
    <svg viewBox="0 0 100 100" fill="none" stroke={stroke} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
      <path d="M50 85 C20 85 10 65 10 45 C10 20 25 10 50 10 C75 10 90 20 90 45 C90 65 80 85 50 85 Z" fill={fill} />
      <path d="M30 80 L20 95 L40 84" fill={fill} stroke={stroke} strokeWidth="3" strokeLinejoin="round"/>
      <circle cx="50" cy="35" r="4" fill={stroke} stroke="none" />
      <line x1="50" y1="45" x2="50" y2="65" />
      <line x1="45" y1="65" x2="55" y2="65" />
    </svg>
  );
};

export const LinksIcon = ({ isDark }) => {
  const { stroke, fill } = getIconColors(isDark);
  return (
    <svg viewBox="0 0 100 100" fill="none" stroke={stroke} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
      <rect x="20" y="40" width="40" height="15" rx="7.5" transform="rotate(-45 40 47.5)" fill={fill}/>
      <rect x="40" y="40" width="40" height="15" rx="7.5" transform="rotate(-45 60 47.5)" fill={fill}/>
      <path d="M45 45 L55 55" />
    </svg>
  );
};

export const WorkIcon = ({ isDark }) => {
  const { stroke, fill } = getIconColors(isDark);
  return (
    <svg viewBox="0 0 100 100" fill="none" stroke={stroke} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
      <path d="M15 30 L40 30 L50 40 L85 40 L85 80 L15 80 Z" fill={fill} />
      <path d="M25 40 L75 40 M25 50 L75 50" strokeWidth="2" opacity="0.5"/>
      <path d="M10 45 L90 45 L85 85 L15 85 Z" fill={fill} />
    </svg>
  );
};

export const FaqIcon = ({ isDark }) => {
  const { stroke, fill } = getIconColors(isDark);
  return (
    <svg viewBox="0 0 100 100" fill="none" stroke={stroke} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
      <path d="M25 15 L60 15 L75 30 L75 85 L25 85 Z" fill={fill} />
      <path d="M60 15 L60 30 L75 30" />
      <path d="M42 45 C42 40 58 40 58 48 C58 55 50 55 50 62" />
      <circle cx="50" cy="72" r="2" fill={stroke} stroke="none" />
    </svg>
  );
};

export const ContactIcon = ({ isDark }) => {
  const { stroke, fill } = getIconColors(isDark);
  return (
    <svg viewBox="0 0 100 100" fill="none" stroke={stroke} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
      <rect x="15" y="25" width="70" height="50" rx="4" fill={fill} />
      <path d="M15 25 L50 50 L85 25" />
      <circle cx="50" cy="50" r="10" />
      <path d="M50 45 A 5 5 0 1 1 45 50" />
    </svg>
  );
};

export const TwitterIcon = ({ isDark }) => {
  const fill = isDark ? "#111" : "#fff";
  return (
    <svg viewBox="0 0 24 24" fill={fill}>
      <path d="M24 4.557a9.83 9.83 0 0 1-2.828.775 4.932 4.932 0 0 0 2.165-2.724 9.864 9.864 0 0 1-3.127 1.195 4.916 4.916 0 0 0-8.384 4.482A13.942 13.942 0 0 1 1.671 3.149a4.916 4.916 0 0 0 1.523 6.574 4.903 4.903 0 0 1-2.229-.616c-.054 2.281 1.581 4.415 3.949 4.89a4.935 4.935 0 0 1-2.224.084 4.928 4.928 0 0 0 4.6 3.419A9.867 9.867 0 0 1 0 19.54a13.94 13.94 0 0 0 7.548 2.212c9.057 0 14.01-7.506 14.01-14.01 0-.213-.005-.425-.014-.636A10.012 10.012 0 0 0 24 4.557z" />
    </svg>
  );
};

export const YouTubeIcon = ({ isDark }) => {
  const fill = isDark ? "#111" : "#fff";
  return (
    <svg viewBox="0 0 24 24" fill={fill}>
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.5 12 3.5 12 3.5s-7.505 0-9.377.55a3.016 3.016 0 0 0-2.122 2.136C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.55 9.376.55 9.376.55s7.505 0 9.377-.55a3.016 3.016 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
    </svg>
  );
};

export const InstagramIcon = ({ isDark }) => {
  const stroke = isDark ? "#111" : "#fff";
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
    </svg>
  );
};

export const StarCharacter = ({ isDark }) => {
  const fillColor = isDark ? "#c2e4ff" : "#ffca28";
  const strokeColor = isDark ? "#fff" : "#f57c00";
  return (
    <svg viewBox="0 0 100 100" fill="none" className="drop-shadow-md">
      <path d="M50 15 L60 38 L85 40 L65 58 L72 82 L50 68 L28 82 L35 58 L15 40 L40 38 Z" fill={fillColor} stroke={strokeColor} strokeWidth="3" strokeLinejoin="round"/>
      <path d="M42 52 Q45 48 48 52" stroke="#4d4d4d" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
      <path d="M62 52 Q59 48 56 52" stroke="#4d4d4d" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
      <path d="M48 58 Q52 64 56 58" stroke="#4d4d4d" strokeWidth="2.5" fill="#fff" strokeLinecap="round"/>
      <path d="M50 58 L54 58 L52 62 Z" fill="#ff8a65"/>
    </svg>
  );
};

export const FrogCharacter = () => (
  <svg viewBox="0 0 140 100" fill="none">
    {/* Lilypad */}
    <ellipse cx="70" cy="85" rx="50" ry="12" fill="#7cb342" stroke="#33691e" strokeWidth="2.5"/>
    <path d="M70 85 L25 85" stroke="#33691e" strokeWidth="2.5"/>
    {/* Body */}
    <rect x="45" y="45" width="50" height="35" rx="15" fill="#aed581" stroke="#33691e" strokeWidth="2.5"/>
    {/* Eyes */}
    <circle cx="52" cy="40" r="12" fill="#aed581" stroke="#33691e" strokeWidth="2.5"/>
    <circle cx="88" cy="40" r="12" fill="#aed581" stroke="#33691e" strokeWidth="2.5"/>
    <circle cx="52" cy="40" r="3" fill="#333"/>
    <circle cx="88" cy="40" r="3" fill="#333"/>
    <circle cx="54" cy="38" r="1.5" fill="#fff"/>
    <circle cx="90" cy="38" r="1.5" fill="#fff"/>
    {/* Blush */}
    <ellipse cx="48" cy="55" rx="4" ry="2" fill="#ff8a65" opacity="0.8"/>
    <ellipse cx="92" cy="55" rx="4" ry="2" fill="#ff8a65" opacity="0.8"/>
    {/* Mouth */}
    <path d="M65 58 Q70 63 75 58" stroke="#333" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
  </svg>
);

// Links Icons (Stickers)
const getStickerColors = (isDark) => ({
  stroke: isDark ? "#fff" : "#424242",
  fill: isDark ? "transparent" : "#fff",
  solid: isDark ? "#fff" : "#424242",
});

export const TwitterSticker = ({ isDark }) => {
  const { stroke, fill, solid } = getStickerColors(isDark);
  return (
    <svg viewBox="0 0 100 100" fill="none">
      <path d="M15 30 Q30 20 40 30 Q60 10 80 30 Q90 50 85 70 Q70 90 40 85 Q15 70 20 50 Z" fill={fill} stroke={stroke} strokeWidth="3" strokeLinejoin="round"/>
      <path d="M30 40 Q40 55 60 45" stroke={stroke} strokeWidth="3" fill="none" strokeLinecap="round"/>
      <path d="M25 60 Q40 70 65 60" stroke={stroke} strokeWidth="3" fill="none" strokeLinecap="round"/>
      <circle cx="45" cy="45" r="3" fill={solid}/>
    </svg>
  );
};

export const YouTubeSticker = ({ isDark }) => {
  const { stroke, fill, solid } = getStickerColors(isDark);
  return (
    <svg viewBox="0 0 100 100" fill="none">
      <rect x="15" y="30" width="70" height="45" rx="10" fill={solid} />
      <polygon points="45,43 45,62 60,52.5" fill={isDark ? "#111" : "#fff"} />
    </svg>
  );
};

export const KofiSticker = ({ isDark }) => {
  const { stroke, fill, solid } = getStickerColors(isDark);
  return (
    <svg viewBox="0 0 100 100" fill="none">
      <path d="M25 30 L65 30 L60 70 L30 70 Z" fill={fill} stroke={stroke} strokeWidth="3" strokeLinejoin="round"/>
      <path d="M65 40 Q80 40 80 50 Q80 60 62 60" fill="none" stroke={stroke} strokeWidth="3" strokeLinecap="round"/>
      <path d="M45 45 L50 50 L55 45 L55 40 L45 40 Z" fill={solid}/>
    </svg>
  );
};

export const DiscordSticker = ({ isDark }) => {
  const { stroke, fill, solid } = getStickerColors(isDark);
  return (
    <svg viewBox="0 0 100 100" fill="none">
      <path d="M25 40 Q50 20 75 40 Q90 60 75 80 L65 70 L50 75 L35 70 L25 80 Q10 60 25 40 Z" fill={solid} stroke={solid} strokeWidth="3" strokeLinejoin="round"/>
      <circle cx="40" cy="55" r="5" fill={isDark ? "#111" : "#fff"}/>
      <circle cx="60" cy="55" r="5" fill={isDark ? "#111" : "#fff"}/>
    </svg>
  );
};

export const InstagramSticker = ({ isDark }) => {
  const { stroke, fill, solid } = getStickerColors(isDark);
  return (
    <svg viewBox="0 0 100 100" fill="none">
      <rect x="25" y="25" width="50" height="50" rx="15" fill={fill} stroke={stroke} strokeWidth="4"/>
      <circle cx="50" cy="50" r="10" fill="none" stroke={stroke} strokeWidth="4"/>
      <circle cx="63" cy="37" r="3" fill={solid}/>
    </svg>
  );
};

export const BlueskySticker = ({ isDark }) => {
  const { stroke, fill, solid } = getStickerColors(isDark);
  return (
    <svg viewBox="0 0 100 100" fill="none">
      <path d="M50 50 Q30 10 20 40 Q15 60 30 70 Q45 75 50 60 Q55 75 70 70 Q85 60 80 40 Q70 10 50 50 Z" fill={fill} stroke={stroke} strokeWidth="3" strokeLinejoin="round"/>
    </svg>
  );
};

export const InPrntSticker = ({ isDark }) => {
  const { stroke, fill, solid } = getStickerColors(isDark);
  return (
    <svg viewBox="0 0 100 100" fill="none">
      <rect x="15" y="35" width="30" height="30" fill={solid}/>
      <text x="18" y="55" fill={isDark ? "#111" : "#fff"} fontSize="14" fontFamily="sans-serif" fontWeight="bold">IN</text>
      <text x="50" y="55" fill={solid} fontSize="14" fontFamily="sans-serif" fontWeight="bold">PRNT</text>
    </svg>
  );
};

export const MerchSticker = ({ isDark }) => {
  const { stroke, fill, solid } = getStickerColors(isDark);
  return (
    <svg viewBox="0 0 100 100" fill="none">
      <rect x="25" y="45" width="50" height="30" rx="10" fill={fill} stroke={stroke} strokeWidth="3"/>
      <circle cx="40" cy="55" r="3" fill={solid}/>
      <circle cx="60" cy="55" r="3" fill={solid}/>
      <path d="M45 65 Q50 70 55 65" fill="none" stroke={stroke} strokeWidth="3" strokeLinecap="round"/>
      <path d="M40 35 C30 20 70 20 60 35 C80 35 70 50 50 45 C30 50 20 35 40 35 Z" fill={fill} stroke={stroke} strokeWidth="2"/>
    </svg>
  );
};

// Contact Card Girl Character
export const ContactCharacter = () => (
  <svg viewBox="0 0 200 200" fill="none" className="w-full h-full drop-shadow-md">
    {/* Body Shadow */}
    <ellipse cx="100" cy="180" rx="55" ry="12" fill="#e8e5d5" />
    
    {/* Legs */}
    <path d="M90 150 Q75 165 80 185" stroke="#222" strokeWidth="8" strokeLinecap="round" fill="none"/>
    <path d="M110 150 Q125 165 120 185" stroke="#222" strokeWidth="8" strokeLinecap="round" fill="none"/>
    <path d="M70 145 C80 160 120 160 130 145 Z" fill="#333" />

    {/* Shirt */}
    <path d="M75 120 Q100 165 125 120 Z" fill="#d1d1d1" stroke="#222" strokeWidth="4" strokeLinejoin="round"/>
    
    {/* Back Hair */}
    <path d="M60 80 C30 150 70 160 100 150 C130 160 170 150 140 80 Z" fill="#2a2a2a" stroke="#222" strokeWidth="4" strokeLinejoin="round"/>
    <path d="M125 60 C150 40 160 70 135 90 Z" fill="#2a2a2a"/>

    {/* Face/Head */}
    <path d="M60 80 Q100 150 140 80 Q100 30 60 80 Z" fill="#fcdbb6" stroke="#222" strokeWidth="4" strokeLinejoin="round"/>
    
    {/* Front Hair Bangs */}
    <path d="M70 45 Q90 30 100 50 Q105 70 95 65 Q80 40 70 45 Z" fill="#2a2a2a"/>
    <path d="M100 50 Q120 30 140 50 Q120 70 110 60 Q105 40 100 50 Z" fill="#2a2a2a"/>
    <path d="M60 70 Q70 40 100 40 Q130 40 140 70 Q100 30 60 70 Z" fill="#2a2a2a"/>
    
    {/* Ears */}
    <circle cx="60" cy="85" r="10" fill="#fcdbb6" stroke="#222" strokeWidth="4"/>
    <circle cx="140" cy="85" r="10" fill="#fcdbb6" stroke="#222" strokeWidth="4"/>

    {/* Blush */}
    <ellipse cx="75" cy="95" rx="8" ry="4" fill="#ff8a65" opacity="0.6"/>
    <ellipse cx="125" cy="95" rx="8" ry="4" fill="#ff8a65" opacity="0.6"/>

    {/* Eyes closed happy ^ ^ */}
    <path d="M68 85 Q78 75 88 85" stroke="#222" strokeWidth="4" strokeLinecap="round" fill="none"/>
    <path d="M112 85 Q122 75 132 85" stroke="#222" strokeWidth="4" strokeLinecap="round" fill="none"/>

    {/* Glasses */}
    <circle cx="78" cy="85" r="22" fill="none" stroke="#e6c883" strokeWidth="4"/>
    <circle cx="122" cy="85" r="22" fill="none" stroke="#e6c883" strokeWidth="4"/>
    <line x1="100" y1="85" x2="100" y2="85" stroke="#e6c883" strokeWidth="4" strokeLinecap="round"/>

    {/* Mouth */}
    <path d="M92 105 L108 105 L100 120 Z" fill="#e06c75" stroke="#222" strokeWidth="3" strokeLinejoin="round"/>
    <path d="M90 105 Q100 115 110 105" fill="none" stroke="#222" strokeWidth="3" strokeLinecap="round"/>

    {/* Big Envelope */}
    <rect x="60" y="125" width="80" height="45" rx="3" fill="#fcf3d9" stroke="#222" strokeWidth="4" transform="rotate(-5 100 145)"/>
    <path d="M60 125 L100 152 L140 125" fill="none" stroke="#e6c883" strokeWidth="4" strokeLinejoin="round" transform="rotate(-5 100 145)"/>

    {/* Hands holding the envelope */}
    <circle cx="65" cy="145" r="10" fill="#fcdbb6" stroke="#222" strokeWidth="4"/>
    <circle cx="138" cy="138" r="10" fill="#fcdbb6" stroke="#222" strokeWidth="4"/>
  </svg>
);
