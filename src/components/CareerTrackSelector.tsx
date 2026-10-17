import React, { useState, useMemo } from 'react';
import { CareerTrack } from '../types';
import { CAREER_TRACKS } from '../data/telemetryData';
import { ALL_EXPANDED_CAREER_TRACKS } from '../data/extendedTracks';
import { 
  Sparkles, 
  BrainCircuit, 
  Globe, 
  Server, 
  Database, 
  ShieldCheck, 
  Smartphone, 
  Coins, 
  Cpu,
  ArrowRight,
  TrendingUp,
  Code2,
  Check,
  Layers,
  Star
} from 'lucide-react';

interface CareerTrackSelectorProps {
  activeTrackId: string;
  onSelectTrack: (track: CareerTrack) => void;
  onToast: (msg: string) => void;
}

export const CareerTrackSelector: React.FC<CareerTrackSelectorProps> = ({
  activeTrackId,
  onSelectTrack,
  onToast
}) => {
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState<'all' | 'spotlight' | 'languages' | 'systems'>('all');

  const combinedTracks = useMemo(() => {
    return [...CAREER_TRACKS, ...ALL_EXPANDED_CAREER_TRACKS];
  }, []);

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'BrainCircuit': return <BrainCircuit className="w-5 h-5 text-emerald-600" />;
      case 'Globe': return <Globe className="w-5 h-5 text-emerald-600" />;
      case 'Server': return <Server className="w-5 h-5 text-emerald-600" />;
      case 'Database': return <Database className="w-5 h-5 text-emerald-600" />;
      case 'ShieldCheck': return <ShieldCheck className="w-5 h-5 text-emerald-600" />;
      case 'Smartphone': return <Smartphone className="w-5 h-5 text-emerald-600" />;
      case 'Coins': return <Coins className="w-5 h-5 text-emerald-600" />;
      case 'Code2': return <Code2 className="w-5 h-5 text-emerald-600" />;
      default: return <Cpu className="w-5 h-5 text-emerald-600" />;
    }
  };

  const filteredTracks = useMemo(() => {
    if (selectedCategoryFilter === 'spotlight') {
      return combinedTracks.filter(t => t.isFeatured || t.id.includes('frontend') || t.id.includes('backend') || t.id.includes('fullstack'));
    }
    if (selectedCategoryFilter === 'languages') {
      return combinedTracks.filter(t => t.trackType === 'language');
    }
    if (selectedCategoryFilter === 'systems') {
      return combinedTracks.filter(t => t.category.includes('Artificial') || t.category.includes('DevOps') || t.category.includes('Security') || t.category.includes('Embedded') || t.category.includes('Big Data'));
    }
    return combinedTracks;
  }, [combinedTracks, selectedCategoryFilter]);

  const spotlightTracks = useMemo(() => {
    return combinedTracks.filter(t => t.id === 'frontend-engineer' || t.id === 'backend-engineer' || t.id === 'fullstack-cloud-architect');
  }, [combinedTracks]);

  return (
    <section className="p-6 rounded-3xl glass-panel border border-emerald-200 shadow-sm flex flex-col gap-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-emerald-600" />
            <h2 className="text-xl font-bold font-display text-on-surface">Choose Your Modern Career Trajectory</h2>
          </div>
          <p className="text-xs text-on-surface-variant font-medium mt-0.5">
            Calibrate all 6 modules (3D Roadmap, IDE Sandbox, Quizzes, Capability Radar, and Mock Interviews) to any programming language or architecture role.
          </p>
        </div>
        <span className="px-3.5 py-1.5 rounded-full bg-emerald-100 text-emerald-800 text-xs font-mono font-bold border border-emerald-300 shrink-0 self-start sm:self-auto flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          {combinedTracks.length} TRACKS &amp; LANGUAGES
        </span>
      </div>

      {/* ========================================================================= */}
      {/* 🌟 MAJOR HIGHLIGHT: FULL-STACK, FRONTEND & BACKEND SPOTLIGHT BANNER */}
      {/* ========================================================================= */}
      <div className="p-5 rounded-2xl bg-gradient-to-r from-emerald-500/10 via-teal-500/10 to-emerald-600/10 border-2 border-emerald-500/40 flex flex-col gap-4 relative overflow-hidden">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 shadow-[0_0_8px_#10b981]" />
            <span className="text-xs font-mono font-bold text-emerald-800 uppercase tracking-wider flex items-center gap-1">
              <Star className="w-3.5 h-3.5 fill-emerald-600 text-emerald-600" />
              Major Highlight • Full-Stack, Frontend &amp; Backend Pillars
            </span>
          </div>
          <span className="text-[11px] font-mono text-emerald-700 font-bold">
            Highest Enterprise Demand in 2025
          </span>
        </div>

        {/* 3 Spotlight Pillar Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {spotlightTracks.map((track) => {
            const isSelected = activeTrackId === track.id;
            return (
              <div
                key={track.id}
                onClick={() => {
                  onSelectTrack(track);
                  onToast(`Calibrated to ${track.title}!`);
                }}
                className={`p-4 rounded-xl border flex flex-col justify-between gap-3 cursor-pointer transition-all ${
                  isSelected
                    ? 'bg-emerald-600 text-white border-emerald-700 shadow-md ring-2 ring-emerald-400'
                    : 'bg-white text-on-surface border-emerald-200 hover:border-emerald-500 hover:shadow-sm'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full font-bold ${
                      isSelected ? 'bg-white/20 text-white' : 'bg-emerald-50 text-emerald-800 border border-emerald-300'
                    }`}>
                      {track.shortCode}
                    </span>
                    <span className={`text-xs font-mono font-bold ${isSelected ? 'text-emerald-100' : 'text-emerald-700'}`}>
                      {track.metrics.averageSalary}
                    </span>
                  </div>
                  <h4 className="font-bold text-sm leading-snug">{track.title}</h4>
                  <p className={`text-xs mt-1 line-clamp-2 leading-relaxed ${isSelected ? 'text-emerald-100' : 'text-on-surface-variant'}`}>
                    {track.description}
                  </p>
                </div>

                <div className={`pt-2 border-t flex items-center justify-between text-xs font-mono font-bold ${
                  isSelected ? 'border-white/20 text-white' : 'border-border text-emerald-700'
                }`}>
                  <span>{isSelected ? 'Active Trajectory' : 'Select Pillar'}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        <button
          onClick={() => setSelectedCategoryFilter('all')}
          className={`px-3.5 py-1.5 rounded-xl text-xs font-mono font-bold transition-all shrink-0 cursor-pointer ${
            selectedCategoryFilter === 'all'
              ? 'bg-emerald-600 text-white shadow-sm'
              : 'bg-surface-sub text-on-surface-variant hover:text-on-surface'
          }`}
        >
          All Roadmaps ({combinedTracks.length})
        </button>
        <button
          onClick={() => setSelectedCategoryFilter('spotlight')}
          className={`px-3.5 py-1.5 rounded-xl text-xs font-mono font-bold transition-all shrink-0 cursor-pointer flex items-center gap-1.5 ${
            selectedCategoryFilter === 'spotlight'
              ? 'bg-emerald-600 text-white shadow-sm'
              : 'bg-surface-sub text-on-surface-variant hover:text-on-surface'
          }`}
        >
          <Star className="w-3 h-3 fill-current text-amber-500" />
          Full-Stack, Frontend &amp; Backend
        </button>
        <button
          onClick={() => setSelectedCategoryFilter('languages')}
          className={`px-3.5 py-1.5 rounded-xl text-xs font-mono font-bold transition-all shrink-0 cursor-pointer ${
            selectedCategoryFilter === 'languages'
              ? 'bg-emerald-600 text-white shadow-sm'
              : 'bg-surface-sub text-on-surface-variant hover:text-on-surface'
          }`}
        >
          Programming Languages
        </button>
        <button
          onClick={() => setSelectedCategoryFilter('systems')}
          className={`px-3.5 py-1.5 rounded-xl text-xs font-mono font-bold transition-all shrink-0 cursor-pointer ${
            selectedCategoryFilter === 'systems'
              ? 'bg-emerald-600 text-white shadow-sm'
              : 'bg-surface-sub text-on-surface-variant hover:text-on-surface'
          }`}
        >
          AI &amp; Distributed Systems
        </button>
      </div>

      {/* Grid of All Career Tracks */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {filteredTracks.map((track) => {
          const isSelected = activeTrackId === track.id;

          return (
            <div
              key={track.id}
              onClick={() => {
                onSelectTrack(track);
                onToast(`Activated Career Path: ${track.title}`);
              }}
              className={`p-4 rounded-xl border flex flex-col justify-between gap-3 cursor-pointer transition-all ${
                isSelected
                  ? 'bg-emerald-50/90 border-emerald-500 shadow-[0_4px_14px_rgba(16,185,129,0.25)] ring-2 ring-emerald-500/20'
                  : 'bg-white border-border hover:border-emerald-300 hover:shadow-sm'
              }`}
            >
              <div className="flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <div className="w-9 h-9 rounded-lg bg-emerald-100 flex items-center justify-center border border-emerald-200">
                    {getIcon(track.iconName)}
                  </div>
                  <div className="flex items-center gap-1">
                    {track.isFeatured && (
                      <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-800 font-bold border border-emerald-300">
                        SPOTLIGHT
                      </span>
                    )}
                    <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full font-bold ${
                      isSelected ? 'bg-emerald-600 text-white' : 'bg-slate-100 text-slate-700'
                    }`}>
                      {track.shortCode}
                    </span>
                  </div>
                </div>

                <div>
                  <h3 className="font-bold text-sm text-on-surface leading-snug">{track.title}</h3>
                  <span className="text-[11px] font-mono text-emerald-700 font-semibold">{track.category}</span>
                  <p className="text-xs text-on-surface-variant line-clamp-2 mt-1 leading-relaxed font-medium">
                    {track.description}
                  </p>
                </div>
              </div>

              {/* Technologies & Language Badges */}
              <div className="flex flex-col gap-2 pt-2 border-t border-border/80">
                <div className="flex items-center gap-1 flex-wrap">
                  {track.primaryLanguages.map((lang) => (
                    <span 
                      key={lang}
                      className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-slate-100 text-slate-800 font-semibold"
                    >
                      {lang}
                    </span>
                  ))}
                </div>

                <div className="flex items-center justify-between text-xs font-mono pt-1">
                  <span className="text-emerald-700 font-bold">{track.metrics.averageSalary}</span>
                  <span className="text-emerald-800 font-semibold flex items-center gap-0.5">
                    <TrendingUp className="w-3 h-3 text-emerald-600" />
                    {track.metrics.marketGrowth}
                  </span>
                </div>

                <button
                  className={`w-full py-1.5 rounded-lg text-xs font-mono font-bold flex items-center justify-center gap-1 transition-all ${
                    isSelected
                      ? 'bg-emerald-600 text-white shadow-sm'
                      : 'bg-slate-100 text-slate-700 hover:bg-emerald-600 hover:text-white'
                  }`}
                >
                  {isSelected ? (
                    <>
                      <Check className="w-3.5 h-3.5" />
                      <span>Active Trajectory</span>
                    </>
                  ) : (
                    <>
                      <span>Select Track</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </>
                  )}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
