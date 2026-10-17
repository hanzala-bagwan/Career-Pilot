/**
 * CareerPilot AI — Client API Service
 * Connects React frontend directly to the FastAPI backend bridge (:8000).
 */

const API_BASE = 'http://localhost:8000/api';

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role?: string;
}

export interface W3SchoolsResource {
  topic: string;
  title: string;
  url: string;
  verified: boolean;
}

export interface Submodule {
  id: string;
  module_id: string;
  title: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  order: number;
  status: 'passed' | 'in_progress' | 'locked';
  score: number | null;
  has_coding_challenge: boolean;
  coding_challenge_count?: number;
  test_scope?: string;
  topics: string[];
  w3schools_links?: W3SchoolsResource[];
  what_you_will_learn?: string[];
}

export interface FinalExamMeta {
  module_id: string;
  title: string;
  status: 'locked' | 'unlocked' | 'passed' | 'needs_improvement' | 'failed';
  unlocked: boolean;
  score: number | null;
  question_count: number;
  duration_minutes: number;
}

export interface ModuleOverviewData {
  module: {
    id: string;
    name: string;
    status: 'completed' | 'in_progress' | 'locked';
    score: number | null;
    topics: string[];
    description: string;
  };
  submodules: Submodule[];
  submodules_passed: number;
  submodules_total: number;
  final_exam: FinalExamMeta;
}

export interface SubmoduleTestData {
  module_id: string;
  module_name: string;
  submodule_id: string;
  submodule_title: string;
  difficulty: string;
  test_scope: string;
  has_coding_challenge: boolean;
  mcqs: Array<{
    id: string;
    topic: string;
    question: string;
    options: Record<string, string>;
  }>;
  conceptual_question?: {
    title: string;
    prompt: string;
    sample_answer: string;
  };
  coding_challenge?: {
    id: string;
    title: string;
    topic: string;
    description: string;
    function_name: string;
    starter_code: string;
    test_cases: Array<{
      input: any;
      expected: any;
    }>;
  };
}

export interface AssessmentData {
  module_id: string;
  module_name: string;
  role?: string;
  description: string;
  topics: string[];
  duration_minutes?: number;
  mcqs: Array<{
    id: string;
    topic: string;
    question: string;
    options: Record<string, string>;
    correct_option?: string;
    explanation?: string;
  }>;
  conceptual_question?: {
    title: string;
    prompt: string;
    sample_answer: string;
  };
  coding_challenge?: {
    id: string;
    title: string;
    topic: string;
    description: string;
    function_name: string;
    starter_code: string;
    test_cases: Array<{
      input: any;
      expected: any;
    }>;
  };
}

export interface FinalExamData {
  module_id: string;
  module_name: string;
  variant_id: string;
  title: string;
  subtitle: string;
  question_count: number;
  passing_percentage: number;
  duration_minutes: number;
  mcqs: Array<{
    id: string;
    topic: string;
    question: string;
    options: Record<string, string>;
  }>;
  conceptual_questions: Array<{
    id: string;
    title: string;
    prompt: string;
    sample_answer: string;
  }>;
  coding_challenges: Array<{
    id: string;
    title: string;
    topic: string;
    description: string;
    function_name: string;
    starter_code: string;
    test_cases: Array<{
      input: any;
      expected: any;
    }>;
  }>;
}

export interface StudentStats {
  percentage: number;
  completed: number;
  remaining: number;
  in_progress: number;
  needs_revision: number;
  total: number;
  submodules_passed?: number;
  submodules_total?: number;
  student_name: string;
  target_role: string;
  learning_objective: string;
  learning_streak_days: number;
  total_paths_enrolled: number;
  pending_assessments_count: number;
  assessment_average: number;
  recommended_next_activity: {
    title: string;
    description: string;
    type: string;
    module_id: string;
    submodule_id?: string;
    cta_label: string;
  };
  skills_mastered_count: number;
  skills_to_improve_count: number;
}

