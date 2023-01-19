import React from "react";
import {
  Employee,
  employeesDataHeadings,
  useEmployees,
} from "../../../providers/employee/employee-data";
import { TextButton } from "../../../relic-ui/components/base/button/button";
import { DataWaiter } from "../../../relic-ui/components/base/loader/data-waiter";
import { formatMoney } from "../../../relic-ui/utils/misc";
import { QuickPopup } from "../../../relic-ui/utils/quick-popup";
import { DataViewer } from "../../../_components/data-viewer";

export const EmployeeView = () => {
  const data = useEmployees();

  return (
    <DataWaiter loading={data.loading === "loadLoading"} error={data.error}>
      <DataViewer<Employee>
        data={data.data!}
        searchFn={(v, d) =>
          d.filter((p) => p.name.toLowerCase().includes(v.toLowerCase()))
        }
        columnsHeadings={employeesDataHeadings}
        excludeColumns={["id"]}
        renderRow={(d) => ({
          ...d,
          bankDetails: (
            <QuickPopup
              id={"bank-details-" + d.id}
              popup={
                <div className="p-2 flex flex-col">
                  <p>
                    <span className="opacity-70 pr-2">Account No. : </span>{" "}
                    {d.bankDetails?.accountNumber}
                  </p>
                  <p>
                    <span className="opacity-70 pr-2">Bank Name :</span>{" "}
                    {d.bankDetails?.bankName}
                  </p>
                  <p>
                    <span className="opacity-70 pr-2">IFSC Code. : </span>{" "}
                    {d.bankDetails?.ifscCode}
                  </p>
                  <p>
                    <span className="opacity-70 pr-2">Branch :</span>{" "}
                    {d.bankDetails?.branchCode}
                  </p>
                </div>
              }
            >
              <TextButton>View Details</TextButton>
            </QuickPopup>
          ),
          proofs: (
            <QuickPopup
              id={"proof-details-" + d.id}
              popup={
                <div className="p-2 flex flex-col">
                  <p>
                    <span className="opacity-70 pr-2">Addhar Card : </span>{" "}
                    {d.proofs?.adharCard}
                  </p>
                  <p>
                    <span className="opacity-70 pr-2">PAN Card :</span>{" "}
                    {d.proofs?.panCard}
                  </p>
                </div>
              }
            >
              <TextButton>View Proofs</TextButton>
            </QuickPopup>
          ),
          salary: formatMoney(d.salary ?? 0),
        })}
        //
        addButton={{
          text: "Add Employee",
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
