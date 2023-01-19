import { atom, useAtom } from "jotai";
import { useUser } from "../../../auth/user-hook";
import { useFireCollectionCRUDWAutoLoad } from "../../../firebase/providers-hook";
import { useFireCollectionCRUD } from "../../../firebase/providers-hook-new";
import { useLicense } from "../../licensing/data/license-data";

export interface AccountBook {
  id?: string;
  createdAt: Date;
  name: string;
  invoiceDetails?: {
    orgName: string;
    orgAddress: string;
    orgPhone: string;
    orgEmail: string;
    orgWebsite: string;
    orgProof: string;
  };
}

export const currentAccountBook = atom(undefined as AccountBook | undefined);

export const useCurrentAccountBook = () => {
  const user = useUser();
  const [book, setBook] = useAtom(currentAccountBook);
  return {
    book,
    bookPath: `licenses/${user.data?.license}/accountBooks/${book?.id}`,
  };
};

export const useAccountBooks = () => {
  const license = useLicense();
  const accountBooks = useFireCollectionCRUD<AccountBook>(
    `licenses/${license?.data?.id}/accountBooks`,
    !!license.data?.id
  );
  return accountBooks;
};
