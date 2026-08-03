import React, { useState, useEffect } from 'react';
import {
  Phone,
  Video,
  Play,
  Star,
  ArrowRight,
  Heart,
  Clock,
  Volume2,
  Radio,
  ShieldCheck,
  Award,
  Zap,
} from 'lucide-react';
import { CanvasShaderBackground } from './CanvasShaderBackground';
import { Creator } from '../types';

interface Props {
  onStartBooking: (creator?: Creator) => void;
  onSurpriseSomeone?: () => void;
  onExplore: () => void;
  featuredCreators: Creator[];
  onSelectCreator: (creator: Creator) => void;
}

export const LandingHero: React.FC<Props> = ({
  onStartBooking,
  onSurpriseSomeone,
  onExplore,
  featuredCreators,
  onSelectCreator,
}) => {
  const [clockTime, setClockTime] = useState<'11:59 PM' | '12:00 AM'>('11:59 PM');
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [demoModalOpen, setDemoModalOpen] = useState(false);
  const [sandboxCreator, setSandboxCreator] = useState<Creator>(featuredCreators[0] || ({} as Creator));
  const [sandboxOccasion, setSandboxOccasion] = useState('Birthday');
  const [sandboxPrompt, setSandboxPrompt] = useState(
    "Wish Mahesh an extraordinary 28th birthday! Mention his passion for AI startups and tell him 2026 is his year to conquer the world."
  );

  useEffect(() => {
    const timer = setInterval(() => {
      setClockTime((prev) => (prev === '11:59 PM' ? '12:00 AM' : '11:59 PM'));
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const heroCreator = featuredCreators[0] || ({} as Creator);
  const featured = featuredCreators.slice(0, 8);

  return (
    <div className="relative bg-night-950 text-cream overflow-hidden font-sans">
      <CanvasShaderBackground variant="cosmic" />

      {/* ==========================================
          SECTION 1 — HERO (asymmetric editorial split)
      ========================================== */}
      <section className="relative min-h-[92vh] flex items-center z-10">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center py-16 lg:py-24">
            {/* Left — the pitch */}
            <div className="lg:col-span-6 space-y-8">
              <div className="operator-label reveal">Evoke · Midnight Surprise Dispatch</div>

              <h1 className="font-display font-light text-5xl sm:text-6xl xl:text-7xl leading-[1.02] tracking-tight text-cream reveal reveal-delay-1">
                Imagine the phone rings at{' '}
                <span className="italic text-ember-300">exactly midnight</span>
              </h1>

              <p className="font-display text-2xl sm:text-3xl font-normal italic text-mist-400 max-w-xl leading-snug reveal reveal-delay-2">
                and the voice on the other end is the one they've admired for years.
              </p>

              <p className="text-mist-500 text-sm sm:text-base max-w-md leading-relaxed reveal reveal-delay-2">
                A personalized AI call or 4K video from a world-class creator, written for one
                person, scheduled to arrive at 12:00 AM. On the second.
              </p>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2 reveal reveal-delay-3">
                <button
                  onClick={() => (onSurpriseSomeone ? onSurpriseSomeone() : onExplore())}
                  className="px-7 py-3.5 bg-ember-400 hover:bg-ember-300 text-night-950 font-semibold text-sm transition-colors flex items-center justify-center gap-2"
                >
                  <span>Surprise Someone</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  onClick={() => setDemoModalOpen(true)}
                  className="px-7 py-3.5 bg-night-900 hover:bg-night-800 border border-night-700 text-cream font-medium text-sm transition-colors flex items-center justify-center gap-2"
                >
                  <Play className="w-4 h-4 text-ember-400" />
                  <span>Watch the film</span>
                </button>
              </div>

              <div className="pt-4 flex items-center gap-8 text-xs text-mist-500 reveal reveal-delay-3">
                <span className="flex items-center gap-2">
                  <Star className="w-3.5 h-3.5 text-ember-400" /> 4.9 · 12,000+ surprises
                </span>
                <span className="flex items-center gap-2">
                  <ShieldCheck className="w-3.5 h-3.5 text-ember-400" /> Creator-approved voices
                </span>
              </div>
            </div>

            {/* Right — the midnight cinema frame */}
            <div className="lg:col-span-6 flex justify-center lg:justify-end">
              <div className="w-full max-w-sm">
                <div className="relative letterbox rounded-sm border border-night-800 overflow-hidden bg-night-900">
                  {/* Top label */}
                  <div className="relative z-20 flex items-center justify-between px-4 py-2 bg-night-950/80 border-b border-night-800">
                    <span className="operator-label !text-[10px]">REC · {clockTime}</span>
                    <button
                      onClick={() => setClockTime((prev) => (prev === '11:59 PM' ? '12:00 AM' : '11:59 PM'))}
                      className="text-[11px] font-mono tracking-widest text-ember-300 hover:text-ember-200 transition-colors"
                    >
                      {clockTime === '12:00 AM' ? '● LIVE CALL' : '● AWAITING DISPATCH'}
                    </button>
                  </div>

                  {/* Screen */}
                  <div className="relative h-[520px] overflow-hidden bg-night-950">
                    <img
                      src={heroCreator.coverImage}
                      alt={heroCreator.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover brightness-[0.85]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-night-950 via-night-950/40 to-night-950/30" />

                    {/* Call header */}
                    <div className="absolute top-10 left-0 right-0 px-6 text-center z-10 space-y-2">
                      <span className="inline-flex items-center gap-2 px-2.5 py-1 bg-night-950/70 border border-ember-500/40 text-[10px] font-mono tracking-widest text-ember-300 uppercase">
                        <span className={`w-1.5 h-1.5 rounded-full ${clockTime === '12:00 AM' ? 'bg-ember-400 animate-pulse' : 'bg-mist-500'}`} />
                        Incoming midnight call
                      </span>
                      <h3 className="font-display text-3xl font-semibold text-cream">{heroCreator.name}</h3>
                      <p className="text-xs text-mist-400 font-medium">{heroCreator.tagline}</p>
                    </div>

                    {/* Waveform */}
                    <div className="absolute bottom-24 left-4 right-4 z-10 bg-night-950/85 border border-night-800 p-4 space-y-3">
                      <div className="flex items-center justify-between text-[11px]">
                        <span className="font-mono tracking-widest text-ember-400 flex items-center gap-1.5 uppercase">
                          <Radio className="w-3 h-3" /> AI voice synthesis
                        </span>
                        <span className="text-mist-500 font-mono text-[10px]">4K VOICE HD</span>
                      </div>
                      <div className="flex items-center gap-1 h-6">
                        {[40, 70, 30, 90, 100, 60, 80, 40, 95, 75, 50, 85, 30, 90, 65, 40].map((h, i) => (
                          <div
                            key={i}
                            className={`flex-1 rounded-sm bg-ember-500/80 transition-all duration-300 ${
                              isPlayingAudio ? 'ember-breathe' : ''
                            }`}
                            style={{ height: isPlayingAudio ? `${h}%` : '18%' }}
                          />
                        ))}
                      </div>
                      <p className="text-[11px] italic text-mist-400 font-display leading-snug line-clamp-1">
                        "{heroCreator.audioSampleText}"
                      </p>
                    </div>

                    {/* Call controls */}
                    <div className="absolute bottom-5 left-4 right-4 z-10 flex items-center justify-between">
                      <button
                        onClick={() => setIsPlayingAudio(!isPlayingAudio)}
                        className="w-11 h-11 rounded-full bg-night-800 hover:bg-night-700 border border-night-700 flex items-center justify-center text-cream transition-colors"
                      >
                        <Volume2 className="w-4 h-4" />
                      </button>

                      <button
                        onClick={() => {
                          setIsPlayingAudio(true);
                          setClockTime('12:00 AM');
                        }}
                        className="px-5 py-3 bg-ember-400 hover:bg-ember-300 text-night-950 text-xs font-semibold tracking-wide flex items-center gap-2 transition-colors"
                      >
                        <Phone className="w-4 h-4" />
                        <span>Play the call</span>
                      </button>

                      <span className="text-[10px] font-mono tracking-widest text-mist-500">
                        {clockTime === '12:00 AM' ? '00:00:00' : '23:59:59'}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Caption */}
                <div className="mt-4 flex items-center justify-between text-[11px] text-mist-500 font-mono tracking-wider">
                  <span>STILL — {heroCreator.name}</span>
                  <span className="flex items-center gap-1.5">
                    <Clock className="w-3 h-3 text-ember-400" /> SCHEDULED DISPATCH
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ==========================================
          SECTION 2 — TICKER
      ========================================== */}
      <section className="relative z-10 border-y border-night-800 bg-night-950/80 overflow-hidden">
        <div className="flex whitespace-nowrap ticker-track py-3">
          {[0, 1].map((dup) => (
            <div key={dup} className="flex items-center shrink-0">
              {['12:00 AM', 'EVERY SURPRISE, ON THE SECOND', 'CALL', 'VIDEO', '12:00 AM', 'ONE PERSON, WRITTEN FOR THEM'].map((item, i) => (
                <span key={i} className="flex items-center text-ember-400 font-mono text-xs tracking-[0.3em] uppercase px-6">
                  {item}
                  <span className="w-1.5 h-1.5 bg-ember-500/60 ml-6" />
                </span>
              ))}
            </div>
          ))}
        </div>
      </section>

      {/* ==========================================
          SECTION 3 — HOW IT WORKS (numbered editorial rows)
      ========================================== */}
      <section id="how-it-works" className="relative z-10 py-24 sm:py-32 border-b border-night-800 scroll-mt-16">
        <div className="max-w-6xl mx-auto px-5 sm:px-8 lg:px-12">
          <div className="flex items-baseline justify-between mb-16">
            <h2 className="font-display text-4xl sm:text-6xl font-light text-cream">
              How the magic <span className="italic text-ember-300">happens</span>
            </h2>
            <span className="operator-label hidden sm:block">The Evoke Journey</span>
          </div>

          <div className="space-y-0">
            {[
              {
                n: '01',
                title: 'Choose your creator',
                body: 'Browse the roster of verified voices. Every one is a name people know.',
                cta: 'Browse creators',
                action: onExplore,
              },
              {
                n: '02',
                title: 'Write the one detail that matters',
                body: 'An inside joke, a nickname, an age. The script is written for this one person, not a template.',
              },
              {
                n: '03',
                title: 'Schedule 12:00 AM',
                body: 'Pick the date. Dispatch locks to the exact stroke of midnight.',
              },
              {
                n: '04',
                title: 'The phone rings',
                body: 'The voice they admire starts speaking their name. That is the whole product.',
              },
            ].map((row) => (
              <div
                key={row.n}
                className="group grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-8 py-10 border-b border-night-800/80 last:border-b-0"
              >
                <div className="md:col-span-2">
                  <span className="font-display text-5xl font-light text-mist-600 group-hover:text-ember-400 transition-colors">
                    {row.n}
                  </span>
                </div>
                <div className="md:col-span-7">
                  <h3 className="font-display text-3xl sm:text-4xl font-normal text-cream">{row.title}</h3>
                </div>
                <div className="md:col-span-3 flex flex-col md:items-end gap-4">
                  <p className="text-sm text-mist-500 leading-relaxed max-w-xs">{row.body}</p>
                  {row.cta && (
                    <button
                      onClick={row.action}
                      className="inline-flex items-center gap-2 text-xs font-semibold text-ember-400 hover:text-ember-300 transition-colors"
                    >
                      {row.cta} <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ==========================================
          SECTION 4 — FEATURED CREATORS
      ========================================== */}
      <section id="creators" className="relative z-10 py-24 sm:py-32 border-b border-night-800 scroll-mt-16">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
          <div className="flex items-baseline justify-between mb-16">
            <div>
              <h2 className="font-display text-4xl sm:text-6xl font-light text-cream">Featured voices</h2>
              <p className="text-mist-500 text-sm mt-2">A short roster of the names on the other end of midnight.</p>
            </div>
            <button
              onClick={onExplore}
              className="hidden sm:inline-flex items-center gap-2 text-xs font-semibold text-ember-400 hover:text-ember-300 transition-colors"
            >
              Explore all <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {featured.map((creator, idx) => (
              <div
                key={creator.id}
                onClick={() => onSelectCreator(creator)}
                className="group relative cursor-pointer"
              >
                <div className="relative aspect-[4/5] overflow-hidden bg-night-900 border border-night-800 group-hover:border-ember-500/50 transition-colors">
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
                    {String(idx + 1).padStart(2, '0')}
                  </span>
                  <span className="absolute top-3 right-3 inline-flex items-center gap-1 text-[11px] text-ember-300">
                    <Star className="w-3 h-3 fill-ember-400 text-ember-400" /> {creator.rating}
                  </span>
                </div>

                <div className="py-3 flex items-start justify-between gap-3">
                  <div>
                    <h3 className="font-display text-lg font-medium text-cream leading-tight">{creator.name}</h3>
                    <p className="text-[11px] text-mist-500 mt-0.5 line-clamp-1">{creator.tagline}</p>
                  </div>
                  <div className="text-right shrink-0">
                    <span className="block text-xs font-semibold text-ember-300">₹{creator.voicePrice}</span>
                    <span className="block text-[10px] text-mist-600">voice</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <button
            onClick={onExplore}
            className="sm:hidden mt-8 w-full py-3.5 bg-night-900 border border-night-700 text-cream text-sm font-medium transition-colors"
          >
            Explore all creators
          </button>
        </div>
      </section>

      {/* ==========================================
          SECTION 5 — LIVE SANDBOX
      ========================================== */}
      <section id="demo" className="relative z-10 py-24 sm:py-32 border-b border-night-800 scroll-mt-16">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
          <div className="flex items-baseline justify-between mb-14">
            <h2 className="font-display text-4xl sm:text-6xl font-light text-cream">
              Try it <span className="italic text-ember-300">live</span>
            </h2>
            <span className="operator-label hidden sm:block">Live Customizer</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 border border-night-800 bg-night-900/40 p-6 sm:p-10">
            {/* Controls */}
            <div className="lg:col-span-6 space-y-8">
              <div>
                <label className="operator-label !text-[10px] block mb-3">1 · Select creator</label>
                <div className="grid grid-cols-2 gap-2">
                  {featuredCreators.slice(0, 4).map((c) => (
                    <button
                      key={c.id}
                      onClick={() => setSandboxCreator(c)}
                      className={`p-3 border text-left flex items-center gap-3 transition-colors ${
                        sandboxCreator.id === c.id
                          ? 'border-ember-500 bg-night-850'
                          : 'border-night-800 bg-night-950 hover:border-night-700'
                      }`}
                    >
                      <img src={c.avatar} alt={c.name} className="w-8 h-8 rounded-sm object-cover" />
                      <div className="overflow-hidden">
                        <div className="text-xs font-semibold truncate text-cream">{c.name}</div>
                        <div className="text-[10px] text-mist-500 truncate">₹{c.voicePrice} call</div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="operator-label !text-[10px] block mb-3">2 · Select occasion</label>
                <div className="flex flex-wrap gap-2">
                  {['Birthday', 'Graduation', 'Promotion', 'Wedding', 'Festival', 'Roast'].map((occ) => (
                    <button
                      key={occ}
                      onClick={() => setSandboxOccasion(occ)}
                      className={`px-3.5 py-2 text-xs font-medium border transition-colors ${
                        sandboxOccasion === occ
                          ? 'border-ember-500 text-ember-300 bg-night-850'
                          : 'border-night-800 text-mist-400 hover:text-cream'
                      }`}
                    >
                      {occ}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="operator-label !text-[10px] block mb-3">3 · The one detail</label>
                <textarea
                  value={sandboxPrompt}
                  onChange={(e) => setSandboxPrompt(e.target.value)}
                  rows={3}
                  className="w-full p-4 bg-night-950 border border-night-800 text-sm text-cream focus:outline-none focus:border-ember-500"
                />
              </div>

              <button
                onClick={() => onStartBooking(sandboxCreator)}
                className="w-full py-4 bg-ember-400 hover:bg-ember-300 text-night-950 font-semibold text-sm transition-colors flex items-center justify-center gap-2"
              >
                <span>Book this surprise · ₹{sandboxCreator.voicePrice || 99}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            {/* Live phone preview */}
            <div className="lg:col-span-6 flex justify-center">
              <div className="relative w-full max-w-[300px]">
                <div className="border-[5px] border-night-700 overflow-hidden bg-night-900">
                  <div className="relative h-[440px] bg-night-950">
                    <img
                      src={sandboxCreator.coverImage || sandboxCreator.avatar}
                      alt={sandboxCreator.name}
                      className="w-full h-full object-cover brightness-[0.85]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-night-950 via-night-950/50 to-night-950/20" />

                    <div className="absolute top-8 left-0 right-0 px-4 text-center z-10 space-y-1.5">
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 bg-night-950/70 border border-ember-500/40 text-[10px] font-mono tracking-widest text-ember-300 uppercase">
                        <span className="w-1 h-1 rounded-full bg-ember-400 animate-pulse" />
                        12:00 AM · {sandboxOccasion}
                      </span>
                      <h4 className="font-display text-xl font-semibold text-cream pt-1">{sandboxCreator.name}</h4>
                      <p className="text-[11px] text-mist-400">{sandboxCreator.tagline}</p>
                    </div>

                    <div className="absolute bottom-16 left-3 right-3 z-10 bg-night-950/90 border border-night-800 p-3 space-y-1">
                      <div className="text-[10px] font-mono tracking-widest text-ember-400 uppercase">Live script preview</div>
                      <p className="text-[11px] italic text-mist-300 font-display leading-relaxed line-clamp-3">
                        "{sandboxPrompt}"
                      </p>
                    </div>

                    <div className="absolute bottom-4 left-4 right-4 z-10">
                      <button
                        onClick={() => setDemoModalOpen(true)}
                        className="w-full py-2.5 bg-night-800 hover:bg-night-700 border border-night-700 text-cream text-xs font-medium transition-colors flex items-center justify-center gap-2"
                      >
                        <Volume2 className="w-3.5 h-3.5 text-ember-400" />
                        <span>Preview the moment</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ==========================================
          SECTION 6 — WHY EVOKE
      ========================================== */}
      <section id="why-evoke" className="relative z-10 py-24 sm:py-32 border-b border-night-800 scroll-mt-16">
        <div className="max-w-6xl mx-auto px-5 sm:px-8 lg:px-12">
          <div className="mb-16">
            <h2 className="font-display text-4xl sm:text-6xl font-light text-cream">
              Why <span className="italic text-ember-300">Evoke</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-night-800 border border-night-800">
            {[
              { icon: ShieldCheck, title: 'Licensed AI voices', body: 'Creator-approved models, trained with official consent.' },
              { icon: Clock, title: 'On-time, to the second', body: 'Automated dispatch locks the call to exactly 12:00 AM.' },
              { icon: Video, title: 'Real 4K video', body: 'Unique lip-sync and lighting for every single surprise.' },
              { icon: Award, title: 'Written for one person', body: 'Gemini crafts the script from your inside jokes and details.' },
            ].map((f) => (
              <div key={f.title} className="bg-night-950 p-8 space-y-4">
                <f.icon className="w-6 h-6 text-ember-400" strokeWidth={1.5} />
                <h3 className="font-display text-xl font-medium text-cream">{f.title}</h3>
                <p className="text-xs text-mist-500 leading-relaxed">{f.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ==========================================
          SECTION 7 — OCCASIONS
      ========================================== */}
      <section id="occasions" className="relative z-10 py-24 sm:py-32 border-b border-night-800 scroll-mt-16">
        <div className="max-w-6xl mx-auto px-5 sm:px-8 lg:px-12">
          <div className="mb-16">
            <h2 className="font-display text-4xl sm:text-6xl font-light text-cream">
              Every special <span className="italic text-ember-300">moment</span>
            </h2>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-night-800 border border-night-800">
            {[
              { name: 'Birthday', desc: '12:00 AM calls', icon: Zap },
              { name: 'Graduation', desc: 'Degrees and milestones', icon: Award },
              { name: 'Wedding', desc: 'Blessings and toasts', icon: Heart },
              { name: 'Festival', desc: 'Diwali, New Year, holidays', icon: Radio },
            ].map((o) => (
              <div key={o.name} onClick={onExplore} className="group bg-night-950 p-8 cursor-pointer transition-colors hover:bg-night-900">
                <o.icon className="w-6 h-6 text-mist-500 group-hover:text-ember-400 transition-colors mb-6" strokeWidth={1.5} />
                <h3 className="font-display text-xl font-medium text-cream">{o.name}</h3>
                <p className="text-xs text-mist-500 mt-1">{o.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ==========================================
          SECTION 8 — TESTIMONIALS
      ========================================== */}
      <section className="relative z-10 py-24 sm:py-32 border-b border-night-800">
        <div className="max-w-6xl mx-auto px-5 sm:px-8 lg:px-12">
          <div className="mb-16">
            <h2 className="font-display text-4xl sm:text-6xl font-light text-cream">
              The 12,000th <span className="italic text-ember-300">reaction</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                quote: "The call connected right as the clock turned midnight. The script was so personal my father had tears in his eyes.",
                name: 'Ananya R.',
                place: 'Mumbai',
              },
              {
                quote: "The 12:00 AM precision is unreal. The voice said his name and he froze. We have watched it a hundred times.",
                name: 'Marcus V.',
                place: 'London',
              },
              {
                quote: "A 4K video from a name my sister grew up watching. The whole room went silent, then burst into applause.",
                name: 'Jessica T.',
                place: 'San Francisco',
              },
            ].map((t) => (
              <figure key={t.name} className="border border-night-800 bg-night-900/40 p-8 space-y-6">
                <div className="flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-ember-400 text-ember-400" />
                  ))}
                </div>
                <blockquote className="font-display text-lg font-normal italic text-cream leading-relaxed">
                  "{t.quote}"
                </blockquote>
                <figcaption className="text-xs text-mist-500 font-mono tracking-wider">
                  {t.name.toUpperCase()} · {t.place.toUpperCase()}
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* ==========================================
          SECTION 9 — PRICING
      ========================================== */}
      <section id="pricing" className="relative z-10 py-24 sm:py-32 border-b border-night-800 scroll-mt-16">
        <div className="max-w-5xl mx-auto px-5 sm:px-8 lg:px-12">
          <div className="mb-16">
            <h2 className="font-display text-4xl sm:text-6xl font-light text-cream">
              Simple, <span className="italic text-ember-300">honest</span> pricing
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-night-800 border border-night-800">
            {[
              {
                name: 'Voice call',
                price: '₹99',
                tag: 'Instant call',
                features: ['Scheduled 12:00 AM call', 'AI-written script', 'HD audio recording', 'SMS call alert'],
                cta: 'Select voice call',
                primary: false,
              },
              {
                name: '4K video',
                price: '₹59',
                tag: 'Video message',
                features: ['4K Ultra HD video file', 'Studio lip-sync', 'Permanent download link', 'Certificate keepsake'],
                cta: 'Select video',
                primary: false,
              },
              {
                name: 'Midnight bundle',
                price: '₹129',
                tag: 'The full surprise',
                features: ['Live midnight call', '4K video file', 'Priority generation', 'Frameable keepsake'],
                cta: 'Get the bundle',
                primary: true,
              },
            ].map((p) => (
              <div
                key={p.name}
                className={`p-10 flex flex-col justify-between space-y-8 ${
                  p.primary ? 'bg-night-900 relative' : 'bg-night-950'
                }`}
              >
                {p.primary && (
                  <span className="absolute -top-px left-0 right-0 h-px bg-ember-500" />
                )}
                <div className="space-y-4">
                  <div className="operator-label !text-[10px]">{p.tag}</div>
                  <h3 className="font-display text-2xl font-medium text-cream">{p.name}</h3>
                  <div className="font-display text-5xl font-light text-cream">
                    {p.price}
                    <span className="text-sm font-sans text-mist-500"> / surprise</span>
                  </div>
                </div>
                <ul className="space-y-3 text-xs text-mist-400">
                  {p.features.map((f) => (
                    <li key={f} className="flex items-center gap-2.5">
                      <span className="w-1 h-1 bg-ember-400 shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
                <button
                  onClick={onExplore}
                  className={`w-full py-3.5 text-sm font-medium transition-colors ${
                    p.primary
                      ? 'bg-ember-400 hover:bg-ember-300 text-night-950'
                      : 'bg-night-850 hover:bg-night-800 border border-night-700 text-cream'
                  }`}
                >
                  {p.cta}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ==========================================
          SECTION 10 — FINAL CTA
      ========================================== */}
      <section className="relative z-10 py-28 sm:py-40 overflow-hidden text-center">
        <CanvasShaderBackground variant="success" />
        <div className="relative z-10 max-w-3xl mx-auto px-5 space-y-8">
          <div className="operator-label reveal">It is 11:59 somewhere</div>
          <h2 className="font-display text-4xl sm:text-6xl font-light text-cream leading-tight reveal reveal-delay-1">
            Some surprises last a moment.
            <span className="block italic text-ember-300">This one becomes a memory forever.</span>
          </h2>
          <button
            onClick={() => onStartBooking(heroCreator)}
            className="reveal reveal-delay-2 px-10 py-4 bg-ember-400 hover:bg-ember-300 text-night-950 font-semibold text-sm transition-colors inline-flex items-center gap-3"
          >
            <span>Create your first surprise</span>
            <ArrowRight className="w-4 h-4" />
          </button>
          <p className="text-[11px] text-mist-500 font-mono tracking-widest uppercase pt-2">
            Evoke · Midnight AI Voice &amp; Video Gifting
          </p>
        </div>
      </section>

      {/* ==========================================
          FOOTER
      ========================================== */}
      <footer className="relative z-10 py-12 border-t border-night-800">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <span className="font-display text-xl font-semibold text-cream uppercase">Evoke</span>
            <p className="text-[10px] text-mist-600">© 2026 Evoke AI Inc. All rights reserved.</p>
          </div>
          <div className="flex flex-wrap items-center gap-6 text-xs text-mist-500 font-medium">
            <button onClick={onExplore} className="hover:text-ember-300 transition-colors">Creators</button>
            <button onClick={onExplore} className="hover:text-ember-300 transition-colors">Occasions</button>
            <button onClick={onExplore} className="hover:text-ember-300 transition-colors">Pricing</button>
            <span className="hover:text-ember-300 cursor-pointer transition-colors">Privacy Policy</span>
            <span className="hover:text-ember-300 cursor-pointer transition-colors">Terms of Service</span>
          </div>
        </div>
      </footer>

      {/* Watch Demo Modal */}
      {demoModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-night-950/90 backdrop-blur-xl">
          <div className="bg-night-900 border border-night-800 p-6 sm:p-8 max-w-xl w-full text-cream relative space-y-6">
            <button
              onClick={() => setDemoModalOpen(false)}
              className="absolute top-4 right-4 text-mist-500 hover:text-cream p-1 transition-colors"
            >
              ✕
            </button>

            <div className="operator-label">Midnight preview</div>
            <div className="space-y-2">
              <h3 className="font-display text-2xl font-medium text-cream">A birthday, at 12:00 AM</h3>
              <p className="text-xs text-mist-500">A glimpse of how the moment arrives.</p>
            </div>

            <div className="relative overflow-hidden bg-night-950 border border-night-800 h-64 flex items-center justify-center">
              <img
                src={heroCreator.coverImage}
                alt="Demo"
                className="w-full h-full object-cover brightness-75"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-night-950 via-night-950/40 to-transparent" />
              <div className="absolute text-center space-y-3 p-4">
                <span className="inline-flex items-center gap-2 px-3 py-1 bg-night-950/70 border border-ember-500/40 text-[10px] font-mono tracking-widest text-ember-300 uppercase">
                  <Phone className="w-3 h-3" /> Live 12:00 AM call
                </span>
                <p className="font-display text-base italic text-cream">
                  "{heroCreator.audioSampleText}"
                </p>
              </div>
            </div>

            <button
              onClick={() => {
                setDemoModalOpen(false);
                onStartBooking(heroCreator);
              }}
              className="w-full py-4 bg-ember-400 hover:bg-ember-300 text-night-950 font-semibold text-sm transition-colors"
            >
              Surprise someone now
            </button>
          </div>
        </div>
      )}

      {/* Film grain over everything */}
      <div className="grain" />
    </div>
  );
};
