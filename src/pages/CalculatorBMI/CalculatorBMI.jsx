import { useState } from "react";
import styles from "./CalculatorBMI.module.css";
import NewsLetter from "@components/home/NewsLetter/NewsLetter";
import rectangle from "@assets/images/bb37277abecb9af9c52234bf2a0fa4a9a41901b8.png";
import CalculatorInputCard from "../../components/calculator/CalculatorInputCard/CalculatorInputCard";
import CalculatorOutputCard from "../../components/calculator/CalculatorOutputCard/CalculatorOutputCard";
import CatalogCard from "@components/catalog/CatalogCard/CatalogCard";
// import { mockCard } from "@mocks/mockCard";
import picture from "@assets/images/d4ca643f8d5d6cff2455a63f5c5d898ea1516b3b.png";



export default function CalculatorBMI() {
  const [bmiResult, setBmiResult] = useState(null);

  const handleCalculate = (result) => {
    setBmiResult(result);
  };
console.log('BMI result items:', bmiResult?.items);

  return (
    <div className={styles.container}>
      <div className={styles.banner}>
        <h1><strong>
          Calculate Your BMI  -  your wellness journey starts here  </strong></h1>
      </div>
      <div className={styles.mainContainer}>
        <div className={styles.infoContainer}>
          <div>
            <h2 className={styles.header}>BMI Calculator</h2>
            <div className={styles.infoText}>
              <span style={{ marginTop: "24px", display: "inline-block" }}>
                <b>Body mass index (BMI)</b> is a measure of body fat based on
                height and weight that applies to adult men and women. Your BMI
                is just one piece of the puzzle. It’s based on height and weight
                but doesn’t take into account your muscle mass, bone density, or
                body composition. Your healthcare provider will consider whether
                your BMI is too high or too low for you.

              </span>
              <span style={{ marginTop: "1lh", display: "inline-block" }}>
                At our organic store we use your BMA to help recommend products
                that best support your body's current needs. Whether you're
                aiming to lose weight build straingth or maintain balance we
                offer clean nutrient-reach foodstailored to your wellness
                journey because real house starts with the right fuel for your
                body
                {/* {bmiResult.aiResponse} */}
              </span>
            </div>
          </div>
          <div>
            <img src={rectangle} alt="mock gray block image" className={styles.image} />
          </div>
        </div>

        <div className={styles.calculatorContainer}>
          <div>
            <h2 className={styles.header}>
              Calculate your body mass index (BMI) for adults
            </h2>
          </div>
          <div className={styles.calculatorCardsContainer}>
            <CalculatorInputCard onCalculate={handleCalculate} />
            <CalculatorOutputCard bmiResult={bmiResult} />
          </div>
        </div>
      </div>

      <div className={styles.resultExplanations}>
        <div>
          <h2 className={styles.header}>What your BMI results means</h2>
          <div className={styles.infoText}>
            <span style={{ marginTop: "24px", display: "inline-block" }}>

              {bmiResult ? (
                <>
                  A BMI score {bmiResult.bmi} is classed as '{bmiResult.category}'.<br />
                  {bmiResult.healthRisk}
                </>
              ) : (
                "Calculate your BMI to see results"
              )}
            </span>

            <span style={{ marginTop: "1lh", display: "inline-block" }}>
              {bmiResult?.aiResponse}
            </span>
          </div>
        </div>
        <img src={picture} className={styles.whatYourBMIResultsMeansImage}></img>
      </div>
      <div>
        <div className={styles.itemsShowcaseContainer}>
          <div className={styles.similarProductListHeader}>
            <h3 className={styles.productListTitle}>
              Personalized recomendations
            </h3>
            <button className={styles.showMoreButton}>
              Show More
              <span className="material-symbols-outlined">east</span>
            </button>
          </div>
          <div className={styles.otherProductCard}>
            {bmiResult?.items?.map((item) => (
              
              <CatalogCard
                key={item.id}
                id={item.id}
                imageUrl={item.images?.url}
                name={item.productName}
                price={item.price}
                kcal={item.kcal || item.calories}
                description={item.description}
                product={item}
              />
            ))}
          </div>
        </div>
      </div>
      <div>
        <div className={styles.itemsShowcaseContainer}>
          <div className={styles.similarProductListHeader}>
            <h3 className={styles.productListTitle}>
              Our Bestsellers
            </h3>
            <button className={styles.showMoreButton}>
              Show More
              <span className="material-symbols-outlined">east</span>
            </button>
          </div>
          <div className={styles.otherProductCard}>
            {/* {bmiResult?.items ? 
              bmiResult.items.map((item, index) => (
                <CatalogCard key={index} {...item} />
              )) : 
              Array.from({ length: 4 }).map((_, index) => (
                <CatalogCard key={index} {...mockCard} />
              ))
            } */}
          </div>
        </div>
      </div>
      <NewsLetter />
    </div>
  );
}
