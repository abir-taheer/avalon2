import { DocumentReference, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";

export type UseDocWithSnapshotProps<T> = {
  ref: DocumentReference<T>;
  skip?: boolean;
};

export const useDocWithSnapshot = <T>({
  ref,
  skip,
}: UseDocWithSnapshotProps<T>) => {
  // TODO add error reporting for when an error is thrown
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (skip) {
      setData(null);
      return;
    }

    setIsLoading(true);

    const unsubscribe = onSnapshot<T>(
      ref,
      (snapshot) => {
        const result = snapshot.data();

        setData(result ?? null);
        setIsLoading(false);
      },
      (error) => {
        // Throw the error later so that the boundary can catch it
        console.error(error);
        setError(error);
      }
    );

    return unsubscribe;
  }, [skip, ref]);

  return { data, isLoading, error };
};
