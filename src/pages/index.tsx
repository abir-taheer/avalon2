import { Container } from "@mui/material";
import { AuthBanner } from "@/components/auth/AuthBanner";

export default function Home() {
  return (
    <Container maxWidth={"md"}>
      <AuthBanner />
    </Container>
  );
}
