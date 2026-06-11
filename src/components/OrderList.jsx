import React, { useState, useEffect, useRef } from 'react';
import { useOrders } from '../context/OrderContext';
import { gsap } from 'gsap';

export default function OrderList() {
  const { orders } = useOrders();
  
  const [statusFilter, setStatusFilter] = useState('all');
  const [maxDistanceInput, setMaxDistanceInput] = useState('');

  const tableWrapperRef = useRef(null);

  useEffect(() => {
    if (tableWrapperRef.current) {
      gsap.fromTo(tableWrapperRef.current, 
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, duration: 0.4, ease: 'power2.out' }
      );
    }
  }, [statusFilter, maxDistanceInput, orders]);

  const filteredOrders = orders.filter((order) => {
    if (statusFilter === 'paid' && !order.isPaid) return false;
    if (statusFilter === 'unpaid' && order.isPaid) return false;

    if (maxDistanceInput !== '') {
      const boundary = parseFloat(maxDistanceInput);
      if (!isNaN(boundary) && order.deliveryDistance > boundary) {
        return false;
      }
    }
    return true;
  });

  return (
    <div 
      ref={tableWrapperRef}
      className="bg-slate-800 rounded-2xl border border-slate-700/70 shadow-2xl overflow-hidden"
    >
      <div className="p-5 border-b border-slate-700/60 bg-slate-800/50 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h3 className="text-sm font-black uppercase tracking-wider text-slate-200">
            Active Registry Nodes
          </h3>
          <p className="text-[11px] text-slate-500 font-medium font-mono mt-0.5">
            Displaying {filteredOrders.length} of {orders.length} matches
          </p>
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          <select 
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs font-semibold text-slate-300 focus:outline-none focus:border-orange-500/50 transition-all cursor-pointer"
          >
            <option value="all">All Statuses</option>
            <option value="paid">Settled (Paid)</option>
            <option value="unpaid">Outstanding (Unpaid)</option>
          </select>

          <input 
            type="number" 
            step="0.1"
            value={maxDistanceInput}
            onChange={(e) => setMaxDistanceInput(e.target.value)}
            placeholder="Max Limit (KM)" 
            className="bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs font-semibold text-slate-200 placeholder-slate-600 focus:outline-none focus:border-orange-500/50 transition-all w-36"
          />
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse text-xs">
          <thead>
            <tr className="bg-slate-900/60 border-b border-slate-700/60 text-slate-400 font-bold uppercase tracking-wider">
              <th className="py-3.5 px-5 font-mono text-[10px]">Order ID</th>
              <th className="py-3.5 px-5">Restaurant Name</th>
              <th className="py-3.5 px-5 text-center">Items</th>
              <th className="py-3.5 px-5 text-right">Distance</th>
              <th className="py-3.5 px-5 text-center">Status Flag</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-700/30">
            {filteredOrders.length > 0 ? (
              filteredOrders.map((order) => (
                <tr 
                  key={order.orderId}
                  className="hover:bg-slate-700/20 text-slate-300 transition-colors duration-150"
                >
                  <td className="py-3.5 px-5 font-mono font-bold text-slate-400">
                    {order.orderId}
                  </td>
                  <td className="py-3.5 px-5 font-bold text-slate-100">
                    {order.restaurantName}
                  </td>
                  <td className="py-3.5 px-5 text-center font-semibold text-slate-300">
                    {order.itemCount}
                  </td>
                  <td className="py-3.5 px-5 text-right font-black text-orange-400 font-mono">
                    {order.deliveryDistance.toFixed(1)} KM
                  </td>
                  <td className="py-3.5 px-5 text-center">
                    <span className={`inline-block px-2.5 py-0.5 rounded-full text-[9px] font-black tracking-widest uppercase border ${
                      order.isPaid 
                        ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400' 
                        : 'bg-amber-500/10 border-amber-500/20 text-amber-400'
                    }`}>
                      {order.isPaid ? 'Paid' : 'Unpaid'}
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="py-12 text-center text-slate-500 font-bold tracking-wider uppercase">
                  No registered routes match active filters.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}