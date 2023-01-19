import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  updateDoc,
} from "firebase/firestore";
import { useEffect, useRef, useState } from "react";
import { MapType } from "../relic-ui/utils/misc";
import { fireCache } from "./firebase-cache";

export type FirebaseLoadingType =
  | "loading"
  | "loadLoading"
  | "addLoading"
  | "updateLoading"
  | "deleteLoading"
  | undefined;

export type FirebaseMapType<T> = MapType<T> & {
  id?: string;
};

///
/// loads and caches a collection of documents from firebase
///
export const useFireCollectionCRUDSimple = <T extends FirebaseMapType<any>>(
  path: string
) => {
  const [collectionData, setCollectionData] = useState<T[] | null>(null);

  const [error, setError] = useState<string | undefined>(undefined);
  const [loading, setLoading] = useState<FirebaseLoadingType>(undefined);

  const colRef = collection(getFirestore(), path);

  const updateCache = () => {
    fireCache.set(path, collectionData, _fetchAll);
  };

  const invalidate = () => {
    fireCache.invalidate(path);
  };

  //
  const add = async (item: T): Promise<string | undefined> => {
    try {
      setLoading("addLoading");
      setError(undefined);
      const res = await addDoc(colRef, {
        ...item,
      });

      if (res.id && collectionData) {
        setCollectionData([
          ...collectionData,
          {
            ...item,
            id: res.id,
          },
        ]);
      }
      updateCache();
      setLoading(undefined);

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
      if (collectionData) {
        setCollectionData(
          collectionData.map((i) => {
            if (i.id === docId) {
              return {
                ...item,
                id: docId,
              };
            }
            return i;
          })
        );
      }
      updateCache();
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
      if (collectionData) {
        setCollectionData(collectionData.filter((i) => i.id !== docId));
      }
      updateCache();
    } catch (error) {
      setError("Error Deleting Data");
    }
    setLoading(undefined);
  };

  ///
  /// load all the data
  ///
  const _fetchAll = async (): Promise<T[]> => {
    const data = await getDocs(colRef);
    return data.docs.map((doc) => {
      return {
        ...doc.data(),
        id: doc.id,
      } as T;
    });
  };
  const loadAll = async () => {
    const _cache = fireCache.get(path);
    if (_cache) {
      setCollectionData(_cache);
      return;
    }

    try {
      setLoading("loadLoading");
      setError(undefined);
      const data = await _fetchAll();
      setCollectionData(data);
      updateCache();
    } catch (error) {
      setError("Error Loading Data");
    }
    setLoading(undefined);
  };

  ///
  ///
  ///
  const _fetchById = async (d: { docId: string }): Promise<T | undefined> => {
    const docRef = doc(colRef, d.docId);
    const data = await getDoc(docRef);
    if (data.exists()) {
      return {
        ...data.data(),
        id: data.id,
      } as T;
    }
  };
  const getById = async (docId: string): Promise<T | undefined> => {
    const docRef = doc(colRef, docId);

    const _cache = fireCache.get(docRef.path);
    if (_cache) {
      return _cache;
    }

    try {
      setLoading("loadLoading");
      setError(undefined);
      const data = await _fetchById({ docId });
      if (data) {
        fireCache.set(docRef.path, data, _fetchById, { docId });
      }
      setLoading(undefined);
      return data;
    } catch (error) {
      setError("Error Loading Data");
    }
    setLoading(undefined);
  };

  const getByIdFromLocalData = (docId: string): T | undefined => {
    if (collectionData) {
      return collectionData.find((item) => item.id === docId);
    }
  };

  //

  return {
    data: collectionData,
    error,
    loading,
    loadingAny: loading !== undefined,
    add,
    update,
    remove,
    loadAll,
    getById,
    getByIdFromLocalData,
    invalidate,
  };
};

export const useFireCollectionCRUDWAutoLoad = <T extends FirebaseMapType<any>>(
  path: string,
  enabled: boolean
) => {
  const alreadyLoaded = useRef(false);
  const colCRUD = useFireCollectionCRUDSimple<T>(path);
  useEffect(() => {
    if (enabled && !alreadyLoaded.current) {
      alreadyLoaded.current = true;
      colCRUD.loadAll();
    }
  }, [path, enabled]);
  return {
    ...colCRUD,
  };
};

///
///

export const useFireDocCRUDSimple = <T extends FirebaseMapType<any>>(
  path: string
) => {
  const [docData, setDocData] = useState<T | null>(null);
  const [error, setError] = useState<string | undefined>(undefined);

  const [loading, setLoading] = useState<FirebaseLoadingType>(undefined);

  const docRef = doc(getFirestore(), path);

  const updateCache = () => {
    fireCache.set(path, docData, _load);
  };

  const update = async (item: T) => {
    try {
      setLoading("updateLoading");
      setError(undefined);
      await updateDoc(docRef, {
        ...item,
      });
      setDocData(item);
      updateCache();
    } catch (error) {
      setError("Error Updating Data");
    }
    setLoading(undefined);
  };

  const remove = async () => {
    try {
      setLoading("deleteLoading");
      setError(undefined);
      await deleteDoc(docRef);
      setDocData(null);
      updateCache();
    } catch (error) {
      setError("Error Deleting Data");
    }
    setLoading(undefined);
  };

  const _load = async (): Promise<T | undefined> => {
    const data = await getDoc(docRef);
    if (data.exists()) {
      return {
        ...data.data(),
        id: data.id,
      } as T;
    }
  };
  const load = async () => {
    const _cache = fireCache.get(path);
    if (_cache) {
      setDocData(_cache);
      return;
    }
    try {
      setLoading("loadLoading");
      setError(undefined);
      const data = await _load();
      if (data) {
        setDocData(data);
      } else {
        setDocData(null);
        setError("No Data");
      }
      updateCache();
    } catch (error) {
      setError("Error Loading Data");
    }
    setLoading(undefined);
  };

  //

  return {
    data: docData,
    error,
    loading,
    loadingAny: loading !== undefined,
    update,
    remove,
    load,
  };
};

export const useFireDocCRUDSimpleWAutoLoad = <T extends FirebaseMapType<any>>(
  path: string,
  enabled: boolean
) => {
  const alreadyLoaded = useRef(false);
  const docCRUD = useFireDocCRUDSimple<T>(path);
  useEffect(() => {
    if (enabled && !alreadyLoaded.current) {
      alreadyLoaded.current = true;
      docCRUD.load();
    }
  }, [path, enabled]);
  return {
    ...docCRUD,
  };
};
