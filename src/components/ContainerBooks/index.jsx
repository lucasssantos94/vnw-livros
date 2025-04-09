import PropTypes from "prop-types";

import styles from "./styles.module.scss";

const ContainerBooks = ({ children }) => {
  return <div className={styles["container-books"]}>{children}</div>;
};

ContainerBooks.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ContainerBooks;
