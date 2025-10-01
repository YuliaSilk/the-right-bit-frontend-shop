import {useState} from "react";
import {useNavigate} from "react-router-dom";
import styles from "./OrderConfirmationModal.module.css";

export default function OrderConfirmationModal({isOpen, onClose, orderData}) {
 const [copied, setCopied] = useState(false);
 const navigate = useNavigate();
 const {subtotal, discount, total} = orderData;
 if (!isOpen) return null;

 const handleCopyOrderId = () => {
  navigator.clipboard.writeText(orderData.id);
  setCopied(true);
  setTimeout(() => setCopied(false), 2000);
 };
 //  const handleGoToSuccess = () => {
 //   onClose();
 //   navigate("/order-success");
 //  };

 const handleGoToCatalog = () => {
  onClose();
  navigate("/catalog");
 };
 return (
  <div
   className={styles.backdrop}
   onClick={onClose}
  >
   <div
    className={styles.modal}
    onClick={(e) => e.stopPropagation()}
   >
    <button
     className={styles.closeButton}
     onClick={onClose}
    >
     <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
     >
      <path
       d="M18 6L6 18M6 6L18 18"
       stroke="currentColor"
       strokeWidth="2"
       strokeLinecap="round"
      />
     </svg>
    </button>
    <h2 className={styles.title}>Order Placed Successfully!</h2>
    <div>
     <p className={styles.text}>
      Thank you for your order! Your order ID is <span className={styles.highlight}>#{orderData?.id ?? "N/A"}</span>.
     </p>
    </div>
    <div className={styles.summarySection}>
     <h3 className={styles.summaryTitle}>Order Summary:</h3>
     <p className={styles.itemsTitle}>Items: {orderData.items.length}</p>

     {orderData.items && orderData.items.length > 0 && (
      <div className={styles.itemsSection}>
       <div className={styles.itemsList}>
        {orderData.items.map((item, index) => (
         <div
          key={`${item.id}-${index}`}
          className={styles.item}
         >
          {item.image && (
           <img
            src={item.image}
            alt={item.name}
            className={styles.itemImage}
           />
          )}
          <div className={styles.itemDetails}>
           <span className={styles.itemName}>{item.name}</span>
           <span className={styles.itemQuantity}> {item.quantity}</span>
           <span className={styles.itemPrice}>€ {(item.price * item.quantity).toFixed(2)}</span>
          </div>
         </div>
        ))}
       </div>
       <div className={styles.divider}></div>
      </div>
     )}
     <div className={styles.summaryRow}>
      <span>Subtotal</span>
      <span>€ {subtotal.toFixed(2)}</span>
     </div>
     <div className={styles.summaryRow}>
      <span>Shipping</span>
      <span className={styles.freeText}>Free</span>
     </div>
     {orderData.appliedCoupon && discount > 0 && (
      <div className={styles.summaryRow}>
       <span>Discount ({orderData.appliedCoupon.code})</span>
       <span className={styles.discountText}>-€ {discount.toFixed(2)}</span>
      </div>
     )}
     <div className={styles.divider}></div>
     <div className={`${styles.summaryRow} ${styles.totalRow}`}>
      <span>Total</span>
      <span className={styles.totalAmount}>€ {total.toFixed(2)}</span>
     </div>
    </div>
    <div className={styles.actions}>
     <button
      className={styles.copyButton}
      onClick={handleCopyOrderId}
      title="Copy Order ID"
     >
      {copied ? (
       <span className={styles.copiedText}>Copied!</span>
      ) : (
       <svg
        width="32"
        height="32"
        viewBox="0 0 24 24"
        fill="none"
       >
        <rect
         x="9"
         y="9"
         width="13"
         height="13"
         rx="2"
         stroke="currentColor"
         strokeWidth="2"
        />
        <path
         d="M5 15H4C2.89543 15 2 14.1046 2 13V4C2 2.89543 2.89543 2 4 2H13C14.1046 2 15 2.89543 15 4V5"
         stroke="currentColor"
         strokeWidth="2"
        />
       </svg>
      )}
     </button>
     {/* <button
      className={styles.primaryButton}
      onClick={handleGoToSuccess}
     >
      View Order
     </button> */}
     <button
      className={styles.secondaryButton}
      onClick={handleGoToCatalog}
     >
      Continue Shopping
     </button>
     {/* <button
      className={styles.button}
      onClick={onClose}
     >
      Close
     </button> */}
    </div>
   </div>
  </div>
 );
}
