import { NavLink } from "react-router-dom";
import styles from "./styles.module.scss";

const NavLinks = () => {
  return (
    <nav className={styles.menu}>
      <NavLink
        to="/"
        className={({ isActive }) => (isActive ? `${styles.active}` : "")}
      >
        Inicio
      </NavLink>
      <NavLink
        to="/livros"
        className={({ isActive }) => (isActive ? `${styles.active}` : "")}
      >
        Livros Doados
      </NavLink>
      <NavLink
        to="/cadastro"
        className={({ isActive }) => (isActive ? `${styles.active}` : "")}
      >
        Quero Doar
      </NavLink>
    </nav>
  );
};

export default NavLinks;
