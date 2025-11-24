import styles from "./Header.module.css";
import logo from "@/assets/images/logo.svg";
import searchIcon from "@/assets/icons/search.png";
import userIcon from "@/assets/icons/profile.png";
import cartIcon from "@/assets/icons/cart.png";
import SearchDropdown from "../../home/SearchComponent/SearchDropdown";

import {Link} from "react-router-dom";
import {useAuth} from "@/context/AuthContext";
import {useSearch} from "../../../context/SearchContext";
import {useState, useEffect} from "react";
import {useNavigate} from "react-router-dom";

const Header = () => {
 const {isAuthenticated} = useAuth();
 const {searchTerm, setSearchTerm} = useSearch();
 const [menuOpen, setMenuOpen] = useState(false);
 const [filtered, setFiltered] = useState([]);
 const [allProducts, setAllProducts] = useState([]);
 const [showDropdown, setShowDropdown] = useState(false);

 const navigate = useNavigate();

 const handleSearch = (e) => {
  e.preventDefault();
  if (!searchTerm.trim()) return;
  navigate(`/catalog?search=${encodeURIComponent(searchTerm)}`);
 };
 useEffect(() => {
  fetch(import.meta.env.VITE_API_URL + "/api/v1/catalog?size=1000")
   .then((r) => r.json())
   .then((data) => {
    const items = Array.isArray(data) ? data : data.content || [];
    setAllProducts(items);
   });
 }, []);

 useEffect(() => {
  const term = searchTerm.toLowerCase();
  if (!term) {
   setFiltered([]);
   return;
  }

  const res = allProducts.filter((p) => p.productName?.toLowerCase().includes(term));

  setFiltered(res);
 }, [searchTerm, allProducts]);

 return (
  <header className={styles.header}>
   <div className={styles.container}>
    <div className={styles.headerContent}>
     {/* Burger */}
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
        value={searchTerm}
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
       {showDropdown && (
        <div className={styles.dropdownWrapper}>
         <SearchDropdown
          searchTerm={searchTerm}
          results={filtered}
          onSelect={setSearchTerm}
         />
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
