import React from 'react';
import { OrderProvider } from './context/OrderContext';
import ScreenRouter from './components/ScreenRouter';

export default function App() {
  return (
    <OrderProvider>
      <ScreenRouter />
    </OrderProvider>
  );
}