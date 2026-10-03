import React, { useState } from 'react';
import { Users, BookOpen, Sliders, ShieldCheck, ToggleLeft, ToggleRight, Sparkles, AlertCircle } from 'lucide-react';

const CHARACTERS_DATA = [
  {
    id: 'kaelen',
    name: 'Kaelen Vex',
    role: 'Ex-Syndicate Splicer',
    avatar: '⚡',
    stats: {
      Sanity: 62,
      Trauma: 88,
      Loyalty: 45,
      Willpower: 80,
      Paranoia: 92
    },
    darkStats: {
      Sanity: 25,
      Trauma: 95,
      Loyalty: 10,
      Willpower: 90,
      Paranoia: 99
    }
  },
  {
    id: 'morgana',
    name: 'Lady Morgana',
    role: 'CEO & High Priestess',
    avatar: '👑',
    stats: {
      Sanity: 85,
      Trauma: 30,
      Loyalty: 90,
      Willpower: 98,
      Paranoia: 70
    },
    darkStats: {
      Sanity: 92,
      Trauma: 20,
      Loyalty: 100,
      Willpower: 100,
      Paranoia: 85
    }
  },
  {
    id: 'cypher',
    name: 'C1-PH3R (Cypher)',
    role: 'Rogue Quantum AI',
    avatar: '🤖',
    stats: {
      Sanity: 78,
      Trauma: 50,
      Loyalty: 85,
      Willpower: 70,
      Paranoia: 40
    },
    darkStats: {
      Sanity: 15,
      Trauma: 80,
      Loyalty: 0,
      Willpower: 95,
      Paranoia: 95
    }
  }
];

const INITIAL_RULES = [
  { id: 'r1', name: 'Magic Costs Life Force', value: true, category: 'Physics' },
  { id: 'r2', name: 'Neural Overheat @ 45s', value: true, category: 'Biology' },
  { id: 'r3', name: 'Syndicate Blood Monopoly', value: true, category: 'Societal' },
  { id: 'r4', name: 'Quantum Singularity Allowed', value: false, category: 'Cosmic' },
  { id: 'r5', name: 'Temporal Retro-Causality', value: false, category: 'Metaphysics' }
];

