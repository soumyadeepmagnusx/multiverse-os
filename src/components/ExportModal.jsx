import React, { useState } from 'react';
import { Download, FileText, Book, Code, X, Check, Copy } from 'lucide-react';
import { generateFountainScreenplay, generateNovelManuscript, generateTwineInteractiveMap, downloadFile } from '../services/exportService';

export default function ExportModal({ isOpen, onClose, universe }) {
  if (!isOpen) return null;

  const [activeFormat, setActiveFormat] = useState('fountain'); // 'fountain' | 'novel' | 'twine'
  const [copied, setCopied] = useState(false);

  const fountainContent = generateFountainScreenplay(universe);
  const novelContent = generateNovelManuscript(universe);
  const twineContent = generateTwineInteractiveMap(universe);

  const getCurrentContent = () => {
    if (activeFormat === 'fountain') return fountainContent;
    if (activeFormat === 'novel') return novelContent;
    return twineContent;
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(getCurrentContent());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    if (activeFormat === 'fountain') {
      downloadFile(fountainContent, `${universe.id}_screenplay.fountain`, 'text/plain');
    } else if (activeFormat === 'novel') {
      downloadFile(novelContent, `${universe.id}_manuscript.md`, 'text/markdown');
    } else {
      downloadFile(twineContent, `${universe.id}_twine_story.json`, 'application/json');
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-[#0b0e1a] border border-slate-800 rounded-2xl max-w-4xl w-full max-h-[85vh] flex flex-col shadow-2xl overflow-hidden font-mono">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-[#0d1222]">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
              <Download className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                Industry Manuscript & Screenplay Exporter
                <span className="text-[9px] px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 font-bold">
                  100% COMPLETE SUITE
                </span>
              </h3>
              <p className="text-[11px] text-slate-400">
                Export to Hollywood Screenplay (Fountain), Kindle (Markdown), or Game Engine (Twine/Ink)
              </p>
            </div>
          </div>

          <button onClick={onClose} className="text-slate-400 hover:text-white text-sm">✕</button>
        </div>

        {/* Format Selector Tabs */}
        <div className="flex items-center justify-between px-6 py-2.5 border-b border-slate-800 bg-[#080b14] text-xs">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveFormat('fountain')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-bold transition ${
                activeFormat === 'fountain'
                  ? 'bg-cyan-600 text-white shadow'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/40'
              }`}
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Fountain Screenplay (.fountain)</span>
            </button>

            <button
              onClick={() => setActiveFormat('novel')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-bold transition ${
                activeFormat === 'novel'
                  ? 'bg-purple-600 text-white shadow'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/40'
              }`}
            >
              <Book className="w-3.5 h-3.5" />
              <span>Kindle Novel (.md)</span>
            </button>

            <button
              onClick={() => setActiveFormat('twine')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-bold transition ${
                activeFormat === 'twine'
                  ? 'bg-amber-600 text-white shadow'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/40'
              }`}
            >
              <Code className="w-3.5 h-3.5" />
              <span>Twine / Ink Game Engine (.json)</span>
            </button>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopy}
              className="flex items-center gap-1 px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied' : 'Copy'}</span>
            </button>

            <button
              onClick={handleDownload}
              className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-bold text-xs shadow-md"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download File</span>
            </button>
          </div>
        </div>

        {/* Code Preview Pane */}
        <div className="p-6 overflow-y-auto flex-1 font-mono text-xs bg-[#05070d] text-slate-300 leading-relaxed">
          <pre className="whitespace-pre-wrap">{getCurrentContent()}</pre>
        </div>

      </div>
    </div>
  );
}
