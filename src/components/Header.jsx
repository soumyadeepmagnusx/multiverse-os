import React from 'react';
import { Sparkles, Terminal, Key, ShieldCheck, GitFork, Award } from 'lucide-react';
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
    <header className="border-b border-slate-800/80 bg-[#0d0f18]/90 backdrop-blur sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo & Hackathon Tag */}
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500 via-indigo-500 to-purple-600 flex items-center justify-center shadow-lg shadow-purple-500/20">
              <GitFork className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-bold text-lg tracking-tight bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent">
                  MultiverseOS
                </span>
                <span className="px-2 py-0.5 text-[10px] font-semibold tracking-wider uppercase rounded-full bg-purple-500/10 text-purple-400 border border-purple-500/30 flex items-center gap-1">
                  <Award className="w-3 h-3" /> GeNarrative Clash '26
                </span>
              </div>
              <p className="text-xs text-slate-400 hidden sm:block">
                Multiverse Narrative Studio & Lore Integrity Engine
              </p>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="flex items-center space-x-1 sm:space-x-2 bg-slate-900/60 p-1 rounded-xl border border-slate-800">
            <button
              onClick={() => setActiveTab('graph')}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                activeTab === 'graph'
                  ? 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white shadow'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
              }`}
            >
              Multiverse Graph
            </button>
            <button
              onClick={() => setActiveTab('lore')}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                activeTab === 'lore'
                  ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
              }`}
            >
              World & Characters
            </button>
            <button
              onClick={() => setActiveTab('synthesizer')}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                activeTab === 'synthesizer'
                  ? 'bg-gradient-to-r from-amber-600 to-orange-600 text-white shadow'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
              }`}
            >
              Prompt Lab
            </button>
            <button
              onClick={() => setActiveTab('auditor')}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all flex items-center gap-1.5 ${
                activeTab === 'auditor'
                  ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
              }`}
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              Continuity Auditor
            </button>
          </div>

          {/* Action Tools: Prompt Inspector & API Key */}
          <div className="flex items-center space-x-2">
            <button
              onClick={onOpenPromptInspector}
              title="Inspect System Prompts and Guardrails (For Hackathon Judges)"
              className="flex items-center space-x-1.5 px-2.5 py-1.5 text-xs font-medium text-purple-300 bg-purple-950/40 hover:bg-purple-900/60 border border-purple-800/50 rounded-lg transition"
            >
              <Terminal className="w-3.5 h-3.5" />
              <span className="hidden md:inline">Inspect Prompts</span>
            </button>

            <button
              onClick={onOpenApiKeyModal}
              className={`flex items-center space-x-1.5 px-2.5 py-1.5 text-xs font-medium rounded-lg border transition ${
                hasApiKey 
                  ? 'text-emerald-300 bg-emerald-950/30 border-emerald-800/50 hover:bg-emerald-900/50' 
                  : 'text-amber-300 bg-amber-950/30 border-amber-800/50 hover:bg-amber-900/50'
              }`}
            >
              <Key className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">
                {hasApiKey ? "Gemini Live API" : "Simulated Core"}
              </span>
            </button>
          </div>

        </div>
      </div>
    </header>
  );
}
