import React from 'react';
import styles from './Button.module.scss';

type ButtonProps = {
  children: React.ReactNode;
  onClick?: () => void;

  type?: 'button' | 'submit';
  variant?: 'primary' | 'secondary';
};

const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  type,
  variant = 'primary',
}) => {
  return (
    <button
      className={
        variant === 'primary' ? styles.buttonPrimary : styles.buttonSecondary
      }
      onClick={onClick}
      type={type}
    >
      {children}
    </button>
  );
};

export default Button;
