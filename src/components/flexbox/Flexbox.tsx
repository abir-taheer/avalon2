import { ReactNode } from "react";
import styles from "./Flexbox.module.css";
import classNames from "classnames";
import { UIComponentProps } from "@/types/components";

export type FlexboxProps = {
  children: ReactNode;
  direction?: "row" | "column";
  justifyContent?:
    | "flex-start"
    | "flex-end"
    | "center"
    | "space-between"
    | "space-around"
    | "space-evenly";
  alignItems?: "flex-start" | "flex-end" | "center" | "stretch" | "baseline";
  alignContent?:
    | "flex-start"
    | "flex-end"
    | "center"
    | "stretch"
    | "space-between"
    | "space-around";
  flexWrap?: "nowrap" | "wrap" | "wrap-reverse";
  gap?: number | string;
} & UIComponentProps;

export const Flexbox = (props: FlexboxProps) => {
  const flexDirection = props.direction ?? "column";
  const gap = props.gap ?? 2;
  const justifyContent = props.justifyContent ?? "flex-start";
  const alignItems = props.alignItems ?? "flex-start";
  const alignContent = props.alignContent ?? "flex-start";
  const flexWrap = props.flexWrap ?? "nowrap";

  return (
    <div
      className={classNames(styles.flexbox, props.className)}
      style={{
        flexDirection,
        justifyContent,
        alignItems,
        alignContent,
        flexWrap,
        gap,
        ...props.style,
      }}
    >
      {props.children}
    </div>
  );
};
