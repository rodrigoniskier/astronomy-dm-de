"use client"
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/src/lib/utils';
import ReactMarkdown from 'react-markdown';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';

interface GlossaryTermProps {
  term: string;
  short: string;
  medium?: string;
  deep?: string;
}

export function GlossaryTerm({ term, short, medium, deep }: GlossaryTermProps) {
  const [expanded, setExpanded] = useState<0 | 1 | 2>(0); // 0 = short, 1 = medium, 2 = deep
  
  const hasMore = medium || deep;
  
  const toggleExpand = () => {
    if (expanded === 0 && medium) setExpanded(1);
    else if (expanded === 1 && deep) setExpanded(2);
    else setExpanded(0);
  };

  return (
    <div className="border border-slate-800 bg-[#0d0d0d] rounded-xl overflow-hidden my-4 group transition-colors hover:border-slate-700">
      <div className="p-5">
        <h3 className="font-display font-semibold text-white text-lg mb-2">{term}</h3>
        
        <div className="text-sm text-slate-300 leading-relaxed">
          <ReactMarkdown remarkPlugins={[remarkMath]} rehypePlugins={[rehypeKatex]}>{short}</ReactMarkdown>
        </div>

        <AnimatePresence>
          {expanded >= 1 && medium && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="overflow-hidden"
            >
              <div className="pt-4 mt-4 border-t border-slate-800 text-sm text-slate-400 leading-relaxed pl-4 border-l-2 border-l-blue-500/50">
                <ReactMarkdown remarkPlugins={[remarkMath]} rehypePlugins={[rehypeKatex]}>{medium}</ReactMarkdown>
              </div>
            </motion.div>
          )}
          {expanded === 2 && deep && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="overflow-hidden"
            >
              <div className="pt-4 mt-4 border-t border-slate-800 text-sm text-slate-400 leading-relaxed pl-4 border-l-2 border-l-purple-500/50 font-mono">
                <ReactMarkdown remarkPlugins={[remarkMath]} rehypePlugins={[rehypeKatex]}>{deep}</ReactMarkdown>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {hasMore && (
          <button 
            onClick={toggleExpand}
            className="mt-4 flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-blue-500 hover:text-blue-400 transition-colors"
          >
            {expanded === 0 ? "Expand" : expanded === 1 && deep ? "Go Deeper" : "Collapse"}
            <ChevronDown className={cn("w-4 h-4 transition-transform", expanded === 2 || (expanded === 1 && !deep) ? "rotate-180" : "")} />
          </button>
        )}
      </div>
    </div>
  );
}
