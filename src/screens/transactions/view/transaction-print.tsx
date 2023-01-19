import { format, formatRelative } from "date-fns";
import { Timestamp } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import { useCurrentAccountBook } from "../../../providers/account-books/data/account-book";
import {
  Customer,
  useCustomers,
} from "../../../providers/customers/customer-data";
import { useProducts } from "../../../providers/products/product-data";
import {
  Transaction,
  TransactionProduct,
  transactionProductDataHeadings,
  useTransactions,
} from "../../../providers/transactions/transaction-data";
import { Unit } from "../../../providers/units/unit";
import { Button } from "../../../relic-ui/components/base/button/button";
import { IconButton } from "../../../relic-ui/components/base/button/icon-button";
import { Form, useRelicForm } from "../../../relic-ui/components/base/form";
import { InputBase } from "../../../relic-ui/components/base/input/input-base";
import { SelectBase } from "../../../relic-ui/components/base/input/select";
import { DataWaiter } from "../../../relic-ui/components/base/loader/data-waiter";
import { Container } from "../../../relic-ui/components/misc/container";
import { CommonIcons } from "../../../relic-ui/utils/icons";
import { formatMoney } from "../../../relic-ui/utils/misc";
import { QuickPopup } from "../../../relic-ui/utils/quick-popup";
import { DataViewer } from "../../../_components/data-viewer";
import { CustomerAdd } from "../../customers/view/customer-add";
import { TransactionProductAdd } from "./ts-product-add";

export const TransactionPrint = React.forwardRef<HTMLDivElement>(
  (props, ref) => {
    return (
      <div ref={ref}>
        <_TransactionPrint />
      </div>
    );
  }
);

