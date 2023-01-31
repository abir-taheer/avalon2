import { UIComponentProps } from "@/types/components";
import styles from "./Container.module.css";
import classNames from "classnames";

export type ContainerProps = {
  maxWidth?: "large" | "medium" | "small";
} & UIComponentProps;

export const Container = (props: ContainerProps) => {
  const maxWidth = props.maxWidth ?? "large";

  return (
    <div
      className={classNames(
        {
          [styles.large]: maxWidth === "large",
          [styles.medium]: maxWidth === "medium",
          [styles.small]: maxWidth === "small",
        },
        styles.container,
        props.className
      )}
      style={props.style}
    >
      {props.children}
    </div>
  );
};
