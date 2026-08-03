import React, { useState } from 'react';
import { Star, Play, Pause, Volume2 } from 'lucide-react';
import { Creator } from '../types';

interface Props {
  creator: Creator;
  onSelect: (creator: Creator) => void;
  onPlaySample?: (text: string) => void;
  index?: number;
}

export const CreatorCard: React.FC<Props> = ({ creator, onSelect, onPlaySample, index = 0 }) => {
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
      className="group relative bg-night-900 border border-night-800 hover:border-ember-500/50 transition-colors cursor-pointer flex flex-col"
    >
      {/* Photo */}
      <div className="relative aspect-[4/5] overflow-hidden bg-night-950">
        <img
          src={creator.avatar}
          alt={creator.name}
          referrerPolicy="no-referrer"
          onError={(e) => {
            e.currentTarget.src = 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=800';
          }}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-night-950 via-night-950/10 to-transparent" />

        <span className="absolute top-3 left-3 font-display text-lg font-light text-cream/70">
          {String(index + 1).padStart(2, '0')}
        </span>
        <span className="absolute top-3 right-3 inline-flex items-center gap-1 text-[11px] text-ember-300 bg-night-950/60 px-2 py-0.5">
          <Star className="w-3 h-3 fill-ember-400 text-ember-400" /> {creator.rating}
        </span>

        {creator.audioSampleText && (
          <button
            onClick={handleSampleClick}
            className="absolute bottom-3 right-3 px-2.5 py-1.5 bg-night-950/80 border border-night-700 text-xs text-mist-300 hover:text-night-950 hover:bg-ember-400 font-medium flex items-center gap-1.5 transition-colors"
            title="Listen Voice Preview"
          >
            {isPlaying ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3" />}
            <span>Sample</span>
          </button>
        )}
      </div>

      {/* Body */}
      <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
        <div>
          <h3 className="font-display text-lg font-medium text-cream group-hover:text-ember-300 transition-colors leading-tight">
            {creator.name}
          </h3>
          <p className="text-[11px] text-mist-500 font-medium line-clamp-1 mt-0.5">{creator.tagline}</p>
        </div>

        <div className="pt-3 border-t border-night-800 flex items-center justify-between">
          <div className="flex items-center gap-3 text-xs">
            <div>
              <span className="text-[10px] text-mist-600 block">Voice</span>
              <span className="font-semibold text-cream">₹{creator.voicePrice}</span>
            </div>
            <div className="w-px h-5 bg-night-800" />
            <div>
              <span className="text-[10px] text-mist-600 block">4K Video</span>
              <span className="font-semibold text-ember-300">₹{creator.videoPrice}</span>
            </div>
          </div>

          <button className="px-3 py-1.5 bg-ember-400 hover:bg-ember-300 text-night-950 font-semibold text-xs transition-colors">
            Book
          </button>
        </div>
      </div>
    </div>
  );
};
