import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { AuthContextProvider } from "@/context/auth/AuthContext";
import { Navbar } from "@/components/nav/Navbar";
import { withAppEmotionCache } from "@/utils/ssr/tss-react";
import { DialogContextProvider } from "@/context/auth/DialogProvider";

function App({ Component, pageProps }: AppProps) {
  return (
    <DialogContextProvider>
      <AuthContextProvider>
        <Navbar />
        <Component {...pageProps} />
      </AuthContextProvider>
    </DialogContextProvider>
  );
}

export default withAppEmotionCache(App);
