import AdvantagesList from "@/components/home/AdvantagesList/AdvantagesList";
import Banner from "@/components/home/Banner/Banner";
import StartWith from "@/components/home/StartWith/StartWith";
import PostArticle from "@/components/home/PostArticle/PostArticle";
import NewsLetter from "@/components/home/NewsLetter/NewsLetter";
import RelatedProducts from "../../components/common/RelatedProducts/RelatedProducts";

export default function Home() {
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
    limit={8}
    variant="home"
   />
   <PostArticle />
   <NewsLetter />
  </>
 );
}
