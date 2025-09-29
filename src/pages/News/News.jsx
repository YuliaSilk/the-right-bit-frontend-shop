import {useState} from "react";
import styles from "./News.module.css";
import NewsCard from "@/components/news/NewCard/NewCard";
import articles from "@/data/articles.json";

export default function News() {
 const [currentPage, setCurrentPage] = useState(1);

 const ItemsPerRage = 6;
 const totalPages = Math.ceil(articles.length / ItemsPerRage);
 const startIndexPage = (currentPage - 1) * ItemsPerRage;
 const currrentArticles = articles.slice(startIndexPage, startIndexPage + ItemsPerRage);

 const goToPrev = () => {
  if (currentPage > 1) {
   setCurrentPage(currentPage - 1);
  }
 };

 const goToNext = () => {
  if (currentPage < totalPages) {
   setCurrentPage(currentPage + 1);
  }
 };

 return (
  <>
   <div className={styles.back}>
    <h1 className={styles.title}>News</h1>
   </div>
   <div className={styles.wrapper}>
    <div className={styles.list}>
     {currrentArticles.map((article) => (
      <NewsCard
       key={article.id}
       title={article.title}
       description={article.subTitle}
       date={article.date}
       readTime={article.readTime}
       image={article.imageMain.url}
       excerpt={article.excerpt}
       article={article}
      />
     ))}
    </div>
    <div className={styles.pagination}>
     <button
      className={styles.buttonArrow}
      onClick={goToPrev}
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

     {Array.from({length: totalPages}, (_, index) => index + 1).map((num) => (
      <button
       key={num}
       onClick={() => setCurrentPage(num)}
       style={{
        width: "32px",
        height: "32px",
        borderRadius: "50%",
        border: currentPage === num ? "2px solid #2D5A3D" : "1px solid var(--accent-color-super-light)",
        backgroundColor: currentPage === num ? "#2D5A3D" : "var(--accent-color-super-light)",
        color: currentPage === num ? "white" : "#333",
        cursor: "pointer",
        fontSize: "14px",
        fontWeight: currentPage === num ? "500" : "400",
       }}
      >
       {num}
      </button>
     ))}

     <button
      className={styles.buttonArrow}
      onClick={goToNext}
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
   </div>
  </>
 );
}
