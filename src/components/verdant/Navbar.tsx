import React, { useState, useRef, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  Sparkles, Terminal, Menu, X, ArrowRight, ShieldCheck,
  Compass, BarChart2, User, LogOut, ChevronDown, CheckCircle2
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export const Navbar: React.FC = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  
  const { user, isAuthenticated, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const navItems = [
    { label: 'Overview', path: '/' },
    { label: 'Roadmap', path: '/roadmap' },
    { label: 'Dashboard', path: '/dashboard' },
    { label: 'Assessments', path: '/assess' },
    { label: 'About', path: '/about' },
  ];

  const isActive = (path: string) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setProfileDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    logout();
    setProfileDropdownOpen(false);
    setMobileOpen(false);
    navigate('/login');
  };

  return (
    <header className="fixed top-4 left-0 right-0 z-50 px-4 pointer-events-none">
      <div className="max-w-5xl mx-auto flex items-center justify-between">
        {/* Floating Glass Pill Bar */}
        <div className="w-full glass-pill border border-white/10 px-4 sm:px-6 py-2.5 shadow-[0_12px_40px_rgba(0,0,0,0.7)] flex items-center justify-between pointer-events-auto backdrop-blur-2xl bg-[#090e0a]/80">
          
          {/* Logo Brand */}
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-verdant-lime to-[#a3e635] flex items-center justify-center shadow-[0_0_15px_rgba(198,242,78,0.4)] group-hover:scale-105 transition-transform duration-200">
              <svg className="w-4 h-4 text-[#0A0E0A]" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2L3 9v11h18V9l-9-7zm0 3.84L18 10v8H6v-8l6-4.16z" />
              </svg>
            </div>
            <div className="flex flex-col">
              <span className="font-sans font-bold tracking-widest text-sm text-verdant-text group-hover:text-verdant-lime transition-colors">
                CAREERPILOT
              </span>
              <span className="text-[9px] font-mono tracking-wider text-verdant-lime uppercase -mt-1 font-semibold">
                AI Platform
              </span>
            </div>
          </Link>

          {/* Center Navigation Links (Desktop) */}
          <nav className="hidden md:flex items-center gap-1 bg-white/[0.03] border border-white/[0.05] rounded-full px-3 py-1">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all duration-200 ${
                  isActive(item.path)
                    ? 'bg-verdant-card text-verdant-lime shadow-[0_0_12px_rgba(198,242,78,0.15)] font-semibold border border-verdant-lime/20'
                    : 'text-verdant-muted hover:text-verdant-text hover:bg-white/[0.04]'
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Right Action & Auth State */}
          <div className="hidden sm:flex items-center gap-3">
            {isAuthenticated && user ? (
              /* User is Logged In: Show Avatar + Name + Dropdown */
              <div className="relative" ref={dropdownRef}>
                <button
                  type="button"
                  onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/[0.04] border border-white/10 hover:border-verdant-lime/40 text-verdant-text text-xs transition-all duration-200 focus:outline-none"
                >
                  <div className="w-5 h-5 rounded-full bg-verdant-lime text-[#0A0E0A] flex items-center justify-center font-bold text-[10px] shadow-[0_0_8px_#C6F24E]">
                    {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
                  </div>
                  <span className="font-medium text-xs max-w-[100px] truncate">{user.name || 'Student'}</span>
                  <ChevronDown className="w-3 h-3 text-verdant-muted" />
                </button>

                {/* Profile Dropdown Menu */}
                {profileDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-56 rounded-2xl glass-card border border-white/15 p-2 shadow-2xl backdrop-blur-2xl animate-in fade-in slide-in-from-top-2 duration-150 z-50">
                    <div className="px-3 py-2 border-b border-white/10 mb-1">
                      <p className="text-xs font-bold text-verdant-text truncate">{user.name}</p>
                      <p className="text-[10px] font-mono text-verdant-muted truncate">{user.email}</p>
                      <span className="inline-block mt-1 px-2 py-0.5 rounded-full bg-verdant-lime/10 border border-verdant-lime/20 text-[9px] font-mono text-verdant-lime">
                        {user.role || 'AI Flightpath'}
                      </span>
                    </div>

                    <Link
                      to="/dashboard"
                      onClick={() => setProfileDropdownOpen(false)}
                      className="flex items-center gap-2 px-3 py-2 rounded-xl text-xs text-verdant-muted hover:text-verdant-text hover:bg-white/5 transition-colors"
                    >
                      <BarChart2 className="w-3.5 h-3.5 text-verdant-lime" />
                      <span>My Learning Dashboard</span>
                    </Link>

                    <Link
                      to="/roadmap"
                      onClick={() => setProfileDropdownOpen(false)}
                      className="flex items-center gap-2 px-3 py-2 rounded-xl text-xs text-verdant-muted hover:text-verdant-text hover:bg-white/5 transition-colors"
                    >
                      <Compass className="w-3.5 h-3.5 text-verdant-lime" />
                      <span>Roadmap Studio</span>
                    </Link>

                    <div className="border-t border-white/10 my-1 pt-1">
                      <button
                        type="button"
                        onClick={handleLogout}
                        className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-xs text-red-400 hover:bg-red-500/10 transition-colors text-left"
                      >
                        <LogOut className="w-3.5 h-3.5" />
                        <span>Sign Out</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              /* User is Logged Out / Guest: Show Login + Get Started */
              <>
                <Link
                  to="/login"
                  className="text-xs text-verdant-muted hover:text-verdant-text font-medium px-3 py-1.5 transition-colors"
                >
                  Log in
                </Link>

                <Link
                  to="/roadmap"
                  className="group relative inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-verdant-lime hover:bg-verdant-lime-hover text-[#0A0E0A] font-medium text-xs shadow-[0_0_20px_rgba(198,242,78,0.4)] hover:shadow-[0_0_28px_rgba(198,242,78,0.6)] transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0"
                >
                  <span>Get Started</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-2 rounded-full text-verdant-muted hover:text-verdant-lime hover:bg-white/[0.05] transition-colors"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Mobile Dropdown Panel */}
        {mobileOpen && (
          <div className="md:hidden absolute top-16 left-4 right-4 glass-card border border-white/10 p-4 rounded-3xl shadow-2xl pointer-events-auto backdrop-blur-3xl animate-in fade-in slide-in-from-top-4 duration-200">
            <div className="flex flex-col gap-2">
              {/* Authenticated user status in mobile drawer */}
              {isAuthenticated && user && (
                <div className="p-3 rounded-2xl bg-white/[0.03] border border-white/10 mb-2 flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-full bg-verdant-lime text-[#0A0E0A] flex items-center justify-center font-bold text-xs">
                      {user.name.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <div className="text-xs font-bold text-verdant-text">{user.name}</div>
                      <div className="text-[10px] font-mono text-verdant-muted">{user.email}</div>
                    </div>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="p-1.5 rounded-lg text-red-400 hover:bg-red-500/10 text-xs"
                    title="Sign Out"
                  >
                    <LogOut className="w-4 h-4" />
                  </button>
                </div>
              )}

              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setMobileOpen(false)}
                  className={`px-4 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                    isActive(item.path)
                      ? 'bg-verdant-lime/10 text-verdant-lime border border-verdant-lime/20 font-semibold'
                      : 'text-verdant-muted hover:text-verdant-text hover:bg-white/[0.05]'
                  }`}
                >
                  {item.label}
                </Link>
              ))}

              <div className="pt-3 border-t border-white/10 flex flex-col gap-2">
                {!isAuthenticated ? (
                  <>
                    <Link
                      to="/login"
                      onClick={() => setMobileOpen(false)}
                      className="w-full py-2.5 rounded-xl glass-card border border-white/10 text-center text-xs font-medium text-verdant-text"
                    >
                      Log In to Student Workspace
                    </Link>
                    <Link
                      to="/roadmap"
                      onClick={() => setMobileOpen(false)}
                      className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-verdant-lime text-[#0A0E0A] font-semibold text-sm shadow-[0_0_15px_rgba(198,242,78,0.4)]"
                    >
                      <span>Launch Roadmap Studio</span>
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </>
                ) : (
                  <Link
                    to="/dashboard"
                    onClick={() => setMobileOpen(false)}
                    className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-verdant-lime text-[#0A0E0A] font-semibold text-sm shadow-[0_0_15px_rgba(198,242,78,0.4)]"
                  >
                    <span>Go to Dashboard</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
