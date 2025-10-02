import React from "react";
import {FormProvider} from "@/context/FormContext";

import DeliveryInfo from "../../components/order/DeliveryInfo/DeliveryInfo";
import PaymentForm from "../../components/order/PaymentInfo/PaymentInfo";
import OrderSummary from "../../components/order/OrderSummary/OrderSummary";
import bannerDiscount from "@/assets/images/discount_banner.webp";
import styles from "./BillingInfo.module.css";
import {Link} from "react-router-dom";
import Breadcrumbs from "../../components/common/Breadcrumbs/Breadcrumbs";

export default function BillingInfo() {
 return (
  <FormProvider>
   <section className={styles.section}>
    <div
     className={styles.discountBanner}
     style={{backgroundImage: `url(${bannerDiscount})`}}
    >
     <div className={styles.discountTextWrapper}>
      <div className={styles.discountText}>
       <h2 className={styles.discountTitle}>
        Sale up to <span className={styles.discountSpan}>30% OFF</span>
       </h2>
       <p className={styles.discountDescription}>Free shipping on all your order. we deliver, you enjoy</p>
      </div>
     </div>
    </div>
    <div className={styles.contentWrapper}>
     <div className={styles.container}>
      <Breadcrumbs
       items={[
        {title: "Catalog", path: "/catalog"},
        {title: "Shopping Cart", path: "/cart"},
        {title: "Billing Information"},
       ]}
       hideCurrent
      />

      <h1 className={styles.title}>Billing Information</h1>
      <div className={styles.innerWrapper}>
       <div className={styles.infoWrapper}>
        <DeliveryInfo />
        <PaymentForm />
       </div>
       <OrderSummary />
      </div>
     </div>
    </div>
   </section>
  </FormProvider>
 );
}
