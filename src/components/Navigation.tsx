import React from 'react';
import { NavTab, AppTheme } from '../types';
import { 
  Compass, 
  Map, 
  FileText, 
  Cpu, 
  Mic, 
  DollarSign, 
  Palette, 
  Bell, 
  Smartphone, 
  Monitor, 
  Sparkles,
  ChevronDown
} from 'lucide-react';

interface NavigationProps {
  currentTab: NavTab;
  onTabChange: (tab: NavTab) => void;
  theme: AppTheme;
  onThemeChange: (theme: AppTheme) => void;
  themes: { id: AppTheme; label: string; tag: string; description: string }[];
  isMobilePreview: boolean;
  onToggleMobilePreview: () => void;
  targetRole: string;
}

export const Navigation: React.FC<NavigationProps> = ({
  currentTab,
  onTabChange,
  theme,
  onThemeChange,
  themes,
  isMobilePreview,
  onToggleMobilePreview,
  targetRole
}) => {
  const [showThemeMenu, setShowThemeMenu] = React.useState(false);

  const navItems = [
    { id: 'home' as NavTab, label: 'Home', icon: Compass },
    { id: 'roadmap' as NavTab, label: 'Roadmap', icon: Map },
    { id: 'resume' as NavTab, label: 'Resume', icon: FileText },
    { id: 'skills' as NavTab, label: 'Skills', icon: Cpu },
    { id: 'interview' as NavTab, label: 'Interview', icon: Mic },
    { id: 'salary' as NavTab, label: 'Salary', icon: DollarSign },
  ];

  return (
    <>
      {/* Top Proximity Floating Navigation Bar */}
      <header className="sticky top-0 inset-x-0 z-50 glass-panel border-b border-border transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
          
          {/* Brand Logo & Telemetry Indicator */}
          <div className="flex items-center gap-3">
            <div 
              onClick={() => onTabChange('home')}
              className="flex items-center gap-2 cursor-pointer group"
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-500 via-emerald-600 to-teal-700 flex items-center justify-center p-1.5 shadow-[0_4px_14px_rgba(16,185,129,0.35)] group-hover:scale-105 transition-transform border border-emerald-400/40">
                <img 
                  src="/logo-white.png" 
                  alt="CareerPilot AI Symbol" 
                  className="w-full h-full object-contain filter drop-shadow-sm"
                />
              </div>
              <div className="flex flex-col">
                <span className="font-display font-extrabold tracking-tight text-lg text-on-surface flex items-center gap-1.5">
                  CarrierPilot <span className="text-emerald-600 text-xs font-mono font-semibold px-2 py-0.5 rounded-full bg-emerald-50 border border-emerald-200">AI Horizon</span>
                </span>
                <span className="text-[10px] font-mono text-on-surface-variant hidden sm:inline-block">
                  EMERALD TELEMETRY • {targetRole}
                </span>
              </div>
            </div>
          </div>

          {/* Desktop Middle Navigation Dock */}
          <nav className="hidden md:flex items-center gap-1 p-1 rounded-full bg-surface-sub/90 border border-border backdrop-blur-md">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => onTabChange(item.id)}
                  className={`px-4 py-1.5 rounded-full text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                    isActive
                      ? 'bg-gradient-to-r from-emerald-500 to-teal-700 text-white shadow-[0_4px_14px_rgba(16,185,129,0.35)]'
                      : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-high'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Right Action Controls: Theme Switcher, Mobile Toggle, Notifications */}
          <div className="flex items-center gap-2">
            
            {/* Viewport Frame Toggle (Desktop vs 390px Mobile Viewport) */}
            <button
              onClick={onToggleMobilePreview}
              title={isMobilePreview ? "Switch to Full Desktop View" : "Toggle 390px Mobile Viewport Preview"}
              className={`p-2 rounded-xl border transition-all flex items-center gap-1 text-xs font-mono cursor-pointer ${
                isMobilePreview 
                  ? 'bg-emerald-50 text-emerald-700 border-emerald-300 shadow-[0_0_12px_rgba(16,185,129,0.2)]' 
                  : 'bg-surface-sub text-on-surface-variant hover:text-on-surface border-border'
              }`}
            >
              {isMobilePreview ? (
                <>
                  <Smartphone className="w-4 h-4 text-emerald-600" />
                  <span className="hidden sm:inline">390px Mobile</span>
                </>
              ) : (
                <>
                  <Monitor className="w-4 h-4" />
                  <span className="hidden sm:inline">Desktop</span>
                </>
              )}
            </button>

            {/* Dynamic Multi-Theme Switcher Button */}
            <div className="relative">
              <button
                onClick={() => setShowThemeMenu(!showThemeMenu)}
                className="px-2.5 py-1.5 rounded-xl bg-surface-sub text-on-surface hover:bg-surface-high border border-border flex items-center gap-1.5 text-xs font-mono transition-all cursor-pointer"
                title="Switch Visual Design System Theme"
              >
                <Palette className="w-3.5 h-3.5 text-emerald-600" />
                <span className="hidden lg:inline capitalize">{theme}</span>
                <ChevronDown className="w-3 h-3 text-on-surface-variant" />
              </button>

              {/* Theme Dropdown Menu */}
              {showThemeMenu && (
                <div className="absolute right-0 mt-2 w-64 rounded-2xl glass-panel p-2 shadow-2xl border border-border z-50 animate-fadeIn">
                  <div className="px-3 py-1.5 border-b border-border/50 mb-1">
                    <span className="text-[11px] font-mono text-on-surface-variant uppercase tracking-wider font-bold">
                      Design System Tokens
                    </span>
                  </div>
                  {themes.map((t) => (
                    <button
                      key={t.id}
                      onClick={() => {
                        onThemeChange(t.id);
                        setShowThemeMenu(false);
                      }}
                      className={`w-full text-left p-2.5 rounded-xl transition-all flex flex-col gap-0.5 cursor-pointer ${
                        theme === t.id
                          ? 'bg-emerald-50 border border-emerald-300 text-emerald-900'
                          : 'hover:bg-surface-high text-on-surface-variant hover:text-on-surface'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-on-surface">{t.label}</span>
                        <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-surface-highest text-emerald-700 font-semibold">
                          {t.tag}
                        </span>
                      </div>
                      <span className="text-[11px] opacity-75 leading-tight">{t.description}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Notification Bell with Ping */}
            <button 
              onClick={() => onTabChange('home')}
              className="p-2 rounded-xl bg-surface-sub text-on-surface-variant hover:text-on-surface border border-border relative transition-colors cursor-pointer"
              title="Telemetry Alerts"
            >
              <Bell className="w-4 h-4" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-emerald-500" />
            </button>

            {/* User Avatar */}
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-emerald-600 to-teal-800 flex items-center justify-center text-white text-xs font-bold ring-2 ring-emerald-200 shadow-sm">
              AI
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Shell Fixed 5-Tab Sticky Bottom Navigation Bar */}
      <nav className="fixed bottom-0 inset-x-0 z-50 glass-panel border-t border-border md:hidden pb-safe shadow-card-3d">
        <div className="flex justify-around items-center h-16 px-2">
          {navItems.slice(0, 5).map((item) => {
            const Icon = item.icon;
            const isActive = currentTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onTabChange(item.id)}
                className={`flex flex-col items-center justify-center gap-1 w-14 h-12 rounded-xl transition-all cursor-pointer ${
                  isActive
                    ? 'text-emerald-700 bg-emerald-50 border border-emerald-300 shadow-[0_0_12px_rgba(16,185,129,0.25)] font-bold'
                    : 'text-on-surface-variant hover:text-on-surface'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span className="text-[10px] font-bold tracking-tight uppercase">
                  {item.label}
                </span>
              </button>
            );
          })}
        </div>
      </nav>
    </>
  );
};
