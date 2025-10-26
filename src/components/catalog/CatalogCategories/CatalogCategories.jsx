import {useEffect, useState} from "react";
import {Swiper, SwiperSlide} from "swiper/react";
import {Navigation} from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

import styles from "./CatalogCategories.module.css";
import {NextArrow, PrevArrow} from "@components/utils/SliderArrow/SliderArrow";

export default function CatalogCategories() {
 const API_URL = import.meta.env.VITE_API_URL;
 const [categories, setCategories] = useState([]);
 const [isLoading, setIsLoading] = useState(false);
 const [errorMessage, setErrorMessage] = useState("");

 useEffect(() => {
  const controller = new AbortController();
  const load = async () => {
   setIsLoading(true);
   setErrorMessage("");
   try {
    const response = await fetch(`${API_URL}/api/v1/catalog/category`, {
     method: "GET",
     headers: {accept: "application/json"},
     signal: controller.signal,
    });

    const contentType = response.headers.get("content-type") || "";
    let payload = null;
    try {
     if (contentType.includes("application/json")) {
      payload = await response.json();
     } else {
      const text = await response.text();
      payload = text ? {message: text} : null;
     }
    } catch {
     payload = null;
    }

    if (!response.ok) {
     const message = (payload && (payload.message || payload.error)) || `Request failed with status ${response.status}`;
     setErrorMessage(message);
     setCategories([]);
     return;
    }

    const items = Array.isArray(payload) ? payload : payload?.items || payload?.data || [];
    setCategories(items);
   } catch (err) {
    if (err?.name !== "AbortError") {
     setErrorMessage("Network error. Please try again later.");
    }
   } finally {
    setIsLoading(false);
   }
  };

  load();
  return () => controller.abort();
 }, [API_URL]);

 if (isLoading) return <div style={{padding: "1rem"}}>Loading categories...</div>;
 if (errorMessage) return <div style={{padding: "1rem", color: "#c62828"}}>{errorMessage}</div>;
 if (!categories.length) return null;

 return (
  <div className={styles.wrapper}>
   <div className={styles.sliderContainer}>
    <Swiper
     modules={[Navigation]}
     navigation={{
      nextEl: ".custom-next",
      prevEl: ".custom-prev",
     }}
     spaceBetween={20}
     slidesPerView={7}
     breakpoints={{
      1440: {slidesPerView: 7},
      1024: {slidesPerView: 4},
      768: {slidesPerView: 2},
      480: {slidesPerView: 1},
     }}
     className={styles.swiper}
    >
     {categories.map((category, idx) => {
      const name = category?.categoryName || "Category";
      let image = category?.image || "";
      if (image && image.startsWith("/")) {
       const base = (API_URL || "").replace(/\/+$/, "");
       image = `${base}${image}`;
      }

      return (
       <SwiperSlide key={`${name}-${idx}`}>
        <div
         className={styles.card}
         style={{backgroundImage: `url(${image})`}}
        >
         <div className={styles.overlay}>
          <span className={styles.label}>{name}</span>
         </div>
        </div>
       </SwiperSlide>
      );
     })}
    </Swiper>

    {/* Стрілки — ті ж компоненти, просто позиціонуємо їх */}
    <div className="custom-prev">
     <PrevArrow />
    </div>
    <div className="custom-next">
     <NextArrow />
    </div>
   </div>
  </div>
 );
}

// import {useEffect, useState} from "react";
// import Slider from "react-slick";
// import styles from "./CatalogCategories.module.css";
// import {NextArrow, PrevArrow} from "@components/utils/SliderArrow/SliderArrow";

// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";

// export default function CatalogCategories() {
//  const API_URL = import.meta.env.VITE_API_URL;
//  const [categories, setCategories] = useState([]);
//  const [isLoading, setIsLoading] = useState(false);
//  const [errorMessage, setErrorMessage] = useState("");

//  useEffect(() => {
//   const controller = new AbortController();
//   const load = async () => {
//    setIsLoading(true);
//    setErrorMessage("");
//    try {
//     const response = await fetch(`${API_URL}/api/v1/catalog/category`, {
//      method: "GET",
//      headers: {accept: "application/json"},
//      signal: controller.signal,
//     });

//     const contentType = response.headers.get("content-type") || "";
//     let payload = null;
//     try {
//      if (contentType.includes("application/json")) {
//       payload = await response.json();
//      } else {
//       const text = await response.text();
//       payload = text ? {message: text} : null;
//      }
//      // eslint-disable-next-line no-unused-vars
//     } catch (_) {
//      payload = null;
//     }

//     if (!response.ok) {
//      const message = (payload && (payload.message || payload.error)) || `Request failed with status ${response.status}`;
//      setErrorMessage(message);
//      setCategories([]);
//      return;
//     }

//     const items = Array.isArray(payload) ? payload : payload?.items || payload?.data || [];
//     setCategories(items);
//    } catch (err) {
//     if (err?.name !== "AbortError") {
//      setErrorMessage("Network error. Please try again later.");
//     }
//    } finally {
//     setIsLoading(false);
//    }
//   };

//   load();
//   return () => controller.abort();
//  }, [API_URL]);

//  const settings = {
//   dots: false,
//   infinite: false,
//   speed: 500,
//   slidesToShow: 7,
//   slidesToScroll: 1,
//   arrows: true,
//   nextArrow: <NextArrow />,
//   prevArrow: <PrevArrow />,
//   responsive: [
//    {
//     breakpoint: 1024,
//     settings: {
//      slidesToShow: 4,
//     },
//    },
//    {
//     breakpoint: 768,
//     settings: {
//      slidesToShow: 2,
//     },
//    },
//    {
//     breakpoint: 480,
//     settings: {
//      slidesToShow: 1,
//     },
//    },
//   ],
//  };

//  return (
//   <div className={styles.wrapper}>
//    {isLoading && <div style={{padding: "1rem"}}>Loading categories...</div>}
//    {!isLoading && errorMessage && <div style={{padding: "1rem", color: "#c62828"}}>{errorMessage}</div>}
//    {!isLoading && !errorMessage && categories.length > 0 && (
//     <Slider {...settings}>
//      {categories.map((category, idx) => {
//       const name = category?.categoryName || "Category";
//       let image = category?.image || "";
//       if (image && image.startsWith("/")) {
//        const base = (API_URL || "").replace(/\/+$/, "");
//        image = `${base}${image}`;
//       }
//       return (
//        <div
//         key={`${name}-${idx}`}
//         className={styles.slide}
//        >
//         <div
//          className={styles.card}
//          style={{backgroundImage: `url(${image})`}}
//         >
//          <div className={styles.overlay}>
//           <span className={styles.label}>{name}</span>
//          </div>
//         </div>
//        </div>
//       );
//      })}
//     </Slider>
//    )}
//   </div>
//  );
// }
