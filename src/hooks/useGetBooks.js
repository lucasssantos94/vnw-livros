import { useState, useCallback } from "react";
import booksApiServices from "@services/books";
import { toast } from "react-toastify";

export const useBooks = () => {
  const [books, setBooks] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const getBooks = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await booksApiServices.getAll();
      setBooks(response);
    } catch (error) {
      const errorMsg = error.message || "Erro ao buscar livros.";
      setError(errorMsg);
      toast.error(errorMsg);
    } finally {
      setIsLoading(false);
    }
  }, []);

  return { books, isLoading, error, getBooks };
};
