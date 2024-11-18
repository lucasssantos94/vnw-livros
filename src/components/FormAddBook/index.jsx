import { useForm } from "react-hook-form";
import { useRef } from "react";
import CustomDatalist from "../Datalist";
import { addBook, categoriesBooks } from "@constants/books";

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

  const onSubmit = (data) => {
    addBook(data.title, data.category, data.author, data.urlImage);
    reset();
    // Chama a função reset no CustomDatalist
    if (datalistRef.current) {
      datalistRef.current.reset();
    }
  };

  const options = categoriesBooks;

  return (
    <form className={styles["form-add-book"]} onSubmit={handleSubmit(onSubmit)}>
      <div className={styles["form-header"]}>
        <img src={iconForm} alt="" />
        <h3>Informações do Livro</h3>
      </div>

      <div>
        <input
          type="text"
          name="title"
          placeholder="Título"
          {...register("title", {
            required: { value: true, message: "Campo obrigatório" },
            minLength: {
              value: 2,
              message: "O Título deve ter pelo menos 2 caracteres",
            },
          })}
        />
        {errors.title && (
          <span className="error-message">{errors.title.message}</span>
        )}

        <CustomDatalist
          ref={datalistRef} // Conecta o ref ao CustomDatalist
          options={options}
          placeholder="Categoria"
          name="category"
          value={register("category").value}
          onChange={(e) => {
            setValue("category", e.target.value);
            register("category");
          }}
          error={errors.category}
        />

        <input
          type="text"
          name="author"
          placeholder="Nome do Autor"
          {...register("author")}
        />

        <input
          type="url"
          name="urlImage"
          placeholder="Link da Imagem"
          {...register("urlImage")}
        />
      </div>
      <input type="submit" value="Doar" />
    </form>
  );
};

export default FormAddBook;
