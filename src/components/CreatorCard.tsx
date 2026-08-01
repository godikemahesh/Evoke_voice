import React, { useState } from 'react';
import { Star, Volume2, Video, Phone, CheckCircle, Sparkles, Play, Pause } from 'lucide-react';
import { Creator } from '../types';

interface Props {
  creator: Creator;
  onSelect: (creator: Creator) => void;
  onPlaySample?: (text: string) => void;
}

export const CreatorCard: React.FC<Props> = ({ creator, onSelect, onPlaySample }) => {
  const [isPlaying, setIsPlaying] = useState(false);

  const handleSampleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsPlaying(!isPlaying);
    if (onPlaySample && creator.audioSampleText) {
      onPlaySample(creator.audioSampleText);
    }
  };

  return (
    <div
      onClick={() => onSelect(creator)}
      className="group relative bg-slate-900/90 rounded-3xl overflow-hidden border border-slate-800 hover:border-amber-500/50 transition-all duration-300 hover:-translate-y-1.5 cursor-pointer shadow-xl hover:shadow-amber-500/10 flex flex-col justify-between"
    >
      {/* Top Banner & Photo */}
      <div className="relative h-64 overflow-hidden">
        <img
          src={creator.avatar}
          alt={creator.name}
          referrerPolicy="no-referrer"
          onError={(e) => {
            e.currentTarget.src = 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=800';
          }}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent"></div>

        {/* Rating Badge */}
        <div className="absolute top-3 left-3 bg-slate-950/80 backdrop-blur-md px-2.5 py-1 rounded-full border border-slate-700/60 text-xs font-semibold text-amber-300 flex items-center gap-1 shadow-md">
          <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
          <span>{creator.rating}</span>
          <span className="text-[10px] text-slate-400">({creator.reviewsCount})</span>
        </div>

        {/* Category Badge */}
        <div className="absolute top-3 right-3 flex items-center gap-1.5">
          <span className="bg-emerald-950/90 backdrop-blur-md px-2.5 py-1 rounded-full border border-emerald-500/60 text-[10px] font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1 shadow-md">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
            Coming Soon
          </span>
          <span className="bg-amber-950/80 backdrop-blur-md px-2.5 py-1 rounded-full border border-amber-500/40 text-[10px] font-bold text-amber-300 uppercase tracking-wider">
            {creator.category}
          </span>
        </div>

        {/* Voice Audio Sample Button */}
        {creator.audioSampleText && (
          <button
            onClick={handleSampleClick}
            className="absolute bottom-3 right-3 px-3 py-1.5 rounded-full bg-slate-900/90 hover:bg-amber-500 backdrop-blur-md border border-amber-500/30 text-xs text-amber-300 hover:text-slate-950 font-medium flex items-center gap-1.5 transition-all shadow-lg group/btn"
            title="Listen Voice Preview"
          >
            {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
            <span>Sample Voice</span>
          </button>
        )}
      </div>

      {/* Body Details */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        <div>
          <div className="flex items-center gap-1.5 mb-1">
            <h3 className="text-lg font-bold text-white group-hover:text-amber-300 transition-colors">
              {creator.name}
            </h3>
            <CheckCircle className="w-4 h-4 text-amber-400 fill-amber-400/20" />
          </div>
          <p className="text-xs text-slate-400 font-medium line-clamp-1">{creator.tagline}</p>

          {/* Languages */}
          <div className="flex flex-wrap gap-1 mt-3">
            {creator.languages.map((lang) => (
              <span
                key={lang}
                className="px-2 py-0.5 rounded-md bg-slate-800/80 text-[10px] font-medium text-slate-300"
              >
                {lang}
              </span>
            ))}
          </div>
        </div>

        {/* Badges / Guarantees */}
        <div className="flex items-center gap-2 text-[11px] text-slate-300">
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          <span className="truncate">{creator.badges[0] || 'Midnight Guaranteed'}</span>
        </div>

        {/* Pricing Options */}
        <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between">
          <div className="flex items-center gap-3 text-xs">
            <div>
              <span className="text-[10px] text-slate-400 block">Voice Note</span>
              <span className="font-bold text-slate-200">₹{creator.voicePrice}</span>
            </div>
            <div className="w-px h-6 bg-slate-800"></div>
            <div>
              <span className="text-[10px] text-slate-400 block">4K Video</span>
              <span className="font-bold text-amber-400">₹{creator.videoPrice}</span>
            </div>
          </div>

          <button className="px-3.5 py-2 rounded-xl bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 hover:brightness-110 text-slate-950 font-bold text-xs shadow-md shadow-amber-500/20 transition-all">
            Book Now
          </button>
        </div>
      </div>
    </div>
  );
};
