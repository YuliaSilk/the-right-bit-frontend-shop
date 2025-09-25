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
      style={{
       backgroundColor: "#2D5A3D",
       color: "white",
       padding: "8px 16px",
       borderRadius: "20px",
       textDecoration: "none",
       fontSize: "14px",
       fontWeight: "500",
       transition: "background-color 0.3s ease",
      }}
      onMouseEnter={(e) => {
       e.target.style.backgroundColor = "#1e3d2a";
      }}
      onMouseLeave={(e) => {
       e.target.style.backgroundColor = "#2D5A3D";
      }}
     >
      Read more
     </Link>
    </button>
   </div>
  </div>
 );
}
