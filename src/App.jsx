import React from 'react';
import { OrderProvider } from './context/OrderContext';
import Navbar from './components/Navbar';
import AddOrderForm from './components/AddOrderForm';
import OrderList from './components/OrderList';

export default function App() {
  return (
    <OrderProvider>
      <div className="min-h-screen bg-slate-900 text-slate-100 font-sans antialiased">
        <Navbar />

        <main className="max-w-7xl mx-auto p-6 grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          <div className="lg:col-span-4">
            <AddOrderForm />
          </div>
          <div className="lg:col-span-8">
            <OrderList />
          </div>

        </main>
      </div>
    </OrderProvider>
  );
}