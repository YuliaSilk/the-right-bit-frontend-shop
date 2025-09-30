import React from "react";
import styles from "./Pagination.module.css";

export default function Pagination({currentPage, totalPages, onPageChange}) {
 if (totalPages <= 1) return null;

 // побудова масиву сторінок з крапками
 const getPaginationRange = () => {
  const totalNumbers = 3; // поточна + 2 сусідні
  const totalBlocks = totalNumbers + 2; // враховуємо першу й останню

  if (totalPages <= totalBlocks) {
   return Array.from({length: totalPages}, (_, i) => i + 1);
  }

  const startPage = Math.max(2, currentPage - 1);
  const endPage = Math.min(totalPages - 1, currentPage + 1);
  let pages = [1];

  if (startPage > 2) {
   pages.push("...");
  }

  for (let i = startPage; i <= endPage; i++) {
   pages.push(i);
  }

  if (endPage < totalPages - 1) {
   pages.push("...");
  }

  pages.push(totalPages);

  return pages;
 };

 return (
  <div className={styles.pagination}>
   <button
    className={styles.buttonArrow}
    onClick={() => onPageChange(currentPage - 1)}
    disabled={currentPage === 1}
   >
    <svg
     xmlns="http://www.w3.org/2000/svg"
     width="8"
     height="14"
     viewBox="0 0 8 14"
     fill="none"
    >
     <path
      d="M6.91797 1.16536L1.08464 6.9987L6.91797 12.832"
      stroke="#B3B3B3"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
     />
    </svg>
   </button>

   {getPaginationRange().map((num, idx) =>
    num === "..." ? (
     <span
      key={`dots-${idx}`}
      className={styles.dots}
     >
      ...
     </span>
    ) : (
     <button
      key={`page-${num}-${idx}`}
      onClick={() => onPageChange(num)}
      className={`${styles.pageButton} ${currentPage === num ? styles.active : ""}`}
     >
      {num}
     </button>
    )
   )}

   <button
    className={styles.buttonArrow}
    onClick={() => onPageChange(currentPage + 1)}
    disabled={currentPage === totalPages}
   >
    <svg
     xmlns="http://www.w3.org/2000/svg"
     width="8"
     height="14"
     viewBox="0 0 8 14"
     fill="none"
    >
     <path
      d="M1.08203 1.16536L6.91536 6.9987L1.08203 12.832"
      stroke="#1A1A1A"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
     />
    </svg>
   </button>
  </div>
 );
}
