import React, { useState, useEffect, useRef } from 'react';
import { ShieldCheck, AlertOctagon, Terminal, Activity, Zap, Radio, RefreshCw, Cpu } from 'lucide-react';

const INITIAL_LOGS = [
  { id: 1, time: '01:18:02', level: 'OK', msg: 'CHRONO_WATCHDOG: Initializing quantum entanglement monitor...' },
  { id: 2, time: '01:18:08', level: 'OK', msg: 'CANON_CHECK: Prime Timeline #00 verified against physical laws.' },
  { id: 3, time: '01:18:14', level: 'INFO', msg: 'LORE_DB: 3 Immutable Universal Rules indexed into LLM system prompt.' },
  { id: 4, time: '01:18:22', level: 'WARN', msg: 'ENTROPIC_DRIFT: Timeline Branch #42 detected causal divergence (+0.041%).' },
  { id: 5, time: '01:18:31', level: 'ALERT', msg: 'PARADOX: Timeline Branch #42: Paradox Detected at The Shattered Citadel.' },
  { id: 6, time: '01:18:45', level: 'OK', msg: 'STABILITY_STATION: Counter-entropy dampeners active. Stability: 94.2%.' }
];

export default function LoreIntegrityWatchdog({ stability = 94.2, onTriggerLog }) {
  const [logs, setLogs] = useState(INITIAL_LOGS);
  const [filter, setFilter] = useState('ALL');
  const scrollRef = useRef(null);

  // Auto-scrolling simulated background integrity feed
  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const timeStr = now.toTimeString().split(' ')[0];
      const randomSeeds = [
        { level: 'OK', msg: `HEARTBEAT: Timeline Prime coherence verified across 12 lore nodes.` },
        { level: 'INFO', msg: `TRAIT_AUDIT: Kaelen Vex emotional vector checked: Sanity 68% -> stable.` },
        { level: 'WARN', msg: `CAUSAL_MONITOR: Micro-ripple detected in Sub-sector 9 (Gravity Variance = 0.5x).` },
        { level: 'OK', msg: `PROMPT_CHAIN: Contextual ground truth re-synchronized successfully.` },
        { level: 'ALERT', msg: `PARADOX_ALERT: Timeline Branch #42 divergence threshold holding at 8.9.` }
      ];
      const selected = randomSeeds[Math.floor(Math.random() * randomSeeds.length)];
      setLogs(prev => [...prev.slice(-30), { id: Date.now(), time: timeStr, ...selected }]);
    }, 4500);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [logs]);

  const filteredLogs = logs.filter(l => {
    if (filter === 'ALL') return true;
    if (filter === 'ALERT') return l.level === 'ALERT' || l.level === 'WARN';
    if (filter === 'OK') return l.level === 'OK';
    return true;
  });

  // Calculate SVG circular gauge
  const radius = 58;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (stability / 100) * circumference;

  return (
    <div className="flex flex-col h-full space-y-4">
      
      {/* Panel Header */}
      <div className="flex items-center justify-between border-b border-slate-800 pb-2 px-1">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-[#00E5FF] animate-ping" />
          <h2 className="text-xs font-mono font-bold tracking-widest text-[#00E5FF] uppercase">
            // LORE INTEGRITY WATCHDOG
          </h2>
        </div>
        <span className="text-[10px] font-mono text-slate-500 tracking-wider">
          LIVE_FEED: ACTIVE
        </span>
      </div>

      {/* Continuity Amnesia Health Meter (Massive Radial Glowing Ring) */}
      <div className="cyber-card rounded-xl p-5 border border-slate-800/80 bg-[#0E1424] relative overflow-hidden flex flex-col items-center shadow-lg shadow-black/40">
        
        {/* Subtle grid background accent */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,229,255,0.06)_0,transparent_70%)] pointer-events-none" />

        <div className="w-full flex items-center justify-between mb-2">
          <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
            <Activity className="w-3 h-3 text-[#00E5FF]" />
            Continuity Amnesia Meter
          </span>
          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
            NOMINAL
          </span>
        </div>

        {/* SVG Radial Ring Gauge */}
        <div className="relative my-2 flex items-center justify-center">
          <svg className="w-36 h-36 transform -rotate-90">
            {/* Background Ring */}
            <circle
              cx="72"
              cy="72"
              r={radius}
              stroke="#1E293B"
              strokeWidth="9"
              fill="transparent"
            />
            {/* Animated Glow Ring */}
            <circle
              cx="72"
              cy="72"
              r={radius}
              stroke="url(#cyanGlowGradient)"
              strokeWidth="9"
              fill="transparent"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              className="transition-all duration-1000 ease-out"
              style={{ filter: 'drop-shadow(0 0 8px rgba(0, 229, 255, 0.6))' }}
            />
            <defs>
              <linearGradient id="cyanGlowGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#00E5FF" />
                <stop offset="100%" stopColor="#BD00FF" />
              </linearGradient>
            </defs>
          </svg>

          {/* Center Metric */}
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
            <span className="text-2xl font-mono font-black text-white glow-cyan tracking-tight">
              {stability}%
            </span>
            <span className="text-[9px] font-mono uppercase text-[#00E5FF] tracking-widest">
              STABILITY
            </span>
          </div>
        </div>

        {/* Pulsing Red Warning Banner (The requested feature) */}
        <div className="w-full mt-2 p-2.5 rounded-lg bg-rose-950/40 border border-rose-500/40 flex items-center justify-between text-xs">
          <div className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-pulse shadow-lg shadow-rose-500/50" />
            <div className="text-left">
              <span className="text-[11px] font-mono font-bold text-rose-300 block">
                Timeline Branch #42
              </span>
              <span className="text-[9px] font-mono text-rose-400/90 tracking-wide uppercase">
                Paradox Detected
              </span>
            </div>
          </div>
          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-rose-500/20 text-rose-200 border border-rose-500/30 animate-pulse">
            HIGH SEVERITY
          </span>
        </div>

        {/* Micro Telemetry Metrics */}
        <div className="w-full grid grid-cols-3 gap-2 mt-3 pt-3 border-t border-slate-800 text-[10px] font-mono">
          <div className="bg-slate-900/60 p-1.5 rounded border border-slate-800 text-center">
            <span className="text-slate-500 block">ENTROPY</span>
            <span className="text-slate-200 font-bold">0.041%</span>
          </div>
          <div className="bg-slate-900/60 p-1.5 rounded border border-slate-800 text-center">
            <span className="text-slate-500 block">PARADOXES</span>
            <span className="text-[#FF9F1C] font-bold">1 ACTIVE</span>
          </div>
          <div className="bg-slate-900/60 p-1.5 rounded border border-slate-800 text-center">
            <span className="text-slate-500 block">COHESION</span>
            <span className="text-[#00E5FF] font-bold">99.8%</span>
          </div>
        </div>

      </div>

      {/* Chronology Logs Terminal (Live Scrolling Feed) */}
      <div className="cyber-card rounded-xl border border-slate-800/80 bg-[#0A0E17] flex-1 flex flex-col overflow-hidden shadow-lg shadow-black/40 min-h-[300px]">
        
        {/* Terminal Header */}
        <div className="flex items-center justify-between px-3 py-2 border-b border-slate-800 bg-[#0D121F]">
          <div className="flex items-center gap-1.5 text-[11px] font-mono text-slate-300">
            <Terminal className="w-3.5 h-3.5 text-[#FF9F1C]" />
            <span className="text-white font-bold">CHRONOLOGY_LOGS</span>
            <span className="text-[9px] text-slate-500">[STDERR/STDOUT]</span>
          </div>

          <div className="flex items-center gap-1 text-[9px] font-mono">
            <button
              onClick={() => setFilter('ALL')}
              className={`px-1.5 py-0.5 rounded transition ${filter === 'ALL' ? 'bg-cyan-500/20 text-[#00E5FF] border border-cyan-500/40' : 'text-slate-500 hover:text-slate-300'}`}
            >
              ALL
            </button>
            <button
              onClick={() => setFilter('ALERT')}
              className={`px-1.5 py-0.5 rounded transition ${filter === 'ALERT' ? 'bg-amber-500/20 text-[#FF9F1C] border border-amber-500/40' : 'text-slate-500 hover:text-slate-300'}`}
            >
              ALERTS
            </button>
          </div>
        </div>

        {/* Log Stream */}
        <div 
          ref={scrollRef}
          className="flex-1 p-3 font-mono text-[11px] leading-relaxed overflow-y-auto space-y-1.5 text-slate-300"
        >
          {filteredLogs.map((log) => {
            const isAlert = log.level === 'ALERT';
            const isWarn = log.level === 'WARN';
            return (
              <div 
                key={log.id} 
                className={`p-1 rounded flex items-start gap-2 font-mono transition-colors ${
                  isAlert 
                    ? 'bg-rose-950/30 text-rose-300 border-l-2 border-rose-500' 
                    : isWarn 
                    ? 'bg-amber-950/20 text-amber-300 border-l-2 border-amber-500' 
                    : 'hover:bg-slate-900/60 text-slate-300'
                }`}
              >
                <span className="text-slate-600 shrink-0 text-[10px]">{log.time}</span>
                <span className={`px-1 py-0.2 rounded text-[9px] font-bold shrink-0 ${
                  isAlert ? 'bg-rose-500/20 text-rose-400' :
                  isWarn ? 'bg-amber-500/20 text-[#FF9F1C]' :
                  'bg-cyan-500/10 text-[#00E5FF]'
                }`}>
                  {log.level}
                </span>
                <span className="text-slate-300 flex-1 break-words">
                  {log.msg}
                </span>
              </div>
            );
          })}
          <div className="flex items-center gap-1 text-[10px] text-slate-600 pt-1">
            <span className="w-1.5 h-1.5 rounded-full bg-[#00E5FF] animate-pulse" />
            <span>Awaiting next chronology packet</span>
            <span className="terminal-cursor text-[#00E5FF]">_</span>
          </div>
        </div>

      </div>

    </div>
  );
}
