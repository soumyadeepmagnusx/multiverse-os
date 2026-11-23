import React from 'react';
import { Command, X } from 'lucide-react';

export default function KeyboardShortcutsModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  const shortcuts = [
    { key: 'Ctrl + K', desc: 'Open Semantic Lore & Canon Search' },
    { key: '?', desc: 'Toggle Keyboard Shortcuts Guide' },
    { key: 'Esc', desc: 'Close any active overlay or modal' },
    { key: 'F11', desc: 'Toggle Fullscreen Immersive Spatial Canvas' },
  ];

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 font-mono">
      <div className="bg-[#0b0e1a] border border-cyan-500/40 rounded-2xl max-w-md w-full p-6 shadow-2xl space-y-4">
        <div className="flex items-center justify-between border-b border-white/10 pb-3">
          <div className="flex items-center gap-2">
            <Command className="w-4 h-4 text-cyan-400" />
            <h3 className="text-sm font-bold text-white uppercase tracking-wider">
              Keyboard Navigation Controls
            </h3>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-white text-xs">
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="space-y-2 text-xs">
          {shortcuts.map((s, idx) => (
            <div
              key={idx}
              className="flex items-center justify-between p-2.5 rounded-xl bg-slate-950/70 border border-slate-800"
            >
              <span className="text-slate-300">{s.desc}</span>
              <kbd className="px-2 py-1 rounded bg-slate-900 border border-slate-700 text-cyan-300 text-[10px] font-bold">
                {s.key}
              </kbd>
            </div>
          ))}
        </div>

        <div className="pt-2 border-t border-white/10 text-[10px] text-slate-500 text-center">
          MultiverseOS Navigation Matrix
        </div>
      </div>
    </div>
  );
}
