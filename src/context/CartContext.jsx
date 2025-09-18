import { createContext, useContext, useState } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState(null);

  const saveCart = (data) => {
    setCart(data);
    localStorage.setItem("cart", JSON.stringify(data));
  };

  const loadCart = () => {
    const saved = localStorage.getItem("cart");
    if (saved) {
      setCart(JSON.parse(saved));
    }
  };

  return (
    <CartContext.Provider value={{ cart, saveCart, loadCart }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}