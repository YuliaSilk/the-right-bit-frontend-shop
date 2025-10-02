import tomatoes_5 from "@assets/images/tomatoes_5.png";
import {useEffect, useState} from "react";
import {Link, useParams} from "react-router-dom";
import styles from "./Item.module.css";
// import CatalogCard from "../../components/catalog/CatalogCard/CatalogCard";
import {useCart} from "@/context/CartContext";
import Breadcrumbs from "../../components/common/Breadcrumbs/Breadcrumbs";
export default function Item() {
 const {id} = useParams();
 const API_URL = import.meta.env.VITE_API_URL;
 const {addItem} = useCart();

 const [product, setProduct] = useState(null);
 const [isLoading, setIsLoading] = useState(false);
 const [errorMessage, setErrorMessage] = useState("");
 const [relatedProducts, setRelatedProducts] = useState([]);

 useEffect(() => {
  if (!id) return;
  const controller = new AbortController();

  const loadProduct = async () => {
   setIsLoading(true);
   setErrorMessage("");
   try {
    const response = await fetch(`${API_URL}/api/v1/catalog/${id}`, {
     method: "GET",
     headers: {accept: "application/json"},
     signal: controller.signal,
    });

    const contentType = response.headers.get("content-type") || "";
    let payload = null;
    try {
     if (contentType.includes("application/json")) {
      payload = await response.json();
     } else {
      const text = await response.text();
      payload = text ? {message: text} : null;
     }
    } catch (_) {
     payload = null;
    }

    if (!response.ok) {
     const message = (payload && (payload.message || payload.error)) || `Request failed with status ${response.status}`;
     setErrorMessage(message);
     setProduct(null);
     return;
    }

    setProduct(payload);

    const relatedResponse = await fetch(`${API_URL}/api/v1/catalog/${id}/related`, {signal: controller.signal});

    if (relatedResponse.ok) {
     const related = await relatedResponse.json();
     setRelatedProducts(related);
    }
   } catch (err) {
    if (err?.name !== "AbortError") {
     setErrorMessage("Network error. Please try again later.");
    }
   } finally {
    setIsLoading(false);
   }
  };

  loadProduct();
  return () => controller.abort();
 }, [API_URL, id]);

 const [productCount, setProductCount] = useState(1);

 const decrementProductCount = () => {
  setProductCount((prevCount) => {
   if (prevCount === 1) {
    return 1;
   }
   return prevCount - 1;
  });
 };

 const incrementProductCount = () => {
  setProductCount((prevCount) => prevCount + 1);
 };

 const name = product?.productName || "Product";
 const productNumber = product?.id ?? "";
 const price = product?.price != null ? product.price : null;
 const description = product?.description || "";
 const brandName = product?.brand?.brandName || "";
 const categoryName =
  Array.isArray(product?.categories) && product.categories[0]?.categoryName ? product.categories[0].categoryName : "";
 const weight = product?.weight ?? null;
 const protein = product?.protein ?? null;
 const fat = product?.fat ?? null;
 const carbs = product?.carbs ?? null;
 let imageUrl = Array.isArray(product?.images) && product.images[0]?.url ? product.images[0].url : "";
 if (imageUrl && imageUrl.startsWith("/")) {
  const base = (API_URL || "").replace(/\/+$/, "");
  imageUrl = `${base}${imageUrl}`;
 }

 const handleAddToCart = () => {
  if (!product) return;

  const item = {
   id: product.id,
   name: product.productName,
   price: product.price,
   quantity: productCount,
   image: imageUrl || tomatoes_5,
   weight: product.weight ?? null,
   description: product.description,
  };

  addItem(item);
 };

 return (
  <div className={styles.container}>
   <Breadcrumbs
    items={[{title: "Catalog", path: "/catalog"}, {title: "Item"}]}
    hideCurrent
   />

   {isLoading && <div style={{padding: "2rem"}}>Loading...</div>}

   {!isLoading && errorMessage && <div style={{padding: "2rem", color: "#c62828"}}>{errorMessage}</div>}

   {!isLoading && !errorMessage && (
    <div className={styles.shortInfoContainer}>
     <div className={styles.productImage}>
      <img
       src={imageUrl || tomatoes_5}
       alt={name}
      />
     </div>
     <div className={styles.detailsBlock}>
      <div className={styles.briefPanel}>
       <h3 className={styles.productName}>{name}</h3>
       <div className={styles.productNumber}>{productNumber}</div>
       {price != null && <span className={styles.actualPrice}>{`€ ${price}`}</span>}
       <div className={styles.prices}>
        <div className={styles.actionButtons}>
         <div className={styles.productAmount}>
          <div
           className={styles.changeProductAmountIcon}
           onClick={decrementProductCount}
          >
           -
          </div>
          <div>{productCount}</div>
          <div
           className={styles.changeProductAmountIcon}
           onClick={incrementProductCount}
          >
           +
          </div>
         </div>
         <Link to="/cart">
          <button
           className={styles.addToCartButton}
           onClick={handleAddToCart}
          >
           <div className="material-symbols-outlined">shopping_bag</div>
          </button>
         </Link>
        </div>
       </div>
      </div>
      <div className={styles.detailedInfo}>
       <div className={styles.infoBlock}>
        <h3>Description</h3>
        <p>{description}</p>
       </div>
       <div className={styles.infoBlock}>
        <h3>General Information</h3>
        <div>
         <span>Product name: </span>
         <span>{name}</span>
        </div>
        <div>
         <span>Brand: </span>
         <span className={styles.textUnderlined}>{brandName}</span>
        </div>
        <div>
         <span>Category: </span>
         <span className={styles.textUnderlined}>{categoryName}</span>
        </div>
       </div>
       <div className={styles.infoBlock}>
        <h3>Nutrition Value</h3>
        <div className={styles.nutritionRow}>
         <div className={styles.nutritionClauseIcon}>
          <span className="material-symbols-outlined">check</span>
         </div>
         <span>{`Protein : ${protein ?? "-"} g`}</span>
        </div>
        <div className={styles.nutritionRow}>
         <div className={styles.nutritionClauseIcon}>
          <span className="material-symbols-outlined">check</span>
         </div>
         <span>{`Fat : ${fat ?? "-"} g`}</span>
        </div>
        <div className={styles.nutritionRow}>
         <div className={styles.nutritionClauseIcon}>
          <span className="material-symbols-outlined">check</span>
         </div>
         <span>{`Carbohydrates : ${carbs ?? "-"} g`}</span>
        </div>
        <div className={styles.nutritionRow}>
         <div className={styles.nutritionClauseIcon}>
          <span className="material-symbols-outlined">check</span>
         </div>
         <span>{`Vitamins (per 100g) : Vitamin C, Vitamin A`}</span>
        </div>
       </div>
      </div>
     </div>
    </div>
   )}

   {/* Recommendation sections removed until wired to real data */}
   <div className={styles.detailsBlock}>
    <div className={styles.shortInfoContainer}>
     <h3 className={styles.productName}>Similar Products</h3>
     <button className={styles.btn_showMore}>
      <h4>Show More</h4>
      <span className="material-symbols-outlined">arrow_right</span>
     </button>
    </div>
    <div>
     <div>
      <img
       src={imageUrl}
       alt={name}
      />
      <div>
       <div className={styles.detailsBlock}>
        <h2> {name}</h2>
        <p> </p>
       </div>
       <div className={styles.btn_price}>
        <span className={styles.actualPrice}>{`€ ${price}`}</span>
       </div>
       <p>{description}</p>
       <Link
        to={`/catalog/${id}`}
        className={styles.orderBtn}
       >
        <div className={styles.nutritionRow}>
         <h2>Order now</h2>
         <span className="material-symbols-outlined"> arrow_right</span>
        </div>
       </Link>
      </div>
     </div>
    </div>
   </div>
  </div>
 );
}
