import React, { useState } from 'react';
import { ArrowLeft, Star, Video, Phone, ShieldCheck, Clock, Volume2, Play, Pause, Sparkles } from 'lucide-react';
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
    <div className="min-h-screen bg-night-950 text-cream pt-6 pb-28">
      <div className="max-w-5xl mx-auto px-5 sm:px-8">
        {/* Top Navigation */}
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 text-mist-500 hover:text-ember-300 mb-6 text-sm font-medium transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Discover</span>
        </button>

        {/* Cover & Avatar Header */}
        <div className="relative border border-night-800 bg-night-900 mb-10 overflow-hidden">
          <div className="h-56 sm:h-80 w-full relative">
            <img
              src={creator.coverImage}
              alt={creator.name}
              referrerPolicy="no-referrer"
              onError={(e) => {
                e.currentTarget.src = 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&q=80&w=1200';
              }}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-night-950 via-night-950/40 to-night-950/20" />
          </div>

          <div className="p-6 sm:p-8 relative -mt-16 z-10">
            <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-6">
              <div className="flex items-end gap-5">
                <div className="w-24 h-24 sm:w-32 sm:h-32 border-4 border-night-950 overflow-hidden bg-night-900 flex-shrink-0">
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
                  <div className="flex items-center gap-2 mb-2 flex-wrap">
                    <span className="px-2 py-0.5 border border-ember-500/50 text-[10px] font-mono tracking-widest text-ember-300 uppercase">
                      {creator.category}
                    </span>
                    <span className="px-2 py-0.5 border border-night-700 text-[10px] font-mono tracking-widest text-mist-500 uppercase">
                      Verified
                    </span>
                  </div>
                  <h1 className="font-display text-4xl sm:text-5xl font-light text-cream">{creator.name}</h1>
                  <p className="text-mist-400 text-sm font-medium mt-1">{creator.tagline}</p>
                </div>
              </div>

              {/* Rating Box */}
              <div className="bg-night-900 border border-night-800 px-5 py-4 flex items-center gap-3">
                <Star className="w-7 h-7 text-ember-400 fill-ember-400" />
                <div>
                  <div className="text-xl font-semibold text-cream">{creator.rating} / 5.0</div>
                  <div className="text-xs text-mist-500">{creator.reviewsCount} fan reviews</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Info */}
          <div className="lg:col-span-2 space-y-8">
            {/* About */}
            <div className="border border-night-800 bg-night-900/40 p-6 sm:p-8 space-y-4">
              <div className="operator-label mb-1">About</div>
              <p className="text-mist-400 text-sm leading-relaxed">{creator.bio}</p>

              <div className="pt-4 border-t border-night-800 flex flex-wrap items-center gap-2">
                <span className="text-xs text-mist-500 mr-2 font-medium">Languages:</span>
                {creator.languages.map((lang) => (
                  <span
                    key={lang}
                    className="px-2.5 py-1 border border-night-800 text-xs font-medium text-mist-300"
                  >
                    {lang}
                  </span>
                ))}
              </div>
            </div>

            {/* Voice Preview */}
            {creator.audioSampleText && (
              <div className="border border-ember-500/30 bg-night-900/40 p-6 sm:p-8 space-y-5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-ember-400/10 border border-ember-500/40 flex items-center justify-center text-ember-400">
                      <Volume2 className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="operator-label !text-[10px]">Voice sample</div>
                      <p className="text-xs text-mist-400 mt-0.5">AI voice tone and timbre</p>
                    </div>
                  </div>

                  <button
                    onClick={handlePlaySample}
                    disabled={audioTtsLoading}
                    className="px-4 py-2.5 bg-ember-400 hover:bg-ember-300 disabled:opacity-50 text-night-950 font-semibold text-sm flex items-center gap-2 transition-colors"
                  >
                    {audioTtsLoading ? (
                      <span className="w-4 h-4 border-2 border-night-950 border-t-transparent rounded-full animate-spin"></span>
                    ) : isPlayingAudio ? (
                      <Pause className="w-4 h-4" />
                    ) : (
                      <Play className="w-4 h-4 fill-night-950" />
                    )}
                    <span>{isPlayingAudio ? 'Pause voice' : 'Listen sample'}</span>
                  </button>
                </div>

                <p className="text-sm italic text-mist-300 font-display leading-relaxed">
                  "{creator.audioSampleText}"
                </p>
              </div>
            )}

            {/* Guarantees */}
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 border border-night-800 bg-night-900/40 flex items-center gap-3">
                <Clock className="w-5 h-5 text-ember-400 flex-shrink-0" strokeWidth={1.5} />
                <div>
                  <div className="text-xs font-semibold text-cream">24h express option</div>
                  <div className="text-[11px] text-mist-500">Guaranteed delivery within 24 hours</div>
                </div>
              </div>

              <div className="p-4 border border-night-800 bg-night-900/40 flex items-center gap-3">
                <ShieldCheck className="w-5 h-5 text-ember-400 flex-shrink-0" strokeWidth={1.5} />
                <div>
                  <div className="text-xs font-semibold text-cream">100% refund guarantee</div>
                  <div className="text-[11px] text-mist-500">Full refund if not delivered on time</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Booking Panel */}
          <div className="space-y-6">
            <div className="border border-night-800 bg-night-900 p-6 space-y-6 sticky top-20">
              <h3 className="font-display text-xl font-medium text-cream">Select surprise format</h3>

              <div className="space-y-3">
                <div
                  onClick={() => setSelectedType('video')}
                  className={`p-4 border transition-colors cursor-pointer flex items-center justify-between ${
                    selectedType === 'video'
                      ? 'border-ember-500 bg-night-850'
                      : 'border-night-800 bg-night-950 hover:border-night-700'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 bg-ember-400/10 border border-ember-500/30 text-ember-400">
                      <Video className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-cream">4K Video Message</div>
                      <div className="text-xs text-mist-500">60s HD video for the recipient</div>
                    </div>
                  </div>
                  <div className="text-lg font-semibold text-ember-300">₹{creator.videoPrice}</div>
                </div>

                <div
                  onClick={() => setSelectedType('voice')}
                  className={`p-4 border transition-colors cursor-pointer flex items-center justify-between ${
                    selectedType === 'voice'
                      ? 'border-ember-500 bg-night-850'
                      : 'border-night-800 bg-night-950 hover:border-night-700'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 bg-ember-400/10 border border-ember-500/30 text-ember-400">
                      <Phone className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-cream">Voice Call / Note</div>
                      <div className="text-xs text-mist-500">Direct call or high quality audio note</div>
                    </div>
                  </div>
                  <div className="text-lg font-semibold text-ember-300">₹{creator.voicePrice}</div>
                </div>
              </div>

              <div className="pt-4 border-t border-night-800 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-mist-500 text-sm">Total price</span>
                  <span className="font-display text-2xl font-normal text-ember-300">₹{price}</span>
                </div>

                <button
                  onClick={() => onProceed(creator, selectedType)}
                  className="w-full py-4 bg-ember-400 hover:bg-ember-300 text-night-950 font-semibold text-sm transition-colors flex items-center justify-center gap-2"
                >
                  <Sparkles className="w-4 h-4 text-night-950" />
                  <span>Personalize surprise</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
