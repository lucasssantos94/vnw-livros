import { useState } from "react";
import { useForm } from "react-hook-form";
import { authApiServices } from "../../services/auth";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

import { FaEye, FaEyeSlash } from "react-icons/fa";
import styles from "./styles.module.scss";

const ModalLogin = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  const [showPassword, setShowPassword] = useState(false);

  const onSubmit = async (data) => {
    try {
      const response = await authApiServices.login(data);
      const token = response.access_token;
      login(token);
      navigate(location.state?.from || "/doar");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={styles["modal-container"]}>
      <div className={styles.loginContainer}>
        <form className={styles.loginForm} onSubmit={handleSubmit(onSubmit)}>
          <h2 className={styles.title}>Login</h2>

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
              <span className={styles.errorMessage}>
                {errors.email.message}
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
                })}
              />
              <button
                type="button"
                className={styles.togglePasswordButton}
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? "Ocultar senha" : "Mostrar senha"}
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

          <button
            type="submit"
            className={styles.submitButton}
            disabled={isSubmitting}
          >
            {isSubmitting ? "Entrando..." : "Entrar"}
          </button>

          <div className={styles.registerLink}>
            <span>Não tem uma conta? </span>
            <Link to="/cadastro">Cadastre-se</Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ModalLogin;
