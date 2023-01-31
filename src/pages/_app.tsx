import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { AuthContextProvider } from "@/context/auth/AuthContext";
import { Navigation } from "@/components/nav/Navigation";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AuthContextProvider>
      <Navigation />
      <Component {...pageProps} />
    </AuthContextProvider>
  );
}
