import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import {
  Clock, Play, CheckCircle2, XCircle, AlertTriangle, Terminal,
  Send, Sparkles, HelpCircle, Code2, ArrowLeft, RefreshCw, ChevronDown, ChevronUp
} from 'lucide-react';
import { api, AssessmentData, EvaluationResult } from '../services/api';

export const AssessmentCenterPage: React.FC = () => {
  const { moduleId = 'mod-1' } = useParams<{ moduleId: string }>();
  const navigate = useNavigate();

  const [assessment, setAssessment] = useState<AssessmentData | null>(null);
  const [loading, setLoading] = useState(true);
  const [mcqAnswers, setMcqAnswers] = useState<Record<string, string>>({});
  const [conceptAnswer, setConceptAnswer] = useState('');
  const [showConceptGuide, setShowConceptGuide] = useState(false);
  const [code, setCode] = useState('');
  const [testOutput, setTestOutput] = useState<any>(null);
  const [testingCode, setTestingCode] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(1200); // 20 minutes

  // Countdown timer
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeRemaining((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  useEffect(() => {
    const fetchAssessment = async () => {
      setLoading(true);
      try {
        const data = await api.getAssessment(moduleId);
        setAssessment(data);
        if (data.coding_challenge?.starter_code) {
          setCode(data.coding_challenge.starter_code);
        }
      } catch (err) {
        console.error('Failed to load assessment:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchAssessment();
  }, [moduleId]);

  const handleSelectMcq = (qId: string, optionKey: string) => {
    setMcqAnswers((prev) => ({ ...prev, [qId]: optionKey }));
  };

  // Run test cases against Python backend
  const handleRunTests = async () => {
    if (!assessment?.coding_challenge) return;
    setTestingCode(true);
    try {
      const result = await api.testCodeExecution({
        code: code,
        function_name: assessment.coding_challenge.function_name,
        test_cases: assessment.coding_challenge.test_cases
      });
      setTestOutput(result);
    } catch (err: any) {
      setTestOutput({
        success: false,
        error: err.message || 'Execution error'
      });
    } finally {
      setTestingCode(false);
    }
  };

  // Submit assessment for final auto-grading
  const handleSubmit = async () => {
    setSubmitting(true);
    try {
      const res = await api.evaluateAssessment({
        module_id: moduleId,
        mcq_answers: mcqAnswers,
        coding_solution: code
      });
      if (res.success) {
        // Navigate to results screen with attempt outcome
        navigate(`/results/${moduleId}`, { state: { evaluation: res.attempt } });
      }
    } catch (err: any) {
      alert(`Submission failed: ${err.message}`);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-verdant-bg flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="w-12 h-12 rounded-full border-2 border-verdant-lime border-t-transparent animate-spin" />
          <span className="text-xs font-mono text-verdant-muted tracking-wider">
            Loading Assessment Test Suite...
          </span>
        </div>
      </div>
    );
  }

  if (!assessment) {
    return (
      <div className="min-h-screen bg-verdant-bg text-verdant-text flex items-center justify-center">
        <div className="glass-card p-8 rounded-3xl text-center max-w-md">
          <AlertTriangle className="w-12 h-12 text-verdant-lime mx-auto mb-4" />
          <h2 className="text-lg font-bold mb-2">Assessment Not Found</h2>
          <p className="text-xs text-verdant-muted mb-6">
            The assessment suite for this module could not be loaded.
          </p>
          <Link
            to="/roadmap"
            className="px-6 py-2.5 rounded-full bg-verdant-lime text-[#0A0E0A] font-bold text-xs"
          >
            Return to Roadmap
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-verdant-bg text-verdant-text pt-24 pb-20 px-4 sm:px-6 max-w-5xl mx-auto">
      
      {/* ── Top Bar ── */}
      <div className="flex items-center justify-between mb-8 pb-4 border-b border-white/10">
        <Link
          to="/dashboard"
          className="inline-flex items-center gap-2 text-xs font-mono text-verdant-muted hover:text-verdant-lime transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Exit to Dashboard</span>
        </Link>

        {/* Timer Pill */}
        <div className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-black/40 border border-white/10 font-mono text-xs">
          <Clock className="w-3.5 h-3.5 text-verdant-lime" />
          <span className="text-verdant-text font-bold">{formatTime(timeRemaining)}</span>
          <span className="text-verdant-muted text-[10px]">remaining</span>
        </div>
      </div>

      {/* ── Assessment Header ── */}
      <div className="glass-card rounded-3xl p-6 sm:p-8 border border-white/10 mb-8 bg-gradient-to-r from-[#0d160e] via-[#090e0a] to-[#070b08]">
        <div className="flex flex-wrap items-center gap-2 mb-2">
          <span className="text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full bg-verdant-lime/20 border border-verdant-lime/30 text-verdant-lime">
            {assessment.role || 'Career Flightpath'}
          </span>
          <span className="text-[10px] font-mono text-verdant-muted">
            MODULE GATE: {assessment.module_id.toUpperCase()}
          </span>
        </div>

        <h1 className="text-2xl sm:text-3xl font-bold text-verdant-text mb-2">
          {assessment.module_name}
        </h1>
        <p className="text-verdant-muted text-xs sm:text-sm max-w-2xl leading-relaxed mb-4">
          {assessment.description}
        </p>

        {/* Topics Tag List */}
        <div className="flex flex-wrap gap-2">
          {assessment.topics.map((t: string, i: number) => (
            <span
              key={i}
              className="px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 text-[11px] font-mono text-verdant-muted"
            >
              #{t}
            </span>
          ))}
        </div>
      </div>

      {/* ── SECTION 1: Multiple Choice Questions ── */}
      <section className="mb-10">
        <div className="flex items-center gap-2 mb-4">
          <span className="w-6 h-6 rounded-full bg-verdant-lime text-[#0A0E0A] font-mono text-xs font-bold flex items-center justify-center">
            1
          </span>
          <h2 className="text-lg font-bold text-verdant-text">
            Conceptual &amp; Architectural MCQs
          </h2>
        </div>

        <div className="flex flex-col gap-6">
          {assessment.mcqs.map((q: any, idx: number) => (
            <div
              key={q.id}
              className="glass-card rounded-2xl p-5 border border-white/10 flex flex-col gap-3"
            >
              <div className="flex items-start justify-between gap-4">
                <span className="text-sm font-semibold text-verdant-text">
                  <span className="font-mono text-verdant-lime mr-2">Q{idx + 1}.</span>
                  {q.question}
                </span>
                <span className="text-[10px] font-mono text-verdant-muted px-2 py-0.5 rounded-full bg-white/5 shrink-0">
                  {q.topic}
                </span>
              </div>

              {/* Options Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-2">
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
                        isSelected
                          ? 'bg-verdant-lime text-[#0A0E0A]'
                          : 'bg-white/5 text-verdant-muted'
                      }`}>
                        {optKey}
                      </span>
                      <span className="leading-relaxed">{String(optText)}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── SECTION 2: Conceptual Deep-Dive ── */}
      {assessment.conceptual_question && (
        <section className="mb-10">
          <div className="flex items-center gap-2 mb-4">
            <span className="w-6 h-6 rounded-full bg-verdant-lime text-[#0A0E0A] font-mono text-xs font-bold flex items-center justify-center">
              2
            </span>
            <h2 className="text-lg font-bold text-verdant-text">
              Engineering Architecture Reflection
            </h2>
          </div>

          <div className="glass-card rounded-2xl p-5 border border-white/10 flex flex-col gap-3">
            <h3 className="font-semibold text-sm text-verdant-text">
              {assessment.conceptual_question.title}
            </h3>
            <p className="text-xs text-verdant-muted leading-relaxed">
              {assessment.conceptual_question.prompt}
            </p>

            <textarea
              rows={4}
              value={conceptAnswer}
              onChange={(e) => setConceptAnswer(e.target.value)}
              placeholder="Provide your technical explanation and architectural trade-offs here..."
              className="w-full mt-2 p-3.5 rounded-xl bg-black/40 border border-white/10 text-xs text-verdant-text placeholder:text-verdant-muted/40 focus:border-verdant-lime focus:outline-none"
            />

            {/* Guideline accordian */}
            <div className="pt-2">
              <button
                type="button"
                onClick={() => setShowConceptGuide(!showConceptGuide)}
                className="text-xs font-mono text-verdant-lime flex items-center gap-1.5 hover:underline"
              >
                <span>{showConceptGuide ? 'Hide Sample Architecture Guidelines' : 'View Sample Architecture Guidelines'}</span>
                {showConceptGuide ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
              </button>

              {showConceptGuide && (
                <div className="mt-3 p-3.5 rounded-xl bg-verdant-lime/[0.04] border border-verdant-lime/20 text-xs text-verdant-muted leading-relaxed">
                  <span className="font-bold text-verdant-lime block mb-1">Benchmark Architecture Guidance:</span>
                  {assessment.conceptual_question.sample_answer}
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {/* ── SECTION 3: Python Coding Challenge & Sandbox ── */}
      {assessment.coding_challenge && (
        <section className="mb-10">
          <div className="flex items-center gap-2 mb-4">
            <span className="w-6 h-6 rounded-full bg-verdant-lime text-[#0A0E0A] font-mono text-xs font-bold flex items-center justify-center">
              3
            </span>
            <h2 className="text-lg font-bold text-verdant-text">
              Automated Python Programming Challenge
            </h2>
          </div>

          <div className="glass-card rounded-2xl p-6 border border-white/10 flex flex-col gap-4">
            <div>
              <div className="flex items-center justify-between mb-1">
                <h3 className="font-bold text-base text-verdant-text">
                  {assessment.coding_challenge.title}
                </h3>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-verdant-lime/10 border border-verdant-lime/30 text-verdant-lime">
                  {assessment.coding_challenge.topic}
                </span>
              </div>
              <p className="text-xs text-verdant-muted leading-relaxed">
                {assessment.coding_challenge.description}
              </p>
            </div>

            {/* Code Editor Frame */}
            <div className="rounded-xl overflow-hidden border border-white/15 bg-[#070b07]">
              {/* Editor Top Bar */}
              <div className="flex items-center justify-between px-4 py-2 bg-black/60 border-b border-white/10 text-xs font-mono text-verdant-muted">
                <div className="flex items-center gap-2">
                  <Terminal className="w-3.5 h-3.5 text-verdant-lime" />
                  <span>solution.py</span>
                </div>
                <span>Target Function: <code className="text-verdant-lime">{assessment.coding_challenge.function_name}()</code></span>
              </div>

              {/* Code Textarea */}
              <textarea
                value={code}
                onChange={(e) => setCode(e.target.value)}
                rows={10}
                spellCheck={false}
                className="w-full p-4 font-mono text-xs text-[#E5E9F0] bg-transparent focus:outline-none resize-y leading-relaxed selection:bg-verdant-lime selection:text-black"
              />

              {/* Editor Controls */}
              <div className="flex items-center justify-between p-3 bg-black/40 border-t border-white/10">
                <span className="text-[11px] font-mono text-verdant-muted">
                  Runs directly on Python 3 sandbox backend
                </span>

                <button
                  type="button"
                  onClick={handleRunTests}
                  disabled={testingCode}
                  className="px-4 py-1.5 rounded-lg bg-white/10 hover:bg-verdant-lime hover:text-[#0A0E0A] text-verdant-text text-xs font-mono font-medium flex items-center gap-1.5 transition-all disabled:opacity-50"
                >
                  <Play className={`w-3.5 h-3.5 ${testingCode ? 'animate-spin' : ''}`} />
                  <span>{testingCode ? 'Executing Sandbox...' : 'Run Test Cases'}</span>
                </button>
              </div>
            </div>

            {/* Test Case Execution Output Panel */}
            {testOutput && (
              <div className={`p-4 rounded-xl border text-xs font-mono ${
                testOutput.passed_tests === testOutput.total_tests && testOutput.total_tests > 0
                  ? 'bg-verdant-lime/10 border-verdant-lime/40 text-verdant-text'
                  : 'bg-red-500/10 border-red-500/30 text-verdant-text'
              }`}>
                <div className="flex items-center justify-between mb-2">
                  <span className="font-bold">
                    Sandbox Results: {testOutput.passed_tests || 0} / {testOutput.total_tests || 0} Passed
                  </span>
                  {testOutput.passed_tests === testOutput.total_tests ? (
                    <span className="text-verdant-lime font-bold">ALL TESTS PASSED ✓</span>
                  ) : (
                    <span className="text-red-400 font-bold">SOME TESTS FAILED ✗</span>
                  )}
                </div>

                {testOutput.error && (
                  <div className="text-red-400 text-[11px] mb-2 p-2 rounded bg-black/40">
                    {testOutput.error}
                  </div>
                )}

                {testOutput.test_results?.map((t: any, i: number) => (
                  <div key={i} className="flex items-center justify-between text-[11px] py-1 border-t border-white/5">
                    <span>Test #{t.test_num}: Input: {t.input}</span>
                    <span className={t.passed ? 'text-verdant-lime' : 'text-red-400'}>
                      {t.passed ? 'PASSED' : `FAILED (Got: ${t.actual}, Expected: ${t.expected})`}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>
      )}

      {/* ── SUBMIT FOOTER BAR ── */}
      <div className="sticky bottom-6 z-40 glass-card p-4 rounded-2xl border border-white/20 shadow-2xl flex flex-col sm:flex-row items-center justify-between gap-4 backdrop-blur-2xl">
        <div className="text-xs text-verdant-muted">
          <span>Completed MCQs: </span>
          <strong className="text-verdant-text">
            {Object.keys(mcqAnswers).length} / {assessment.mcqs.length}
          </strong>
        </div>

        <button
          onClick={handleSubmit}
          disabled={submitting}
          className="w-full sm:w-auto px-8 py-3 rounded-full bg-gradient-to-r from-verdant-lime to-[#b5f134] text-[#0A0E0A] font-bold text-xs shadow-[0_0_20px_rgba(198,242,78,0.5)] hover:shadow-[0_0_30px_rgba(198,242,78,0.8)] transition-all hover:scale-105 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {submitting ? (
            <>
              <RefreshCw className="w-4 h-4 animate-spin" />
              <span>Evaluating Solutions...</span>
            </>
          ) : (
            <>
              <Send className="w-4 h-4" />
              <span>Submit Assessment for Automated Grading</span>
            </>
          )}
        </button>
      </div>

    </div>
  );
};
