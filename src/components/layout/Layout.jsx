import styles from "./Layout.module.css";
import {Outlet} from "react-router-dom";
import Header from "./Header/Header";
import Footer from "./Footer/Footer";
import MobilePlaceholder from "../common/MobilePlaceholder/MobilePlaceholder";

export default function Layout() {
 return (
  <>
   <div className={`${styles.layoutContainer} ${styles.desktopOnly}`}>
    <Header />
    <main className={styles.main}>
     <Outlet />
    </main>
    <Footer />
   </div>

   <div className={styles.mobileOnly}>
    <MobilePlaceholder />
   </div>
  </>
 );
}
