import Container from "@components/Container";
import Book from "@components/Book";
// import { books } from "@constants/books";
import style from "./style.module.scss";
import { useState, useEffect } from "react";
import axios from "axios";

const BooksPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const fetchBooks = async () => {
      setIsLoading(true);
      try {
        const apiUrl = import.meta.env.VITE_API_URL;
        const response = await axios.get(`${apiUrl}/livros`);
        setBooks(response.data);
        console.log(response.data);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching books:", error);
        setIsLoading(false);
      }
    };

    fetchBooks();
  }, []);

  return (
    <>
      <section className={style["s-books"]}>
        <Container>
          <h2 className={style["title-section"]}>Livros Doados</h2>

          {isLoading ? (
            <div className={style["loading"]}>
              <h1>Carregando</h1>
            </div>
          ) : (
            <div className={style["box-books"]}>
              {books.map((book) => (
                <Book key={book.titulo} book={book} />
              ))}
            </div>
          )}
        </Container>
      </section>
    </>
  );
};

export default BooksPage;
