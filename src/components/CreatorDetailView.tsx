import React, { useState } from 'react';
import { ArrowLeft, Star, Video, Phone, ShieldCheck, Clock, Sparkles, Volume2, Play, Pause, CheckCircle } from 'lucide-react';
import { Creator, DeliveryType } from '../types';

interface Props {
  creator: Creator;
  onBack: () => void;
  onProceed: (creator: Creator, deliveryType: DeliveryType) => void;
}

export const CreatorDetailView: React.FC<Props> = ({ creator, onBack, onProceed }) => {
  const [selectedType, setSelectedType] = useState<DeliveryType>('video');
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [audioTtsLoading, setAudioTtsLoading] = useState(false);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);

  const price = selectedType === 'video' ? creator.videoPrice : creator.voicePrice;

  const handlePlaySample = async () => {
    if (isPlayingAudio) {
      setIsPlayingAudio(false);
      return;
    }

    if (!creator.audioSampleText) return;

    try {
      setAudioTtsLoading(true);
      const res = await fetch('/api/tts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          text: creator.audioSampleText,
          voice: 'Puck',
        }),
      });
      const data = await res.json();
      if (data.success && data.audioBase64) {
        const pcmBlob = new Blob(
          [Uint8Array.from(atob(data.audioBase64), (c) => c.charCodeAt(0))],
          { type: 'audio/wav' }
        );
        const url = URL.createObjectURL(pcmBlob);
        setAudioUrl(url);
        setIsPlayingAudio(true);

        const audio = new Audio(url);
        audio.play();
        audio.onended = () => setIsPlayingAudio(false);
      } else {
        // Fallback simulated speech synth if server key not present
        const synth = window.speechSynthesis;
        if (synth) {
          const utterance = new SpeechSynthesisUtterance(creator.audioSampleText);
          utterance.rate = 0.95;
          utterance.pitch = 1.0;
          utterance.onend = () => setIsPlayingAudio(false);
          synth.speak(utterance);
          setIsPlayingAudio(true);
        }
      }
    } catch (e) {
      console.warn('TTS Fallback:', e);
      const synth = window.speechSynthesis;
      if (synth) {
        const utterance = new SpeechSynthesisUtterance(creator.audioSampleText);
        utterance.onend = () => setIsPlayingAudio(false);
        synth.speak(utterance);
        setIsPlayingAudio(true);
      }
    } finally {
      setAudioTtsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white pt-6 pb-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        {/* Top Navigation */}
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 text-slate-400 hover:text-white mb-6 text-sm font-medium transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Discover</span>
        </button>

        {/* Cover & Avatar Header */}
        <div className="relative rounded-3xl overflow-hidden bg-slate-900 border border-slate-800 shadow-2xl mb-8">
          <div className="h-56 sm:h-72 w-full relative">
            <img
              src={creator.coverImage}
              alt={creator.name}
              referrerPolicy="no-referrer"
              onError={(e) => {
                e.currentTarget.src = 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&q=80&w=1200';
              }}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent"></div>
          </div>

          <div className="p-6 sm:p-8 relative -mt-20 z-10">
            <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-6">
              <div className="flex items-end gap-5">
                <div className="w-28 h-28 sm:w-36 sm:h-36 rounded-3xl border-4 border-slate-950 overflow-hidden shadow-2xl bg-slate-900 flex-shrink-0">
                  <img
                    src={creator.avatar}
                    alt={creator.name}
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      e.currentTarget.src = 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=800';
                    }}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1 flex-wrap">
                    <span className="px-2.5 py-0.5 rounded-full bg-emerald-950/90 border border-emerald-500/60 text-[11px] font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1 shadow-md">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                      Coming Soon
                    </span>
                    <span className="px-2.5 py-0.5 rounded-full bg-indigo-950/80 border border-indigo-500/40 text-[11px] font-bold text-indigo-300 uppercase tracking-wider">
                      {creator.category}
                    </span>
                    <span className="px-2.5 py-0.5 rounded-full bg-slate-800/80 border border-slate-700 text-[11px] font-bold text-slate-300 flex items-center gap-1">
                      <CheckCircle className="w-3 h-3 text-indigo-400" />
                      Verified Celeb
                    </span>
                  </div>
                  <h1 className="text-2xl sm:text-4xl font-black text-white font-serif">{creator.name}</h1>
                  <p className="text-slate-300 text-sm font-medium mt-0.5">{creator.tagline}</p>
                </div>
              </div>

              {/* Rating Box */}
              <div className="bg-slate-900/90 border border-slate-800 p-4 rounded-2xl flex items-center gap-3 backdrop-blur-md">
                <Star className="w-8 h-8 text-amber-400 fill-amber-400" />
                <div>
                  <div className="text-xl font-bold text-white">{creator.rating} / 5.0</div>
                  <div className="text-xs text-slate-400">{creator.reviewsCount} Fan Reviews</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Info */}
          <div className="lg:col-span-2 space-y-8">
            {/* About Section */}
            <div className="bg-slate-900/80 rounded-3xl p-6 border border-slate-800 space-y-4">
              <h2 className="text-xl font-bold text-white font-serif">About Creator</h2>
              <p className="text-slate-300 text-sm leading-relaxed">{creator.bio}</p>

              <div className="pt-4 border-t border-slate-800 flex flex-wrap gap-2">
                <span className="text-xs text-slate-400 mr-2 font-medium self-center">Languages:</span>
                {creator.languages.map((lang) => (
                  <span
                    key={lang}
                    className="px-3 py-1 rounded-full bg-slate-800 text-xs font-semibold text-slate-200"
                  >
                    {lang}
                  </span>
                ))}
              </div>
            </div>

            {/* Audio Voice Preview */}
            {creator.audioSampleText && (
              <div className="bg-gradient-to-r from-indigo-950/60 to-purple-950/60 rounded-3xl p-6 border border-indigo-500/30 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-2xl bg-indigo-600 flex items-center justify-center text-white">
                      <Volume2 className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-white">Voice Sample</h3>
                      <p className="text-xs text-indigo-300">Listen to AI voice tone & timbre</p>
                    </div>
                  </div>

                  <button
                    onClick={handlePlaySample}
                    disabled={audioTtsLoading}
                    className="px-4 py-2.5 rounded-2xl bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white font-semibold text-sm flex items-center gap-2 shadow-lg shadow-indigo-500/20 transition-all"
                  >
                    {audioTtsLoading ? (
                      <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                    ) : isPlayingAudio ? (
                      <Pause className="w-4 h-4" />
                    ) : (
                      <Play className="w-4 h-4 fill-white" />
                    )}
                    <span>{isPlayingAudio ? 'Pause Voice' : 'Listen Sample'}</span>
                  </button>
                </div>

                <div className="bg-slate-950/60 p-4 rounded-2xl border border-indigo-900/50">
                  <p className="text-sm italic text-indigo-200 font-serif">
                    &quot;{creator.audioSampleText}&quot;
                  </p>
                </div>
              </div>
            )}

            {/* Guarantees */}
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 flex items-center gap-3">
                <Clock className="w-6 h-6 text-indigo-400 flex-shrink-0" />
                <div>
                  <div className="text-xs font-bold text-white">24h Express Option</div>
                  <div className="text-[11px] text-slate-400">Guaranteed delivery within 24 hours</div>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 flex items-center gap-3">
                <ShieldCheck className="w-6 h-6 text-emerald-400 flex-shrink-0" />
                <div>
                  <div className="text-xs font-bold text-white">100% Refund Guarantee</div>
                  <div className="text-[11px] text-slate-400">Full refund if not delivered on time</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Booking Selection Panel */}
          <div className="space-y-6">
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-6 sticky top-24 shadow-2xl">
              <h3 className="text-lg font-bold text-white font-serif">Select Surprise Format</h3>

              {/* Delivery Type Cards */}
              <div className="space-y-3">
                <div
                  onClick={() => setSelectedType('video')}
                  className={`p-4 rounded-2xl border-2 transition-all cursor-pointer flex items-center justify-between ${
                    selectedType === 'video'
                      ? 'bg-amber-950/40 border-amber-500 text-white shadow-lg shadow-amber-500/10'
                      : 'bg-slate-950/60 border-slate-800 hover:border-slate-700 text-slate-300'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 rounded-xl bg-amber-500/20 text-amber-400">
                      <Video className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-sm font-bold">4K Video Message</div>
                      <div className="text-xs text-slate-400">60s HD video recorded exclusively for recipient</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-black text-amber-300">₹{creator.videoPrice}</div>
                  </div>
                </div>

                <div
                  onClick={() => setSelectedType('voice')}
                  className={`p-4 rounded-2xl border-2 transition-all cursor-pointer flex items-center justify-between ${
                    selectedType === 'voice'
                      ? 'bg-amber-950/40 border-amber-500 text-white shadow-lg shadow-amber-500/10'
                      : 'bg-slate-950/60 border-slate-800 hover:border-slate-700 text-slate-300'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 rounded-xl bg-amber-500/20 text-amber-400">
                      <Phone className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-sm font-bold">Voice Call / Note</div>
                      <div className="text-xs text-slate-400">Direct phone call or high quality voice audio note</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-black text-amber-300">₹{creator.voicePrice}</div>
                  </div>
                </div>
              </div>

              {/* Total & Checkout CTA */}
              <div className="pt-4 border-t border-slate-800 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-slate-400 text-sm">Total Price:</span>
                  <span className="text-2xl font-black text-amber-400">₹{price}</span>
                </div>

                <button
                  onClick={() => onProceed(creator, selectedType)}
                  className="w-full py-4 rounded-2xl bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 text-slate-950 font-bold text-base shadow-xl shadow-amber-500/25 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2"
                >
                  <Sparkles className="w-5 h-5 text-slate-950" />
                  <span>Personalize Surprise</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
