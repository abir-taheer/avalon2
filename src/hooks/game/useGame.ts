import { doc } from "firebase/firestore";
import { useMemo } from "react";
import { firestore } from "@/firebase";
import { useDocWithSnapshot } from "@/hooks/firestore/useDocWithSnapshot";

export const useGame = (id: string, skip: boolean = false) => {
  const ref = useMemo(() => doc(firestore, "games", id), [id]);

  return useDocWithSnapshot({ ref, skip });
};
