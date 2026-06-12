import React, { useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, FileText } from 'lucide-react';
import { useSound } from './useSound';

export default function ResumeModal({ isDark, onClose }) {
  const { playSound } = useSound();
  const resumeRef = useRef(null);
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
      >
        {/* Backdrop */}
        <div
          className="absolute inset-0 bg-black/40 backdrop-blur-sm"
          onClick={() => { playSound('close_window'); onClose(); }}
        />

        {/* Modal Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 10 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className={`relative w-full max-w-4xl max-h-[90vh] flex flex-col rounded-2xl shadow-2xl overflow-hidden border ${isDark ? 'bg-[#172637] border-white/10' : 'bg-[#f7f9fc] border-white/80'
            }`}
        >
          {/* Header */}
          <div className={`flex items-center justify-between px-6 py-4 border-b ${isDark ? 'border-white/10 bg-[#0f1720]/80' : 'border-gray-200 bg-white/80'
            } backdrop-blur-md shrink-0`}>
            <div className="flex items-center gap-3">
              <div className={`p-2 rounded-lg ${isDark ? 'bg-[#20364a]' : 'bg-[#eef5fa]'}`}>
                <FileText className={`w-5 h-5 ${isDark ? 'text-[#a2e1e9]' : 'text-[#3c748a]'}`} />
              </div>
              <h2 className={`font-semibold text-lg tracking-tight ${isDark ? 'text-white' : 'text-gray-900'}`}>
                Resume Preview
              </h2>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => { playSound('close_window'); onClose(); }}
                className={`p-2 rounded-full transition-colors ${isDark ? 'hover:bg-white/10 text-gray-400 hover:text-white' : 'hover:bg-black/5 text-gray-500 hover:text-gray-900'
                  }`}
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Scrollable Content */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-8 custom-scroll bg-black/5">
            {/* A4 Paper Wrapper */}
            <div
              className="mx-auto w-full max-w-[794px] bg-white rounded-md shadow-lg"
              style={{ minHeight: '1123px' }}
            >
              <div ref={resumeRef} className="p-8 sm:p-12 text-[#333] font-sans">
                {/* Header */}
                <header className="border-b-2 border-gray-200 pb-6 mb-6">
                  <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#1a1a1a] mb-2 uppercase">
                    Urvisha Rajeshkumar Panchal
                  </h1>
                  <h2 className="text-xl text-[#0ea5e9] font-medium mb-3">Full Stack Developer</h2>
                  <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-gray-600">
                    <span>Ahmedabad, Gujarat</span>
                    <span>•</span>
                    <a href="mailto:panchalurvisha147@gmail.com" className="hover:text-[#0ea5e9]">panchalurvisha147@gmail.com</a>
                    <span>•</span>
                    <span>9825637433</span>
                  </div>
                </header>

                {/* Profile Summary */}
                <section className="mb-8">
                  <h3 className="text-sm font-bold text-[#1a1a1a] uppercase tracking-wider mb-3 border-b border-gray-100 pb-1">Profile Summary</h3>
                  <p className="text-[14px] leading-relaxed text-gray-700">
                    Full Stack Developer with hands-on experience building ERP systems, POS platforms, CRM dashboards, HRMS applications, investment platforms, and business websites using Next.js, React.js, Node.js, Express.js, PostgreSQL, PHP, SQL, Tailwind CSS, Framer Motion, and WordPress.
                    <br /><br />
                    Experienced in developing scalable web applications, responsive user interfaces, REST API integrations, database-driven systems, admin panels, inventory management solutions, billing modules, and reporting dashboards.
                  </p>
                </section>

                {/* Technical Skills */}
                <section className="mb-8">
                  <h3 className="text-sm font-bold text-[#1a1a1a] uppercase tracking-wider mb-3 border-b border-gray-100 pb-1">Technical Skills</h3>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-[13px]">
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Frontend</h4>
                      <ul className="list-disc pl-4 text-gray-700 space-y-1">
                        <li>Next.js</li>
                        <li>React.js</li>
                        <li>JavaScript (ES6+)</li>
                        <li>HTML5 / CSS3</li>
                        <li>Tailwind CSS</li>
                        <li>Framer Motion</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Backend</h4>
                      <ul className="list-disc pl-4 text-gray-700 space-y-1">
                        <li>Node.js</li>
                        <li>Express.js</li>
                        <li>PHP</li>
                        <li>REST API</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Database</h4>
                      <ul className="list-disc pl-4 text-gray-700 space-y-1">
                        <li>PostgreSQL</li>
                        <li>MySQL</li>
                        <li>SQL</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Other Skills</h4>
                      <ul className="list-disc pl-4 text-gray-700 space-y-1">
                        <li>Git & GitHub</li>
                        <li>State Management</li>
                        <li>ERP & CRM</li>
                        <li>SEO Optimization</li>
                      </ul>
                    </div>
                  </div>
                </section>

                {/* Experience */}
                <section className="mb-8">
                  <h3 className="text-sm font-bold text-[#1a1a1a] uppercase tracking-wider mb-3 border-b border-gray-100 pb-1">Professional Experience</h3>
                  <div className="mb-4">
                    <div className="flex justify-between items-baseline mb-2">
                      <h4 className="text-[15px] font-bold text-gray-900">Full Stack Developer</h4>
                      <span className="text-sm font-medium text-gray-500">September 2025 – Present</span>
                    </div>
                    <ul className="list-disc pl-5 text-[14px] text-gray-700 space-y-1.5 leading-relaxed">
                      <li>Developed and maintained ERP, POS, CRM, and HRMS applications using Next.js, React.js, Node.js, and Express.js.</li>
                      <li>Built reusable frontend components and scalable application structures.</li>
                      <li>Designed and implemented responsive user interfaces using Tailwind CSS and Framer Motion.</li>
                      <li>Integrated REST APIs and managed application data flow across multiple business modules.</li>
                      <li>Worked with PostgreSQL and SQL databases for data management and reporting features.</li>
                      <li>Developed dashboards for sales, inventory, HR, payroll, and analytics systems.</li>
                      <li>Contributed to backend functionality and API development for enterprise applications.</li>
                    </ul>
                  </div>
                </section>

                {/* Projects */}
                <section className="mb-8">
                  <h3 className="text-sm font-bold text-[#1a1a1a] uppercase tracking-wider mb-3 border-b border-gray-100 pb-1">Highlighted Projects</h3>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-bold text-gray-900 text-[14px]">Singhai Ji Store ERP & POS System</h4>
                      <ul className="list-disc pl-5 text-[13px] text-gray-700 mt-1">
                        <li>Developed ERP modules including Inventory, Stock Transfer, HR, Payroll, GST, Billing, and Analytics.</li>
                        <li>Built customizable invoice systems supporting 80mm and A4 formats.</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 text-[14px]">GVoice CRM & HRMS</h4>
                      <ul className="list-disc pl-5 text-[13px] text-gray-700 mt-1">
                        <li>Developed login authentication flow and super admin dashboard.</li>
                        <li>Created company management and user management modules.</li>
                        <li>Contributed to employee management, attendance, leave management, and payroll related modules.</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 text-[14px]">Catalyst Software & NatureEnergy Website</h4>
                      <ul className="list-disc pl-5 text-[13px] text-gray-700 mt-1">
                        <li>Contributed to the development of an investment and financial management platform using Next.js.</li>
                        <li>Developed a complete production-ready website for NatureEnergy using Next.js and Tailwind CSS.</li>
                      </ul>
                    </div>
                  </div>
                </section>

                {/* Education */}
                <section>
                  <h3 className="text-sm font-bold text-[#1a1a1a] uppercase tracking-wider mb-3 border-b border-gray-100 pb-1">Education</h3>
                  <ul className="list-disc pl-5 text-[14px] text-gray-700 space-y-1">
                    <li><span className="font-semibold">Master of Computer Applications (MCA)</span></li>
                    <li><span className="font-semibold">Bachelor of Computer Applications (BCA)</span></li>
                  </ul>
                </section>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
