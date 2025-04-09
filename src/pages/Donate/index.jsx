import Container from "@components/Container";
import FormBook from "@components/FormBook";
import { useAuth } from "@hooks/useAuth";
import Login from "@components/Login";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

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
        {token ? (
          <>
            <h2 className={styles["title-section"]}>
              Por favor, preencha o formulário com as informações do Livro
            </h2>

            <FormBook />
          </>
        ) : (
          <>
            <h2 className={styles["title-section"]}>Faça login para doar</h2>

            <p className={styles["phrase"]}>
              “Livros doados podem ser uma fonte de conforto e entretenimento em
              tempos difíceis.”
            </p>
            <Login />
          </>
        )}
      </Container>
    </section>
  );
};

export default DonationPage;
