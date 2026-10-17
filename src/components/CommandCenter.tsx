import React, { useState } from 'react';
import { NavTab, CareerTrack } from '../types';
import { 
  COMMAND_CENTER_METRICS, 
  LIVE_FEED_ITEMS, 
  LIVE_TICKER_ITEMS,
  TARGET_ROLES 
} from '../data/telemetryData';
import { CareerTrackSelector } from './CareerTrackSelector';
import { 
  Sparkles, 
  TrendingUp, 
  FileCheck, 
  Cpu, 
  Mic, 
  DollarSign, 
  ArrowRight, 
  CheckCircle2, 
  Compass, 
  Zap, 
  Radio
} from 'lucide-react';

interface CommandCenterProps {
  onNavigate: (tab: NavTab) => void;
  targetRole: string;
  onRoleChange: (role: string) => void;
  onToast: (msg: string) => void;
  activeTrack?: CareerTrack;
  onSelectTrack?: (track: CareerTrack) => void;
}

export const CommandCenter: React.FC<CommandCenterProps> = ({
  onNavigate,
  targetRole,
  onRoleChange,
  onToast,
  activeTrack,
  onSelectTrack
}) => {
  const [tickerIndex, setTickerIndex] = useState(0);

  // Live ticker rotation
  React.useEffect(() => {
    const timer = setInterval(() => {
      setTickerIndex((prev) => (prev + 1) % LIVE_TICKER_ITEMS.length);
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex flex-col gap-8 pb-12 animate-fadeIn">
      
      {/* Real-Time Live Push Notification Ticker */}
      <div className="flex items-center gap-3 p-3 rounded-2xl glass-panel border border-emerald-200/80 shadow-sm backdrop-blur-md">
        <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-mono font-bold shrink-0 border border-emerald-300">
          <Radio className="w-3.5 h-3.5 text-emerald-600 animate-pulse" />
          <span>TELEMETRY TICKER</span>
        </div>
        <div className="flex-1 overflow-hidden">
          <p className="text-xs font-mono text-on-surface truncate transition-all duration-500 font-medium">
            {LIVE_TICKER_ITEMS[tickerIndex]}
          </p>
        </div>
        <div className="hidden sm:flex items-center gap-1 text-[11px] font-mono text-emerald-700 font-bold shrink-0">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
          <span>LIVE</span>
        </div>
      </div>

      {/* Hero Section with 3D Holographic Globe Mock & Interactive Target Role Selector */}
      <section className="relative flex flex-col items-center text-center p-6 sm:p-10 overflow-hidden rounded-3xl glass-panel border border-emerald-200/80 shadow-[0_10px_30px_rgba(16,185,129,0.12)]">
        {/* Luminous Multi-stop Emerald Radial Glows */}
        <div className="absolute -top-24 -left-24 w-80 h-80 rounded-full bg-gradient-to-tr from-emerald-400/20 via-teal-300/15 to-transparent blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -right-24 w-80 h-80 rounded-full bg-gradient-to-tr from-emerald-300/20 via-teal-400/15 to-transparent blur-3xl pointer-events-none" />

        {/* 3D Holographic Globe Visual with Emerald Rings */}
        <div className="relative w-44 h-44 mb-6 flex items-center justify-center">
          <div className="absolute inset-0 rounded-full border-2 border-emerald-400/40 animate-spin-slow" />
          <div className="absolute inset-2 rounded-full border border-teal-500/40 border-dashed animate-spin-reverse" />
          <div className="absolute inset-6 rounded-full bg-gradient-to-tr from-emerald-400 via-teal-400 to-emerald-600 blur-xl opacity-40" />
          <div className="relative z-10 w-28 h-28 rounded-full bg-gradient-to-tr from-emerald-600 to-teal-800 flex items-center justify-center shadow-2xl border-2 border-emerald-300 p-5">
            <img 
              src="/logo-white.png" 
              alt="CareerPilot Symbol" 
              className="w-full h-full object-contain filter drop-shadow-[0_2px_8px_rgba(0,0,0,0.3)] animate-pulse-subtle"
            />
          </div>
          {/* Orbiting Neon Quantum Nodes */}
          <div className="absolute top-2 right-4 w-3.5 h-3.5 rounded-full bg-emerald-500 shadow-[0_0_12px_#10b981] animate-ping" />
          <div className="absolute bottom-4 left-3 w-3 h-3 rounded-full bg-teal-600 shadow-[0_0_10px_#059669]" />
        </div>

        {/* Dynamic Badge & Headline */}
        <div className="flex items-center gap-2 mb-3">
          <span className="text-[11px] font-mono tracking-widest text-emerald-800 uppercase px-3 py-1 rounded-full border border-emerald-300 bg-emerald-50 shadow-sm flex items-center gap-1.5 font-bold">
            <Zap className="w-3 h-3 text-emerald-600" />
            AUTONOMOUS FLIGHTPATH V2.4.0 • EMERALD EDITION
          </span>
        </div>

        <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold text-on-surface mb-3 tracking-tight max-w-2xl">
          Navigate Your Career with <span className="bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-500 bg-clip-text text-transparent">AI Precision</span> &amp; 3D Interactive Insights
        </h1>

        <p className="text-on-surface-variant text-sm sm:text-base max-w-xl mb-6 font-medium">
          Harness quantum-grade career modeling, live telemetry, and real-time market benchmarking to engineer your path to senior &amp; principal engineering roles.
        </p>

        {/* Target Role Selector Modal / Bar */}
        <div className="w-full max-w-md mb-6 p-2 rounded-2xl bg-white border border-border shadow-sm flex flex-col sm:flex-row items-center gap-2">
          <span className="text-xs font-mono text-on-surface-variant px-2 shrink-0 font-bold">Target Trajectory:</span>
          <select 
            value={targetRole}
            onChange={(e) => {
              onRoleChange(e.target.value);
              onToast(`Calibrated trajectory for: ${e.target.value}`);
            }}
            className="w-full bg-surface-sub text-on-surface text-xs font-bold rounded-xl px-3 py-2 border border-border outline-none focus:border-emerald-500 cursor-pointer"
          >
            {TARGET_ROLES.map((r) => (
              <option key={r} value={r} className="bg-white text-on-surface">{r}</option>
            ))}
          </select>
        </div>

        {/* Dual Glowing Emerald Action CTAs */}
        <div className="flex flex-col sm:flex-row gap-4 w-full max-w-md justify-center">
          <button 
            onClick={() => onNavigate('roadmap')}
            className="h-13 px-6 rounded-xl bg-gradient-to-r from-emerald-500 via-emerald-600 to-teal-700 text-white font-bold flex items-center justify-center gap-2 shadow-[0_4px_14px_rgba(16,185,129,0.35)] hover:shadow-[0_6px_20px_rgba(16,185,129,0.45)] hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
          >
            <Compass className="w-5 h-5" />
            <span>Explore 3D Roadmap</span>
          </button>
          <button 
            onClick={() => onNavigate('resume')}
            className="h-13 px-6 rounded-xl bg-white hover:bg-slate-50 text-emerald-800 font-bold flex items-center justify-center gap-2 border border-emerald-300 shadow-sm transition-all cursor-pointer"
          >
            <FileCheck className="w-5 h-5 text-emerald-600" />
            <span>Analyze Resume</span>
          </button>
        </div>
      </section>

      {/* Quantitative Metric Cards */}
      <section className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {COMMAND_CENTER_METRICS.map((metric) => (
          <div 
            key={metric.id}
            className="p-5 rounded-2xl glass-panel flex flex-col items-center text-center border border-border hover:border-emerald-300 transition-all hover:-translate-y-1"
          >
            <span className="text-2xl sm:text-3xl font-extrabold font-display text-emerald-600 mb-1">
              {metric.value}
            </span>
            <span className="text-xs font-bold text-on-surface uppercase tracking-wider mb-1">
              {metric.label}
            </span>
            <span className="text-[11px] font-mono text-on-surface-variant flex items-center gap-1 font-medium">
              {metric.subtext} {metric.change && <span className="text-emerald-600 font-bold">({metric.change})</span>}
            </span>
          </div>
        ))}
      </section>

      {/* 8 Modern Career Trajectory Selector */}
      <CareerTrackSelector
        activeTrackId={activeTrack?.id || 'ai-systems-architect'}
        onSelectTrack={onSelectTrack || (() => {})}
        onToast={onToast}
      />

      {/* Quick AI Tools Grid */}
      <section className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 shadow-[0_0_8px_#10b981]" />
            <h2 className="text-lg font-bold text-on-surface">AI Command Tools</h2>
          </div>
          <span className="text-[11px] font-mono text-emerald-800 px-3 py-1 rounded-full bg-emerald-100 border border-emerald-300 font-bold">
            6 MODULES ACTIVE
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          
          {/* Tool 1: Resume Audit */}
          <div 
            onClick={() => onNavigate('resume')}
            className="p-5 rounded-2xl glass-panel-interactive cursor-pointer flex flex-col gap-3 group relative overflow-hidden"
          >
            <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-emerald-500 to-teal-700 flex items-center justify-center text-white shadow-[0_4px_14px_rgba(16,185,129,0.3)]">
              <FileCheck className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-bold text-sm text-on-surface group-hover:text-emerald-700 transition-colors">Resume Diagnostic</h3>
              <p className="text-xs text-on-surface-variant mt-1 leading-relaxed">Deep-scan ATS score, 1-click bullet refiner, and JD gap match.</p>
            </div>
            <div className="mt-auto flex items-center text-xs font-bold text-emerald-700 gap-1">
              <span>Launch Optimizer</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Tool 2: Skill Gap Analyzer */}
          <div 
            onClick={() => onNavigate('skills')}
            className="p-5 rounded-2xl glass-panel-interactive cursor-pointer flex flex-col gap-3 group relative overflow-hidden"
          >
            <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-teal-500 to-emerald-600 flex items-center justify-center text-white shadow-[0_4px_14px_rgba(5,150,105,0.3)]">
              <Cpu className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-bold text-sm text-on-surface group-hover:text-emerald-700 transition-colors">Neural Capability Radar</h3>
              <p className="text-xs text-on-surface-variant mt-1 leading-relaxed">5-axis competency vector match &amp; instant 14-day micro-sprints.</p>
            </div>
            <div className="mt-auto flex items-center text-xs font-bold text-emerald-700 gap-1">
              <span>Inspect Matrix</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Tool 3: Mock Interview Lab */}
          <div 
            onClick={() => onNavigate('interview')}
            className="p-5 rounded-2xl glass-panel-interactive cursor-pointer flex flex-col gap-3 group relative overflow-hidden"
          >
            <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-800 flex items-center justify-center text-white shadow-[0_4px_14px_rgba(16,185,129,0.3)]">
              <Mic className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-bold text-sm text-on-surface group-hover:text-emerald-700 transition-colors">Mock Interview &amp; Voice</h3>
              <p className="text-xs text-on-surface-variant mt-1 leading-relaxed">Simulated L6 Bar Raiser voice drills with real-time waveform telemetry.</p>
            </div>
            <div className="mt-auto flex items-center text-xs font-bold text-emerald-700 gap-1">
              <span>Start Voice Session</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Tool 4: Salary Predictor */}
          <div 
            onClick={() => onNavigate('salary')}
            className="p-5 rounded-2xl glass-panel-interactive cursor-pointer flex flex-col gap-3 group relative overflow-hidden"
          >
            <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-emerald-500 to-teal-700 flex items-center justify-center text-white shadow-[0_4px_14px_rgba(16,185,129,0.3)]">
              <DollarSign className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-bold text-sm text-on-surface group-hover:text-emerald-700 transition-colors">Salary &amp; Comp Radar</h3>
              <p className="text-xs text-on-surface-variant mt-1 leading-relaxed">L4-L7 leveling band heatmap, metro hubs, and negotiation leverage scripts.</p>
            </div>
            <div className="mt-auto flex items-center text-xs font-bold text-emerald-700 gap-1">
              <span>Analyze Compensation</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

        </div>
      </section>

      {/* Live AI Feed & Recommendations */}
      <section className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 shadow-[0_0_8px_#10b981]" />
            <h2 className="text-lg font-bold text-on-surface">Live Market &amp; Skill Feed</h2>
          </div>
          <span className="text-[11px] font-mono text-emerald-800 px-3 py-1 rounded-full bg-emerald-100 border border-emerald-300 font-bold">
            UPDATED IN REAL-TIME
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {LIVE_FEED_ITEMS.map((item) => (
            <div 
              key={item.id}
              className="p-5 rounded-2xl glass-panel flex flex-col gap-3 border border-border relative overflow-hidden"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-mono font-bold uppercase px-2.5 py-0.5 rounded bg-emerald-50 text-emerald-800 border border-emerald-300">
                    {item.badge}
                  </span>
                </div>
                <span className="text-xs font-mono text-on-surface-variant">{item.timeAgo}</span>
              </div>

              <div>
                <h3 className="font-bold text-sm text-on-surface mb-1">{item.title}</h3>
                <p className="text-xs text-on-surface-variant leading-relaxed">{item.description}</p>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-border/80">
                <span className="text-xs font-mono text-emerald-700 flex items-center gap-1.5 font-semibold">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  {item.metricLabel}: <strong className="text-on-surface">{item.metricValue}</strong>
                </span>
                <button
                  onClick={() => onToast(`Executing ${item.actionText} for ${item.title}`)}
                  className="px-3.5 py-1.5 rounded-lg bg-emerald-50 hover:bg-emerald-600 hover:text-white text-xs font-bold text-emerald-800 border border-emerald-300 transition-all cursor-pointer"
                >
                  {item.actionText}
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
};
