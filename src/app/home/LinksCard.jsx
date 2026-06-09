"use client";
import React from 'react';
import DesktopWindow from './DesktopWindow';
import { useSound } from './useSound';
import { TwitterSticker, YouTubeSticker, KofiSticker, DiscordSticker, InstagramSticker, BlueskySticker, InPrntSticker, MerchSticker } from './Icons';

function StickerItem({ icon, label, isDark, onHover }) {
  return (
    <a href="#" onMouseEnter={onHover} target="_blank" rel="noopener noreferrer" className="flex flex-col items-center gap-3 group hover:-translate-y-1 transition-transform">
      <div className={`[&>svg]:w-[65px] [&>svg]:h-[65px] drop-shadow-[2px_3px_0px_${isDark ? '#333' : '#dbdbdb'}]`}>
        {icon}
      </div>
      <span className={`font-mono text-[13px] font-bold lowercase tracking-wide transition-colors duration-300 ${isDark ? 'text-white' : 'text-[#4d4d4d]'}`}>
        {label}
      </span>
    </a>
  );
}

export default function LinksCard({ isDark, onClose }) {
  const { playSound } = useSound();
  
  return (
    <DesktopWindow title="links" isDark={isDark} onClose={onClose} width={620} height={440}>
      <div className="flex-1 flex flex-col p-5 md:p-8 items-center justify-between overflow-y-auto custom-scroll">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-x-6 gap-y-8 md:gap-y-10 w-full mt-4">
          <StickerItem onHover={() => playSound('hover_icon')} icon={<TwitterSticker isDark={isDark} />} label="twitter" isDark={isDark} />
          <StickerItem onHover={() => playSound('hover_icon')} icon={<YouTubeSticker isDark={isDark} />} label="youtube" isDark={isDark} />
          <StickerItem onHover={() => playSound('hover_icon')} icon={<KofiSticker isDark={isDark} />} label="ko-fi" isDark={isDark} />
          <StickerItem onHover={() => playSound('hover_icon')} icon={<DiscordSticker isDark={isDark} />} label="discord" isDark={isDark} />
          <StickerItem onHover={() => playSound('hover_icon')} icon={<InstagramSticker isDark={isDark} />} label="instagram" isDark={isDark} />
          <StickerItem onHover={() => playSound('hover_icon')} icon={<BlueskySticker isDark={isDark} />} label="bluesky" isDark={isDark} />
          <StickerItem onHover={() => playSound('hover_icon')} icon={<InPrntSticker isDark={isDark} />} label="art prints" isDark={isDark} />
          <StickerItem onHover={() => playSound('hover_icon')} icon={<MerchSticker isDark={isDark} />} label="merch" isDark={isDark} />
        </div>
        <div className={`border rounded-[6px] py-3 px-8 text-[13px] tracking-wide mb-2 transition-colors duration-300 ${isDark ? 'border-gray-600 text-gray-300' : 'border-gray-200 text-[#7a7a7a]'}`}>
          clicking any of the links will open a new tab!
        </div>
      </div>
    </DesktopWindow>
  );
}
