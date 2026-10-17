export type AppTheme = 'cyberpunk' | 'emerald' | 'm3';

export type NavTab = 'home' | 'roadmap' | 'resume' | 'skills' | 'interview' | 'salary';

export interface TelemetryMetric {
  id: string;
  label: string;
  value: string;
  subtext: string;
  change?: string;
  trend?: 'up' | 'down' | 'neutral';
  accentColor?: string;
}

export interface LiveFeedItem {
  id: string;
  type: 'action' | 'salary' | 'market';
  badge: string;
  timeAgo: string;
  title: string;
  description: string;
  metricLabel: string;
  metricValue: string;
  actionText: string;
}

export interface MilestoneNode {
  id: string;
  phase: string;
  status: 'completed' | 'in_progress' | 'locked';
  title: string;
  description: string;
  duration: string;
  salaryBump: string;
  skills: string[];
  recommendedAction?: string;
  progressPercent?: number;
  prerequisite?: string;
}

export interface CodeSandboxState {
  code: string;
  language: string;
  filename: string;
  activeTab: 'console' | 'vram' | 'ast';
  isKernelReady: boolean;
  latency: string;
  hints: {
    id: number;
    title: string;
    description: string;
    isRevealed: boolean;
  }[];
  revealedHintCount: number;
  optimalSolution: string;
  logs: {
    type: 'info' | 'success' | 'highlight' | 'pass';
    text: string;
  }[];
  vram: {
    gpuName: string;
    cudaStatus: string;
    allocatedMb: number;
    totalMb: number;
    cachedBuffersMb: number;
    peakMb: number;
  };
  astNodes: {
    name: string;
    type: string;
    frozen?: boolean;
    requiresGrad?: boolean;
    children?: { name: string; type: string }[];
  }[];
}

export interface QuizQuestion {
  id: string;
  scenario: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  domain: string;
}

export interface ResumeMetric {
  overallScore: number;
  documentStructure: number;
  keywordDensity: number;
  actionVerbs: number;
}

export interface BulletPointRefinement {
  id: string;
  severity: 'critical' | 'medium';
  title: string;
  originalText: string;
  refinedText: string;
  impactMetrics: string;
}

export interface SkillItem {
  id: string;
  name: string;
  category: 'mastered' | 'progress' | 'missing';
  level: string;
  statusLabel: string;
  sprintDuration?: string;
  progressPercent?: number;
  highImpact?: boolean;
  productionTier?: boolean;
}

export interface InterviewTelemetry {
  currentQuestionIndex: number;
  totalQuestions: number;
  questionText: string;
  targetRole: string;
  specialization: string;
  isRecording: boolean;
  timeElapsedSeconds: number;
  maxTimeSeconds: number;
  wpm: number;
  audioInputDb: string;
  audioFrequency: string;
  detectedKeywords: string[];
  confidenceScore: number;
  speechClarityScore: number;
  technicalDepthScore: number;
  technicalDepthLevel: string;
  coachFeedback: string;
  transcript: string;
}

export interface SalaryBand {
  level: 'L4' | 'L5' | 'L6' | 'L7';
  title: string;
  baseSalary: number;
  equity: number;
  totalComp: number;
  yoyGrowth: string;
}

export interface MetroHub {
  city: string;
  country: string;
  avgComp: string;
  openings: string;
  tier: string;
  bgImage: string;
}

export interface CareerTrack {
  id: string;
  title: string;
  shortCode: string;
  category: string;
  description: string;
  iconName: string;
  isFeatured?: boolean;
  trackType?: 'fullstack' | 'frontend' | 'backend' | 'language' | 'ai-systems';
  primaryLanguages: string[];
  frameworks: string[];
  metrics: {
    averageSalary: string;
    marketGrowth: string;
    openRoles: string;
    matchAccuracy: string;
  };
  milestones: MilestoneNode[];
  codeSandbox: {
    language: string;
    filename: string;
    kernelInfo: string;
    initialCode: string;
    optimalSolution: string;
    unitTestExpected: string;
    hints: { id: number; title: string; description: string }[];
    ast: { name: string; type: string; children?: { name: string; type: string }[] }[];
  };
  quizQuestions: QuizQuestion[];
  radarAxes: { axis: string; score: number; benchmark: number }[];
  skillsBreakdown: SkillItem[];
  interviewScenario: {
    questionText: string;
    specialization: string;
    detectedKeywords: string[];
    transcript: string;
    coachTip: string;
  };
  salaryBands: SalaryBand[];
}
