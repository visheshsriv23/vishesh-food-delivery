import React, { useState } from 'react';
import Navbar from './Navbar';
import AddOrderForm from './AddOrderForm';
import OrderList from './OrderList';
import DeliveryAssigner from './DeliveryAssigner';

export default function ScreenRouter() {
  const [activePage, setActivePage] = useState('add');

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 font-sans antialiased">
      <Navbar activePage={activePage} setActivePage={setActivePage} />

      <main className="max-w-5xl mx-auto p-6 mt-4">
        
        {activePage === 'add' && (
          <div className="max-w-md mx-auto">
            <h2 className="text-xl font-black mb-4 text-center tracking-tight">Add Order Form Screen</h2>
            <AddOrderForm />
          </div>
        )}

        {activePage === 'list' && (
          <div className="w-full">
            <h2 className="text-xl font-black mb-4 tracking-tight">Orders Listing Screen</h2>
            <OrderList />
          </div>
        )}

        {activePage === 'assign' && (
          <div className="max-w-xl mx-auto">
            <h2 className="text-xl font-black mb-4 text-center tracking-tight">Filter & Assign Screen</h2>
            <DeliveryAssigner />
          </div>
        )}

      </main>
    </div>
  );
}