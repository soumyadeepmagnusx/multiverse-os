import React, { useState, useEffect } from 'react';
import { Search, BookOpen, User, ShieldCheck, GitBranch, ArrowRight, Sparkles } from 'lucide-react';

export default function LoreSearchModal({ isOpen, onClose, universe, onSelectResult }) {
  const [query, setQuery] = useState('');

  if (!isOpen) return null;

  // Search through all universe assets
  const results = [];
  const q = query.toLowerCase().trim();

  if (q) {
    // Search Rules
    universe.worldRules.forEach(r => {
      if (r.title.toLowerCase().includes(q) || r.rule.toLowerCase().includes(q) || r.category.toLowerCase().includes(q)) {
        results.push({
          type: 'RULE',
          title: r.title,
          subtitle: `[${r.severity}] Category: ${r.category}`,
          text: r.rule,
          icon: ShieldCheck,
          color: 'text-cyan-400'
        });
      }
    });

    // Search Characters
    universe.characters.forEach(c => {
      if (c.name.toLowerCase().includes(q) || c.archetype.toLowerCase().includes(q) || c.flaw.toLowerCase().includes(q) || c.motive.toLowerCase().includes(q)) {
        results.push({
          type: 'CHARACTER',
          title: `${c.name} (${c.archetype})`,
          subtitle: `Role: ${c.role}`,
          text: `Flaw: ${c.flaw} | Motive: ${c.motive}`,
          icon: User,
          color: 'text-purple-400'
        });
      }
    });

    // Search Timeline Beats
    universe.timelines.forEach(t => {
      t.nodes.forEach(n => {
        if (n.title.toLowerCase().includes(q) || n.summary.toLowerCase().includes(q) || (n.content && n.content.toLowerCase().includes(q))) {
          results.push({
            type: 'BEAT',
            title: `${n.title} (${n.act})`,
            subtitle: `Timeline: ${t.name}`,
            text: n.summary,
            icon: GitBranch,
            color: 'text-amber-400'
          });
        }
      });
    });
  }

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-start justify-center pt-20 p-4 font-mono">
      <div className="bg-[#0b0e1a] border border-cyan-500/40 rounded-2xl max-w-2xl w-full flex flex-col shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        
        {/* Search Input Bar */}
        <div className="flex items-center gap-3 px-4 py-3.5 border-b border-slate-800 bg-[#0d1222]">
          <Search className="w-5 h-5 text-cyan-400 shrink-0" />
          <input
            type="text"
            autoFocus
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Search universe rules, characters, lore, or timeline nodes..."
            className="w-full bg-transparent text-sm text-slate-100 placeholder-slate-500 focus:outline-none"
          />
          <button onClick={onClose} className="text-slate-400 hover:text-white text-xs px-2 py-1 bg-slate-800 rounded">
            ESC
          </button>
        </div>

        {/* Results List */}
        <div className="max-h-96 overflow-y-auto p-3 space-y-2 text-xs">
          {q && results.length === 0 && (
            <div className="p-8 text-center text-slate-500 text-xs">
              No canon rules or characters matched "{query}".
            </div>
          )}

          {!q && (
            <div className="p-6 text-center text-slate-400 text-xs space-y-2">
              <span className="text-[10px] uppercase font-bold text-slate-500 tracking-wider block">
                QUICK SEARCH SUGGESTIONS:
              </span>
              <div className="flex flex-wrap justify-center gap-2">
                {['Ley-Grid', '45', 'Morgana', 'Kaelen', 'Syndicate', 'Excalibur'].map(s => (
                  <button
                    key={s}
                    onClick={() => setQuery(s)}
                    className="px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-800 text-cyan-300 hover:border-cyan-500 text-[11px]"
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          )}

          {results.map((res, idx) => {
            const Icon = res.icon;
            return (
              <div
                key={idx}
                onClick={() => {
                  if (onSelectResult) onSelectResult(res);
                  onClose();
                }}
                className="p-3 rounded-xl bg-slate-950/70 hover:bg-slate-900 border border-slate-800/80 hover:border-cyan-500/50 cursor-pointer transition space-y-1"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Icon className={`w-3.5 h-3.5 ${res.color}`} />
                    <span className="font-bold text-white text-[12px]">{res.title}</span>
                  </div>
                  <span className="text-[9px] uppercase px-1.5 py-0.5 rounded bg-slate-900 text-slate-400 border border-slate-800">
                    {res.type}
                  </span>
                </div>
                <div className="text-[10px] text-slate-400">{res.subtitle}</div>
                <p className="text-[11px] text-slate-300 line-clamp-2 italic pt-0.5">
                  "{res.text}"
                </p>
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div className="px-4 py-2 bg-[#060810] border-t border-slate-800 text-[10px] text-slate-500 flex justify-between">
          <span>Semantic Graph RAG Parser</span>
          <span>{results.length} matches found</span>
        </div>

      </div>
    </div>
  );
}
