import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { AuthContextProvider } from "@/context/auth/AuthContext";
import { Navigation } from "@/components/nav/Navigation";
import { withAppEmotionCache } from "@/utils/ssr/tss-react";

function App({ Component, pageProps }: AppProps) {
  return (
    <AuthContextProvider>
      <Navigation />
      <Component {...pageProps} />
    </AuthContextProvider>
  );
}

export default withAppEmotionCache(App);
