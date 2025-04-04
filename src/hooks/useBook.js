import { useState, useCallback } from "react";
import { bookApiServices } from "../api/booksApi";

export const useBooks = () => {
  const [books, setBooks] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const getBooks = useCallback(async (signal) => {
    setIsLoading(true);
    setError(null);

    try {
      const data = await bookApiServices.getAll(signal);
      setBooks(data);
    } catch (error) {
      if (!signal?.aborted) {
        setError(error);
      }
    } finally {
      if (!signal?.aborted) {
        setTimeout(() => {
          setIsLoading(false);
        }, 1000);
      }
    }
  }, []);

  return { books, isLoading, error, getBooks };
};
