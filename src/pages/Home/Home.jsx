import AdvantagesList from "@/components/home/AdvantagesList/AdvantagesList";
import Banner from "@/components/home/Banner/Banner";
import StartWith from "@/components/home/StartWith/StartWith";
import PostArticle from "@/components/home/PostArticle/PostArticle";
import NewsLetter from "@/components/home/NewsLetter/NewsLetter";
import RelatedProducts from "../../components/common/RelatedProducts/RelatedProducts";
import {useEffect, useState} from "react";

export default function Home() {
 const [isMobile, setIsMobile] = useState(false);

 useEffect(() => {
  const checkScreen = () => {
   setIsMobile(window.innerWidth <= 768);
  };
  checkScreen();
  window.addEventListener("resize", checkScreen);
  return () => window.removeEventListener("resize", checkScreen);
 }, []);

 if (isMobile) {
  return (
   <div className="flex flex-col items-center justify-center min-h-screen p-4 text-center">
    <h1>This site is currently available only in desktop version.</h1>
    <h3>Please use your laptop or PC to get the full experience.</h3>
   </div>
  );
 }

 return (
  <>
   <Banner />
   <AdvantagesList />
   <RelatedProducts
    title="Our best Selling Products"
    limit={4}
    variant="home"
   />
   <StartWith />
   <RelatedProducts
    title="Fresh Organic Supply Direct From Farmer to Home"
    limit={4}
    variant="home"
   />
   <PostArticle />
   <NewsLetter />
  </>
 );
}
