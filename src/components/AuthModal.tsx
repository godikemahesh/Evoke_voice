import React, { useState, useEffect } from 'react';
import { X, ShieldCheck, Mail, Phone, Lock, Sparkles, User as UserIcon, ArrowRight, Eye, EyeOff, CheckCircle2 } from 'lucide-react';
import { User } from '../types';
import { EvokeLogo } from './EvokeLogo';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: (user: User) => void;
  initialMode?: 'login' | 'register';
}

export const AuthModal: React.FC<Props> = ({
  isOpen,
  onClose,
  onLoginSuccess,
  initialMode = 'register',
}) => {
  const [authMode, setAuthMode] = useState<'login' | 'register'>(initialMode);
  const [method, setMethod] = useState<'google' | 'email' | 'mobile'>('email');

  // Sync authMode when modal opens with initialMode
  useEffect(() => {
    if (isOpen) {
      setAuthMode(initialMode);
      setErrorMsg('');
    }
  }, [isOpen, initialMode]);

  // Form states
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('mahesh@example.com');
  const [password, setPassword] = useState('••••••••');
  const [phone, setPhone] = useState('+1 (555) 234-5678');
  const [showPassword, setShowPassword] = useState(false);
  const [agreedTerms, setAgreedTerms] = useState(true);
  const [rememberMe, setRememberMe] = useState(true);
  const [errorMsg, setErrorMsg] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (authMode === 'register' && !agreedTerms) {
      setErrorMsg('Please accept the terms and conditions to create an account.');
      return;
    }

    const name = fullName.trim() || (email ? email.split('@')[0] : 'Mahesh Kumar');
    const userObj: User = {
      id: `usr-${Date.now()}`,
      name: name.charAt(0).toUpperCase() + name.slice(1),
      email: email || 'mahesh@example.com',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=200',
      isLoggedIn: true,
    };

    onLoginSuccess(userObj);
    onClose();
  };

  const handleQuickGoogle = () => {
    const userObj: User = {
      id: `usr-google-${Date.now()}`,
      name: 'Mahesh Kumar',
      email: 'mahesh.google@gmail.com',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=200',
      isLoggedIn: true,
    };
    onLoginSuccess(userObj);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-2xl animate-in fade-in duration-200">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 max-w-md w-full text-white shadow-2xl relative space-y-6 max-h-[90vh] overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full hover:bg-slate-800 text-slate-400 hover:text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Brand Header */}
        <div className="text-center space-y-2">
          <div className="flex justify-center mb-2">
            <EvokeLogo size="lg" showText={true} className="justify-center" />
          </div>
          <h2 className="text-xl font-bold text-white tracking-tight">
            {authMode === 'register' ? 'Create Your Account' : 'Welcome Back'}
          </h2>
          <p className="text-xs text-slate-400">
            {authMode === 'register'
              ? 'Register in 30 seconds to schedule your midnight voice call surprise'
              : 'Sign in to access your booked surprises & video gifts'}
          </p>
        </div>

        {/* Primary Auth Mode Toggle (Sign In vs Register) */}
        <div className="flex rounded-2xl bg-slate-950 p-1.5 border border-slate-800 text-xs font-bold">
          <button
            onClick={() => {
              setAuthMode('register');
              setErrorMsg('');
            }}
            className={`flex-1 py-2.5 rounded-xl transition-all ${
              authMode === 'register'
                ? 'bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 text-slate-950 font-bold shadow-lg shadow-amber-500/20'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Create Account
          </button>
          <button
            onClick={() => {
              setAuthMode('login');
              setErrorMsg('');
            }}
            className={`flex-1 py-2.5 rounded-xl transition-all ${
              authMode === 'login'
                ? 'bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 text-slate-950 font-bold shadow-lg shadow-amber-500/20'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Sign In
          </button>
        </div>

        {/* Method Toggle (Email vs Phone vs Google) */}
        <div className="flex rounded-xl bg-slate-950 p-1 border border-slate-800/80 text-[11px] font-semibold">
          <button
            onClick={() => setMethod('email')}
            className={`flex-1 py-1.5 rounded-lg transition-all flex items-center justify-center gap-1.5 ${
              method === 'email' ? 'bg-slate-800 text-indigo-300' : 'text-slate-400 hover:text-white'
            }`}
          >
            <Mail className="w-3.5 h-3.5" />
            <span>Email</span>
          </button>
          <button
            onClick={() => setMethod('mobile')}
            className={`flex-1 py-1.5 rounded-lg transition-all flex items-center justify-center gap-1.5 ${
              method === 'mobile' ? 'bg-slate-800 text-indigo-300' : 'text-slate-400 hover:text-white'
            }`}
          >
            <Phone className="w-3.5 h-3.5" />
            <span>Mobile OTP</span>
          </button>
          <button
            onClick={() => setMethod('google')}
            className={`flex-1 py-1.5 rounded-lg transition-all flex items-center justify-center gap-1.5 ${
              method === 'google' ? 'bg-slate-800 text-indigo-300' : 'text-slate-400 hover:text-white'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>Google</span>
          </button>
        </div>

        {errorMsg && (
          <div className="p-3 rounded-xl bg-rose-950/80 border border-rose-500/50 text-rose-300 text-xs font-semibold text-center">
            {errorMsg}
          </div>
        )}

        {/* Method Forms */}
        {method === 'google' ? (
          <div className="space-y-4 pt-2">
            <button
              onClick={handleQuickGoogle}
              className="w-full py-3.5 rounded-2xl bg-white hover:bg-slate-100 text-slate-900 font-bold text-sm shadow-xl flex items-center justify-center gap-3 transition-all hover:scale-[1.02]"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17z"
                />
                <path
                  fill="#34A853"
                  d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.29v3.15C3.26 21.3 7.34 24 12 24z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.29C.47 8.21 0 10.05 0 12s.47 3.79 1.29 5.42l3.99-3.15z"
                />
                <path
                  fill="#EA4335"
                  d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.34 0 3.26 2.7 1.29 6.58l3.99 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
                />
              </svg>
              <span>{authMode === 'register' ? 'Sign Up with Google' : 'Sign In with Google'}</span>
            </button>
            <p className="text-[11px] text-slate-500 text-center">
              One-click secure OAuth sign-in powered by Evoke
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 pt-1">
            {/* Full Name input for registration */}
            {authMode === 'register' && (
              <div>
                <label className="text-xs text-slate-400 font-semibold block mb-1">Full Name</label>
                <div className="relative flex items-center">
                  <UserIcon className="w-4 h-4 text-slate-500 absolute left-3.5" />
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="e.g. Mahesh Kumar"
                    className="w-full pl-10 pr-4 py-3 rounded-2xl bg-slate-950 border border-slate-800 text-white text-xs focus:outline-none focus:border-indigo-500"
                  />
                </div>
              </div>
            )}

            {/* Email / Mobile input */}
            {method === 'email' ? (
              <div>
                <label className="text-xs text-slate-400 font-semibold block mb-1">Email Address</label>
                <div className="relative flex items-center">
                  <Mail className="w-4 h-4 text-slate-500 absolute left-3.5" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your.email@example.com"
                    className="w-full pl-10 pr-4 py-3 rounded-2xl bg-slate-950 border border-slate-800 text-white text-xs focus:outline-none focus:border-indigo-500"
                  />
                </div>
              </div>
            ) : (
              <div>
                <label className="text-xs text-slate-400 font-semibold block mb-1">Mobile Phone Number</label>
                <div className="relative flex items-center">
                  <Phone className="w-4 h-4 text-slate-500 absolute left-3.5" />
                  <input
                    type="text"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+1 (555) 234-5678"
                    className="w-full pl-10 pr-4 py-3 rounded-2xl bg-slate-950 border border-slate-800 text-white text-xs focus:outline-none focus:border-indigo-500"
                  />
                </div>
              </div>
            )}

            {/* Password input */}
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="text-xs text-slate-400 font-semibold">Password</label>
                {authMode === 'login' && (
                  <button
                    type="button"
                    onClick={() => alert('Password reset link sent to ' + email)}
                    className="text-[11px] text-indigo-400 hover:underline"
                  >
                    Forgot Password?
                  </button>
                )}
              </div>
              <div className="relative flex items-center">
                <Lock className="w-4 h-4 text-slate-500 absolute left-3.5" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-10 py-3 rounded-2xl bg-slate-950 border border-slate-800 text-white text-xs focus:outline-none focus:border-indigo-500"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 text-slate-500 hover:text-slate-300"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Checkboxes */}
            {authMode === 'register' ? (
              <label className="flex items-start gap-2.5 text-xs text-slate-400 cursor-pointer pt-1">
                <input
                  type="checkbox"
                  checked={agreedTerms}
                  onChange={(e) => setAgreedTerms(e.target.checked)}
                  className="mt-0.5 w-4 h-4 accent-indigo-600 rounded cursor-pointer"
                />
                <span>
                  I agree to Evoke&apos;s{' '}
                  <span className="text-indigo-400 underline">Terms of Service</span> &{' '}
                  <span className="text-indigo-400 underline">Privacy Policy</span>.
                </span>
              </label>
            ) : (
              <label className="flex items-center gap-2 text-xs text-slate-400 cursor-pointer pt-1">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 accent-indigo-600 rounded cursor-pointer"
                />
                <span>Remember me on this device</span>
              </label>
            )}

            {/* Primary Action Button */}
            <button
              type="submit"
              className="w-full py-4 rounded-2xl bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 text-slate-950 font-bold text-sm shadow-xl shadow-amber-500/25 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2"
            >
              <span>{authMode === 'register' ? 'Register & Continue to Booking' : 'Sign In & Continue'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        )}

        {/* Footer switch prompt */}
        <div className="pt-2 border-t border-slate-800/80 text-center text-xs text-slate-400">
          {authMode === 'register' ? (
            <p>
              Already have an account?{' '}
              <button
                type="button"
                onClick={() => {
                  setAuthMode('login');
                  setErrorMsg('');
                }}
                className="font-bold text-amber-400 hover:underline"
              >
                Sign In here
              </button>
            </p>
          ) : (
            <p>
              Don&apos;t have an account yet?{' '}
              <button
                type="button"
                onClick={() => {
                  setAuthMode('register');
                  setErrorMsg('');
                }}
                className="font-bold text-amber-400 hover:underline"
              >
                Create Account
              </button>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
