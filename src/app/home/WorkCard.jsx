"use client";
import React from 'react';

function ProjectCard({ title, desc1, desc2, tech, isDark, link = "#" }) {
  return (
    <a href={link} className={`block rounded-[8px] border transition-all duration-300 hover:-translate-y-1 hover:shadow-lg overflow-hidden flex flex-col ${isDark ? 'bg-[#1e293b]/50 border-gray-700 hover:border-gray-500' : 'bg-white border-gray-200 shadow-sm hover:border-gray-400'}`}>
      <div className={`w-full aspect-[16/9] relative border-b ${isDark ? 'bg-[#16212e] border-gray-700' : 'bg-[#e2e8f0] border-gray-200'}`}>
        <img src="https://placehold.co/600x338/cbd5e1/64748b?text=Project+Image" alt={title} className="w-full h-full object-cover" />
      </div>
      <div className="p-5 flex-1 flex flex-col">
        <h4 className={`text-[19px] font-medium mb-3 transition-colors duration-300 ${isDark ? 'text-[#a2e1e9]' : 'text-[#ff9800]'}`}>{title}</h4>
        <div className={`text-[14px] leading-relaxed space-y-2 mb-4 flex-1 transition-colors duration-300 ${isDark ? 'text-gray-300' : 'text-[#666]'}`}>
          <p>{desc1}</p>
          {desc2 && <p className="line-clamp-3">{desc2}</p>}
        </div>
        <div className="text-[13px] pt-4 border-t transition-colors duration-300 mt-auto ${isDark ? 'border-gray-700' : 'border-gray-200'}">
          <span className={`font-semibold mr-2 transition-colors duration-300 ${isDark ? 'text-white' : 'text-gray-700'}`}>Tech Stack:</span>
          <span className={`transition-colors duration-300 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>{tech}</span>
        </div>
      </div>
    </a>
  );
}

function SkillChip({ label, isDark }) {
  return (
    <div className={`px-[14px] py-[6px] rounded-[6px] border text-[14px] transition-colors duration-300 ${isDark ? 'border-gray-600 bg-[#16212e] text-gray-200' : 'border-gray-200 bg-white text-[#5c5c5c]'}`}>
      {label}
    </div>
  );
}

export default function WorkCard({ isDark, onClose }) {
  return (
    <div className={`absolute top-[32px] left-1/2 -translate-x-1/2 w-[980px] h-[520px] rounded-lg shadow-[0_10px_35px_rgba(0,0,0,0.25)] flex flex-col z-30 transition-colors duration-300 overflow-hidden ${isDark ? 'bg-[#182635] border border-white' : 'bg-white border border-gray-300'}`}>
      <div className={`h-[38px] w-full flex items-center justify-between px-4 transition-colors duration-300 flex-shrink-0 ${isDark ? 'bg-[#1c1c1c]' : 'bg-[#4a4a4a]'}`}>
        <span className="text-white text-[15px] font-mono tracking-wide">work</span>
        <button onClick={onClose} className="text-white font-mono text-[15px] hover:opacity-70 transition-opacity">[x]</button>
      </div>
      <div className="flex-1 overflow-y-auto px-8 py-8 relative custom-scroll">
        
        {/* Banner */}
        <div className={`w-full rounded-[8px] p-5 mb-8 transition-colors duration-300 shadow-sm ${isDark ? 'bg-[#2a3022] text-gray-200' : 'bg-[#fffdf0] text-[#555]'}`}>
          <p className="mb-1 text-[16px] font-medium">Accepting freelance projects and full-time opportunities!</p>
          <p className="text-[15px]">I build modern web applications, admin panels, dashboards, and business management systems. :)</p>
        </div>

        {/* Skills Columns */}
        <div className="flex flex-col md:flex-row gap-8 mb-12">
          <div className="flex-[1.2]">
            <h3 className={`text-[19px] font-bold mb-4 tracking-wide transition-colors duration-300 ${isDark ? 'text-white' : 'text-[#4a4a4a]'}`}>TECH STACK</h3>
            <div className="flex flex-wrap gap-[10px]">
              <SkillChip label="Next.js" isDark={isDark} />
              <SkillChip label="React.js" isDark={isDark} />
              <SkillChip label="Node.js" isDark={isDark} />
              <SkillChip label="Express.js" isDark={isDark} />
              <SkillChip label="JavaScript" isDark={isDark} />
              <SkillChip label="TypeScript" isDark={isDark} />
              <SkillChip label="PostgreSQL" isDark={isDark} />
              <SkillChip label="MySQL" isDark={isDark} />
              <SkillChip label="PHP" isDark={isDark} />
              <SkillChip label="Tailwind CSS" isDark={isDark} />
              <SkillChip label="Framer Motion" isDark={isDark} />
              <SkillChip label="WordPress" isDark={isDark} />
              <SkillChip label="Git & GitHub" isDark={isDark} />
              <SkillChip label="Figma" isDark={isDark} />
            </div>
          </div>
          <div className="flex-[0.8]">
            <h3 className={`text-[19px] font-bold mb-4 tracking-wide transition-colors duration-300 ${isDark ? 'text-white' : 'text-[#4a4a4a]'}`}>WHAT I BUILD</h3>
            <div className="flex flex-wrap gap-[10px]">
              <SkillChip label="ERP Systems" isDark={isDark} />
              <SkillChip label="CRM Platforms" isDark={isDark} />
              <SkillChip label="HRMS Applications" isDark={isDark} />
              <SkillChip label="POS Software" isDark={isDark} />
              <SkillChip label="Business Websites" isDark={isDark} />
              <SkillChip label="Admin Dashboards" isDark={isDark} />
              <SkillChip label="Inventory Management" isDark={isDark} />
              <SkillChip label="Billing & Reporting" isDark={isDark} />
              <SkillChip label="Responsive Web Apps" isDark={isDark} />
            </div>
          </div>
        </div>

        {/* FEATURED PROJECTS SECTION */}
        <div className="mb-6">
          <h3 className={`text-[19px] font-bold mb-6 tracking-wide transition-colors duration-300 ${isDark ? 'text-white' : 'text-[#4a4a4a]'}`}>
            FEATURED PROJECTS
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <ProjectCard 
              title="Singhai Ji Store ERP & POS System"
              desc1="A complete ERP and POS platform used for inventory management, billing, stock transfer, payroll, GST, analytics, and reporting."
              desc2="I worked on multiple modules, dashboard interfaces, invoice systems, responsive layouts, and production bug fixes."
              tech="Next.js, React.js, PostgreSQL, Tailwind CSS"
              isDark={isDark}
            />

            <ProjectCard 
              title="GVoice CRM"
              desc1="A CRM platform designed for company and user management."
              desc2="I developed the Super Admin Panel, login flow, company management screens, user management modules, and dashboard interfaces."
              tech="Next.js, React.js, Node.js, PostgreSQL"
              isDark={isDark}
            />

            <ProjectCard 
              title="GVoice HRMS"
              desc1="An HRMS application focused on employee management and HR workflows."
              desc2="I contributed to attendance management, employee modules, leave management screens, payroll-related interfaces, API integration, and responsive UI development."
              tech="Next.js, React.js, Node.js, PostgreSQL"
              isDark={isDark}
            />

            <ProjectCard 
              title="Catalyst"
              desc1="A financial and investment management platform."
              desc2="I contributed to dashboard development, data visualization, API integration, and user-facing modules while improving UI consistency and user experience."
              tech="Next.js, React.js, PostgreSQL, Tailwind CSS"
              isDark={isDark}
            />

            <ProjectCard 
              title="NatureEnergy Website"
              desc1="A production-ready corporate website focused on performance and user experience."
              desc2="I worked on responsive layouts, SEO optimization, reusable components, and modern frontend architecture."
              tech="Next.js, Tailwind CSS"
              isDark={isDark}
            />

            <ProjectCard 
              title="Novotion ERP"
              desc1="An enterprise application where I contributed to frontend development, reusable components, workflow improvements, and UI consistency."
              desc2=""
              tech="Next.js, React.js"
              isDark={isDark}
            />
          </div>

          <hr className={`my-8 border-t transition-colors duration-300 ${isDark ? 'border-gray-700' : 'border-gray-200'}`} />

          {/* Other dev projects */}
          <div className="mb-4">
            <h4 className={`text-[17px] font-bold mb-3 transition-colors duration-300 ${isDark ? 'text-white' : 'text-[#4a4a4a]'}`}>OTHER PROJECTS</h4>
            <ul className={`list-disc pl-5 space-y-2 mb-6 text-[15px] transition-colors duration-300 ${isDark ? 'text-gray-300' : 'text-[#737373]'}`}>
              <li>This Portfolio Website!</li>
              <li>More projects are currently in development and will be added soon. :)</li>
            </ul>
            <p className={`text-[15px] transition-colors duration-300 ${isDark ? 'text-gray-300' : 'text-[#737373]'}`}>
              <a href="#" className={`underline transition-colors duration-300 mr-5 ${isDark ? 'text-[#a2e1e9]' : 'text-[#ff9800]'}`}>See more on GitHub</a>
              <a href="#" className={`underline transition-colors duration-300 ${isDark ? 'text-[#a2e1e9]' : 'text-[#ff9800]'}`}>See more on LinkedIn</a>
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}
