import styles from "./Catalog.module.css";
import {useEffect, useState, useMemo} from "react";
import {useLocation, useNavigate} from "react-router-dom";

import Banner from "@components/home/Banner/Banner";
import NewsLetter from "@components/home/NewsLetter/NewsLetter";

import ActiveFilters from "@components/catalog/ActiveFilters/ActiveFilters";
import CatalogCard from "@components/catalog/CatalogCard/CatalogCard";
import CatalogCategories from "@components/catalog/CatalogCategories/CatalogCategories";
import CatalogFilters from "@components/catalog/CatalogFilters/CatalogFilters";
import CatalogSidebar from "@components/catalog/CatalogSidebar/CatalogSidebar";
import Pagination from "@components/common/Pagination/Pagination";

import {getProductImageUrl} from "@utils/getProductImage";
import {useSearch} from "../../context/SearchContext";
import {usePagination} from "../../hooks/usePagination";
import {filterProducts} from "@utils/filterProducts";

export default function Catalog() {
 const API_URL = import.meta.env.VITE_API_URL;

 const [allProducts, setAllProducts] = useState([]);
 const [, setProducts] = useState([]);
 const [totalItems, setTotalItems] = useState(0);

 const [isLoading, setIsLoading] = useState(false);
 const [errorMessage, setErrorMessage] = useState("");

 const [selectedBrands, setSelectedBrands] = useState([]);
 const [selectedCategory, setSelectedCategory] = useState("");
 const [priceFrom, setPriceFrom] = useState();
 const [priceTo, setPriceTo] = useState();
 const [sortBy, setSortBy] = useState("");
 const [aZ, setAZ] = useState("");

 const [size, setSize] = useState(12);
 const navigate = useNavigate();
 const location = useLocation();
 const {searchTerm, setSearchTerm} = useSearch();

 const {page, setPage, totalPages} = usePagination(totalItems, size);

 useEffect(() => {
  const params = new URLSearchParams(location.search);

  const cat = params.get("category");
  const search = params.get("search");
  const pageFromUrl = params.get("page");
  const sizeFromUrl = params.get("size");

  if (cat) setSelectedCategory(cat);
  if (search) setSearchTerm(search);
  if (sizeFromUrl) setSize(Number(sizeFromUrl));
  if (pageFromUrl) setPage(Number(pageFromUrl));
 }, [location.search]);

 const updateUrl = (overrides = {}) => {
  const params = new URLSearchParams();

  params.set("page", overrides.page ?? page);
  params.set("size", overrides.size ?? size);

  if (selectedCategory) params.set("category", selectedCategory);

  if (searchTerm) params.set("search", searchTerm);
  navigate(`${location.pathname}?${params.toString()}`, {replace: true});
 };

 const handleCategorySelect = (cat) => {
  setSelectedCategory(cat);
  setPage(1);
  updateUrl({page: 1});
 };
 const clearAllFilters = () => {
  setSearchTerm("");
  setSelectedCategory("");
  setSelectedBrands([]);
  setPriceFrom(undefined);
  setPriceTo(undefined);
  setSortBy("");
  setAZ("");
  setPage(1);
  navigate("/catalog");
 };

 useEffect(() => {
  const controller = new AbortController();

  const loadAllProducts = async () => {
   setIsLoading(true);
   setErrorMessage("");

   try {
    const response = await fetch(`${API_URL}/api/v1/catalog?size=1000`, {signal: controller.signal});
    if (!response.ok) throw new Error(`Error: ${response.status}`);
    const data = await response.json();
    const items = Array.isArray(data) ? data : data.content || data.items || [];
    setAllProducts(items);
    setProducts(items);
    setTotalItems(items.length);
    updateUrl();
   } catch (err) {
    if (err.name !== "AbortError") setErrorMessage(err.message);
   } finally {
    setIsLoading(false);
   }
  };

  loadAllProducts();
  return () => controller.abort();
 }, [API_URL]);

 const paginatedProducts = useMemo(() => {
  const start = (page - 1) * size;
  const end = start + size;
  return visibleProducts.slice(start, end);
 }, [visibleProducts, page, size]);
 const visibleProducts = useMemo(
  () => filterProducts(allProducts, {searchTerm, selectedCategory, selectedBrands, priceFrom, priceTo}),
  [allProducts, searchTerm, selectedCategory, selectedBrands, priceFrom, priceTo]
 );

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
      onCategoryChange={setSelectedCategory}
      priceFrom={priceFrom}
      priceTo={priceTo}
      onPriceChange={({min, max}) => {
       setPriceFrom(min);
       setPriceTo(max);
       setPage(1);
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
        setPage(1);
       }}
       resultsCount={visibleProducts.length}
      />

      {isLoading && (
       <div className={styles.loading}>
        <div className={styles.spinner}></div>
        <p>Loading products...</p>
       </div>
      )}

      {/* Error State */}
      {!isLoading && errorMessage && (
       <div className={styles.error}>
        <h3>⚠️ Oops! Something went wrong</h3>
        <p>{errorMessage}</p>
        <button
         onClick={() => window.location.reload()}
         className={styles.retryButton}
        >
         Try Again
        </button>
       </div>
      )}

      {!isLoading && !errorMessage && visibleProducts.length === 0 && (
       <div className={styles.empty}>
        <div className={styles.emptyIcon}>🔍</div>
        <h3 className={styles.emptyTitle}>No products found</h3>

        {searchTerm && (
         <p className={styles.emptyText}>
          We couldn't find any products matching <strong>"{searchTerm}"</strong>
         </p>
        )}

        {selectedCategory && !searchTerm && (
         <p className={styles.emptyText}>
          No products available in the <strong>{selectedCategory}</strong> category yet.
         </p>
        )}

        {!searchTerm && !selectedCategory && (
         <p className={styles.emptyText}>No products match your current filters.</p>
        )}

        <div className={styles.emptyActions}>
         {searchTerm && (
          <button
           onClick={() => setSearchTerm("")}
           className={styles.clearButton}
          >
           Clear Search
          </button>
         )}
         {(selectedCategory || selectedBrands.length > 0 || priceFrom || priceTo) && (
          <button
           onClick={clearAllFilters}
           className={styles.clearAllButton}
          >
           Clear All Filters
          </button>
         )}
        </div>
       </div>
      )}
      <div className={styles.innerCards}>
       {!isLoading &&
        !errorMessage &&
        paginatedProducts.map((item) => (
         <CatalogCard
          key={item.id}
          id={item.id}
          name={item.productName}
          price={item.price}
          kcal={item.kcal || item.calories || 0}
          description={item.description || ""}
          imageUrl={getProductImageUrl(item)}
         />
        ))}
      </div>
      {!isLoading && !errorMessage && visibleProducts.length > 0 && (
       <Pagination
        currentPage={page}
        totalPages={totalPages}
        onPageChange={setPage}
       />
      )}
     </div>
    </div>
   </div>

   <NewsLetter />
  </>
 );
}
