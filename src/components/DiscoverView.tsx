import React, { useState, useMemo } from 'react';
import { Search, Mic, Sparkles, SlidersHorizontal, Flame, Star, CheckCircle } from 'lucide-react';
import { Creator, User } from '../types';
import { CATEGORIES } from '../data/mockCreators';
import { CreatorCard } from './CreatorCard';

interface Props {
  user: User | null;
  creators: Creator[];
  onSelectCreator: (creator: Creator) => void;
  onOpenAiConcierge: () => void;
}

export const DiscoverView: React.FC<Props> = ({
  user,
  creators,
  onSelectCreator,
  onOpenAiConcierge,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isListeningMic, setIsListeningMic] = useState<boolean>(false);

  // Filtered Creators
  const filteredCreators = useMemo(() => {
    return creators.filter((c) => {
      const matchesCategory = selectedCategory === 'All' || c.category === selectedCategory;
      const matchesSearch =
        c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.tagline.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.bio.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [creators, selectedCategory, searchQuery]);

  const trendingCreators = useMemo(() => creators.filter((c) => c.trending), [creators]);
  const recommendedCreators = useMemo(() => creators.filter((c) => c.recommended), [creators]);

  // Handle Speech Mic Search
  const handleMicClick = () => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      const recognition = new SpeechRecognition();
      recognition.onstart = () => setIsListeningMic(true);
      recognition.onresult = (e: any) => {
        const transcript = e.results[0][0].transcript;
        setSearchQuery(transcript);
        setIsListeningMic(false);
      };
      recognition.onerror = () => setIsListeningMic(false);
      recognition.onend = () => setIsListeningMic(false);
      recognition.start();
    } else {
      alert('Speech recognition is not supported in this browser.');
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white pt-6 pb-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Top Greeting Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <h1 className="text-3xl sm:text-4xl font-black font-serif text-white">
              Good Evening, {user?.name ? user.name.split(' ')[0] : 'Mahesh'} 👋
            </h1>
            <p className="text-slate-400 text-sm mt-1">
              Who would you like to request a midnight surprise call from today?
            </p>
          </div>

          <button
            onClick={onOpenAiConcierge}
            className="px-5 py-3 rounded-2xl bg-gradient-to-r from-indigo-950 via-purple-950 to-pink-950 border border-indigo-500/40 text-indigo-300 font-bold text-xs shadow-xl shadow-indigo-500/10 hover:border-indigo-500/70 hover:scale-105 transition-all flex items-center gap-2 self-start md:self-auto"
          >
            <Sparkles className="w-4 h-4 text-amber-400 animate-spin" style={{ animationDuration: '4s' }} />
            <span>AI Studio Concierge Helper</span>
          </button>
        </div>

        {/* Search Bar & Voice Input */}
        <div className="relative max-w-3xl mx-auto">
          <div className="relative flex items-center">
            <Search className="w-5 h-5 text-slate-400 absolute left-4 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by celebrity name, actor, singer, or occasion..."
              className="w-full pl-12 pr-14 py-4 rounded-2xl bg-slate-900 border border-slate-800 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-indigo-500 shadow-xl"
            />
            <button
              onClick={handleMicClick}
              className={`absolute right-3.5 p-2 rounded-xl border transition-all ${
                isListeningMic
                  ? 'bg-rose-600 text-white border-rose-500 animate-pulse'
                  : 'bg-slate-800 text-slate-400 hover:text-white border-slate-700'
              }`}
              title="Speak to Search"
            >
              <Mic className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Categories Bar */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2.5 rounded-2xl text-xs font-bold whitespace-nowrap transition-all ${
                selectedCategory === cat
                  ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg shadow-indigo-500/20 scale-105'
                  : 'bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white border border-slate-800'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Search Results / All Creators */}
        {searchQuery.trim() !== '' || selectedCategory !== 'All' ? (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-white font-serif">
                Results ({filteredCreators.length})
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {filteredCreators.map((creator) => (
                <CreatorCard key={creator.id} creator={creator} onSelect={onSelectCreator} />
              ))}
            </div>
          </div>
        ) : (
          /* Default Discover View: Trending & Recommended */
          <div className="space-y-12">
            {/* Trending Now */}
            <div className="space-y-6">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-xl bg-amber-500/20 text-amber-400">
                  <Flame className="w-5 h-5 fill-amber-400" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-white font-serif">Trending Now</h2>
                  <p className="text-xs text-slate-400">Most requested celebrities for midnight surprises</p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {trendingCreators.map((creator) => (
                  <CreatorCard key={creator.id} creator={creator} onSelect={onSelectCreator} />
                ))}
              </div>
            </div>

            {/* Recommended for You */}
            <div className="space-y-6">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-xl bg-purple-500/20 text-purple-400">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-white font-serif">Recommended for You</h2>
                  <p className="text-xs text-slate-400">Handpicked creators matched for birthdays & anniversaries</p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {recommendedCreators.map((creator) => (
                  <CreatorCard key={creator.id} creator={creator} onSelect={onSelectCreator} />
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
