import { createEmotionSsrAdvancedApproach } from "tss-react/next/pagesDir";

export const { augmentDocumentWithEmotionCache, withAppEmotionCache } =
  createEmotionSsrAdvancedApproach({ key: "css" });
