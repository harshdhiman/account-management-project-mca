import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Employee,
  useEmployees,
} from "../../../providers/employee/employee-data";
import { Button } from "../../../relic-ui/components/base/button/button";
import { Form, useRelicForm } from "../../../relic-ui/components/base/form";
import { InputBase } from "../../../relic-ui/components/base/input/input-base";
import { Container } from "../../../relic-ui/components/misc/container";

export const EmployeeAdd = () => {
  const { id } = useParams();

  const employees = useEmployees();
  const navigate = useNavigate();
  const empoyee = employees.data?.find((p) => p.id === id);

  const formObj = useRelicForm({
    name: empoyee?.name || "",
    email: empoyee?.email || "",
    phone: empoyee?.phone || "",
    address: empoyee?.address || "",
    workingArea: empoyee?.workingArea || "",
    salary: empoyee?.salary || 0,
    // bank details
    bankName: empoyee?.bankDetails?.bankName || "",
    accountNumber: empoyee?.bankDetails?.accountNumber || "",
    branchCode: empoyee?.bankDetails?.branchCode || "",
    ifscCode: empoyee?.bankDetails?.ifscCode || "",
    // proofs
    adharCard: empoyee?.proofs?.adharCard || "",
    panCard: empoyee?.proofs?.panCard || "",
    //
    salaryDate: empoyee?.salaryDate || "",
  });

  return (
    <div
      className="bg-surfaceVariant 
    text-onSurfaceVariant rounded-lg p-2 
    w-[300px]
    overflow-auto max-h-screen  flex flex-col"
    >
      <Form
        className="w-full"
        formHookObj={formObj}
        onSubmit={async (data) => {
          if (id) {
            // edit
            const p: Employee = {
              ...empoyee!,
              name: data.name,
              email: data.email,
              phone: data.phone,
              address: data.address,
              workingArea: data.workingArea,
              salary: data.salary,
              salaryDate: data.salaryDate,
              bankDetails: {
                bankName: data.bankName,
                accountNumber: data.accountNumber,
                branchCode: data.branchCode,
                ifscCode: data.ifscCode,
              },
              proofs: {
                adharCard: data.adharCard,
                panCard: data.panCard,
              },
            };
            await employees.update(id, p);
          } else {
            // new
            const p: Employee = {
              name: data.name,
              email: data.email,
              phone: data.phone,
              address: data.address,
              workingArea: data.workingArea,
              salary: data.salary,
              salaryDate: data.salaryDate,
              bankDetails: {
                bankName: data.bankName,
                accountNumber: data.accountNumber,
                branchCode: data.branchCode,
                ifscCode: data.ifscCode,
              },
              proofs: {
                adharCard: data.adharCard,
                panCard: data.panCard,
              },
            };
            await employees.add(p);
          }
          navigate(-1);
        }}
      >
        <Container className="flex flex-col space-y-1">
          <h1 className="px-2 py-2 ">Employee</h1>
          {/*  */}

          <div className="flex flex-col rounded-lg p-2 bg-black/20">
            <InputBase
              ref={formObj.fieldRefs.name}
              label="Name"
              placeholder="eg. Harsh"
              validator={(v) => {
                if (!v) return "required";
              }}
            />

            <InputBase ref={formObj.fieldRefs.email} label="Email" />

            <InputBase
              ref={formObj.fieldRefs.phone}
              label="Phone"
              validator={(v) => {
                if (!v) return "required";
              }}
            />

            <InputBase ref={formObj.fieldRefs.address} label="Address" />
          </div>

          <div className="flex flex-col rounded-lg p-2 bg-black/20">
            <InputBase
              ref={formObj.fieldRefs.workingArea}
              label="Working Area"
            />

            <InputBase
              ref={formObj.fieldRefs.salary}
              validator={(v) => {
                if (!v) return "required";
              }}
              label="Salary"
            />
            <InputBase
              ref={formObj.fieldRefs.salaryDate}
              validator={(v) => {
                if (!v) return "required";
              }}
              type="date"
              label="Salary Date"
            />
          </div>

          <div className="flex flex-col rounded-lg p-2 bg-black/20">
            <InputBase ref={formObj.fieldRefs.bankName} label="Bank Name" />

            <InputBase
              ref={formObj.fieldRefs.accountNumber}
              label="Account Number"
            />

            <InputBase ref={formObj.fieldRefs.branchCode} label="Branch Code" />

            <InputBase ref={formObj.fieldRefs.ifscCode} label="IFSC Code" />
          </div>
          <div className="flex flex-col rounded-lg p-2 bg-black/20">
            <InputBase ref={formObj.fieldRefs.adharCard} label="Adhar Card" />

            <InputBase ref={formObj.fieldRefs.panCard} label="Pan Card" />
          </div>

          <div className="pt-4 w-full">
            <Button
              loading={employees.loadingAny !== false ? "Loading" : undefined}
              type="submit"
              className="w-full"
            >
              Save
            </Button>
          </div>
        </Container>
      </Form>
    </div>
  );
};
