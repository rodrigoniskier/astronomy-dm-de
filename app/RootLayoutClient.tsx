"use client"
import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useLearningLevel, LearningLevel } from '@/src/context/LearningLevelContext';
import { BookOpen, GraduationCap, Microscope, Menu, X, Atom } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '@/src/lib/utils';
import { ExplainerProvider } from '@/src/components/science/ScienceComponents';

const links = [
  { to: '/', label: 'Home' },
  { to: '/roadmap', label: 'Roadmap' },
  { to: '/foundations', label: 'Foundations' },
  { to: '/the-model', label: 'The Model' },
  { to: '/equations', label: 'Equations' },
  { to: '/predictions', label: 'Predictions' },
];

export function RootLayoutClient({ children }: { children: React.ReactNode }) {
  const { level, setLevel } = useLearningLevel();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  const pathname = usePathname();

  const levels: { id: LearningLevel; icon: React.ReactNode; desc: string }[] = [
    { id: 'Beginner', icon: <BookOpen className="w-4 h-4" />, desc: 'Curious Citizen' },
    { id: 'Student', icon: <GraduationCap className="w-4 h-4" />, desc: 'Astronomy Student' },
    { id: 'Researcher', icon: <Microscope className="w-4 h-4" />, desc: 'Senior Researcher' },
  ];

  return (
    <ExplainerProvider>
      <div className="min-h-screen flex flex-col bg-[#0d0d0d] text-[#f8fafc] font-sans">
        <header className="h-16 border-b border-slate-800 flex items-center justify-between px-6 bg-[#0a0a0a] z-50 sticky top-0 w-full">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-blue-600 rounded-sm flex items-center justify-center font-bold text-xs text-white">DM</div>
            <span className="font-semibold tracking-tight text-lg text-white hidden sm:inline-block">
              Astronomy-DM-DE <span className="text-slate-500 font-normal ml-2">Portal</span>
            </span>
            <span className="font-semibold tracking-tight text-lg text-white sm:hidden">
              DM-DE
            </span>
          </div>

          <nav className="hidden md:flex items-center space-x-6 text-xs font-medium text-slate-400">
            {links.map((link) => {
              const isActive = pathname === link.to;
              return (
                <Link
                  key={link.to}
                  href={link.to}
                  className={cn(
                    'hover:text-white cursor-pointer transition-colors',
                    isActive ? 'text-white underline underline-offset-4 decoration-blue-500' : ''
                  )}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-6">
            <div className="hidden lg:flex bg-slate-900 p-1 rounded-lg border border-slate-800">
              {levels.map((l) => (
                <button
                  key={l.id}
                  onClick={() => setLevel(l.id)}
                  className={cn(
                    'px-4 py-1.5 text-xs font-medium rounded-md transition-all',
                    level === l.id 
                      ? 'bg-blue-600 text-white shadow-lg' 
                      : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
                  )}
                  title={l.desc}
                >
                  {l.id === 'Beginner' ? 'Citizen' : l.id}
                </button>
              ))}
            </div>

            <button 
              className="md:hidden p-2 text-slate-400 hover:text-white"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </header>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="md:hidden border-b border-slate-800 bg-[#0a0a0a] sticky top-16 z-40"
            >
              <div className="p-4 flex flex-col gap-4">
                <nav className="flex flex-col gap-2">
                  {links.map((link) => {
                    const isActive = pathname === link.to;
                    return (
                      <Link
                        key={link.to}
                        href={link.to}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className={cn(
                          'px-4 py-2 rounded-md text-sm font-medium transition-colors',
                          isActive ? 'bg-blue-600/10 text-blue-500 font-semibold' : 'text-slate-400 hover:bg-slate-800 hover:text-white'
                        )}
                      >
                        {link.label}
                      </Link>
                    )
                  })}
                </nav>
                <div className="border-t border-slate-800 pt-4">
                  <p className="text-xs text-slate-500 mb-2 px-4 uppercase tracking-wider font-bold">Learning Level</p>
                  <div className="flex flex-col gap-1">
                    {levels.map((l) => (
                      <button
                        key={l.id}
                        onClick={() => {
                          setLevel(l.id);
                          setIsMobileMenuOpen(false);
                        }}
                        className={cn(
                          'flex items-center gap-3 px-4 py-2 rounded-md text-sm font-medium transition-colors',
                          level === l.id 
                            ? 'bg-blue-600 text-white' 
                            : 'text-slate-400 hover:bg-slate-800 hover:text-white'
                        )}
                      >
                        {l.icon}
                        <div className="flex flex-col items-start">
                          <span>{l.id === 'Beginner' ? 'Citizen' : l.id}</span>
                          <span className="text-[10px] opacity-70 font-normal">{l.desc}</span>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <main className="flex-1 w-full relative flex flex-col">
          {children}
        </main>

        <footer className="h-10 bg-black border-t border-slate-900 px-6 flex items-center justify-between mt-auto">
          <div className="flex items-center space-x-4 text-[9px] text-slate-600">
            <span className="flex items-center"><span className="w-1.5 h-1.5 rounded-full bg-green-500 mr-2"></span> Vercel: Live</span>
            <span>Build: v0.8.4-alpha</span>
            <span className="hover:text-slate-400 cursor-pointer transition-colors">GitHub Repo</span>
          </div>
          <div className="text-[9px] text-slate-600 italic tracking-wide hidden sm:block">
            "Do not lower the mountain. Build a better path to the summit."
          </div>
        </footer>
      </div>
    </ExplainerProvider>
  );
}
