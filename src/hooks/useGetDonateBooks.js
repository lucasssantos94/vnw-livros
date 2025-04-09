import { useState, useCallback } from "react";
import userApiServices from "@services/user";
export const useGetDonateBooks = () => {
  const [donateBooks, setDonateBooks] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const getDonateBooks = useCallback(async (id) => {
    try {
      setIsLoading(true);
      const response = await userApiServices.getDonateBooks(id);
      setDonateBooks(response);
    } catch (error) {
      setError(error.message || "Erro ao buscar livros.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  return { donateBooks, isLoading, error, getDonateBooks };
};
