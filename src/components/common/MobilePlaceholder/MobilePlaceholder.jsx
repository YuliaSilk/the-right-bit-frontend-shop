import styles from "./MobilePlaceholder.module.css";

export default function MobilePlaceholder() {
 return (
  <div className={styles.container}>
   <div className={styles.card}>
    <h2 className={styles.title}>
     {" "}
     Technical work <br /> in progress.
    </h2>
    <p className={styles.text}>Please use the desktop version. Sorry for the inconvenience.</p>
    <div className={styles.actions}></div>
   </div>
  </div>
 );
}
