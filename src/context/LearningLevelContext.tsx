import React, { createContext, useContext, useState, ReactNode } from 'react';

export type LearningLevel = 'Beginner' | 'Student' | 'Researcher';

interface LearningLevelContextType {
  level: LearningLevel;
  setLevel: (level: LearningLevel) => void;
}

const LearningLevelContext = createContext<LearningLevelContextType | undefined>(undefined);

export function LearningLevelProvider({ children }: { children: ReactNode }) {
  const [level, setLevel] = useState<LearningLevel>('Beginner');
  return (
    <LearningLevelContext.Provider value={{ level, setLevel }}>
      {children}
    </LearningLevelContext.Provider>
  );
}

export function useLearningLevel() {
  const context = useContext(LearningLevelContext);
  if (context === undefined) {
    throw new Error('useLearningLevel must be used within a LearningLevelProvider');
  }
  return context;
}
