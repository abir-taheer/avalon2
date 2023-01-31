import { ButtonHTMLAttributes, DetailedHTMLProps, useId } from "react";
import styles from "src/components/ui/button/Button.module.css";
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

  const onClick = props.disabled ? undefined : props.onClick;

  return (
    <button
      className={classNames(
        {
          [styles.outlinedButton]: variant === "outlined",
          [styles.containedButton]: variant === "contained",
          [styles.textButton]: variant === "text",
          [styles.colorPrimary]: color === "primary",
          [styles.colorSecondary]: color === "secondary",
          [styles.disabledButton]: props.disabled,
        },
        styles.button,
        props.className
      )}
      id={props.id}
      onClick={onClick}
    >
      {props.children}
    </button>
  );
};
