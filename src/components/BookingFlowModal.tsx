import React, { useState, useEffect } from 'react';
import {
  X, ArrowLeft, ArrowRight, Sparkles, Calendar, Clock, User as UserIcon, Heart,
  Cake, GraduationCap, Rocket, Gift, Trophy, Crown, CheckCircle2, Volume2, Play, Pause, CreditCard, ShieldCheck, Tag
} from 'lucide-react';
import { Creator, DeliveryType, Occasion, Order } from '../types';
import { OCCASIONS } from '../data/occasions';
import { CanvasShaderBackground } from './CanvasShaderBackground';

interface Props {
  creator: Creator;
  initialDeliveryType: DeliveryType;
  onClose: () => void;
  onOrderCreated: (order: Order) => void;
}

export const BookingFlowModal: React.FC<Props> = ({
  creator,
  initialDeliveryType,
  onClose,
  onOrderCreated,
}) => {
  const [step, setStep] = useState<1 | 2 | 3 | 4 | 5>(1);

  // Form State
  const [deliveryType, setDeliveryType] = useState<DeliveryType>(initialDeliveryType);
  const [selectedOccasion, setSelectedOccasion] = useState<Occasion>(OCCASIONS[0]);
  const [deliveryDate, setDeliveryDate] = useState<string>(
    new Date(Date.now() + 86400000).toISOString().split('T')[0]
  );
  const [deliveryTime, setDeliveryTime] = useState<string>('12:00 AM Midnight (Recommended)');

  // Recipient details
  const [recipientName, setRecipientName] = useState<string>('Mahesh');
  const [recipientAge, setRecipientAge] = useState<string>('28');
  const [recipientMobile, setRecipientMobile] = useState<string>('+1 (555) 234-5678');
  const [relationship, setRelationship] = useState<string>('Friend');

  // Personalize details
  const [customInstructions, setCustomInstructions] = useState<string>(selectedOccasion.suggestedPrompt);
  const [tone, setTone] = useState<string>('Heartfelt');
  const [language, setLanguage] = useState<string>('English');
  const [durationTarget, setDurationTarget] = useState<string>('~60 sec');

  // AI Script state
  const [generatedScript, setGeneratedScript] = useState<string>('');
  const [isGeneratingAi, setIsGeneratingAi] = useState<boolean>(false);
  const [deliveryNote, setDeliveryNote] = useState<string>('');

  // Audio Preview State
  const [isPlayingAudio, setIsPlayingAudio] = useState<boolean>(false);
  const [isTtsLoading, setIsTtsLoading] = useState<boolean>(false);

  // Checkout State
  const [promoCode, setPromoCode] = useState<string>('');
  const [discount, setDiscount] = useState<number>(0);
  const [paymentMethod, setPaymentMethod] = useState<string>('Apple Pay');
  const [isProcessingPayment, setIsProcessingPayment] = useState<boolean>(false);
  const [completedOrder, setCompletedOrder] = useState<Order | null>(null);

  // Countdown timer for success view
  const [timeRemaining, setTimeRemaining] = useState({ days: 2, hours: 14, minutes: 32, seconds: 45 });

  useEffect(() => {
    if (step === 5) {
      const interval = setInterval(() => {
        setTimeRemaining((prev) => {
          if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        });
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [step]);

  const basePrice = deliveryType === 'video' ? creator.videoPrice : creator.voicePrice;
  const totalPrice = Math.max(0, basePrice - discount);

  // Handle AI Script Generation via server endpoint
  const handleGenerateScript = async () => {
    try {
      setIsGeneratingAi(true);
      const res = await fetch('/api/generate-prompt', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          creatorName: creator.name,
          recipientName,
          relationship,
          occasion: selectedOccasion.label,
          tone,
          language,
          customInstructions,
          duration: durationTarget,
        }),
      });

      const data = await res.json();
      if (data.success && data.script) {
        setGeneratedScript(data.script);
        setDeliveryNote(data.deliveryNote || '');
      } else {
        setGeneratedScript(
          data.fallbackScript ||
            `Hey ${recipientName}! This is ${creator.name}. I heard it's your ${selectedOccasion.label}! Wishing you an amazing day filled with joy!`
        );
      }
    } catch (e) {
      console.warn('AI Script error fallback:', e);
      setGeneratedScript(
        `Hey ${recipientName}! This is ${creator.name}. Sending you the absolute warmest ${selectedOccasion.label} wishes! May this year bring endless success and happiness.`
      );
    } finally {
      setIsGeneratingAi(false);
    }
  };

  // Play AI Audio TTS Preview
  const handlePlayTtsPreview = async () => {
    const textToSpeak = generatedScript || `Hey ${recipientName}, happy ${selectedOccasion.label}!`;

    if (isPlayingAudio) {
      setIsPlayingAudio(false);
      return;
    }

    try {
      setIsTtsLoading(true);
      const res = await fetch('/api/tts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          text: textToSpeak,
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
        const audio = new Audio(url);
        audio.play();
        setIsPlayingAudio(true);
        audio.onended = () => setIsPlayingAudio(false);
      } else {
        const synth = window.speechSynthesis;
        if (synth) {
          const utterance = new SpeechSynthesisUtterance(textToSpeak);
          utterance.onend = () => setIsPlayingAudio(false);
          synth.speak(utterance);
          setIsPlayingAudio(true);
        }
      }
    } catch (e) {
      const synth = window.speechSynthesis;
      if (synth) {
        const utterance = new SpeechSynthesisUtterance(textToSpeak);
        utterance.onend = () => setIsPlayingAudio(false);
        synth.speak(utterance);
        setIsPlayingAudio(true);
      }
    } finally {
      setIsTtsLoading(false);
    }
  };

  // Apply Promo Code
  const handleApplyPromo = () => {
    if (promoCode.trim().toUpperCase() === 'ZUNO50' || promoCode.trim().toUpperCase() === 'MIDNIGHT') {
      setDiscount(50);
    } else if (promoCode.trim().length > 0) {
      setDiscount(20);
    }
  };

  // Submit Order
  const handleConfirmAndPay = () => {
    setIsProcessingPayment(true);
    setTimeout(() => {
      const newOrder: Order = {
        id: `ZN-${Math.floor(1000 + Math.random() * 9000)}-X`,
        creator,
        deliveryType,
        recipientName,
        recipientAge,
        recipientMobile,
        relationship,
        occasion: selectedOccasion.label,
        deliveryDate,
        deliveryTime,
        customInstructions,
        generatedScript: generatedScript || customInstructions,
        tone,
        language,
        durationTarget,
        basePrice,
        discount,
        totalPrice,
        promoCode,
        paymentMethod,
        status: 'scheduled',
        scheduledTimestamp: Date.now() + 172800000, // 2 days in future
        createdAt: new Date().toLocaleDateString(),
      };

      setCompletedOrder(newOrder);
      onOrderCreated(newOrder);
      setIsProcessingPayment(false);
      setStep(5);
    }, 1500);
  };

  const renderIcon = (iconName: string) => {
    switch (iconName) {
      case 'Cake': return <Cake className="w-5 h-5 text-amber-400" />;
      case 'GraduationCap': return <GraduationCap className="w-5 h-5 text-blue-400" />;
      case 'Rocket': return <Rocket className="w-5 h-5 text-indigo-400" />;
      case 'Heart': return <Heart className="w-5 h-5 text-pink-400" />;
      case 'Sparkles': return <Sparkles className="w-5 h-5 text-purple-400" />;
      case 'Crown': return <Crown className="w-5 h-5 text-yellow-400" />;
      case 'Trophy': return <Trophy className="w-5 h-5 text-emerald-400" />;
      default: return <Gift className="w-5 h-5 text-indigo-400" />;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-slate-950/80 backdrop-blur-2xl">
      <div className="relative w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl overflow-hidden my-auto text-white">
        {/* Top Header Bar */}
        <div className="p-5 border-b border-slate-800 flex items-center justify-between bg-slate-950/60">
          <div className="flex items-center gap-3">
            {step > 1 && step < 5 && (
              <button
                onClick={() => setStep((step - 1) as any)}
                className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300"
              >
                <ArrowLeft className="w-4 h-4" />
              </button>
            )}
            <div>
              <div className="text-xs font-bold text-indigo-400 uppercase tracking-widest">
                Step {step} of 4 • Booking with {creator.name}
              </div>
              <h2 className="text-lg font-bold font-serif text-white">
                {step === 1 && 'What is the occasion?'}
                {step === 2 && 'Who are you surprising?'}
                {step === 3 && 'AI Studio Personalization'}
                {step === 4 && 'Review Order & Checkout'}
                {step === 5 && 'Surprise Scheduled! 🎉'}
              </h2>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2.5 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body Content */}
        <div className="p-6 max-h-[75vh] overflow-y-auto space-y-6">
          {/* STEP 1: Occasion & Schedule */}
          {step === 1 && (
            <div className="space-y-6">
              {/* Occasion Grid */}
              <div>
                <label className="text-xs font-bold text-slate-400 block mb-3 uppercase tracking-wider">
                  Select Occasion
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {OCCASIONS.map((occ) => {
                    const isSelected = selectedOccasion.id === occ.id;
                    return (
                      <div
                        key={occ.id}
                        onClick={() => {
                          setSelectedOccasion(occ);
                          setCustomInstructions(occ.suggestedPrompt);
                        }}
                        className={`p-3.5 rounded-2xl border-2 transition-all cursor-pointer flex flex-col items-center text-center gap-2 ${
                          isSelected
                            ? 'bg-indigo-950/80 border-indigo-500 text-white shadow-lg shadow-indigo-500/20'
                            : 'bg-slate-950/60 border-slate-800 hover:border-slate-700 text-slate-300'
                        }`}
                      >
                        <div className="p-2 rounded-xl bg-slate-900 border border-slate-800">
                          {renderIcon(occ.icon)}
                        </div>
                        <span className="text-xs font-bold">{occ.label}</span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Date & Time Picker */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-slate-400 block mb-2 uppercase tracking-wider">
                    Delivery Date
                  </label>
                  <input
                    type="date"
                    value={deliveryDate}
                    onChange={(e) => setDeliveryDate(e.target.value)}
                    className="w-full px-4 py-3 rounded-2xl bg-slate-950 border border-slate-800 text-white font-medium text-sm focus:outline-none focus:border-indigo-500"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-400 block mb-2 uppercase tracking-wider">
                    Delivery Time Target
                  </label>
                  <select
                    value={deliveryTime}
                    onChange={(e) => setDeliveryTime(e.target.value)}
                    className="w-full px-4 py-3 rounded-2xl bg-slate-950 border border-slate-800 text-white font-medium text-sm focus:outline-none focus:border-indigo-500"
                  >
                    <option value="12:00 AM Midnight (Recommended)">12:00 AM Midnight (Recommended)</option>
                    <option value="09:00 AM Morning Blessing">09:00 AM Morning Blessing</option>
                    <option value="06:00 PM Evening Special">06:00 PM Evening Special</option>
                    <option value="Custom Scheduled Time">Anytime On Scheduled Day</option>
                  </select>
                </div>
              </div>

              <button
                onClick={() => setStep(2)}
                className="w-full py-4 rounded-2xl bg-gradient-to-r from-indigo-500 via-purple-600 to-pink-500 text-white font-bold text-base shadow-xl shadow-indigo-500/20 hover:shadow-indigo-500/40 transition-all flex items-center justify-center gap-2"
              >
                <span>Continue to Recipient Details</span>
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          )}

          {/* STEP 2: Recipient Details */}
          {step === 2 && (
            <div className="space-y-5">
              <div>
                <label className="text-xs font-bold text-slate-400 block mb-2 uppercase tracking-wider">
                  Recipient Name *
                </label>
                <input
                  type="text"
                  value={recipientName}
                  onChange={(e) => setRecipientName(e.target.value)}
                  placeholder="e.g. Mahesh Kumar"
                  className="w-full px-4 py-3.5 rounded-2xl bg-slate-950 border border-slate-800 text-white text-sm focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-slate-400 block mb-2 uppercase tracking-wider">
                    Relationship
                  </label>
                  <select
                    value={relationship}
                    onChange={(e) => setRelationship(e.target.value)}
                    className="w-full px-4 py-3.5 rounded-2xl bg-slate-950 border border-slate-800 text-white text-sm focus:outline-none focus:border-indigo-500"
                  >
                    <option value="Friend">Friend</option>
                    <option value="Brother">Brother</option>
                    <option value="Sister">Sister</option>
                    <option value="Mother">Mother</option>
                    <option value="Father">Father</option>
                    <option value="Partner">Partner / Spouse</option>
                    <option value="Colleague">Colleague</option>
                    <option value="Idol">Biggest Fan</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-400 block mb-2 uppercase tracking-wider">
                    Recipient Age
                  </label>
                  <input
                    type="number"
                    value={recipientAge}
                    onChange={(e) => setRecipientAge(e.target.value)}
                    placeholder="e.g. 28"
                    className="w-full px-4 py-3.5 rounded-2xl bg-slate-950 border border-slate-800 text-white text-sm focus:outline-none focus:border-indigo-500"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-400 block mb-2 uppercase tracking-wider">
                  Recipient Mobile Phone Number *
                </label>
                <input
                  type="text"
                  value={recipientMobile}
                  onChange={(e) => setRecipientMobile(e.target.value)}
                  placeholder="+1 (555) 000-0000"
                  className="w-full px-4 py-3.5 rounded-2xl bg-slate-950 border border-slate-800 text-white text-sm focus:outline-none focus:border-indigo-500"
                />
                <p className="text-[11px] text-slate-500 mt-1">
                  Required for automated midnight phone call dispatch or SMS gift notification link.
                </p>
              </div>

              <button
                onClick={() => {
                  setStep(3);
                  if (!generatedScript) handleGenerateScript();
                }}
                className="w-full py-4 rounded-2xl bg-gradient-to-r from-indigo-500 via-purple-600 to-pink-500 text-white font-bold text-base shadow-xl shadow-indigo-500/20 hover:shadow-indigo-500/40 transition-all flex items-center justify-center gap-2"
              >
                <span>Continue to Personalize Script</span>
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          )}

          {/* STEP 3: AI Script Personalization */}
          {step === 3 && (
            <div className="space-y-6">
              {/* Instructions Prompt Textarea */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                    Custom Prompt & Memories
                  </label>
                  <button
                    onClick={handleGenerateScript}
                    disabled={isGeneratingAi}
                    className="text-xs font-bold text-amber-300 hover:text-amber-200 bg-amber-950/80 border border-amber-500/40 px-3 py-1 rounded-full flex items-center gap-1.5 transition-all shadow-md"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-spin" style={{ animationDuration: '3s' }} />
                    <span>{isGeneratingAi ? 'Generating Script...' : '✨ Gemini AI Script Generator'}</span>
                  </button>
                </div>

                <textarea
                  rows={3}
                  value={customInstructions}
                  onChange={(e) => setCustomInstructions(e.target.value)}
                  placeholder="e.g. Mention that he loves coffee, is turning 30, and always quotes superhero movies..."
                  className="w-full px-4 py-3 rounded-2xl bg-slate-950 border border-slate-800 text-white text-sm focus:outline-none focus:border-indigo-500"
                />
              </div>

              {/* Chips: Tone & Language */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-slate-400 block mb-2 uppercase tracking-wider">
                    Tone
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {['Heartfelt', 'Funny & Roast', 'Motivational', 'Emotional'].map((t) => (
                      <button
                        key={t}
                        onClick={() => setTone(t)}
                        className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                          tone === t
                            ? 'bg-indigo-600 text-white shadow-md'
                            : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
                        }`}
                      >
                        {t}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-400 block mb-2 uppercase tracking-wider">
                    Language
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {['English', 'Hindi', 'Spanish', 'French', 'Telugu'].map((l) => (
                      <button
                        key={l}
                        onClick={() => setLanguage(l)}
                        className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                          language === l
                            ? 'bg-purple-600 text-white shadow-md'
                            : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
                        }`}
                      >
                        {l}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Generated Script Preview Box */}
              <div className="p-4 rounded-2xl bg-gradient-to-r from-indigo-950/60 to-slate-950/80 border border-indigo-500/30 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-indigo-300 flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-amber-400" />
                    Generated Creator Script
                  </span>

                  <button
                    onClick={handlePlayTtsPreview}
                    disabled={isTtsLoading}
                    className="px-3 py-1 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold flex items-center gap-1.5"
                  >
                    {isTtsLoading ? (
                      <span className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                    ) : isPlayingAudio ? (
                      <Pause className="w-3.5 h-3.5" />
                    ) : (
                      <Play className="w-3.5 h-3.5 fill-white" />
                    )}
                    <span>{isPlayingAudio ? 'Pause' : 'Listen Voice'}</span>
                  </button>
                </div>

                <p className="text-xs text-slate-200 italic leading-relaxed font-serif bg-slate-950/80 p-3 rounded-xl border border-slate-800">
                  {generatedScript || 'Generating custom script for recipient...'}
                </p>
              </div>

              <button
                onClick={() => setStep(4)}
                className="w-full py-4 rounded-2xl bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 text-slate-950 font-bold text-base shadow-xl shadow-amber-500/20 hover:shadow-amber-500/40 transition-all flex items-center justify-center gap-2"
              >
                <span>Review Order & Pay (₹{totalPrice})</span>
                <ArrowRight className="w-5 h-5 text-slate-950" />
              </button>
            </div>
          )}

          {/* STEP 4: Review Order & Checkout */}
          {step === 4 && (
            <div className="space-y-6">
              {/* Creator & Recipient Summary Card */}
              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 flex items-center gap-4">
                <img
                  src={creator.avatar}
                  alt={creator.name}
                  className="w-16 h-16 rounded-2xl object-cover ring-2 ring-indigo-500/50"
                />
                <div className="flex-1">
                  <h3 className="text-base font-bold text-white">{creator.name}</h3>
                  <div className="text-xs text-slate-400 flex items-center gap-2 mt-0.5">
                    <span>{deliveryType === 'video' ? '4K Video Message' : 'Voice Note Call'}</span>
                    <span>•</span>
                    <span className="text-indigo-400 font-semibold">{selectedOccasion.label}</span>
                  </div>
                  <div className="text-[11px] text-slate-400 mt-1">
                    Scheduled: {deliveryDate} @ {deliveryTime}
                  </div>
                </div>
              </div>

              {/* Recipient Details Summary */}
              <div className="bg-slate-950/60 p-4 rounded-2xl border border-slate-800 text-xs space-y-2 text-slate-300">
                <div className="flex justify-between">
                  <span className="text-slate-400">Recipient Name:</span>
                  <span className="font-bold text-white">{recipientName} ({relationship})</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Recipient Phone:</span>
                  <span className="font-bold text-white">{recipientMobile}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Tone & Language:</span>
                  <span className="font-bold text-white">{tone} ({language})</span>
                </div>
              </div>

              {/* Promo Code Box */}
              <div className="flex items-center gap-2">
                <div className="relative flex-1">
                  <Tag className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="Promo code (e.g. ZUNO50)"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 rounded-2xl bg-slate-950 border border-slate-800 text-white text-xs uppercase focus:outline-none focus:border-indigo-500"
                  />
                </div>
                <button
                  onClick={handleApplyPromo}
                  className="px-4 py-3 rounded-2xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold transition-colors"
                >
                  Apply
                </button>
              </div>

              {/* Price Breakdown */}
              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2 text-xs">
                <div className="flex justify-between text-slate-400">
                  <span>Base Price ({deliveryType}):</span>
                  <span>₹{basePrice}</span>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>AI Gemini Script Generator:</span>
                  <span className="text-emerald-400 font-bold">FREE (₹0)</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-pink-400 font-semibold">
                    <span>Discount Code Applied:</span>
                    <span>-₹{discount}</span>
                  </div>
                )}
                <div className="pt-2 border-t border-slate-800 flex justify-between text-sm font-bold text-white">
                  <span>Total Amount Due:</span>
                  <span className="text-indigo-400 text-lg">₹{totalPrice}</span>
                </div>
              </div>

              {/* Payment Method Tabs */}
              <div>
                <label className="text-xs font-bold text-slate-400 block mb-2 uppercase tracking-wider">
                  Payment Method
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {['UPI / Razorpay', 'Credit Card', 'Netbanking'].map((method) => (
                    <button
                      key={method}
                      onClick={() => setPaymentMethod(method)}
                      className={`p-3 rounded-xl text-xs font-bold border transition-all ${
                        paymentMethod === method
                          ? 'bg-indigo-600 border-indigo-500 text-white shadow-md'
                          : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
                      }`}
                    >
                      {method}
                    </button>
                  ))}
                </div>
              </div>

              <button
                onClick={handleConfirmAndPay}
                disabled={isProcessingPayment}
                className="w-full py-4 rounded-2xl bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 text-slate-950 font-bold text-base shadow-xl shadow-amber-500/25 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2"
              >
                {isProcessingPayment ? (
                  <>
                    <span className="w-5 h-5 border-2 border-slate-950 border-t-transparent rounded-full animate-spin"></span>
                    <span>Scheduling Midnight Surprise...</span>
                  </>
                ) : (
                  <>
                    <ShieldCheck className="w-5 h-5 text-slate-950" />
                    <span>Confirm & Schedule Surprise (₹{totalPrice})</span>
                  </>
                )}
              </button>
            </div>
          )}

          {/* STEP 5: Success Screen */}
          {step === 5 && completedOrder && (
            <div className="text-center py-6 space-y-6 relative overflow-hidden">
              <CanvasShaderBackground variant="success" />

              <div className="relative z-10 space-y-4">
                <div className="w-20 h-20 rounded-full bg-emerald-500/20 border-2 border-emerald-400 flex items-center justify-center mx-auto text-emerald-400 shadow-xl shadow-emerald-500/30 animate-bounce">
                  <CheckCircle2 className="w-10 h-10" />
                </div>

                <h3 className="text-2xl sm:text-3xl font-black font-serif text-white">
                  Your Surprise is Scheduled!
                </h3>
                <p className="text-slate-300 text-sm max-w-md mx-auto">
                  Order <span className="text-indigo-400 font-mono font-bold">{completedOrder.id}</span> has been assigned to{' '}
                  <span className="text-white font-bold">{creator.name}</span>.
                </p>

                {/* Ticking Countdown Box */}
                <div className="bg-slate-950/80 backdrop-blur-xl border border-slate-800 rounded-3xl p-6 max-w-md mx-auto space-y-2">
                  <div className="text-xs text-indigo-400 font-bold uppercase tracking-widest">
                    Sending In (Midnight Delivery)
                  </div>
                  <div className="grid grid-cols-4 gap-2 text-center pt-2">
                    <div className="p-3 rounded-2xl bg-slate-900 border border-slate-800">
                      <div className="text-xl font-black text-white">{String(timeRemaining.days).padStart(2, '0')}</div>
                      <div className="text-[10px] text-slate-400">Days</div>
                    </div>
                    <div className="p-3 rounded-2xl bg-slate-900 border border-slate-800">
                      <div className="text-xl font-black text-white">{String(timeRemaining.hours).padStart(2, '0')}</div>
                      <div className="text-[10px] text-slate-400">Hours</div>
                    </div>
                    <div className="p-3 rounded-2xl bg-slate-900 border border-slate-800">
                      <div className="text-xl font-black text-white">{String(timeRemaining.minutes).padStart(2, '0')}</div>
                      <div className="text-[10px] text-slate-400">Mins</div>
                    </div>
                    <div className="p-3 rounded-2xl bg-slate-900 border border-slate-800">
                      <div className="text-xl font-black text-indigo-400 animate-pulse">{String(timeRemaining.seconds).padStart(2, '0')}</div>
                      <div className="text-[10px] text-slate-400">Secs</div>
                    </div>
                  </div>
                </div>

                <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
                  <button
                    onClick={onClose}
                    className="w-full sm:w-auto px-8 py-3.5 rounded-2xl bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-bold text-sm shadow-lg shadow-indigo-500/25"
                  >
                    View in My Orders
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
