import React, { useState } from 'react';
import { Calendar, Clock, CheckCircle2, Sparkles, ChevronRight } from 'lucide-react';
import { Order } from '../types';

interface Props {
  orders: Order[];
  onBackToDiscover: () => void;
  onBookNew: () => void;
}

export const OrdersHistoryView: React.FC<Props> = ({ orders, onBackToDiscover, onBookNew }) => {
  const [activeTab, setActiveTab] = useState<'all' | 'scheduled' | 'delivered'>('all');
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  const filteredOrders = orders.filter((o) => {
    if (activeTab === 'scheduled') return o.status === 'scheduled' || o.status === 'ordered' || o.status === 'ai_generating';
    if (activeTab === 'delivered') return o.status === 'delivered';
    return true;
  });

  const tabClass = (active: boolean) =>
    `flex-1 py-2.5 text-xs font-semibold transition-colors border-b-2 ${
      active ? 'text-ember-300 border-ember-400' : 'text-mist-500 hover:text-cream border-transparent'
    }`;

  return (
    <div className="min-h-screen bg-night-950 text-cream pt-10 pb-24">
      <div className="max-w-5xl mx-auto px-5 sm:px-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-10">
          <div>
            <div className="operator-label mb-2">Evoke · Tracking</div>
            <h1 className="font-display text-4xl sm:text-5xl font-light text-cream">My Surprises</h1>
            <p className="text-mist-500 text-sm mt-2">Track scheduled midnight calls and past video gifts</p>
          </div>

          <button
            onClick={onBookNew}
            className="inline-flex items-center gap-2 px-5 py-3 bg-ember-400 hover:bg-ember-300 text-night-950 font-semibold text-xs transition-colors"
          >
            <Sparkles className="w-4 h-4 text-night-950" />
            <span>Send another gift</span>
          </button>
        </div>

        {/* Status Filter Tabs */}
        <div className="flex items-center gap-8 border-b border-night-800 mb-8 max-w-lg">
          <button onClick={() => setActiveTab('all')} className={tabClass(activeTab === 'all')}>
            All surprises ({orders.length})
          </button>
          <button onClick={() => setActiveTab('scheduled')} className={tabClass(activeTab === 'scheduled')}>
            Scheduled
          </button>
          <button onClick={() => setActiveTab('delivered')} className={tabClass(activeTab === 'delivered')}>
            Delivered
          </button>
        </div>

        {/* Empty State */}
        {filteredOrders.length === 0 ? (
          <div className="text-center py-20 bg-night-900/40 border border-night-800 p-8 max-w-md mx-auto space-y-5">
            <div className="w-14 h-14 bg-night-800 text-mist-500 flex items-center justify-center mx-auto">
              <Calendar className="w-7 h-7" />
            </div>
            <h3 className="font-display text-2xl font-light text-cream">No surprises found</h3>
            <p className="text-mist-500 text-xs leading-relaxed">
              You haven't scheduled any surprises in this tab yet.
            </p>
            <button
              onClick={onBackToDiscover}
              className="px-6 py-3 bg-ember-400 hover:bg-ember-300 text-night-950 font-semibold text-xs transition-colors"
            >
              Browse creators
            </button>
          </div>
        ) : (
          /* Order Cards List */
          <div className="space-y-4">
            {filteredOrders.map((order) => (
              <div
                key={order.id}
                onClick={() => setSelectedOrder(order)}
                className="bg-night-900/60 border border-night-800 hover:border-ember-500/50 transition-colors cursor-pointer flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 group"
              >
                {/* Left Info */}
                <div className="flex items-center gap-4 p-5">
                  <img
                    src={order.creator.avatar}
                    alt={order.creator.name}
                    className="w-16 h-16 object-cover border border-night-800"
                  />
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs font-mono font-semibold text-ember-300">{order.id}</span>
                      <span
                        className={`px-2 py-0.5 text-[10px] font-mono tracking-wider uppercase ${
                          order.status === 'delivered'
                            ? 'bg-aurora-400/10 text-aurora-400 border border-aurora-400/40'
                            : 'bg-ember-400/10 text-ember-300 border border-ember-500/40'
                        }`}
                      >
                        {order.status === 'delivered' ? 'Delivered' : 'Scheduled 12:00 AM'}
                      </span>
                    </div>

                    <h3 className="font-display text-xl font-medium text-cream group-hover:text-ember-300 transition-colors">
                      {order.creator.name}
                    </h3>

                    <div className="text-xs text-mist-500 mt-1 flex flex-wrap items-center gap-2">
                      <span>To: <strong className="text-mist-300">{order.recipientName}</strong></span>
                      <span>·</span>
                      <span>{order.occasion}</span>
                      <span>·</span>
                      <span>{order.deliveryType === 'video' ? '4K Video' : 'Voice Note'}</span>
                    </div>
                  </div>
                </div>

                {/* Right Scheduled Details */}
                <div className="flex items-center gap-4 p-5 self-end sm:self-center pt-0 sm:pt-5">
                  <div className="text-right">
                    <div className="text-xs text-mist-500">Scheduled date</div>
                    <div className="text-sm font-semibold text-cream">{order.deliveryDate}</div>
                    <div className="text-[11px] text-ember-300 font-medium">{order.deliveryTime}</div>
                  </div>

                  <ChevronRight className="w-4 h-4 text-mist-500" />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Order Details Modal */}
        {selectedOrder && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-night-950/90 backdrop-blur-xl">
            <div className="bg-night-900 border border-night-800 p-6 sm:p-8 max-w-xl w-full text-cream space-y-7 relative">
              <button
                onClick={() => setSelectedOrder(null)}
                className="absolute top-4 right-4 text-mist-500 hover:text-cream p-1 transition-colors"
              >
                ✕
              </button>

              <div>
                <div className="operator-label !text-[10px]">Order {selectedOrder.id}</div>
                <h3 className="font-display text-2xl font-light text-cream">Surprise progress timeline</h3>
              </div>

              {/* Progress Steps */}
              <div className="space-y-3 bg-night-950/80 p-5 border border-night-800 text-xs">
                <div className="flex items-center gap-3 text-aurora-400">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Order placed & payment confirmed</span>
                </div>
                <div className="flex items-center gap-3 text-aurora-400">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>AI script approved with Gemini Studio</span>
                </div>
                <div className="flex items-center gap-3 text-ember-300 font-semibold">
                  <Clock className="w-4 h-4 animate-spin" />
                  <span>Creator studio recording in progress</span>
                </div>
                <div className="flex items-center gap-3 text-mist-600">
                  <span className="w-4 h-4 rounded-full border border-night-700" />
                  <span>Midnight 12:00 AM direct dispatch</span>
                </div>
              </div>

              {/* Script Quote */}
              <div className="p-4 border border-ember-500/30 bg-night-950/60 space-y-2">
                <div className="operator-label !text-[10px]">Custom script preview</div>
                <p className="text-xs italic text-mist-300 font-display leading-relaxed">
                  "{selectedOrder.generatedScript}"
                </p>
              </div>

              <div className="flex items-center justify-between pt-1">
                <div>
                  <div className="text-xs text-mist-500">Total paid</div>
                  <div className="font-display text-2xl font-normal text-ember-300">₹{selectedOrder.totalPrice}</div>
                </div>

                <button
                  onClick={() => setSelectedOrder(null)}
                  className="px-6 py-2.5 bg-ember-400 hover:bg-ember-300 text-night-950 text-xs font-semibold transition-colors"
                >
                  Close details
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
