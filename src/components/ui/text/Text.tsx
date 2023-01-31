import { UIComponentProps } from "@/types/components";
import { createElement } from "react";
import styles from "./Text.module.css";
import classNames from "classnames";

export type TextProps = {
  component?: "p" | "span" | "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  bold?: boolean;
} & UIComponentProps;

export const Text = (props: TextProps) => {
  const component = props.component ?? "p";

  return createElement(
    component,
    {
      className: classNames(
        {
          [styles.bold]: props.bold,
        },
        styles.text,
        props.className
      ),
      style: props.style,
    },
    props.children
  );
};
