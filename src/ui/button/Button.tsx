import React from 'react';
import styles from './Button.module.scss';

type ButtonProps = {
  children?: React.ReactNode;
  onClick?: () => void;
  size?: 'small' | 'medium' | 'large';
  type?: 'button' | 'submit';
  variant?: 'primary' | 'secondary';
};

const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  type,
  size = 'large',
  variant = 'primary',
}) => {
  return (
    <button
      className={`${styles[size]}
        ${styles[variant]}
        `}
      onClick={onClick}
      type={type}
    >
      {children}
    </button>
  );
};

export default Button;
