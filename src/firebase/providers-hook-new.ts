import { useQuery, useQueryClient } from "@tanstack/react-query";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  getFirestore,
  updateDoc,
} from "firebase/firestore";
import { useState } from "react";
import { FirebaseLoadingType, FirebaseMapType } from "./providers-hook";

export const useFireCollectionCRUD = <T extends FirebaseMapType<any>>(
  path: string,
  enabled: boolean
) => {
  const [error, setError] = useState<string | undefined>(undefined);
  const [loading, setLoading] = useState<FirebaseLoadingType>(undefined);

  const colRef = collection(getFirestore(), path);
  const qc = useQueryClient();

  const _fetchAll = async (): Promise<T[]> => {
    const data = await getDocs(colRef);
    return data.docs.map((doc) => {
      return {
        ...doc.data(),
        id: doc.id,
      } as T;
    });
  };
  const q = useQuery(
    [path],
    () => {
      return _fetchAll();
    },
    {
      enabled: enabled,
    }
  );

  //
  const add = async (item: T): Promise<string | undefined> => {
    try {
      setLoading("addLoading");
      setError(undefined);
      const res = await addDoc(colRef, {
        ...item,
      });
      setLoading(undefined);
      qc.invalidateQueries([path]);
      return res.id;
    } catch (error) {
      setError("Error Adding Data");
      setLoading(undefined);
    }
  };

  const update = async (docId: string, item: T) => {
    const docRef = doc(colRef, docId);
    try {
      setLoading("updateLoading");
      setError(undefined);
      await updateDoc(docRef, {
        ...item,
        id: docId,
      });
      qc.invalidateQueries([path]);
    } catch (error) {
      setError("Error Updating Data");
    }
    setLoading(undefined);
  };

  const remove = async (docId: string) => {
    const docRef = doc(colRef, docId);
    try {
      setLoading("deleteLoading");
      setError(undefined);
      await deleteDoc(docRef);
      qc.invalidateQueries([path]);
    } catch (error) {
      setError("Error Deleting Data");
    }
    setLoading(undefined);
  };

  return {
    data: q.data,
    error: q.error?.toString() || error,
    loading: q.isLoading ? "loadLoading" : loading,
    loadingAny: loading !== undefined || q.isLoading,
    add,
    update,
    remove,
  };
};
