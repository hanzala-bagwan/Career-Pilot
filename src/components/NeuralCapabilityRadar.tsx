import React, { useState } from 'react';
import { CareerTrack } from '../types';
import { 
  Radar, 
  CheckCircle2, 
  Hourglass, 
  AlertOctagon, 
  Sparkles, 
  Calendar, 
  Layers, 
  Zap,
  Flame,
  Check
} from 'lucide-react';

interface NeuralCapabilityRadarProps {
  onToast: (msg: string) => void;
  activeTrack: CareerTrack;
}

export const NeuralCapabilityRadar: React.FC<NeuralCapabilityRadarProps> = ({
  onToast,
  activeTrack
}) => {
  const [filterCategory, setFilterCategory] = useState<'all' | 'mastered' | 'progress' | 'missing'>('all');
  const [generatingSprintFor, setGeneratingSprintFor] = useState<string | null>(null);
  const [activeSprintPlan, setActiveSprintPlan] = useState<{
    skillName: string;
    duration: string;
    curriculum: string[];
  } | null>(null);

  const handleGenerateMicroSprint = (skillName: string, duration: string) => {
    setGeneratingSprintFor(skillName);
    setTimeout(() => {
      setGeneratingSprintFor(null);
      setActiveSprintPlan({
        skillName,
        duration,
        curriculum: [
          "Day 01–03: Fundamental architectural invariants & system contracts",
          "Day 04–07: Core algorithmic implementation, benchmarking & memory profiling",
          "Day 08–11: Resilient multi-node concurrency, caching & fault-tolerant failovers",
          "Day 12–14: Production capstone benchmark validation against enterprise SLAs"
        ]
      });
      onToast(`Synthesized ${duration} micro-sprint for ${skillName}!`);
    }, 900);
  };

  const filteredSkills = filterCategory === 'all'
    ? activeTrack.skillsBreakdown
    : activeTrack.skillsBreakdown.filter((s) => s.category === filterCategory);

  // =========================================================================
  // MATHEMATICALLY PRECISE 5-AXIS RADAR DIAGRAM CALCULATION
  // Center: (150, 150), Radius: 100
  // =========================================================================
  const cx = 150;
  const cy = 150;
  const maxRadius = 90;
  const axes = activeTrack.radarAxes;
  const numAxes = axes.length;

  const getCoordinates = (index: number, valueRatio: number) => {
    const angle = (index * 2 * Math.PI) / numAxes - Math.PI / 2;
    const r = maxRadius * valueRatio;
    return {
      x: cx + r * Math.cos(angle),
      y: cy + r * Math.sin(angle)
    };
  };

  // Generate concentric grid rings (25%, 50%, 75%, 100%)
  const gridRings = [0.25, 0.5, 0.75, 1.0].map((ratio) => {
    return Array.from({ length: numAxes })
      .map((_, i) => {
        const { x, y } = getCoordinates(i, ratio);
        return `${x},${y}`;
      })
      .join(' ');
  });

  // Calculate actual candidate score polygon points
  const candidatePolygonPoints = axes
    .map((axis, i) => {
      const ratio = Math.max(0.1, Math.min(1.0, axis.score / 100));
      const { x, y } = getCoordinates(i, ratio);
      return `${x},${y}`;
    })
    .join(' ');

  // Calculate ideal benchmark polygon points
  const benchmarkPolygonPoints = axes
    .map((axis, i) => {
      const ratio = Math.max(0.1, Math.min(1.0, axis.benchmark / 100));
      const { x, y } = getCoordinates(i, ratio);
      return `${x},${y}`;
    })
    .join(' ');

  // Average alignment score
  const avgAlignment = Math.round(
    axes.reduce((acc, curr) => acc + curr.score, 0) / axes.length
  );

  return (
    <div className="flex flex-col gap-8 pb-12 animate-fadeIn">
      
      {/* Header Banner */}
      <div className="flex flex-col gap-1">
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-mono text-emerald-700 tracking-widest uppercase font-bold">
            TELEMETRY &amp; PROFICIENCY MATRIX
          </span>
          <span className="text-[11px] font-mono px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-300 flex items-center gap-1.5 font-bold">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            Track: <strong className="text-on-surface">{activeTrack.title}</strong>
          </span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-display font-extrabold text-on-surface">
          Neural Capability Radar &amp; Skill Gap Matrix
        </h1>
        <p className="text-xs sm:text-sm text-on-surface-variant font-medium">
          Real-time telemetry mapping your multidimensional engineering capability vector against top 1% principal benchmarks.
        </p>
      </div>

      {/* Mathematically Exact 5-Axis Radar Chart Container */}
      <section className="relative rounded-2xl glass-panel border border-emerald-200 p-6 overflow-hidden shadow-sm">
        {/* Glow Orbs */}
        <div className="absolute -top-16 -right-16 w-44 h-44 bg-emerald-400/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-16 -left-16 w-44 h-44 bg-teal-400/10 rounded-full blur-3xl pointer-events-none" />

        <div className="flex items-center justify-between mb-4 relative z-10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 flex items-center justify-center text-emerald-700 border border-emerald-300 shadow-sm">
              <Radar className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-bold text-base text-on-surface">5-Axis Neural Capability Radar</h2>
              <span className="text-[11px] font-mono text-on-surface-variant font-medium">
                {activeTrack.title} Alignment
              </span>
            </div>
          </div>
          <span className="px-3 py-1 rounded-full text-xs font-mono bg-emerald-100 text-emerald-800 border border-emerald-300 flex items-center gap-1.5 font-bold">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
            {avgAlignment}% Vector Match
          </span>
        </div>

        {/* Radar Graphic Visualizer */}
        <div className="relative w-full max-w-lg mx-auto h-80 flex items-center justify-center my-2">
          <svg className="w-full h-full" viewBox="-40 -20 380 340">
            <defs>
              <radialGradient id="radarEmeraldFillPrecise" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#10b981" stopOpacity="0.5" />
                <stop offset="70%" stopColor="#059669" stopOpacity="0.25" />
                <stop offset="100%" stopColor="#047857" stopOpacity="0.08" />
              </radialGradient>
              <linearGradient id="radarEmeraldBorderPrecise" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#10b981" />
                <stop offset="50%" stopColor="#059669" />
                <stop offset="100%" stopColor="#047857" />
              </linearGradient>
            </defs>

            {/* Concentric Pentagon Grid Lines */}
            {gridRings.map((points, idx) => (
              <polygon
                key={idx}
                points={points}
                fill="none"
                stroke="#cbd5e1"
                strokeWidth="1"
                strokeDasharray={idx === 3 ? "none" : "3,3"}
              />
            ))}

            {/* Radial Spokes from Center to Vertices */}
            {axes.map((_, i) => {
              const { x, y } = getCoordinates(i, 1.0);
              return (
                <line
                  key={i}
                  x1={cx}
                  y1={cy}
                  x2={x}
                  y2={y}
                  stroke="#cbd5e1"
                  strokeWidth="1.2"
                />
              );
            })}

            {/* Benchmark Target Boundary (Dashed Target) */}
            <polygon
              points={benchmarkPolygonPoints}
              fill="rgba(5, 150, 105, 0.05)"
              stroke="#059669"
              strokeDasharray="4"
              strokeWidth="1.5"
            />

            {/* Candidate Actual Score Vector (Glowing Emerald Fill) */}
            <polygon
              points={candidatePolygonPoints}
              fill="url(#radarEmeraldFillPrecise)"
              stroke="url(#radarEmeraldBorderPrecise)"
              strokeWidth="2.5"
            />

            {/* Vector Nodes with Coordinates */}
            {axes.map((axis, i) => {
              const ratio = Math.max(0.1, Math.min(1.0, axis.score / 100));
              const { x, y } = getCoordinates(i, ratio);
              return (
                <g key={i}>
                  <circle cx={x} cy={y} r="5" fill="#10b981" stroke="#ffffff" strokeWidth="2" />
                </g>
              );
            })}

            {/* Axis Labels positioned outside the pentagon with directional anchoring */}
            {axes.map((axis, i) => {
              const angle = (i * 2 * Math.PI) / numAxes - Math.PI / 2;
              const cosA = Math.cos(angle);
              const textAnchor = Math.abs(cosA) < 0.25 ? 'middle' : cosA > 0 ? 'start' : 'end';
              const labelPos = getCoordinates(i, 1.18);
              const adjustedX = textAnchor === 'start' ? labelPos.x + 6 : textAnchor === 'end' ? labelPos.x - 6 : labelPos.x;
              const adjustedY = Math.sin(angle) < -0.8 ? labelPos.y - 4 : Math.sin(angle) > 0.8 ? labelPos.y + 6 : labelPos.y;

              return (
                <text
                  key={i}
                  x={adjustedX}
                  y={adjustedY}
                  textAnchor={textAnchor}
                  dominantBaseline="central"
                  className="fill-slate-800 text-[11px] font-mono font-bold"
                >
                  {axis.axis} ({axis.score}%)
                </text>
              );
            })}
          </svg>
        </div>

        {/* Legend */}
        <div className="flex items-center justify-center gap-6 pt-2 border-t border-border text-xs font-mono">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-emerald-500 shadow-sm" />
            <span className="text-on-surface font-semibold">Your Calibrated Capability ({avgAlignment}%)</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3.5 h-1 border-t-2 border-dashed border-emerald-700" />
            <span className="text-on-surface-variant font-medium">L6 Principal Benchmark (90%+)</span>
          </div>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pt-4">
          <button
            onClick={() => setFilterCategory('all')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-mono font-bold transition-all shrink-0 cursor-pointer ${
              filterCategory === 'all'
                ? 'bg-gradient-to-r from-emerald-500 to-teal-700 text-white shadow-sm'
                : 'bg-white text-on-surface-variant hover:text-on-surface border border-border'
            }`}
          >
            All Skills ({activeTrack.skillsBreakdown.length})
          </button>
          <button
            onClick={() => setFilterCategory('mastered')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-mono font-bold transition-all shrink-0 cursor-pointer ${
              filterCategory === 'mastered'
                ? 'bg-emerald-600 text-white'
                : 'bg-emerald-50 text-emerald-800 border border-emerald-300 hover:bg-emerald-100'
            }`}
          >
            Mastered ({activeTrack.skillsBreakdown.filter(s => s.category === 'mastered').length})
          </button>
          <button
            onClick={() => setFilterCategory('progress')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-mono font-bold transition-all shrink-0 cursor-pointer ${
              filterCategory === 'progress'
                ? 'bg-teal-600 text-white'
                : 'bg-teal-50 text-teal-800 border border-teal-300 hover:bg-teal-100'
            }`}
          >
            In Progress ({activeTrack.skillsBreakdown.filter(s => s.category === 'progress').length})
          </button>
          <button
            onClick={() => setFilterCategory('missing')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-mono font-bold transition-all shrink-0 cursor-pointer ${
              filterCategory === 'missing'
                ? 'bg-red-600 text-white'
                : 'bg-red-50 text-red-800 border border-red-300 hover:bg-red-100'
            }`}
          >
            Critical Gaps ({activeTrack.skillsBreakdown.filter(s => s.category === 'missing').length})
          </button>
        </div>
      </section>

      {/* Requirement Breakdown Grid & Micro-Sprint Generator */}
      <section className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-on-surface">Requirement Breakdown</h2>
          <span className="text-xs font-mono px-3 py-1 rounded-full bg-red-50 text-red-700 border border-red-300 flex items-center gap-1 font-bold">
            <span className="w-1.5 h-1.5 rounded-full bg-red-500" />
            {activeTrack.skillsBreakdown.filter(s => s.category === 'missing').length} Critical Gaps Identified
          </span>
        </div>

        <div className="flex flex-col gap-3">
          {filteredSkills.map((skill) => {
            const isMastered = skill.category === 'mastered';
            const isProgress = skill.category === 'progress';
            const isMissing = skill.category === 'missing';

            return (
              <div
                key={skill.id}
                className={`p-4 rounded-2xl glass-panel flex flex-col gap-3 border transition-all ${
                  isMissing 
                    ? 'border-red-200 bg-red-50/40' 
                    : isProgress
                    ? 'border-teal-200 bg-teal-50/20'
                    : 'border-emerald-200 bg-white'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 border ${
                      isMastered 
                        ? 'bg-emerald-100 text-emerald-700 border-emerald-300' 
                        : isProgress
                        ? 'bg-teal-100 text-teal-700 border-teal-300'
                        : 'bg-red-100 text-red-700 border-red-300'
                    }`}>
                      {isMastered && <CheckCircle2 className="w-6 h-6" />}
                      {isProgress && <Hourglass className="w-6 h-6" />}
                      {isMissing && <AlertOctagon className="w-6 h-6" />}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="font-bold text-sm text-on-surface">{skill.name}</h4>
                        {skill.highImpact && (
                          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-red-100 text-red-700 font-bold">
                            HIGH IMPACT
                          </span>
                        )}
                        {skill.productionTier && (
                          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 font-bold">
                            TIER-1 SPEC
                          </span>
                        )}
                      </div>
                      <span className={`text-xs font-mono font-medium ${
                        isMastered ? 'text-emerald-700' : isProgress ? 'text-teal-700' : 'text-red-600'
                      }`}>
                        {skill.level}
                      </span>
                    </div>
                  </div>

                  <span className={`text-[11px] font-mono px-3 py-1 rounded-full uppercase font-bold border ${
                    isMastered 
                      ? 'bg-emerald-100 text-emerald-800 border-emerald-300' 
                      : isProgress
                      ? 'bg-teal-100 text-teal-800 border-teal-300'
                      : 'bg-red-100 text-red-800 border-red-300'
                  }`}>
                    {skill.statusLabel}
                  </span>
                </div>

                {/* Progress bar for in-progress items */}
                {isProgress && skill.progressPercent && (
                  <div className="flex items-center gap-3 pt-1 border-t border-border/80 text-xs">
                    <span className="text-on-surface-variant font-mono font-medium">Sprint Progress:</span>
                    <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-emerald-500 to-teal-600 rounded-full"
                        style={{ width: `${skill.progressPercent}%` }}
                      />
                    </div>
                    <span className="text-emerald-700 font-mono font-bold">{skill.progressPercent}%</span>
                  </div>
                )}

                {/* Micro-Sprint Generator Button for Missing Skills */}
                {isMissing && skill.sprintDuration && (
                  <div className="flex items-center justify-between pt-2 border-t border-border/80 text-xs">
                    <span className="text-on-surface-variant font-mono flex items-center gap-1.5 font-medium">
                      <Calendar className="w-3.5 h-3.5 text-emerald-600" />
                      Estimated: {skill.sprintDuration}
                    </span>
                    <button
                      onClick={() => handleGenerateMicroSprint(skill.name, skill.sprintDuration!)}
                      disabled={generatingSprintFor === skill.name}
                      className="px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-500 via-emerald-600 to-teal-700 text-white font-bold font-mono text-xs flex items-center gap-1.5 shadow-[0_4px_14px_rgba(16,185,129,0.35)] hover:opacity-95 active:scale-95 transition-all cursor-pointer"
                    >
                      {generatingSprintFor === skill.name ? (
                        <>
                          <Sparkles className="w-3.5 h-3.5 animate-spin" />
                          <span>Generating Sprint...</span>
                        </>
                      ) : (
                        <>
                          <Flame className="w-3.5 h-3.5 text-teal-200" />
                          <span>Generate Micro-Sprint</span>
                        </>
                      )}
                    </button>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Modal / Card for Generated Sprint Plan */}
        {activeSprintPlan && (
          <div className="p-5 rounded-2xl glass-panel border border-emerald-300 shadow-sm flex flex-col gap-3 animate-fadeIn">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-emerald-600" />
                <h3 className="font-bold text-sm text-on-surface">
                  Targeted Micro-Sprint: {activeSprintPlan.skillName} ({activeSprintPlan.duration})
                </h3>
              </div>
              <button
                onClick={() => setActiveSprintPlan(null)}
                className="text-xs text-on-surface-variant hover:text-on-surface font-mono font-bold cursor-pointer"
              >
                Dismiss
              </button>
            </div>

            <div className="flex flex-col gap-2">
              {activeSprintPlan.curriculum.map((day, idx) => (
                <div key={idx} className="p-2.5 rounded-lg bg-emerald-50 border border-emerald-200 text-xs flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0" />
                  <span className="text-emerald-950 font-medium leading-relaxed">{day}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </section>

    </div>
  );
};
