import React, { useState } from 'react';
import { ShieldCheck, Bell, LogOut, CheckCircle2 } from 'lucide-react';
import { User as UserType } from '../types';

interface Props {
  user: UserType | null;
  onLogout: () => void;
}

export const SettingsView: React.FC<Props> = ({ user, onLogout }) => {
  const [midnightSms, setMidnightSms] = useState(true);
  const [emailAlerts, setEmailAlerts] = useState(true);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSave = () => {
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2000);
  };

  return (
    <div className="min-h-screen bg-night-950 text-cream pt-10 pb-28">
      <div className="max-w-3xl mx-auto px-5 sm:px-8 space-y-10">
        <div>
          <div className="operator-label mb-2">Evoke · Account</div>
          <h1 className="font-display text-4xl sm:text-5xl font-light text-cream">Settings</h1>
          <p className="text-mist-500 text-sm mt-2">Manage profile, midnight dispatch notifications, and payment settings</p>
        </div>

        {/* User Card */}
        <div className="p-6 border border-night-800 bg-night-900 flex items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <img
              src={user?.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=200'}
              alt={user?.name || 'User'}
              className="w-14 h-14 object-cover border border-night-800"
            />
            <div>
              <h3 className="font-display text-lg font-medium text-cream">{user?.name || 'Mahesh Kumar'}</h3>
              <p className="text-xs text-mist-500">{user?.email || 'mahesh@example.com'}</p>
              <span className="inline-block mt-1.5 px-2 py-0.5 border border-ember-500/40 text-[10px] font-mono tracking-wider text-ember-300 uppercase">
                VIP member
              </span>
            </div>
          </div>

          <button
            onClick={onLogout}
            className="px-4 py-2 border border-night-800 bg-night-950 hover:border-ember-500/50 text-mist-400 hover:text-cream text-xs font-medium transition-colors flex items-center gap-2"
          >
            <LogOut className="w-4 h-4" />
            <span>Sign out</span>
          </button>
        </div>

        {/* Notification Settings */}
        <div className="p-6 border border-night-800 bg-night-900 space-y-6">
          <h2 className="flex items-center gap-2 text-mist-300 text-sm font-semibold">
            <Bell className="w-5 h-5 text-ember-400" />
            <span>Midnight dispatch alerts</span>
          </h2>

          <div className="space-y-3 text-xs">
            <div className="flex items-center justify-between p-4 bg-night-950 border border-night-800">
              <div>
                <div className="font-semibold text-cream">Instant SMS alert at 12:00 AM</div>
                <div className="text-mist-500 mt-0.5">Receive an SMS when the call connects</div>
              </div>
              <input
                type="checkbox"
                checked={midnightSms}
                onChange={(e) => setMidnightSms(e.target.checked)}
                className="w-5 h-5 accent-ember-500 rounded cursor-pointer"
              />
            </div>

            <div className="flex items-center justify-between p-4 bg-night-950 border border-night-800">
              <div>
                <div className="font-semibold text-cream">4K video download link email</div>
                <div className="text-mist-500 mt-0.5">Receive the HD video download file upon delivery</div>
              </div>
              <input
                type="checkbox"
                checked={emailAlerts}
                onChange={(e) => setEmailAlerts(e.target.checked)}
                className="w-5 h-5 accent-ember-500 rounded cursor-pointer"
              />
            </div>
          </div>

          <button
            onClick={handleSave}
            className="w-full py-3.5 bg-ember-400 hover:bg-ember-300 text-night-950 font-semibold text-xs transition-colors flex items-center justify-center gap-2"
          >
            {savedSuccess ? (
              <>
                <CheckCircle2 className="w-4 h-4" />
                <span>Preferences saved</span>
              </>
            ) : (
              <span>Save preferences</span>
            )}
          </button>
        </div>

        <div className="flex items-center gap-2 text-[11px] text-mist-600">
          <ShieldCheck className="w-3.5 h-3.5 text-ember-400" />
          <span>Midnight On-Time Guarantee · 100% refund if not delivered on time</span>
        </div>
      </div>
    </div>
  );
};
