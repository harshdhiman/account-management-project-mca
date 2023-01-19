import { Timestamp } from "firebase/firestore";
import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Expense,
  useExpenses,
} from "../../../providers/expenses/expenses-data";
import { Button } from "../../../relic-ui/components/base/button/button";
import { Form, useRelicForm } from "../../../relic-ui/components/base/form";
import { InputBase } from "../../../relic-ui/components/base/input/input-base";
import { Container } from "../../../relic-ui/components/misc/container";

export const ExpensesAdd = () => {
  const { id } = useParams();

  const expenses = useExpenses();
  const navigate = useNavigate();
  const expense = expenses.data?.find((p) => p.id === id);

  const [date, setDate] = useState(
    expense?.date
      ? (expense?.date as unknown as Timestamp).toDate()
      : new Date()
  );

  const formObj = useRelicForm({
    name: expense?.name || "",
    description: expense?.description || "",
    amount: expense?.amount || 0,
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
            const p: Expense = {
              ...expense!,
              ...data,
              date: date,
            };
            await expenses.update(id, p);
          } else {
            // new
            const p: Expense = {
              ...data,
              date: date,
            };
            await expenses.add(p);
          }
          navigate(-1);
        }}
      >
        <Container className="flex flex-col space-y-1">
          <h1 className="px-2 py-2 ">Expense</h1>
          {/*  */}

          <div className="flex flex-col rounded-lg p-2 bg-black/20">
            <InputBase
              ref={formObj.fieldRefs.name}
              label="Name"
              placeholder="eg. Car"
              validator={(v) => {
                if (!v) return "required";
              }}
            />
            <InputBase
              ref={formObj.fieldRefs.description}
              label="Description"
              validator={(v) => {
                if (!v) return "required";
              }}
            />
            <InputBase
              ref={formObj.fieldRefs.amount}
              label="Amount"
              type={"number"}
              validator={(v) => {
                if (!v) return "required";
              }}
            />
            <InputBase
              label="Date"
              type={"date"}
              validator={(v) => {
                if (!v) return "required";
              }}
              value={date.toISOString().split("T")[0]}
              onChange={(e) => {
                setDate(new Date(e.target.value));
              }}
            />
          </div>
          <div className="pt-4 w-full">
            <Button
              loading={expenses.loadingAny !== false ? "Loading" : undefined}
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
