import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  Compass, ChevronRight, BookOpen, CheckCircle2, ArrowRight,
  ExternalLink, Terminal, Code2, AlertTriangle, ShieldCheck, ArrowLeft
} from 'lucide-react';
import { api, Submodule } from '../services/api';

export const SubmoduleLearningPage: React.FC = () => {
  const { moduleId = 'mod_1', subId = 'sub_1_1' } = useParams<{ moduleId: string; subId: string }>();
  const [submodule, setSubmodule] = useState<Submodule | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSubmodule = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await api.getSubmoduleDetail(moduleId, subId);
        setSubmodule(res);
      } catch (err: any) {
        setError(err.message || 'Failed to load submodule');
      } finally {
        setLoading(false);
      }
    };
    fetchSubmodule();
  }, [moduleId, subId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-verdant-bg flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-2 border-verdant-lime border-t-transparent rounded-full animate-spin" />
          <span className="text-xs font-mono text-verdant-muted">Loading Learning Unit...</span>
        </div>
      </div>
    );
  }

  if (error || !submodule) {
    return (
      <div className="min-h-screen bg-verdant-bg text-verdant-text flex items-center justify-center px-4">
        <div className="glass-card p-8 rounded-3xl text-center max-w-md border border-white/10">
          <AlertTriangle className="w-10 h-10 text-verdant-lime mx-auto mb-3" />
          <h2 className="text-lg font-bold mb-2">Submodule Not Found</h2>
          <p className="text-xs text-verdant-muted mb-6">{error || 'Could not locate requested learning unit.'}</p>
          <Link to={`/module/${moduleId}`} className="px-6 py-2.5 rounded-full bg-verdant-lime text-[#0A0E0A] font-bold text-xs">
            Back to Module Overview
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-verdant-bg text-verdant-text pt-24 pb-20 px-4 sm:px-6 max-w-4xl mx-auto">
      
      {/* ── Breadcrumbs ── */}
      <nav className="flex items-center gap-2 text-xs font-mono text-verdant-muted mb-6 flex-wrap">
        <Link to="/roadmap" className="hover:text-verdant-lime transition-colors flex items-center gap-1">
          <Compass className="w-3.5 h-3.5" />
          <span>Roadmap</span>
        </Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <Link to={`/module/${moduleId}`} className="hover:text-verdant-lime transition-colors">
          Module Overview
        </Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="text-verdant-text font-medium truncate max-w-xs">{submodule.title}</span>
      </nav>

      {/* ── Submodule Hero ── */}
      <div className="glass-card rounded-3xl p-6 sm:p-8 border border-white/10 mb-8 bg-gradient-to-r from-[#0d160e] via-[#090e0a] to-[#070b08] relative overflow-hidden">
        <div className="flex flex-wrap items-center gap-2 mb-2">
          <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-white/5 border border-white/10 text-verdant-muted uppercase">
            UNIT {submodule.order}
          </span>
          <span className={`text-[10px] font-mono px-2.5 py-0.5 rounded-full ${
            submodule.difficulty === 'Beginner'
              ? 'bg-emerald-500/10 border border-emerald-500/20 text-emerald-300'
              : submodule.difficulty === 'Intermediate'
              ? 'bg-blue-500/10 border border-blue-500/20 text-blue-300'
              : 'bg-amber-500/10 border border-amber-500/20 text-amber-300'
          }`}>
            {submodule.difficulty}
          </span>
          {submodule.status === 'passed' && (
            <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-verdant-lime/20 border border-verdant-lime/40 text-verdant-lime font-bold">
              Validated ({submodule.score}%) ✓
            </span>
          )}
        </div>

        <h1 className="text-2xl sm:text-3xl font-bold text-verdant-text mb-3">
          {submodule.title}
        </h1>

        <div className="flex flex-wrap gap-1.5">
          {submodule.topics.map((t, idx) => (
            <span key={idx} className="px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 text-[10px] font-mono text-verdant-muted">
              #{t}
            </span>
          ))}
        </div>
      </div>

      {/* ── 1. WHAT YOU'LL LEARN ── */}
      <section className="glass-card rounded-3xl p-6 sm:p-8 border border-white/10 mb-8">
        <div className="flex items-center gap-2.5 mb-4">
          <div className="w-8 h-8 rounded-xl bg-verdant-lime/10 border border-verdant-lime/30 flex items-center justify-center text-verdant-lime">
            <BookOpen className="w-4 h-4" />
          </div>
          <h2 className="text-base font-bold text-verdant-text">
            What You'll Learn
          </h2>
        </div>

        <ul className="flex flex-col gap-3">
          {(submodule.what_you_will_learn || [
            'Master core syntax invariants and execution models',
            'Implement clean, idiomatic algorithms and functions',
            'Handle boundary conditions and edge cases defensively'
          ]).map((item, idx) => (
            <li key={idx} className="flex items-start gap-3 text-xs sm:text-sm text-verdant-muted">
              <span className="w-5 h-5 rounded-full bg-verdant-lime/15 text-verdant-lime flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                ✓
              </span>
              <span className="leading-relaxed">{item}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* ── 2. TEST SCOPE SPECIFICATION ── */}
      <section className="glass-card rounded-3xl p-6 sm:p-8 border border-white/10 mb-8">
        <div className="flex items-center gap-2.5 mb-3">
          <div className="w-8 h-8 rounded-xl bg-verdant-lime/10 border border-verdant-lime/30 flex items-center justify-center text-verdant-lime">
            <ShieldCheck className="w-4 h-4" />
          </div>
          <h2 className="text-base font-bold text-verdant-text">
            Test Scope Specification
          </h2>
        </div>

        <div className="p-4 rounded-2xl bg-black/40 border border-white/10">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 mb-2">
            <span className="text-xs font-mono font-bold text-verdant-lime">
              {submodule.test_scope || '4 MCQs + 1 Python Challenge • 15 Mins'}
            </span>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-white/5 text-verdant-muted">
              Threshold: ≥70% to Pass
            </span>
          </div>
          <p className="text-xs text-verdant-muted leading-relaxed">
            {submodule.has_coding_challenge
              ? 'This assessment includes a hands-on Python programming challenge evaluated live against hidden and visible test cases in the sandbox.'
              : 'This assessment focuses on conceptual and architectural MCQs.'}
          </p>
        </div>
      </section>

      {/* ── 3. W3SCHOOLS VERIFIED RESOURCES ── */}
      <section className="glass-card rounded-3xl p-6 sm:p-8 border border-white/10 mb-10">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-verdant-lime/10 border border-verdant-lime/30 flex items-center justify-center text-verdant-lime">
              <ExternalLink className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base font-bold text-verdant-text">
                W3Schools Official Documentation
              </h2>
              <p className="text-[11px] font-mono text-verdant-muted">
                Curated and strictly verified deep links (https://www.w3schools.com/)
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {(submodule.w3schools_links || []).map((resource, idx) => (
            <a
              key={idx}
              href={resource.url}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-verdant-lime/40 transition-all flex items-center justify-between group hover:bg-white/[0.05]"
            >
              <div>
                <span className="text-xs font-medium text-verdant-text group-hover:text-verdant-lime transition-colors block">
                  {resource.title}
                </span>
                <span className="text-[10px] font-mono text-verdant-muted">
                  {resource.url.replace('https://www.w3schools.com', '')}
                </span>
              </div>
              <ExternalLink className="w-3.5 h-3.5 text-verdant-muted group-hover:text-verdant-lime transition-colors" />
            </a>
          ))}
        </div>
      </section>

      {/* ── BOTTOM ACTION CTA ── */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 glass-card p-6 rounded-3xl border border-verdant-lime/30 bg-gradient-to-r from-verdant-lime/10 via-[#0e170f] to-[#0a0e0a]">
        <div>
          <h3 className="font-bold text-base text-verdant-text">
            Ready to Validate Competency?
          </h3>
          <p className="text-xs text-verdant-muted mt-0.5">
            Take the timed assessment to earn your passing badge and unlock the next milestone.
          </p>
        </div>

        <Link
          to={`/module/${moduleId}/submodule/${subId}/test`}
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full bg-verdant-lime hover:bg-verdant-lime-hover text-[#0A0E0A] font-bold text-xs shadow-[0_0_20px_rgba(198,242,78,0.5)] transition-all hover:scale-105 whitespace-nowrap"
        >
          <span>{submodule.status === 'passed' ? 'Retake Submodule Test' : 'Take Submodule Test'}</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

    </div>
  );
};
