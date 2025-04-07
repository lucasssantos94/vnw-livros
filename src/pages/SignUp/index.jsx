import { useState } from "react";
import { useForm } from "react-hook-form";
import styles from "./styles.module.scss";
import { authApiServices } from "../../services/auth";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const SignUpPage = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const redictLogin = () => {
    navigate("/login");
  };

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();

  const clearForm = () => {
    reset();
  };

  const onSubmit = async (data) => {
    try {
      await authApiServices.register(data);
      toast.success("Conta criada com sucesso!", { autoClose: 2000 });
      clearForm();
      setTimeout(() => {
        redictLogin();
      }, 2000);
    } catch (error) {
      toast.error(error.response?.data?.error || "Erro ao registrar");
      console.error("Erro ao registrar:", error);
    }
  };

  const password = watch("password");

  return (
    <div className={`${styles.signUpContainer} `}>
      <form className={styles.signUpForm} onSubmit={handleSubmit(onSubmit)}>
        <h1 className={styles.title}>Criar Conta</h1>

        <div className={styles.formGroup}>
          <label htmlFor="email" className={styles.label}>
            E-mail
          </label>
          <input
            id="email"
            type="email"
            placeholder="seu@email.com"
            className={styles.input}
            {...register("email", {
              required: "E-mail é obrigatório",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "E-mail inválido",
              },
            })}
          />
          {errors.email && (
            <span className={styles.errorMessage}>{errors.email.message}</span>
          )}
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="nickname" className={styles.label}>
            Nickname
          </label>
          <input
            id="nickname"
            type="text"
            placeholder="Seu apelido"
            className={styles.input}
            {...register("nickname", {
              required: "Nickname é obrigatório",
              minLength: {
                value: 3,
                message: "Nickname deve ter pelo menos 3 caracteres",
              },
            })}
          />
          {errors.nickname && (
            <span className={styles.errorMessage}>
              {errors.nickname.message}
            </span>
          )}
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="password" className={styles.label}>
            Senha
          </label>
          <div className={styles.passwordInputContainer}>
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="Sua senha"
              className={styles.input}
              {...register("password", {
                required: "Senha é obrigatória",
                minLength: {
                  value: 6,
                  message: "Senha deve ter pelo menos 6 caracteres",
                },
              })}
            />
            <button
              type="button"
              aria-label={showPassword ? "Ocultar senha" : "Mostrar senha"}
              className={styles.togglePasswordButton}
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
          {errors.password && (
            <span className={styles.errorMessage}>
              {errors.password.message}
            </span>
          )}
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="confirmPassword" className={styles.label}>
            Confirmar Senha
          </label>
          <div className={styles.passwordInputContainer}>
            <input
              id="confirmPassword"
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Confirme sua senha"
              className={styles.input}
              {...register("confirmPassword", {
                required: "Confirmação de senha é obrigatória",
                validate: (value) =>
                  value === password || "As senhas não coincidem",
              })}
            />
            <button
              type="button"
              className={styles.togglePasswordButton}
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
          {errors.confirmPassword && (
            <span className={styles.errorMessage}>
              {errors.confirmPassword.message}
            </span>
          )}
        </div>

        <button
          type="submit"
          className={styles.submitButton}
          disabled={isSubmitting}
        >
          {isSubmitting ? "Cadastrando..." : "Cadastrar"}
        </button>
      </form>
    </div>
  );
};

export default SignUpPage;
