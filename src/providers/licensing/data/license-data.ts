import { useUser, useUserUID } from "../../../auth/user-hook";
import {
  useFireCollectionCRUDSimple,
  useFireDocCRUDSimpleWAutoLoad,
} from "../../../firebase/providers-hook";

export interface License {
  id?: string;
  created: Date;
}

export const useLicense = () => {
  const user = useUser();
  const license = useFireDocCRUDSimpleWAutoLoad(
    `licenses/${user.data?.license}`,
    !!user.data
  );
  return license;
};

export const useCreateLicense = () => {
  const user = useUser();
  const licenses = useFireCollectionCRUDSimple<License>("licenses");
  const createLicense = async () => {
    const id = await licenses.add({
      created: new Date(),
    });
    await user.update({
      ...user.data!,
      license: id!,
    });
    return id;
  };
  return {
    ...licenses,
    createLicense,
  };
};
