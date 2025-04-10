import { useState, useCallback } from "react";
import userApiServices from "@services/user";
import { toast } from "react-toastify";

export const useChangePassWord = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChangePassWord = useCallback(async (data) => {
    setIsLoading(true);
    setError(null);
    try {
      await userApiServices.changePassword(data);
      toast.success("Senha alterada com sucesso", {
        autoClose: 3000,
      });
    } catch (error) {
      setError(error);
      console.log(error);
      toast.error("Erro ao alterar senha, tente novamente", {
        autoClose: false,
      });
    } finally {
      setIsLoading(false);
    }
  }, []);

  return { isLoading, error, handleChangePassWord };
};
