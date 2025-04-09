import { useEffect } from "react";
import PropTypes from "prop-types";

import styles from "./styles.module.scss";

const Modal = ({ isOpen, onClose, children, maxWidth = "40rem" }) => {
  useEffect(() => {
    if (isOpen) {
      document.body.classList.add("modal-open");
    } else {
      document.body.classList.remove("modal-open");
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className={styles["modal-container"]} onClick={onClose}>
      <div className={styles["modal-content"]} style={{ maxWidth }}>
        {children}
      </div>
    </div>
  );
};

Modal.propTypes = {
  isOpen: PropTypes.bool,
  onClose: PropTypes.func,
  children: PropTypes.node,
  maxWidth: PropTypes.string,
};

export default Modal;
