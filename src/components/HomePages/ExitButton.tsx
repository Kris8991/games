import React from 'react';
import styles from './HomePages.module.scss';
import { useAuthState } from '../../state/userState/authState';

const OutButton: React.FC = () => {
  const { signOut } = useAuthState();
  const handleClick = () => {
    signOut();
  };
  return (
    <div className={styles.containerOutButton}>
      <button onClick={handleClick} className={styles.outButton}>
        Выйти
      </button>
    </div>
  );
};

export default OutButton;
