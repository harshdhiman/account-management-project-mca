import { format, formatRelative } from "date-fns";
import { Timestamp } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { useProducts } from "../../../providers/products/product-data";
import {
  Transaction,
  transactionsDataHeadings,
  useTransactions,
} from "../../../providers/transactions/transaction-data";
import { Unit } from "../../../providers/units/unit";
import { IconButton } from "../../../relic-ui/components/base/button/icon-button";
import { DataWaiter } from "../../../relic-ui/components/base/loader/data-waiter";
import { CommonIcons } from "../../../relic-ui/utils/icons";
import { formatMoney } from "../../../relic-ui/utils/misc";
import { DataViewer } from "../../../_components/data-viewer";

export const TransactionsView = () => {
  const transactions = useTransactions();
  const products = useProducts();
  const navigate = useNavigate();

  return (
    <DataWaiter
      loading={transactions.loading === "loadLoading"}
      error={transactions.error}
    >
      <DataViewer<Transaction>
        data={transactions.data!}
        searchFn={(v, d) =>
          d.filter((op) => {
            const p = transactions.data!.find((p) => p.id === op.id)!;

            return (
              p.customerName.toLowerCase().includes(v.toLowerCase()) ||
              p.customerPhone
                .toString()
                .toLowerCase()
                .includes(v.toLowerCase()) ||
              p.netTotal.toString().toLowerCase().includes(v.toLowerCase()) ||
              p.products
                .map((product) => product.name.toLowerCase())
                .join(" ")
                .includes(v.toLowerCase())
            );
          })
        }
        columnsHeadings={transactionsDataHeadings}
        excludeColumns={[
          "id",
          "customerId",
          "customerPhone",
          "discountType",
          "payment",
          "change",
          "paid",
        ]}
        sortFinderCol="id"
        defaultSortField={1}
        defaultSortAsc={false}
        renderRow={(d) => ({
          ...d,
          products: d.products.map((p) => p.name).join(", "),
          date: (
            <p className="text-xs">
              {formatRelative(
                (d.date as unknown as Timestamp).toDate(),
                new Date()
              )}
            </p>
          ),
          total: formatMoney(d.total) + ` (${d.products.length} items)`,
          tax:
            formatMoney(d.tax) +
            ` (${
              // CALCULATE TAX PERCENTAGE
              ((d.tax / d.total) * 100).toFixed(1)
            }%)`,
          discount:
            formatMoney(d.discount) +
            ` (${
              // CALCULATE DISCOUNT PERCENTAGE
              ((d.discount / d.netTotal) * 100).toFixed(1) + "%"
            })`,
          netTotal: formatMoney(d.netTotal),
          grandTotal: (
            <p className="bg-primary px-1 rounded-sm text-onPrimary font-semibold">
              {formatMoney(d.grandTotal)}
            </p>
          ),
          profit: (
            <div
              className={
                "flex space-x-2 items-center " +
                `${d.profit > 0 ? "text-green-500" : "text-red-500"}`
              }
            >
              <p className="">{formatMoney(d.profit)}</p>
              {d.profit > 0 ? (
                <CommonIcons.TrendingUp />
              ) : d.profit < 0 ? (
                <CommonIcons.TrendingDown />
              ) : null}
            </div>
          ),
        })}
        //
        addButton={{
          text: "New Transaction",
          navigate: "add",
        }}
        //
        actions={{
          //   edit: (row) => ({ to: `edit/${row.id}` }),
          delete: (row) => {
            transactions.remove(row.id!);
          },
          trailing: (row) => {
            return (
              <div className="flex pr-2">
                <IconButton
                  onClick={() => {
                    navigate(`details/${row.id}`);
                  }}
                >
                  <CommonIcons.List />
                </IconButton>
              </div>
            );
          },
        }}
        //
        // conditionalCellStyles={(e) => {
        //     return [
        //       {
        //         when: (row) => {
        //           if (e !== "stock") return false;
        //           const stk = products.data!.find((p) => p.id === row.id)!.stock;
        //           return stk ? stk <= 3 : false;
        //         },
        //         style: {
        //           color: "red",
        //         },
        //       },
        //     ];
        //   }}
      />
    </DataWaiter>
  );
};
