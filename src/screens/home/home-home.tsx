import React from "react";
import { Navigate } from "react-router-dom";
import { Sidebar } from "../../relic-ui/components/misc/sidebar";
import {
  RelicRoutes,
  RouteWithOutlet,
  RouteWithPopup,
} from "../../relic-ui/utils/routes";
import { HomeCharts } from "./home-charts";

export const HomeHome = () => {
  return (
    <div className="h-full">
      <Sidebar
        items={[
          {
            label: "Dashboard",
            path: "",
            alwaysActive: true,
          },
        ]}
      >
        <RelicRoutes
          routes={{
            "": {
              default: RouteWithOutlet(<HomeCharts />),
            },
          }}
        />
      </Sidebar>
    </div>
  );
};
