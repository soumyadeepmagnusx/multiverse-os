import React, { useState } from 'react';
import LoreIntegrityWatchdog from './LoreIntegrityWatchdog';
import QuantumTimelineTapestry from './QuantumTimelineTapestry';
import PsychologicalMatrixPanel from './PsychologicalMatrixPanel';

export default function CommandCenterDashboard({ 
  universe, 
  onOpenSynthesizer, 
  onOpenAuditor 
}) {
  const [watchdogStability, setWatchdogStability] = useState(94.2);

  const handleRuleToggle = (ruleName, isEnabled) => {
    // Dynamically adjust stability based on rule alterations
    setWatchdogStability(prev => {
      const delta = isEnabled ? 1.5 : -2.8;
      const updated = Math.min(100, Math.max(70, Number((prev + delta).toFixed(1))));
      return updated;
    });
  };

  return (
    <div className="space-y-4">
      
      {/* 3-COLUMN DESKTOP COMMAND CENTER GRID */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-5 items-stretch">
        
        {/* COLUMN 1: LEFT PANEL (Lore Integrity Watchdog) */}
        <div className="xl:col-span-3 flex flex-col h-full">
          <LoreIntegrityWatchdog 
            stability={watchdogStability} 
          />
        </div>

        {/* COLUMN 2: CENTER PANEL (The Hero Element: Quantum Timeline Tapestry) */}
        <div className="xl:col-span-6 flex flex-col h-full">
          <QuantumTimelineTapestry 
            onOpenSynthesizer={onOpenSynthesizer}
            onOpenAuditor={onOpenAuditor}
          />
        </div>

        {/* COLUMN 3: RIGHT PANEL (Psychological Consistency & Reality Rules) */}
        <div className="xl:col-span-3 flex flex-col h-full">
          <PsychologicalMatrixPanel 
            onRuleToggle={handleRuleToggle}
          />
        </div>

      </div>

    </div>
  );
}
