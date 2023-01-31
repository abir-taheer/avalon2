import { ButtonHTMLAttributes, DetailedHTMLProps, useId } from "react";
import styles from "./Button.module.css";
import classNames from "classnames";

export type ButtonProps = DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
> & {
  variant?: "contained" | "outlined" | "text";
  color?: "primary" | "secondary";
};

export const Button = (props: ButtonProps) => {
  const variant = props.variant ?? "text";
  const color = props.color ?? "primary";

  return (
    <button
      className={classNames(
        {
          [styles.outlinedButton]: variant === "outlined",
          [styles.containedButton]: variant === "contained",
          [styles.textButton]: variant === "text",
          [styles.colorPrimary]: color === "primary",
          [styles.colorSecondary]: color === "secondary",
        },
        styles.button,
        props.className
      )}
      id={props.id}
      onClick={props.onClick}
    >
      {props.children}
    </button>
  );
};
