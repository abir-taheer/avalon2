import { CSSProperties, ReactNode } from "react";

export type UIComponentProps = {
  children?: ReactNode;
  className?: string;
  style?: CSSProperties;
};
