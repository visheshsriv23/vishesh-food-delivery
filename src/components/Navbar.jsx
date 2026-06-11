import React from 'react';
import { useOrders } from '../context/OrderContext';

export default function Navbar({ activePage, setActivePage }) {
  const { clearSystemDatabase, orders } = useOrders();
  const unpaidCount = orders.filter(o => !o.isPaid).length;

  return (
    <header className="bg-slate-800/90 backdrop-blur-md border-b border-slate-700/60 px-8 py-4 flex justify-between items-center shadow-xl sticky top-0 z-50">
      
      <div className="flex items-center gap-3">
        <div className="bg-slate-900/60 rounded-xl border border-slate-700/50 p-1.5 h-11 w-20 flex items-center justify-center shadow-inner overflow-hidden">
          <img 
            src="/logo.png" 
            alt="Vishesh Logistics Brand Logo" 
            className="w-full h-full object-contain"
          />
        </div>
        <div>
          <h1 className="text-sm font-black tracking-wide leading-none text-slate-100 uppercase">
            Vishesh <span className="text-orange-500">Food Delivery</span>
          </h1>
          <p className="text-[9px] text-slate-500 font-bold tracking-widest uppercase mt-1">
            your onr destination food terminal
          </p>
        </div>
      </div>

      <nav className="flex items-center gap-6 text-xs font-bold uppercase tracking-wider">
        <button 
          onClick={() => setActivePage('add')}
          className={`pb-1 transition-all cursor-pointer ${activePage === 'add' ? 'text-orange-500 border-b-2 border-orange-500' : 'text-slate-400 hover:text-slate-200'}`}
        >
          Add Order Form
        </button>
        <button 
          onClick={() => setActivePage('list')}
          className={`pb-1 transition-all cursor-pointer ${activePage === 'list' ? 'text-orange-500 border-b-2 border-orange-500' : 'text-slate-400 hover:text-slate-200'}`}
        >
          Orders Listing Screen
        </button>
        <button 
          onClick={() => setActivePage('assign')}
          className={`pb-1 transition-all cursor-pointer ${activePage === 'assign' ? 'text-orange-500 border-b-2 border-orange-500' : 'text-slate-400 hover:text-slate-200'}`}
        >
          Filter & Assign Screen
        </button>
        <button 
          onClick={() => setActivePage('output')}
          className={`pb-1 transition-all cursor-pointer ${activePage === 'output' ? 'text-orange-500 border-b-2 border-orange-500' : 'text-slate-400 hover:text-slate-200'}`}
        >
          Output Display Panel
        </button>
      </nav>

      <div className="flex items-center gap-4">
        <div className="bg-slate-900 px-3 py-1.5 rounded-lg border border-slate-700/80 text-[10px] font-mono font-bold tracking-wide text-slate-300">
          {unpaidCount} PENDING
        </div>
        <button 
          onClick={clearSystemDatabase}
          className="bg-slate-900/30 hover:bg-red-500/10 text-slate-400 hover:text-red-400 text-[10px] font-black uppercase tracking-wider px-3 py-1.5 rounded-lg border border-slate-700/80 hover:border-red-500/20 transition-all cursor-pointer"
        >
          Reset
        </button>
      </div>

    </header>
  );
}