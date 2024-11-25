import PropTypes from "prop-types";

import styles from "./style.module.scss";

const Card = ({ card }) => {
  return (
    <article className={styles.card}>
      <img src={card.image} alt={card.alt} />

      <p>{card.text}</p>
    </article>
  );
};

Card.propTypes = {
  card: PropTypes.object.isRequired,
};

export default Card;
