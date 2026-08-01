export type DeliveryType = 'video' | 'voice';

export type OrderStatus = 'ordered' | 'ai_generating' | 'recorded' | 'scheduled' | 'delivered';

export interface Creator {
  id: string;
  name: string;
  tagline: string;
  category: string;
  avatar: string;
  coverImage: string;
  rating: number;
  reviewsCount: number;
  languages: string[];
  bio: string;
  voicePrice: number;
  videoPrice: number;
  badges: string[];
  trending?: boolean;
  recommended?: boolean;
  audioSampleText?: string;
  sampleVideoUrl?: string;
}

export interface Occasion {
  id: string;
  label: string;
  icon: string;
  description: string;
  suggestedPrompt: string;
}

export interface Order {
  id: string;
  creator: Creator;
  deliveryType: DeliveryType;
  recipientName: string;
  recipientAge: string;
  recipientMobile: string;
  recipientEmail?: string;
  relationship: string;
  occasion: string;
  deliveryDate: string;
  deliveryTime: string;
  customInstructions: string;
  generatedScript: string;
  tone: string;
  language: string;
  durationTarget: string;
  basePrice: number;
  discount: number;
  totalPrice: number;
  promoCode?: string;
  paymentMethod: string;
  status: OrderStatus;
  scheduledTimestamp: number;
  createdAt: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  isLoggedIn: boolean;
}

export type ActiveTab = 'landing' | 'discover' | 'creator' | 'my-orders' | 'ai-assistant' | 'settings';
