import PropTypes from "prop-types";

import styles from "./style.module.scss";

const RootLayout = ({ children }) => {
  return <div className={styles["grid-layout"]}>{children}</div>;
};

RootLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default RootLayout;
