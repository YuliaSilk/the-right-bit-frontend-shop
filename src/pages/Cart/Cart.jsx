import { useState } from 'react';
import styles from './Cart.module.css';
import { Link } from 'react-router-dom';

import CartItem from '@/components/cart/CartItem/CartItem';
import CartTotal from '@/components/cart/CartTotal/CartTotal';

import bannerImage from '@/assets/images/banner_cart.webp';

export default function Cart() {
  const [items, setItems] = useState([
    {
    id: 1,
    name: 'Broccoli',
    image: '🥦',
    price: 2.50,
    quantity: 2,
    weight: '1kg'
  },
  {
    id: 2,
    name: 'Red Tomatoes',
    image: '🍅',
    price: 3.20,
    quantity: 1,
    weight: '500g'
  },
  {
    id: 3,
    name: 'Green Lettuce',
    image: '🥬',
    price: 1.80,
    quantity: 3,
    weight: '300g'
  },
  {
    id: 4,
    name: 'Red Peppers',
    image: '🌶️',
    price: 4.50,
    quantity: 2,
    weight: '400g'
  }
]);

// const [couponCode, setCouponCode] = useState('');
const [appliedCoupon, setAppliedCoupon] = useState(null);

  const handleChangeQuantity = (id, newQty) => {
    if (newQty < 1) return
    setItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity: newQty } : item
      )
    );
  };

const handleRemoveItem = (id) => {
  setItems((prev) => prev.filter((item) => item.id !== id));
};

const handleApplyCoupon = (code) => {
  if (code.toUpperCase() === 'DISCOUNT10') {
     setAppliedCoupon({ code: 'DISCOUNT10', discount: 0.1, type: 'percentage' });
     return true
  }
  return false
};



const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
const discount = appliedCoupon ? subtotal * appliedCoupon.discount : 0;
const total = subtotal - discount;

  return (
    <section>
    <div>
         <img
    src={bannerImage}
    alt="Sale of the month - 50% off"
    className={styles.banner}
  />
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
      </div>
      <h1 className={styles.title}>My Shopping Cart</h1>

      <div className={styles.innerWrapper}>
        <div className={styles.table}>
          <div className={styles.header}>
            <span className={styles.tableTitle}>Product</span>
            <span className={styles.tableTitle}>Price</span>
            <span className={styles.tableTitle}>Quantity</span>
            <span className={styles.tableTitle}>Subtotal</span>
            <span className={styles.tableTitle}></span>
          </div>

          <div className={styles.itemInner}>
            {items.map((item) => (
              <CartItem
                key={item.id}
                item={{
                  ...item,
                  subtotal: item.price * item.quantity,
                }}
                onQuantityChange={(newQty) =>
                  handleChangeQuantity(item.id, newQty)
                }
                 onRemove={() => handleRemoveItem(item.id)}
              />
            ))}
          </div>
        </div>

        <CartTotal 
        subtotal={subtotal} 
        total={total} 
        discount={discount}
        appliedCoupon={appliedCoupon}
        onApplyCoupon={handleApplyCoupon}/>
      </div>
    </div>
    </section>
  );
}
