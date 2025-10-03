import tomatoes_5 from "@/assets/images/tomatoes_5.png";

const BASE_URL = import.meta.env.VITE_API_URL || "";

/**
 * Повертає URL зображення продукту.
 * Підтримує: прямі URL, об'єкти з url, масиви зображень.
 * @param {Object|Array|string} input - продукт, масив зображень або рядок URL
 * @returns {string} - готовий URL або запасне зображення
 */
export function getProductImageUrl(input) {
 if (!input) {
  return tomatoes_5;
 }

 let imageUrl = null;

 if (typeof input === "string") {
  imageUrl = input;
 } else if (input && typeof input === "object" && Array.isArray(input.images) && input.images.length > 0) {
  const firstImage = input.images[0];

  if (typeof firstImage === "string") {
   imageUrl = firstImage;
  } else if (firstImage && firstImage.url) {
   imageUrl = firstImage.url;
  }
 } else if (Array.isArray(input) && input.length > 0) {
  const firstImage = input[0];

  if (typeof firstImage === "string") {
   imageUrl = firstImage;
  } else if (firstImage && firstImage.url) {
   imageUrl = firstImage.url;
  }
 } else if (input && input.url) {
  imageUrl = input.url;
 }

 if (imageUrl) {
  if (imageUrl.startsWith("http")) {
   return imageUrl;
  }

  if (imageUrl.startsWith("/")) {
   const fullUrl = `${BASE_URL}${imageUrl}`;
   return fullUrl;
  }

  const fullUrl = `${BASE_URL}/${imageUrl}`;
  return fullUrl;
 }

 // console.log('No URL found, returning fallback');
 return tomatoes_5;
}
