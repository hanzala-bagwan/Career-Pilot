import React, { useState } from 'react';
import { Compass, BookOpen, CheckSquare, Terminal, Award, BarChart3, ArrowRight, RotateCcw, CheckCircle2 } from 'lucide-react';

export const WorkflowStepper: React.FC = () => {
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    {
      num: '01',
      title: 'AI Career Roadmap',
      desc: 'Gemini 3.5 generates a personalized multi-month syllabus tailored to your target engineering role.',
      icon: Compass,
      tag: 'Synthesize',
    },
    {
      num: '02',
      title: 'Learn a Module',
      desc: 'Master core conceptual topics, real-world architecture, and hands-on coding paradigms.',
      icon: BookOpen,
      tag: 'Study',
    },
    {
      num: '03',
      title: 'Take Assessment',
      desc: 'Test your grasp through conceptual questions and automated Python programming challenges.',
      icon: CheckSquare,
      tag: 'Examine',
    },
    {
      num: '04',
      title: 'Evaluate Performance',
      desc: 'Automatic test execution evaluates your logic against strict unit test cases with Pass / Needs Revision flags.',
      icon: Award,
      tag: 'Grade',
    },
    {
      num: '05',
      title: 'Update Dashboard',
      desc: 'Telemetry streams instantly to your dashboard, computing your mastery velocity and radar competency.',
      icon: BarChart3,
      tag: 'Telemetry',
    },
    {
      num: '06',
      title: 'Improve Weak Areas',
      desc: 'Targeted recommendations flag exactly which algorithms or concepts need revision and practice.',
      icon: RotateCcw,
      tag: 'Remediation',
    },
    {
      num: '07',
      title: 'Proceed & Unlock',
      desc: 'Pass with ≥70% score to unlock next milestone modules and advance towards your target IT role.',
      icon: CheckCircle2,
      tag: 'Advance',
    },
  ];

  return (
    <section className="w-full max-w-6xl mx-auto px-4 py-16">
      {/* Section Header */}
      <div className="text-center max-w-2xl mx-auto mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-verdant-lime/10 border border-verdant-lime/25 text-verdant-lime text-xs font-mono mb-3">
          <span className="w-1.5 h-1.5 rounded-full bg-verdant-lime animate-ping" />
          The Continuous Mastery Loop
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-verdant-text">
          How <span className="font-serif italic font-normal text-verdant-lime">CareerPilot</span> Works
        </h2>
        <p className="text-verdant-muted text-sm mt-2">
          From first roadmap to mastery: an autonomous cycle that evaluates real code and unlocks progressive milestones.
        </p>
      </div>

      {/* Interactive Step Selector Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-4 no-scrollbar justify-start md:justify-center">
        {steps.map((s, idx) => (
          <button
            key={idx}
            onClick={() => setActiveStep(idx)}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-full text-xs font-medium whitespace-nowrap transition-all duration-200 ${
              activeStep === idx
                ? 'bg-verdant-lime text-[#0A0E0A] font-bold shadow-[0_0_15px_rgba(198,242,78,0.4)] scale-105'
                : 'glass-card border border-white/5 text-verdant-muted hover:text-verdant-text hover:border-white/20'
            }`}
          >
            <span className="font-mono text-[10px] opacity-75">{s.num}</span>
            <span>{s.title}</span>
          </button>
        ))}
      </div>

      {/* Featured Step Focus Card */}
      <div className="mt-8 glass-card border border-white/10 rounded-3xl p-6 sm:p-8 bg-gradient-to-br from-[#0e170f]/90 to-[#070b07]/90 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-verdant-lime/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex items-start gap-4">
            <div className="w-14 h-14 rounded-2xl bg-verdant-lime/15 border border-verdant-lime/30 flex items-center justify-center text-verdant-lime shrink-0 shadow-[0_0_20px_rgba(198,242,78,0.25)]">
              {React.createElement(steps[activeStep].icon, { className: 'w-7 h-7' })}
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs font-mono font-bold text-verdant-lime">STEP {steps[activeStep].num}</span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-verdant-muted">
                  {steps[activeStep].tag}
                </span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-verdant-text">
                {steps[activeStep].title}
              </h3>
              <p className="text-verdant-muted text-sm max-w-xl mt-2 leading-relaxed">
                {steps[activeStep].desc}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 w-full md:w-auto justify-end">
            <button
              onClick={() => setActiveStep((prev) => (prev > 0 ? prev - 1 : steps.length - 1))}
              className="px-4 py-2 rounded-full glass-card border border-white/10 text-xs text-verdant-muted hover:text-verdant-text hover:border-verdant-lime/30 transition-colors"
            >
              Previous
            </button>
            <button
              onClick={() => setActiveStep((prev) => (prev < steps.length - 1 ? prev + 1 : 0))}
              className="px-5 py-2 rounded-full bg-verdant-lime text-[#0A0E0A] font-semibold text-xs flex items-center gap-1.5 shadow-[0_0_15px_rgba(198,242,78,0.4)] hover:bg-verdant-lime-hover transition-all"
            >
              <span>Next Stage</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
