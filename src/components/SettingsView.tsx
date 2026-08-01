import React, { useState } from 'react';
import { User, ShieldCheck, Bell, CreditCard, Sparkles, LogOut, CheckCircle2 } from 'lucide-react';
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
    <div className="min-h-screen bg-slate-950 text-white pt-6 pb-28">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 space-y-8">
        <div>
          <h1 className="text-3xl font-black font-serif text-white">Account Settings</h1>
          <p className="text-slate-400 text-sm mt-1">Manage profile, midnight dispatch notifications & payment settings</p>
        </div>

        {/* User Card */}
        <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <img
              src={user?.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=200'}
              alt={user?.name || 'User'}
              className="w-16 h-16 rounded-2xl object-cover ring-2 ring-indigo-500/50"
            />
            <div>
              <h3 className="text-lg font-bold text-white">{user?.name || 'Mahesh Kumar'}</h3>
              <p className="text-xs text-slate-400">{user?.email || 'mahesh@example.com'}</p>
              <span className="inline-block mt-1 px-2.5 py-0.5 rounded-full bg-indigo-950 text-[10px] font-bold text-indigo-300 border border-indigo-500/30">
                VIP Member
              </span>
            </div>
          </div>

          <button
            onClick={onLogout}
            className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-rose-900/40 text-slate-300 hover:text-rose-400 border border-slate-700 text-xs font-bold transition-colors flex items-center gap-2"
          >
            <LogOut className="w-4 h-4" />
            <span>Sign Out</span>
          </button>
        </div>

        {/* Notification Settings */}
        <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-6">
          <h2 className="text-lg font-bold text-white font-serif flex items-center gap-2">
            <Bell className="w-5 h-5 text-indigo-400" />
            <span>Midnight Dispatch Alerts</span>
          </h2>

          <div className="space-y-4 text-xs">
            <div className="flex items-center justify-between p-3.5 rounded-2xl bg-slate-950 border border-slate-800">
              <div>
                <div className="font-bold text-white">Instant SMS Alert at 12:00 AM</div>
                <div className="text-slate-400">Receive an SMS when the celebrity call connects</div>
              </div>
              <input
                type="checkbox"
                checked={midnightSms}
                onChange={(e) => setMidnightSms(e.target.checked)}
                className="w-5 h-5 accent-indigo-600 rounded cursor-pointer"
              />
            </div>

            <div className="flex items-center justify-between p-3.5 rounded-2xl bg-slate-950 border border-slate-800">
              <div>
                <div className="font-bold text-white">4K Video Download Link Email</div>
                <div className="text-slate-400">Receive high definition video download file upon delivery</div>
              </div>
              <input
                type="checkbox"
                checked={emailAlerts}
                onChange={(e) => setEmailAlerts(e.target.checked)}
                className="w-5 h-5 accent-indigo-600 rounded cursor-pointer"
              />
            </div>
          </div>

          <button
            onClick={handleSave}
            className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-bold text-xs shadow-lg shadow-indigo-500/20 transition-all flex items-center justify-center gap-2"
          >
            {savedSuccess ? (
              <>
                <CheckCircle2 className="w-4 h-4 text-emerald-300" />
                <span>Preferences Saved!</span>
              </>
            ) : (
              <span>Save Preferences</span>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
