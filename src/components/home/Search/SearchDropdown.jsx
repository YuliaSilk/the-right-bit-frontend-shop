import styles from "./SearchDropdown.module.css";
import {Link} from "react-router-dom";
import {getProductImageUrl} from "@/utils/getProductImage";

export default function SearchDropdown({searchTerm, results, onSelect}) {
 if (!searchTerm?.trim() || results.length === 0) return null;

 return (
  <div className={styles.dropdown}>
   {results.slice(0, 8).map((item) => (
    <Link
     key={item.id}
     to={`/catalog/${item.id}`} // ✅ Перехід на сторінку товару
     className={styles.item}
     onClick={() => onSelect && onSelect(item.productName)} // ✅ Без preventDefault
    >
     <img
      src={getProductImageUrl(item)}
      alt={item.productName}
      className={styles.image}
     />
     <div className={styles.info}>
      <p className={styles.name}>{item.productName}</p>
      <p className={styles.price}>€{item.price}</p>
     </div>
    </Link>
   ))}

   {/* ✅ Додай кнопку "See all results" */}
   {results.length > 8 && (
    <div className={styles.seeAll}>
     <Link
      to={`/catalog?search=${encodeURIComponent(searchTerm)}`}
      className={styles.seeAllLink}
     >
      See all {results.length} results →
     </Link>
    </div>
   )}
  </div>
 );
}
// import styles from "./SearchDropdown.module.css";
// import {Link} from "react-router-dom";
// import {getProductImageUrl} from "@/utils/getProductImage";

// export default function SearchDropdown({searchTerm, results, onSelect}) {
//  if (!searchTerm?.trim() || results.length === 0) return null;

//  return (
//   <div className={styles.dropdown}>
//    {results.slice(0, 8).map((item) => (
//     <div
//      key={item.id}
//      className={styles.item}
//      onClick={() => onSelect(item.productName)}
//     >
//      <img
//       src={getProductImageUrl(item)}
//       alt={item.productName}
//       className={styles.image}
//      />
//      <div className={styles.info}>
//       <p className={styles.name}>{item.productName}</p>
//       <p className={styles.price}>${item.price}</p>
//      </div>
//     </div>
//    ))}
//   </div>
//  );
// }
