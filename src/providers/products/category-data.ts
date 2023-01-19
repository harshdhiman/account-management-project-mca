import { useUser } from "../../auth/user-hook";
import { useFireCollectionCRUD } from "../../firebase/providers-hook-new";
import { useCurrentAccountBook } from "../account-books/data/account-book";

export interface Category {
  id?: string;
  name: string;
  description: string;
}

export const categoryDataHeadings: { [key in keyof Category]: string } = {
  id: "ID",
  name: "Name",
  description: "Description",
};

export const useCategories = () => {
  const book = useCurrentAccountBook();
  const data = useFireCollectionCRUD<Category>(
    `${book.bookPath}/categories`,
    true
  );
  return data;
};
