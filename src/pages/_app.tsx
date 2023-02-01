import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { AuthContextProvider } from "@/context/auth/AuthContext";
import { withAppEmotionCache } from "@/utils/ssr/tss-react";
import { DialogContextProvider } from "@/context/auth/DialogProvider";
import { Navbar } from "@/components/nav/Navbar";

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
