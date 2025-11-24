// src/utils/filterProducts.js
export function filterProducts(products, {searchTerm, selectedCategory, selectedBrands, priceFrom, priceTo}) {
 const term = (searchTerm || "").toLowerCase();

 return products
  .filter((p) => p.productName?.toLowerCase().startsWith(term)) // або includes для гнучкішого пошуку
  .filter((p) => (selectedCategory ? p.categories?.some((c) => c.categoryName === selectedCategory) : true))
  .filter((p) => (selectedBrands?.length ? p.brand?.brandName === selectedBrands[0] : true))
  .filter((p) => (priceFrom || priceTo ? p.price >= (priceFrom || 0) && p.price <= (priceTo || Infinity) : true));
}
