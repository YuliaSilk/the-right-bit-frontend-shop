import more from "@assets/icons/more.png";
import styles from "./PostArticle.module.css";
import data from "../../../data/articles.json";
import {Link} from "react-router-dom";

export default function PostArticle() {
 return (
  <div className={styles.block}>
   <div className={styles.list}>
    <h2 className={styles.title}>Latest Posts & Articles</h2>
    <div className={styles.container}>
     <ul className={styles.articleList}>
      {data.slice(0, 3).map((article) => (
       <li
        key={article.id}
        limit={3}
       >
        <Link to={`/news/${article.slug}`}>
         <img
          src={article.imageMain.url}
          alt={article.imageMain.alt || article.title}
          className={styles.image}
         />
         <div className={styles.contentWrap}>
          <div className={styles.content}>
           <p className={styles.date}>{article.date}</p>
           <h3 className={styles.titleItem}>{article.title}</h3>
          </div>

          <img
           src={more}
           alt={name}
           style={{cursor: "pointer", width: "42px", height: "42px"}}
          />
         </div>
        </Link>
       </li>
      ))}
     </ul>
    </div>
   </div>
  </div>
 );
}
