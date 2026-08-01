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
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <div
            className="flex items-center gap-3 cursor-pointer group"
            onClick={() => {
              if (user?.isLoggedIn) {
                setActiveTab('discover');
              } else {
                setActiveTab('landing');
              }
            }}
          >
            <EvokeLogo showText={true} size="md" />
          </div>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-1 bg-slate-900/60 p-1.5 rounded-full border border-slate-800/80">
            {isLandingMode ? (
              /* Landing Page Section Navigation Links for Landing Mode / Non-Logged In */
              <>
                <button
                  onClick={() => scrollToSection('how-it-works')}
                  className="px-4 py-2 rounded-full text-xs lg:text-sm font-medium text-slate-300 hover:text-white hover:bg-slate-800/50 transition-all"
                >
                  How It Works
                </button>
                <button
                  onClick={() => scrollToSection('creators')}
                  className="px-4 py-2 rounded-full text-xs lg:text-sm font-medium text-slate-300 hover:text-white hover:bg-slate-800/50 transition-all"
                >
                  Featured Creators
                </button>
                <button
                  onClick={() => scrollToSection('demo')}
                  className="px-4 py-2 rounded-full text-xs lg:text-sm font-medium text-slate-300 hover:text-white hover:bg-slate-800/50 transition-all"
                >
                  Live Demo
                </button>
                <button
                  onClick={() => scrollToSection('why-evoke')}
                  className="px-4 py-2 rounded-full text-xs lg:text-sm font-medium text-slate-300 hover:text-white hover:bg-slate-800/50 transition-all"
                >
                  Why Evoke
                </button>
                <button
                  onClick={() => scrollToSection('occasions')}
                  className="px-4 py-2 rounded-full text-xs lg:text-sm font-medium text-slate-300 hover:text-white hover:bg-slate-800/50 transition-all"
                >
                  Occasions
                </button>
              </>
            ) : (
              /* Logged-In App Navigation Links */
              <>
                <button
                  onClick={() => setActiveTab('discover')}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all flex items-center gap-1.5 ${
                    activeTab === 'discover' || activeTab === 'creator'
                      ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-md shadow-indigo-500/20'
                      : 'text-slate-300 hover:text-white hover:bg-slate-800/50'
                  }`}
                >
                  <Compass className="w-4 h-4" />
                  Explore Creators
                </button>
                <button
                  onClick={() => setActiveTab('my-orders')}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all flex items-center gap-1.5 ${
                    activeTab === 'my-orders'
                      ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-md shadow-indigo-500/20'
                      : 'text-slate-300 hover:text-white hover:bg-slate-800/50'
                  }`}
                >
                  <Calendar className="w-4 h-4" />
                  My Surprises
                  {upcomingCount > 0 && (
                    <span className="ml-1 px-1.5 py-0.2 text-xs font-bold bg-pink-500 text-white rounded-full animate-pulse">
                      {upcomingCount}
                    </span>
                  )}
                </button>
                <button
                  onClick={() => setActiveTab('ai-assistant')}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all flex items-center gap-1.5 ${
                    activeTab === 'ai-assistant'
                      ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-md shadow-indigo-500/20'
                      : 'text-slate-300 hover:text-white hover:bg-slate-800/50'
                  }`}
                >
                  <Sparkles className="w-4 h-4 text-amber-400" />
                  AI Studio Concierge
                </button>
              </>
            )}
          </nav>

          {/* Right Actions */}
          <div className="flex items-center gap-3">
            <button
              onClick={handleSearchClick}
              className="p-2.5 rounded-full bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:bg-slate-800 transition-colors"
              title="Search Creators"
            >
              <Search className="w-4 h-4" />
            </button>

            <button
              onClick={handleCreateSurpriseClick}
              className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white font-semibold text-sm shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40 hover:scale-[1.02] active:scale-[0.98] transition-all"
            >
              <Sparkles className="w-4 h-4" />
              <span>Create a Surprise</span>
            </button>

            {user?.isLoggedIn ? (
              <button
                onClick={() => setActiveTab('settings')}
                className="flex items-center gap-2.5 pl-2 pr-3 py-1.5 rounded-full bg-slate-900 border border-slate-800 hover:border-indigo-500/50 transition-all group"
              >
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="w-7 h-7 rounded-full object-cover ring-2 ring-indigo-500/50"
                />
                <span className="text-sm font-medium text-slate-200 group-hover:text-white hidden lg:inline">
                  {user.name.split(' ')[0]}
                </span>
              </button>
            ) : (
              <button
                onClick={onOpenAuth}
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-200 hover:text-white text-sm font-medium transition-all"
              >
                <UserIcon className="w-4 h-4 text-indigo-400" />
                <span>Sign In / Register</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
