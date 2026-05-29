import React from 'react';
import { Equation, LevelContent, MarkdownBlock } from '../components/science/ScienceComponents';
import { motion } from 'motion/react';

export function TheModel() {
  return (
    <div className="container mx-auto px-6 py-12 max-w-3xl">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mb-12">
        <nav className="flex space-x-2 text-[10px] text-blue-500 font-bold uppercase tracking-tighter mb-4">
          <span>Cosmology</span>
          <span className="text-slate-700">/</span>
          <span className="text-slate-300">The Model</span>
        </nav>
        <h1 className="text-4xl md:text-5xl font-display font-light text-white mb-6 tracking-tight">The Astronomy DM-DE Model</h1>
        <p className="text-xl text-slate-400 leading-relaxed">A thermodynamic selection principle for a Yang-Mills-Higgs dark sector.</p>
      </motion.div>

      <div className="space-y-16">
        <section>
          <h2 className="text-2xl font-semibold text-white mb-6 border-b border-slate-800 pb-3">1. The Problem with Standard Cosmology</h2>
          <LevelContent 
            beginner={
              <MarkdownBlock content={`
Most of our universe is invisible. Astronomers call these invisible parts **Dark Matter** (which pulls things together) and **Dark Energy** (which pushes the universe apart). 

In the standard model of cosmology, called $\\Lambda$CDM, these two "dark" components are completely unrelated. They are treated as two separate mysteries. This model works incredibly well to describe what we observe, but it feels incomplete. Why should the universe have two entirely different, invisible things that happen to be roughly equal in amount today?
              `} />
            }
            student={
              <MarkdownBlock content={`
The $\\Lambda$CDM model successfully fits the expansion history of the Universe but treats dark matter (DM) and dark energy (DE) as independent, non-interacting components. This leaves open deep questions about their origin and possible structural unification within a single field-theoretic framework. 

Many theoretical models have attempted to unify the dark sector (like *k-essence* or *superfluid dark matter*), but they typically postulate an *ad hoc* action or rely on fine-tuned potentials without a deeper dynamical principle.
              `} />
            }
            researcher={
              <MarkdownBlock content={`
The $\\Lambda$CDM model successfully reproduces a wide array of observations, from the CMB anisotropies to the large-scale structure. Nevertheless, it treats dark energy and dark matter as independent components, lacking structural unification. While EFTs of dark energy and coupled quintessence models can reproduce background histories, they lack a fundamental selection heuristic.

Jacobson (1995) showed the Einstein field equations can be interpreted as an equation of state $\\delta Q = T dS$. We propose extending this thermodynamic perspective: requiring the dark-sector contribution to the local entropy current be extremal on Rindler horizons to single out a class of stable, causal Lagrangians.
              `} />
            }
          />
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-white mb-6 border-b border-slate-800 pb-3">2. The Thermodynamic Selection Principle</h2>
          <LevelContent 
            beginner={
              <MarkdownBlock content={`
Imagine the universe must follow strict rules of thermodynamics—specifically, concerning entropy (or disorder). If we demand that the physics of the dark universe must produce stable, well-behaved entropy on cosmic scales, this mathematically restricts what theories are allowed.

It turns out, the simplest allowed theory involves a specific type of mathematical symmetry breaking—similar to how water freezes into ice.
              `} />
            }
            student={
              <MarkdownBlock content={`
In the thermodynamic picture of gravity, Einstein's equations arise from the Clausius relation $\\delta Q = T dS$ on local Rindler horizons. If we augment the total entropy by a dark-sector contribution, $S_{tot} = S_{BH} + S_{dark}$, and require $\\delta S_{tot} = 0$, we can map this to a Lagrangian.

This acts as a *selection heuristic*. To avoid ghosts (particles with negative energy) and instabilities, the simplest surviving choice is a Yang-Mills-Higgs structure.
              `} />
            }
          />

          <Equation 
            math="S_{tot} = \frac{A}{4G} + S_{dark}"
            data={{
              title: "Total Horizon Entropy",
              plainLanguage: "The total entropy (disorder) of a region of space is the sum of the entropy of the gravitational horizon itself plus the entropy of the dark sector fields inside it.",
              whyChosen: "This is the core starting point of the paper. By demanding that variations of this total entropy are zero (an extremal principle), the author derives the allowed physics equations for the dark universe.",
              variables: [
                { symbol: "S_{tot}", meaning: "Total Entropy" },
                { symbol: "A", meaning: "Area of the local causal (Rindler) horizon", units: "m²" },
                { symbol: "G", meaning: "Newton's Gravitational Constant" },
                { symbol: "S_{dark}", meaning: "Entropy contribution from dark sector fields" }
              ]
            }}
          />
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-white mb-6 border-b border-slate-800 pb-3">3. The Unified Dark Sector Lagrangian</h2>
          
          <p className="text-slate-400 mb-6 leading-relaxed">
            The minimal choice that respects these thermodynamic constraints is a model with a local $\mathrm{SU}(2)_D$ gauge symmetry and a global $\mathrm{U}(1)_{PQ}$ symmetry. The dark sector is governed by this Lagrangian:
          </p>

          <Equation 
            math="\mathcal{L}_{\mathrm{dark}} = -\frac{1}{4} F^a_{\mu\nu} F^{a\mu\nu} + (D_\mu\Phi)^\dagger(D^\mu\Phi) + \partial_\mu S^* \partial^\mu S - V(\Phi, S)"
            data={{
              title: "The Unified Dark Sector Lagrangian",
              plainLanguage: "This master equation represents the entire dark universe. It contains terms for force-carrying particles (like dark light), and two 'Higgs-like' fields that give these particles mass and energy.",
              history: "This is the standard form of a Yang-Mills-Higgs theory, originally developed in the 1950s and 60s for the Standard Model of particle physics. Here, it is applied exclusively to a hidden 'dark' copy of those forces.",
              variables: [
                { symbol: "\\mathcal{L}_{dark}", meaning: "Dark Sector Lagrangian Density", detailed: "The fundamental function that dictates the dynamics of the system." },
                { symbol: "F^a_{\mu\nu}", meaning: "Dark SU(2) Gauge Field Strength Tensor", detailed: "Describes the 'dark light' or dark vector bosons." },
                { symbol: "\\Phi", meaning: "Complex Scalar Doublet", detailed: "A Higgs-like field that breaks the SU(2) symmetry, giving mass to the vector bosons to create Dark Matter." },
                { symbol: "S", meaning: "Complex Scalar Singlet", detailed: "Breaks a global U(1) symmetry. Its phase becomes the pseudo-Goldstone boson (Dark Energy)." },
                { symbol: "V(\\Phi, S)", meaning: "Scalar Potential", detailed: "Determines how the fields interact and break the symmetries." }
              ]
            }}
          />

          <LevelContent 
            beginner={
              <MarkdownBlock content={`
What this equation means in simple terms:

1. **Dark Matter Emerges:** One part of the field freezes out, creating heavy, slow-moving particles. Because they don't interact with visible light, we call them Dark Matter.
2. **Dark Energy Emerges:** Another part of the field rolls very slowly, acting like a smooth, stretched-out energy giving space a push. This is Dark Energy.

They both come from exactly the same underlying mathematical structure!
              `} />
            }
            student={
              <MarkdownBlock content={`
*   **The SU(2) Sector:** Breaking $\\mathrm{SU}(2)_D$ gives mass to three vector bosons $W^a$. These are cosmologically stable due to a residual custodial $\\mathrm{SO}(3)_C$ symmetry, acting as excellent Cold Dark Matter candidates.
*   **The U(1) Sector:** Breaking the global $\\mathrm{U}(1)_{PQ}$ results in a Goldstone boson. A small explicit breaking gives it a tiny mass, making it a *pseudo-Goldstone boson* $\\theta$. This field rolls slowly, acting as Quintessence (Dark Energy).
              `} />
            }
            researcher={
              <MarkdownBlock content={`
The potential is defined as:
$$ V(\\Phi, S) = \frac{\\lambda_\\Phi}{4} \\left( |\\Phi|^2 - \frac{v_\\Phi^2}{2} \\right)^2 + \frac{\\lambda_S}{4} \\left( |S|^2 - \frac{v_S^2}{2} \\right)^2 + V_0 + \\mu^4 \\left[ 1 - \\cos \\left( \frac{\\theta}{f} \\right) \\right] $$

Where $v_\\Phi \\sim 1\\text{-}10\\text{ TeV}$ sets the DM mass, and $v_S \\sim 10^{13}\\text{-}10^{14}\\text{ GeV}$ sets the PQ scale. The massive vectors $m_W = gv_\\Phi/2$ are protected by an unexpected tree-level residual $\\mathrm{SO}(3)_C$ symmetry. For $g \\sim 0.7$ and $m_W = 3\\text{ TeV}$, the thermal freeze-out naturally yields $\\Omega_{DM}h^2 \\approx 0.12$.
              `} />
            }
          />
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-white mb-6 border-b border-slate-800 pb-3">4. The Crossover: A Falsifiable Prediction</h2>
          
          <MarkdownBlock content={`
Because Dark Matter and Dark Energy are linked by this shared thermodynamic history, the model makes a highly specific prediction about how the universe expands.

The equation of state parameter, $w$, tells us what the dominant energy in the universe acts like. For pure matter, $w=0$. For a pure cosmological constant, $w=-1$. 
          `} />

          <Equation 
            math="w_{\mathrm{dark}}(z) = \frac{p_\theta}{\rho_W + \rho_{str} + \rho_\theta}"
            data={{
              title: "Dark Sector Equation of State",
              plainLanguage: "This ratio tracks how the 'pushiness' of the dark sector changes over time. When dark matter dominates, it is zero. When dark energy dominates, it drops to -1.",
              whyChosen: "This predicts a distinctive 'curve' or crossover in observations, rather than a flat line. If the DESI or Euclid telescopes observe this exact curve, it's strong evidence for the model.",
              variables: [
                { symbol: "w_{\mathrm{dark}}", meaning: "Equation of State Parameter" },
                { symbol: "z", meaning: "Redshift (time in the past)" },
                { symbol: "p_\\theta", meaning: "Pressure of the pseudo-Goldstone field (DE)" },
                { symbol: "\\rho_W", meaning: "Energy density of Vector Dark Matter" },
                { symbol: "\\rho_\\theta", meaning: "Energy density of the DE field" }
              ]
            }}
          />

          <p className="mt-6 text-slate-400">
            For typical parameters, the model predicts the effective equation of state smoothly crosses from $w \\approx 0$ to $w \\approx -1$ at a redshift of $z_c \\sim 0.8$.
          </p>
        </section>

      </div>
    </div>
  );
}
