import { useForm } from "react-hook-form";
import { useState } from "react";
import { useForgotPassword } from "@hooks/useForgotPassword";

import styles from "./styles.module.scss";

const RecoveryPassword = () => {
  const { handleForgotPassword } = useForgotPassword();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm();

  const [emailSent, setEmailSent] = useState(false);

  const onSubmit = async (data) => {
    try {
      await handleForgotPassword({ email: data.email });
      setEmailSent(true);
      console.log(data);
      reset();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section className={styles["s-recovery"]}>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <h2>Recuperar Senha</h2>

        <p>
          Digite o e-mail cadastrado abaixo para receber o link de redefinição
          de senha.
        </p>

        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          placeholder="exemplo@email.com"
          {...register("email", {
            required: "O e-mail é obrigatório",
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: "Digite um e-mail válido",
            },
          })}
          className={errors.email ? styles["input-error"] : ""}
        />
        {errors.email && (
          <span className={styles["error-text"]}>{errors.email.message}</span>
        )}

        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Enviando..." : "Enviar e-mail de recuperação"}
        </button>

        {emailSent && (
          <p className={styles["success-text"]}>
            Se o e-mail estiver cadastrado, você receberá um link para redefinir
            sua senha.
          </p>
        )}
      </form>
    </section>
  );
};

export default RecoveryPassword;
