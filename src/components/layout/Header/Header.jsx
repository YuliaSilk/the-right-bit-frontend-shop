import styles from "./Header.module.css";
import logo from "@/assets/images/logo.svg";
import searchIcon from "@/assets/icons/search.png";
import userIcon from "@/assets/icons/profile.png";
import cartIcon from "@/assets/icons/cart.png";
import {searchProducts} from "../../../utils/search";
import {Link} from "react-router-dom";
import {useAuth} from "@/context/AuthContext";
import {useSearch} from "../../../context/SearchContext";
import {useState, useEffect} from "react";
import {useNavigate} from "react-router-dom";
import SearchDropdown from "../../home/SearchComponent/SearchComponent";

const Header = () => {
 const {isAuthenticated} = useAuth();
 const {setSearchTerm} = useSearch();
 const [menuOpen, setMenuOpen] = useState(false);
 const [filtered, setFiltered] = useState([]);
 const [allProducts, setAllProducts] = useState([]);
 const [showDropdown, setShowDropdown] = useState(false);
 const [query, setQuery] = useState("");
 const navigate = useNavigate();
 useEffect(() => {
  const loadProducts = async () => {
   try {
    const API_URL = import.meta.env.VITE_API_URL;
    const response = await fetch(`${API_URL}/api/v1/catalog?size=1000`);
    if (!response.ok) throw new Error("Failed to load products");
    const data = await response.json();
    const items = Array.isArray(data) ? data : data.content || data.items || [];
    setAllProducts(items);
   } catch (error) {
    console.error("Error loading products:", error);
   }
  };

  loadProducts();
 }, []);

 useEffect(() => {
  if (query.trim()) {
   const results = searchProducts(allProducts, query);
   setFiltered(results);
   setShowDropdown(true);
  } else {
   setFiltered([]);
   setShowDropdown(false);
  }
 }, [query, allProducts]);

 const handleSearch = (e) => {
  e.preventDefault();
  if (!query.trim()) return;

  setSearchTerm(query);
  navigate(`/catalog?search=${encodeURIComponent(query)}`);
  setShowDropdown(false);
 };

 const handleSelectProduct = () => {
  setShowDropdown(false);
  setQuery("");
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
        onChange={(e) => {
         setQuery(e.target.value);
         setSearchTerm(e.target.value);
        }}
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

       {showDropdown && filtered.length > 0 && (
        <div className={styles.dropdownWrapper}>
         <SearchDropdown
          results={filtered}
          searchTerm={query}
          onSelect={handleSelectProduct}
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
