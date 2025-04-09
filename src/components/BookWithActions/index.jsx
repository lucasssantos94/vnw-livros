import { useState } from "react";
import PropTypes from "prop-types";
import booksApiServices from "../../services/books";
import scrollToTop from "../../utils/scrollToTop";

import Book from "../Book";
import { FaEdit, FaTrash } from "react-icons/fa";

import styles from "./styles.module.scss";

const BookWithActions = ({ book, onDeleteSuccess }) => {
  //   const [modalFormEdit, setModalFormEdit] = useState(false);
  const [modalDelete, setModalDelete] = useState(false);

  const handleDelete = () => {
    try {
      booksApiServices.deleteBook(book.id);
      setModalDelete(false);
      onDeleteSuccess();
      scrollToTop();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section className={styles["s-books"]}>
      <Book book={book} />
      <div className={styles["actions-buttons"]}>
        <button className={styles["edit-button"]}>
          <FaEdit />
          Editar
        </button>

        <button
          className={styles["delete-button"]}
          onClick={() => setModalDelete(true)}
        >
          <FaTrash />
          Deletar
        </button>
      </div>

      {modalDelete && (
        <div
          className={`${styles["modal-delete"]} ${modalDelete ? styles.active : ""}`}
        >
          <div className={styles["modal-content"]}>
            <h3>
              Tem certeza que deseja <span>deletar</span> o livro &quot;
              {book.title}&quot; ?
            </h3>
            <div className={styles["actions-buttons"]}>
              <button
                onClick={() => setModalDelete(false)}
                className={styles["cancel-button"]}
              >
                Cancelar
              </button>
              <button
                onClick={handleDelete}
                className={styles["confirm-button"]}
              >
                Confirmar
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

BookWithActions.propTypes = {
  book: PropTypes.object.isRequired,
  onDeleteSuccess: PropTypes.func,
};

export default BookWithActions;
