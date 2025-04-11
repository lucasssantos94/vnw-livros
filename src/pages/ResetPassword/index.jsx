import { useForm } from "react-hook-form";
import { useSearchParams } from "react-router-dom";
import styles from "./styles.module.scss";

const ResetPassword = () => {
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
    if (!token) {
      setError("root", {
        message: "Token inválido ou ausente.",
      });
      return;
    }

    try {
      const response = await fetch(
        "http://localhost:5000/auth/reset-password",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ token, password: data.password }),
        },
      );

      const result = await response.json();

      if (!response.ok) {
        setError("root", {
          message: result.message || "Erro ao redefinir senha.",
        });
        return;
      }

      alert("Senha redefinida com sucesso!");
      // Redirecionar ou limpar o formulário
    } catch (err) {
      setError("root", {
        message: "Erro de conexão com o servidor.",
      });
      console.log(err);
    }
  };

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
