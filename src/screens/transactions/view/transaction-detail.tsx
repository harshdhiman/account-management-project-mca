import { formatRelative } from "date-fns";
import { Timestamp } from "firebase/firestore";
import React, { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import { useReactToPrint } from "react-to-print";
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
import { TransactionPrint } from "./transaction-print";
import { TransactionProductAdd } from "./ts-product-add";

export const TransactionDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

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

  const componentRef = useRef(null);
  const handlePrint = useReactToPrint({
    content: () => componentRef.current!,
  });

  const onPrint = async () => {
    handlePrint();
  };

  return (
    <DataWaiter loading={transaction === undefined}>
      <div className="hidden">
        <TransactionPrint ref={componentRef} />
      </div>
      {transaction && (
        <div
          className="bg-surfaceVariant 
        text-onSurfaceVariant rounded-lg p-2 
        
        overflow-auto max-h-screen  flex flex-col"
        >
          <Container>
            <h1 className="px-2 py-2 ">Transaction</h1>

            {/* Top */}
            <div className="flex space-x-2">
              {/* Set  1 */}
              <div className="flex space-y-1 flex-col w-full p-3 bg-black/20 rounded-lg">
                {/*  */}
                <div className="">
                  <span className="opacity-70 pr-2">Date</span>
                  <span>
                    {formatRelative(
                      (transaction!.date! as unknown as Timestamp).toDate(),
                      new Date()
                    )}
                  </span>
                </div>
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
                  <span>{customer?.email}</span>
                </div>
                <div className="">
                  <span className="opacity-70 pr-2">Address</span>
                  <span>{customer?.address}</span>
                </div>
              </div>
              {/*  */}

              {/* Set  2 */}

              <div className="flex flex-col space-y-3 w-full p-3 bg-black/20 rounded-lg">
                <p className="">
                  <span className="opacity-50 pr-1">Total</span>
                  <span className="bg-primary text-onPrimary font-semibold rounded-sm px-1">
                    {formatMoney(total)}
                  </span>
                  <span className="pl-1 opacity-70">
                    @ {transactionProducts.length} items
                  </span>
                </p>
                <p className="">
                  <span className="opacity-50 pr-1">Tax</span>
                  <span className=" font-semibold rounded-sm px-1">
                    {formatMoney(tax)}
                  </span>
                </p>
                <p className="">
                  <span className="opacity-50 pr-1">After Tax</span>
                  <span className="bg-primary text-base text-onPrimary font-semibold rounded-sm px-1">
                    {formatMoney(netTotal)}
                  </span>
                </p>
              </div>
              {/*  */}

              {/* Set  3 */}

              <div className="flex flex-col justify-between space-y-1 w-full p-3 bg-black/20 rounded-lg">
                <div className="">
                  <span className="opacity-70 pr-2">Discount</span>
                  <span>{formatMoney(transaction!.discount)}</span>
                </div>

                <div>
                  <span className="opacity-50 pr-1 ">Grand Total</span>
                  <p className="text-3xl pt-2">
                    <span className="bg-tertiary text-onTertiary font-semibold rounded-sm px-1">
                      {formatMoney(grandTotal, {
                        decimalCount: 0,
                        long: true,
                      })}
                    </span>
                  </p>
                </div>
              </div>

              {/*  */}
            </div>

            {/*  */}

            {/* Products */}

            <div
              className="w-[900px] my-2 px-4 bg-black/20 rounded-lg
            min-h-[300px] max-h-[400px] overflow-auto
          "
            >
              <DataViewer
                data={transactionProducts}
                columnsHeadings={transactionProductDataHeadings}
                excludeColumns={[
                  "productId",
                  "description",
                  "quantityPerUnit",
                  "unit",
                  "quantityPurchased",
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
                    <p className="bg-primary px-1 rounded-sm text-onPrimary font-semibold">
                      {formatMoney(p.netPrice)}
                    </p>
                  ),
                  taxPerc:
                    formatMoney(p.netPrice - p.totalPrice) + ` (${p.taxPerc}%)`,
                })}
                header={{
                  zeroPadding: true,
                  noSearch: false,
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

            {/*  */}

            <div className="pt-4 w-full flex">
              <Button
                onClick={() => {
                  onPrint();
                }}
                type="button"
                className="w-full"
              >
                Print Invoice
              </Button>
            </div>
          </Container>
        </div>
      )}
    </DataWaiter>
  );
};
