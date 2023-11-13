import styles from "./page.module.scss";

export default function loading() {
  return (
    <div className={styles.spinnerContainer}>
      <div className={styles.spinner} />
    </div>
  );
}
