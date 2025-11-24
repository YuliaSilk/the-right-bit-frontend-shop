export const normalize = (str) =>
 str
  .toLowerCase()
  .trim()
  .normalize("NFD")
  .replace(/\p{Diacritic}/gu, "");

export const searchProducts = (products, query) => {
 const q = normalize(query);
 if (!q) return [];
 return products.filter((prod) => {
  const name = normalize(prod.productName);
  const firstWord = name.split(" ")[0];
  return firstWord.startsWith(q);
 });
};

export const highlightMatch = (text, query) => {
 const cleanedText = text;
 const cleanedQuery = normalize(query);
 if (!cleanedQuery) return cleanedText;
 const index = normalize(text).indexOf(cleanedQuery);
 if (index === -1) return cleanedText;
 return (
  cleanedText.substring(0, index) +
  "<mark>" +
  cleanedText.substring(index, index + query.length) +
  "</mark>" +
  cleanedText.substring(index + query.length)
 );
};
