/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { useGetDonateBooks } from "../../hooks/useGetDonateBooks";
import { useAuth } from "@hooks/useAuth";
import { useNavigate } from "react-router-dom";

import Container from "@components/Container";
import ContainerBooks from "@components/ContainerBooks";
import BookLoader from "@components/BookLoader";
import BookWithActions from "@components/BookWithActions";

import styles from "./styles.module.scss";

const DonationsPage = () => {
  const { user } = useAuth();
  const { donateBooks, isLoading, error, getDonateBooks } = useGetDonateBooks();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      getDonateBooks(user?.id);
    }
  }, [getDonateBooks, user?.id]);

  if (!user) {
    return <BookLoader />;
  }

  return (
    <Container>
      <section className={styles["s-donations"]}>
        <h2 className={styles["title-section"]}>Minhas Doações</h2>

        {isLoading ? (
          <BookLoader />
        ) : error ? (
          <p>{error}</p>
        ) : donateBooks.length > 0 ? (
          <ContainerBooks>
            {donateBooks.map((book) => (
              <BookWithActions
                book={book}
                key={book.id}
                onDeleteSuccess={() => getDonateBooks(user?.id)}
                onEditSuccess={() => getDonateBooks(user?.id)}
              />
            ))}
          </ContainerBooks>
        ) : (
          <div className={styles["empty-state"]}>
            <p>Você ainda não possui doações</p>

            <p className={styles["phrase"]}>
              Doar livros é uma forma de retribuir à comunidade e promover a
              igualdade de oportunidades.
            </p>

            <button onClick={() => navigate("/doar")}>Doar Livro</button>
          </div>
        )}
      </section>
    </Container>
  );
};
export default DonationsPage;
