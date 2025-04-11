import { useState } from "react";
import { useForm } from "react-hook-form";
import PropTypes from "prop-types";
import { useChangePassWord } from "@hooks/useChangePassWord";
import { FaEye, FaEyeSlash } from "react-icons/fa";

import styles from "./styles.module.scss";

const FormChancePassWord = ({ onClose }) => {
  const { isLoading, handleChangePassWord } = useChangePassWord();
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      await handleChangePassWord({
        old_password: data.currentPassword,
        new_password: data.newPassword,
      });
      onClose();
    } catch (error) {
      console.log(error);
    }
  };

  const newPassword = watch("newPassword");

  return (
    <div className={styles["form-container"]}>
      <h2 className={styles["form-title"]}>Redefinir Senha</h2>
      <form onSubmit={handleSubmit(onSubmit)} className={styles["form"]}>
        <div className={styles["form-group"]}>
          <label htmlFor="currentPassword" className={styles["label"]}>
            Senha Atual
          </label>
          <div className={styles["password-input-container"]}>
            <input
              id="currentPassword"
              type={showCurrentPassword ? "text" : "password"}
              className={`${styles["input"]} ${
                errors.currentPassword ? styles["error"] : ""
              }`}
              {...register("currentPassword", {
                required: "Por favor, insira sua senha atual",
              })}
            />
            <button
              type="button"
              className={styles["toggle-password-button"]}
              onClick={() => setShowCurrentPassword(!showCurrentPassword)}
              aria-label={
                showCurrentPassword ? "Ocultar senha" : "Mostrar senha"
              }
            >
              {showCurrentPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
          {errors.currentPassword && (
            <span className={styles["error-message"]}>
              {errors.currentPassword.message}
            </span>
          )}
        </div>

        <div className={styles["form-group"]}>
          <label htmlFor="newPassword" className={styles["label"]}>
            Nova Senha
          </label>
          <div className={styles["password-input-container"]}>
            <input
              id="newPassword"
              type={showNewPassword ? "text" : "password"}
              className={`${styles["input"]} ${
                errors.newPassword ? styles["error"] : ""
              }`}
              {...register("newPassword", {
                required: "Por favor, insira uma nova senha",
                minLength: {
                  value: 6,
                  message: "A senha deve ter pelo menos 6 caracteres",
                },
              })}
            />
            <button
              type="button"
              className={styles["toggle-password-button"]}
              onClick={() => setShowNewPassword(!showNewPassword)}
              aria-label={showNewPassword ? "Ocultar senha" : "Mostrar senha"}
            >
              {showNewPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
          {errors.newPassword && (
            <span className={styles["error-message"]}>
              {errors.newPassword.message}
            </span>
          )}
        </div>

        <div className={styles["form-group"]}>
          <label htmlFor="confirmNewPassword" className={styles["label"]}>
            Confirmar Nova Senha
          </label>
          <div className={styles["password-input-container"]}>
            <input
              id="confirmNewPassword"
              type={showConfirmPassword ? "text" : "password"}
              className={`${styles["input"]} ${
                errors.confirmNewPassword ? styles["error"] : ""
              }`}
              {...register("confirmNewPassword", {
                required: "Por favor, confirme sua nova senha",
                validate: (value) =>
                  value === newPassword || "As senhas não coincidem",
              })}
            />
            <button
              type="button"
              className={styles["toggle-password-button"]}
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              aria-label={
                showConfirmPassword ? "Ocultar senha" : "Mostrar senha"
              }
            >
              {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
          {errors.confirmNewPassword && (
            <span className={styles["error-message"]}>
              {errors.confirmNewPassword.message}
            </span>
          )}
        </div>

        <button
          type="submit"
          className={styles["submit-button"]}
          disabled={isLoading}
        >
          {isLoading ? "Alterando..." : "Alterar Senha"}
        </button>

        <button
          type="button"
          className={styles["cancel-button"]}
          onClick={onClose}
        >
          Cancelar
        </button>
      </form>
    </div>
  );
};

FormChancePassWord.propTypes = {
  onClose: PropTypes.func,
};

export default FormChancePassWord;
