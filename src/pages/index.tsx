import Head from "next/head";
import Image from "next/image";
import { Inter } from "@next/font/google";
import styles from "@/styles/Home.module.css";
import { signInAnonymously, signOut } from "@firebase/auth";
import { auth } from "@/firebase";
import { useContext } from "react";
import { AuthContext } from "@/context/auth/AuthContext";
import { Button } from "@/components/button/Button";
import { Flexbox } from "@/components/flexbox/Flexbox";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const { user } = useContext(AuthContext);

  const onClick = () => {
    signInAnonymously(auth).then(console.log);
  };

  return (
    <Flexbox direction={"column"}>
      <pre>{JSON.stringify(user, null, 2)}</pre>
      <Button onClick={onClick}>Sign in</Button>
      <Button onClick={onClick} variant={"outlined"}>
        Sign in
      </Button>
      <Button onClick={() => signOut(auth)} variant={"contained"}>
        Sign out
      </Button>
    </Flexbox>
  );
}
