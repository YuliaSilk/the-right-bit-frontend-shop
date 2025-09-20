import styles from './CalculatorOutputCard.module.css';

export default function CalculatorOutputCard({ bmiResult }) {
  const resultNumber = bmiResult?.bmi || 0;

  const getCategory = (bmi) => {
    if (bmi < 18.5) return { label: "Underweight", pos: "15%" };
    if (bmi < 25) return { label: "Healthy", pos: "50%" };
    return { label: "Overweight", pos: "85%" };
  };

  const category = getCategory(resultNumber);

  return (
    <div className={styles.container}>
      <h2 className={styles.header}>BMI Categories</h2>

      <main className={styles.mainContainer}>
        <div className={styles.resultsContainer}>
          <div className={styles.resultLabel}>Your BMI:</div>
          <div className={styles.resultNumber}>{resultNumber.toFixed(2)}</div>

          {/* шкала з індикатором */}
          <div className={styles.scaleIndexBMIContainer}>
            <div 
              className={styles.barLabel} 
              style={{ left: category.pos }}
            >
              {category.label}
            </div>

            <div className={styles.bmiBar}>
              <div className={styles.bmiBar}>
                {Array.from({ length: 13 }).map((_, i) => (
                  <div key={`u-${i}`} className={styles.underWeightBar}></div>
                ))}
              </div>
              <div className={styles.bmiBar}>
                {Array.from({ length: 13 }).map((_, i) => (
                  <div key={`h-${i}`} className={styles.healthyBar}></div>
                ))}
              </div>
              <div className={styles.bmiBar}>
                {Array.from({ length: 13 }).map((_, i) => (
                  <div key={`o-${i}`} className={styles.overWeightBar}></div>
                ))}
              </div>
            </div>

            <div className={styles.scaleIndexLabels}>
              <div>Underweight</div>
              <div>Healthy</div>
              <div>Overweight</div>
            </div>
          </div>
        </div>

        <div className={styles.divider}></div>

        <div className={styles.legendContainer}>
          <div className={styles.underweightLabel}>Underweight - Below 18.5</div>
          <div className={styles.healthyLabel}>Healthy 18.5 - 24.9</div>
          <div className={styles.overweightLabel}>Overweight 25.0 +</div>
        </div>
      </main>

      <footer className={styles.footer}>
        Persons may consider seeking advice from their health care providers about their BMI. 
        This calculator is not a substitute for professional medical advice.
      </footer>
    </div>
  );
}
