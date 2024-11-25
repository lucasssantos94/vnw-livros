import Container from "@components/Container";
import Book from "@components/Book";
import { books } from "@constants/books";
import style from "./style.module.scss";

const BooksPage = () => {
  return (
    <>
      <section className={style["s-books"]}>
        <Container>
          <h2 className={style["title-section"]}>Livros Doados</h2>

          <div className={style["box-books"]}>
            {books.map((book) => (
              <Book key={book.title} book={book} />
            ))}
          </div>
        </Container>
      </section>
    </>
  );
};

export default BooksPage;
