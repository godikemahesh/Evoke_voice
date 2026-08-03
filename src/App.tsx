import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Sidebar } from './components/Sidebar';
import { LandingHero } from './components/LandingHero';
import { DiscoverView } from './components/DiscoverView';
import { CreatorDetailView } from './components/CreatorDetailView';
import { BookingFlowModal } from './components/BookingFlowModal';
import { OrdersHistoryView } from './components/OrdersHistoryView';
import { AiConciergeDrawer } from './components/AiConciergeDrawer';
import { AuthModal } from './components/AuthModal';
import { SettingsView } from './components/SettingsView';

import { ActiveTab, Creator, DeliveryType, Order, User } from './types';
import { MOCK_CREATORS } from './data/mockCreators';

export default function App() {
  const [user, setUser] = useState<User | null>(() => {
    try {
      const saved = localStorage.getItem('evoke_user');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.warn('LocalStorage user restore error:', e);
    }
    return null;
  });

  const [activeTab, setActiveTab] = useState<ActiveTab>(() => {
    try {
      const savedUser = localStorage.getItem('evoke_user');
      if (savedUser) return 'discover';
    } catch (e) {
      // ignore
    }
    return 'landing';
  });

  // Ensure logged-in users are always routed to discover and cannot access landing page
  useEffect(() => {
    if (user && activeTab === 'landing') {
      setActiveTab('discover');
    }
  }, [user, activeTab]);

  const [creators] = useState<Creator[]>(MOCK_CREATORS);
  const [selectedCreator, setSelectedCreator] = useState<Creator | null>(null);

  // Orders State with localStorage persistence
  const [orders, setOrders] = useState<Order[]>(() => {
    try {
      const saved = localStorage.getItem('evoke_orders');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.warn('LocalStorage error:', e);
    }
    // Default initial mock order
    return [
      {
        id: 'EV-8492-X',
        creator: MOCK_CREATORS[0],
        deliveryType: 'video',
        recipientName: 'Mahesh',
        recipientAge: '28',
        recipientMobile: '+1 (555) 234-5678',
        relationship: 'Friend',
        occasion: 'Birthday',
        deliveryDate: new Date(Date.now() + 172800000).toISOString().split('T')[0],
        deliveryTime: '12:00 AM Midnight (Recommended)',
        customInstructions: 'Wish him happy 28th birthday and mention his passion for AI startups!',
        generatedScript: 'Hey Mahesh! Aura Nightshade here. Midnight has struck and I want to wish you an incredible 28th birthday! Keep building amazing AI projects!',
        tone: 'Heartfelt',
        language: 'English',
        durationTarget: '~60 sec',
        basePrice: 150,
        discount: 0,
        totalPrice: 150,
        paymentMethod: 'Apple Pay',
        status: 'scheduled',
        scheduledTimestamp: Date.now() + 172800000,
        createdAt: new Date().toLocaleDateString(),
      },
    ];
  });

  useEffect(() => {
    try {
      localStorage.setItem('evoke_orders', JSON.stringify(orders));
    } catch (e) {
      console.warn('LocalStorage save error:', e);
    }
  }, [orders]);

  // Modal states
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [bookingCreator, setBookingCreator] = useState<Creator>(MOCK_CREATORS[0]);
  const [bookingDeliveryType, setBookingDeliveryType] = useState<DeliveryType>('video');

  // Authentication & Pending booking flow state
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authInitialMode, setAuthInitialMode] = useState<'login' | 'register'>('register');
  const [pendingBooking, setPendingBooking] = useState<{ creator: Creator; deliveryType: DeliveryType } | null>(null);

  const [isAiConciergeOpen, setIsAiConciergeOpen] = useState(false);

  // Handlers
  const handleSelectCreator = (creator: Creator) => {
    if (!user) {
      setPendingBooking(null);
      setAuthInitialMode('login');
      setIsAuthModalOpen(true);
      return;
    }
    setSelectedCreator(creator);
    setActiveTab('creator');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSurpriseSomeone = () => {
    if (!user) {
      setPendingBooking(null);
      setAuthInitialMode('register');
      setIsAuthModalOpen(true);
      return;
    }
    setActiveTab('discover');
  };

  const handleStartBooking = (creator?: Creator, deliveryType: DeliveryType = 'video') => {
    const target = creator || selectedCreator || creators[0];
    setBookingCreator(target);
    setBookingDeliveryType(deliveryType);

    // If user is not authenticated, prompt Login / Registration Modal
    if (!user) {
      setPendingBooking({ creator: target, deliveryType });
      setAuthInitialMode('register');
      setIsAuthModalOpen(true);
      return;
    }

    setIsBookingModalOpen(true);
  };

  const handleLoginSuccess = (loggedInUser: User) => {
    setUser(loggedInUser);
    try {
      localStorage.setItem('evoke_user', JSON.stringify(loggedInUser));
    } catch (e) {
      console.warn('LocalStorage save user error:', e);
    }
    setIsAuthModalOpen(false);
    setActiveTab('discover');

    // If booking was requested prior to login/registration, immediately open booking flow
    if (pendingBooking) {
      setBookingCreator(pendingBooking.creator);
      setBookingDeliveryType(pendingBooking.deliveryType);
      setIsBookingModalOpen(true);
      setPendingBooking(null);
    }
  };

  const handleLogout = () => {
    setUser(null);
    setActiveTab('landing');
    try {
      localStorage.removeItem('evoke_user');
    } catch (e) {
      console.warn('LocalStorage remove user error:', e);
    }
  };

  const handleOrderCreated = (newOrder: Order) => {
    setOrders((prev) => [newOrder, ...prev]);
  };

  const upcomingCount = orders.filter(
    (o) => o.status === 'scheduled' || o.status === 'ordered' || o.status === 'ai_generating'
  ).length;

  return (
    <div className="min-h-screen bg-night-950 text-cream font-sans antialiased selection:bg-ember-400 selection:text-night-950">
      {/* Global Navigation Bar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        user={user}
        onOpenAuth={() => {
          setAuthInitialMode('login');
          setIsAuthModalOpen(true);
        }}
        upcomingCount={upcomingCount}
        onOpenSearch={() => setActiveTab('discover')}
      />

      {/* Main View Switcher */}
      <main className="relative z-10">
        {activeTab === 'landing' && (
          <LandingHero
            onStartBooking={(creator) => handleStartBooking(creator)}
            onSurpriseSomeone={handleSurpriseSomeone}
            onExplore={() => setActiveTab('discover')}
            featuredCreators={creators}
            onSelectCreator={handleSelectCreator}
          />
        )}

        {activeTab === 'discover' && (
          <DiscoverView
            user={user}
            creators={creators}
            onSelectCreator={handleSelectCreator}
            onOpenAiConcierge={() => setIsAiConciergeOpen(true)}
          />
        )}

        {activeTab === 'creator' && selectedCreator && (
          <CreatorDetailView
            creator={selectedCreator}
            onBack={() => setActiveTab('discover')}
            onProceed={(c, type) => handleStartBooking(c, type)}
          />
        )}

        {activeTab === 'my-orders' && (
          <OrdersHistoryView
            orders={orders}
            onBackToDiscover={() => setActiveTab('discover')}
            onBookNew={() => setActiveTab('discover')}
          />
        )}

        {activeTab === 'ai-assistant' && (
          <div className="pt-8 px-4 max-w-4xl mx-auto">
            <DiscoverView
              user={user}
              creators={creators}
              onSelectCreator={handleSelectCreator}
              onOpenAiConcierge={() => setIsAiConciergeOpen(true)}
            />
          </div>
        )}

        {activeTab === 'settings' && (
          <SettingsView user={user} onLogout={handleLogout} />
        )}
      </main>

      {/* Sidebar / Bottom Navigation */}
      <Sidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        upcomingCount={upcomingCount}
      />

      {/* Booking Flow Modal */}
      {isBookingModalOpen && (
        <BookingFlowModal
          creator={bookingCreator}
          initialDeliveryType={bookingDeliveryType}
          onClose={() => setIsBookingModalOpen(false)}
          onOrderCreated={handleOrderCreated}
        />
      )}

      {/* Auth Modal (Login & Registration Page) */}
      <AuthModal
        isOpen={isAuthModalOpen}
        initialMode={authInitialMode}
        onClose={() => {
          setIsAuthModalOpen(false);
          setPendingBooking(null);
        }}
        onLoginSuccess={handleLoginSuccess}
      />

      {/* AI Studio Concierge Drawer */}
      <AiConciergeDrawer
        isOpen={isAiConciergeOpen || activeTab === 'ai-assistant'}
        onClose={() => {
          setIsAiConciergeOpen(false);
          if (activeTab === 'ai-assistant') {
            setActiveTab('discover');
          }
        }}
        creators={creators}
        onSelectCreator={handleSelectCreator}
      />
    </div>
  );
}
