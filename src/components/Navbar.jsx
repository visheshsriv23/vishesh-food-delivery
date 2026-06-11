import React from 'react';
import { useOrders } from '../context/OrderContext';

export default function Navbar() {
  const { clearSystemDatabase, orders } = useOrders();
  const unpaidCount = orders.filter(o => !o.isPaid).length;

  return (
    <header className="bg-slate-800 border-b border-slate-700 px-8 py-4 flex justify-between items-center shadow-lg">
      
      <div className="flex items-center gap-3">
        <span className="text-2xl">🍕</span>
        <div>
          <h1 className="text-xl font-extrabold tracking-wide">
            <span className="text-orange-500">Vishesh</span>{' '}
            <span className="text-slate-100">Food Delivery</span>
          </h1>
          <p className="text-[11px] text-slate-400 font-medium tracking-wider uppercase">
            Order Routing System
          </p>
        </div>
      </div>

      <nav className="hidden md:flex items-center gap-6 text-sm font-semibold text-slate-300">
        <a href="#dashboard" className="text-orange-500 border-b-2 border-orange-500 pb-1 transition-colors">
          Dashboard
        </a>
        <a href="#orders" className="hover:text-slate-100 transition-colors">
          Active Orders
        </a>
        <a href="#analytics" className="hover:text-slate-100 transition-colors">
          Fleet Analytics
        </a>
        <a href="#history" className="hover:text-slate-100 transition-colors">
          History
        </a>
      </nav>

      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2 bg-slate-900/80 px-3 py-1.5 rounded-lg border border-slate-700 text-xs">
          <span className="relative flex h-2 w-2">
            <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${unpaidCount > 0 ? 'bg-amber-400' : 'bg-emerald-400'}`}></span>
            <span className={`relative inline-flex rounded-full h-2 w-2 ${unpaidCount > 0 ? 'bg-amber-500' : 'bg-emerald-500'}`}></span>
          </span>
          <span className="text-slate-300 font-medium font-mono">
            {unpaidCount} Pending
          </span>
        </div>
        <button 
          onClick={clearSystemDatabase}
          className="bg-slate-700/50 hover:bg-red-600/20 text-slate-300 hover:text-red-400 text-xs font-bold px-3.5 py-2 rounded-lg border border-slate-600 hover:border-red-500/30 transition-all active:scale-95 shadow-md"
        >
          Reset Cache
        </button>
      </div>

    </header>
  );
}