export const _TransactionPrint = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const accountBook = useCurrentAccountBook();

  const transactions = useTransactions();
  const transaction = transactions.data?.find((p) => p.id === id);

  const customers = useCustomers();
  // const inventoryProducts = useProducts();

  const [customer, setCustomer] = useState<Customer | undefined>(
    customers.data?.find((p) => p.id === transaction?.customerId)
  );

  const transactionProducts = transaction?.products ?? [];
  const total = transactionProducts.reduce(
    (acc, curr) => acc + curr.totalPrice,
    0
  );
  const tax = transactionProducts.reduce((acc, curr) => {
    const price = curr.netPrice - curr.totalPrice;
    return acc + price;
  }, 0);
  const netTotal = total + tax;
  //
  const grandTotal = netTotal - (transaction?.discount ?? 0);

  const onPrint = async () => {
    //
  };

  return (
    <DataWaiter loading={transaction === undefined}>
      {transaction && (
        <div
          className="bg-white 
            text-black rounded-lg p-2
            overflow-auto max-h-screen  flex flex-col"
        >
          <Container>
            <div className="flex items-start justify-between">
              <h1 className="px-2 py-2 text-xs">
                Transaction ID : <span>{transaction.id}</span>
              </h1>
              <div className="p-2">
                <span className="opacity-70 pr-2">Date</span>
                <span>
                  {format(
                    (transaction!.date! as unknown as Timestamp).toDate(),
                    "dd/MM/yyyy hh:mm a"
                  )}
                </span>
              </div>
            </div>

            <div className="flex w-full justify-between items-start">
              <div className="flex space-y-1 flex-col  p-2 bg-black/0 rounded-lg">
                <p className="text-3xl font-semibold">
                  {accountBook.book?.invoiceDetails?.orgName}
                </p>
                <p>{accountBook.book?.invoiceDetails?.orgWebsite}</p>
              </div>
              <div className="flex  flex-col items-end p-2 bg-black/0 rounded-lg">
                <p>{accountBook.book?.invoiceDetails?.orgPhone}</p>
                <p>{accountBook.book?.invoiceDetails?.orgEmail}</p>
                <p>{accountBook.book?.invoiceDetails?.orgAddress}</p>
              </div>
            </div>

            {/* Top */}
            <div className="flex space-x-2">
              {/* Set  1 */}
              <div className="flex space-y-1 flex-col w-full p-2 bg-black/0 rounded-lg">
                <div className="bg-black text-white px-1 w-fit rounded-sm">
                  Bills To
                </div>
                {/*  */}

                <div className="">
                  <span className="opacity-70 pr-2">Customer Name</span>
                  <span>{transaction.customerName}</span>
                </div>
                <div className="">
                  <span className="opacity-70 pr-2">Phone</span>
                  <span>{transaction.customerPhone}</span>
                </div>
                <div className="">
                  <span className="opacity-70 pr-2">Email</span>
                  <span>{customer?.email ?? "---"}</span>
                </div>
                <div className="">
                  <span className="opacity-70 pr-2">Address</span>
                  <span>{customer?.address ?? "---"}</span>
                </div>
              </div>
              {/*  */}

              {/*  */}
            </div>

            {/*  */}

            {/* Products */}

            <div
              className="w-[800px] my-2 px-4 bg-black/0 rounded-lg
                 overflow-auto border border-black/50
              "
            >
              <DataViewer
                print
                data={transactionProducts}
                columnsHeadings={transactionProductDataHeadings}
                excludeColumns={[
                  "productId",
                  "description",
                  "quantityPerUnit",
                  "unit",
                  "quantityPurchased",
                  "category",
                ]}
                renderRow={(p) => ({
                  ...p,
                  unit: p.unit.name,
                  name: p.name + ` (${p.description})`,
                  price: Unit.formatPrice(p.price, p.unit, p.quantityPerUnit),
                  totalPrice:
                    formatMoney(p.totalPrice) +
                    ` (${Unit.format(p.quantityPurchased, p.unit)})`,
                  netPrice: (
                    <p className="font-semibold">
                      {formatMoney(p.netPrice, {
                        long: true,
                        decimalCount: 0,
                      })}
                    </p>
                  ),
                  taxPerc:
                    formatMoney(p.netPrice - p.totalPrice) + ` (${p.taxPerc}%)`,
                })}
                header={{
                  zeroPadding: true,
                  noSearch: true,
                  trailing: <></>,
                }}
                searchFn={(v, d) =>
                  d.filter(
                    (p) =>
                      p.name.toLowerCase().includes(v.toLowerCase()) ||
                      p.description.toLowerCase().includes(v.toLowerCase()) ||
                      p.category
                        .toString()
                        .toLowerCase()
                        .includes(v.toLowerCase()) ||
                      p.price.toString().toLowerCase().includes(v.toLowerCase())
                  )
                }
              />
            </div>

            {/* Set  2 */}

            <div className="flex items-end flex-col space-y-1 w-full py-4 px-6 bg-black/0 rounded-lg">
              <p className="">
                <span className="opacity-70 pr-2">Total</span>
                <span className="font-semibold rounded-sm px-1">
                  {formatMoney(total, {
                    decimalCount: 0,
                    long: true,
                  })}
                </span>
                <span className="pl-1 opacity-70">
                  @ {transactionProducts.length} items
                </span>
              </p>
              <p className="">
                <span className="opacity-70 pr-1">Tax</span>
                <span className=" font-semibold rounded-sm px-1">
                  {formatMoney(tax, {
                    decimalCount: 0,
                    long: true,
                  })}
                </span>
              </p>
              <p className="">
                <span className="opacity-70 pr-1">After Tax</span>
                <span className=" text-base  font-semibold rounded-sm px-1">
                  {formatMoney(netTotal, {
                    decimalCount: 0,
                    long: true,
                  })}
                </span>
              </p>
              <div className="">
                <span className="opacity-70 pr-2">Discount</span>
                <span className="font-semibold">
                  {formatMoney(transaction!.discount, {
                    decimalCount: 0,
                    long: true,
                  })}
                </span>
              </div>
              <div className="w-full flex justify-between">
                <div>
                  <div>Signature</div>
                </div>
                <div>
                  <p className="text-4xl pt-2">
                    <span className=" font-semibold rounded-sm px-1">
                      {formatMoney(grandTotal, {
                        decimalCount: 0,
                        long: true,
                      })}
                    </span>
                  </p>
                </div>
              </div>
            </div>
            {/*  */}
          </Container>
        </div>
      )}
    </DataWaiter>
  );
};
