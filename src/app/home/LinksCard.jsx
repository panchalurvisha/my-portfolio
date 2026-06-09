"use client";
import React from 'react';
import { TwitterSticker, YouTubeSticker, KofiSticker, DiscordSticker, InstagramSticker, BlueskySticker, InPrntSticker, MerchSticker } from './Icons';

function StickerItem({ icon, label, isDark }) {
  return (
    <a href="#" target="_blank" rel="noopener noreferrer" className="flex flex-col items-center gap-3 group hover:-translate-y-1 transition-transform">
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
  return (
    <div className={`absolute top-[32px] left-[16px] w-[620px] h-[440px] rounded-lg shadow-[0_10px_35px_rgba(0,0,0,0.25)] flex flex-col z-30 transition-colors duration-300 overflow-hidden ${isDark ? 'bg-[#182635] border border-white' : 'bg-white border border-gray-300'}`}>
      <div className={`h-[38px] w-full flex items-center justify-between px-4 transition-colors duration-300 flex-shrink-0 ${isDark ? 'bg-[#1c1c1c]' : 'bg-[#4a4a4a]'}`}>
        <span className="text-white text-[15px] font-mono tracking-wide">links</span>
        <button onClick={onClose} className="text-white font-mono text-[15px] hover:opacity-70 transition-opacity">[x]</button>
      </div>
      <div className="flex-1 flex flex-col p-8 items-center justify-between">
        <div className="grid grid-cols-4 gap-x-6 gap-y-10 w-full mt-4">
          <StickerItem icon={<TwitterSticker isDark={isDark} />} label="twitter" isDark={isDark} />
          <StickerItem icon={<YouTubeSticker isDark={isDark} />} label="youtube" isDark={isDark} />
          <StickerItem icon={<KofiSticker isDark={isDark} />} label="ko-fi" isDark={isDark} />
          <StickerItem icon={<DiscordSticker isDark={isDark} />} label="discord" isDark={isDark} />
          <StickerItem icon={<InstagramSticker isDark={isDark} />} label="instagram" isDark={isDark} />
          <StickerItem icon={<BlueskySticker isDark={isDark} />} label="bluesky" isDark={isDark} />
          <StickerItem icon={<InPrntSticker isDark={isDark} />} label="art prints" isDark={isDark} />
          <StickerItem icon={<MerchSticker isDark={isDark} />} label="merch" isDark={isDark} />
        </div>
        <div className={`border rounded-[6px] py-3 px-8 text-[13px] tracking-wide mb-2 transition-colors duration-300 ${isDark ? 'border-gray-600 text-gray-300' : 'border-gray-200 text-[#7a7a7a]'}`}>
          clicking any of the links will open a new tab!
        </div>
      </div>
    </div>
  );
}
