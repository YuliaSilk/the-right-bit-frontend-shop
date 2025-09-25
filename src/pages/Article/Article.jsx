import React from "react";
import styles from "./Article.module.css";
import articles from "@/data/articles.json";
import {Link, useParams} from "react-router-dom";

const Article = () => {
 const {slug} = useParams();
 const article = articles.find((a) => a.slug === slug);
 if (!article) {
  return <div>Article not found</div>;
 }
 const {title, imageMain, excerpt, date, readTime, relatedArticles, body} = article;

 return (
  <div className={styles.container}>
   <div
    style={{
     maxWidth: "800px",
     margin: "0 auto",
     padding: "40px 24px",
    }}
   >
    {/* Back Button */}
    <div>
     <button className={styles.backButton}>
      <svg
       width="24"
       height="24"
       viewBox="0 0 24 24"
       fill="none"
       xmlns="http://www.w3.org/2000/svg"
      >
       <path
        d="M15.375 5.25L8.625 12L15.375 18.75"
        stroke="black"
        strokeWidth="1.5"
        strokeMiterlimit="10"
        strokeLinecap="square"
       />
      </svg>
      <Link
       className={styles.breadcrumbs}
       to="/news"
      >
       News
      </Link>
     </button>
    </div>

    {/* Article Header */}
    <h1
     style={{
      fontSize: "36px",
      fontWeight: "bold",
      color: "#2D5A3D",
      marginBottom: "16px",
      lineHeight: "1.3",
     }}
    >
     {title}
    </h1>

    <div
     style={{
      display: "flex",
      gap: "16px",
      marginBottom: "32px",
      fontSize: "14px",
      color: "#666",
     }}
    >
     <span>{date}</span>
     <span>Reading time: {readTime}</span>
     {/* {author && <span>By {author}</span>} */}
    </div>
    <div>
     {/* Featured Image */}
     {imageMain && (
      <img
       src={imageMain.url}
       alt={imageMain.alt || title}
       style={{
        width: "100%",
        height: "400px",
        objectFit: "cover",
        borderRadius: "12px",
        marginBottom: "32px",
       }}
      />
     )}
     <p>{excerpt}</p>
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
           className="w-full rounded-xl shadow-md"
          />
         </div>
        );
       }
       if (block.type === "heading") {
        return (
         <h4
          key={index}
          className="text-2xl font-semibold text-green-800 mt-8 mb-4"
         >
          {block.subtitle}
         </h4>
        );
       }
       if (block.type === "paragraph") {
        return (
         <p
          key={index}
          className="mb-4 text-gray-700 leading-relaxed"
         >
          {block.text}
         </p>
        );
       }
       return null;
      })}
     {/* <p>{excerpt}</p>
     <h4>{subTitle}</h4>
     <p>{excerpt}</p>
     <p>{excerpt}</p>
     <image>{image}</image>
     <h4>{subTitle}</h4>
     <p>{excerpt}</p>
     <p>{excerpt}</p>
     <p>{excerpt}</p> */}
    </div>

    {/* Related Articles */}
    {relatedArticles?.length > 0 && (
     <div className="mt-16 p-8 bg-white rounded-2xl shadow-lg">
      <div className="flex justify-between items-center mb-6">
       <h3 className="text-2xl font-semibold text-green-800">More Articles</h3>
       <Link
        to="/news"
        className="flex items-center font-medium text-sm text-green-700 hover:text-green-900"
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

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
       {relatedArticles.slice(0, 3).map((relatedArticle) => (
        <Link
         key={relatedArticle.id}
         to={`/news/${relatedArticle.slug}`}
         className="block p-4 bg-gray-50 rounded-lg transition-transform transform hover:scale-105"
        >
         <img
          src={relatedArticle.image.url}
          alt={relatedArticle.title}
          className="w-full h-[120px] object-cover rounded-lg mb-4"
         />
         <h4 className="text-base font-semibold text-green-800 mb-2 leading-snug">{relatedArticle.title}</h4>
         <p className="text-xs text-gray-500">{relatedArticle.readingTime}</p>
        </Link>
       ))}
      </div>
     </div>
    )}
   </div>
  </div>
 );
};

export default Article;
