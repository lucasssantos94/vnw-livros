import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";

import styles from "./styles.module.scss";

const NavLinks = ({ closeMenu }) => {
  return (
    <nav className={styles.menu}>
      <NavLink
        to="/"
        className={({ isActive }) => (isActive ? `${styles.active}` : "")}
        onClick={closeMenu}
      >
        Inicio
      </NavLink>
      <NavLink
        to="/livros"
        className={({ isActive }) => (isActive ? `${styles.active}` : "")}
        onClick={closeMenu}
      >
        Livros Doados
      </NavLink>
      <NavLink
        to="/doar"
        className={({ isActive }) => (isActive ? `${styles.active}` : "")}
        onClick={closeMenu}
      >
        Quero Doar
      </NavLink>
    </nav>
  );
};

NavLinks.propTypes = {
  closeMenu: PropTypes.func,
};

export default NavLinks;
