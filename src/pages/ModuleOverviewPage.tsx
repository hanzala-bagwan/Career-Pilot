import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  Compass, ChevronRight, CheckCircle2, Lock, ArrowRight, BookOpen,
  Award, Sparkles, Terminal, Code2, AlertCircle, RefreshCw
} from 'lucide-react';
import { api, ModuleOverviewData } from '../services/api';

export const ModuleOverviewPage: React.FC = () => {
  const { moduleId = 'mod_1' } = useParams<{ moduleId: string }>();
  const [data, setData] = useState<ModuleOverviewData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchModule = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await api.getModuleOverview(moduleId);
      setData(res);
    } catch (err: any) {
      setError(err.message || 'Failed to load module details');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchModule();
  }, [moduleId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-verdant-bg flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-2 border-verdant-lime border-t-transparent rounded-full animate-spin" />
          <span className="text-xs font-mono text-verdant-muted">Loading Module Overview...</span>
        </div>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="min-h-screen bg-verdant-bg text-verdant-text flex items-center justify-center px-4">
        <div className="glass-card p-8 rounded-3xl text-center max-w-md border border-white/10">
          <AlertCircle className="w-10 h-10 text-verdant-lime mx-auto mb-3" />
          <h2 className="text-lg font-bold mb-2">Module Not Found</h2>
          <p className="text-xs text-verdant-muted mb-6">{error || 'Unable to retrieve module specification.'}</p>
          <Link to="/roadmap" className="px-6 py-2.5 rounded-full bg-verdant-lime text-[#0A0E0A] font-bold text-xs">
            Return to Roadmap
          </Link>
        </div>
      </div>
    );
  }

  const { module, submodules, submodules_passed, submodules_total, final_exam } = data;
  const progressPct = submodules_total > 0 ? Math.round((submodules_passed / submodules_total) * 100) : 0;
  const isFinalExamUnlocked = final_exam.unlocked || submodules_passed === submodules_total;

  return (
    <div className="min-h-screen bg-verdant-bg text-verdant-text pt-24 pb-20 px-4 sm:px-6 max-w-5xl mx-auto">
      
      {/* ── Breadcrumbs ── */}
      <nav className="flex items-center gap-2 text-xs font-mono text-verdant-muted mb-6">
        <Link to="/roadmap" className="hover:text-verdant-lime transition-colors flex items-center gap-1">
          <Compass className="w-3.5 h-3.5" />
          <span>Roadmap</span>
        </Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="text-verdant-text font-medium">{module.name}</span>
      </nav>

      {/* ── Module Header Banner ── */}
      <div className="glass-card rounded-3xl p-6 sm:p-8 border border-white/10 mb-8 bg-gradient-to-r from-[#0d160e] via-[#090e0a] to-[#070b08] relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-verdant-lime/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-white/5 border border-white/10 text-verdant-muted uppercase">
                {module.id.toUpperCase()}
              </span>
              {module.status === 'completed' && (
                <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-verdant-lime/20 border border-verdant-lime/40 text-verdant-lime font-bold">
                  Completed ({module.score}%)
                </span>
              )}
              {module.status === 'in_progress' && (
                <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-white/10 border border-white/20 text-verdant-lime">
                  In Progress
                </span>
              )}
            </div>

            <h1 className="text-2xl sm:text-4xl font-bold tracking-tight text-verdant-text mb-2">
              {module.name}
            </h1>
            <p className="text-verdant-muted text-xs sm:text-sm max-w-2xl leading-relaxed mb-4">
              {module.description}
            </p>

            <div className="flex flex-wrap gap-1.5">
              {module.topics.map((t, idx) => (
                <span key={idx} className="px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 text-[10px] font-mono text-verdant-muted">
                  #{t}
                </span>
              ))}
            </div>
          </div>

          {/* Module Progress Ring / Bar Stats */}
          <div className="w-full md:w-auto p-4 rounded-2xl bg-black/40 border border-white/10 flex flex-col gap-2 min-w-[200px]">
            <div className="flex items-center justify-between text-xs font-mono">
              <span className="text-verdant-muted">Module Gates</span>
              <span className="text-verdant-lime font-bold">{submodules_passed} / {submodules_total} Passed</span>
            </div>
            <div className="w-full bg-white/5 h-2 rounded-full overflow-hidden">
              <div
                className="bg-verdant-lime h-full rounded-full transition-all duration-500 shadow-[0_0_8px_#C6F24E]"
                style={{ width: `${progressPct}%` }}
              />
            </div>
            <span className="text-[10px] font-mono text-verdant-muted">
              {progressPct}% submodules validated
            </span>
          </div>
        </div>
      </div>

      {/* ── Submodule Learning Journey ── */}
      <section className="mb-10">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-lg font-bold text-verdant-text">
              Modular Curriculum <span className="font-serif italic font-normal text-verdant-lime">Submodules</span>
            </h2>
            <p className="text-xs text-verdant-muted">
              Complete each submodule test to unlock subsequent milestones and qualify for the Final Exam.
            </p>
          </div>
          <span className="text-xs font-mono text-verdant-muted">
            {submodules.length} Segments
          </span>
        </div>

        <div className="flex flex-col gap-3">
          {submodules.map((sub, idx) => {
            const isPassed = sub.status === 'passed';
            const isInProgress = sub.status === 'in_progress';
            const isLocked = sub.status === 'locked';

            return (
              <div
                key={sub.id}
                className={`glass-card rounded-2xl p-5 border transition-all duration-300 flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
                  isPassed
                    ? 'border-verdant-lime/30 bg-verdant-lime/[0.03]'
                    : isInProgress
                    ? 'border-white/25 bg-white/[0.04] shadow-[0_0_20px_rgba(198,242,78,0.06)]'
                    : 'border-white/5 bg-black/30 opacity-60'
                }`}
              >
                <div className="flex items-start sm:items-center gap-4">
                  <div className={`w-9 h-9 rounded-xl flex items-center justify-center font-mono text-xs font-bold shrink-0 ${
                    isPassed
                      ? 'bg-verdant-lime text-[#0A0E0A]'
                      : isInProgress
                      ? 'bg-verdant-lime/20 border border-verdant-lime text-verdant-lime'
                      : 'bg-white/5 text-verdant-muted'
                  }`}>
                    {isPassed ? <CheckCircle2 className="w-4 h-4" /> : isLocked ? <Lock className="w-4 h-4" /> : idx + 1}
                  </div>

                  <div>
                    <div className="flex flex-wrap items-center gap-2 mb-1">
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-verdant-muted">
                        SUBMODULE {idx + 1}
                      </span>
                      <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full ${
                        sub.difficulty === 'Beginner'
                          ? 'bg-emerald-500/10 border border-emerald-500/20 text-emerald-300'
                          : sub.difficulty === 'Intermediate'
                          ? 'bg-blue-500/10 border border-blue-500/20 text-blue-300'
                          : 'bg-amber-500/10 border border-amber-500/20 text-amber-300'
                      }`}>
                        {sub.difficulty}
                      </span>
                      {sub.has_coding_challenge && (
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-verdant-lime/10 border border-verdant-lime/20 text-verdant-lime flex items-center gap-1">
                          <Code2 className="w-3 h-3" />
                          <span>Code Challenge</span>
                        </span>
                      )}
                    </div>

                    <h3 className="font-semibold text-sm text-verdant-text">
                      {sub.title}
                    </h3>

                    {/* Test scope description */}
                    {sub.test_scope && (
                      <p className="text-[11px] font-mono text-verdant-muted mt-1">
                        Scope: {sub.test_scope}
                      </p>
                    )}
                  </div>
                </div>

                {/* Right Action Button */}
                <div className="flex items-center gap-2 sm:self-center">
                  {isPassed ? (
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono font-bold text-verdant-lime">
                        {sub.score ? `${Math.round(sub.score)}%` : 'Passed ✓'}
                      </span>
                      <Link
                        to={`/module/${moduleId}/submodule/${sub.id}`}
                        className="px-3.5 py-1.5 rounded-full glass-card border border-white/10 text-xs text-verdant-muted hover:text-verdant-text transition-colors"
                      >
                        Review
                      </Link>
                    </div>
                  ) : isInProgress ? (
                    <Link
                      to={`/module/${moduleId}/submodule/${sub.id}`}
                      className="inline-flex items-center gap-1.5 px-5 py-2 rounded-full bg-verdant-lime hover:bg-verdant-lime-hover text-[#0A0E0A] font-bold text-xs shadow-[0_0_15px_rgba(198,242,78,0.4)] transition-all hover:scale-105 whitespace-nowrap"
                    >
                      <span>Study &amp; Test</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  ) : (
                    <span className="text-xs font-mono text-verdant-muted/50 px-3 py-1.5">
                      Locked Gate
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ── MODULE FINAL EXAM CARD ── */}
      <section>
        <div className="mb-3">
          <h2 className="text-lg font-bold text-verdant-text">
            Milestone Gate: <span className="font-serif italic font-normal text-verdant-lime">Module Final Exam</span>
          </h2>
          <p className="text-xs text-verdant-muted">
            The mandatory comprehensive examination covering all submodules, algorithms, and practical code challenges.
          </p>
        </div>

        {isFinalExamUnlocked ? (
          /* FINAL EXAM UNLOCKED & READY */
          <div className="glass-card rounded-3xl p-6 sm:p-8 border border-verdant-lime/40 bg-gradient-to-r from-verdant-lime/10 via-[#0e170f] to-[#0a0e0a] relative overflow-hidden shadow-[0_0_40px_rgba(198,242,78,0.15)] animate-in fade-in duration-300">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              <div className="flex items-start gap-4">
                <div className="w-14 h-14 rounded-2xl bg-verdant-lime text-[#0A0E0A] flex items-center justify-center shrink-0 shadow-[0_0_25px_rgba(198,242,78,0.5)]">
                  <Award className="w-7 h-7" />
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full bg-verdant-lime text-[#0A0E0A]">
                      FINAL EXAM UNLOCKED
                    </span>
                    <span className="text-[10px] font-mono text-verdant-muted">
                      15–20 Questions • 2–3 Coding Challenges • 45 Mins
                    </span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-verdant-text">
                    {final_exam.title}
                  </h3>
                  <p className="text-verdant-muted text-xs sm:text-sm mt-1 max-w-xl">
                    All submodules passed! Prove your technical competence across the entire module curriculum.
                    Passing unlocks the next major engineering flightpath milestone.
                  </p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto">
                <Link
                  to={`/module/${moduleId}/final-exam`}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full bg-gradient-to-r from-verdant-lime to-[#bbf43d] hover:to-verdant-lime text-[#0A0E0A] font-bold text-xs shadow-[0_0_25px_rgba(198,242,78,0.5)] hover:shadow-[0_0_35px_rgba(198,242,78,0.8)] transition-all hover:scale-105 whitespace-nowrap"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Launch Module Final Exam</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        ) : (
          /* FINAL EXAM LOCKED STATE */
          <div className="glass-card rounded-3xl p-6 sm:p-8 border border-white/10 bg-black/30 relative overflow-hidden opacity-75">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-verdant-muted shrink-0">
                <Lock className="w-6 h-6" />
              </div>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-white/5 border border-white/10 text-verdant-muted">
                    LOCKED GATE
                  </span>
                  <span className="text-[10px] font-mono text-verdant-muted">
                    Requires: {submodules_total - submodules_passed} remaining submodules passed
                  </span>
                </div>
                <h3 className="text-lg font-bold text-verdant-text">
                  {final_exam.title}
                </h3>
                <p className="text-verdant-muted text-xs mt-1 max-w-xl">
                  This final exam remains locked until all submodules in this module are completed and passed.
                  Return to active submodules above to continue your preparation.
                </p>
              </div>
            </div>
          </div>
        )}
      </section>

    </div>
  );
};
