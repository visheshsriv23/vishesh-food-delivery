import React, { useState } from 'react';
import { useOrders } from '../context/OrderContext';

export default function AddOrderForm({ setActivePage }) {
  const { addOrder, errorMessage, setErrorMessage } = useOrders();
  const [restaurantName, setRestaurantName] = useState('');
  const [itemCount, setItemCount] = useState('');
  const [deliveryDistance, setDeliveryDistance] = useState('');
  const [isPaid, setIsPaid] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!restaurantName.trim() || !itemCount || !deliveryDistance) {
      setErrorMessage('All input variables must be populated.');
      return;
    }

    const items = parseInt(itemCount);
    const distance = parseFloat(deliveryDistance);

    if (isNaN(items) || items <= 0 || isNaN(distance) || distance <= 0) {
      setErrorMessage('Count parameters must hold valid positive values.');
      return;
    }

    setErrorMessage('');
    addOrder(restaurantName, items, distance, isPaid);

    // Reset Form Input Parameters
    setRestaurantName('');
    setItemCount('');
    setDeliveryDistance('');
    setIsPaid(false);

    // Redirect user to the listing view matrix
    if (setActivePage) setActivePage('list');
  };

  return (
    <div className="bg-slate-800 p-8 rounded-2xl border border-slate-700/60 shadow-xl">
      <form onSubmit={handleSubmit} className="space-y-5">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 border-b border-slate-700/40 pb-2 mb-4">
          Create New Log Entry
        </h3>

        {errorMessage && (
          <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-xl text-xs text-red-400 font-medium">
            ⚠️ {errorMessage}
          </div>
        )}

        <div>
          <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-2">
            Restaurant Identity
          </label>
          <input
            type="text"
            value={restaurantName}
            onChange={(e) => setRestaurantName(e.target.value)}
            placeholder="e.g., Pizza Hut, Subway"
            className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-sm text-slate-100 focus:outline-none focus:border-orange-500 transition-all placeholder-slate-600"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-2">
              Item Box Count
            </label>
            <input
              type="number"
              value={itemCount}
              onChange={(e) => setItemCount(e.target.value)}
              placeholder="Quantity"
              className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-sm text-slate-100 focus:outline-none focus:border-orange-500 transition-all placeholder-slate-600"
            />
          </div>
          <div>
            <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-2">
              Distance (KM)
            </label>
            <input
              type="number"
              step="0.1"
              value={deliveryDistance}
              onChange={(e) => setDeliveryDistance(e.target.value)}
              placeholder="Scale"
              className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-sm text-slate-100 focus:outline-none focus:border-orange-500 transition-all placeholder-slate-600"
            />
          </div>
        </div>

        <div className="flex items-center gap-2 pt-2">
          <input
            type="checkbox"
            id="isPaid"
            checked={isPaid}
            onChange={(e) => setIsPaid(e.target.checked)}
            className="w-4 h-4 rounded bg-slate-900 border-slate-700 text-orange-500 focus:ring-0 cursor-pointer"
          />
          <label id="isPaid" className="text-xs text-slate-400 font-semibold cursor-pointer select-none">
            Flag as Account Settled (IsPaid)
          </label>
        </div>

        <button
          type="submit"
          className="w-full bg-orange-500 hover:bg-orange-400 text-slate-950 font-bold uppercase tracking-wider py-3.5 px-4 rounded-xl shadow-lg shadow-orange-500/10 cursor-pointer transition-all active:scale-[0.99] text-xs mt-2"
        >
          Inject Order Route
        </button>
      </form>
    </div>
  );
}