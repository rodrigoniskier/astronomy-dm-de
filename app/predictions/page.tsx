"use client"
import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, Legend, ResponsiveContainer } from 'recharts';
import { useLearningLevel } from '@/src/context/LearningLevelContext';

// Simulated data based on the paper's integration curves
const data = Array.from({ length: 100 }, (_, i) => {
  const z = 10 - i * 0.1; // redshift from 10 to 0
  
  // Model w(z) crossover approximated by a sigmoid
  const crossover_z = 0.8;
  const steepness = 2;
  const w_model = -1 + 1 / (1 + Math.exp(-steepness * (z - crossover_z)));
  
  // Lambda CDM constant -1
  const w_lcdm = -1;

  // Dark fractions
  const omega_dm = 1 / (1 + Math.exp(-steepness * (crossover_z - z)));
  const omega_de = 1 - omega_dm;

  return {
    z: Number(z.toFixed(2)),
    w_model,
    w_lcdm,
    omega_dm: omega_dm * 0.83, // Assuming Omega_m ~ 0.31 total, with baryonic matter separate
    omega_de: omega_de * 0.98, 
  };
}).reverse();

export default function Predictions() {
  const { level } = useLearningLevel();

  return (
    <div className="container mx-auto px-4 py-12 max-w-5xl">
       <div className="mb-12">
        <h1 className="text-4xl font-display font-bold text-white mb-4">Observational Predictions</h1>
        <p className="text-xl text-slate-400">If this model represents reality, here is what future telescopes should see.</p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        
        {/* W(Z) Crossover Graph */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
          <h2 className="text-xl font-bold text-white mb-2">The <span className="font-mono text-blue-400">w(z)</span> Crossover</h2>
          <p className="text-slate-400 text-sm mb-6 h-12">
            {level === 'Beginner' && "The 'push' of dark energy isn't constant; it turns on around redshift $z \\sim 0.8$."}
            {level === 'Student' && "The equation of state parameter transitions smoothly from $w\\approx0$ to $w\\approx-1$ as the scalar field thaws."}
            {level === 'Researcher' && "Predicted crossover from DM-dominated to vacuum-dominated phase, testable by DESI and Euclid sub-percent measurements."}
          </p>

          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 20 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                <XAxis 
                  dataKey="z" 
                  stroke="#64748b" 
                  reversed 
                  label={{ value: 'Redshift (z)', position: 'bottom', fill: '#64748b' }}
                />
                <YAxis 
                  stroke="#64748b"
                  domain={[-1.1, 0.1]}
                  label={{ value: 'Equation of State (w)', angle: -90, position: 'insideLeft', fill: '#64748b' }}
                />
                <RechartsTooltip 
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#1e293b', borderRadius: '8px' }}
                  itemStyle={{ color: '#e2e8f0' }}
                />
                <Legend verticalAlign="top" height={36} />
                <Line type="monotone" dataKey="w_model" name="Astronomy DM-DE" stroke="#8b5cf6" strokeWidth={3} dot={false} />
                <Line type="monotone" dataKey="w_lcdm" name="Standard ΛCDM" stroke="#c0caf5" strokeDasharray="5 5" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Phase Graph */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
          <h2 className="text-xl font-bold text-white mb-2">Dark Sector Density Fractions</h2>
          <p className="text-slate-400 text-sm mb-6 h-12">
            {level === 'Beginner' && "Dark matter dominates early history, gradually yielding control to dark energy."}
            {level === 'Student' && "Evolution of energy components. Note the smooth transfer of dominance."}
            {level === 'Researcher' && "Evolution curves for $\\Omega_{DM}$ and $\\Omega_{DE}$ validating standard timeline phase chronology."}
          </p>

          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 20 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                <XAxis 
                  dataKey="z" 
                  stroke="#64748b" 
                  reversed 
                />
                <YAxis 
                  stroke="#64748b"
                  domain={[0, 1]}
                />
                <RechartsTooltip 
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#1e293b', borderRadius: '8px' }}
                />
                <Legend verticalAlign="top" height={36} />
                <Line type="monotone" dataKey="omega_dm" name="Ω Dark Matter" stroke="#3b82f6" strokeWidth={3} dot={false} />
                <Line type="monotone" dataKey="omega_de" name="Ω Dark Energy" stroke="#f59e0b" strokeWidth={3} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>

      <div className="mt-12 bg-slate-900 border border-slate-800 rounded-2xl p-8">
        <h3 className="text-2xl font-bold text-white mb-4">Small-Scale Power Suppression</h3>
        <p className="text-slate-300 leading-relaxed mb-4">
          Because the dark matter vector bosons self-interact through their non-Abelian gauge force, they transfer momentum. This leads to a cutoff in structural formation at small scales. 
        </p>
        <div className="p-4 bg-slate-800/50 rounded-lg border border-slate-700/50 font-mono text-emerald-400">
          Target suppression scale: k_* ≈ 1.2 h Mpc^-1
        </div>
      </div>
    </div>
  );
}
