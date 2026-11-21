import React, { useState, useEffect } from 'react';
import { Gamepad2, Volume2, VolumeX, Sparkles, Compass, ShieldAlert, RotateCcw, Heart, Brain, Award, Play, ChevronRight, User } from 'lucide-react';
import { voiceEngine } from '../services/voiceService';
import { callGeminiApi } from '../services/aiService';

export default function PlayableNovelMode({ universe }) {
  // Player state
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const [isGeneratingNext, setIsGeneratingNext] = useState(false);
  const [customActionText, setCustomActionText] = useState('');
  
  // Dynamic player stats
  const [playerStats, setPlayerStats] = useState({
    sanity: 68,
    trust: 45,
    rebellion: 82,
    leyResonance: 12 // seconds (max 45s)
  });

  // Story history sequence
  const [storyHistory, setStoryHistory] = useState([
    {
      title: "Act 1: The Rain-Slicked Infiltration",
      scene: "Acid rain hisses as it strikes your chrome forearm gauntlet. You and Cypher crouch behind an exhaust turbine beneath Kane Biotech Tower. An armored courier transport halts thirty meters away, carrying the dormant Excalibur shard.",
      speaker: "Kaelen Vex",
      quote: "Three seconds before their tracer burns my optic feed. Cypher, override their blast locks now.",
      choices: [
        {
          id: 'c1',
          text: "Hack transport coolant lines to trigger an EMP blackout",
          statChange: { sanity: -5, trust: +10, rebellion: +5, leyResonance: +10 },
          nextBeat: "The EMP detonates with a deafening pulse of violet sparks. The courier convoy locks up, alarms howling across the lower wards."
        },
        {
          id: 'c2',
          text: "Negotiate remotely with Lady Morgana's proxy terminal",
          statChange: { sanity: +5, trust: -15, rebellion: -10, leyResonance: 0 },
          nextBeat: "Morgana's holographic sigil flickers into your visor. Her voice is calm silk: 'A sensible proposal, Kaelen. Step forward unarmed.'"
        },
        {
          id: 'c3',
          text: "Tap directly into the Ley-Grid to overclock your reflex servos (Warning: Hard Canon Rule)",
          statChange: { sanity: -20, trust: 0, rebellion: +25, leyResonance: +25 },
          nextBeat: "Raw cyan ley-fire rushes through your neural socket. Your vision blooms into blinding static as the 45-second cognitive countdown begins!"
        }
      ]
    }
  ]);

  const currentBeat = storyHistory[currentStepIndex] || storyHistory[0];

  useEffect(() => {
    voiceEngine.subscribeState(playing => setIsAudioPlaying(playing));
    return () => voiceEngine.stop();
  }, []);

  const handlePlayVoice = (text, character = 'narrator') => {
    if (isAudioPlaying) {
      voiceEngine.stop();
    } else {
      voiceEngine.speakText(text, character);
    }
  };

  const handleSelectChoice = async (choice) => {
    setIsGeneratingNext(true);
    voiceEngine.stop();

    // Update stats
    setPlayerStats(prev => ({
      sanity: Math.max(0, Math.min(100, prev.sanity + (choice.statChange.sanity || 0))),
      trust: Math.max(0, Math.min(100, prev.trust + (choice.statChange.trust || 0))),
      rebellion: Math.max(0, Math.min(100, prev.rebellion + (choice.statChange.rebellion || 0))),
      leyResonance: Math.max(0, Math.min(45, prev.leyResonance + (choice.statChange.leyResonance || 0)))
    }));

    // Dynamic prompt to generate next branching situation
    const nextPrompt = `You are the MultiverseOS Interactive CYOA Engine.
World: Neo-Avalon 2099. Player chose: "${choice.text}".
Previous outcome: "${choice.nextBeat}".
Current Ley Resonance: ${playerStats.leyResonance + (choice.statChange.leyResonance || 0)}s / 45s.
Generate the next interactive scene with:
1. Short gripping atmospheric narrative (2-3 sentences).
2. A character quote.
3. Three distinct tactical choices.
Return strictly valid JSON:
{
  "title": "Act Scene Title",
  "scene": "Narrative paragraph...",
  "speaker": "Character Name",
  "quote": "Character spoken line...",
  "choices": [
    { "id": "1", "text": "Choice A...", "statChange": { "sanity": -5, "trust": 5, "rebellion": 5, "leyResonance": 5 }, "nextBeat": "Outcome A..." },
    { "id": "2", "text": "Choice B...", "statChange": { "sanity": 5, "trust": -5, "rebellion": -5, "leyResonance": 0 }, "nextBeat": "Outcome B..." },
    { "id": "3", "text": "Choice C...", "statChange": { "sanity": -15, "trust": 0, "rebellion": 15, "leyResonance": 15 }, "nextBeat": "Outcome C..." }
  ]
}`;

    let newBeat = null;
    try {
      const res = await callGeminiApi(nextPrompt, true);
      if (res.isLive && res.text) {
        newBeat = JSON.parse(res.text);
      }
    } catch (e) {
      console.warn("Live generation fallback to deterministic branch", e);
    }

    if (!newBeat) {
      newBeat = {
        title: `Branch Splinter #${storyHistory.length + 1}: The Aftermath`,
        scene: choice.nextBeat + " Syndicate defense drones descend from the skyways, spotlights cutting through the smoke. The choice you made has permanently altered timeline integrity.",
        speaker: choice.text.includes("Morgana") ? "Lady Morgana Kane" : "C1-PH3R",
        quote: choice.text.includes("Morgana") 
          ? "You play a dangerous game, Kaelen. But I admire audacity." 
          : "Causal trajectory adjusted. Probability of survival: 61.4%.",
        choices: [
          {
            id: 'c-next-1',
            text: "Breach the central data vault before lockdown seals the sector",
            statChange: { sanity: -10, trust: 10, rebellion: 10, leyResonance: 10 },
            nextBeat: "The vault door melts under your thermal lance, revealing your sister's pulsing memory core!"
          },
          {
            id: 'c-next-2',
            text: "Retreat through the sewer conduits to regroup with the underground faction",
            statChange: { sanity: 10, trust: 5, rebellion: -5, leyResonance: -5 },
            nextBeat: "You vanish into the subterranean shadows, enforcers losing your thermal trail."
          }
        ]
      };
    }

    setStoryHistory(prev => [...prev, newBeat]);
    setCurrentStepIndex(prev => prev + 1);
    setIsGeneratingNext(false);
  };

  const handleCustomAction = () => {
    if (!customActionText.trim()) return;
    handleSelectChoice({
      id: `custom-${Date.now()}`,
      text: `[CUSTOM ACTION]: ${customActionText}`,
      statChange: { sanity: -5, trust: 5, rebellion: 10, leyResonance: 5 },
      nextBeat: `You enact your plan: "${customActionText}". The environment shifts in response to your unpredictable decision.`
    });
    setCustomActionText('');
  };

  return (
    <div className="space-y-6">
      
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold font-mono bg-purple-500/20 text-purple-300 border border-purple-500/40 flex items-center gap-1">
              <Gamepad2 className="w-3.5 h-3.5 text-purple-400" />
              PLAYABLE CYOA NOVEL ENGINE (100% COMPLETE)
            </span>
            <span className="text-xs text-slate-400 font-mono">Real-Time Reality Divergence</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black font-mono text-white tracking-tight glow-cyan">
            {universe.title}: Interactive Fiction Mode
          </h2>
        </div>

        {/* Global Reset */}
        <button
          onClick={() => {
            voiceEngine.stop();
            setCurrentStepIndex(0);
            setPlayerStats({ sanity: 68, trust: 45, rebellion: 82, leyResonance: 12 });
          }}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-700 text-slate-300 hover:text-white text-xs font-mono transition"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Rewind to Inception</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left Column: Interactive Story Passage & Dialogue */}
        <div className="lg:col-span-8 space-y-5">
          
          <div className="cyber-card rounded-2xl p-6 border border-cyan-500/30 bg-[#0B0F1E] shadow-2xl space-y-5 relative overflow-hidden">
            
            {/* Scene Header */}
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div>
                <span className="text-[10px] font-mono font-bold text-cyan-400 uppercase tracking-widest">
                  BEAT #{currentStepIndex + 1} OF TIMELINE VECTOR
                </span>
                <h3 className="text-lg font-bold font-mono text-white mt-0.5">
                  {currentBeat.title}
                </h3>
              </div>

              {/* TTS Voice Narration Button */}
              <button
                onClick={() => handlePlayVoice(`${currentBeat.scene}. ${currentBeat.speaker} says: ${currentBeat.quote}`, currentBeat.speaker)}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-xl border text-xs font-mono font-bold transition ${
                  isAudioPlaying
                    ? 'bg-rose-500/20 text-rose-300 border-rose-500/50 animate-pulse'
                    : 'bg-cyan-500/10 text-cyan-300 border-cyan-500/40 hover:bg-cyan-500/20'
                }`}
              >
                {isAudioPlaying ? <VolumeX className="w-4 h-4 text-rose-400" /> : <Volume2 className="w-4 h-4 text-cyan-400" />}
                <span>{isAudioPlaying ? 'Mute Voice' : 'Play Narration (TTS)'}</span>
              </button>
            </div>

            {/* Narrative Scene Text */}
            <div className="text-sm font-serif leading-relaxed text-slate-200 bg-slate-950/70 p-5 rounded-xl border border-slate-800/80 tracking-wide">
              {currentBeat.scene}
            </div>

            {/* Character Spoken Dialogue Box */}
            {currentBeat.quote && (
              <div className="bg-gradient-to-r from-purple-950/40 via-slate-950 to-slate-950 p-4 rounded-xl border-l-4 border-purple-500 border-t border-r border-b border-purple-500/20 space-y-1">
                <div className="flex items-center gap-2 text-xs font-mono font-bold text-purple-300">
                  <User className="w-3.5 h-3.5 text-purple-400" />
                  <span>{currentBeat.speaker}:</span>
                </div>
                <p className="text-xs font-mono italic text-slate-100 pl-5">
                  "{currentBeat.quote}"
                </p>
              </div>
            )}

            {/* Branching Choice Selectors */}
            <div className="space-y-3 pt-3 border-t border-slate-800">
              <span className="text-[11px] font-mono uppercase tracking-widest text-[#00E5FF] font-bold block">
                // SELECT YOUR DIVERGENCE PATH:
              </span>

              <div className="space-y-2.5">
                {currentBeat.choices.map((choice, idx) => (
                  <button
                    key={choice.id || idx}
                    disabled={isGeneratingNext}
                    onClick={() => handleSelectChoice(choice)}
                    className="w-full text-left p-3.5 rounded-xl bg-slate-900/90 hover:bg-slate-850 border border-slate-700/80 hover:border-cyan-500 text-xs font-mono text-slate-200 transition-all flex items-center justify-between gap-3 group shadow-md hover:shadow-cyan-950/50 disabled:opacity-50"
                  >
                    <div className="flex items-start gap-3">
                      <span className="w-6 h-6 rounded-lg bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 flex items-center justify-center font-bold shrink-0 text-[11px]">
                        {idx + 1}
                      </span>
                      <span className="leading-relaxed group-hover:text-cyan-200">{choice.text}</span>
                    </div>
                    <ChevronRight className="w-4 h-4 text-slate-500 group-hover:text-cyan-400 group-hover:translate-x-1 transition shrink-0" />
                  </button>
                ))}
              </div>

              {/* Freeform Player Action Input */}
              <div className="pt-2">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={customActionText}
                    onChange={e => setCustomActionText(e.target.value)}
                    onKeyDown={e => e.key === 'Enter' && handleCustomAction()}
                    placeholder="Or type a custom action... (e.g. 'Throw a decoy grenade into the ventilation duct')"
                    className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-xs font-mono text-slate-200 focus:outline-none focus:border-cyan-500"
                  />
                  <button
                    onClick={handleCustomAction}
                    disabled={!customActionText.trim() || isGeneratingNext}
                    className="px-4 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-mono text-xs font-bold transition disabled:opacity-50"
                  >
                    Execute
                  </button>
                </div>
              </div>

            </div>

          </div>

        </div>

        {/* Right Column: Player Psychological & Reality Telemetry */}
        <div className="lg:col-span-4 space-y-5 font-mono">
          
          <div className="cyber-card rounded-2xl p-5 border border-slate-800 bg-[#0E1424] space-y-4 shadow-xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2">
              <span className="text-[10px] uppercase tracking-wider text-slate-400 font-bold flex items-center gap-1.5">
                <Brain className="w-3.5 h-3.5 text-purple-400" />
                Player Neural Status
              </span>
              <span className="text-[9px] px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-300 border border-cyan-500/30">
                ACTIVE COHESION
              </span>
            </div>

            {/* Stat Bars */}
            <div className="space-y-3 text-xs">
              
              {/* Ley Resonance Hazard Limit */}
              <div>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-slate-300 font-bold flex items-center gap-1 text-[11px]">
                    <ShieldAlert className="w-3 h-3 text-rose-400" />
                    Ley-Grid Resonance (Hard Rule)
                  </span>
                  <span className={`text-[11px] font-bold ${playerStats.leyResonance > 35 ? 'text-rose-400 animate-pulse' : 'text-cyan-400'}`}>
                    {playerStats.leyResonance}s / 45s Max
                  </span>
                </div>
                <div className="w-full bg-slate-900 rounded-full h-2 overflow-hidden border border-slate-800">
                  <div
                    className={`h-full transition-all duration-500 ${
                      playerStats.leyResonance > 35 ? 'bg-rose-500' : 'bg-cyan-400'
                    }`}
                    style={{ width: `${(playerStats.leyResonance / 45) * 100}%` }}
                  />
                </div>
                {playerStats.leyResonance >= 45 && (
                  <span className="text-[10px] text-rose-400 block mt-1 animate-pulse font-bold">
                    ⚠️ COGNITIVE BURN IMMINENT: Law #1 Violated!
                  </span>
                )}
              </div>

              {/* Sanity */}
              <div>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-slate-300 text-[11px]">Psychological Sanity</span>
                  <span className="text-slate-200 font-bold">{playerStats.sanity}%</span>
                </div>
                <div className="w-full bg-slate-900 rounded-full h-1.5 overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 transition-all duration-500"
                    style={{ width: `${playerStats.sanity}%` }}
                  />
                </div>
              </div>

              {/* Syndicate Trust */}
              <div>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-slate-300 text-[11px]">Morgana / Syndicate Trust</span>
                  <span className="text-slate-200 font-bold">{playerStats.trust}%</span>
                </div>
                <div className="w-full bg-slate-900 rounded-full h-1.5 overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-purple-500 to-pink-500 transition-all duration-500"
                    style={{ width: `${playerStats.trust}%` }}
                  />
                </div>
              </div>

              {/* Rebellion */}
              <div>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-slate-300 text-[11px]">Rebellion Faction Standing</span>
                  <span className="text-slate-200 font-bold">{playerStats.rebellion}%</span>
                </div>
                <div className="w-full bg-slate-900 rounded-full h-1.5 overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-amber-500 to-emerald-500 transition-all duration-500"
                    style={{ width: `${playerStats.rebellion}%` }}
                  />
                </div>
              </div>

            </div>

            {/* Active Character Voice Profiles */}
            <div className="pt-3 border-t border-slate-800 text-[11px] space-y-1.5">
              <span className="text-[10px] uppercase font-bold text-slate-500 block">
                INTEGRATED VOICE SYNTHESIS CADENCE:
              </span>
              <div className="bg-slate-950 p-2.5 rounded-lg border border-slate-800 space-y-1 text-slate-300 text-[10px]">
                <div>• Kaelen Vex: Clipped baritone (0.8 pitch, 1.05 rate)</div>
                <div>• Lady Morgana: Aristocratic silk (1.15 pitch, 0.9 rate)</div>
                <div>• C1-PH3R: Quantized robotic cadence (0.65 pitch)</div>
              </div>
            </div>

          </div>

        </div>

      </div>

    </div>
  );
}
