import {createContext, useContext, useState, useEffect} from "react";

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({children}) => {
 const API_URL = import.meta.env.VITE_API_URL;
 const [items, setItems] = useState([]);
 const [appliedCoupon, setAppliedCoupon] = useState(null);
 const [discount, setDiscount] = useState(0);

 useEffect(() => {
  const localCart = localStorage.getItem("cart");
  if (localCart) {
   setItems(JSON.parse(localCart));

   const localCoupon = localStorage.getItem("appliedCoupon");
   if (localCoupon) {
    const coupon = JSON.parse(localCoupon);
    setAppliedCoupon(coupon);
    recalcDiscount(coupon, JSON.parse(localCart || "[]"));
   }
  }
 }, []);

 //  useEffect(() => {
 //   localStorage.setItem("cart", JSON.stringify(items));
 //  }, [items]);
 useEffect(() => {
  localStorage.setItem("cart", JSON.stringify(items));
  if (appliedCoupon) {
   localStorage.setItem("appliedCoupon", JSON.stringify(appliedCoupon));
  } else {
   localStorage.removeItem("appliedCoupon");
  }
 }, [items, appliedCoupon]);
 useEffect(() => {
  if (appliedCoupon) {
   recalcDiscount(appliedCoupon, items);
  }
 }, [items, appliedCoupon]);
 const addItem = (item) => {
  setItems((prev) => {
   const existing = prev.find((p) => p.id === item.id);
   if (existing) {
    return prev.map((p) => (p.id === item.id ? {...p, quantity: p.quantity + item.quantity} : p));
   }
   return [...prev, item];
  });
 };

 const updateQuantity = (id, quantity) => {
  setItems((prev) => prev.map((p) => (p.id === id ? {...p, quantity} : p)));
 };

 const removeItem = (id) => {
  setItems((prev) => prev.filter((p) => p.id !== id));
 };

 const clearCart = () => {
  setItems([]);
  setAppliedCoupon(null);
  setDiscount(0);
  localStorage.removeItem("cart");
  localStorage.removeItem("appliedCoupon");
 };

 const recalcDiscount = (coupon, currentItems = items) => {
  const currentSubtotal = currentItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  let newDiscount = 0;
  if (coupon.type === "percentage") {
   newDiscount = currentSubtotal * coupon.discount;
  } else if (coupon.type === "fixed") {
   newDiscount = coupon.discount;
  }
  setDiscount(newDiscount);
 };

 const applyCoupon = (code) => {
  let coupon = null;
  if (code === "DISCOUNT10") {
   coupon = {code, discount: 0.1, type: "percentage"};
  } else if (code === "SAVE5") {
   coupon = {code, discount: 5, type: "fixed"};
  }
  if (coupon) {
   setAppliedCoupon(coupon);
   recalcDiscount(coupon, items);
   return true;
  }
  return false;
 };

 const removeCoupon = () => {
  setAppliedCoupon(null);
  setDiscount(0);
 };
 const subtotal = items.reduce((total, item) => total + item.price * item.quantity, 0);
 const total = Math.max(subtotal - discount, 0);
 //  const discount =
 //   appliedCoupon?.type === "percentage"
 //    ? subtotal * appliedCoupon.discount
 //    : appliedCoupon?.type === "fixed"
 //    ? appliedCoupon.discount
 //    : 0;
 //  const total = Math.max(subtotal - discountValue, 0);

 return (
  <CartContext.Provider
   value={{
    items,
    addItem,
    updateQuantity,
    removeItem,
    clearCart,
    applyCoupon,
    appliedCoupon,
    removeCoupon,
    subtotal,
    discount,
    total,
   }}
  >
   {children}
  </CartContext.Provider>
 );
};
