import {useState} from "react";
import {useNavigate} from "react-router-dom";
import styles from "./CartTotal.module.css";
import {useCart} from "@/context/CartContext";

export default function CartTotal() {
 const {items, subtotal, discount, total, appliedCoupon, applyCoupon} = useCart();
 const [couponCode, setCouponCode] = useState("");
 const [couponError, setCouponError] = useState("");
 const navigate = useNavigate();
 //  const orderId = Date.now().toString();

 //  const handleApplyCoupon = () => {
 //   const success = applyCoupon(couponCode);
 //   if (success) {
 //    setCouponError("");
 //    setCouponCode("");
 //    appliedCoupon({code: "DISCOUNT10", discount: 0.1, type: "percentage"});
 //   } else {
 //    setCouponError("Invalid coupon code");
 //   }
 //  };
 const handleApplyCoupon = () => {
  const success = applyCoupon(couponCode);
  if (success) {
   setCouponError("");
   setCouponCode("");
   // Не потрібно викликати appliedCoupon - це вже зробив applyCoupon()
  } else {
   setCouponError("Invalid coupon code");
  }
 };
 const handleCheckout = () => {
  if (items.length === 0) {
   return; // Не дозволяємо checkout з порожньою корзиною
  }

  // Генеруємо унікальний ID для замовлення
  const orderId = `ORDER-${Date.now()}`;

  const order = {
   id: orderId,
   date: new Date().toISOString(),
   items: items.map((item) => ({
    ...item,
    subtotal: item.price * item.quantity,
   })),
   subtotal,
   discount,
   total,
   appliedCoupon,
  };

  // Зберігаємо замовлення в localStorage
  localStorage.setItem("order", JSON.stringify(order));

  // НЕ викликаємо clearCart() тут! Корзина буде очищена після успішного замовлення в OrderSummary
  navigate("/checkout");
 };
 //  const handleCheckout = () => {
 //   const order = {
 //    id: orderId,
 //    date: new Date().toISOString(),
 //    items: items.map((item) => ({
 //     ...item,
 //     subtotal: item.price * item.quantity,
 //    })),
 //    subtotal,
 //    discount,
 //    total,
 //    appliedCoupon,
 //   };

 //   localStorage.setItem("order", JSON.stringify(order));

 //   clearCart();

 //   navigate("/checkout");
 //  };

 return (
  <div className={styles.cartTotalContainer}>
   <h4 className={styles.cartTotalTitle}>Cart Total</h4>
   <div className={styles.cartTotalWrapper}>
    <div className={styles.cartTotalDetails}>
     <div className={styles.row}>
      <span>Subtotal</span>
      <span>€ {subtotal.toFixed(2)}</span>
     </div>
     <div className={styles.row}>
      <span>Shipping</span>
      <span>Free</span>
     </div>
     {appliedCoupon && discount > 0 && (
      <div className={styles.row}>
       <span>Discount ({appliedCoupon.code})</span>
       <span className={styles.discount}>-€{discount.toFixed(2)}</span>
      </div>
     )}

     <div className={`${styles.row} ${styles.totalRow}`}>
      <span>Total</span>
      <span className={styles.totalAmount}>€ {total.toFixed(2)}</span>
     </div>
    </div>

    <div className={styles.couponSection}>
     <div className={styles.couponInputWrapper}>
      <input
       type="text"
       placeholder="Enter your Code"
       className={styles.couponInput}
       value={couponCode}
       onChange={(e) => {
        setCouponCode(e.target.value);
        setCouponError("");
       }}
      />
      <button
       className={styles.couponButton}
       onClick={handleApplyCoupon}
       disabled={!couponCode.trim()}
      >
       Apply Coupon
      </button>
     </div>
     {couponError && <div className={styles.couponError}>{couponError}</div>}
     {appliedCoupon && <div className={styles.couponSuccess}>Coupon "{appliedCoupon.code}" applied successfully!</div>}

     <div className={styles.line}></div>

     <button
      className={styles.checkoutButton}
      onClick={handleCheckout}
     >
      Proceed to checkout
     </button>
    </div>
   </div>
  </div>
 );
}
