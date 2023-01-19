import { useFireCollectionCRUD } from "../../firebase/providers-hook-new";
import { useCurrentAccountBook } from "../account-books/data/account-book";
import { Unit } from "../units/unit";

export interface TransactionProduct {
  productId: string;
  name: string;
  description: string;
  category: string;
  price: number;
  totalPrice: number;
  netPrice: number;
  quantityPerUnit: number;
  unit: Unit;
  quantityPurchased: number;
  taxPerc: number;
}

export const transactionProductDataHeadings = {
  productId: "Product ID",
  name: "Name",
  description: "Description",
  category: "Category",
  price: "Price",
  totalPrice: "Total Price",
  netPrice: "Net Price",
  quantityPerUnit: "Quantity Per Unit",
  unit: "Unit",
  quantityPurchased: "Quantity Purchased",
  taxPerc: "Tax",
};

export interface Transaction {
  id?: string;
  date: Date;
  customerId: string;
  customerName: string;
  customerPhone: string;
  products: TransactionProduct[];
  total: number;
  tax: number;
  discount: number;
  discountType: string;
  netTotal: number;
  grandTotal: number;
  payment: number;
  change: number;
  paid: boolean;
  profit: number;
}

export const transactionsDataHeadings = {
  id: "ID",
  date: "Date",
  customerId: "Customer ID",
  customerName: "Customer Name",
  customerPhone: "Customer Phone",
  products: "Products",
  total: "Total",
  tax: "Tax",
  discountType: "Discount Type",
  netTotal: "Net Total",
  discount: "Discount",
  grandTotal: "Grand Total",
  payment: "Payment",
  change: "Change",
  paid: "Paid",
  profit: "Profit",
};

export const useTransactions = () => {
  const book = useCurrentAccountBook();
  const transactions = useFireCollectionCRUD<Transaction>(
    `${book.bookPath}/transactions`,
    true
  );
  return transactions;
};
