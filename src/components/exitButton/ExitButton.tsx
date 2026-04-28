import React from 'react';
import styles from '../../pages/homePage/HomePages.module.scss';
import { useAuthState } from '../../stores/user/auth.store';

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
