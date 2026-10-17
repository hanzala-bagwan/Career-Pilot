import React, { useState, useEffect } from 'react';
import { CareerTrack } from '../types';
import { ALL_PROGRAMMING_LANGUAGES } from '../data/telemetryData';
import { RoadmapBrowser } from './RoadmapBrowser';
import { 
  CheckCircle, 
  Cpu, 
  Lock, 
  Play, 
  Terminal, 
  Lightbulb, 
  BookOpen, 
  Copy, 
  RotateCcw, 
  Check, 
  HelpCircle, 
  ChevronDown, 
  ChevronUp, 
  Sparkles, 
  Activity, 
  Layers, 
  Zap,
  Code2,
  Map
} from 'lucide-react';

interface MilestoneGraphSandboxProps {
  onToast: (msg: string) => void;
  activeTrack: CareerTrack;
  onSelectTrack?: (track: CareerTrack) => void;
  extraTracks?: CareerTrack[];
}

export const MilestoneGraphSandbox: React.FC<MilestoneGraphSandboxProps> = ({
  onToast,
  activeTrack,
  onSelectTrack,
  extraTracks = []
}) => {
  const [activeView, setActiveView] = useState<'milestones' | 'browser'>('milestones');
  // Milestone state
  const [expandedNode, setExpandedNode] = useState<string>('m-2');
  const [currentRoleInput, setCurrentRoleInput] = useState('Senior Software Engineer');
  const [targetRoleInput, setTargetRoleInput] = useState(activeTrack.title);
  const [isSynthesizing, setIsSynthesizing] = useState(false);

  // Synchronize when activeTrack changes
  useEffect(() => {
    setTargetRoleInput(activeTrack.title);
    setCode(activeTrack.codeSandbox.initialCode);
    setSelectedLanguage(activeTrack.codeSandbox.language);
    setLogs([
      { type: 'info', text: `Loaded ${activeTrack.codeSandbox.kernelInfo}...` },
      { type: 'success', text: `Initialized environment for ${activeTrack.title}.` }
    ]);
    setSelectedAnswers({});
    setRevealedExplanations({});
    setActiveQuizIndex(0);
  }, [activeTrack]);

  // Sandbox state
  const [code, setCode] = useState(activeTrack.codeSandbox.initialCode);
  const [selectedLanguage, setSelectedLanguage] = useState(activeTrack.codeSandbox.language);
  const [activeConsoleTab, setActiveConsoleTab] = useState<'console' | 'vram' | 'ast'>('console');
  const [isRunning, setIsRunning] = useState(false);
  const [copied, setCopied] = useState(false);
  const [isHintsOpen, setIsHintsOpen] = useState(false);
  const [drawerTab, setDrawerTab] = useState<'hints' | 'solution'>('hints');
  const [revealedHints, setRevealedHints] = useState<number>(1);
  const [logs, setLogs] = useState<{ type: 'info' | 'success' | 'highlight' | 'pass'; text: string }[]>([
    { type: 'info', text: `Loaded ${activeTrack.codeSandbox.kernelInfo}...` },
    { type: 'success', text: `Ready for interactive code execution.` }
  ]);

  // W3Schools MCQ Checkpoint state
  const [activeQuizIndex, setActiveQuizIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<{ [key: number]: number }>({});
  const [revealedExplanations, setRevealedExplanations] = useState<{ [key: number]: boolean }>({});
  const [quizScore, setQuizScore] = useState(0);

  const toggleNode = (id: string) => {
    setExpandedNode(expandedNode === id ? '' : id);
  };

  const handleSynthesizeRoadmap = () => {
    setIsSynthesizing(true);
    setTimeout(() => {
      setIsSynthesizing(false);
      onToast(`Synthesized 3D Flightpath: ${currentRoleInput} ➔ ${targetRoleInput}`);
    }, 1100);
  };

  const handleRunCode = () => {
    setIsRunning(true);
    setLogs([{ type: 'info', text: `Compiling and verifying ${selectedLanguage.toUpperCase()} runtime...` }]);
    setTimeout(() => {
      setIsRunning(false);
      setLogs([
        { type: 'info', text: `Executing script on sandbox environment...` },
        { type: 'success', text: `Zero memory leaks or runtime assertion failures detected.` },
        { type: 'highlight', text: activeTrack.codeSandbox.unitTestExpected },
        { type: 'pass', text: `[Test Passed] All unit tests completed in 12ms! 🎉` }
      ]);
      onToast('Unit Tests Passed! Execution Verified.');
    }, 850);
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    onToast('Code copied to clipboard');
  };

  const handleApplySolution = () => {
    setCode(activeTrack.codeSandbox.optimalSolution);
    onToast('Optimal Architecture Solution Applied to Editor!');
  };

  const handleRevealNextHint = () => {
    if (revealedHints < activeTrack.codeSandbox.hints.length) {
      setRevealedHints((prev) => prev + 1);
      onToast(`Hint ${revealedHints + 1} revealed!`);
    }
  };

  const currentQuestions = activeTrack.quizQuestions;
  const currentQ = currentQuestions[activeQuizIndex] || currentQuestions[0];

  const handleSelectQuizOption = (optionIndex: number) => {
    if (selectedAnswers[activeQuizIndex] !== undefined) return;
    setSelectedAnswers({ ...selectedAnswers, [activeQuizIndex]: optionIndex });
    setRevealedExplanations({ ...revealedExplanations, [activeQuizIndex]: true });
    
    if (optionIndex === currentQ.correctIndex) {
      setQuizScore((prev) => prev + 1);
      onToast('Correct Architecture Choice! +100 Telemetry Score');
    } else {
      onToast('Incorrect. Review the architectural explainer below.');
    }
  };

  return (
    <div className="flex flex-col gap-8 pb-12 animate-fadeIn">

      {/* Module Page Header with View Switcher */}
      <div className="flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-[11px] font-mono text-emerald-700 tracking-widest uppercase font-bold">
              AUTONOMOUS FLIGHTPATH ENGINE
            </span>
            <h1 className="text-2xl sm:text-3xl font-display font-extrabold text-on-surface mt-0.5">
              3D Career Roadmap &amp; Code Sandbox
            </h1>
          </div>
          <span className="hidden sm:flex px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-mono font-bold items-center gap-1.5 border border-emerald-300">
            <Sparkles className="w-3.5 h-3.5 text-emerald-600 animate-pulse" />
            {activeTrack.shortCode} ACTIVE
          </span>
        </div>

        {/* View Switcher Tabs */}
        <div className="flex gap-2 p-1 rounded-xl bg-surface-sub border border-border w-full sm:w-auto">
          <button
            onClick={() => setActiveView('milestones')}
            className={`flex-1 sm:flex-none px-4 py-2 rounded-lg text-xs font-mono font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
              activeView === 'milestones'
                ? 'bg-gradient-to-r from-emerald-500 to-teal-700 text-white shadow-sm'
                : 'text-on-surface-variant hover:text-on-surface'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            My Roadmap
          </button>
          <button
            onClick={() => setActiveView('browser')}
            className={`flex-1 sm:flex-none px-4 py-2 rounded-lg text-xs font-mono font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
              activeView === 'browser'
                ? 'bg-gradient-to-r from-emerald-500 to-teal-700 text-white shadow-sm'
                : 'text-on-surface-variant hover:text-on-surface'
            }`}
          >
            <Map className="w-3.5 h-3.5" />
            Browse All Roadmaps
          </button>
        </div>
      </div>

      {/* BROWSER VIEW */}
      {activeView === 'browser' && (
        <RoadmapBrowser
          activeTrack={activeTrack}
          onSelectTrack={(track) => {
            if (onSelectTrack) {
              onSelectTrack(track);
              setActiveView('milestones');
            }
          }}
          onToast={onToast}
          allTracks={extraTracks}
        />
      )}

      {/* MILESTONES VIEW */}
      {activeView === 'milestones' && <>

      {/* Trajectory Engine Header & Dynamic Role Synthesizer */}
      <section className="p-6 rounded-2xl glass-panel border border-border relative overflow-hidden">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 shadow-[0_0_8px_#10b981]" />
            <h2 className="text-xl font-bold font-display text-on-surface">Career Flightpath Trajectory Engine</h2>
          </div>
          <span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-mono font-bold flex items-center gap-1.5 border border-emerald-300">
            <Sparkles className="w-3.5 h-3.5 text-emerald-600 animate-pulse" />
            {activeTrack.shortCode} MILESTONES ACTIVE
          </span>
        </div>
        <p className="text-xs text-on-surface-variant mb-6 font-medium">
          Define origin coordinates and target vector to synthesize a multi-phase technical flightpath for <strong className="text-emerald-700">{activeTrack.title}</strong>.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
          <div className="flex flex-col gap-1.5">
            <label className="text-[11px] font-mono text-on-surface-variant uppercase tracking-wider font-bold">Origin Position:</label>
            <input 
              type="text"
              value={currentRoleInput}
              onChange={(e) => setCurrentRoleInput(e.target.value)}
              className="bg-surface-sub text-on-surface text-xs font-semibold px-4 py-3 rounded-xl border border-border focus:border-emerald-500 outline-none"
              placeholder="Current Role"
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-[11px] font-mono text-emerald-700 uppercase tracking-wider font-bold">Target Objective:</label>
            <input 
              type="text"
              value={targetRoleInput}
              onChange={(e) => setTargetRoleInput(e.target.value)}
              className="bg-surface-sub text-on-surface text-xs font-semibold px-4 py-3 rounded-xl border border-emerald-300 focus:border-emerald-600 outline-none"
              placeholder="Target Role"
            />
          </div>
        </div>

        <button 
          onClick={handleSynthesizeRoadmap}
          disabled={isSynthesizing}
          className="w-full h-12 rounded-xl bg-gradient-to-r from-emerald-500 via-emerald-600 to-teal-700 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-[0_4px_14px_rgba(16,185,129,0.35)] hover:shadow-[0_6px_20px_rgba(16,185,129,0.45)] hover:scale-[1.01] active:scale-[0.99] transition-all cursor-pointer"
        >
          {isSynthesizing ? (
            <span className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 animate-spin" />
              Synthesizing 3D Neural Flightpath...
            </span>
          ) : (
            <span className="flex items-center gap-2">
              <Zap className="w-4 h-4" />
              Generate 3D Interactive Roadmap
            </span>
          )}
        </button>
      </section>

      {/* 3D Interactive Milestone Node Tree */}
      <section className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Layers className="w-5 h-5 text-emerald-600" />
            <h3 className="font-bold text-base text-on-surface">{activeTrack.title} — Milestone Graph</h3>
          </div>
          <span className="text-xs font-mono text-emerald-700 font-bold flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
            Graph Consensus Stable
          </span>
        </div>

        {/* Milestone Nodes with Connecting Line */}
        <div className="relative flex flex-col gap-4 pl-4 sm:pl-6 border-l-2 border-emerald-400 my-2">
          {activeTrack.milestones.map((node) => {
            const isExpanded = expandedNode === node.id;
            const isCompleted = node.status === 'completed';
            const isInProgress = node.status === 'in_progress';
            const isLocked = node.status === 'locked';

            return (
              <div key={node.id} className="relative flex flex-col gap-2">
                {/* Node Pill Card */}
                <div 
                  onClick={() => toggleNode(node.id)}
                  className={`p-4 rounded-2xl glass-panel-interactive cursor-pointer flex items-start gap-4 border ${
                    isInProgress 
                      ? 'border-emerald-400 shadow-[0_4px_14px_rgba(16,185,129,0.2)] bg-emerald-50/50' 
                      : isCompleted
                      ? 'border-emerald-300'
                      : 'border-border opacity-70'
                  }`}
                >
                  {/* Status Icon */}
                  <div className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 border ${
                    isCompleted 
                      ? 'bg-emerald-100 text-emerald-700 border-emerald-300' 
                      : isInProgress 
                      ? 'bg-emerald-500 text-white border-emerald-600 shadow-[0_0_12px_#10b981] animate-pulse' 
                      : 'bg-surface-highest text-on-surface-variant border-border'
                  }`}>
                    {isCompleted && <CheckCircle className="w-6 h-6" />}
                    {isInProgress && <Cpu className="w-6 h-6" />}
                    {isLocked && <Lock className="w-6 h-6" />}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <span className={`text-[11px] font-mono font-bold uppercase ${
                        isCompleted ? 'text-emerald-700' : isInProgress ? 'text-emerald-600' : 'text-on-surface-variant'
                      }`}>
                        {node.phase}
                      </span>
                      <span className="text-xs font-mono text-on-surface-variant font-medium">{node.duration}</span>
                    </div>
                    <h4 className="font-bold text-sm text-on-surface">{node.title}</h4>
                    <p className="text-xs text-on-surface-variant line-clamp-1 mt-0.5 font-medium">{node.description}</p>
                  </div>

                  <button className="text-on-surface-variant hover:text-on-surface p-1">
                    {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                  </button>
                </div>

                {/* Expanded Details Panel */}
                {isExpanded && (
                  <div className="p-4 rounded-xl bg-white border border-border flex flex-col gap-3 text-xs animate-fadeIn ml-2 sm:ml-4 shadow-sm">
                    <div className="flex items-center justify-between">
                      <span className="text-on-surface-variant font-mono font-medium">Salary Increment Impact:</span>
                      <span className="font-mono font-bold text-emerald-600 text-sm">{node.salaryBump}</span>
                    </div>

                    {node.recommendedAction && (
                      <div className="p-2.5 rounded-lg bg-emerald-50 border-l-4 border-emerald-500 text-emerald-900 leading-relaxed font-medium">
                        <strong className="text-emerald-800 font-mono">Action Item: </strong>
                        {node.recommendedAction}
                      </div>
                    )}

                    {node.prerequisite && (
                      <div className="p-2.5 rounded-lg bg-red-50 border border-red-200 text-red-700">
                        <strong>Prerequisite: </strong> {node.prerequisite}
                      </div>
                    )}

                    <div>
                      <span className="text-on-surface-variant block mb-1.5 font-mono font-bold">Competencies Mastered:</span>
                      <div className="flex flex-wrap gap-1.5">
                        {node.skills.map((skill) => (
                          <span 
                            key={skill}
                            className="px-2.5 py-1 rounded-md bg-emerald-50 text-emerald-800 text-[11px] font-mono font-semibold border border-emerald-200"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* "Try It Yourself" IDE Code Sandbox Component (All Programming Languages Supported) */}
      <section className="rounded-2xl glass-panel border border-emerald-200 shadow-[0_4px_20px_rgba(16,185,129,0.08)] p-5 sm:p-6 flex flex-col gap-4 relative overflow-hidden">
        {/* Glow backdrop */}
        <div className="absolute -top-16 -right-16 w-48 h-48 bg-emerald-400/10 rounded-full blur-3xl pointer-events-none" />

        {/* Sandbox Header */}
        <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-border">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 flex items-center justify-center text-emerald-700 border border-emerald-300 shadow-sm">
              <Terminal className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-base text-on-surface">"Try It Yourself" Multi-Language IDE Sandbox</h3>
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-mono font-bold border border-emerald-300 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  Live Kernel
                </span>
              </div>
              <p className="text-xs font-mono text-on-surface-variant flex items-center gap-1 mt-0.5 font-medium">
                <Cpu className="w-3.5 h-3.5 text-emerald-600" />
                {activeTrack.codeSandbox.kernelInfo}
              </p>
            </div>
          </div>

          {/* Action buttons: Reset & Copy */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                setCode(activeTrack.codeSandbox.initialCode);
                onToast('Sandbox code reset to initial baseline.');
              }}
              className="px-2.5 py-1.5 rounded-lg bg-surface-sub hover:bg-surface-high text-on-surface-variant hover:text-on-surface text-xs font-mono flex items-center gap-1 border border-border transition-all cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset</span>
            </button>
            <button
              onClick={handleCopyCode}
              className="px-2.5 py-1.5 rounded-lg bg-surface-sub hover:bg-surface-high text-on-surface-variant hover:text-on-surface text-xs font-mono flex items-center gap-1 border border-border transition-all cursor-pointer"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied!' : 'Copy'}</span>
            </button>
          </div>
        </div>

        {/* Programming Languages Switcher Bar */}
        <div className="flex flex-col gap-1.5">
          <div className="flex items-center justify-between text-xs font-mono">
            <span className="text-on-surface-variant font-bold flex items-center gap-1.5">
              <Code2 className="w-3.5 h-3.5 text-emerald-600" />
              Available Coding Languages:
            </span>
            <span className="text-[11px] text-emerald-700 font-semibold">9 Runtimes Ready</span>
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
            {ALL_PROGRAMMING_LANGUAGES.map((lang) => {
              const isCurrent = selectedLanguage.toLowerCase() === lang.id.toLowerCase();
              return (
                <button
                  key={lang.id}
                  onClick={() => {
                    setSelectedLanguage(lang.id);
                    onToast(`Switched Sandbox Runtime to ${lang.name}`);
                  }}
                  className={`px-3 py-1 rounded-lg text-xs font-mono font-bold transition-all shrink-0 cursor-pointer ${
                    isCurrent
                      ? 'bg-emerald-600 text-white shadow-sm'
                      : 'bg-slate-100 text-slate-700 hover:bg-emerald-50 hover:text-emerald-800'
                  }`}
                >
                  {lang.name}
                </button>
              );
            })}
          </div>
        </div>

        {/* Code Editor Window */}
        <div className="rounded-xl bg-[#0b0f17] border border-border overflow-hidden shadow-inner">
          {/* Window Title Bar */}
          <div className="bg-[#141c2b] px-4 py-2 border-b border-border/40 flex items-center justify-between text-xs font-mono">
            <div className="flex items-center gap-2">
              <div className="flex gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-rose-500 inline-block opacity-80" />
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500 inline-block opacity-80" />
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block opacity-80" />
              </div>
              <span className="ml-2 text-emerald-400 font-bold">{activeTrack.codeSandbox.filename}</span>
            </div>
            <span className="text-[11px] text-slate-400">Language: {selectedLanguage.toUpperCase()}</span>
          </div>

          {/* Textarea code editor */}
          <div className="p-3 bg-[#0b0f17]">
            <textarea
              value={code}
              onChange={(e) => setCode(e.target.value)}
              rows={12}
              spellCheck={false}
              className="w-full bg-transparent font-mono text-xs sm:text-sm text-emerald-300 outline-none resize-none leading-relaxed selection:bg-emerald-700/50"
            />
          </div>
        </div>

        {/* Progressive Hint Drawer & Architectural Solution Toggle */}
        <div className="rounded-xl border border-border bg-white overflow-hidden shadow-sm">
          <div 
            onClick={() => setIsHintsOpen(!isHintsOpen)}
            className="px-4 py-2.5 bg-slate-50 flex items-center justify-between cursor-pointer hover:bg-slate-100 transition-colors"
          >
            <div className="flex items-center gap-2">
              <Lightbulb className="w-4 h-4 text-emerald-600" />
              <span className="text-xs font-bold font-mono text-on-surface">Progressive Hints &amp; Architectural Solution</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-300 font-bold">
                {revealedHints}/{activeTrack.codeSandbox.hints.length} Hints Unlocked
              </span>
              {isHintsOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </div>
          </div>

          {isHintsOpen && (
            <div className="p-4 flex flex-col gap-3 border-t border-border animate-fadeIn">
              {/* Drawer Tabs */}
              <div className="flex items-center gap-2 border-b border-border pb-2">
                <button
                  onClick={() => setDrawerTab('hints')}
                  className={`px-3 py-1 rounded-lg text-xs font-mono font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                    drawerTab === 'hints' 
                      ? 'bg-emerald-100 text-emerald-800 border border-emerald-300' 
                      : 'text-on-surface-variant hover:text-on-surface'
                  }`}
                >
                  <Lightbulb className="w-3.5 h-3.5" />
                  <span>Hints ({revealedHints}/{activeTrack.codeSandbox.hints.length})</span>
                </button>
                <button
                  onClick={() => setDrawerTab('solution')}
                  className={`px-3 py-1 rounded-lg text-xs font-mono font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                    drawerTab === 'solution' 
                      ? 'bg-emerald-100 text-emerald-800 border border-emerald-300' 
                      : 'text-on-surface-variant hover:text-on-surface'
                  }`}
                >
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>Architectural Solution</span>
                </button>
              </div>

              {/* Hints Tab Panel */}
              {drawerTab === 'hints' ? (
                <div className="flex flex-col gap-2.5">
                  {activeTrack.codeSandbox.hints.slice(0, revealedHints).map((hint, idx) => (
                    <div key={hint.id} className="p-3 rounded-lg bg-slate-50 border border-border text-xs flex flex-col gap-1">
                      <span className="text-emerald-700 font-mono font-bold flex items-center gap-1">
                        Hint {idx + 1}: {hint.title}
                      </span>
                      <p className="text-on-surface-variant leading-relaxed font-medium">{hint.description}</p>
                    </div>
                  ))}

                  {revealedHints < activeTrack.codeSandbox.hints.length && (
                    <button
                      onClick={handleRevealNextHint}
                      className="py-1.5 px-3 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-800 text-xs font-mono font-bold border border-emerald-300 transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Reveal Next Graduated Hint ({revealedHints + 1}/{activeTrack.codeSandbox.hints.length})</span>
                    </button>
                  )}
                </div>
              ) : (
                /* Architectural Solution Walkthrough Panel */
                <div className="p-3 rounded-lg bg-slate-50 border border-border text-xs flex flex-col gap-2.5">
                  <div className="flex items-center justify-between">
                    <span className="text-emerald-800 font-mono font-bold flex items-center gap-1.5">
                      <Sparkles className="w-4 h-4 text-emerald-600" />
                      Production Optimal Pattern for {activeTrack.title}
                    </span>
                    <button
                      onClick={handleApplySolution}
                      className="px-3 py-1 rounded-md bg-emerald-600 text-white font-bold font-mono text-[11px] hover:bg-emerald-700 transition-all cursor-pointer shadow-sm"
                    >
                      Apply Solution to Editor
                    </button>
                  </div>
                  <pre className="text-[11px] font-mono text-slate-800 bg-white p-3 rounded-lg border border-border overflow-x-auto">
                    {activeTrack.codeSandbox.optimalSolution}
                  </pre>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Execution Control Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3">
          <button
            onClick={handleRunCode}
            disabled={isRunning}
            className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 via-emerald-600 to-teal-700 text-white font-bold text-xs uppercase tracking-wider flex items-center gap-2 shadow-[0_4px_14px_rgba(16,185,129,0.35)] hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
          >
            {isRunning ? (
              <>
                <Activity className="w-4 h-4 animate-spin" />
                <span>Running Kernel...</span>
              </>
            ) : (
              <>
                <Play className="w-4 h-4 fill-white" />
                <span>Run Code &amp; Verify Tests</span>
              </>
            )}
          </button>

          <div className="flex items-center gap-2 text-xs font-mono text-on-surface-variant bg-slate-50 px-3 py-1.5 rounded-lg border border-border font-medium">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>Kernel Ready</span>
            <span className="text-border">•</span>
            <span className="text-emerald-700 font-bold">12ms latency</span>
          </div>
        </div>

        {/* Terminal Output Panel with 3 Tabs */}
        <div className="rounded-xl bg-[#0b0f17] border border-border overflow-hidden text-xs font-mono">
          {/* Output Tab Switcher */}
          <div className="flex items-center justify-between px-3 py-2 bg-[#141c2b] border-b border-border/40">
            <div className="flex items-center gap-2">
              <button
                onClick={() => setActiveConsoleTab('console')}
                className={`px-2.5 py-1 rounded text-xs transition-all flex items-center gap-1.5 cursor-pointer ${
                  activeConsoleTab === 'console'
                    ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 font-bold'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <Terminal className="w-3.5 h-3.5" />
                <span>Console Logs</span>
              </button>
              <button
                onClick={() => setActiveConsoleTab('vram')}
                className={`px-2.5 py-1 rounded text-xs transition-all flex items-center gap-1.5 cursor-pointer ${
                  activeConsoleTab === 'vram'
                    ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 font-bold'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <Activity className="w-3.5 h-3.5" />
                <span>Memory &amp; VRAM Profiler</span>
              </button>
              <button
                onClick={() => setActiveConsoleTab('ast')}
                className={`px-2.5 py-1 rounded text-xs transition-all flex items-center gap-1.5 cursor-pointer ${
                  activeConsoleTab === 'ast'
                    ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 font-bold'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <Layers className="w-3.5 h-3.5" />
                <span>AST Visualizer</span>
              </button>
            </div>
            <button
              onClick={() => {
                setLogs([{ type: 'info', text: 'Console cleared. Ready for next execution run.' }]);
                onToast('Console logs cleared.');
              }}
              className="text-[11px] text-slate-400 hover:text-emerald-400 transition-colors cursor-pointer"
            >
              Clear Logs
            </button>
          </div>

          {/* 1. Console Logs Tab */}
          {activeConsoleTab === 'console' && (
            <div className="p-4 space-y-1.5 bg-[#0b0f17] min-h-[110px]">
              {logs.map((log, idx) => (
                <div key={idx} className="flex items-center gap-2 leading-relaxed">
                  <span className="text-emerald-400">&gt;</span>
                  <span className={
                    log.type === 'pass' 
                      ? 'text-emerald-400 font-bold bg-emerald-950/40 px-2 py-0.5 rounded border border-emerald-500/40' 
                      : log.type === 'highlight'
                      ? 'text-emerald-300 font-semibold'
                      : log.type === 'success'
                      ? 'text-emerald-400'
                      : 'text-slate-400'
                  }>
                    {log.text}
                  </span>
                </div>
              ))}
            </div>
          )}

          {/* 2. Memory & VRAM Allocation Profiler Tab */}
          {activeConsoleTab === 'vram' && (
            <div className="p-4 space-y-3 bg-[#0b0f17] min-h-[110px]">
              <div className="flex justify-between items-center text-slate-400 pb-1 border-b border-slate-800">
                <span>Execution Device: Host CPU / GPU Accelerator</span>
                <span className="text-emerald-400 font-bold">Driver Ready • 0 Leaks</span>
              </div>
              <div className="space-y-1">
                <div className="flex justify-between text-[11px]">
                  <span className="text-slate-400">Resident Memory Allocation:</span>
                  <span className="text-emerald-400 font-bold">14.8 MB / 16,384 MB (0.09%)</span>
                </div>
                <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                  <div className="w-[1%] h-full bg-emerald-500 rounded-full shadow-[0_0_8px_#10b981]" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3 pt-1 text-[11px]">
                <div className="bg-slate-900 p-2 rounded-lg border border-slate-800">
                  <span className="text-slate-400 block">Instruction Cache Hit Rate</span>
                  <span className="text-emerald-400 font-bold">99.4%</span>
                </div>
                <div className="bg-slate-900 p-2 rounded-lg border border-slate-800">
                  <span className="text-slate-400 block">JIT Compilation Latency</span>
                  <span className="text-emerald-400 font-bold">12ms</span>
                </div>
              </div>
            </div>
          )}

          {/* 3. AST Visualizer Tab */}
          {activeConsoleTab === 'ast' && (
            <div className="p-4 space-y-2 bg-[#0b0f17] min-h-[110px]">
              {activeTrack.codeSandbox.ast.map((node, idx) => (
                <div key={idx} className="space-y-1">
                  <div className="text-emerald-400 font-bold flex items-center gap-1.5">
                    <Layers className="w-4 h-4" />
                    <span>{node.name} ({node.type})</span>
                  </div>
                  {node.children && (
                    <div className="pl-3 border-l-2 border-slate-800 space-y-1 text-slate-300 text-[11px]">
                      {node.children.map((child, cIdx) => (
                        <div key={cIdx}>
                          ├── <span className="text-teal-400 font-semibold">{child.name}</span>: {child.type}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* W3Schools-Style MCQ Checkpoint Module (Dynamic per Track) */}
      <section className="p-6 rounded-2xl glass-panel border border-border flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <HelpCircle className="w-5 h-5 text-emerald-600" />
            <h3 className="font-bold text-base text-on-surface">{activeTrack.title} — Architectural Quiz</h3>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono text-on-surface-variant font-medium">Score:</span>
            <span className="px-3 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-mono font-bold text-xs border border-emerald-300">
              {quizScore} / {currentQuestions.length} Passed
            </span>
          </div>
        </div>

        {/* Question Selector Tabs */}
        <div className="flex gap-2 border-b border-border pb-3">
          {currentQuestions.map((q, idx) => (
            <button
              key={q.id}
              onClick={() => setActiveQuizIndex(idx)}
              className={`px-3 py-1 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer ${
                activeQuizIndex === idx
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'bg-surface-sub text-on-surface-variant hover:text-on-surface'
              }`}
            >
              Question 0{idx + 1}
            </button>
          ))}
        </div>

        {/* Current Question Body */}
        <div className="flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-mono text-emerald-700 uppercase font-bold tracking-wider">
              {currentQ.domain}
            </span>
            <span className="text-xs font-mono text-on-surface-variant font-medium">Scenario Verification</span>
          </div>

          <div className="p-3 rounded-xl bg-slate-50 border border-border text-xs text-on-surface-variant italic font-medium">
            "{currentQ.scenario}"
          </div>

          <p className="font-bold text-sm text-on-surface">
            {currentQ.question}
          </p>

          {/* Options List */}
          <div className="flex flex-col gap-2 mt-1">
            {currentQ.options.map((option, optIdx) => {
              const isSelected = selectedAnswers[activeQuizIndex] === optIdx;
              const isCorrect = optIdx === currentQ.correctIndex;
              const hasAnswered = selectedAnswers[activeQuizIndex] !== undefined;

              let btnStyle = "bg-white border-border text-on-surface hover:bg-slate-50";
              if (hasAnswered) {
                if (isCorrect) {
                  btnStyle = "bg-emerald-50 border-emerald-500 text-emerald-900 font-bold";
                } else if (isSelected && !isCorrect) {
                  btnStyle = "bg-red-50 border-red-500 text-red-900 font-bold";
                }
              }

              return (
                <button
                  key={optIdx}
                  onClick={() => handleSelectQuizOption(optIdx)}
                  className={`p-3.5 rounded-xl border text-left text-xs transition-all flex items-center justify-between cursor-pointer ${btnStyle}`}
                >
                  <span className="font-medium">{option}</span>
                  {hasAnswered && isCorrect && <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />}
                </button>
              );
            })}
          </div>

          {/* AI Architectural Explainer Box */}
          {revealedExplanations[activeQuizIndex] && (
            <div className="p-3.5 rounded-xl bg-emerald-50/80 border-l-4 border-emerald-500 text-xs flex flex-col gap-1 mt-2 animate-fadeIn">
              <span className="font-mono font-bold text-emerald-800 flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                AI Architectural Explainer:
              </span>
              <p className="text-emerald-950 leading-relaxed font-medium">
                {currentQ.explanation}
              </p>
            </div>
          )}
        </div>
      </section>

      </> /* end milestones view */}

    </div>
  );
};
