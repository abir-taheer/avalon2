import { AppBar, Button, Container, Stack, Typography } from "@mui/material";

export type NavigationProps = {};

export const Navigation = (props: NavigationProps) => {
  return (
    <AppBar>
      <Container>
        <Stack direction={"row"} alignItems={"center"}>
          <div style={{ flexGrow: 1 }}>
            <Typography fontWeight={"bold"}>Avalon & Friends</Typography>
          </div>
          <Button variant={"outlined"}>Sign Out</Button>
        </Stack>
      </Container>
    </AppBar>
  );
};
