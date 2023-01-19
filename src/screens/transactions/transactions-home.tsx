import { Navigate } from "react-router-dom";
import { Sidebar } from "../../relic-ui/components/misc/sidebar";
import {
  RelicRoutes,
  RouteWithOutlet,
  RouteWithPopup,
} from "../../relic-ui/utils/routes";
import { TransactionAdd } from "./view/transaction-add";
import { TransactionDetails } from "./view/transaction-detail";
import { TransactionPrint } from "./view/transaction-print";
import { TransactionsView } from "./view/transactions-view";

export const TrasactionsHome = () => {
  return (
    <div className="h-full">
      <Sidebar
        items={[
          {
            label: "All Transactions",
            path: "view",
          },
        ]}
      >
        <RelicRoutes
          routes={{
            "": <Navigate to="view" />,
            view: {
              default: RouteWithOutlet(<TransactionsView />),
              add: RouteWithPopup(<TransactionAdd />),
              // "edit/:id": RouteWithPopup(<TransactionAdd />),
              "details/:id": RouteWithPopup(<TransactionDetails />),
              "add/add-product": RouteWithPopup(<TransactionAdd />),
            },
          }}
        />
      </Sidebar>
    </div>
  );
};
