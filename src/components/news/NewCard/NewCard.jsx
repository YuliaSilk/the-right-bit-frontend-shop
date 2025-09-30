import styles from "./NewCard.module.css";
import {Link} from "react-router-dom";
// import articles from "@/data/articles.json";

export default function NewsCard({title, description, date, readTime, image, excerpt, article}) {
 return (
  <div className={styles.card}>
   <div className={styles.imageWrapper}>
    <img
     className={styles.image}
     src={image}
     alt={title}
    />
   </div>
   <div className={styles.content}>
    <div className={styles.contentTop}>
     <div className={styles.contentHeader}>
      <h3 className={styles.contentTitle}>{title}</h3>
      <p className={styles.contentExcerpt}>{excerpt}</p>
     </div>
     <div className={styles.meta}>
      <span>{date}</span>
      <span>Reading time: {readTime}</span>
     </div>
    </div>
    <p className={styles.contentDescription}>{description}</p>

    <button className={styles.button}>
     <Link
      to={`/news/${article.slug}`}
      className={styles.linkToArticle}
     >
      Read more
     </Link>
    </button>
   </div>
  </div>
 );
}
