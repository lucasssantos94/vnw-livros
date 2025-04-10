import { useState } from "react";
import bookApiServices from "@services/books";
import { toast } from "react-toastify";

export const useDonateBook = () => {
  const [isSending, setIsSending] = useState(false);
  const [error, setError] = useState(null);

  const handleDonateBook = async (bookData, onSucess) => {
    setIsSending(true);
    setError(null);
    try {
      await bookApiServices.donate(bookData);

      toast.success("Livro cadastrado, Obrigado pela doação", {
        autoClose: false,
      });

      if (onSucess) onSucess();
    } catch (error) {
      setError(error);
      console.log(error);
      toast.error("Erro ao cadastrar livro, tente novamente", {
        autoClose: false,
      });
    } finally {
      setIsSending(false);
    }
  };

  return { isSending, error, handleDonateBook };
};
