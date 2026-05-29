"use client"
import React from 'react';
import { motion } from 'motion/react';
import Link from 'next/link';
import { ArrowRight, Sparkles, BookOpen, Atom, Library } from 'lucide-react';
import { LevelContent, MarkdownBlock } from '@/src/components/science/ScienceComponents';

export default function Home() {
  return (
    <div className="flex flex-col min-h-full">
      <section className="relative pt-24 pb-32 overflow-hidden flex-1 flex flex-col justify-center">
        <div className="absolute inset-0 bg-[#0d0d0d]"></div>
        
        {/* Background Decoration */}
        <div className="absolute bottom-0 right-0 p-10 opacity-20 pointer-events-none mix-blend-screen">
           <svg width="400" height="400" viewBox="0 0 200 200">
              <circle cx="100" cy="100" r="80" fill="none" stroke="#2563eb" strokeWidth="0.5" strokeDasharray="4 4" />
              <circle cx="100" cy="100" r="50" fill="none" stroke="#2563eb" strokeWidth="1" />
              <path d="M20,100 Q100,20 180,100" stroke="#2563eb" strokeWidth="0.5" fill="none" />
           </svg>
        </div>

        <div className="container mx-auto px-4 relative z-10 max-w-4xl pt-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded border border-blue-500/20 text-blue-400 text-[10px] uppercase font-bold tracking-widest mb-8 bg-blue-900/10"
          >
            <Sparkles className="w-3 h-3" />
            <span>Interactive Cosmology Journey</span>
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-7xl font-display text-white mb-6 tracking-tight leading-tight font-light"
          >
            Understanding the <br className="hidden md:block"/> <span className="font-semibold">Dark Universe</span>
          </motion.h1>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg md:text-xl text-slate-400 mb-10 max-w-2xl font-sans"
          >
            <LevelContent 
              beginner={<p>A structural unification of Dark Matter and Dark Energy. Explore the thermodynamics of spacetime, symmetries, and the evolution of our cosmos—no matter your background.</p>}
              student={<p>Explore a Yang-Mills-Higgs dark sector model where SU(2) gauge bosons provide DM and a U(1) pseudo-Goldstone plays the role of DE, driven by a thermodynamic selection principle.</p>}
              researcher={<p>Interactive documentation for "A thermodynamic selection principle for a Yang-Mills-Higgs dark sector: structural unification with an emergent order parameter."</p>}
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center gap-4"
          >
            <Link 
              href="/the-model" 
              className="px-8 py-3.5 bg-blue-600 hover:bg-blue-500 text-white rounded font-bold transition-colors flex items-center gap-2 w-full sm:w-auto justify-center text-sm tracking-wide"
            >
              Explore the Model
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link 
              href="/foundations" 
              className="px-8 py-3.5 bg-slate-900 hover:bg-slate-800 text-white rounded font-medium transition-colors flex items-center gap-2 w-full sm:w-auto justify-center border border-slate-700 text-sm tracking-wide"
            >
              <BookOpen className="w-4 h-4 text-slate-400" />
              Foundations
            </Link>
          </motion.div>
        </div>
      </section>

      <section className="py-20 bg-[#0a0a0a] relative z-10 border-t border-slate-800">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid md:grid-cols-3 gap-8">
            <FeatureCard 
              icon={<Atom className="w-6 h-6 text-blue-400" />}
              title="Interactive Equations"
              desc="Click any equation to instantly understand its symbols, history, and physical intuition."
            />
            <FeatureCard 
              icon={<Library className="w-6 h-6 text-slate-400" />}
              title="Adaptive Content"
              desc="Three layers of depth. Toggle between Citizen, Student, and Researcher levels anytime."
            />
            <FeatureCard 
              icon={<Sparkles className="w-6 h-6 text-blue-400" />}
              title="Falsifiable Predictions"
              desc="Explore testable signatures for DESI, Euclid, and LISA through interactive parameter spaces."
            />
          </div>
        </div>
      </section>
    </div>
  );
}

function FeatureCard({ icon, title, desc }: { icon: React.ReactNode, title: string, desc: string }) {
  return (
    <div className="p-8 rounded-2xl bg-[#0d0d0d] border border-slate-800 hover:border-slate-700 transition">
      <div className="w-12 h-12 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center mb-6">
        {icon}
      </div>
      <h3 className="text-lg font-semibold text-white mb-3 tracking-tight">{title}</h3>
      <p className="text-slate-400 leading-relaxed text-sm">{desc}</p>
    </div>
  )
}
