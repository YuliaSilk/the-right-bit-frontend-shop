import {useState} from "react";
import {useCart} from "@/context/CartContext";
import {useForm} from "react-hook-form";
import {useFormContext} from "@/hooks/useFormContext";
import styles from "./OrderSummary.module.css";
import toast from "react-hot-toast";

export default function OrderSummary() {
 const {items, clearCart, subtotal, total, discount, appliedCoupon} = useCart();
 const {register} = useForm();
 const {formData, resetForm} = useFormContext();

 const [loading, setLoading] = useState(false);

 //  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
 //  const shipping = 0;
 //  const discount = formData?.appliedCoupon?.discount || 0;
 //  const total = subtotal - discount + shipping;

 const handlePlaceOrder = async () => {
  if (!items || items.length === 0) {
   toast.error("The cart is empty. Add items before placing an order.");
   return;
  }

  const delivery = formData?.deliveryInfo ?? formData?.delivery ?? {};
  const payment = formData?.paymentInfo ?? formData?.payment ?? {};
  const get = (o, ...keys) => {
   for (const k of keys) {
    if (o && o[k] !== undefined && o[k] !== null && o[k] !== "") return o[k];
   }
   return "";
  };

  const firstname = get(delivery, "firstName", "firstname", "first_name");
  const lastname = get(delivery, "lastName", "lastname", "last_name");
  const phoneNumber = get(delivery, "phone", "phoneNumber", "phone_number");
  const houseNumber = get(delivery, "houseNumber", "house_number");
  const streetName = get(delivery, "streetName", "street_name");
  const city = get(delivery, "city");
  const country = get(delivery, "country");
  const zipCode = get(delivery, "postalCode", "zipCode", "postal_code");
  const comment = get(delivery, "comment");

  if (!firstname || !phoneNumber) {
   const missing = [];
   if (!firstname) missing.push("name");
   if (!phoneNumber) missing.push("phone number");
   toast.error(`Please fill in ${missing.join(", ")}`);
   return;
  }
  if (!items || items.length === 0) {
   toast.error("The cart is empty. Add items before placing an order.");
   return;
  }

  const payload = {
   items: items.map((item) => ({
    productId: item.productId ?? item.id,
    quantity: item.quantity ?? 1,
    productName: item.name ?? item.productName ?? "",
    priceSnapshot: item.price ?? 0,
   })),
   deliveryDetails: {
    firstname,
    lastname,
    phoneNumber,
    houseNumber,
    streetName,
    city,
    country,
    zipCode,
    comment: comment || "",
    deliveryMethod: "HOME_DELIVERY",
   },
   paymentDetails: {
    method: payment.paymentMethod?.value ?? "credit-card",
    card: payment.cardDetails ?? null,
    saveCard: payment.saveCard ?? false,
    orderNotes: payment.orderNotes ?? "",
   },
   discount: discount,
   totalPrice: total,
   subtotal: subtotal,
   //  appliedCoupon: appliedCoupon?.code ?? null,
  };

  setLoading(true);
  try {
   const res = await fetch("https://right-bite-store.onrender.com/api/v1/order/create", {
    method: "POST",
    headers: {"Content-Type": "application/json", Accept: "application/json"},
    body: JSON.stringify(payload),
   });

   if (!res.ok) {
    let errText = `Request failed with status ${res.status}`;
    try {
     const errJson = await res.json();
     if (errJson?.message) errText = errJson.message;
     else if (errJson?.error) errText = JSON.stringify(errJson);
    } catch {
     /* якщо не JSON — ігноруємо */
    }
    throw new Error(errText);
   }

   const data = await res.json();
   console.log("Order success:", data);
   localStorage.setItem("lastOrder", JSON.stringify(data));
   if (typeof resetForm === "function") resetForm();

   if (typeof clearCart === "function") {
    clearCart();
   } else {
    try {
     localStorage.removeItem("cart");
    } catch {
     /* ignore */
    }
   }

   toast.success("The order has been successfully placed 🚀");
   window.location.href = "/online-store-frontend/order-success";
  } catch (err) {
   console.error("Place order error:", err);
   toast.error("Order error: " + err.message);
  } finally {
   setLoading(false);
  }
 };

 return (
  <div className={styles.orderSummaryContainer}>
   <div className={styles.header}>
    <span className={styles.title}>ORDER SUMMERY</span>
   </div>
   <div className={styles.content}>
    <div className={styles.itemsList}>
     {items.map((item) => (
      <div
       key={item.id}
       className={styles.item}
      >
       <div className={styles.itemDetails}>
        <div className={styles.itemImageWrapper}>
         <img
          src={item.image || "https://placehold.co/80x80/f0f0f0/888?text=Product"}
          alt={item.name}
          className={styles.itemImage}
         />
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
     {appliedCoupon && discount > 0 && (
      <div className={styles.summaryRow}>
       <span>Discount ({appliedCoupon.code}):</span>
       <span>- € {discount.toFixed(2)}</span>
      </div>
     )}
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
       <input
        type="radio"
        value="creditCard"
        {...register("paymentMethod")}
        className={styles.radioInput}
       />
       Credit Card
      </label>
      <label className={styles.radioLabel}>
       <input
        type="radio"
        value="cash"
        {...register("paymentMethod")}
        className={styles.radioInput}
       />
       Cash on Delivery
      </label>
     </div>
    </div>

    <div>
     <button
      type="submit"
      className={styles.placeOrderButton}
      onClick={handlePlaceOrder}
      disabled={loading}
     >
      {loading ? "Placing order..." : "Place Order"}
     </button>
    </div>
   </div>
  </div>
 );
}
