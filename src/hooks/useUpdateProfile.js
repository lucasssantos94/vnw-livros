import { useState, useCallback } from "react";
import userApiServices from "@services/user";
import { toast } from "react-toastify";

export const useUpdateProfile = () => {
  const [isUpdating, setIsUpdating] = useState(false);
  const [error, setError] = useState(null);

  const handleUpdateProfile = useCallback(async (data) => {
    setIsUpdating(true);
    setError(null);
    try {
      await userApiServices.updateProfile(data);
      toast.success("Perfil atualizado com sucesso", {
        autoClose: 3000,
      });
    } catch (error) {
      setError(error);
      console.log(error);
      toast.error("Erro ao atualizar perfil, tente novamente", {
        autoClose: false,
      });
    } finally {
      setIsUpdating(false);
    }
  }, []);

  return { isUpdating, error, handleUpdateProfile };
};
