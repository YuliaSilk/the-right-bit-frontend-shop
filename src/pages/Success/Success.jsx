import styles from "./Success.module.css";
import banner from "../../assets/images/top_view_fresh_red_tomatoes_with_greens_bell_peppers_dark_background.webp";
import groupIcon from "../../assets/icons/group_7.webp";
import iconBox from "../../assets/icons/icon_box.webp";
import {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import NewsLetter from "@/components/home/NewsLetter/NewsLetter";
import RelatedProducts from "../../components/common/RelatedProducts/RelatedProducts";
import Breadcrumbs from "../../components/common/Breadcrumbs/Breadcrumbs";
import {getDeliveryRangeString} from "../../utils/generateDeliveryDate";
import OrderConfirmationModal from "../../components/order/OrderConfirmationModal/OrderConfirmationModal";
export default function SuccessPage() {
 const [order, setOrder] = useState(null);
 const [loading, setLoading] = useState(true);
 const [isModalOpen, setIsModalOpen] = useState(false);
 const DELIVERY_RANGE = getDeliveryRangeString(3, 5);

 useEffect(() => {
  const saved = localStorage.getItem("lastOrder");
  if (saved) {
   try {
    const parsed = JSON.parse(saved);
    // console.log("Loaded order:", parsed);
    setOrder(parsed);
   } catch (error) {
    console.error("Failed to load order:", error);
   }
  }
  setLoading(false);

  localStorage.removeItem("formData");
 }, []);

 if (loading) {
  return (
   <div className={styles.section}>
    <div className={styles.container}>
     <p>Loading order information...</p>
    </div>
   </div>
  );
 }

 if (!order) {
  return (
   <div className={styles.section}>
    <div className={styles.container}>
     <p>Order not found. Please check your order history or contact support.</p>
     <Link to="/catalog">Return to Catalog</Link>
    </div>
   </div>
  );
 }
 const subtotal = order.subtotal ?? 0;
 const total = order.total ?? 0;
 const discount = order.discount ?? 0;
 const orderId = order.id ?? order.orderId ?? "N/A";
 const orderDate = order.date ? new Date(order.date).toLocaleDateString() : "—";

 return (
  <section className={styles.section}>
   <div
    className={styles.banner}
    style={{backgroundImage: `url(${banner})`}}
   >
    <div className={styles.discountTextWrapper}>
     <div className={styles.discountText}>
      <h2 className={styles.discountTitle}>
       Sale up to <span className={styles.discountSpan}>30% OFF</span>
      </h2>
      <p className={styles.discountDescription}>Free shipping on all your order.</p>
     </div>
    </div>
   </div>
   <div className={styles.container}>
    <Breadcrumbs
     items={[{title: "Catalog", path: "/catalog"}, {title: "Success"}]}
     hideCurrent
    />
    <div className={styles.inner}>
     <img
      src={groupIcon}
      alt="two green leaves"
      className={styles.icon}
     />
     <h2 className={styles.title}>Your order is successfully placed ! </h2>
     <p className={styles.text}>
      Thanks for your order! We’re getting it ready to ship and will notify you <br /> as soon as it’s on the way.
      <br /> Need help? Contact our support team anytime.
     </p>
    </div>

    <div className={styles.estimate}>
     <div className={styles.estimateTextWrapper}>
      <img
       src={iconBox}
       alt="box icon"
       className={styles.iconBox}
      ></img>
      <div className={styles.estimateText}>
       <p className={styles.date}>Estimated delivery: {DELIVERY_RANGE}</p>
       <p className={styles.estText}>We’re packing your order with care using recyckable materials</p>
      </div>
     </div>
     <div className={styles.summary}>
      <div className={styles.summaryTable}>
       <div className={styles.summaryRowId}>
        <span className={styles.summaryValueId}>#ID{orderId}</span>
        <span className={styles.summaryLabelDate}> {orderDate}</span>
       </div>

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
       {order.appliedCoupon && discount > 0 && (
        <>
         <div className={styles.summaryRow}>
          <span className={styles.summaryLabel}>Discount ({order.appliedCoupon.code}):</span>
          <span className={styles.summaryValue}>-€ {discount.toFixed(2)}</span>
         </div>
         <div className={styles.summaryDivider}></div>
        </>
       )}
       <div className={styles.summaryRow}>
        <span className={styles.summaryTotalLabel}>Total:</span>
        <span className={styles.summaryTotalValue}>€ {total.toFixed(2)}</span>
       </div>
      </div>
      <div className={styles.buttonWrapper}>
       <button className={styles.buttonTrack}>Track Delivery</button>

       <button
        className={styles.buttonView}
        onClick={() => {
         const user = localStorage.getItem("user");
         if (user) {
          window.location.href = `/profile/orders/${orderId}`;
         } else {
          setIsModalOpen(true);
         }
        }}
       >
        View Order
       </button>
      </div>
     </div>
    </div>
    <OrderConfirmationModal
     isOpen={isModalOpen}
     onClose={() => setIsModalOpen(false)}
     orderData={order}
    />

    <RelatedProducts
     title="You may also love"
     limit={4}
    />

    <p className={styles.newsletterText}>
     Want more eco-friendly tips and exclusive offers? Subscribe to our Newsletter
    </p>
   </div>

   <NewsLetter />
  </section>
 );
}
