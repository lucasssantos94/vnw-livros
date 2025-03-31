import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSearchBook } from "@hooks/useSearchBook";

import Book from "@components/Book";
import BookLoader from "@components/BookLoading";
import Container from "@components/Container";
import BookNotFound from "@assets/images/404/book-not-found.webp";

import styles from "./styles.module.scss";

const SearchPage = () => {
  const { searchedBooks, isLoading, error, handleSearchBook } = useSearchBook();

  const { title } = useParams();

  useEffect(() => {
    handleSearchBook(title);
  }, [title, handleSearchBook]);

  return (
    <>
      <section className={styles["s-search"]}>
        <Container>
          <h2 className={styles["title-section"]}>
            {searchedBooks.length > 0
              ? `${searchedBooks.length} ${searchedBooks.length > 1 ? "resultados" : "resultado"} para "${title}"`
              : error
                ? "Ocorreu um erro ao buscar o livro."
                : `Nenhum resultado encontrado para "${title}"`}
          </h2>
          {isLoading ? (
            <BookLoader />
          ) : searchedBooks.length === 0 ? (
            <div className={styles["empty-state"]}>
              <h2>Opss, livro não encontrado</h2>
              <img src={BookNotFound} alt="" />
            </div>
          ) : (
            <div className={styles["box-books"]}>
              {searchedBooks.map((book) => (
                <Book key={book.id} book={book} />
              ))}
            </div>
          )}
        </Container>
      </section>
    </>
  );
};

export default SearchPage;
