import React, { useState } from 'react';
import { Sparkles, Send, X, User as UserIcon, ArrowRight } from 'lucide-react';
import { Creator } from '../types';
import { EvokeLogo } from './EvokeLogo';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  creators: Creator[];
  onSelectCreator: (creator: Creator) => void;
}

export const AiConciergeDrawer: React.FC<Props> = ({
  isOpen,
  onClose,
  creators,
  onSelectCreator,
}) => {
  const [messages, setMessages] = useState<Array<{ sender: 'ai' | 'user'; text: string }>>([
    {
      sender: 'ai',
      text: 'Hello! I am your Evoke AI Gifting Assistant. Tell me who you want to surprise (e.g. "My brother who loves Marvel movies and is turning 25"), and I will match the perfect creator and draft an emotional script!',
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  if (!isOpen) return null;

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userText = input.trim();
    setMessages((prev) => [...prev, { sender: 'user', text: userText }]);
    setInput('');
    setIsLoading(true);

    try {
      const res = await fetch('/api/recommend-creator', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: userText }),
      });
      const data = await res.json();

      if (data.success && data.recommendation) {
        setMessages((prev) => [...prev, { sender: 'ai', text: data.recommendation }]);
      } else {
        setMessages((prev) => [
          ...prev,
          {
            sender: 'ai',
            text: `Based on your request, I recommend booking **Liam Cross** for dramatic superhero energy or **Aura Nightshade** for atmospheric storytelling!`,
          },
        ]);
      }
    } catch (e) {
      setMessages((prev) => [
        ...prev,
        {
          sender: 'ai',
          text: `I recommend booking **Liam Cross** or **Dev Patel** for an epic birthday surprise! Click explore to personalize.`,
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-y-0 right-0 z-50 w-full max-w-md bg-slate-900 border-l border-slate-800 shadow-2xl flex flex-col text-white backdrop-blur-2xl">
      {/* Header */}
      <div className="p-4 border-b border-slate-800 flex items-center justify-between bg-slate-950/80">
        <div className="flex items-center gap-3">
          <div className="p-1 rounded-xl bg-slate-950 border border-amber-500/40 shadow-md shadow-amber-500/20">
            <EvokeLogo showText={false} size="sm" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-white flex items-center gap-1.5">
              <span>Evoke AI Studio Concierge</span>
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            </h3>
            <p className="text-[10px] text-amber-300/80">Powered by Gemini 3.6 Flash</p>
          </div>
        </div>

        <button
          type="button"
          onClick={onClose}
          className="p-2 rounded-full hover:bg-slate-800 text-slate-400 hover:text-white cursor-pointer transition-colors"
          aria-label="Close AI Studio Concierge"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Chat Messages */}
      <div className="flex-1 p-4 overflow-y-auto space-y-4 text-xs">
        {messages.map((m, idx) => (
          <div
            key={idx}
            className={`flex gap-3 ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            {m.sender === 'ai' && (
              <div className="w-8 h-8 rounded-full bg-slate-950 border border-amber-500/50 p-1 flex items-center justify-center flex-shrink-0 shadow-md shadow-amber-500/20">
                <EvokeLogo showText={false} size="sm" />
              </div>
            )}
            <div
              className={`p-3.5 rounded-2xl max-w-[80%] leading-relaxed ${
                m.sender === 'user'
                  ? 'bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 text-slate-950 font-medium rounded-br-none'
                  : 'bg-slate-950 border border-slate-800 text-slate-200 rounded-bl-none'
              }`}
            >
              {m.text}
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex items-center gap-2 text-amber-400 text-xs italic">
            <Sparkles className="w-4 h-4 animate-spin" />
            <span>AI Concierge thinking...</span>
          </div>
        )}
      </div>

      {/* Input Field */}
      <div className="p-4 border-t border-slate-800 bg-slate-950/80 flex items-center gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          placeholder="Describe recipient & budget..."
          className="flex-1 px-4 py-3 rounded-2xl bg-slate-900 border border-slate-800 text-xs text-white focus:outline-none focus:border-amber-500 font-sans"
        />
        <button
          onClick={handleSend}
          disabled={isLoading}
          className="p-3 rounded-2xl bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 text-slate-950 hover:scale-105 transition-all shadow-md shadow-amber-500/20 font-bold"
        >
          <Send className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

