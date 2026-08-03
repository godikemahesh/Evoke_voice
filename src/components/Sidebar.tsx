import React from 'react';
import { Compass, Calendar, Sparkles, Settings } from 'lucide-react';
import { ActiveTab } from '../types';

interface Props {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  upcomingCount: number;
}

export const Sidebar: React.FC<Props> = ({ activeTab, setActiveTab, upcomingCount }) => {
  if (activeTab === 'landing') {
    return null;
  }

  const navItems = [
    { id: 'discover' as ActiveTab, label: 'Discover', icon: Compass },
    { id: 'my-orders' as ActiveTab, label: 'Surprises', icon: Calendar, badge: upcomingCount },
    { id: 'ai-assistant' as ActiveTab, label: 'AI Studio', icon: Sparkles },
    { id: 'settings' as ActiveTab, label: 'Settings', icon: Settings },
  ];

  return (
    <>
      {/* Mobile Bottom App Bar */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-night-950/92 backdrop-blur-xl border-t border-night-800/80 px-4 py-2 pb-[max(0.5rem,env(safe-area-inset-bottom))]">
        <div className="flex items-center justify-around">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex flex-col items-center gap-1 py-1 px-3 transition-colors relative ${
                  isActive ? 'text-ember-300' : 'text-mist-500 hover:text-cream'
                }`}
              >
                <div className="relative">
                  <Icon className="w-5 h-5" strokeWidth={isActive ? 2 : 1.5} />
                  {item.badge && item.badge > 0 ? (
                    <span className="absolute -top-1 -right-2 w-4 h-4 rounded-full bg-ember-400 text-[10px] font-bold text-night-950 flex items-center justify-center">
                      {item.badge}
                    </span>
                  ) : null}
                </div>
                <span className="text-[10px] font-medium">{item.label}</span>
                {isActive && <span className="absolute top-0 left-1/2 -translate-x-1/2 w-6 h-px bg-ember-400" />}
              </button>
            );
          })}
        </div>
      </div>
    </>
  );
};
