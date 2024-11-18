import { NavLink } from "react-router-dom";
import Container from "../Container";
import FormSearch from "../FormSearch";

import Logo from "@assets/images/logo.png";
import styles from "./style.module.scss";

const Header = () => {
  return (
    <header className={styles.header}>
      <Container>
        <NavLink to="/" className={styles.logo}>
          <img src={Logo} alt="Logo de um livro aberto" />
          <h1>Livros Vai na Web</h1>
        </NavLink>

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

        <FormSearch />
      </Container>
    </header>
  );
};

export default Header;
