import { useState } from 'react';
import styles from './CatalogSidebar.module.css';
import PriceRange from '../PriceRange/PriceRange';
import PopularBrands from '@components/catalog/PopularBrands/PopularBrands';

import FruitsAndVegetablesIcon from '../../../assets/svgs/FruitsAndVegetables.svg';
import HighProteinIcon from '../../../assets/svgs/HighProtein.svg';
import WholeGrainsIcon from '../../../assets/svgs/WholeGrains.svg';
import MilkProductsIcon from '../../../assets/svgs/MilkProducts.svg';
import LowFatProductsIcon from '../../../assets/svgs/LowFatProducts.svg';
import PreMeatsIcon from '../../../assets/svgs/PreMeats.svg';
import NutsAndPasteIcon from '../../../assets/svgs/Nuts&Paste.svg';
import SnacksIcon from '../../../assets/svgs/Snacks.svg';
import OilsIcon from '../../../assets/svgs/Oils.svg';
import DessertsIcon from '../../../assets/svgs/Desserts.svg';
import PreCookedMealsIcon from '../../../assets/svgs/PreCookedMeals.svg';
import DietsIcon from '../../../assets/svgs/Diets.svg';
import AccessoriesIcon from '../../../assets/svgs/Accesories.svg';

const categories = [
  'Fruits & Vegetables',
  'High Protein',
  'Whole grains',
  'Milk products',
  'Low fat products',
  'Pre-Meats',
  'Nuts & paste',
  'Snacks',
  'Oils',
  'Desserts',
  'Pre-cooked meals',
  'Diets',
  'Accessories',
];

const svgsByCategories = [
  { key: 'Fruits & Vegetables', src: FruitsAndVegetablesIcon },
  { key: 'High Protein', src: HighProteinIcon },
  { key: 'Whole grains', src: WholeGrainsIcon },
  { key: 'Milk products', src: MilkProductsIcon },
  { key: 'Low fat products', src: LowFatProductsIcon },
  { key: 'Pre-Meats', src: PreMeatsIcon },
  { key: 'Nuts & paste', src: NutsAndPasteIcon },
  { key: 'Snacks', src: SnacksIcon },
  { key: 'Oils', src: OilsIcon },
  { key: 'Desserts', src: DessertsIcon },
  { key: 'Pre-cooked meals', src: PreCookedMealsIcon },
  { key: 'Diets', src: DietsIcon },
  { key: 'Accessories', src: AccessoriesIcon },
];




export default function CatalogSidebar({
  selectedBrands = [],
  onBrandsChange,
  selectedCategory,
  onCategoryChange,
  priceFrom,
  priceTo,
  onPriceChange,
}) {
  const [selectedOptions, setSelectedOptions] = useState([]);

  const handleCheckboxChange = (option) => {
    setSelectedOptions((prevSelected) =>
      prevSelected.includes(option)
        ? prevSelected.filter((item) => item !== option)
        : [...prevSelected, option]
    );
  };

  return (
    <aside className={styles.sidebar}>
      <h3 className={styles.title}>Category</h3>
      <div className={styles.section}>
        {categories.map((category) => (
          
          <div key={category} className={styles.category}>
           <label key={category} className={styles.checkboxLabel}>
    <input
      type="radio"
      name="catalog-category"
      checked={selectedCategory === category}
      onChange={() => onCategoryChange && onCategoryChange(category)}
      className={styles.categoryInput}
    />
    <img
      src={svgsByCategories.find(s => s.key === category)?.src}
      alt={category}
      className={styles.categoryIcon}
    />
    <span className={styles.categoryText}>{category}</span>
  </label>

           
          </div>
        ))}
      </div>
      <PriceRange min={priceFrom} max={priceTo} onChange={onPriceChange} />
      <PopularBrands selectedBrands={selectedBrands} onChange={onBrandsChange} />
    </aside>
  );
}
