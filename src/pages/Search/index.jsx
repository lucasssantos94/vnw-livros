import { useParams } from "react-router-dom";
import { books } from "../../constants/books";
import Book from "../../components/Book";
import Container from "../../components/Container";

const SearchPage = () => {
  const { title } = useParams();
  console.log(title);

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
      <Container>
        <h2 className="title-section">{`${searchedBooks.length} ${
          searchedBooks.length > 1 ? "resultados" : "resultado"
        } para ${title}`}</h2>
        <div>
          {searchedBooks &&
            searchedBooks.map((book) => <Book key={book.title} book={book} />)}
        </div>
      </Container>
    </>
  );
};

export default SearchPage;
