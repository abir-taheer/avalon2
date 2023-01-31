import Head from "next/head";
import Image from "next/image";
import { Inter } from "@next/font/google";
import styles from "@/styles/Home.module.css";
import { signInAnonymously, signOut } from "@firebase/auth";
import { auth } from "@/firebase";
import { useContext } from "react";
import { AuthContext } from "@/context/auth/AuthContext";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const { user } = useContext(AuthContext);

  const onClick = () => {
    signInAnonymously(auth).then(console.log);
  };

  return (
    <>
      <pre>{JSON.stringify(user, null, 2)}</pre>
      <button onClick={onClick}>sign in </button>
      <button onClick={() => signOut(auth)}>sign out</button>
    </>
  );
}
