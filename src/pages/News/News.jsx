import {useState} from "react";
import styles from "./News.module.css";
import NewsCard from "@/components/news/NewCard/NewCard";
import articles from "@/data/articles.json";
import Pagination from "../../components/common/Pagination/Pagination";

export default function News() {
 const [currentPage, setCurrentPage] = useState(1);

 const ItemsPerRage = 6;
 const totalPages = Math.ceil(articles.length / ItemsPerRage);
 const startIndexPage = (currentPage - 1) * ItemsPerRage;
 const currrentArticles = articles.slice(startIndexPage, startIndexPage + ItemsPerRage);

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
    <Pagination
     currentPage={currentPage}
     totalPages={totalPages}
     onPageChange={setCurrentPage}
    />
   </div>
  </>
 );
}
