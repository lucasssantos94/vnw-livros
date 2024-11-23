import { useState, useEffect, useRef } from "react";
import styles from "./styles.module.scss";
import NavLinks from "../NavLinks";
import FormSearch from "../FormSearch";

const MenuMobile = () => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    const closeMenu = (e) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(e.target) &&
        !e.target.closest(`.${styles.formSearch}`)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("click", closeMenu);
    return () => {
      document.removeEventListener("click", closeMenu);
    };
  }, []);

  const handleClick = (e) => {
    e.stopPropagation();
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  return (
    <>
      <span
        className={`${styles.hamburguer} ${isOpen ? styles.active : ""}`}
        onClick={handleClick}
      />
      <div
        ref={menuRef}
        className={`${styles["menu-mobile"]} ${isOpen ? styles.open : ""}`}
      >
        <FormSearch className={styles.formSearch} closeMenu={closeMenu} />
        <NavLinks closeMenu={closeMenu} />
      </div>
    </>
  );
};

export default MenuMobile;
