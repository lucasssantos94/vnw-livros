import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { authApiServices } from "@services/auth";
import { useAuth } from "@hooks/useAuth";

import { FaEye, FaEyeSlash } from "react-icons/fa";
import styles from "./styles.module.scss";

const Login = () => {
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
      const token = response?.access_token;
      login(token);
      navigate(location.state?.from || "/doar");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={styles["modal-container"]}>
      <div className={styles["login-container"]}>
        <form
          className={styles["login-form"]}
          onSubmit={handleSubmit(onSubmit)}
        >
          <h2 className={styles["title"]}>Login</h2>

          <div className={styles["form-group"]}>
            <label htmlFor="email" className={styles["label"]}>
              E-mail
            </label>
            <input
              id="email"
              type="email"
              placeholder="seu@email.com"
              className={styles["input"]}
              {...register("email", {
                required: "E-mail é obrigatório",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "E-mail inválido",
                },
              })}
            />
            {errors.email && (
              <span className={styles["error-message"]}>
                {errors.email.message}
              </span>
            )}
          </div>

          <div className={styles["form-group"]}>
            <label htmlFor="password" className={styles["label"]}>
              Senha
            </label>
            <div className={styles["password-input-container"]}>
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Sua senha"
                className={styles["input"]}
                {...register("password", {
                  required: "Senha é obrigatória",
                })}
              />
              <button
                type="button"
                className={styles["toggle-password-button"]}
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? "Ocultar senha" : "Mostrar senha"}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
            {errors.password && (
              <span className={styles["error-message"]}>
                {errors.password.message}
              </span>
            )}
          </div>

          <button
            type="submit"
            className={styles["submit-button"]}
            disabled={isSubmitting}
          >
            {isSubmitting ? "Entrando..." : "Entrar"}
          </button>

          <div className={styles["forgot-password"]}>
            <Link to="/recuperar-senha">Esqueceu a senha? clique aqui</Link>
          </div>

          <div className={styles["register-link"]}>
            <span>Não tem uma conta? </span>
            <Link to="/cadastro">Cadastre-se</Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
