import {useEffect, useState} from "react";
import styles from "./Cart.module.css";
import {Link} from "react-router-dom";
import {useCart} from "@/context/CartContext";

import CartItem from "@/components/cart/CartItem/CartItem";
import CartTotal from "@/components/cart/CartTotal/CartTotal";

import bannerImage from "@/assets/images/banner_cart.webp";
import Breadcrumbs from "../../components/common/Breadcrumbs/Breadcrumbs";

export default function Cart() {
 const API_URL = import.meta.env.VITE_API_URL;
 const {items, addItem, updateQuantity, removeItem} = useCart();

 useEffect(() => {
  const localCart = localStorage.getItem("cart");
  if (localCart && JSON.parse(localCart).length > 0) return;

  const loadCartItems = async () => {
   try {
    const res = await fetch(`${API_URL}/api/v1/cart`);
    if (!res.ok) throw new Error("Failed to load cart");
    const data = await res.json();

    data.forEach((item) =>
     addItem({
      id: item.id,
      name: item.productName,
      price: item.price,
      quantity: item.quantity,
      image: item.imageUrl || "", // тепер URL
     })
    );
   } catch (err) {
    console.error("Cart fetch error:", err);
   }
  };

  loadCartItems();
 }, [items, addItem, API_URL]);

 const [appliedCoupon, setAppliedCoupon] = useState(null);

 const handleApplyCoupon = (code) => {
  if (code.toUpperCase() === "DISCOUNT10") {
   setAppliedCoupon({code: "DISCOUNT10", discount: 0.1, type: "percentage"});
   return true;
  }
  return false;
 };

 const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
 const discount = appliedCoupon ? subtotal * appliedCoupon.discount : 0;
 const total = subtotal - discount;

 return (
  <section className={styles.section}>
   <div>
    <img
     src={bannerImage}
     alt="Sale of the month - 50% off"
     className={styles.banner}
    />
   </div>
   <div className={styles.container}>
    <Breadcrumbs
     items={[{title: "Catalog", path: "/catalog"}, {title: "Shopping Cart"}]}
     hideCurrent
    />
    <h1 className={styles.title}>My Shopping Cart</h1>

    <div className={styles.innerWrapper}>
     <div className={styles.table}>
      <div className={styles.header}>
       <span className={styles.tableTitleFirst}>Product</span>
       <span className={styles.tableTitle}>Price</span>
       <span className={styles.tableTitle}>Quantity</span>
       <span className={styles.tableTitle}>Subtotal</span>
       <span className={styles.tableTitle}></span>
      </div>

      <div className={styles.itemInner}>
       {items.map((item) => (
        <CartItem
         key={item.id}
         item={{
          ...item,
          subtotal: item.price * item.quantity,
         }}
         onQuantityChange={(newQty) => updateQuantity(item.id, newQty)}
         onRemove={() => removeItem(item.id)}
        />
       ))}
      </div>
     </div>

     <CartTotal
      subtotal={subtotal}
      total={total}
      discount={discount}
      appliedCoupon={appliedCoupon}
      onApplyCoupon={handleApplyCoupon}
     />
    </div>
   </div>
  </section>
 );
}