export interface RoadmapModule {
  id: string;
  name: string;
  topics: string[];
  status: 'completed' | 'in_progress' | 'needs_revision' | 'locked';
  score: number | null;
  attempts: number;
  submodules_passed?: number;
  submodules_total?: number;
  status_label?: string;
  final_exam?: FinalExamMeta;
  submodules?: Submodule[];
}

export interface DashboardData {
  stats: StudentStats;
  modules: RoadmapModule[];
  recently_accessed_subjects: Array<{
    id: string;
    name: string;
    category: string;
    progress_pct: number;
    last_accessed: string;
    status: string;
  }>;
  progress_history: Array<{
    label: string;
    date: string;
    progress: number;
    score: number;
  }>;
  topic_scores: Record<string, number>;
  skills_mastered: string[];
  skills_to_improve: string[];
  recommendations: Array<{
    topic: string;
    reason: string;
    action: string;
  }>;
  assessment_history: Array<{
    timestamp: string;
    type?: string;
    module_id: string;
    submodule_id?: string;
    module_name: string;
    score: number;
    status: string;
    mcq_score: number;
    coding_score: number;
    strengths: string[];
    weaknesses: string[];
  }>;
}

export interface EvaluationResult {
  score: number;
  status: 'Pass' | 'Needs Improvement' | 'Fail';
  assessment_type?: 'submodule_test' | 'final_exam' | 'module_test';
  mcq_percentage: number;
  code_percentage: number;
  code_eval?: {
    success: boolean;
    error: string | null;
    passed_tests: number;
    total_tests: number;
    test_results: Array<{
      test_num: number;
      input: string;
      expected: string;
      actual: string;
      passed: boolean;
      error: string | null;
    }>;
  };
  coding_results?: Array<{
    challenge_id: string;
    title: string;
    result: {
      success: boolean;
      passed_tests: number;
      total_tests: number;
      test_results: any[];
    };
  }>;
  mcq_breakdown: Array<{
    id: string;
    question: string;
    user_choice: string;
    correct_option: string;
    is_correct: boolean;
    explanation: string;
  }>;
  strengths: string[];
  weaknesses: string[];
  unlocked_next_module?: string | null;
  unlocked_next_sub_id?: string | null;
  unlocked_final_exam?: boolean;
  recommendations: Array<{
    topic: string;
    reason: string;
    action: string;
  }>;
}

