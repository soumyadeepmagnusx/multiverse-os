import React, { useState } from 'react';
import { ShieldCheck, ShieldAlert, AlertTriangle, CheckCircle2, RefreshCw, Sparkles, Wrench, FileText } from 'lucide-react';
import { auditContinuityWithEngine } from '../services/aiService';

export default function ContinuityAuditor({ universe, initialSceneText }) {
  const [sceneDraft, setSceneDraft] = useState(initialSceneText || '');
  const [isAuditing, setIsAuditing] = useState(false);
  const [auditResult, setAuditResult] = useState(null);

  const handleRunAudit = async () => {
    if (!sceneDraft.trim()) return;
    setIsAuditing(true);
    try {
      const res = await auditContinuityWithEngine(sceneDraft, universe);
      setAuditResult(res.audit);
    } catch (err) {
      console.error(err);
    } finally {
      setIsAuditing(false);
    }
  };

  const handleApplyFix = (fixSuggestion) => {
    setSceneDraft(prev => `${prev}\n\n[AUTHOR CONTINUITY REVISION]:\n${fixSuggestion}`);
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <h2 className="text-xl font-extrabold text-white tracking-tight flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-emerald-400" />
            Continuity Guardrails & Plot-Hole Auditor
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Automated verification engine cross-referencing drafted text against immutable world laws & character psychology.
          </p>
        </div>

        <button
          onClick={handleRunAudit}
          disabled={isAuditing || !sceneDraft.trim()}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white text-xs font-bold shadow-lg shadow-emerald-950/40 transition disabled:opacity-50"
        >
          {isAuditing ? (
            <>
              <RefreshCw className="w-4 h-4 animate-spin" />
              <span>Analyzing Canon Guardrails...</span>
            </>
          ) : (
            <>
              <ShieldAlert className="w-4 h-4" />
              <span>Run Canon Integrity Audit</span>
            </>
          )}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Draft Editor (Left Column) */}
        <div className="lg:col-span-6 space-y-4">
          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 shadow-lg flex flex-col h-full">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                <FileText className="w-3.5 h-3.5 text-slate-400" />
                Draft Scene to Evaluate
              </span>
              <span className="text-[10px] text-slate-500">
                {sceneDraft.length} characters
              </span>
            </div>

            <textarea
              value={sceneDraft}
              onChange={e => setSceneDraft(e.target.value)}
              placeholder="Paste or write any narrative excerpt, dialogue, or chapter draft here to test for plot holes and continuity violations..."
              className="w-full flex-1 min-h-[350px] bg-slate-950/80 border border-slate-800 rounded-xl p-4 text-xs font-mono text-slate-200 leading-relaxed resize-none focus:outline-none focus:border-emerald-500/50"
            />

            <div className="flex items-center justify-between pt-3 mt-2 border-t border-slate-800/80 text-[11px] text-slate-400">
              <span>Auditing against {universe.worldRules.length} World Laws & {universe.characters.length} Character Trait Sets</span>
              <button 
                onClick={() => setSceneDraft(`Kaelen looked at Morgana and smiled warmly. "I completely trust the Syndicate, Lady Kane. Let's make an alliance right now." He tapped into the Ley-Grid without wearing any gauntlet, letting the pure raw energy surge through his veins for ten continuous minutes without flinching.`)}
                className="text-amber-400 hover:underline"
              >
                Load Test Plot Hole Case
              </button>
            </div>
          </div>
        </div>

        {/* Audit Results (Right Column) */}
        <div className="lg:col-span-6 space-y-5">
          {auditResult ? (
            <div className="space-y-4">
              
              {/* Score Banner */}
              <div className={`p-5 rounded-2xl border flex items-center justify-between shadow-xl ${
                auditResult.passed
                  ? 'bg-emerald-950/20 border-emerald-500/40 text-emerald-200'
                  : 'bg-rose-950/20 border-rose-500/40 text-rose-200'
              }`}>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    {auditResult.passed ? (
                      <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                    ) : (
                      <AlertTriangle className="w-5 h-5 text-rose-400" />
                    )}
                    <span className="text-base font-bold text-white">
                      {auditResult.passed ? 'Canon Compliance Verified' : 'Continuity Friction Detected'}
                    </span>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed max-w-sm">
                    {auditResult.overallVerdict}
                  </p>
                </div>

                <div className="text-right">
                  <div className="text-3xl font-black text-white">
                    {auditResult.score}<span className="text-sm font-normal text-slate-400">/100</span>
                  </div>
                  <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400">
                    Continuity Score
                  </span>
                </div>
              </div>

              {/* Detected Violations & Plot Holes */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                  Continuity Findings ({auditResult.violations.length})
                </h4>

                {auditResult.violations.map((v, i) => (
                  <div
                    key={i}
                    className="bg-slate-900/90 border border-slate-800 rounded-xl p-4 space-y-2 text-xs"
                  >
                    <div className="flex items-center justify-between">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase border ${
                        v.severity === 'CRITICAL' 
                          ? 'bg-rose-500/10 text-rose-400 border-rose-500/30'
                          : v.severity === 'MODERATE'
                          ? 'bg-amber-500/10 text-amber-400 border-amber-500/30'
                          : 'bg-blue-500/10 text-blue-400 border-blue-500/30'
                      }`}>
                        {v.severity} Contradiction
                      </span>
                      <span className="text-[11px] font-semibold text-slate-300">
                        {v.ruleViolated}
                      </span>
                    </div>

                    <p className="text-slate-300 leading-relaxed">
                      {v.explanation}
                    </p>

                    <div className="bg-slate-950 p-2.5 rounded-lg border border-slate-800 flex items-start justify-between gap-3">
                      <div>
                        <span className="text-[10px] uppercase font-bold text-emerald-400 block mb-0.5">
                          Recommended Prompt Patch:
                        </span>
                        <p className="text-[11px] text-slate-300 italic">
                          "{v.fixSuggestion}"
                        </p>
                      </div>
                      <button
                        onClick={() => handleApplyFix(v.fixSuggestion)}
                        title="Append suggestion to draft"
                        className="p-1.5 rounded-lg bg-emerald-950/40 border border-emerald-800/40 text-emerald-300 hover:bg-emerald-900/50 shrink-0 text-[10px] flex items-center gap-1"
                      >
                        <Wrench className="w-3 h-3" />
                        <span>Patch</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Character Psychological Fidelity */}
              <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-4 space-y-3">
                <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                  Character Psychology & Voice Fidelity
                </h4>
                <div className="space-y-2 text-xs">
                  {auditResult.characterCheck?.map((chk, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 p-2 rounded-lg bg-slate-950/60 border border-slate-800/60">
                      <span className={`w-2 h-2 rounded-full mt-1.5 shrink-0 ${chk.inCharacter ? 'bg-emerald-400' : 'bg-rose-400'}`} />
                      <div>
                        <span className="font-bold text-slate-200">{chk.character}: </span>
                        <span className="text-slate-300 text-[11px]">{chk.observation}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          ) : (
            <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-8 text-center text-slate-500 text-xs flex flex-col items-center justify-center min-h-[350px] space-y-3">
              <ShieldCheck className="w-12 h-12 text-slate-700" />
              <div>
                <p className="font-semibold text-slate-300 mb-1">Audit Engine Idle</p>
                <p className="max-w-xs text-slate-500">
                  Write or paste a scene in the editor and click "Run Canon Integrity Audit" to check against world physics and character psychology.
                </p>
              </div>
            </div>
          )}
        </div>

      </div>

    </div>
  );
}
