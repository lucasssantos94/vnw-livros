import { bookApiServices } from "../api/booksApi";
import { useState, useCallback } from "react";

export const useSearchBook = () => {
  const [searchedBooks, setSearchedBooks] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearchBook = useCallback(async (title) => {
    setIsLoading(true);
    setSearchedBooks([]);
    try {
      const data = await bookApiServices.searchBook(title);
      setSearchedBooks(data.length > 0 ? data : []);
    } catch (error) {
      console.log(`Erro ao buscar livro: ${error}`);
      setError(error.message || "Erro ao buscar livro.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  return { searchedBooks, isLoading, error, handleSearchBook };
};
