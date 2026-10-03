import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import SpatialMultiverseView from './components/spatial/SpatialMultiverseView';
import QuantumParticlesBackground from './components/spatial/QuantumParticlesBackground';
import CommandCenterDashboard from './components/dashboard/CommandCenterDashboard';
import CharacterLoreDossier from './components/CharacterLoreDossier';
import SceneSynthesizer from './components/SceneSynthesizer';
import ContinuityAuditor from './components/ContinuityAuditor';
import PromptInspectorModal from './components/PromptInspectorModal';
import ApiKeyModal from './components/ApiKeyModal';
import { defaultUniverse } from './data/sampleUniverse';

export default function App() {
  const [universe, setUniverse] = useState(() => {
    const saved = localStorage.getItem('multiverse_os_universe');
    return saved ? JSON.parse(saved) : defaultUniverse;
  });

  const [activeTab, setActiveTab] = useState('spatial'); // 'spatial' | 'command-center' | 'synthesizer' | 'auditor' | 'lore'
  const [activeNode, setActiveNode] = useState(universe.timelines[0]?.nodes[0]);
  const [auditorDraftText, setAuditorDraftText] = useState('');
  const [isPromptInspectorOpen, setIsPromptInspectorOpen] = useState(false);
  const [isApiKeyModalOpen, setIsApiKeyModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);

  // Sync universe state to localStorage
  useEffect(() => {
    localStorage.setItem('multiverse_os_universe', JSON.stringify(universe));
  }, [universe]);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleSendSceneToAuditor = (sceneText) => {
    setAuditorDraftText(sceneText);
    setActiveTab('auditor');
    showToast("Scene drafted & loaded into Canon Continuity Auditor!");
  };

  return (
    <div className="min-h-screen bg-[#030712] text-slate-200 flex flex-col font-mono relative selection:bg-cyan-500/30 selection:text-cyan-200 overflow-x-hidden">
      
      {/* Drifting Ambient Quantum Particles & Moving Grid Canvas */}
      <QuantumParticlesBackground />

      {/* Industrial Obsidian Header */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenPromptInspector={() => setIsPromptInspectorOpen(true)}
        onOpenApiKeyModal={() => setIsApiKeyModalOpen(true)}
        universe={universe}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-[1850px] w-full mx-auto px-4 sm:px-6 lg:px-8 py-4 relative z-10">
        
        {/* 1. SPATIAL QUANTUM LATTICE VIEW (70% Canvas + 30% Integrity Core) */}
        {activeTab === 'spatial' && (
          <SpatialMultiverseView
            onOpenSynthesizer={() => setActiveTab('synthesizer')}
            onOpenAuditor={(text) => {
              if (text) setAuditorDraftText(text);
              setActiveTab('auditor');
            }}
          />
        )}

        {/* 2. INDUSTRIAL DATA-DENSE COMMAND CENTER VIEW */}
        {activeTab === 'command-center' && (
          <CommandCenterDashboard
            universe={universe}
            onOpenSynthesizer={() => setActiveTab('synthesizer')}
            onOpenAuditor={(text) => {
              if (text) setAuditorDraftText(text);
              setActiveTab('auditor');
            }}
          />
        )}

        {/* 3. STEERABLE PROMPT LAB */}
        {activeTab === 'synthesizer' && (
          <SceneSynthesizer
            universe={universe}
            activeNode={activeNode}
            onSendToAuditor={handleSendSceneToAuditor}
            onOpenPromptInspector={() => setIsPromptInspectorOpen(true)}
          />
        )}

        {/* 4. CONTINUITY GUARDRAIL AUDITOR */}
        {activeTab === 'auditor' && (
          <ContinuityAuditor
            universe={universe}
            initialSceneText={auditorDraftText}
          />
        )}

        {/* 5. WORLD CANON & CHARACTER DOSSIERS */}
        {activeTab === 'lore' && (
          <CharacterLoreDossier
            universe={universe}
            onUpdateUniverse={setUniverse}
          />
        )}

      </main>

      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#0A1020] border border-[#00E5FF]/70 text-white px-4 py-2.5 rounded-xl shadow-2xl text-xs font-mono font-bold flex items-center gap-2 glow-cyan animate-bounce">
          <span className="w-2 h-2 rounded-full bg-[#00E5FF] animate-ping" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Obsidian Footer */}
      <footer className="border-t border-white/10 bg-[#030712]/90 backdrop-blur-xl py-3 text-xs font-mono text-slate-500 relative z-10">
        <div className="max-w-[1850px] mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center space-x-2">
            <span className="text-[#00E5FF] font-bold">MULTIVERSE//OS v3.0 SPATIAL</span>
            <span>•</span>
            <span className="text-slate-400">OBSIDIAN NEON LATTICE // TECHNO INDIA UNIVERSITY HACKATHON</span>
          </div>
          <div className="flex items-center space-x-4">
            <button
              onClick={() => {
                if (window.confirm("Reset universe to initial demo state?")) {
                  localStorage.removeItem('multiverse_os_universe');
                  setUniverse(defaultUniverse);
                  setActiveNode(defaultUniverse.timelines[0].nodes[0]);
                  showToast("Quantum ground state restored!");
                }
              }}
              className="text-slate-500 hover:text-slate-300 underline"
            >
              Reset Quantum State
            </button>
            <span>•</span>
            <span className="text-[#10B981] font-semibold">100% Causal Synchronization</span>
          </div>
        </div>
      </footer>

      {/* Modals */}
      <PromptInspectorModal
        isOpen={isPromptInspectorOpen}
        onClose={() => setIsPromptInspectorOpen(false)}
        universe={universe}
        activeNode={activeNode}
      />

      <ApiKeyModal
        isOpen={isApiKeyModalOpen}
        onClose={() => setIsApiKeyModalOpen(false)}
      />

    </div>
  );
}
