import React, { useState } from 'react';
import { 
  RESUME_METRICS, 
  BULLET_REFINEMENTS 
} from '../data/telemetryData';
import { 
  UploadCloud, 
  FileText, 
  CheckCircle2, 
  Copy, 
  Check, 
  Target, 
  Sparkles, 
  AlertTriangle, 
  Trash2, 
  ArrowRight,
  TrendingUp,
  BarChart3
} from 'lucide-react';

interface ResumeDiagnosticProps {
  onToast: (msg: string) => void;
}

export const ResumeDiagnostic: React.FC<ResumeDiagnosticProps> = ({ onToast }) => {
  const [uploadedFile, setUploadedFile] = useState<{ name: string; size: string } | null>({
    name: "Principal_Systems_Architect_Resume_2026.pdf",
    size: "2.8 MB"
  });
  const [activeTab, setActiveTab] = useState<'all' | 'critical'>('all');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [jdText, setJdText] = useState('');
  const [isMatching, setIsMatching] = useState(false);
  const [matchResult, setMatchResult] = useState<{
    score: number;
    matched: string[];
    missing: string[];
  } | null>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files[0]) {
      const file = files[0];
      setUploadedFile({
        name: file.name,
        size: `${(file.size / (1024 * 1024)).toFixed(1)} MB`
      });
      onToast(`Uploaded and parsed: ${file.name}`);
    }
  };

  const handleCopyBullet = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
    onToast('High-impact bullet point copied to clipboard!');
  };

  const handleRunMatch = () => {
    setIsMatching(true);
    setTimeout(() => {
      setIsMatching(false);
      setMatchResult({
        score: 94,
        matched: [
          "PyTorch FSDP (Tier-1 Match)",
          "CUDA Kernel Tuning (Match)",
          "vLLM PagedAttention (Match)",
          "Raft Consensus (Match)",
          "Low-Latency IPC (Match)"
        ],
        missing: [
          "Triton Compiler Intermediate Language",
          "Kubernetes Multi-Cluster Operator"
        ]
      });
      onToast('Semantic JD Cross-Check Complete: 94% Vector Alignment');
    }, 1100);
  };

  const filteredBullets = activeTab === 'all' 
    ? BULLET_REFINEMENTS 
    : BULLET_REFINEMENTS.filter(b => b.severity === 'critical');

  return (
    <div className="flex flex-col gap-8 pb-12 animate-fadeIn">
      
      {/* Module Title Banner */}
      <div className="flex flex-col gap-1">
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-mono text-emerald-700 tracking-widest uppercase font-bold">
            AI TELEMETRY // ATS OPTIMIZER
          </span>
          <span className="text-[11px] font-mono px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-300 font-bold">
            HEURISTIC V3.4 PRO
          </span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-display font-extrabold text-on-surface">
          Resume Diagnostic &amp; ATS Heuristic Optimizer
        </h1>
        <p className="text-xs sm:text-sm text-on-surface-variant font-medium">
          Upload technical CV to execute deep ATS token calibration, quantify passive bullet points, and cross-reference targeted JD specifications.
        </p>
      </div>

      {/* 1. Drag-and-Drop File Upload Dropzone (PDF, DOCX, TXT up to 25MB) */}
      <section className="relative rounded-2xl glass-panel border border-border p-6 sm:p-8 text-center overflow-hidden group hover:border-emerald-400 transition-all">
        <div className="absolute -inset-1 bg-gradient-to-r from-emerald-400/10 via-teal-400/10 to-transparent rounded-2xl blur-xl opacity-60 pointer-events-none" />

        {uploadedFile ? (
          <div className="relative z-10 flex items-center justify-between bg-white p-4 rounded-xl border border-emerald-300 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-emerald-100 border border-emerald-300 flex items-center justify-center text-emerald-700">
                <FileText className="w-6 h-6" />
              </div>
              <div className="text-left">
                <h4 className="font-bold text-sm text-on-surface truncate max-w-xs">{uploadedFile.name}</h4>
                <span className="text-xs font-mono text-emerald-700 flex items-center gap-1 font-semibold">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  {uploadedFile.size} • Heuristic Analysis Passed (Optimal Match)
                </span>
              </div>
            </div>
            <button
              onClick={() => {
                setUploadedFile(null);
                onToast('Resume cleared. Please select another file.');
              }}
              className="p-2 rounded-lg text-on-surface-variant hover:text-red-600 hover:bg-red-50 transition-colors cursor-pointer"
              title="Remove File"
            >
              <Trash2 className="w-5 h-5" />
            </button>
          </div>
        ) : (
          <label className="relative z-10 flex flex-col items-center justify-center gap-3 cursor-pointer py-4">
            <div className="w-16 h-16 rounded-2xl bg-emerald-50 border border-emerald-300 flex items-center justify-center text-emerald-600 shadow-sm group-hover:scale-105 transition-transform">
              <UploadCloud className="w-8 h-8" />
            </div>
            <div className="flex flex-col gap-1">
              <span className="font-bold text-sm text-on-surface">
                Drop your CV here, or <span className="text-emerald-700 underline underline-offset-4">browse files</span>
              </span>
              <span className="text-[11px] font-mono text-on-surface-variant font-medium">
                Supports PDF, DOCX, TXT up to 25MB
              </span>
            </div>
            <input 
              type="file" 
              accept=".pdf,.docx,.txt"
              onChange={handleFileUpload}
              className="hidden" 
            />
          </label>
        )}
      </section>

      {/* 2. Instant ATS Optimization Score Breakdown with Radial SVG Gauge */}
      <section className="p-6 rounded-2xl glass-panel border border-border flex flex-col gap-6 relative overflow-hidden">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-emerald-600" />
            <h2 className="text-lg font-bold text-on-surface">ATS Optimization Score</h2>
          </div>
          <span className="text-xs font-mono text-emerald-800 bg-emerald-50 border border-emerald-300 px-3 py-1 rounded-full flex items-center gap-1.5 font-bold">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            Optimal ATS Compatibility
          </span>
        </div>

        <div className="flex flex-col md:flex-row items-center gap-8 py-2">
          {/* Radial SVG Gauge (0-100) */}
          <div className="relative w-36 h-36 flex items-center justify-center shrink-0">
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
              <circle
                className="text-slate-100 fill-none"
                cx="50"
                cy="50"
                r="40"
                stroke="currentColor"
                strokeWidth="8"
              />
              <circle
                className="fill-none transition-all duration-1000"
                cx="50"
                cy="50"
                r="40"
                stroke="url(#atsEmeraldGradient)"
                strokeWidth="8"
                strokeDasharray="251.2"
                strokeDashoffset="20.1"
                strokeLinecap="round"
              />
              <defs>
                <linearGradient id="atsEmeraldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#10b981" />
                  <stop offset="50%" stopColor="#059669" />
                  <stop offset="100%" stopColor="#047857" />
                </linearGradient>
              </defs>
            </svg>
            <div className="absolute flex flex-col items-center justify-center">
              <span className="text-3xl font-display font-extrabold text-emerald-700">
                {RESUME_METRICS.overallScore}
              </span>
              <span className="text-[10px] font-mono text-on-surface-variant uppercase tracking-wider font-bold">
                / 100 ATS
              </span>
            </div>
          </div>

          {/* Quantitative Breakdown Bars */}
          <div className="grid grid-cols-1 gap-4 w-full flex-grow">
            {/* Metric 1 */}
            <div className="flex flex-col gap-1.5">
              <div className="flex justify-between text-xs font-bold">
                <span className="text-on-surface flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-500" />
                  Document Structure &amp; Format
                </span>
                <span className="text-emerald-700 font-mono font-bold">{RESUME_METRICS.documentStructure}%</span>
              </div>
              <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-emerald-500 to-teal-600 rounded-full" 
                  style={{ width: `${RESUME_METRICS.documentStructure}%` }}
                />
              </div>
            </div>

            {/* Metric 2 */}
            <div className="flex flex-col gap-1.5">
              <div className="flex justify-between text-xs font-bold">
                <span className="text-on-surface flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-teal-600" />
                  Keyword Density &amp; Tier-1 Terminology
                </span>
                <span className="text-teal-700 font-mono font-bold">{RESUME_METRICS.keywordDensity}%</span>
              </div>
              <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-teal-500 to-emerald-600 rounded-full" 
                  style={{ width: `${RESUME_METRICS.keywordDensity}%` }}
                />
              </div>
            </div>

            {/* Metric 3 */}
            <div className="flex flex-col gap-1.5">
              <div className="flex justify-between text-xs font-bold">
                <span className="text-on-surface flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-700" />
                  Action Verbs &amp; Metric Density
                </span>
                <span className="text-emerald-800 font-mono font-bold">{RESUME_METRICS.actionVerbs}%</span>
              </div>
              <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-emerald-600 to-teal-800 rounded-full" 
                  style={{ width: `${RESUME_METRICS.actionVerbs}%` }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. 1-Click AI Bullet Point Refiner */}
      <section className="p-6 rounded-2xl glass-panel border border-border flex flex-col gap-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-emerald-600" />
            <h2 className="text-lg font-bold text-on-surface">1-Click AI Bullet Point Refiner</h2>
          </div>

          {/* Filter Pills */}
          <div className="flex gap-1.5 p-1 rounded-xl bg-surface-sub border border-border">
            <button
              onClick={() => setActiveTab('all')}
              className={`px-3 py-1 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer ${
                activeTab === 'all'
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'text-on-surface-variant hover:text-on-surface'
              }`}
            >
              All ({BULLET_REFINEMENTS.length})
            </button>
            <button
              onClick={() => setActiveTab('critical')}
              className={`px-3 py-1 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer ${
                activeTab === 'critical'
                  ? 'bg-rose-600 text-white'
                  : 'text-on-surface-variant hover:text-on-surface'
              }`}
            >
              Critical ({BULLET_REFINEMENTS.filter(b => b.severity === 'critical').length})
            </button>
          </div>
        </div>

        {/* Bullet Cards */}
        <div className="flex flex-col gap-4">
          {filteredBullets.map((bullet) => (
            <div 
              key={bullet.id}
              className={`p-4 rounded-xl border flex flex-col gap-3 transition-all ${
                bullet.severity === 'critical'
                  ? 'bg-rose-50/50 border-rose-200'
                  : 'bg-white border-border shadow-sm'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="font-bold text-xs text-on-surface flex items-center gap-2">
                  <span className={`w-2 h-2 rounded-full ${bullet.severity === 'critical' ? 'bg-rose-500' : 'bg-amber-500'}`} />
                  {bullet.title}
                </span>
                <span className={`text-[10px] font-mono px-2.5 py-0.5 rounded-full uppercase font-bold ${
                  bullet.severity === 'critical' ? 'bg-rose-100 text-rose-800' : 'bg-amber-100 text-amber-800'
                }`}>
                  {bullet.severity === 'critical' ? 'High Impact Fix' : 'Optimization'}
                </span>
              </div>

              {/* Original Weak Text */}
              <div className="p-2.5 rounded-lg bg-slate-50 text-xs text-on-surface-variant line-through opacity-70">
                "{bullet.originalText}"
              </div>

              {/* Refined Quantified Text */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 p-3 rounded-lg bg-emerald-50/80 border border-emerald-300">
                <p className="text-xs font-mono text-emerald-950 font-semibold leading-relaxed flex-1">
                  {bullet.refinedText}
                </p>
                <button
                  onClick={() => handleCopyBullet(bullet.id, bullet.refinedText)}
                  className="px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-700 text-white text-xs font-bold font-mono flex items-center gap-1.5 shrink-0 shadow-[0_2px_8px_rgba(16,185,129,0.3)] hover:opacity-95 active:scale-95 transition-all cursor-pointer"
                >
                  {copiedId === bullet.id ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-white" />
                      <span>Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy 1-Click</span>
                    </>
                  )}
                </button>
              </div>

              <div className="text-[11px] font-mono text-emerald-700 flex items-center gap-1 font-semibold">
                <TrendingUp className="w-3.5 h-3.5" />
                <span>{bullet.impactMetrics}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. Target Job Description (JD) Semantic Cross-Check */}
      <section className="p-6 rounded-2xl glass-panel border border-border flex flex-col gap-4">
        <div className="flex items-center gap-2">
          <Target className="w-5 h-5 text-emerald-600" />
          <h2 className="text-lg font-bold text-on-surface">Target Job Description Semantic Cross-Check</h2>
        </div>
        <p className="text-xs text-on-surface-variant font-medium">
          Paste the target job requirements below to evaluate semantic vector alignment, discover missing keywords, and forecast ATS match probability.
        </p>

        <textarea
          value={jdText}
          onChange={(e) => setJdText(e.target.value)}
          rows={4}
          placeholder="Paste Job Description here (e.g., Principal AI Systems Architect: Looking for PyTorch FSDP multi-node experience, CUDA kernel acceleration, vLLM continuous batching, Triton optimization...)"
          className="w-full bg-white text-on-surface text-xs p-3.5 rounded-xl border border-border focus:border-emerald-500 outline-none resize-none leading-relaxed shadow-sm font-medium"
        />

        <div className="flex items-center justify-between gap-3">
          <span className="text-[11px] font-mono text-on-surface-variant flex items-center gap-1 font-medium">
            <Sparkles className="w-3.5 h-3.5 text-emerald-600 animate-pulse" />
            AI Semantic Cross-Reference Engine Active
          </span>
          <button
            onClick={handleRunMatch}
            disabled={isMatching}
            className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 via-emerald-600 to-teal-700 text-white font-bold text-xs uppercase tracking-wider flex items-center gap-2 shadow-[0_4px_14px_rgba(16,185,129,0.35)] hover:opacity-95 active:scale-95 transition-all cursor-pointer"
          >
            {isMatching ? (
              <>
                <Sparkles className="w-4 h-4 animate-spin" />
                <span>Calibrating...</span>
              </>
            ) : (
              <>
                <span>Run Deep Match</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </div>

        {/* Semantic Match Result Box */}
        {matchResult && (
          <div className="p-4 rounded-xl bg-white border border-emerald-300 shadow-sm flex flex-col gap-3 animate-fadeIn mt-2">
            <div className="flex items-center justify-between">
              <span className="font-bold text-sm text-on-surface">Semantic Compatibility Score</span>
              <span className="text-2xl font-display font-extrabold text-emerald-600 font-mono">
                {matchResult.score}%
              </span>
            </div>

            <div className="flex flex-wrap gap-2">
              {matchResult.matched.map((item, idx) => (
                <span 
                  key={idx}
                  className="px-3 py-1 rounded-full bg-emerald-50 border border-emerald-300 text-emerald-800 text-[11px] font-mono font-semibold flex items-center gap-1"
                >
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  {item}
                </span>
              ))}

              {matchResult.missing.map((item, idx) => (
                <span 
                  key={idx}
                  className="px-3 py-1 rounded-full bg-red-50 border border-red-300 text-red-700 text-[11px] font-mono font-semibold flex items-center gap-1"
                >
                  <AlertTriangle className="w-3.5 h-3.5 text-red-500" />
                  Missing: {item}
                </span>
              ))}
            </div>
          </div>
        )}
      </section>

    </div>
  );
};