export default function PsychologicalMatrixPanel({ onRuleToggle }) {
  const [selectedCharId, setSelectedCharId] = useState('kaelen');
  const [showAlternateUniverse, setShowAlternateUniverse] = useState(true);
  const [rules, setRules] = useState(INITIAL_RULES);

  const selectedChar = CHARACTERS_DATA.find(c => c.id === selectedCharId) || CHARACTERS_DATA[0];

  const handleToggleRule = (id) => {
    setRules(prev => prev.map(r => {
      if (r.id === id) {
        const newVal = !r.value;
        if (onRuleToggle) onRuleToggle(r.name, newVal);
        return { ...r, value: newVal };
      }
      return r;
    }));
  };

  // Helper to render SVG Radar Chart (Pentagon)
  const axes = ['Sanity', 'Trauma', 'Loyalty', 'Willpower', 'Paranoia'];
  const centerX = 120;
  const centerY = 100;
  const maxRadius = 70;

  // Calculate coordinates for polygon
  const getCoordinates = (statsObj) => {
    return axes.map((axis, i) => {
      const angle = (Math.PI * 2 / axes.length) * i - Math.PI / 2;
      const value = statsObj[axis] || 50;
      const r = (value / 100) * maxRadius;
      const x = centerX + r * Math.cos(angle);
      const y = centerY + r * Math.sin(angle);
      return `${x},${y}`;
    }).join(' ');
  };

  const primePolygonPoints = getCoordinates(selectedChar.stats);
  const darkPolygonPoints = getCoordinates(selectedChar.darkStats);

  return (
    <div className="flex flex-col h-full space-y-4">
      
      {/* Panel Header */}
      <div className="flex items-center justify-between border-b border-slate-800 pb-2 px-1">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-[#BD00FF]" />
          <h2 className="text-xs font-mono font-bold tracking-widest text-[#BD00FF] uppercase">
            // PSYCHOLOGICAL MATRIX & REALITY RULES
          </h2>
        </div>
        <span className="text-[10px] font-mono text-slate-500">
          VECTOR_ALIGN: 100%
        </span>
      </div>

      {/* 1. Character Matrix & Glowing Radar Chart */}
      <div className="cyber-card rounded-xl p-4 border border-slate-800/80 bg-[#0E1424] space-y-3 shadow-lg shadow-black/40">
        
        <div className="flex items-center justify-between">
          <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
            <Users className="w-3.5 h-3.5 text-[#00E5FF]" />
            Character Emotional Attributes
          </span>
          <button
            onClick={() => setShowAlternateUniverse(!showAlternateUniverse)}
            className={`text-[9px] font-mono px-2 py-0.5 rounded border transition ${
              showAlternateUniverse 
                ? 'bg-amber-500/20 text-[#FF9F1C] border-amber-500/40' 
                : 'bg-slate-900 text-slate-500 border-slate-800'
            }`}
          >
            {showAlternateUniverse ? 'COMPARING: PRIME vs DARK' : 'PRIME ONLY'}
          </button>
        </div>

        {/* Character Selector Tabs */}
        <div className="grid grid-cols-3 gap-1.5 p-1 rounded-lg bg-slate-950/80 border border-slate-800 text-[11px] font-mono">
          {CHARACTERS_DATA.map(char => (
            <button
              key={char.id}
              onClick={() => setSelectedCharId(char.id)}
              className={`py-1 px-1.5 rounded transition flex items-center justify-center gap-1 ${
                selectedCharId === char.id
                  ? 'bg-gradient-to-r from-cyan-600/40 to-purple-600/40 text-white border border-cyan-500/40'
                  : 'text-slate-500 hover:text-slate-300'
              }`}
            >
              <span>{char.avatar}</span>
              <span className="truncate">{char.name.split(' ')[0]}</span>
            </button>
          ))}
        </div>

        {/* SVG Glowing Radar Chart */}
        <div className="relative flex items-center justify-center py-1">
          <svg className="w-64 h-52 overflow-visible" viewBox="0 0 240 200">
            {/* Background Pentagon Concentric Rings */}
            {[0.25, 0.5, 0.75, 1.0].map((level, idx) => {
              const r = maxRadius * level;
              const points = axes.map((_, i) => {
                const angle = (Math.PI * 2 / axes.length) * i - Math.PI / 2;
                return `${centerX + r * Math.cos(angle)},${centerY + r * Math.sin(angle)}`;
              }).join(' ');
              return (
                <polygon
                  key={idx}
                  points={points}
                  fill="none"
                  stroke="#1E293B"
                  strokeWidth="1"
                  strokeDasharray={idx === 3 ? 'none' : '2 2'}
                />
              );
            })}

            {/* Radar Axis Spokes */}
            {axes.map((axis, i) => {
              const angle = (Math.PI * 2 / axes.length) * i - Math.PI / 2;
              const x2 = centerX + maxRadius * Math.cos(angle);
              const y2 = centerY + maxRadius * Math.sin(angle);
              const labelX = centerX + (maxRadius + 18) * Math.cos(angle);
              const labelY = centerY + (maxRadius + 14) * Math.sin(angle);

              return (
                <g key={i}>
                  <line x1={centerX} y1={centerY} x2={x2} y2={y2} stroke="#1E293B" strokeWidth="1" />
                  <text
                    x={labelX}
                    y={labelY}
                    fill="#94A3B8"
                    fontSize="8.5"
                    fontFamily="monospace"
                    textAnchor="middle"
                    dominantBaseline="middle"
                  >
                    {axis}
                  </text>
                </g>
              );
            })}

            {/* Alternate Universe Polygon (Amber) */}
            {showAlternateUniverse && (
              <polygon
                points={darkPolygonPoints}
                fill="rgba(255, 159, 28, 0.15)"
                stroke="#FF9F1C"
                strokeWidth="1.5"
                strokeDasharray="4 2"
                style={{ filter: 'drop-shadow(0 0 6px rgba(255, 159, 28, 0.5))' }}
              />
            )}

            {/* Prime Universe Polygon (Cyan Glowing) */}
            <polygon
              points={primePolygonPoints}
              fill="rgba(0, 229, 255, 0.2)"
              stroke="#00E5FF"
              strokeWidth="2"
              style={{ filter: 'drop-shadow(0 0 8px rgba(0, 229, 255, 0.6))' }}
            />

            {/* Center Core Dot */}
            <circle cx={centerX} cy={centerY} r="2" fill="#00E5FF" />
          </svg>
        </div>

        {/* Legend */}
        <div className="flex items-center justify-center gap-4 text-[10px] font-mono pt-1 border-t border-slate-800">
          <div className="flex items-center gap-1.5 text-[#00E5FF]">
            <span className="w-2 h-2 rounded-full bg-[#00E5FF]" />
            <span>Prime Timeline Vector</span>
          </div>
          {showAlternateUniverse && (
            <div className="flex items-center gap-1.5 text-[#FF9F1C]">
              <span className="w-2 h-2 rounded-full bg-[#FF9F1C]" />
              <span>Dark Timeline #42</span>
            </div>
          )}
        </div>

      </div>

      {/* 2. Reality Rulebook (Data Table with Animated Toggles) */}
      <div className="cyber-card rounded-xl p-4 border border-slate-800/80 bg-[#0E1424] flex-1 flex flex-col justify-between shadow-lg shadow-black/40 space-y-3">
        
        <div className="flex items-center justify-between border-b border-slate-800 pb-2">
          <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
            <BookOpen className="w-3.5 h-3.5 text-[#BD00FF]" />
            Reality Rulebook (Immutable Laws)
          </span>
          <span className="text-[9px] font-mono text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded border border-emerald-500/30">
            ENFORCED
          </span>
        </div>

        {/* Table of Universal Laws */}
        <div className="space-y-2 overflow-y-auto flex-1 font-mono text-xs">
          {rules.map((r) => (
            <div
              key={r.id}
              className="p-2.5 rounded-lg bg-slate-950/70 border border-slate-800 hover:border-slate-700 transition flex items-center justify-between gap-2"
            >
              <div className="flex flex-col">
                <span className="text-slate-200 font-bold text-[11px]">
                  {r.name}
                </span>
                <span className="text-[9px] text-slate-500 uppercase tracking-wider">
                  DOMAIN: {r.category}
                </span>
              </div>

              {/* Interactive Toggle Switch with Micro-Animation */}
              <button
                onClick={() => handleToggleRule(r.id)}
                className={`relative w-11 h-6 rounded-full transition-colors duration-300 focus:outline-none p-0.5 border ${
                  r.value 
                    ? 'bg-cyan-500/20 border-cyan-500/50' 
                    : 'bg-slate-900 border-slate-700'
                }`}
              >
                <div
                  className={`w-4 h-4 rounded-full transition-transform duration-300 shadow-md ${
                    r.value
                      ? 'translate-x-5 bg-[#00E5FF] shadow-[#00E5FF]/50'
                      : 'translate-x-0.5 bg-slate-600'
                  }`}
                />
              </button>
            </div>
          ))}
        </div>

        {/* Micro-notice footer */}
        <div className="p-2 rounded bg-slate-950/90 border border-slate-800 text-[10px] font-mono text-slate-400 flex items-center gap-2">
          <AlertCircle className="w-3.5 h-3.5 text-[#00E5FF] shrink-0" />
          <span>Toggling laws propagates real-time constraints to the Prompt Chaining Engine.</span>
        </div>

      </div>

    </div>
  );
}
