import styles from "./Success.module.css";
import banner from "../../assets/images/top_view_fresh_red_tomatoes_with_greens_bell_peppers_dark_background.webp";
import groupIcon from "../../assets/icons/group_7.webp";
import iconBox from "../../assets/icons/icon_box.webp";
import {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import NewsLetter from "@/components/home/NewsLetter/NewsLetter";
import RelatedProducts from "../../components/common/RelatedProducts/RelatedProducts";

export default function SuccessPage() {
 const [order, setOrder] = useState(null);

 useEffect(() => {
  const saved = localStorage.getItem("lastOrder");
  if (saved) {
   const parsed = JSON.parse(saved);
   setOrder(parsed);

   localStorage.removeItem("formData");
   localStorage.removeItem("cart");
   localStorage.removeItem("lastOrder");
  }
 }, []);

 if (!order) {
  return <p>Замовлення не знайдено</p>;
 }

 const subtotal = order.items?.reduce((sum, item) => sum + item.priceSnapshot * item.quantity, 0) || 0;
 const shipping = 0;
 const total = order.totalPrice ?? subtotal + shipping;
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
   {/* <div className={styles.contentWrapper}></div> */}
   <div className={styles.container}>
    <div className={styles.breadcrumbs}>
     <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
     >
      <path
       d="M15.375 5.25L8.625 12L15.375 18.75"
       stroke="black"
       strokeWidth="1.5"
       strokeMiterlimit="10"
       strokeLinecap="square"
      />
     </svg>
     <Link
      className={styles.link}
      to="/catalog"
     >
      Catalog
     </Link>
    </div>
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
       <p className={styles.date}>Estimated delivery : June 19 - 21</p>
       <p className={styles.estText}>We’re packing your order with care using recyckable materials</p>
      </div>
     </div>
     <div className={styles.summary}>
      <div className={styles.summaryTable}>
       <div className={styles.summaryRowId}>
        <span className={styles.summaryValueId}>#ID{order.id}</span>
        <span className={styles.summaryLabelDate}>June 16, 2025</span>
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

       <div className={styles.summaryRow}>
        <span className={styles.summaryTotalLabel}>Total:</span>
        <span className={styles.summaryTotalValue}>€ {total.toFixed(2)}</span>
       </div>
      </div>
      <div className={styles.buttonWrapper}>
       <button className={styles.buttonTrack}>Track Delivery</button>
       <button className={styles.buttonView}>View Order</button>
      </div>
     </div>
    </div>

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
