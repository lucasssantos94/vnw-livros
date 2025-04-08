import { useEffect } from "react";
import { useBooks } from "@hooks/useGetBooks";
import Container from "@components/Container";
import Book from "@components/Book";
import BookLoader from "@components/BookLoading";
import style from "./style.module.scss";

const BooksPage = () => {
  const { books, isLoading, error, getBooks } = useBooks();

  useEffect(() => {
    const controller = new AbortController();

    getBooks(controller.signal);

    if (error) {
      console.error(error);
    }

    return () => controller.abort();
  }, [getBooks, error]);

  return (
    <section className={style["s-books"]}>
      <Container>
        <h2 className={style["title-section"]}>Livros Doados</h2>

        {isLoading ? (
          <div className={style["loading"]}>
            <BookLoader />
          </div>
        ) : books.length === 0 ? (
          <div className={style["empty-state"]}>
            <h2>Nenhum livro disponível</h2>
          </div>
        ) : (
          <div className={style["box-books"]}>
            {books.map((book) => (
              <Book key={book.id} book={book} />
            ))}
          </div>
        )}
      </Container>
    </section>
  );
};

export default BooksPage;
