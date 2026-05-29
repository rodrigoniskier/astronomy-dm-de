import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Info, X, BookOpen, GraduationCap, Microscope } from 'lucide-react';
import { cn } from '../../lib/utils';
import { useLearningLevel } from '../../context/LearningLevelContext';
import ReactMarkdown from 'react-markdown';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';

// A context to manage modals globally without portal complexity for this scope
export const ExplainerContext = React.createContext<{
  openExplainer: (data: ExplainerData) => void;
  closeExplainer: () => void;
}>({
  openExplainer: () => {},
  closeExplainer: () => {},
});

export type ExplainerData = {
  title: string;
  math: string;
  plainLanguage: string;
  history?: string;
  whyChosen?: string;
  variables: { symbol: string; meaning: string; units?: string; detailed?: string }[];
  researchNote?: string;
};

export function ExplainerProvider({ children }: { children: React.ReactNode }) {
  const [data, setData] = useState<ExplainerData | null>(null);

  return (
    <ExplainerContext.Provider value={{ openExplainer: setData, closeExplainer: () => setData(null) }}>
      {children}
      <AnimatePresence>
        {data && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setData(null)}
              className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-2xl bg-[#0a0a0a] border border-slate-800 rounded-xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
            >
              <div className="p-4 sm:p-6 border-b border-slate-800 flex justify-between items-start bg-[#0d0d0d]">
                <div className="w-full">
                  <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest block mb-2">{data.title}</span>
                  <div className="my-4 py-8 bg-slate-900/50 border border-slate-800 rounded-xl overflow-x-auto text-center font-serif text-2xl custom-scrollbar text-[#f8fafc]">
                    <ReactMarkdown remarkPlugins={[remarkMath]} rehypePlugins={[rehypeKatex]}>
                      {`$$${data.math}$$`}
                    </ReactMarkdown>
                  </div>
                </div>
                <button
                  onClick={() => setData(null)}
                  className="p-2 ml-4 text-slate-400 hover:text-white bg-slate-900 rounded border border-slate-800 hover:bg-slate-800 transition"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
              <div className="p-4 sm:p-8 overflow-y-auto flex-1 space-y-8 custom-scrollbar bg-[#0d0d0d]">
                <section>
                  <h4 className="text-sm font-semibold text-accent uppercase tracking-wider mb-2">Plain Language</h4>
                  <p className="text-slate-300 leading-relaxed">{data.plainLanguage}</p>
                </section>
                
                {data.history && (
                  <section>
                    <h4 className="text-sm font-semibold text-amber-500 uppercase tracking-wider mb-2">Historical Context</h4>
                    <p className="text-slate-300 leading-relaxed">{data.history}</p>
                  </section>
                )}

                {data.whyChosen && (
                  <section>
                    <h4 className="text-sm font-semibold text-emerald-500 uppercase tracking-wider mb-2">Why Scientists Use This</h4>
                    <p className="text-slate-300 leading-relaxed">{data.whyChosen}</p>
                  </section>
                )}

                <section>
                  <h4 className="text-sm font-semibold text-blue-400 uppercase tracking-wider mb-3">Symbol Breakdown</h4>
                  <div className="space-y-3">
                    {data.variables.map((v, i) => (
                      <div key={i} className="flex gap-4 p-3 bg-slate-800/50 rounded-lg border border-slate-700/50">
                        <div className="font-mono text-accent shrink-0 w-12 text-center text-lg">
                          <ReactMarkdown remarkPlugins={[remarkMath]} rehypePlugins={[rehypeKatex]}>
                            {`$${v.symbol}$`}
                          </ReactMarkdown>
                        </div>
                        <div>
                          <p className="text-slate-200 font-medium">{v.meaning}</p>
                          {v.units && <p className="text-xs text-slate-500 mt-1 font-mono">{v.units}</p>}
                          {v.detailed && <p className="text-sm text-slate-400 mt-1">{v.detailed}</p>}
                        </div>
                      </div>
                    ))}
                  </div>
                </section>

                {data.researchNote && (
                  <section className="p-4 bg-purple-900/10 border border-purple-500/20 rounded-lg">
                    <h4 className="text-sm font-semibold text-purple-400 flex items-center gap-2 mb-2">
                      <Microscope className="w-4 h-4" /> Research Note
                    </h4>
                    <p className="text-slate-300 text-sm leading-relaxed">{data.researchNote}</p>
                  </section>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </ExplainerContext.Provider>
  );
}

export function Equation({ math, data, inline = false }: { math: string, data: ExplainerData, inline?: boolean }) {
  const { openExplainer } = React.useContext(ExplainerContext);
  
  return (
    <button
      onClick={() => openExplainer({ ...data, math })}
      className={cn(
        "group relative mx-auto transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500",
        inline ? "inline-block px-1" : "block w-full sm:w-max bg-slate-900/80 border border-slate-800 p-6 sm:p-8 rounded-2xl my-8 cursor-pointer hover:border-blue-500/50 text-left"
      )}
      title="Click to explore this equation"
    >
      {!inline && (
        <div className="flex justify-between items-start mb-4 gap-4">
          <span className="text-[10px] font-mono text-slate-500 uppercase">{data.title}</span>
          <span className="bg-blue-900/30 text-blue-400 text-[10px] px-2 py-0.5 rounded border border-blue-400/30 whitespace-nowrap uppercase">Interactive</span>
        </div>
      )}
      
      <div className={cn("pointer-events-none", inline ? "math-inline" : "text-2xl sm:text-4xl text-center py-4 sm:py-6 font-serif tracking-widest text-[#f8fafc] overflow-x-auto custom-scrollbar")}>
         <ReactMarkdown remarkPlugins={[remarkMath]} rehypePlugins={[rehypeKatex]}>
            {inline ? `$${math}$` : `$$${math}$$`}
         </ReactMarkdown>
      </div>

      {!inline && (
        <p className="text-center text-xs text-slate-500 italic mt-4">Click to decompose derivations</p>
      )}
    </button>
  );
}

export function LevelContent({ 
  beginner, 
  student, 
  researcher 
}: { 
  beginner: React.ReactNode, 
  student?: React.ReactNode, 
  researcher?: React.ReactNode 
}) {
  const { level } = useLearningLevel();

  const content = {
    Beginner: beginner,
    Student: student || beginner,
    Researcher: researcher || student || beginner
  }[level];

  return (
    <motion.div
      key={level}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="prose prose-invert prose-slate max-w-none"
    >
      {content}
    </motion.div>
  );
}

export function MarkdownBlock({ content }: { content: string }) {
  return (
    <div className="prose prose-invert prose-p:leading-relaxed prose-p:text-slate-400 prose-headings:font-display prose-headings:text-white prose-headings:font-light max-w-none prose-a:text-blue-400 hover:prose-a:text-blue-300">
       <ReactMarkdown remarkPlugins={[remarkMath]} rehypePlugins={[rehypeKatex]}>
        {content}
       </ReactMarkdown>
    </div>
  )
}
