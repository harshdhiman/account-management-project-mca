import { getAuth } from "firebase/auth";
import {
  useFireCollectionCRUDWAutoLoad,
  useFireDocCRUDSimpleWAutoLoad,
} from "../firebase/providers-hook";

export interface User {
  id?: string;
  email: string;
  name: string;
  license?: string;
}

export const useUserUID = () => {
  const data = getAuth().currentUser?.uid;
  return data;
};

export const useUser = () => {
  const uid = useUserUID();
  return useFireDocCRUDSimpleWAutoLoad<User>(`users/${uid}`, uid !== undefined);
};
