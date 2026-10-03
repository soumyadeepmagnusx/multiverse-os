import React, { useState } from 'react';
import MultiverseLatticeCanvas from './MultiverseLatticeCanvas';
import IntegrityCoreFlank from './IntegrityCoreFlank';
import QuantumScanWipe from './QuantumScanWipe';
import { Scan, Sparkles, Terminal } from 'lucide-react';

export default function SpatialMultiverseView({ onOpenSynthesizer, onOpenAuditor }) {
  const [crimsonFlush, setCrimsonFlush] = useState(false);
  const [showScanWipe, setShowScanWipe] = useState(true);

  const triggerCrimsonFlush = () => {
    setCrimsonFlush(true);
    setTimeout(() => setCrimsonFlush(false), 1400);
  };

  const retriggerScan = () => {
    setShowScanWipe(false);
    setTimeout(() => setShowScanWipe(true), 50);
  };

  return (
    <div className="relative w-full h-[calc(100vh-5rem)] min-h-[700px] flex flex-col rounded-2xl overflow-hidden glass-divider shadow-2xl border border-white/10 select-none">
      
      {/* Global Quantum Scan Wipe Effect on load or retrigger */}
      {showScanWipe && <QuantumScanWipe onComplete={() => setShowScanWipe(false)} />}

      {/* Screen-wide Crimson Warning Flush (When physical laws violated) */}
      {crimsonFlush && (
        <div className="fixed inset-0 z-50 pointer-events-none bg-rose-600/30 backdrop-blur-sm crimson-flush-active flex items-center justify-center">
          <div className="bg-black/80 border-2 border-rose-500 rounded-2xl px-6 py-4 text-center font-mono shadow-2xl shadow-rose-600/50">
            <span className="text-rose-400 font-bold text-sm block animate-pulse">
              ⚠️ CRITICAL CAUSALITY SHEAR // CONSTANT DISENGAGED
            </span>
            <span className="text-xs text-rose-200 mt-1 block">
              PARADOX LEAKAGE SPREADING TO PRIME THREAD
            </span>
          </div>
        </div>
      )}

      {/* Spatial HUD Micro-Bar */}
      <div className="h-10 bg-[#040816]/80 backdrop-blur-xl border-b border-white/10 px-6 flex items-center justify-between font-mono text-[11px] text-slate-400 z-20">
        <div className="flex items-center gap-4">
          <span className="text-white font-bold flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
            SPATIAL REALITY LATTICE // v3.0-OBSIDIAN
          </span>
          <span className="text-slate-600">|</span>
          <span className="hidden md:inline text-slate-400">
            ENGINE: QUANTUM_ENTANGLEMENT_MESH
          </span>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={retriggerScan}
            title="Retrigger Quantum Laser Sweep Scan"
            className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-white/5 hover:bg-white/10 text-cyan-300 border border-cyan-500/30 transition text-[10px] font-bold"
          >
            <Scan className="w-3.5 h-3.5" />
            <span>Retrigger Quantum Scan</span>
          </button>
        </div>
      </div>

      {/* Spatial Grid: 70% Hero Lattice Canvas (Left & Center) vs 30% Integrity Core (Right) */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 overflow-hidden">
        
        {/* 1. THE HERO CANVAS (70% Screen - Center & Left Focus) */}
        <div className="lg:col-span-8 xl:col-span-8 h-full border-r border-white/10 relative overflow-hidden flex flex-col">
          <MultiverseLatticeCanvas
            onOpenSynthesizer={onOpenSynthesizer}
            onOpenAuditor={onOpenAuditor}
          />
        </div>

        {/* 2. THE LORE MONITORING FLANK (30% Screen - Right Sidebar) */}
        <div className="lg:col-span-4 xl:col-span-4 h-full bg-[#050917]/70 backdrop-blur-2xl relative overflow-y-auto flex flex-col">
          <IntegrityCoreFlank
            onTriggerCrimsonFlush={triggerCrimsonFlush}
          />
        </div>

      </div>

    </div>
  );
}
