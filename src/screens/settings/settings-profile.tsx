import React from "react";
import toast from "react-hot-toast";
import {
  AccountBook,
  useAccountBooks,
  useCurrentAccountBook,
} from "../../providers/account-books/data/account-book";
import { Button } from "../../relic-ui/components/base/button/button";
import { Form, useRelicForm } from "../../relic-ui/components/base/form";
import { InputBase } from "../../relic-ui/components/base/input/input-base";

export const SettingsProfile = () => {
  const accountBoooks = useAccountBooks();
  const currentAccountBook = useCurrentAccountBook();
  //
  const accountBook = accountBoooks.data?.find(
    (p) => p.id === currentAccountBook.book?.id
  );

  const formHookObj = useRelicForm({
    orgName: accountBook?.invoiceDetails?.orgName ?? "",
    orgAddress: accountBook?.invoiceDetails?.orgAddress ?? "",
    orgPhone: accountBook?.invoiceDetails?.orgPhone ?? "",
    orgEmail: accountBook?.invoiceDetails?.orgEmail ?? "",
    orgWebsite: accountBook?.invoiceDetails?.orgWebsite ?? "",
    orgProof: accountBook?.invoiceDetails?.orgProof ?? "",
  });

  return (
    <div className="p-4 flex flex-col space-y-4">
      <div className="text-2xl">Profile Settings</div>
      {/*  */}

      <div
        className="rounded-lg p-2 bg-black/20 w-[250px]
      flex flex-col space-y-2"
      >
        <div className="opacity-60">Invoice Settings</div>
        <Form
          formHookObj={formHookObj}
          onSubmit={async (data) => {
            const p: AccountBook = {
              ...accountBook!,
              invoiceDetails: {
                orgName: data.orgName,
                orgAddress: data.orgAddress,
                orgPhone: data.orgPhone,
                orgEmail: data.orgEmail,
                orgWebsite: data.orgWebsite,
                orgProof: data.orgProof,
              },
            };
            await accountBoooks.update(accountBook!.id!, p);
            toast.success("Updated");
          }}
        >
          <InputBase
            label="Organization Name"
            ref={formHookObj.fieldRefs.orgName}
            validator={(v) => {
              if (!v) return "Required";
            }}
          />
          <InputBase
            label="Organization Address"
            ref={formHookObj.fieldRefs.orgAddress}
            validator={(v) => {
              if (!v) return "Required";
            }}
          />
          <InputBase
            label="Organization Phone"
            ref={formHookObj.fieldRefs.orgPhone}
            validator={(v) => {
              if (!v) return "Required";
            }}
          />
          <InputBase
            label="Organization Email"
            ref={formHookObj.fieldRefs.orgEmail}
            validator={(v) => {
              if (!v) return "Required";
            }}
          />
          <InputBase
            label="Organization Website"
            ref={formHookObj.fieldRefs.orgWebsite}
            validator={(v) => {
              if (!v) return "Required";
            }}
          />
          <InputBase
            label="ID Proof"
            ref={formHookObj.fieldRefs.orgProof}
            validator={(v) => {
              if (!v) return "Required";
            }}
          />
          <Button
            type="submit"
            loading={
              accountBoooks.loading === "updateLoading" ? true : undefined
            }
            className="mt-2 w-full"
          >
            Save
          </Button>
        </Form>

        {/*  */}
      </div>
    </div>
  );
};
