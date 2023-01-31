import { Html, Head, Main, NextScript } from "next/document";
import { augmentDocumentWithEmotionCache } from "@/utils/ssr/tss-react";

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}

augmentDocumentWithEmotionCache(Document);
