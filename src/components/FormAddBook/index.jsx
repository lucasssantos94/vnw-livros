import { useForm } from "react-hook-form";
import { useRef, useEffect, useState } from "react";
import CustomDatalist from "@components/Datalist";
import categoriesBooks from "@constants/categoriesBooks";
import { toast } from "react-toastify";
import axios from "axios";

import iconForm from "@assets/images/icons/icon-form.png";
import styles from "./style.module.scss";

const FormAddBook = () => {
  const [isSending, setIsSending] = useState(false);

  const {
    handleSubmit,
    register,
    formState: { errors },
    setValue,
    reset,
    clearErrors,
  } = useForm();

  const formRef = useRef(null);
  const datalistRef = useRef(null);

  const onSubmit = async (data) => {
    setIsSending(true);
    try {
      const apiUrl = import.meta.env.VITE_API_URL;
      await axios.post(`${apiUrl}/doar`, {
        titulo: data.title,
        categoria: data.category,
        autor: data.author,
        imagem_url: data.urlImage,
      });

      if (datalistRef.current) {
        datalistRef.current.reset();
      }
      toast.success("Livro cadastrado, Obrigado pela doação", {
        autoClose: 1000,
      });
      reset();
    } catch (error) {
      console.error(error);
      toast.error("Erro ao cadastrar livro, tente novamente");
    } finally {
      setIsSending(false);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (formRef.current && !formRef.current.contains(event.target)) {
        clearErrors(); // Limpa todos os erros
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [clearErrors]);

  return (
    <form
      className={styles["form-add-book"]}
      onSubmit={handleSubmit(onSubmit)}
      ref={formRef}
    >
      <div className={styles["form-header"]}>
        <img src={iconForm} alt="" />
        <h3>Informações do Livro</h3>
      </div>

      <div className={styles["box-input"]}>
        <input
          type="text"
          name="title"
          placeholder="Título"
          {...register("title", {
            required: { value: true, message: "Campo obrigatório" },
          })}
        />
        {errors.title && (
          <span className={styles["error-message"]}>
            {errors.title.message}
          </span>
        )}
      </div>

      <div className={styles["box-input"]}>
        <CustomDatalist
          ref={datalistRef}
          options={categoriesBooks}
          placeholder="Categoria"
          name="category"
          value={register("category").value}
          onChange={(e) => {
            setValue("category", e.target.value);
            register("category", {
              required: true,
              message: "Campo obrigatório",
            });
          }}
          error={errors.category?.message}
        />
      </div>

      <div className={styles["box-input"]}>
        <input
          type="text"
          name="author"
          placeholder="Autor"
          {...register("author", {
            required: { value: true, message: "Campo obrigatório" },
          })}
        />
        {errors.author && (
          <span className={styles["error-message"]}>
            {errors.author.message}
          </span>
        )}
      </div>

      <div className={styles["box-input"]}>
        <input
          type="text"
          name="urlImage"
          placeholder="Link da Imagem"
          {...register("urlImage", {
            required: { value: true, message: "Campo obrigatório" },
            pattern: {
              value:
                /^https:\/\/(www\.)?[\w-@:%._+~#=]{1,256}\.[a-z\d()]{1,6}\b([\w-@:%+._~#?&//=]*)$/i,
              message: "Insira um link válido (deve conter uma imagem)",
            },
          })}
        />
        {errors.urlImage && (
          <span className={styles["error-message"]}>
            {errors.urlImage.message}
          </span>
        )}
      </div>

      <input
        type="submit"
        value={isSending ? "Enviando..." : "Enviar"}
        disabled={isSending}
      />
    </form>
  );
};

export default FormAddBook;
