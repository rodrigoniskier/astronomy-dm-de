"use client"
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import ReactMarkdown from 'react-markdown';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import { cn } from '@/src/lib/utils';

interface VariableHoverProps {
  symbol: string;
  meaning: string;
  units?: string;
  deepExplanation?: string;
  className?: string;
}

export function VariableHover({ symbol, meaning, units, deepExplanation, className }: VariableHoverProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div 
      className={cn("relative inline-block", className)}
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <span className="text-blue-400 cursor-help border-b border-blue-400/30 hover:border-blue-400 border-dashed transition-colors">
        <span className="inline-block">
          <ReactMarkdown remarkPlugins={[remarkMath]} rehypePlugins={[rehypeKatex]}>
            {`$${symbol}$`}
          </ReactMarkdown>
        </span>
      </span>
      
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 5, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 5, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-64 p-4 rounded-xl bg-[#0a0a0a] border border-slate-800 shadow-2xl z-50 pointer-events-none"
          >
            <div className="font-bold text-white text-sm mb-1">{meaning}</div>
            {units && (
              <div className="text-xs text-slate-500 font-mono mb-2 bg-slate-900 px-2 py-0.5 rounded inline-block">
                {units}
              </div>
            )}
            {deepExplanation && (
              <div className="text-xs text-slate-400 leading-relaxed">
                {deepExplanation}
              </div>
            )}
            {/* simple triangle arrow logic */}
            <div className="absolute top-full left-1/2 -translate-x-1/2 border-[6px] border-transparent border-t-slate-800"></div>
            <div className="absolute top-full left-1/2 -translate-x-1/2 border-[5px] border-transparent border-t-[#0a0a0a] mt-[-1px]"></div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
