import { useEffect, useState } from "react";
import styles from "./RelatedProducts.module.css";
import CatalogCard from "@/components/catalog/CatalogCard/CatalogCard";

export default function RelatedProducts({ productId, title, limit = 4 }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const controller = new AbortController();

    const fetchProducts = async () => {
      try {
        let data = [];
        if (productId) {
          // fetch related products
          const res = await fetch(
            `${import.meta.env.VITE_API_URL}/api/v1/catalog/${productId}/related`,
            { signal: controller.signal }
          );
          data = await res.json();
        } else {
          // fetch all catalog products
          const res = await fetch(
            `${import.meta.env.VITE_API_URL}/api/v1/catalog`,
            { signal: controller.signal }
          );
          const allProducts = await res.json();
          // shuffle and take first `limit`
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
//   if (!products.length) return null;
console.log('products Loved:', products);
  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <h3 className={styles.title}>{title}</h3>
        <button className={styles.showMoreBtn}>
          <span>Show More</span>
          <span className="material-symbols-outlined">arrow_right</span>
        </button>
      </div>
      <div className={styles.grid}>
        {products.map((product) => (
          <CatalogCard key={product.id} 
  id={product.id} 
  title={product.title}
  name={product.productName} 
  price={product.price} 
  kcal={product.kcal} 
  description={product.description} 
  imageUrl={product.imageUrl} 
  product={product}  />
        ))}
      </div>
    </div>
  );
}