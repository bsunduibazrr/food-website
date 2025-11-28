"use client";
import { createContext, useContext, useEffect, useState } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart") || "[]");
    setCartItems(storedCart);
  }, []);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

  const clearCart = () => {
    setCartItems([]);
    localStorage.removeItem("cart");
  };

  const addToCart = (item) => {
    setCartItems((prev) => {
      const existing = prev.find((i) => i.id === item.id);
      if (existing) {
        const addedQty = item.quantity || 1;
        return prev.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + addedQty } : i
        );
      }
      return [...prev, { ...item, quantity: item.quantity || 1 }];
    });
  };

  const removeItem = (_id) => {
    setCartItems((prev) => prev.filter((i) => i._id !== _id));
  };

  const incrementQty = (_id) => {
    setCartItems((prev) =>
      prev.map((i) => (i._id === _id ? { ...i, quantity: i.quantity + 1 } : i))
    );
  };

  const decrementQty = (_id) => {
    setCartItems((prev) =>
      prev
        .map((i) =>
          i._id === _id ? { ...i, quantity: Math.max(i.quantity - 1, 1) } : i
        )
        .filter((i) => i.quantity > 0)
    );
  };

  const itemsTotal = cartItems.reduce(
    (acc, item) =>
      acc + item.quantity * parseFloat(item.price.replace("$", "")),
    0
  );

  const shippingFee = 1;
  const totalPrice = itemsTotal + shippingFee;
  const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeItem,
        incrementQty,
        decrementQty,
        clearCart,
        totalPrice,
        itemsTotal,
        shippingFee,
        totalItems,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
