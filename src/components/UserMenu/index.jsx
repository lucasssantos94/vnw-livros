import { useState, useRef, useEffect } from "react";
import { useAuth } from "../../hooks/useAuth";

import { Link, useNavigate } from "react-router-dom";
import avatar from "@assets/images/icons/avatar.png";

import styles from "./styles.module.scss";

const UserMenu = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  // console.log(user);

  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  // Fechar o dropdown quando clicar fora
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
              onClick={() => setIsOpen(false)}
            >
              Dashboard
            </Link>
            <Link
              to="/profile"
              className={styles["dropdown-item"]}
              onClick={() => setIsOpen(false)}
            >
              Meu Perfil
            </Link>
            <button
              onClick={() => {
                handleLogout();
                setIsOpen(false);
              }}
              className={`${styles["dropdown-item"]} ${styles["logout"]}`}
            >
              Sair
            </button>
          </div>
        </div>
      ) : (
        <Link to="/login" className={styles["login-button"]}>
          Entrar
        </Link>
      )}
    </div>
  );
};

export default UserMenu;
