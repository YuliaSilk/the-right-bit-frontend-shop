import { useCart } from "@/context/CartContext";
import { useForm } from "react-hook-form";
import styles from './OrderSummery.module.css';

export default function OrderSummary() {
  const { items } = useCart();
  const {register} = useForm();

  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = 0; 
  const total = subtotal + shipping;

  return (
    <div className={styles.orderSummaryContainer}>
      <div className={styles.header}>
        <span className={styles.title}>ORDER SUMMERY</span>
      </div>
      <div className={styles.content}>
        <div className={styles.itemsList}>
          {items.map((item) => (
            <div key={item.id} className={styles.item}>
             
              <div className={styles.itemDetails}>
                 <div className={styles.itemImageWrapper}>
                {/* Placeholder for item image */}
                {/* Use the actual image source from the item object when available */}
                <img src={item.image || 'https://placehold.co/80x80/f0f0f0/888?text=Product'} alt={item.name} className={styles.itemImage} />
              </div>
                <div className={styles.itemName}>{item.name}</div>
                <div className={styles.itemQuantity}>× {item.quantity}</div>
              </div>
              <div className={styles.itemPrice}>€ {(item.price * item.quantity).toFixed(2)}</div>
            </div>
          ))}
        </div>
        
        <div className={styles.summaryTable}>
          <div className={styles.summaryRow}>
            <span className={styles.summaryLabel}>Subtotal:</span>
            <span className={styles.summaryValue}>€ {subtotal.toFixed(2)}</span>
          </div>
                    <div className={styles.summaryDivider}></div>

          <div className={styles.summaryRow}>
            <span className={styles.summaryLabel}>Shipping:</span>
            <span className={styles.summaryValue}>Free</span>
          </div>
          <div className={styles.summaryDivider}></div>
          <div className={styles.summaryRow}>
            <span className={styles.summaryTotalLabel}>Total:</span>
            <span className={styles.summaryTotalValue}>€ {total.toFixed(2)}</span>
          </div>
        </div>
      
       <div className={styles.paymentMethod}>
        <div className={styles.sectionTitle}>Payment Method</div>
    <div className={styles.paymentMethodWrapper}>
      <label className={styles.radioLabel}>
        <input type="radio" value="creditCard" {...register('paymentMethod')} className={styles.radioInput}/>
        Credit Card
      </label>
      <label className={styles.radioLabel}>
        <input type="radio" value="cash" {...register('paymentMethod')} className={styles.radioInput} />
        Cash on Delivery
      </label>
    </div>
    </div>
    <div>
      <button type="submit" className={styles.placeOrderButton}>Place Order</button>
    </div>
    </div>
    </div>
    
  );
}