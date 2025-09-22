// utils/getProductImageUrl.js
import tomatoes_5 from '@assets/images/tomatoes_5.png';

const BASE_URL = import.meta.env.VITE_API_URL || "";

/**
 * Повертає URL зображення продукту.
 * Підтримує: прямі URL, об'єкти з url, масиви зображень.
 * @param {Object|Array|string} input - продукт, масив зображень або рядок URL
 * @returns {string} - готовий URL або запасне зображення
 */
export function getProductImageUrl(input) {
  if (!input) return tomatoes_5;

  let image;

  // Якщо об'єкт продукту з масивом images
  if (typeof input === "object" && input.images) {
    image = input.images[0];
  } 
  // Якщо просто масив
  else if (Array.isArray(input)) {
    image = input[0];
  } 
  // Якщо рядок (URL)
  else if (typeof input === "string") {
    image = input;
  }

  // Якщо image об'єкт з url
  if (image && typeof image === "object" && image.url) {
    // якщо URL починається з http → повертаємо як є
    if (image.url.startsWith("http")) return image.url;
    return `${BASE_URL}${image.url}`;
  }

  // Якщо image рядок
  if (typeof image === "string") {
    if (image.startsWith("http")) return image;
    return `${BASE_URL}${image}`;
  }

  // Запасне зображення
  return tomatoes_5;
}


// import tomatoes_5 from '@assets/images/tomatoes_5.png';

// export function getProductImageUrl(product) {
//   const API_URL = import.meta.env.VITE_API_URL;

//   if (!product) return tomatoes_5;

//   const url = product.images?.[0]?.url || '';
//   if (!url) return tomatoes_5;

//   if (url.startsWith('/')) {
//     const base = (API_URL || '').replace(/\/+$/, '');
//     return `${base}${url}`;
//   }

//   return url;
// }

// const STRAPI_URL = import.meta.env.VITE_API_URL || "http://localhost:1337";

// export function getProductImageUrl(image) {
//   if (!image) return null;

//   // якщо image вже готовий URL
//   if (typeof image === "string" && image.startsWith("http")) {
//     return image;
//   }

//   // якщо image — це просто рядок з /uploads
//   if (typeof image === "string") {
//     return `${STRAPI_URL}${image}`;
//   }

//   // якщо image — це об'єкт з data/attributes
//   if (image?.url) {
//     return `${STRAPI_URL}${image.url}`;
//   }

//   return null;
// }