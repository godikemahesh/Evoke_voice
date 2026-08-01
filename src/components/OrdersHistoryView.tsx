import React, { useState } from 'react';
import { Calendar, Clock, CheckCircle2, Play, Download, Sparkles, AlertCircle, ArrowLeft, ShieldCheck, ChevronRight, Volume2 } from 'lucide-react';
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

  return (
    <div className="min-h-screen bg-slate-950 text-white pt-6 pb-24">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-black font-serif text-white">My Surprises</h1>
            <p className="text-slate-400 text-sm mt-1">Track scheduled midnight calls and past video gifts</p>
          </div>

          <button
            onClick={onBookNew}
            className="px-5 py-2.5 rounded-2xl bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-bold text-sm shadow-lg shadow-indigo-500/20 hover:scale-105 transition-all flex items-center gap-2"
          >
            <Sparkles className="w-4 h-4 text-amber-300" />
            <span>Send Another Gift</span>
          </button>
        </div>

        {/* Status Filter Tabs */}
        <div className="flex items-center gap-2 p-1.5 rounded-2xl bg-slate-900 border border-slate-800 mb-8 max-w-md">
          <button
            onClick={() => setActiveTab('all')}
            className={`flex-1 py-2.5 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'all'
                ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            All Surprises ({orders.length})
          </button>
          <button
            onClick={() => setActiveTab('scheduled')}
            className={`flex-1 py-2.5 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'scheduled'
                ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Scheduled
          </button>
          <button
            onClick={() => setActiveTab('delivered')}
            className={`flex-1 py-2.5 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'delivered'
                ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Delivered
          </button>
        </div>

        {/* Empty State */}
        {filteredOrders.length === 0 ? (
          <div className="text-center py-20 bg-slate-900/40 rounded-3xl border border-slate-800 p-8 max-w-md mx-auto space-y-4">
            <div className="w-16 h-16 rounded-full bg-slate-800 text-slate-500 flex items-center justify-center mx-auto">
              <Calendar className="w-8 h-8" />
            </div>
            <h3 className="text-lg font-bold text-white">No Surprises Found</h3>
            <p className="text-slate-400 text-xs leading-relaxed">
              You haven&apos;t scheduled any celebrity surprises in this tab yet.
            </p>
            <button
              onClick={onBackToDiscover}
              className="px-6 py-3 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shadow-lg transition-all"
            >
              Browse Creators
            </button>
          </div>
        ) : (
          /* Order Cards List */
          <div className="space-y-4">
            {filteredOrders.map((order) => (
              <div
                key={order.id}
                onClick={() => setSelectedOrder(order)}
                className="bg-slate-900/80 rounded-3xl p-6 border border-slate-800 hover:border-indigo-500/50 transition-all cursor-pointer shadow-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 group"
              >
                {/* Left Info */}
                <div className="flex items-center gap-4">
                  <img
                    src={order.creator.avatar}
                    alt={order.creator.name}
                    className="w-16 h-16 rounded-2xl object-cover ring-2 ring-indigo-500/40 group-hover:scale-105 transition-transform"
                  />
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs font-mono font-bold text-indigo-400">{order.id}</span>
                      <span
                        className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                          order.status === 'delivered'
                            ? 'bg-emerald-950 text-emerald-300 border border-emerald-500/40'
                            : 'bg-indigo-950 text-indigo-300 border border-indigo-500/40 animate-pulse'
                        }`}
                      >
                        {order.status === 'delivered' ? 'Delivered' : 'Scheduled 12:00 AM'}
                      </span>
                    </div>

                    <h3 className="text-lg font-bold text-white group-hover:text-indigo-300 transition-colors">
                      {order.creator.name}
                    </h3>

                    <div className="text-xs text-slate-400 mt-1 flex flex-wrap items-center gap-2">
                      <span>To: <strong className="text-slate-200">{order.recipientName}</strong></span>
                      <span>•</span>
                      <span>Occasion: <strong className="text-slate-200">{order.occasion}</strong></span>
                      <span>•</span>
                      <span>{order.deliveryType === 'video' ? '4K Video' : 'Voice Note'}</span>
                    </div>
                  </div>
                </div>

                {/* Right Scheduled Details */}
                <div className="flex items-center gap-4 self-end sm:self-center">
                  <div className="text-right hidden sm:block">
                    <div className="text-xs text-slate-400">Scheduled Date</div>
                    <div className="text-sm font-bold text-white">{order.deliveryDate}</div>
                    <div className="text-[11px] text-indigo-300 font-medium">{order.deliveryTime}</div>
                  </div>

                  <button className="p-3 rounded-2xl bg-slate-800 group-hover:bg-indigo-600 text-slate-300 group-hover:text-white transition-all">
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Order Details Modal */}
        {selectedOrder && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-xl">
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 max-w-xl w-full text-white space-y-6 shadow-2xl relative">
              <button
                onClick={() => setSelectedOrder(null)}
                className="absolute top-5 right-5 text-slate-400 hover:text-white"
              >
                ✕
              </button>

              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-2xl bg-indigo-600/20 text-indigo-400">
                  <Calendar className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-xs font-mono font-bold text-indigo-400">Order {selectedOrder.id}</div>
                  <h3 className="text-xl font-bold font-serif text-white">Surprise Progress Timeline</h3>
                </div>
              </div>

              {/* Progress Steps */}
              <div className="space-y-3 bg-slate-950/80 p-4 rounded-2xl border border-slate-800 text-xs">
                <div className="flex items-center gap-3 text-emerald-400">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Order Placed & Payment Confirmed</span>
                </div>
                <div className="flex items-center gap-3 text-emerald-400">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>AI Script Approved with Gemini Studio</span>
                </div>
                <div className="flex items-center gap-3 text-indigo-400 font-bold">
                  <Clock className="w-4 h-4 animate-spin" />
                  <span>Creator Studio Recording In-Progress</span>
                </div>
                <div className="flex items-center gap-3 text-slate-500">
                  <span className="w-4 h-4 rounded-full border border-slate-700"></span>
                  <span>Midnight 12:00 AM Direct Dispatch</span>
                </div>
              </div>

              {/* Script Quote */}
              <div className="p-4 rounded-2xl bg-indigo-950/40 border border-indigo-500/30 space-y-2">
                <div className="text-xs font-bold text-indigo-300">Custom Script Preview</div>
                <p className="text-xs italic text-slate-200 font-serif leading-relaxed">
                  &quot;{selectedOrder.generatedScript}&quot;
                </p>
              </div>

              <div className="flex items-center justify-between pt-2">
                <div>
                  <div className="text-xs text-slate-400">Total Paid</div>
                  <div className="text-xl font-black text-white">₹{selectedOrder.totalPrice}</div>
                </div>

                <button
                  onClick={() => setSelectedOrder(null)}
                  className="px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold"
                >
                  Close Details
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
