import React from 'react';
import { Sparkles, Search, User as UserIcon, Calendar, Compass } from 'lucide-react';
import { ActiveTab, User } from '../types';
import { EvokeLogo } from './EvokeLogo';

interface Props {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  user: User | null;
  onOpenAuth: () => void;
  upcomingCount: number;
  onOpenSearch?: () => void;
  onSelectCreator?: (creatorId: string) => void;
}

export const Navbar: React.FC<Props> = ({
  activeTab,
  setActiveTab,
  user,
  onOpenAuth,
  upcomingCount,
  onOpenSearch,
}) => {
  const scrollToSection = (sectionId: string) => {
    if (activeTab !== 'landing') {
      setActiveTab('landing');
      setTimeout(() => {
        const el = document.getElementById(sectionId);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      const el = document.getElementById(sectionId);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleCreateSurpriseClick = () => {
    if (user?.isLoggedIn) {
      setActiveTab('discover');
    } else {
      onOpenAuth();
    }
  };

  const handleSearchClick = () => {
    if (user?.isLoggedIn) {
      if (onOpenSearch) onOpenSearch();
    } else {
      onOpenAuth();
    }
  };

  const isLandingMode = activeTab === 'landing' || !user?.isLoggedIn;

  return (
    <header className="sticky top-0 z-50 backdrop-blur-xl bg-slate-950/80 border-b border-slate-800/60 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-12 md:h-14">
          {/* Logo */}
          <div
            className="flex items-center gap-2 cursor-pointer group"
            onClick={() => {
              if (user?.isLoggedIn) {
                setActiveTab('discover');
              } else {
                setActiveTab('landing');
              }
            }}
          >
            <EvokeLogo showText={true} size="sm" />
          </div>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-0.5 bg-slate-900/60 p-0.5 rounded-full border border-slate-800/80">
            {isLandingMode ? (
              /* Landing Page Section Navigation Links for Landing Mode / Non-Logged In */
              <>
                <button
                  onClick={() => scrollToSection('how-it-works')}
                  className="px-2.5 py-1 rounded-full text-[11px] font-medium text-slate-300 hover:text-white hover:bg-slate-800/50 transition-all"
                >
                  How It Works
                </button>
                <button
                  onClick={() => scrollToSection('creators')}
                  className="px-2.5 py-1 rounded-full text-[11px] font-medium text-slate-300 hover:text-white hover:bg-slate-800/50 transition-all"
                >
                  Featured Creators
                </button>
                <button
                  onClick={() => scrollToSection('demo')}
                  className="px-2.5 py-1 rounded-full text-[11px] font-medium text-slate-300 hover:text-white hover:bg-slate-800/50 transition-all"
                >
                  Live Demo
                </button>
                <button
                  onClick={() => scrollToSection('why-evoke')}
                  className="px-2.5 py-1 rounded-full text-[11px] font-medium text-slate-300 hover:text-white hover:bg-slate-800/50 transition-all"
                >
                  Why Evoke
                </button>
                <button
                  onClick={() => scrollToSection('occasions')}
                  className="px-2.5 py-1 rounded-full text-[11px] font-medium text-slate-300 hover:text-white hover:bg-slate-800/50 transition-all"
                >
                  Occasions
                </button>
              </>
            ) : (
              /* Logged-In App Navigation Links */
              <>
                <button
                  onClick={() => setActiveTab('discover')}
                  className={`px-2.5 py-1 rounded-full text-[11px] font-medium transition-all flex items-center gap-1 ${
                    activeTab === 'discover' || activeTab === 'creator'
                      ? 'bg-gradient-to-r from-amber-500 via-yellow-500 to-amber-600 text-slate-950 font-semibold shadow-sm shadow-amber-500/20'
                      : 'text-slate-300 hover:text-white hover:bg-slate-800/50'
                  }`}
                >
                  <Compass className="w-3 h-3" />
                  Explore Creators
                </button>
                <button
                  onClick={() => setActiveTab('my-orders')}
                  className={`px-2.5 py-1 rounded-full text-[11px] font-medium transition-all flex items-center gap-1 ${
                    activeTab === 'my-orders'
                      ? 'bg-gradient-to-r from-amber-500 via-yellow-500 to-amber-600 text-slate-950 font-semibold shadow-sm shadow-amber-500/20'
                      : 'text-slate-300 hover:text-white hover:bg-slate-800/50'
                  }`}
                >
                  <Calendar className="w-3 h-3" />
                  My Surprises
                  {upcomingCount > 0 && (
                    <span className="ml-0.5 px-1.5 py-0.2 text-[9px] font-bold bg-amber-400 text-slate-950 rounded-full animate-pulse">
                      {upcomingCount}
                    </span>
                  )}
                </button>
                <button
                  onClick={() => setActiveTab('ai-assistant')}
                  className={`px-2.5 py-1 rounded-full text-[11px] font-medium transition-all flex items-center gap-1 ${
                    activeTab === 'ai-assistant'
                      ? 'bg-gradient-to-r from-amber-500 via-yellow-500 to-amber-600 text-slate-950 font-semibold shadow-sm shadow-amber-500/20'
                      : 'text-slate-300 hover:text-white hover:bg-slate-800/50'
                  }`}
                >
                  <Sparkles className="w-3 h-3 text-amber-400" />
                  AI Studio Concierge
                </button>
              </>
            )}
          </nav>

          {/* Right Actions */}
          <div className="flex items-center gap-2">
            <button
              onClick={handleSearchClick}
              className="p-1.5 rounded-full bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:bg-slate-800 transition-colors"
              title="Search Creators"
            >
              <Search className="w-3.5 h-3.5" />
            </button>

            <button
              onClick={handleCreateSurpriseClick}
              className="hidden sm:flex items-center gap-1.5 px-3 py-1 rounded-lg bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 text-slate-950 font-bold text-[11px] shadow-sm shadow-amber-500/25 hover:shadow-amber-500/40 hover:scale-[1.02] active:scale-[0.98] transition-all"
            >
              <Sparkles className="w-3 h-3 text-slate-950" />
              <span>Create a Surprise</span>
            </button>

            {user?.isLoggedIn ? (
              <button
                onClick={() => setActiveTab('settings')}
                className="flex items-center gap-1.5 pl-1 pr-2 py-0.5 rounded-full bg-slate-900 border border-slate-800 hover:border-amber-500/50 transition-all group"
              >
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="w-5 h-5 rounded-full object-cover ring-2 ring-amber-500/50"
                />
                <span className="text-[11px] font-medium text-slate-200 group-hover:text-amber-400 hidden lg:inline">
                  {user.name.split(' ')[0]}
                </span>
              </button>
            ) : (
              <button
                onClick={onOpenAuth}
                className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-900 hover:bg-slate-800 border border-amber-500/30 text-amber-300 hover:text-amber-200 hover:border-amber-500/60 text-[11px] font-medium transition-all"
              >
                <UserIcon className="w-3 h-3 text-amber-400" />
                <span>Sign In / Register</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
