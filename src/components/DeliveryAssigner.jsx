import React, { useState, useEffect, useRef } from 'react';
import { useOrders } from '../context/OrderContext';
import { gsap } from 'gsap';

export default function DeliveryAssigner() {
  const { orders } = useOrders();
  
  const [maxDistanceInput, setMaxDistanceInput] = useState('');
  const [assignedOrder, setAssignedOrder] = useState(null);
  const [hasCalculated, setHasCalculated] = useState(false);

  const containerRef = useRef(null);
  const resultCardRef = useRef(null);

  const unpaidOrders = orders.filter(o => !o.isPaid);
  const totalUnpaidCount = unpaidOrders.length;

  useEffect(() => {
    if (containerRef.current) {
      gsap.fromTo(containerRef.current.querySelectorAll('.animate-fade'),
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, duration: 0.4, stagger: 0.1, ease: 'power2.out' }
      );
    }
  }, []);

  useEffect(() => {
    if (resultCardRef.current && hasCalculated) {
      gsap.fromTo(resultCardRef.current,
        { scale: 0.98, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.25, ease: 'power2.out' }
      );
    }
  }, [assignedOrder, hasCalculated]);

  const handleAssignDelivery = (e) => {
    e.preventDefault();
    setHasCalculated(true);

    const maxDist = parseFloat(maxDistanceInput);
    if (isNaN(maxDist) || maxDist <= 0) {
      setAssignedOrder(null);
      return;
    }

    const withinRadiusOrders = unpaidOrders.filter(order => order.deliveryDistance <= maxDist);

    if (withinRadiusOrders.length === 0) {
      setAssignedOrder(null);
    } else {
      const sortedNearest = [...withinRadiusOrders].sort((a, b) => a.deliveryDistance - b.deliveryDistance);
      setAssignedOrder(sortedNearest[0]);
    }
  };

  return (
    <div ref={containerRef} className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch w-full max-w-4xl mx-auto pt-6">
      
      <div className="bg-slate-800 p-8 rounded-2xl border border-slate-700/50 shadow-xl flex flex-col justify-between animate-fade">
        <div className="space-y-6">
          <div>
            <h3 className="text-base font-bold text-slate-100 tracking-tight">
              Find Nearest Unpaid Order
            </h3>
            <p className="text-xs text-slate-400 mt-1 leading-relaxed">
              Enter a distance limit below. The system will instantly check all pending orders and assign the absolute closest one.
            </p>
          </div>

          <form onSubmit={handleAssignDelivery} className="space-y-4">
            <div>
              <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2">
                Maximum Distance Limit
              </label>
              <div className="relative">
                <input 
                  type="number" 
                  step="0.1"
                  value={maxDistanceInput}
                  onChange={(e) => setMaxDistanceInput(e.target.value)}
                  placeholder="e.g. 5" 
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl pl-4 pr-12 py-3 text-sm font-semibold text-slate-100 focus:outline-none focus:border-emerald-500 transition-all placeholder-slate-600"
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-500">KM</span>
              </div>
            </div>

            <button 
              type="submit"
              className="w-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-bold uppercase tracking-wider py-3.5 px-4 rounded-xl transition-all font-sans cursor-pointer active:scale-[0.99]"
            >
              Search & Assign Order
            </button>
          </form>
        </div>

        <div className="mt-8 pt-4 border-t border-slate-700/40 flex justify-between items-center text-xs text-slate-400 font-medium">
          <span>Orders waiting for delivery:</span>
          <span className="font-bold text-amber-400">{totalUnpaidCount} orders</span>
        </div>
      </div>

      <div className="flex flex-col justify-stretch animate-fade">
        
        {!hasCalculated ? (
          <div className="bg-slate-800/30 border-2 border-dashed border-slate-700/40 rounded-2xl p-8 flex flex-col items-center justify-center text-center h-full min-h-[280px]">
            <span className="text-2xl mb-2 opacity-50">🧭</span>
            <div className="text-xs font-bold uppercase tracking-wider text-slate-400">System Ready</div>
            <p className="text-xs text-slate-500 mt-1 max-w-[200px]">
              Set a distance limit and search to view assignment results.
            </p>
          </div>
        ) : (
          <div ref={resultCardRef} className="h-full">
            {assignedOrder ? (
              <div className="bg-slate-800 rounded-2xl border border-emerald-500/20 shadow-xl p-8 h-full flex flex-col justify-between">
                
                <div className="space-y-4">
                  <div className="flex justify-between items-center border-b border-slate-700/40 pb-4">
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded">
                        Best Match Found
                      </span>
                      <h4 className="text-lg font-bold text-slate-100 mt-2 tracking-tight">
                        {assignedOrder.restaurantName}
                      </h4>
                    </div>
                    <span className="font-mono text-xs font-bold text-slate-400 bg-slate-900 px-2.5 py-1 rounded-lg border border-slate-700/50">
                      {assignedOrder.orderId}
                    </span>
                  </div>

                  <div className="space-y-3 pt-2 text-xs">
                    <div className="flex justify-between">
                      <span className="text-slate-400">Total Items:</span>
                      <span className="font-semibold text-slate-200">{assignedOrder.itemCount} items</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-slate-400">Delivery Distance:</span>
                      <span className="text-sm font-bold text-emerald-400 font-mono">
                        {assignedOrder.deliveryDistance.toFixed(1)} KM
                      </span>
                    </div>
                  </div>
                </div>

                <div className="bg-slate-900/50 p-3 rounded-xl text-center text-[11px] text-slate-400 border border-slate-700/30 mt-6">
                  ✨ This is the nearest unpaid order within your limit.
                </div>

              </div>
            ) : (
              <div className="bg-slate-800 rounded-2xl border border-red-500/10 shadow-xl p-8 flex flex-col items-center justify-center text-center h-full min-h-[280px]">
                <div className="w-10 h-10 bg-red-500/10 rounded-full flex items-center justify-center text-red-400 text-sm font-bold mb-3">
                  ⚠️
                </div>
                <div className="text-sm font-bold text-red-400 tracking-wide">
                  No order available
                </div>
                <p className="text-xs text-slate-500 mt-2 max-w-[240px] leading-relaxed">
                  We couldn't find any unpaid orders that fit within your specified distance limit. Try increasing the search radius.
                </p>
              </div>
            )}
          </div>
        )}

      </div>

    </div>
  );
}