import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import {
  Clock, Play, CheckCircle2, Award, Terminal, Send, ArrowLeft,
  Sparkles, RefreshCw, ChevronDown, ChevronUp, Code2, AlertTriangle, Layers
} from 'lucide-react';
import { api, FinalExamData } from '../services/api';

export const FinalExamPage: React.FC = () => {
  const { moduleId = 'mod_1' } = useParams<{ moduleId: string }>();
  const navigate = useNavigate();

  const [currentVariant, setCurrentVariant] = useState<'variant_a' | 'variant_b'>('variant_a');
  const [examData, setExamData] = useState<FinalExamData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [mcqAnswers, setMcqAnswers] = useState<Record<string, string>>({});
  const [conceptualAnswers, setConceptualAnswers] = useState<Record<string, string>>({});
  const [showGuidelines, setShowGuidelines] = useState<Record<string, boolean>>({});
  const [codingSolutions, setCodingSolutions] = useState<Record<string, string>>({});
  const [testOutputs, setTestOutputs] = useState<Record<string, any>>({});
  const [testingCodeId, setTestingCodeId] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(2700); // 45 minutes

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeRemaining((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const loadExam = async (variant: 'variant_a' | 'variant_b') => {
    setLoading(true);
    setError(null);
    try {
      const res = await api.getFinalExam(moduleId, variant);
      setExamData(res);
      // Initialize starter codes
      const initCode: Record<string, string> = {};
      res.coding_challenges.forEach((ch) => {
        initCode[ch.id] = ch.starter_code;
      });
      setCodingSolutions(initCode);
      setMcqAnswers({});
      setTestOutputs({});
    } catch (err: any) {
      setError(err.message || 'Failed to load Final Exam');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadExam(currentVariant);
  }, [moduleId, currentVariant]);

  const handleToggleVariant = () => {
    const next = currentVariant === 'variant_a' ? 'variant_b' : 'variant_a';
    setCurrentVariant(next);
  };

  const handleSelectMcq = (qId: string, optKey: string) => {
    setMcqAnswers((prev) => ({ ...prev, [qId]: optKey }));
  };

  const handleRunChallengeTests = async (challenge: any) => {
    setTestingCodeId(challenge.id);
    const code = codingSolutions[challenge.id] || '';
    try {
      const res = await api.testCode(code, challenge.test_cases, challenge.function_name);
      setTestOutputs((prev) => ({ ...prev, [challenge.id]: res }));
    } catch (err: any) {
      setTestOutputs((prev) => ({
        ...prev,
        [challenge.id]: { success: false, error: err.message || 'Execution error' }
      }));
    } finally {
      setTestingCodeId(null);
    }
  };

  const handleSubmitFinalExam = async () => {
    setSubmitting(true);
    try {
      const res = await api.evaluateFinalExam(
        moduleId,
        currentVariant,
        mcqAnswers,
        codingSolutions
      );
      if (res.success) {
        navigate(`/results/final-exam-${moduleId}`, {
          state: {
            evaluation: res.attempt,
            origin: 'final_exam',
            moduleId: moduleId
          }
        });
      }
    } catch (err: any) {
      alert(`Final Exam Submission Error: ${err.message || 'Evaluation failed'}`);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-verdant-bg flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="w-12 h-12 border-2 border-verdant-lime border-t-transparent rounded-full animate-spin" />
          <span className="text-xs font-mono text-verdant-muted">Loading 15-20 Question Module Final Exam...</span>
        </div>
      </div>
    );
  }

  if (error || !examData) {
    return (
      <div className="min-h-screen bg-verdant-bg text-verdant-text flex items-center justify-center px-4">
        <div className="glass-card p-8 rounded-3xl text-center max-w-md border border-white/10">
          <AlertTriangle className="w-10 h-10 text-verdant-lime mx-auto mb-3" />
          <h2 className="text-lg font-bold mb-2">Final Exam Unavailable</h2>
          <p className="text-xs text-verdant-muted mb-6">{error || 'Could not compile exam questions.'}</p>
          <Link to={`/module/${moduleId}`} className="px-6 py-2.5 rounded-full bg-verdant-lime text-[#0A0E0A] font-bold text-xs">
            Return to Module Overview
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-verdant-bg text-verdant-text pt-24 pb-24 px-4 sm:px-6 max-w-5xl mx-auto">
      
      {/* ── Top Bar ── */}
      <div className="flex items-center justify-between mb-6 pb-4 border-b border-white/10">
        <Link
          to={`/module/${moduleId}`}
          className="inline-flex items-center gap-2 text-xs font-mono text-verdant-muted hover:text-verdant-lime transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Exit to Module Overview</span>
        </Link>

        <div className="flex items-center gap-3">
          {/* New Variant Button for Retakes */}
          <button
            type="button"
            onClick={handleToggleVariant}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full glass-card border border-white/15 hover:border-verdant-lime/40 text-xs font-mono text-verdant-muted hover:text-verdant-lime transition-colors"
            title="Generate a new question variant for retakes"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Switch Variant ({currentVariant === 'variant_a' ? 'Variant B' : 'Variant A'})</span>
          </button>

          {/* Countdown Clock */}
          <div className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-black/40 border border-white/10 font-mono text-xs">
            <Clock className="w-3.5 h-3.5 text-verdant-lime" />
            <span className="text-verdant-text font-bold">{formatTime(timeRemaining)}</span>
          </div>
        </div>
      </div>

      {/* ── Final Exam Header ── */}
      <div className="glass-card rounded-3xl p-6 sm:p-8 border border-verdant-lime/30 mb-8 bg-gradient-to-r from-verdant-lime/10 via-[#0e170f] to-[#0a0e0a] relative overflow-hidden shadow-[0_0_30px_rgba(198,242,78,0.1)]">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full bg-verdant-lime text-[#0A0E0A]">
            MODULE FINAL COMPREHENSIVE EXAM
          </span>
          <span className="text-[10px] font-mono text-verdant-muted uppercase">
            {currentVariant.toUpperCase()} • 15–20 QUESTIONS
          </span>
        </div>

        <h1 className="text-2xl sm:text-4xl font-bold tracking-tight text-verdant-text mb-2">
          {examData.title}
        </h1>
        <p className="text-verdant-muted text-xs sm:text-sm max-w-2xl leading-relaxed mb-4">
          {examData.subtitle}
        </p>

        <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-verdant-muted">
          <span>Passing Threshold: <strong className="text-verdant-lime">≥{examData.passing_percentage}%</strong></span>
          <span>•</span>
          <span>{examData.mcqs.length} MCQs</span>
          <span>•</span>
          <span>{examData.conceptual_questions.length} Architecture Reflections</span>
          <span>•</span>
          <span>{examData.coding_challenges.length} Practical Coding Challenges</span>
        </div>
      </div>

      {/* ── PART 1: 10–14 COMPREHENSIVE MCQs ── */}
      <section className="mb-10">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-verdant-lime text-[#0A0E0A] font-mono text-xs font-bold flex items-center justify-center">
              1
            </span>
            <h2 className="text-lg font-bold text-verdant-text">
              Comprehensive Topic MCQs ({examData.mcqs.length} Questions)
            </h2>
          </div>
          <span className="text-xs font-mono text-verdant-muted">
            Answered: {Object.keys(mcqAnswers).length} / {examData.mcqs.length}
          </span>
        </div>

        <div className="flex flex-col gap-4">
          {examData.mcqs.map((q, idx) => (
            <div key={q.id} className="glass-card rounded-2xl p-5 border border-white/10 flex flex-col gap-3">
              <div className="flex items-start justify-between gap-4">
                <span className="text-xs sm:text-sm font-semibold text-verdant-text">
                  <span className="font-mono text-verdant-lime mr-2">Q{idx + 1}.</span>
                  {q.question}
                </span>
                <span className="text-[10px] font-mono text-verdant-muted px-2 py-0.5 rounded-full bg-white/5 shrink-0">
                  {q.topic}
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-1">
                {Object.entries(q.options).map(([optKey, optText]) => {
                  const isSelected = mcqAnswers[q.id] === optKey;
                  return (
                    <button
                      key={optKey}
                      type="button"
                      onClick={() => handleSelectMcq(q.id, optKey)}
                      className={`text-left p-3 rounded-xl border text-xs transition-all flex items-start gap-2.5 ${
                        isSelected
                          ? 'bg-verdant-lime/15 border-verdant-lime text-verdant-text font-medium shadow-[0_0_12px_rgba(198,242,78,0.2)]'
                          : 'bg-white/[0.02] border-white/5 text-verdant-muted hover:border-white/20 hover:text-verdant-text'
                      }`}
                    >
                      <span className={`w-5 h-5 rounded-full flex items-center justify-center font-mono text-[11px] font-bold shrink-0 ${
                        isSelected ? 'bg-verdant-lime text-[#0A0E0A]' : 'bg-white/5 text-verdant-muted'
                      }`}>
                        {optKey}
                      </span>
                      <span className="leading-relaxed">{optText}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── PART 2: ARCHITECTURAL CONCEPTUAL REFLECTIONS ── */}
      {examData.conceptual_questions.length > 0 && (
        <section className="mb-10">
          <div className="flex items-center gap-2 mb-4">
            <span className="w-6 h-6 rounded-full bg-verdant-lime text-[#0A0E0A] font-mono text-xs font-bold flex items-center justify-center">
              2
            </span>
            <h2 className="text-lg font-bold text-verdant-text">
              Architecture &amp; System Reflection ({examData.conceptual_questions.length} Scenarios)
            </h2>
          </div>

          <div className="flex flex-col gap-4">
            {examData.conceptual_questions.map((cq, idx) => (
              <div key={cq.id} className="glass-card rounded-2xl p-5 border border-white/10 flex flex-col gap-3">
                <h3 className="font-semibold text-sm text-verdant-text">
                  Scenario {idx + 1}: {cq.title}
                </h3>
                <p className="text-xs text-verdant-muted leading-relaxed">
                  {cq.prompt}
                </p>

                <textarea
                  rows={3}
                  value={conceptualAnswers[cq.id] || ''}
                  onChange={(e) => setConceptualAnswers((prev) => ({ ...prev, [cq.id]: e.target.value }))}
                  placeholder="Detail your architectural recommendations and design trade-offs..."
                  className="w-full mt-1 p-3.5 rounded-xl bg-black/40 border border-white/10 text-xs text-verdant-text placeholder:text-verdant-muted/40 focus:border-verdant-lime focus:outline-none"
                />

                <div>
                  <button
                    type="button"
                    onClick={() => setShowGuidelines((prev) => ({ ...prev, [cq.id]: !prev[cq.id] }))}
                    className="text-xs font-mono text-verdant-lime flex items-center gap-1 hover:underline"
                  >
                    <span>{showGuidelines[cq.id] ? 'Hide Architecture Benchmark' : 'View Architecture Benchmark'}</span>
                    {showGuidelines[cq.id] ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                  </button>

                  {showGuidelines[cq.id] && (
                    <div className="mt-2.5 p-3 rounded-xl bg-verdant-lime/[0.04] border border-verdant-lime/20 text-xs text-verdant-muted leading-relaxed">
                      <strong className="text-verdant-lime block mb-0.5">Benchmark Solution:</strong>
                      {cq.sample_answer}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ── PART 3: 2–3 PRACTICAL CODING CHALLENGES ── */}
      <section className="mb-10">
        <div className="flex items-center gap-2 mb-4">
          <span className="w-6 h-6 rounded-full bg-verdant-lime text-[#0A0E0A] font-mono text-xs font-bold flex items-center justify-center">
            3
          </span>
          <h2 className="text-lg font-bold text-verdant-text">
            Practical Coding Challenges ({examData.coding_challenges.length} Live Sandbox Challenges)
          </h2>
        </div>

        <div className="flex flex-col gap-6">
          {examData.coding_challenges.map((ch, idx) => {
            const out = testOutputs[ch.id];
            const isTesting = testingCodeId === ch.id;

            return (
              <div key={ch.id} className="glass-card rounded-2xl p-6 border border-white/10 flex flex-col gap-4">
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="font-bold text-base text-verdant-text">
                      Challenge {idx + 1}: {ch.title}
                    </h3>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-verdant-lime/10 border border-verdant-lime/30 text-verdant-lime">
                      {ch.topic}
                    </span>
                  </div>
                  <p className="text-xs text-verdant-muted leading-relaxed">
                    {ch.description}
                  </p>
                </div>

                <div className="rounded-xl overflow-hidden border border-white/15 bg-[#070b07]">
                  <div className="flex items-center justify-between px-4 py-2 bg-black/60 border-b border-white/10 text-xs font-mono text-verdant-muted">
                    <div className="flex items-center gap-2">
                      <Terminal className="w-3.5 h-3.5 text-verdant-lime" />
                      <span>{ch.function_name}.py</span>
                    </div>
                    <span>Signature: <code className="text-verdant-lime">{ch.function_name}()</code></span>
                  </div>

                  <textarea
                    value={codingSolutions[ch.id] || ''}
                    onChange={(e) => setCodingSolutions((prev) => ({ ...prev, [ch.id]: e.target.value }))}
                    rows={8}
                    spellCheck={false}
                    className="w-full p-4 font-mono text-xs text-[#E5E9F0] bg-transparent focus:outline-none resize-y leading-relaxed"
                  />

                  <div className="flex items-center justify-between p-3 bg-black/40 border-t border-white/10">
                    <span className="text-[11px] font-mono text-verdant-muted">
                      Evaluated against unit test cases in sandbox
                    </span>
                    <button
                      type="button"
                      onClick={() => handleRunChallengeTests(ch)}
                      disabled={isTesting}
                      className="px-4 py-1.5 rounded-lg bg-white/10 hover:bg-verdant-lime hover:text-[#0A0E0A] text-verdant-text text-xs font-mono font-medium flex items-center gap-1.5 transition-all disabled:opacity-50"
                    >
                      <Play className={`w-3.5 h-3.5 ${isTesting ? 'animate-spin' : ''}`} />
                      <span>{isTesting ? 'Running...' : 'Run Test Cases'}</span>
                    </button>
                  </div>
                </div>

                {out && (
                  <div className={`p-4 rounded-xl border text-xs font-mono ${
                    out.passed_tests === out.total_tests && out.total_tests > 0
                      ? 'bg-verdant-lime/10 border-verdant-lime/40 text-verdant-text'
                      : 'bg-red-500/10 border-red-500/30 text-verdant-text'
                  }`}>
                    <div className="flex items-center justify-between mb-2 font-bold">
                      <span>Sandbox Results: {out.passed_tests || 0} / {out.total_tests || 0} Passed</span>
                      <span className={out.passed_tests === out.total_tests ? 'text-verdant-lime' : 'text-red-400'}>
                        {out.passed_tests === out.total_tests ? 'PASSED ✓' : 'SOME TESTS FAILED ✗'}
                      </span>
                    </div>
                    {out.test_results?.map((t: any, i: number) => (
                      <div key={i} className="flex items-center justify-between text-[11px] py-0.5 border-t border-white/5">
                        <span>Input: {t.input}</span>
                        <span className={t.passed ? 'text-verdant-lime' : 'text-red-400'}>
                          {t.passed ? 'PASSED' : `FAIL (Expected: ${t.expected})`}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* ── FINAL SUBMIT BAR ── */}
      <div className="sticky bottom-6 z-40 glass-card p-4 rounded-2xl border border-white/20 shadow-2xl flex flex-col sm:flex-row items-center justify-between gap-4 backdrop-blur-2xl">
        <div className="text-xs text-verdant-muted">
          <span>MCQs: <strong className="text-verdant-text">{Object.keys(mcqAnswers).length}/{examData.mcqs.length}</strong></span>
          <span className="mx-2">•</span>
          <span>Challenges: <strong className="text-verdant-text">{examData.coding_challenges.length} Included</strong></span>
        </div>

        <button
          onClick={handleSubmitFinalExam}
          disabled={submitting}
          className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-gradient-to-r from-verdant-lime to-[#b5f134] text-[#0A0E0A] font-bold text-xs shadow-[0_0_25px_rgba(198,242,78,0.5)] hover:shadow-[0_0_35px_rgba(198,242,78,0.8)] transition-all hover:scale-105 disabled:opacity-50 flex items-center justify-center gap-2"
        >
          {submitting ? (
            <>
              <RefreshCw className="w-4 h-4 animate-spin" />
              <span>Evaluating Final Examination...</span>
            </>
          ) : (
            <>
              <Send className="w-4 h-4" />
              <span>Submit Module Final Exam</span>
            </>
          )}
        </button>
      </div>

    </div>
  );
};
