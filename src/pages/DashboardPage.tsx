import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Flame, Award, CheckCircle2, AlertCircle, ArrowUpRight, ArrowRight,
  TrendingUp, Compass, BookOpen, Clock, RefreshCw, BarChart2, Check,
  Sparkles, Terminal, FileCode, Target
} from 'lucide-react';
import {
  AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer,
  RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar
} from 'recharts';
import { api, DashboardData } from '../services/api';

export const DashboardPage: React.FC = () => {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const fetchDashboard = async () => {
    try {
      setRefreshing(true);
      const res = await api.getDashboard();
      setData(res);
    } catch (err) {
      console.error('Failed to load dashboard:', err);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchDashboard();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-verdant-bg flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="w-12 h-12 rounded-full border-2 border-verdant-lime border-t-transparent animate-spin" />
          <span className="text-xs font-mono text-verdant-muted tracking-wider">
            Streaming Telemetry...
          </span>
        </div>
      </div>
    );
  }

  const stats = data?.stats || {
    percentage: 20,
    completed: 1,
    remaining: 4,
    in_progress: 1,
    needs_revision: 0,
    total: 5,
    student_name: 'Alex Mercer',
    target_role: 'AI Engineer',
    learning_objective: 'Master LLM orchestration, evaluation pipelines, and fine-tuning',
    learning_streak_days: 5,
    assessment_average: 84.5,
    skills_mastered_count: 5,
    skills_to_improve_count: 2,
    recommended_next_activity: {
      title: 'Machine Learning Foundations Assessment',
      description: 'Validate model training intuition and write numpy loss computation challenge.',
      type: 'assessment',
      module_id: 'mod-2',
      cta_label: 'Start Assessment'
    }
  };

  // Prepare Radar Data from topic scores
  const radarData = data?.topic_scores
    ? Object.entries(data.topic_scores).map(([topic, score]) => ({
        subject: topic,
        score: score,
        fullMark: 100
      }))
    : [
        { subject: 'Python Core', score: 95, fullMark: 100 },
        { subject: 'SQL & Data', score: 78, fullMark: 100 },
        { subject: 'ML Math', score: 85, fullMark: 100 },
        { subject: 'PyTorch/DL', score: 62, fullMark: 100 },
        { subject: 'System Design', score: 70, fullMark: 100 },
      ];

  // Chart Progress History
  const progressHistory = data?.progress_history && data.progress_history.length > 0
    ? data.progress_history
    : [
        { label: 'Week 1', progress: 0, score: 70 },
        { label: 'Week 2', progress: 10, score: 78 },
        { label: 'Week 3', progress: 15, score: 82 },
        { label: 'Week 4', progress: 20, score: 88 },
      ];

  return (
    <div className="min-h-screen bg-verdant-bg text-verdant-text pt-24 pb-20 px-4 sm:px-6 max-w-7xl mx-auto">
      
      {/* ── Top Header Banner ── */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-8">
        <div>
          <div className="flex items-center gap-3 mb-1">
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-verdant-text">
              Welcome back, <span className="font-serif italic font-normal text-verdant-lime">{stats.student_name}</span>
            </h1>
            <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-verdant-lime/10 border border-verdant-lime/30 text-verdant-lime text-xs font-mono font-semibold">
              <Flame className="w-3.5 h-3.5 fill-verdant-lime text-verdant-lime" />
              <span>{stats.learning_streak_days} Day Streak</span>
            </div>
          </div>
          <p className="text-verdant-muted text-xs sm:text-sm">
            Target Flightpath: <span className="text-verdant-text font-medium">{stats.target_role}</span> • {stats.learning_objective}
          </p>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-3">
          <button
            onClick={fetchDashboard}
            disabled={refreshing}
            className="p-2.5 rounded-full glass-card border border-white/10 hover:border-verdant-lime/30 text-verdant-muted hover:text-verdant-lime transition-all disabled:opacity-50"
            title="Refresh telemetry"
          >
            <RefreshCw className={`w-4 h-4 ${refreshing ? 'animate-spin' : ''}`} />
          </button>

          <Link
            to="/roadmap"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-verdant-lime hover:bg-verdant-lime-hover text-[#0A0E0A] font-semibold text-xs shadow-[0_0_20px_rgba(198,242,78,0.4)] transition-all hover:scale-105"
          >
            <Compass className="w-3.5 h-3.5" />
            <span>Roadmap Studio</span>
          </Link>
        </div>
      </div>

      {/* ── Key Metrics 4-Card Bento Grid ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        
        {/* Metric 1: Overall Progress */}
        <div className="glass-card rounded-2xl p-5 border border-white/10 relative overflow-hidden group hover:border-verdant-lime/30 transition-all">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-mono text-verdant-muted uppercase tracking-wider">Progress</span>
            <div className="w-7 h-7 rounded-lg bg-verdant-lime/10 text-verdant-lime flex items-center justify-center">
              <Target className="w-3.5 h-3.5" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-sans font-bold text-verdant-text">{stats.percentage}%</span>
            <span className="text-xs text-verdant-muted font-mono">completion</span>
          </div>
          {/* Mini progress bar */}
          <div className="w-full bg-white/5 h-1.5 rounded-full mt-3 overflow-hidden">
            <div 
              className="bg-verdant-lime h-full rounded-full transition-all duration-500 shadow-[0_0_8px_#C6F24E]"
              style={{ width: `${stats.percentage}%` }}
            />
          </div>
        </div>

        {/* Metric 2: Completed Modules */}
        <div className="glass-card rounded-2xl p-5 border border-white/10 relative overflow-hidden group hover:border-verdant-lime/30 transition-all">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-mono text-verdant-muted uppercase tracking-wider">Curriculum</span>
            <div className="w-7 h-7 rounded-lg bg-verdant-lime/10 text-verdant-lime flex items-center justify-center">
              <BookOpen className="w-3.5 h-3.5" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-sans font-bold text-verdant-text">{stats.completed}</span>
            <span className="text-xs text-verdant-muted font-mono">/ {stats.total} Modules</span>
          </div>
          <span className="text-[11px] text-verdant-muted block mt-2">
            {stats.remaining} remaining • {stats.in_progress} in progress
          </span>
        </div>

        {/* Metric 3: Assessment Average */}
        <div className="glass-card rounded-2xl p-5 border border-white/10 relative overflow-hidden group hover:border-verdant-lime/30 transition-all">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-mono text-verdant-muted uppercase tracking-wider">Test Average</span>
            <div className="w-7 h-7 rounded-lg bg-verdant-lime/10 text-verdant-lime flex items-center justify-center">
              <Award className="w-3.5 h-3.5" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-sans font-bold text-verdant-text">{stats.assessment_average}%</span>
            <span className="text-xs text-verdant-lime font-mono">Pass Rating</span>
          </div>
          <span className="text-[11px] text-verdant-muted block mt-2">
            Automated test case grading active
          </span>
        </div>

        {/* Metric 4: Skills Mastered */}
        <div className="glass-card rounded-2xl p-5 border border-white/10 relative overflow-hidden group hover:border-verdant-lime/30 transition-all">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-mono text-verdant-muted uppercase tracking-wider">Mastery Ratio</span>
            <div className="w-7 h-7 rounded-lg bg-verdant-lime/10 text-verdant-lime flex items-center justify-center">
              <TrendingUp className="w-3.5 h-3.5" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-sans font-bold text-verdant-lime">{stats.skills_mastered_count}</span>
            <span className="text-xs text-verdant-muted font-mono">mastered / {stats.skills_to_improve_count} revise</span>
          </div>
          <span className="text-[11px] text-verdant-muted block mt-2">
            Continuous skill validation
          </span>
        </div>

      </div>

      {/* ── Recommended Next Activity Banner ── */}
      {stats.recommended_next_activity && (
        <div className="mb-8 glass-card rounded-3xl p-6 border border-verdant-lime/30 bg-gradient-to-r from-verdant-lime/10 via-[#0e170f] to-[#0a0e0a] flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-[0_0_30px_rgba(198,242,78,0.1)]">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-verdant-lime/20 border border-verdant-lime text-verdant-lime flex items-center justify-center shrink-0 shadow-[0_0_15px_rgba(198,242,78,0.3)]">
              <Sparkles className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-[10px] font-mono font-bold tracking-widest uppercase text-verdant-lime">
                  RECOMMENDED NEXT ACTIVITY
                </span>
                <span className="text-[9px] font-mono px-2 py-0.5 rounded-full bg-white/10 text-verdant-text">
                  Module Assessment
                </span>
              </div>
              <h3 className="text-lg font-bold text-verdant-text">
                {stats.recommended_next_activity.title}
              </h3>
              <p className="text-verdant-muted text-xs mt-1 max-w-xl">
                {stats.recommended_next_activity.description}
              </p>
            </div>
          </div>

          <Link
            to={`/module/${stats.recommended_next_activity.module_id}`}
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-verdant-lime hover:bg-verdant-lime-hover text-[#0A0E0A] font-bold text-xs shadow-[0_0_20px_rgba(198,242,78,0.4)] whitespace-nowrap transition-transform hover:scale-105"
          >
            <span>{stats.recommended_next_activity.cta_label || 'Launch Module'}</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      )}

      {/* ── Charts Grid: Progress Trajectory & Topic Competency Radar ── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        
        {/* Chart 1: Progress Trajectory Over Time */}
        <div className="glass-card rounded-3xl p-6 border border-white/10 flex flex-col justify-between">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-base font-semibold text-verdant-text">Learning Progress &amp; Assessment Score</h3>
              <p className="text-xs text-verdant-muted">Measured progress percentage vs average test score</p>
            </div>
            <div className="flex items-center gap-3 text-[11px] font-mono">
              <span className="flex items-center gap-1.5 text-verdant-lime">
                <span className="w-2 h-2 rounded-full bg-verdant-lime" /> Progress
              </span>
              <span className="flex items-center gap-1.5 text-verdant-muted">
                <span className="w-2 h-2 rounded-full bg-[#9AA39B]" /> Test Score
              </span>
            </div>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={progressHistory} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="dashboardLimeGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#C6F24E" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#C6F24E" stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="label" stroke="#525d53" fontSize={11} tickLine={false} />
                <YAxis stroke="#525d53" fontSize={11} tickLine={false} domain={[0, 100]} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#0c140d',
                    borderColor: 'rgba(255,255,255,0.1)',
                    borderRadius: '12px',
                    fontSize: '12px',
                    color: '#F4F6F2'
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="progress"
                  stroke="#C6F24E"
                  strokeWidth={2}
                  fillOpacity={1}
                  fill="url(#dashboardLimeGradient)"
                />
                <Area
                  type="monotone"
                  dataKey="score"
                  stroke="#9AA39B"
                  strokeWidth={1.5}
                  strokeDasharray="4 4"
                  fill="none"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Chart 2: Topic Competency Radar */}
        <div className="glass-card rounded-3xl p-6 border border-white/10 flex flex-col justify-between">
          <div className="flex items-center justify-between mb-2">
            <div>
              <h3 className="text-base font-semibold text-verdant-text">Topic Competency Matrix</h3>
              <p className="text-xs text-verdant-muted">Synthesized from auto-evaluated coding challenges and MCQs</p>
            </div>
            <div className="px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] font-mono text-verdant-lime">
              Verified
            </div>
          </div>

          <div className="h-64 w-full flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="75%" data={radarData}>
                <PolarGrid stroke="#233024" />
                <PolarAngleAxis dataKey="subject" stroke="#9AA39B" fontSize={11} />
                <PolarRadiusAxis angle={30} domain={[0, 100]} stroke="#233024" />
                <Radar
                  name="Proficiency"
                  dataKey="score"
                  stroke="#C6F24E"
                  fill="#C6F24E"
                  fillOpacity={0.35}
                />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>

      {/* ── Skills Breakdown: Mastered vs Need Improvement ── */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        
        {/* Mastered Skills Card */}
        <div className="glass-card rounded-3xl p-6 border border-white/10">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-verdant-lime/10 border border-verdant-lime/30 flex items-center justify-center text-verdant-lime">
                <Check className="w-4 h-4" />
              </div>
              <h3 className="text-base font-semibold text-verdant-text">Mastered Competencies</h3>
            </div>
            <span className="text-xs font-mono text-verdant-lime font-bold">
              {data?.skills_mastered.length || stats.skills_mastered_count} Verified
            </span>
          </div>

          <div className="flex flex-wrap gap-2">
            {(data?.skills_mastered || ['Python Data Model', 'List Comprehensions', 'Time Complexity (O(n))', 'SQL Window Functions', 'Git Branching']).map((skill, i) => (
              <div
                key={i}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-verdant-lime/10 border border-verdant-lime/25 text-xs text-verdant-text"
              >
                <CheckCircle2 className="w-3.5 h-3.5 text-verdant-lime" />
                <span>{skill}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Skills Requiring Improvement & Recommendations */}
        <div className="glass-card rounded-3xl p-6 border border-white/10">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
                <AlertCircle className="w-4 h-4" />
              </div>
              <h3 className="text-base font-semibold text-verdant-text">Targeted Revision &amp; Practice</h3>
            </div>
            <span className="text-xs font-mono text-amber-400 font-bold">
              {data?.skills_to_improve.length || stats.skills_to_improve_count} Identified
            </span>
          </div>

          <div className="flex flex-col gap-2.5">
            {(data?.recommendations || [
              { topic: 'Recursion & Dynamic Programming', reason: 'Failed edge cases on array memoization test suite.', action: 'Review recursive call stacks and solve 3 practice challenges.' },
              { topic: 'SQL Self Joins', reason: 'Query timeout on hierarchical employee records.', action: 'Study recursive CTE syntax in PostgreSQL.' }
            ]).map((rec, i) => (
              <div
                key={i}
                className="p-3 rounded-2xl bg-white/[0.03] border border-amber-500/20 text-xs flex flex-col gap-1"
              >
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-amber-300">{rec.topic}</span>
                  <span className="text-[10px] font-mono text-verdant-muted">Remediation</span>
                </div>
                <p className="text-verdant-muted text-[11px] leading-relaxed">{rec.reason}</p>
                <div className="text-verdant-lime text-[11px] font-medium mt-1 flex items-center gap-1">
                  <span>→ Recommendation: {rec.action}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* ── Curriculum Modules Timeline & Status ── */}
      <div className="glass-card rounded-3xl p-6 sm:p-8 border border-white/10">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
          <div>
            <h3 className="text-lg font-bold text-verdant-text">Curriculum Modules &amp; Assessment Gates</h3>
            <p className="text-xs text-verdant-muted">Pass assessments with ≥70% score to unlock subsequent milestones</p>
          </div>
          <Link
            to="/roadmap"
            className="text-xs text-verdant-lime hover:underline font-mono inline-flex items-center gap-1"
          >
            <span>Configure Roadmap in Studio</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="flex flex-col gap-3">
          {(data?.modules || [
            { id: 'mod-1', name: 'Python Core & Data Engineering', topics: ['Iterators', 'Decorators', 'Generators'], status: 'completed', score: 88, attempts: 1 },
            { id: 'mod-2', name: 'Machine Learning Foundations', topics: ['Linear Models', 'Gradient Descent', 'Numpy'], status: 'in_progress', score: null, attempts: 0 },
            { id: 'mod-3', name: 'Deep Learning & Neural Architectures', topics: ['PyTorch', 'Backpropagation', 'CNNs'], status: 'locked', score: null, attempts: 0 },
            { id: 'mod-4', name: 'LLM Engineering & RAG Systems', topics: ['Embeddings', 'Vector DBs', 'LangChain'], status: 'locked', score: null, attempts: 0 },
            { id: 'mod-5', name: 'AI Production Deployment', topics: ['FastAPI', 'Docker', 'Triton Inference'], status: 'locked', score: null, attempts: 0 },
          ]).map((mod, i) => (
            <div
              key={mod.id || i}
              className={`p-4 rounded-2xl border transition-all duration-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
                mod.status === 'completed'
                  ? 'bg-verdant-lime/[0.04] border-verdant-lime/30'
                  : mod.status === 'in_progress'
                  ? 'bg-white/[0.04] border-white/20'
                  : 'bg-black/20 border-white/5 opacity-60'
              }`}
            >
              <div className="flex items-start sm:items-center gap-3">
                <div className={`w-8 h-8 rounded-xl flex items-center justify-center font-mono text-xs font-bold shrink-0 ${
                  mod.status === 'completed'
                    ? 'bg-verdant-lime text-[#0A0E0A]'
                    : mod.status === 'in_progress'
                    ? 'bg-white/10 text-verdant-lime border border-verdant-lime/40'
                    : 'bg-white/5 text-verdant-muted'
                }`}>
                  {i + 1}
                </div>
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <h4 className="font-semibold text-sm text-verdant-text">{mod.name}</h4>
                    {mod.status_label ? (
                      <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-mono font-medium border ${
                        mod.status === 'completed'
                          ? 'bg-verdant-lime/20 border-verdant-lime/40 text-verdant-lime'
                          : mod.status === 'in_progress'
                          ? 'bg-amber-400/10 border-amber-400/30 text-amber-300'
                          : 'bg-white/5 border-white/10 text-verdant-muted'
                      }`}>
                        {mod.status_label}
                      </span>
                    ) : mod.status === 'completed' ? (
                      <span className="px-2 py-0.5 rounded-full bg-verdant-lime/20 border border-verdant-lime/40 text-verdant-lime text-[10px] font-mono font-bold">
                        Passed ({mod.score}%)
                      </span>
                    ) : mod.status === 'in_progress' ? (
                      <span className="px-2 py-0.5 rounded-full bg-amber-400/10 border-amber-400/30 text-amber-300 text-[10px] font-mono">
                        In Progress
                      </span>
                    ) : (
                      <span className="px-2 py-0.5 rounded-full bg-white/5 text-verdant-muted text-[10px] font-mono">
                        Locked
                      </span>
                    )}
                  </div>
                  <div className="flex flex-wrap gap-1.5 mt-1">
                    {mod.topics?.map((t: string, idx: number) => (
                      <span key={idx} className="text-[10px] font-mono text-verdant-muted">
                        #{t}{idx < (mod.topics?.length || 0) - 1 ? ' •' : ''}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <div>
                {mod.status === 'completed' && (
                  <Link
                    to={`/module/${mod.id}`}
                    className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full glass-card border border-white/10 text-xs text-verdant-muted hover:text-verdant-text transition-colors"
                  >
                    <span>Review Module</span>
                    <ArrowRight className="w-3 h-3" />
                  </Link>
                )}
                {mod.status === 'in_progress' && (
                  <Link
                    to={`/module/${mod.id}`}
                    className="inline-flex items-center gap-1.5 px-5 py-2 rounded-full bg-verdant-lime hover:bg-verdant-lime-hover text-[#0A0E0A] font-bold text-xs shadow-[0_0_15px_rgba(198,242,78,0.4)] transition-all hover:scale-105"
                  >
                    <span>Continue Module</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                )}
                {mod.status === 'locked' && (
                  <span className="text-xs font-mono text-verdant-muted/60 px-4 py-1.5">
                    Locked Milestone
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
