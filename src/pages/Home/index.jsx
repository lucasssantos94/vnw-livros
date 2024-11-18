import Card from "@components/Card";
import Container from "@components/Container";
import { cards } from "@constants/cards";

import styles from "./style.module.scss";

const HomePage = () => {
  return (
    <>
      <section className={styles["s-hero"]}>
        <Container>
          <h2>VENHA FAZER PARTE DA MAIOR REDE DE DOAÇÃO</h2>
        </Container>
      </section>

      <section className={styles["s-cards"]}>
        <Container>
          <h2 className="title-section">Por que devo doar ?</h2>

          <div className={styles["box-cards"]}>
            {cards.map((card) => (
              <Card key={card.text} card={card} />
            ))}
          </div>
        </Container>
      </section>
    </>
  );
};

export default HomePage;
