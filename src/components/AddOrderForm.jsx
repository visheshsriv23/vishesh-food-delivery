import React, { useState, useEffect, useRef } from 'react';
import { useOrders } from '../context/OrderContext';
import { gsap } from 'gsap';

export default function AddOrderForm() {
  const { addOrder, setErrorMessage } = useOrders();
  
  const [restaurantName, setRestaurantName] = useState('');
  const [itemCount, setItemCount] = useState('');
  const [deliveryDistance, setDeliveryDistance] = useState('');
  const [isPaid, setIsPaid] = useState(false);

  const cardWrapperRef = useRef(null);

  useEffect(() => {
    if (cardWrapperRef.current) {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out', duration: 0.5 } });
      
      tl.fromTo(cardWrapperRef.current, 
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1 }
      );

      tl.fromTo(cardWrapperRef.current.querySelectorAll('.animate-field'),
        { x: -15, opacity: 0 },
        { x: 0, opacity: 1, stagger: 0.08 },
        "-=0.2" 
      );
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMessage('');

    // --- DATA FORMAT ENGINE VALIDATION ---
    if (!restaurantName.trim()) {
      setErrorMessage('Validation Mismatch: Restaurant field cannot be blank.');
      return;
    }
    const parsedItems = parseInt(itemCount);
    if (isNaN(parsedItems) || parsedItems <= 0) {
      setErrorMessage('Validation Mismatch: Box units must be a positive integer.');
      return;
    }
    const parsedDistance = parseFloat(deliveryDistance);
    if (isNaN(parsedDistance) || parsedDistance <= 0) {
      setErrorMessage('Validation Mismatch: Proximity radius must be a positive scale number.');
      return;
    }

    addOrder(restaurantName.trim(), parsedItems, parsedDistance, isPaid);
    
    setRestaurantName('');
    setItemCount('');
    setDeliveryDistance('');
    setIsPaid(false);
  };

  return (
    <div 
      ref={cardWrapperRef}
      className="bg-slate-800 p-6 rounded-2xl border border-slate-700/70 shadow-2xl"
    >
      <div className="flex items-center gap-2 mb-5 animate-field">
        <div className="h-4 w-1 bg-orange-500 rounded-full"></div>
        <h2 className="text-sm font-black uppercase tracking-wider text-slate-200">
          Create New Log Entry
        </h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="animate-field">
          <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">
            Restaurant Identity
          </label>
          <input 
            type="text" 
            value={restaurantName}
            onChange={(e) => setRestaurantName(e.target.value)}
            placeholder="e.g., Pizza Hut, Subway" 
            className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-slate-100 placeholder-slate-600 focus:outline-none focus:border-orange-500/80 transition-all font-medium"
          />
        </div>

        <div className="grid grid-cols-2 gap-4 animate-field">
          <div>
            <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">
              Item Box Count
            </label>
            <input 
              type="number" 
              value={itemCount}
              onChange={(e) => setItemCount(e.target.value)}
              placeholder="Quantity" 
              min="1"
              className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-slate-100 focus:outline-none focus:border-orange-500/80 transition-all font-semibold"
            />
          </div>
          <div>
            <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">
              Distance (KM)
            </label>
            <input 
              type="number" 
              step="0.1"
              value={deliveryDistance}
              onChange={(e) => setDeliveryDistance(e.target.value)}
              placeholder="Scale" 
              className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-slate-100 focus:outline-none focus:border-orange-500/80 transition-all font-semibold"
            />
          </div>
        </div>

        <div className="pt-2 animate-field">
          <label className="flex items-center gap-3 bg-slate-900/40 border border-slate-700/40 hover:border-slate-700 rounded-xl p-3 cursor-pointer select-none transition-all group">
            <input 
              type="checkbox" 
              checked={isPaid}
              onChange={(e) => setIsPaid(e.target.checked)}
              className="w-4 h-4 rounded accent-orange-500 cursor-pointer"
            />
            <div className="text-xs font-bold text-slate-300 group-hover:text-slate-200 transition-colors">
              Flag as Account Settled (IsPaid)
            </div>
          </label>
        </div>

        <div className="animate-field">
          <button 
            type="submit" 
            className="w-full bg-orange-500 hover:bg-orange-600 active:scale-[0.99] text-slate-950 text-xs font-black uppercase tracking-widest py-3 px-4 rounded-xl transition-all shadow-lg shadow-orange-500/10 cursor-pointer mt-2"
          >
            Inject Order Route
          </button>
        </div>
      </form>
    </div>
  );
}