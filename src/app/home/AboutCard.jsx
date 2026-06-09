"use client";
import React from 'react';

export default function AboutCard({ isDark, onClose }) {
  return (
    <div className={`absolute top-[32px] left-[16px] w-[728px] h-[440px] rounded-lg shadow-[0_10px_35px_rgba(0,0,0,0.25)] flex flex-col z-30 transition-colors duration-300 overflow-hidden ${isDark ? 'bg-[#182635] border border-white' : 'bg-white border border-gray-300'}`}>
      <div className={`h-[38px] w-full flex items-center justify-between px-4 transition-colors duration-300 flex-shrink-0 ${isDark ? 'bg-[#1c1c1c]' : 'bg-[#4a4a4a]'}`}>
        <span className="text-white text-[15px] font-mono tracking-wide">about</span>
        <button onClick={onClose} className="text-white font-mono text-[15px] hover:opacity-70 transition-opacity">[x]</button>
      </div>
      <div className="px-8 pt-8 pb-6 flex-shrink-0 relative z-10 shadow-[0_2px_10px_rgba(0,0,0,0.02)]">
        <div className="flex items-start gap-6">
          <div className="w-[120px] h-[120px] rounded-full overflow-hidden flex-shrink-0 border-2 border-transparent relative shadow-sm">
            <img src="/about/avatar.webp" alt="avatar" className="w-full h-full object-cover" />
          </div>
          <div className="pt-1">
            <div className="flex items-baseline gap-3 mb-1">
              <h2 className={`text-[36px] font-medium tracking-tight transition-colors duration-300 ${isDark ? 'text-[#a2e1e9]' : 'text-[#ff9800]'}`}>
                URVISHA PANCHAL
              </h2>
            </div>
            <p className={`text-[15px] mb-1 transition-colors duration-300 ${isDark ? 'text-white' : 'text-[#737373]'}`}>
              Ahmedabad-based Full Stack Developer
            </p>
            <p className={`text-[15px] transition-colors duration-300 ${isDark ? 'text-white' : 'text-[#737373]'}`}>
              Currently working as a Full Stack Developer
            </p>
          </div>
        </div>
      </div>
      <div className="flex-1 overflow-y-auto px-8 pb-8 pt-2 relative custom-scroll">
        <div className={`text-[15px] leading-relaxed transition-colors duration-300 ${isDark ? 'text-white' : 'text-[#737373]'}`}>
          <p className="mb-4">hi! i'm urvisha, a full stack developer. i...</p>
          <ul className="list-disc pl-5 space-y-2">
            <li>build scalable web applications,</li>
            <li>develop responsive user interfaces,</li>
            <li>integrate APIs and databases,</li>
            <li>create admin panels and dashboards, and</li>
            <li>work on ERP, CRM, HRMS, and POS systems!</li>
          </ul>
          
          <p className="mt-6 mb-8">
            interested in working with me? send me an email at <a href="mailto:panchalurvisha147@gmail.com" className={`underline font-medium transition-colors duration-300 ${isDark ? 'text-[#a2e1e9]' : 'text-[#ff9800]'}`}>panchalurvisha147@gmail.com</a>! :)
          </p>

          <h3 className={`text-[19px] font-bold mb-4 tracking-wide transition-colors duration-300 ${isDark ? 'text-white' : 'text-[#4a4a4a]'}`}>
            EDUCATION
          </h3>
          <div className={`pl-4 border-l-[3px] mb-8 transition-colors duration-300 ${isDark ? 'border-gray-600' : 'border-[#e8e8e8]'}`}>
            <p className={`text-[16px] mb-4 transition-colors duration-300 ${isDark ? 'text-white' : 'text-[#4a4a4a]'}`}>Master of Computer Applications (MCA)</p>
            <p className={`text-[16px] mb-1 transition-colors duration-300 ${isDark ? 'text-white' : 'text-[#4a4a4a]'}`}>Bachelor of Computer Applications (BCA)</p>
          </div>

          <h3 className={`text-[19px] font-bold mb-4 tracking-wide transition-colors duration-300 ${isDark ? 'text-white' : 'text-[#4a4a4a]'}`}>
            OTHER INTERESTS
          </h3>
          <ul className="list-disc pl-5 space-y-2 mb-8">
            <li>exploring new technologies,</li>
            <li>building side projects,</li>
            <li>learning backend architecture,</li>
            <li>UI/UX design inspiration,</li>
            <li>problem solving and coding challenges,</li>
            <li>travelling and discovering new places :)</li>
          </ul>

          <h3 className={`text-[19px] font-bold mb-4 tracking-wide transition-colors duration-300 ${isDark ? 'text-white' : 'text-[#4a4a4a]'}`}>
            TECH STACK
          </h3>
          <ul className="list-disc pl-5 space-y-2 mb-8">
            <li>Next.js, React.js</li>
            <li>Node.js, Express.js</li>
            <li>PostgreSQL, PHP</li>
            <li>JavaScript</li>
            <li>Tailwind CSS</li>
            <li>Framer Motion</li>
          </ul>

          <h3 className={`text-[19px] font-bold mb-4 tracking-wide transition-colors duration-300 ${isDark ? 'text-white' : 'text-[#4a4a4a]'}`}>
            LANGUAGE PROFICIENCY
          </h3>
          <div className={`pl-4 border-l-[3px] transition-colors duration-300 ${isDark ? 'border-gray-600' : 'border-[#e8e8e8]'}`}>
            <p className="mb-3">
              i have professional proficiency in <span className={`font-medium transition-colors duration-300 ${isDark ? 'text-[#a2e1e9]' : 'text-[#ff9800]'}`}>English</span>, <span className={`font-medium transition-colors duration-300 ${isDark ? 'text-[#a2e1e9]' : 'text-[#ff9800]'}`}>Hindi</span>, and <span className={`font-medium transition-colors duration-300 ${isDark ? 'text-[#a2e1e9]' : 'text-[#ff9800]'}`}>Gujarati</span>.
            </p>
            <p className={`text-[14px] transition-colors duration-300 ${isDark ? 'text-gray-300' : 'text-[#888]'}`}>
              i regularly communicate with clients and team members in English and enjoy continuously improving my communication skills.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
