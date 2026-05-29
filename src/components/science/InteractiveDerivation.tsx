"use client"
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '@/src/lib/utils';
import ReactMarkdown from 'react-markdown';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';

interface InteractiveDerivationProps {
  modeA: string; // Conceptual
  modeB: string; // Mathematical
  modeC: string; // Research
}

export function InteractiveDerivation({ modeA, modeB, modeC }: InteractiveDerivationProps) {
  const [activeTab, setActiveTab] = useState<'A' | 'B' | 'C'>('A');

  return (
    <div className="border border-slate-800 rounded-xl overflow-hidden bg-[#0a0a0a] my-6">
      <div className="flex border-b border-slate-800 bg-[#0d0d0d]">
        <button
          onClick={() => setActiveTab('A')}
          className={cn(
            "flex-1 py-3 text-xs font-bold uppercase tracking-widest transition-colors",
            activeTab === 'A' ? "text-blue-400 border-b-2 border-blue-500" : "text-slate-500 hover:text-slate-300 hover:bg-slate-900/50"
          )}
        >
          Conceptual
        </button>
        <button
          onClick={() => setActiveTab('B')}
          className={cn(
            "flex-1 py-3 text-xs font-bold uppercase tracking-widest transition-colors border-l border-r border-slate-800",
            activeTab === 'B' ? "text-blue-400 border-b-2 border-blue-500" : "text-slate-500 hover:text-slate-300 hover:bg-slate-900/50"
          )}
        >
          Mathematical
        </button>
        <button
          onClick={() => setActiveTab('C')}
          className={cn(
            "flex-1 py-3 text-xs font-bold uppercase tracking-widest transition-colors",
            activeTab === 'C' ? "text-blue-400 border-b-2 border-blue-500" : "text-slate-500 hover:text-slate-300 hover:bg-slate-900/50"
          )}
        >
          Research
        </button>
      </div>

      <div className="p-6 relative min-h-[150px]">
        <AnimatePresence mode="wait">
          {activeTab === 'A' && (
            <motion.div
              key="A"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="prose prose-invert prose-p:text-slate-300 max-w-none text-sm leading-relaxed"
            >
              <ReactMarkdown remarkPlugins={[remarkMath]} rehypePlugins={[rehypeKatex]}>{modeA}</ReactMarkdown>
            </motion.div>
          )}
          {activeTab === 'B' && (
            <motion.div
              key="B"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="prose prose-invert prose-p:text-slate-300 max-w-none text-sm leading-relaxed"
            >
              <ReactMarkdown remarkPlugins={[remarkMath]} rehypePlugins={[rehypeKatex]}>{modeB}</ReactMarkdown>
            </motion.div>
          )}
          {activeTab === 'C' && (
            <motion.div
              key="C"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="prose prose-invert prose-p:text-slate-300 max-w-none text-sm leading-relaxed font-mono"
            >
              <ReactMarkdown remarkPlugins={[remarkMath]} rehypePlugins={[rehypeKatex]}>{modeC}</ReactMarkdown>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
