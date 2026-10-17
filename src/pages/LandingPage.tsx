import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Check, Sparkles, Terminal, Code2, Compass, ShieldCheck, ChevronRight } from 'lucide-react';
import { BentoFeatures } from '../components/verdant/BentoFeatures';
import { WorkflowStepper } from '../components/verdant/WorkflowStepper';

export const LandingPage: React.FC = () => {
  return (
    <div className="relative min-h-screen bg-verdant-bg text-verdant-text overflow-hidden selection:bg-verdant-lime selection:text-[#0A0E0A]">
      
      {/* ── Background Organic Atmosphere ── */}
      <div className="absolute inset-0 pointer-events-none z-0">
        {/* Soft dark forest photo / gradient overlay */}
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-30 mix-blend-luminosity filter blur-[1px]"
          style={{ backgroundImage: `url('/verdant-hero-reference.png')` }}
        />
        {/* Deep Vignette */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0A0E0A]/90 via-[#0A0E0A]/95 to-[#0A0E0A]" />
        
        {/* Top Centered Lime Ambient Glow */}
        <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[650px] h-[350px] bg-verdant-lime/15 rounded-full blur-[140px] pointer-events-none" />
      </div>

      <div className="relative z-10 pt-32 pb-24">
        
        {/* ── Hero Section ── */}
        <section className="max-w-4xl mx-auto px-4 text-center flex flex-col items-center">
          
          {/* Version Announcement Pill */}
          <Link
            to="/roadmap"
            className="group inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-card border border-white/10 hover:border-verdant-lime/40 transition-all duration-300 mb-8 shadow-[0_0_20px_rgba(0,0,0,0.5)]"
          >
            <span className="w-2 h-2 rounded-full bg-verdant-lime animate-pulse" />
            <span className="text-[11px] font-mono uppercase tracking-wider text-verdant-muted group-hover:text-verdant-text">
              Version 2.5 with Gemini 3.5 &amp; Python Sandbox
            </span>
            <ChevronRight className="w-3.5 h-3.5 text-verdant-muted group-hover:text-verdant-lime group-hover:translate-x-0.5 transition-transform" />
          </Link>

          {/* Main Hero Headline with Serif Italic Accent */}
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-sans font-bold tracking-tight text-verdant-text leading-[1.1] mb-6">
            Intelligence that <br />
            <span className="font-serif italic font-normal text-verdant-lime">grows</span> with you.
          </h1>

          {/* Subtitle */}
          <p className="max-w-2xl text-verdant-muted text-sm sm:text-base leading-relaxed mb-10">
            The all-in-one platform for developers and tech teams who want clarity,
            speed, and sustainable growth powered by real code assessments.
          </p>

          {/* Primary Action Button with Glowing Lime Radial Aura */}
          <div className="relative flex flex-col items-center">
            {/* Pulsing Lime Glow behind button */}
            <div className="absolute -inset-1 bg-verdant-lime/40 rounded-full blur-xl pointer-events-none animate-pulse" />
            
            <Link
              to="/roadmap"
              className="relative inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full bg-gradient-to-r from-verdant-lime to-[#bbf43d] hover:to-verdant-lime text-[#0A0E0A] font-semibold text-sm shadow-[0_0_30px_rgba(198,242,78,0.5)] hover:shadow-[0_0_45px_rgba(198,242,78,0.8)] transition-all duration-200 hover:scale-105 active:scale-95"
            >
              <span>Accelerate Growth</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Checkmark Perking Bullets */}
          <div className="flex flex-wrap items-center justify-center gap-6 mt-8 text-xs text-verdant-muted">
            <div className="flex items-center gap-1.5">
              <Check className="w-3.5 h-3.5 text-verdant-lime" />
              <span>AI-Powered Roadmaps</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Check className="w-3.5 h-3.5 text-verdant-lime" />
              <span>Automated Code Sandbox</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Check className="w-3.5 h-3.5 text-verdant-lime" />
              <span>Verified Skill Gates</span>
            </div>
          </div>
        </section>

        {/* ── Pinterest Reference Bento Cards ── */}
        <BentoFeatures />

        {/* ── 7-Stage Continuous Learning Workflow ── */}
        <WorkflowStepper />

        {/* ── Brand Logos Strip (As seen in Pinterest pin) ── */}
        <section className="max-w-5xl mx-auto px-4 py-16 border-t border-white/5 text-center">
          <p className="text-[11px] font-mono tracking-widest uppercase text-verdant-muted/70 mb-8">
            TRUSTED BY INNOVATIVE TEAMS &amp; ACCELERATORS
          </p>
          <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-14 opacity-60 grayscale hover:grayscale-0 transition-all duration-300">
            <span className="font-mono text-sm tracking-widest text-verdant-text hover:text-verdant-lime cursor-default">▲ ACME CORP</span>
            <span className="font-mono text-sm tracking-widest text-verdant-text hover:text-verdant-lime cursor-default">☼ LUMEN LABS</span>
            <span className="font-mono text-sm tracking-widest text-verdant-text hover:text-verdant-lime cursor-default">N NOVA AI</span>
            <span className="font-mono text-sm tracking-widest text-verdant-text hover:text-verdant-lime cursor-default">◎ PULSE MATRIX</span>
            <span className="font-mono text-sm tracking-widest text-verdant-text hover:text-verdant-lime cursor-default">✦ STELLAR.IO</span>
          </div>
        </section>

        {/* ── Bottom Call To Action Banner ── */}
        <section className="max-w-5xl mx-auto px-4 pt-12 pb-8">
          <div className="glass-card rounded-3xl p-8 sm:p-12 border border-white/10 text-center relative overflow-hidden bg-gradient-to-b from-[#101911]/90 to-[#070b08]/90">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-verdant-lime/10 rounded-full blur-3xl pointer-events-none" />
            <h2 className="text-2xl sm:text-4xl font-bold text-verdant-text tracking-tight mb-4 relative z-10">
              Ready to transform your <span className="font-serif italic font-normal text-verdant-lime">engineering flightpath</span>?
            </h2>
            <p className="text-verdant-muted text-sm max-w-xl mx-auto mb-8 relative z-10">
              Join thousands of developers leveling up their technical skills with periodic assessments and automated unit-tested code grading.
            </p>
            <div className="relative z-10 flex flex-wrap items-center justify-center gap-4">
              <Link
                to="/roadmap"
                className="inline-flex items-center gap-2 px-7 py-3 rounded-full bg-verdant-lime hover:bg-verdant-lime-hover text-[#0A0E0A] font-semibold text-xs shadow-[0_0_20px_rgba(198,242,78,0.4)] transition-all hover:scale-105"
              >
                <span>Synthesize Career Roadmap</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/dashboard"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full glass-card border border-white/15 text-xs text-verdant-text hover:border-verdant-lime/30 transition-colors"
              >
                <span>View Live Dashboard</span>
              </Link>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
};
