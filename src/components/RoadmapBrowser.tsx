import React, { useState, useMemo } from 'react';
import { CareerTrack } from '../types';
import { CAREER_TRACKS } from '../data/telemetryData';
import {
  Code2, Search, Filter, Briefcase, TrendingUp, Star,
  ArrowRight, ChevronDown, ChevronUp, Globe, Cpu,
  BrainCircuit, Server, Database, ShieldCheck, Smartphone,
  Coins, Check, Layers, Zap, BookOpen
} from 'lucide-react';

interface RoadmapBrowserProps {
  activeTrack: CareerTrack;
  onSelectTrack: (track: CareerTrack) => void;
  onToast: (msg: string) => void;
  allTracks?: CareerTrack[];
}

// Related jobs per track
const RELATED_JOBS: Record<string, { title: string; avgSalary: string; demand: string }[]> = {
  'ai-systems-architect': [
    { title: 'ML Platform Engineer', avgSalary: '$245k', demand: 'Very High' },
    { title: 'Research Engineer (LLM)', avgSalary: '$290k', demand: 'Extreme' },
    { title: 'AI Infrastructure Lead', avgSalary: '$260k', demand: 'Very High' },
    { title: 'MLOps Engineer', avgSalary: '$210k', demand: 'High' },
    { title: 'Generative AI Architect', avgSalary: '$310k', demand: 'Extreme' },
    { title: 'Distributed Training Specialist', avgSalary: '$275k', demand: 'Very High' },
    { title: 'AI Product Engineer', avgSalary: '$225k', demand: 'High' },
  ],
  'fullstack-cloud-architect': [
    { title: 'Staff Software Engineer', avgSalary: '$220k', demand: 'Very High' },
    { title: 'Principal Frontend Engineer', avgSalary: '$210k', demand: 'High' },
    { title: 'Cloud Solutions Architect', avgSalary: '$235k', demand: 'Very High' },
    { title: 'Full Stack Engineering Manager', avgSalary: '$250k', demand: 'High' },
    { title: 'Developer Experience Engineer', avgSalary: '$195k', demand: 'High' },
    { title: 'Platform Engineer', avgSalary: '$215k', demand: 'Very High' },
  ],
  'devops-sre': [
    { title: 'Site Reliability Engineer', avgSalary: '$220k', demand: 'Very High' },
    { title: 'Platform Architect', avgSalary: '$235k', demand: 'High' },
    { title: 'Infrastructure Engineer', avgSalary: '$200k', demand: 'High' },
    { title: 'DevSecOps Engineer', avgSalary: '$215k', demand: 'Very High' },
    { title: 'Cloud FinOps Engineer', avgSalary: '$195k', demand: 'Growing' },
    { title: 'Chaos Engineering Lead', avgSalary: '$240k', demand: 'High' },
  ],
  'bigdata-stream-architect': [
    { title: 'Data Engineer (Senior)', avgSalary: '$195k', demand: 'Very High' },
    { title: 'Analytics Engineer', avgSalary: '$185k', demand: 'High' },
    { title: 'Streaming Systems Engineer', avgSalary: '$215k', demand: 'High' },
    { title: 'Data Platform Lead', avgSalary: '$225k', demand: 'High' },
    { title: 'Lakehouse Architect', avgSalary: '$230k', demand: 'Growing' },
    { title: 'BI Engineering Lead', avgSalary: '$180k', demand: 'Stable' },
  ],
  'cloud-security': [
    { title: 'Cloud Security Engineer', avgSalary: '$220k', demand: 'Very High' },
    { title: 'AppSec Engineer', avgSalary: '$210k', demand: 'High' },
    { title: 'Cryptography Engineer', avgSalary: '$240k', demand: 'High' },
    { title: 'Red Team Engineer', avgSalary: '$230k', demand: 'High' },
    { title: 'Zero Trust Architect', avgSalary: '$250k', demand: 'Growing' },
    { title: 'Security Data Scientist', avgSalary: '$215k', demand: 'Growing' },
  ],
  'mobile-engineer': [
    { title: 'Senior iOS Developer', avgSalary: '$175k', demand: 'High' },
    { title: 'Senior Android Developer', avgSalary: '$170k', demand: 'High' },
    { title: 'Mobile Platform Engineer', avgSalary: '$200k', demand: 'High' },
    { title: 'KMP Architect', avgSalary: '$195k', demand: 'Growing' },
    { title: 'Mobile DevOps Engineer', avgSalary: '$185k', demand: 'Growing' },
    { title: 'Mobile Performance Engineer', avgSalary: '$190k', demand: 'Growing' },
  ],
  'web3-architect': [
    { title: 'Smart Contract Auditor', avgSalary: '$220k', demand: 'High' },
    { title: 'DeFi Protocol Engineer', avgSalary: '$250k', demand: 'High' },
    { title: 'Web3 Security Researcher', avgSalary: '$240k', demand: 'High' },
    { title: 'Blockchain Core Developer', avgSalary: '$230k', demand: 'Moderate' },
    { title: 'NFT/Gaming Engineer', avgSalary: '$185k', demand: 'Moderate' },
    { title: 'zkProof Engineer', avgSalary: '$280k', demand: 'Very High' },
  ],
  'embedded-robotics': [
    { title: 'Firmware Engineer', avgSalary: '$155k', demand: 'High' },
    { title: 'Robotics Software Engineer', avgSalary: '$175k', demand: 'Very High' },
    { title: 'Autonomous Systems Engineer', avgSalary: '$210k', demand: 'Very High' },
    { title: 'RTOS Developer', avgSalary: '$160k', demand: 'Stable' },
    { title: 'Embedded ML Engineer', avgSalary: '$195k', demand: 'Growing' },
    { title: 'Hardware/Software Co-Design Engineer', avgSalary: '$185k', demand: 'High' },
  ],
  // Language tracks
  'python-developer': [
    { title: 'Data Scientist', avgSalary: '$155k', demand: 'Very High' },
    { title: 'ML Engineer', avgSalary: '$185k', demand: 'Extreme' },
    { title: 'Data Engineer', avgSalary: '$165k', demand: 'Very High' },
    { title: 'Python Backend Engineer', avgSalary: '$160k', demand: 'High' },
    { title: 'AI Research Engineer', avgSalary: '$220k', demand: 'Extreme' },
    { title: 'Quantitative Analyst', avgSalary: '$200k', demand: 'High' },
    { title: 'Django/FastAPI Developer', avgSalary: '$145k', demand: 'High' },
  ],
  'javascript-developer': [
    { title: 'Full Stack JS Developer', avgSalary: '$145k', demand: 'Very High' },
    { title: 'React Developer', avgSalary: '$150k', demand: 'Very High' },
    { title: 'Node.js Backend Engineer', avgSalary: '$155k', demand: 'High' },
    { title: 'Frontend Architect', avgSalary: '$180k', demand: 'High' },
    { title: 'Next.js Developer', avgSalary: '$160k', demand: 'High' },
    { title: 'TypeScript Engineer', avgSalary: '$165k', demand: 'Very High' },
  ],
  'java-developer': [
    { title: 'Java Backend Engineer', avgSalary: '$155k', demand: 'High' },
    { title: 'Spring Boot Developer', avgSalary: '$160k', demand: 'Very High' },
    { title: 'Enterprise Architect', avgSalary: '$205k', demand: 'High' },
    { title: 'Android Developer (Java)', avgSalary: '$150k', demand: 'Moderate' },
    { title: 'Apache Kafka Engineer', avgSalary: '$185k', demand: 'High' },
    { title: 'JVM Performance Engineer', avgSalary: '$195k', demand: 'Growing' },
  ],
  'csharp-developer': [
    { title: '.NET Developer', avgSalary: '$145k', demand: 'High' },
    { title: 'C# Game Developer (Unity)', avgSalary: '$130k', demand: 'High' },
    { title: 'Azure Solutions Architect', avgSalary: '$200k', demand: 'Very High' },
    { title: 'MAUI Cross-Platform Dev', avgSalary: '$155k', demand: 'Growing' },
    { title: 'ASP.NET Core Engineer', avgSalary: '$160k', demand: 'High' },
    { title: 'WPF/WinUI Desktop Dev', avgSalary: '$140k', demand: 'Stable' },
  ],
  'rust-engineer': [
    { title: 'Rust Systems Engineer', avgSalary: '$195k', demand: 'Very High' },
    { title: 'WebAssembly Developer', avgSalary: '$185k', demand: 'Growing' },
    { title: 'Blockchain Core Dev (Rust)', avgSalary: '$220k', demand: 'High' },
    { title: 'Operating Systems Engineer', avgSalary: '$210k', demand: 'High' },
    { title: 'High-Performance Computing Dev', avgSalary: '$200k', demand: 'High' },
    { title: 'Game Engine Developer', avgSalary: '$175k', demand: 'Growing' },
  ],
  'go-developer': [
    { title: 'Go Backend Engineer', avgSalary: '$175k', demand: 'Very High' },
    { title: 'Cloud Native Developer', avgSalary: '$185k', demand: 'Very High' },
    { title: 'Microservices Engineer', avgSalary: '$180k', demand: 'High' },
    { title: 'DevTools Engineer', avgSalary: '$190k', demand: 'High' },
    { title: 'Kubernetes Contributor', avgSalary: '$210k', demand: 'High' },
    { title: 'API Gateway Engineer', avgSalary: '$170k', demand: 'High' },
  ],
};

