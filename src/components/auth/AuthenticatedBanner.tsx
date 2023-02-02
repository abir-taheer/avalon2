import { EditNameButton } from "@/components/auth/EditNameButton";
import { Container, Stack, Typography } from "@mui/material";
import { useAuth } from "@/hooks/auth";

export const AuthenticatedBanner = () => {
  const { user } = useAuth();

  const isMobile = false;

  return (
    <Stack spacing={4} direction={"column"} alignItems={"center"}>
      <Stack spacing={1} justifyContent={"center"} alignItems={"center"}>
        <Typography>You're signed in as</Typography>
        <Typography color={"primary"}>{user!.displayName}</Typography>
      </Stack>

      <Container maxWidth={"sm"}>
        <Stack
          spacing={isMobile ? 1 : 2}
          direction={isMobile ? "column" : "row"}
        >
          <EditNameButton fullWidth />
        </Stack>
      </Container>
    </Stack>
  );
};
