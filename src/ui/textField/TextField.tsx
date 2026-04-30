import React from 'react';
import styles from './TextField.module.scss';
type TextFieldProps = {
  label: string;
  name: string;
  type: 'email' | 'password' | 'text';
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

const TextField: React.FC<TextFieldProps> = ({
  label,
  name,
  type = 'text',
  value,
  onChange,
}) => {
  return (
    <label htmlFor={name} className={styles.label}>
      {label}
      <input
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        className={styles.input}
      />
    </label>
  );
};

export default TextField;
