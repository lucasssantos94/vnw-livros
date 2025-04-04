import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSearchBook } from "@hooks/useSearchBook";

import Book from "@components/Book";
import BookLoader from "@components/BookLoading";
import Container from "@components/Container";
import BookNotFound from "@assets/images/404/book-not-found.webp";

import styles from "./styles.module.scss";
import { toast } from "react-toastify";

const SearchPage = () => {
  const { searchedBooks, isLoading, error, handleSearchBook } = useSearchBook();
  const { title } = useParams();

  useEffect(() => {
    handleSearchBook(title);
  }, [title, handleSearchBook]);

  useEffect(() => {
    if (error && error.status !== 404) {
      toast.error(error.message, { autoClose: false });
    }
  }, [error]);

  const renderTitle = () => {
    if (isLoading) return null;
    if (error?.status === 404) {
      return (
        <h2 className={styles["title-section"]}>
          Nenhum resultado encontrado para &quot;{title}&quot;
        </h2>
      );
    }
    if (searchedBooks.length === 0) return null;

    return (
      <h2 className={styles["title-section"]}>
        {searchedBooks.length}{" "}
        {searchedBooks.length > 1 ? "resultados" : "resultado"} para &quot;
        {title}&quot;
      </h2>
    );
  };

  return (
    <section className={styles["s-search"]}>
      <Container>
        {renderTitle()}

        {isLoading ? (
          <BookLoader />
        ) : searchedBooks.length === 0 ? (
          <>
            <h2 className={styles["title-section"]}>
              Nenhum resultado encontrado para &quot;{title}&quot;
            </h2>
            <div className={styles["empty-state"]}>
              <img src={BookNotFound} alt="Nenhum livro encontrado" />
            </div>
          </>
        ) : (
          <div className={styles["box-books"]}>
            {searchedBooks.map((book) => (
              <Book key={book.id} book={book} />
            ))}
          </div>
        )}
      </Container>
    </section>
  );
};

export default SearchPage;
