import React, { useState } from 'react';
import { Users, BookOpen, Plus, ShieldCheck, Sparkles, MessageSquare, AlertTriangle } from 'lucide-react';

export default function CharacterLoreDossier({ universe, onUpdateUniverse }) {
  const [activeSection, setActiveSection] = useState('characters'); // 'characters' | 'rules'
  
  // New character state
  const [newChar, setNewChar] = useState({
    name: '',
    role: '',
    archetype: 'The Antihero',
    traits: '',
    voiceQuirks: '',
    flaw: '',
    motive: '',
    avatar: '🎭'
  });
  const [isCharModalOpen, setIsCharModalOpen] = useState(false);

  // New rule state
  const [newRule, setNewRule] = useState({
    title: '',
    rule: '',
    category: 'Physics & Tech',
    severity: 'Hard Rule'
  });
  const [isRuleModalOpen, setIsRuleModalOpen] = useState(false);

  const handleAddCharacter = (e) => {
    e.preventDefault();
    if (!newChar.name) return;

    const charObj = {
      ...newChar,
      id: `char-${Date.now()}`,
      traits: newChar.traits.split(',').map(t => t.trim()).filter(Boolean)
    };

    onUpdateUniverse({
      ...universe,
      characters: [...universe.characters, charObj]
    });

    setIsCharModalOpen(false);
    setNewChar({
      name: '',
      role: '',
      archetype: 'The Antihero',
      traits: '',
      voiceQuirks: '',
      flaw: '',
      motive: '',
      avatar: '🎭'
    });
  };

  const handleAddRule = (e) => {
    e.preventDefault();
    if (!newRule.title || !newRule.rule) return;

    const ruleObj = {
      ...newRule,
      id: `rule-${Date.now()}`
    };

    onUpdateUniverse({
      ...universe,
      worldRules: [...universe.worldRules, ruleObj]
    });

    setIsRuleModalOpen(false);
    setNewRule({
      title: '',
      rule: '',
      category: 'Physics & Tech',
      severity: 'Hard Rule'
    });
  };

  return (
    <div className="space-y-6">
      
      {/* Navigation Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <h2 className="text-xl font-extrabold text-white tracking-tight flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-purple-400" />
            World Canon & Character Intelligence
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Governing lore constraints injected directly into LLM system prompts and continuity guardrails.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex bg-slate-900/80 p-1 rounded-xl border border-slate-800 text-xs">
            <button
              onClick={() => setActiveSection('characters')}
              className={`px-3 py-1.5 rounded-lg font-medium transition ${
                activeSection === 'characters'
                  ? 'bg-purple-600 text-white'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Characters ({universe.characters.length})
            </button>
            <button
              onClick={() => setActiveSection('rules')}
              className={`px-3 py-1.5 rounded-lg font-medium transition ${
                activeSection === 'rules'
                  ? 'bg-purple-600 text-white'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Canon Laws ({universe.worldRules.length})
            </button>
          </div>

          {activeSection === 'characters' ? (
            <button
              onClick={() => setIsCharModalOpen(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-semibold shadow-md shadow-purple-900/30 transition"
            >
              <Plus className="w-4 h-4" />
              <span>Add Dossier</span>
            </button>
          ) : (
            <button
              onClick={() => setIsRuleModalOpen(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-semibold shadow-md shadow-purple-900/30 transition"
            >
              <Plus className="w-4 h-4" />
              <span>Add Law</span>
            </button>
          )}
        </div>
      </div>

      {/* Characters View */}
      {activeSection === 'characters' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {universe.characters.map((char) => (
            <div 
              key={char.id}
              className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 hover:border-purple-500/40 transition-all flex flex-col justify-between space-y-4 shadow-lg shadow-black/20"
            >
              <div>
                <div className="flex items-start justify-between gap-3 mb-2">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl p-2 rounded-xl bg-slate-800 border border-slate-700">
                      {char.avatar || '⚡'}
                    </span>
                    <div>
                      <h3 className="text-base font-bold text-white">{char.name}</h3>
                      <p className="text-[11px] text-purple-400 font-medium">{char.archetype}</p>
                    </div>
                  </div>
                </div>

                <p className="text-xs text-slate-300 leading-relaxed italic mb-3">
                  "{char.role}"
                </p>

                {/* Character Traits */}
                <div className="space-y-2 text-xs">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
                      Psychological Traits
                    </span>
                    <div className="flex flex-wrap gap-1.5 mt-1">
                      {char.traits.map((t, idx) => (
                        <span key={idx} className="px-2 py-0.5 rounded-md bg-slate-800 text-slate-300 text-[10px] border border-slate-700">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="pt-2 border-t border-slate-800/80">
                    <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
                      Voice Cadence & Quirks
                    </span>
                    <p className="text-[11px] text-slate-300 mt-0.5 bg-slate-950/60 p-2 rounded-lg border border-slate-800/50">
                      {char.voiceQuirks}
                    </p>
                  </div>

                  <div className="pt-2 border-t border-slate-800/80">
                    <span className="text-[10px] uppercase font-bold text-rose-400 tracking-wider flex items-center gap-1">
                      <AlertTriangle className="w-3 h-3 text-rose-400" />
                      Fatal Psychological Flaw
                    </span>
                    <p className="text-[11px] text-rose-200/90 mt-0.5">
                      {char.flaw}
                    </p>
                  </div>
                </div>
              </div>

              <div className="pt-2 border-t border-slate-800 text-[11px] text-slate-400">
                <span className="font-semibold text-slate-300">Prime Motive:</span> {char.motive}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Rules View */}
      {activeSection === 'rules' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {universe.worldRules.map((rule) => (
            <div
              key={rule.id}
              className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 hover:border-cyan-500/40 transition-all flex flex-col justify-between space-y-4 shadow-lg shadow-black/20"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 uppercase tracking-wide">
                    {rule.category}
                  </span>
                  <span className="px-2 py-0.5 rounded-md text-[10px] font-semibold bg-rose-500/10 text-rose-400 border border-rose-500/30">
                    {rule.severity}
                  </span>
                </div>

                <h3 className="text-base font-bold text-white mb-2">
                  {rule.title}
                </h3>

                <p className="text-xs text-slate-300 leading-relaxed bg-slate-950/60 p-3 rounded-xl border border-slate-800/60">
                  {rule.rule}
                </p>
              </div>

              <div className="flex items-center gap-1.5 text-[10px] text-emerald-400 font-medium pt-2 border-t border-slate-800">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Continuity Guardrail Active</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal: Add Character */}
      {isCharModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-lg w-full p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Users className="w-5 h-5 text-purple-400" />
                Add New Character Dossier
              </h3>
              <button onClick={() => setIsCharModalOpen(false)} className="text-slate-400 hover:text-white">✕</button>
            </div>

            <form onSubmit={handleAddCharacter} className="space-y-3 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Name</label>
                  <input
                    type="text"
                    value={newChar.name}
                    onChange={e => setNewChar({...newChar, name: e.target.value})}
                    placeholder="e.g. Jax Thorn"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-slate-200"
                    required
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Archetype</label>
                  <input
                    type="text"
                    value={newChar.archetype}
                    onChange={e => setNewChar({...newChar, archetype: e.target.value})}
                    placeholder="e.g. The Reluctant Mentor"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-slate-200"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Role / Description</label>
                <input
                  type="text"
                  value={newChar.role}
                  onChange={e => setNewChar({...newChar, role: e.target.value})}
                  placeholder="e.g. Black-market memory archivist"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-slate-200"
                  required
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Key Traits (comma separated)</label>
                <input
                  type="text"
                  value={newChar.traits}
                  onChange={e => setNewChar({...newChar, traits: e.target.value})}
                  placeholder="e.g. Paranoic, Photographic Memory, Methodical"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-slate-200"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Voice Cadence & Quirks</label>
                <input
                  type="text"
                  value={newChar.voiceQuirks}
                  onChange={e => setNewChar({...newChar, voiceQuirks: e.target.value})}
                  placeholder="e.g. Whispers when speaking truth, taps fingers rhythmically"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-slate-200"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Fatal Flaw</label>
                  <input
                    type="text"
                    value={newChar.flaw}
                    onChange={e => setNewChar({...newChar, flaw: e.target.value})}
                    placeholder="e.g. Greed for forbidden knowledge"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-slate-200"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Primary Motive</label>
                  <input
                    type="text"
                    value={newChar.motive}
                    onChange={e => setNewChar({...newChar, motive: e.target.value})}
                    placeholder="e.g. Avenge fallen comrades"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-slate-200"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsCharModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-semibold shadow-lg shadow-purple-900/30"
                >
                  Save Dossier
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal: Add Rule */}
      {isRuleModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-lg w-full p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-cyan-400" />
                Add World Canon Law
              </h3>
              <button onClick={() => setIsRuleModalOpen(false)} className="text-slate-400 hover:text-white">✕</button>
            </div>

            <form onSubmit={handleAddRule} className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-300 font-semibold mb-1">Law Title</label>
                <input
                  type="text"
                  value={newRule.title}
                  onChange={e => setNewRule({...newRule, title: e.target.value})}
                  placeholder="e.g. The Synthetic Ban of 2088"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-slate-200"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Category</label>
                  <select
                    value={newRule.category}
                    onChange={e => setNewRule({...newRule, category: e.target.value})}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-slate-200"
                  >
                    <option value="Physics & Tech">Physics & Tech</option>
                    <option value="Society & Law">Society & Law</option>
                    <option value="Lore & Mythos">Lore & Mythos</option>
                    <option value="Biology & Neural">Biology & Neural</option>
                  </select>
                </div>
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Severity</label>
                  <select
                    value={newRule.severity}
                    onChange={e => setNewRule({...newRule, severity: e.target.value})}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-slate-200"
                  >
                    <option value="Hard Rule">Hard Rule (Strict Canon)</option>
                    <option value="Soft Rule">Soft Rule (Cultural Norm)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Law Definition & Constraints</label>
                <textarea
                  rows={3}
                  value={newRule.rule}
                  onChange={e => setNewRule({...newRule, rule: e.target.value})}
                  placeholder="State the immutable rule, physical constraint, or legal boundary..."
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-slate-200 resize-none"
                  required
                />
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsRuleModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-semibold shadow-lg shadow-cyan-900/30"
                >
                  Save Canon Law
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
