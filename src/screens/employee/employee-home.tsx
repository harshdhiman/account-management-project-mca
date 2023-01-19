import { Navigate } from "react-router-dom";
import { Sidebar } from "../../relic-ui/components/misc/sidebar";
import {
  RelicRoutes,
  RouteWithOutlet,
  RouteWithPopup,
} from "../../relic-ui/utils/routes";
import { EmployeeAdd } from "./view/employee-add";
import { EmployeeView } from "./view/employee-view";

export const EmployeeHome = () => {
  return (
    <div className="h-full">
      <Sidebar
        items={[
          {
            label: "View Employees",
            path: "view",
          },
        ]}
      >
        <RelicRoutes
          routes={{
            "": <Navigate to="view" />,
            view: {
              default: RouteWithOutlet(<EmployeeView />),
              add: RouteWithPopup(<EmployeeAdd />),
              "edit/:id": RouteWithPopup(<EmployeeAdd />),
            },
          }}
        />
      </Sidebar>
    </div>
  );
};
