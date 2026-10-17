import React, { useState, useEffect } from 'react';
import { INTERVIEW_TELEMETRY } from '../data/telemetryData';
import { CareerTrack } from '../types';
import { 
  Mic, 
  MicOff, 
  Play, 
  Pause, 
  SkipForward, 
  CheckCircle2, 
  Sparkles, 
  Bot, 
  Volume2, 
  Timer, 
  Activity, 
  Radio, 
  MessageSquare,
  Award
} from 'lucide-react';

interface MockInterviewLabProps {
  onToast: (msg: string) => void;
  targetRole: string;
  activeTrack?: CareerTrack;
}

export const MockInterviewLab: React.FC<MockInterviewLabProps> = ({
  onToast,
  targetRole,
  activeTrack
}) => {
  const [isRecording, setIsRecording] = useState(true);
  const [secondsElapsed, setSecondsElapsed] = useState(42);
  const [activeQuestionIndex, setActiveQuestionIndex] = useState(3);
  const [waveformBars, setWaveformBars] = useState<number[]>([
    12, 24, 32, 20, 36, 28, 40, 24, 32, 16, 36, 28, 40, 24, 32, 20, 12
  ]);

  // Simulated live audio waveform fluctuations
  useEffect(() => {
    if (!isRecording) return;
    const interval = setInterval(() => {
      setWaveformBars(prev => prev.map(() => Math.floor(Math.random() * 32) + 8));
      setSecondsElapsed(prev => (prev < 120 ? prev + 1 : prev));
    }, 250);
    return () => clearInterval(interval);
  }, [isRecording]);

  const toggleRecording = () => {
    setIsRecording(!isRecording);
    onToast(isRecording ? 'Voice recording paused' : 'Voice recording resumed');
  };

  const handleCompleteAnswer = () => {
    setIsRecording(false);
    onToast('Answer Submitted: AI Bar Raiser evaluated L6+ Technical Depth!');
  };

  const handleSkipQuestion = () => {
    setActiveQuestionIndex(prev => (prev % 5) + 1);
    setSecondsElapsed(0);
    onToast('Skipped to next architecture question.');
  };

  const scenario = activeTrack?.interviewScenario || {
    questionText: INTERVIEW_TELEMETRY.questionText,
    specialization: INTERVIEW_TELEMETRY.specialization,
    detectedKeywords: INTERVIEW_TELEMETRY.detectedKeywords,
    transcript: INTERVIEW_TELEMETRY.transcript,
    coachTip: INTERVIEW_TELEMETRY.coachFeedback
  };

  const formatTime = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const rem = secs % 60;
    return `${mins.toString().padStart(2, '0')}:${rem.toString().padStart(2, '0')}`;
  };

  return (
    <div className="flex flex-col gap-8 pb-12 animate-fadeIn">
      
      {/* Header Context */}
      <div className="flex flex-col gap-1">
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-mono text-emerald-700 tracking-widest uppercase font-bold">
            TELEMETRY &amp; VOICE SIMULATION
          </span>
          <span className="text-[11px] font-mono px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-300 flex items-center gap-1.5 font-bold">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            Bar Raiser: <strong className="text-on-surface">L6 Principal Interviewer</strong>
          </span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-display font-extrabold text-on-surface">
          Adaptive Mock Interview &amp; Voice Simulation Lab
        </h1>
        <p className="text-xs sm:text-sm text-on-surface-variant font-medium">
          Simulated L6 Principal Bar Raiser voice drills with real-time waveform acoustics, cadence diagnostics, and live coaching overlays for <strong className="text-emerald-700">{targetRole}</strong>.
        </p>
      </div>

      {/* Live Recording Status Banner */}
      <div className={`p-4 rounded-xl border flex items-center justify-between transition-all ${
        isRecording 
          ? 'bg-rose-50 border-rose-300' 
          : 'bg-white border-border shadow-sm'
      }`}>
        <div className="flex items-center gap-3">
          <span className="relative flex h-3 w-3">
            {isRecording && <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-500 opacity-75" />}
            <span className={`relative inline-flex rounded-full h-3 w-3 ${isRecording ? 'bg-rose-600' : 'bg-slate-400'}`} />
          </span>
          <span className={`text-xs font-mono font-bold tracking-wider uppercase ${isRecording ? 'text-rose-700' : 'text-slate-500'}`}>
            {isRecording ? 'LIVE RECORDING IN PROGRESS' : 'RECORDING PAUSED'}
          </span>
        </div>
        <div className="flex items-center gap-2 px-3 py-1 rounded-lg bg-white text-xs font-mono text-emerald-700 border border-emerald-200 shadow-sm font-bold">
          <Timer className="w-3.5 h-3.5 animate-pulse text-emerald-600" />
          <span>{formatTime(secondsElapsed)} / 02:00</span>
        </div>
      </div>

      {/* Question Context & Live Voice Activity Card */}
      <section className="p-6 rounded-2xl glass-panel border border-border flex flex-col gap-4 relative overflow-hidden">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-md bg-emerald-100 text-emerald-800 text-xs font-mono font-bold border border-emerald-300">
              Q{activeQuestionIndex} / 5
            </span>
            <span className="text-xs font-mono text-on-surface-variant font-medium">Technical Depth • {scenario.specialization}</span>
          </div>
          <span className="text-[11px] font-mono text-emerald-700 font-bold px-2.5 py-0.5 rounded bg-emerald-50 border border-emerald-300">
            Principal Tier
          </span>
        </div>

        <p className="text-base sm:text-lg font-bold text-on-surface leading-relaxed">
          "{scenario.questionText}"
        </p>

        {/* Real-Time Audio Waveform Visualizer */}
        <div className="p-4 rounded-xl bg-slate-50 border border-border flex flex-col gap-3">
          <div className="flex items-center justify-between text-xs font-mono">
            <div className="flex items-center gap-2 text-emerald-700 font-bold">
              <Activity className="w-4 h-4 animate-pulse text-emerald-600" />
              <span>Acoustic Web Audio Telemetry</span>
            </div>
            <span className="text-on-surface-variant font-medium">
              {INTERVIEW_TELEMETRY.audioInputDb} • {INTERVIEW_TELEMETRY.audioFrequency} • &lt;150ms Latency
            </span>
          </div>

          {/* Animated Waveform Bars */}
          <div className="flex items-center justify-between gap-1.5 h-12 px-3 py-2 bg-white rounded-lg border border-border shadow-inner">
            {waveformBars.map((height, idx) => (
              <div
                key={idx}
                className={`w-1.5 rounded-full transition-all duration-150 ${
                  idx % 2 === 0 ? 'bg-emerald-500' : 'bg-teal-600'
                }`}
                style={{ height: `${height}px` }}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Live Streaming Transcript with Automated Concept Tagging */}
      <section className="p-6 rounded-2xl glass-panel border border-border flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <MessageSquare className="w-5 h-5 text-emerald-600" />
            <h3 className="font-bold text-sm text-on-surface">Live Streaming Transcript</h3>
          </div>
          <div className="flex items-center gap-2 text-xs font-mono">
            <span className="px-2.5 py-0.5 rounded bg-emerald-100 text-emerald-800 font-bold border border-emerald-300">
              {INTERVIEW_TELEMETRY.wpm} WPM • Optimal
            </span>
            <span className="text-on-surface-variant font-medium">78 words analyzed</span>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-slate-50 border border-border relative">
          <p className="text-xs sm:text-sm text-on-surface leading-relaxed font-sans font-medium">
            "{scenario.transcript}"
            {isRecording && <span className="inline-block w-1.5 h-4 bg-emerald-500 animate-pulse ml-1 align-middle" />}
          </p>
        </div>

        {/* Live Detected Architectural Concepts */}
        <div className="flex items-center gap-2 flex-wrap pt-1">
          <span className="text-[11px] font-mono text-on-surface-variant uppercase font-bold mr-1">
            Detected Concepts:
          </span>
          {scenario.detectedKeywords.map((kw, idx) => (
            <span 
              key={idx}
              className="px-2.5 py-1 rounded-md bg-emerald-50 text-emerald-800 text-xs font-mono font-bold border border-emerald-300 shadow-sm"
            >
              {kw}
            </span>
          ))}
        </div>
      </section>

      {/* Real-Time Telemetry Gauges */}
      <section className="p-6 rounded-2xl glass-panel border border-border flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-bold text-base text-on-surface">Real-Time Telemetry Gauges</h3>
            <span className="text-xs font-mono text-on-surface-variant font-medium">Continuous Acoustic &amp; Semantic Profiler</span>
          </div>
          <span className="text-xs font-mono text-emerald-700 font-bold">
            Sentiment: Composed &amp; Analytical
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          
          {/* Gauge 1: Confidence Score */}
          <div className="p-4 rounded-xl bg-slate-50 border border-border flex flex-col items-center text-center">
            <div className="relative w-14 h-14 flex items-center justify-center mb-2">
              <svg className="w-14 h-14 transform -rotate-90" viewBox="0 0 56 56">
                <circle cx="28" cy="28" r="22" stroke="currentColor" strokeWidth="4" className="text-slate-200 fill-none" />
                <circle cx="28" cy="28" r="22" stroke="#10b981" strokeWidth="4" strokeDasharray="138" strokeDashoffset="15" strokeLinecap="round" className="fill-none" />
              </svg>
              <span className="absolute text-sm font-bold font-mono text-on-surface">
                {INTERVIEW_TELEMETRY.confidenceScore}%
              </span>
            </div>
            <span className="text-xs font-bold text-on-surface">Confidence Score</span>
            <span className="text-[10px] font-mono text-emerald-700 font-bold mt-0.5">Steady Pitch &amp; Modulation</span>
          </div>

          {/* Gauge 2: Speech Clarity */}
          <div className="p-4 rounded-xl bg-slate-50 border border-border flex flex-col items-center text-center">
            <div className="relative w-14 h-14 flex items-center justify-center mb-2">
              <svg className="w-14 h-14 transform -rotate-90" viewBox="0 0 56 56">
                <circle cx="28" cy="28" r="22" stroke="currentColor" strokeWidth="4" className="text-slate-200 fill-none" />
                <circle cx="28" cy="28" r="22" stroke="#059669" strokeWidth="4" strokeDasharray="138" strokeDashoffset="8" strokeLinecap="round" className="fill-none" />
              </svg>
              <span className="absolute text-sm font-bold font-mono text-on-surface">
                {INTERVIEW_TELEMETRY.speechClarityScore}%
              </span>
            </div>
            <span className="text-xs font-bold text-on-surface">Speech Clarity</span>
            <span className="text-[10px] font-mono text-teal-700 font-bold mt-0.5">0 Filler Words Detected</span>
          </div>

          {/* Gauge 3: Technical Depth Validation */}
          <div className="p-4 rounded-xl bg-slate-50 border border-border flex flex-col items-center text-center">
            <div className="relative w-14 h-14 flex items-center justify-center mb-2">
              <svg className="w-14 h-14 transform -rotate-90" viewBox="0 0 56 56">
                <circle cx="28" cy="28" r="22" stroke="currentColor" strokeWidth="4" className="text-slate-200 fill-none" />
                <circle cx="28" cy="28" r="22" stroke="#047857" strokeWidth="4" strokeDasharray="138" strokeDashoffset="5" strokeLinecap="round" className="fill-none" />
              </svg>
              <span className="absolute text-sm font-bold font-mono text-on-surface">
                {INTERVIEW_TELEMETRY.technicalDepthScore}%
              </span>
            </div>
            <span className="text-xs font-bold text-on-surface">Technical Depth</span>
            <span className="text-[10px] font-mono text-emerald-700 font-bold mt-0.5">{INTERVIEW_TELEMETRY.technicalDepthLevel}</span>
          </div>

        </div>

        {/* Live In-Session AI Coach Overlay */}
        <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-300 flex items-start gap-3">
          <div className="w-9 h-9 rounded-xl bg-emerald-100 flex items-center justify-center text-emerald-700 shrink-0 mt-0.5 border border-emerald-300">
            <Bot className="w-5 h-5" />
          </div>
          <p className="text-xs sm:text-sm text-emerald-950 leading-relaxed font-medium">
            <strong className="text-emerald-800 font-mono">Live AI Coach: </strong>
            {scenario.coachTip}
          </p>
        </div>

        {/* Action Controls */}
        <div className="flex flex-col gap-3 pt-2">
          <button
            onClick={handleCompleteAnswer}
            className="w-full h-12 rounded-xl bg-gradient-to-r from-emerald-500 via-emerald-600 to-teal-700 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-[0_4px_14px_rgba(16,185,129,0.35)] hover:opacity-95 active:scale-[0.99] transition-all cursor-pointer"
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>Complete &amp; Evaluate Answer</span>
          </button>

          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={toggleRecording}
              className="h-11 rounded-xl bg-white hover:bg-slate-50 text-on-surface text-xs font-bold font-mono flex items-center justify-center gap-1.5 border border-border shadow-sm transition-all cursor-pointer"
            >
              {isRecording ? (
                <>
                  <Pause className="w-4 h-4 text-emerald-600" />
                  <span>Pause Recording</span>
                </>
              ) : (
                <>
                  <Play className="w-4 h-4 text-emerald-600" />
                  <span>Resume Recording</span>
                </>
              )}
            </button>

            <button
              onClick={handleSkipQuestion}
              className="h-11 rounded-xl bg-white hover:bg-slate-50 text-on-surface-variant hover:text-on-surface text-xs font-bold font-mono flex items-center justify-center gap-1.5 border border-border shadow-sm transition-all cursor-pointer"
            >
              <SkipForward className="w-4 h-4" />
              <span>Skip Question</span>
            </button>
          </div>
        </div>
      </section>

    </div>
  );
};
