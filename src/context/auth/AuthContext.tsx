import { RealTimeUser } from "@/types/schema";
import { createContext, ReactNode, useEffect, useMemo, useState } from "react";
import { auth, realtime } from "@/firebase";
import { updateProfile, User } from "firebase/auth";
import { useRealtimeUser } from "@/hooks/realtime/useRealtimeUser";
import { onDisconnect, ref, set, update } from "firebase/database";
import { firstName } from "faker-en/person/firstName";
import { getDefaultPhotoURL } from "@/utils/user/getDefaultPhotoURL";
import { useEditDisplayNameDialog } from "@/components/dialog/useEditDisplayNameDialog";

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
  const promptName = useEditDisplayNameDialog();

  const uid = useMemo(() => authUser?.uid ?? "", [authUser]);

  // We need to memoize to prevent infinite re-renders
  const options = useMemo(
    () => ({
      skip: typeof authUser?.uid !== "string",
    }),
    [authUser]
  );

  const user = useRealtimeUser(uid, options);
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
    auth.beforeAuthStateChanged(async (nextUser) => {
      if (!nextUser && auth.currentUser) {
        const Ref = ref(realtime, "/user/" + auth.currentUser.uid);
        await update(Ref, { active: false });
      }
    });

    auth.onAuthStateChanged(async (nextUser) => {
      if (!nextUser) {
        setAuthUser(null);
        return;
      }

      const Ref = ref(realtime, "/user/" + nextUser.uid);

      let { uid, photoURL, displayName } = nextUser;

      if (!displayName) {
        const promptedName = await promptName({ initialValue: "" });
        displayName = promptedName?.displayName ?? firstName();
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
