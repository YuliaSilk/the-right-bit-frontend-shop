import styles from './CalculatorOutputCard.module.css';
// import scale from '@assets/images/scaleBMI.svg';

export default function CalculatorOutputCard({ bmiResult }) {
  const resultNumber = bmiResult?.bmi || 0;

  return (
    <div className={styles.container}>
      <h2 className={styles.header}>
        BMI Categories
      </h2>
      <main className={styles.mainContainer}>
        <div className={styles.resultsContainer}>
          <div className={styles.resultLabel}>Your BMI:</div>
          <div className={styles.resultNumber}>{resultNumber.toFixed(2)}</div>
          <div className={styles.scaleIndexBMIContainer}>
            {/* <img src={scale} alt="scale of BMI index" /> */}
            <div className={styles.scaleIndexLabels}>
              <div className={styles.bmiBar}>
                {Array.from({ length: 13 }).map((_, i) => {
                  return (
                    <div className={styles.underWeightBar}></div>
                  )
                })}
              </div>
              <div className={styles.bmiBar}>
                {Array.from({ length: 13 }).map((_, i) => {
                  return (
                    <div className={styles.healthyBar}></div>
                  )
                })}
              </div>
              <div className={styles.bmiBar}>
                {Array.from({ length: 13 }).map((_, i) => {
                  return (
                    <div className={styles.overWeightBar}></div>
                  )
                })}
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
          <div className={styles.overweightLabel}>Overweight  25.0  + </div>
        </div>
      </main>
      <footer className={styles.footer}>Persons may consider seeking advice from their health care providers about their BMI. This calculator is not a substitute for professional medical advice.</footer>
    </div>
  )
}