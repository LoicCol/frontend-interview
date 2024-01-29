import cn from "classnames";
import styles from "./Button.module.css";

type ButtonProps = JSX.IntrinsicElements["button"];

export const Button = ({ className, ...buttonProps }: ButtonProps) => {
  return <button className={cn(styles.button, className)} {...buttonProps} />;
};
