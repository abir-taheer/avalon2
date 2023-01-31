import { Navbar } from "@/components/ui/navbar/Navbar";
import { Text } from "@/components/ui/text/Text";
import { Flexbox } from "@/components/ui/flexbox/Flexbox";
import { Button } from "@/components/ui/button/Button";
import { Container } from "@/components/ui/container/Container";
import styles from "./Navigation.module.css";

export type NavigationProps = {};

export const Navigation = (props: NavigationProps) => {
  return (
    <Navbar className={styles.navbar}>
      <Container>
        <Flexbox direction={"row"} alignItems={"center"}>
          <div style={{ flexGrow: 1 }}>
            <Text bold>Avalon & Friends</Text>
          </div>
          <Button variant={"outlined"}>Sign Out</Button>
        </Flexbox>
      </Container>
    </Navbar>
  );
};
