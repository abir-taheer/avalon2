import {
  useRealtimeValue,
  UseRealtimeValueOptions,
} from "@/hooks/realtime/useRealtimeValue";
import { RealTimeUser } from "@/types/schema";
import { useMemo } from "react";
import { ref } from "firebase/database";
import { realtime } from "@/firebase";

export const useRealtimeUser = (
  id: string,
  options?: UseRealtimeValueOptions
) => {
  const Ref = useMemo(() => ref(realtime, `/user/` + id), [id]);

  return useRealtimeValue<RealTimeUser>(Ref, options);
};
