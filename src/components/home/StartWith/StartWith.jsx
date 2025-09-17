import styles from './StartWith.module.css';
import { Link } from 'react-router-dom';
import exampleImage from '@assets/images/start_with_background.jpg'

import Button from '@components/common/Button/Button';

export default function StartWith() {
  return (
    <section className={styles.block}>
      <div className={styles.container}>
        <div className={styles.left}>
          <h2 className={styles.title}>Start with your Ideal Balance</h2>
          <div className={styles.inner}>
            <div className={styles.description}>
              <p className={styles.untitle}>
                Check your BMI in seconds - and find the right foods to help you
                stay energized and in balance.
              </p>
              <p className={styles.content}>
              Discover your Body Mass Index (BMI) effortlessly and get personalized food suggestions based on your results. Whether you’re aiming to maintain your current weight, lose a few pounds, or simply feel more balanced, our smart recommendations will guide you to the right organic and nutrient-rich choices. Start your wellness journey today—because eating well starts with understanding your body.
              </p>
            </div>
            <div className={styles.btnConteiner}>
              <Button className={styles.checkbtn}>
                <Link to='/calculator'>Check Now</Link>
              </Button>
            </div>
          </div>
        </div>


        <div className={styles.imageContainer}>
          <img src={exampleImage} alt="Vegetables and weights" />
        </div>
      </div>
    </section>
  );
}
