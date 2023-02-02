import { auth } from "@/firebase";
import { Button, ButtonProps } from "@mui/material";
import { signInAnonymously, UserCredential } from "firebase/auth";
import { useCallback, useState } from "react";
import { makeStyles } from "tss-react/mui";

const useStyles = makeStyles()((theme) => ({
  Button: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
  },
}));

export type AnonymousLoginButtonProps = ButtonProps & {
  onSuccess?: (user: UserCredential) => void;
};

export const AnonymousLoginButton = (props: AnonymousLoginButtonProps) => {
  const { onSuccess, ...buttonProps } = props;
  const [loading, setLoading] = useState(false);
  const { classes } = useStyles();

  const login = useCallback(() => {
    setLoading(true);
    signInAnonymously(auth)
      .then(async (credential) => {
        if (onSuccess) {
          onSuccess(credential);
        }
      })
      .finally(() => {
        setLoading(false);
      });
  }, [onSuccess]);

  return (
    <Button
      variant={"outlined"}
      color={"secondary"}
      onClick={login}
      disabled={loading}
      className={classes.Button}
      {...buttonProps}
    >
      {loading ? "Signing you in..." : "Continue as Guest"}
    </Button>
  );
};
