import data from "../../data/articles.json";
import {Link} from "react-router-dom";
import styles from "./RelatedArticles.module.css";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const RelatedArticles = () => {
 const relatedArticles = data.slice(0, 12);

 const settings = {
  dots: true,
  infinite: true,
  slidesToShow: 3,
  slidesToScroll: 1,
  arrows: false,
  autoplay: true,
  autoplaySpeed: 3000,
  speed: 500,
  pauseOnHover: true,
  pauseOnFocus: true,
  pauseOnDotsHover: true,
  appendDots: (dots) => (
   <div>
    <ul style={{margin: "0px", display: "flex"}}> {dots} </ul>
   </div>
  ),
  customPaging: () => (
   <button
    style={{
     width: "10px",
     height: "10px",
     borderRadius: "50%",
     background: "#2D6B41",

     border: "none",
     cursor: "pointer",
    }}
   ></button>
  ),
 };

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

   <div className={styles.sliderContainer}>
    <Slider
     {...settings}
     className={styles.slideWrapper}
    >
     {relatedArticles.map((article) => (
      <div
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
      </div>
     ))}
    </Slider>
   </div>
  </div>
 );
};
export default RelatedArticles;
