import styles from "../MemoryGame.module.css";
import type { Difficulty } from "../MemoryGame.utils";

const DifficultyButtons = ({
  onDifficultyChange,
}: {
  onDifficultyChange: (difficulty: Difficulty) => void;
}) => {
  return (
    <div className={styles.buttonWrapper}>
      <button onClick={() => onDifficultyChange("normal")}>Normal</button>
      <button onClick={() => onDifficultyChange("hard")}>Hard</button>
    </div>
  );
};
export default DifficultyButtons;
