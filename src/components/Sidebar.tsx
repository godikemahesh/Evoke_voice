import React from 'react';
import { Compass, Calendar, Clock, Sparkles, Settings, Gift, Home, ShieldCheck } from 'lucide-react';
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
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-slate-950/90 backdrop-blur-xl border-t border-slate-800/80 px-4 py-2">
        <div className="flex items-center justify-around">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex flex-col items-center gap-1 py-1 px-3 rounded-xl transition-all relative ${
                  isActive ? 'text-indigo-400 font-semibold scale-105' : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <div className="relative">
                  <Icon className="w-5 h-5" />
                  {item.badge && item.badge > 0 ? (
                    <span className="absolute -top-1 -right-2 w-4 h-4 rounded-full bg-pink-500 text-[10px] font-bold text-white flex items-center justify-center animate-pulse">
                      {item.badge}
                    </span>
                  ) : null}
                </div>
                <span className="text-[11px]">{item.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </>
  );
};
