import {useState} from "react";
import styles from "./News.module.css";
import NewsCard from "@/components/news/NewCard/NewCard";
import articles from "@/data/articles.json";

export default function News() {
 const [currentPage, setCurrentPage] = useState(1);

 return (
  <>
   <div className={styles.back}>
    <h1 className={styles.title}>News</h1>
   </div>
   <div className={styles.wrapper}>
    <div className={styles.list}>
     {articles.map((article) => (
      <NewsCard
       key={article.id}
       title={article.title}
       description={article.subTitle} // або використай інше поле
       date={article.date}
       readTime={article.readTime}
       image={article.imageMain.url}
       excerpt={article.excerpt}
       article={article}
      />
     ))}
    </div>
    {/* Pagination */}
    <div
     style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      gap: "8px",
     }}
    >
     <button
      style={{
       width: "32px",
       height: "32px",
       borderRadius: "50%",
       border: "1px solid #ddd",
       backgroundColor: "white",
       cursor: "pointer",
       display: "flex",
       alignItems: "center",
       justifyContent: "center",
      }}
     >
      ←
     </button>

     {[1, 2, 3, 4, 5].map((num) => (
      <button
       key={num}
       onClick={() => setCurrentPage(num)}
       style={{
        width: "32px",
        height: "32px",
        borderRadius: "50%",
        border: currentPage === num ? "2px solid #2D5A3D" : "1px solid #ddd",
        backgroundColor: currentPage === num ? "#2D5A3D" : "white",
        color: currentPage === num ? "white" : "#333",
        cursor: "pointer",
        fontSize: "14px",
        fontWeight: "500",
       }}
      >
       {num}
      </button>
     ))}

     <button
      style={{
       width: "32px",
       height: "32px",
       borderRadius: "50%",
       border: "1px solid #ddd",
       backgroundColor: "white",
       cursor: "pointer",
       display: "flex",
       alignItems: "center",
       justifyContent: "center",
      }}
     >
      →
     </button>
    </div>
   </div>
  </>
 );
}
