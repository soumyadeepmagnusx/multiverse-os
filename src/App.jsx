import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import TimelineGraph from './components/TimelineGraph';
import CharacterLoreDossier from './components/CharacterLoreDossier';
import SceneSynthesizer from './components/SceneSynthesizer';
import ContinuityAuditor from './components/ContinuityAuditor';
import PromptInspectorModal from './components/PromptInspectorModal';
import ApiKeyModal from './components/ApiKeyModal';
import { defaultUniverse } from './data/sampleUniverse';
import confetti from 'canvas-confetti';

export default function App() {
  const [universe, setUniverse] = useState(() => {
    const saved = localStorage.getItem('multiverse_os_universe');
    return saved ? JSON.parse(saved) : defaultUniverse;
  });

  const [activeTab, setActiveTab] = useState('graph'); // 'graph' | 'lore' | 'synthesizer' | 'auditor'
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
    setTimeout(() => setToastMessage(null), 3000);
  };

  // Add new branch to multiverse
  const handleAddBranch = ({ timelineName, parentNode, title, summary }) => {
    const newBeatId = `node-${Date.now()}`;
    const newBeat = {
      id: newBeatId,
      title,
      act: `Multiverse Splinter: ${title}`,
      summary,
      charactersInvolved: parentNode.charactersInvolved,
      divergencePoint: `Diverged from "${parentNode.title}"`,
      status: 'alternate',
      content: `The timeline sheared open at the moment of decision. Unlike the Prime universe, ${summary}`
    };

    // Check if timeline exists or create new
    const existingTimelineIndex = universe.timelines.findIndex(t => t.name.toLowerCase() === timelineName.toLowerCase());

    let updatedTimelines = [...universe.timelines];

    if (existingTimelineIndex >= 0) {
      updatedTimelines[existingTimelineIndex] = {
        ...updatedTimelines[existingTimelineIndex],
        nodes: [...updatedTimelines[existingTimelineIndex].nodes, newBeat]
      };
    } else {
      updatedTimelines.push({
        id: `timeline-${Date.now()}`,
        name: timelineName,
        color: 'from-fuchsia-500 to-rose-600',
        description: `Splintered from beat "${parentNode.title}"`,
        nodes: [newBeat]
      });
    }

    setUniverse({
      ...universe,
      timelines: updatedTimelines
    });

    setActiveNode(newBeat);
    confetti({ particleCount: 50, spread: 60, origin: { y: 0.8 } });
    showToast(`Multiverse branch "${title}" forged successfully!`);
  };

  // Switch to synthesizer with selected node context
  const handleSelectNodeForSynthesis = (node) => {
    setActiveNode(node);
    setActiveTab('synthesizer');
  };

  // Switch to auditor with selected node or scene text
  const handleSelectNodeForAudit = (node) => {
    setActiveNode(node);
    setAuditorDraftText(node.content || node.summary);
    setActiveTab('auditor');
  };

  const handleSendSceneToAuditor = (sceneText) => {
    setAuditorDraftText(sceneText);
    setActiveTab('auditor');
    showToast("Scene loaded into Canon Continuity Auditor!");
  };

  return (
    <div className="min-h-screen bg-[#08090e] text-slate-100 flex flex-col font-sans">
      
      {/* Global Header */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenPromptInspector={() => setIsPromptInspectorOpen(true)}
        onOpenApiKeyModal={() => setIsApiKeyModalOpen(true)}
        universe={universe}
      />

      {/* Main App Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        
        {activeTab === 'graph' && (
          <TimelineGraph
            universe={universe}
            onSelectNodeForSynthesis={handleSelectNodeForSynthesis}
            onSelectNodeForAudit={handleSelectNodeForAudit}
            onAddBranch={handleAddBranch}
          />
        )}

        {activeTab === 'lore' && (
          <CharacterLoreDossier
            universe={universe}
            onUpdateUniverse={setUniverse}
          />
        )}

        {activeTab === 'synthesizer' && (
          <SceneSynthesizer
            universe={universe}
            activeNode={activeNode}
            onSendToAuditor={handleSendSceneToAuditor}
            onOpenPromptInspector={() => setIsPromptInspectorOpen(true)}
          />
        )}

        {activeTab === 'auditor' && (
          <ContinuityAuditor
            universe={universe}
            initialSceneText={auditorDraftText}
          />
        )}

      </main>

      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-4 py-2.5 rounded-xl shadow-2xl text-xs font-semibold flex items-center gap-2 animate-bounce">
          <span>✨</span>
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Footer */}
      <footer className="border-t border-slate-900 bg-[#06070a] py-6 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center space-x-2">
            <span className="font-semibold text-slate-400">MultiverseOS v1.0</span>
            <span>•</span>
            <span>Kolkata's Ultimate GenAI Hackathon (GeNarrative Clash '26)</span>
          </div>
          <div className="flex items-center space-x-4">
            <button
              onClick={() => {
                if (window.confirm("Reset universe to initial demo state?")) {
                  localStorage.removeItem('multiverse_os_universe');
                  setUniverse(defaultUniverse);
                  setActiveNode(defaultUniverse.timelines[0].nodes[0]);
                  showToast("Demo universe restored!");
                }
              }}
              className="text-slate-500 hover:text-slate-300 underline"
            >
              Reset Demo Data
            </button>
            <span>•</span>
            <span className="text-purple-400/80">Offline 6-Hour Sprint Ready</span>
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
