import { Navigate } from "react-router-dom";
import { Sidebar } from "../../relic-ui/components/misc/sidebar";
import {
  RelicRoutes,
  RouteWithOutlet,
  RouteWithPopup,
} from "../../relic-ui/utils/routes";
import { CustomerAdd } from "./view/customer-add";
import { CustomerView } from "./view/customer-view";

export const CustomerHome = () => {
  return (
    <div className="h-full">
      <Sidebar
        items={[
          {
            label: "View Customers",
            path: "view",
          },
        ]}
      >
        <RelicRoutes
          routes={{
            "": <Navigate to="view" />,
            view: {
              default: RouteWithOutlet(<CustomerView />),
              add: RouteWithPopup(<CustomerAdd />),
              "edit/:id": RouteWithPopup(<CustomerAdd />),
            },
          }}
        />
      </Sidebar>
    </div>
  );
};
