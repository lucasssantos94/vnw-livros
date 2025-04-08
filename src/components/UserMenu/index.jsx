import { useState, useRef, useEffect } from "react";
import { useAuth } from "../../hooks/useAuth";
import PropTypes from "prop-types";

import { Link, useNavigate } from "react-router-dom";
import avatar from "@assets/images/icons/avatar.png";

import styles from "./styles.module.scss";

const UserMenu = ({ closeMenu }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const handleToggleDropdown = () => {
    setIsOpen(!isOpen);
    if (closeMenu) {
      closeMenu();
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className={styles["profile-menu"]} ref={dropdownRef}>
      {user ? (
        <div className={styles["logged-in"]}>
          <div
            className={styles["user-info"]}
            onClick={() => setIsOpen(!isOpen)}
          >
            <img
              src={user.avatar_url || avatar}
              alt={user.nickname}
              className={styles["user-avatar"]}
            />
            <span className={styles["username"]}>
              {user.nickname || "Usuário"}
            </span>
          </div>
          <div
            className={`${styles["dropdown-menu"]} ${isOpen ? styles.open : ""}`}
          >
            <Link
              to="/dashboard"
              className={styles["dropdown-item"]}
              onClick={handleToggleDropdown}
            >
              Dashboard
            </Link>
            <Link
              to="/profile"
              className={styles["dropdown-item"]}
              onClick={handleToggleDropdown}
            >
              Meu Perfil
            </Link>
            <button
              onClick={() => {
                handleLogout();
                handleToggleDropdown();
              }}
              className={`${styles["dropdown-item"]} ${styles["logout"]}`}
            >
              Sair
            </button>
          </div>
        </div>
      ) : (
        <Link
          to="/login"
          className={styles["login-button"]}
          onClick={closeMenu}
        >
          Entrar
        </Link>
      )}
    </div>
  );
};

UserMenu.propTypes = {
  closeMenu: PropTypes.func,
};

export default UserMenu;
