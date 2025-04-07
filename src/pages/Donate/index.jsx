import Container from "@components/Container";
import FormAddBook from "@components/FormAddBook";
import { useAuth } from "../../hooks/useAuth";
import ModalLogin from "@components/ModalLogin";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import styles from "./style.module.scss";

const DonationPage = () => {
  const { token } = useAuth();
  const [isToken, setIsToken] = useState(token);

  const navigate = useNavigate();

  useEffect(() => {
    if (isToken) {
      setIsToken(token);
      navigate("/doar", { replace: true });
    }
  }, [navigate, isToken, token]);

  return (
    <section className={styles["s-register"]}>
      <Container>
        <ToastContainer className={styles["toastify"]} />
        {token ? (
          <>
            <h2 className={styles["title-section"]}>
              Por favor, preencha o formulário com as informações do Livro
            </h2>
            <FormAddBook />
          </>
        ) : (
          <>
            <h2 className={styles["title-section"]}>Faça login para doar</h2>
            <ModalLogin />
          </>
        )}
      </Container>
    </section>
  );
};

export default DonationPage;
