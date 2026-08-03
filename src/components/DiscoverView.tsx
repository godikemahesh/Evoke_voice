import React, { useState, useMemo } from 'react';
import { Search, Mic, Sparkles } from 'lucide-react';
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

  const firstName = user?.name ? user.name.split(' ')[0] : 'Mahesh';

  return (
    <div className="min-h-screen bg-night-950 text-cream pt-10 pb-28">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 space-y-12">
        {/* Top Greeting Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <div className="operator-label mb-2">Evoke · Discover</div>
            <h1 className="font-display text-4xl sm:text-5xl font-light text-cream">
              Good evening, <span className="italic text-ember-300">{firstName}</span>
            </h1>
            <p className="text-mist-500 text-sm mt-2">
              Who would you like to surprise at midnight tonight?
            </p>
          </div>

          <button
            onClick={onOpenAiConcierge}
            className="inline-flex items-center gap-2 self-start md:self-auto px-5 py-3 bg-night-900 border border-night-800 hover:border-ember-500/50 text-cream text-xs font-medium transition-colors"
          >
            <Sparkles className="w-4 h-4 text-ember-400" />
            <span>Ask the AI Studio Concierge</span>
          </button>
        </div>

        {/* Search Bar & Voice Input */}
        <div className="relative max-w-3xl">
          <div className="relative flex items-center">
            <Search className="w-4 h-4 text-mist-500 absolute left-4 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by name, actor, singer, or occasion..."
              className="w-full pl-11 pr-14 py-3.5 bg-night-900 border border-night-800 text-cream placeholder-mist-600 text-sm focus:outline-none focus:border-ember-500 transition-colors"
            />
            <button
              onClick={handleMicClick}
              className={`absolute right-3 p-2 border transition-colors ${
                isListeningMic
                  ? 'bg-ember-500 text-night-950 border-ember-500'
                  : 'bg-night-800 text-mist-400 hover:text-cream border-night-700'
              }`}
              title="Speak to Search"
            >
              <Mic className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Categories Bar */}
        <div className="flex items-center gap-6 overflow-x-auto pb-2 scrollbar-none border-b border-night-800">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`relative pb-2 text-xs font-medium whitespace-nowrap transition-colors ${
                selectedCategory === cat
                  ? 'text-ember-300 after:absolute after:left-0 after:right-0 after:bottom-0 after:h-px after:bg-ember-400'
                  : 'text-mist-500 hover:text-cream'
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
              <h2 className="font-display text-2xl font-normal text-cream">
                Results ({filteredCreators.length})
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              {filteredCreators.map((creator) => (
                <CreatorCard key={creator.id} creator={creator} onSelect={onSelectCreator} />
              ))}
            </div>
          </div>
        ) : (
          /* Default Discover View: Trending & Recommended */
          <div className="space-y-14">
            {/* Trending Now */}
            <div className="space-y-8">
              <div className="flex items-baseline justify-between">
                <h2 className="font-display text-3xl font-light text-cream">Trending now</h2>
                <span className="operator-label hidden sm:block">Most requested</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                {trendingCreators.map((creator) => (
                  <CreatorCard key={creator.id} creator={creator} onSelect={onSelectCreator} />
                ))}
              </div>
            </div>

            {/* Recommended for You */}
            <div className="space-y-8">
              <div className="flex items-baseline justify-between">
                <h2 className="font-display text-3xl font-light text-cream">Recommended for you</h2>
                <span className="operator-label hidden sm:block">Handpicked</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
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
