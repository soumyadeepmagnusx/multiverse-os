import React, { useState } from 'react';
import { GitBranch, GitCommit, Play, ShieldAlert, Plus, Sparkles, Compass, CheckCircle2 } from 'lucide-react';

export default function TimelineGraph({ 
  universe, 
  onSelectNodeForSynthesis, 
  onSelectNodeForAudit,
  onAddBranch 
}) {
  const [selectedTimelineId, setSelectedTimelineId] = useState(universe.timelines[0].id);
  const [activeNode, setActiveNode] = useState(universe.timelines[0].nodes[0]);
  const [isForkModalOpen, setIsForkModalOpen] = useState(false);
  const [forkData, setForkData] = useState({
    title: '',
    whatIfPremise: '',
    targetTimelineName: 'Timeline Epsilon: The Defiance Arc'
  });

  const currentTimeline = universe.timelines.find(t => t.id === selectedTimelineId) || universe.timelines[0];

  const handleCreateFork = (e) => {
    e.preventDefault();
    if (!forkData.title || !forkData.whatIfPremise) return;
    
    onAddBranch({
      timelineName: forkData.targetTimelineName,
      parentNode: activeNode,
      title: forkData.title,
      summary: forkData.whatIfPremise
    });

    setIsForkModalOpen(false);
    setForkData({ title: '', whatIfPremise: '', targetTimelineName: '' });
  };

  return (
    <div className="space-y-6">
      
      {/* Top Banner / Summary */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950/40 to-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
          <GitBranch className="w-48 h-48 text-cyan-400" />
        </div>
        <div className="max-w-3xl">
          <div className="flex items-center gap-2 mb-2">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
              Active Universe
            </span>
            <span className="text-xs text-slate-400">{universe.genre}</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mb-2">
            {universe.title}
          </h1>
          <p className="text-sm text-slate-300 leading-relaxed mb-4">
            {universe.logline}
          </p>
          <div className="flex flex-wrap items-center gap-4 text-xs text-slate-400">
            <div><strong className="text-slate-200">{universe.timelines.length}</strong> Active Timelines</div>
            <span className="text-slate-700">•</span>
            <div><strong className="text-slate-200">{universe.characters.length}</strong> Dossiers</div>
            <span className="text-slate-700">•</span>
            <div><strong className="text-slate-200">{universe.worldRules.length}</strong> Canon Laws Enforced</div>
          </div>
        </div>
      </div>

      {/* Timeline Selector Bar */}
      <div className="flex items-center justify-between gap-3 overflow-x-auto pb-2">
        <div className="flex items-center gap-2">
          {universe.timelines.map(timeline => (
            <button
              key={timeline.id}
              onClick={() => {
                setSelectedTimelineId(timeline.id);
                if (timeline.nodes.length > 0) setActiveNode(timeline.nodes[0]);
              }}
              className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl border text-xs font-medium transition-all ${
                selectedTimelineId === timeline.id
                  ? 'bg-slate-800 border-cyan-500/50 text-cyan-200 shadow-md shadow-cyan-950/50'
                  : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700'
              }`}
            >
              <div className={`w-2.5 h-2.5 rounded-full bg-gradient-to-r ${timeline.color}`} />
              <span>{timeline.name}</span>
              <span className="ml-1.5 px-1.5 py-0.5 rounded-md text-[10px] bg-slate-800 text-slate-400 border border-slate-700">
                {timeline.nodes.length} beats
              </span>
            </button>
          ))}
        </div>

        <button
          onClick={() => setIsForkModalOpen(true)}
          className="flex items-center space-x-2 px-3.5 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white text-xs font-semibold shadow-lg shadow-purple-900/30 transition shrink-0"
        >
          <GitFork className="w-4 h-4" />
          <span>Fork Multiverse Branch</span>
        </button>
      </div>

      {/* Main Graph Grid: Left Node Sequence, Right Beat Inspector */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Node Stream */}
        <div className="lg:col-span-7 space-y-4">
          <div className="flex items-center justify-between text-xs text-slate-400 mb-1 px-1">
            <span className="font-semibold uppercase tracking-wider text-slate-300">
              Timeline Beats & Divergence Points
            </span>
            <span>{currentTimeline.description}</span>
          </div>

          <div className="relative pl-6 space-y-6 before:content-[''] before:absolute before:left-3 before:top-4 before:bottom-4 before:w-0.5 before:bg-gradient-to-b before:from-cyan-500 before:via-purple-500 before:to-slate-800">
            {currentTimeline.nodes.map((node, index) => {
              const isSelected = activeNode?.id === node.id;
              return (
                <div
                  key={node.id}
                  onClick={() => setActiveNode(node)}
                  className={`relative p-5 rounded-2xl border transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-slate-800/90 border-cyan-500 shadow-xl shadow-cyan-950/30 ring-1 ring-cyan-500/50'
                      : 'bg-slate-900/70 border-slate-800 hover:border-slate-700 hover:bg-slate-850'
                  }`}
                >
                  {/* Node Connector Dot */}
                  <div className={`absolute -left-[27px] top-6 w-3.5 h-3.5 rounded-full border-2 transition-all ${
                    isSelected 
                      ? 'bg-cyan-400 border-white ring-4 ring-cyan-500/20' 
                      : 'bg-slate-900 border-slate-600'
                  }`} />

                  <div className="flex items-start justify-between gap-3 mb-2">
                    <div>
                      <span className="text-[11px] font-semibold text-cyan-400 tracking-wide uppercase">
                        {node.act}
                      </span>
                      <h3 className="text-base font-bold text-white mt-0.5">
                        {node.title}
                      </h3>
                    </div>
                    <span className={`px-2 py-0.5 text-[10px] font-semibold rounded-md uppercase border ${
                      node.status === 'canonical'
                        ? 'bg-blue-500/10 text-blue-400 border-blue-500/30'
                        : 'bg-purple-500/10 text-purple-400 border-purple-500/30'
                    }`}>
                      {node.status}
                    </span>
                  </div>

                  <p className="text-xs text-slate-300 leading-relaxed line-clamp-2 mb-3">
                    {node.summary}
                  </p>

                  {node.divergencePoint && (
                    <div className="text-[11px] bg-purple-950/40 border border-purple-800/40 rounded-lg p-2 text-purple-300 flex items-center gap-1.5 mb-3">
                      <Sparkles className="w-3.5 h-3.5 text-purple-400 shrink-0" />
                      <span>{node.divergencePoint}</span>
                    </div>
                  )}

                  <div className="flex items-center justify-between text-[11px] text-slate-400 pt-2 border-t border-slate-800/60">
                    <div className="flex items-center gap-1.5">
                      <span>Cast:</span>
                      {node.charactersInvolved.map((charName, i) => (
                        <span key={i} className="px-1.5 py-0.5 rounded bg-slate-800 text-slate-200 text-[10px]">
                          {charName}
                        </span>
                      ))}
                    </div>
                    <span className="text-cyan-400 font-medium hover:underline">
                      Inspect Beat →
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Selected Beat Detailed Inspector */}
        <div className="lg:col-span-5">
          {activeNode ? (
            <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sticky top-24 shadow-2xl space-y-5">
              
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <div>
                  <span className="text-xs font-semibold text-purple-400 uppercase tracking-wider">
                    {activeNode.act}
                  </span>
                  <h2 className="text-lg font-bold text-white mt-0.5">
                    {activeNode.title}
                  </h2>
                </div>
                <div className="w-8 h-8 rounded-lg bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
                  <Compass className="w-4 h-4" />
                </div>
              </div>

              <div>
                <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1.5">
                  Narrative Premise & Divergence Logic
                </h4>
                <p className="text-xs text-slate-300 leading-relaxed bg-slate-950/60 p-3 rounded-xl border border-slate-800/60">
                  {activeNode.summary}
                </p>
              </div>

              {activeNode.content && (
                <div>
                  <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1.5">
                    Generated Canonical Excerpt
                  </h4>
                  <div className="text-xs text-slate-200 font-serif leading-relaxed italic bg-slate-950/80 p-3.5 rounded-xl border border-slate-800/80 max-h-48 overflow-y-auto">
                    "{activeNode.content}"
                  </div>
                </div>
              )}

              <div>
                <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                  Dossier Presence in this Beat
                </h4>
                <div className="flex flex-wrap gap-2">
                  {activeNode.charactersInvolved.map((charName, i) => (
                    <div key={i} className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-800 text-xs text-slate-200 border border-slate-700">
                      <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                      <span>{charName}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-2 pt-2 border-t border-slate-800">
                <button
                  onClick={() => onSelectNodeForSynthesis(activeNode)}
                  className="w-full flex items-center justify-center space-x-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-500 hover:to-orange-500 text-white text-xs font-semibold shadow-lg shadow-orange-950/40 transition"
                >
                  <Play className="w-4 h-4" />
                  <span>Expand Scene in Prompt Lab</span>
                </button>

                <button
                  onClick={() => onSelectNodeForAudit(activeNode)}
                  className="w-full flex items-center justify-center space-x-2 px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-750 border border-slate-700 text-slate-200 text-xs font-semibold transition"
                >
                  <ShieldAlert className="w-4 h-4 text-emerald-400" />
                  <span>Audit Beat Continuity & Canon</span>
                </button>
              </div>

            </div>
          ) : (
            <div className="bg-slate-900/50 border border-slate-800/60 rounded-2xl p-8 text-center text-slate-500 text-xs">
              Select a story beat from the timeline to inspect its lore parameters.
            </div>
          )}
        </div>

      </div>

      {/* Fork Multiverse Modal */}
      {isForkModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-lg w-full p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <GitBranch className="w-5 h-5 text-purple-400" />
                <h3 className="text-base font-bold text-white">Fork New Multiverse Timeline</h3>
              </div>
              <button 
                onClick={() => setIsForkModalOpen(false)}
                className="text-slate-400 hover:text-white text-sm"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateFork} className="space-y-4 text-xs">
              <div>
                <label className="block text-slate-300 font-semibold mb-1">
                  Originating Story Beat
                </label>
                <div className="bg-slate-950 p-2.5 rounded-lg border border-slate-800 text-slate-400">
                  Forking from: <strong className="text-slate-200">{activeNode?.title || "Node 1"}</strong>
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">
                  Target Timeline Name
                </label>
                <input
                  type="text"
                  value={forkData.targetTimelineName}
                  onChange={(e) => setForkData({...forkData, targetTimelineName: e.target.value})}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-slate-200 focus:outline-none focus:border-purple-500"
                  placeholder="e.g. Timeline Epsilon: The Defiance Arc"
                  required
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">
                  New Beat Title
                </label>
                <input
                  type="text"
                  value={forkData.title}
                  onChange={(e) => setForkData({...forkData, title: e.target.value})}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-slate-200 focus:outline-none focus:border-purple-500"
                  placeholder="e.g. The Quantum Betrayal"
                  required
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">
                  The "What If?" Divergence Premise
                </label>
                <textarea
                  rows={3}
                  value={forkData.whatIfPremise}
                  onChange={(e) => setForkData({...forkData, whatIfPremise: e.target.value})}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-slate-200 focus:outline-none focus:border-purple-500 resize-none"
                  placeholder="What key decision or accident caused the timeline to fracture here? (e.g. Cypher rejects human damping and takes over the power grid)"
                  required
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsForkModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 hover:bg-slate-700 font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-semibold shadow-lg shadow-purple-900/30"
                >
                  Create Multiverse Node
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}

function GitFork(props) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="18" r="3"></circle>
      <circle cx="6" cy="6" r="3"></circle>
      <circle cx="18" cy="6" r="3"></circle>
      <path d="M18 9v1a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2V9"></path>
      <path d="M12 12v3"></path>
    </svg>
  );
}
