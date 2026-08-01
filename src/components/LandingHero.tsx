import React, { useState, useEffect } from 'react';
import {
  Sparkles,
  Phone,
  Video,
  Play,
  Star,
  ChevronRight,
  CheckCircle2,
  Volume2,
  ArrowRight,
  Heart,
  Clock,
  Check,
  Zap,
  X,
  Radio,
  Award,
  Shield,
  Lock,
  ShieldCheck
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
  // Hero clock state: 11:59 PM to 12:00 AM
  const [clockTime, setClockTime] = useState<'11:59 PM' | '12:00 AM'>('11:59 PM');
  const [, setIsPhoneRinging] = useState(true);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [demoModalOpen, setDemoModalOpen] = useState(false);

  // Section 5 Interactive Live Sandbox State
  const [sandboxCreator, setSandboxCreator] = useState<Creator>(featuredCreators[0] || {} as Creator);
  const [sandboxOccasion, setSandboxOccasion] = useState('Birthday');
  const [sandboxPrompt, setSandboxPrompt] = useState(
    "Wish Mahesh an extraordinary 28th birthday! Mention his passion for AI startups and tell him 2026 is his year to conquer the world."
  );
  const [sandboxIsPlaying, setSandboxIsPlaying] = useState(false);

  // Active step in Section 3 Timeline
  const [activeStep, setActiveStep] = useState(1);

  // Toggle clock time on interval or scroll
  useEffect(() => {
    const timer = setInterval(() => {
      setClockTime((prev) => (prev === '11:59 PM' ? '12:00 AM' : '11:59 PM'));
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const heroCreator = featuredCreators[0] || {} as Creator;

  return (
    <div className="relative bg-slate-950 text-white overflow-hidden font-sans selection:bg-indigo-500 selection:text-white">
      {/* Background Ambient Canvas */}
      <CanvasShaderBackground variant="cosmic" />

      {/* ==========================================
          SECTION 1 — HERO EXPERIENCE
      ========================================== */}
      <section className="relative min-h-[92vh] flex flex-col justify-center items-center px-4 sm:px-6 lg:px-8 pt-12 pb-24 z-10">
        {/* Atmospheric Moonlight Bedroom Ambient Lighting */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-600/15 rounded-full blur-[140px] pointer-events-none"></div>
        <div className="absolute top-1/3 right-10 w-[400px] h-[400px] bg-purple-600/15 rounded-full blur-[120px] pointer-events-none"></div>

        {/* Headlines */}
        <div className="text-center max-w-4xl mx-auto space-y-4 mb-12">
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black font-serif tracking-tight leading-[1.1] text-white">
            Imagine the phone rings at{' '}
            <span className="bg-gradient-to-r from-amber-200 via-amber-400 to-yellow-500 bg-clip-text text-transparent underline decoration-amber-500/40">
              exactly midnight...
            </span>
          </h1>
          <p className="text-2xl sm:text-3xl lg:text-4xl font-light italic text-slate-300 font-sans">
            ...and it&apos;s the person you&apos;ve admired for years.
          </p>
          <p className="text-slate-400 text-sm sm:text-base max-w-xl mx-auto font-normal leading-relaxed pt-2">
            Create unforgettable AI voice calls and personalized videos that become lifelong memories.
          </p>

          {/* Action CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-6">
            <button
              onClick={() => {
                if (onSurpriseSomeone) {
                  onSurpriseSomeone();
                } else {
                  onExplore();
                }
              }}
              className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 text-slate-950 font-black text-base shadow-2xl shadow-amber-500/30 hover:shadow-amber-500/50 hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-3 group"
            >
              <Sparkles className="w-5 h-5 text-slate-950 group-hover:rotate-12 transition-transform" />
              <span>Surprise Someone</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>

            <button
              onClick={() => setDemoModalOpen(true)}
              className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-slate-900/90 hover:bg-slate-800 border border-amber-500/30 hover:border-amber-500/60 text-amber-300 hover:text-amber-200 font-semibold text-base transition-all flex items-center justify-center gap-2 backdrop-blur-xl group"
            >
              <Play className="w-4 h-4 text-amber-400 fill-amber-400 group-hover:scale-110 transition-transform" />
              <span>Watch Demo</span>
            </button>
          </div>
        </div>

        {/* Hero Interactive Phone & Digital Clock Mockup */}
        <div className="relative w-full max-w-md mx-auto mt-6">
          {/* Midnight Digital Clock Box */}
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="px-5 py-2.5 rounded-2xl bg-slate-900/90 border border-slate-800 backdrop-blur-xl shadow-2xl flex items-center gap-3">
              <Clock className="w-4 h-4 text-indigo-400 animate-pulse" />
              <div className="text-xs font-mono font-bold tracking-widest text-slate-400 uppercase">
                Scheduled Call Time:
              </div>
              <div
                onClick={() => setClockTime((prev) => (prev === '11:59 PM' ? '12:00 AM' : '11:59 PM'))}
                className={`text-sm font-mono font-black tracking-wider px-2 py-0.5 rounded transition-all cursor-pointer ${
                  clockTime === '12:00 AM'
                    ? 'bg-emerald-950 text-emerald-400 border border-emerald-500/50 shadow-lg shadow-emerald-500/20 scale-105'
                    : 'bg-slate-800 text-amber-300'
                }`}
              >
                {clockTime}
              </div>
            </div>
          </div>

          {/* Realistic Cinematic iPhone Frame */}
          <div className="relative bg-slate-950 border-[7px] border-slate-800 rounded-[48px] overflow-hidden shadow-[0_0_80px_rgba(99,102,241,0.25)] p-2">
            {/* Dynamic Island Notch */}
            <div className="absolute top-4 left-1/2 -translate-x-1/2 w-32 h-4 bg-slate-900 rounded-full z-30 flex items-center justify-between px-3">
              <div className="w-2.5 h-2.5 rounded-full bg-slate-950"></div>
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
            </div>

            {/* Screen View */}
            <div className="relative h-[540px] rounded-[38px] overflow-hidden bg-slate-900">
              <img
                src={heroCreator.coverImage || 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&q=80&w=1200'}
                alt={heroCreator.name}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover filter brightness-90"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-black/40"></div>

              {/* Call Header */}
              <div className="absolute top-12 left-0 right-0 p-6 text-center z-20 space-y-1">
                <span className="px-3 py-1 text-[11px] font-bold tracking-wider text-emerald-300 bg-emerald-950/90 border border-emerald-500/40 rounded-full uppercase inline-flex items-center gap-1.5 shadow-lg">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
                  {clockTime === '12:00 AM' ? 'Incoming Midnight Call' : 'Awaiting 12:00 AM Dispatch'}
                </span>
                <h3 className="text-2xl font-black text-white pt-2">{heroCreator.name}</h3>
                <p className="text-xs text-indigo-300 font-medium">{heroCreator.tagline}</p>
              </div>

              {/* Live Waveform Audio Bar */}
              <div className="absolute bottom-24 left-4 right-4 p-4 rounded-2xl bg-slate-950/90 backdrop-blur-xl border border-slate-800 z-20 space-y-2 shadow-2xl">
                <div className="flex items-center justify-between text-xs text-slate-300">
                  <span className="font-bold flex items-center gap-1.5 text-indigo-400">
                    <Radio className="w-3.5 h-3.5 animate-pulse text-emerald-400" />
                    AI Studio Voice Synthesis
                  </span>
                  <span className="text-[10px] text-slate-500">4K Voice HD</span>
                </div>
                <div className="flex items-center gap-1 h-6">
                  {[40, 70, 30, 90, 100, 60, 80, 40, 95, 75, 50, 85, 30, 90, 65, 40].map((h, i) => (
                    <div
                      key={i}
                      className={`flex-1 rounded-full bg-gradient-to-t from-indigo-500 to-purple-500 transition-all duration-300 ${
                        isPlayingAudio ? 'animate-pulse' : ''
                      }`}
                      style={{ height: isPlayingAudio ? `${h}%` : '20%' }}
                    ></div>
                  ))}
                </div>
                <p className="text-[11px] italic text-slate-300 line-clamp-1 font-serif">
                  &quot;{heroCreator.audioSampleText}&quot;
                </p>
              </div>

              {/* Call Controls */}
              <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between z-20">
                <button
                  onClick={() => setIsPhoneRinging(false)}
                  className="w-12 h-12 rounded-full bg-rose-600 flex items-center justify-center text-white shadow-xl hover:scale-105 transition-transform"
                >
                  <Phone className="w-5 h-5 rotate-[135deg]" />
                </button>

                <button
                  onClick={() => setIsPlayingAudio(!isPlayingAudio)}
                  className="px-4 py-2.5 rounded-full bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold flex items-center gap-2 shadow-xl shadow-indigo-500/30 transition-all"
                >
                  <Volume2 className="w-4 h-4" />
                  <span>{isPlayingAudio ? 'Mute Sample' : 'Play Voice Sample'}</span>
                </button>

                <button
                  onClick={() => {
                    setIsPlayingAudio(true);
                    setClockTime('12:00 AM');
                  }}
                  className="w-12 h-12 rounded-full bg-emerald-500 flex items-center justify-center text-white shadow-xl hover:scale-110 transition-transform animate-bounce"
                >
                  <Phone className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ==========================================
          SECTION 2 — THE EMOTION
      ========================================== */}
      <section className="py-24 bg-slate-950/90 border-t border-slate-800/80 relative z-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-3 mb-16">
            <h2 className="text-3xl sm:text-5xl font-black font-serif text-white">
              Not just another gift.
            </h2>
            <p className="text-2xl sm:text-4xl font-light italic text-indigo-300 font-sans">
              A memory they&apos;ll replay forever.
            </p>
          </div>

          {/* Reaction Photos Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-6 rounded-3xl bg-slate-900/60 border border-slate-800/80 hover:border-indigo-500/40 transition-all group backdrop-blur-md shadow-xl">
              <div className="relative h-56 rounded-2xl overflow-hidden mb-4">
                <img
                  src="https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&q=80&w=600"
                  alt="Birthday Joy"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent"></div>
                <div className="absolute bottom-3 left-3 bg-indigo-950/90 px-2.5 py-1 rounded-full text-[10px] font-bold text-indigo-300 border border-indigo-500/30">
                  Birthday Midnight Surprise
                </div>
              </div>
              <h3 className="text-lg font-bold text-white mb-1">&quot;She burst into tears of joy&quot;</h3>
              <p className="text-slate-400 text-xs leading-relaxed">
                &quot;When the phone rang at 12:00 AM on her 25th birthday and Liam Cross knew her name, she froze in total shock!&quot;
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-slate-900/60 border border-slate-800/80 hover:border-purple-500/40 transition-all group backdrop-blur-md shadow-xl">
              <div className="relative h-56 rounded-2xl overflow-hidden mb-4">
                <img
                  src="https://as2.ftcdn.net/v2/jpg/05/35/73/83/1000_F_535738304_3h3lzjXVmqlkaJXawnIKzwwVp0t6sYfB.jpg"
                  alt="Graduation Moment"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent"></div>
                <div className="absolute bottom-3 left-3 bg-purple-950/90 px-2.5 py-1 rounded-full text-[10px] font-bold text-purple-300 border border-purple-500/30">
                  Graduation Motivation
                </div>
              </div>
              <h3 className="text-lg font-bold text-white mb-1">&quot;Unbelievable proud moment&quot;</h3>
              <p className="text-slate-400 text-xs leading-relaxed">
                &quot;My son couldn&apos;t believe David Lee congratulated his Stanford computer science degree by name!&quot;
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-slate-900/60 border border-slate-800/80 hover:border-pink-500/40 transition-all group backdrop-blur-md shadow-xl">
              <div className="relative h-56 rounded-2xl overflow-hidden mb-4">
                <img
                  src="https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&q=80&w=600"
                  alt="Friends Laughing"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent"></div>
                <div className="absolute bottom-3 left-3 bg-pink-950/90 px-2.5 py-1 rounded-full text-[10px] font-bold text-pink-300 border border-pink-500/30">
                  Comedy Roast
                </div>
              </div>
              <h3 className="text-lg font-bold text-white mb-1">&quot;The dorm was dying laughing&quot;</h3>
              <p className="text-slate-400 text-xs leading-relaxed">
                &quot;Sarah Jenkins roasted my roommate&apos;s terrible cooking skills. We&apos;ve replayed it 100 times!&quot;
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-slate-900/60 border border-slate-800/80 hover:border-amber-500/40 transition-all group backdrop-blur-md shadow-xl">
              <div className="relative h-56 rounded-2xl overflow-hidden mb-4">
                <img
                  src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=600"
                  alt="Parents Emotional"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent"></div>
                <div className="absolute bottom-3 left-3 bg-amber-950/90 px-2.5 py-1 rounded-full text-[10px] font-bold text-amber-300 border border-amber-500/30">
                  30th Anniversary Blessing
                </div>
              </div>
              <h3 className="text-lg font-bold text-white mb-1">&quot;Mom & Dad replayed it all week&quot;</h3>
              <p className="text-slate-400 text-xs leading-relaxed">
                &quot;Dev Patel wished them happy anniversary in Hindi. They framed the video download certificate on their wall.&quot;
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ==========================================
          SECTION 3 — EXPERIENCE TIMELINE
      ========================================== */}
      <section id="how-it-works" className="py-24 bg-slate-950 border-t border-slate-800/80 relative z-10 scroll-mt-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-2 mb-16">
            <h2 className="text-xs font-bold tracking-widest text-indigo-400 uppercase">The Evoke Journey</h2>
            <p className="text-3xl sm:text-5xl font-black font-serif text-white">How The Magic Happens</p>
            <p className="text-slate-400 text-sm">From simple request to an unforgettable midnight call</p>
          </div>

          {/* Interactive Timeline Stepper */}
          <div className="flex items-center justify-between max-w-3xl mx-auto mb-12 border-b border-slate-800 pb-4 overflow-x-auto">
            {[
              { step: 1, title: 'Step 1: Creator' },
              { step: 2, title: 'Step 2: Script' },
              { step: 3, title: 'Step 3: Schedule' },
              { step: 4, title: 'Step 4: AI Voice' },
              { step: 5, title: 'Step 5: Call Rings!' },
            ].map((s) => (
              <button
                key={s.step}
                onClick={() => setActiveStep(s.step)}
                className={`px-4 py-2 rounded-2xl text-xs font-bold transition-all whitespace-nowrap flex items-center gap-2 ${
                  activeStep === s.step
                    ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg shadow-indigo-500/30 scale-105'
                    : 'text-slate-400 hover:text-white bg-slate-900'
                }`}
              >
                <span className="w-5 h-5 rounded-full bg-slate-800 text-[10px] flex items-center justify-center">
                  {s.step}
                </span>
                <span>{s.title}</span>
              </button>
            ))}
          </div>

          {/* Step Detail Card Display */}
          <div className="p-8 sm:p-12 rounded-3xl bg-slate-900/80 border border-slate-800 max-w-4xl mx-auto shadow-2xl relative overflow-hidden">
            {activeStep === 1 && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                <div className="space-y-4">
                  <span className="px-3 py-1 rounded-full bg-indigo-950 text-indigo-300 border border-indigo-500/30 text-xs font-bold uppercase">
                    Step One
                  </span>
                  <h3 className="text-2xl font-bold font-serif text-white">Choose Your Idol or Creator</h3>
                  <p className="text-slate-300 text-sm leading-relaxed">
                    Browse hundreds of verified voice actors, singers, comedians, entrepreneurs, and global celebrities. Preview voice samples and ratings before requesting.
                  </p>
                  <button
                    onClick={onExplore}
                    className="px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs transition-all inline-flex items-center gap-2"
                  >
                    <span>Browse Creators</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
                <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800">
                  <div className="flex items-center gap-3 mb-3">
                    <img src={heroCreator.avatar} alt="Creator" className="w-12 h-12 rounded-xl object-cover" />
                    <div>
                      <div className="font-bold text-white text-sm">{heroCreator.name}</div>
                      <div className="text-xs text-indigo-400">{heroCreator.category}</div>
                    </div>
                  </div>
                  <div className="text-xs text-slate-400 bg-slate-900 p-3 rounded-xl">
                    &quot;Voice model trained with official creator consent for personalized greetings.&quot;
                  </div>
                </div>
              </div>
            )}

            {activeStep === 2 && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                <div className="space-y-4">
                  <span className="px-3 py-1 rounded-full bg-purple-950 text-purple-300 border border-purple-500/30 text-xs font-bold uppercase">
                    Step Two
                  </span>
                  <h3 className="text-2xl font-bold font-serif text-white">Craft Prompt with AI Studio</h3>
                  <p className="text-slate-300 text-sm leading-relaxed">
                    Write key details like inside jokes, recipient nicknames, or age. Gemini 3.6 Flash automatically formats it into an emotional or funny studio script!
                  </p>
                </div>
                <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-2">
                  <div className="text-xs text-slate-400 font-mono">Gemini AI Script Engine:</div>
                  <div className="p-3 rounded-xl bg-indigo-950/60 border border-indigo-500/30 text-xs italic text-indigo-200 font-serif leading-relaxed">
                    &quot;Hey Mahesh, midnight has arrived! Wish you an extraordinary 28th birthday from your idol Aura. Keep building the future with AI!&quot;
                  </div>
                </div>
              </div>
            )}

            {activeStep === 3 && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                <div className="space-y-4">
                  <span className="px-3 py-1 rounded-full bg-pink-950 text-pink-300 border border-pink-500/30 text-xs font-bold uppercase">
                    Step Three
                  </span>
                  <h3 className="text-2xl font-bold font-serif text-white">Schedule 12:00 AM Delivery</h3>
                  <p className="text-slate-300 text-sm leading-relaxed">
                    Select birthday date, graduation day, or anniversary. Pick exact delivery hour (12:00 AM Midnight guaranteed precision dispatch).
                  </p>
                </div>
                <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 text-center space-y-2">
                  <div className="text-3xl font-mono font-black text-amber-300">12:00 AM</div>
                  <div className="text-xs text-emerald-400 font-bold uppercase">Scheduled Dispatch Locked</div>
                </div>
              </div>
            )}

            {activeStep === 4 && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                <div className="space-y-4">
                  <span className="px-3 py-1 rounded-full bg-amber-950 text-amber-300 border border-amber-500/30 text-xs font-bold uppercase">
                    Step Four
                  </span>
                  <h3 className="text-2xl font-bold font-serif text-white">AI Studio Voice & Video Generation</h3>
                  <p className="text-slate-300 text-sm leading-relaxed">
                    Our high-fidelity audio engine synthesizes realistic voice inflection, ambient music backing, and 4K lip-synced video output.
                  </p>
                </div>
                <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 space-y-3">
                  <div className="flex items-center justify-between text-xs text-indigo-400 font-bold">
                    <span>Synthesis Progress</span>
                    <span>100% Ready</span>
                  </div>
                  <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                    <div className="bg-gradient-to-r from-indigo-500 to-purple-500 h-full w-full"></div>
                  </div>
                </div>
              </div>
            )}

            {activeStep === 5 && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                <div className="space-y-4">
                  <span className="px-3 py-1 rounded-full bg-emerald-950 text-emerald-300 border border-emerald-500/30 text-xs font-bold uppercase">
                    Step Five
                  </span>
                  <h3 className="text-2xl font-bold font-serif text-white">Phone Rings at Midnight!</h3>
                  <p className="text-slate-300 text-sm leading-relaxed">
                    The recipient answers their phone at midnight. The creator starts speaking their name live on the line. Lifelong memory achieved ❤️
                  </p>
                </div>
                <div className="bg-emerald-950/40 p-6 rounded-2xl border border-emerald-500/40 text-center space-y-2">
                  <Phone className="w-10 h-10 text-emerald-400 mx-auto animate-bounce" />
                  <div className="text-sm font-bold text-white">Recipient Answers Call</div>
                  <div className="text-xs text-emerald-300">Reaction Video & Audio Recording Saved ❤️</div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ==========================================
          SECTION 4 — FEATURED CREATORS
      ========================================== */}
      <section id="creators" className="py-24 bg-slate-950/90 border-t border-slate-800/80 relative z-10 scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-12">
            <div>
              <h2 className="text-3xl sm:text-4xl font-black font-serif text-white">Featured Creators</h2>
              <p className="text-slate-400 text-sm">Netflix-style library of top verified idols and voice artists</p>
            </div>
            <button
              onClick={onExplore}
              className="px-5 py-2.5 rounded-2xl bg-slate-900 hover:bg-slate-800 border border-amber-500/30 text-amber-400 hover:text-amber-300 font-bold text-xs flex items-center gap-2 transition-all"
            >
              <span>Explore All Creators</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* Creators Horizontal Carousel / Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredCreators.map((creator) => (
              <div
                key={creator.id}
                onClick={() => onSelectCreator(creator)}
                className="group relative bg-slate-900 rounded-3xl overflow-hidden border border-slate-800 hover:border-indigo-500/60 transition-all duration-300 hover:-translate-y-1 cursor-pointer shadow-2xl flex flex-col justify-between"
              >
                <div>
                  {/* Photo & Badges */}
                  <div className="relative h-64 overflow-hidden">
                    <img
                      src={creator.avatar}
                      alt={creator.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent"></div>

                    <div className="absolute top-3 left-3 bg-slate-950/80 backdrop-blur-md px-2.5 py-1 rounded-full border border-slate-700/60 text-[11px] font-semibold text-amber-300 flex items-center gap-1">
                      <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                      <span>{creator.rating}</span>
                    </div>

                    <div className="absolute top-3 right-3 bg-indigo-950/80 backdrop-blur-md px-2.5 py-1 rounded-full border border-indigo-500/40 text-[10px] font-bold text-indigo-300 uppercase tracking-wider">
                      {creator.category}
                    </div>
                  </div>

                  {/* Creator Info */}
                  <div className="p-5 space-y-2">
                    <div className="flex items-center gap-2">
                      <h3 className="text-lg font-bold text-white group-hover:text-indigo-300 transition-colors">
                        {creator.name}
                      </h3>
                      <CheckCircle2 className="w-4 h-4 text-indigo-400 fill-indigo-400/20" />
                    </div>
                    <p className="text-xs text-slate-400 line-clamp-1">{creator.tagline}</p>

                    {/* Languages */}
                    <div className="flex flex-wrap gap-1 pt-1">
                      {creator.languages.map((lang) => (
                        <span key={lang} className="px-2 py-0.5 rounded bg-slate-950 text-[10px] text-slate-400 border border-slate-800">
                          {lang}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Price & Action */}
                <div className="p-5 pt-0">
                  <div className="flex items-center justify-between pt-3 border-t border-slate-800 text-xs">
                    <div>
                      <span className="text-slate-400 block text-[10px]">Voice Call</span>
                      <span className="font-bold text-white">₹{creator.voicePrice}</span>
                    </div>
                    <div>
                      <span className="text-slate-400 block text-[10px]">Video Message</span>
                      <span className="font-bold text-indigo-400">₹{creator.videoPrice}</span>
                    </div>
                    <button className="px-3 py-1.5 rounded-xl bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 text-slate-950 font-bold text-xs transition-colors shadow-md shadow-amber-500/20">
                      Book
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ==========================================
          SECTION 5 — BEAUTIFUL INTERACTIVE DEMO (LIVE SANDBOX)
      ========================================== */}
      <section id="demo" className="py-24 bg-slate-950 border-t border-slate-800/80 relative z-10 scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto space-y-2 mb-16">
            <span className="px-3 py-1 rounded-full bg-indigo-950 text-indigo-300 border border-indigo-500/30 text-xs font-bold uppercase">
              Live Customizer Sandbox
            </span>
            <h2 className="text-3xl sm:text-5xl font-black font-serif text-white">Experience Evoke Live</h2>
            <p className="text-slate-400 text-sm">Customize a surprise on the left and see the phone update in real-time on the right!</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-slate-900/60 p-6 sm:p-10 rounded-3xl border border-slate-800 shadow-2xl">
            {/* Left Controls */}
            <div className="lg:col-span-6 space-y-6">
              <div>
                <label className="text-xs text-slate-400 font-bold uppercase tracking-wider block mb-2">
                  1. Select Creator
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {featuredCreators.slice(0, 4).map((c) => (
                    <button
                      key={c.id}
                      onClick={() => setSandboxCreator(c)}
                      className={`p-3 rounded-2xl border text-left flex items-center gap-3 transition-all ${
                        sandboxCreator.id === c.id
                          ? 'bg-indigo-950 border-indigo-500 text-white shadow-lg'
                          : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
                      }`}
                    >
                      <img src={c.avatar} alt={c.name} className="w-8 h-8 rounded-lg object-cover" />
                      <div className="overflow-hidden">
                        <div className="text-xs font-bold truncate">{c.name}</div>
                        <div className="text-[10px] text-slate-500 truncate">₹{c.voicePrice} Call</div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-xs text-slate-400 font-bold uppercase tracking-wider block mb-2">
                  2. Select Occasion
                </label>
                <div className="flex flex-wrap gap-2">
                  {['Birthday', 'Graduation', 'Promotion', 'Wedding', 'Festival', 'Roast'].map((occ) => (
                    <button
                      key={occ}
                      onClick={() => setSandboxOccasion(occ)}
                      className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
                        sandboxOccasion === occ
                          ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-md'
                          : 'bg-slate-950 border border-slate-800 text-slate-400 hover:text-white'
                      }`}
                    >
                      {occ}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-xs text-slate-400 font-bold uppercase tracking-wider block mb-2">
                  3. Personal Prompt (AI Studio)
                </label>
                <textarea
                  value={sandboxPrompt}
                  onChange={(e) => setSandboxPrompt(e.target.value)}
                  rows={3}
                  className="w-full p-4 rounded-2xl bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:border-indigo-500 font-sans"
                />
              </div>

              <button
                onClick={() => onStartBooking(sandboxCreator)}
                className="w-full py-4 rounded-2xl bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 text-slate-950 font-bold text-sm shadow-xl shadow-amber-500/25 hover:scale-[1.02] transition-all flex items-center justify-center gap-2"
              >
                <Sparkles className="w-4 h-4 text-slate-950" />
                <span>Book This Custom Surprise (₹{sandboxCreator.voicePrice || 99})</span>
              </button>
            </div>

            {/* Right Live Phone Updating Instantly */}
            <div className="lg:col-span-6 flex justify-center">
              <div className="relative w-full max-w-[320px]">
                <div className="bg-slate-950 border-[6px] border-slate-800 rounded-[40px] overflow-hidden shadow-2xl p-2">
                  <div className="relative h-[480px] rounded-[32px] overflow-hidden bg-slate-900">
                    <img
                      src={sandboxCreator.coverImage || sandboxCreator.avatar}
                      alt={sandboxCreator.name}
                      className="w-full h-full object-cover filter brightness-90"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/50 to-black/30"></div>

                    <div className="absolute top-10 left-0 right-0 p-4 text-center z-20 space-y-1">
                      <span className="px-2.5 py-0.5 text-[10px] font-bold tracking-wider text-emerald-300 bg-emerald-950/80 border border-emerald-500/40 rounded-full uppercase inline-flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping"></span>
                        12:00 AM Call • {sandboxOccasion}
                      </span>
                      <h4 className="text-xl font-bold text-white pt-1">{sandboxCreator.name}</h4>
                      <p className="text-[11px] text-indigo-300">{sandboxCreator.tagline}</p>
                    </div>

                    <div className="absolute bottom-20 left-3 right-3 p-3 rounded-2xl bg-slate-950/90 border border-slate-800 z-20 space-y-1">
                      <div className="text-[10px] font-bold text-indigo-400">Live AI Script Preview</div>
                      <p className="text-[11px] italic text-slate-200 line-clamp-3 font-serif">
                        &quot;{sandboxPrompt}&quot;
                      </p>
                    </div>

                    <div className="absolute bottom-4 left-4 right-4 z-20 text-center">
                      <button
                        onClick={() => setSandboxIsPlaying(!sandboxIsPlaying)}
                        className="w-full py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shadow-lg flex items-center justify-center gap-2"
                      >
                        <Volume2 className="w-4 h-4" />
                        <span>{sandboxIsPlaying ? 'Pause Live Call' : 'Test Call Sample'}</span>
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
          SECTION 6 — SURPRISE MOMENTS (Pinterest Masonry)
      ========================================== */}
      <section className="py-24 bg-slate-950/90 border-t border-slate-800/80 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto space-y-2 mb-16">
            <h2 className="text-3xl sm:text-4xl font-black font-serif text-white">Surprise Moments Gallery</h2>
            <p className="text-slate-400 text-sm">Real reaction screen captures and recorded 12:00 AM calls</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {[
              {
                title: 'Incoming Midnight Birthday Call',
                type: 'Voice Call',
                img: 'https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&q=80&w=600',
                likes: '2.4k',
              },
              {
                title: 'Stanford Graduation Speech',
                type: 'Video Message',
                img: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&q=80&w=600',
                likes: '1.9k',
              },
              {
                title: '25th Wedding Anniversary Blessing',
                type: 'Hindi Voice Call',
                img: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=600',
                likes: '3.1k',
              },
              {
                title: 'Dorm Room Comedy Roast',
                type: 'Video Message',
                img: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&q=80&w=600',
                likes: '4.2k',
              },
              {
                title: 'Diwali Midnight Wish',
                type: 'Voice Note',
                img: 'https://images.unsplash.com/photo-1518173946687-a4c8a383392e?auto=format&fit=crop&q=80&w=600',
                likes: '1.5k',
              },
              {
                title: 'Promotion & Career Victory',
                type: '4K HD Video',
                img: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=600',
                likes: '2.8k',
              },
            ].map((m, idx) => (
              <div
                key={idx}
                className="relative rounded-3xl overflow-hidden bg-slate-900 border border-slate-800 hover:border-indigo-500/50 transition-all group cursor-pointer shadow-xl"
              >
                <img
                  src={m.img}
                  alt={m.title}
                  className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent"></div>
                <div className="absolute top-4 right-4 bg-slate-950/80 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-bold text-indigo-300 border border-indigo-500/30">
                  {m.type}
                </div>
                <div className="absolute bottom-4 left-4 right-4">
                  <h3 className="text-sm font-bold text-white mb-1">{m.title}</h3>
                  <div className="flex items-center justify-between text-[11px] text-slate-400">
                    <span className="flex items-center gap-1 text-pink-400">
                      <Heart className="w-3.5 h-3.5 fill-pink-400" />
                      {m.likes} loved this
                    </span>
                    <span className="text-indigo-300 font-semibold flex items-center gap-1">
                      <Play className="w-3 h-3" /> Watch
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ==========================================
          SECTION 7 — WHY EVOKE
      ========================================== */}
      <section id="why-evoke" className="py-24 bg-slate-950 border-t border-slate-800/80 relative z-10 scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto space-y-2 mb-16">
            <h2 className="text-3xl sm:text-5xl font-black font-serif text-white">Why Evoke</h2>
            <p className="text-slate-400 text-sm">Built with studio-grade ethics, precision timing, and AI excellence</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
            <div className="p-8 rounded-3xl bg-slate-900/80 border border-slate-800 hover:border-indigo-500/50 transition-all space-y-4 shadow-xl">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-indigo-600 to-purple-600 p-0.5">
                <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center text-indigo-400">
                  <Shield className="w-7 h-7" />
                </div>
              </div>
              <h3 className="text-xl font-bold text-white">Licensed AI Voices</h3>
              <p className="text-slate-400 text-xs leading-relaxed">
                Creator-approved voice models trained with official studio consent for authentic tone, passion, and natural inflection.
              </p>
            </div>

            <div className="p-8 rounded-3xl bg-slate-900/80 border border-slate-800 hover:border-purple-500/50 transition-all space-y-4 shadow-xl">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-purple-600 to-pink-600 p-0.5">
                <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center text-purple-400">
                  <Clock className="w-7 h-7" />
                </div>
              </div>
              <h3 className="text-xl font-bold text-white">Perfectly Timed Delivery</h3>
              <p className="text-slate-400 text-xs leading-relaxed">
                Automated precision dispatch server ensures the call or video link arrives at exactly 12:00 AM Midnight down to the second.
              </p>
            </div>

            <div className="p-8 rounded-3xl bg-slate-900/80 border border-slate-800 hover:border-pink-500/50 transition-all space-y-4 shadow-xl">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-pink-600 to-amber-600 p-0.5">
                <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center text-pink-400">
                  <Video className="w-7 h-7" />
                </div>
              </div>
              <h3 className="text-xl font-bold text-white">Beautiful AI Videos</h3>
              <p className="text-slate-400 text-xs leading-relaxed">
                Generated uniquely in 4K Ultra HD for every surprise with realistic facial movement, lip-sync, and personalized stage lighting.
              </p>
            </div>

            <div className="p-8 rounded-3xl bg-slate-900/80 border border-slate-800 hover:border-amber-500/50 transition-all space-y-4 shadow-xl">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-amber-600 to-indigo-600 p-0.5">
                <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center text-amber-400">
                  <Sparkles className="w-7 h-7" />
                </div>
              </div>
              <h3 className="text-xl font-bold text-white">Personalized Messages</h3>
              <p className="text-slate-400 text-xs leading-relaxed">
                Every message is crafted with Gemini AI Studio tailored to inside jokes, recipient passions, and your exact emotional tone.
              </p>
            </div>

            <div className="p-8 rounded-3xl bg-slate-900/80 border border-slate-800 hover:border-emerald-500/50 transition-all space-y-4 shadow-xl">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-emerald-600 to-teal-600 p-0.5">
                <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center text-emerald-400">
                  <ShieldCheck className="w-7 h-7" />
                </div>
              </div>
              <h3 className="text-xl font-bold text-white">Security & Privacy</h3>
              <p className="text-slate-400 text-xs leading-relaxed">
                We guarantee 100% security and privacy. We never misuse or unauthorizedly use any voice model or personal information — all data is encrypted and strictly confidential.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ==========================================
          SECTION 8 — OCCASIONS
      ========================================== */}
      <section id="occasions" className="py-24 bg-slate-950/90 border-t border-slate-800/80 relative z-10 scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto space-y-2 mb-16">
            <h2 className="text-3xl sm:text-5xl font-black font-serif text-white">Every Special Moment</h2>
            <p className="text-slate-400 text-sm">Pick an occasion to launch your custom midnight surprise</p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
            {[
              { name: 'Birthday', desc: '12:00 AM Midnight Calls', icon: Sparkles, color: 'from-pink-500 to-indigo-600' },
              { name: 'Graduation', desc: 'Degrees & Milestones', icon: Award, color: 'from-purple-500 to-indigo-600' },
              { name: 'Promotion', desc: 'Career Victories', icon: Zap, color: 'from-amber-500 to-pink-600' },
              { name: 'Wedding', desc: 'Anniversaries & Blessings', icon: Heart, color: 'from-rose-500 to-purple-600' },
              { name: 'Festival', desc: 'Diwali, New Year, Holidays', icon: Sparkles, color: 'from-indigo-500 to-purple-600' },
              { name: 'Anniversary', desc: 'Love & Togetherness', icon: Heart, color: 'from-pink-600 to-purple-600' },
              { name: 'Achievement', desc: 'Sports & Startup Wins', icon: Star, color: 'from-amber-500 to-indigo-600' },
              { name: 'Custom', desc: 'Any Secret Surprise', icon: Radio, color: 'from-emerald-500 to-teal-600' },
            ].map((o) => (
              <div
                key={o.name}
                onClick={onExplore}
                className="p-6 rounded-3xl bg-slate-900 border border-slate-800 hover:border-indigo-500/60 transition-all hover:-translate-y-1 cursor-pointer group shadow-xl"
              >
                <div className={`w-12 h-12 rounded-2xl bg-gradient-to-r ${o.color} p-3 text-white mb-4 shadow-lg group-hover:scale-110 transition-transform`}>
                  <o.icon className="w-full h-full" />
                </div>
                <h3 className="text-lg font-bold text-white group-hover:text-indigo-300 transition-colors">{o.name}</h3>
                <p className="text-xs text-slate-400 mt-1">{o.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ==========================================
          SECTION 9 — TESTIMONIALS
      ========================================== */}
      <section className="py-24 bg-slate-950 border-t border-slate-800/80 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto space-y-2 mb-16">
            <h2 className="text-3xl sm:text-5xl font-black font-serif text-white">Loved Across the World</h2>
            <p className="text-slate-400 text-sm">Over 12,000 midnight surprises delivered flawlessly</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-8 rounded-3xl bg-slate-900/60 border border-slate-800 backdrop-blur-xl space-y-4 shadow-2xl">
              <div className="flex items-center gap-1 text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400" />
                ))}
              </div>
              <p className="text-slate-200 text-xs leading-relaxed italic font-serif">
                &quot;Evoke delivered a midnight call from Dev Patel for my father&apos;s 60th birthday. When he heard Dev say his name in Hindi at midnight, he literally had tears in his eyes!&quot;
              </p>
              <div className="flex items-center gap-3 pt-2">
                <img
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150"
                  alt="Ananya R."
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div>
                  <div className="text-xs font-bold text-white">Ananya R.</div>
                  <div className="text-[10px] text-slate-400">Verified Buyer • Mumbai</div>
                </div>
              </div>
            </div>

            <div className="p-8 rounded-3xl bg-slate-900/60 border border-slate-800 backdrop-blur-xl space-y-4 shadow-2xl">
              <div className="flex items-center gap-1 text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400" />
                ))}
              </div>
              <p className="text-slate-200 text-xs leading-relaxed italic font-serif">
                &quot;The 12:00 AM precision timing is unreal. The call connected right as the clock turned midnight. The AI script was so personal and heartfelt!&quot;
              </p>
              <div className="flex items-center gap-3 pt-2">
                <img
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150"
                  alt="Marcus V."
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div>
                  <div className="text-xs font-bold text-white">Marcus V.</div>
                  <div className="text-[10px] text-slate-400">Verified Buyer • London</div>
                </div>
              </div>
            </div>

            <div className="p-8 rounded-3xl bg-slate-900/60 border border-slate-800 backdrop-blur-xl space-y-4 shadow-2xl">
              <div className="flex items-center gap-1 text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400" />
                ))}
              </div>
              <p className="text-slate-200 text-xs leading-relaxed italic font-serif">
                &quot;I sent a graduation video message from David Lee to my sister. The 4K video quality and voice realism blew everyone away at her celebration party!&quot;
              </p>
              <div className="flex items-center gap-3 pt-2">
                <img
                  src="https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=150"
                  alt="Jessica T."
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div>
                  <div className="text-xs font-bold text-white">Jessica T.</div>
                  <div className="text-[10px] text-slate-400">Verified Buyer • San Francisco</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ==========================================
          SECTION 10 — PRICING
      ========================================== */}
      <section id="pricing" className="py-24 bg-slate-950/90 border-t border-slate-800/80 relative z-10 scroll-mt-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto space-y-2 mb-16">
            <h2 className="text-3xl sm:text-5xl font-black font-serif text-white">Simple, Transparent Pricing</h2>
            <p className="text-slate-400 text-sm">No hidden fees. Every surprise backed by our Midnight On-Time Guarantee</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
            {/* Voice Call */}
            <div className="p-8 rounded-3xl bg-slate-900 border border-slate-800 flex flex-col justify-between space-y-6 shadow-xl">
              <div className="space-y-4">
                <span className="text-xs font-bold text-indigo-400 uppercase tracking-widest">Instant Call</span>
                <h3 className="text-2xl font-bold text-white font-serif">Voice Surprise Call</h3>
                <div className="text-4xl font-black text-white">₹99 <span className="text-xs text-slate-400 font-normal">/ surprise</span></div>
                <ul className="space-y-3 text-xs text-slate-300 pt-2">
                  <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-400" /> Scheduled 12:00 AM Call</li>
                  <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-400" /> AI Studio Script Personalization</li>
                  <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-400" /> High Definition Audio Recording</li>
                  <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-400" /> Instant SMS Call Alert</li>
                </ul>
              </div>
              <button
                onClick={onExplore}
                className="w-full py-3.5 rounded-2xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold transition-all"
              >
                Select Voice Call
              </button>
            </div>

            {/* Video Message */}
            <div className="p-8 rounded-3xl bg-slate-900 border border-slate-800 flex flex-col justify-between space-y-6 shadow-xl">
              <div className="space-y-4">
                <span className="text-xs font-bold text-purple-400 uppercase tracking-widest">4K Video HD</span>
                <h3 className="text-2xl font-bold text-white font-serif">Video Message</h3>
                <div className="text-4xl font-black text-white">₹59 <span className="text-xs text-slate-400 font-normal">/ surprise</span></div>
                <ul className="space-y-3 text-xs text-slate-300 pt-2">
                  <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-400" /> 4K Ultra HD Video File</li>
                  <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-400" /> Studio Facial Lip-Sync AI</li>
                  <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-400" /> Permanent Download Link</li>
                  <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-400" /> Custom Certificate Keepsake</li>
                </ul>
              </div>
              <button
                onClick={onExplore}
                className="w-full py-3.5 rounded-2xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold transition-all"
              >
                Select Video Message
              </button>
            </div>

            {/* Bundle - Most Popular */}
            <div className="p-8 rounded-3xl bg-gradient-to-b from-amber-950/40 via-slate-900 to-slate-900 border-2 border-amber-500/80 flex flex-col justify-between space-y-6 shadow-2xl relative">
              <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 text-[10px] font-black uppercase text-slate-950 tracking-wider shadow-lg">
                Most Popular
              </div>

              <div className="space-y-4 pt-2">
                <span className="text-xs font-bold text-amber-400 uppercase tracking-widest">Ultimate Gift</span>
                <h3 className="text-2xl font-bold text-white font-serif">Midnight Bundle</h3>
                <div className="text-4xl font-black text-amber-300">₹129 <span className="text-xs text-slate-400 font-normal">/ complete surprise</span></div>
                <ul className="space-y-3 text-xs text-slate-200 pt-2">
                  <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-400" /> Live 12:00 AM Midnight Phone Call</li>
                  <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-400" /> 4K Ultra HD Personal Video File</li>
                  <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-400" /> Gemini Studio Priority Generation</li>
                  <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-400" /> Frameable Digital Memory Keepsake</li>
                </ul>
              </div>

              <button
                onClick={() => onStartBooking(heroCreator)}
                className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 text-slate-950 font-bold text-xs shadow-xl shadow-amber-500/30 hover:scale-105 transition-all"
              >
                Get Midnight Bundle
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ==========================================
          SECTION 11 — FINAL EMOTIONAL CTA
      ========================================== */}
      <section className="py-28 bg-slate-950 border-t border-slate-800 relative z-10 overflow-hidden text-center">
        <div className="absolute inset-0 bg-gradient-to-b from-indigo-950/20 via-purple-950/30 to-slate-950 pointer-events-none"></div>

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="w-20 h-20 rounded-3xl bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-500 p-1 mx-auto shadow-2xl shadow-indigo-500/40">
            <div className="w-full h-full bg-slate-950 rounded-[20px] flex items-center justify-center">
              <Sparkles className="w-10 h-10 text-indigo-400 animate-pulse" />
            </div>
          </div>

          <div className="space-y-3">
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black font-serif text-white">
              Some surprises last a moment.
            </h2>
            <p className="text-2xl sm:text-4xl lg:text-5xl font-light italic text-indigo-300 font-sans">
              This one becomes a memory forever.
            </p>
          </div>

          <button
            onClick={() => onStartBooking(heroCreator)}
            className="px-10 py-5 rounded-2xl bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 text-slate-950 font-black text-lg shadow-2xl shadow-amber-500/40 hover:scale-105 active:scale-95 transition-all inline-flex items-center gap-3"
          >
            <Sparkles className="w-6 h-6 text-slate-950" />
            <span>Create Your First Surprise</span>
            <ArrowRight className="w-6 h-6" />
          </button>

          <div className="pt-8">
            <div className="text-2xl font-black tracking-widest text-white font-serif uppercase">
              EVOKE
            </div>
            <p className="text-xs text-slate-500 mt-1">Midnight AI Voice & Video Gifting Platform</p>
          </div>
        </div>
      </section>

      {/* ==========================================
          FOOTER
      ========================================== */}
      <footer className="py-12 bg-slate-950 border-t border-slate-900 text-slate-500 text-xs relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-indigo-600 flex items-center justify-center text-white font-bold">
              E
            </div>
            <div>
              <span className="font-bold text-white text-sm">EVOKE</span>
              <p className="text-[10px] text-slate-500">© 2026 Evoke AI Inc. All rights reserved.</p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-6 text-slate-400 font-medium">
            <button onClick={onExplore} className="hover:text-white transition-colors">Creators</button>
            <button onClick={onExplore} className="hover:text-white transition-colors">Occasions</button>
            <button onClick={onExplore} className="hover:text-white transition-colors">Pricing</button>
            <span className="hover:text-white cursor-pointer transition-colors">Privacy Policy</span>
            <span className="hover:text-white cursor-pointer transition-colors">Terms of Service</span>
          </div>
        </div>
      </footer>

      {/* Watch Demo Modal */}
      {demoModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-2xl">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 max-w-xl w-full text-white shadow-2xl relative space-y-6">
            <button
              onClick={() => setDemoModalOpen(false)}
              className="absolute top-5 right-5 text-slate-400 hover:text-white p-1 rounded-lg bg-slate-800"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3">
              <div className="p-3 rounded-2xl bg-indigo-600/20 text-indigo-400">
                <Play className="w-6 h-6 fill-indigo-400" />
              </div>
              <div>
                <div className="text-xs font-mono font-bold text-indigo-400">Cinematic Demo Preview</div>
                <h3 className="text-xl font-bold font-serif text-white">Midnight Birthday Surprise</h3>
              </div>
            </div>

            <div className="relative rounded-2xl overflow-hidden bg-slate-950 border border-slate-800 h-64 flex items-center justify-center">
              <img
                src={heroCreator.coverImage}
                alt="Demo"
                className="w-full h-full object-cover filter brightness-75"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent"></div>
              <div className="absolute text-center space-y-3 p-4">
                <span className="px-3 py-1 rounded-full bg-emerald-950 text-emerald-300 border border-emerald-500/40 text-xs font-bold uppercase inline-flex items-center gap-2">
                  <Phone className="w-3.5 h-3.5 animate-bounce" /> Live 12:00 AM Call Recorded
                </span>
                <p className="text-sm italic font-serif text-slate-200">
                  &quot;{heroCreator.audioSampleText}&quot;
                </p>
              </div>
            </div>

            <button
              onClick={() => {
                setDemoModalOpen(false);
                onStartBooking(heroCreator);
              }}
              className="w-full py-4 rounded-2xl bg-gradient-to-r from-indigo-500 via-purple-600 to-pink-500 text-white font-bold text-sm shadow-xl"
            >
              Surprise Someone Now
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
