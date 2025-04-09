import styles from "./style.module.scss";

const BookLoader = () => {
  return (
    <div className={styles["book-loader-container"]}>
      <div className={styles.book}>
        <div className={styles.inner}>
          <div className={styles.left}></div>
          <div className={styles.middle}></div>
          <div className={styles.right}></div>
        </div>
        <ul>
          {Array.from({ length: 18 }).map((_, index) => (
            <li key={index} className={styles[`page-${index + 1}`]}></li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default BookLoader;
