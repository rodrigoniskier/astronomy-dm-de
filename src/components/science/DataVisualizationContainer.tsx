"use client"
import React, { useRef, useEffect, useState } from 'react';
import { cn } from '@/src/lib/utils';
import { Maximize2, Minimize2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface DataVisualizationContainerProps {
  title: string;
  description?: string;
  className?: string;
  aspectRatio?: 'square' | 'video' | 'wide' | 'auto';
  children: (dimensions: { width: number, height: number }) => React.ReactNode;
}

export function DataVisualizationContainer({ 
  title, 
  description, 
  className,
  aspectRatio = 'video',
  children 
}: DataVisualizationContainerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    const observer = new ResizeObserver((entries) => {
      if (entries[0]) {
        const { width, height } = entries[0].contentRect;
        setDimensions({ width, height });
      }
    });

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, [isFullscreen]);

  const toggleFullscreen = () => setIsFullscreen(!isFullscreen);

  const aspectClasses = {
    'square': 'aspect-square',
    'video': 'aspect-video',
    'wide': 'aspect-[21/9]',
    'auto': 'h-full min-h-[400px]'
  };

  const VisualizerContent = (
    <div className={cn(
      "bg-[#0a0a0a] border border-slate-800 rounded-xl overflow-hidden flex flex-col transition-all duration-300",
      isFullscreen ? "fixed inset-4 z-[100] shadow-2xl" : cn(className)
    )}>
      <div className="flex items-center justify-between px-4 py-3 border-b border-slate-800 bg-[#0d0d0d]">
        <div>
          <h3 className="text-sm font-semibold text-white tracking-tight">{title}</h3>
          {description && <p className="text-[10px] text-slate-500 uppercase tracking-widest mt-0.5">{description}</p>}
        </div>
        <button 
          onClick={toggleFullscreen}
          className="p-1.5 text-slate-400 hover:text-white bg-slate-900 rounded hover:bg-slate-800 transition-colors"
          title={isFullscreen ? "Exit Fullscreen" : "Fullscreen"}
        >
          {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
        </button>
      </div>
      
      <div 
        ref={containerRef} 
        className={cn("flex-1 relative w-full", !isFullscreen && aspectClasses[aspectRatio])}
      >
        {dimensions.width > 0 && dimensions.height > 0 && (
          <div className="absolute inset-0 overflow-hidden">
            {children({ width: dimensions.width, height: dimensions.height })}
          </div>
        )}
      </div>
    </div>
  );

  return (
    <>
      {!isFullscreen && VisualizerContent}
      
      {/* Fullscreen Overlay */}
      <AnimatePresence>
        {isFullscreen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[90] bg-black/80 backdrop-blur-sm"
          />
        )}
      </AnimatePresence>
      <AnimatePresence>
        {isFullscreen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ type: "spring", bounce: 0, duration: 0.3 }}
            className="fixed inset-4 z-[100]"
          >
             {VisualizerContent}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
