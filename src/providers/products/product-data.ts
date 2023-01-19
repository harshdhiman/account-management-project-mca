import { useAtom } from "jotai";
import { useUser } from "../../auth/user-hook";
import { useFireCollectionCRUDWAutoLoad } from "../../firebase/providers-hook";
import { useFireCollectionCRUD } from "../../firebase/providers-hook-new";
import { currentAccountBook } from "../account-books/data/account-book";
import { useLicense } from "../licensing/data/license-data";
import { Unit } from "../units/unit";

export interface InventoryProduct {
  id?: string;
  name: string;
  description: string;
  category: string;
  //
  sellingPrice: number;
  buyingPrice: number;
  //
  quantity: number;
  unit: Unit;
  //
  stock: number;
  //
  taxPerc: number;
}

export const productsDataHeadings = {
  id: "ID",
  name: "Name",
  description: "Description",
  category: "Category",
  buyingPrice: "Buying Price",
  sellingPrice: "Selling Price",
  quantity: "Quantity",
  unit: "Unit",
  stock: "Stock",
  taxPerc: "Tax %",
};

export const useProducts = () => {
  const user = useUser();
  const [book] = useAtom(currentAccountBook);
  const products = useFireCollectionCRUD<InventoryProduct>(
    `licenses/${user.data?.license}/accountBooks/${book?.id}/products`,
    !!user.data
  );
  return products;
};
