import React, { useState } from 'react';
import { Sliders, Sparkles, Send, ShieldCheck, Copy, Check, Eye, RefreshCw, Wand2 } from 'lucide-react';
import { generateSceneWithEngine } from '../services/aiService';

export default function SceneSynthesizer({ 
  universe, 
  activeNode, 
  onSendToAuditor,
  onOpenPromptInspector 
}) {
  const [steerability, setSteerability] = useState({
    tone: 'Grimdark / Gritty',
    pacing: 'Cinematic Pulse',
    conflictLevel: 4,
    pov: '3rd Person Intimate',
    format: 'Screenplay with Dialogue & Sensory Beats'
  });

  const [selectedCharNames, setSelectedCharNames] = useState(
    activeNode ? activeNode.charactersInvolved : [universe.characters[0]?.name, universe.characters[1]?.name]
  );
  const [customInstructions, setCustomInstructions] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedResult, setGeneratedResult] = useState(activeNode?.content || '');
  const [copied, setCopied] = useState(false);
  const [generationMeta, setGenerationMeta] = useState(null);

  const toggleChar = (name) => {
    if (selectedCharNames.includes(name)) {
      setSelectedCharNames(selectedCharNames.filter(c => c !== name));
    } else {
      setSelectedCharNames([...selectedCharNames, name]);
    }
  };

  const handleGenerate = async () => {
    setIsGenerating(true);
    try {
      const activeChars = universe.characters.filter(c => selectedCharNames.includes(c.name));
      const res = await generateSceneWithEngine({
        universe,
        characters: activeChars.length > 0 ? activeChars : universe.characters,
        selectedNode: activeNode,
        steerability,
        customInstructions
      });

      setGeneratedResult(res.text);
      setGenerationMeta({
        isLive: res.isLive,
        timestamp: new Date().toLocaleTimeString()
      });
    } catch (err) {
      console.error(err);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedResult);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <h2 className="text-xl font-extrabold text-white tracking-tight flex items-center gap-2">
            <Sliders className="w-5 h-5 text-amber-400" />
            Prompt Engineering & Scene Synthesizer
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Steer tone, conflict, and perspective with structured prompt-chained parameters.
          </p>
        </div>

        <button
          onClick={onOpenPromptInspector}
          className="text-xs text-purple-400 hover:text-purple-300 flex items-center gap-1.5 self-start sm:self-auto bg-purple-950/40 border border-purple-800/50 px-3 py-1.5 rounded-lg"
        >
          <Eye className="w-3.5 h-3.5" />
          <span>Inspect Prompt Construction</span>
        </button>
      </div>

      {/* Grid: Controls vs Editor */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Steerability Controls (Left Column) */}
        <div className="lg:col-span-5 space-y-5 bg-slate-900/80 border border-slate-800 rounded-2xl p-5">
          
          {/* Active Story Beat Reference */}
          {activeNode && (
            <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 text-xs">
              <span className="text-[10px] uppercase font-bold text-amber-400">Contextual Story Beat:</span>
              <p className="font-semibold text-slate-200 mt-0.5">{activeNode.title}</p>
              <p className="text-slate-400 text-[11px] line-clamp-2 mt-1">{activeNode.summary}</p>
            </div>
          )}

          {/* Steerability Sliders / Selectors */}
          <div className="space-y-4 text-xs">
            
            {/* Tone Selector */}
            <div>
              <label className="block text-slate-300 font-semibold mb-1">
                Narrative Tone
              </label>
              <select
                value={steerability.tone}
                onChange={e => setSteerability({...steerability, tone: e.target.value})}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-slate-200 focus:outline-none focus:border-amber-500"
              >
                <option value="Grimdark / Gritty">Grimdark / Gritty (Heavy consequences & physical cost)</option>
                <option value="Cyber-Noir">Cyber-Noir (Cynical, rain-slicked, psychological subtext)</option>
                <option value="High Octane / Cinematic">High Octane / Cinematic (Fast beats, visceral choreography)</option>
                <option value="Philosophical / Mythic">Philosophical / Mythic (High stakes, metaphorical resonance)</option>
              </select>
            </div>

            {/* Conflict Slider */}
            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="text-slate-300 font-semibold">
                  Conflict & Tension Intensity
                </label>
                <span className="px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 font-bold text-[11px]">
                  Level {steerability.conflictLevel} / 5
                </span>
              </div>
              <input
                type="range"
                min="1"
                max="5"
                value={steerability.conflictLevel}
                onChange={e => setSteerability({...steerability, conflictLevel: parseInt(e.target.value)})}
                className="w-full accent-amber-500 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-500 mt-0.5">
                <span>1: Quiet Dialogue</span>
                <span>3: Escalating Crisis</span>
                <span>5: Lethal Stakes</span>
              </div>
            </div>

            {/* Pacing & POV Grid */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-slate-300 font-semibold mb-1">Pacing</label>
                <select
                  value={steerability.pacing}
                  onChange={e => setSteerability({...steerability, pacing: e.target.value})}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-2.5 py-2 text-slate-200"
                >
                  <option value="Slow Burn & Tension">Slow Burn</option>
                  <option value="Cinematic Pulse">Cinematic Pulse</option>
                  <option value="Rapid Fire">Rapid Fire</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Perspective (POV)</label>
                <select
                  value={steerability.pov}
                  onChange={e => setSteerability({...steerability, pov: e.target.value})}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-2.5 py-2 text-slate-200"
                >
                  <option value="3rd Person Intimate">3rd Person Intimate</option>
                  <option value="1st Person Limited">1st Person Limited</option>
                  <option value="3rd Person Omniscient">3rd Person Omniscient</option>
                </select>
              </div>
            </div>

            {/* Output Format */}
            <div>
              <label className="block text-slate-300 font-semibold mb-1">Target Format</label>
              <select
                value={steerability.format}
                onChange={e => setSteerability({...steerability, format: e.target.value})}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-slate-200"
              >
                <option value="Screenplay with Dialogue & Sensory Beats">Screenplay with Dialogue & Sensory Beats</option>
                <option value="Novelistic Prose & Internal Monologue">Novelistic Prose & Internal Monologue</option>
                <option value="Interactive Dialogue Tree (Branching Choices)">Interactive Dialogue Tree</option>
              </select>
            </div>

            {/* Characters Present */}
            <div>
              <label className="block text-slate-300 font-semibold mb-1.5">
                Cast Present in Scene
              </label>
              <div className="flex flex-wrap gap-1.5">
                {universe.characters.map(char => {
                  const isChecked = selectedCharNames.includes(char.name);
                  return (
                    <button
                      key={char.id}
                      type="button"
                      onClick={() => toggleChar(char.name)}
                      className={`px-2.5 py-1 rounded-lg text-[11px] font-medium border transition ${
                        isChecked
                          ? 'bg-amber-500/20 border-amber-500/50 text-amber-300'
                          : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'
                      }`}
                    >
                      {char.avatar} {char.name}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Custom Beat Guidance */}
            <div>
              <label className="block text-slate-300 font-semibold mb-1">
                Specific Director / Author Beats (Optional)
              </label>
              <textarea
                rows={2}
                value={customInstructions}
                onChange={e => setCustomInstructions(e.target.value)}
                placeholder="e.g. Morgana reveals she already knows Kaelen's secret cipher..."
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-slate-200 resize-none focus:outline-none focus:border-amber-500"
              />
            </div>

          </div>

          {/* Generate Button */}
          <button
            onClick={handleGenerate}
            disabled={isGenerating}
            className="w-full flex items-center justify-center space-x-2 px-4 py-3 rounded-xl bg-gradient-to-r from-amber-600 via-orange-600 to-amber-700 hover:from-amber-500 hover:to-orange-500 text-white text-xs font-bold shadow-lg shadow-orange-950/50 transition disabled:opacity-60"
          >
            {isGenerating ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin" />
                <span>Synthesizing Scene & Lore Constraints...</span>
              </>
            ) : (
              <>
                <Wand2 className="w-4 h-4" />
                <span>Synthesize Narrative Scene</span>
              </>
            )}
          </button>

        </div>

        {/* Generated Scene Output (Right Column) */}
        <div className="lg:col-span-7 flex flex-col space-y-4">
          
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 flex-1 flex flex-col shadow-xl">
            
            <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-3">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-white uppercase tracking-wider">
                  Generated Narrative Output
                </span>
                {generationMeta && (
                  <span className={`px-2 py-0.5 rounded text-[10px] font-semibold border ${
                    generationMeta.isLive 
                      ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30' 
                      : 'bg-amber-500/10 text-amber-400 border-amber-500/30'
                  }`}>
                    {generationMeta.isLive ? 'Live Gemini 1.5' : 'Simulated Multiverse Core'}
                  </span>
                )}
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleCopy}
                  className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-800 text-slate-300 hover:text-white text-xs"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? 'Copied' : 'Copy'}</span>
                </button>
              </div>
            </div>

            <textarea
              value={generatedResult}
              onChange={e => setGeneratedResult(e.target.value)}
              placeholder="Your synthesized scene will appear here. You can also edit it directly..."
              className="flex-1 w-full bg-slate-950/70 border border-slate-800/80 rounded-xl p-4 text-xs font-mono text-slate-200 leading-relaxed resize-none focus:outline-none focus:border-amber-500/50 min-h-[380px]"
            />

            {/* Quick Actions Footer */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-4 border-t border-slate-800/80 mt-3">
              <span className="text-[11px] text-slate-400">
                Tip: Edit draft freely, then run it through the Continuity Auditor.
              </span>

              <button
                onClick={() => onSendToAuditor(generatedResult)}
                disabled={!generatedResult}
                className="w-full sm:w-auto flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white text-xs font-bold shadow-md shadow-emerald-950/40 transition disabled:opacity-50"
              >
                <ShieldCheck className="w-4 h-4" />
                <span>Audit Canon & Continuity</span>
              </button>
            </div>

          </div>

        </div>

      </div>

    </div>
  );
}
