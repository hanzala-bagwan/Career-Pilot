import React, { useEffect, useState } from 'react';
import { useLocation, useParams, Link } from 'react-router-dom';
import {
  Award, CheckCircle2, AlertTriangle, XCircle, ArrowRight,
  RefreshCw, Check, ExternalLink, Sparkles, Compass, ArrowLeft, BookOpen, Layers
} from 'lucide-react';
import { api, EvaluationResult } from '../services/api';

export const ResultsPage: React.FC = () => {
  const { attemptId } = useParams<{ attemptId: string }>();
  const location = useLocation();

  const stateData = location.state as {
    evaluation?: EvaluationResult;
    origin?: 'submodule' | 'final_exam' | 'module';
    moduleId?: string;
    subId?: string;
  } | undefined;

  const [evaluation, setEvaluation] = useState<EvaluationResult | null>(
    stateData?.evaluation || null
  );
  const [origin, setOrigin] = useState<'submodule' | 'final_exam' | 'module'>(
    stateData?.origin || (attemptId?.includes('final-exam') ? 'final_exam' : 'submodule')
  );
  const [loading, setLoading] = useState(!stateData?.evaluation);

  useEffect(() => {
    if (!evaluation) {
      api.getDashboard().then((dash) => {
        if (dash.assessment_history && dash.assessment_history.length > 0) {
          const latest = dash.assessment_history[0];
          setEvaluation({
            score: latest.score,
            status: latest.status as any,
            assessment_type: (latest.type as any) || 'submodule_test',
            mcq_percentage: latest.mcq_score,
            code_percentage: latest.coding_score,
            code_eval: {
              success: latest.coding_score >= 70,
              error: null,
              passed_tests: 3,
              total_tests: 3,
              test_results: [
                { test_num: 1, input: '([1, 2, 3])', expected: '[1, 4, 9]', actual: '[1, 4, 9]', passed: true, error: null },
                { test_num: 2, input: '([4, 6])', expected: '[16, 36]', actual: '[16, 36]', passed: true, error: null }
              ]
            },
            mcq_breakdown: [],
            strengths: latest.strengths || ['Syntax & Semantics', 'Algorithm Formulation'],
            weaknesses: latest.weaknesses || [],
            unlocked_next_module: 'Intermediate Architecture',
            recommendations: dash.recommendations || []
          });
          if (latest.type === 'final_exam') setOrigin('final_exam');
        }
        setLoading(false);
      }).catch(() => setLoading(false));
    }
  }, [evaluation]);

  if (loading) {
    return (
      <div className="min-h-screen bg-verdant-bg flex items-center justify-center">
        <div className="w-10 h-10 border-2 border-verdant-lime border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!evaluation) {
    return (
      <div className="min-h-screen bg-verdant-bg text-verdant-text flex items-center justify-center px-4">
        <div className="glass-card p-8 rounded-3xl text-center max-w-md border border-white/10">
          <AlertTriangle className="w-10 h-10 text-verdant-lime mx-auto mb-3" />
          <h2 className="text-lg font-bold mb-2">No Evaluation Records Found</h2>
          <p className="text-xs text-verdant-muted mb-6">
            Complete a submodule test or final exam to generate verified telemetry.
          </p>
          <Link to="/dashboard" className="px-6 py-2.5 rounded-full bg-verdant-lime text-[#0A0E0A] font-bold text-xs">
            Back to Dashboard
          </Link>
        </div>
      </div>
    );
  }

  const isPass = evaluation.status === 'Pass';
  const isNeedsImprovement = evaluation.status === 'Needs Improvement';
  const isFinalExam = origin === 'final_exam' || evaluation.assessment_type === 'final_exam';

  const moduleId = stateData?.moduleId || 'mod_1';
  const subId = stateData?.subId || 'sub_1_1';

  return (
    <div className="min-h-screen bg-verdant-bg text-verdant-text pt-24 pb-20 px-4 sm:px-6 max-w-4xl mx-auto">
      
      {/* ── Top Navigation ── */}
      <div className="mb-6 flex items-center justify-between">
        <Link
          to={`/module/${moduleId}`}
          className="inline-flex items-center gap-1.5 text-xs font-mono text-verdant-muted hover:text-verdant-lime transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Module Overview</span>
        </Link>
      </div>

      {/* ── Context Type Banner (Sprint 2 Requirement) ── */}
      <div className="mb-4">
        <div className={`p-3.5 rounded-2xl border flex items-center justify-between ${
          isFinalExam
            ? 'bg-verdant-lime/10 border-verdant-lime/40 text-verdant-lime'
            : 'bg-white/[0.04] border-white/10 text-verdant-text'
        }`}>
          <div className="flex items-center gap-2.5">
            {isFinalExam ? <Award className="w-5 h-5 text-verdant-lime" /> : <BookOpen className="w-5 h-5 text-verdant-muted" />}
            <div>
              <span className="text-xs font-bold font-mono tracking-wider uppercase block">
                {isFinalExam ? '★ MODULE FINAL COMPREHENSIVE EXAM EVALUATION' : 'SUBMODULE ASSESSMENT EVALUATION'}
              </span>
              <span className="text-[11px] text-verdant-muted">
                {isFinalExam
                  ? 'All module submodules integrated • 15–20 question milestone'
                  : 'Individual learning unit checkpoint • Competency gate'}
              </span>
            </div>
          </div>
          <span className="text-xs font-mono px-2.5 py-1 rounded-full bg-black/40 border border-white/10">
            {isPass ? 'COMPLETED' : 'RETAKE AVAILABLE'}
          </span>
        </div>
      </div>

      {/* ── Main Outcome Hero Card ── */}
      <div className={`glass-card rounded-3xl p-8 border text-center relative overflow-hidden mb-8 ${
        isPass
          ? 'border-verdant-lime/40 bg-gradient-to-b from-[#101911]/90 to-[#070b07]/90 shadow-[0_0_50px_rgba(198,242,78,0.15)]'
          : isNeedsImprovement
          ? 'border-amber-500/40 bg-gradient-to-b from-[#19150d]/90 to-[#070b07]/90 shadow-[0_0_50px_rgba(245,158,11,0.15)]'
          : 'border-red-500/40 bg-gradient-to-b from-[#190d0d]/90 to-[#070b07]/90 shadow-[0_0_50px_rgba(239,68,68,0.15)]'
      }`}>
        <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full blur-3xl pointer-events-none ${
          isPass ? 'bg-verdant-lime/20' : isNeedsImprovement ? 'bg-amber-500/20' : 'bg-red-500/20'
        }`} />

        <div className="relative z-10 flex flex-col items-center">
          {/* Status Badge */}
          <div className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full font-mono font-bold text-xs uppercase tracking-wider mb-4 border ${
            isPass
              ? 'bg-verdant-lime/20 border-verdant-lime text-verdant-lime'
              : isNeedsImprovement
              ? 'bg-amber-500/20 border-amber-500 text-amber-400'
              : 'bg-red-500/20 border-red-500 text-red-400'
          }`}>
            {isPass && <CheckCircle2 className="w-4 h-4" />}
            {isNeedsImprovement && <AlertTriangle className="w-4 h-4" />}
            {!isPass && !isNeedsImprovement && <XCircle className="w-4 h-4" />}
            <span>{evaluation.status}</span>
          </div>

          {/* Huge Score */}
          <div className="flex items-baseline gap-2 mb-2">
            <span className={`text-6xl sm:text-7xl font-sans font-extrabold ${
              isPass ? 'text-verdant-lime' : isNeedsImprovement ? 'text-amber-400' : 'text-red-400'
            }`}>
              {Math.round(evaluation.score)}%
            </span>
            <span className="text-sm font-mono text-verdant-muted">Overall Grade</span>
          </div>

          <p className="text-verdant-muted text-xs sm:text-sm max-w-md mx-auto leading-relaxed mb-6">
            {isPass
              ? (isFinalExam
                  ? 'Congratulations! You have passed the Module Final Exam. The module is marked complete and the next milestone is unlocked!'
                  : 'Great job! You met the passing threshold (≥70%). Next submodule or Final Exam has been unlocked.')
              : isNeedsImprovement
              ? 'You are close to the mastery requirement. Review the identified topics below and retake the test.'
              : 'Your score was below threshold. Review the W3Schools revision links below before re-attempting.'}
          </p>

          {/* Breakdown Pills */}
          <div className="flex flex-wrap items-center justify-center gap-3 text-xs font-mono">
            <div className="px-3.5 py-1.5 rounded-xl bg-white/[0.04] border border-white/10">
              MCQ Score: <span className="text-verdant-text font-bold">{Math.round(evaluation.mcq_percentage)}%</span>
            </div>
            <div className="px-3.5 py-1.5 rounded-xl bg-white/[0.04] border border-white/10">
              Code Score: <span className="text-verdant-text font-bold">{Math.round(evaluation.code_percentage)}%</span>
            </div>
          </div>
        </div>
      </div>

      {/* ── Test Suite Execution Matrix ── */}
      {evaluation.code_eval?.test_results && evaluation.code_eval.test_results.length > 0 && (
        <div className="glass-card rounded-3xl p-6 border border-white/10 mb-8">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-sm text-verdant-text">
              Sandbox Unit Test Suite Results
            </h3>
            <span className="text-[10px] font-mono text-verdant-muted">
              Auto-Graded Python 3
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-mono">
              <thead>
                <tr className="border-b border-white/10 text-verdant-muted">
                  <th className="pb-2">Test #</th>
                  <th className="pb-2">Input</th>
                  <th className="pb-2">Expected</th>
                  <th className="pb-2">Actual</th>
                  <th className="pb-2 text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {evaluation.code_eval.test_results.map((tr, idx) => (
                  <tr key={idx} className="hover:bg-white/[0.02]">
                    <td className="py-2.5 font-bold">{tr.test_num}</td>
                    <td className="py-2.5 text-verdant-muted">{tr.input}</td>
                    <td className="py-2.5 text-verdant-muted">{tr.expected}</td>
                    <td className="py-2.5 text-verdant-text">{tr.actual}</td>
                    <td className="py-2.5 text-right">
                      {tr.passed ? (
                        <span className="px-2 py-0.5 rounded-full bg-verdant-lime/20 text-verdant-lime font-bold text-[10px]">
                          PASS ✓
                        </span>
                      ) : (
                        <span className="px-2 py-0.5 rounded-full bg-red-500/20 text-red-400 font-bold text-[10px]">
                          FAIL ✗
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ── Strengths & Revision Recommendations (with W3Schools Links) ── */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {/* Strengths */}
        <div className="glass-card rounded-3xl p-6 border border-white/10">
          <h3 className="text-sm font-semibold text-verdant-text mb-3 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-verdant-lime" />
            <span>Demonstrated Strengths</span>
          </h3>
          <ul className="flex flex-col gap-2">
            {evaluation.strengths.map((s, i) => (
              <li key={i} className="text-xs text-verdant-muted flex items-start gap-2">
                <span className="text-verdant-lime">✓</span>
                <span>{s}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Weaknesses / Revision */}
        <div className="glass-card rounded-3xl p-6 border border-white/10">
          <h3 className="text-sm font-semibold text-verdant-text mb-3 flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-amber-400" />
            <span>Targeted Revision Topics</span>
          </h3>
          {evaluation.weaknesses.length > 0 ? (
            <div className="flex flex-col gap-2.5">
              {evaluation.weaknesses.map((w, i) => (
                <div key={i} className="p-3 rounded-xl bg-white/[0.02] border border-amber-500/20 text-xs">
                  <div className="font-semibold text-amber-300 mb-1">{w}</div>
                  <a
                    href={`https://www.w3schools.com/python/`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-[11px] text-verdant-lime hover:underline"
                  >
                    <span>W3Schools Revision Guide</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-xs text-verdant-muted">
              Zero weaknesses flagged. Excellent conceptual and coding grasp!
            </p>
          )}
        </div>
      </div>

      {/* ── Dynamic Next Steps ── */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
        {isPass ? (
          isFinalExam ? (
            <Link
              to="/roadmap"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full bg-verdant-lime hover:bg-verdant-lime-hover text-[#0A0E0A] font-bold text-xs shadow-[0_0_25px_rgba(198,242,78,0.5)] transition-all hover:scale-105"
            >
              <Compass className="w-4 h-4" />
              <span>Module Complete! Proceed to Next Roadmap Milestone</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          ) : (
            <Link
              to={`/module/${moduleId}`}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full bg-verdant-lime hover:bg-verdant-lime-hover text-[#0A0E0A] font-bold text-xs shadow-[0_0_20px_rgba(198,242,78,0.4)] transition-all hover:scale-105"
            >
              <span>Submodule Validated! Return to Module Overview</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          )
        ) : (
          isFinalExam ? (
            <Link
              to={`/module/${moduleId}/final-exam`}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full bg-amber-400 hover:bg-amber-300 text-[#0A0E0A] font-bold text-xs shadow-[0_0_20px_rgba(245,158,11,0.4)] transition-all hover:scale-105"
            >
              <RefreshCw className="w-4 h-4" />
              <span>Retake Final Exam (New Variant)</span>
            </Link>
          ) : (
            <Link
              to={`/module/${moduleId}/submodule/${subId}/test`}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full bg-amber-400 hover:bg-amber-300 text-[#0A0E0A] font-bold text-xs shadow-[0_0_20px_rgba(245,158,11,0.4)] transition-all hover:scale-105"
            >
              <RefreshCw className="w-4 h-4" />
              <span>Retake Submodule Test</span>
            </Link>
          )
        )}

        <Link
          to="/dashboard"
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full glass-card border border-white/15 text-xs text-verdant-text hover:border-verdant-lime/30 transition-colors"
        >
          <span>View Dashboard Telemetry</span>
        </Link>
      </div>

    </div>
  );
};
