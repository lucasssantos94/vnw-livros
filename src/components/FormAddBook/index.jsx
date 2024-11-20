import { useForm } from "react-hook-form";
import { useRef } from "react";
import CustomDatalist from "../Datalist";
import { addBook, categoriesBooks } from "@constants/books";
import { toast } from "react-toastify";

import iconForm from "@assets/images/icons/icon-form.png";
import styles from "./style.module.scss";

const FormAddBook = () => {
  const {
    handleSubmit,
    register,
    formState: { errors },
    setValue,
    reset,
  } = useForm();

  // Cria um ref para o CustomDatalist
  const datalistRef = useRef(null);

  const notify = () => {
    toast.success("Livro cadastrado com sucesso!", {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };

  const onSubmit = (data) => {
    addBook(data.title, data.category, data.author, data.urlImage);
    // Chama a função reset no CustomDatalist
    if (datalistRef.current) {
      datalistRef.current.reset();
    }
    notify();
    reset();
  };

  return (
    <form className={styles["form-add-book"]} onSubmit={handleSubmit(onSubmit)}>
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
          ref={datalistRef} // Conecta o ref ao CustomDatalist
          options={categoriesBooks}
          placeholder="Categoria"
          name="category"
          value={register("category").value}
          onChange={(e) => {
            setValue("category", e.target.value);
            register("category");
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
              value: /^(https?:\/\/)?([a-zA-Z0-9.-]+\.[a-zA-Z]{2,})([/?].*)?/,
              message: "Insira um link válido",
            },
          })}
        />
        {errors.urlImage && (
          <span className={styles["error-message"]}>
            {errors.urlImage.message}
          </span>
        )}
      </div>

      <input type="submit" value="Doar" />
    </form>
  );
};

export default FormAddBook;
