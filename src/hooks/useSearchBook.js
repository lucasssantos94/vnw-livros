import booksApiServices from "@services/books";
import { useState, useCallback } from "react";

export const useSearchBook = () => {
  const [searchedBooks, setSearchedBooks] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearchBook = useCallback(async (title) => {
    setIsLoading(true);
    setSearchedBooks([]);
    try {
      const data = await booksApiServices.searchBook(title);
      setSearchedBooks(data.length > 0 ? data : []);
    } catch (error) {
      setError(error.message || "Erro ao buscar livro.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  return { searchedBooks, isLoading, error, handleSearchBook };
};
