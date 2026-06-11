import React from 'react';
import { OrderProvider } from './context/OrderContext';
import Navbar from './components/Navbar';

export default function App() {
  return (
    <OrderProvider>
      <div className="min-h-screen bg-slate-900 text-slate-100 font-sans antialiased">
        <Navbar />
      </div>
    </OrderProvider>
  );
}