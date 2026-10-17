import React, { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { Sparkles, ArrowRight, UserCheck, Lock, Mail, User, ShieldCheck, ArrowLeft } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('alex.morgan@careerpilot.ai');
  const [password, setPassword] = useState('password123');
  const [name, setName] = useState('Alex Morgan');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = (location.state as any)?.from?.pathname || '/dashboard';

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const ok = await login(email, password, name);
      if (ok) {
        navigate(from, { replace: true });
      } else {
        setError('Invalid credentials or authentication failure.');
      }
    } catch (err: any) {
      setError(err.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  const handleQuickDemo = async () => {
    setLoading(true);
    try {
      await login('alex.morgan@careerpilot.ai', 'secret123', 'Alex Morgan');
      navigate('/dashboard', { replace: true });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen bg-verdant-bg text-verdant-text flex items-center justify-center px-4 py-24 selection:bg-verdant-lime selection:text-[#0A0E0A]">
      {/* Background Ambience */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-verdant-lime/15 rounded-full blur-[140px]" />
      </div>

      <div className="relative z-10 w-full max-w-md">
        
        {/* Back Link */}
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-xs font-mono text-verdant-muted hover:text-verdant-lime transition-colors mb-6"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Return to Homepage</span>
        </Link>

        {/* Login Card */}
        <div className="glass-card rounded-3xl p-8 border border-white/10 shadow-2xl backdrop-blur-3xl relative overflow-hidden bg-gradient-to-b from-[#0d160e]/95 to-[#070b07]/95">
          
          <div className="text-center mb-6">
            <div className="w-12 h-12 rounded-2xl bg-verdant-lime/10 border border-verdant-lime/30 flex items-center justify-center text-verdant-lime mx-auto mb-3 shadow-[0_0_15px_rgba(198,242,78,0.2)]">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-verdant-text">
              Student <span className="font-serif italic font-normal text-verdant-lime">Portal</span>
            </h1>
            <p className="text-verdant-muted text-xs mt-1">
              Sign in to manage your career roadmaps and verified test telemetry.
            </p>
          </div>

          {/* Quick Demo Login Pill */}
          <button
            type="button"
            onClick={handleQuickDemo}
            disabled={loading}
            className="w-full mb-6 py-2.5 px-4 rounded-xl bg-white/[0.04] border border-verdant-lime/30 hover:border-verdant-lime text-xs font-mono text-verdant-text hover:text-verdant-lime flex items-center justify-center gap-2 transition-all group"
          >
            <UserCheck className="w-3.5 h-3.5 text-verdant-lime" />
            <span>Fast Sign-in: Alex Morgan (Demo Student)</span>
          </button>

          <div className="relative flex py-2 items-center mb-6">
            <div className="flex-grow border-t border-white/10"></div>
            <span className="flex-shrink mx-3 text-[10px] font-mono uppercase text-verdant-muted/70">Or Sign In with Credentials</span>
            <div className="flex-grow border-t border-white/10"></div>
          </div>

          {error && (
            <div className="mb-4 p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-xs text-red-300">
              {error}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleLogin} className="flex flex-col gap-4">
            <div>
              <label className="block text-[11px] font-mono uppercase tracking-wider text-verdant-muted mb-1.5">
                Full Name
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-verdant-muted absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Alex Morgan"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-black/40 border border-white/10 text-xs text-verdant-text placeholder:text-verdant-muted/40 focus:border-verdant-lime focus:outline-none transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-mono uppercase tracking-wider text-verdant-muted mb-1.5">
                Email Address
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-verdant-muted absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="alex.morgan@careerpilot.ai"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-black/40 border border-white/10 text-xs text-verdant-text placeholder:text-verdant-muted/40 focus:border-verdant-lime focus:outline-none transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-mono uppercase tracking-wider text-verdant-muted mb-1.5">
                Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-verdant-muted absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-black/40 border border-white/10 text-xs text-verdant-text placeholder:text-verdant-muted/40 focus:border-verdant-lime focus:outline-none transition-colors"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="mt-2 w-full py-3 rounded-full bg-verdant-lime hover:bg-verdant-lime-hover text-[#0A0E0A] font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(198,242,78,0.4)] transition-all hover:scale-105 active:scale-95 disabled:opacity-50"
            >
              <span>{loading ? 'Authenticating...' : 'Sign In to Workspace'}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </form>

        </div>
      </div>
    </div>
  );
};
