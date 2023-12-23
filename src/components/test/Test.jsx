import styles from "./test.module.scss";
import Link from "next/link";

export default function Test() {
  return (
    <div className={styles.userCollectionContainer}>
      <h2 className={styles.author}>Username</h2>
      <div className={styles.collectionsItemsContainer}>
        <div className={styles.colContainer}>
          <div className={styles.collection}>
            <Link className={styles.collectionLink} href={`#`}>
              Name
            </Link>
          </div>
        </div>
        <p>-</p>
        <div className={styles.itemContainer}>
          <div className={styles.item}>
            <p className={styles.itemNameP}>Item Name</p>
          </div>
        </div>
      </div>
    </div>
  );
}
