import { format } from "date-fns";
import { Timestamp } from "firebase/firestore";
import React from "react";
import {
  Expense,
  expensesDataHeadings,
  useExpenses,
} from "../../../providers/expenses/expenses-data";
import { DataWaiter } from "../../../relic-ui/components/base/loader/data-waiter";
import { formatMoney } from "../../../relic-ui/utils/misc";
import { DataViewer } from "../../../_components/data-viewer";

export const ExpensesView = () => {
  const data = useExpenses();
  return (
    <DataWaiter loading={data.loading === "loadLoading"} error={data.error}>
      <DataViewer<Expense>
        data={data.data!}
        searchFn={(v, d) =>
          d.filter((p) => p.name.toLowerCase().includes(v.toLowerCase()))
        }
        columnsHeadings={expensesDataHeadings}
        excludeColumns={["id"]}
        renderRow={(d) => ({
          ...d,
          date: format((d.date as unknown as Timestamp).toDate(), "dd/MM/yyyy"),
          amount: formatMoney(d.amount),
        })}
        //
        addButton={{
          text: "Add Expense",
          navigate: "add",
        }}
        //
        actions={{
          edit: (row) => ({ to: `edit/${row.id}` }),
          delete: (row) => {
            data.remove(row.id!);
          },
        }}
      />
    </DataWaiter>
  );
};