// Language → color mapping for badges
const LANG_COLORS: Record<string, string> = {
  Python: 'bg-blue-100 text-blue-800',
  TypeScript: 'bg-sky-100 text-sky-800',
  JavaScript: 'bg-yellow-100 text-yellow-800',
  Rust: 'bg-orange-100 text-orange-800',
  Go: 'bg-cyan-100 text-cyan-800',
  'C++': 'bg-rose-100 text-rose-800',
  Java: 'bg-red-100 text-red-800',
  'C#': 'bg-purple-100 text-purple-800',
  Swift: 'bg-orange-100 text-orange-800',
  Kotlin: 'bg-violet-100 text-violet-800',
  Solidity: 'bg-slate-100 text-slate-800',
  PHP: 'bg-indigo-100 text-indigo-800',
  CUDA: 'bg-green-100 text-green-800',
  Triton: 'bg-emerald-100 text-emerald-800',
  SQL: 'bg-teal-100 text-teal-800',
};

const DEMAND_COLORS: Record<string, string> = {
  'Extreme': 'bg-red-100 text-red-800 border-red-300',
  'Very High': 'bg-orange-100 text-orange-800 border-orange-300',
  'High': 'bg-emerald-100 text-emerald-800 border-emerald-300',
  'Growing': 'bg-teal-100 text-teal-800 border-teal-300',
  'Moderate': 'bg-slate-100 text-slate-700 border-slate-300',
  'Stable': 'bg-gray-100 text-gray-700 border-gray-300',
};

