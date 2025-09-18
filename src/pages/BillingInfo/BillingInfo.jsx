import React from 'react';
import { FormProvider } from '@/context/FormContext';

import DeliveryInfo from '../../components/order/DeliveryInfo/DeliveryInfo';
import PaymentForm from '../../components/order/PaymentInfo/PaymentInfo';
import OrderSummary from '../../components/order/OrderSummary/OrderSummary';
import bannerDiscount from '@/assets/images/discount_banner.webp';
import styles from './BillingInfo.module.css';
import { Link } from 'react-router-dom';


export default function BillingInfo() {

    return (
      <FormProvider>
        <section className={styles.section} >
        <div className={styles.discountBanner} style={{ backgroundImage: `url(${bannerDiscount})` }}>
          
            <div className={styles.discountTextWrapper}>
            <div className={styles.discountText}>
            <h2 className={styles.discountTitle}>Sale up to  <span className={styles.discountSpan}>30% OFF</span></h2>
            <p className={styles.discountDescription}>Free shipping on all your order. we deliver, you enjoy</p>
            </div>
            </div>
            </div>
            <div className={styles.contentWrapper}>
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
        <Link className={styles.link} to="/catalog">
          Catalog
        </Link>
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
        <Link className={styles.link} to="/cart">
          Shoping Cart
        </Link>
      </div>

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