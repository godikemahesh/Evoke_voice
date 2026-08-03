import React, { useState, useEffect } from 'react';
import {
  X, ArrowLeft, ArrowRight, Sparkles, Cake, GraduationCap, Rocket, Heart,
  Gift, Trophy, Crown, CheckCircle2, Volume2, Play, Pause, ShieldCheck, Tag
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
  const [paymentMethod, setPaymentMethod] = useState<string>('UPI / Razorpay');
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

  const handleApplyPromo = () => {
    if (promoCode.trim().toUpperCase() === 'EVOKE50' || promoCode.trim().toUpperCase() === 'MIDNIGHT') {
      setDiscount(50);
    } else if (promoCode.trim().length > 0) {
      setDiscount(20);
    }
  };

  const handleConfirmAndPay = () => {
    setIsProcessingPayment(true);
    setTimeout(() => {
      const newOrder: Order = {
        id: `EV-${Math.floor(1000 + Math.random() * 9000)}-X`,
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
      case 'Cake': return <Cake className="w-5 h-5 text-ember-400" />;
      case 'GraduationCap': return <GraduationCap className="w-5 h-5 text-ember-400" />;
      case 'Rocket': return <Rocket className="w-5 h-5 text-ember-400" />;
      case 'Heart': return <Heart className="w-5 h-5 text-ember-400" />;
      case 'Sparkles': return <Sparkles className="w-5 h-5 text-ember-400" />;
      case 'Crown': return <Crown className="w-5 h-5 text-ember-400" />;
      case 'Trophy': return <Trophy className="w-5 h-5 text-ember-400" />;
      default: return <Gift className="w-5 h-5 text-ember-400" />;
    }
  };

  const stepTitles: Record<number, string> = {
    1: 'What is the occasion?',
    2: 'Who are you surprising?',
    3: 'AI Studio personalization',
    4: 'Review order & checkout',
    5: 'Surprise scheduled',
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-night-950/90 backdrop-blur-xl">
      <div className="relative w-full max-w-2xl bg-night-900 border border-night-800 my-auto text-cream">
        {/* Top Header Bar */}
        <div className="px-6 py-5 border-b border-night-800 bg-night-950/60 flex items-center justify-between">
          <div className="flex items-center gap-3">
            {step > 1 && step < 5 && (
              <button
                onClick={() => setStep((step - 1) as any)}
                className="p-2 border border-night-800 hover:border-night-700 text-mist-400 hover:text-cream transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
              </button>
            )}
            <div>
              <div className="operator-label !text-[10px]">Step {Math.min(step, 4)} of 4 · {creator.name}</div>
              <h2 className="font-display text-lg font-medium text-cream">{stepTitles[step]}</h2>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 border border-night-800 hover:border-night-700 text-mist-400 hover:text-cream transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body Content */}
        <div className="p-6 max-h-[75vh] overflow-y-auto space-y-7">
          {/* STEP 1: Occasion & Schedule */}
          {step === 1 && (
            <div className="space-y-7">
              <div>
                <label className="operator-label !text-[10px] block mb-3">Select occasion</label>
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
                        className={`p-4 border transition-colors cursor-pointer flex flex-col items-center text-center gap-2 ${
                          isSelected
                            ? 'border-ember-500 bg-night-850'
                            : 'border-night-800 bg-night-950 hover:border-night-700'
                        }`}
                      >
                        <div className="p-2 border border-night-800 bg-night-900">
                          {renderIcon(occ.icon)}
                        </div>
                        <span className="text-xs font-semibold text-cream">{occ.label}</span>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="operator-label !text-[10px] block mb-2">Delivery date</label>
                  <input
                    type="date"
                    value={deliveryDate}
                    onChange={(e) => setDeliveryDate(e.target.value)}
                    className="w-full px-4 py-3 bg-night-950 border border-night-800 text-cream font-medium text-sm focus:outline-none focus:border-ember-500 transition-colors"
                  />
                </div>

                <div>
                  <label className="operator-label !text-[10px] block mb-2">Delivery time target</label>
                  <select
                    value={deliveryTime}
                    onChange={(e) => setDeliveryTime(e.target.value)}
                    className="w-full px-4 py-3 bg-night-950 border border-night-800 text-cream font-medium text-sm focus:outline-none focus:border-ember-500 transition-colors"
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
                className="w-full py-4 bg-ember-400 hover:bg-ember-300 text-night-950 font-semibold text-sm transition-colors flex items-center justify-center gap-2"
              >
                <span>Continue to recipient details</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}

          {/* STEP 2: Recipient Details */}
          {step === 2 && (
            <div className="space-y-6">
              <div>
                <label className="operator-label !text-[10px] block mb-2">Recipient name *</label>
                <input
                  type="text"
                  value={recipientName}
                  onChange={(e) => setRecipientName(e.target.value)}
                  placeholder="e.g. Mahesh Kumar"
                  className="w-full px-4 py-3.5 bg-night-950 border border-night-800 text-cream text-sm focus:outline-none focus:border-ember-500 transition-colors"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="operator-label !text-[10px] block mb-2">Relationship</label>
                  <select
                    value={relationship}
                    onChange={(e) => setRelationship(e.target.value)}
                    className="w-full px-4 py-3.5 bg-night-950 border border-night-800 text-cream text-sm focus:outline-none focus:border-ember-500 transition-colors"
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
                  <label className="operator-label !text-[10px] block mb-2">Recipient age</label>
                  <input
                    type="number"
                    value={recipientAge}
                    onChange={(e) => setRecipientAge(e.target.value)}
                    placeholder="e.g. 28"
                    className="w-full px-4 py-3.5 bg-night-950 border border-night-800 text-cream text-sm focus:outline-none focus:border-ember-500 transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="operator-label !text-[10px] block mb-2">Recipient mobile phone *</label>
                <input
                  type="text"
                  value={recipientMobile}
                  onChange={(e) => setRecipientMobile(e.target.value)}
                  placeholder="+1 (555) 000-0000"
                  className="w-full px-4 py-3.5 bg-night-950 border border-night-800 text-cream text-sm focus:outline-none focus:border-ember-500 transition-colors"
                />
                <p className="text-[11px] text-mist-500 mt-1.5">
                  Required for automated midnight call dispatch or SMS gift link.
                </p>
              </div>

              <button
                onClick={() => {
                  setStep(3);
                  if (!generatedScript) handleGenerateScript();
                }}
                className="w-full py-4 bg-ember-400 hover:bg-ember-300 text-night-950 font-semibold text-sm transition-colors flex items-center justify-center gap-2"
              >
                <span>Continue to personalize script</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}

          {/* STEP 3: AI Script Personalization */}
          {step === 3 && (
            <div className="space-y-7">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="operator-label !text-[10px]">Custom prompt & memories</label>
                  <button
                    onClick={handleGenerateScript}
                    disabled={isGeneratingAi}
                    className="text-xs font-semibold text-ember-300 hover:text-ember-200 border border-ember-500/40 bg-night-950 px-3 py-1.5 flex items-center gap-1.5 transition-colors"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-ember-400" />
                    <span>{isGeneratingAi ? 'Generating script...' : 'Gemini AI script generator'}</span>
                  </button>
                </div>

                <textarea
                  rows={3}
                  value={customInstructions}
                  onChange={(e) => setCustomInstructions(e.target.value)}
                  placeholder="e.g. Mention that he loves coffee, is turning 30, and always quotes superhero movies..."
                  className="w-full px-4 py-3 bg-night-950 border border-night-800 text-cream text-sm focus:outline-none focus:border-ember-500 transition-colors"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="operator-label !text-[10px] block mb-2">Tone</label>
                  <div className="flex flex-wrap gap-2">
                    {['Heartfelt', 'Funny & Roast', 'Motivational', 'Emotional'].map((t) => (
                      <button
                        key={t}
                        onClick={() => setTone(t)}
                        className={`px-3 py-1.5 text-xs font-medium border transition-colors ${
                          tone === t
                            ? 'border-ember-500 text-ember-300 bg-night-850'
                            : 'border-night-800 text-mist-400 hover:text-cream'
                        }`}
                      >
                        {t}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="operator-label !text-[10px] block mb-2">Language</label>
                  <div className="flex flex-wrap gap-2">
                    {['English', 'Hindi', 'Spanish', 'French', 'Telugu'].map((l) => (
                      <button
                        key={l}
                        onClick={() => setLanguage(l)}
                        className={`px-3 py-1.5 text-xs font-medium border transition-colors ${
                          language === l
                            ? 'border-ember-500 text-ember-300 bg-night-850'
                            : 'border-night-800 text-mist-400 hover:text-cream'
                        }`}
                      >
                        {l}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Generated Script Preview */}
              <div className="border border-ember-500/30 bg-night-950/60 p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-ember-300 flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-ember-400" />
                    Generated creator script
                  </span>

                  <button
                    onClick={handlePlayTtsPreview}
                    disabled={isTtsLoading}
                    className="px-3 py-1.5 bg-ember-400 hover:bg-ember-300 text-night-950 text-xs font-semibold flex items-center gap-1.5 transition-colors"
                  >
                    {isTtsLoading ? (
                      <span className="w-3.5 h-3.5 border-2 border-night-950 border-t-transparent rounded-full animate-spin"></span>
                    ) : isPlayingAudio ? (
                      <Pause className="w-3.5 h-3.5" />
                    ) : (
                      <Play className="w-3.5 h-3.5 fill-night-950" />
                    )}
                    <span>{isPlayingAudio ? 'Pause' : 'Listen voice'}</span>
                  </button>
                </div>

                <p className="text-xs text-mist-300 italic leading-relaxed font-display bg-night-950/80 p-3 border border-night-800">
                  {generatedScript || 'Generating custom script for recipient...'}
                </p>
              </div>

              <button
                onClick={() => setStep(4)}
                className="w-full py-4 bg-ember-400 hover:bg-ember-300 text-night-950 font-semibold text-sm transition-colors flex items-center justify-center gap-2"
              >
                <span>Review order & pay (₹{totalPrice})</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}

          {/* STEP 4: Review Order & Checkout */}
          {step === 4 && (
            <div className="space-y-6">
              {/* Creator & Recipient Summary Card */}
              <div className="p-4 border border-night-800 bg-night-950 flex items-center gap-4">
                <img
                  src={creator.avatar}
                  alt={creator.name}
                  className="w-16 h-16 border-2 border-night-800 object-cover"
                />
                <div className="flex-1">
                  <h3 className="font-display text-lg font-medium text-cream">{creator.name}</h3>
                  <div className="text-xs text-mist-500 flex items-center gap-2 mt-0.5">
                    <span>{deliveryType === 'video' ? '4K Video Message' : 'Voice Note Call'}</span>
                    <span>·</span>
                    <span className="text-ember-300 font-semibold">{selectedOccasion.label}</span>
                  </div>
                  <div className="text-[11px] text-mist-500 mt-1">
                    Scheduled: {deliveryDate} @ {deliveryTime}
                  </div>
                </div>
              </div>

              {/* Recipient Details Summary */}
              <div className="bg-night-950/60 p-4 border border-night-800 text-xs space-y-2 text-mist-400">
                <div className="flex justify-between">
                  <span className="text-mist-500">Recipient:</span>
                  <span className="font-semibold text-cream">{recipientName} ({relationship})</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-mist-500">Phone:</span>
                  <span className="font-semibold text-cream">{recipientMobile}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-mist-500">Tone & language:</span>
                  <span className="font-semibold text-cream">{tone} ({language})</span>
                </div>
              </div>

              {/* Promo Code Box */}
              <div className="flex items-center gap-2">
                <div className="relative flex-1">
                  <Tag className="w-4 h-4 text-mist-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="Promo code (e.g. EVOKE50)"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-night-950 border border-night-800 text-cream text-xs uppercase focus:outline-none focus:border-ember-500 transition-colors"
                  />
                </div>
                <button
                  onClick={handleApplyPromo}
                  className="px-4 py-3 bg-night-850 hover:bg-night-800 border border-night-700 text-cream text-xs font-semibold transition-colors"
                >
                  Apply
                </button>
              </div>

              {/* Price Breakdown */}
              <div className="p-4 bg-night-950 border border-night-800 space-y-2 text-xs">
                <div className="flex justify-between text-mist-500">
                  <span>Base price ({deliveryType}):</span>
                  <span className="text-cream">₹{basePrice}</span>
                </div>
                <div className="flex justify-between text-mist-500">
                  <span>Gemini AI script generator:</span>
                  <span className="text-ember-300 font-semibold">FREE (₹0)</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-mist-500 font-semibold">
                    <span>Discount code applied:</span>
                    <span className="text-cream">-₹{discount}</span>
                  </div>
                )}
                <div className="pt-2 border-t border-night-800 flex justify-between text-sm font-semibold text-cream">
                  <span>Total amount due:</span>
                  <span className="text-ember-300 text-lg font-display">₹{totalPrice}</span>
                </div>
              </div>

              {/* Payment Method Tabs */}
              <div>
                <label className="operator-label !text-[10px] block mb-2">Payment method</label>
                <div className="grid grid-cols-3 gap-2">
                  {['UPI / Razorpay', 'Credit Card', 'Netbanking'].map((method) => (
                    <button
                      key={method}
                      onClick={() => setPaymentMethod(method)}
                      className={`p-3 text-xs font-semibold border transition-colors ${
                        paymentMethod === method
                          ? 'border-ember-500 bg-night-850 text-ember-300'
                          : 'border-night-800 bg-night-950 text-mist-400 hover:text-cream'
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
                className="w-full py-4 bg-ember-400 hover:bg-ember-300 text-night-950 font-semibold text-sm transition-colors flex items-center justify-center gap-2"
              >
                {isProcessingPayment ? (
                  <>
                    <span className="w-5 h-5 border-2 border-night-950 border-t-transparent rounded-full animate-spin"></span>
                    <span>Scheduling midnight surprise...</span>
                  </>
                ) : (
                  <>
                    <ShieldCheck className="w-4 h-4 text-night-950" />
                    <span>Confirm & schedule surprise (₹{totalPrice})</span>
                  </>
                )}
              </button>
            </div>
          )}

          {/* STEP 5: Success Screen */}
          {step === 5 && completedOrder && (
            <div className="text-center py-6 space-y-6 relative overflow-hidden">
              <CanvasShaderBackground variant="success" />

              <div className="relative z-10 space-y-5">
                <div className="w-16 h-16 rounded-full bg-ember-400/20 border border-ember-400 flex items-center justify-center mx-auto text-ember-300">
                  <CheckCircle2 className="w-8 h-8" />
                </div>

                <h3 className="font-display text-3xl font-light text-cream">Your surprise is scheduled</h3>
                <p className="text-mist-400 text-sm max-w-md mx-auto">
                  Order <span className="text-ember-300 font-mono font-semibold">{completedOrder.id}</span> has been
                  assigned to <span className="text-cream font-semibold">{creator.name}</span>.
                </p>

                {/* Ticking Countdown Box */}
                <div className="bg-night-950/80 border border-night-800 p-6 max-w-md mx-auto space-y-3">
                  <div className="operator-label !text-[10px]">Sending in · Midnight delivery</div>
                  <div className="grid grid-cols-4 gap-2 text-center pt-1">
                    <div className="p-3 bg-night-900 border border-night-800">
                      <div className="text-xl font-semibold text-cream">{String(timeRemaining.days).padStart(2, '0')}</div>
                      <div className="text-[10px] text-mist-500">Days</div>
                    </div>
                    <div className="p-3 bg-night-900 border border-night-800">
                      <div className="text-xl font-semibold text-cream">{String(timeRemaining.hours).padStart(2, '0')}</div>
                      <div className="text-[10px] text-mist-500">Hours</div>
                    </div>
                    <div className="p-3 bg-night-900 border border-night-800">
                      <div className="text-xl font-semibold text-cream">{String(timeRemaining.minutes).padStart(2, '0')}</div>
                      <div className="text-[10px] text-mist-500">Mins</div>
                    </div>
                    <div className="p-3 bg-night-900 border border-night-800">
                      <div className="text-xl font-semibold text-ember-300">{String(timeRemaining.seconds).padStart(2, '0')}</div>
                      <div className="text-[10px] text-mist-500">Secs</div>
                    </div>
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    onClick={onClose}
                    className="px-8 py-3.5 bg-ember-400 hover:bg-ember-300 text-night-950 font-semibold text-sm transition-colors"
                  >
                    View in my orders
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
