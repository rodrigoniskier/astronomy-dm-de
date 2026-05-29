"use client"
import React from 'react';
import { Equation } from '@/src/components/science/ScienceComponents';

export default function Equations() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <div className="mb-12">
        <h1 className="text-4xl font-display font-bold text-white mb-4">Core Equations</h1>
        <p className="text-xl text-slate-400">Interactive repository of the underlying mathematics. Click any equation for a deep dive.</p>
      </div>

      <div className="space-y-12">
        <section>
          <h2 className="text-xl font-semibold text-blue-500 mb-4">Thermodynamic Principle</h2>
          <Equation 
            math="\mathcal{L}_{\mathrm{dark}} = -s_{\mathrm{dark}} + \sum_A \frac{\partial s_{\mathrm{dark}}}{\partial(\partial_0\Phi^A)} \partial_0\Phi^A"
            data={{
              title: "Legendre Transform of Entropy",
              plainLanguage: "This equation shows how you turn an idea about entropy (disorder) into a rule for how fields must behave in physics (a Lagrangian).",
              whyChosen: "It mathematically formalizes the selection principle. Instead of just guessing a theory, the author demands it emerges from maximizing entropy on horizons.",
              variables: [
                { symbol: "\\mathcal{L}_{dark}", meaning: "Lagrangian Density" },
                { symbol: "s_{dark}", meaning: "Entropy Density" },
                { symbol: "\\Phi^A", meaning: "Various fields in the theory" }
              ]
            }}
          />
        </section>

        <section>
          <h2 className="text-xl font-semibold text-blue-500 mb-4">The Unified Lagrangian</h2>
          <Equation 
            math="\mathcal{L}_{\mathrm{dark}} = -\frac{1}{4} F^a_{\mu\nu} F^{a\mu\nu} + (D_\mu\Phi)^\dagger(D^\mu\Phi) + \partial_\mu S^* \partial^\mu S - V(\Phi, S)"
            data={{
              title: "Yang-Mills-Higgs Dark Sector",
              plainLanguage: "The master equation of the model unifying a dark force (SU(2)) with a global symmetry (U(1)). Everything else derives from this single line.",
              variables: [
                { symbol: "\\mathcal{L}_{dark}", meaning: "Lagrangian Density" },
                { symbol: "F^a_{\mu\nu}", meaning: "Gauge field strength" },
                { symbol: "\\Phi", meaning: "SU(2) Doublet" },
                { symbol: "S", meaning: "U(1) Singlet" },
                { symbol: "V(\\Phi, S)", meaning: "Potential energy function" }
              ]
            }}
          />
        </section>

        <section>
          <h2 className="text-xl font-semibold text-blue-500 mb-4">Scalar Potential Breakdown</h2>
          <Equation 
            math="V(\Phi, S) = \frac{\lambda_\Phi}{4} \left( |\Phi|^2 - \frac{v_\Phi^2}{2} \right)^2 + \frac{\lambda_S}{4} \left( |S|^2 - \frac{v_S^2}{2} \right)^2 + V_0 + \mu^4 \left[ 1 - \cos \left( \frac{\theta}{f} \right) \right]"
            data={{
              title: "The Symmetry Breaking Potential",
              plainLanguage: "This equation determines 'when' and 'how' the symmetries break. It's like describing the precise temperatures and shapes at which water freezes.",
              researchNote: "The explicit breaking parameter \mu^4 gives the pseudo-Goldstone a mass, while V_0 is tuned exactly to the late-time vacuum energy.",
              variables: [
                { symbol: "v_\\Phi", meaning: "SU(2) breaking scale", detailed: "Sets the Dark Matter mass. ~1-10 TeV." },
                { symbol: "v_S", meaning: "U(1) breaking scale", detailed: "Sets the global string network scale. ~10^13 GeV." },
                { symbol: "\\theta", meaning: "Pseudo-Goldstone angle", detailed: "This field rolls and acts as Quintessence (Dark Energy)." }
              ]
            }}
          />
        </section>
      </div>
    </div>
  );
}
