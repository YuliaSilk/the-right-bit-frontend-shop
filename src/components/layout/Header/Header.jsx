import styles from "./Header.module.css";
import logo from "@/assets/images/logo.svg";
import searchIcon from "@/assets/icons/search.png";
import userIcon from "@/assets/icons/profile.png";
import cartIcon from "@/assets/icons/cart.png";
import {searchProducts, highlightMatch} from "@/utils/search";

import {Link} from "react-router-dom";
import {useAuth} from "@/context/AuthContext";
import {useSearch} from "../../../context/SearchContext";
import {useState} from "react";

const Header = () => {
 const {isAuthenticated} = useAuth();
 const {setSearchTerm} = useSearch();
 const [menuOpen, setMenuOpen] = useState(false);
 const [filtered, setFiltered] = useState([]);
 const [allProducts] = useState([]);
 const [, setShowDropdown] = useState(false);
 const [query, setQuery] = useState("");

 const handleSearch = (e) => {
  const value = e.target.value;
  setQuery(value);

  const results = searchProducts(allProducts, value);
  setFiltered(results);
 };

 return (
  <header className={styles.header}>
   <div className={styles.container}>
    <div className={styles.headerContent}>
     <button
      className={`${styles.burger} ${menuOpen ? styles.open : ""}`}
      onClick={() => setMenuOpen(!menuOpen)}
     >
      <span></span>
      <span></span>
      <span></span>
     </button>

     <nav className={`${styles.nav} ${menuOpen ? styles.showMenu : styles.hideMenu}`}>
      <Link
       to="/catalog"
       className={styles.link}
      >
       Catalog
      </Link>
      <Link
       to="/calculator"
       className={styles.link}
      >
       BMI Calculator
      </Link>
      <Link
       to="/our-mission"
       className={styles.link}
      >
       Our Mission
      </Link>
      <Link
       to="/news"
       className={styles.link}
      >
       Heating News
      </Link>
     </nav>

     <div className={styles.brand}>
      <Link to="/">
       <img
        src={logo}
        alt="RightBite Logo"
        className={styles.logo}
       />
      </Link>
     </div>

     <div className={styles.searchAndIcons}>
      <form
       className={styles.searchBox}
       onSubmit={handleSearch}
       onFocus={() => setShowDropdown(true)}
       onBlur={() => setTimeout(() => setShowDropdown(false), 200)}
      >
       <input
        type="text"
        placeholder="What are you looking for?"
        value={query}
        onChange={(e) => setSearchTerm(e.target.value)}
        className={styles.searchInput}
       />

       <button
        type="submit"
        className={styles.searchButton}
       >
        <img
         src={searchIcon}
         alt="Search"
        />
       </button>

       {query && filtered.length > 0 && (
        <div className={styles.dropdownWrapper}>
         {filtered.map((p) => (
          <div
           key={p.id}
           className={styles.item}
          >
           <img
            src={p.imageUrl}
            className={styles.image}
           />

           <div
            className={styles.name}
            dangerouslySetInnerHTML={{
             __html: highlightMatch(p.productName, query),
            }}
           />
          </div>
         ))}
        </div>
       )}
      </form>

      <div className={styles.icons}>
       <Link
        to={isAuthenticated ? "/profile" : "/signup"}
        className={styles.iconButton}
       >
        <img
         src={userIcon}
         alt="User profile"
        />
       </Link>

       <Link
        to="/cart"
        className={styles.iconButton}
       >
        <img
         src={cartIcon}
         alt="Shopping cart"
        />
       </Link>
      </div>
     </div>
    </div>
   </div>
  </header>
 );
};

export default Header;
