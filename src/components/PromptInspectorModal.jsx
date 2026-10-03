import React, { useState } from 'react';
import { Terminal, Copy, Check, ShieldCheck, Code2, Sparkles, BookOpen } from 'lucide-react';
import { buildScenePrompt, buildContinuityAuditPrompt } from '../services/aiService';

export default function PromptInspectorModal({ isOpen, onClose, universe, activeNode }) {
  if (!isOpen) return null;

  const [activeTab, setActiveTab] = useState('system'); // 'system' | 'auditor' | 'schema'
  const [copied, setCopied] = useState(false);

  const sampleScenePrompt = buildScenePrompt({
    universe,
    characters: universe.characters,
    selectedNode: activeNode || universe.timelines[0].nodes[0],
    steerability: {
      tone: 'Grimdark / Gritty',
      pacing: 'Cinematic Pulse',
      conflictLevel: 4,
      pov: '3rd Person Intimate',
      format: 'Screenplay with Dialogue & Sensory Beats'
    },
    customInstructions: 'Reveal that Lady Morgana anticipates the neural surge.'
  });

  const sampleAuditPrompt = buildContinuityAuditPrompt(
    "Kaelen entered the chamber and plugged into the ley-resonance line for ten full minutes without wearing any cyberware.",
    universe
  );

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-[#0b0d14] border border-slate-800 rounded-2xl max-w-4xl w-full max-h-[85vh] flex flex-col shadow-2xl overflow-hidden">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-[#0f111a]">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-400">
              <Terminal className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                Prompt Engineering Architecture Inspector
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-300 font-semibold border border-purple-500/30">
                  Judges Evaluator View
                </span>
              </h3>
              <p className="text-[11px] text-slate-400">
                Inspect live context injection, dynamic prompt chaining, and schema guardrails.
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 text-sm"
          >
            ✕
          </button>
        </div>

        {/* Tab Bar */}
        <div className="flex items-center justify-between px-6 py-2 border-b border-slate-800 bg-[#0d0f17] text-xs">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveTab('system')}
              className={`px-3 py-1.5 rounded-lg font-medium transition ${
                activeTab === 'system'
                  ? 'bg-purple-600 text-white shadow'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Scene Synthesizer Chain
            </button>
            <button
              onClick={() => setActiveTab('auditor')}
              className={`px-3 py-1.5 rounded-lg font-medium transition ${
                activeTab === 'auditor'
                  ? 'bg-purple-600 text-white shadow'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Continuity Auditor Chain
            </button>
            <button
              onClick={() => setActiveTab('schema')}
              className={`px-3 py-1.5 rounded-lg font-medium transition ${
                activeTab === 'schema'
                  ? 'bg-purple-600 text-white shadow'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Structured JSON Schema
            </button>
          </div>

          <button
            onClick={() => handleCopy(activeTab === 'system' ? sampleScenePrompt : sampleAuditPrompt)}
            className="flex items-center gap-1.5 text-slate-400 hover:text-white text-xs bg-slate-800/80 px-2.5 py-1 rounded-lg border border-slate-700"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? 'Copied' : 'Copy Prompt'}</span>
          </button>
        </div>

        {/* Code View Area */}
        <div className="p-6 overflow-y-auto flex-1 font-mono text-xs bg-[#07080c] leading-relaxed text-slate-300">
          {activeTab === 'system' && (
            <pre className="whitespace-pre-wrap">{sampleScenePrompt}</pre>
          )}

          {activeTab === 'auditor' && (
            <pre className="whitespace-pre-wrap">{sampleAuditPrompt}</pre>
          )}

          {activeTab === 'schema' && (
            <pre className="whitespace-pre-wrap text-emerald-300">
{`// MultiverseOS Canon Integrity Engine Schema
{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "title": "ContinuityAuditReport",
  "type": "object",
  "properties": {
    "passed": { "type": "boolean" },
    "score": { "type": "number", "minimum": 0, "maximum": 100 },
    "violations": {
      "type": "array",
      "items": {
        "type": "object",
        "properties": {
          "severity": { "type": "string", "enum": ["CRITICAL", "MODERATE", "MINOR"] },
          "ruleViolated": { "type": "string" },
          "explanation": { "type": "string" },
          "fixSuggestion": { "type": "string" }
        },
        "required": ["severity", "ruleViolated", "explanation", "fixSuggestion"]
      }
    },
    "characterCheck": {
      "type": "array",
      "items": {
        "type": "object",
        "properties": {
          "character": { "type": "string" },
          "inCharacter": { "type": "boolean" },
          "observation": { "type": "string" }
        },
        "required": ["character", "inCharacter", "observation"]
      }
    },
    "overallVerdict": { "type": "string" }
  },
  "required": ["passed", "score", "violations", "characterCheck", "overallVerdict"]
}`}
            </pre>
          )}
        </div>

        {/* Footer Notes for Evaluators */}
        <div className="px-6 py-3 border-t border-slate-800 bg-[#0d0f17] flex items-center justify-between text-[11px] text-slate-400">
          <span>
            Technique: Dynamic Context Injection (World Lore + Character Flaws) & Zero-Shot Strict JSON Schemas.
          </span>
          <span className="text-purple-400 font-semibold">
            GeNarrative Clash 2026 Core Track
          </span>
        </div>

      </div>
    </div>
  );
}
