import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Customer,
  useCustomers,
} from "../../../providers/customers/customer-data";
import { Button } from "../../../relic-ui/components/base/button/button";
import { Form, useRelicForm } from "../../../relic-ui/components/base/form";
import { InputBase } from "../../../relic-ui/components/base/input/input-base";
import { Container } from "../../../relic-ui/components/misc/container";

export const CustomerAdd = (props: { hide?: (data?: any) => void }) => {
  const { id } = useParams();

  const customers = useCustomers();
  const navigate = useNavigate();
  const customer = customers.data?.find((p) => p.id === id);

  const formObj = useRelicForm({
    name: customer?.name || "",
    email: customer?.email || "",
    phone: customer?.phone || "",
    address: customer?.address || "",
    idNumber: customer?.idNumber || "",
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
          var _nid: string | undefined = "";
          if (id) {
            // edit
            const p: Customer = {
              ...customer!,
              ...data,
            };
            await customers.update(id, p);
          } else {
            // new
            const p: Customer = {
              ...data,
            };
            _nid = await customers.add(p);
          }

          if (props.hide) {
            // its a quick popup
            props.hide(_nid);
          } else {
            navigate(-1);
          }
        }}
      >
        <Container>
          <h1 className="px-2 py-2 ">Customers</h1>
          {/*  */}
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

          <InputBase ref={formObj.fieldRefs.idNumber} label="ID Number" />

          <div className="pt-4 w-full">
            <Button
              loading={customers.loadingAny !== false ? "Loading" : undefined}
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
