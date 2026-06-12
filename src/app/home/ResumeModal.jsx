import React, { useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, FileText } from 'lucide-react';
import { useSound } from './useSound';
import { personalInfo } from '../config';

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
          <div className="flex-1 overflow-hidden bg-[#525659]">
            {/* PDF Viewer */}
            <iframe
              src={`${personalInfo.resume}#view=FitH&toolbar=0&navpanes=0`}
              className="w-full h-full min-h-[75vh] border-0 outline-none"
              title="Resume PDF"
            />
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
