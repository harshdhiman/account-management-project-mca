import {
  getAuth,
  fetchSignInMethodsForEmail,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { doc, getFirestore, setDoc } from "firebase/firestore";

export const useAuth = () => {
  const [user, loading, error] = useAuthState(getAuth());
  const [createUserLoading, setCreateUserLoading] = useState(false);
  const [createUserError, setCreateUserError] = useState<string | null>(null);

  const [signInLoading, setSignInLoading] = useState(false);
  const [signInError, setSignInError] = useState<string | null>(null);

  async function createUser(email: string, password: string, name: string) {
    try {
      setCreateUserLoading(true);
      setCreateUserError(null);
      const userCredential = await createUserWithEmailAndPassword(
        getAuth(),
        email,
        password
      );
      await writeNewUserData(userCredential.user.uid, name, email);
      setCreateUserLoading(false);
    } catch (error) {
      setCreateUserError((error as any).message);
      setCreateUserLoading(false);
      throw error;
    }
  }

  async function signIn(email: string, password: string) {
    try {
      setSignInLoading(true);
      setSignInError(null);
      await signInWithEmailAndPassword(getAuth(), email, password);
      setSignInLoading(false);
    } catch (error) {
      setSignInError((error as any).message);
      setSignInLoading(false);
      throw error;
    }
  }

  async function signInWithGoogle() {
    try {
      setSignInLoading(true);
      setSignInError(null);
      const provider = new GoogleAuthProvider();
      const userCred = await signInWithPopup(getAuth(), provider);
      await writeNewUserData(
        userCred.user.uid,
        userCred.user.displayName ?? "",
        userCred.user.email ?? ""
      );
      setSignInLoading(false);
    } catch (error) {
      setSignInError((error as any).message);
      setSignInLoading(false);
      throw error;
    }
  }

  return {
    user,
    loading: loading || createUserLoading || signInLoading,
    error: error || createUserError || signInError,
    createUser,
    signIn,
    signInWithGoogle,
  };
};

export const useIsEmailRegistered = () => {
  const [loading, setLoading] = useState(false);
  const [isRegistered, setIsRegistered] = useState<
    "registred" | "not_registerd" | null
  >(null);

  const checkEmail = async (email: string) => {
    setLoading(true);
    const auth = getAuth();
    const methods = await fetchSignInMethodsForEmail(auth, email);
    setLoading(false);
    setIsRegistered(methods.length > 0 ? "registred" : "not_registerd");
  };

  return { loading, isRegistered, checkEmail };
};

const writeNewUserData = async (
  userId: string,
  name: string,
  email: string
) => {
  const d = doc(getFirestore(), "users", userId);
  await setDoc(d, {
    id: userId,
    name: name,
    email: email,
  });
};
