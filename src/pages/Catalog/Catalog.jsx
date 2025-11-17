import styles from "./Catalog.module.css";
import { useEffect, useState } from "react";

import Banner from "@components/home/Banner/Banner";
import NewsLetter from "@components/home/NewsLetter/NewsLetter";

import ActiveFilters from "@components/catalog/ActiveFilters/ActiveFilters";
import CatalogCard from "@components/catalog/CatalogCard/CatalogCard";
import CatalogCategories from "@components/catalog/CatalogCategories/CatalogCategories";
import CatalogFilters from "@components/catalog/CatalogFilters/CatalogFilters";
import CatalogSidebar from "@components/catalog/CatalogSidebar/CatalogSidebar";
import { getProductImageUrl } from "@utils/getProductImage";
import Pagination from "../../components/common/Pagination/Pagination";
import { useSearch } from "../../context/SearchContext";

export default function Catalog() {
  const API_URL = import.meta.env.VITE_API_URL;

  const [allProducts, setAllProducts] = useState([]);     // всі товари з бекенду
  const [filteredProducts, setFilteredProducts] = useState([]); // після фільтрації

  // UI state
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // Фільтри
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [priceFrom, setPriceFrom] = useState(undefined);
  const [priceTo, setPriceTo] = useState(undefined);
  const [sortBy, setSortBy] = useState("");
  const [aZ, setAZ] = useState("");

  const { searchTerm } = useSearch();

  // Пагінація
  const [page, setPage] = useState(1);
  const size = 12;
useEffect(() => {
  if (allProducts.length > 0) {
    console.log("One product example:", allProducts[0]);
  }
}, [allProducts]);

  // 1) Завантажуємо ВСІ продукти один раз
  useEffect(() => {
    const loadProducts = async () => {
      setIsLoading(true);
      setErrorMessage("");

      try {
        const res = await fetch(`${API_URL}/api/v1/catalog`, {
          method: "GET",
          headers: { accept: "application/json" },
        });

        if (!res.ok) throw new Error(`Request failed ${res.status}`);

        const data = await res.json();

        setAllProducts(Array.isArray(data) ? data : data.content || []);
      } catch (e) {
        setErrorMessage(e.message || "Network error");
      } finally {
        setIsLoading(false);
      }
    };

    loadProducts();
  }, [API_URL]);

  // 2) Повний фільтраційний пайплайн (фільтр → сортування → результати)
  useEffect(() => {
  let result = [...allProducts];

  // Пошук
  if (searchTerm.trim()) {
    result = result.filter((p) =>
      p.productName?.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }

  // Категорія (бо categories — масив!)
  if (selectedCategory) {
    result = result.filter((p) =>
      p.categories?.some(cat => cat.categoryName === selectedCategory)
    );
  }

  // Бренд (бо бренд — об'єкт!)
  if (selectedBrands.length > 0) {
    result = result.filter((p) =>
      p.brand?.brandName === selectedBrands[0]
    );
  }

  // Ціна
  if (priceFrom !== undefined) {
  result = result.filter((p) => {
    const price = Number(p.price);
    return !isNaN(price) && price >= priceFrom;
  });
}

if (priceTo !== undefined) {
  result = result.filter((p) => {
    const price = Number(p.price);
    return !isNaN(price) && price <= priceTo;
  });
}


  // Сортування за ціною
  if (sortBy === "price_asc") result.sort((a, b) => a.price - b.price);
  if (sortBy === "price_desc") result.sort((a, b) => b.price - a.price);

  // A-Z
  if (aZ === "asc") result.sort((a, b) => a.productName.localeCompare(b.productName));
  if (aZ === "desc") result.sort((a, b) => b.productName.localeCompare(a.productName));

  // Повернення на першу сторінку
  setPage(1);

  setFilteredProducts(result);
}, [
  allProducts,
  searchTerm,
  selectedCategory,
  selectedBrands,
  priceFrom,
  priceTo,
  sortBy,
  aZ,
]);
console.log("PRICE DEBUG:", allProducts.map(p => [p.productName, p.price, typeof p.price]));


  // 3) Пагінація (локальна)
  const totalProducts = filteredProducts.length;
  const totalPages = Math.ceil(totalProducts / size);

  const paginatedProducts = filteredProducts.slice((page - 1) * size, page * size);

  return (
    <>
      <Banner />

      <div className={styles.top}>
        <h2 className={styles.title}>Catalog</h2>
      </div>

      <CatalogCategories />

      <div className={styles.container}>
        <div className={styles.catalogContent}>
          {/* Сайдбар фільтрів */}
          <CatalogSidebar
            selectedBrands={selectedBrands}
            onBrandsChange={setSelectedBrands}
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
            priceFrom={priceFrom}
            priceTo={priceTo}
            onPriceChange={({ min, max }) => {
              setPriceFrom(min);
              setPriceTo(max);
            }}
          />

          <div className={styles.mainContent}>
            {/* Панель фільтрів + сортування */}
            <CatalogFilters
              sortBy={sortBy}
              onSortByChange={setSortBy}
              aZ={aZ}
              onAZChange={setAZ}
              size={size}
            />

            {/* Показ активних фільтрів */}
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
              resultsCount={filteredProducts.length}
            />

            {/* Контент */}
            {isLoading && <div className={styles.innerCards}>Loading...</div>}
            {!isLoading && errorMessage && (
              <div className={styles.innerCards} style={{ color: "#c62828" }}>
                {errorMessage}
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

            {/* Пагінація */}
            <Pagination
              currentPage={page}
              totalPages={totalPages}
              onPageChange={setPage}
            />
          </div>
        </div>
      </div>

      <NewsLetter />
    </>
  );
}
