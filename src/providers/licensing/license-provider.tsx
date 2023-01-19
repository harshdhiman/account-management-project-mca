import { getAuth } from "firebase/auth";
import React from "react";
import { useUser } from "../../auth/user-hook";
import { useFireDocCRUDSimpleWAutoLoad } from "../../firebase/providers-hook";
import { Button } from "../../relic-ui/components/base/button/button";
import { DataWaiter } from "../../relic-ui/components/base/loader/data-waiter";
import { GifLoader } from "../../relic-ui/components/base/loader/gif-loader";
import { CenterContainer } from "../../relic-ui/components/misc/container";
import { NoLicenseView } from "./ui/no-license";

export const LicenseProvider = (props: { children: React.ReactNode }) => {
  const user = useUser();
  return (
    <DataWaiter loading={user.loading === "loadLoading"} error={user.error}>
      {user.data?.license === undefined ? <NoLicenseView /> : props.children}
    </DataWaiter>
  );
};
