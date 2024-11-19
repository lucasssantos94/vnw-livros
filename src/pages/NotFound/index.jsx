import Container from "../../components/Container";

import pageNotFound from "@assets/images/404/page-404.png";
import styles from "./style.module.scss";

const NotFoundPage = () => {
  return (
    <section className={styles["s-404"]}>
      <Container>
        <h2 className={styles["title-section"]}>Opss! Página não encontrada</h2>

        <img src={pageNotFound} alt="" />
      </Container>
    </section>
  );
};

export default NotFoundPage;
