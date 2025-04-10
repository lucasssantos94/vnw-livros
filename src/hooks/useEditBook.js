import { useState, useCallback } from "react";
import bookApiServices from "@services/books";
import { toast } from "react-toastify";

export const useEditBook = () => {
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState(null);

  const handleEditBook = useCallback(async (id, data) => {
    setIsSaving(true);
    setError(null);
    try {
      await bookApiServices.editBook(id, data);
      toast.success("Livro editado", {
        autoClose: 3000,
      });
    } catch (error) {
      setError(error);
      console.log(error);
      toast.error("Erro ao editar livro, tente novamente", {
        autoClose: false,
      });
    } finally {
      setIsSaving(false);
    }
  }, []);

  return { isSaving, error, handleEditBook };
};
