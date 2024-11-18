import PropTypes from "prop-types";

import styles from "./style.module.scss";

const GridContainer = ({ children }) => {
  return <div className={styles["grid-container"]}>{children}</div>;
};

GridContainer.propTypes = {
  children: PropTypes.node.isRequired,
};

export default GridContainer;
