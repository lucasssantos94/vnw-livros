import PropTypes from "prop-types";

import styles from "./style.module.scss";

const Book = ({ book }) => {
  return (
    <article className={styles["box-book"]}>
      <div className={styles["box-img-book"]}>
        <img src={book.image_url} alt={`Capa do livro ${book.title}`} />
      </div>

      <div className={styles["info-book"]}>
        <h3 className={styles["title-book"]}>{book.title}</h3>
        <h5 className={styles["author-book"]}>{book.author}</h5>
        <h4 className={styles["category-book"]}>{book.category}</h4>
      </div>
    </article>
  );
};

Book.propTypes = {
  book: PropTypes.object.isRequired,
};

export default Book;
