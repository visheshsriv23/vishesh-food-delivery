import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

export default function OutputDisplayPanel({ assignedOrder, hasCalculated }) {
  const panelRef = useRef(null);

  // Smooth pop-in animation whenever the calculation state shifts
  useEffect(() => {
    if (panelRef.current && hasCalculated) {
      gsap.fromTo(panelRef.current,
        { scale: 0.98, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.3, ease: 'power2.out' }
      );
    }
  }, [assignedOrder, hasCalculated]);

  // Initial standby state layout if no calculation has been run yet
  if (!hasCalculated) {
    return (
      <div className="bg-slate-800/30 border-2 border-dashed border-slate-700/40 rounded-2xl p-8 flex flex-col items-center justify-center text-center min-h-[220px]">
        <span className="text-2xl mb-2 opacity-50">🧭</span>
        <div className="text-xs font-bold uppercase tracking-wider text-slate-400">Terminal Standby</div>
        <p className="text-xs text-slate-500 mt-1 max-w-[200px]">
          Awaiting input metrics to capture optimization stream results.
        </p>
      </div>
    );
  }

  return (
    <div ref={panelRef} className="w-full">
      {assignedOrder ? (
        /* SUCCESS OUTCOME PACKET */
        <div className="bg-slate-800 rounded-2xl border border-emerald-500/20 shadow-xl p-8 flex flex-col justify-between min-h-[220px]">
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

            <div className="space-y-3 pt-1 text-xs">
              <div className="flex justify-between">
                <span className="text-slate-400">Total Payload Load:</span>
                <span className="font-semibold text-slate-200">{assignedOrder.itemCount} units</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-400">Calculated Proximity:</span>
                <span className="text-sm font-bold text-emerald-400 font-mono">
                  {assignedOrder.deliveryDistance.toFixed(1)} KM
                </span>
              </div>
            </div>
          </div>

          <div className="bg-slate-900/50 p-3 rounded-xl text-center text-[11px] text-slate-400 border border-slate-700/30 mt-4">
            ✨ Nearest matching unassigned dispatch node loaded.
          </div>
        </div>
      ) : (
        /* MANDATORY REQ 4C: FALLBACK DISPATCH ERROR NOTICE */
        <div className="bg-slate-800 rounded-2xl border border-red-500/10 shadow-xl p-8 flex flex-col items-center justify-center text-center min-h-[220px]">
          <div className="w-10 h-10 bg-red-500/10 rounded-full flex items-center justify-center text-red-400 text-sm font-bold mb-3">
            ⚠️
          </div>
          <div className="text-sm font-bold text-red-400 tracking-wide uppercase font-mono text-[11px]">
            No order available
          </div>
          <p className="text-xs text-slate-500 mt-2 max-w-[240px] leading-relaxed">
            No outstanding system nodes match your specified maximum range parameters.
          </p>
        </div>
      )}
    </div>
  );
}