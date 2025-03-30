import { useState } from "react";
import { bookApiServices } from "../api/booksApi";
import { toast } from "react-toastify";

export const useDonateBook = () => {
  const [isSending, setIsSending] = useState(false);
  const [error, setError] = useState(null);

  const handleDonateBook = async (bookData, onSucess) => {
    setIsSending(true);
    setError(null);

    try {
      await bookApiServices.donateBook({
        titulo: bookData.title,
        categoria: bookData.category,
        autor: bookData.author,
        imagem_url: bookData.urlImage,
      });

      toast.success("Livro cadastrado, Obrigado pela doação", {
        autoClose: 1000,
      });

      if (onSucess) onSucess();
    } catch (error) {
      setError(error);
      console.log(error);
      toast.error("Erro ao cadastrar livro, tente novamente");
    } finally {
      setIsSending(false);
    }
  };

  return { isSending, error, handleDonateBook };
};
