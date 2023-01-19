import { useFireCollectionCRUD } from "../../firebase/providers-hook-new";
import { useCurrentAccountBook } from "../account-books/data/account-book";

export interface Expense {
  id?: string;
  date: Date;
  name: string;
  description: string;
  amount: number;
}

export const expensesDataHeadings = {
  id: "ID",
  date: "Date",
  name: "Name",
  description: "Description",
  amount: "Amount",
};

export const useExpenses = () => {
  const book = useCurrentAccountBook();
  const expenses = useFireCollectionCRUD<Expense>(
    `${book.bookPath}/expenses`,
    true
  );
  return expenses;
};
