import { useCallback } from "react";
import { authApiServices } from "@services/auth";
import { toast } from "react-toastify";

export const useResetPassword = () => {
  const handleResetPassword = useCallback(async (token, data) => {
    try {
      await authApiServices.resetPassword(token, data);
      toast.success("Senha alterada");
    } catch (error) {
      console.log(error);
      throw error;
    }
  }, []);

  return { handleResetPassword };
};
