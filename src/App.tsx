import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Layout } from './components/ui/Layout';
import { LearningLevelProvider } from './context/LearningLevelContext';
import { ExplainerProvider } from './components/science/ScienceComponents';
import { Home } from './pages/Home';
import { TheModel } from './pages/TheModel';
import { Predictions } from './pages/Predictions';
import { Equations } from './pages/Equations';

function PlaceholderPage({ title }: { title: string }) {
  return (
    <div className="container mx-auto px-4 py-24 text-center">
      <h2 className="text-3xl font-display font-bold text-white mb-4">{title}</h2>
      <p className="text-slate-400 max-w-lg mx-auto">This section is currently being expanded. Check out "The Model", "Predictions", or "Equations" for constructed interactive views based on the core paper.</p>
    </div>
  );
}

export default function App() {
  return (
    <LearningLevelProvider>
      <ExplainerProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="the-model" element={<TheModel />} />
              <Route path="predictions" element={<Predictions />} />
              <Route path="equations" element={<Equations />} />
              <Route path="roadmap" element={<PlaceholderPage title="Research Roadmap" />} />
              <Route path="foundations" element={<PlaceholderPage title="Foundations of Cosmology" />} />
              <Route path="*" element={<PlaceholderPage title="Content Coming Soon" />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </ExplainerProvider>
    </LearningLevelProvider>
  );
}
