/* eslint-disable react-hooks/exhaustive-deps */
import { useForm } from "react-hook-form";
import { useRef, useEffect, useState } from "react";
import { useDonateBook } from "@hooks/useDonateBook";
import { useImagePreview } from "@hooks/useImagePreview";
import useUploadImage from "@hooks/useUploadImage";

import CustomDatalist from "@components/Datalist";
import categoriesBooks from "@constants/categoriesBooks";
import scrollToTop from "@utils/scrollToTop";

import iconForm from "@assets/images/icons/icon-form.png";
import iconUrl from "@assets/images/icons/icon-url.svg";
import iconImage from "@assets/images/icons/icon-image.svg";

import styles from "./style.module.scss";
import { toast } from "react-toastify";
// import booksApiServices from "@services/books";

const FormAddBook = () => {
  const { isSending, handleDonateBook } = useDonateBook();
  const {
    imagePreview,
    handleUrlPreview,
    handleFilePreview,
    setImagepreview,
    clearPreview,
  } = useImagePreview();
  const { uploadImage, isUploading } = useUploadImage();
  const [uploadImageOption, setUploadImageOption] = useState("url");
  const [fileName, setFileName] = useState("");

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
    let uploadedImageUrl = data.image_url;

    if (uploadImageOption === "file") {
      if (data.fileImage && data.fileImage[0]) {
        const file = data.fileImage[0];

        if (file.size > 2 * 1024 * 1024) {
          toast.error("O arquivo deve ter no máximo 2MB", {
            autoClose: false,
          });
          scrollToTop();
          return;
        }

        uploadedImageUrl = await uploadImage(file);
        if (!uploadedImageUrl) return;
      } else {
        toast.error("Por favor, selecione um arquivo de imagem.");
        return;
      }
    }

    const bookData = {
      ...data,
      image_url: uploadedImageUrl,
    };

    try {
      await handleDonateBook(bookData);
      reset();
      if (datalistRef.current) datalistRef.current.reset();
      setImagepreview(null);
      setFileName("");
      scrollToTop();
    } catch (err) {
      console.error(err);
    }
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
  }, [clearErrors, clearPreview]);

  useEffect(() => {
    setValue("urlImage", "");
    setFileName("");
    clearErrors("urlImage");
    clearErrors("fileImage");

    if (imagePreview) {
      setImagepreview(null);
    }
  }, [uploadImageOption]);

  useEffect(() => {
    return () => {
      clearPreview();
    };
  }, []);

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
        <div className={styles["upload-options"]}>
          <button
            type="button"
            className={`${styles["option-button"]} ${
              uploadImageOption === "url" ? styles["active"] : ""
            }`}
            onClick={() => setUploadImageOption("url")}
            disabled={isUploading}
          >
            <img src={iconUrl} alt="icon url" />
            URL
          </button>
          <button
            type="button"
            className={`${styles["option-button"]} ${
              uploadImageOption === "file" ? styles["active"] : ""
            }`}
            onClick={() => setUploadImageOption("file")}
            disabled={isUploading}
          >
            <img
              src={iconImage}
              alt="icon image"
              className={styles["image-icon"]}
            />
            ARQUIVO
          </button>
        </div>

        {uploadImageOption === "url" ? (
          <>
            <input
              type="url"
              name="image_url"
              placeholder="Link da Imagem (ex: https://exemplo.com/imagem.jpg)"
              {...register("image_url", {
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
            {errors.image_url && (
              <span className={styles["error-message"]}>
                {errors.image_url.message}
              </span>
            )}
          </>
        ) : (
          <div className={styles["file-input-wrapper"]}>
            <input
              type="file"
              id="fileUpload"
              name="fileImage"
              accept="image/*"
              {...register("fileImage", {
                required: { value: true, message: "Campo obrigatório" },
              })}
              onChange={(e) => {
                const file = e.target.files[0];
                handleFilePreview(file);
                setFileName(file?.name || "");
              }}
              className={styles["file-input"]}
            />
            <label
              htmlFor="fileUpload"
              className={`${styles["custom-file-input"]} ${
                fileName ? styles["has-file"] : ""
              }`}
            >
              {fileName || "Nenhum arquivo selecionado"}
            </label>
            {errors.fileImage && (
              <span className={styles["error-message"]}>
                {errors.fileImage.message}
              </span>
            )}
          </div>
        )}
      </div>

      {imagePreview && (
        <div className={styles["image-preview"]}>
          <h3>Visualização da Capa</h3>
          <img src={imagePreview} alt="preview da capa do livro" />
        </div>
      )}

      <input
        type="submit"
        value={isSending || isUploading ? "Enviando..." : "Enviar"}
        disabled={isSending || isUploading}
        className={styles["submit-button"]}
      />
    </form>
  );
};

export default FormAddBook;
