import { useFireCollectionCRUD } from "../../firebase/providers-hook-new";
import { useCurrentAccountBook } from "../account-books/data/account-book";

export interface Customer {
  id?: string;
  name: string;
  email?: string;
  phone?: string;
  address?: string;
  idNumber?: string;
  transactions?: string[];
}

export const customersDataHeadings = {
  id: "ID",
  name: "Name",
  email: "Email",
  phone: "Phone",
  address: "Address",
  idNumber: "ID Number",
  transactions: "Transactions",
};

export const useCustomers = () => {
  const book = useCurrentAccountBook();
  const customers = useFireCollectionCRUD<Customer>(
    `${book.bookPath}/customers`,
    true
  );
  return customers;
};
