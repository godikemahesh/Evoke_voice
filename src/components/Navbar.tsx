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

  const linkClass = (active: boolean) =>
    `relative text-[11px] font-medium transition-colors pb-0.5 ${
      active ? 'text-ember-300' : 'text-mist-400 hover:text-cream'
    } ${active ? 'after:absolute after:left-0 after:right-0 after:-bottom-0.5 after:h-px after:bg-ember-400' : ''}`;

  return (
    <header className="sticky top-0 z-50 backdrop-blur-xl bg-night-950/80 border-b border-night-800/70 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
        <div className="flex items-center justify-between h-14 md:h-16">
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
          <nav className="hidden md:flex items-center gap-6">
            {isLandingMode ? (
              <>
                <button onClick={() => scrollToSection('how-it-works')} className={linkClass(false)}>
                  How It Works
                </button>
                <button onClick={() => scrollToSection('creators')} className={linkClass(false)}>
                  Featured Creators
                </button>
                <button onClick={() => scrollToSection('demo')} className={linkClass(false)}>
                  Live Demo
                </button>
                <button onClick={() => scrollToSection('why-evoke')} className={linkClass(false)}>
                  Why Evoke
                </button>
                <button onClick={() => scrollToSection('occasions')} className={linkClass(false)}>
                  Occasions
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => setActiveTab('discover')}
                  className={linkClass(activeTab === 'discover' || activeTab === 'creator')}
                >
                  Explore Creators
                </button>
                <button onClick={() => setActiveTab('my-orders')} className={linkClass(activeTab === 'my-orders')}>
                  <span className="flex items-center gap-1.5">
                    <Calendar className="w-3 h-3" />
                    My Surprises
                    {upcomingCount > 0 && (
                      <span className="px-1.5 text-[9px] font-bold bg-ember-400 text-night-950 rounded-full">
                        {upcomingCount}
                      </span>
                    )}
                  </span>
                </button>
                <button onClick={() => setActiveTab('ai-assistant')} className={linkClass(activeTab === 'ai-assistant')}>
                  <span className="flex items-center gap-1.5">
                    <Sparkles className="w-3 h-3 text-ember-400" />
                    AI Studio Concierge
                  </span>
                </button>
              </>
            )}
          </nav>

          {/* Right Actions */}
          <div className="flex items-center gap-2">
            <button
              onClick={handleSearchClick}
              className="p-2 bg-night-900 border border-night-800 text-mist-400 hover:text-cream hover:border-night-700 transition-colors"
              title="Search Creators"
            >
              <Search className="w-3.5 h-3.5" />
            </button>

            <button
              onClick={handleCreateSurpriseClick}
              className="hidden sm:flex items-center gap-1.5 px-3.5 py-2 bg-ember-400 hover:bg-ember-300 text-night-950 font-semibold text-[11px] transition-colors"
            >
              <Sparkles className="w-3 h-3 text-night-950" />
              <span>Create a Surprise</span>
            </button>

            {user?.isLoggedIn ? (
              <button
                onClick={() => setActiveTab('settings')}
                className="flex items-center gap-1.5 pl-1 pr-2 py-1 bg-night-900 border border-night-800 hover:border-ember-500/50 transition-colors"
              >
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="w-5 h-5 rounded-full object-cover ring-1 ring-ember-500/50"
                />
                <span className="text-[11px] font-medium text-mist-300 hidden lg:inline">
                  {user.name.split(' ')[0]}
                </span>
              </button>
            ) : (
              <button
                onClick={onOpenAuth}
                className="flex items-center gap-1 px-3 py-2 bg-night-900 hover:bg-night-800 border border-night-800 text-mist-300 hover:text-cream text-[11px] font-medium transition-colors"
              >
                <UserIcon className="w-3 h-3 text-ember-400" />
                <span>Sign In / Register</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
