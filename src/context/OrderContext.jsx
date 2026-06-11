import React, { createContext, useContext, useState, useEffect } from 'react';

const OrderContext = createContext();

export function OrderProvider({ children }) {
  const [orders, setOrders] = useState(() => {
    const savedOrders = localStorage.getItem('orders');
    if (savedOrders) {
      try {
        return JSON.parse(savedOrders);
      } catch (e) {
        console.error("Error parsing localStorage records:", e);
      }
    }
    return [
      { orderId: "ORD-101", restaurantName: "Pizza Hut", itemCount: 2, isPaid: true, deliveryDistance: 2.5 },
      { orderId: "ORD-102", restaurantName: "Burger King", itemCount: 1, isPaid: false, deliveryDistance: 4.8 },
      { orderId: "ORD-103", restaurantName: "Subway", itemCount: 3, isPaid: false, deliveryDistance: 1.2 },
    ];
  });

  const [assignmentResult, setAssignmentResult] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');

  // Auto-sync state modifications to browser storage
  useEffect(() => {
    localStorage.setItem('orders', JSON.stringify(orders));
  }, [orders]);

  const addOrder = (restaurantName, itemCount, deliveryDistance, isPaid) => {
    setErrorMessage('');
    const newOrder = {
      orderId: `ORD-${Date.now().toString().slice(-3)}`,
      restaurantName,
      itemCount,
      deliveryDistance,
      isPaid
    };
    setOrders((prev) => [newOrder, ...prev]);
  };

  const assignDelivery = (maxDistance) => {
    setErrorMessage('');
    setAssignmentResult(null);

    let eligible = orders.filter(order => !order.isPaid && order.deliveryDistance <= maxDistance);

    if (eligible.length > 0) {
      eligible.sort((a, b) => a.deliveryDistance - b.deliveryDistance);
      const assignedOrder = eligible[0];
      setAssignmentResult({
        success: true,
        message: `Assigned ${assignedOrder.orderId} from "${assignedOrder.restaurantName}" (${assignedOrder.deliveryDistance} KM away)`
      });
    } else {
      setAssignmentResult({
        success: false,
        message: 'No order available'
      });
    }
  };

  const clearSystemDatabase = () => {
    localStorage.removeItem('orders');
    window.location.reload();
  };

  return (
    <OrderContext.Provider value={{
      orders,
      assignmentResult,
      errorMessage,
      setErrorMessage,
      addOrder,
      assignDelivery,
      clearSystemDatabase
    }}>
      {children}
    </OrderContext.Provider>
  );
}

export const useOrders = () => useContext(OrderContext);