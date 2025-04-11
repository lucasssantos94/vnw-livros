import { useState, useCallback } from "react";
import { authApiServices } from "@services/auth";
import { toast } from "react-toastify";

export const useForgotPassword = () => {
  const [loading, setLoading] = useState(false);

  const handleForgotPassword = useCallback(async (email) => {
    setLoading(true);
    try {
      await authApiServices.forgotPassword(email);
      toast.success("Email enviado", {
        autoClose: 3000,
      });
    } catch (error) {
      toast.error(error.response?.data?.error, {
        autoClose: false,
      });
    } finally {
      setLoading(false);
    }
  }, []);

  return { loading, handleForgotPassword };
};
