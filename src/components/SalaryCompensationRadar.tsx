import React, { useState } from 'react';
import { 
  SALARY_BANDS, 
  METRO_HUBS 
} from '../data/telemetryData';
import { CareerTrack } from '../types';
import { 
  DollarSign, 
  TrendingUp, 
  MapPin, 
  Sparkles, 
  Copy, 
  Check, 
  Calculator
} from 'lucide-react';

interface SalaryCompensationRadarProps {
  onToast: (msg: string) => void;
  targetRole: string;
  activeTrack?: CareerTrack;
}

export const SalaryCompensationRadar: React.FC<SalaryCompensationRadarProps> = ({
  onToast,
  targetRole,
  activeTrack
}) => {
  const [selectedLevel, setSelectedLevel] = useState<'L4' | 'L5' | 'L6' | 'L7'>('L6');
  
  const activeBands = activeTrack?.salaryBands || SALARY_BANDS;
  const currentBand = activeBands.find(b => b.level === selectedLevel) || activeBands[2];

  // Negotiation Playbook Calculator State
  const [currentBase, setCurrentBase] = useState<number>(Math.round(currentBand.baseSalary / 1000));
  const [competingOffer, setCompetingOffer] = useState<number>(Math.round(currentBand.totalComp / 1000));
  const [copiedScript, setCopiedScript] = useState(false);

  const leverageDifference = Math.max(0, competingOffer - currentBase);
  const suggestedCounterOffer = Math.round(competingOffer * 1.08);

  const techStack = activeTrack 
    ? `${activeTrack.primaryLanguages.join(', ')} and ${activeTrack.frameworks.slice(0, 3).join(', ')}`
    : 'distributed systems and production infrastructure';

  const negotiationScript = `Dear [Hiring Manager / Recruiter],

Thank you sincerely for extending the offer for the ${targetRole || activeTrack?.title} position. I am thrilled about the opportunity to architect and scale the mission-critical initiatives we discussed.

After reviewing current market benchmarks for ${selectedLevel} tiers and considering a competing active offer at $${competingOffer}k total compensation, I would be prepared to accept and sign immediately if we can align the package to $${suggestedCounterOffer}k (structured with a base adjustment to $${Math.round(currentBase + leverageDifference * 0.55)}k and the balance in performance equity).

Given my specialized technical background in ${techStack}, I am confident I will deliver immediate architectural leverage to the team from week one.

Best regards,
[Your Name]`;

  const handleCopyScript = () => {
    navigator.clipboard.writeText(negotiationScript);
    setCopiedScript(true);
    setTimeout(() => setCopiedScript(false), 2000);
    onToast('Negotiation counter-offer script copied to clipboard!');
  };

  return (
    <div className="flex flex-col gap-8 pb-12 animate-fadeIn">
      
      {/* Header Context */}
      <div className="flex flex-col gap-1">
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-mono text-emerald-700 tracking-widest uppercase font-bold">
            GLOBAL MARKET VALUATION // COMPENSATION
          </span>
          <span className="text-[11px] font-mono px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-300 flex items-center gap-1.5 font-bold">
            <TrendingUp className="w-3.5 h-3.5 text-emerald-600" />
            +34% YoY Growth Index
          </span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-display font-extrabold text-on-surface">
          Salary &amp; Compensation Radar
        </h1>
        <p className="text-xs sm:text-sm text-on-surface-variant font-medium">
          Interactive L4–L7 leveling band heatmap, metro location compensation indices, and AI counter-offer leverage scripts.
        </p>
      </div>

      {/* 1. Interactive Leveling Band Heatmap (L4, L5, L6, L7) */}
      <section className="p-6 rounded-2xl glass-panel border border-border flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <DollarSign className="w-5 h-5 text-emerald-600" />
            <h2 className="text-lg font-bold text-on-surface">Interactive Leveling Band Heatmap</h2>
          </div>
          <span className="text-xs font-mono text-on-surface-variant font-medium">Base vs. Equity / RSU Split</span>
        </div>

        {/* Level Switcher Selector */}
        <div className="grid grid-cols-4 gap-2 p-1.5 rounded-xl bg-slate-50 border border-border">
          {activeBands.map((band) => (
            <button
              key={band.level}
              onClick={() => setSelectedLevel(band.level)}
              className={`py-2 px-3 rounded-lg text-xs font-mono font-bold transition-all text-center cursor-pointer ${
                selectedLevel === band.level
                  ? 'bg-gradient-to-r from-emerald-500 to-teal-700 text-white shadow-sm'
                  : 'text-on-surface-variant hover:text-on-surface'
              }`}
            >
              {band.level} ({band.totalComp / 1000}k)
            </button>
          ))}
        </div>

        {/* Selected Level Breakdown Card */}
        {(() => {
          const currentBand = activeBands.find(b => b.level === selectedLevel) || activeBands[2];
          return (
            <div className="p-5 rounded-xl bg-white border border-emerald-300 flex flex-col gap-4 shadow-sm">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <span className="text-[11px] font-mono text-emerald-700 uppercase font-bold tracking-wider">
                    Tier Designation • {currentBand.level}
                  </span>
                  <h3 className="text-lg font-bold text-on-surface">{currentBand.title}</h3>
                </div>
                <div className="flex items-center gap-3">
                  <div className="text-right">
                    <span className="text-2xl sm:text-3xl font-display font-extrabold text-emerald-600">
                      ${(currentBand.totalComp / 1000).toFixed(0)}k
                    </span>
                    <span className="text-[10px] font-mono text-on-surface-variant block font-medium">Median Annual Comp</span>
                  </div>
                  <span className="px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 font-mono text-xs font-bold border border-emerald-300">
                    {currentBand.yoyGrowth} YoY
                  </span>
                </div>
              </div>

              {/* Base vs Equity Visual Stacked Bar */}
              <div className="flex flex-col gap-2">
                <div className="flex justify-between text-xs font-mono">
                  <span className="text-emerald-700 font-semibold flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-sm bg-emerald-500" />
                    Base Salary: ${(currentBand.baseSalary / 1000).toFixed(0)}k ({Math.round((currentBand.baseSalary / currentBand.totalComp) * 100)}%)
                  </span>
                  <span className="text-teal-700 font-semibold flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-sm bg-teal-600" />
                    Equity / RSU: ${(currentBand.equity / 1000).toFixed(0)}k ({Math.round((currentBand.equity / currentBand.totalComp) * 100)}%)
                  </span>
                </div>

                <div className="w-full h-3 rounded-full bg-slate-100 overflow-hidden flex">
                  <div 
                    className="h-full bg-emerald-500"
                    style={{ width: `${(currentBand.baseSalary / currentBand.totalComp) * 100}%` }}
                  />
                  <div 
                    className="h-full bg-teal-600"
                    style={{ width: `${(currentBand.equity / currentBand.totalComp) * 100}%` }}
                  />
                </div>
              </div>
            </div>
          );
        })()}
      </section>

      {/* 2. Top Global Hiring Hubs */}
      <section className="p-6 rounded-2xl glass-panel border border-border flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <MapPin className="w-5 h-5 text-emerald-600" />
            <h2 className="text-lg font-bold text-on-surface">Top Global AI Engineering Hubs</h2>
          </div>
          <span className="text-xs font-mono text-emerald-700 font-bold">Verified Openings</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {METRO_HUBS.map((hub, idx) => (
            <div 
              key={idx}
              className="p-4 rounded-xl glass-panel-interactive border border-border flex flex-col justify-between gap-3 relative overflow-hidden group cursor-pointer"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-sm text-on-surface">{hub.city}</h4>
                  <span className="text-xs font-mono text-on-surface-variant font-medium">{hub.country}</span>
                </div>
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 text-[10px] font-mono font-bold border border-emerald-300">
                  {hub.tier}
                </span>
              </div>

              <div className="pt-2 border-t border-border flex items-center justify-between text-xs font-mono">
                <span className="text-emerald-700 font-bold">{hub.avgComp} Avg Comp</span>
                <span className="text-on-surface-variant font-medium">{hub.openings}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. Interactive Negotiation Playbook & Leverage Calculator */}
      <section className="p-6 rounded-2xl glass-panel border border-border flex flex-col gap-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Calculator className="w-5 h-5 text-emerald-600" />
            <h2 className="text-lg font-bold text-on-surface">AI Negotiation Playbook &amp; Leverage Calculator</h2>
          </div>
          <span className="text-xs font-mono text-emerald-800 px-3 py-1 rounded-full bg-emerald-100 border border-emerald-300 font-bold">
            STRATEGY GENERATOR
          </span>
        </div>

        {/* Sliders Input */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 rounded-xl bg-slate-50 border border-border">
          <div className="flex flex-col gap-2">
            <div className="flex justify-between text-xs font-mono">
              <span className="text-on-surface-variant font-medium">Baseline Initial Offer ($k):</span>
              <span className="text-emerald-700 font-bold font-mono">${currentBase}k</span>
            </div>
            <input 
              type="range"
              min="100"
              max="500"
              step="5"
              value={currentBase}
              onChange={(e) => setCurrentBase(Number(e.target.value))}
              className="w-full accent-emerald-500 cursor-pointer"
            />
          </div>

          <div className="flex flex-col gap-2">
            <div className="flex justify-between text-xs font-mono">
              <span className="text-on-surface-variant font-medium">Competing Active Offer ($k):</span>
              <span className="text-teal-700 font-bold font-mono">${competingOffer}k</span>
            </div>
            <input 
              type="range"
              min="100"
              max="600"
              step="5"
              value={competingOffer}
              onChange={(e) => setCompetingOffer(Number(e.target.value))}
              className="w-full accent-teal-600 cursor-pointer"
            />
          </div>
        </div>

        {/* Leverage Summary Cards */}
        <div className="grid grid-cols-2 gap-3 text-xs font-mono">
          <div className="p-3 rounded-lg bg-white border border-border shadow-sm">
            <span className="text-on-surface-variant block font-medium">Negotiation Delta Leverage</span>
            <span className="text-emerald-700 font-bold text-base">+${leverageDifference}k</span>
          </div>
          <div className="p-3 rounded-lg bg-white border border-border shadow-sm">
            <span className="text-on-surface-variant block font-medium">Recommended Counter-Target</span>
            <span className="text-teal-700 font-bold text-base">${suggestedCounterOffer}k</span>
          </div>
        </div>

        {/* Generated Script Box with 1-Click Copy */}
        <div className="p-4 rounded-xl bg-[#0b0f17] border border-border flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono text-emerald-400 flex items-center gap-1.5 font-bold">
              <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
              Customized AI Counter-Offer Script (L6 Principal Tier)
            </span>
            <button
              onClick={handleCopyScript}
              className="px-3.5 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold font-mono flex items-center gap-1.5 transition-all cursor-pointer shadow-sm"
            >
              {copiedScript ? <Check className="w-3.5 h-3.5 text-white" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedScript ? 'Copied Script!' : 'Copy Counter Script'}</span>
            </button>
          </div>

          <pre className="text-xs font-mono text-emerald-300 whitespace-pre-wrap leading-relaxed select-text p-2.5 bg-[#141c2b] rounded-lg border border-slate-800 max-h-56 overflow-y-auto">
            {negotiationScript}
          </pre>
        </div>
      </section>

    </div>
  );
};
