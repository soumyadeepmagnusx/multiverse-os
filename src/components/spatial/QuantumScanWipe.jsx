import React, { useState, useEffect } from 'react';

export default function QuantumScanWipe({ onComplete }) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
      if (onComplete) onComplete();
    }, 2200);

    return () => clearTimeout(timer);
  }, [onComplete]);

  if (!visible) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-[9999] overflow-hidden">
      {/* Razor-thin glowing cyan scanline wiping down screen */}
      <div className="quantum-scan-line" />
      
      {/* Subtle sweeping ambient glow flash behind line */}
      <div className="absolute inset-0 bg-gradient-to-b from-cyan-500/5 via-transparent to-transparent pointer-events-none animate-pulse" />
    </div>
  );
}
