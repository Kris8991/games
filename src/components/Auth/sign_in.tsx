import React from 'react';
import styles from './Auth.module.scss';

//type sign_inProps = {};

const Sign_in: React.FC = () => {
  return (
    <div className={styles.formContainer}>
      <form>
        <label>
          Email: <input name="Email" />
        </label>
        <label>
          Password: <input name="Password" />
        </label>
        <button>Войти</button>
      </form>
    </div>
  );
};

export default Sign_in;
