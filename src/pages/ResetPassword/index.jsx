import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useSearchParams, useNavigate } from "react-router-dom";
import { useResetPassword } from "@hooks/useResetPassword";

import styles from "./styles.module.scss";

const ResetPassword = () => {
  const navigate = useNavigate();
  const { handleResetPassword } = useResetPassword();
  const {
    register,
    handleSubmit,
    watch,
    setError,
    formState: { errors, isSubmitting },
  } = useForm();

  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");

  const onSubmit = async (data) => {
    try {
      await handleResetPassword(token, {
        new_password: data.password,
        confirm_password: data.confirmPassword,
      });

      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (error) {
      setError("password", { message: error.response.data.error });
      console.log(error);
    }
  };

  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, [token, navigate]);

  return (
    <section className={styles["s-reset-password"]}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <h2>Redefinir Senha</h2>
        <p>Crie sua nova senha</p>

        <label>Nova Senha</label>
        <input
          type="password"
          {...register("password", {
            required: "A senha é obrigatória",
            minLength: {
              value: 6,
              message: "A senha deve ter pelo menos 6 caracteres",
            },
          })}
          className={errors.password && "input-error"}
        />
        {errors.password && (
          <span className="error-text">{errors.password.message}</span>
        )}

        <label>Confirme a Senha</label>
        <input
          type="password"
          {...register("confirmPassword", {
            required: "Confirme sua senha",
            validate: (value) =>
              value === watch("password") || "As senhas não coincidem",
          })}
          className={errors.confirmPassword && "input-error"}
        />
        {errors.confirmPassword && (
          <span className="error-text">{errors.confirmPassword.message}</span>
        )}

        {errors.root && (
          <span className="error-text">{errors.root.message}</span>
        )}

        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Redefinindo..." : "Redefinir Senha"}
        </button>
      </form>
    </section>
  );
};

export default ResetPassword;
