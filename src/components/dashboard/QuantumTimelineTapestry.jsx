import React, { useState } from 'react';
import { GitBranch, GitFork, Sparkles, AlertTriangle, Eye, Compass, Layers, Zap, X, ShieldAlert, Play } from 'lucide-react';

export default function QuantumTimelineTapestry({ onOpenSynthesizer, onOpenAuditor }) {
  const [selectedNode, setSelectedNode] = useState(null);
  const [activeBranch, setActiveBranch] = useState('ALL'); // 'ALL' | 'DARK' | 'UTOPIAN' | 'FALLEN'
  const [isShatteredModalOpen, setIsShatteredModalOpen] = useState(false);
  const [hoveredNode, setHoveredNode] = useState(null);

  // When clicking the amber node:
  const handleAmberNodeClick = () => {
    setIsShatteredModalOpen(true);
  };

  return (
    <div className="flex flex-col h-full space-y-4 relative">
      
      {/* Tapestry Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-2 px-1">
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-sm bg-[#00E5FF] rotate-45 shadow-sm shadow-[#00E5FF]" />
          <h2 className="text-xs font-mono font-bold tracking-widest text-white uppercase flex items-center gap-2">
            // THE QUANTUM TIMELINE TAPESTRY
            <span className="text-[9px] px-2 py-0.5 rounded bg-cyan-500/10 text-[#00E5FF] border border-cyan-500/30">
              MULTIVERSE_TOPOLOGY v4.2
            </span>
          </h2>
        </div>

        {/* Branch Filter Pills */}
        <div className="flex items-center gap-1.5 text-[10px] font-mono">
          <button
            onClick={() => setActiveBranch('ALL')}
            className={`px-2 py-0.5 rounded border transition ${
              activeBranch === 'ALL'
                ? 'bg-cyan-500/20 text-[#00E5FF] border-cyan-500/40 glow-cyan'
                : 'bg-slate-900/60 text-slate-400 border-slate-800 hover:text-slate-200'
            }`}
          >
            ALL VECTORS
          </button>
          <button
            onClick={() => setActiveBranch('DARK')}
            className={`px-2 py-0.5 rounded border transition ${
              activeBranch === 'DARK'
                ? 'bg-amber-500/20 text-[#FF9F1C] border-amber-500/40'
                : 'bg-slate-900/60 text-slate-400 border-slate-800 hover:text-slate-200'
            }`}
          >
            DARK TIMELINE
          </button>
          <button
            onClick={() => setActiveBranch('UTOPIAN')}
            className={`px-2 py-0.5 rounded border transition ${
              activeBranch === 'UTOPIAN'
                ? 'bg-purple-500/20 text-purple-300 border-purple-500/40'
                : 'bg-slate-900/60 text-slate-400 border-slate-800 hover:text-slate-200'
            }`}
          >
            UTOPIAN
          </button>
          <button
            onClick={() => setActiveBranch('FALLEN')}
            className={`px-2 py-0.5 rounded border transition ${
              activeBranch === 'FALLEN'
                ? 'bg-rose-500/20 text-rose-300 border-rose-500/40'
                : 'bg-slate-900/60 text-slate-400 border-slate-800 hover:text-slate-200'
            }`}
          >
            FALLEN HERO
          </button>
        </div>
      </div>

      {/* Hero Visual Graph Canvas */}
      <div className="cyber-card rounded-xl border border-slate-800/80 bg-[#0A0D18] flex-1 min-h-[580px] p-6 relative overflow-hidden flex flex-col justify-between shadow-2xl">
        
        {/* Subtle coordinate overlay */}
        <div className="absolute top-3 left-4 text-[9px] font-mono text-slate-600 pointer-events-none">
          TOPOLOGY_GRID: [α-43.209, β-102.991] // QUANTUM_ENTANGLEMENT: STABLE
        </div>
        <div className="absolute bottom-3 right-4 text-[9px] font-mono text-slate-600 pointer-events-none">
          DIMENSIONAL_PLANES: 4 // CANONICAL_ROOT: P-00
        </div>

        {/* Interactive SVG Branching Graph Canvas */}
        <div className="w-full flex-1 relative flex items-center justify-center my-2">
          
          <svg className="w-full h-[480px]" viewBox="0 0 850 480" fill="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
              {/* Cyan Neon Glow */}
              <filter id="neonGlowCyan" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="4" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>

              {/* Amber Neon Glow */}
              <filter id="neonGlowAmber" x="-30%" y="-30%" width="160%" height="160%">
                <feGaussianBlur stdDeviation="6" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>

              {/* Linear Gradients */}
              <linearGradient id="primeLineGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#00E5FF" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#00E5FF" stopOpacity="1" />
              </linearGradient>

              <linearGradient id="darkBranchGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#00E5FF" />
                <stop offset="60%" stopColor="#FF9F1C" />
                <stop offset="100%" stopColor="#FF9F1C" />
              </linearGradient>

              <linearGradient id="utopianBranchGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#00E5FF" />
                <stop offset="100%" stopColor="#BD00FF" />
              </linearGradient>

              <linearGradient id="fallenBranchGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#00E5FF" />
                <stop offset="100%" stopColor="#FF0055" />
              </linearGradient>
            </defs>

            {/* BASELINE TRACK: PRIME TIMELINE */}
            <path
              d="M 60 240 L 320 240 L 800 240"
              stroke="#00E5FF"
              strokeWidth="3.5"
              strokeLinecap="round"
              filter="url(#neonGlowCyan)"
              opacity={activeBranch === 'ALL' ? '1' : '0.4'}
            />
            {/* Animated particles or dash */}
            <path
              d="M 60 240 L 800 240"
              stroke="#FFFFFF"
              strokeWidth="2"
              strokeDasharray="8 32"
              strokeLinecap="round"
              className="animate-pulse"
              opacity="0.6"
            />

            {/* BRANCH 1: DARK TIMELINE (Splits upward towards amber node) */}
            <path
              d="M 320 240 C 400 240, 440 90, 540 90 L 780 90"
              stroke="url(#darkBranchGrad)"
              strokeWidth="3"
              strokeLinecap="round"
              filter="url(#neonGlowAmber)"
              opacity={activeBranch === 'ALL' || activeBranch === 'DARK' ? '1' : '0.2'}
            />

            {/* BRANCH 2: UTOPIAN VARIANCE (Splits downward gently) */}
            <path
              d="M 320 240 C 400 240, 440 370, 540 370 L 780 370"
              stroke="url(#utopianBranchGrad)"
              strokeWidth="2.5"
              strokeLinecap="round"
              opacity={activeBranch === 'ALL' || activeBranch === 'UTOPIAN' ? '1' : '0.2'}
            />

            {/* BRANCH 3: FALLEN HERO ARC (Secondary split from Prime further right) */}
            <path
              d="M 520 240 C 580 240, 610 160, 680 160 L 790 160"
              stroke="url(#fallenBranchGrad)"
              strokeWidth="2.5"
              strokeLinecap="round"
              opacity={activeBranch === 'ALL' || activeBranch === 'FALLEN' ? '1' : '0.2'}
            />

            {/* --- LABELS & TRACK HEADERS --- */}
            {/* Prime Timeline Track Label */}
            <text x="65" y="222" fill="#00E5FF" fontSize="12" fontFamily="JetBrains Mono, monospace" fontWeight="bold" letterSpacing="1.5">
              ► PRIME TIMELINE (CANONICAL ROOT)
            </text>

            {/* Dark Timeline Label */}
            <text x="540" y="72" fill="#FF9F1C" fontSize="11" fontFamily="JetBrains Mono, monospace" fontWeight="bold" letterSpacing="1">
              ► DARK TIMELINE: BRANCH #42
            </text>

            {/* Utopian Variance Label */}
            <text x="540" y="395" fill="#BD00FF" fontSize="11" fontFamily="JetBrains Mono, monospace" fontWeight="bold" letterSpacing="1">
              ► UTOPIAN VARIANCE: TIMELINE SIGMA
            </text>

            {/* Fallen Hero Arc Label */}
            <text x="680" y="145" fill="#FF0055" fontSize="10" fontFamily="JetBrains Mono, monospace" fontWeight="bold" letterSpacing="1">
              ► FALLEN HERO ARC
            </text>

            {/* --- NODES ALONG PRIME TIMELINE --- */}
            {/* Node 1: Origin Point */}
            <g transform="translate(100, 240)" className="cursor-pointer" onClick={() => setSelectedNode({ title: 'Root: The Quantum Awakening', act: 'Act 0', summary: 'The initial extraction of Arthurian bio-data packets at Kane Corp Sub-vault.', branch: 'Prime' })}>
              <circle r="9" fill="#0B0F19" stroke="#00E5FF" strokeWidth="2.5" filter="url(#neonGlowCyan)" />
              <circle r="4" fill="#00E5FF" />
              <text x="-40" y="28" fill="#94A3B8" fontSize="10" fontFamily="monospace">Node 0: Inception</text>
            </g>

            {/* Node 2: Inciting Divergence Point */}
            <g transform="translate(320, 240)" className="cursor-pointer" onClick={() => setSelectedNode({ title: 'The Alleyway Standoff', act: 'Act 1 Divergence', summary: 'Kaelen and Cypher intercept the transport courier. The decision to decrypt or negotiate splinters reality.', branch: 'Nexus Point' })}>
              <circle r="14" fill="#0B0F19" stroke="#00E5FF" strokeWidth="3" filter="url(#neonGlowCyan)" />
              <circle r="6" fill="#00E5FF" className="animate-ping" opacity="0.4" />
              <circle r="6" fill="#00E5FF" />
              <text x="-50" y="32" fill="#00E5FF" fontSize="10" fontFamily="monospace" fontWeight="bold">NEXUS DIVERGENCE</text>
            </g>

            {/* Node 3: Prime Climax */}
            <g transform="translate(680, 240)" className="cursor-pointer" onClick={() => setSelectedNode({ title: 'Kane Tower Breach', act: 'Act 3 Prime', summary: 'Kaelen and Cypher disable the planetary Ley-Grid to liberate sister memory cores.', branch: 'Prime' })}>
              <circle r="8" fill="#0B0F19" stroke="#00E5FF" strokeWidth="2.5" />
              <circle r="3.5" fill="#00E5FF" />
              <text x="-35" y="26" fill="#94A3B8" fontSize="10" fontFamily="monospace">Act 3: Liberation</text>
            </g>

            {/* --- THE AMBER HERO NODE: "EVENT: THE SHATTERED CITADEL" --- */}
            <g 
              transform="translate(620, 90)" 
              className="cursor-pointer transition-transform hover:scale-125"
              onClick={handleAmberNodeClick}
              onMouseEnter={() => setHoveredNode('citadel')}
              onMouseLeave={() => setHoveredNode(null)}
            >
              {/* Outer Pulsing Beacon Radar Rings */}
              <circle r="24" fill="none" stroke="#FF9F1C" strokeWidth="1" opacity="0.3" className="animate-ping" />
              <circle r="18" fill="none" stroke="#FF9F1C" strokeWidth="1.5" opacity="0.6" />
              <circle r="12" fill="#0B0F19" stroke="#FF9F1C" strokeWidth="3.5" filter="url(#neonGlowAmber)" />
              <circle r="5" fill="#FF9F1C" className="animate-pulse" />

              {/* Node Badge Tag */}
              <rect x="-75" y="-36" width="150" height="20" rx="4" fill="#181308" stroke="#FF9F1C" strokeWidth="1.5" />
              <text x="0" y="-23" fill="#FF9F1C" fontSize="9.5" fontFamily="JetBrains Mono, monospace" fontWeight="bold" textAnchor="middle">
                EVENT: THE SHATTERED CITADEL
              </text>
            </g>

            {/* Node on Utopian Variance */}
            <g transform="translate(640, 370)" className="cursor-pointer" onClick={() => setSelectedNode({ title: 'The Harmonic Singularity', act: 'Act 3 Utopian', summary: 'Cypher and Morgana reach biological synthesis without conflict.', branch: 'Utopian' })}>
              <circle r="8" fill="#0B0F19" stroke="#BD00FF" strokeWidth="2.5" />
              <circle r="3.5" fill="#BD00FF" />
              <text x="-45" y="26" fill="#BD00FF" fontSize="10" fontFamily="monospace">Synthetic Harmony</text>
            </g>

            {/* Node on Fallen Hero Arc */}
            <g transform="translate(740, 160)" className="cursor-pointer" onClick={() => setSelectedNode({ title: 'The Tyrant Protocol', act: 'Act 3 Fallen', summary: 'Kaelen absorbs the Excalibur code directly, replacing Morgana as Sovereign.', branch: 'Fallen Hero' })}>
              <circle r="8" fill="#0B0F19" stroke="#FF0055" strokeWidth="2.5" />
              <circle r="3.5" fill="#FF0055" />
              <text x="-40" y="26" fill="#FF0055" fontSize="10" fontFamily="monospace">The Tyrant Ascends</text>
            </g>

          </svg>

        </div>

        {/* Footer Quick Action Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-3 border-t border-slate-800 bg-[#0B0F19]/90 px-2 rounded-lg">
          <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
            <span className="text-[#FF9F1C] font-bold">CLICK BEACON:</span>
            <span>Select amber node "The Shattered Citadel" to inspect altered physics & causal shear.</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleAmberNodeClick}
              className="px-3 py-1.5 rounded-lg bg-amber-500/10 border border-amber-500/40 text-[#FF9F1C] hover:bg-amber-500/20 text-xs font-mono font-bold flex items-center gap-1.5 shadow-sm shadow-amber-950/50"
            >
              <AlertTriangle className="w-3.5 h-3.5" />
              <span>Inspect Shattered Citadel</span>
            </button>
            <button
              onClick={() => onOpenSynthesizer && onOpenSynthesizer()}
              className="px-3 py-1.5 rounded-lg bg-cyan-500/10 border border-cyan-500/40 text-[#00E5FF] hover:bg-cyan-500/20 text-xs font-mono font-bold flex items-center gap-1.5 shadow-sm shadow-cyan-950/50"
            >
              <Play className="w-3.5 h-3.5" />
              <span>Synthesize Active Branch</span>
            </button>
          </div>
        </div>

      </div>

      {/* --- GORGEOUS GLASSMORPHIIC MICRO-MODAL: "EVENT: THE SHATTERED CITADEL" --- */}
      {isShatteredModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="cyber-card rounded-2xl max-w-lg w-full p-6 border-2 border-amber-500/60 bg-[#0C101C]/95 backdrop-blur-2xl shadow-2xl shadow-amber-500/10 relative overflow-hidden space-y-4">
            
            {/* Glowing top line */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#FF9F1C] to-transparent" />

            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-amber-500/20 border border-amber-500/50 flex items-center justify-center text-[#FF9F1C] shadow-lg shadow-amber-500/20">
                  <AlertTriangle className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-sm font-mono font-black text-white glow-amber">
                      EVENT: THE SHATTERED CITADEL
                    </h3>
                    <span className="text-[9px] font-mono px-2 py-0.5 rounded bg-rose-500/20 text-rose-300 border border-rose-500/40 font-bold animate-pulse">
                      PARADOX DETECTED
                    </span>
                  </div>
                  <p className="text-[11px] font-mono text-slate-400">
                    Causal Fracture // Coordinates: [Sector 09-Omega]
                  </p>
                </div>
              </div>

              <button
                onClick={() => setIsShatteredModalOpen(false)}
                className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 text-sm font-mono"
              >
                ✕
              </button>
            </div>

            {/* Core Altered Immutable Laws (The requested feature) */}
            <div className="space-y-3">
              <span className="text-[10px] font-mono uppercase tracking-widest text-[#FF9F1C] font-bold block">
                // ALTERED IMMUTABLE LAWS DETECTED
              </span>

              {/* Law 1: Gravity */}
              <div className="bg-slate-950/80 p-3.5 rounded-xl border border-amber-500/30 flex items-center justify-between">
                <div>
                  <span className="text-xs font-mono font-bold text-slate-200 block">
                    PHYSICAL LAW: GRAVITATIONAL CONSTANT
                  </span>
                  <p className="text-[11px] text-slate-400 mt-0.5 font-mono">
                    Atmospheric ley-distortion sheared local orbital pressure.
                  </p>
                </div>
                <div className="px-3 py-1.5 rounded-lg bg-amber-500/20 border border-amber-500/40 text-[#FF9F1C] font-mono font-black text-xs">
                  Gravity = 0.5x
                </div>
              </div>

              {/* Law 2: Character Status */}
              <div className="bg-slate-950/80 p-3.5 rounded-xl border border-rose-500/30 flex items-center justify-between">
                <div>
                  <span className="text-xs font-mono font-bold text-slate-200 block">
                    BIOLOGICAL TRUTH: CHARACTER X (KAELEN VEX)
                  </span>
                  <p className="text-[11px] text-slate-400 mt-0.5 font-mono">
                    Synaptic feedback surge exceeded 45s maximum duration.
                  </p>
                </div>
                <div className="px-3 py-1.5 rounded-lg bg-rose-500/20 border border-rose-500/40 text-rose-300 font-mono font-black text-xs animate-pulse">
                  Status = Deceased
                </div>
              </div>
            </div>

            {/* Narrative Consequence */}
            <div className="bg-slate-950/90 p-3.5 rounded-xl border border-slate-800 text-xs font-mono space-y-1.5">
              <span className="text-[10px] uppercase font-bold text-slate-500">
                TIMELINE BRANCH REPERCUSSIONS:
              </span>
              <p className="text-slate-300 leading-relaxed text-[11px]">
                "With Kaelen offline, Lady Morgana seizes the Excalibur shard unchallenged. Neo-Avalon is plunged into a 40-year synthetic dark age under the Iron Syndicate monopoly."
              </p>
            </div>

            {/* Modal Actions */}
            <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-800">
              <button
                onClick={() => setIsShatteredModalOpen(false)}
                className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-mono"
              >
                Close Telemetry
              </button>

              <button
                onClick={() => {
                  setIsShatteredModalOpen(false);
                  if (onOpenAuditor) {
                    onOpenAuditor("In Timeline Branch #42 at The Shattered Citadel, Gravity drops to 0.5x and Kaelen Vex suffers terminal synaptic burnout, leaving Morgana unchallenged.");
                  }
                }}
                className="px-4 py-1.5 rounded-lg bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-500 hover:to-orange-500 text-white font-mono text-xs font-bold shadow-lg shadow-amber-950/50 flex items-center gap-1.5"
              >
                <ShieldAlert className="w-3.5 h-3.5" />
                <span>Audit Paradox in Watchdog</span>
              </button>
            </div>

          </div>
        </div>
      )}

      {/* Selected Regular Node Inspector (Micro Modal) */}
      {selectedNode && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="cyber-card rounded-xl max-w-md w-full p-5 border border-cyan-500/40 bg-[#0C101C] space-y-3">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2">
              <div>
                <span className="text-[10px] font-mono text-[#00E5FF] uppercase font-bold">{selectedNode.act}</span>
                <h3 className="text-sm font-mono font-bold text-white">{selectedNode.title}</h3>
              </div>
              <button onClick={() => setSelectedNode(null)} className="text-slate-400 hover:text-white font-mono text-sm">✕</button>
            </div>
            <p className="text-xs text-slate-300 font-mono bg-slate-950 p-3 rounded-lg border border-slate-800 leading-relaxed">
              {selectedNode.summary}
            </p>
            <div className="flex justify-end pt-2">
              <button
                onClick={() => {
                  setSelectedNode(null);
                  if (onOpenSynthesizer) onOpenSynthesizer();
                }}
                className="px-3 py-1.5 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-mono font-bold"
              >
                Expand in Prompt Lab →
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
