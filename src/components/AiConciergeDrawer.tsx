import React, { useState } from 'react';
import { Sparkles, Send, X } from 'lucide-react';
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
    <div className="fixed inset-y-0 right-0 z-50 w-full max-w-md bg-night-900 border-l border-night-800 flex flex-col text-cream backdrop-blur-xl">
      {/* Header */}
      <div className="p-4 border-b border-night-800 flex items-center justify-between bg-night-950/80">
        <div className="flex items-center gap-3">
          <div className="p-1 border border-ember-500/40 bg-night-950">
            <EvokeLogo showText={false} size="sm" />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-cream flex items-center gap-1.5">
              <span>Evoke AI Studio Concierge</span>
              <Sparkles className="w-3.5 h-3.5 text-ember-400" />
            </h3>
            <p className="text-[10px] text-ember-300/80 font-mono tracking-wider uppercase">Powered by Gemini 3.6 Flash</p>
          </div>
        </div>

        <button
          type="button"
          onClick={onClose}
          className="p-2 border border-night-800 hover:border-night-700 text-mist-400 hover:text-cream transition-colors"
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
              <div className="w-8 h-8 bg-night-950 border border-ember-500/50 p-1 flex items-center justify-center flex-shrink-0">
                <EvokeLogo showText={false} size="sm" />
              </div>
            )}
            <div
              className={`p-3.5 max-w-[80%] leading-relaxed ${
                m.sender === 'user'
                  ? 'bg-ember-400 text-night-950 font-medium'
                  : 'bg-night-950 border border-night-800 text-mist-300'
              }`}
            >
              {m.text}
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex items-center gap-2 text-ember-400 text-xs italic">
            <Sparkles className="w-4 h-4 animate-spin" />
            <span>AI Concierge thinking...</span>
          </div>
        )}
      </div>

      {/* Input Field */}
      <div className="p-4 border-t border-night-800 bg-night-950/80 flex items-center gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          placeholder="Describe recipient & budget..."
          className="flex-1 px-4 py-3 bg-night-900 border border-night-800 text-xs text-cream placeholder-mist-600 focus:outline-none focus:border-ember-500 transition-colors"
        />
        <button
          onClick={handleSend}
          disabled={isLoading}
          className="p-3 bg-ember-400 hover:bg-ember-300 text-night-950 transition-colors"
        >
          <Send className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
