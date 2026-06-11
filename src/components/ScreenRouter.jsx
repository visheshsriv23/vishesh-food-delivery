import React, { useState } from 'react';
import Navbar from './Navbar';
import AddOrderForm from './AddOrderForm';
import OrderList from './OrderList';
import DeliveryAssigner from './DeliveryAssigner';
import OutputDisplayPanel from './OutputDisplayPanel';
import Footer from './Footer';

export default function ScreenRouter() {
  const [activePage, setActivePage] = useState('add');
  const [assignedOrder, setAssignedOrder] = useState(null);
  const [hasCalculated, setHasCalculated] = useState(false);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans antialiased relative overflow-x-hidden">
      
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b10_1px,transparent_1px),linear-gradient(to_bottom,#1e293b10_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none z-0"></div>
      <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-orange-500/[0.03] rounded-full blur-[120px] pointer-events-none z-0"></div>
      <div className="absolute bottom-[10%] right-[-10%] w-[600px] h-[600px] bg-emerald-500/[0.02] rounded-full blur-[150px] pointer-events-none z-0"></div>

      <div className="relative z-10">
        <Navbar activePage={activePage} setActivePage={setActivePage} />
      </div>

      <main className="max-w-5xl mx-auto p-6 mt-8 relative z-10">
        
        {activePage === 'add' && (
          <div className="max-w-md mx-auto">
            <div className="text-center mb-6">
              <h2 className="text-xl font-black tracking-tight text-slate-100">Add Order Form Screen</h2>
              <p className="text-xs text-slate-400 mt-1">Register new route units into the system cache</p>
            </div>
            <AddOrderForm setActivePage={setActivePage} />
          </div>
        )}

        {activePage === 'list' && (
          <div className="w-full">
            <h2 className="text-xl font-black mb-6 tracking-tight text-slate-100">Orders Listing Screen</h2>
            <OrderList />
          </div>
        )}

        {activePage === 'assign' && (
          <div className="max-w-md mx-auto">
            <h2 className="text-xl font-black mb-6 text-center tracking-tight text-slate-100">Filter & Assign Screen</h2>
            <DeliveryAssigner 
              setAssignedOrder={setAssignedOrder} 
              setHasCalculated={setHasCalculated} 
              setActivePage={setActivePage} 
            />
          </div>
        )}

        {activePage === 'output' && (
          <div className="max-w-md mx-auto">
            <h2 className="text-xl font-black mb-6 text-center tracking-tight text-slate-100">Output Display Panel</h2>
            <OutputDisplayPanel assignedOrder={assignedOrder} hasCalculated={hasCalculated} />
          </div>
        )}

      </main>
      <Footer />
    </div>
  );
}