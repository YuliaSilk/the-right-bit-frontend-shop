import {useEffect, useState} from "react";
import styles from "./RelatedProducts.module.css";
import CatalogCard from "@/components/catalog/CatalogCard/CatalogCard";

export default function RelatedProducts({productId, title, limit = 4, variant = "default"}) {
 const [products, setProducts] = useState([]);
 const [loading, setLoading] = useState(true);

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
     data = allProducts.sort(() => 0.5 - Math.random()).slice(0, limit);
    }

    setProducts(data.slice(0, limit));
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
 }, [productId, limit]);

 if (loading) return <p>Завантаження...</p>;
 //  console.log("products Loved:", products);
 return (
  <div className={`${styles.block} ${styles[variant]}`}>
   <div className={styles.wrapper}>
    <div className={styles.header}>
     <h3 className={styles.title}>{title}</h3>
     <button className={styles.showMoreBtn}>
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
    </div>
    <div className={styles.grid}>
     {products.map((product) => (
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
   </div>
  </div>
 );
}
