import { useParams } from "react-router-dom";
import Book from "@components/Book";
import Container from "@components/Container";
import { books } from "@constants/books";
import BookNotFound from "@assets/images/404/book-not-found.webp";

import styles from "./styles.module.scss";

const SearchPage = () => {
  const { title } = useParams();

  const searchedBooks = books.filter((book) =>
    book.title
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .includes(
        title
          .toLowerCase()
          .normalize("NFD")
          .replace(/[\u0300-\u036f]/g, ""),
      ),
  );

  return (
    <>
      <section className={styles["s-search"]}>
        <Container>
          <h2 className={styles["title-section"]}>
            {`${searchedBooks.length} ${searchedBooks.length > 1 ? "resultados" : "resultado"} para ${title}`}
          </h2>

          {searchedBooks.length > 0 ? (
            <div className={styles["box-books"]}>
              {searchedBooks.map((book) => (
                <Book key={book.title} book={book} />
              ))}
            </div>
          ) : (
            <img src={BookNotFound} alt="Livro não encontrado" />
          )}
        </Container>
      </section>
    </>
  );
};

export default SearchPage;
