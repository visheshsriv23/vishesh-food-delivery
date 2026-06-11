import React, { createContext, useContext, useState, useRef } from 'react';

const OrderContext = createContext();

export function OrderProvider({ children }) {
  const [orders, setOrders] = useState([
    { orderId: 'ORD-101', restaurantName: 'Pizza Hut', itemCount: 2, deliveryDistance: 2.5, isPaid: true },
    { orderId: 'ORD-102', restaurantName: 'Burger King', itemCount: 1, deliveryDistance: 4.8, isPaid: false },
    { orderId: 'ORD-103', restaurantName: 'Subway', itemCount: 3, deliveryDistance: 1.2, isPaid: false },
  ]);

  const [errorMessage, setErrorMessage] = useState('');
  const nextIdNum = useRef(104);

  const addOrder = (restaurantName, itemCount, deliveryDistance, isPaid) => {
    const newOrder = {
      orderId: `ORD-${nextIdNum.current}`,
      restaurantName,
      itemCount,
      deliveryDistance,
      isPaid,
    };
    setOrders((prev) => [...prev, newOrder]);
    nextIdNum.current += 1;
  };

  const deleteOrder = (targetId) => {
    setOrders((prev) => prev.filter(order => order.orderId !== targetId));
  };

  const markAsPaid = (targetId) => {
    setOrders((prev) =>
      prev.map((order) =>
        order.orderId === targetId ? { ...order, isPaid: true } : order
      )
    );
  };

  const clearSystemDatabase = () => {
    setOrders([]);
    setErrorMessage('');
    nextIdNum.current = 101;
  };

  return (
    <OrderContext.Provider value={{ 
      orders, 
      addOrder, 
      deleteOrder, 
      markAsPaid, 
      clearSystemDatabase, 
      errorMessage, 
      setErrorMessage 
    }}>
      {children}
    </OrderContext.Provider>
  );
}

export const useOrders = () => useContext(OrderContext);