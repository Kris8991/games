import React from 'react';
import styles from './TextField.module.scss';
import clsx from 'clsx';
type TextFieldProps = {
  error?: string;
  label: string;
  type: 'email' | 'password' | 'text';
} & React.InsHTMLAttributes<HTMLInputElement>;

const TextField: React.FC<TextFieldProps> = ({
  label,
  type = 'text',
  error,
  ...inputProps
}) => {
  return (
    <label className={styles.component}>
      {label}
      <input
        type={type}
        className={clsx(styles.input, { [styles.inputError]: !!error })}
        {...inputProps}
      />
      {error && <span className={styles.error}>{error}</span>}
    </label>
  );
};

export default TextField;
