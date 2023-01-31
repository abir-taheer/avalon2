import { useEffect, useState } from "react";
import { DatabaseReference, onValue, ref } from "firebase/database";

export type UseRealtimeValueOptions = {
  skip?: boolean;
};

export const useRealtimeValue = <DataType>(
  ref: DatabaseReference,
  options?: UseRealtimeValueOptions
) => {
  const [value, setValue] = useState<null | DataType>(null);

  useEffect(() => {
    if (options?.skip) {
      setValue(null);
      return;
    }

    return onValue(ref, (value) => {
      setValue(value.val());
    });
  }, [options, ref]);

  return value;
};
