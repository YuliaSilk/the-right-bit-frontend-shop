import React from "react";
import styles from "./Article.module.css";
import articles from "@/data/articles.json";
import {Link, useParams} from "react-router-dom";
import RelatedArticles from "../../components/relatedArticles/RelatedArticles";
import Breadcrumbs from "../../components/common/Breadcrumbs/Breadcrumbs";

const Article = () => {
 const {slug} = useParams();
 const article = articles.find((a) => a.slug === slug);
 if (!article) {
  return <div>Article not found</div>;
 }
 const {title, imageMain, excerpt, date, readTime, body} = article;

 return (
  <section className={styles.section}>
   <div className={styles.container}>
    <Breadcrumbs
     items={[{title: "News", path: "/news"}, {title: "article"}]}
     hideCurrent
    />
    <div className={styles.content}>
     <h1 className={styles.title}>{title}</h1>

     <div className={styles.data}>
      <span>{date}</span>
      <span>Reading time: {readTime}</span>
      {/* {author && <span>By {author}</span>} */}
     </div>
     <div>
      {imageMain && (
       <img
        src={imageMain.url}
        alt={imageMain.alt || title}
        className={styles.image}
       />
      )}
      <p className={styles.paragraph}>{excerpt}</p>
      {body &&
       body.map((block, index) => {
        if (block.type === "image") {
         return (
          <div
           key={index}
           className="my-8"
          >
           <img
            src={block.url}
            alt={block.alt || title}
            className={styles.image}
           />
          </div>
         );
        }
        if (block.type === "heading") {
         return (
          <h4
           key={index}
           className={styles.heading}
          >
           {block.subtitle}
          </h4>
         );
        }
        if (block.type === "paragraph") {
         return (
          <p
           key={index}
           className={styles.paragraph}
          >
           {block.text}
          </p>
         );
        }
        return null;
       })}
     </div>
    </div>
   </div>
   <RelatedArticles />
  </section>
 );
};

export default Article;
