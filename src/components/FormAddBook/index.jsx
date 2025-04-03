import { useForm } from "react-hook-form";
import { useRef, useEffect, useState } from "react";
import CustomDatalist from "@components/Datalist";
import categoriesBooks from "@constants/categoriesBooks";
import { useDonateBook } from "@hooks/useDonateBook";
import { useImagePreview } from "../../hooks/useImagePreview";
import scrollToTop from "../../utils/scrollToTop";
import useUploadImage from "@hooks/useUploadImage";

import iconForm from "@assets/images/icons/icon-form.png";
import styles from "./style.module.scss";

const FormAddBook = () => {
  const { isSending, handleDonateBook } = useDonateBook();

  const { imagePreview, handleUrlPreview, handleFilePreview, setImagepreview } =
    useImagePreview();

  const { uploadImage } = useUploadImage();

  const {
    handleSubmit,
    register,
    formState: { errors },
    setValue,
    reset,
    clearErrors,
  } = useForm();

  const [uploadImageOption, setUploadImageOption] = useState("url");

  const formRef = useRef(null);
  const datalistRef = useRef(null);

  const onSubmit = async (data) => {
    let uploadedImageUrl = data.urlImage;
    if (uploadImageOption === "file" && data.fileImage[0]) {
      uploadedImageUrl = await uploadImage(data.fileImage[0]);
      if (!uploadedImageUrl) return;
    }

    const bookData = {
      ...data,
      urlImage: uploadedImageUrl,
    };

    handleDonateBook(bookData, () => {
      reset();
      if (datalistRef.current) {
        datalistRef.current.reset();
      }
      setImagepreview(null);
      scrollToTop();
    });
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (formRef.current && !formRef.current.contains(event.target)) {
        clearErrors();
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
        <img src={iconForm} alt="icon book" />
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
        <div>
          <button type="button" onClick={() => setUploadImageOption("url")}>
            URL
          </button>
          <button type="button" onClick={() => setUploadImageOption("file")}>
            Upload
          </button>
        </div>

        {uploadImageOption === "url" ? (
          <>
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
              onChange={(e) => {
                handleUrlPreview(e.target.value);
              }}
            />
            {errors.urlImage && (
              <span className={styles["error-message"]}>
                {errors.urlImage.message}
              </span>
            )}
          </>
        ) : (
          <>
            <input
              type="file"
              name="fileImage"
              accept="image/*"
              {...register("fileImage", {
                required: { value: true, message: "Campo obrigatório" },
              })}
              onChange={(e) => {
                handleFilePreview(e.target.files[0]);
              }}
            />
            {errors.fileImage && (
              <span className={styles["error-message"]}>
                {errors.fileImage.message}
              </span>
            )}
          </>
        )}
      </div>

      {imagePreview && (
        <div className={styles["image-preview"]}>
          <h3>visualização da Capa</h3>

          <img src={imagePreview} alt="preview da capa do livro" />
        </div>
      )}
      <input
        type="submit"
        value={isSending ? "Enviando..." : "Enviar"}
        disabled={isSending}
      />
    </form>
  );
};

export default FormAddBook;
