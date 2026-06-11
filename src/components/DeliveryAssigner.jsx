import React, { useState, useEffect, useRef } from 'react';
import { useOrders } from '../context/OrderContext';
import { gsap } from 'gsap';

export default function DeliveryAssigner({ setAssignedOrder, setHasCalculated, setActivePage }) {
  const { orders } = useOrders();
  const [maxDistanceInput, setMaxDistanceInput] = useState('');
  const containerRef = useRef(null);

  // Smooth fade-in entry animation
  useEffect(() => {
    if (containerRef.current) {
      gsap.fromTo(containerRef.current.querySelectorAll('.animate-fade'),
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, duration: 0.4, stagger: 0.1, ease: 'power2.out' }
      );
    }
  }, []);

  const handleAssignDelivery = (e) => {
    e.preventDefault();
    setHasCalculated(true);

    const maxDist = parseFloat(maxDistanceInput);
    if (isNaN(maxDist) || maxDist <= 0) {
      setAssignedOrder(null);
      setActivePage('output'); // Instantly redirect to output page display
      return;
    }

    // Filter unpaid orders
    const unpaidOrders = orders.filter(order => !order.isPaid);
    
    // Bound filter within max distance radius
    const withinRadiusOrders = unpaidOrders.filter(order => order.deliveryDistance <= maxDist);

    if (withinRadiusOrders.length === 0) {
      setAssignedOrder(null);
    } else {
      // Proximity Sorting: Ascending order to find the nearest match
      const sortedNearest = [...withinRadiusOrders].sort((a, b) => a.deliveryDistance - b.deliveryDistance);
      setAssignedOrder(sortedNearest[0]);
    }

    // Automatically navigate to the Output Display Panel screen page
    setActivePage('output');
  };

  // Derive real-time unassigned counter for the footer summary box
  const pendingCount = orders.filter(o => !o.isPaid).length;

  return (
    <div ref={containerRef} className="w-full max-w-md mx-auto pt-4">
      <div className="bg-slate-800 p-8 rounded-2xl border border-slate-700/50 shadow-xl flex flex-col justify-between min-h-[320px] animate-fade">
        
        <div className="space-y-6">
          <div>
            <h3 className="text-base font-bold text-slate-100 tracking-tight">
              Find Nearest Unpaid Order
            </h3>
            <p className="text-xs text-slate-400 mt-1 leading-relaxed">
              Enter a distance limit below. The system will instantly check all pending orders and assign the absolute closest one on a separate panel screen.
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

        {/* STATUS FOOTER */}
        <div className="mt-8 pt-4 border-t border-slate-700/40 flex justify-between items-center text-xs text-slate-400 font-medium">
          <span>Orders waiting for delivery:</span>
          <span className="font-bold text-amber-400">{pendingCount} orders</span>
        </div>

      </div>
    </div>
  );
}