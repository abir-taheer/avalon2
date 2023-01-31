import { UIComponentProps } from "@/types/components";
import styles from "src/components/ui/navbar/Navbar.module.css";
import classNames from "classnames";

export type NavbarProps = {
  position?: "relative" | "sticky" | "fixed";
} & UIComponentProps;

export const Navbar = (props: NavbarProps) => {
  const position = props.position ?? "sticky";

  return (
    <div
      className={classNames(styles.navbar, props.className)}
      style={{
        position,
        ...props.style,
      }}
    >
      {props.children}
    </div>
  );
};
