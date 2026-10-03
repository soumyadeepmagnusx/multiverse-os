import React from 'react';
import { Sparkles, Terminal, Key, ShieldCheck, GitFork, Award, LayoutDashboard, Sliders, BookOpen, Orbit } from 'lucide-react';
import { getStoredApiKey } from '../services/aiService';

export default function Header({ 
  activeTab, 
  setActiveTab, 
  onOpenPromptInspector, 
  onOpenApiKeyModal,
  universe
}) {
  const hasApiKey = Boolean(getStoredApiKey());

  return (
    <header className="border-b border-white/10 bg-[#030712]/90 backdrop-blur-2xl sticky top-0 z-40">
      <div className="max-w-[1850px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo & Command Tag */}
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#00E5FF] via-[#8B5CF6] to-[#10B981] flex items-center justify-center shadow-lg shadow-cyan-500/20">
              <Orbit className="w-5 h-5 text-white animate-spin-slow" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-mono font-black text-lg tracking-wider text-white glow-cyan">
                  MULTIVERSE//OS
                </span>
                <span className="px-2 py-0.5 text-[9px] font-mono font-bold tracking-widest uppercase rounded bg-cyan-500/10 text-[#00E5FF] border border-cyan-500/30 flex items-center gap-1">
                  <Award className="w-3 h-3 text-[#00E5FF]" /> GeNarrative Clash '26
                </span>
              </div>
              <p className="text-[10px] font-mono text-slate-400 hidden sm:block">
                OBSIDIAN NEON QUANTUM LATTICE // REALITY ARCHITECTS
              </p>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="flex items-center space-x-1 bg-black/60 p-1 rounded-xl border border-white/10 text-xs font-mono">
            
            {/* Primary Spatial View */}
            <button
              onClick={() => setActiveTab('spatial')}
              className={`px-3.5 py-1.5 rounded-lg font-bold transition-all flex items-center gap-1.5 ${
                activeTab === 'spatial'
                  ? 'bg-gradient-to-r from-cyan-500 via-indigo-600 to-purple-600 text-white shadow-lg shadow-cyan-500/30 glow-cyan'
                  : 'text-slate-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <Orbit className="w-3.5 h-3.5" />
              <span>Quantum Lattice</span>
            </button>

            {/* Industrial Command Center */}
            <button
              onClick={() => setActiveTab('command-center')}
              className={`px-3 py-1.5 rounded-lg font-bold transition-all flex items-center gap-1.5 ${
                activeTab === 'command-center'
                  ? 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <LayoutDashboard className="w-3.5 h-3.5" />
              <span>Command Center</span>
            </button>

            {/* Prompt Lab */}
            <button
              onClick={() => setActiveTab('synthesizer')}
              className={`px-3 py-1.5 rounded-lg font-bold transition-all flex items-center gap-1.5 ${
                activeTab === 'synthesizer'
                  ? 'bg-gradient-to-r from-amber-500 to-orange-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <Sliders className="w-3.5 h-3.5" />
              <span>Prompt Lab</span>
            </button>

            {/* Continuity Auditor */}
            <button
              onClick={() => setActiveTab('auditor')}
              className={`px-3 py-1.5 rounded-lg font-bold transition-all flex items-center gap-1.5 ${
                activeTab === 'auditor'
                  ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Continuity Auditor</span>
            </button>

            {/* World & Dossiers */}
            <button
              onClick={() => setActiveTab('lore')}
              className={`px-3 py-1.5 rounded-lg font-bold transition-all flex items-center gap-1.5 ${
                activeTab === 'lore'
                  ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>World Canon</span>
            </button>
          </div>

          {/* Action Tools: Prompt Inspector & API Key */}
          <div className="flex items-center space-x-2 font-mono text-xs">
            <button
              onClick={onOpenPromptInspector}
              title="Inspect System Prompts and Guardrails (For Hackathon Judges)"
              className="flex items-center space-x-1.5 px-3 py-1.5 font-bold text-purple-300 bg-purple-950/40 hover:bg-purple-900/60 border border-purple-800/60 rounded-lg transition"
            >
              <Terminal className="w-3.5 h-3.5 text-[#BD00FF]" />
              <span className="hidden md:inline">Inspect Prompts</span>
            </button>

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
                {hasApiKey ? "Gemini Live API" : "Quantum Core"}
              </span>
            </button>
          </div>

        </div>
      </div>
    </header>
  );
}
