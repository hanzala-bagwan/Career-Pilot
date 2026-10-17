import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Sparkles, Compass, CheckCircle2, ArrowRight, Clock, Award,
  Terminal, ShieldCheck, Copy, Check, Layers, ChevronRight, RefreshCw
} from 'lucide-react';
import { api, RoadmapModule } from '../services/api';

const TARGET_ROLES = [
  'AI Engineer',
  'Full-Stack Developer',
  'Cloud & DevOps Architect',
  'Data Scientist',
  'Cybersecurity Specialist',
  'Backend Systems Engineer'
];

const PRESET_SKILLS = [
  'Python', 'FastAPI', 'SQL', 'Docker', 'Kubernetes',
  'PyTorch', 'TypeScript', 'React', 'AWS', 'System Design'
];

export const RoadmapStudioPage: React.FC = () => {
  const [selectedRole, setSelectedRole] = useState('AI Engineer');
  const [customRole, setCustomRole] = useState('');
  const [selectedMonths, setSelectedMonths] = useState(6);
  const [selectedSkills, setSelectedSkills] = useState<string[]>(['Python', 'SQL', 'Docker']);
  const [generating, setGenerating] = useState(false);
  const [copied, setCopied] = useState(false);
  const [roadmapMarkdown, setRoadmapMarkdown] = useState<string | null>(null);
  const [modules, setModules] = useState<RoadmapModule[]>([]);
  const [activeTab, setActiveTab] = useState<'modules' | 'syllabus'>('modules');

  useEffect(() => {
    // Load currently persisted roadmap from API
    api.getCurrentRoadmap().then((res) => {
      if (res.role) setSelectedRole(res.role);
      if (res.months) setSelectedMonths(res.months);
      if (res.skills) setSelectedSkills(res.skills);
      if (res.markdown) setRoadmapMarkdown(res.markdown);
      if (res.modules && res.modules.length > 0) setModules(res.modules);
    }).catch(console.error);
  }, []);

  const toggleSkill = (skill: string) => {
    if (selectedSkills.includes(skill)) {
      setSelectedSkills(selectedSkills.filter(s => s !== skill));
    } else {
      setSelectedSkills([...selectedSkills, skill]);
    }
  };

  const handleGenerateRoadmap = async () => {
    const roleToUse = customRole.trim() || selectedRole;
    setGenerating(true);
    try {
      const res = await api.createRoadmap({
        role: roleToUse,
        months: selectedMonths,
        skills: selectedSkills
      });
      if (res.success) {
        setRoadmapMarkdown(res.markdown);
        if (res.modules) setModules(res.modules);
      }
    } catch (err: any) {
      alert(`Roadmap generation failed: ${err.message || 'Check Gemini API Key'}`);
    } finally {
      setGenerating(false);
    }
  };

  const copyMarkdown = () => {
    if (roadmapMarkdown) {
      navigator.clipboard.writeText(roadmapMarkdown);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="min-h-screen bg-verdant-bg text-verdant-text pt-24 pb-20 px-4 sm:px-6 max-w-7xl mx-auto">
      
      {/* ── Studio Header ── */}
      <div className="text-center max-w-3xl mx-auto mb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-verdant-lime/10 border border-verdant-lime/25 text-verdant-lime text-xs font-mono mb-3">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Gemini 3.5 AI Engine Active</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-verdant-text">
          Career <span className="font-serif italic font-normal text-verdant-lime">Roadmap Studio</span>
        </h1>
        <p className="text-verdant-muted text-xs sm:text-sm mt-3">
          Synthesize an adaptive, industry-aligned curriculum complete with periodic assessment gates and code challenges.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* ── Left Configuration Column (5 Cols) ── */}
        <div className="lg:col-span-5 glass-card rounded-3xl p-6 sm:p-7 border border-white/10 flex flex-col gap-6">
          
          {/* Target Role Selector */}
          <div>
            <label className="block text-xs font-mono uppercase tracking-wider text-verdant-muted mb-2.5">
              1. Select Career Flightpath
            </label>
            <div className="grid grid-cols-2 gap-2">
              {TARGET_ROLES.map((role) => (
                <button
                  key={role}
                  type="button"
                  onClick={() => {
                    setSelectedRole(role);
                    setCustomRole('');
                  }}
                  className={`px-3 py-2.5 rounded-xl text-left text-xs font-medium transition-all ${
                    selectedRole === role && !customRole
                      ? 'bg-verdant-lime text-[#0A0E0A] font-bold shadow-[0_0_12px_rgba(198,242,78,0.3)]'
                      : 'bg-white/[0.03] border border-white/5 text-verdant-muted hover:text-verdant-text hover:border-white/20'
                  }`}
                >
                  {role}
                </button>
              ))}
            </div>

            {/* Custom Role Input */}
            <div className="mt-2.5">
              <input
                type="text"
                placeholder="Or type custom role (e.g. LLM Ops Engineer)"
                value={customRole}
                onChange={(e) => setCustomRole(e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl bg-black/40 border border-white/10 text-xs text-verdant-text placeholder:text-verdant-muted/50 focus:border-verdant-lime focus:outline-none"
              />
            </div>
          </div>

          {/* Timeline Selector */}
          <div>
            <label className="block text-xs font-mono uppercase tracking-wider text-verdant-muted mb-2.5">
              2. Commitment Timeline
            </label>
            <div className="grid grid-cols-4 gap-2">
              {[3, 6, 9, 12].map((months) => (
                <button
                  key={months}
                  type="button"
                  onClick={() => setSelectedMonths(months)}
                  className={`py-2 rounded-xl text-xs font-mono font-medium transition-all ${
                    selectedMonths === months
                      ? 'bg-verdant-lime text-[#0A0E0A] font-bold shadow-[0_0_12px_rgba(198,242,78,0.3)]'
                      : 'bg-white/[0.03] border border-white/5 text-verdant-muted hover:text-verdant-text'
                  }`}
                >
                  {months} Mo
                </button>
              ))}
            </div>
          </div>

          {/* Skills Selection */}
          <div>
            <label className="block text-xs font-mono uppercase tracking-wider text-verdant-muted mb-2.5">
              3. Current Focus &amp; Tools
            </label>
            <div className="flex flex-wrap gap-2">
              {PRESET_SKILLS.map((skill) => {
                const active = selectedSkills.includes(skill);
                return (
                  <button
                    key={skill}
                    type="button"
                    onClick={() => toggleSkill(skill)}
                    className={`px-3 py-1.5 rounded-full text-xs font-mono transition-all ${
                      active
                        ? 'bg-verdant-lime/20 border border-verdant-lime text-verdant-lime font-bold shadow-[0_0_10px_rgba(198,242,78,0.2)]'
                        : 'bg-white/[0.03] border border-white/10 text-verdant-muted hover:text-verdant-text'
                    }`}
                  >
                    {active ? '✓ ' : '+ '}
                    {skill}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Generate Button with Glowing Lime Aura */}
          <button
            onClick={handleGenerateRoadmap}
            disabled={generating}
            className="w-full relative mt-2 py-3.5 rounded-2xl bg-gradient-to-r from-verdant-lime to-[#b5f134] text-[#0A0E0A] font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-[0_0_25px_rgba(198,242,78,0.45)] hover:shadow-[0_0_35px_rgba(198,242,78,0.7)] transition-all disabled:opacity-60 disabled:cursor-not-allowed hover:scale-[1.02] active:scale-[0.98]"
          >
            {generating ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin" />
                <span>Synthesizing with Gemini 3.5...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4" />
                <span>Synthesize Career Roadmap</span>
              </>
            )}
          </button>
        </div>

        {/* ── Right Results & Modules Column (7 Cols) ── */}
        <div className="lg:col-span-7 flex flex-col gap-4">
          
          {/* Tabs bar */}
          <div className="flex items-center justify-between glass-card px-4 py-2 rounded-2xl border border-white/10">
            <div className="flex items-center gap-2">
              <button
                onClick={() => setActiveTab('modules')}
                className={`px-4 py-1.5 rounded-xl text-xs font-medium transition-colors ${
                  activeTab === 'modules'
                    ? 'bg-verdant-lime text-[#0A0E0A] font-bold'
                    : 'text-verdant-muted hover:text-verdant-text'
                }`}
              >
                Curriculum Modules ({modules.length})
              </button>
              <button
                onClick={() => setActiveTab('syllabus')}
                className={`px-4 py-1.5 rounded-xl text-xs font-medium transition-colors ${
                  activeTab === 'syllabus'
                    ? 'bg-verdant-lime text-[#0A0E0A] font-bold'
                    : 'text-verdant-muted hover:text-verdant-text'
                }`}
              >
                AI Syllabus Markdown
              </button>
            </div>

            {roadmapMarkdown && (
              <button
                onClick={copyMarkdown}
                className="flex items-center gap-1.5 text-[11px] font-mono text-verdant-muted hover:text-verdant-lime px-2.5 py-1 rounded-lg hover:bg-white/5 transition-colors"
                title="Copy markdown"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-verdant-lime" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copied' : 'Copy'}</span>
              </button>
            )}
          </div>

          {/* Tab 1: Module Cards */}
          {activeTab === 'modules' && (
            <div className="flex flex-col gap-3">
              {modules.map((m, idx) => (
                <div
                  key={m.id || idx}
                  className={`glass-card rounded-2xl p-5 border transition-all duration-300 flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
                    m.status === 'completed'
                      ? 'border-verdant-lime/30 bg-verdant-lime/[0.03]'
                      : m.status === 'in_progress'
                      ? 'border-white/20 bg-white/[0.04]'
                      : 'border-white/5 bg-black/30 opacity-75'
                  }`}
                >
                  <div className="flex items-start sm:items-center gap-3.5">
                    <div className={`w-9 h-9 rounded-xl flex items-center justify-center font-mono text-xs font-bold shrink-0 ${
                      m.status === 'completed'
                        ? 'bg-verdant-lime text-[#0A0E0A]'
                        : m.status === 'in_progress'
                        ? 'bg-verdant-lime/20 border border-verdant-lime text-verdant-lime'
                        : 'bg-white/5 text-verdant-muted'
                    }`}>
                      {idx + 1}
                    </div>

                    <div>
                      <div className="flex flex-wrap items-center gap-2">
                        <h3 className="font-semibold text-sm text-verdant-text">{m.name}</h3>
                        {m.status_label ? (
                          <span className={`px-2 py-0.5 rounded-full text-[10px] font-mono border ${
                            m.status === 'completed'
                              ? 'bg-verdant-lime/20 border-verdant-lime/40 text-verdant-lime'
                              : m.status === 'in_progress'
                              ? 'bg-amber-400/10 border-amber-400/30 text-amber-300'
                              : 'bg-white/5 border-white/10 text-verdant-muted'
                          }`}>
                            {m.status_label}
                          </span>
                        ) : m.status === 'completed' ? (
                          <span className="px-2 py-0.5 rounded-full bg-verdant-lime/20 border border-verdant-lime/40 text-verdant-lime text-[10px] font-mono font-bold">
                            Passed ({m.score}%)
                          </span>
                        ) : m.status === 'in_progress' ? (
                          <span className="px-2 py-0.5 rounded-full bg-white/10 text-verdant-lime text-[10px] font-mono border border-verdant-lime/30">
                            Current Milestone
                          </span>
                        ) : null}
                      </div>
                      <div className="flex flex-wrap gap-1.5 mt-1">
                        {m.topics.map((t, tIdx) => (
                          <span key={tIdx} className="text-[10px] font-mono text-verdant-muted">
                            #{t}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div>
                    {m.status !== 'locked' ? (
                      <Link
                        to={`/module/${m.id}`}
                        className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-verdant-lime hover:bg-verdant-lime-hover text-[#0A0E0A] font-bold text-xs shadow-[0_0_15px_rgba(198,242,78,0.3)] transition-all hover:scale-105 whitespace-nowrap"
                      >
                        <span>{m.status === 'completed' ? 'Review Module' : 'Open Module'}</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    ) : (
                      <span className="text-xs font-mono text-verdant-muted/50 px-3 py-1.5">
                        Locked Gate
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Tab 2: Full Markdown Syllabus */}
          {activeTab === 'syllabus' && (
            <div className="glass-card rounded-3xl p-6 border border-white/10 max-h-[580px] overflow-y-auto no-scrollbar">
              {roadmapMarkdown ? (
                <div className="prose prose-invert prose-verdant max-w-none text-xs sm:text-sm leading-relaxed whitespace-pre-wrap font-sans text-verdant-muted">
                  {roadmapMarkdown}
                </div>
              ) : (
                <div className="text-center py-12 text-verdant-muted text-xs">
                  Click "Synthesize Career Roadmap" to generate your custom Gemini syllabus.
                </div>
              )}
            </div>
          )}

        </div>

      </div>

    </div>
  );
};
