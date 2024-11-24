import Container from "../Container";
import { socialLinks } from "@constants/social-links";

import styles from "./style.module.scss";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <section className={styles["contact-footer"]}>
        <Container>
          <p>4002-8922</p>

          <div className={styles["social-links"]}>
            {socialLinks.map((link) => (
              <a key={link.id} href={link.url} target="_blank" rel="noreferrer">
                <img src={link.icon} alt={link.url} />
              </a>
            ))}
          </div>
        </Container>
      </section>
      <section className={styles["copy-footer"]}>
        <Container>
          <p>
            Layout desenvolvido pela{" "}
            {
              <a
                href="https://www.vainaweb.com.br"
                target="_blank"
                rel="noreferrer"
              >
                Vai na web
              </a>
            }{" "}
            para fins educativos - 2024{" "}
          </p>
        </Container>
      </section>
    </footer>
  );
};

export default Footer;
