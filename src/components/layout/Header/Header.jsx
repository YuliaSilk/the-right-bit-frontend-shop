import styles from "./Header.module.css";

import logo from "@/assets/images/logo.svg";
import searchIcon from "@/assets/icons/search.png";
import userIcon from "@/assets/icons/profile.png";
import cartIcon from "@/assets/icons/cart.png";

import {Link} from "react-router-dom";
import {useAuth} from "@/context/AuthContext";
import {useSearch} from "../../../context/SearchContext";

const Header = () => {
 const {isAuthenticated} = useAuth();
 const {searchTerm, setSearchTerm} = useSearch();

 //  const [_, setQuery] = useState("");
 //  const navigate = useNavigate();
 const VITE_API_URL = import.meta.env.VITE_API_URL;
 //
 //  const handleSearch = async (e) => {
 //   if (e && e.preventDefault) {
 //    e.preventDefault();
 //   }

 //   if (query.trim() === "") {
 //    console.log("Порожній пошуковий запит");
 //    return;
 //   }

 //   try {
 //    const res = await fetch(`${VITE_API_URL}/api/v1/search`, {
 //     method: "POST",
 //     headers: {
 //      "Content-Type": "application/json",
 //     },
 //     body: JSON.stringify({
 //      keyword: query,
 //     }),
 //    });

 //    if (res.ok) {
 //     const data = await res.json();
 //     navigate("/search-results", {state: {results: data, searchKeyword: query}});
 //    } else {
 //     console.error(`Помилка запиту: ${res.status} ${res.statusText}`);
 //    }
 //   } catch (error) {
 //    console.error("Помилка під час виконання fetch-запиту:", error);
 //   }
 //  };

 return (
  <header className={styles.header}>
   <div className={styles.container}>
    <div className={styles.headerContent}>
     <nav className={styles.nav}>
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
        alt="RigthBite Logo"
        className={styles.logo}
       />
      </Link>

      <h1 className={`${styles.brandName} ${styles.visuallyHidden}`}>RightBite</h1>
     </div>

     <div className={styles.searchAndIcons}>
      <div className={styles.searchBox}>
       <input
        type="text"
        placeholder="What are you looking for?"
        value={searchTerm}
        // value={query}
        onChange={(e) => setSearchTerm(e.target.value)}
        // onChange={(e) => setQuery(e.target.value)}
        className={styles.searchInput}
       />
       <button
        type="submit"
        // onClick={(e) => handleSearch()}
        className={styles.searchButton}
       >
        <img
         src={searchIcon}
         alt="Search"
        />
       </button>
      </div>

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
