import React from 'react';
import { Database, Cloud, Terminal, Eye, TrendingUp, ShieldCheck, Cpu, Code2 } from 'lucide-react';

export const BentoFeatures: React.FC = () => {
  return (
    <section className="w-full max-w-6xl mx-auto px-4 py-12">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* ── BENTO CARD 1: Unify Your Data (Adaptive Curriculum) ── */}
        <div className="glass-card rounded-3xl p-6 border border-white/10 hover:border-verdant-lime/40 transition-all duration-300 flex flex-col justify-between group hover:shadow-[0_12px_40px_rgba(198,242,78,0.12)]">
          <div>
            {/* Header Icon + Title */}
            <div className="flex items-center gap-3 mb-3">
              <div className="w-9 h-9 rounded-xl bg-verdant-lime/10 border border-verdant-lime/30 flex items-center justify-center text-verdant-lime group-hover:scale-105 transition-transform">
                <Code2 className="w-4 h-4" />
              </div>
              <h3 className="font-sans font-semibold text-verdant-text text-base">
                Unify your roadmap
              </h3>
            </div>
            <p className="text-verdant-muted text-xs leading-relaxed mb-6">
              Connect all IT subjects, modules, and skills into a personalized AI curriculum tailored to your career goal.
            </p>
          </div>

          {/* Interactive Node Flow Visual Diagram */}
          <div className="relative h-44 rounded-2xl bg-black/40 border border-white/5 p-4 flex items-center justify-between overflow-hidden">
            {/* Subtle background glow */}
            <div className="absolute top-1/2 right-8 -translate-y-1/2 w-24 h-24 bg-verdant-lime/15 rounded-full blur-xl pointer-events-none" />

            {/* Left 4 Stacked Input Nodes */}
            <div className="flex flex-col gap-2 z-10">
              {[
                { icon: Database, label: 'SQL & DB' },
                { icon: Cloud, label: 'Cloud' },
                { icon: Terminal, label: 'Python' },
                { icon: Eye, label: 'System' },
              ].map((node, i) => (
                <div
                  key={i}
                  className="flex items-center gap-2 px-2.5 py-1 rounded-lg bg-white/[0.04] border border-white/[0.08] text-[10px] text-verdant-muted hover:border-verdant-lime/30 transition-colors"
                >
                  <node.icon className="w-3 h-3 text-verdant-lime" />
                  <span className="font-mono">{node.label}</span>
                </div>
              ))}
            </div>

            {/* SVG Connecting Flow Lines */}
            <svg
              className="absolute inset-0 w-full h-full pointer-events-none"
              viewBox="0 0 320 176"
              fill="none"
            >
              {/* Converging bezier curves */}
              <path
                d="M 100 32 C 160 32, 190 88, 240 88"
                stroke="rgba(198, 242, 78, 0.25)"
                strokeWidth="1.5"
                strokeDasharray="4 4"
              />
              <path
                d="M 100 68 C 160 68, 190 88, 240 88"
                stroke="rgba(198, 242, 78, 0.4)"
                strokeWidth="1.5"
              />
              <path
                d="M 100 108 C 160 108, 190 88, 240 88"
                stroke="rgba(198, 242, 78, 0.4)"
                strokeWidth="1.5"
              />
              <path
                d="M 100 144 C 160 144, 190 88, 240 88"
                stroke="rgba(198, 242, 78, 0.25)"
                strokeWidth="1.5"
                strokeDasharray="4 4"
              />
            </svg>

            {/* Right Central Converged AI Core Node */}
            <div className="relative z-10 mr-4">
              <div className="w-14 h-14 rounded-2xl bg-[#131f13] border-2 border-verdant-lime flex items-center justify-center shadow-[0_0_25px_rgba(198,242,78,0.5)] animate-pulse">
                <Cpu className="w-7 h-7 text-verdant-lime" />
              </div>
              <div className="absolute -bottom-5 left-1/2 -translate-x-1/2 text-[9px] font-mono text-verdant-lime font-bold whitespace-nowrap">
                Gemini 3.5 Core
              </div>
            </div>
          </div>
        </div>

        {/* ── BENTO CARD 2: Surface What Matters (Telemetry & Wave Chart) ── */}
        <div className="glass-card rounded-3xl p-6 border border-white/10 hover:border-verdant-lime/40 transition-all duration-300 flex flex-col justify-between group hover:shadow-[0_12px_40px_rgba(198,242,78,0.12)]">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <div className="w-9 h-9 rounded-xl bg-verdant-lime/10 border border-verdant-lime/30 flex items-center justify-center text-verdant-lime group-hover:scale-105 transition-transform">
                <TrendingUp className="w-4 h-4" />
              </div>
              <h3 className="font-sans font-semibold text-verdant-text text-base">
                Surface what matters
              </h3>
            </div>
            <p className="text-verdant-muted text-xs leading-relaxed mb-6">
              AI cuts through noise, highlighting the exact conceptual and coding weaknesses that need revision.
            </p>
          </div>

          {/* Glowing Wave Chart Visual */}
          <div className="relative h-44 rounded-2xl bg-black/40 border border-white/5 p-4 flex flex-col justify-between overflow-hidden">
            {/* Top Stat Badge */}
            <div className="flex items-center justify-between z-10">
              <span className="text-[10px] font-mono text-verdant-muted">Competency Trajectory</span>
              <div className="px-2 py-0.5 rounded-full bg-verdant-lime/20 border border-verdant-lime/40 text-verdant-lime font-mono font-bold text-[11px] shadow-[0_0_10px_rgba(198,242,78,0.3)]">
                + 32%
              </div>
            </div>

            {/* Glowing Lime Multi-Layer Area Waves */}
            <div className="absolute inset-x-0 bottom-0 h-28 pointer-events-none">
              <svg className="w-full h-full" viewBox="0 0 300 110" preserveAspectRatio="none">
                <defs>
                  <linearGradient id="limeGradPrimary" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#C6F24E" stopOpacity="0.45" />
                    <stop offset="100%" stopColor="#C6F24E" stopOpacity="0.0" />
                  </linearGradient>
                  <linearGradient id="limeGradSecondary" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#84cc16" stopOpacity="0.25" />
                    <stop offset="100%" stopColor="#84cc16" stopOpacity="0.0" />
                  </linearGradient>
                </defs>

                {/* Background Wave */}
                <path
                  d="M 0 80 Q 75 100, 150 65 T 300 40 L 300 110 L 0 110 Z"
                  fill="url(#limeGradSecondary)"
                />
                <path
                  d="M 0 80 Q 75 100, 150 65 T 300 40"
                  fill="none"
                  stroke="#84cc16"
                  strokeWidth="1.5"
                  opacity="0.6"
                />

                {/* Foreground Wave with high curve and glow */}
                <path
                  d="M 0 95 Q 60 70, 120 85 T 220 30 T 300 15 L 300 110 L 0 110 Z"
                  fill="url(#limeGradPrimary)"
                />
                <path
                  d="M 0 95 Q 60 70, 120 85 T 220 30 T 300 15"
                  fill="none"
                  stroke="#C6F24E"
                  strokeWidth="2.5"
                  className="filter drop-shadow-[0_0_6px_#C6F24E]"
                />

                {/* Key metric point */}
                <circle cx="220" cy="30" r="4" fill="#C6F24E" className="animate-ping opacity-75" />
                <circle cx="220" cy="30" r="3" fill="#FFFFFF" />
              </svg>
            </div>
          </div>
        </div>

        {/* ── BENTO CARD 3: Act With Confidence (Concentric Radar & Sandbox) ── */}
        <div className="glass-card rounded-3xl p-6 border border-white/10 hover:border-verdant-lime/40 transition-all duration-300 flex flex-col justify-between group hover:shadow-[0_12px_40px_rgba(198,242,78,0.12)]">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <div className="w-9 h-9 rounded-xl bg-verdant-lime/10 border border-verdant-lime/30 flex items-center justify-center text-verdant-lime group-hover:scale-105 transition-transform">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <h3 className="font-sans font-semibold text-verdant-text text-base">
                Act with confidence
              </h3>
            </div>
            <p className="text-verdant-muted text-xs leading-relaxed mb-6">
              Built-in automatic code evaluation runs unit tests in real time so your programming skills are verified.
            </p>
          </div>

          {/* Concentric Pulse Radar Rings Visual */}
          <div className="relative h-44 rounded-2xl bg-black/40 border border-white/5 p-4 flex items-center justify-center overflow-hidden">
            {/* Concentric circles */}
            <div className="absolute w-36 h-36 rounded-full border border-verdant-lime/20" />
            <div className="absolute w-24 h-24 rounded-full border border-verdant-lime/30" />
            <div className="absolute w-12 h-12 rounded-full border border-verdant-lime/50 bg-verdant-lime/10" />

            {/* Orbiting node dots with soft glow */}
            <div className="absolute top-8 right-14 w-2 h-2 rounded-full bg-verdant-lime shadow-[0_0_8px_#C6F24E] animate-pulse" />
            <div className="absolute bottom-10 left-16 w-2 h-2 rounded-full bg-verdant-lime shadow-[0_0_8px_#C6F24E]" />
            <div className="absolute top-16 left-12 w-1.5 h-1.5 rounded-full bg-white/70" />

            {/* Central Target Core Shield */}
            <div className="relative z-10 w-10 h-10 rounded-full bg-verdant-lime/20 border border-verdant-lime flex items-center justify-center shadow-[0_0_20px_rgba(198,242,78,0.6)]">
              <ShieldCheck className="w-5 h-5 text-verdant-lime" />
            </div>

            <div className="absolute bottom-2 inset-x-0 text-center">
              <span className="text-[9px] font-mono text-verdant-muted tracking-wider">
                100% UNIT TEST VALIDATION
              </span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
