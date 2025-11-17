import styles from "./Catalog.module.css";
import {useEffect, useState} from "react";

import Banner from "@components/home/Banner/Banner";
import NewsLetter from "@components/home/NewsLetter/NewsLetter";

import ActiveFilters from "@components/catalog/ActiveFilters/ActiveFilters";
import CatalogCard from "@components/catalog/CatalogCard/CatalogCard";
import CatalogCategories from "@components/catalog/CatalogCategories/CatalogCategories";
import CatalogFilters from "@components/catalog/CatalogFilters/CatalogFilters";
import CatalogSidebar from "@components/catalog/CatalogSidebar/CatalogSidebar";
import {getProductImageUrl} from "@utils/getProductImage";
import Pagination from "../../components/common/Pagination/Pagination";
import {useSearch} from "../../context/SearchContext";

export default function Catalog() {
 const API_URL = import.meta.env.VITE_API_URL;
 const [products, setProducts] = useState([]);

 const [isLoading, setIsLoading] = useState(false);
 const [errorMessage, setErrorMessage] = useState("");
 const [selectedBrands, setSelectedBrands] = useState([]);
 const [selectedCategory, setSelectedCategory] = useState("");
 const [priceFrom, setPriceFrom] = useState(undefined);
 const [priceTo, setPriceTo] = useState(undefined);
 const [sortBy, setSortBy] = useState("");
 const [aZ, setAZ] = useState("");
 const [page, setPage] = useState(1);
 const [size, setSize] = useState(12);
 const {searchTerm, setSearchTerm} = useSearch();
 const [filteredProducts, setFilteredProducts] = useState([]);
 const [_, setTotalItems] = useState(0);

 //  const size = 12;
 // read category from URL once (optional, if you use ?category=)
 //  useEffect(() => {
 //   const params = new URLSearchParams(window.location.search);
 //   const categoryFromUrl = params.get("category");
 //   if (categoryFromUrl) {
 //    setSelectedCategory(decodeURIComponent(categoryFromUrl));
 //    setPage(1);
 //   }
 //  }, []);
 useEffect(() => {
  const params = new URLSearchParams(window.location.search);
  const searchFromUrl = params.get("search");
  if (searchFromUrl) {
   setSearchTerm(searchFromUrl); // ← оновлюємо глобальний контекст
  }
 }, []);

 // handler from CatalogCategories (we'll pass it down)
 const handleCategorySelect = (name) => {
  setSelectedCategory(name);
  setPage(1);
  // update URL without reload (optional)
  const params = new URLSearchParams(window.location.search);
  params.set("category", name);
  window.history.replaceState(null, "", `${window.location.pathname}?${params.toString()}`);
 };
 useEffect(() => {
  const controller = new AbortController();
  const loadProducts = async () => {
   setIsLoading(true);
   setErrorMessage("");
   try {
    const hasFilters = !!(selectedCategory || selectedBrands.length > 0 || priceFrom || priceTo || sortBy || aZ);
    const url = hasFilters ? `${API_URL}/api/v1/catalog/filter` : `${API_URL}/api/v1/catalog`;

    const options = hasFilters
     ? {
        method: "POST",
        headers: {"Content-Type": "application/json", accept: "application/json"},
        body: JSON.stringify({
         categoryName: selectedCategory || undefined,
         brand: selectedBrands[0] || undefined,
         priceFrom: priceFrom ?? undefined,
         priceTo: priceTo ?? undefined,
         sortBy: sortBy || undefined,
         aZ: aZ || undefined,
         page: Math.max(0, page - 1), // ensure non-negative
         size,
        }),
        signal: controller.signal,
       }
     : {
        method: "GET",
        headers: {accept: "application/json"},
        signal: controller.signal,
       };

    const response = await fetch(url, options);
    if (!response.ok) {
     throw new Error(`Request failed with status ${response.status}`);
    }
    const data = await response.json();
    console.log("Catalog response:", data);

    // try to support both shapes: array OR { content: [...], totalElements: N }
    if (Array.isArray(data)) {
     setProducts(data);
     setTotalItems(data.length);
    } else {
     const items = data.content || data.items || [];
     setProducts(items);
     // backend might return totalElements / totalItems — try to read it
     setTotalItems(data.totalElements ?? data.total ?? data.totalItems ?? items.length);
    }
   } catch (error) {
    if (error.name !== "AbortError") setErrorMessage(error.message || "Network error");
   } finally {
    setIsLoading(false);
   }
  };

  loadProducts();
  return () => controller.abort();
 }, [API_URL, selectedCategory, selectedBrands, priceFrom, priceTo, sortBy, aZ, page, size]);

 useEffect(() => {
  const term = (searchTerm || "").toLowerCase();
  const result = products.filter((p) => p.productName?.toLowerCase().includes(term));
  setFilteredProducts(result);
 }, [searchTerm, products]);

 const totalProducts = filteredProducts.length;
 const totalPages = Math.ceil(totalProducts / size);
 const paginatedProducts = filteredProducts.slice((page - 1) * size, page * size);
 console.log("selectedCategory:", selectedCategory);

 return (
  <>
   <Banner />
   <div className={styles.top}>
    <h2 className={styles.title}>Catalog</h2>
   </div>
   <CatalogCategories onCategoryClick={handleCategorySelect} />

   <div className={styles.container}>
    <div className={styles.catalogContent}>
     <CatalogSidebar
      selectedBrands={selectedBrands}
      onBrandsChange={setSelectedBrands}
      selectedCategory={selectedCategory}
      // onCategoryChange={setSelectedCategory}
      onCategoryChange={(categoryName) => setSelectedCategory(categoryName)}
      priceFrom={priceFrom}
      priceTo={priceTo}
      onPriceChange={({min, max}) => {
       setPriceFrom(min);
       setPriceTo(max);
      }}
     />
     <div className={styles.mainContent}>
      <CatalogFilters
       sortBy={sortBy}
       onSortByChange={setSortBy}
       aZ={aZ}
       onAZChange={setAZ}
       size={size}
       onSizeChange={(val) => {
        setSize(val);
        setPage(1);
       }}
      />
      <ActiveFilters
       filters={[
        selectedCategory && `Category: ${selectedCategory}`,
        selectedBrands[0] && `Brand: ${selectedBrands[0]}`,
        (priceFrom || priceTo) && `Price: ${priceFrom ?? 0} - ${priceTo ?? "∞"}`,
        sortBy && `Sort: ${sortBy}`,
        aZ && `A-Z: ${aZ}`,
       ].filter(Boolean)}
       onRemoveFilter={(f) => {
        if (f.startsWith("Category:")) setSelectedCategory("");
        if (f.startsWith("Brand:")) setSelectedBrands([]);
        if (f.startsWith("Price:")) {
         setPriceFrom(undefined);
         setPriceTo(undefined);
        }
        if (f.startsWith("Sort:")) setSortBy("");
        if (f.startsWith("A-Z:")) setAZ("");
       }}
       resultsCount={products.length}
      />
      {isLoading && <div className={styles.innerCards}>Loading...</div>}
      {!isLoading && errorMessage && (
       <div
        className={styles.innerCards}
        style={{color: "#c62828"}}
       >
        {errorMessage}
       </div>
      )}
      <div className={styles.innerCards}>
       {!isLoading &&
        !errorMessage &&
        filteredProducts.length > 0 &&
        paginatedProducts.map((item, index) => {
         return (
          <CatalogCard
           key={item.id || index}
           id={item.id}
           name={item.productName}
           price={item.price}
           kcal={item.kcal || item.calories || 0}
           description={item.description || ""}
           imageUrl={getProductImageUrl(item)}
          />
         );
        })}
      </div>
      <Pagination
       currentPage={page}
       totalPages={totalPages}
       onPageChange={(p) => setPage(p)}
      />
     </div>
    </div>
   </div>
   <NewsLetter />
  </>
 );
}
