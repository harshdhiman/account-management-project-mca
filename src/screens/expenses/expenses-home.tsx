import React from "react";
import { Navigate } from "react-router-dom";
import { Sidebar } from "../../relic-ui/components/misc/sidebar";
import {
  RelicRoutes,
  RouteWithOutlet,
  RouteWithPopup,
} from "../../relic-ui/utils/routes";
import { ExpensesAdd } from "./view/expenses-add";
import { ExpensesView } from "./view/expenses-view";

export const ExpensesHome = () => {
  return (
    <div className="h-full">
      <Sidebar
        items={[
          {
            label: "View Expenses",
            path: "view",
          },
        ]}
      >
        <RelicRoutes
          routes={{
            "": <Navigate to="view" />,
            view: {
              default: RouteWithOutlet(<ExpensesView />),
              add: RouteWithPopup(<ExpensesAdd />),
              "edit/:id": RouteWithPopup(<ExpensesAdd />),
            },
          }}
        />
      </Sidebar>
    </div>
  );
};
