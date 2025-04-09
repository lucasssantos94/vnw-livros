import { useState } from "react";
import PropTypes from "prop-types";
import booksApiServices from "../../services/books";
import scrollToTop from "../../utils/scrollToTop";

import Book from "../Book";
import FormBook from "../FormBook";
import Modal from "../Modal";
import { FaEdit, FaTrash } from "react-icons/fa";

import styles from "./styles.module.scss";

const BookWithActions = ({ book, onDeleteSuccess, onEditSuccess }) => {
  const [modalFormEdit, setModalFormEdit] = useState(false);
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
      <div className={styles["box-book"]}>
        <Book book={book} />
        <div className={styles["actions-buttons"]}>
          <button
            className={styles["edit-button"]}
            onClick={() => setModalFormEdit(true)}
          >
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
      </div>

      {modalDelete && (
        <Modal isOpen={modalDelete}>
          <div className={styles["delete-content"]}>
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
        </Modal>
      )}

      {modalFormEdit && (
        <Modal isOpen={modalFormEdit} maxWidth="50rem">
          <FormBook
            isEditing={true}
            book={book}
            setModal={setModalFormEdit}
            onEditSuccess={onEditSuccess}
          />
        </Modal>
      )}
    </section>
  );
};

BookWithActions.propTypes = {
  book: PropTypes.object.isRequired,
  onDeleteSuccess: PropTypes.func,
  onEditSuccess: PropTypes.func,
};

export default BookWithActions;
