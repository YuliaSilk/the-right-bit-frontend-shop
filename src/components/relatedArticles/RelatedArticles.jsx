import data from "../../data/articles.json";
import {Link} from "react-router-dom";
import styles from "./RelatedArticles.module.css";

const RelatedArticles = () => {
 const relatedArticles = data.slice(0, 3);
 return (
  <div className={styles.relatedArticlesCont}>
   <div className={styles.titleCont}>
    <div>
     <h3 className={styles.title}>More Articles</h3>
    </div>
    <div>
     <Link
      to="/news"
      className={styles.showMore}
     >
      Show More
      <svg
       width="20"
       height="20"
       viewBox="0 0 20 20"
       fill="none"
       xmlns="http://www.w3.org/2000/svg"
       className="ml-1"
      >
       <path
        d="M7.5 15L12.5 10L7.5 5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
       />
      </svg>
     </Link>
    </div>
   </div>

   <div className={styles.itemsContainer}>
    <ul className={styles.itemsList}>
     {relatedArticles.map((article) => (
      <li
       key={article.id}
       className={styles.item}
      >
       <Link to={`/news/${article.slug}`}>
        <img
         src={article.imageMain.url}
         alt={article.imageMain.alt || article.title}
         className={styles.image}
        />
        <div className={styles.content}>
         <h3 className={styles.titleItem}>{article.title}</h3>
         <p className={styles.readingTime}>{article.readTime}</p>
        </div>
       </Link>
      </li>
     ))}
    </ul>
   </div>
  </div>
 );
};
export default RelatedArticles;
