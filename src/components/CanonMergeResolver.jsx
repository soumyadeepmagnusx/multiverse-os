import React, { useState } from 'react';
import { GitMerge, GitPullRequest, GitBranch, AlertTriangle, CheckCircle2, ShieldCheck, ArrowRight, RefreshCw } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function CanonMergeResolver({ universe, onUpdateUniverse }) {
  const [selectedBranchId, setSelectedBranchId] = useState(universe.timelines[1]?.id || universe.timelines[0]?.id);
  const [isMerging, setIsMerging] = useState(false);
  const [mergedSuccess, setMergedSuccess] = useState(false);

  const primeTimeline = universe.timelines[0];
  const targetTimeline = universe.timelines.find(t => t.id === selectedBranchId) || universe.timelines[1];

  const handleMerge = () => {
    setIsMerging(true);
    setTimeout(() => {
      // Merge target timeline nodes into prime timeline
      const updatedTimelines = universe.timelines.map(t => {
        if (t.id === primeTimeline.id) {
          const mergedNodes = [
            ...t.nodes,
            ...targetTimeline.nodes.map(n => ({
              ...n,
              id: `merged-${n.id}`,
              act: `[MERGED CANON] ${n.act}`,
              status: 'canonical'
            }))
          ];
          return { ...t, nodes: mergedNodes };
        }
        return t;
      });

      onUpdateUniverse({
        ...universe,
        timelines: updatedTimelines
      });

      setIsMerging(false);
      setMergedSuccess(true);
      confetti({ particleCount: 70, spread: 80, origin: { y: 0.7 } });
      setTimeout(() => setMergedSuccess(false), 4000);
    }, 1200);
  };

  return (
    <div className="space-y-6 font-mono">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-cyan-500/20 text-[#00E5FF] border border-cyan-500/40 flex items-center gap-1">
              <GitMerge className="w-3.5 h-3.5" />
              CANON BRANCH MERGER // GIT FOR STORYTELLERS
            </span>
            <span className="text-xs text-slate-400">Conflict & Causal Drift Resolution</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight glow-cyan">
            Timeline Diff & Pull Request Engine
          </h2>
        </div>

        {/* Branch Selector */}
        <div className="flex items-center gap-2 text-xs">
          <span className="text-slate-400">Compare Branch:</span>
          <select
            value={selectedBranchId}
            onChange={e => setSelectedBranchId(e.target.value)}
            className="bg-slate-950 border border-slate-700 rounded-xl px-3 py-1.5 text-slate-200 focus:outline-none focus:border-cyan-500"
          >
            {universe.timelines.slice(1).map(t => (
              <option key={t.id} value={t.id}>{t.name}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Side-by-Side Diff Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left: Prime Timeline Base (Ground Truth) */}
        <div className="lg:col-span-6 cyber-card rounded-2xl p-5 border border-cyan-500/30 bg-[#0B0F1C] space-y-4 shadow-xl">
          <div className="flex items-center justify-between border-b border-slate-800 pb-2">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-white shadow-sm shadow-white" />
              <h3 className="text-sm font-bold text-white">BASE: {primeTimeline.name}</h3>
            </div>
            <span className="text-[10px] px-2 py-0.5 rounded bg-white/10 text-white font-bold border border-white/20">
              PRIME CANON
            </span>
          </div>

          <div className="space-y-3 text-xs">
            <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 space-y-1">
              <span className="text-[10px] text-slate-500 font-bold uppercase">Active Laws Enforced:</span>
              <p className="text-slate-300">All 3 Hard World Rules strictly respected (45s Ley-Grid limit).</p>
            </div>

            <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 space-y-1">
              <span className="text-[10px] text-slate-500 font-bold uppercase">Character Trajectories:</span>
              <p className="text-slate-300">• Kaelen Vex: Active / Loyal to Sister</p>
              <p className="text-slate-300">• C1-PH3R: Integrated into neural link</p>
              <p className="text-slate-300">• Lady Morgana: Antagonist / Corporate Rival</p>
            </div>

            <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 space-y-1">
              <span className="text-[10px] text-slate-500 font-bold uppercase">Total Canonical Beats:</span>
              <p className="text-cyan-400 font-bold">{primeTimeline.nodes.length} Beats Established</p>
            </div>
          </div>
        </div>

        {/* Right: Target Alternate Timeline (The Incoming Divergence) */}
        <div className="lg:col-span-6 cyber-card rounded-2xl p-5 border border-purple-500/40 bg-[#0E0F24] space-y-4 shadow-xl">
          <div className="flex items-center justify-between border-b border-slate-800 pb-2">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-purple-400" />
              <h3 className="text-sm font-bold text-white">INCOMING: {targetTimeline?.name}</h3>
            </div>
            <span className="text-[10px] px-2 py-0.5 rounded bg-purple-500/20 text-purple-300 font-bold border border-purple-500/40">
              DIVERGENT
            </span>
          </div>

          <div className="space-y-3 text-xs">
            <div className="bg-rose-950/30 p-3 rounded-xl border border-rose-500/30 space-y-1">
              <span className="text-[10px] text-rose-400 font-bold uppercase flex items-center gap-1">
                <AlertTriangle className="w-3.5 h-3.5 text-rose-400" />
                Detected Causal Conflicts:
              </span>
              <p className="text-rose-200">
                Altered law detected: "{targetTimeline?.description}"
              </p>
            </div>

            <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 space-y-1">
              <span className="text-[10px] text-slate-500 font-bold uppercase">Proposed New Beats:</span>
              {targetTimeline?.nodes.map((node, i) => (
                <div key={i} className="text-slate-300 flex items-center gap-1.5">
                  <span className="text-purple-400">+</span>
                  <span>{node.title} ({node.act})</span>
                </div>
              ))}
            </div>

            <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 space-y-1">
              <span className="text-[10px] text-slate-500 font-bold uppercase">Causal Drift Index:</span>
              <p className="text-purple-400 font-bold">14.8% Reality Shear</p>
            </div>
          </div>
        </div>

      </div>

      {/* Merge Action Card */}
      <div className="cyber-card rounded-2xl p-6 border border-slate-800 bg-[#0A0D18] flex flex-col sm:flex-row items-center justify-between gap-4 shadow-2xl">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/40 flex items-center justify-center text-[#00E5FF]">
            <GitPullRequest className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-white">Execute Canon Pull Request</h4>
            <p className="text-xs text-slate-400 mt-0.5">
              Harmonizes incoming alternate beats into the Prime Timeline while preserving canon continuity.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          {mergedSuccess ? (
            <div className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-500/20 border border-emerald-500/50 text-emerald-300 text-xs font-bold animate-pulse">
              <CheckCircle2 className="w-4 h-4" />
              <span>Canon Merged Successfully!</span>
            </div>
          ) : (
            <button
              onClick={handleMerge}
              disabled={isMerging}
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-600 via-indigo-600 to-purple-600 hover:from-cyan-500 hover:to-purple-500 text-white text-xs font-bold shadow-lg shadow-cyan-950/50 transition disabled:opacity-50"
            >
              {isMerging ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>Synthesizing Temporal Continuity...</span>
                </>
              ) : (
                <>
                  <GitMerge className="w-4 h-4" />
                  <span>Merge {targetTimeline?.name.split(':')[0]} into Prime</span>
                </>
              )}
            </button>
          )}
        </div>
      </div>

    </div>
  );
}
