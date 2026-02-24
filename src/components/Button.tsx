import React from "react";

type ButtonProps = React.PropsWithChildren<{
  styles: React.CSSProperties;
}>;

const handleClick: React.MouseEventHandler<HTMLButtonElement> = () => {
  console.log("Нажала");
};
const Button: React.FC<ButtonProps> = ({ styles, children }) => (
  <button onClick={handleClick} style={styles}>
    {children}
  </button>
);
export default Button;
