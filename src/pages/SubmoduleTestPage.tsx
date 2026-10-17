import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import {
  Clock, Play, CheckCircle2, XCircle, AlertTriangle, Terminal,
  Send, Code2, ArrowLeft, RefreshCw, ChevronDown, ChevronUp, ChevronRight
} from 'lucide-react';
import { api, SubmoduleTestData } from '../services/api';

export const SubmoduleTestPage: React.FC = () => {
  const { moduleId = 'mod_1', subId = 'sub_1_1' } = useParams<{ moduleId: string; subId: string }>();
  const navigate = useNavigate();

  const [testData, setTestData] = useState<SubmoduleTestData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [mcqAnswers, setMcqAnswers] = useState<Record<string, string>>({});
  const [conceptAnswer, setConceptAnswer] = useState('');
  const [showConceptGuide, setShowConceptGuide] = useState(false);
  const [code, setCode] = useState('');
  const [testOutput, setTestOutput] = useState<any>(null);
  const [testingCode, setTestingCode] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(900); // 15 mins

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

  useEffect(() => {
    const fetchTest = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await api.getSubmoduleTest(moduleId, subId);
        setTestData(res);
        if (res.coding_challenge?.starter_code) {
          setCode(res.coding_challenge.starter_code);
        }
      } catch (err: any) {
        setError(err.message || 'Failed to load test suite');
      } finally {
        setLoading(false);
      }
    };
    fetchTest();
  }, [moduleId, subId]);

  const handleSelectMcq = (qId: string, optKey: string) => {
    setMcqAnswers((prev) => ({ ...prev, [qId]: optKey }));
  };

  const handleRunTests = async () => {
    if (!testData?.coding_challenge) return;
    setTestingCode(true);
    try {
      const res = await api.testCode(
        code,
        testData.coding_challenge.test_cases,
        testData.coding_challenge.function_name
      );
      setTestOutput(res);
    } catch (err: any) {
      setTestOutput({
        success: false,
        error: err.message || 'Execution error'
      });
    } finally {
      setTestingCode(false);
    }
  };

  const handleSubmit = async () => {
    setSubmitting(true);
    try {
      const res = await api.evaluateSubmodule(moduleId, subId, mcqAnswers, code);
      if (res.success) {
        navigate(`/results/${subId}`, {
          state: {
            evaluation: res.attempt,
            origin: 'submodule',
            moduleId: moduleId,
            subId: subId
          }
        });
      }
    } catch (err: any) {
      alert(`Submission error: ${err.message || 'Evaluation failed'}`);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-verdant-bg flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-2 border-verdant-lime border-t-transparent rounded-full animate-spin" />
          <span className="text-xs font-mono text-verdant-muted">Loading Submodule Test Suite...</span>
        </div>
      </div>
    );
  }

  if (error || !testData) {
    return (
      <div className="min-h-screen bg-verdant-bg text-verdant-text flex items-center justify-center px-4">
        <div className="glass-card p-8 rounded-3xl text-center max-w-md border border-white/10">
          <AlertTriangle className="w-10 h-10 text-verdant-lime mx-auto mb-3" />
          <h2 className="text-lg font-bold mb-2">Test Unavailable</h2>
          <p className="text-xs text-verdant-muted mb-6">{error || 'Could not load test questions.'}</p>
          <Link to={`/module/${moduleId}/submodule/${subId}`} className="px-6 py-2.5 rounded-full bg-verdant-lime text-[#0A0E0A] font-bold text-xs">
            Back to Submodule
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-verdant-bg text-verdant-text pt-24 pb-20 px-4 sm:px-6 max-w-4xl mx-auto">
      
      {/* ── Top Bar ── */}
      <div className="flex items-center justify-between mb-6 pb-4 border-b border-white/10">
        <Link
          to={`/module/${moduleId}/submodule/${subId}`}
          className="inline-flex items-center gap-2 text-xs font-mono text-verdant-muted hover:text-verdant-lime transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Exit to Submodule Study</span>
        </Link>

        {/* Timer Pill */}
        <div className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-black/40 border border-white/10 font-mono text-xs">
          <Clock className="w-3.5 h-3.5 text-verdant-lime" />
          <span className="text-verdant-text font-bold">{formatTime(timeRemaining)}</span>
          <span className="text-verdant-muted text-[10px]">remaining</span>
        </div>
      </div>

      {/* ── Test Header ── */}
      <div className="glass-card rounded-3xl p-6 sm:p-8 border border-white/10 mb-8 bg-gradient-to-r from-[#0d160e] via-[#090e0a] to-[#070b08]">
        <div className="flex flex-wrap items-center gap-2 mb-2">
          <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-white/5 border border-white/10 text-verdant-muted uppercase">
            SUBMODULE TEST
          </span>
          <span className="text-[10px] font-mono text-verdant-lime font-bold">
            {testData.difficulty}
          </span>
        </div>

        <h1 className="text-2xl sm:text-3xl font-bold text-verdant-text mb-2">
          {testData.submodule_title}
        </h1>
        <p className="text-xs font-mono text-verdant-muted">
          Scope: {testData.test_scope} • Passing Grade: ≥70%
        </p>
      </div>

      {/* ── SECTION 1: MCQs ── */}
      <section className="mb-10">
        <div className="flex items-center gap-2 mb-4">
          <span className="w-6 h-6 rounded-full bg-verdant-lime text-[#0A0E0A] font-mono text-xs font-bold flex items-center justify-center">
            1
          </span>
          <h2 className="text-base font-bold text-verdant-text">
            Conceptual &amp; Syntax Multiple Choice
          </h2>
        </div>

        <div className="flex flex-col gap-4">
          {testData.mcqs.map((q, idx) => (
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

      {/* ── SECTION 2: Conceptual Reflection ── */}
      {testData.conceptual_question && (
        <section className="mb-10">
          <div className="flex items-center gap-2 mb-4">
            <span className="w-6 h-6 rounded-full bg-verdant-lime text-[#0A0E0A] font-mono text-xs font-bold flex items-center justify-center">
              2
            </span>
            <h2 className="text-base font-bold text-verdant-text">
              Architecture Reflection
            </h2>
          </div>

          <div className="glass-card rounded-2xl p-5 border border-white/10 flex flex-col gap-3">
            <h3 className="font-semibold text-sm text-verdant-text">
              {testData.conceptual_question.title}
            </h3>
            <p className="text-xs text-verdant-muted leading-relaxed">
              {testData.conceptual_question.prompt}
            </p>

            <textarea
              rows={3}
              value={conceptAnswer}
              onChange={(e) => setConceptAnswer(e.target.value)}
              placeholder="Reflect on trade-offs and runtime characteristics..."
              className="w-full mt-2 p-3.5 rounded-xl bg-black/40 border border-white/10 text-xs text-verdant-text placeholder:text-verdant-muted/40 focus:border-verdant-lime focus:outline-none"
            />

            <div>
              <button
                type="button"
                onClick={() => setShowConceptGuide(!showConceptGuide)}
                className="text-xs font-mono text-verdant-lime flex items-center gap-1 hover:underline"
              >
                <span>{showConceptGuide ? 'Hide Sample Guideline' : 'View Sample Architecture Guideline'}</span>
                {showConceptGuide ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
              </button>

              {showConceptGuide && (
                <div className="mt-2.5 p-3 rounded-xl bg-verdant-lime/[0.04] border border-verdant-lime/20 text-xs text-verdant-muted leading-relaxed">
                  <strong className="text-verdant-lime block mb-0.5">Reference Architecture:</strong>
                  {testData.conceptual_question.sample_answer}
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {/* ── SECTION 3: Coding Challenge (if present) ── */}
      {testData.coding_challenge && (
        <section className="mb-10">
          <div className="flex items-center gap-2 mb-4">
            <span className="w-6 h-6 rounded-full bg-verdant-lime text-[#0A0E0A] font-mono text-xs font-bold flex items-center justify-center">
              {testData.conceptual_question ? 3 : 2}
            </span>
            <h2 className="text-base font-bold text-verdant-text">
              Python Practical Code Challenge
            </h2>
          </div>

          <div className="glass-card rounded-2xl p-6 border border-white/10 flex flex-col gap-4">
            <div>
              <div className="flex items-center justify-between mb-1">
                <h3 className="font-bold text-base text-verdant-text">
                  {testData.coding_challenge.title}
                </h3>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-verdant-lime/10 border border-verdant-lime/30 text-verdant-lime">
                  {testData.coding_challenge.topic}
                </span>
              </div>
              <p className="text-xs text-verdant-muted leading-relaxed">
                {testData.coding_challenge.description}
              </p>
            </div>

            {/* Code Editor Box */}
            <div className="rounded-xl overflow-hidden border border-white/15 bg-[#070b07]">
              <div className="flex items-center justify-between px-4 py-2 bg-black/60 border-b border-white/10 text-xs font-mono text-verdant-muted">
                <div className="flex items-center gap-2">
                  <Terminal className="w-3.5 h-3.5 text-verdant-lime" />
                  <span>solution.py</span>
                </div>
                <span>Function: <code className="text-verdant-lime">{testData.coding_challenge.function_name}()</code></span>
              </div>

              <textarea
                value={code}
                onChange={(e) => setCode(e.target.value)}
                rows={9}
                spellCheck={false}
                className="w-full p-4 font-mono text-xs text-[#E5E9F0] bg-transparent focus:outline-none resize-y leading-relaxed selection:bg-verdant-lime selection:text-black"
              />

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
                  <span>{testingCode ? 'Testing Sandbox...' : 'Run Test Cases'}</span>
                </button>
              </div>
            </div>

            {/* Test Case Output */}
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
                    <span className="text-red-400 font-bold">FAILURES DETECTED ✗</span>
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
            {Object.keys(mcqAnswers).length} / {testData.mcqs.length}
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
              <span>Evaluating Submodule...</span>
            </>
          ) : (
            <>
              <Send className="w-4 h-4" />
              <span>Submit Submodule Test</span>
            </>
          )}
        </button>
      </div>

    </div>
  );
};
