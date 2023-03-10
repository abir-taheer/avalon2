import { AnonymousLoginButton, GoogleLoginButton } from "@/components/auth";
import { Stack, Typography } from "@mui/material";

export const UnauthenticatedBanner = () => {
  return (
    <Stack justifyContent={"center"} alignItems={"center"} spacing={2}>
      <Typography>You are not signed in</Typography>

      <Stack direction={"row"} spacing={2}>
        <AnonymousLoginButton />
        <GoogleLoginButton />
      </Stack>
    </Stack>
  );
};
