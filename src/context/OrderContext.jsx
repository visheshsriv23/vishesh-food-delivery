import React, { createContext, useContext, useState, useRef } from 'react';

const OrderContext = createContext();

export function OrderProvider({ children }) {
  // 1. Establish pristine initial mock values
  const [orders, setOrders] = useState([
    { orderId: 'ORD-101', restaurantName: 'Pizza Hut', itemCount: 2, deliveryDistance: 2.5, isPaid: true },
    { orderId: 'ORD-102', restaurantName: 'Burger King', itemCount: 1, deliveryDistance: 4.8, isPaid: false },
    { orderId: 'ORD-103', restaurantName: 'Subway', itemCount: 3, deliveryDistance: 1.2, isPaid: false },
  ]);

  const [errorMessage, setErrorMessage] = useState('');
  
  // 2. Strict ID tracker starting directly at 104
  const nextIdNum = useRef(104);

  // Core Function: Insert new sequential node
  const addOrder = (restaurantName, itemCount, deliveryDistance, isPaid) => {
    const newOrder = {
      orderId: `ORD-${nextIdNum.current}`, // Auto-generates ORD-104, ORD-105...
      restaurantName,
      itemCount,
      deliveryDistance,
      isPaid,
    };
    
    // Append to the bottom of our database array state
    setOrders((prev) => [...prev, newOrder]);
    
    // Bump tracking index for next record injection
    nextIdNum.current += 1;
  };

  // NEW Core Function: Delete targeted order node
  const deleteOrder = (targetId) => {
    setOrders((prev) => prev.filter(order => order.orderId !== targetId));
  };

  // Clear system cache back to blank state
  const clearSystemDatabase = () => {
    setOrders([]);
    setErrorMessage('');
    nextIdNum.current = 101; // Reset indexing loop
  };

  return (
    <OrderContext.Provider value={{ 
      orders, 
      addOrder, 
      deleteOrder, // <-- Pass delete action through pipeline
      clearSystemDatabase, 
      errorMessage, 
      setErrorMessage 
    }}>
      {children}
    </OrderContext.Provider>
  );
}

export const useOrders = () => useContext(OrderContext);