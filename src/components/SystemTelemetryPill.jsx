import React, { useState, useEffect } from 'react';
import { Activity, Cpu } from 'lucide-react';

export default function SystemTelemetryPill() {
  const [fps, setFps] = useState(60);

  useEffect(() => {
    let frameCount = 0;
    let lastTime = performance.now();
    let animId;

    const calculateFps = (currentTime) => {
      frameCount++;
      if (currentTime - lastTime >= 1000) {
        setFps(Math.min(60, Math.round((frameCount * 1000) / (currentTime - lastTime))));
        frameCount = 0;
        lastTime = currentTime;
      }
      animId = requestAnimationFrame(calculateFps);
    };

    animId = requestAnimationFrame(calculateFps);
    return () => cancelAnimationFrame(animId);
  }, []);

  return (
    <div className="flex items-center gap-3 font-mono text-[10px] text-slate-400 bg-black/40 px-3 py-1 rounded-full border border-white/10">
      <div className="flex items-center gap-1">
        <Activity className="w-3 h-3 text-cyan-400" />
        <span className="text-slate-500">FPS:</span>
        <span className="text-cyan-300 font-bold">{fps}</span>
      </div>
      <span className="text-slate-700">•</span>
      <div className="flex items-center gap-1">
        <Cpu className="w-3 h-3 text-emerald-400" />
        <span className="text-slate-500">ENGINE:</span>
        <span className="text-emerald-300 font-bold">OPTIMAL</span>
      </div>
    </div>
  );
}
