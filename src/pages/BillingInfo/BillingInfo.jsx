// import { useEffect } from "react";
// import { useCart } from "@/context/CartContext";
import bannerDiscount from '@/assets/images/discount_banner.webp';
import styles from './BillingInfo.module.css';
import { Link } from 'react-router-dom';


export default function BillingInfo() {
//      const { cart, loadCart } = useCart();

//   useEffect(() => {
//     if (!cart) loadCart(); 
//   }, []);

//   if (!cart) {
//     return <p>Немає даних замовлення. Поверніться до кошика.</p>;
//   }
    return (
        <section >
        <div className={styles.discountBanner} style={{ backgroundImage: `url(${bannerDiscount})` }}>
            <div className={styles.discountTextWrapper}>
            <div className={styles.discountText}>
            <h2 className={styles.discountTitle}>Sale up to  <span className={styles.discountSpan}>30% OFF</span></h2>
            <p className={styles.discountDescription}>Free shipping on all your order. we deliver, you enjoy</p>
            </div>
            </div>
        </div>
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
            stroke-width="1.5"
            stroke-miterlimit="10"
            stroke-linecap="square"
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
            stroke-width="1.5"
            stroke-miterlimit="10"
            stroke-linecap="square"
          />
        </svg>
        <Link className={styles.link} to="/cart">
          Shoping Cart
        </Link>
      </div>

      <h1 className={styles.title}>Billing Information</h1>
<div className={styles.innerWrapper}>
 <div className={styles.header}>
            <span className={styles.tableTitle}>Delivery Information</span>
            
          </div>
</div>
      
               {/* <div>
      <h2>Оформлення замовлення</h2>
      <ul>
        {cart.cartItems.map((item) => (
          <li key={item.productId}>
            {item.productName} × {item.quantity} = €{item.totalPrice}
          </li>
        ))}
      </ul>
      <p>Разом: €{cart.totalPrice}</p>
    </div> */}
    </div>
        </section>
    );
}