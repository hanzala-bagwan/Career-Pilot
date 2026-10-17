import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, Terminal, ShieldCheck, Compass, ArrowRight, Code2, Cpu, BarChart2 } from 'lucide-react';

export const AboutPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-verdant-bg text-verdant-text pt-24 pb-20 px-4 sm:px-6 max-w-5xl mx-auto">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-verdant-lime/10 border border-verdant-lime/25 text-verdant-lime text-xs font-mono mb-3">
          <Sparkles className="w-3.5 h-3.5" />
          <span>The CareerPilot Philosophy</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-verdant-text">
          Engineered for <span className="font-serif italic font-normal text-verdant-lime">Verifiable Mastery</span>
        </h1>
        <p className="text-verdant-muted text-xs sm:text-sm mt-3 leading-relaxed">
          CareerPilot AI transforms passive video tutorials into an active, automated flightpath where every IT competency is proven against real code unit tests.
        </p>
      </div>

      {/* 3 Pillars Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
        
        <div className="glass-card rounded-3xl p-6 border border-white/10 flex flex-col justify-between">
          <div>
            <div className="w-10 h-10 rounded-2xl bg-verdant-lime/10 border border-verdant-lime/30 flex items-center justify-center text-verdant-lime mb-4">
              <Compass className="w-5 h-5" />
            </div>
            <h3 className="text-base font-semibold text-verdant-text mb-2">
              Gemini 3.5 AI Roadmaps
            </h3>
            <p className="text-xs text-verdant-muted leading-relaxed">
              Curriculums are not static templates. Gemini models dynamically structure modules, prerequisites, and milestone topics for specific industry engineering roles.
            </p>
          </div>
          <div className="mt-6 pt-4 border-t border-white/5 text-[11px] font-mono text-verdant-lime">
            Dynamic &amp; Adaptive
          </div>
        </div>

        <div className="glass-card rounded-3xl p-6 border border-white/10 flex flex-col justify-between">
          <div>
            <div className="w-10 h-10 rounded-2xl bg-verdant-lime/10 border border-verdant-lime/30 flex items-center justify-center text-verdant-lime mb-4">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="text-base font-semibold text-verdant-text mb-2">
              Automated Code Grading
            </h3>
            <p className="text-xs text-verdant-muted leading-relaxed">
              No multiple-choice guessing. Real Python code challenges run against strict unit test suites with automatic Pass, Needs Revision, or Fail classification.
            </p>
          </div>
          <div className="mt-6 pt-4 border-t border-white/5 text-[11px] font-mono text-verdant-lime">
            100% Sandbox Execution
          </div>
        </div>

        <div className="glass-card rounded-3xl p-6 border border-white/10 flex flex-col justify-between">
          <div>
            <div className="w-10 h-10 rounded-2xl bg-verdant-lime/10 border border-verdant-lime/30 flex items-center justify-center text-verdant-lime mb-4">
              <BarChart2 className="w-5 h-5" />
            </div>
            <h3 className="text-base font-semibold text-verdant-text mb-2">
              Telemetry &amp; Remediation
            </h3>
            <p className="text-xs text-verdant-muted leading-relaxed">
              Every attempt updates the student’s radar competency matrix, identifying specific algorithmic weaknesses and recommending targeted practice before unlocking subsequent gates.
            </p>
          </div>
          <div className="mt-6 pt-4 border-t border-white/5 text-[11px] font-mono text-verdant-lime">
            Real-Time Competency
          </div>
        </div>

      </div>

      {/* Tech Stack Bento */}
      <div className="glass-card rounded-3xl p-8 border border-white/10 mb-16">
        <h2 className="text-xl font-bold text-verdant-text mb-6">
          System Architecture
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/5">
            <span className="text-[10px] font-mono text-verdant-lime uppercase block mb-1">Frontend Layer</span>
            <h4 className="font-semibold text-sm text-verdant-text mb-1">React 18 + Vite</h4>
            <p className="text-[11px] text-verdant-muted">Tailwind CSS with CareerPilot modern glassmorphism &amp; Recharts.</p>
          </div>

          <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/5">
            <span className="text-[10px] font-mono text-verdant-lime uppercase block mb-1">Backend Bridge</span>
            <h4 className="font-semibold text-sm text-verdant-text mb-1">FastAPI (Python)</h4>
            <p className="text-[11px] text-verdant-muted">High-performance REST API with CORS and Pydantic schemas.</p>
          </div>

          <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/5">
            <span className="text-[10px] font-mono text-verdant-lime uppercase block mb-1">Cognitive Engine</span>
            <h4 className="font-semibold text-sm text-verdant-text mb-1">Google Gemini 3.5</h4>
            <p className="text-[11px] text-verdant-muted">Curriculum synthesis &amp; contextual question generation.</p>
          </div>

          <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/5">
            <span className="text-[10px] font-mono text-verdant-lime uppercase block mb-1">Execution Sandbox</span>
            <h4 className="font-semibold text-sm text-verdant-text mb-1">Python 3 Test Runner</h4>
            <p className="text-[11px] text-verdant-muted">Captured stdout &amp; assertion verification per module.</p>
          </div>
        </div>
      </div>

      {/* Bottom CTA */}
      <div className="text-center">
        <Link
          to="/roadmap"
          className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-verdant-lime hover:bg-verdant-lime-hover text-[#0A0E0A] font-bold text-xs shadow-[0_0_20px_rgba(198,242,78,0.4)] transition-all hover:scale-105"
        >
          <span>Launch Roadmap Studio</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

    </div>
  );
};
