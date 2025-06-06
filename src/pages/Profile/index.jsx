import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useAuth } from "@hooks/useAuth";
import { useImagePreview } from "@hooks/useImagePreview";
import { useUpdateProfile } from "@hooks/useUpdateProfile";

import Container from "@components/Container";
import Modal from "@components/Modal";
import FormChancePassWord from "@components/FormChancePassWord";
import avatar from "@assets/images/icons/avatar.png";
import styles from "./styles.module.scss";

const Profile = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { imagePreview, handleUrlPreview } = useImagePreview();
  const { isUpdating, handleUpdateProfile } = useUpdateProfile();

  const { user, updateUser } = useAuth();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      await handleUpdateProfile({
        avatar_url: data.avatar_url,
        nickname: data.nickname,
      });
      updateUser({
        avatar_url: data.avatar_url,
        nickname: data.nickname,
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (user) {
      reset({
        avatar_url: user.avatar_url,
        nickname: user.nickname,
      });
    }
  }, [user, reset]);

  if (!user) {
    return (
      <div className={styles.error}>Erro ao carregar dados do usuário</div>
    );
  }

  return (
    <Container>
      <section className={styles["s-profile"]}>
        <h2 className={styles["title-section"]}>Meu Perfil</h2>
        <div className={styles["profile-container"]}>
          <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
            <div className={styles["preview-avatar"]}>
              <img
                src={imagePreview ? imagePreview : user.avatar_url || avatar}
                alt={user.nickname}
                className={styles.avatar}
              />
            </div>
            <div className={styles["form-group"]}>
              <label htmlFor="avatar_url" className={styles["label"]}>
                Avatar URL
              </label>
              <input
                id="avatar_url"
                type="url"
                {...register("avatar_url", {
                  pattern: {
                    value: /^(https?:\/\/).+$/i,
                    message: "URL inválida",
                  },
                })}
                value={imagePreview || user.avatar_url}
                className={styles["input"]}
                onChange={(e) => handleUrlPreview(e.target.value)}
              />
              {errors.avatar_url && (
                <span className={styles["error-message"]}>
                  {errors.avatar_url.message}
                </span>
              )}
            </div>

            <div className={styles["form-group"]}>
              <label htmlFor="nickname" className={styles["label"]}>
                Nickname
              </label>
              <input
                id="nickname"
                type="text"
                {...register("nickname", {
                  required: "Apelido é obrigatório",
                  minLength: {
                    value: 3,
                    message: "Apelido deve ter pelo menos 3 caracteres",
                  },
                })}
                className={styles["input"]}
              />
              {errors.nickname && (
                <span className={styles["error-message"]}>
                  {errors.nickname.message}
                </span>
              )}
            </div>

            <div className={styles["buttons-container"]}>
              <button
                type="button"
                className={styles["change-password-button"]}
                onClick={() => setIsModalOpen(true)}
              >
                Alterar Senha
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className={styles["save-button"]}
              >
                {isUpdating ? "Salvando..." : "Salvar Alterações"}
              </button>
            </div>
          </form>
        </div>

        {isModalOpen && (
          <Modal title="Alterar Senha" isOpen={isModalOpen}>
            <FormChancePassWord onClose={() => setIsModalOpen(false)} />
          </Modal>
        )}
      </section>
    </Container>
  );
};

export default Profile;
