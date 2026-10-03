import React, { useState, useEffect } from 'react';
import { Activity, ShieldAlert, Cpu, Layers, AlertCircle, ToggleLeft, ToggleRight, Radio, RefreshCw } from 'lucide-react';

export default function IntegrityCoreFlank({ onTriggerCrimsonFlush }) {
  // Waveform Spectrum Visualizer Bars state
  const [frequencies, setFrequencies] = useState(() => 
    Array.from({ length: 24 }, () => Math.floor(Math.random() * 65) + 20)
  );

  // Fluctuating Character Invariance
  const [invariance, setInvariance] = useState({
    kaelen: { val: 78, tag: 'FRACTURED', color: '#FF9F1C' },
    morgana: { val: 96, tag: 'STABLE', color: '#10B981' },
    cypher: { val: 42, tag: 'ERASE RISK', color: '#EF4444' }
  });

  // Immutable Physical Laws toggles
  const [laws, setLaws] = useState([
    { id: 'l1', name: 'Entropy Rate Constant', value: true, key: 'ΔS/dt = Const' },
    { id: 'l2', name: 'Causality Flow Direction', value: true, key: 'Forward Lightcone' },
    { id: 'l3', name: 'Thermodynamics Cohesion', value: true, key: 'Conservation Eq.' },
    { id: 'l4', name: 'Information Conservation', value: true, key: 'No-Hiding Theorem' }
  ]);

  // Live-rendering audio waveform simulation
  useEffect(() => {
    const interval = setInterval(() => {
      setFrequencies(prev => prev.map(() => Math.floor(Math.random() * 75) + 15));
    }, 180);
    return () => clearInterval(interval);
  }, []);

  // Micro-fluctuation of psychological invariance
  useEffect(() => {
    const interval = setInterval(() => {
      setInvariance(prev => ({
        kaelen: { ...prev.kaelen, val: Math.min(90, Math.max(65, prev.kaelen.val + (Math.random() * 4 - 2))) },
        morgana: { ...prev.morgana, val: Math.min(99, Math.max(92, prev.morgana.val + (Math.random() * 2 - 1))) },
        cypher: { ...prev.cypher, val: Math.min(55, Math.max(35, prev.cypher.val + (Math.random() * 6 - 3))) }
      }));
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  // Toggle Immutable Law
  const handleToggleLaw = (id) => {
    setLaws(prev => prev.map(l => {
      if (l.id === id) {
        const nextVal = !l.value;
        if (!nextVal && onTriggerCrimsonFlush) {
          onTriggerCrimsonFlush(); // Trigger screen-wide red data flush!
        }
        return { ...l, value: nextVal };
      }
      return l;
    }));
  };

  return (
    <div className="w-full h-full flex flex-col justify-between p-6 space-y-5 font-mono select-none">
      
      {/* Flank Header */}
      <div className="flex items-center justify-between border-b border-white/10 pb-3">
        <div className="flex items-center gap-2">
          <Cpu className="w-4 h-4 text-[#00E5FF]" />
          <h3 className="text-xs font-bold tracking-widest text-white uppercase">
            // THE INTEGRITY CORE
          </h3>
        </div>
        <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
          PARSING REALITY
        </span>
      </div>

      {/* 1. CHRONOLOGY DESYNC MONITOR (Audio-Waveform Spectrum Visualizer) */}
      <div className="glass-blade rounded-2xl p-4 border border-white/10 space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
            <Activity className="w-3.5 h-3.5 text-[#00E5FF]" />
            Chronology Desync Spectrum
          </span>
          <span className="text-[9px] text-cyan-400 font-bold">
            44.1 kHz REALITY PARSER
          </span>
        </div>

        {/* Dynamic Spectrum Waveform Bars */}
        <div className="h-20 bg-black/60 rounded-xl p-2 flex items-end justify-between gap-1 border border-white/5">
          {frequencies.map((val, idx) => {
            const isPeak = val > 70;
            return (
              <div
                key={idx}
                className="flex-1 rounded-t-sm transition-all duration-150 relative overflow-hidden"
                style={{
                  height: `${val}%`,
                  background: isPeak 
                    ? 'linear-gradient(to top, #00E5FF, #EF4444)' 
                    : 'linear-gradient(to top, rgba(0,229,255,0.4), #00E5FF)',
                  boxShadow: isPeak ? '0 0 8px rgba(239, 68, 68, 0.8)' : 'none'
                }}
              />
            );
          })}
        </div>

        <div className="flex justify-between text-[9px] text-slate-500">
          <span>0 Hz (Canonical)</span>
          <span className="text-cyan-400 font-bold">NARRATIVE RESIDUAL PEAK: 8.9 dB</span>
          <span>22 kHz (Entropy)</span>
        </div>
      </div>

      {/* 2. PSYCHOLOGICAL INVARIANCE MATRIX (Vertical Cohesion Bars) */}
      <div className="glass-blade rounded-2xl p-4 border border-white/10 space-y-3 flex-1 flex flex-col justify-between">
        <div className="flex items-center justify-between">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
            <Layers className="w-3.5 h-3.5 text-[#8B5CF6]" />
            Psychological Invariance Matrix
          </span>
          <span className="text-[9px] text-purple-400">
            SOUL IDENTITY VECTOR
          </span>
        </div>

        {/* Vertical Progress Bars Grid */}
        <div className="grid grid-cols-3 gap-3 py-2 flex-1 items-end">
          
          {/* Character 1: Kaelen Vex */}
          <div className="bg-black/60 p-2.5 rounded-xl border border-white/5 flex flex-col items-center justify-between h-full space-y-2">
            <span className="text-[10px] font-bold text-slate-300">Kaelen Vex</span>
            <div className="w-4 flex-1 bg-slate-900 rounded-full p-0.5 flex flex-col justify-end overflow-hidden">
              <div
                className="w-full rounded-full transition-all duration-500"
                style={{
                  height: `${invariance.kaelen.val}%`,
                  background: 'linear-gradient(to top, #FF9F1C, #FBBF24)',
                  boxShadow: '0 0 10px rgba(255, 159, 28, 0.6)'
                }}
              />
            </div>
            <span className="text-[10px] font-bold text-slate-200">
              {Math.round(invariance.kaelen.val)}%
            </span>
            <span className="text-[8px] font-bold px-1.5 py-0.5 rounded bg-amber-500/20 text-[#FF9F1C] border border-amber-500/40">
              {invariance.kaelen.tag}
            </span>
          </div>

          {/* Character 2: Lady Morgana */}
          <div className="bg-black/60 p-2.5 rounded-xl border border-white/5 flex flex-col items-center justify-between h-full space-y-2">
            <span className="text-[10px] font-bold text-slate-300">L. Morgana</span>
            <div className="w-4 flex-1 bg-slate-900 rounded-full p-0.5 flex flex-col justify-end overflow-hidden">
              <div
                className="w-full rounded-full transition-all duration-500"
                style={{
                  height: `${invariance.morgana.val}%`,
                  background: 'linear-gradient(to top, #10B981, #34D399)',
                  boxShadow: '0 0 10px rgba(16, 185, 129, 0.6)'
                }}
              />
            </div>
            <span className="text-[10px] font-bold text-slate-200">
              {Math.round(invariance.morgana.val)}%
            </span>
            <span className="text-[8px] font-bold px-1.5 py-0.5 rounded bg-emerald-500/20 text-[#10B981] border border-emerald-500/40">
              {invariance.morgana.tag}
            </span>
          </div>

          {/* Character 3: C1-PH3R */}
          <div className="bg-black/60 p-2.5 rounded-xl border border-white/5 flex flex-col items-center justify-between h-full space-y-2">
            <span className="text-[10px] font-bold text-slate-300">C1-PH3R</span>
            <div className="w-4 flex-1 bg-slate-900 rounded-full p-0.5 flex flex-col justify-end overflow-hidden">
              <div
                className="w-full rounded-full transition-all duration-500 animate-pulse"
                style={{
                  height: `${invariance.cypher.val}%`,
                  background: 'linear-gradient(to top, #EF4444, #F87171)',
                  boxShadow: '0 0 10px rgba(239, 68, 68, 0.8)'
                }}
              />
            </div>
            <span className="text-[10px] font-bold text-rose-300">
              {Math.round(invariance.cypher.val)}%
            </span>
            <span className="text-[8px] font-bold px-1.5 py-0.5 rounded bg-rose-500/20 text-[#EF4444] border border-rose-500/40 animate-pulse">
              {invariance.cypher.tag}
            </span>
          </div>

        </div>
      </div>

      {/* 3. IMMUTABLE LAWS COMPILER (Interactive Physical Constants) */}
      <div className="glass-blade rounded-2xl p-4 border border-white/10 space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
            <ShieldAlert className="w-3.5 h-3.5 text-[#10B981]" />
            Immutable Laws Compiler
          </span>
          <span className="text-[9px] text-slate-500">
            ACTIVE ENFORCEMENT
          </span>
        </div>

        {/* Tiny Toggle Cards */}
        <div className="space-y-2 text-xs">
          {laws.map(law => (
            <div
              key={law.id}
              className={`p-2.5 rounded-xl border transition-all flex items-center justify-between ${
                law.value 
                  ? 'bg-black/50 border-white/10 text-slate-300' 
                  : 'bg-rose-950/40 border-rose-500/60 text-rose-200'
              }`}
            >
              <div>
                <span className="font-bold block text-[11px]">{law.name}</span>
                <span className="text-[9px] text-slate-500 font-mono">{law.key}</span>
              </div>

              <button
                onClick={() => handleToggleLaw(law.id)}
                className={`w-9 h-5 rounded-full p-0.5 transition-colors border ${
                  law.value 
                    ? 'bg-cyan-500/20 border-cyan-400/50' 
                    : 'bg-rose-500/30 border-rose-500'
                }`}
              >
                <div
                  className={`w-3.5 h-3.5 rounded-full transition-transform ${
                    law.value 
                      ? 'translate-x-4 bg-[#00E5FF] shadow-sm shadow-[#00E5FF]' 
                      : 'translate-x-0 bg-rose-500 shadow-sm shadow-rose-500'
                  }`}
                />
              </button>
            </div>
          ))}
        </div>

        <p className="text-[9px] text-slate-500 leading-tight">
          Warning: Disabling an immutable constant triggers a severe reality breach and flushes emergency telemetry across all threads.
        </p>
      </div>

    </div>
  );
}
