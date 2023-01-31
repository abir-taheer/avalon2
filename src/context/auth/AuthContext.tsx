import { RealTimeUser } from "@/types/schema";
import { createContext, ReactNode, useEffect, useMemo, useState } from "react";
import { auth, realtime } from "@/firebase";
import { updateProfile, User } from "firebase/auth";
import { useRealtimeUser } from "@/hooks/realtime/useRealtimeUser";
import { onDisconnect, ref, set } from "firebase/database";
import { firstName } from "faker-en/person/firstName";
import { getDefaultPhotoURL } from "@/utils/user/getDefaultPhotoURL";

interface Authenticated {
  isSignedIn: true;
  user: RealTimeUser;
}

interface Unauthenticated {
  isSignedIn: false;
  user: null;
}

export type AuthContextValue = Authenticated | Unauthenticated;

export const AuthContextDefaultValue: AuthContextValue = {
  user: null,
  isSignedIn: false,
};

export const AuthContext = createContext<AuthContextValue>(
  AuthContextDefaultValue
);

export type AuthContextProviderProps = {
  children: ReactNode;
};

export const AuthContextProvider = ({ children }: AuthContextProviderProps) => {
  const [authUser, setAuthUser] = useState<null | User>(null);
  const user = useRealtimeUser(authUser?.uid ?? "", { skip: !authUser });
  const isSignedIn = useMemo(() => !!user, [user]);

  // Wrap it in memo to preserve reference and prevent excessive re-renders
  const value = useMemo(
    () =>
      isSignedIn
        ? { isSignedIn: true, user }
        : { isSignedIn: false, user: null },
    [user, isSignedIn]
  ) as AuthContextValue;

  useEffect(() => {
    auth.onAuthStateChanged(async (nextUser) => {
      if (!nextUser) {
        setAuthUser(null);
        return;
      }

      const Ref = ref(realtime, "/user/" + nextUser.uid);

      let { uid, photoURL, displayName } = nextUser;

      if (!displayName) {
        displayName = firstName();
      }

      if (!photoURL) {
        photoURL = getDefaultPhotoURL({ name: displayName });
      }

      // Redundant next step
      await updateProfile(nextUser, {
        photoURL,
        displayName,
      });

      await set(Ref, {
        active: true,
        photoURL,
        displayName,
        uid,
      });

      await onDisconnect(Ref).update({ active: false });

      setAuthUser(nextUser);
    });
  }, []);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
