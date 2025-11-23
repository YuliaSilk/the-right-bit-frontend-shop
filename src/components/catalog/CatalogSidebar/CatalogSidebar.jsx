// import {useState} from "react";
import styles from "./CatalogSidebar.module.css";
import PriceRange from "../PriceRange/PriceRange";
import PopularBrands from "@components/catalog/PopularBrands/PopularBrands";

import FruitsAndVegetablesIcon from "../../../assets/svgs/Fruits.svg";
import HighProteinIcon from "../../../assets/svgs/HighProtein.svg";
import WholeGrainsIcon from "../../../assets/svgs/WholeGrains.svg";
import DairyProductsIcon from "../../../assets/svgs/DairyProducts.svg";
import LowFatProductsIcon from "../../../assets/svgs/LowFatProducts.svg";
import PreMeatsIcon from "../../../assets/svgs/PreMeats.svg";
import NutsAndPasteIcon from "../../../assets/svgs/Nuts&Paste.svg";
import SnacksIcon from "../../../assets/svgs/Snacks.svg";
import OilsIcon from "../../../assets/svgs/Oils.svg";
import DessertsIcon from "../../../assets/svgs/Desserts.svg";
import PreCookedMealsIcon from "../../../assets/svgs/PreCookedMeals.svg";
import DietsIcon from "../../../assets/svgs/Diets.svg";
import AccessoriesIcon from "../../../assets/svgs/Accesories.svg";
import Poultry from '../../../assets/svgs/Poultry.svg';
import Beverages from '../../../assets/svgs/Beverages.svg';
import Sweets from '../../../assets/svgs/Sweets.svg';
import BakeryAndBread from '../../../assets/svgs/BakeryAndBread.svg';

const categories = [
 {
  categoryName: "Fish and Seafood",
 },
 {
  categoryName: "Meat and Poultry",
 },
 {
  categoryName: "Vegetables",
 },
 {
  categoryName: "Fruits",
 },
 {
  categoryName: "Dairy Products",
 },
 {
  categoryName: "Bakery and Bread",
 },
 {
  categoryName: "Beverages",
 },
 {
  categoryName: "Sweets",
 },
 {
  categoryName: "Drinks",
 },
 {
  categoryName: "Snacks",
 },
 {
  categoryName: "Desserts",
 },
 {
  categoryName: "Pre-cooked meals",
 },
 {
  categoryName: "Diets",
 },
 {
  categoryName: "Groceries",
 },
 {
  categoryName: "Accessories",
 },
];
const svgsByCategories = [
 {key: "Fruits & Vegetables", src: FruitsAndVegetablesIcon},
 {key: "High Protein", src: HighProteinIcon},
 {key:"Poultry", src:Poultry},
 {key:"Beverages",src:Beverages},
 {key: "Whole grains", src: WholeGrainsIcon},
 {key: "Dairy products", src: DairyProductsIcon},
 {key: "Low fat products", src: LowFatProductsIcon},
 {key: "Pre-cooked meals", src: PreMeatsIcon},
 {key: "Nuts & paste", src: NutsAndPasteIcon},
 {key:"Bakery and Bread", src:BakeryAndBread},
 {key: "Snacks", src: SnacksIcon},
 {key:"Sweets", src:Sweets},
 {key: "Oils", src: OilsIcon},
 {key: "Desserts", src: DessertsIcon},
 {key: "Diets", src: DietsIcon},
 {key: "Accessories", src: AccessoriesIcon},
];
const categoryIconMap = {
Poultry:"Meat and Poultry",
 HightProtein: "High Protein",
 Vegetables: "Fruits & Vegetables",
 Fruits: "Fruits & Vegetables",
 DairyProducts:"Dairy Products",
 WholeGrains:"Whole grains",
 BakeryAndBread:"Bakery and Bread",
 Beverages: "Beverages",
 Snaks:"Snacks",
 Sweets:"Sweets", 
 Drinks: "Drinks",
 Desserts: "Desserts",
 PreCookedMeals:"Pre-cooked meals",
 Diets: "Diets",
 Groceries: "Oils",
 Accessories: "Accessories",
};

const getCategoryIcon = (categoryName) => {
 const key = categoryIconMap[categoryName];
 const match = svgsByCategories.find((svg) => svg.key === key);
 return match ? match.src : null;
};

export default function CatalogSidebar({
 selectedBrands = [],
 onBrandsChange,
 selectedCategory,
 onCategoryChange,
 priceFrom,
 priceTo,
 onPriceChange,
}) {
 return (
  <aside className={styles.sidebar}>
   <h3 className={styles.title}>Category</h3>
   <div className={styles.section}>
    {categories.map((category) => {
     const icon = getCategoryIcon(category.categoryName);

     return (
      <div
       key={category.categoryName}
       className={styles.category}
      >
       <label className={styles.checkboxLabel}>
        <input
         type="radio"
         name="catalog-category"
         checked={selectedCategory === category.categoryName}
         onChange={() => onCategoryChange && onCategoryChange(category.categoryName)}
         className={styles.categoryInput}
        />
        {icon && (
         <img
          src={icon}
          alt={category.categoryName}
          className={styles.categoryIcon}
         />
        )}
        <span className={styles.categoryText}>{category.categoryName}</span>
       </label>
      </div>
     );
    })}
    {/* {categories.map((category) => (
     <div
      key={category.id}
      className={styles.category}
     >
      <label
       key={category.categoryName}
       className={styles.checkboxLabel}
      >
       <input
        type="radio"
        name="catalog-category"
        checked={selectedCategory === category.categoryName}
        onChange={() => onCategoryChange && onCategoryChange(category.categoryName)}
        className={styles.categoryInput}
       />
       <img
        // src={category.image}
        src={svgsByCategories.find((s) => s.key === category)?.src}
        alt={category.categoryName}
        className={styles.categoryIcon}
       />
       <span className={styles.categoryText}>{category.categoryName}</span>
      </label>
     </div>
    ))} */}
   </div>
   <PriceRange
    min={priceFrom}
    max={priceTo}
    onChange={onPriceChange}
   />
   <PopularBrands
    selectedBrands={selectedBrands}
    onChange={onBrandsChange}
   />
  </aside>
 );
}
