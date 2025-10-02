import React from "react";
import {Link} from "react-router-dom";
import styles from "./Breadcrumbs.module.css";

/**
 * @param {Array<Object>} items - Масив об'єктів { title: string, path?: string }.
 * @param {boolean} hideCurrent - Якщо true, то поточна сторінка не буде відображатися.
 */
const Breadcrumbs = ({items, hideCurrent = false}) => {
 if (!items || items.length === 0) return null;

 // Якщо треба сховати останню сторінку
 const visibleItems = hideCurrent ? items.slice(0, -1) : items;

 if (visibleItems.length === 0) return null;

 return (
  <nav
   className={styles.breadcrumbsNav}
   aria-label="Breadcrumb"
   itemScope
   itemType="http://schema.org/BreadcrumbList"
  >
   {visibleItems.map((item, index) => {
    const isLast = index === visibleItems.length - 1;

    return (
     <div
      key={item.path || index}
      itemProp="itemListElement"
      itemScope
      itemType="http://schema.org/ListItem"
      className={styles.breadcrumbsItem}
     >
      {isLast && !hideCurrent ? (
       // поточна сторінка як текст
       <span
        className={styles.currentPage}
        aria-current="page"
        itemProp="name"
       >
        {item.title}
       </span>
      ) : (
       // клікабельне посилання
       <Link
        to={item.path || "#"}
        className={styles.breadcrumbsLink}
        itemProp="item"
       >
        <svg
         className={styles.breadcrumbsArrow}
         viewBox="0 0 24 24"
         strokeWidth="1.5"
         stroke="currentColor"
         fill="none"
         aria-hidden="true"
        >
         <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M15.375 5.75L8.625 12.5L15.375 19.25"
         />
        </svg>
        <span itemProp="name">{item.title}</span>
       </Link>
      )}
      <meta
       itemProp="position"
       content={(index + 1).toString()}
      />
     </div>
    );
   })}
  </nav>
 );
};

export default Breadcrumbs;
