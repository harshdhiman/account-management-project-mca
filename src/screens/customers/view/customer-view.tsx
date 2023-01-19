import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Customer,
  customersDataHeadings,
  useCustomers,
} from "../../../providers/customers/customer-data";
import { TextButton } from "../../../relic-ui/components/base/button/button";
import { DataWaiter } from "../../../relic-ui/components/base/loader/data-waiter";
import { QuickPopup } from "../../../relic-ui/utils/quick-popup";
import { DataViewer } from "../../../_components/data-viewer";

export const CustomerView = () => {
  const data = useCustomers();
  const navigate = useNavigate();

  return (
    <DataWaiter loading={data.loading === "loadLoading"} error={data.error}>
      <DataViewer<Customer>
        data={data.data!}
        searchFn={(v, d) =>
          d.filter((p) => p.name.toLowerCase().includes(v.toLowerCase()))
        }
        columnsHeadings={customersDataHeadings}
        excludeColumns={["id"]}
        renderRow={(d) => ({
          ...d,
          transactions:
            d.transactions?.length ?? 0 > 0 ? (
              <QuickPopup
                id={"customer-transaction-view-" + d.id}
                noHide={true}
                popup={
                  <div className="flex p-4 flex-col ">
                    <h1>Trasactions</h1>
                    <div className="flex flex-col-reverse space-y-1 overflow-auto max-h-[300px]">
                      {d.transactions?.map((t) => (
                        <TextButton
                          key={t}
                          onClick={() => {
                            navigate(`/transactions/view/details/${t}`);
                          }}
                        >
                          {t}
                        </TextButton>
                      ))}
                    </div>
                  </div>
                }
              >
                <TextButton>
                  {d.transactions?.length ?? 0} Transactions
                </TextButton>
              </QuickPopup>
            ) : (
              <p>{d.transactions?.length ?? 0} Transactions</p>
            ),
        })}
        //
        addButton={{
          text: "Add Customer",
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
