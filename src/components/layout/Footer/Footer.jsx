import styles from "./Footer.module.css";

import logo from "@assets/images/logo.svg";
import instagramIcon from "@assets/social-icons/instagram.png";
import facebookIcon from "@assets/social-icons/facebook.png";
import twitterIcon from "@assets/social-icons/twitter.png";
import visaIcon from "@assets/social-icons/visa.png";
import masterCardIcon from "@assets/social-icons/mastercard.png";

export default function Footer() {
 return (
  <footer className={styles.footer}>
   <div className={styles.fullWidthLine}></div>
   <div className={styles.container}>
    <nav className={styles.navColumns}>
     <div className={styles.logoContainer}>
      <a href="#">
       <img
        src={logo}
        alt="Logotype RightBite"
        width={120}
        height={40}
       />
      </a>
     </div>
     <div className={styles.navColumn}>
      <ul className={styles.navList}>
       <li>
        <a href="/catalog">Catalog</a>
       </li>
       <li>
        <a href="/calculator">BMI Calculator</a>
       </li>
       <li>
        <a href="/our-mission">Our Mission</a>
       </li>
       <li>
        <a href="/news">Healthy News</a>
       </li>
      </ul>
     </div>

     <div className={styles.navColumn}>
      <ul className={styles.navList}>
       <li>
        <a href="/cart">BASKET</a>
       </li>
       <li>
        <a href="/profile">PROFILE</a>
       </li>
       <li>
        <a href="/news">BLOG</a>
       </li>
       <li>
        <a href="/news">NEWS</a>
       </li>
      </ul>
     </div>
     <div className={styles.navColumn}>
      <ul className={styles.navList}>
       <li>
        <a href="/catalog?category/fruits">FRUITS</a>
       </li>
       <li>
        <a href="/catalog?category/vegetables">VEGETABLES</a>
       </li>
       <li>
        <a href="/catalog?category/meat">MEAT</a>
       </li>
       <li>
        <a href="/catalog?category/fish">FISH </a>
       </li>
      </ul>
     </div>
     <div className={styles.navColumn}>
      <ul className={styles.navList}>
       <li>
        <a href="/catalog?category/groceries">GROCERIES </a>
       </li>
       <li>
        <a href="/catalog?category/desserts">DESSERTS </a>
       </li>
       <li>
        <a href="/catalog?category/drinks">DRINKS</a>
       </li>
       <li>
        <a href="/catalog?category/cheese">CRAFT CHEESE</a>
       </li>
      </ul>
     </div>
    </nav>

    <div className={styles.bottomSection}>
     <div className={styles.socials}>
      <a href="#">
       <img
        src={instagramIcon}
        alt="Instagram"
        width={24}
        height={24}
       />
      </a>
      <a href="#">
       <img
        src={facebookIcon}
        alt="Facebook"
        width={24}
        height={24}
       />
      </a>
      <a href="#">
       <img
        src={twitterIcon}
        alt="Twitter"
        width={24}
        height={24}
       />
      </a>
     </div>

     <p className={styles.copyright}>RightBite © 2025. All Rights Reserved</p>

     <div className={styles.payment}>
      <a href="#">
       <img
        src={masterCardIcon}
        alt="MasterCard"
        width={40}
        height={24}
       />
      </a>
      <a href="#">
       <img
        src={visaIcon}
        alt="Visa"
        width={40}
        height={24}
       />
      </a>
     </div>
    </div>
   </div>
  </footer>
 );
}
