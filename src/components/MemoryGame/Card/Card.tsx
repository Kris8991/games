import styles from "../MemoryGame.module.css";
import type { CardType } from "../MemoryGame.utils";
const Card = ({
  card,
  isFlipped,
  onClick,
}: {
  card: CardType;
  isFlipped: boolean;
  onClick: () => void;
}) => {
  return (
    <div className={styles.card} onClick={onClick}>
      {isFlipped ? card.value : "?"}
    </div>
  );
};
export default Card;
