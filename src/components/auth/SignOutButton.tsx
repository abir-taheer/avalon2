import { auth } from "@/firebase";
import { Button } from "@mui/material";
import { signOut } from "firebase/auth";
import { useCallback } from "react";
import { useAuth } from "@/hooks/auth";
import { Logout } from "@mui/icons-material";

export const SignOutButton = () => {
  const { user } = useAuth();

  const logout = useCallback(async () => {
    if (!user) {
      return;
    }

    signOut(auth).then(console.log);
  }, [user]);

  return (
    <Button onClick={logout} startIcon={<Logout />} variant={"outlined"}>
      Sign Out
    </Button>
  );
};
