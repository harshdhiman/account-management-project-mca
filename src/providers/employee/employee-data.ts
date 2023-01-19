import { useFireCollectionCRUD } from "../../firebase/providers-hook-new";
import { useCurrentAccountBook } from "../account-books/data/account-book";

export interface Employee {
  id?: string;
  name: string;
  email?: string;
  phone: string;
  address?: string;
  workingArea?: string;
  salary: number;
  bankDetails?: {
    bankName?: string;
    accountNumber?: string;
    branchCode?: string;
    ifscCode?: string;
  };
  proofs: {
    adharCard?: string;
    panCard?: string;
  };
  salaryDate?: string;
}

export const employeesDataHeadings = {
  id: "ID",
  name: "Name",
  email: "Email",
  phone: "Phone",
  address: "Address",
  workingArea: "Working Area",
  salary: "Salary",
  bankDetails: "Bank Details",
  proofs: "Proofs",
  salaryDate: "Salary Date",
};

export const useEmployees = () => {
  const book = useCurrentAccountBook();
  const empoyees = useFireCollectionCRUD<Employee>(
    `${book.bookPath}/employees`,
    true
  );
  return empoyees;
};
