import styles from "./MobilePlaceholder.module.css";
import AttentionIcon from "../../../assets/svgs/attention.svg";
export default function MobilePlaceholder() {
 return (
  <div className={styles.container}>
   <div className={styles.card}>
    <h2 className={styles.title}>
     {" "}
     Technical work <br /> in progress.
    </h2>
    <img
     src={AttentionIcon}
     alt="Under construction"
     className={styles.image}
    />
    <p className={styles.text}>Please use the desktop version. Sorry for the inconvenience.</p>
    <div className={styles.actions}></div>
   </div>
  </div>
 );
}
