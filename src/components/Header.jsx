import React, { useEffect } from 'react';
import { 
  Sparkles, Terminal, Key, ShieldCheck, GitFork, Award, 
  LayoutDashboard, Sliders, BookOpen, Orbit, Gamepad2, 
  GitMerge, Download, Search 
} from 'lucide-react';
import { getStoredApiKey } from '../services/aiService';

export default function Header({ 
  activeTab, 
  setActiveTab, 
  onOpenPromptInspector, 
  onOpenApiKeyModal,
  onOpenExportModal,
  onOpenSearchModal,
  universe
}) {
  const hasApiKey = Boolean(getStoredApiKey());

  // Listen for Ctrl+K shortcut
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        onOpenSearchModal();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onOpenSearchModal]);

  return (
    <header className="border-b border-white/10 bg-[#030712]/95 backdrop-blur-2xl sticky top-0 z-40 font-mono">
      <div className="max-w-[1900px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo & Hackathon Finale Tag */}
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#00E5FF] via-[#8B5CF6] to-[#10B981] flex items-center justify-center shadow-lg shadow-cyan-500/20">
              <Orbit className="w-5 h-5 text-white animate-spin-slow" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-mono font-black text-lg tracking-wider text-white glow-cyan">
                  MULTIVERSE//OS
                </span>
                <span className="px-2 py-0.5 text-[9px] font-mono font-bold tracking-widest uppercase rounded bg-emerald-500/15 text-emerald-300 border border-emerald-500/40 flex items-center gap-1 animate-pulse">
                  <Award className="w-3 h-3 text-emerald-400" /> 100% FINALE BUILD
                </span>
              </div>
              <p className="text-[10px] font-mono text-slate-400 hidden sm:block">
                TECHNO INDIA UNIVERSITY // GRAND FINALE PRODUCTION SUITE
              </p>
            </div>
          </div>

          {/* Core Navigation Tabs (All 100% Modules) */}
          <div className="flex items-center space-x-1 bg-black/60 p-1 rounded-xl border border-white/10 text-xs font-mono overflow-x-auto">
            
            {/* 1. Spatial Lattice */}
            <button
              onClick={() => setActiveTab('spatial')}
              className={`px-3 py-1.5 rounded-lg font-bold transition-all flex items-center gap-1.5 shrink-0 ${
                activeTab === 'spatial'
                  ? 'bg-gradient-to-r from-cyan-500 via-indigo-600 to-purple-600 text-white shadow-lg glow-cyan'
                  : 'text-slate-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <Orbit className="w-3.5 h-3.5" />
              <span>Quantum Lattice</span>
            </button>

            {/* 2. Interactive Playable Novel (CYOA) */}
            <button
              onClick={() => setActiveTab('play-novel')}
              className={`px-3 py-1.5 rounded-lg font-bold transition-all flex items-center gap-1.5 shrink-0 ${
                activeTab === 'play-novel'
                  ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <Gamepad2 className="w-3.5 h-3.5 text-purple-400" />
              <span>Playable Novel (CYOA)</span>
            </button>

            {/* 3. Canon Merger (Git for Storytellers) */}
            <button
              onClick={() => setActiveTab('canon-merge')}
              className={`px-3 py-1.5 rounded-lg font-bold transition-all flex items-center gap-1.5 shrink-0 ${
                activeTab === 'canon-merge'
                  ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <GitMerge className="w-3.5 h-3.5 text-blue-400" />
              <span>Canon Merger</span>
            </button>

            {/* 4. Prompt Lab */}
            <button
              onClick={() => setActiveTab('synthesizer')}
              className={`px-3 py-1.5 rounded-lg font-bold transition-all flex items-center gap-1.5 shrink-0 ${
                activeTab === 'synthesizer'
                  ? 'bg-gradient-to-r from-amber-500 to-orange-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <Sliders className="w-3.5 h-3.5 text-amber-400" />
              <span>Prompt Lab</span>
            </button>

            {/* 5. Continuity Auditor */}
            <button
              onClick={() => setActiveTab('auditor')}
              className={`px-3 py-1.5 rounded-lg font-bold transition-all flex items-center gap-1.5 shrink-0 ${
                activeTab === 'auditor'
                  ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>Continuity Auditor</span>
            </button>

            {/* 6. Command Center */}
            <button
              onClick={() => setActiveTab('command-center')}
              className={`px-3 py-1.5 rounded-lg font-bold transition-all flex items-center gap-1.5 shrink-0 ${
                activeTab === 'command-center'
                  ? 'bg-gradient-to-r from-slate-700 to-slate-800 text-white shadow-md'
                  : 'text-slate-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <LayoutDashboard className="w-3.5 h-3.5" />
              <span>Command Center</span>
            </button>

            {/* 7. World Canon */}
            <button
              onClick={() => setActiveTab('lore')}
              className={`px-3 py-1.5 rounded-lg font-bold transition-all flex items-center gap-1.5 shrink-0 ${
                activeTab === 'lore'
                  ? 'bg-gradient-to-r from-purple-800 to-indigo-800 text-white shadow-md'
                  : 'text-slate-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5 text-purple-400" />
              <span>World Canon</span>
            </button>

          </div>

          {/* Action Tools: Search, Export, Prompt Inspector, API Key */}
          <div className="flex items-center space-x-2 font-mono text-xs">
            
            {/* Semantic Search Button */}
            <button
              onClick={onOpenSearchModal}
              title="Search Canon & Lore (Ctrl + K)"
              className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-300 transition"
            >
              <Search className="w-3.5 h-3.5 text-cyan-400" />
              <span>Search Lore</span>
              <span className="px-1 py-0.2 rounded bg-black/60 text-[9px] text-slate-500 border border-slate-700">^K</span>
            </button>

            {/* Industry Export Suite Button */}
            <button
              onClick={onOpenExportModal}
              title="Export Screenplay, Kindle, or Game Engine Map"
              className="flex items-center gap-1.5 px-3 py-1.5 font-bold text-cyan-300 bg-cyan-950/40 hover:bg-cyan-900/60 border border-cyan-800/60 rounded-lg transition"
            >
              <Download className="w-3.5 h-3.5 text-[#00E5FF]" />
              <span className="hidden sm:inline">Export Suite</span>
            </button>

            {/* Prompt Inspector Modal */}
            <button
              onClick={onOpenPromptInspector}
              title="Inspect System Prompts and Guardrails (For Hackathon Judges)"
              className="flex items-center space-x-1.5 px-3 py-1.5 font-bold text-purple-300 bg-purple-950/40 hover:bg-purple-900/60 border border-purple-800/60 rounded-lg transition"
            >
              <Terminal className="w-3.5 h-3.5 text-[#BD00FF]" />
              <span className="hidden xl:inline">Inspect Prompts</span>
            </button>

            {/* Live API / Quantum Core Key */}
            <button
              onClick={onOpenApiKeyModal}
              className={`flex items-center space-x-1.5 px-3 py-1.5 font-bold rounded-lg border transition ${
                hasApiKey 
                  ? 'text-emerald-300 bg-emerald-950/30 border-emerald-800/50 hover:bg-emerald-900/50' 
                  : 'text-[#00E5FF] bg-cyan-950/30 border-cyan-800/50 hover:bg-cyan-900/50'
              }`}
            >
              <Key className="w-3.5 h-3.5 text-[#00E5FF]" />
              <span className="hidden sm:inline">
                {hasApiKey ? "Gemini Live" : "Quantum Core"}
              </span>
            </button>
          </div>

        </div>
      </div>
    </header>
  );
}
