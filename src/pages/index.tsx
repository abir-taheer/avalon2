import { Inter } from "@next/font/google";
import { signInAnonymously, signOut } from "@firebase/auth";
import { auth } from "@/firebase";
import { useContext } from "react";
import { AuthContext } from "@/context/auth/AuthContext";
import { Button } from "@/components/ui/button/Button";
import { Flexbox } from "@/components/ui/flexbox/Flexbox";
import { Container } from "@/components/ui/container/Container";

export default function Home() {
  const { user } = useContext(AuthContext);

  const onClick = () => {
    signInAnonymously(auth).then(console.log);
  };

  return (
    <Container>
      <Flexbox>
        <pre>{JSON.stringify(user, null, 2)}</pre>

        <Button onClick={onClick}>Sign in</Button>
        <Button onClick={onClick} disabled>
          Sign in
        </Button>
        <Button onClick={onClick} variant={"outlined"} disabled>
          Sign in
        </Button>
        <Button onClick={() => signOut(auth)} variant={"contained"}>
          SIGN OUT
        </Button>
        <Button onClick={() => signOut(auth)} variant={"contained"} disabled>
          SIGN OUT
        </Button>
      </Flexbox>
    </Container>
  );
}
