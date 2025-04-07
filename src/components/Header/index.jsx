import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import Container from "@components/Container";
import FormSearch from "@components/FormSearch";
import UserMenu from "@components/UserMenu";

import Logo from "@assets/images/icons/logo.png";
import NavLinks from "@components/NavLinks";
import MenuMobile from "@components/MenuMobile";

import styles from "./styles.module.scss";

const Header = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 992);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 992);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [isMobile]);

  return (
    <header className={styles.header}>
      <Container>
        <NavLink to="/" className={styles.logo}>
          <img src={Logo} alt="Logo de um livro aberto" />
          <h1>Livros Vai Na Web</h1>
        </NavLink>

        {isMobile ? (
          <MenuMobile />
        ) : (
          <>
            <NavLinks />

            <FormSearch />
            <UserMenu />
          </>
        )}
      </Container>
    </header>
  );
};

export default Header;
