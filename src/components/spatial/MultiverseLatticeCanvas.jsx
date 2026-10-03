import React, { useState } from 'react';
import { GitBranch, Zap, Sparkles, AlertTriangle, ShieldCheck, Play, ArrowUpRight, CheckCircle2, X } from 'lucide-react';

export default function MultiverseLatticeCanvas({ onOpenSynthesizer, onOpenAuditor }) {
  const [hoveredNode, setHoveredNode] = useState(null);
  const [selectedNode, setSelectedNode] = useState({
    id: 'node-crimson',
    title: 'The Citadel Shear Paradox',
    act: 'Critical Reality Fracture',
    timeline: 'Branch #42-Dark',
    paradoxProbability: '87.4%',
    delta: 'Ley-Resonance duration reached 312s (Max Law: 45s). Kaelen neural sync dissolved.',
    causalLinks: ['Node 0: Prime Inception', 'Nexus Divergence @ Alleyway', 'The Excalibur Shatter'],
    status: 'CONTINUITY_COLLAPSE'
  });

  const [pinnedBlade, setPinnedBlade] = useState(true);

  // Nodes data in the spatial lattice
  const nodes = [
    {
      id: 'node-0',
      x: 80,
      y: 260,
      title: 'Prime Inception (Root 0)',
      act: 'Act 0: Singularity Ground',
      timeline: 'Prime Reality',
      color: '#FFFFFF',
      paradoxProbability: '0.0%',
      delta: 'Canonical bedrock established. Physical laws invariant.',
      causalLinks: ['Origin Seed'],
      status: 'CANONICAL_BEDROCK'
    },
    {
      id: 'node-1',
      x: 280,
      y: 260,
      title: 'Nexus Divergence: The Courier Breach',
      act: 'Act 1: Prime Nexus',
      timeline: 'Prime Reality',
      color: '#FFFFFF',
      paradoxProbability: '1.2%',
      delta: 'Shard intercepted; causal paths branch into 3 probability cones.',
      causalLinks: ['Prime Inception'],
      status: 'NEXUS_SPLINTER'
    },
    {
      id: 'node-crimson',
      x: 580,
      y: 110,
      title: 'The Citadel Shear Paradox',
      act: 'Critical Reality Fracture',
      timeline: 'Branch #42-Dark',
      color: '#EF4444',
      paradoxProbability: '87.4%',
      delta: 'Ley-Resonance duration reached 312s (Max Law: 45s). Kaelen neural sync dissolved.',
      causalLinks: ['Nexus Divergence @ Alleyway'],
      status: 'CONTINUITY_COLLAPSE',
      isSevere: true
    },
    {
      id: 'node-emerald-1',
      x: 540,
      y: 410,
      title: 'Emerald Convergence: The Bio-Pact',
      act: 'Act 2: Utopian Synthesis',
      timeline: 'Radioactive Emerald Lattice',
      color: '#10B981',
      paradoxProbability: '4.8%',
      delta: 'Synthetic neural peace established. No mortal blood spilled.',
      causalLinks: ['Nexus Divergence @ Alleyway'],
      status: 'UTOPIAN_VARIANCE'
    },
    {
      id: 'node-violet-1',
      x: 740,
      y: 180,
      title: 'Violet Ascension: Sovereign Protocol',
      act: 'Act 3: Transcendent Singularity',
      timeline: 'Neon Violet Thread',
      color: '#8B5CF6',
      paradoxProbability: '12.1%',
      delta: 'Cypher uploads into planetary orbital grid.',
      causalLinks: ['Nexus Divergence @ Alleyway', 'The Citadel Shear Paradox'],
      status: 'CYBER_ASCENSION'
    },
    {
      id: 'node-prime-end',
      x: 760,
      y: 260,
      title: 'Prime Resolution: Liberation of Wards',
      act: 'Act 3: Canonical Climax',
      timeline: 'Prime Reality',
      color: '#FFFFFF',
      paradoxProbability: '0.8%',
      delta: 'Syndicate monopolies dismantled under strict physical adherence.',
      causalLinks: ['Nexus Divergence @ Alleyway'],
      status: 'PRIME_CANONICAL'
    }
  ];

  const activeDisplayNode = hoveredNode || selectedNode;

  return (
    <div className="relative w-full h-full flex flex-col justify-between p-6 overflow-hidden select-none">
      
      {/* Top Coordinate & State HUD */}
      <div className="flex items-center justify-between border-b border-white/10 pb-3 z-10 font-mono text-xs">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-white/5 border border-white/10 text-white font-bold tracking-wider">
            <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
            <span>PRIME REALITY THREAD // INVARIANT</span>
          </div>

          <div className="hidden sm:flex items-center gap-2 text-[11px] text-slate-400">
            <span className="text-[#8B5CF6]">● Violet: Ascension Vector</span>
            <span className="text-[#10B981]">● Emerald: Bio-Synthesis</span>
            <span className="text-[#EF4444]">● Crimson: Severe Paradox</span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-[10px] text-slate-500 tracking-widest uppercase">
            COORDINATE MATRIX: [0x4F.9A7.Ψ]
          </span>
          <span className="px-2 py-0.5 rounded bg-cyan-500/10 text-[#00E5FF] border border-cyan-500/30 text-[10px] font-bold">
            FIBER_MESH ACTIVE
          </span>
        </div>
      </div>

      {/* Hero Spatial SVG Lattice */}
      <div className="relative flex-1 flex items-center justify-center my-4">
        
        <svg className="w-full h-[520px]" viewBox="0 0 860 520" fill="none">
          <defs>
            {/* White Glow for Prime */}
            <filter id="glowWhite" x="-30%" y="-30%" width="160%" height="160%">
              <feGaussianBlur stdDeviation="5" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>

            {/* Violet Glow */}
            <filter id="glowViolet" x="-30%" y="-30%" width="160%" height="160%">
              <feGaussianBlur stdDeviation="6" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>

            {/* Emerald Glow */}
            <filter id="glowEmerald" x="-30%" y="-30%" width="160%" height="160%">
              <feGaussianBlur stdDeviation="6" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>

            {/* Crimson Hazard Glow */}
            <filter id="glowCrimson" x="-40%" y="-40%" width="180%" height="180%">
              <feGaussianBlur stdDeviation="8" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* 1. PRIME REALITY THREAD (Pure Sharp White Glowing Bezier) */}
          <path
            d="M 80 260 C 180 260, 200 260, 280 260 C 440 260, 600 260, 760 260"
            stroke="#FFFFFF"
            strokeWidth="3.5"
            strokeLinecap="round"
            filter="url(#glowWhite)"
            opacity="0.95"
          />
          {/* Fiber-optic animated light pulses */}
          <path
            d="M 80 260 C 180 260, 200 260, 280 260 C 440 260, 600 260, 760 260"
            stroke="#00E5FF"
            strokeWidth="2"
            strokeLinecap="round"
            className="fiber-pulse-white"
            opacity="0.75"
          />

          {/* 2. CRIMSON / HAZARD SPLINTER (Bezier towards Severe Paradox Node) */}
          <path
            d="M 280 260 C 360 260, 420 110, 580 110"
            stroke="#EF4444"
            strokeWidth="3"
            strokeLinecap="round"
            filter="url(#glowCrimson)"
            opacity="0.9"
          />

          {/* 3. NEON VIOLET BRANCHING TIMELINE (#8B5CF6) */}
          <path
            d="M 580 110 C 640 110, 680 180, 740 180"
            stroke="#8B5CF6"
            strokeWidth="2.5"
            strokeLinecap="round"
            filter="url(#glowViolet)"
            className="fiber-pulse-violet"
            opacity="0.85"
          />

          {/* 4. RADIOACTIVE EMERALD BRANCHING TIMELINE (#10B981) */}
          <path
            d="M 280 260 C 380 260, 420 410, 540 410 C 640 410, 700 410, 760 410"
            stroke="#10B981"
            strokeWidth="3"
            strokeLinecap="round"
            filter="url(#glowEmerald)"
            className="fiber-pulse-emerald"
            opacity="0.9"
          />

          {/* Inter-dimensional Causal Linkage (Dotted curved thread) */}
          <path
            d="M 540 410 C 600 300, 680 200, 740 180"
            stroke="rgba(0, 229, 255, 0.25)"
            strokeWidth="1.5"
            strokeDasharray="4 6"
            strokeLinecap="round"
          />

          {/* RENDER ALL INTERACTIVE NODES */}
          {nodes.map((node) => {
            const isHovered = hoveredNode?.id === node.id;
            const isSelected = selectedNode?.id === node.id;

            if (node.isSevere) {
              return (
                /* THE CRITICAL SEVERE CONTINUITY AMNESIA NODE */
                <g
                  key={node.id}
                  transform={`translate(${node.x}, ${node.y})`}
                  className="cursor-pointer"
                  onMouseEnter={() => setHoveredNode(node)}
                  onMouseLeave={() => setHoveredNode(null)}
                  onClick={() => setSelectedNode(node)}
                >
                  {/* Expanding Pulsing Crimson Beacon Rings */}
                  <circle r="36" fill="none" stroke="#EF4444" strokeWidth="1.5" opacity="0.3" className="animate-ping" />
                  <circle r="26" fill="none" stroke="#EF4444" strokeWidth="2" opacity="0.6" className="animate-pulse" />
                  <circle r="16" fill="#030712" stroke="#EF4444" strokeWidth="4" filter="url(#glowCrimson)" />
                  <circle r="6" fill="#EF4444" />

                  {/* Pulsing High-Visibility Crimson Hazard Banner Tag */}
                  <g transform="translate(0, -38)">
                    <rect
                      x="-140"
                      y="-14"
                      width="280"
                      height="24"
                      rx="6"
                      fill="#1E0709"
                      stroke="#EF4444"
                      strokeWidth="1.5"
                      style={{ filter: 'drop-shadow(0 0 10px rgba(239, 68, 68, 0.7))' }}
                    />
                    <text
                      x="0"
                      y="2"
                      fill="#FCA5A5"
                      fontSize="9.5"
                      fontFamily="JetBrains Mono, monospace"
                      fontWeight="bold"
                      textAnchor="middle"
                      letterSpacing="0.8"
                    >
                      🔥 SEVERE CONTINUITY AMNESIA DETECTED
                    </text>
                  </g>
                </g>
              );
            }

            return (
              <g
                key={node.id}
                transform={`translate(${node.x}, ${node.y})`}
                className="cursor-pointer transition-transform hover:scale-125"
                onMouseEnter={() => setHoveredNode(node)}
                onMouseLeave={() => setHoveredNode(null)}
                onClick={() => setSelectedNode(node)}
              >
                {/* Node Ring */}
                <circle
                  r={isHovered || isSelected ? "14" : "10"}
                  fill="#030712"
                  stroke={node.color}
                  strokeWidth={isHovered || isSelected ? "3.5" : "2.5"}
                  style={{ filter: `drop-shadow(0 0 10px ${node.color})` }}
                />
                <circle
                  r="4.5"
                  fill={node.color}
                />
                {/* Label text */}
                <text
                  x="0"
                  y={node.y > 300 ? "-20" : "28"}
                  fill={node.color}
                  fontSize="9.5"
                  fontFamily="JetBrains Mono, monospace"
                  textAnchor="middle"
                  opacity={isHovered || isSelected ? "1" : "0.75"}
                >
                  {node.title.split(':')[0]}
                </text>
              </g>
            );
          })}

        </svg>

        {/* --- SLEEK FLOATING GLASSMORPHIIC BLADE (Hover/Selected Card) --- */}
        {activeDisplayNode && (
          <div className="absolute top-4 right-4 max-w-sm w-full glass-blade rounded-2xl p-5 border border-cyan-400/40 text-xs font-mono space-y-3 z-30 shadow-2xl animate-in fade-in slide-in-from-top-4 duration-200">
            
            <div className="flex items-center justify-between border-b border-white/10 pb-2">
              <div>
                <span className="text-[9px] uppercase font-bold tracking-wider text-cyan-400">
                  {activeDisplayNode.timeline}
                </span>
                <h4 className="text-sm font-bold text-white mt-0.5">
                  {activeDisplayNode.title}
                </h4>
              </div>

              <div className="flex items-center gap-1.5">
                <span className={`px-2 py-0.5 rounded text-[10px] font-bold border ${
                  activeDisplayNode.isSevere
                    ? 'bg-rose-500/20 text-rose-300 border-rose-500/50 animate-pulse'
                    : 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40'
                }`}>
                  {activeDisplayNode.status}
                </span>
              </div>
            </div>

            {/* Lore Delta & Paradox Probability */}
            <div className="bg-black/60 p-3 rounded-xl border border-white/10 space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">
                  Lore Delta: Paradox Probability
                </span>
                <span className={`text-xs font-bold font-mono ${
                  parseFloat(activeDisplayNode.paradoxProbability) > 50 ? 'text-[#EF4444]' : 'text-[#00E5FF]'
                }`}>
                  {activeDisplayNode.paradoxProbability}
                </span>
              </div>

              <div className="w-full bg-slate-900 rounded-full h-1.5 overflow-hidden">
                <div
                  className={`h-full transition-all duration-700 ${
                    parseFloat(activeDisplayNode.paradoxProbability) > 50 ? 'bg-[#EF4444]' : 'bg-[#00E5FF]'
                  }`}
                  style={{ width: activeDisplayNode.paradoxProbability }}
                />
              </div>

              <p className="text-[11px] text-slate-300 leading-relaxed pt-1">
                "{activeDisplayNode.delta}"
              </p>
            </div>

            {/* Causal Links */}
            <div>
              <span className="text-[9px] text-slate-500 uppercase tracking-widest block mb-1">
                CONNECTED CAUSAL VECTORS:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {activeDisplayNode.causalLinks.map((link, idx) => (
                  <span key={idx} className="px-2 py-0.5 rounded bg-white/5 text-slate-300 border border-white/10 text-[10px]">
                    {link}
                  </span>
                ))}
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex items-center justify-end gap-2 pt-2 border-t border-white/10">
              <button
                onClick={() => onOpenAuditor && onOpenAuditor(activeDisplayNode.delta)}
                className="px-3 py-1.5 rounded-lg bg-rose-500/20 hover:bg-rose-500/30 border border-rose-500/40 text-rose-300 text-[11px] font-bold flex items-center gap-1.5 transition"
              >
                <AlertTriangle className="w-3.5 h-3.5" />
                <span>Inject Quantum Patch</span>
              </button>

              <button
                onClick={() => onOpenSynthesizer && onOpenSynthesizer()}
                className="px-3 py-1.5 rounded-lg bg-cyan-500/20 hover:bg-cyan-500/30 border border-cyan-500/40 text-[#00E5FF] text-[11px] font-bold flex items-center gap-1.5 transition"
              >
                <Play className="w-3.5 h-3.5" />
                <span>Simulate Node</span>
              </button>
            </div>

          </div>
        )}

      </div>

      {/* Bottom Telemetry Bar */}
      <div className="flex items-center justify-between border-t border-white/10 pt-3 z-10 font-mono text-[11px] text-slate-500">
        <div className="flex items-center gap-4">
          <span>REALITY CONES: 3 DIVERGENT</span>
          <span>•</span>
          <span>ENTROPIC LEAKAGE: 0.0012%</span>
          <span>•</span>
          <span className="text-cyan-400">CANONICAL ANCHOR: SOLIDIFIED</span>
        </div>

        <div className="text-slate-400">
          Hover over nodes to inspect causal links // Click node to pin blade
        </div>
      </div>

    </div>
  );
}
