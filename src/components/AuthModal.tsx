import React, { useState, useEffect } from 'react';
import { X, ShieldCheck, Mail, Phone, Lock, Sparkles, User as UserIcon, ArrowRight, Eye, EyeOff } from 'lucide-react';
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

  useEffect(() => {
    if (isOpen) {
      setAuthMode(initialMode);
      setErrorMsg('');
    }
  }, [isOpen, initialMode]);

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

  const tabClass = (active: boolean) =>
    `flex-1 py-2.5 transition-colors ${
      active ? 'bg-ember-400 text-night-950 font-semibold' : 'text-mist-400 hover:text-cream'
    }`;

  const methodTabClass = (active: boolean) =>
    `flex-1 py-1.5 transition-colors flex items-center justify-center gap-1.5 ${
      active ? 'text-ember-300 bg-night-850' : 'text-mist-500 hover:text-cream'
    }`;

  const inputClass =
    'w-full pl-10 pr-4 py-3 bg-night-950 border border-night-800 text-cream text-xs focus:outline-none focus:border-ember-500 transition-colors';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-night-950/90 backdrop-blur-xl">
      <div className="bg-night-900 border border-night-800 p-6 sm:p-8 max-w-md w-full text-cream relative space-y-6 max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 border border-night-800 hover:border-night-700 text-mist-400 hover:text-cream transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Brand Header */}
        <div className="text-center space-y-3">
          <div className="flex justify-center mb-1">
            <EvokeLogo size="md" showText={true} className="justify-center" />
          </div>
          <h2 className="font-display text-2xl font-light text-cream">
            {authMode === 'register' ? 'Create your account' : 'Welcome back'}
          </h2>
          <p className="text-xs text-mist-500">
            {authMode === 'register'
              ? 'Register in 30 seconds to schedule your midnight surprise'
              : 'Sign in to access your booked surprises and video gifts'}
          </p>
        </div>

        {/* Primary Auth Mode Toggle */}
        <div className="flex bg-night-950 p-1 border border-night-800 text-xs font-semibold">
          <button
            onClick={() => {
              setAuthMode('register');
              setErrorMsg('');
            }}
            className={tabClass(authMode === 'register')}
          >
            Create Account
          </button>
          <button
            onClick={() => {
              setAuthMode('login');
              setErrorMsg('');
            }}
            className={tabClass(authMode === 'login')}
          >
            Sign In
          </button>
        </div>

        {/* Method Toggle */}
        <div className="flex bg-night-950 p-1 border border-night-800 text-[11px] font-medium">
          <button onClick={() => setMethod('email')} className={methodTabClass(method === 'email')}>
            <Mail className="w-3.5 h-3.5" />
            <span>Email</span>
          </button>
          <button onClick={() => setMethod('mobile')} className={methodTabClass(method === 'mobile')}>
            <Phone className="w-3.5 h-3.5" />
            <span>Mobile OTP</span>
          </button>
          <button onClick={() => setMethod('google')} className={methodTabClass(method === 'google')}>
            <Sparkles className="w-3.5 h-3.5 text-ember-400" />
            <span>Google</span>
          </button>
        </div>

        {errorMsg && (
          <div className="p-3 border border-ember-500/50 bg-ember-400/10 text-ember-300 text-xs font-semibold text-center">
            {errorMsg}
          </div>
        )}

        {method === 'google' ? (
          <div className="space-y-4 pt-1">
            <button
              onClick={handleQuickGoogle}
              className="w-full py-3.5 bg-cream hover:bg-white text-night-950 font-semibold text-sm flex items-center justify-center gap-3 transition-colors"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17z" />
                <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.29v3.15C3.26 21.3 7.34 24 12 24z" />
                <path fill="#FBBC05" d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.29C.47 8.21 0 10.05 0 12s.47 3.79 1.29 5.42l3.99-3.15z" />
                <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.34 0 3.26 2.7 1.29 6.58l3.99 3.15c.95-2.83 3.6-4.98 6.72-4.98z" />
              </svg>
              <span>{authMode === 'register' ? 'Sign up with Google' : 'Sign in with Google'}</span>
            </button>
            <p className="text-[11px] text-mist-500 text-center">One-click secure sign-in powered by Evoke</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 pt-1">
            {authMode === 'register' && (
              <div>
                <label className="operator-label !text-[10px] block mb-2">Full name</label>
                <div className="relative flex items-center">
                  <UserIcon className="w-4 h-4 text-mist-500 absolute left-3.5" />
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="e.g. Mahesh Kumar"
                    className={inputClass}
                  />
                </div>
              </div>
            )}

            {method === 'email' ? (
              <div>
                <label className="operator-label !text-[10px] block mb-2">Email address</label>
                <div className="relative flex items-center">
                  <Mail className="w-4 h-4 text-mist-500 absolute left-3.5" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your.email@example.com"
                    className={inputClass}
                  />
                </div>
              </div>
            ) : (
              <div>
                <label className="operator-label !text-[10px] block mb-2">Mobile phone number</label>
                <div className="relative flex items-center">
                  <Phone className="w-4 h-4 text-mist-500 absolute left-3.5" />
                  <input
                    type="text"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+1 (555) 234-5678"
                    className={inputClass}
                  />
                </div>
              </div>
            )}

            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="operator-label !text-[10px]">Password</label>
                {authMode === 'login' && (
                  <button
                    type="button"
                    onClick={() => alert('Password reset link sent to ' + email)}
                    className="text-[11px] text-ember-400 hover:underline"
                  >
                    Forgot Password?
                  </button>
                )}
              </div>
              <div className="relative flex items-center">
                <Lock className="w-4 h-4 text-mist-500 absolute left-3.5" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className={`${inputClass} pr-10`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 text-mist-500 hover:text-cream"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {authMode === 'register' ? (
              <label className="flex items-start gap-2.5 text-xs text-mist-400 cursor-pointer pt-1">
                <input
                  type="checkbox"
                  checked={agreedTerms}
                  onChange={(e) => setAgreedTerms(e.target.checked)}
                  className="mt-0.5 w-4 h-4 accent-ember-500 rounded cursor-pointer"
                />
                <span>
                  I agree to Evoke&apos;s{' '}
                  <span className="text-ember-400 underline">Terms of Service</span> &{' '}
                  <span className="text-ember-400 underline">Privacy Policy</span>.
                </span>
              </label>
            ) : (
              <label className="flex items-center gap-2 text-xs text-mist-400 cursor-pointer pt-1">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 accent-ember-500 rounded cursor-pointer"
                />
                <span>Remember me on this device</span>
              </label>
            )}

            <button
              type="submit"
              className="w-full py-4 bg-ember-400 hover:bg-ember-300 text-night-950 font-semibold text-sm transition-colors flex items-center justify-center gap-2"
            >
              <span>{authMode === 'register' ? 'Register & continue' : 'Sign in & continue'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        )}

        <div className="pt-2 border-t border-night-800 text-center text-xs text-mist-500">
          {authMode === 'register' ? (
            <p>
              Already have an account?{' '}
              <button
                type="button"
                onClick={() => {
                  setAuthMode('login');
                  setErrorMsg('');
                }}
                className="font-semibold text-ember-400 hover:underline"
              >
                Sign in here
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
                className="font-semibold text-ember-400 hover:underline"
              >
                Create account
              </button>
            </p>
          )}
        </div>

        <div className="flex items-center justify-center gap-1.5 text-[10px] text-mist-600">
          <ShieldCheck className="w-3 h-3 text-ember-400" />
          <span>Your details are encrypted and never shared</span>
        </div>
      </div>
    </div>
  );
};
