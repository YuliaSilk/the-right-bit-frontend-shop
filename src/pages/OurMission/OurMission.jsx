import styles from './OurMission.module.css';
import banner from '@/assets/banners/mission.jpg';
import NewsLetter from '@/components/home/NewsLetter/NewsLetter';
export default function OurMission() {
  return (
    <div>
      <div className={styles.bannerContainer}>
        <img src={banner} alt="Our Mission Banner" className={styles.banner} />
        <h1 className={styles.title}>About Right Bite</h1>
      </div>
      <div className={styles.container}>
        <div className={styles.story}>
          <h2 className={styles.secondTitle}>Our story</h2>
          <p className={styles.text}>
            Every big change starts with a small step. For us, it was a garden full of fresh greens and the idea that food should be more than just something you eat – it should be fuel for your body and soul. 
            At The Right Bite, we’re passionate about keeping things simple, natural, and real.
            We believe that healthy eating doesn’t have to be complicated or boring.
            It can be fun, colorful, and full of flavor. 
            Our story is about breaking the stereotype that “healthy” means “tasteless.” 
            Instead, we’re here to prove that the right food can give you energy, confidence, and a lifestyle you’ll actually enjoy.
          </p>
        </div>

        <div className={styles.product}>
          <h2 className={styles.secondTitle}>Our product</h2>
          <p className={styles.text}>
          What makes The Right Bite special?
           Everything we create comes straight from nature – clean, fresh, and honest.
            Grown with love in the garden, harvested at the right time, and delivered with care, our products are full of the vitamins and nutrients your body truly needs.
          No chemicals. No shortcuts. No fake ingredients. Just food you can trust, packed with flavor and goodness. Whether it’s crunchy vegetables, leafy greens, or healthy snacks, every bite is designed to keep you strong, sharp, and energized.
          We’re not just giving you food – we’re giving you the confidence to live better. Eating right means looking good, feeling good, and having the energy to do more of what you love.          </p>
        </div>

        <div className={styles.carousel}></div>

        <div className={styles.future}>
          <h2 className={styles.secondTitle}>Our future</h2>
          <p className={styles.text}>
            We don’t just see ourselves as a food brand – we see ourselves as part of a movement.
            A movement towards a healthier, smarter, and cooler way of living. Our future is about growing more fresh options, reaching more people, and making healthy eating something everyone wants to be part of.
            We believe the future belongs to those who choose wisely, and nothing is wiser than taking care of yourself through what you eat. With every right bite, you’re not just nourishing your body – you’re building a lifestyle that inspires others too.
            The future is green, fresh, and full of energy. And it starts with you choosing The Right Bite.          
            </p>
        </div>
      </div>
      <NewsLetter />
    </div>
  );
}
