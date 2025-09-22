// utils/getProductImageUrl.js
import tomatoes_5 from '@/assets/images/tomatoes_5.png';

const BASE_URL = import.meta.env.VITE_API_URL || "";

/**
 * Повертає URL зображення продукту.
 * Підтримує: прямі URL, об'єкти з url, масиви зображень.
 * @param {Object|Array|string} input - продукт, масив зображень або рядок URL
 * @returns {string} - готовий URL або запасне зображення
 */
export function getProductImageUrl(input) {
  console.log('getProductImageUrl input:', input); // Для дебагу
  
  if (!input) {
    console.log('No input, returning fallback');
    return tomatoes_5;
  }

  let imageUrl = null;

  // Якщо це рядок (прямий URL)
  if (typeof input === "string") {
    imageUrl = input;
  }
  // Якщо це об'єкт продукту з масивом images
  else if (input && typeof input === "object" && Array.isArray(input.images) && input.images.length > 0) {
    const firstImage = input.images[0];
    
    if (typeof firstImage === "string") {
      imageUrl = firstImage;
    } else if (firstImage && firstImage.url) {
      imageUrl = firstImage.url;
    }
  }
  // Якщо це просто масив зображень
  else if (Array.isArray(input) && input.length > 0) {
    const firstImage = input[0];
    
    if (typeof firstImage === "string") {
      imageUrl = firstImage;
    } else if (firstImage && firstImage.url) {
      imageUrl = firstImage.url;
    }
  }
  // Якщо це об'єкт з url
  else if (input && input.url) {
    imageUrl = input.url;
  }

  console.log('Extracted imageUrl:', imageUrl);

  // Обробляємо знайдений URL
  if (imageUrl) {
    // Якщо URL вже повний (починається з http/https)
    if (imageUrl.startsWith("http")) {
      console.log('Returning full URL:', imageUrl);
      return imageUrl;
    }
    
    // Якщо відносний URL (починається з /)
    if (imageUrl.startsWith("/")) {
      const fullUrl = `${BASE_URL}${imageUrl}`;
      console.log('Returning relative URL as full:', fullUrl);
      return fullUrl;
    }
    
    // Інші випадки
    const fullUrl = `${BASE_URL}/${imageUrl}`;
    console.log('Returning constructed URL:', fullUrl);
    return fullUrl;
  }

  // Fallback якщо нічого не знайшли
  console.log('No URL found, returning fallback');
  return tomatoes_5;
}
// import tomatoes_5 from '@assets/images/tomatoes_5.png';

// const BASE_URL = import.meta.env.VITE_API_URL || "";

// /**
//  * Повертає URL зображення продукту.
//  * Підтримує: прямі URL, об'єкти з url, масиви зображень.
//  * @param {Object|Array|string} input - продукт, масив зображень або рядок URL
//  * @returns {string} - готовий URL або запасне зображення
//  */
// export function getProductImageUrl(input) {
//   if (!input) return tomatoes_5;

//   let image;

//   // Якщо об'єкт продукту з масивом images
//   if (typeof input === "object" && input.images) {
//     image = input.images[0];
//   } 
//   // Якщо просто масив
//   else if (Array.isArray(input)) {
//     image = input[0];
//   } 
//   // Якщо рядок (URL)
//   else if (typeof input === "string") {
//     image = input;
//   }

//   // Якщо image об'єкт з url
//   if (image && typeof image === "object" && image.url) {
//     // якщо URL починається з http → повертаємо як є
//     if (image.url.startsWith("http")) return image.url;
//     return `${BASE_URL}${image.url}`;
//   }

//   // Якщо image рядок
//   if (typeof image === "string") {
//     if (image.startsWith("http")) return image;
//     return `${BASE_URL}${image}`;
//   }

//   // Запасне зображення
//   return tomatoes_5;
// }