export const api = {
  // ── Health Check ──
  async getHealth() {
    try {
      const res = await fetch(`${API_BASE}/health`);
      return await res.json();
    } catch {
      return { status: 'offline' };
    }
  },

  // ── Authentication ──
  async login(email: string, password?: string, name?: string): Promise<{ success: boolean; token: string; user: User }> {
    const res = await fetch(`${API_BASE}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password: password || 'password', name }),
    });
    if (!res.ok) throw new Error('Login failed');
    return await res.json();
  },

  async getCurrentUser(): Promise<User> {
    const res = await fetch(`${API_BASE}/auth/me`);
    if (!res.ok) throw new Error('Failed to fetch user session');
    return await res.json();
  },

  // ── Dashboard ──
  async getDashboard(): Promise<DashboardData> {
    const res = await fetch(`${API_BASE}/dashboard`);
    if (!res.ok) throw new Error('Failed to load dashboard data');
    return await res.json();
  },

  // ── Roadmap ──
  async generateRoadmap(skills: string[], role: string, months: number) {
    const res = await fetch(`${API_BASE}/roadmap`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ skills, role, months }),
    });
    if (!res.ok) throw new Error('Failed to generate roadmap');
    return await res.json();
  },

  async getCurrentRoadmap() {
    const res = await fetch(`${API_BASE}/roadmap`);
    if (!res.ok) throw new Error('Failed to load current roadmap');
    return await res.json();
  },

  // ── Module & Submodules ──
  async getModuleOverview(moduleId: string): Promise<ModuleOverviewData> {
    const res = await fetch(`${API_BASE}/module/${moduleId}`);
    if (!res.ok) throw new Error(`Failed to load module ${moduleId}`);
    return await res.json();
  },

  async getSubmoduleDetail(moduleId: string, subId: string): Promise<Submodule> {
    const res = await fetch(`${API_BASE}/module/${moduleId}/submodule/${subId}`);
    if (!res.ok) throw new Error(`Failed to load submodule ${subId}`);
    return await res.json();
  },

  async getSubmoduleTest(moduleId: string, subId: string): Promise<SubmoduleTestData> {
    const res = await fetch(`${API_BASE}/module/${moduleId}/submodule/${subId}/test`);
    if (!res.ok) throw new Error(`Failed to load submodule test for ${subId}`);
    return await res.json();
  },

  async evaluateSubmodule(
    moduleId: string,
    subId: string,
    mcqAnswers: Record<string, string>,
    codingSolution: string
  ): Promise<{ success: boolean; attempt: EvaluationResult; updated_progress: StudentStats }> {
    const res = await fetch(`${API_BASE}/module/${moduleId}/submodule/${subId}/evaluate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        module_id: moduleId,
        sub_id: subId,
        mcq_answers: mcqAnswers,
        coding_solution: codingSolution,
      }),
    });
    if (!res.ok) throw new Error('Submodule evaluation failed');
    return await res.json();
  },

  // ── Module Final Exam ──
  async getFinalExam(moduleId: string, variant: string = 'variant_a'): Promise<FinalExamData> {
    const res = await fetch(`${API_BASE}/module/${moduleId}/final-exam?variant=${variant}`);
    if (!res.ok) throw new Error(`Failed to load final exam for ${moduleId}`);
    return await res.json();
  },

  async evaluateFinalExam(
    moduleId: string,
    variantId: string,
    mcqAnswers: Record<string, string>,
    codingSolutions: Record<string, string>
  ): Promise<{ success: boolean; attempt: EvaluationResult; updated_progress: StudentStats }> {
    const res = await fetch(`${API_BASE}/module/${moduleId}/final-exam/evaluate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        module_id: moduleId,
        variant_id: variantId,
        mcq_answers: mcqAnswers,
        coding_solutions: codingSolutions,
      }),
    });
    if (!res.ok) throw new Error('Final exam evaluation failed');
    return await res.json();
  },

  // ── Code Execution Sandbox ──
  async testCode(code: string, testCases: any[], functionName: string) {
    const res = await fetch(`${API_BASE}/assessments/test-code`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        code,
        test_cases: testCases,
        function_name: functionName,
      }),
    });
    if (!res.ok) throw new Error('Code testing failed');
    return await res.json();
  },

  // ── Legacy Compatibility Wrappers ──
  async getAssessment(moduleId: string) {
    const res = await fetch(`${API_BASE}/assessments/${moduleId}`);
    if (!res.ok) throw new Error('Failed to load assessment');
    return await res.json();
  },

  async submitAssessment(moduleId: string, mcqAnswers: Record<string, string>, codingSolution: string) {
    const res = await fetch(`${API_BASE}/evaluate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        module_id: moduleId,
        mcq_answers: mcqAnswers,
        coding_solution: codingSolution,
      }),
    });
    if (!res.ok) throw new Error('Failed to evaluate assessment');
    return await res.json();
  },

  async createRoadmap(params: { role: string; months: number; skills: string[] }) {
    return this.generateRoadmap(params.skills, params.role, params.months);
  },

  async testCodeExecution(params: { code: string; test_cases: any[]; function_name: string }) {
    return this.testCode(params.code, params.test_cases, params.function_name);
  },

  async evaluateAssessment(params: { module_id: string; mcq_answers: Record<string, string>; coding_solution: string }) {
    return this.submitAssessment(params.module_id, params.mcq_answers, params.coding_solution);
  },

  async getRecommendations() {
    const res = await fetch(`${API_BASE}/recommendations`);
    if (!res.ok) throw new Error('Failed to load recommendations');
    return await res.json();
  },

  async updateProgress(payload: {
    student_name?: string;
    target_role?: string;
    selected_timeline_months?: number;
    current_skills?: string[];
  }) {
    const res = await fetch(`${API_BASE}/progress`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    if (!res.ok) throw new Error('Failed to update progress');
    return await res.json();
  },
};
