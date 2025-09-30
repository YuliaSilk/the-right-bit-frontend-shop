import React from "react";
import {Link} from "react-router-dom";
import styles from "./Breadcrumbs.module.css";

/**
 * @param {Object} props
 * @param {string} props.backTitle - Назва попередньої сторінки (наприклад "News").
 * @param {string} props.backPath - Шлях до попередньої сторінки (наприклад "/news").
 */
const Breadcrumbs = ({backTitle, backPath}) => {
 if (!backTitle || !backPath) return null;

 return (
  <nav
   className={styles.breadcrumbsNav}
   aria-label="Breadcrumb"
  >
   <Link
    to={backPath}
    className={styles.breadcrumbsLink}
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
    {backTitle}
   </Link>
  </nav>
 );
};

export default Breadcrumbs;
// import React from "react";
// import {Link} from "react-router-dom";
// import styles from "./Breadcrumbs.module.css";

// /**

//  * * @param {Array<Object>} segments - Масив об'єктів { title: string, path: string }.
//  * Останній елемент вважається поточною сторінкою.
//  */
// const Breadcrumbs = ({segments}) => {
//  if (!segments || segments.length <= 1) {
//   return null;
//  }

//  return (
//   <nav
//    aria-label="Breadcrumb"
//    className={styles.breadcrumbsNav}
//    //  className="text-sm font-medium text-gray-500 flex items-center space-x-2 my-4"
//    // 2. Мікророзмітка для SEO (BreadcrumbList Schema)
//    itemScope
//    itemType="http://schema.org/BreadcrumbList"
//   >
//    {segments.map((segment, index) => {
//     const isLast = index === segments.length - 1;
//     // Використовуємо шлях як ключ
//     const segmentKey = segment.path + index;

//     return (
//      <React.Fragment key={segmentKey}>
//       {index !== 0 && (
//        <svg
//         // Змінено класи для меншого розміру (h-4 w-4) та меншого відступу (mr-1)
//         className={styles.breadcrumbsArrow}
//         viewBox="0 0 24 24"
//         strokeWidth="1.5"
//         stroke="currentColor"
//         fill="none"
//         aria-hidden="true"
//        >
//         {/* SVG для знаку "<" або стрілки ліворуч */}
//         <path
//          strokeLinecap="round"
//          strokeLinejoin="round"
//          d="M15.375 5.75L8.625 12.5L15.375 19.25"
//         />
//        </svg>
//       )}

//       {/* Елемент списку хлібних крихт */}
//       <div
//        itemProp="itemListElement"
//        itemScope
//        itemType="http://schema.org/ListItem"
//        className={styles.breadcrumbsItem}
//       >
//        {isLast ? (
//         <span
//          className={styles.currentPage}
//          aria-current="page"
//          itemProp="name"
//         >
//          {segment.title}
//         </span>
//        ) : (
//         <Link
//          to={segment.path}
//          className={styles.breadcrumbsLink}
//          itemProp="item"
//         >
//          <span itemProp="name">{segment.title}</span> {/* Назва посилання */}
//         </Link>
//        )}
//        {/* Позиція елемента в списку */}
//        <meta
//         itemProp="position"
//         content={(index + 1).toString()}
//        />
//       </div>
//      </React.Fragment>
//     );
//    })}
//   </nav>
//  );
// };

// export default Breadcrumbs;
