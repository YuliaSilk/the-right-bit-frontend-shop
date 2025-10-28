import {useEffect, useState} from "react";
import styles from "./RelatedProducts.module.css";
import CatalogCard from "@/components/catalog/CatalogCard/CatalogCard";

export default function RelatedProducts({productId, title, limit = 4, variant = "default"}) {
 const [allProducts, setAllProducts] = useState([]);
 const [visibleCount, setVisibleCount] = useState(limit);
 const [loading, setLoading] = useState(true);

 const ITEMS_PER_ROW = 4;

 useEffect(() => {
  const controller = new AbortController();

  const fetchProducts = async () => {
   try {
    let data = [];
    if (productId) {
     const res = await fetch(`${import.meta.env.VITE_API_URL}/api/v1/catalog/${productId}/related`, {
      signal: controller.signal,
     });
     data = await res.json();
    } else {
     const res = await fetch(`${import.meta.env.VITE_API_URL}/api/v1/catalog`, {signal: controller.signal});

     const allProducts = await res.json();
     data = allProducts.sort(() => 0.5 - Math.random());
    }

    setAllProducts(data);
   } catch (err) {
    if (err.name !== "AbortError") {
     console.error("Помилка завантаження RelatedProducts:", err);
    }
   } finally {
    setLoading(false);
   }
  };

  fetchProducts();

  return () => controller.abort();
 }, [productId]);

 const handleShowMore = () => {
  setVisibleCount((prev) => prev + ITEMS_PER_ROW);
 };

 const visibleProducts = allProducts.slice(0, visibleCount);
 const hasMoreProducts = visibleCount < allProducts.length;

 const handleShowLess = () => {
  setVisibleCount((prev) => Math.max(ITEMS_PER_ROW, prev - ITEMS_PER_ROW));
 };

 const canShowLess = visibleCount > ITEMS_PER_ROW; // показуємо "менше" лише якщо більше 1 рядка

 if (loading) return <p>Завантаження...</p>;
 //  console.log("products Loved:", products);
 return (
  <div className={`${styles.block} ${styles[variant]}`}>
   <div className={styles.wrapper}>
    <div className={styles.header}>
     <h3 className={styles.title}>{title}</h3>
     {hasMoreProducts && (
      <button
       className={styles.showMoreBtn}
       onClick={handleShowMore}
      >
       <span>Show More</span>
       <svg
        xmlns="http://www.w3.org/2000/svg"
        width="12"
        height="16"
        viewBox="0 0 12 16"
        fill="none"
       >
        <path
         d="M1.91797 15L10.0846 8L1.91797 1"
         stroke="#234D2E"
         strokeWidth="2"
         strokeLinecap="round"
         strokeLinejoin="round"
        />
       </svg>{" "}
      </button>
     )}
    </div>
    <div className={styles.grid}>
     {visibleProducts.map((product) => (
      <CatalogCard
       key={product.id}
       id={product.id}
       title={product.title}
       name={product.productName}
       price={product.price}
       kcal={product.kcal}
       description={product.description}
       imageUrl={product.imageUrl}
       product={product}
       variant={variant}
      />
     ))}
    </div>
    {canShowLess && (
     <div className={styles.bottomBtnWrapper}>
      <button
       className={styles.showLessBtn}
       onClick={handleShowLess}
      >
       <svg
        xmlns="http://www.w3.org/2000/svg"
        width="12"
        height="16"
        viewBox="0 0 12 16"
        fill="none"
        style={{transform: "rotate(180deg)"}}
       >
        <path
         d="M1.91797 15L10.0846 8L1.91797 1"
         stroke="#234D2E"
         strokeWidth="2"
         strokeLinecap="round"
         strokeLinejoin="round"
        />
       </svg>
       <span>Show Less</span>
      </button>
     </div>
    )}
   </div>
  </div>
 );
}
