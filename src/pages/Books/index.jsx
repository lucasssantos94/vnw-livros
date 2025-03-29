import Container from "@components/Container";
import Book from "@components/Book";
import style from "./style.module.scss";
import { useState, useEffect } from "react";
import axios from "axios";
import BookLoader from "../../components/BookLoading";

const BooksPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const controller = new AbortController();

    const fetchBooks = async () => {
      setIsLoading(true);
      try {
        const apiUrl = import.meta.env.VITE_API_URL;
        const response = await axios.get(`${apiUrl}/livros`);
        setBooks(response.data);
        setTimeout(() => {
          setIsLoading(false);
        }, 1000);
      } catch (error) {
        console.error("Erro ao carregar livros:", error);
        setIsLoading(false);
      }
    };

    fetchBooks();

    return () => {
      controller.abort();
    };
  }, []);

  return (
    <>
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
    </>
  );
};

export default BooksPage;
