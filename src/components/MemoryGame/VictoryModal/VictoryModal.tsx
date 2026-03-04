import ReactDOM from "react-dom";
import styles from "../MemoryGame.module.css";

const VictoryModal = ({
  isActive,
  onNewGame,
}: {
  isActive: boolean;
  onNewGame: () => void;
}) => {
  if (!isActive) return null;
  return ReactDOM.createPortal(
    <div className={styles.modal}>
      <div className={styles.modalContent}>
        <h2>Победа!</h2>
        <p>Вы нашли все пары!</p>
        <button onClick={onNewGame}>Новая игра</button>
      </div>
    </div>,
    document.body,
  );
};
export default VictoryModal;
