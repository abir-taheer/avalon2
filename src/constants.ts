export const FIREBASE_CONFIG = process.env.FIREBASE_CONFIG
  ? JSON.parse(
      Buffer.from(process.env.FIREBASE_CONFIG, "base64").toString("utf-8")
    )
  : null;