const getIcon = (iconName: string, cls = 'w-5 h-5 text-emerald-600') => {
  switch (iconName) {
    case 'BrainCircuit': return <BrainCircuit className={cls} />;
    case 'Globe': return <Globe className={cls} />;
    case 'Server': return <Server className={cls} />;
    case 'Database': return <Database className={cls} />;
    case 'ShieldCheck': return <ShieldCheck className={cls} />;
    case 'Smartphone': return <Smartphone className={cls} />;
    case 'Coins': return <Coins className={cls} />;
    case 'Code2': return <Code2 className={cls} />;
    default: return <Cpu className={cls} />;
  }
};

export const RoadmapBrowser: React.FC<RoadmapBrowserProps> = ({
  activeTrack,
  onSelectTrack,
  onToast,
  allTracks = [],
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLang, setSelectedLang] = useState<string>('All');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [expandedJobTrack, setExpandedJobTrack] = useState<string | null>(activeTrack.id);
  const [showAllTracks, setShowAllTracks] = useState(false);

  const combinedTracks = [...CAREER_TRACKS, ...allTracks];

  const allLanguages = useMemo(() => {
    const langs = new Set<string>(['All']);
    combinedTracks.forEach(t => t.primaryLanguages.forEach(l => langs.add(l)));
    return Array.from(langs);
  }, [allTracks]);

  const allCategories = useMemo(() => {
    const cats = new Set<string>(['All']);
    combinedTracks.forEach(t => cats.add(t.category));
    return Array.from(cats);
  }, [allTracks]);

  const filteredTracks = useMemo(() => {
    return combinedTracks.filter(t => {
      const matchSearch = !searchQuery ||
        t.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        t.primaryLanguages.some(l => l.toLowerCase().includes(searchQuery.toLowerCase())) ||
        t.category.toLowerCase().includes(searchQuery.toLowerCase());
      const matchLang = selectedLang === 'All' || t.primaryLanguages.includes(selectedLang);
      const matchCat = selectedCategory === 'All' || t.category === selectedCategory;
      return matchSearch && matchLang && matchCat;
    });
  }, [searchQuery, selectedLang, selectedCategory, allTracks]);

  const displayedTracks = showAllTracks ? filteredTracks : filteredTracks.slice(0, 8);

  return (
    <div className="flex flex-col gap-6 animate-fadeIn">
      {/* Header */}
      <div className="flex flex-col gap-1">
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-mono text-emerald-700 tracking-widest uppercase font-bold">
            LANGUAGE &amp; CAREER BROWSER
          </span>
          <span className="text-[11px] font-mono px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-300 font-bold">
            {combinedTracks.length} ROADMAPS AVAILABLE
          </span>
        </div>
        <h2 className="text-xl sm:text-2xl font-display font-extrabold text-on-surface">
          All Language &amp; Career Roadmaps
        </h2>
        <p className="text-xs text-on-surface-variant font-medium">
          Comprehensive career flightpaths covering all programming languages, plus deep-dive master roadmaps for Frontend, Backend, and Full-Stack Engineering.
        </p>
      </div>

      {/* ========================================================================= */}
      {/* 🌟 MAJOR HIGHLIGHT: FULL-STACK, FRONTEND & BACKEND ARCHITECTURE SPOTLIGHT */}
      {/* ========================================================================= */}
      <section className="p-6 rounded-3xl bg-gradient-to-br from-emerald-950 via-teal-950 to-slate-950 text-white shadow-xl border border-emerald-500/40 relative overflow-hidden">
        {/* Glow Accents */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col gap-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div className="flex items-center gap-2.5">
              <span className="w-3 h-3 rounded-full bg-emerald-400 animate-ping" />
              <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-400/40 text-xs font-mono font-bold tracking-wider uppercase">
                FEATURED DOMAIN SPOTLIGHT
              </span>
            </div>
            <span className="text-xs font-mono text-emerald-200">
              High-Impact 2025 Architecture Curriculum
            </span>
          </div>

          <div>
            <h3 className="text-2xl sm:text-3xl font-display font-extrabold text-white tracking-tight">
              Full-Stack, Frontend &amp; Backend Engineering
            </h3>
            <p className="text-slate-300 text-xs sm:text-sm mt-1 max-w-2xl font-medium">
              Explore the 3 pillar disciplines of modern web systems. Select any path to load its tailored 3D milestone graph, in-browser code sandbox, and compensation metrics.
            </p>
          </div>

          {/* 3 Major Spotlight Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
            
            {/* Spotlight 1: Frontend */}
            <div 
              onClick={() => {
                const fe = combinedTracks.find(t => t.id === 'frontend-engineer');
                if (fe) {
                  onSelectTrack(fe);
                  onToast('Loaded Frontend Architecture Roadmap');
                }
              }}
              className="p-5 rounded-2xl bg-white/10 hover:bg-white/15 border border-emerald-400/30 hover:border-emerald-400 transition-all cursor-pointer flex flex-col justify-between gap-4 group backdrop-blur-md"
            >
              <div className="flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-300 flex items-center justify-center border border-emerald-400/40">
                    <Globe className="w-5 h-5 text-emerald-400 group-hover:scale-110 transition-transform" />
                  </div>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-400/20 text-emerald-300 border border-emerald-400/40 font-bold">
                    FRONTEND
                  </span>
                </div>
                <h4 className="text-base font-bold text-white group-hover:text-emerald-300 transition-colors">
                  Frontend &amp; UI/UX Architect
                </h4>
                <p className="text-xs text-slate-300 font-medium leading-relaxed">
                  React 19, Next.js 15 Server Components, Core Web Vitals, sub-second LCP, and Design System Monorepos.
                </p>
              </div>

              <div className="flex flex-col gap-2 pt-2 border-t border-white/10">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-emerald-300 font-bold">$210k Avg Comp</span>
                  <span className="text-teal-200">+31% YoY</span>
                </div>
                <div className="flex items-center text-xs font-bold text-emerald-300 gap-1 group-hover:translate-x-1 transition-transform">
                  <span>Load Frontend Roadmap</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </div>
            </div>

            {/* Spotlight 2: Backend */}
            <div 
              onClick={() => {
                const be = combinedTracks.find(t => t.id === 'backend-engineer');
                if (be) {
                  onSelectTrack(be);
                  onToast('Loaded Backend Architecture Roadmap');
                }
              }}
              className="p-5 rounded-2xl bg-white/10 hover:bg-white/15 border border-teal-400/30 hover:border-teal-400 transition-all cursor-pointer flex flex-col justify-between gap-4 group backdrop-blur-md"
            >
              <div className="flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-xl bg-teal-500/20 text-teal-300 flex items-center justify-center border border-teal-400/40">
                    <Server className="w-5 h-5 text-teal-400 group-hover:scale-110 transition-transform" />
                  </div>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-teal-400/20 text-teal-300 border border-teal-400/40 font-bold">
                    BACKEND
                  </span>
                </div>
                <h4 className="text-base font-bold text-white group-hover:text-teal-300 transition-colors">
                  Backend &amp; Distributed Systems
                </h4>
                <p className="text-xs text-slate-300 font-medium leading-relaxed">
                  Go microservices, FastAPI, PostgreSQL 17 query tuning, Apache Kafka event sourcing, and Redis locks.
                </p>
              </div>

              <div className="flex flex-col gap-2 pt-2 border-t border-white/10">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-teal-300 font-bold">$235k Avg Comp</span>
                  <span className="text-emerald-200">+36% YoY</span>
                </div>
                <div className="flex items-center text-xs font-bold text-teal-300 gap-1 group-hover:translate-x-1 transition-transform">
                  <span>Load Backend Roadmap</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </div>
            </div>

            {/* Spotlight 3: Full-Stack Cloud */}
            <div 
              onClick={() => {
                const fs = combinedTracks.find(t => t.id === 'fullstack-cloud-architect');
                if (fs) {
                  onSelectTrack(fs);
                  onToast('Loaded Full-Stack Cloud Roadmap');
                }
              }}
              className="p-5 rounded-2xl bg-white/10 hover:bg-white/15 border border-emerald-400/30 hover:border-emerald-400 transition-all cursor-pointer flex flex-col justify-between gap-4 group backdrop-blur-md"
            >
              <div className="flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-300 flex items-center justify-center border border-emerald-400/40">
                    <Layers className="w-5 h-5 text-emerald-400 group-hover:scale-110 transition-transform" />
                  </div>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-400/20 text-emerald-300 border border-emerald-400/40 font-bold">
                    FULL-STACK
                  </span>
                </div>
                <h4 className="text-base font-bold text-white group-hover:text-emerald-300 transition-colors">
                  Lead Full-Stack Cloud Architect
                </h4>
                <p className="text-xs text-slate-300 font-medium leading-relaxed">
                  End-to-end cloud mastery: React 19 frontend, Go distributed APIs, Kubernetes, and Zero Trust security.
                </p>
              </div>

              <div className="flex flex-col gap-2 pt-2 border-t border-white/10">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-emerald-300 font-bold">$245k Avg Comp</span>
                  <span className="text-teal-200">+34% YoY</span>
                </div>
                <div className="flex items-center text-xs font-bold text-emerald-300 gap-1 group-hover:translate-x-1 transition-transform">
                  <span>Load Full-Stack Roadmap</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Search + Filter Bar */}
      <div className="flex flex-col sm:flex-row gap-3">
        {/* Search */}
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-on-surface-variant" />
          <input
            type="text"
            placeholder="Search language, role, or category..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 text-xs font-medium rounded-xl border border-border focus:border-emerald-500 outline-none bg-surface-sub text-on-surface"
          />
        </div>
        {/* Language Filter */}
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-on-surface-variant shrink-0" />
          <select
            value={selectedLang}
            onChange={e => setSelectedLang(e.target.value)}
            className="text-xs font-mono font-semibold px-3 py-2.5 rounded-xl border border-border focus:border-emerald-500 outline-none bg-surface-sub text-on-surface cursor-pointer"
          >
            {allLanguages.map(l => <option key={l} value={l}>{l}</option>)}
          </select>
        </div>
        {/* Category Filter */}
        <div>
          <select
            value={selectedCategory}
            onChange={e => setSelectedCategory(e.target.value)}
            className="text-xs font-mono font-semibold px-3 py-2.5 rounded-xl border border-border focus:border-emerald-500 outline-none bg-surface-sub text-on-surface cursor-pointer"
          >
            {allCategories.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>
      </div>

      {/* Track Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {displayedTracks.map(track => {
          const isActive = activeTrack.id === track.id;
          const relatedJobs = RELATED_JOBS[track.id] || [];
          const isJobsExpanded = expandedJobTrack === track.id;

          return (
            <div
              key={track.id}
              className={`rounded-2xl border flex flex-col gap-0 overflow-hidden transition-all ${
                isActive
                  ? 'border-emerald-500 shadow-[0_4px_20px_rgba(16,185,129,0.2)] ring-1 ring-emerald-400/30'
                  : 'border-border hover:border-emerald-300 hover:shadow-md'
              } bg-white`}
            >
              {/* Card Header */}
              <div className="p-4 flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <div className={`w-9 h-9 rounded-xl flex items-center justify-center border ${
                    isActive ? 'bg-emerald-100 border-emerald-300' : 'bg-slate-50 border-border'
                  }`}>
                    {getIcon(track.iconName)}
                  </div>
                  <div className="flex items-center gap-1.5">
                    {isActive && (
                      <span className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-600 text-white text-[10px] font-mono font-bold">
                        <Check className="w-3 h-3" />
                        Active
                      </span>
                    )}
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 font-bold">
                      {track.shortCode}
                    </span>
                  </div>
                </div>

                <div>
                  <h3 className="font-bold text-sm text-on-surface leading-snug">{track.title}</h3>
                  <span className="text-[10px] font-mono text-emerald-700 font-semibold">{track.category}</span>
                </div>

                {/* Language Badges */}
                <div className="flex flex-wrap gap-1">
                  {track.primaryLanguages.map(lang => (
                    <span
                      key={lang}
                      className={`text-[10px] font-mono px-1.5 py-0.5 rounded font-semibold ${LANG_COLORS[lang] || 'bg-slate-100 text-slate-700'}`}
                    >
                      {lang}
                    </span>
                  ))}
                </div>

                {/* Metrics Row */}
                <div className="flex items-center justify-between text-xs font-mono pt-1 border-t border-border">
                  <span className="text-emerald-700 font-bold">{track.metrics.averageSalary}</span>
                  <span className="flex items-center gap-0.5 text-emerald-800 font-semibold">
                    <TrendingUp className="w-3 h-3 text-emerald-600" />
                    {track.metrics.marketGrowth}
                  </span>
                </div>
              </div>

              {/* Related Jobs Accordion */}
              {relatedJobs.length > 0 && (
                <div className="border-t border-border">
                  <button
                    onClick={() => setExpandedJobTrack(isJobsExpanded ? null : track.id)}
                    className="w-full flex items-center justify-between px-4 py-2.5 text-xs font-mono font-bold text-on-surface-variant hover:text-emerald-700 hover:bg-emerald-50 transition-all cursor-pointer"
                  >
                    <span className="flex items-center gap-1.5">
                      <Briefcase className="w-3.5 h-3.5" />
                      {relatedJobs.length} Related Jobs
                    </span>
                    {isJobsExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                  </button>

                  {isJobsExpanded && (
                    <div className="px-4 pb-3 flex flex-col gap-1.5 bg-slate-50/80">
                      {relatedJobs.map((job, i) => (
                        <div key={i} className="flex items-center justify-between">
                          <span className="text-[11px] font-medium text-on-surface">{job.title}</span>
                          <div className="flex items-center gap-1.5">
                            <span className="text-[10px] font-mono text-emerald-700 font-bold">{job.avgSalary}</span>
                            <span className={`text-[9px] font-mono font-bold px-1.5 py-0.5 rounded-full border ${DEMAND_COLORS[job.demand] || DEMAND_COLORS['Stable']}`}>
                              {job.demand}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* Select Button */}
              <div className="p-3 border-t border-border mt-auto">
                <button
                  onClick={() => {
                    onSelectTrack(track);
                    onToast(`Loaded roadmap: ${track.title}`);
                  }}
                  className={`w-full py-2 rounded-lg text-xs font-mono font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                    isActive
                      ? 'bg-emerald-600 text-white shadow-sm'
                      : 'bg-slate-100 text-slate-700 hover:bg-emerald-600 hover:text-white'
                  }`}
                >
                  {isActive ? (
                    <>
                      <Layers className="w-3.5 h-3.5" />
                      <span>Currently Active</span>
                    </>
                  ) : (
                    <>
                      <span>Load Roadmap</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </>
                  )}
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Show More */}
      {filteredTracks.length > 8 && (
        <button
          onClick={() => setShowAllTracks(!showAllTracks)}
          className="mx-auto px-6 py-2.5 rounded-xl border border-emerald-300 bg-emerald-50 text-emerald-800 text-xs font-mono font-bold flex items-center gap-2 hover:bg-emerald-100 transition-all cursor-pointer"
        >
          {showAllTracks ? (
            <><ChevronUp className="w-4 h-4" />Show Less</>
          ) : (
            <><ChevronDown className="w-4 h-4" />Show All {filteredTracks.length} Roadmaps</>
          )}
        </button>
      )}

      {filteredTracks.length === 0 && (
        <div className="py-16 text-center text-on-surface-variant">
          <BookOpen className="w-10 h-10 mx-auto mb-3 text-emerald-300" />
          <p className="text-sm font-bold">No roadmaps found</p>
          <p className="text-xs mt-1">Try adjusting your search or filters</p>
        </div>
      )}
    </div>
  );
};
