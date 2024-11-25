import PropTypes from "prop-types";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Search from "@assets/images/icons/search.png";

import styles from "./style.module.scss";

const FormSearch = ({ closeMenu }) => {
  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
    clearErrors,
  } = useForm();

  const navigate = useNavigate();

  const onSubmit = (data) => {
    navigate(`/livros/${data.title.trim()}`);
    reset();
    {
      closeMenu && closeMenu();
    }
  };

  return (
    <div>
      <form className={styles["form-search"]} onSubmit={handleSubmit(onSubmit)}>
        <input
          className={styles["input-search"]}
          type="search"
          placeholder="O que você procura ?"
          {...register("title", {
            required: {
              value: true,
              message: "O campo de pesquisa deve ser preenchido",
            },

            onBlur: () => clearErrors("title"),
          })}
        />

        <button className={styles["btn-search"]}>
          <img src={Search} alt="lupa para realizar pesquisa" />
        </button>
        {errors.title && (
          <span className={styles["error-message"]}>
            {errors.title.message}
          </span>
        )}
      </form>
    </div>
  );
};

FormSearch.propTypes = {
  closeMenu: PropTypes.func,
};

export default FormSearch;
