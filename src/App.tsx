import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Navbar } from './components/verdant/Navbar';
import { AuthProvider } from './context/AuthContext';
import { LoginPage } from './pages/LoginPage';
import { ModuleOverviewPage } from './pages/ModuleOverviewPage';
import { SubmoduleLearningPage } from './pages/SubmoduleLearningPage';
import { SubmoduleTestPage } from './pages/SubmoduleTestPage';
import { FinalExamPage } from './pages/FinalExamPage';
import { LandingPage } from './pages/LandingPage';
import { DashboardPage } from './pages/DashboardPage';
import { RoadmapStudioPage } from './pages/RoadmapStudioPage';
import { AssessmentCenterPage } from './pages/AssessmentCenterPage';
import { ResultsPage } from './pages/ResultsPage';
import { AboutPage } from './pages/AboutPage';

export const App: React.FC = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <div className="min-h-screen bg-verdant-bg text-verdant-text font-sans flex flex-col selection:bg-verdant-lime selection:text-[#0A0E0A]">
          {/* Floating Glass Navbar */}
          <Navbar />

          {/* Dynamic Route Pages */}
          <main className="flex-1 w-full">
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/dashboard" element={<DashboardPage />} />
              <Route path="/roadmap" element={<RoadmapStudioPage />} />
              <Route path="/roadmap/:id" element={<RoadmapStudioPage />} />
              <Route path="/module/:moduleId" element={<ModuleOverviewPage />} />
              <Route path="/module/:moduleId/submodule/:subId" element={<SubmoduleLearningPage />} />
              <Route path="/module/:moduleId/submodule/:subId/test" element={<SubmoduleTestPage />} />
              <Route path="/module/:moduleId/final-exam" element={<FinalExamPage />} />
              <Route path="/assess" element={<AssessmentCenterPage />} />
              <Route path="/assess/:moduleId" element={<AssessmentCenterPage />} />
              <Route path="/results/:attemptId" element={<ResultsPage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </main>

        {/* CareerPilot Global Glass Footer */}
        <footer className="border-t border-white/5 py-8 px-4 text-xs font-mono text-verdant-muted bg-[#060906]/80 backdrop-blur-xl">
          <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2.5">
              <div className="w-5 h-5 rounded-full bg-verdant-lime flex items-center justify-center text-[#0A0E0A] font-bold text-[10px]">
                CP
              </div>
              <span className="text-verdant-text font-semibold">
                CareerPilot AI <span className="font-normal text-verdant-muted">• AI-Powered IT Learning & Career Development Platform v2.5.0</span>
              </span>
            </div>

            <div className="flex items-center gap-6 text-[11px]">
              <span className="flex items-center gap-1.5 text-verdant-lime">
                <span className="w-2 h-2 rounded-full bg-verdant-lime animate-pulse" />
                Gemini 3.5 Engine Active
              </span>
              <span>FastAPI Bridge :8000</span>
              <span>Python 3 Test Sandbox</span>
            </div>

            <div className="text-[11px] text-verdant-muted/70">
              © {new Date().getFullYear()} CareerPilot AI. Autonomous flightpath telemetry.
            </div>
          </div>
        </footer>
      </div>
    </BrowserRouter>
  </AuthProvider>
  );
};

export default App;
