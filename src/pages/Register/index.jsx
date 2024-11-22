import Container from "../../components/Container";
import FormAddBook from "../../components/FormAddBook";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import styles from "./style.module.scss";

const RegisterPage = () => {
  return (
    <section className={styles["s-register"]}>
      <Container>
        <ToastContainer className={styles["toastify"]} />
        <h2 className={styles["title-section"]}>
          Por favor, preencha o formulário com as informações do Livro
        </h2>
        <FormAddBook />
      </Container>
    </section>
  );
};

export default RegisterPage;
