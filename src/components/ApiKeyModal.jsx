import React, { useState } from 'react';
import { Key, Shield, Check, ExternalLink, Sparkles } from 'lucide-react';
import { getStoredApiKey, setStoredApiKey } from '../services/aiService';

export default function ApiKeyModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  const [keyInput, setKeyInput] = useState(getStoredApiKey());
  const [saved, setSaved] = useState(false);

  const handleSave = (e) => {
    e.preventDefault();
    setStoredApiKey(keyInput.trim());
    setSaved(true);
    setTimeout(() => {
      setSaved(false);
      onClose();
    }, 1000);
  };

  const handleClear = () => {
    setStoredApiKey('');
    setKeyInput('');
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-[#0e111a] border border-slate-800 rounded-2xl max-w-md w-full p-6 shadow-2xl space-y-4">
        
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
              <Key className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white">Google Gemini API Configuration</h3>
              <p className="text-[11px] text-slate-400">Connect live LLM or run in autonomous simulation mode</p>
            </div>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-white text-sm">✕</button>
        </div>

        <form onSubmit={handleSave} className="space-y-4 text-xs">
          <div>
            <label className="block text-slate-300 font-semibold mb-1">
              Gemini API Key (Optional)
            </label>
            <input
              type="password"
              value={keyInput}
              onChange={e => setKeyInput(e.target.value)}
              placeholder="AIzaSy..."
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-slate-200 font-mono text-xs focus:outline-none focus:border-emerald-500"
            />
            <p className="text-[11px] text-slate-500 mt-1">
              Your key is saved locally in your browser storage and never transmitted to any third-party server.
            </p>
          </div>

          <div className="bg-slate-950/80 p-3 rounded-xl border border-slate-800 space-y-2">
            <div className="flex items-center gap-1.5 text-slate-300 font-medium text-[11px]">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>Offline / Demo Ready</span>
            </div>
            <p className="text-[11px] text-slate-400 leading-relaxed">
              If no API key is provided, MultiverseOS seamlessly runs using its built-in high-fidelity narrative simulation engine so you and hackathon judges can test all features without API limits!
            </p>
            <a
              href="https://aistudio.google.com/app/apikey"
              target="_blank"
              rel="noreferrer"
              className="text-[11px] text-cyan-400 hover:underline inline-flex items-center gap-1"
            >
              Get a free Gemini API Key from Google AI Studio <ExternalLink className="w-3 h-3" />
            </a>
          </div>

          <div className="flex items-center justify-between pt-3 border-t border-slate-800">
            {keyInput && (
              <button
                type="button"
                onClick={handleClear}
                className="text-xs text-rose-400 hover:underline"
              >
                Clear Key
              </button>
            )}
            <div className="flex items-center gap-2 ml-auto">
              <button
                type="button"
                onClick={onClose}
                className="px-3 py-1.5 rounded-xl bg-slate-800 text-slate-300 font-medium hover:bg-slate-700"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-1.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-semibold flex items-center gap-1.5 shadow-md shadow-emerald-950/40"
              >
                {saved ? <Check className="w-3.5 h-3.5" /> : null}
                <span>{saved ? 'Saved!' : 'Save Settings'}</span>
              </button>
            </div>
          </div>
        </form>

      </div>
    </div>
  );
}
