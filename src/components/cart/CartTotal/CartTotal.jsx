import {useState} from "react";
// import { useCart } from "@/context/CartContext";
import {useNavigate} from "react-router-dom";
import styles from "./CartTotal.module.css";

export default function CartTotal({subtotal, discount = 0, total, onApplyCoupon, appliedCoupon}) {
 const [couponCode, setCouponCode] = useState("");
 const [couponError, setCouponError] = useState("");
 const navigate = useNavigate();

 // const { saveCart } = useCart();

 const API_URL = import.meta.env.VITE_REACT_APP_API_URL || "";
 const TOKEN = import.meta.env.VITE_REACT_APP_TEST_TOKEN || "";

 const handleApplyCoupon = () => {
  const success = onApplyCoupon(couponCode);
  if (success) {
   setCouponError("");
   setCouponCode("");
  } else {
   setCouponError("Invalid coupon code");
  }
 };

 const handleCheckout = () => {
  navigate("/checkout");
 };

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
