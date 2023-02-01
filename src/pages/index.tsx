import { signInAnonymously, signOut } from "@firebase/auth";
import { auth } from "@/firebase";
import { useContext } from "react";
import { AuthContext } from "@/context/auth/AuthContext";
import { Button, Container, Stack } from "@mui/material";
import { useEditDisplayNameDialog } from "@/components/dialog/useEditDisplayNameDialog";

export default function Home() {
  const { user } = useContext(AuthContext);
  const edit = useEditDisplayNameDialog();

  const onClick = () => {
    signInAnonymously(auth).then(console.log);
  };

  return (
    <Container>
      <Stack>
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
        <Button
          onClick={() => edit({ initialValue: "" })}
          variant={"contained"}
        >
          Edit
        </Button>
      </Stack>
    </Container>
  );
}
