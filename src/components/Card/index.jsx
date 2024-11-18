import PropTypes from "prop-types";

import styles from "./style.module.scss";

const Card = ({ card }) => {
  return (
    <div className={styles.card}>
      <img src={card.image} alt={card.alt} />

      <p>{card.text}</p>
    </div>
  );
};

Card.propTypes = {
  card: PropTypes.object.isRequired,
};

export default Card;
